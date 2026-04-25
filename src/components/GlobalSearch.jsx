import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, Pill, Anchor, Stethoscope, ShieldAlert, Beaker, Pin, HeartPulse } from 'lucide-react';
import { useDrugList } from '../hooks/useDrugList';
import { drugList } from '../data/drugs';
import { sedationList } from '../data/sedation';

// Section catalog — used to build a unified search index across the app.
const SECTIONS = [
    { id: 'emergency',   tab: 'emergency',   icon: ShieldAlert,  label: 'Emergency / Crisis',         keywords: ['crisis', 'code', 'arrest', 'mh', 'malignant hyperthermia', 'last', 'anaphylaxis', 'shock', 'defibrillation', 'cardioversion'] },
    { id: 'mh',          tab: 'emergency',   icon: ShieldAlert,  label: 'Malignant Hyperthermia protocol', keywords: ['mh', 'malignant hyperthermia', 'dantrolene'] },
    { id: 'shock',       tab: 'emergency',   icon: ShieldAlert,  label: 'Counter Shock (Defib / Cardioversion)', keywords: ['joule', 'biphasic', 'defib', 'cardioversion', 'shock'] },
    { id: 'fluids',      tab: 'fluids',      icon: Beaker,       label: 'Fluids & Blood products',    keywords: ['maintenance', 'tbv', 'abl', 'albumin', 'rbc', 'platelet', 'hetastarch', 'buffered saline', '4-2-1'] },
    { id: 'tracker',     tab: 'fluids',      icon: Beaker,       label: 'OR Tracker (EBL / IVF / UOP)', keywords: ['ebl', 'tracker', 'blood loss', 'urine', 'output', 'transfusion'] },
    { id: 'airway',      tab: 'airway',      icon: Stethoscope,  label: 'Airway (ETT, LMA, OLV)',     keywords: ['ett', 'lma', 'tube', 'blade', 'olv', 'intubation', 'depth', 'miller', 'mac'] },
    { id: 'catheter',    tab: 'airway',      icon: Stethoscope,  label: 'Intravascular Catheter sizes', keywords: ['arterial', 'cvl', 'central line', 'catheter', 'french', 'gauge'] },
    { id: 'difficult',   tab: 'airway',      icon: Stethoscope,  label: 'Difficult Airway (DAS / APA)', keywords: ['difficult airway', 'das', 'apa', 'cico', 'cicv', 'cricothyroidotomy', 'fona'] },
    { id: 'regional',    tab: 'regional',    icon: Anchor,       label: 'Regional anesthesia',        keywords: ['caudal', 'spinal', 'epidural', 'penile', 'block', 'lido', 'bupi', 'ropi', 'chloro', 'last'] },
    { id: 'sedation',    tab: 'sedation',    icon: Pill,         label: 'Sedation / Adjuncts',        keywords: ['ketamine', 'midaz', 'dexmed', 'pentobarbital', 'ketazolam', 'pre-med'] },
    { id: 'infusion',    tab: 'all_drugs',   icon: Pill,         label: 'Infusion calculator (mcg/kg/min ↔ mL/hr)', keywords: ['infusion', 'pump', 'syringe', 'mcg/kg/min', 'mL/hr', 'rate', 'concentration'] },
    { id: 'physio',      tab: 'corrections', icon: Beaker,       label: 'Physio (electrolytes, acidosis, vitals)', keywords: ['k', 'potassium', 'bicarb', 'glucose', 'hyperkalemia', 'vitals', 'hr', 'rr', 'sbp'] },
    { id: 'cardiac',     tab: 'cardiac',     icon: HeartPulse,   label: 'Cardiac — ROTEM post-bypass blood products', keywords: ['cardiac', 'rotem', 'heptem', 'fibtem', 'extem', 'cpb', 'bypass', 'kcentra', 'cryo', 'cryoprecipitate', 'platelet', 'ffp', 'cardiopulmonary', 'a10', 'mcf', 'cft', 'neonate cardiac'] },
    { id: 'npo',         tab: 'reference',   icon: Pin,          label: 'NPO calculator',             keywords: ['npo', 'fasting', 'fast', 'clear liquid', 'breast milk', 'formula'] },
    { id: 'preop',       tab: 'reference',   icon: Pin,          label: 'Pre-op assessment (ASA-PS, POVOC, CL)', keywords: ['asa', 'asa-ps', 'apfel', 'povoc', 'cormack', 'lehane', 'preop'] },
    { id: 'reference',   tab: 'reference',   icon: Pin,          label: 'Reference (IE Ppx, Standard Cart, links)', keywords: ['ie', 'endocarditis', 'prophylaxis', 'cart', 'antibiotic', 'amoxicillin'] },
];

