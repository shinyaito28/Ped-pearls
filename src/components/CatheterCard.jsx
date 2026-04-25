import React from 'react';
import { Cable, Activity, Ruler } from 'lucide-react';
import { arterialCatheters, centralVenousCatheters, calcCvlDepth, catheterPearls } from '../data/catheters';
import { usePatient } from '../context/PatientContext';
import { fmt } from '../utils/calc';

const CatheterCard = () => {
    const { height, weight } = usePatient();
    const w = parseFloat(weight) || 0;
    const h = parseFloat(height) || 0;
    const cvlDepth = calcCvlDepth(h);

    // Highlight the row matching this patient
    const inferArterialRow = () => {
        if (w < 10) return 0;            // Infant
        if (w <= 40) return 1;           // 10-40 kg
        return 2;                        // > 40 kg
    };
    const inferCvlRow = () => {
        if (w < 3) return 0;
        if (w < 5) return 1;
        if (w < 10) return 2;
        if (w < 12) return 3;
        if (w < 40) return 4;
        return 5;
    };
    const aRow = inferArterialRow();
    const cRow = inferCvlRow();

    return (
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4 space-y-4">
            <h3 className="font-bold text-slate-700 flex items-center gap-2 border-b pb-2">
                <Cable size={18} /> Intravascular Catheter Sizes
            </h3>

            {/* Arterial */}
            <div>
                <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-1">
                    <Activity size={16} className="text-rose-500" /> Arterial line
                </h4>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-[10px] uppercase text-slate-500 font-bold">
                            <tr>
                                <th className="text-left py-1 pl-3">Patient</th>
                                <th className="text-left py-1">Catheter</th>
                                <th className="text-left py-1 pr-3">Comment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arterialCatheters.map((row, i) => (
                                <tr key={i} className={`border-t border-slate-100 ${i === aRow ? 'bg-rose-50' : ''}`}>
                                    <td className="py-1.5 pl-3 font-bold text-slate-800">{row.range}</td>
                                    <td className="py-1.5 text-slate-700">{row.size}</td>
                                    <td className="py-1.5 pr-3 text-xs text-slate-500">{row.comment}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* CVL */}
            <div>
                <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-1">
                    <Cable size={16} className="text-sky-500" /> Central venous line
                </h4>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-[10px] uppercase text-slate-500 font-bold">
                            <tr>
                                <th className="text-left py-1 pl-3">Weight</th>
                                <th className="text-left py-1">Catheter</th>
                                <th className="text-left py-1 pr-3">Comment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {centralVenousCatheters.map((row, i) => (
                                <tr key={i} className={`border-t border-slate-100 ${i === cRow ? 'bg-sky-50' : ''}`}>
                                    <td className="py-1.5 pl-3 font-bold text-slate-800">{row.weight}</td>
                                    <td className="py-1.5 text-slate-700">{row.catheter}</td>
                                    <td className="py-1.5 pr-3 text-xs text-slate-500">{row.comment}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* CVL depth calculator */}
            <div className="bg-sky-50 border border-sky-200 rounded p-3 flex justify-between items-center">
                <div>
                    <div className="text-[10px] uppercase font-bold text-sky-700">CVL insertion depth (height-based)</div>
                    <div className="text-[11px] text-sky-700 font-mono">
                        {h ? `Height ${h} cm → ${h < 100 ? 'Height/10 − 1' : 'Height/10 − 2'}` : 'Enter patient height'}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Ruler size={16} className="text-sky-700" />
                    <div className="text-2xl font-black text-sky-800">
                        {cvlDepth !== null ? `${cvlDepth.toFixed(1)} cm` : '-'}
                    </div>
                </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded p-3">
                <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">Pearls</div>
                <ul className="text-xs text-slate-600 list-disc pl-5 space-y-0.5">
                    {catheterPearls.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
            </div>
        </div>
    );
};

export default CatheterCard;
