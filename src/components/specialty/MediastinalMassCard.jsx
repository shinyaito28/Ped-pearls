import React, { useState } from 'react';
import { Stethoscope } from 'lucide-react';
import { FlowchartShell, Section, Bullets } from './FlowchartShell';
import { useLanguage } from '../../context/LanguageContext';
import { diagnosticWorkup, diagnosticWorkupJa, tiers } from '../../data/specialty/flowcharts/mediastinal_mass';

const MediastinalMassCard = ({ entry }) => {
    const { lang, t } = useLanguage();
    const [tierId, setTierId] = useState('moderate');
    const tier = tiers.find(tt => tt.id === tierId) || tiers[0];

    const workup = lang === 'ja' ? diagnosticWorkupJa : diagnosticWorkup;
    const tierLabel = lang === 'ja' ? tier.labelJa : tier.label;
    const tierDispo = lang === 'ja' ? tier.dispoJa : tier.dispo;
    const tierCriteria = lang === 'ja' ? tier.criteriaJa : tier.criteria;
    const tierConsults = lang === 'ja' ? tier.consultsJa : tier.consults;
    const tierBiopsy = lang === 'ja' ? tier.biopsyJa : tier.biopsy;

    return (
        <FlowchartShell
            title={t(entry.title, entry.titleJa)}
            subtitle={t(entry.shortDescription, entry.shortDescriptionJa)}
            icon={Stethoscope}
            accent="cyan"
            source={entry.source}
            lastReviewed={entry.lastReviewed}
        >
            <Section title={t('Diagnostic workup (any tier)', '診断精査(全ティア)')} emphasis="info">
                <Bullets items={workup} />
            </Section>

            <div>
                <label className="text-[10px] uppercase font-bold text-fg-muted tracking-wide mb-1 block">{t('Severity tier', '重症度ティア')}</label>
                <div className="space-y-1.5">
                    {tiers.map(tt => {
                        const active = tierId === tt.id;
                        const ring = tt.emphasis === 'critical' ? 'ring-red-500'
                            : tt.emphasis === 'warn' ? 'ring-amber-500' : 'ring-emerald-500';
                        return (
                            <button
                                key={tt.id}
                                onClick={() => setTierId(tt.id)}
                                className={`w-full text-left p-2.5 rounded-lg border transition-all ${active ? `bg-surface shadow-sm ring-2 ${ring}` : 'border-line bg-surface hover:border-cyan-400'}`}
                            >
                                <div className="text-xs font-bold text-fg">{lang === 'ja' ? tt.labelJa : tt.label}</div>
                                <div className="text-[11px] text-fg-muted mt-0.5">→ {lang === 'ja' ? tt.dispoJa : tt.dispo}</div>
                            </button>
                        );
                    })}
                </div>
            </div>

            <Section title={`${t('Criteria', '基準')} — ${tierLabel}`} emphasis={tier.emphasis}>
                <Bullets items={tierCriteria} />
            </Section>

            <Section title={`${t('Disposition:', '行き先:')} ${tierDispo}`} emphasis={tier.emphasis}>
                <div className="space-y-2">
                    <div>
                        <div className="text-[10px] uppercase font-bold mb-1 opacity-80">{t('Consults', 'コンサルト')}</div>
                        <Bullets items={tierConsults} />
                    </div>
                    <div className="pt-2 border-t border-current/10">
                        <div className="text-[10px] uppercase font-bold mb-1 opacity-80">{t('Tissue biopsy plan', '組織生検計画')}</div>
                        <Bullets items={tierBiopsy} />
                    </div>
                </div>
            </Section>
        </FlowchartShell>
    );
};

export default MediastinalMassCard;
