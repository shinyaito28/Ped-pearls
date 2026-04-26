import React, { useState } from 'react';
import { ChevronDown, ChevronRight, AlertTriangle, ShieldAlert, Info, Check } from 'lucide-react';

// Shared collapsible wrapper for flowchart cards. Provides the same header
// shape as TransfusionProtocolCard so the Specialty hub feels consistent
// with the existing Cardiac tab.

export const FlowchartShell = ({
    title,
    subtitle,
    icon: Icon,
    accent = 'teal',
    source,
    lastReviewed,
    defaultCollapsed = true,
    children,
}) => {
    const [collapsed, setCollapsed] = useState(defaultCollapsed);

    return (
        <div className="bg-surface border border-line rounded-2xl shadow-sm">
            <button
                onClick={() => setCollapsed(c => !c)}
                className="w-full flex items-center gap-3 p-4 border-b border-line hover:bg-surface-2/40"
                aria-expanded={!collapsed}
            >
                <div className={`bg-${accent}-500/10 text-${accent}-600 dark:text-${accent}-400 p-2 rounded-lg`}>
                    {Icon ? <Icon size={18} /> : null}
                </div>
                <div className="flex-1 text-left">
                    <h3 className="font-bold text-fg">{title}</h3>
                    <p className="text-[11px] text-fg-muted">{subtitle}</p>
                </div>
                {collapsed ? <ChevronRight size={16} className="text-fg-muted" /> : <ChevronDown size={16} className="text-fg-muted" />}
            </button>

            {!collapsed && (
                <div className="p-4 space-y-4">
                    {children}
                    {(source || lastReviewed) && (
                        <div className="text-[10px] text-fg-muted flex items-center justify-between pt-2 border-t border-line">
                            {source && <span>Source: {source}</span>}
                            {lastReviewed && <span>Reviewed {lastReviewed}</span>}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const emphasisMap = {
    critical: { wrap: 'bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800',       heading: 'text-red-800 dark:text-red-200',     icon: ShieldAlert },
    warn:     { wrap: 'bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800', heading: 'text-amber-800 dark:text-amber-200', icon: AlertTriangle },
    info:     { wrap: 'bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800',     heading: 'text-blue-800 dark:text-blue-200',   icon: Info },
    success:  { wrap: 'bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800', heading: 'text-emerald-800 dark:text-emerald-200', icon: Check },
    plain:    { wrap: 'bg-surface-2/60 border border-line',                                              heading: 'text-fg',                            icon: null },
};

export const Section = ({ title, emphasis = 'plain', children }) => {
    const s = emphasisMap[emphasis] || emphasisMap.plain;
    const I = s.icon;
    return (
        <div className={`${s.wrap} rounded-lg p-3`}>
            {title && (
                <div className={`flex items-center gap-1.5 text-[11px] uppercase font-bold tracking-wide mb-2 ${s.heading}`}>
                    {I && <I size={14} />}
                    {title}
                </div>
            )}
            <div className="text-sm text-fg-soft">{children}</div>
        </div>
    );
};

export const Bullets = ({ items, className = '' }) => (
    <ul className={`list-disc pl-5 space-y-1 ${className}`}>
        {items.map((it, i) => <li key={i}>{it}</li>)}
    </ul>
);

export const KeyValue = ({ k, v, accent = 'fg' }) => (
    <div className="flex items-baseline justify-between gap-2 py-0.5">
        <span className="text-[12px] text-fg-soft">{k}</span>
        <span className={`font-mono font-bold text-${accent}`}>{v}</span>
    </div>
);

// Common pattern: "needs a positive weight" guard for weight-aware cards.
export const RequireWeight = ({ weight, children }) => {
    const w = parseFloat(weight) || 0;
    if (w <= 0) {
        return (
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs p-2.5 rounded-lg flex items-center gap-2">
                <AlertTriangle size={14} />
                Enter a positive weight in the patient bar to compute doses.
            </div>
        );
    }
    return children;
};
