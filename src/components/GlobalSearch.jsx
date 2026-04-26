import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, Pill, Anchor, Stethoscope, ShieldAlert, Beaker, Pin, HeartPulse, Library } from 'lucide-react';
import { useDrugList } from '../hooks/useDrugList';
import { sedationList } from '../data/sedation';
import { allEntries as specialtyEntries, findHub } from '../data/specialty';
import { useLanguage } from '../context/LanguageContext';

// Section catalog — the original 18 hardcoded sections of the app's existing
// tabs. Specialty entries (NCH manual library) are layered on top via
// `specialtyEntries` below.
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
    { id: 'roomsetup',   tab: 'cardiac',     icon: HeartPulse,   label: 'Cardiac — Room setup checklist (rescue + maintenance)', keywords: ['setup', 'rescue', 'syringe', 'taping', 'epinephrine', 'phenylephrine', 'cacl', 'calcium', 'cardiac room'] },
    { id: 'heparin',     tab: 'cardiac',     icon: HeartPulse,   label: 'Cardiac — Heparin / Protamine calculator', keywords: ['heparin', 'protamine', 'act', 'hpt', 'anticoag', 'anticoagulation', 'nch', 'u of m', 'hms', 'reversal', 'ATIII', 'antithrombin'] },
    { id: 'transfusion', tab: 'cardiac',     icon: HeartPulse,   label: 'Cardiac — Transfusion protocol (NCH 2.0)', keywords: ['transfusion', 'txa', 'tranexamic', 'norwood', 'arterial switch', 'ao arch', 'comprehensive', 'factor vii', 'pall filter', 'blood prime'] },
    { id: 'travel',      tab: 'cardiac',     icon: HeartPulse,   label: 'Cardiac — TRAVEL pneumonic + OR timeline', keywords: ['travel', 'temperature', 'rhythm', 'air on tee', 'ventilation', 'electrolytes', 'table level', 'timeline', 'precedex', 'milrinone', 'cefazolin', 'muf'] },
    { id: 'npo',         tab: 'reference',   icon: Pin,          label: 'NPO calculator',             keywords: ['npo', 'fasting', 'fast', 'clear liquid', 'breast milk', 'formula'] },
    { id: 'preop',       tab: 'reference',   icon: Pin,          label: 'Pre-op assessment (ASA-PS, POVOC, CL)', keywords: ['asa', 'asa-ps', 'apfel', 'povoc', 'cormack', 'lehane', 'preop'] },
    { id: 'reference',   tab: 'reference',   icon: Pin,          label: 'Reference (IE Ppx, Standard Cart, links)', keywords: ['ie', 'endocarditis', 'prophylaxis', 'cart', 'antibiotic', 'amoxicillin'] },
];

// Build a unified search corpus on first render. Both legacy sections and
// NCH specialty entries get a normalised shape for Fuse.js.
const buildCorpus = () => {
    const sections = SECTIONS.map(s => ({
        kind: 'section',
        id: s.id,
        label: s.label,
        keywords: s.keywords.join(' '),
        tabHint: s.tab.toUpperCase(),
        nav: { tab: s.tab },
        icon: s.icon,
    }));

    const specialty = specialtyEntries.map(e => {
        const hub = findHub(e.hub);
        return {
            kind: 'specialty',
            id: e.id,
            label: e.title,
            keywords: [
                ...(e.tags || []),
                e.shortDescription || '',
                hub ? hub.label : '',
            ].join(' '),
            tabHint: hub ? hub.label.toUpperCase() : 'SPECIALTY',
            nav: { tab: 'specialty', hubId: e.hub },
            emergency: e.emergency,
            icon: Library,
        };
    });

    return [...sections, ...specialty];
};

