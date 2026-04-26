import React, { useState, useRef, useEffect } from 'react';
import { Pencil, Settings2, Lock, Clock } from 'lucide-react';
import { usePatient } from '../context/PatientContext';

// Compact 1-row summary that replaces the full patient input bar after
// auto-collapse. Click anywhere on the chip to expand back to the form.
//
// Right-side cog opens a small popover for the auto-collapse preference.
const PatientChip = ({ onExpand, pref, setPref }) => {
    const { age, ageUnit, gender, weight, height, isPreemie } = usePatient();
    const [showSettings, setShowSettings] = useState(false);
    const settingsRef = useRef(null);

    useEffect(() => {
        const onClick = (e) => {
            if (settingsRef.current && !settingsRef.current.contains(e.target)) {
                setShowSettings(false);
            }
        };
        if (showSettings) {
            window.addEventListener('mousedown', onClick);
            return () => window.removeEventListener('mousedown', onClick);
        }
    }, [showSettings]);

    const ageLabel = `${age}${ageUnit === 'days' ? 'd' : ageUnit === 'months' ? 'mo' : 'y'}`;
    const sexGlyph = gender === 'female' ? '♀' : '♂';
    const sexAccent = gender === 'female' ? 'text-rose-500' : 'text-sky-500';

    return (
        <div className="bg-surface-2/60 border border-line rounded-xl px-2 py-1.5 flex items-center gap-2 transition-all">
            <button
                onClick={onExpand}
                className="flex-1 flex items-center gap-2 text-left tap-target hover:bg-surface-2/80 rounded-lg px-2 py-1.5 -mx-1 transition-colors"
                aria-label="Edit patient parameters"
                aria-expanded="false"
            >
                <Pencil size={14} className="text-fg-muted flex-shrink-0" />
                <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-bold text-fg text-sm">{ageLabel}</span>
                    <span className={`font-bold text-sm ${sexAccent}`}>{sexGlyph}</span>
                    <span className="text-fg-muted">•</span>
                    <span className="font-bold text-fg text-sm">{weight} <span className="font-normal text-[11px] text-fg-muted">kg</span></span>
                    {height && (
                        <>
                            <span className="text-fg-muted">•</span>
                            <span className="font-bold text-fg text-sm">{height} <span className="font-normal text-[11px] text-fg-muted">cm</span></span>
                        </>
                    )}
                    {isPreemie && (
                        <span className="ml-1 text-[9px] uppercase font-bold text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-700">
                            Preemie
                        </span>
                    )}
                </div>
                <span className="ml-auto hidden sm:inline text-[10px] text-fg-muted uppercase tracking-wide">tap to edit</span>
            </button>

            {/* Settings popover */}
            <div className="relative" ref={settingsRef}>
                <button
                    onClick={(e) => { e.stopPropagation(); setShowSettings(s => !s); }}
                    aria-label="Bar preferences"
                    className="p-1.5 text-fg-muted hover:text-fg rounded-md tap-target"
                >
                    <Settings2 size={14} />
                </button>
                {showSettings && (
                    <div className="absolute right-0 top-full mt-1 w-56 bg-surface border border-line rounded-lg shadow-lg z-50 p-1 text-sm">
                        <button
                            onClick={() => { setPref('auto'); setShowSettings(false); }}
                            className={`w-full text-left px-2 py-1.5 rounded flex items-center gap-2 ${pref === 'auto' ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold' : 'hover:bg-surface-2'}`}
                        >
                            <Clock size={14} />
                            <div className="flex-1">
                                <div>Auto-collapse</div>
                                <div className="text-[10px] text-fg-muted font-normal">Hide after 5 s of inactivity</div>
                            </div>
                        </button>
                        <button
                            onClick={() => { setPref('always-open'); setShowSettings(false); }}
                            className={`w-full text-left px-2 py-1.5 rounded flex items-center gap-2 ${pref === 'always-open' ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold' : 'hover:bg-surface-2'}`}
                        >
                            <Lock size={14} />
                            <div className="flex-1">
                                <div>Always show</div>
                                <div className="text-[10px] text-fg-muted font-normal">Keep the full input bar visible</div>
                            </div>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientChip;
