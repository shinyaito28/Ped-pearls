import React, { useMemo } from 'react';

// ----------------------------------------------------------------------------
// Pure waveform calculation — exported for unit testing.
// ----------------------------------------------------------------------------
//
// We approximate the ROTEM amplitude curve with a saturating exponential:
//
//   A(t) = MCF * (1 - exp(-(t - CT_min) / tau))     for t > CT_min
//   A(t) = 0                                        otherwise
//
// where tau is calibrated so that the amplitude crosses 20 mm at CT + CFT, the
// definition of CFT itself. That gives a curve whose CT, CFT and MCF
// correspond to the user's inputs by construction.

// Amplitude (mm) at time t (minutes), given CT/CFT in seconds and MCF in mm.
export const ampAt = (tMin, ctSec, cftSec, mcf) => {
    const ctMin = ctSec / 60;
    const cftMin = cftSec / 60;
    if (tMin <= ctMin) return 0;
    if (mcf <= 0) return 0;

    // tau s.t. MCF * (1 - exp(-cftMin/tau)) = 20
    const ratio = 20 / mcf;
    if (ratio >= 1) {
        // MCF never reaches 20 — degenerate; just rise gently towards MCF.
        const tau = Math.max(cftMin, 1);
        return mcf * (1 - Math.exp(-(tMin - ctMin) / tau));
    }
    const tau = -cftMin / Math.log(1 - ratio);
    return mcf * (1 - Math.exp(-(tMin - ctMin) / tau));
};

// Build the upper trace path as an SVG path string.
//
//   bounds = { x0, y0, w, h }  pixel rect of the chart area.
//   tMaxMin = total time span on the x-axis (default 60 min).
//   ampMax  = amplitude span on the y-axis (mm), drives vertical scaling.
export const buildTracePath = ({ ctSec, cftSec, mcf, ampMax = 80, tMaxMin = 60 }, bounds, samples = 40) => {
    const { x0, y0, w, h } = bounds;
    const yMid = y0 + h / 2;
    const ampScale = (h / 2) / ampMax; // pixels per mm
    const xScale = w / tMaxMin;

    let d = '';
    for (let i = 0; i <= samples; i++) {
        const t = (i / samples) * tMaxMin;
        const a = ampAt(t, ctSec, cftSec, mcf);
        const x = x0 + t * xScale;
        const y = yMid - a * ampScale;
        d += (i === 0 ? `M ${x.toFixed(2)} ${y.toFixed(2)}` : ` L ${x.toFixed(2)} ${y.toFixed(2)}`);
    }
    return d;
};

// Build the mirrored "missile" — top trace plus bottom mirror as a closed shape.
export const buildMissilePath = (params, bounds, samples = 40) => {
    const { x0, y0, w, h } = bounds;
    const yMid = y0 + h / 2;
    const ampScale = (h / 2) / (params.ampMax ?? 80);
    const xScale = w / (params.tMaxMin ?? 60);

    const top = [];
    const bottom = [];
    for (let i = 0; i <= samples; i++) {
        const t = (i / samples) * (params.tMaxMin ?? 60);
        const a = ampAt(t, params.ctSec, params.cftSec, params.mcf);
        const x = x0 + t * xScale;
        top.push(`${x.toFixed(2)} ${(yMid - a * ampScale).toFixed(2)}`);
        bottom.push(`${x.toFixed(2)} ${(yMid + a * ampScale).toFixed(2)}`);
    }
    return `M ${top.join(' L ')} L ${bottom.reverse().join(' L ')} Z`;
};

// ----------------------------------------------------------------------------
// SVG component
// ----------------------------------------------------------------------------

const ASSAY_COLOURS = {
    HEPTEM: { stroke: '#2563eb', fill: 'rgb(37 99 235 / 0.18)' },   // blue-600
    EXTEM:  { stroke: '#059669', fill: 'rgb(5 150 105 / 0.18)' },   // emerald-600
    FIBTEM: { stroke: '#9333ea', fill: 'rgb(147 51 234 / 0.18)' },  // purple-600
};

