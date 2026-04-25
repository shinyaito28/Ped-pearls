import React, { useState, useMemo, useEffect } from 'react';
import { Clock, ArrowRightLeft, Copy, Check, Pill } from 'lucide-react';
import { usePatient } from '../context/PatientContext';
import { infusionPresets, calcInfusionMlPerHr, calcDoseFromMlPerHr } from '../data/infusion_presets';
import { fmt } from '../utils/calc';

const InfusionCalcCard = () => {
    const { weight } = usePatient();
    const w = parseFloat(weight) || 0;

    const [drugIdx, setDrugIdx] = useState(0);
    const drug = infusionPresets[drugIdx];

    const [mode, setMode] = useState('dose-to-rate'); // 'dose-to-rate' | 'rate-to-dose'
    const [dose, setDose] = useState(drug.defaultDose);
    const [mlPerHr, setMlPerHr] = useState(0);
    const [concentration, setConcentration] = useState(drug.concentration);
    const [copied, setCopied] = useState(false);

    // Reset inputs when the drug preset changes.
    useEffect(() => {
        setDose(drug.defaultDose);
        setConcentration(drug.concentration);
    }, [drugIdx, drug.defaultDose, drug.concentration]);

    const computed = useMemo(() => {
        if (mode === 'dose-to-rate') {
            const ml = calcInfusionMlPerHr(parseFloat(dose), w, parseFloat(concentration), drug.unit);
            return { ml, dose: parseFloat(dose) };
        } else {
            const d = calcDoseFromMlPerHr(parseFloat(mlPerHr), w, parseFloat(concentration), drug.unit);
            return { ml: parseFloat(mlPerHr), dose: d };
        }
    }, [mode, dose, mlPerHr, w, concentration, drug.unit]);

    const inRange = computed.dose >= drug.doseRange[0] && computed.dose <= drug.doseRange[1];

    const copyResult = () => {
        const text = `${drug.drug}: ${fmt(computed.dose)} ${drug.unit} = ${fmt(computed.ml)} mL/hr (${concentration} ${drug.concUnit}, ${w} kg)`;
        navigator.clipboard?.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    // Group presets by category for the picker.
    const grouped = useMemo(() => {
        const map = {};
        infusionPresets.forEach((p, i) => {
            if (!map[p.cat]) map[p.cat] = [];
            map[p.cat].push({ ...p, idx: i });
        });
        return map;
    }, []);

    return (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 space-y-4">
            <h3 className="font-bold text-teal-700 flex items-center gap-2 border-b border-slate-200 pb-2">
                <Clock size={18} /> Infusion Pump Calculator
            </h3>

            {/* Drug picker — grouped by category */}
            <div>
                <label className="text-[10px] text-slate-500 uppercase font-bold mb-1 block">Drug</label>
                <select
                    value={drugIdx}
                    onChange={e => setDrugIdx(parseInt(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm font-bold text-slate-800"
                >
                    {Object.entries(grouped).map(([cat, list]) => (
                        <optgroup key={cat} label={cat}>
                            {list.map(p => <option key={p.idx} value={p.idx}>{p.drug}</option>)}
                        </optgroup>
                    ))}
                </select>
                <div className="text-[11px] text-slate-500 italic mt-1">{drug.note}</div>
            </div>

            {/* Direction toggle */}
            <div className="flex bg-slate-100 rounded-lg p-0.5">
                <button
                    onClick={() => setMode('dose-to-rate')}
                    className={`flex-1 text-xs font-bold py-1.5 rounded transition-colors ${mode === 'dose-to-rate' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500'}`}
                >
                    Dose → mL/hr
                </button>
                <button
                    onClick={() => setMode('rate-to-dose')}
                    className={`flex-1 text-xs font-bold py-1.5 rounded transition-colors ${mode === 'rate-to-dose' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500'}`}
                >
                    mL/hr → Dose
                </button>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mode === 'dose-to-rate' ? (
                    <div>
                        <label className="text-[10px] text-slate-500 uppercase font-bold mb-1 block">
                            Target dose ({drug.unit})
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={dose}
                            onChange={e => setDose(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-bold text-lg text-slate-800"
                        />
                        <div className="text-[10px] text-slate-500 mt-1">
                            Range: {drug.doseRange[0]} – {drug.doseRange[1]} {drug.unit}
                        </div>
                    </div>
                ) : (
                    <div>
                        <label className="text-[10px] text-slate-500 uppercase font-bold mb-1 block">Pump rate (mL/hr)</label>
                        <input
                            type="number"
                            step="0.1"
                            value={mlPerHr}
                            onChange={e => setMlPerHr(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-bold text-lg text-slate-800"
                        />
                    </div>
                )}
                <div>
                    <label className="text-[10px] text-slate-500 uppercase font-bold mb-1 block">
                        Concentration ({drug.concUnit})
                    </label>
                    <input
                        type="number"
                        step="0.1"
                        value={concentration}
                        onChange={e => setConcentration(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-bold text-lg text-slate-800"
                    />
                    <button
                        onClick={() => setConcentration(drug.concentration)}
                        className="text-[10px] text-teal-600 hover:underline mt-0.5"
                    >
                        Reset to standard ({drug.concentration} {drug.concUnit})
                    </button>
                </div>
            </div>

            {/* Result */}
            <div className={`rounded-2xl p-4 border-2 transition-colors ${inRange ? 'bg-teal-50 border-teal-200' : 'bg-amber-50 border-amber-300'}`}>
                <div className="flex justify-between items-start gap-2 mb-2">
                    <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wide">
                        For {fmt(w)} kg patient
                    </div>
                    <button
                        onClick={copyResult}
                        className="flex items-center gap-1 text-xs bg-white border border-slate-200 rounded-md px-2 py-1 hover:border-teal-400"
                        aria-label="copy"
                        disabled={!w}
                    >
                        {copied ? <Check size={12} /> : <Copy size={12} />}
                        {copied ? 'Copied' : 'Copy'}
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <div className="text-[10px] uppercase text-slate-500 font-bold">Pump rate</div>
                        <div className="text-3xl font-black text-teal-800">{fmt(computed.ml)} <span className="text-base">mL/hr</span></div>
                    </div>
                    <div className="border-l border-slate-300 pl-3">
                        <div className="text-[10px] uppercase text-slate-500 font-bold">Delivers</div>
                        <div className="text-2xl font-bold text-slate-800">{fmt(computed.dose)} <span className="text-xs">{drug.unit}</span></div>
                    </div>
                </div>

                {!inRange && computed.dose > 0 && (
                    <div className="text-xs text-amber-800 mt-2 flex items-start gap-1">
                        <ArrowRightLeft size={12} className="mt-0.5 flex-shrink-0" />
                        Dose is outside the typical range ({drug.doseRange[0]}–{drug.doseRange[1]} {drug.unit}). Verify carefully.
                    </div>
                )}
                {!w && (
                    <div className="text-xs text-rose-700 mt-2">Enter a weight in the header to compute mL/hr.</div>
                )}
            </div>

            {/* Quick reference table — common rates for this drug at this weight */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
                <div className="px-3 py-2 text-[10px] uppercase font-bold text-slate-500 tracking-wide flex items-center gap-2">
                    <Pill size={12} /> Quick reference table — {drug.drug} at {fmt(w)} kg
                </div>
                <table className="w-full text-xs">
                    <thead className="bg-slate-100">
                        <tr>
                            <th className="text-left py-1 pl-3">Dose ({drug.unit})</th>
                            <th className="text-right py-1 pr-3">Pump rate (mL/hr)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            drug.doseRange[0],
                            (drug.doseRange[0] + drug.doseRange[1]) / 2,
                            drug.doseRange[1]
                        ].map((d, i) => (
                            <tr key={i} className="border-t border-slate-200">
                                <td className="py-1.5 pl-3 font-mono">{fmt(d)}</td>
                                <td className="py-1.5 pr-3 text-right font-bold text-teal-700">
                                    {fmt(calcInfusionMlPerHr(d, w, parseFloat(concentration), drug.unit))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InfusionCalcCard;
