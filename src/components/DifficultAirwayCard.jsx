import React, { useState } from 'react';
import { Stethoscope, AlertTriangle, ExternalLink, Wind, ShieldAlert, Zap, RotateCcw } from 'lucide-react';
import { useAirwayCalc } from '../hooks/useAirwayCalc';
import { usePatient } from '../context/PatientContext';

// Source: DAS / APA Paediatric Difficult Airway Guidelines (2015, reaffirmed).
// Three core algorithms for children aged 1-8 yr:
//   1) Difficult mask ventilation
//   2) Unanticipated difficult tracheal intubation
//   3) Cannot intubate cannot oxygenate (CICO / CICV) in a paralysed child
const plans = [
    {
        id: 'A', title: 'Plan A — Direct laryngoscopy', accent: 'sky', icon: Stethoscope,
        bullets: [
            'Optimise position (sniffing). Pre-oxygenate to FiO₂ 1.0.',
            'Limit attempts (≤4 total) — minimise trauma & desaturation.',
            'Use a stylet, smaller ETT, change blade, external laryngeal manipulation.',
            'Switch to video laryngoscopy early if available.',
            'If oxygenation deteriorates → declare difficulty, move to Plan B.'
        ]
    },
    {
        id: 'B', title: 'Plan B — SGA / LMA rescue', accent: 'teal', icon: Wind,
        bullets: [
            'Insert a supraglottic airway (LMA or i-gel) sized to weight.',
            'Confirm ventilation with EtCO₂. Allow patient to recover gas.',
            'Decide: wake up vs continue via SGA vs intubate through SGA (fibre-optic).',
            'If SGA also fails to ventilate → declare CICO and call Plan D.'
        ]
    },
    {
        id: 'C', title: 'Plan C — Wake up', accent: 'amber', icon: RotateCcw,
        bullets: [
            'If oxygenation maintained but intubation failed: wake the child up.',
            'Reverse muscle relaxant (sugammadex 16 mg/kg if rocuronium given).',
            'Reschedule with a difficult-airway plan (awake fibre-optic, ENT presence, smaller ETT).'
        ]
    },
    {
        id: 'D', title: 'Plan D — CICO emergency front-of-neck access', accent: 'rose', icon: ShieldAlert,
        bullets: [
            'Declare CICO. Call for help / ENT immediately.',
            '100% O₂ via face mask + SGA, two-handed jaw thrust.',
            'Needle cricothyrotomy (≤8 yr): 14-18 G IV cannula through cricothyroid membrane.',
            'Connect to high-pressure jet ventilation or Manujet at low flow (∼1 L/min).',
            'Convert to surgical airway as soon as ENT arrives.',
            '⚠ Do NOT use scalpel-bougie technique in <8 yr — high risk of severe injury.'
        ]
    }
];

