import React, { useState } from 'react';
import { Baby } from 'lucide-react';
import { FlowchartShell, Section, Bullets } from './FlowchartShell';
import { useLanguage } from '../../context/LanguageContext';
import {
    commonPreop, commonPreopJa,
    maternalHemodynamics,
    fetalCocktailMidGestation, fetalCocktailMidGestationJa,
    fetalCocktailExit, fetalCocktailExitJa,
    fetalEmergencyMidGestation, fetalEmergencyMidGestationJa,
    fetalEmergencyExit, fetalEmergencyExitJa,
    procedures,
} from '../../data/specialty/flowcharts/maternal_fetal_flow';

const MaternalFetalCard = ({ entry }) => {
    const { lang, t } = useLanguage();
    const [procId, setProcId] = useState('mifs');
    const proc = procedures.find(p => p.id === procId) || procedures[0];

    const cocktailMap = {
        midGestation: {
            items: lang === 'ja' ? fetalCocktailMidGestationJa : fetalCocktailMidGestation,
            label: t('Fetal IM cocktail (mid-gestation)', '胎児 IM カクテル(中期妊娠)'),
        },
        exit: {
            items: lang === 'ja' ? fetalCocktailExitJa : fetalCocktailExit,
            label: t('Fetal IM cocktail (EXIT)', '胎児 IM カクテル (EXIT)'),
        },
    };
    const emergencyMap = {
        midGestation: {
            items: lang === 'ja' ? fetalEmergencyMidGestationJa : fetalEmergencyMidGestation,
            label: t('Fetal emergency drugs (mid-gestation)', '胎児緊急薬(中期妊娠)'),
        },
        exit: {
            items: lang === 'ja' ? fetalEmergencyExitJa : fetalEmergencyExit,
            label: t('Fetal emergency drugs (EXIT)', '胎児緊急薬 (EXIT)'),
        },
    };

    const cocktail = proc.fetalCocktail ? cocktailMap[proc.fetalCocktail] : null;
    const fetalEmergency = proc.fetalEmergency ? emergencyMap[proc.fetalEmergency] : null;
    const pre = lang === 'ja' ? commonPreopJa : commonPreop;
    const procLabel = lang === 'ja' ? proc.labelJa : proc.label;
    const procAnesthesia = lang === 'ja' ? proc.anesthesiaJa : proc.anesthesia;
    const procKeyPoints = lang === 'ja' ? proc.keyPointsJa : proc.keyPoints;
    const procLines = lang === 'ja' ? proc.linesJa : proc.lines;
    const procFluidLimit = proc.fluidLimit ? (lang === 'ja' ? proc.fluidLimitJa : proc.fluidLimit) : null;

    return (
        <FlowchartShell
            title={t(entry.title, entry.titleJa)}
            subtitle={t(entry.shortDescription, entry.shortDescriptionJa)}
            icon={Baby}
            accent="pink"
            source={entry.source}
            lastReviewed={entry.lastReviewed}
        >
            <div>
                <label className="text-[10px] uppercase font-bold text-fg-muted tracking-wide mb-1 block">{t('Procedure', '手技')}</label>
                <select
                    value={procId}
                    onChange={e => setProcId(e.target.value)}
                    className="w-full bg-surface text-fg font-bold px-3 py-2 rounded-lg border border-line focus:border-pink-500 outline-none"
                >
                    {procedures.map(p => (
                        <option key={p.id} value={p.id}>
                            {lang === 'ja' ? p.labelJa : p.label}{p.emergency ? (lang === 'ja' ? ' — 緊急' : ' — emergency') : ''}
                        </option>
                    ))}
                </select>
                <p className="text-[11px] text-fg-muted mt-1">{procAnesthesia}</p>
            </div>

            <Section title={t('Common pre-op (all flows)', '共通術前(全フロー)')} emphasis="info">
                <Bullets items={pre} />
            </Section>

            <Section title={t('Key intra-op steps', '主要術中ステップ')} emphasis={proc.emergency ? 'critical' : 'plain'}>
                <Bullets items={procKeyPoints} />
                {procFluidLimit && (
                    <div className="mt-2 text-[12px] italic font-bold">⚠ {t('Fluid limit:', '輸液制限:')} {procFluidLimit}</div>
                )}
            </Section>

            <Section title={t('Lines & access', 'ライン + アクセス')} emphasis="plain">
                <Bullets items={procLines} />
            </Section>

            <Section title={t('Maternal hemodynamic targets', '母体血行動態目標')} emphasis="info">
                <div className="font-bold mb-1">{lang === 'ja' ? maternalHemodynamics.bpJa : maternalHemodynamics.bp}</div>
                <Bullets items={lang === 'ja' ? maternalHemodynamics.pressorsJa : maternalHemodynamics.pressors} />
                <div className="text-[12px] mt-2 italic text-fg-muted">{lang === 'ja' ? maternalHemodynamics.fluidsJa : maternalHemodynamics.fluids}</div>
            </Section>

            {cocktail && (
                <Section title={cocktail.label} emphasis="warn">
                    <Bullets items={cocktail.items} />
                </Section>
            )}

            {fetalEmergency && (
                <Section title={fetalEmergency.label} emphasis="critical">
                    <Bullets items={fetalEmergency.items} />
                </Section>
            )}
        </FlowchartShell>
    );
};

export default MaternalFetalCard;
