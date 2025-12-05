import React, { useState } from 'react';
import {
    Baby, Save, Droplet, Stethoscope, Brain, Anchor, Calculator, Syringe, ClipboardList, Info
} from 'lucide-react';
import { usePatient } from '../context/PatientContext';
import ProfileModal from './ProfileModal';

import FluidCard from './FluidCard';
import AirwayCard from './AirwayCard';
import RegionalCard from './RegionalCard';
import SedationCard from './SedationCard';
import CorrectionsCard from './CorrectionsCard';
import AllDrugsCard from './AllDrugsCard';
import ReferenceCard from './ReferenceCard';

const Layout = () => {
    const {
        weight, setWeight, age, setAge, ageUnit, setAgeUnit,
        isPreemie, setIsPreemie, isManualWeight, resetToAutoWeight
    } = usePatient();

    const [showProfiles, setShowProfiles] = useState(false);
    const [activeTab, setActiveTab] = useState('fluids');

    const tabs = [
        { id: 'fluids', label: 'Fluids', icon: Droplet },
        { id: 'airway', label: 'Airway', icon: Stethoscope },
        { id: 'sedation', label: 'Sedation', icon: Brain },
        { id: 'regional', label: 'Regional', icon: Anchor },
        { id: 'corrections', label: 'Labs', icon: Calculator },
        { id: 'all_drugs', label: 'Drugs', icon: Syringe },
        { id: 'reference', label: 'Ref', icon: ClipboardList },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'fluids': return <FluidCard />;
            case 'airway': return <AirwayCard />;
            case 'sedation': return <SedationCard />;
            case 'regional': return <RegionalCard />;
            case 'corrections': return <CorrectionsCard />;
            case 'all_drugs': return <AllDrugsCard />;
            case 'reference': return <ReferenceCard />;
            default: return <FluidCard />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 font-sans text-slate-900 pb-12 relative" onClick={() => showProfiles && setShowProfiles(false)}>
            {/* Header */}
            <header className="bg-slate-800 text-white p-3 sticky top-0 z-50 shadow-md">
                <div className="max-w-4xl mx-auto flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                            <h1 className="text-lg font-bold flex items-center gap-1 leading-none">
                                <Baby className="text-teal-400" size={20} />
                                Pediatric <span className="font-light text-teal-400">Anesthesia Pearls</span>
                            </h1>
                            <span className="text-[9px] text-slate-400 mt-0.5 ml-6">Anesthesia Ref</span>
                        </div>

                        <div className="flex gap-2 items-center">
                            <label className="flex items-center gap-1 cursor-pointer bg-slate-700 px-2 py-1 rounded border border-slate-600 hover:bg-slate-600 transition">
                                <input type="checkbox" checked={isPreemie} onChange={e => setIsPreemie(e.target.checked)} className="rounded text-teal-500 w-3 h-3 focus:ring-0" />
                                <span className="text-[10px] font-bold text-amber-400 whitespace-nowrap">Preemie</span>
                            </label>
                            <button onClick={(e) => { e.stopPropagation(); setShowProfiles(!showProfiles); }} className="bg-slate-700 p-1.5 rounded border border-slate-600 hover:bg-slate-600 text-teal-400">
                                <Save size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Input Bar */}
                    <div className="grid grid-cols-2 gap-2 bg-slate-700 p-2 rounded shadow-inner border border-slate-600">
                        <div className="flex flex-col">
                            <label className="text-[9px] text-slate-400 uppercase font-bold mb-0.5">Age</label>
                            <div className="flex gap-1 h-full">
                                <input type="number" value={age} onChange={e => setAge(Math.max(0, e.target.value))}
                                    className="w-1/2 bg-slate-800/50 text-white font-bold text-lg p-1 rounded outline-none border border-transparent focus:border-teal-500 text-center" placeholder="0" />
                                <select value={ageUnit} onChange={e => setAgeUnit(e.target.value)} className="w-1/2 bg-slate-800 text-white text-xs rounded border-none p-0 pl-1 cursor-pointer focus:ring-0">
                                    <option value="years">Yrs</option>
                                    <option value="months">Mos</option>
                                    <option value="days">Days</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col relative">
                            <label className="text-[9px] text-slate-400 uppercase font-bold mb-0.5 flex justify-between">
                                Weight (kg)
                                {isManualWeight && (
                                    <button onClick={resetToAutoWeight} className="text-[8px] bg-slate-600 px-1 rounded hover:bg-slate-500 text-teal-300">
                                        Auto
                                    </button>
                                )}
                            </label>
                            <input type="number" value={weight} onChange={e => setWeight(Math.max(0, e.target.value))}
                                className={`w-full bg-slate-800/50 text-white font-bold text-lg p-1 rounded outline-none border border-transparent focus:border-teal-500 text-center ${isManualWeight ? 'text-amber-300' : ''}`} placeholder="0" />
                        </div>
                    </div>
                </div>
            </header>

            {showProfiles && <ProfileModal onClose={() => setShowProfiles(false)} />}

            {/* Tabs */}
            <div className="bg-white sticky top-[112px] z-40 shadow-sm border-b border-slate-200 overflow-x-auto no-scrollbar">
                <div className="max-w-4xl mx-auto flex">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 min-w-[60px] py-3 text-[10px] font-bold flex flex-col items-center gap-1 border-b-2 transition-colors ${activeTab === tab.id ? 'border-teal-500 text-teal-700 bg-teal-50/20' : 'border-transparent text-slate-500 hover:bg-slate-50'
                                }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <main className="max-w-4xl mx-auto p-4 space-y-6">
                {renderContent()}

                <div className="text-center pt-10 text-[10px] text-slate-400">
                    Based on Nationwide Children's Pediatric Anesthesia Pearls (2021)<br />
                    Always verify doses clinically.
                </div>
            </main>
        </div >
    );
};

export default Layout;
