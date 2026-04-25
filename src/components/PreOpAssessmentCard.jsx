import React, { useState, useMemo } from 'react';
import { ClipboardCheck, Copy, Check } from 'lucide-react';
import { asaPSClasses, apfelFactors, povocFactors, povocRisk, cormackLehaneGrades } from '../data/npo_guidelines';

const PreOpAssessmentCard = () => {
    const [asaPS, setAsaPS] = useState(null);
    const [emergency, setEmergency] = useState(false);
    const [povoc, setPovoc] = useState({});
    const [clGrade, setClGrade] = useState(null);
    const [copied, setCopied] = useState(false);

    const povocCount = Object.values(povoc).filter(Boolean).length;
    const povocPercent = povocRisk[povocCount];

    // Compose a single-line handoff summary that the user can paste into the chart.
    const summary = useMemo(() => {
        const parts = [];
        if (asaPS) parts.push(`ASA-PS ${asaPS.id}${emergency ? 'E' : ''} (${asaPS.tag})`);
        parts.push(`POVOC ${povocCount}/4 → ~${povocPercent}% risk`);
        if (clGrade) parts.push(`Cormack-Lehane ${clGrade.id} (${clGrade.desc.split('.')[0]})`);
        return parts.join(' • ');
    }, [asaPS, emergency, povocCount, povocPercent, clGrade]);

    const copySummary = () => {
        navigator.clipboard?.writeText(summary).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 space-y-5">
            <h3 className="font-bold text-indigo-700 flex items-center gap-2 border-b border-slate-200 pb-2">
                <ClipboardCheck size={18} /> Pre-op Assessment
            </h3>

            {/* ASA-PS */}
            <section>
                <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wide mb-2">ASA Physical Status</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-2">
                    {asaPSClasses.map(c => (
                        <button
                            key={c.id}
                            onClick={() => setAsaPS(c)}
                            className={`text-left p-2 rounded-lg border-2 transition-colors ${asaPS?.id === c.id ? `border-${c.accent}-500 bg-${c.accent}-50` : 'border-slate-200 bg-slate-50 hover:border-slate-300'}`}
                        >
                            <div className={`font-bold text-${c.accent}-700`}>{c.label}</div>
                            <div className="text-[10px] text-slate-600 mt-0.5">{c.tag}</div>
                        </button>
                    ))}
                </div>
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input type="checkbox" checked={emergency} onChange={e => setEmergency(e.target.checked)} className="w-4 h-4 accent-rose-500" />
                    <span className="font-bold text-rose-600">E — Emergency surgery</span>
                </label>
                {asaPS && <div className="text-[11px] text-slate-500 mt-1 italic">{asaPS.desc}</div>}
            </section>

            {/* POVOC */}
            <section>
                <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wide mb-2">POVOC score (pediatric PONV — Eberhart)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                    {povocFactors.map(f => (
                        <label key={f.id} className="flex items-start gap-2 cursor-pointer bg-slate-50 border border-slate-200 rounded-lg p-2 hover:border-slate-300">
                            <input
                                type="checkbox"
                                checked={!!povoc[f.id]}
                                onChange={e => setPovoc(prev => ({ ...prev, [f.id]: e.target.checked }))}
                                className="w-4 h-4 mt-0.5 accent-indigo-500"
                            />
                            <div className="text-sm">
                                <div className="font-bold text-slate-800">{f.label}</div>
                                {f.detail && <div className="text-[10px] text-slate-500">{f.detail}</div>}
                            </div>
                        </label>
                    ))}
                </div>
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-2 flex justify-between items-center">
                    <div>
                        <div className="text-[10px] uppercase font-bold text-indigo-700">Score</div>
                        <div className="text-xl font-black text-indigo-800">{povocCount} / 4</div>
                    </div>
                    <div className="text-right">
                        <div className="text-[10px] uppercase font-bold text-indigo-700">PONV risk</div>
                        <div className="text-xl font-black text-indigo-800">~{povocPercent}%</div>
                    </div>
                </div>
                {povocCount >= 2 && (
                    <div className="text-xs text-amber-800 mt-2">Consider multimodal PONV prophylaxis (dexamethasone + ondansetron ± droperidol).</div>
                )}
            </section>

            {/* Cormack-Lehane */}
            <section>
                <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wide mb-2">Cormack-Lehane grade (record after laryngoscopy)</h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {cormackLehaneGrades.map(g => (
                        <button
                            key={g.id}
                            onClick={() => setClGrade(g)}
                            className={`p-2 rounded-lg border-2 transition-colors text-center ${clGrade?.id === g.id ? `border-${g.accent}-500 bg-${g.accent}-50` : 'border-slate-200 bg-slate-50 hover:border-slate-300'}`}
                        >
                            <div className={`font-bold text-${g.accent}-700`}>{g.label}</div>
                        </button>
                    ))}
                </div>
                {clGrade && <div className="text-[11px] text-slate-500 mt-1 italic">{clGrade.desc}</div>}
            </section>

            {/* Summary */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                <div className="flex justify-between items-center gap-2 mb-1">
                    <div className="text-[10px] uppercase font-bold text-slate-500">Handoff summary</div>
                    <button
                        onClick={copySummary}
                        disabled={!summary}
                        className="flex items-center gap-1 text-xs bg-white border border-slate-200 rounded-md px-2 py-1 hover:border-teal-400 disabled:opacity-50"
                    >
                        {copied ? <Check size={12} /> : <Copy size={12} />}
                        {copied ? 'Copied' : 'Copy'}
                    </button>
                </div>
                <div className="text-sm font-mono text-slate-700">{summary || 'Make selections above to build a summary line.'}</div>
            </div>
        </div>
    );
};

export default PreOpAssessmentCard;