const DifficultAirwayCard = () => {
    const [openPlan, setOpenPlan] = useState('A');
    const { lma, ettUncuffed, ettCuffed, blade } = useAirwayCalc();
    const { weight, ageYears } = usePatient();
    const w = parseFloat(weight) || 0;

    // Needle cricothyrotomy: 14-18 G IV cannula in <8 yr; surgical FONA only ≥8 yr.
    const fonaRecommendation = ageYears < 8
        ? { method: 'Needle cricothyrotomy + jet vent', size: '14-18 G IV cannula' }
        : { method: 'Scalpel-bougie surgical airway', size: '≥6.0 mm cuffed ETT through cricothyroid membrane' };

    return (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 space-y-4">
            <h3 className="font-bold text-rose-700 flex items-center gap-2 border-b border-slate-200 pb-2">
                <AlertTriangle size={18} /> Difficult Airway — DAS / APA Paediatric Algorithm (1-8 yr)
            </h3>

            {/* Patient-specific airway gear */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                <div className="text-[10px] uppercase font-bold text-slate-500 mb-2">Recommended gear for {w} kg / {ageYears.toFixed(1)} yr</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="bg-white p-2 rounded border border-slate-200">
                        <div className="text-[10px] uppercase text-slate-500 font-bold">ETT (uncuffed)</div>
                        <div className="font-bold text-slate-800">{ettUncuffed}</div>
                    </div>
                    <div className="bg-white p-2 rounded border border-slate-200">
                        <div className="text-[10px] uppercase text-slate-500 font-bold">ETT (cuffed)</div>
                        <div className="font-bold text-slate-800">{ettCuffed}</div>
                    </div>
                    <div className="bg-white p-2 rounded border border-slate-200">
                        <div className="text-[10px] uppercase text-slate-500 font-bold">LMA / i-gel</div>
                        <div className="font-bold text-slate-800">#{lma}</div>
                    </div>
                    <div className="bg-white p-2 rounded border border-slate-200">
                        <div className="text-[10px] uppercase text-slate-500 font-bold">Blade</div>
                        <div className="font-bold text-slate-800">{blade}</div>
                    </div>
                </div>
                <div className="mt-2 bg-rose-50 border border-rose-200 rounded p-2 text-xs">
                    <div className="text-[10px] uppercase font-bold text-rose-700">Emergency FONA (this patient)</div>
                    <div className="font-bold text-rose-800">{fonaRecommendation.method}</div>
                    <div className="text-rose-700">{fonaRecommendation.size}</div>
                </div>
            </div>

            {/* Plan tabs */}
            <div className="grid grid-cols-4 gap-2">
                {plans.map(p => {
                    const Icon = p.icon;
                    const isOpen = openPlan === p.id;
                    return (
                        <button
                            key={p.id}
                            onClick={() => setOpenPlan(p.id)}
                            className={`p-2 rounded-lg border-2 text-center transition-colors ${isOpen ? `border-${p.accent}-500 bg-${p.accent}-50` : 'border-slate-200 bg-slate-50 hover:border-slate-300'}`}
                        >
                            <Icon size={18} className={`mx-auto text-${p.accent}-600 mb-0.5`} />
                            <div className={`font-black text-${p.accent}-700`}>{p.id}</div>
                            <div className="text-[9px] text-slate-600">{p.title.split(' — ')[1]}</div>
                        </button>
                    );
                })}
            </div>

            {/* Active plan body */}
            {plans.filter(p => p.id === openPlan).map(p => (
                <div key={p.id} className={`rounded-2xl p-4 border-2 border-${p.accent}-300 bg-${p.accent}-50`}>
                    <div className={`font-black text-${p.accent}-800 text-base mb-2`}>{p.title}</div>
                    <ul className={`text-sm text-${p.accent}-900 list-disc pl-5 space-y-1.5`}>
                        {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                </div>
            ))}

            {/* External resources */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <a
                    href="https://das.uk.com/guidelines/paediatric-difficult-airway-guidelines"
                    target="_blank" rel="noopener noreferrer"
                    className="bg-white border border-rose-200 hover:border-rose-400 px-3 py-2 rounded-lg flex items-center justify-between group transition-colors"
                >
                    <span className="font-bold text-rose-800 flex items-center gap-2">
                        <Zap size={14} /> DAS / APA Pediatric Algorithms (PDFs)
                    </span>
                    <ExternalLink size={14} className="text-rose-300 group-hover:text-rose-600" />
                </a>
                <a
                    href="https://pedsanesthesia.org/critical-events-checklists/"
                    target="_blank" rel="noopener noreferrer"
                    className="bg-white border border-rose-200 hover:border-rose-400 px-3 py-2 rounded-lg flex items-center justify-between group transition-colors"
                >
                    <span className="font-bold text-rose-800 flex items-center gap-2">
                        <Zap size={14} /> SPA Critical Events Checklists
                    </span>
                    <ExternalLink size={14} className="text-rose-300 group-hover:text-rose-600" />
                </a>
            </div>
        </div>
    );
};

export default DifficultAirwayCard;
