import React, { useMemo } from 'react';
import { MapPin, AlertTriangle } from 'lucide-react';
import { usePatient } from '../../context/PatientContext';
import { FlowchartShell, Section, Bullets, RequireWeight } from './FlowchartShell';
import {
    heparinConcentration,
    weightTiers,
    tierForWeight,
    setupSteps,
    monitoringSteps,
    documentationSteps,
    strokeProtocolNote,
} from '../../data/specialty/flowcharts/ir_heparin_stroke';

const IrHeparinStrokeCard = ({ entry }) => {
    const { weight } = usePatient();
    const tier = useMemo(() => tierForWeight(weight), [weight]);

    return (
        <FlowchartShell
            title={entry.title}
            subtitle={entry.shortDescription}
            icon={MapPin}
            accent="sky"
            source={entry.source}
            lastReviewed={entry.lastReviewed}
        >
            <Section title="Heparin solution" emphasis="info">
                <div className="font-bold text-fg">{heparinConcentration}</div>
                <div className="text-[12px] text-fg-muted mt-0.5">Standardized concentration for the dedicated infusion pump.</div>
            </Section>

            <Section title="Weight-tier infusion rate" emphasis="critical">
                <RequireWeight weight={weight}>
                    <div className="bg-surface rounded p-2 border border-current/20 divide-y divide-line">
                        {weightTiers.map(t => {
                            const active = tier && t.id === tier.id;
                            return (
                                <div key={t.id} className={`flex items-baseline justify-between py-1.5 ${active ? 'font-bold' : 'opacity-60'}`}>
                                    <span className={active ? 'text-red-700 dark:text-red-300' : 'text-fg'}>{t.label}</span>
                                    <span className={`font-mono ${active ? 'text-red-700 dark:text-red-300' : 'text-fg'}`}>{t.rateMlPerHr} mL/hr</span>
                                </div>
                            );
                        })}
                    </div>
                    {tier && (
                        <div className="mt-2 text-[12px] text-fg-soft">
                            Current weight {parseFloat(weight)} kg → <b className="text-red-700 dark:text-red-300">{tier.label} tier</b>
                        </div>
                    )}
                </RequireWeight>
            </Section>

            <Section title="Setup workflow" emphasis="plain">
                <Bullets items={setupSteps} />
            </Section>

            <Section title="Coagulation monitoring" emphasis="warn">
                <Bullets items={monitoringSteps} />
            </Section>

            <Section title="Documentation" emphasis="plain">
                <Bullets items={documentationSteps} />
            </Section>

            <Section title={strokeProtocolNote.title} emphasis="warn">
                <div className="flex items-start gap-2">
                    <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" />
                    <div>{strokeProtocolNote.body}</div>
                </div>
            </Section>
        </FlowchartShell>
    );
};

export default IrHeparinStrokeCard;
