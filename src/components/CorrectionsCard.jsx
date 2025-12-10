import React, { useState } from 'react';
import { Activity, Zap, AlertTriangle, Calculator, Ruler } from 'lucide-react';
import { useCorrectionCalc } from '../hooks/useCorrectionCalc';
import { usePatient } from '../context/PatientContext';
import { fmt } from '../utils/calc';
import { getVitals } from '../data/vitals';

const CorrectionsCard = () => {
    const { weight, ageYears, isNeonate, idealWeight } = usePatient();
    const w = parseFloat(weight);
    const [baseDeficit, setBaseDeficit] = useState(5); // Positive number representing deficit

    const {
        bicarb, d25, d10, kLow, kHigh,
        hyperKCalc, hyperKBicarb, hyperKInsulin, hyperKGluc
    } = useCorrectionCalc(-baseDeficit); // Pass as negative BE

    const v = getVitals(ageYears, isNeonate);

    // Derived values
    const currentWeight = parseFloat(weight);
    const idealW = idealWeight ? idealWeight.toFixed(1) : '-';
    // const leanW = ... (Placeholder for future)

    return (
        <div className="space-y-4">
            {/* Patient Stats: IBW / Vitals */}
            <div className="bg-white border border-slate-200 p-4 rounded shadow-sm">
                <h3 className="font-bold text-slate-700 mb-2 flex items-center gap-2"><Ruler size={18} /> Patient Physiology</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                    <div className="bg-slate-50 p-2 rounded text-center border border-slate-100">
                        <div className="text-[10px] text-slate-400 font-bold uppercase">Ideal Wt</div>
                        <div className="text-xl font-bold text-slate-700">{idealW} <span className="text-xs text-slate-400">kg</span></div>
                        <div className="text-[9px] text-teal-600 font-medium">50th %ile</div>
                    </div>
                    <div className="bg-slate-50 p-2 rounded text-center border border-slate-100">
                        <div className="text-[10px] text-slate-400 font-bold uppercase">HR</div>
                        <div className="text-lg font-bold text-slate-700">{v.hr}</div>
                        <div className="text-[9px] text-slate-400">bpm</div>
                    </div>
                    <div className="bg-slate-50 p-2 rounded text-center border border-slate-100">
                        <div className="text-[10px] text-slate-400 font-bold uppercase">RR</div>
                        <div className="text-lg font-bold text-slate-700">{v.rr}</div>
                        <div className="text-[9px] text-slate-400">/min</div>
                    </div>
                    <div className="bg-slate-50 p-2 rounded text-center border border-slate-100">
                        <div className="text-[10px] text-slate-400 font-bold uppercase">SBP (Hypo)</div>
                        <div className="text-lg font-bold text-rose-600">{v.sbp}</div>
                        <div className="text-[9px] text-slate-400">Hypotension Limit</div>
                    </div>
                </div>
            </div>
            {/* Hypoglycemia */}
            <div className="bg-white border border-slate-200 p-4 rounded shadow-sm">
                <h3 className="font-bold text-slate-700 mb-2 flex items-center gap-2"><Zap size={18} /> Hypoglycemia</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-yellow-50 p-2 rounded">
                        <div className="text-xs font-bold text-yellow-800">Child (Dextrose 25%)</div>
                        <div className="text-xl font-bold">{fmt(d25)} mL</div>
                        <div className="text-[9px] text-slate-400 font-mono">{w}kg × 2 mL/kg</div>
                    </div>
                    <div className="bg-yellow-50 p-2 rounded">
                        <div className="text-xs font-bold text-yellow-800">Neonate (Dextrose 10%)</div>
                        <div className="text-xl font-bold">{fmt(d10)} mL</div>
                        <div className="text-[9px] text-slate-400 font-mono">{w}kg × 4 mL/kg</div>
                    </div>
                </div>
            </div>
            {/* Hypokalemia */}
            <div className="bg-white border border-slate-200 p-4 rounded shadow-sm">
                <h3 className="font-bold text-slate-700 mb-2 flex items-center gap-2"><Activity size={18} /> Hypokalemia (Low K)</h3>
                <div className="bg-orange-50 p-2 rounded flex justify-between items-center">
                    <div>
                        <span className="text-sm font-bold text-orange-800">Potassium Chloride</span>
                        <div className="text-[9px] text-orange-600 font-mono">{w}kg × (0.5 - 1) mEq</div>
                    </div>
                    <span className="text-xl font-bold text-orange-700">{fmt(kLow)} - {fmt(kHigh)} mEq</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1">Give slow over 1-2 hours.</div>
            </div>
            {/* Hyperkalemia */}
            <div className="bg-white p-4 rounded border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-700 mb-2 flex items-center gap-2"><AlertTriangle size={18} /> Hyperkalemia (High K)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                    <div className="bg-slate-50 p-2 rounded">
                        <div className="text-xs text-slate-500">1. Calcium Gluconate</div>
                        <div className="font-bold text-slate-800">{fmt(hyperKCalc)} mg</div>
                        <div className="text-[9px] text-slate-400 font-mono">{w} × 50mg</div>
                    </div>
                    <div className="bg-slate-50 p-2 rounded">
                        <div className="text-xs text-slate-500">2. Sodium Bicarbonate</div>
                        <div className="font-bold text-slate-800">{fmt(hyperKBicarb)} mEq</div>
                        <div className="text-[9px] text-slate-400 font-mono">{w} × 1mEq</div>
                    </div>
                    <div className="bg-slate-50 p-2 rounded">
                        <div className="text-xs text-slate-500">3. Insulin + D25%</div>
                        <div className="font-bold text-slate-800">{fmt(hyperKInsulin)} U + {fmt(hyperKGluc)}mL</div>
                        <div className="text-[9px] text-slate-400 font-mono">0.1U/kg + 2ml/kg</div>
                    </div>
                </div>
            </div>
            {/* Acidosis */}
            <div className="bg-white p-4 rounded border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-700 mb-2 flex items-center gap-2"><Calculator size={18} /> Metabolic Acidosis</h3>
                <div className="flex items-center gap-2 mb-2">
                    <label className="text-xs font-bold text-slate-600">Base Excess:</label>
                    <div className="flex items-center border rounded bg-slate-50 overflow-hidden">
                        <span className="px-2 text-slate-500 font-bold border-r bg-slate-100">-</span>
                        <input type="number" value={baseDeficit} onChange={e => setBaseDeficit(Math.max(0, parseFloat(e.target.value)))} className="w-16 p-1 text-center font-bold outline-none" min="0" />
                    </div>
                </div>
                <div className="bg-rose-50 p-2 rounded flex justify-between">
                    <div>
                        <span className="text-sm font-bold text-rose-800">Sodium Bicarbonate (Full)</span>
                        <div className="text-[9px] text-rose-500 font-mono">{w}kg × {baseDeficit} × 0.3</div>
                    </div>
                    <span className="text-xl font-bold text-rose-700">{fmt(bicarb)} mEq</span>
                </div>
            </div>
        </div>
    );
};

export default CorrectionsCard;
