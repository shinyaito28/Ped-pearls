import React from 'react';
import { Stethoscope } from 'lucide-react';
import { useAirwayCalc } from '../hooks/useAirwayCalc';

const AirwayCard = () => {
    const { ettUncuffed, ettCuffed, ettRule, depth, depthRule, blade, lma, olv } = useAirwayCalc();

    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 space-y-4">
            <div>
                <h3 className="font-bold text-slate-700 flex items-center gap-2 border-b pb-2 mb-3">
                    <Stethoscope size={18} /> Tube & Laryngoscopy
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-3 rounded">
                        <div className="text-xs text-slate-500">ETT (Uncuffed)</div>
                        <div className="text-2xl font-bold text-slate-800">{ettUncuffed}</div>
                        <div className="text-[10px] text-slate-400">{ettRule}</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                        <div className="text-xs text-slate-500">ETT (Cuffed)</div>
                        <div className="text-2xl font-bold text-slate-800">{ettCuffed}</div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded col-span-2 flex justify-between items-center">
                        <div>
                            <div className="text-xs text-slate-500">Depth (at lip)</div>
                            <div className="text-xl font-bold text-blue-700">{depth}</div>
                        </div>
                        <div className="text-[10px] text-slate-400 text-right">Rule: {depthRule}</div>
                    </div>
                    <div className="p-2 border rounded">
                        <div className="text-xs text-slate-500">Blade</div>
                        <div className="font-bold">{blade}</div>
                    </div>
                    <div className="p-2 border rounded">
                        <div className="text-xs text-slate-500">LMA</div>
                        <div className="font-bold">#{lma}</div>
                    </div>
                </div>
            </div>
            {/* One Lung Ventilation */}
            <div className="border-t pt-4">
                <div className="bg-slate-50 p-3 rounded border border-slate-200">
                    <div className="text-xs font-bold text-slate-500 uppercase mb-1">One Lung Ventilation Recommendation</div>
                    <div className="flex justify-between items-center">
                        <div className="text-sm font-bold text-slate-700">{olv.type}</div>
                        <div className="text-sm font-mono bg-white px-2 py-1 rounded border">{olv.size}</div>
                    </div>
                    <div className="text-[9px] text-slate-400 mt-1 italic">Use Fiberoptic for placement. (BB 5Fr OD=2.5mm)</div>
                </div>
            </div>
        </div>
    );
};

export default AirwayCard;
