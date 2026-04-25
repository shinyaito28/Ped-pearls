import React from 'react';
import { Zap } from 'lucide-react';
import { electricalShockProtocols } from '../data/electrical_shock';
import { usePatient } from '../context/PatientContext';
import { fmt } from '../utils/calc';

const ElectricalShockCard = () => {
    const { weight } = usePatient();
    const w = parseFloat(weight) || 0;

    return (
        <div className="bg-white border border-yellow-200 rounded-lg shadow-sm p-4">
            <h3 className="font-bold text-yellow-700 flex items-center gap-2 border-b border-yellow-100 pb-2 mb-3">
                <Zap size={18} fill="currentColor" /> Electrical Counter-Shock (Pediatric)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {electricalShockProtocols.map(p => {
                    const first = w * p.first;
                    const next = w * p.next;
                    return (
                        <div key={p.id} className="bg-yellow-50 border border-yellow-200 rounded p-3">
                            <div className="font-bold text-yellow-800">{p.title}</div>
                            <div className="text-xs text-yellow-700 mb-2">{p.description}</div>
                            <div className="flex justify-between items-baseline">
                                <div>
                                    <div className="text-[10px] uppercase text-slate-500 font-bold">First shock</div>
                                    <div className="text-2xl font-black text-yellow-800">{fmt(first)} J</div>
                                    <div className="text-[10px] text-slate-500 font-mono">{p.first} J/kg</div>
                                </div>
                                <span className="text-yellow-500 font-bold">→</span>
                                <div className="text-right">
                                    <div className="text-[10px] uppercase text-slate-500 font-bold">Next shock</div>
                                    <div className="text-2xl font-black text-yellow-800">{fmt(next)} J</div>
                                    <div className="text-[10px] text-slate-500 font-mono">{p.next} J/kg</div>
                                </div>
                            </div>
                            <div className="text-[10px] text-slate-500 mt-2 italic">{p.formulaText}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ElectricalShockCard;
