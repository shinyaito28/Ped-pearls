import React, { useState, useMemo } from 'react';
import { Baby } from 'lucide-react';
import { usePatient } from '../../context/PatientContext';
import { useLanguage } from '../../context/LanguageContext';
import { FlowchartShell, Section, Bullets, RequireWeight } from './FlowchartShell';
import {
    preprocedure, preprocedureJa,
    roomSetup, roomSetupJa,
    rsiDoses,
    intraop, intraopJa,
    maintenance,
    oxytocin,
    postClamp, postClampJa,
    emergence, emergenceJa,
    epiduralAlternative, epiduralAlternativeJa,
} from '../../data/specialty/flowcharts/emergency_cesarean';

const EmergencyCesareanCard = ({ entry }) => {
    const { weight } = usePatient();
    const { lang, t } = useLanguage();
    const [stability, setStability] = useState('standard'); // 'standard' | 'unstable'
    const rsi = useMemo(() => rsiDoses(weight), [weight]);

    const dosesToShow = rsi ? (stability === 'standard' ? rsi.standard : rsi.unstable) : null;
    const pre = lang === 'ja' ? preprocedureJa : preprocedure;
    const room = lang === 'ja' ? roomSetupJa : roomSetup;
    const intraSteps = lang === 'ja' ? intraopJa : intraop;
    const postSteps = lang === 'ja' ? postClampJa : postClamp;
    const emerge = lang === 'ja' ? emergenceJa : emergence;
    const epi = lang === 'ja' ? epiduralAlternativeJa : epiduralAlternative;

    return (
        <FlowchartShell
            title={t(entry.title, entry.titleJa)}
            subtitle={t(entry.shortDescription, entry.shortDescriptionJa)}
            icon={Baby}
            accent="pink"
            source={entry.source}
            lastReviewed={entry.lastReviewed}
        >
            <Section title={t('Pre-procedure', '手技前')} emphasis="info">
                <Bullets items={pre} />
            </Section>

            <Section title={t('Room set-up', 'ルームセットアップ')} emphasis="plain">
                <Bullets items={room} />
            </Section>

            <div>
                <label className="text-[10px] uppercase font-bold text-fg-muted tracking-wide mb-1 block">{t('Maternal stability', '母体安定性')}</label>
                <div className="flex bg-surface-2/60 rounded-xl p-1 border border-line">
                    {[
                        { id: 'standard', label: t('Stable', '安定') },
                        { id: 'unstable', label: t('Hemorrhage / unstable', '出血 / 不安定') },
                    ].map(opt => {
                        const active = stability === opt.id;
                        return (
                            <button
                                key={opt.id}
                                onClick={() => setStability(opt.id)}
                                className={`flex-1 py-2 px-2 rounded-lg text-xs font-bold transition-all ${active ? `bg-surface shadow-sm ring-2 ${opt.id === 'unstable' ? 'ring-red-500 text-red-700 dark:text-red-300' : 'ring-pink-500 text-pink-700 dark:text-pink-300'}` : 'text-fg-soft hover:bg-surface'}`}
                            >
                                {opt.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <Section title={t('RSI induction doses (mother)', 'RSI 導入量(母体)')} emphasis={stability === 'unstable' ? 'critical' : 'warn'}>
                <RequireWeight weight={weight}>
                    {dosesToShow && (
                        <div className="bg-surface rounded p-2 border border-current/20 divide-y divide-line">
                            {dosesToShow.map(d => (
                                <div key={d.drug} className="flex items-baseline justify-between py-1">
                                    <span className="font-bold text-fg">{lang === 'ja' ? d.drugJa : d.drug}</span>
                                    <span className="text-right">
                                        <span className="font-mono font-bold text-fg">{d.range}</span>
                                        <span className="text-[10px] text-fg-muted ml-2">({d.perKg})</span>
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </RequireWeight>
            </Section>

            <Section title={t('Intra-op flow', '術中フロー')} emphasis="plain">
                <Bullets items={intraSteps} />
            </Section>

            <Section title={t('Maintenance hemodynamics', '維持血行動態')} emphasis="info">
                <div className="font-bold mb-1">{lang === 'ja' ? maintenance.bpJa : maintenance.bp}</div>
                <Bullets items={lang === 'ja' ? maintenance.pressorsJa : maintenance.pressors} />
                <div className="text-[12px] mt-2 italic text-fg-muted">{lang === 'ja' ? maintenance.fluidsJa : maintenance.fluids}</div>
            </Section>

            <Section title={t('Oxytocin (post cord-clamp)', 'オキシトシン(臍帯クランプ後)')} emphasis="warn">
                <div className="font-bold text-fg">{lang === 'ja' ? oxytocin.bolusJa : oxytocin.bolus}</div>
                <div>{lang === 'ja' ? oxytocin.infusionJa : oxytocin.infusion}</div>
                <div className="mt-2 text-[10px] uppercase font-bold opacity-80">{t('If atony persists', '弛緩が遷延する場合')}</div>
                <Bullets items={lang === 'ja' ? oxytocin.backupJa : oxytocin.backup} />
            </Section>

            <Section title={t('After cord clamping', '臍帯クランプ後')} emphasis="plain">
                <Bullets items={postSteps} />
            </Section>

            <Section title={t('Emergence', '抜管')} emphasis="success">
                <Bullets items={emerge} />
            </Section>

            <Section title={t('Indwelling epidural alternative (if time allows)', '硬膜外留置中の代替(時間があれば)')} emphasis="info">
                <Bullets items={epi} />
            </Section>
        </FlowchartShell>
    );
};

export default EmergencyCesareanCard;
