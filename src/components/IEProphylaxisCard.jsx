import React from 'react';
import { ShieldCheck, Heart, AlertTriangle } from 'lucide-react';
import { ieHighRiskConditions, ieIndicatedProcedures, ieNotIndicated, ieRegimens } from '../data/ie_prophylaxis';
import { usePatient } from '../context/PatientContext';
import { fmt } from '../utils/calc';

// Compute mg dose, capped if max provided. Max strings like "2 g" / "600 mg" / "1 g (IE max)" are parsed.
const parseMaxMg = (maxStr) => {
    if (!maxStr) return null;
    const m = String(maxStr).match(/(\d+(\.\d+)?)\s*(g|mg)?/i);
    if (!m) return null;
    let v = parseFloat(m[1]);
    if (m[3] && m[3].toLowerCase() === 'g') v *= 1000;
    return v;
};

const calc = (w, doseStr, maxStr) => {
    const m = doseStr.match(/(\d+(\.\d+)?)/);
    if (!m) return '-';
    const perKg = parseFloat(m[1]);
    let v = perKg * w;
    const cap = parseMaxMg(maxStr);
    if (cap && v > cap) return `${fmt(cap)} mg (cap ${maxStr})`;
    return `${fmt(v)} mg`;
};

const IEProphylaxisCard = () => {
    const { weight, isNeonate } = usePatient();
    const w = parseFloat(weight) || 0;

    return (
        <div className="space-y-4">
            <div className="bg-sky-600 text-white p-4 rounded-lg shadow-lg flex items-center gap-3">
                <ShieldCheck size={28} />
                <div className="flex-1">
                    <h2 className="text-xl font-black">Infective Endocarditis Prophylaxis</h2>
                    <p className="text-sky-100 text-xs">AHA 2007 — give 30-60 min before procedure</p>
                </div>
            </div>

            {isNeonate && (
                <div className="bg-amber-50 border border-amber-300 p-3 rounded text-amber-900 text-xs flex items-start gap-2">
                    <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
                    <span>Patient is a neonate. <b>Ceftriaxone is contraindicated under 30 days of age.</b></span>
                </div>
            )}

            {/* High-risk conditions */}
            <div className="bg-white border border-slate-200 rounded-lg p-4">
                <h3 className="font-bold text-sky-800 flex items-center gap-2 border-b border-sky-100 pb-2 mb-2">
                    <Heart size={18} /> High-risk cardiac conditions (prophylaxis is reasonable)
                </h3>
                <ul className="text-sm text-slate-700 list-disc pl-5 space-y-1">
                    {ieHighRiskConditions.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
            </div>

            {/* Indicated procedures */}
            <div className="bg-white border border-slate-200 rounded-lg p-4">
                <h3 className="font-bold text-sky-800 border-b border-sky-100 pb-2 mb-2">Procedures that warrant prophylaxis</h3>
                <ul className="text-sm text-slate-700 list-disc pl-5 space-y-1">
                    {ieIndicatedProcedures.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
                <div className="mt-2 text-xs text-rose-700 border-t pt-2">
                    {ieNotIndicated.map((t, i) => <div key={i}>⚠ {t}</div>)}
                </div>
            </div>

            {/* Regimens */}
            <div className="space-y-3">
                {ieRegimens.map((r, i) => (
                    <div key={i} className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                        <div className="bg-sky-50 px-3 py-2 border-b border-sky-100">
                            <h4 className="font-bold text-sky-800">{r.scenario}</h4>
                        </div>
                        <table className="w-full text-sm">
                            <thead className="bg-slate-50 text-[10px] uppercase text-slate-500 font-bold">
                                <tr>
                                    <th className="text-left py-1 pl-3">Drug</th>
                                    <th className="text-left py-1">Dose</th>
                                    <th className="text-left py-1">Max</th>
                                    <th className="text-right py-1 pr-3">Calc ({fmt(w)} kg)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {r.rows.map((row, j) => (
                                    <tr key={j} className="border-t border-slate-100">
                                        <td className="py-1.5 pl-3 font-bold text-slate-800">{row.drug}</td>
                                        <td className="py-1.5 text-slate-600">{row.dose}</td>
                                        <td className="py-1.5 text-slate-500 text-xs">{row.max}</td>
                                        <td className="py-1.5 pr-3 text-right font-bold text-sky-700">{calc(w, row.dose, row.max)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IEProphylaxisCard;
