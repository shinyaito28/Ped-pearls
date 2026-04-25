import React, { useState, useMemo } from 'react';
import { HeartPulse, Activity, Droplet, Copy, Check, AlertTriangle, Info } from 'lucide-react';
import { usePatient } from '../context/PatientContext';
import { useRotemCpb, useRotemPostCpb } from '../hooks/useRotemCalc';
import { preparation, cpbInputs, postCpbInputs } from '../data/rotem_protocol';
import { CpbDecisionLadder, PostCpbDecisionTree } from './RotemDecisionTree';
import { fmt } from '../utils/calc';

// ---------------------------------------------------------------------------
// Slider with threshold markers — a number input + range slider that turn rose
// when the value crosses a clinical threshold ('over' = bad if over, 'under' =
// bad if under). The threshold bar color follows the same convention.
// ---------------------------------------------------------------------------

const ThresholdSlider = ({ spec, value, onChange }) => {
    const t = spec.thresholds[0];
    const isBad = t.direction === 'over' ? value > t.at : value < t.at;
    const accent = isBad ? 'rose' : 'emerald';
    const trackBg = isBad ? 'bg-rose-100' : 'bg-emerald-100';
    const fillBg  = isBad ? 'bg-rose-500' : 'bg-emerald-500';

    // Marker position as a percentage of the slider range.
    const markerPct = ((t.at - spec.min) / (spec.max - spec.min)) * 100;
    const valuePct  = ((value  - spec.min) / (spec.max - spec.min)) * 100;

    return (
        <div className="space-y-1">
            <div className="flex items-baseline justify-between">
                <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wide">
                    {spec.label}
                </label>
                <div className="flex items-center gap-1">
                    <input
                        type="number"
                        value={value}
                        min={spec.min}
                        max={spec.max}
                        step={spec.step}
                        onChange={e => onChange(parseFloat(e.target.value) || 0)}
                        className={`w-20 bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-right font-bold text-sm
                            focus:border-${accent}-500 focus:outline-none`}
                    />
                    <span className="text-[10px] text-slate-500 font-mono w-8">{spec.unit}</span>
                </div>
            </div>

            <div className="relative h-2 rounded-full overflow-hidden">
                <div className={`absolute inset-0 ${trackBg}`} />
                <div className={`absolute top-0 left-0 h-full ${fillBg} transition-all`}
                     style={{ width: `${Math.min(Math.max(valuePct, 0), 100)}%` }} />
                <div className="absolute top-[-2px] bottom-[-2px] w-px bg-slate-700"
                     style={{ left: `${markerPct}%` }} title={`Threshold: ${t.at} ${spec.unit}`} />
            </div>

            <input
                type="range"
                value={value}
                min={spec.min}
                max={spec.max}
                step={spec.step}
                onChange={e => onChange(parseFloat(e.target.value))}
                className="w-full h-1 cursor-pointer accent-rose-500"
                aria-label={spec.label}
            />

            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>{spec.min}</span>
                <span className={isBad ? 'text-rose-600 font-bold' : 'text-emerald-600 font-bold'}>
                    Threshold {t.at}{spec.unit} — {t.meaning}
                </span>
                <span>{spec.max}</span>
            </div>
        </div>
    );
};

// ---------------------------------------------------------------------------
// Recommendation card — one per active recommendation
// ---------------------------------------------------------------------------

