import React from 'react';
import { Anchor, Info, AlertTriangle, Beaker } from 'lucide-react';
import { useRegionalCalc } from '../hooks/useRegionalCalc';
import { usePatient } from '../context/PatientContext';
import { fmt } from '../utils/calc';

const RegionalCard = () => {
    const { weight, isNeonate, ageYears } = usePatient();
    const w = parseFloat(weight);
    const r = useRegionalCalc();

    const range = (min, max) => `${fmt(min)} - ${fmt(max)}`;

    const LaCard = ({ name, plain, plainDose, withEpi, withEpiDose, vol, volLabel, volEpi, volEpiLabel, accent }) => (
        <div className={`bg-white p-2 rounded border border-${accent}-200`}>
            <span className="block font-bold text-slate-700">{name}</span>
            <div className="grid grid-cols-2 gap-2 mt-1">
                <div>
                    <div className="text-[10px] uppercase text-slate-500 font-bold">Plain</div>
                    <div className="text-base font-bold text-slate-800">{fmt(plain)} mg</div>
                    <div className="text-[10px] text-slate-500">{plainDose}</div>
                    {vol !== undefined && <div className="text-[10px] text-purple-600 font-mono mt-0.5">{volLabel}: <b>{fmt(vol)} mL</b></div>}
                </div>
                <div>
                    <div className="text-[10px] uppercase text-slate-500 font-bold">+ Epi</div>
                    <div className="text-base font-bold text-slate-800">{fmt(withEpi)} mg</div>
                    <div className="text-[10px] text-slate-500">{withEpiDose}</div>
                    {volEpi !== undefined && <div className="text-[10px] text-purple-600 font-mono mt-0.5">{volEpiLabel}: <b>{fmt(volEpi)} mL</b></div>}
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-4">
            {/* Landmarks */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                <h3 className="font-bold text-purple-800 flex items-center gap-2 border-b pb-2 mb-3">
                    <Anchor size={18} /> Regional Anesthesia
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="bg-purple-50 p-2 rounded">
                        <div className="text-[10px] uppercase text-purple-700 font-bold">Iliac crest line</div>
                        <div className="text-sm font-bold text-purple-900">{r.landmark}</div>
                    </div>
                    <div className="bg-purple-50 p-2 rounded">
                        <div className="text-[10px] uppercase text-purple-700 font-bold">Spinal cord ends</div>
                        <div className="text-sm font-bold text-purple-900">{r.cord}</div>
                    </div>
                    <div className="bg-purple-50 p-2 rounded">
                        <div className="text-[10px] uppercase text-purple-700 font-bold">Dural sac ends</div>
                        <div className="text-sm font-bold text-purple-900">{r.dural}</div>
                    </div>
                </div>
                <div className="text-[10px] text-slate-500 mt-2">
                    Thoracic landmarks: scapular spine T3, inferior scapula T7. {(isNeonate || ageYears < 1) ? 'Infant' : 'Child'} approach.
                </div>
            </div>

            {/* Single-shot block volumes */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                <h3 className="font-bold text-slate-700 border-b pb-2 mb-3">Single-shot block volumes</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="border p-3 rounded">
                        <div className="font-bold text-sm text-slate-700">Caudal (Bupi 0.125-0.25%)</div>
                        <div className="text-xl font-bold text-purple-700">{range(r.caudalMin, r.caudalMax)} mL</div>
                        <div className="text-[9px] text-slate-400 font-mono">{w} kg × 0.5-1.25 mL/kg • below umbilicus</div>
                    </div>
                    <div className="border p-3 rounded">
                        <div className="font-bold text-sm text-slate-700">Spinal</div>
                        <div className="text-xl font-bold text-purple-700">{range(r.spinalMin, r.spinalMax)} mL</div>
                        <div className="text-[9px] text-slate-400 font-mono">{w} kg × 0.1-0.2 mL/kg • max 1-1.2 mL</div>
                        <div className="text-[10px] text-slate-500 mt-1">
                            Bupi 0.5%: {r.spinalBupiDuration} • Ropi 0.5%: {r.spinalRopiDuration}
                        </div>
                    </div>
                    <div className="border p-3 rounded">
                        <div className="font-bold text-sm text-slate-700">Penile (Bupi 0.25%, NO epi)</div>
                        <div className="text-xl font-bold text-purple-700">{range(r.penileMin, r.penileMax)} mL</div>
                        <div className="text-[9px] text-slate-400 font-mono">2-3 mL midline + 2 / 10 o'clock, 22-25 g</div>
                    </div>
                    <div className="border p-3 rounded">
                        <div className="font-bold text-sm text-slate-700">Extremity block</div>
                        <div className="text-xl font-bold text-purple-700">{range(r.extremityMin, r.extremityMax)} mL</div>
                        <div className="text-[9px] text-slate-400 font-mono">{w} kg × 0.5-1 mL/kg</div>
                    </div>
                </div>
            </div>

            {/* Epidural details */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                <h3 className="font-bold text-slate-700 border-b pb-2 mb-3">Epidural test dose & infusion</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="bg-purple-50 p-2 rounded">
                        <div className="font-bold text-purple-800">Test dose (LA + epi 1:200,000)</div>
                        <div className="text-lg font-bold text-purple-700">{fmt(Math.min(r.testDoseMin, 3))} mL</div>
                        <div className="text-[10px] text-slate-500">0.1 mL/kg, max 3 mL</div>
                        <div className="text-[10px] text-slate-500 mt-1">+ in 1st min: ↑HR &gt; 10 bpm OR ↑SBP &gt; 15 mmHg OR T-wave amplitude ±25%.</div>
                    </div>
                    <div className="bg-purple-50 p-2 rounded">
                        <div className="font-bold text-purple-800">Continuous infusion</div>
                        <div className="text-xs text-slate-700 grid gap-1 mt-1">
                            <div>Bupivacaine 0.1%: <b>{fmt(r.epiBupiMin)} - {fmt(r.epiBupiMax)} mL/hr</b> <span className="text-slate-400">(0.2-0.4 mg/kg/hr)</span></div>
                            <div>Ropivacaine 0.1%: <b>{fmt(r.epiRopiMin)} - {fmt(r.epiRopiMax)} mL/hr</b> <span className="text-slate-400">(0.8-1.6 mg/kg/hr)</span></div>
                            <div>3% Chloroprocaine: <b>{fmt(r.epiChloro)} mL/hr</b> <span className="text-slate-400">(1 mL/kg/hr)</span></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Max LA doses */}
            <div className="bg-slate-50 p-3 rounded border border-slate-200">
                <div className="text-xs font-bold text-slate-600 uppercase mb-2 flex items-center gap-2">
                    <AlertTriangle size={14} className="text-rose-500" /> Max local anesthetic doses (LAST prevention)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <LaCard name="Lidocaine" accent="slate"
                        plain={r.maxLido} plainDose="4.5 mg/kg"
                        withEpi={r.maxLidoEpi} withEpiDose="7 mg/kg"
                        vol={r.volLido1} volLabel="1% (10 mg/mL)"
                        volEpi={r.volLidoEpi1} volEpiLabel="1% (+epi)"
                    />
                    <LaCard name="Bupivacaine" accent="slate"
                        plain={r.maxBupi} plainDose="2.5 mg/kg"
                        withEpi={r.maxBupiEpi} withEpiDose="3 mg/kg"
                        vol={r.volBupi025} volLabel="0.25% (2.5 mg/mL)"
                        volEpi={r.volBupiEpi025} volEpiLabel="0.25% (+epi)"
                    />
                    <LaCard name="Ropivacaine" accent="slate"
                        plain={r.maxRopi} plainDose="3.5 mg/kg"
                        withEpi={r.maxRopiEpi} withEpiDose="3.5 mg/kg"
                        vol={r.volRopi02} volLabel="0.2% (2 mg/mL)"
                        volEpi={r.volRopiEpi02} volEpiLabel="0.2% (+epi)"
                    />
                    <LaCard name="Chloroprocaine" accent="slate"
                        plain={r.maxChloro} plainDose="11 mg/kg"
                        withEpi={r.maxChloroEpi} withEpiDose="14 mg/kg"
                        vol={r.volChloro3} volLabel="3% (30 mg/mL)"
                        volEpi={r.volChloroEpi3} volEpiLabel="3% (+epi)"
                    />
                </div>
                <div className="text-[10px] text-rose-700 mt-2 italic">⚠ Multiple blocks: total dose must stay under the lowest single-block max.</div>
            </div>

            {/* Block adjuncts */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                <h3 className="font-bold text-slate-700 border-b pb-2 mb-3 flex items-center gap-2">
                    <Beaker size={16} /> Block adjuncts (prolong duration 20-40%)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                    {Object.entries(r.adjuncts).map(([k, v]) => {
                        const cap = k[0].toUpperCase() + k.slice(1);
                        const calc = typeof v.calc === 'object'
                            ? `${fmt(v.calc.min)} - ${fmt(v.calc.max)}`
                            : fmt(v.calc);
                        const unit = (k === 'dexamethasone' || k === 'morphine') ? (k === 'dexamethasone' ? 'mg' : 'mcg') : 'mcg';
                        return (
                            <div key={k} className="bg-slate-50 p-2 rounded">
                                <div className="font-bold text-slate-800 text-xs">{cap}</div>
                                <div className="text-base font-bold text-purple-700">{calc} {unit}</div>
                                <div className="text-[10px] text-slate-500">{v.dose}</div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="text-[10px] text-slate-400 italic flex items-start gap-2">
                <Info size={12} className="flex-shrink-0 mt-0.5" />
                Always aspirate. Use ultrasound when able. Target nerve stimulator 0.4-0.5 mA. Know where intra-lipid is stored.
            </div>
        </div>
    );
};

export default RegionalCard;
