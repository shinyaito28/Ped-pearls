import React, { useState, useMemo } from 'react';
import { Baby } from 'lucide-react';
import { usePatient } from '../../context/PatientContext';
import { FlowchartShell, Section, Bullets, RequireWeight } from './FlowchartShell';
import {
    preprocedure,
    roomSetup,
    rsiDoses,
    intraop,
    maintenance,
    oxytocin,
    postClamp,
    emergence,
    epiduralAlternative,
} from '../../data/specialty/flowcharts/emergency_cesarean';

const EmergencyCesareanCard = ({ entry }) => {
    const { weight } = usePatient();
    const [stability, setStability] = useState('standard'); // 'standard' | 'unstable'
    const rsi = useMemo(() => rsiDoses(weight), [weight]);

    const dosesToShow = rsi ? (stability === 'standard' ? rsi.standard : rsi.unstable) : null;

    return (
        <FlowchartShell
            title={entry.title}
            subtitle={entry.shortDescription}
            icon={Baby}
            accent="pink"
            source={entry.source}
            lastReviewed={entry.lastReviewed}
        >
            <Section title="Pre-procedure" emphasis="info">
                <Bullets items={preprocedure} />
            </Section>

            <Section title="Room set-up" emphasis="plain">
                <Bullets items={roomSetup} />
            </Section>

            <div>
                <label className="text-[10px] uppercase font-bold text-fg-muted tracking-wide mb-1 block">Maternal stability</label>
                <div className="flex bg-surface-2/60 rounded-xl p-1 border border-line">
                    {[
                        { id: 'standard', label: 'Stable' },
                        { id: 'unstable', label: 'Hemorrhage / unstable' },
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

            <Section title="RSI induction doses (mother)" emphasis={stability === 'unstable' ? 'critical' : 'warn'}>
                <RequireWeight weight={weight}>
                    {dosesToShow && (
                        <div className="bg-surface rounded p-2 border border-current/20 divide-y divide-line">
                            {dosesToShow.map(d => (
                                <div key={d.drug} className="flex items-baseline justify-between py-1">
                                    <span className="font-bold text-fg">{d.drug}</span>
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

            <Section title="Intra-op flow" emphasis="plain">
                <Bullets items={intraop} />
            </Section>

            <Section title="Maintenance hemodynamics" emphasis="info">
                <div className="font-bold mb-1">{maintenance.bp}</div>
                <Bullets items={maintenance.pressors} />
                <div className="text-[12px] mt-2 italic text-fg-muted">{maintenance.fluids}</div>
            </Section>

            <Section title="Oxytocin (post cord-clamp)" emphasis="warn">
                <div className="font-bold text-fg">{oxytocin.bolus}</div>
                <div>{oxytocin.infusion}</div>
                <div className="mt-2 text-[10px] uppercase font-bold opacity-80">If atony persists</div>
                <Bullets items={oxytocin.backup} />
            </Section>

            <Section title="After cord clamping" emphasis="plain">
                <Bullets items={postClamp} />
            </Section>

            <Section title="Emergence" emphasis="success">
                <Bullets items={emergence} />
            </Section>

            <Section title="Indwelling epidural alternative (if time allows)" emphasis="info">
                <Bullets items={epiduralAlternative} />
            </Section>
        </FlowchartShell>
    );
};

export default EmergencyCesareanCard;