const RecBlock = ({ rec, weight }) => {
    const accent = rec.severity === 'high' ? 'rose' : 'amber';

    // Display rules:
    //   - Volume products (Kcentra, Platelets, FFP) → show total mL/U
    //   - Unit products (Cryo) → show units regardless of weight
    const showWeightWarning = !weight && rec.unit !== 'units';

    return (
        <div className={`bg-${accent}-50 border-2 border-${accent}-300 rounded-2xl p-3`}>
            <div className="flex items-baseline justify-between gap-2">
                <div>
                    <div className={`text-[10px] uppercase font-bold tracking-wide text-${accent}-700`}>
                        {rec.severity === 'high' ? 'Critical' : 'Order'}
                    </div>
                    <div className={`text-base font-bold text-${accent}-900`}>{rec.product}</div>
                </div>
                <div className="text-right">
                    <div className={`text-2xl font-black text-${accent}-800`}>
                        {showWeightWarning ? '—' : fmt(rec.total)}
                        <span className="text-sm font-bold ml-1">{rec.unit}</span>
                    </div>
                    <div className="text-[10px] text-slate-600 font-mono">{rec.dose}</div>
                </div>
            </div>
            <div className="text-[11px] text-slate-600 mt-2 italic">{rec.reason}</div>
            {showWeightWarning && (
                <div className="text-[10px] text-rose-700 mt-1">Enter a positive weight to compute the total volume.</div>
            )}
        </div>
    );
};

// ---------------------------------------------------------------------------
// Main card
// ---------------------------------------------------------------------------

