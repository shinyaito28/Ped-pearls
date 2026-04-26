import React, { useState, useEffect } from 'react';
import { ListChecks, ChevronDown, ChevronRight, Plane, Check, Copy } from 'lucide-react';
import { timelinePhases, travelChecklist } from '../data/cardiac_timeline';

const STORAGE_TIMELINE = 'ped_pearls_cardiac_timeline_state';
const STORAGE_TRAVEL   = 'ped_pearls_cardiac_travel_state';

// ---------------------------------------------------------------------------
// TRAVEL pneumonic widget
// ---------------------------------------------------------------------------

const TravelChecklistWidget = () => {
    const [checks, setChecks] = useState(() => {
        try { return JSON.parse(localStorage.getItem(STORAGE_TRAVEL)) || {}; }
        catch { return {}; }
    });
    const [expanded, setExpanded] = useState(null);

    useEffect(() => {
        try { localStorage.setItem(STORAGE_TRAVEL, JSON.stringify(checks)); } catch { /* noop */ }
    }, [checks]);

    const toggle = (key) => setChecks(p => ({ ...p, [key]: !p[key] }));
    const reset = () => setChecks({});

    const completed = Object.values(checks).filter(Boolean).length;

    return (
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <Plane size={16} className="text-amber-700 dark:text-amber-300" />
                    <div className="font-bold text-amber-800 dark:text-amber-200 text-sm">TRAVEL — separate-from-bypass checklist</div>
                </div>
                <div className="text-xs font-bold text-amber-800 dark:text-amber-200">{completed}/6</div>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {travelChecklist.map(item => {
                    const done = !!checks[item.key];
                    const isExpanded = expanded === item.key;
                    return (
                        <li key={item.key} className="bg-white/60 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-lg">
                            <button
                                onClick={() => toggle(item.key)}
                                className="w-full text-left flex items-center gap-2 p-2"
                                aria-pressed={done}
                            >
                                <div className={`w-7 h-7 rounded-md flex items-center justify-center font-black text-sm ${done ? 'bg-emerald-500 text-white' : 'bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-200'}`}>
                                    {done ? <Check size={14} /> : item.letter}
                                </div>
                                <div className="flex-1">
                                    <div className={`font-bold text-sm ${done ? 'text-emerald-800 dark:text-emerald-300' : 'text-amber-900 dark:text-amber-200'}`}>{item.title}</div>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setExpanded(isExpanded ? null : item.key); }}
                                    className="text-[10px] text-amber-700 dark:text-amber-300 underline"
                                >
                                    {isExpanded ? 'Hide' : 'Why'}
                                </button>
                            </button>
                            {isExpanded && (
                                <div className="px-2 pb-2 text-[11px] text-amber-900 dark:text-amber-100">
                                    {item.detail}
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
            {completed > 0 && (
                <button onClick={reset} className="text-[11px] text-amber-700 dark:text-amber-300 underline mt-2">
                    Reset TRAVEL
                </button>
            )}
        </div>
    );
};

// ---------------------------------------------------------------------------
// Phase timeline
// ---------------------------------------------------------------------------

const CardiacWorkflowCard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [done, setDone] = useState(() => {
        try { return JSON.parse(localStorage.getItem(STORAGE_TIMELINE)) || {}; }
        catch { return {}; }
    });
    const [openPhase, setOpenPhase] = useState(timelinePhases[0].id);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        try { localStorage.setItem(STORAGE_TIMELINE, JSON.stringify(done)); } catch { /* noop */ }
    }, [done]);

    const toggle = (key) => setDone(p => ({ ...p, [key]: !p[key] }));
    const resetAll = () => setDone({});

    const totalDone = Object.values(done).filter(Boolean).length;
    const totalSteps = timelinePhases.reduce((acc, p) => acc + p.steps.length, 0);

    const copySummary = () => {
        const lines = ['Cardiac OR timeline — handoff summary:'];
        timelinePhases.forEach(phase => {
            const completed = phase.steps.filter(s => done[s.key]);
            if (completed.length > 0) {
                lines.push(`  ${phase.title}:`);
                completed.forEach(s => lines.push(`    ✓ ${s.label}`));
            }
        });
        if (lines.length === 1) lines.push('  (no steps marked complete)');
        navigator.clipboard?.writeText(lines.join('\n')).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="bg-surface border border-line rounded-2xl shadow-sm">
            <button
                onClick={() => setCollapsed(c => !c)}
                className="w-full flex items-center gap-3 p-4 border-b border-line hover:bg-surface-2/40"
                aria-expanded={!collapsed}
            >
                <div className="bg-rose-500/10 text-rose-600 dark:text-rose-400 p-2 rounded-lg">
                    <ListChecks size={18} />
                </div>
                <div className="flex-1 text-left">
                    <h3 className="font-bold text-fg">Cardiac OR Timeline + TRAVEL</h3>
                    <p className="text-[11px] text-fg-muted">6 phase checklist with separation-from-bypass mnemonic.</p>
                </div>
                <div className="text-right">
                    <div className="text-xs font-bold text-fg-soft">{totalDone}/{totalSteps}</div>
                    <div className="text-[10px] text-fg-muted">steps</div>
                </div>
                {collapsed ? <ChevronRight size={16} className="text-fg-muted" /> : <ChevronDown size={16} className="text-fg-muted" />}
            </button>

            {!collapsed && (
                <div className="p-4 space-y-4">
                    <TravelChecklistWidget />

                    {/* Phase accordion */}
                    <div className="space-y-2">
                        {timelinePhases.map((phase, idx) => {
                            const isOpen = openPhase === phase.id;
                            const phaseDone = phase.steps.filter(s => done[s.key]).length;
                            const isComplete = phaseDone === phase.steps.length;
                            return (
                                <div key={phase.id} className="border border-line rounded-lg overflow-hidden">
                                    <button
                                        onClick={() => setOpenPhase(isOpen ? null : phase.id)}
                                        className={`w-full text-left flex items-center gap-2 p-2.5 ${isComplete ? 'bg-emerald-50 dark:bg-emerald-950/30' : 'bg-surface-2/40 hover:bg-surface-2/60'}`}
                                    >
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-xs ${isComplete ? 'bg-emerald-500 text-white' : 'bg-rose-500/15 text-rose-600 dark:text-rose-400'}`}>
                                            {isComplete ? <Check size={12} /> : idx + 1}
                                        </div>
                                        <div className="flex-1">
                                            <div className={`font-bold text-sm ${isComplete ? 'text-emerald-800 dark:text-emerald-300' : 'text-fg'}`}>{phase.title}</div>
                                        </div>
                                        <div className="text-[10px] text-fg-muted">{phaseDone}/{phase.steps.length}</div>
                                        {isOpen ? <ChevronDown size={14} className="text-fg-muted" /> : <ChevronRight size={14} className="text-fg-muted" />}
                                    </button>
                                    {isOpen && (
                                        <ul className="divide-y divide-line">
                                            {phase.steps.map(step => {
                                                const stepDone = !!done[step.key];
                                                return (
                                                    <li key={step.key}>
                                                        <button
                                                            onClick={() => toggle(step.key)}
                                                            className="w-full text-left flex items-start gap-3 p-2.5 hover:bg-surface-2/40"
                                                            aria-pressed={stepDone}
                                                        >
                                                            <div className={`flex-shrink-0 mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center ${stepDone ? 'bg-emerald-500 border-emerald-500' : 'border-fg-muted'}`}>
                                                                {stepDone && <Check size={10} className="text-white" />}
                                                            </div>
                                                            <span className={`text-sm flex-1 ${stepDone ? 'text-fg-muted line-through' : 'text-fg'}`}>{step.label}</span>
                                                        </button>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={copySummary}
                            className="flex-1 text-xs bg-surface-2/60 border border-line rounded-md px-3 py-2 hover:border-teal-400 flex items-center justify-center gap-1.5"
                        >
                            {copied ? <Check size={14} /> : <Copy size={14} />}
                            {copied ? 'Copied' : 'Copy handoff summary'}
                        </button>
                        {totalDone > 0 && (
                            <button
                                onClick={resetAll}
                                className="text-xs text-fg-muted hover:text-rose-600 underline px-2"
                            >
                                Reset all
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardiacWorkflowCard;
