import React, { useState, useEffect, useCallback } from 'react';
import {
    Baby, Save, Droplet, Stethoscope, Brain, Anchor, Calculator, Syringe,
    ClipboardList, AlertTriangle, Search, RotateCcw, HeartPulse
} from 'lucide-react';
import { usePatient } from '../context/PatientContext';
import ProfileModal from './ProfileModal';
import ThemeToggle from './ThemeToggle';
import GlobalSearch from './GlobalSearch';

import FluidCard from './FluidCard';
import AirwayCard from './AirwayCard';
import RegionalCard from './RegionalCard';
import SedationCard from './SedationCard';
import CorrectionsCard from './CorrectionsCard';
import AllDrugsCard from './AllDrugsCard';
import ReferenceCard from './ReferenceCard';
import EmergencyCard from './EmergencyCard';
import CardiacRotemCard from './CardiacRotemCard';

const tabs = [
    { id: 'emergency',   label: 'Crisis',   icon: AlertTriangle, accent: 'red' },
    { id: 'fluids',      label: 'Fluids',   icon: Droplet,       accent: 'teal' },
    { id: 'airway',      label: 'Airway',   icon: Stethoscope,   accent: 'sky' },
    { id: 'sedation',    label: 'Sedation', icon: Brain,         accent: 'indigo' },
    { id: 'regional',    label: 'Regional', icon: Anchor,        accent: 'purple' },
    { id: 'corrections', label: 'Physio',   icon: Calculator,    accent: 'amber' },
    { id: 'cardiac',     label: 'Cardiac',  icon: HeartPulse,    accent: 'rose' },
    { id: 'all_drugs',   label: 'Drugs',    icon: Syringe,       accent: 'teal' },
    { id: 'reference',   label: 'Workflow', icon: ClipboardList, accent: 'slate' },
];

