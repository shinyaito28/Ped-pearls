import React, { useState } from 'react';
import { Baby } from 'lucide-react';
import { FlowchartShell, Section, Bullets } from './FlowchartShell';
import {
    commonPreop,
    maternalHemodynamics,
    fetalCocktailMidGestation,
    fetalCocktailExit,
    fetalEmergencyMidGestation,
    fetalEmergencyExit,
    procedures,
} from '../../data/specialty/flowcharts/maternal_fetal_flow';

const cocktailMap = {
    midGestation: { items: fetalCocktailMidGestation, label: 'Fetal IM cocktail (mid-gestation)' },
    exit:         { items: fetalCocktailExit, label: 'Fetal IM cocktail (EXIT)' },
};
const emergencyMap = {
    midGestation: { items: fetalEmergencyMidGestation, label: 'Fetal emergency drugs (mid-gestation)' },
    exit:         { items: fetalEmergencyExit, label: 'Fetal emergency drugs (EXIT)' },
};

const MaternalFetalCard = ({ entry }) => {
    const [procId, setProcId] = useState('mifs');
    const proc = procedures.find(p => p.id === procId) || procedures[0];

    const cocktail = proc.fetalCocktail ? cocktailMap[proc.fetalCocktail] : null;
    const fetalEmergency = proc.fetalEmergency ? emergencyMap[proc.fetalEmergency] : null;

    return (
        <FlowchartShell
            title={entry.title}
            subtitle={entry.shortDescription}
            icon={Baby}
            accent="pink"
            source={entry.source}
            lastReviewed={entry.lastReviewed}
        >
            <div>
                <label className="text-[10px] uppercase font-bold text-fg-muted tracking-wide mb-1 block">Procedure</label>
                <select
                    value={procId}
                    onChange={e => setProcId(e.target.value)}
                    className="w-full bg-surface text-fg font-bold px-3 py-2 rounded-lg border border-line focus:border-pink-500 outline-none"
                >
                    {procedures.map(p => (
                        <option key={p.id} value={p.id}>
                            {p.label}{p.emergency ? ' — emergency' : ''}
                        </option>
                    ))}
                </select>
                <p className="text-[11px] text-fg-muted mt-1">{proc.anesthesia}</p>
            </div>

            <Section title="Common pre-op (all flows)" emphasis="info">
                <Bullets items={commonPreop} />
            </Section>

            <Section title="Key intra-op steps" emphasis={proc.emergency ? 'critical' : 'plain'}>
                <Bullets items={proc.keyPoints} />
                {proc.fluidLimit && (
                    <div className="mt-2 text-[12px] italic font-bold">⚠ Fluid limit: {proc.fluidLimit}</div>
                )}
            </Section>

            <Section title="Lines & access" emphasis="plain">
                <Bullets items={proc.lines} />
            </Section>

            <Section title="Maternal hemodynamic targets" emphasis="info">
                <div className="font-bold mb-1">{maternalHemodynamics.bp}</div>
                <Bullets items={maternalHemodynamics.pressors} />
                <div className="text-[12px] mt-2 italic text-fg-muted">{maternalHemodynamics.fluids}</div>
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