const GlobalSearch = ({ onClose, onNavigate }) => {
    const inputRef = useRef(null);
    const [query, setQuery] = useState('');
    const drugs = useDrugList('all');

    useEffect(() => {
        inputRef.current?.focus();
        const onKey = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) {
            return { drugs: [], sedation: [], sections: SECTIONS };
        }

        const drugResults = drugs.filter(d =>
            d.name.toLowerCase().includes(q) ||
            d.cat.toLowerCase().includes(q) ||
            (d.note && d.note.toLowerCase().includes(q))
        ).slice(0, 12);

        const sedationResults = sedationList.filter(s =>
            s.agent.toLowerCase().includes(q) ||
            (s.note && s.note.toLowerCase().includes(q))
        ).slice(0, 6);

        const sectionResults = SECTIONS.filter(s =>
            s.label.toLowerCase().includes(q) ||
            s.keywords.some(k => k.includes(q))
        );

        return { drugs: drugResults, sedation: sedationResults, sections: sectionResults };
    }, [query, drugs]);

    const goto = (tabId) => {
        onNavigate(tabId);
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-start justify-center p-4 pt-[10vh]"
            onClick={onClose}
        >
            <div
                className="w-full max-w-2xl bg-surface text-fg rounded-2xl shadow-2xl border border-line overflow-hidden flex flex-col max-h-[80vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center gap-2 px-4 py-3 border-b border-line">
                    <Search size={18} className="text-fg-muted" />
                    <input
                        ref={inputRef}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search drugs, sections, formulas…  (Esc to close)"
                        className="flex-1 bg-transparent text-fg placeholder:text-fg-muted outline-none text-base"
                    />
                    <button onClick={onClose} className="p-1 text-fg-muted hover:text-fg" aria-label="close">
                        <X size={18} />
                    </button>
                </div>

                <div className="overflow-y-auto divide-y divide-line">
                    {/* Sections */}
                    {results.sections.length > 0 && (
                        <div>
                            <div className="px-4 py-2 text-[10px] uppercase font-bold text-fg-muted tracking-wide">Sections</div>
                            <ul>
                                {results.sections.map(s => {
                                    const Icon = s.icon;
                                    return (
                                        <li key={s.id}>
                                            <button
                                                onClick={() => goto(s.tab)}
                                                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-surface-2 text-left"
                                            >
                                                <Icon size={16} className="text-teal-500" />
                                                <span className="text-fg font-medium flex-1">{s.label}</span>
                                                <span className="text-[10px] text-fg-muted uppercase tracking-wide">{s.tab}</span>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}

                    {/* Drugs */}
                    {results.drugs.length > 0 && (
                        <div>
                            <div className="px-4 py-2 text-[10px] uppercase font-bold text-fg-muted tracking-wide">
                                Drugs ({results.drugs.length})
                            </div>
                            <ul>
                                {results.drugs.map(d => (
                                    <li key={d.id}>
                                        <button
                                            onClick={() => goto('all_drugs')}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-surface-2 text-left"
                                        >
                                            <Pill size={16} className="text-teal-500" />
                                            <div className="flex-1 min-w-0">
                                                <div className="text-fg font-medium truncate">{d.name}</div>
                                                <div className="text-[11px] text-fg-muted truncate">{d.cat} • {d.realDose}</div>
                                            </div>
                                            <div className="text-right whitespace-nowrap">
                                                <div className="text-fg font-bold">{d.calc}</div>
                                                {d.badge === 'contraindicated' && (
                                                    <div className="text-[9px] uppercase font-bold text-red-600">not for this age</div>
                                                )}
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Sedation */}
                    {results.sedation.length > 0 && (
                        <div>
                            <div className="px-4 py-2 text-[10px] uppercase font-bold text-fg-muted tracking-wide">
                                Sedation / Adjuncts
                            </div>
                            <ul>
                                {results.sedation.map((s, i) => (
                                    <li key={i}>
                                        <button
                                            onClick={() => goto('sedation')}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-surface-2 text-left"
                                        >
                                            <Pill size={16} className="text-indigo-500" />
                                            <div className="flex-1 min-w-0">
                                                <div className="text-fg font-medium truncate">{s.agent}</div>
                                                <div className="text-[11px] text-fg-muted truncate">{s.dose}</div>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {query && results.sections.length === 0 && results.drugs.length === 0 && results.sedation.length === 0 && (
                        <div className="p-8 text-center text-fg-muted text-sm">
                            No matches. Try a different keyword (e.g. "epi", "sevoflurane", "MH").
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GlobalSearch;
