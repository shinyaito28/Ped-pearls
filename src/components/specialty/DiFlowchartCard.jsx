import React, { useState, useMemo } from 'react';
import { Brain } from 'lucide-react';
import { usePatient } from '../../context/PatientContext';
import { useLanguage } from '../../context/LanguageContext';
import { fmt } from '../../utils/calc';
import { FlowchartShell, Section, Bullets, KeyValue, RequireWeight } from './FlowchartShell';
import {
    initialOrders, initialOrdersJa,
    suspectedNewOnsetWorkup, suspectedNewOnsetWorkupJa,
    newOnsetCriteria,
    naBands,
    freeWaterDeficit,
    vasopressinStart,
    vasopressinNotes, vasopressinNotesJa,
} from '../../data/specialty/flowcharts/di_flowchart';

const DiFlowchartCard = ({ entry }) => {
    const { weight } = usePatient();
    const { lang, t } = useLanguage();
    const [presentation, setPresentation] = useState('known'); // 'known' | 'suspected'
    const [naBand, setNaBand] = useState('normo');
    const [naActual, setNaActual] = useState('');
    const [naGoal, setNaGoal] = useState('145');

    const fwd = useMemo(
        () => freeWaterDeficit(weight, naActual, naGoal),
        [weight, naActual, naGoal]
    );
    const vaso = useMemo(() => vasopressinStart(weight), [weight]);

    const band = naBands.find(b => b.id === naBand);
    const initOrders = lang === 'ja' ? initialOrdersJa : initialOrders;
    const workup = lang === 'ja' ? suspectedNewOnsetWorkupJa : suspectedNewOnsetWorkup;
    const criteriaLabel = lang === 'ja' ? newOnsetCriteria.labelJa : newOnsetCriteria.label;
    const criteriaItems = lang === 'ja' ? newOnsetCriteria.itemsJa : newOnsetCriteria.items;
    const vasoNotes = lang === 'ja' ? vasopressinNotesJa : vasopressinNotes;

    return (
        <FlowchartShell
            title={t(entry.title, entry.titleJa)}
            subtitle={t(entry.shortDescription, entry.shortDescriptionJa)}
            icon={Brain}
            accent="violet"
            source={entry.source}
            lastReviewed={entry.lastReviewed}
        >
            {/* Presentation picker */}
            <div>
                <label className="text-[10px] uppercase font-bold text-fg-muted tracking-wide mb-1 block">{t('Presentation', '臨床像')}</label>
                <div className="flex bg-surface-2/60 rounded-xl p-1 border border-line">
                    {[
                        { id: 'known', label: t('Known DI', '既知 DI') },
                        { id: 'suspected', label: t('Suspected new-onset', '新規発症疑い') },
                    ].map(opt => {
                        const active = presentation === opt.id;
                        return (
                            <button
                                key={opt.id}
                                onClick={() => setPresentation(opt.id)}
                                className={`flex-1 py-2 px-2 rounded-lg text-xs font-bold transition-all ${active ? 'bg-surface shadow-sm ring-2 ring-violet-500 text-violet-700 dark:text-violet-300' : 'text-fg-soft hover:bg-surface'}`}
                            >
                                {opt.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <Section title={t('Initial orders (all DI patients)', '初期オーダー(全 DI 患者)')} emphasis="info">
                <Bullets items={initOrders} />
            </Section>

            {presentation === 'suspected' && (
                <>
                    <Section title={t('Suspected new-onset workup', '新規発症疑いの精査')} emphasis="warn">
                        <Bullets items={workup} />
                    </Section>
                    <Section title={criteriaLabel} emphasis="critical">
                        <Bullets items={criteriaItems} />
                    </Section>
                </>
            )}

            {/* Na+ band picker */}
            <div>
                <label className="text-[10px] uppercase font-bold text-fg-muted tracking-wide mb-1 block">{t('Current sodium band', '現在の Na 値帯')}</label>
                <div className="grid grid-cols-3 gap-2">
                    {naBands.map(b => {
                        const active = naBand === b.id;
                        return (
                            <button
                                key={b.id}
                                onClick={() => setNaBand(b.id)}
                                className={`p-2 rounded-lg border text-left text-xs transition-all ${active ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-200' : 'border-line bg-surface text-fg-soft hover:border-violet-300'}`}
                            >
                                <div className="font-bold">{lang === 'ja' ? b.labelJa : b.label}</div>
                                <div className="text-[10px] mt-0.5">{b.range}</div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {band && (
                <Section title={`${lang === 'ja' ? band.labelJa : band.label} — ${t('actions', '対応')}`} emphasis={band.id === 'hyper' || band.id === 'hypo' ? 'critical' : 'success'}>
                    <Bullets items={lang === 'ja' ? band.actionsJa : band.actions} />
                    {band.critical && (
                        <div className="mt-2 text-[12px] italic text-fg-soft">⚠ {lang === 'ja' ? band.criticalJa : band.critical}</div>
                    )}
                    {band.etiology && band.etiology.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-current/10">
                            <div className="text-[10px] uppercase font-bold mb-1 opacity-70">{t('Etiology to consider', '想定病因')}</div>
                            <Bullets items={lang === 'ja' ? band.etiologyJa : band.etiology} className="opacity-90" />
                        </div>
                    )}
                </Section>
            )}

            {/* Free water deficit calculator (hypernatremia) */}
            {naBand === 'hyper' && (
                <Section title={t('Free water deficit calculator', '自由水不足量計算機')} emphasis="warn">
                    <div className="grid grid-cols-2 gap-2 mb-2">
                        <div>
                            <label className="text-[10px] text-fg-muted block mb-0.5">{t('Na+ actual', 'Na+ 実測値')}</label>
                            <input
                                type="number"
                                inputMode="decimal"
                                value={naActual}
                                onChange={e => setNaActual(e.target.value)}
                                placeholder="155"
                                className="w-full bg-surface text-fg font-mono px-2 py-1.5 rounded border border-line outline-none focus:border-amber-500"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] text-fg-muted block mb-0.5">{t('Na+ goal', 'Na+ 目標')}</label>
                            <input
                                type="number"
                                inputMode="decimal"
                                value={naGoal}
                                onChange={e => setNaGoal(e.target.value)}
                                className="w-full bg-surface text-fg font-mono px-2 py-1.5 rounded border border-line outline-none focus:border-amber-500"
                            />
                        </div>
                    </div>
                    <RequireWeight weight={weight}>
                        {fwd ? (
                            <div className="bg-surface rounded p-2 border border-amber-300 dark:border-amber-700">
                                <KeyValue k={t('Free water deficit', '自由水不足量')} v={`${fmt(fwd.deficitL)} L (${fmt(fwd.deficitmL)} mL)`} accent="amber-700 dark:text-amber-300" />
                                <KeyValue k={t('Replace over 24 h →', '24 時間で補充 →')} v={`${fmt(fwd.ratemLperHr)} mL/hr ${t('of D5 ½NS', 'の D5 ½NS')}`} />
                                <div className="text-[10px] font-mono text-fg-muted mt-1">{fwd.formula}</div>
                            </div>
                        ) : (
                            <div className="text-[12px] text-fg-muted italic">{t('Enter Na+ actual to compute.', '計算には Na+ 実測値を入力。')}</div>
                        )}
                    </RequireWeight>
                </Section>
            )}

            {/* Vasopressin drip — relevant for ICU management */}
            <Section title={t('Vasopressin drip (ICU)', 'バソプレシン持続 (ICU)')} emphasis="critical">
                <RequireWeight weight={weight}>
                    {vaso && (
                        <div className="bg-surface rounded p-2 border border-red-300 dark:border-red-700 mb-2">
                            <KeyValue k={t('Start dose', '開始用量')} v={`${fmt(vaso.startMilliUperHr)} mU/hr`} accent="red-700 dark:text-red-300" />
                            <KeyValue k={t('Titration step', '漸増ステップ')} v={`${fmt(vaso.titrationStepLow)}–${fmt(vaso.titrationStepHigh)} mU/hr q30min`} />
                            <KeyValue k={t('Target UOP', '目標 UOP')} v={`${fmt(vaso.targetUOPlow)}–${fmt(vaso.targetUOPhigh)} mL/hr`} />
                        </div>
                    )}
                </RequireWeight>
                <Bullets items={vasoNotes} />
            </Section>
        </FlowchartShell>
    );
};

export default DiFlowchartCard;
