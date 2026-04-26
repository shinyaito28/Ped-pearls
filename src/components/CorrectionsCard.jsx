import React, { useState } from 'react';
import { Activity, Zap, AlertTriangle, Calculator, Ruler } from 'lucide-react';
import { useCorrectionCalc } from '../hooks/useCorrectionCalc';
import { usePatient } from '../context/PatientContext';
import { useLanguage } from '../context/LanguageContext';
import { fmt } from '../utils/calc';
import { getVitals } from '../data/vitals';

const CorrectionsCard = () => {
    const { weight, ageYears, isNeonate, idealWeight } = usePatient();
    const { t } = useLanguage();
    const w = parseFloat(weight);
    const [baseDeficit, setBaseDeficit] = useState(5); // Positive number representing deficit

    const {
        bicarb, d25, d10, kLow, kHigh,
        hyperKCalc, hyperKBicarb, hyperKInsulin, hyperKGluc
    } = useCorrectionCalc(-baseDeficit); // Pass as negative BE

    const v = getVitals(ageYears, isNeonate);

    // Derived values
    const idealW = idealWeight ? idealWeight.toFixed(1) : '-';

    return (
        <div className="space-y-4">
            {/* Patient Stats: IBW / Vitals */}
            <div className="bg-white border border-slate-200 p-4 rounded shadow-sm">
                <h3 className="font-bold text-slate-700 mb-2 flex items-center gap-2"><Ruler size={18} /> {t('Patient Physiology', '患者生理')}</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                    <div className="bg-slate-50 p-2 rounded text-center border border-slate-100">
                        <div className="text-[10px] text-slate-400 font-bold uppercase">{t('Ideal Wt', '理想体重')}</div>
                        <div className="text-xl font-bold text-slate-700">{idealW} <span className="text-xs text-slate-400">kg</span></div>
                        <div className="text-[9px] text-teal-600 font-medium">{t('50th %ile', '50 パーセンタイル')}</div>
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
                        <div className="text-[10px] text-slate-400 font-bold uppercase">{t('SBP (Hypo)', 'SBP (低血圧域)')}</div>
                        <div className="text-lg font-bold text-rose-600">{v.sbp}</div>
                        <div className="text-[9px] text-slate-400">{t('Hypotension Limit', '低血圧閾値')}</div>
                    </div>
                </div>
            </div>
            {/* Hypoglycemia */}
            <div className="bg-white border border-slate-200 p-4 rounded shadow-sm">
                <h3 className="font-bold text-slate-700 mb-2 flex items-center gap-2"><Zap size={18} /> {t('Hypoglycemia', '低血糖')}</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-yellow-50 p-2 rounded">
                        <div className="text-xs font-bold text-yellow-800">{t('Child (Dextrose 25%)', '小児 (Dextrose 25%)')}</div>
                        <div className="text-xl font-bold">{fmt(d25)} mL</div>
                        <div className="text-[9px] text-slate-400 font-mono">{w}kg × 2 mL/kg</div>
                    </div>
                    <div className="bg-yellow-50 p-2 rounded">
                        <div className="text-xs font-bold text-yellow-800">{t('Neonate (Dextrose 10%)', '新生児 (Dextrose 10%)')}</div>
                        <div className="text-xl font-bold">{fmt(d10)} mL</div>
                        <div className="text-[9px] text-slate-400 font-mono">{w}kg × 4 mL/kg</div>
                    </div>
                </div>
            </div>
            {/* Hypokalemia */}
            <div className="bg-white border border-slate-200 p-4 rounded shadow-sm">
                <h3 className="font-bold text-slate-700 mb-2 flex items-center gap-2"><Activity size={18} /> {t('Hypokalemia (Low K)', '低 K 血症 (Low K)')}</h3>
                <div className="bg-orange-50 p-2 rounded flex justify-between items-center">
                    <div>
                        <span className="text-sm font-bold text-orange-800">{t('Potassium Chloride', '塩化カリウム')}</span>
                        <div className="text-[9px] text-orange-600 font-mono">{w}kg × (0.5 - 1) mEq</div>
                    </div>
                    <span className="text-xl font-bold text-orange-700">{fmt(kLow)} - {fmt(kHigh)} mEq</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1">{t('Give slow over 1-2 hours.', '1-2 時間かけて緩徐投与。')}</div>
            </div>
            {/* Hyperkalemia */}
            <div className="bg-white p-4 rounded border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-700 mb-2 flex items-center gap-2"><AlertTriangle size={18} /> {t('Hyperkalemia (High K)', '高 K 血症 (High K)')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                    <div className="bg-slate-50 p-2 rounded">
                        <div className="text-xs text-slate-500">{t('1. Calcium Gluconate', '1. グルコン酸カルシウム')}</div>
                        <div className="font-bold text-slate-800">{fmt(hyperKCalc)} mg</div>
                        <div className="text-[9px] text-slate-400 font-mono">{w} × 50mg</div>
                    </div>
                    <div className="bg-slate-50 p-2 rounded">
                        <div className="text-xs text-slate-500">{t('2. Sodium Bicarbonate', '2. 重炭酸ナトリウム')}</div>
                        <div className="font-bold text-slate-800">{fmt(hyperKBicarb)} mEq</div>
                        <div className="text-[9px] text-slate-400 font-mono">{w} × 1mEq</div>
                    </div>
                    <div className="bg-slate-50 p-2 rounded">
                        <div className="text-xs text-slate-500">{t('3. Insulin + D25%', '3. インスリン + D25%')}</div>
                        <div className="font-bold text-slate-800">{fmt(hyperKInsulin)} U + {fmt(hyperKGluc)}mL</div>
                        <div className="text-[9px] text-slate-400 font-mono">0.1U/kg + 2ml/kg</div>
                    </div>
                </div>
            </div>
            {/* Acidosis */}
            <div className="bg-white p-4 rounded border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-700 mb-2 flex items-center gap-2"><Calculator size={18} /> {t('Metabolic Acidosis', '代謝性アシドーシス')}</h3>
                <div className="flex items-center gap-2 mb-2">
                    <label className="text-xs font-bold text-slate-600">{t('Base Excess:', 'Base Excess:')}</label>
                    <div className="flex items-center border rounded bg-slate-50 overflow-hidden">
                        <span className="px-2 text-slate-500 font-bold border-r bg-slate-100">-</span>
                        <input type="number" value={baseDeficit} onChange={e => setBaseDeficit(Math.max(0, parseFloat(e.target.value)))} className="w-16 p-1 text-center font-bold outline-none" min="0" />
                    </div>
                </div>
                <div className="bg-rose-50 p-2 rounded flex justify-between">
                    <div>
                        <span className="text-sm font-bold text-rose-800">{t('Sodium Bicarbonate (Full)', '重炭酸ナトリウム(完全補正)')}</span>
                        <div className="text-[9px] text-rose-500 font-mono">{w}kg × {baseDeficit} × 0.3</div>
                    </div>
                    <span className="text-xl font-bold text-rose-700">{fmt(bicarb)} mEq</span>
                </div>
            </div>
        </div>
    );
};

export default CorrectionsCard;
