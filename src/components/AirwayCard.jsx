import React from 'react';
import { Stethoscope } from 'lucide-react';
import { useAirwayCalc } from '../hooks/useAirwayCalc';
import CatheterCard from './CatheterCard';
import DifficultAirwayCard from './DifficultAirwayCard';

const AirwayCard = () => {
    const {
        ettUncuffed, ettCuffed, ettRule,
        depth, depthRule, blade, lma,
        airqMaxEtt, olv
    } = useAirwayCalc();

    return (
        <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
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
                        <div className="text-[10px] text-slate-400">If using cuffed, reduce by 0.5 mm ID.</div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded col-span-2 flex justify-between items-center">
                        <div>
                            <div className="text-xs text-slate-500">Depth at lip</div>
                            <div className="text-xl font-bold text-blue-700">{depth}</div>
                        </div>
                        <div className="text-[10px] text-slate-500 text-right">Rule: {depthRule}</div>
                    </div>
                    <div className="p-2 border rounded">
                        <div className="text-xs text-slate-500">Blade options</div>
                        <div className="font-bold text-slate-800">{blade}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">Straight blade is best for infants &lt; 1 yr.</div>
                    </div>
                    <div className="p-2 border rounded">
                        <div className="text-xs text-slate-500">LMA size</div>
                        <div className="font-bold text-slate-800">#{lma}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">AirQ accepts ETT up to {airqMaxEtt.toFixed(1)} mm ID.</div>
                    </div>
                </div>
            </div>

            {/* OLV */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                <div className="bg-slate-50 p-3 rounded border border-slate-200">
                    <div className="text-xs font-bold text-slate-500 uppercase mb-1">One Lung Ventilation</div>
                    <div className="flex justify-between items-center">
                        <div className="text-sm font-bold text-slate-700">{olv.type}</div>
                        <div className="text-sm font-mono bg-white px-2 py-1 rounded border">{olv.size}</div>
                    </div>
                    <div className="text-[9px] text-slate-400 mt-1 italic">
                        Always confirm placement with fiberoptic. (BB 5 Fr OD ≈ 2.5 mm.)
                    </div>
                </div>
            </div>

            <CatheterCard />

            <DifficultAirwayCard />
        </div>
    );
};

export default AirwayCard;