const CardiacRotemCard = () => {
    const { weight } = usePatient();
    const w = parseFloat(weight) || 0;

    const [phase, setPhase] = useState('cpb'); // 'cpb' | 'postcpb'
    const [copied, setCopied] = useState(false);

    // CPB inputs
    const [cpb, setCpb] = useState(() =>
        Object.fromEntries(cpbInputs.map(i => [i.id, i.default]))
    );
    // Post-CPB inputs
    const [postcpb, setPostcpb] = useState(() =>
        Object.fromEntries(postCpbInputs.map(i => [i.id, i.default]))
    );

    const cpbRecs = useRotemCpb(cpb);
    const postCpbRecs = useRotemPostCpb(postcpb);
    const recs = phase === 'cpb' ? cpbRecs : postCpbRecs;

    // Preparation calculation
    const ffpVolPerOrder = w * 20;
    const ffpVolTotal = ffpVolPerOrder * 2;

    const copySummary = () => {
        if (recs.length === 0) {
            const text = `${phase === 'cpb' ? 'CPB' : 'Post-CPB'} ROTEM (${fmt(w)} kg) — all values within goal, no products required.`;
            navigator.clipboard?.writeText(text).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
            return;
        }
        const lines = [
            `${phase === 'cpb' ? 'CPB' : 'Post-CPB'} ROTEM recommendations (${fmt(w)} kg):`,
            ...recs.map(r => `• ${r.product}: ${r.dose} = ${fmt(r.total)} ${r.unit}  [${r.reason}]`)
        ];
        navigator.clipboard?.writeText(lines.join('\n')).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const inputsForPhase = phase === 'cpb' ? cpbInputs : postCpbInputs;
    const valuesForPhase = phase === 'cpb' ? cpb : postcpb;
    const setForPhase    = phase === 'cpb' ? setCpb : setPostcpb;

    return (
        <div className="space-y-4 pb-8">
            {/* Header */}
            <div className="bg-rose-600 text-white p-4 rounded-2xl shadow-lg flex items-center gap-3">
                <HeartPulse size={32} />
                <div className="flex-1">
                    <h2 className="text-lg font-black">Post-Bypass ROTEM Guidance</h2>
                    <p className="text-rose-100 text-xs">Neonatal cardiac surgery — institutional protocol</p>
                </div>
            </div>

            {/* Preparation panel */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4">
                <h3 className="font-bold text-rose-800 flex items-center gap-2 border-b border-slate-200 pb-2 mb-3">
                    <Droplet size={18} /> Preparation (before bypass)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    {preparation.map((p, i) => (
                        <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                            <div className="font-bold text-slate-800">{p.item}</div>
                            <div className="text-xs text-slate-600">{p.detail}</div>
                            {p.item === 'FFP' && w > 0 && (
                                <div className="mt-1 text-[11px] text-rose-700 font-mono">
                                    @ {fmt(w)} kg → {fmt(ffpVolPerOrder)} mL × 2 orders ={' '}
                                    <b>{fmt(ffpVolTotal)} mL</b> total
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Phase toggle */}
            <div className="flex bg-slate-100 rounded-xl p-1">
                {[
                    { id: 'cpb',     label: 'CPB ROTEM',      sub: 'rewarm + after 2nd FFP',          icon: Activity },
                    { id: 'postcpb', label: 'Post-CPB ROTEM', sub: 'after protamine + products + ANH', icon: HeartPulse }
                ].map(p => {
                    const Icon = p.icon;
                    const isActive = phase === p.id;
                    return (
                        <button
                            key={p.id}
                            onClick={() => setPhase(p.id)}
                            className={`flex-1 py-2.5 px-3 rounded-lg transition-all ${isActive ? 'bg-white shadow-sm ring-2 ring-rose-500' : 'hover:bg-slate-50'}`}
                        >
                            <div className={`flex items-center justify-center gap-2 ${isActive ? 'text-rose-700' : 'text-slate-500'}`}>
                                <Icon size={16} />
                                <span className="text-sm font-bold">{p.label}</span>
                            </div>
                            <div className="text-[10px] text-slate-500 mt-0.5">{p.sub}</div>
                        </button>
                    );
                })}
            </div>

            {/* Inputs */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4">
                <h3 className="font-bold text-slate-700 flex items-center gap-2 border-b border-slate-200 pb-2 mb-3">
                    <Activity size={18} /> ROTEM values — {phase === 'cpb' ? 'HEPTEM + FIBTEM' : 'EXTEM + FIBTEM'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    {inputsForPhase.map(spec => (
                        <ThresholdSlider
                            key={spec.id}
                            spec={spec}
                            value={valuesForPhase[spec.id]}
                            onChange={(v) => setForPhase(prev => ({ ...prev, [spec.id]: v }))}
                        />
                    ))}
                </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
                    <h3 className="font-bold text-rose-800 flex items-center gap-2">
                        <AlertTriangle size={18} /> Recommended products
                    </h3>
                    <button
                        onClick={copySummary}
                        className="text-xs bg-slate-50 border border-slate-200 rounded-md px-2 py-1 hover:border-teal-400 flex items-center gap-1"
                    >
                        {copied ? <Check size={12} /> : <Copy size={12} />}
                        {copied ? 'Copied' : 'Copy summary'}
                    </button>
                </div>

                {recs.length === 0 ? (
                    <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 flex items-center gap-3">
                        <Check size={28} className="text-emerald-600 flex-shrink-0" />
                        <div>
                            <div className="font-bold text-emerald-800">All values within goal</div>
                            <div className="text-xs text-emerald-700">No products required at this time.</div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {recs.map((r, i) => (
                            <RecBlock key={i} rec={r} weight={w} />
                        ))}
                    </div>
                )}
            </div>

            {/* Decision tree */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4">
                <h3 className="font-bold text-slate-700 flex items-center gap-2 border-b border-slate-200 pb-2 mb-3">
                    <HeartPulse size={18} className="text-rose-600" /> Decision tree
                </h3>
                <div className="overflow-x-auto">
                    {phase === 'cpb' ? (
                        <CpbDecisionLadder {...cpb} />
                    ) : (
                        <PostCpbDecisionTree a10extem={postcpb.a10extem} a10fibtem={postcpb.a10fibtem} />
                    )}
                </div>
            </div>

            {/* Footnote */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-start gap-2 text-[11px] text-slate-600">
                <Info size={14} className="flex-shrink-0 mt-0.5 text-slate-400" />
                <div>
                    Source: institutional <i>Anesthesia Guide to Blood Product Management for Post-Bypass Bleeding in Neonates</i>.
                    The Post-CPB tree treats <b>A10 EXTEM ≥ 38 mm as the goal</b> — values below this trigger the platelet vs cryoprecipitate branch
                    based on A10 FIBTEM. Always verify with current institutional protocol and clinical judgement.
                </div>
            </div>
        </div>
    );
};

export default CardiacRotemCard;
