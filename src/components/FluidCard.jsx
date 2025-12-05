import React, { useState } from 'react';
import { Droplet, FlaskConical } from 'lucide-react';
import { useFluidCalc } from '../hooks/useFluidCalc';
import { usePatient } from '../context/PatientContext';
import { fmt } from '../utils/calc';

const FluidCard = () => {
    const { weight } = usePatient();
    const [currentHb, setCurrentHb] = useState(12);
    const [targetHb, setTargetHb] = useState(8);

    const { maint, formulaMaint, tbv, tbvFactor, abl, alb5, alb25, rbc, plt } = useFluidCalc(currentHb, targetHb);
    const w = parseFloat(weight);

    return (
        <div className="space-y-4">
            {/* Maintenance & TBV */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 grid grid-cols-2 gap-4">
                <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase mb-1">Maintenance</h3>
                    <div className="text-2xl font-bold text-teal-700">{fmt(maint)} <span className="text-sm">mL/hr</span></div>
                    <div className="text-[10px] text-slate-400 font-mono">{formulaMaint}</div>
                </div>
                <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase mb-1">Blood Vol (TBV)</h3>
                    <div className="text-2xl font-bold text-rose-700">{fmt(tbv)} <span className="text-sm">mL</span></div>
                    <div className="text-[10px] text-slate-400 font-mono">{w}kg × {tbvFactor} mL/kg</div>
                </div>
            </div>

            {/* ABL */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                <h3 className="font-bold text-slate-700 flex items-center gap-2 mb-2"><FlaskConical size={18} /> Allowable Blood Loss</h3>
                <div className="flex gap-4 items-center bg-slate-50 p-2 rounded mb-2">
                    <div className="flex-1">
                        <label className="text-[10px]">Start Hb</label>
                        <input type="number" value={currentHb} onChange={e => setCurrentHb(e.target.value)} className="w-full font-bold p-1 border rounded" />
                    </div>
                    <span>→</span>
                    <div className="flex-1">
                        <label className="text-[10px]">Min Hb</label>
                        <input type="number" value={targetHb} onChange={e => setTargetHb(e.target.value)} className="w-full font-bold p-1 border rounded" />
                    </div>
                </div>
                <div className="flex justify-between items-center bg-rose-50 p-3 rounded text-rose-900 font-bold">
                    <span>ABL Limit</span>
                    <span className="text-xl">{fmt(abl)} mL</span>
                </div>
                <div className="text-[9px] text-slate-400 text-right font-mono mt-1">TBV × (Start - Min) / Average Hb</div>
            </div>

            {/* Albumin & Blood Products */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                <h3 className="font-bold text-slate-700 border-b pb-2 mb-3">Volume & Products</h3>
                <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex justify-between bg-blue-50 p-2 rounded items-center">
                        <div><span>Albumin 5%</span> <div className="text-[9px] text-slate-500 font-mono">{w}kg × 10 mL/kg</div></div>
                        <span className="font-bold text-blue-700">{fmt(alb5)} mL</span>
                    </div>
                    <div className="flex justify-between bg-blue-50 p-2 rounded items-center">
                        <div><span>Albumin 25%</span> <div className="text-[9px] text-slate-500 font-mono">{w}kg × 2.5 mL/kg</div></div>
                        <span className="font-bold text-blue-700">{fmt(alb25)} mL</span>
                    </div>
                    <div className="flex justify-between bg-red-50 p-2 rounded items-center">
                        <div><span>Packed RBC</span> <div className="text-[9px] text-slate-500 font-mono">{w}kg × 10 mL/kg</div></div>
                        <span className="font-bold text-red-700">{fmt(rbc)} mL</span>
                    </div>
                    <div className="flex justify-between bg-yellow-50 p-2 rounded items-center">
                        <div><span>Platelets</span> <div className="text-[9px] text-slate-500 font-mono">{w}kg / 10kg</div></div>
                        <span className="font-bold text-yellow-700">{fmt(plt)} Units</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FluidCard;
