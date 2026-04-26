import React from 'react';
import { RotateCcw, ChevronUp, Lock, Clock } from 'lucide-react';
import { usePatient } from '../context/PatientContext';

// Full patient parameter form. Used in expanded mode of the collapsible bar.
//
//   bumpInteraction()  resets the parent's auto-collapse timer.
//   onCollapse()       lets the user manually fold without waiting.
//   pref / setPref     wire through to the same dropdown as PatientChip.
const PatientBar = ({ bumpInteraction, onCollapse, pref, setPref }) => {
    const {
        weight, setWeight, age, setAge, ageUnit, setAgeUnit, gender, setGender,
        height, setHeight,
        isPreemie, setIsPreemie, isManualWeight, resetToAutoWeight
    } = usePatient();

    const onChangeAndBump = (setter) => (val) => { setter(val); bumpInteraction(); };

    return (
        <div
            className="bg-surface-2/60 border border-line rounded-xl p-2 flex flex-wrap items-end gap-2 relative"
            onFocus={bumpInteraction}
            onPointerDown={bumpInteraction}
            onKeyDown={bumpInteraction}
        >
            {/* Age */}
            <div className="flex-1 min-w-[140px]">
                <label className="text-[10px] text-fg-muted uppercase font-bold mb-0.5 block">Age</label>
                <div className="flex items-stretch gap-1">
                    <input
                        type="number"
                        value={age}
                        onChange={e => onChangeAndBump(setAge)(Math.max(0, e.target.value))}
                        className="w-16 bg-surface text-fg font-bold text-lg px-2 py-1 rounded-lg outline-none border border-line focus:border-teal-500 text-center"
                        placeholder="0"
                        aria-label="age value"
                    />
                    <div className="flex bg-surface rounded-lg border border-line overflow-hidden">
                        {['days', 'months', 'years'].map(u => (
                            <button
                                key={u}
                                onClick={() => onChangeAndBump(setAgeUnit)(u)}
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
                    onChange={e => onChangeAndBump(setHeight)(Math.max(0, e.target.value))}
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
                            onClick={() => { resetToAutoWeight(); bumpInteraction(); }}
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
                    onChange={e => onChangeAndBump(setWeight)(Math.max(0, e.target.value))}
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
                            onClick={() => onChangeAndBump(setGender)('male')}
                            className={`text-[11px] font-bold px-2 py-1 transition-colors ${gender === 'male' ? 'bg-sky-500 text-white' : 'text-fg-soft'}`}
                            aria-label="male"
                        >
                            M
                        </button>
                        <button
                            onClick={() => onChangeAndBump(setGender)('female')}
                            className={`text-[11px] font-bold px-2 py-1 transition-colors ${gender === 'female' ? 'bg-rose-500 text-white' : 'text-fg-soft'}`}
                            aria-label="female"
                        >
                            F
                        </button>
                    </div>
                    <label className="flex items-center gap-1 cursor-pointer bg-surface px-2 py-1 rounded-lg border border-line hover:border-amber-500 transition-colors">
                        <input
                            type="checkbox"
                            checked={isPreemie}
                            onChange={e => onChangeAndBump(setIsPreemie)(e.target.checked)}
                            className="w-3 h-3 accent-amber-500"
                        />
                        <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">Preemie</span>
                    </label>
                </div>
            </div>

            {/* Collapse / pref toggle */}
            <div className="ml-auto flex items-center gap-1">
                <button
                    onClick={() => setPref(pref === 'auto' ? 'always-open' : 'auto')}
                    title={pref === 'auto' ? 'Auto-collapse: ON (click to keep open)' : 'Always-open: ON (click to enable auto-collapse)'}
                    aria-label="toggle bar preference"
                    className="p-1.5 rounded-md text-fg-muted hover:text-fg tap-target"
                >
                    {pref === 'auto' ? <Clock size={14} /> : <Lock size={14} />}
                </button>
                <button
                    onClick={onCollapse}
                    title="Collapse patient bar"
                    aria-label="collapse patient bar"
                    className="p-1.5 rounded-md text-fg-muted hover:text-teal-600 tap-target"
                >
                    <ChevronUp size={14} />
                </button>
            </div>
        </div>
    );
};

export default PatientBar;
