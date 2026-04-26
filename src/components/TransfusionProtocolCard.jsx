import React, { useState, useMemo } from 'react';
import { Droplet, AlertTriangle, ChevronDown, ChevronRight, Filter, Layers } from 'lucide-react';
import { usePatient } from '../context/PatientContext';
import { txaCaseTypes, buildTransfusionPlan } from '../data/transfusion_protocol';
import { fmt } from '../utils/calc';

const ProductRow = ({ label, p, unit = 'mL' }) => (
    <div className="flex items-center justify-between gap-2 text-sm py-1">
        <span className="font-bold text-fg">{label}</span>
        <span className="font-mono text-fg-soft text-right">
            {p.perKgLow}-{p.perKgHigh} {unit}/kg <span className="text-fg-muted">→</span> <b className="text-rose-700 dark:text-rose-300">{fmt(p.mLLow)}-{fmt(p.mLHigh)} {unit}</b>
        </span>
    </div>
);

const TransfusionProtocolCard = () => {
    const { weight } = usePatient();
    const w = parseFloat(weight) || 0;

    const [collapsed, setCollapsed] = useState(true);
    const [caseTypeId, setCaseTypeId] = useState('neonate');

    const plan = useMemo(
        () => buildTransfusionPlan({ weight, caseTypeId }),
        [weight, caseTypeId]
    );

    return (
        <div className="bg-surface border border-line rounded-2xl shadow-sm">
            <button
                onClick={() => setCollapsed(c => !c)}
                className="w-full flex items-center gap-3 p-4 border-b border-line hover:bg-surface-2/40"
                aria-expanded={!collapsed}
            >
                <div className="bg-rose-500/10 text-rose-600 dark:text-rose-400 p-2 rounded-lg">
                    <Droplet size={18} />
                </div>
                <div className="flex-1 text-left">
                    <h3 className="font-bold text-fg">Transfusion Protocol (NCH 2.0)</h3>
                    <p className="text-[11px] text-fg-muted">Recipe-based — complementary to ROTEM-driven dosing above.</p>
                </div>
                {collapsed ? <ChevronRight size={16} className="text-fg-muted" /> : <ChevronDown size={16} className="text-fg-muted" />}
            </button>

            {!collapsed && (
                <div className="p-4 space-y-4">
                    {/* Case type */}
                    <div>
                        <label className="text-[10px] uppercase font-bold text-fg-muted tracking-wide mb-1 block">Case type</label>
                        <select
                            value={caseTypeId}
                            onChange={e => setCaseTypeId(e.target.value)}
                            className="w-full bg-surface text-fg font-bold px-3 py-2 rounded-lg border border-line focus:border-rose-500 outline-none"
                        >
                            {txaCaseTypes.map(c => (
                                <option key={c.id} value={c.id}>
                                    {c.label}{c.highRisk ? ' — high-risk' : ''}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* TXA */}
                    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                        <div className="flex items-baseline justify-between gap-2 mb-1">
                            <div className="text-[11px] uppercase font-bold text-amber-800 dark:text-amber-300 tracking-wide">Tranexamic Acid</div>
                            <div className="text-2xl font-black text-amber-900 dark:text-amber-200">
                                {fmt(plan.txa.dose)} <span className="text-sm font-bold">mg</span>
                            </div>
                        </div>
                        <div className="text-[11px] text-amber-900 dark:text-amber-200">
                            {plan.txa.perKg} mg/kg{plan.txa.capped ? ` (capped at ${plan.txa.cap} mg)` : ''}
                            <ul className="list-disc list-inside mt-1 pl-1 space-y-0.5">
                                {plan.txa.timing.map((t, i) => <li key={i}>{t}</li>)}
                            </ul>
                        </div>
                    </div>

                    {/* Blood prime */}
                    {plan.prime.eligible && (
                        <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-lg p-3">
                            <div className="text-[11px] uppercase font-bold text-rose-800 dark:text-rose-300 tracking-wide mb-1">Blood prime (&lt; 3 kg)</div>
                            <div className="text-sm text-rose-900 dark:text-rose-200">
                                <div className="flex justify-between"><span>Prime FFP:</span> <b>{fmt(plan.prime.primeFFPmL)} mL</b></div>
                                <div className="flex justify-between"><span>Warming FFP:</span> <b>{fmt(plan.prime.warmingFFPmL)} mL</b></div>
                            </div>
                            <div className="text-[11px] mt-1 text-rose-800 dark:text-rose-300 italic">{plan.prime.notes}</div>
                        </div>
                    )}

                    {/* High-risk post-CPB plan */}
                    {plan.products && (
                        <div className="bg-surface-2/60 border border-line rounded-lg p-3">
                            <div className="flex items-center gap-2 text-[11px] uppercase font-bold text-fg-muted tracking-wide mb-2">
                                <Layers size={12} />
                                Post-CPB high-risk plan — {plan.products.rounds}
                            </div>
                            {w <= 0 ? (
                                <div className="text-rose-700 text-sm">Enter a positive weight to compute volumes.</div>
                            ) : (
                                <div className="divide-y divide-line">
                                    <ProductRow label="Platelets" p={plan.products.platelets} />
                                    <ProductRow label="Cryoprecipitate" p={plan.products.cryo} />
                                    <ProductRow label="FFP" p={plan.products.ffp} />
                                </div>
                            )}
                            <div className="mt-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200 text-[12px] p-2.5 rounded">
                                <b>Rescue (after round 2 with no clot):</b> {plan.products.rescueAfterRound2.product} {plan.products.rescueAfterRound2.perKgMcg} mcg/kg → <b>{fmt(plan.products.rescueAfterRound2.totalMcg)} mcg</b>
                            </div>
                        </div>
                    )}

                    {/* Filter reminders */}
                    <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200 text-[11px] p-2.5 rounded-lg">
                        <div className="font-bold flex items-center gap-1 mb-1"><Filter size={12} /> Filter rules</div>
                        <ul className="list-disc list-inside pl-2 space-y-0.5">
                            {plan.filterReminders.map((r, i) => <li key={i}>{r}</li>)}
                        </ul>
                    </div>

                    {!plan.caseType.highRisk && (
                        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-[11px] p-2.5 rounded-lg flex items-start gap-2">
                            <AlertTriangle size={12} className="flex-shrink-0 mt-0.5" />
                            <div>
                                Selected case type is <b>not classified high-risk</b>. The tier-1 NCH transfusion plan above doesn't apply directly — fall back to ROTEM-guided dosing in the card above and clinical judgement.
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TransfusionProtocolCard;
