import React, { useState, useRef, useEffect } from 'react';
import { Info } from 'lucide-react';
import { lookupTerm } from '../data/rotem_glossary';
import { useLanguage } from '../context/LanguageContext';

// Small (i) icon next to a label that shows a definition popover on
// hover (desktop) or tap (mobile). Term is looked up against the
// rotem_glossary; unknown keys render a passthrough span.
const RotemTooltip = ({ term, size = 12 }) => {
    const entry = lookupTerm(term);
    const { lang } = useLanguage();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (!open) return;
        const onClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        const onEsc = (e) => { if (e.key === 'Escape') setOpen(false); };
        window.addEventListener('mousedown', onClick);
        window.addEventListener('keydown', onEsc);
        return () => {
            window.removeEventListener('mousedown', onClick);
            window.removeEventListener('keydown', onEsc);
        };
    }, [open]);

    if (!entry) return null;
    const body = lang === 'ja' && entry.bodyJa ? entry.bodyJa : entry.body;

    return (
        <span ref={ref} className="relative inline-block">
            <button
                type="button"
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                onClick={(e) => { e.stopPropagation(); setOpen(o => !o); }}
                onFocus={() => setOpen(true)}
                onBlur={() => setOpen(false)}
                aria-label={`Definition of ${entry.title}`}
                className="text-fg-muted hover:text-teal-500 align-middle"
            >
                <Info size={size} />
            </button>
            {open && (
                <span
                    role="tooltip"
                    className="absolute left-0 top-full mt-1 w-64 z-50 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-[11px] leading-relaxed p-2.5 rounded-md shadow-xl border border-slate-700 dark:border-slate-300 normal-case"
                >
                    <span className="block font-bold mb-1">{entry.title}</span>
                    <span className="block">{body}</span>
                </span>
            )}
        </span>
    );
};

export default RotemTooltip;
