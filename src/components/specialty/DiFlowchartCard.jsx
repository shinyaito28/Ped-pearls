import React, { useState, useMemo } from 'react';
import { Brain } from 'lucide-react';
import { usePatient } from '../../context/PatientContext';
import { fmt } from '../../utils/calc';
import { FlowchartShell, Section, Bullets, KeyValue, RequireWeight } from './FlowchartShell';
import {
    initialOrders,
    suspectedNewOnsetWorkup,
    newOnsetCriteria,
    naBands,
    freeWaterDeficit,
    vasopressinStart,
    vasopressinNotes,
} from '../../data/specialty/flowcharts/di_flowchart';

const DiFlowchartCard = ({ entry }) => {
    const { weight } = usePatient();
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

    return (
        <FlowchartShell
            title={entry.title}
            subtitle={entry.shortDescription}
            icon={Brain}
            accent="violet"
            source={entry.source}
            lastReviewed={entry.lastReviewed}
        >
            {/* Presentation picker */}
            <div>
                <label className="text-[10px] uppercase font-bold text-fg-muted tracking-wide mb-1 block">Presentation</label>
                <div className="flex bg-surface-2/60 rounded-xl p-1 border border-line">
                    {[
                        { id: 'known', label: 'Known DI' },
                        { id: 'suspected', label: 'Suspected new-onset' },
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

            <Section title="Initial orders (all DI patients)" emphasis="info">
                <Bullets items={initialOrders} />
            </Section>

            {presentation === 'suspected' && (
                <>
                    <Section title="Suspected new-onset workup" emphasis="warn">
                        <Bullets items={suspectedNewOnsetWorkup} />
                    </Section>
                    <Section title={newOnsetCriteria.label} emphasis="critical">
                        <Bullets items={newOnsetCriteria.items} />
                    </Section>
                </>
            )}

            {/* Na+ band picker */}
            <div>
                <label className="text-[10px] uppercase font-bold text-fg-muted tracking-wide mb-1 block">Current sodium band</label>
                <div className="grid grid-cols-3 gap-2">
                    {naBands.map(b => {
                        const active = naBand === b.id;
                        return (
                            <button
                                key={b.id}
                                onClick={() => setNaBand(b.id)}
                                className={`p-2 rounded-lg border text-left text-xs transition-all ${active ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-200' : 'border-line bg-surface text-fg-soft hover:border-violet-300'}`}
                            >
                                <div className="font-bold">{b.label}</div>
                                <div className="text-[10px] mt-0.5">{b.range}</div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {band && (
                <Section title={`${band.label} — actions`} emphasis={band.id === 'hyper' || band.id === 'hypo' ? 'critical' : 'success'}>
                    <Bullets items={band.actions} />
                    {band.critical && (
                        <div className="mt-2 text-[12px] italic text-fg-soft">⚠ {band.critical}</div>
                    )}
                    {band.etiology && band.etiology.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-current/10">
                            <div className="text-[10px] uppercase font-bold mb-1 opacity-70">Etiology to consider</div>
                            <Bullets items={band.etiology} className="opacity-90" />
                        </div>
                    )}
                </Section>
            )}

            {/* Free water deficit calculator (hypernatremia) */}
            {naBand === 'hyper' && (
                <Section title="Free water deficit calculator" emphasis="warn">
                    <div className="grid grid-cols-2 gap-2 mb-2">
                        <div>
                            <label className="text-[10px] text-fg-muted block mb-0.5">Na+ actual</label>
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
                            <label className="text-[10px] text-fg-muted block mb-0.5">Na+ goal</label>
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
                                <KeyValue k="Free water deficit" v={`${fmt(fwd.deficitL)} L (${fmt(fwd.deficitmL)} mL)`} accent="amber-700 dark:text-amber-300" />
                                <KeyValue k="Replace over 24 h →" v={`${fmt(fwd.ratemLperHr)} mL/hr of D5 ½NS`} />
                                <div className="text-[10px] font-mono text-fg-muted mt-1">{fwd.formula}</div>
                            </div>
                        ) : (
                            <div className="text-[12px] text-fg-muted italic">Enter Na+ actual to compute.</div>
                        )}
                    </RequireWeight>
                </Section>
            )}

            {/* Vasopressin drip — relevant for ICU management */}
            <Section title="Vasopressin drip (ICU)" emphasis="critical">
                <RequireWeight weight={weight}>
                    {vaso && (
                        <div className="bg-surface rounded p-2 border border-red-300 dark:border-red-700 mb-2">
                            <KeyValue k="Start dose" v={`${fmt(vaso.startMilliUperHr)} mU/hr`} accent="red-700 dark:text-red-300" />
                            <KeyValue k="Titration step" v={`${fmt(vaso.titrationStepLow)}–${fmt(vaso.titrationStepHigh)} mU/hr q30min`} />
                            <KeyValue k="Target UOP" v={`${fmt(vaso.targetUOPlow)}–${fmt(vaso.targetUOPhigh)} mL/hr`} />
                        </div>
                    )}
                </RequireWeight>
                <Bullets items={vasopressinNotes} />
            </Section>
        </FlowchartShell>
    );
};

export default DiFlowchartCard;
