import React, { useState, useEffect } from 'react';
import { MapPin, RotateCcw, Check } from 'lucide-react';
import { FlowchartShell, Section, Bullets } from './FlowchartShell';
import { introSteps, checklist, closing, STORAGE_KEY } from '../../data/specialty/flowcharts/imri_checklist';

const ImriChecklistCard = ({ entry }) => {
    const [checked, setChecked] = useState(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) return JSON.parse(raw);
        } catch { /* ignore */ }
        return Array(checklist.length).fill(false);
    });

    useEffect(() => {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(checked)); } catch { /* ignore */ }
    }, [checked]);

    const toggle = (i) => setChecked(prev => prev.map((v, idx) => idx === i ? !v : v));
    const reset = () => setChecked(Array(checklist.length).fill(false));

    const completed = checked.filter(Boolean).length;
    const total = checklist.length;
    const allDone = completed === total;

    return (
        <FlowchartShell
            title={entry.title}
            subtitle={`${entry.shortDescription} (${completed}/${total})`}
            icon={MapPin}
            accent="sky"
            source={entry.source}
            lastReviewed={entry.lastReviewed}
        >
            <Section title="Sequence" emphasis="info">
                <Bullets items={introSteps} />
            </Section>

            <Section title="MR-safety checklist" emphasis="warn">
                <div className="space-y-1">
                    {checklist.map((item, i) => (
                        <label
                            key={i}
                            className={`flex items-start gap-2 cursor-pointer p-1.5 rounded ${checked[i] ? 'opacity-50 line-through' : ''}`}
                        >
                            <input
                                type="checkbox"
                                checked={checked[i]}
                                onChange={() => toggle(i)}
                                className="mt-1 w-4 h-4 accent-sky-600 flex-shrink-0"
                            />
                            <span className="text-[13px] text-fg-soft flex-1">{item}</span>
                        </label>
                    ))}
                </div>
                <button
                    onClick={reset}
                    className="mt-2 flex items-center gap-1.5 text-[11px] text-fg-muted hover:text-fg"
                >
                    <RotateCcw size={11} /> Reset checklist
                </button>
            </Section>

            <Section title="Final step" emphasis={allDone ? 'success' : 'plain'}>
                {allDone ? (
                    <div className="flex items-center gap-2 font-bold">
                        <Check size={16} /> {closing}
                    </div>
                ) : (
                    <div>{closing}</div>
                )}
            </Section>
        </FlowchartShell>
    );
};

export default ImriChecklistCard;