const GlobalSearch = ({ onClose, onNavigate }) => {
    const inputRef = useRef(null);
    const [query, setQuery] = useState('');
    const [fuse, setFuse] = useState(null);
    const drugs = useDrugList('all');
    const { t } = useLanguage();

    const corpus = useMemo(() => buildCorpus(), []);

    // Lazy-load Fuse.js so the initial bundle stays small. The first ⌘K open
    // pays the import cost (~12 KB gz); subsequent opens reuse the index.
    useEffect(() => {
        let cancelled = false;
        import('fuse.js').then(({ default: Fuse }) => {
            if (cancelled) return;
            const f = new Fuse(corpus, {
                keys: [
                    { name: 'label', weight: 0.6 },
                    { name: 'keywords', weight: 0.4 },
                ],
                threshold: 0.35,
                ignoreLocation: true,
                minMatchCharLength: 2,
            });
            setFuse(f);
        });
        return () => { cancelled = true; };
    }, [corpus]);

    useEffect(() => {
        inputRef.current?.focus();
        const onKey = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) {
            return { drugs: [], sedation: [], sections: SECTIONS, specialty: corpus.filter(c => c.kind === 'specialty') };
        }

        // Drugs and sedation keep their direct substring match — fast and
        // already deterministic for clinical names.
        const drugResults = drugs.filter(d =>
            d.name.toLowerCase().includes(q) ||
            d.cat.toLowerCase().includes(q) ||
            (d.note && d.note.toLowerCase().includes(q))
        ).slice(0, 12);

        const sedationResults = sedationList.filter(s =>
            s.agent.toLowerCase().includes(q) ||
            (s.note && s.note.toLowerCase().includes(q))
        ).slice(0, 6);

        // Sections + specialty entries go through Fuse if it's loaded.
        // Fall back to substring matching while the dynamic import resolves.
        let unifiedHits;
        if (fuse) {
            unifiedHits = fuse.search(q).map(r => r.item);
        } else {
            unifiedHits = corpus.filter(c =>
                c.label.toLowerCase().includes(q) ||
                c.keywords.toLowerCase().includes(q)
            );
        }

        const sectionHits = unifiedHits.filter(h => h.kind === 'section').slice(0, 12);
        const specialtyHits = unifiedHits.filter(h => h.kind === 'specialty').slice(0, 12);

        const reSections = sectionHits.map(h => SECTIONS.find(s => s.id === h.id)).filter(Boolean);

        return {
            drugs: drugResults,
            sedation: sedationResults,
            sections: reSections,
            specialty: specialtyHits,
        };
    }, [query, drugs, fuse, corpus]);

    const goto = (nav) => {
        onNavigate(nav);
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
                        placeholder={t('Search drugs, sections, specialty manuals…  (Esc to close)', '薬剤・セクション・専門マニュアルを検索…  (Escで閉じる)')}
                        className="flex-1 bg-transparent text-fg placeholder:text-fg-muted outline-none text-base"
                    />
                    <button onClick={onClose} className="p-1 text-fg-muted hover:text-fg" aria-label="close">
                        <X size={18} />
                    </button>
                </div>

                <div className="overflow-y-auto divide-y divide-line">
                    {/* Sections (legacy hardcoded sections of original tabs) */}
                    {results.sections.length > 0 && (
                        <div>
                            <div className="px-4 py-2 text-[10px] uppercase font-bold text-fg-muted tracking-wide">{t('Sections', 'セクション')}</div>
                            <ul>
                                {results.sections.map(s => {
                                    const Icon = s.icon;
                                    return (
                                        <li key={s.id}>
                                            <button
                                                onClick={() => goto({ tab: s.tab })}
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

                    {/* Specialty manuals */}
                    {results.specialty.length > 0 && (
                        <div>
                            <div className="px-4 py-2 text-[10px] uppercase font-bold text-fg-muted tracking-wide">
                                {t('Specialty manuals', '専門マニュアル')} ({results.specialty.length})
                            </div>
                            <ul>
                                {results.specialty.map(s => (
                                    <li key={s.id}>
                                        <button
                                            onClick={() => goto(s.nav)}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-surface-2 text-left"
                                        >
                                            <Library size={16} className={s.emergency ? 'text-red-500' : 'text-teal-500'} />
                                            <span className="text-fg font-medium flex-1">{s.label}</span>
                                            <span className="text-[10px] text-fg-muted uppercase tracking-wide">{s.tabHint}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Drugs */}
                    {results.drugs.length > 0 && (
                        <div>
                            <div className="px-4 py-2 text-[10px] uppercase font-bold text-fg-muted tracking-wide">
                                {t('Drugs', '薬剤')} ({results.drugs.length})
                            </div>
                            <ul>
                                {results.drugs.map(d => (
                                    <li key={d.id}>
                                        <button
                                            onClick={() => goto({ tab: 'all_drugs' })}
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
                                                    <div className="text-[9px] uppercase font-bold text-red-600">{t('not for this age', 'この年齢では禁忌')}</div>
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
                                {t('Sedation / Adjuncts', '鎮静 / 補助薬')}
                            </div>
                            <ul>
                                {results.sedation.map((s, i) => (
                                    <li key={i}>
                                        <button
                                            onClick={() => goto({ tab: 'sedation' })}
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

                    {query && results.sections.length === 0 && results.drugs.length === 0 && results.sedation.length === 0 && results.specialty.length === 0 && (
                        <div className="p-8 text-center text-fg-muted text-sm">
                            {t('No matches. Try a different keyword (e.g. "epi", "sevoflurane", "MH", "mediastinal").', '該当なし。別のキーワードをお試しください (例: "epi", "sevoflurane", "MH", "mediastinal")')}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GlobalSearch;
