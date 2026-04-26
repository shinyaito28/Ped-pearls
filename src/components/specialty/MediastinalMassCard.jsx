import React, { useState } from 'react';
import { Stethoscope } from 'lucide-react';
import { FlowchartShell, Section, Bullets } from './FlowchartShell';
import { diagnosticWorkup, tiers } from '../../data/specialty/flowcharts/mediastinal_mass';

const MediastinalMassCard = ({ entry }) => {
    const [tierId, setTierId] = useState('moderate');
    const tier = tiers.find(t => t.id === tierId) || tiers[0];

    return (
        <FlowchartShell
            title={entry.title}
            subtitle={entry.shortDescription}
            icon={Stethoscope}
            accent="cyan"
            source={entry.source}
            lastReviewed={entry.lastReviewed}
        >
            <Section title="Diagnostic workup (any tier)" emphasis="info">
                <Bullets items={diagnosticWorkup} />
            </Section>

            <div>
                <label className="text-[10px] uppercase font-bold text-fg-muted tracking-wide mb-1 block">Severity tier</label>
                <div className="space-y-1.5">
                    {tiers.map(t => {
                        const active = tierId === t.id;
                        const ring = t.emphasis === 'critical' ? 'ring-red-500'
                            : t.emphasis === 'warn' ? 'ring-amber-500' : 'ring-emerald-500';
                        return (
                            <button
                                key={t.id}
                                onClick={() => setTierId(t.id)}
                                className={`w-full text-left p-2.5 rounded-lg border transition-all ${active ? `bg-surface shadow-sm ring-2 ${ring}` : 'border-line bg-surface hover:border-cyan-400'}`}
                            >
                                <div className="text-xs font-bold text-fg">{t.label}</div>
                                <div className="text-[11px] text-fg-muted mt-0.5">→ {t.dispo}</div>
                            </button>
                        );
                    })}
                </div>
            </div>

            <Section title={`Criteria — ${tier.label}`} emphasis={tier.emphasis}>
                <Bullets items={tier.criteria} />
            </Section>

            <Section title={`Disposition: ${tier.dispo}`} emphasis={tier.emphasis}>
                <div className="space-y-2">
                    <div>
                        <div className="text-[10px] uppercase font-bold mb-1 opacity-80">Consults</div>
                        <Bullets items={tier.consults} />
                    </div>
                    <div className="pt-2 border-t border-current/10">
                        <div className="text-[10px] uppercase font-bold mb-1 opacity-80">Tissue biopsy plan</div>
                        <Bullets items={tier.biopsy} />
                    </div>
                </div>
            </Section>
        </FlowchartShell>
    );
};

export default MediastinalMassCard;