const Layout = () => {
    const {
        weight, setWeight, age, setAge, ageUnit, setAgeUnit, gender, setGender,
        height, setHeight,
        isPreemie, setIsPreemie, isManualWeight, resetToAutoWeight
    } = usePatient();

    const [showProfiles, setShowProfiles] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [activeTab, setActiveTab] = useState('fluids');

    // Cmd / Ctrl + K opens global search.
    useEffect(() => {
        const onKey = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setShowSearch(true);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    const renderContent = useCallback(() => {
        switch (activeTab) {
            case 'emergency': return <EmergencyCard />;
            case 'fluids': return <FluidCard />;
            case 'airway': return <AirwayCard />;
            case 'sedation': return <SedationCard />;
            case 'regional': return <RegionalCard />;
            case 'corrections': return <CorrectionsCard />;
            case 'cardiac': return <CardiacRotemCard />;
            case 'all_drugs': return <AllDrugsCard />;
            case 'reference': return <ReferenceCard />;
            default: return <FluidCard />;
        }
    }, [activeTab]);

    const w = parseFloat(weight);
    const isWeightValid = !isNaN(w) && w > 0;

    return (
        <div
            className="min-h-screen bg-app text-fg pb-12 relative font-sans transition-colors"
            onClick={() => showProfiles && setShowProfiles(false)}
        >
            {/* ==================== HEADER ==================== */}
            <header className="glass sticky top-0 z-40 shadow-sm">
                <div className="max-w-5xl mx-auto px-3 py-3 flex flex-col gap-3">
                    {/* Top row: brand + utility buttons */}
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <div className="bg-teal-500/10 text-teal-600 dark:text-teal-400 p-1.5 rounded-lg">
                                <Baby size={20} />
                            </div>
                            <div className="leading-tight">
                                <h1 className="text-sm font-extrabold tracking-tight">
                                    Pediatric <span className="text-teal-600 dark:text-teal-400 font-light">Anesthesia Pearls</span>
                                </h1>
                                <p className="text-[10px] text-fg-muted">Nationwide Children's 2021</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                            <button
                                onClick={() => setShowSearch(true)}
                                aria-label="search"
                                title="Search (⌘K / Ctrl+K)"
                                className="hidden sm:flex items-center gap-1.5 bg-surface-2 px-2.5 py-1.5 rounded-lg border border-line text-fg-soft hover:border-teal-500 transition-colors text-xs font-medium tap-target"
                            >
                                <Search size={14} />
                                <span className="hidden md:inline">Search</span>
                                <kbd className="ml-1 text-[10px] font-mono bg-surface px-1 py-0.5 rounded border border-line text-fg-muted">⌘K</kbd>
                            </button>
                            <button
                                onClick={() => setShowSearch(true)}
                                aria-label="search-mobile"
                                className="sm:hidden bg-surface-2 p-2 rounded-lg border border-line text-fg-soft tap-target"
                            >
                                <Search size={16} />
                            </button>

                            <ThemeToggle />

                            <button
                                onClick={(e) => { e.stopPropagation(); setShowProfiles(!showProfiles); }}
                                aria-label="profiles"
                                title="Saved profiles"
                                className="bg-surface-2 p-2 rounded-lg border border-line text-teal-600 dark:text-teal-400 hover:border-teal-500 transition-colors tap-target"
                            >
                                <Save size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Patient bar */}
                    <div className="bg-surface-2/60 border border-line rounded-xl p-2 flex flex-wrap items-end gap-2">
                        {/* Age */}
                        <div className="flex-1 min-w-[140px]">
                            <label className="text-[10px] text-fg-muted uppercase font-bold mb-0.5 block">Age</label>
                            <div className="flex items-stretch gap-1">
                                <input
                                    type="number"
                                    value={age}
                                    onChange={e => setAge(Math.max(0, e.target.value))}
                                    className="w-16 bg-surface text-fg font-bold text-lg px-2 py-1 rounded-lg outline-none border border-line focus:border-teal-500 text-center"
                                    placeholder="0"
                                    aria-label="age value"
                                />
                                <div className="flex bg-surface rounded-lg border border-line overflow-hidden">
                                    {['days', 'months', 'years'].map(u => (
                                        <button
                                            key={u}
                                            onClick={() => setAgeUnit(u)}
                                            className={`text-[10px] font-bold px-2 transition-colors ${ageUnit === u ? 'bg-teal-500 text-white' : 'text-fg-soft hover:bg-surface-2'}`}
                                            aria-label={`age unit ${u}`}
                                        >
                                            {u === 'days' ? 'D' : u === 'months' ? 'M' : 'Y'}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Height */}
                        <div className="flex-1 min-w-[90px]">
                            <label className="text-[10px] text-fg-muted uppercase font-bold mb-0.5 block">Height (cm)</label>
                            <input
                                type="number"
                                value={height}
                                onChange={e => setHeight(Math.max(0, e.target.value))}
                                className="w-full bg-surface text-fg font-bold text-lg px-2 py-1 rounded-lg outline-none border border-line focus:border-teal-500 text-center placeholder:text-fg-muted"
                                placeholder="Est."
                                aria-label="height in cm"
                            />
                        </div>

                        {/* Weight */}
                        <div className="flex-1 min-w-[110px]">
                            <label className="text-[10px] text-fg-muted uppercase font-bold mb-0.5 flex justify-between items-center">
                                <span>Weight (kg)</span>
                                {isManualWeight && (
                                    <button
                                        onClick={resetToAutoWeight}
                                        className="text-[9px] bg-surface px-1.5 py-0.5 rounded border border-line text-teal-600 dark:text-teal-400 flex items-center gap-1"
                                        title="Reset to CDC 50th percentile"
                                    >
                                        <RotateCcw size={10} /> Auto
                                    </button>
                                )}
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                value={weight}
                                onChange={e => setWeight(Math.max(0, e.target.value))}
                                className={`w-full bg-surface font-bold text-lg px-2 py-1 rounded-lg outline-none border focus:border-teal-500 text-center ${isManualWeight ? 'text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-700' : 'text-fg border-line'}`}
                                aria-label="weight in kg"
                            />
                        </div>

                        {/* Gender + Preemie */}
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] text-fg-muted uppercase font-bold">Sex / status</label>
                            <div className="flex items-center gap-1.5">
                                <div className="flex bg-surface rounded-lg border border-line overflow-hidden">
                                    <button
                                        onClick={() => setGender('male')}
                                        className={`text-[11px] font-bold px-2 py-1 transition-colors ${gender === 'male' ? 'bg-sky-500 text-white' : 'text-fg-soft'}`}
                                        aria-label="male"
                                    >
                                        M
                                    </button>
                                    <button
                                        onClick={() => setGender('female')}
                                        className={`text-[11px] font-bold px-2 py-1 transition-colors ${gender === 'female' ? 'bg-rose-500 text-white' : 'text-fg-soft'}`}
                                        aria-label="female"
                                    >
                                        F
                                    </button>
                                </div>
                                <label className="flex items-center gap-1 cursor-pointer bg-surface px-2 py-1 rounded-lg border border-line hover:border-amber-500 transition-colors">
                                    <input type="checkbox" checked={isPreemie} onChange={e => setIsPreemie(e.target.checked)} className="w-3 h-3 accent-amber-500" />
                                    <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">Preemie</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Weight invalid warning */}
                    {!isWeightValid && (
                        <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs px-3 py-1.5 rounded-lg flex items-center gap-2">
                            <AlertTriangle size={14} />
                            Enter a positive weight to enable calculations.
                        </div>
                    )}
                </div>

                {showProfiles && <ProfileModal onClose={() => setShowProfiles(false)} />}
            </header>

            {/* ==================== TABS ==================== */}
            <div className="glass sticky top-[154px] z-30 tab-strip border-t-0">
                <div className="max-w-5xl mx-auto flex overflow-x-auto no-scrollbar">
                    {tabs.map(tab => {
                        const isActive = activeTab === tab.id;
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                aria-label={tab.label}
                                className={`flex-1 min-w-[68px] py-2.5 text-[10px] font-bold flex flex-col items-center gap-0.5 border-b-2 transition-all tap-target ${
                                    isActive
                                        ? `border-${tab.accent}-500 text-${tab.accent}-600 dark:text-${tab.accent}-400`
                                        : 'border-transparent text-fg-muted hover:text-fg-soft'
                                }`}
                            >
                                <Icon size={18} className={isActive && tab.id === 'emergency' ? 'animate-pulse-soft' : ''} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ==================== CONTENT ==================== */}
            <main className="max-w-5xl mx-auto px-3 sm:px-4 py-5 space-y-6">
                {renderContent()}

                <footer className="text-center pt-10 text-[10px] text-fg-muted">
                    Based on Nationwide Children's Pediatric Anesthesia Pearls (2021)<br />
                    Always verify doses clinically. <span className="font-mono">v0.2-redesign</span>
                </footer>
            </main>

            {showSearch && (
                <GlobalSearch
                    onClose={() => setShowSearch(false)}
                    onNavigate={(id) => setActiveTab(id)}
                />
            )}
        </div>
    );
};

export default Layout;
