import React, { useState } from 'react';
import { ChevronDown, ChevronRight, BookMarked, AlertTriangle, Info, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

// Tiny markdown-lite renderer used inside ManualCard sections.
// Supports:
//   - "- item"      → bullets
//   - "**bold**"    → <strong>
// Anything else renders as plain text. Keep it boring on purpose so the
// curated catalog doesn't drift toward arbitrary HTML.
const renderInline = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((p, i) => {
        if (/^\*\*[^*]+\*\*$/.test(p)) {
            return <strong key={i} className="font-bold text-fg">{p.slice(2, -2)}</strong>;
        }
        return <React.Fragment key={i}>{p}</React.Fragment>;
    });
};

const renderBody = (body) => {
    if (!body) return null;
    const lines = body.split('\n');
    const blocks = [];
    let bullets = [];
    const flushBullets = () => {
        if (bullets.length) {
            blocks.push(
                <ul key={`b${blocks.length}`} className="list-disc pl-5 space-y-1 my-1">
                    {bullets.map((b, i) => <li key={i}>{renderInline(b)}</li>)}
                </ul>
            );
            bullets = [];
        }
    };
    for (const raw of lines) {
        const line = raw.trimEnd();
        if (line.startsWith('- ')) {
            bullets.push(line.slice(2));
        } else if (line.trim() === '') {
            flushBullets();
        } else {
            flushBullets();
            blocks.push(<p key={`p${blocks.length}`} className="my-1">{renderInline(line)}</p>);
        }
    }
    flushBullets();
    return blocks;
};

const emphasisStyle = (e) => {
    switch (e) {
        case 'critical':
            return { wrap: 'bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800', heading: 'text-red-800 dark:text-red-200', icon: <ShieldAlert size={14} className="text-red-600 dark:text-red-400" /> };
        case 'warn':
            return { wrap: 'bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800', heading: 'text-amber-800 dark:text-amber-200', icon: <AlertTriangle size={14} className="text-amber-600 dark:text-amber-400" /> };
        case 'info':
            return { wrap: 'bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800', heading: 'text-blue-800 dark:text-blue-200', icon: <Info size={14} className="text-blue-600 dark:text-blue-400" /> };
        default:
            return { wrap: 'bg-surface-2/60 border border-line', heading: 'text-fg', icon: null };
    }
};

const ManualCard = ({ entry, defaultCollapsed = true, onNavigate }) => {
    const [collapsed, setCollapsed] = useState(defaultCollapsed);
    const { t } = useLanguage();

    if (entry.kind !== 'catalog') {
        // Defensive — flowchart entries should be rendered via their dedicated
        // component, not ManualCard.
        return null;
    }

    return (
        <div className="bg-surface border border-line rounded-2xl shadow-sm">
            <button
                onClick={() => setCollapsed(c => !c)}
                className="w-full flex items-center gap-3 p-4 border-b border-line hover:bg-surface-2/40"
                aria-expanded={!collapsed}
            >
                <div className="bg-teal-500/10 text-teal-600 dark:text-teal-400 p-2 rounded-lg">
                    <BookMarked size={18} />
                </div>
                <div className="flex-1 text-left">
                    <h3 className="font-bold text-fg">{t(entry.title, entry.titleJa)}</h3>
                    <p className="text-[11px] text-fg-muted">{t(entry.shortDescription, entry.shortDescriptionJa)}</p>
                </div>
                {collapsed ? <ChevronRight size={16} className="text-fg-muted" /> : <ChevronDown size={16} className="text-fg-muted" />}
            </button>

            {!collapsed && (
                <div className="p-4 space-y-3">
                    {(entry.sections || []).map((sec, i) => {
                        const s = emphasisStyle(sec.emphasis);
                        return (
                            <div key={i} className={`${s.wrap} rounded-lg p-3`}>
                                <div className={`flex items-center gap-1.5 text-[11px] uppercase font-bold tracking-wide mb-1.5 ${s.heading}`}>
                                    {s.icon}
                                    {t(sec.heading, sec.headingJa)}
                                </div>
                                <div className="text-sm text-fg-soft leading-relaxed">
                                    {renderBody(t(sec.body, sec.bodyJa))}
                                </div>
                            </div>
                        );
                    })}

                    {entry.related && entry.related.length > 0 && onNavigate && (
                        <div className="bg-surface-2/40 border border-line rounded-lg p-3">
                            <div className="text-[10px] uppercase font-bold text-fg-muted tracking-wide mb-1.5">{t('Related', '関連')}</div>
                            <div className="flex flex-wrap gap-2">
                                {entry.related.map(rid => (
                                    <button
                                        key={rid}
                                        onClick={() => onNavigate(rid)}
                                        className="text-[11px] px-2 py-1 rounded bg-surface text-fg-soft border border-line hover:border-teal-500"
                                    >
                                        {rid}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="text-[10px] text-fg-muted flex items-center justify-between pt-1 border-t border-line">
                        <span>Source: {entry.source}</span>
                        <span>Reviewed {entry.lastReviewed}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManualCard;
