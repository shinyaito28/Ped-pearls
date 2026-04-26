import React, { useState, useEffect } from 'react';
import { ClipboardCheck, Check, Tag, AlertCircle, ChevronDown, ChevronRight } from 'lucide-react';
import { usePatient } from '../context/PatientContext';
import { setupChecklist, groupLabels } from '../data/cardiac_room_setup';

const STORAGE_KEY = 'ped_pearls_cardiac_setup_state';

const groupAccents = {
    rescue:      { ring: 'ring-rose-300 dark:ring-rose-700',     bg: 'bg-rose-50 dark:bg-rose-950/30',         text: 'text-rose-800 dark:text-rose-300' },
    maintenance: { ring: 'ring-teal-300 dark:ring-teal-700',     bg: 'bg-teal-50 dark:bg-teal-950/30',         text: 'text-teal-800 dark:text-teal-300' },
    monitors:    { ring: 'ring-sky-300 dark:ring-sky-700',       bg: 'bg-sky-50 dark:bg-sky-950/30',           text: 'text-sky-800 dark:text-sky-300' },
    other:       { ring: 'ring-slate-300 dark:ring-slate-700',   bg: 'bg-slate-50 dark:bg-slate-900/40',       text: 'text-slate-700 dark:text-slate-300' }
};

const CardiacRoomSetupCard = () => {
    const { weight } = usePatient();
    const [checked, setChecked] = useState(() => {
        try {
            const v = localStorage.getItem(STORAGE_KEY);
            return v ? JSON.parse(v) : {};
        } catch { return {}; }
    });
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(checked)); } catch { /* noop */ }
    }, [checked]);

    const toggle = (key) => setChecked(prev => ({ ...prev, [key]: !prev[key] }));
    const resetAll = () => setChecked({});

    const completedCount = Object.values(checked).filter(Boolean).length;
    const total = setupChecklist.length;

    const groups = ['rescue', 'maintenance', 'monitors', 'other'].map(g => ({
        id: g,
        label: groupLabels[g],
        items: setupChecklist.filter(i => i.group === g)
    }));

    return (
        <div className="bg-surface border border-line rounded-2xl shadow-sm">
            {/* Header */}
            <button
                onClick={() => setCollapsed(c => !c)}
                className="w-full flex items-center gap-3 p-4 border-b border-line hover:bg-surface-2/40"
                aria-expanded={!collapsed}
            >
                <div className="bg-rose-500/10 text-rose-600 dark:text-rose-400 p-2 rounded-lg">
                    <ClipboardCheck size={18} />
                </div>
                <div className="flex-1 text-left">
                    <h3 className="font-bold text-fg">Pre-induction Room Setup</h3>
                    <p className="text-[11px] text-fg-muted">Same drugs, same place, every time. NCH cardiac OR.</p>
                </div>
                <div className="text-right">
                    <div className="text-xs font-bold text-fg-soft">{completedCount}/{total}</div>
                    <div className="text-[10px] text-fg-muted">checked</div>
                </div>
                {collapsed ? <ChevronRight size={16} className="text-fg-muted" /> : <ChevronDown size={16} className="text-fg-muted" />}
            </button>

            {!collapsed && (
                <div className="p-4 space-y-4">
                    {groups.map(g => {
                        const accent = groupAccents[g.id];
                        return (
                            <div key={g.id}>
                                <div className={`text-[10px] uppercase font-bold tracking-wide mb-2 ${accent.text}`}>
                                    {g.label}
                                </div>
                                <ul className="space-y-1.5">
                                    {g.items.map(item => {
                                        const done = !!checked[item.key];
                                        const computed = item.compute ? item.compute(weight) : null;
                                        return (
                                            <li key={item.key}>
                                                <button
                                                    onClick={() => toggle(item.key)}
                                                    className={`w-full text-left flex items-start gap-3 p-2.5 rounded-lg border ${
                                                        done
                                                            ? `${accent.bg} ${accent.ring} ring-1 border-transparent`
                                                            : 'bg-surface-2/40 border-line hover:border-line-strong'
                                                    } transition-all`}
                                                    aria-pressed={done}
                                                >
                                                    <div className={`flex-shrink-0 mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center ${
                                                        done ? 'bg-emerald-500 border-emerald-500' : 'border-fg-muted'
                                                    }`}>
                                                        {done && <Check size={12} className="text-white" />}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                                                            <span className={`font-bold text-sm ${done ? 'text-fg' : 'text-fg-soft'}`}>
                                                                {item.label}
                                                            </span>
                                                            {item.conc && (
                                                                <span className="text-[11px] font-mono text-fg-muted">
                                                                    {item.conc}
                                                                </span>
                                                            )}
                                                        </div>
                                                        {item.note && (
                                                            <div className="text-[11px] text-fg-muted mt-0.5">{item.note}</div>
                                                        )}
                                                        {computed && (
                                                            <div className={`text-[11px] font-bold mt-1 inline-flex items-center gap-1 px-1.5 py-0.5 rounded ${accent.bg} ${accent.text}`}>
                                                                <Tag size={10} />
                                                                {computed.syringe || computed.dilute}
                                                                {computed.notes && <span className="font-normal text-fg-muted ml-1">— {computed.notes}</span>}
                                                            </div>
                                                        )}
                                                    </div>
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        );
                    })}

                    {completedCount > 0 && (
                        <button
                            onClick={resetAll}
                            className="text-xs text-fg-muted hover:text-rose-600 underline mt-2"
                        >
                            Reset all checkboxes
                        </button>
                    )}

                    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-[11px] p-2.5 rounded-lg flex items-start gap-2">
                        <AlertCircle size={12} className="flex-shrink-0 mt-0.5" />
                        <div>
                            <b>Closed-loop communication:</b> always read-back drug name + dose + volume before administration. In the cath lab, headset on with talk button on.
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardiacRoomSetupCard;
