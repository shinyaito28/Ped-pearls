import React from 'react';
import { postCpbPath } from '../data/rotem_protocol';

// Interactive SVG decision tree for the Post-CPB ROTEM phase. The active
// branch lights up based on the live A10 EXTEM and A10 FIBTEM values; all
// other branches fade to a muted dashed style.
//
// Coordinates are laid out in a 720 × 360 viewBox; the consumer (CardiacRotemCard)
// constrains width via a parent container so the SVG scales responsively.

// ---------------------------------------------------------------------------
// Visual atoms
// ---------------------------------------------------------------------------

const Node = ({ x, y, w = 150, h = 56, title, sub, accent = 'slate', active = false, dim = false }) => {
    // Encode (active|dim|default) into pre-defined Tailwind classes that are
    // already in the safelist. We never build dynamic class strings inline.
    const styles = {
        active: { fill: 'rgb(20 184 166 / 0.18)', stroke: '#14b8a6', strokeWidth: 3 },
        dim:    { fill: 'transparent',             stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 3' },
        plain:  { fill: 'rgb(248 250 252)',       stroke: '#94a3b8', strokeWidth: 1.5 }
    };
    const accentMap = {
        teal:    { fill: 'rgb(20 184 166 / 0.14)', stroke: '#14b8a6' },
        rose:    { fill: 'rgb(244 63 94 / 0.14)',  stroke: '#f43f5e' },
        sky:     { fill: 'rgb(56 189 248 / 0.14)', stroke: '#0ea5e9' },
        emerald: { fill: 'rgb(16 185 129 / 0.18)', stroke: '#10b981' },
        slate:   styles.plain
    };
    const base = active ? styles.active : dim ? styles.dim : (accentMap[accent] || styles.plain);

    const titleColor = active ? '#0f766e' : dim ? '#94a3b8' : '#0f172a';
    const subColor   = active ? '#115e59' : dim ? '#cbd5e1' : '#475569';

    return (
        <g style={{ transition: 'opacity 200ms' }} opacity={dim ? 0.55 : 1}>
            <rect
                x={x} y={y} width={w} height={h}
                rx={12} ry={12}
                fill={base.fill}
                stroke={base.stroke}
                strokeWidth={base.strokeWidth}
                strokeDasharray={base.strokeDasharray || ''}
                style={{ filter: active ? 'drop-shadow(0 0 6px rgb(20 184 166 / 0.6))' : 'none', transition: 'all 200ms' }}
            />
            <text x={x + w / 2} y={y + h / 2 - (sub ? 6 : 0)} textAnchor="middle" dominantBaseline="middle"
                  fontSize="13" fontWeight="700" fill={titleColor}>
                {title}
            </text>
            {sub && (
                <text x={x + w / 2} y={y + h / 2 + 12} textAnchor="middle" dominantBaseline="middle"
                      fontSize="10" fill={subColor}>
                    {sub}
                </text>
            )}
        </g>
    );
};

const Edge = ({ from, to, active = false, dim = false, label }) => {
    const stroke = active ? '#14b8a6' : dim ? '#e2e8f0' : '#94a3b8';
    const width = active ? 3 : 1.5;
    const dash = dim ? '4 3' : null;
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2;
    return (
        <g style={{ transition: 'all 200ms' }}>
            <path
                d={`M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x} ${to.y}`}
                fill="none" stroke={stroke} strokeWidth={width}
                strokeDasharray={dash || ''}
                style={{ filter: active ? 'drop-shadow(0 0 4px rgb(20 184 166 / 0.5))' : 'none', transition: 'all 200ms' }}
            />
            {label && (
                <text x={midX} y={midY - 4} textAnchor="middle" fontSize="10"
                      fill={active ? '#0f766e' : dim ? '#cbd5e1' : '#64748b'}
                      fontWeight={active ? '700' : '400'}>
                    {label}
                </text>
            )}
        </g>
    );
};

// ---------------------------------------------------------------------------
// Post-CPB decision tree (matches the diagram in the institutional guide)
// ---------------------------------------------------------------------------
//
//                                          ┌─ 30-40 → 20 mL/kg
//                       ┌─ A10 FIBTEM ≥ 9 ─┼─ 20-30 → 30 mL/kg
//                       │  Platelets       └─ < 20  → 40 mL/kg
//   A10 EXTEM < 38 ─────┤
//                       │                  ┌─ 8-9   → 1 unit
//                       └─ A10 FIBTEM < 9 ─┼─ 7-8   → 2 units
//                          Cryoprecipitate └─ < 7   → 3 units
//
//   Goal A10 EXTEM ≥ 38 mm → no intervention (separate emerald node)

export const PostCpbDecisionTree = ({ a10extem = 42, a10fibtem = 12 }) => {
    const path = postCpbPath({ a10extem, a10fibtem });

    // Layout ---------------------------------------------------------------
    const root      = { x: 80,  y: 180, w: 160, h: 60 };
    const goalMet   = { x: 280, y: 50,  w: 200, h: 48 };
    const branchPlt = { x: 280, y: 130, w: 200, h: 60 };
    const branchCry = { x: 280, y: 230, w: 200, h: 60 };

    const pltOpts = [
        { x: 520, y: 110,  w: 180, h: 36, title: '30-40 mm', sub: '→ 20 mL/kg', key: 'platelets-30-40' },
        { x: 520, y: 152,  w: 180, h: 36, title: '20-30 mm', sub: '→ 30 mL/kg', key: 'platelets-20-30' },
        { x: 520, y: 194,  w: 180, h: 36, title: '< 20 mm',  sub: '→ 40 mL/kg', key: 'platelets-lt-20' },
    ];
    const cryoOpts = [
        { x: 520, y: 240,  w: 180, h: 36, title: '8-9 mm', sub: '→ 1 unit',  key: 'cryo-1' },
        { x: 520, y: 282,  w: 180, h: 36, title: '7-8 mm', sub: '→ 2 units', key: 'cryo-2' },
        { x: 520, y: 324,  w: 180, h: 36, title: '< 7 mm', sub: '→ 3 units', key: 'cryo-3' },
    ];

    const rootRight = { x: root.x + root.w, y: root.y + root.h / 2 };
    const goalLeft  = { x: goalMet.x,        y: goalMet.y + goalMet.h / 2 };
    const pltLeft   = { x: branchPlt.x,      y: branchPlt.y + branchPlt.h / 2 };
    const cryLeft   = { x: branchCry.x,      y: branchCry.y + branchCry.h / 2 };

    const goalActive    = path === 'goal-met';
    const platelets     = path.startsWith('platelets-');
    const cryo          = path.startsWith('cryo-');

    return (
        <svg viewBox="0 0 720 380" className="w-full h-auto" role="img" aria-label="Post-CPB ROTEM decision tree">
            {/* Root: A10 EXTEM */}
            <Node {...root}
                title={`A10 EXTEM`}
                sub={`${a10extem} mm`}
                active
            />

            {/* Edge to goal-met (≥ 38 mm) */}
            <Edge from={rootRight} to={goalLeft} label="≥ 38 mm" active={goalActive} dim={!goalActive} />
            <Node {...goalMet}
                title="Goal met"
                sub="No intervention"
                accent="emerald"
                active={goalActive}
                dim={!goalActive}
            />

            {/* Edge to platelet branch (< 38 + FIBTEM ≥ 9) */}
            <Edge from={rootRight} to={pltLeft} label="< 38 mm + FIBTEM ≥ 9" active={platelets} dim={!platelets && !cryo} />
            <Node {...branchPlt}
                title="Transfuse Platelets"
                sub={`A10 FIBTEM ${a10fibtem} mm ≥ 9`}
                accent="teal"
                active={platelets}
                dim={!platelets}
            />

            {/* Platelet sub-branches (sized by A10 EXTEM) */}
            {pltOpts.map(o => (
                <React.Fragment key={o.key}>
                    <Edge
                        from={{ x: branchPlt.x + branchPlt.w, y: branchPlt.y + branchPlt.h / 2 }}
                        to={{ x: o.x, y: o.y + o.h / 2 }}
                        active={platelets && path === o.key}
                        dim={!platelets || path !== o.key}
                    />
                    <Node {...o} accent="teal" active={platelets && path === o.key} dim={!platelets || path !== o.key} />
                </React.Fragment>
            ))}

            {/* Edge to cryo branch (< 38 + FIBTEM < 9) */}
            <Edge from={rootRight} to={cryLeft} label="< 38 mm + FIBTEM < 9" active={cryo} dim={!cryo && !platelets} />
            <Node {...branchCry}
                title="Transfuse Cryo"
                sub={`A10 FIBTEM ${a10fibtem} mm < 9`}
                accent="rose"
                active={cryo}
                dim={!cryo}
            />

            {/* Cryo sub-branches */}
            {cryoOpts.map(o => (
                <React.Fragment key={o.key}>
                    <Edge
                        from={{ x: branchCry.x + branchCry.w, y: branchCry.y + branchCry.h / 2 }}
                        to={{ x: o.x, y: o.y + o.h / 2 }}
                        active={cryo && path === o.key}
                        dim={!cryo || path !== o.key}
                    />
                    <Node {...o} accent="rose" active={cryo && path === o.key} dim={!cryo || path !== o.key} />
                </React.Fragment>
            ))}
        </svg>
    );
};

// ---------------------------------------------------------------------------
// CPB phase decision tree (linear ladder of 3 independent decisions, since
// the three deficits are evaluated in parallel rather than as a tree).
// Visualised as 3 stacked rows that activate independently.
// ---------------------------------------------------------------------------

export const CpbDecisionLadder = ({ heptemCT, heptemCFT, heptemMCF, fibtemMCF }) => {
    const kcentraTriggered = heptemCT > 240 || heptemCFT > 110;
    const plateletTriggered = heptemMCF < 50;
    const plateletPerKg = plateletTriggered
        ? (heptemMCF >= 40 ? 20 : heptemMCF >= 30 ? 30 : 40)
        : null;
    const cryoTriggered = fibtemMCF < 9;
    const cryoUnits = cryoTriggered ? (fibtemMCF >= 8 ? 1 : fibtemMCF >= 7 ? 2 : 3) : null;

    return (
        <svg viewBox="0 0 720 320" className="w-full h-auto" role="img" aria-label="CPB ROTEM decision ladder">
            {/* Row 1 — Kcentra */}
            <Node x={20}  y={30} w={210} h={56}
                title="HEPTEM CT / CFT"
                sub={`CT ${heptemCT}s • CFT ${heptemCFT}s`}
                active
            />
            <Edge
                from={{ x: 230, y: 58 }}
                to={{ x: 270, y: 58 }}
                active={kcentraTriggered}
                dim={!kcentraTriggered}
                label={kcentraTriggered ? 'over' : '— ok —'}
            />
            <Node x={270} y={30} w={200} h={56}
                title="Kcentra (4F-PCC)"
                sub={kcentraTriggered ? '20 U/kg' : 'not triggered'}
                accent="rose"
                active={kcentraTriggered}
                dim={!kcentraTriggered}
            />
            <Node x={500} y={30} w={200} h={56}
                title="Trigger thresholds"
                sub="CT > 240 sec OR CFT > 110 sec"
                accent="slate"
                dim
            />

            {/* Row 2 — Platelets */}
            <Node x={20}  y={130} w={210} h={56}
                title="HEPTEM MCF"
                sub={`${heptemMCF} mm (goal > 50)`}
                active
            />
            <Edge
                from={{ x: 230, y: 158 }}
                to={{ x: 270, y: 158 }}
                active={plateletTriggered}
                dim={!plateletTriggered}
                label={plateletTriggered ? '< 50' : '— ok —'}
            />
            <Node x={270} y={130} w={200} h={56}
                title="Platelets"
                sub={plateletTriggered ? `${plateletPerKg} mL/kg` : 'not triggered'}
                accent="teal"
                active={plateletTriggered}
                dim={!plateletTriggered}
            />
            <Node x={500} y={130} w={200} h={56}
                title="Dose ladder"
                sub="40-50 → 20 / 30-40 → 30 / < 30 → 40 mL/kg"
                accent="slate"
                dim
            />

            {/* Row 3 — Cryo */}
            <Node x={20}  y={230} w={210} h={56}
                title="FIBTEM MCF"
                sub={`${fibtemMCF} mm (goal > 9)`}
                active
            />
            <Edge
                from={{ x: 230, y: 258 }}
                to={{ x: 270, y: 258 }}
                active={cryoTriggered}
                dim={!cryoTriggered}
                label={cryoTriggered ? '< 9' : '— ok —'}
            />
            <Node x={270} y={230} w={200} h={56}
                title="Cryoprecipitate"
                sub={cryoTriggered ? `${cryoUnits} unit${cryoUnits > 1 ? 's' : ''}` : 'not triggered'}
                accent="rose"
                active={cryoTriggered}
                dim={!cryoTriggered}
            />
            <Node x={500} y={230} w={200} h={56}
                title="Dose ladder"
                sub="8-9 → 1 / 7-8 → 2 / < 7 → 3 units"
                accent="slate"
                dim
            />
        </svg>
    );
};
