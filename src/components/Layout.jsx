import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import {
    Baby, Save, Droplet, Stethoscope, Brain, Anchor, Calculator, Syringe,
    ClipboardList, AlertTriangle, Search, HeartPulse, Library
} from 'lucide-react';
import { usePatient } from '../context/PatientContext';
import ProfileModal from './ProfileModal';
import ThemeToggle from './ThemeToggle';
import GlobalSearch from './GlobalSearch';
import PatientBar from './PatientBar';
import PatientChip from './PatientChip';
import { useCollapsibleBar } from '../hooks/useCollapsibleBar';

import FluidCard from './FluidCard';
import AirwayCard from './AirwayCard';
import RegionalCard from './RegionalCard';
import SedationCard from './SedationCard';
import CorrectionsCard from './CorrectionsCard';
import AllDrugsCard from './AllDrugsCard';
import ReferenceCard from './ReferenceCard';
import EmergencyCard from './EmergencyCard';
import CardiacRotemCard from './CardiacRotemCard';
import CardiacRoomSetupCard from './CardiacRoomSetupCard';
import HeparinProtamineCard from './HeparinProtamineCard';
import TransfusionProtocolCard from './TransfusionProtocolCard';
import CardiacWorkflowCard from './CardiacWorkflowCard';

// Specialty tab is loaded lazily so the new hub launcher and 100+ NCH manuals
// (added across phases 1-4) don't bloat the initial bundle.
const SpecialtyLauncher = lazy(() => import('./specialty/SpecialtyLauncher'));

// Cardiac tab — cards arranged by clinical workflow chronology so that the
// natural order top→bottom mirrors what the operator does during a case:
//   1. Timeline + TRAVEL          (whole-case orientation)
//   2. Pre-induction Room Setup   (very first thing)
//   3. Heparin / Protamine        (cannulation through end)
//   4. Transfusion Protocol       (TXA early; products post-CPB)
//   5. ROTEM Guidance             (post-CPB decision tool)
// Every card defaults to collapsed so opening the tab presents a calm overview;
// tap any header to expand the section you need.
const CardiacTabContent = () => (
    <>
        <CardiacWorkflowCard />
        <CardiacRoomSetupCard />
        <HeparinProtamineCard />
        <TransfusionProtocolCard />
        <CardiacRotemCard />
    </>
);

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
    { id: 'specialty',   label: 'Specialty', icon: Library,      accent: 'teal' },
];

const Layout = () => {
    const { weight } = usePatient();

    const [showProfiles, setShowProfiles] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [activeTab, setActiveTab] = useState('fluids');
    // Deep-link target for the Specialty tab — set when a cross-link from
    // another tab (e.g. Crisis) jumps directly into a specific hub.
    const [specialtyDeepLink, setSpecialtyDeepLink] = useState(null);

    const navigateToSpecialty = useCallback((hubId) => {
        setSpecialtyDeepLink(hubId);
        setActiveTab('specialty');
    }, []);

    const w = parseFloat(weight);
    const isWeightValid = !isNaN(w) && w > 0;

    const { mode, pref, expand, collapse, bumpInteraction, setPref } =
        useCollapsibleBar({ canCollapse: isWeightValid });

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
            case 'emergency': return <EmergencyCard navigateToSpecialty={navigateToSpecialty} />;
            case 'fluids': return <FluidCard />;
            case 'airway': return <AirwayCard />;
            case 'sedation': return <SedationCard />;
            case 'regional': return <RegionalCard />;
            case 'corrections': return <CorrectionsCard />;
            case 'cardiac': return <CardiacTabContent />;
            case 'all_drugs': return <AllDrugsCard />;
            case 'reference': return <ReferenceCard />;
            case 'specialty': return (
                <Suspense fallback={<div className="p-8 text-center text-fg-muted text-sm">Loading specialty hub…</div>}>
                    <SpecialtyLauncher
                        initialHubId={specialtyDeepLink}
                        onConsumeInitialHub={() => setSpecialtyDeepLink(null)}
                    />
                </Suspense>
            );
            default: return <FluidCard />;
        }
    }, [activeTab, specialtyDeepLink, navigateToSpecialty]);

    // The tab strip's sticky offset shifts with the header height. Approximate
    // measurements: collapsed ≈ 88 px, expanded ≈ 154 px, plus a small buffer
    // when the warning banner appears.
    const headerHeight =
        mode === 'collapsed' ? 92 :
        isWeightValid        ? 154 : 196;

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

                    {/* Patient bar — collapses to a chip after 5 s of inactivity */}
                    {mode === 'expanded' ? (
                        <PatientBar
                            bumpInteraction={bumpInteraction}
                            onCollapse={collapse}
                            pref={pref}
                            setPref={setPref}
                        />
                    ) : (
                        <PatientChip onExpand={expand} pref={pref} setPref={setPref} />
                    )}

                    {/* Weight invalid warning — only relevant in expanded mode since
                        canCollapse=false forces expanded anyway. */}
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
            <div
                className="glass sticky z-30 tab-strip border-t-0"
                style={{ top: `${headerHeight}px` }}
            >
                <div className="max-w-5xl mx-auto flex overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth">
                    {tabs.map(tab => {
                        const isActive = activeTab === tab.id;
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                aria-label={tab.label}
                                className={`flex-shrink-0 sm:flex-1 min-w-[68px] py-2.5 px-1 text-[10px] font-bold flex flex-col items-center gap-0.5 border-b-2 transition-all tap-target snap-start whitespace-nowrap leading-tight ${
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
                    onNavigate={(nav) => {
                        if (nav.tab === 'specialty' && nav.hubId) {
                            navigateToSpecialty(nav.hubId);
                        } else {
                            setActiveTab(nav.tab);
                        }
                    }}
                />
            )}
        </div>
    );
};

export default Layout;