const RotemTrace = ({
    assay = 'HEPTEM',
    ct = 200,
    cft = 90,
    mcf = 55,
    a10,                    // optional: amplitude at 10 min after CT
    highlight = null,       // 'CT' | 'CFT' | 'MCF' | 'A10' | null
    triggered = false,      // outline glow rose if true
    width = 220,
    height = 90,
    ampMax = 80,
    mcfGoal = null,         // optional: clinical goal line
    showA10 = false,
}) => {
    const colour = ASSAY_COLOURS[assay] || ASSAY_COLOURS.HEPTEM;

    const pad = { l: 18, r: 6, t: 6, b: 14 };
    const bounds = {
        x0: pad.l,
        y0: pad.t,
        w: width - pad.l - pad.r,
        h: height - pad.t - pad.b
    };
    const yMid = bounds.y0 + bounds.h / 2;
    const ampScale = (bounds.h / 2) / ampMax;
    const tMaxMin = 60;
    const xScale = bounds.w / tMaxMin;

    const missile = useMemo(
        () => buildMissilePath({ ctSec: ct, cftSec: cft, mcf, ampMax, tMaxMin }, bounds),
        [ct, cft, mcf, ampMax, bounds.x0, bounds.y0, bounds.w, bounds.h]
    );

    const ctMin = ct / 60;
    const ctX = bounds.x0 + ctMin * xScale;

    // A10 marker: 10 min after CT.
    const a10TimeMin = ctMin + 10;
    const a10X = bounds.x0 + a10TimeMin * xScale;
    const a10Amp = a10 ?? ampAt(a10TimeMin, ct, cft, mcf);
    const a10Y = yMid - a10Amp * ampScale;

    const goalY = mcfGoal != null ? yMid - mcfGoal * ampScale : null;

    const glowColour = triggered ? '#f43f5e' : colour.stroke;
    const filterId = `rotem-glow-${assay}-${ct}-${mcf}-${triggered ? 't' : 'f'}`;

    return (
        <svg
            viewBox={`0 0 ${width} ${height}`}
            width={width}
            height={height}
            role="img"
            aria-label={`${assay} mock trace`}
            style={{ display: 'block' }}
        >
            <defs>
                <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation={triggered ? 2.4 : 1.2} result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Plot frame */}
            <rect
                x={bounds.x0} y={bounds.y0} width={bounds.w} height={bounds.h}
                fill="rgb(248 250 252 / 0.6)"
                stroke="#cbd5e1"
                strokeWidth="0.5"
                rx={4}
            />

            {/* Midline */}
            <line
                x1={bounds.x0} x2={bounds.x0 + bounds.w}
                y1={yMid} y2={yMid}
                stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="2 2"
            />

            {/* MCF goal line (clinical threshold) */}
            {goalY != null && (
                <>
                    <line
                        x1={bounds.x0} x2={bounds.x0 + bounds.w}
                        y1={goalY} y2={goalY}
                        stroke="#10b981" strokeWidth="1" strokeDasharray="3 2"
                    />
                    <line
                        x1={bounds.x0} x2={bounds.x0 + bounds.w}
                        y1={2 * yMid - goalY} y2={2 * yMid - goalY}
                        stroke="#10b981" strokeWidth="1" strokeDasharray="3 2" opacity="0.6"
                    />
                </>
            )}

            {/* Trace */}
            <path
                d={missile}
                fill={colour.fill}
                stroke={triggered ? '#f43f5e' : colour.stroke}
                strokeWidth={highlight === 'MCF' ? 2.2 : 1.4}
                filter={highlight ? `url(#${filterId})` : undefined}
                style={{ transition: 'd 200ms, stroke 200ms, fill 200ms' }}
            />

            {/* CT marker */}
            <line
                x1={ctX} x2={ctX}
                y1={bounds.y0} y2={bounds.y0 + bounds.h}
                stroke={highlight === 'CT' ? '#f43f5e' : '#64748b'}
                strokeWidth={highlight === 'CT' ? 2 : 0.8}
                strokeDasharray={highlight === 'CT' ? '' : '2 2'}
            />
            <text
                x={ctX + 2} y={bounds.y0 + 9}
                fontSize="8"
                fill={highlight === 'CT' ? '#9f1239' : '#64748b'}
                fontWeight={highlight === 'CT' ? 700 : 400}
            >
                CT
            </text>

            {/* A10 marker (dot) */}
            {showA10 && a10TimeMin <= tMaxMin && (
                <>
                    <circle
                        cx={a10X} cy={a10Y}
                        r={highlight === 'A10' ? 3.5 : 2}
                        fill={highlight === 'A10' ? '#f43f5e' : colour.stroke}
                        stroke="white" strokeWidth="0.8"
                        filter={highlight === 'A10' ? `url(#${filterId})` : undefined}
                    />
                    <text
                        x={a10X + 4} y={a10Y - 3}
                        fontSize="8"
                        fill={highlight === 'A10' ? '#9f1239' : '#475569'}
                        fontWeight={highlight === 'A10' ? 700 : 400}
                    >
                        A10
                    </text>
                </>
            )}

            {/* MCF marker (right edge label) */}
            <text
                x={bounds.x0 + bounds.w - 2} y={yMid - mcf * ampScale - 2}
                fontSize="8" textAnchor="end"
                fill={highlight === 'MCF' ? '#9f1239' : colour.stroke}
                fontWeight={highlight === 'MCF' ? 700 : 600}
            >
                MCF {Math.round(mcf)}
            </text>

            {/* Axis labels */}
            <text x={bounds.x0 - 3} y={yMid + 3} fontSize="7" fill="#94a3b8" textAnchor="end">0</text>
            <text x={bounds.x0 - 3} y={bounds.y0 + 7} fontSize="7" fill="#94a3b8" textAnchor="end">{ampMax}</text>
            <text x={bounds.x0} y={bounds.y0 + bounds.h + 9} fontSize="7" fill="#94a3b8">0</text>
            <text x={bounds.x0 + bounds.w} y={bounds.y0 + bounds.h + 9} fontSize="7" fill="#94a3b8" textAnchor="end">60 min</text>

            {/* Assay name */}
            <text
                x={bounds.x0 + 4} y={bounds.y0 + bounds.h - 4}
                fontSize="9" fontWeight="700"
                fill={colour.stroke}
                opacity="0.65"
            >
                {assay}
            </text>
        </svg>
    );
};

export default RotemTrace;
