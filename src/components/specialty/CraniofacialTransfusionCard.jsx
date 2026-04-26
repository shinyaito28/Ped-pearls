import React, { useState, useMemo } from 'react';
import { Brain, AlertTriangle } from 'lucide-react';
import { usePatient } from '../../context/PatientContext';
import { fmt } from '../../utils/calc';
import { FlowchartShell, Section, Bullets, RequireWeight } from './FlowchartShell';
import {
    surgicalApproaches,
    labTiming,
    fluidReplacement,
    productAdministration,
    algorithmSteps,
    productVolumes,
} from '../../data/specialty/flowcharts/craniofacial_transfusion';

const CraniofacialTransfusionCard = ({ entry }) => {
    const { weight } = usePatient();
    const [approachId, setApproachId] = useState('cvr_foa');
    const [stepId, setStepId] = useState('incision');
    const vols = useMemo(() => productVolumes(weight), [weight]);
    const step = algorithmSteps.find(s => s.id === stepId) || algorithmSteps[0];

    return (
        <FlowchartShell
            title={entry.title}
            subtitle={entry.shortDescription}
            icon={Brain}
            accent="violet"
            source={entry.source}
            lastReviewed={entry.lastReviewed}
        >
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-[12px] p-2.5 rounded-lg flex items-start gap-2">
                <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" />
                <div>
                    <b>Hb thresholds need verification.</b> The original PDF's Table 1 (Hb-by-step transfusion triggers) did not extract cleanly. Confirm against source PDF before clinical use.
                </div>
            </div>

            {/* Pre-surgery picker */}
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <label className="text-[10px] uppercase font-bold text-fg-muted tracking-wide mb-1 block">Surgical approach</label>
                    <select
                        value={approachId}
                        onChange={e => setApproachId(e.target.value)}
                        className="w-full bg-surface text-fg font-bold px-3 py-2 rounded-lg border border-line focus:border-violet-500 outline-none text-sm"
                    >
                        {surgicalApproaches.map(a => <option key={a.id} value={a.id}>{a.label}</option>)}
                    </select>
                </div>
                <div>
                    <label className="text-[10px] uppercase font-bold text-fg-muted tracking-wide mb-1 block">Surgical step</label>
                    <select
                        value={stepId}
                        onChange={e => setStepId(e.target.value)}
                        className="w-full bg-surface text-fg font-bold px-3 py-2 rounded-lg border border-line focus:border-violet-500 outline-none text-sm"
                    >
                        {algorithmSteps.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                    </select>
                </div>
            </div>

            <Section title={`Step: ${step.label}`} emphasis="warn">
                <Bullets items={step.actions} />
            </Section>

            <Section title="Weight-based product volumes" emphasis="critical">
                <RequireWeight weight={weight}>
                    {vols && (
                        <div className="bg-surface rounded p-2 border border-current/20 divide-y divide-line">
                            <div className="flex items-baseline justify-between py-1">
                                <span className="font-bold text-fg">pRBC (15 mL/kg)</span>
                                <span className="font-mono font-bold text-rose-700 dark:text-rose-300">{fmt(vols.prbc15)} mL</span>
                            </div>
                            <div className="flex items-baseline justify-between py-1">
                                <span className="font-bold text-fg">Crystalloid (10 mL/kg)</span>
                                <span className="font-mono font-bold text-fg">{fmt(vols.crystalloid10)} mL</span>
                            </div>
                            <div className="flex items-baseline justify-between py-1">
                                <span className="font-bold text-fg">Colloid / albumin (10 mL/kg)</span>
                                <span className="font-mono font-bold text-fg">{fmt(vols.colloid10)} mL</span>
                            </div>
                            <div className="flex items-baseline justify-between py-1">
                                <span className="text-fg-soft text-[12px]">Add FFP after pRBC ≥ {fmt(vols.ffpThreshold)} mL</span>
                            </div>
                        </div>
                    )}
                </RequireWeight>
            </Section>

            <Section title="Lab timing" emphasis="info">
                <Bullets items={labTiming} />
            </Section>

            <Section title="Fluid replacement strategy" emphasis="info">
                <Bullets items={fluidReplacement} />
            </Section>

            <Section title="Product administration rules" emphasis="warn">
                <Bullets items={productAdministration} />
            </Section>
        </FlowchartShell>
    );
};

export default CraniofacialTransfusionCard;
