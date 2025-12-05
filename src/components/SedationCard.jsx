import React from 'react';
import { Brain } from 'lucide-react';
import { useDrugList, useSedationMix } from '../hooks/useDrugList';
import { usePatient } from '../context/PatientContext';

const SedationCard = () => {
    const list = useDrugList('sedation');
    const mix = useSedationMix();
    const { weight } = usePatient();

    return (
        <div className="space-y-4">
            <div className="bg-indigo-50 border border-indigo-100 p-3 rounded">
                <h3 className="font-bold text-indigo-900 flex items-center gap-2"><Brain size={18} /> Sedation & Adjuncts</h3>
                <p className="text-xs text-indigo-600">Route-specific dosing and cocktails.</p>
            </div>

            <div className="bg-white border border-slate-200 p-3 rounded shadow-sm">
                <h4 className="font-bold text-slate-700 text-sm mb-2">"Ketazolam" PO Mix</h4>
                <div className="flex flex-wrap gap-2 text-sm">
                    <div className="bg-slate-100 px-2 py-1 rounded">Ketamine: <b>{mix.ketamine} mg</b> <span className="text-[9px] text-slate-400">({weight}×6)</span></div>
                    <div className="bg-slate-100 px-2 py-1 rounded">Midazolam: <b>{mix.midaz} mg</b> <span className="text-[9px] text-slate-400">({weight}×0.6)</span></div>
                    <div className="bg-slate-100 px-2 py-1 rounded">Atropine: <b>{mix.atropine} mg</b> <span className="text-[9px] text-slate-400">({weight}×0.02)</span></div>
                </div>
            </div>

            <div className="space-y-2">
                {list.map((d, i) => (
                    <div key={i} className="bg-white border border-slate-200 p-3 rounded flex justify-between items-center shadow-sm">
                        <div>
                            <div className="font-bold text-slate-800">{d.agent}</div>
                            <div className="text-[10px] text-slate-500">{d.note}</div>
                        </div>
                        <div className="text-right">
                            <div className="font-bold text-indigo-700">{d.calc}</div>
                            <div className="text-[9px] text-slate-400 font-mono">{d.formula}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SedationCard;
