import React from 'react';
import { Anchor, Info } from 'lucide-react';
import { useRegionalCalc } from '../hooks/useRegionalCalc';
import { usePatient } from '../context/PatientContext';
import { fmt } from '../utils/calc';

const RegionalCard = () => {
    const { weight, isNeonate, ageYears } = usePatient();
    const w = parseFloat(weight);
    const {
        landmark, cord,
        caudalMin, caudalMax, spinalMin, spinalMax, penileMin, penileMax,
        maxLido, maxLidoEpi, maxBupi, maxRopi,
        volLido1, volLidoEpi1, volBupi025, volRopi02
    } = useRegionalCalc();

    const range = (min, max) => `${fmt(min)} - ${fmt(max)}`;

    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 space-y-4">
            <h3 className="font-bold text-purple-800 flex items-center gap-2 border-b pb-2"><Anchor size={18} /> Regional Pearls</h3>

            <div className="bg-purple-50 p-3 rounded flex justify-between items-center">
                <div>
                    <div className="text-xs text-purple-600 font-bold uppercase">Landmarks ({isNeonate || ageYears < 1 ? 'Infant' : 'Child'})</div>
                    <div className="text-sm">Iliac Crest: <b>{landmark}</b></div>
                    <div className="text-sm">Cord Ends: <b>{cord}</b></div>
                </div>
                <Info size={20} className="text-purple-300" />
            </div>

            <div className="grid grid-cols-1 gap-3">
                <div className="border p-3 rounded">
                    <div className="font-bold text-sm text-slate-700">Caudal Block (Bupivacaine 0.125% - 0.25%)</div>
                    <div className="text-xl font-bold text-purple-700">{range(caudalMin, caudalMax)} mL</div>
                    <div className="text-[9px] text-slate-400 font-mono">{w}kg × (0.5 - 1.25) mL/kg</div>
                </div>
                <div className="border p-3 rounded">
                    <div className="font-bold text-sm text-slate-700">Spinal Block (Bupivacaine 0.5%)</div>
                    <div className="text-xl font-bold text-purple-700">{range(spinalMin, spinalMax)} mL</div>
                    <div className="text-[9px] text-slate-400 font-mono">{w}kg × (0.1 - 0.2) mL/kg</div>
                </div>
                <div className="border p-3 rounded">
                    <div className="font-bold text-sm text-slate-700">Penile Block (Bupivacaine 0.25% No Epi)</div>
                    <div className="text-xl font-bold text-purple-700">{range(penileMin, penileMax)} mL</div>
                    <div className="text-[9px] text-slate-400 font-mono">{w}kg × (0.5 - 1) mL/kg</div>
                </div>
            </div>

            <div className="bg-slate-50 p-3 rounded">
                <div className="text-xs font-bold text-slate-500 uppercase mb-2">Max Doses & Volumes (LAST Prevention)</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="bg-white p-2 rounded border border-slate-200">
                        <span className="block font-bold text-slate-700">Lidocaine (Plain)</span>
                        <div className="flex justify-between items-baseline">
                            <span className="text-lg font-bold text-slate-800">{fmt(maxLido)} mg</span>
                            <span className="text-xs text-slate-500">5 mg/kg</span>
                        </div>
                        <div className="text-[10px] text-purple-600 font-mono mt-1 border-t pt-1">
                            Max Vol (1%): <b>{fmt(volLido1)} mL</b>
                        </div>
                    </div>
                    <div className="bg-white p-2 rounded border border-slate-200">
                        <span className="block font-bold text-slate-700">Lidocaine (+Epinephrine)</span>
                        <div className="flex justify-between items-baseline">
                            <span className="text-lg font-bold text-slate-800">{fmt(maxLidoEpi)} mg</span>
                            <span className="text-xs text-slate-500">7 mg/kg</span>
                        </div>
                        <div className="text-[10px] text-purple-600 font-mono mt-1 border-t pt-1">
                            Max Vol (1%): <b>{fmt(volLidoEpi1)} mL</b>
                        </div>
                    </div>
                    <div className="bg-white p-2 rounded border border-slate-200">
                        <span className="block font-bold text-slate-700">Bupivacaine (0.25%)</span>
                        <div className="flex justify-between items-baseline">
                            <span className="text-lg font-bold text-slate-800">{fmt(maxBupi)} mg</span>
                            <span className="text-xs text-slate-500">2.5 mg/kg</span>
                        </div>
                        <div className="text-[10px] text-purple-600 font-mono mt-1 border-t pt-1">
                            Max Vol (0.25%): <b>{fmt(volBupi025)} mL</b>
                        </div>
                    </div>
                    <div className="bg-white p-2 rounded border border-slate-200">
                        <span className="block font-bold text-slate-700">Ropivacaine (0.2%)</span>
                        <div className="flex justify-between items-baseline">
                            <span className="text-lg font-bold text-slate-800">{fmt(maxRopi)} mg</span>
                            <span className="text-xs text-slate-500">3 mg/kg</span>
                        </div>
                        <div className="text-[10px] text-purple-600 font-mono mt-1 border-t pt-1">
                            Max Vol (0.2%): <b>{fmt(volRopi02)} mL</b>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegionalCard;
