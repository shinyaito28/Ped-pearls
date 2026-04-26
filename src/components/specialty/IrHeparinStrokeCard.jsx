import React, { useMemo } from 'react';
import { MapPin } from 'lucide-react';
import { usePatient } from '../../context/PatientContext';
import { useLanguage } from '../../context/LanguageContext';
import { FlowchartShell, Section, Bullets, RequireWeight } from './FlowchartShell';
import {
    heparinConcentration,
    weightTiers,
    tierForWeight,
    setupSteps, setupStepsJa,
    monitoringSteps, monitoringStepsJa,
    documentationSteps, documentationStepsJa,
    strokeProtocolScheduling, strokeProtocolSchedulingJa,
    strokeProtocolImaging, strokeProtocolImagingJa,
    strokeProtocolWorkflow, strokeProtocolWorkflowJa,
} from '../../data/specialty/flowcharts/ir_heparin_stroke';

const IrHeparinStrokeCard = ({ entry }) => {
    const { weight } = usePatient();
    const { lang, t } = useLanguage();
    const tier = useMemo(() => tierForWeight(weight), [weight]);

    const setup = lang === 'ja' ? setupStepsJa : setupSteps;
    const monitor = lang === 'ja' ? monitoringStepsJa : monitoringSteps;
    const docs = lang === 'ja' ? documentationStepsJa : documentationSteps;
    const sched = lang === 'ja' ? strokeProtocolSchedulingJa : strokeProtocolScheduling;
    const imaging = lang === 'ja' ? strokeProtocolImagingJa : strokeProtocolImaging;
    const workflow = lang === 'ja' ? strokeProtocolWorkflowJa : strokeProtocolWorkflow;

    return (
        <FlowchartShell
            title={t(entry.title, entry.titleJa)}
            subtitle={t(entry.shortDescription, entry.shortDescriptionJa)}
            icon={MapPin}
            accent="sky"
            source={entry.source}
            lastReviewed={entry.lastReviewed}
        >
            <Section title={t('Heparin solution', 'ヘパリン溶液')} emphasis="info">
                <div className="font-bold text-fg">{heparinConcentration}</div>
                <div className="text-[12px] text-fg-muted mt-0.5">{t('Standardized concentration for the dedicated infusion pump.', '専用持続ポンプ用の標準濃度。')}</div>
            </Section>

            <Section title={t('Weight-tier infusion rate', '体重区分別持続レート')} emphasis="critical">
                <RequireWeight weight={weight}>
                    <div className="bg-surface rounded p-2 border border-current/20 divide-y divide-line">
                        {weightTiers.map(tt => {
                            const active = tier && tt.id === tier.id;
                            return (
                                <div key={tt.id} className={`flex items-baseline justify-between py-1.5 ${active ? 'font-bold' : 'opacity-60'}`}>
                                    <span className={active ? 'text-red-700 dark:text-red-300' : 'text-fg'}>{tt.label}</span>
                                    <span className={`font-mono ${active ? 'text-red-700 dark:text-red-300' : 'text-fg'}`}>{tt.rateMlPerHr} mL/hr</span>
                                </div>
                            );
                        })}
                    </div>
                    {tier && (
                        <div className="mt-2 text-[12px] text-fg-soft">
                            {t('Current weight', '現在の体重')} {parseFloat(weight)} kg → <b className="text-red-700 dark:text-red-300">{tier.label} {t('tier', '区分')}</b>
                        </div>
                    )}
                </RequireWeight>
            </Section>

            <Section title={t('Setup workflow', 'セットアップワークフロー')} emphasis="plain">
                <Bullets items={setup} />
            </Section>

            <Section title={t('Coagulation monitoring', '凝固モニタリング')} emphasis="warn">
                <Bullets items={monitor} />
            </Section>

            <Section title={t('Documentation', '記録')} emphasis="plain">
                <Bullets items={docs} />
            </Section>

            <Section title={t('Emergent Stroke Protocol — when triggered', '緊急脳卒中プロトコール — 発動条件')} emphasis="critical">
                <div className="text-[12px] mb-2"><b>{sched.afterHours}</b></div>
                <div className="mb-1">{sched.triggerCriteria}</div>
                <Bullets items={sched.requiredConsultation} />
                <div className="mt-2 text-[12px] italic">{sched.delayedScenario}</div>
                <div className="mt-1 text-[12px] italic">⚠ {sched.cerebellarException}</div>
                <div className="mt-2 text-[12px] font-bold">{sched.treatmentWindow}</div>
            </Section>

            <Section title={t('Stroke Protocol — imaging series', '脳卒中プロトコール — 画像シリーズ')} emphasis="warn">
                <Bullets items={imaging} />
            </Section>

            <Section title={t('Stroke Protocol — anesthesia workflow', '脳卒中プロトコール — 麻酔ワークフロー')} emphasis="info">
                <Bullets items={workflow} />
            </Section>
        </FlowchartShell>
    );
};

export default IrHeparinStrokeCard;
