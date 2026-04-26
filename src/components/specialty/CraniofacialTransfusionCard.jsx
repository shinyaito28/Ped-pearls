import React, { useState, useMemo } from 'react';
import { Brain, AlertTriangle } from 'lucide-react';
import { usePatient } from '../../context/PatientContext';
import { useLanguage } from '../../context/LanguageContext';
import { fmt } from '../../utils/calc';
import { FlowchartShell, Section, Bullets, RequireWeight } from './FlowchartShell';
import {
    surgicalApproaches,
    labTiming, labTimingJa,
    fluidReplacement, fluidReplacementJa,
    productAdministration, productAdministrationJa,
    algorithmSteps,
    productVolumes,
} from '../../data/specialty/flowcharts/craniofacial_transfusion';

const CraniofacialTransfusionCard = ({ entry }) => {
    const { weight } = usePatient();
    const { lang, t } = useLanguage();
    const [approachId, setApproachId] = useState('cvr_foa');
    const [stepId, setStepId] = useState('incision');
    const vols = useMemo(() => productVolumes(weight), [weight]);
    const step = algorithmSteps.find(s => s.id === stepId) || algorithmSteps[0];

    const labs = lang === 'ja' ? labTimingJa : labTiming;
    const fluids = lang === 'ja' ? fluidReplacementJa : fluidReplacement;
    const products = lang === 'ja' ? productAdministrationJa : productAdministration;
    const stepLabel = lang === 'ja' ? step.labelJa : step.label;
    const stepActions = lang === 'ja' ? step.actionsJa : step.actions;

    return (
        <FlowchartShell
            title={t(entry.title, entry.titleJa)}
            subtitle={t(entry.shortDescription, entry.shortDescriptionJa)}
            icon={Brain}
            accent="violet"
            source={entry.source}
            lastReviewed={entry.lastReviewed}
        >
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-[12px] p-2.5 rounded-lg flex items-start gap-2">
                <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" />
                <div>
                    <b>{t('Hb thresholds need verification.', 'Hb 閾値の確認が必要。')}</b> {t("The original PDF's Table 1 (Hb-by-step transfusion triggers) did not extract cleanly. Confirm against source PDF before clinical use.", '原本 PDF の Table 1(ステップ別 Hb 輸血トリガー)は正しく抽出できなかった。臨床使用前に原本 PDF で確認すること。')}
                </div>
            </div>

            {/* Pre-surgery picker */}
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <label className="text-[10px] uppercase font-bold text-fg-muted tracking-wide mb-1 block">{t('Surgical approach', '術式')}</label>
                    <select
                        value={approachId}
                        onChange={e => setApproachId(e.target.value)}
                        className="w-full bg-surface text-fg font-bold px-3 py-2 rounded-lg border border-line focus:border-violet-500 outline-none text-sm"
                    >
                        {surgicalApproaches.map(a => <option key={a.id} value={a.id}>{lang === 'ja' ? a.labelJa : a.label}</option>)}
                    </select>
                </div>
                <div>
                    <label className="text-[10px] uppercase font-bold text-fg-muted tracking-wide mb-1 block">{t('Surgical step', '手術ステップ')}</label>
                    <select
                        value={stepId}
                        onChange={e => setStepId(e.target.value)}
                        className="w-full bg-surface text-fg font-bold px-3 py-2 rounded-lg border border-line focus:border-violet-500 outline-none text-sm"
                    >
                        {algorithmSteps.map(s => <option key={s.id} value={s.id}>{lang === 'ja' ? s.labelJa : s.label}</option>)}
                    </select>
                </div>
            </div>

            <Section title={`${t('Step:', 'ステップ:')} ${stepLabel}`} emphasis="warn">
                <Bullets items={stepActions} />
            </Section>

            <Section title={t('Weight-based product volumes', '体重ベースの製剤量')} emphasis="critical">
                <RequireWeight weight={weight}>
                    {vols && (
                        <div className="bg-surface rounded p-2 border border-current/20 divide-y divide-line">
                            <div className="flex items-baseline justify-between py-1">
                                <span className="font-bold text-fg">pRBC (15 mL/kg)</span>
                                <span className="font-mono font-bold text-rose-700 dark:text-rose-300">{fmt(vols.prbc15)} mL</span>
                            </div>
                            <div className="flex items-baseline justify-between py-1">
                                <span className="font-bold text-fg">{t('Crystalloid (10 mL/kg)', '晶質液 (10 mL/kg)')}</span>
                                <span className="font-mono font-bold text-fg">{fmt(vols.crystalloid10)} mL</span>
                            </div>
                            <div className="flex items-baseline justify-between py-1">
                                <span className="font-bold text-fg">{t('Colloid / albumin (10 mL/kg)', '膠質液 / アルブミン (10 mL/kg)')}</span>
                                <span className="font-mono font-bold text-fg">{fmt(vols.colloid10)} mL</span>
                            </div>
                            <div className="flex items-baseline justify-between py-1">
                                <span className="text-fg-soft text-[12px]">{t('Add FFP after pRBC ≥', 'pRBC が以下以上で FFP 追加: ≥')} {fmt(vols.ffpThreshold)} mL</span>
                            </div>
                        </div>
                    )}
                </RequireWeight>
            </Section>

            <Section title={t('Lab timing', '検体タイミング')} emphasis="info">
                <Bullets items={labs} />
            </Section>

            <Section title={t('Fluid replacement strategy', '輸液補充戦略')} emphasis="info">
                <Bullets items={fluids} />
            </Section>

            <Section title={t('Product administration rules', '製剤投与ルール')} emphasis="warn">
                <Bullets items={products} />
            </Section>
        </FlowchartShell>
    );
};

export default CraniofacialTransfusionCard;
