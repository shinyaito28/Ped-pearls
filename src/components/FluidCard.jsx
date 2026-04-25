import React, { useState } from 'react';
import { Droplet, FlaskConical, Beaker, Snowflake } from 'lucide-react';
import { useFluidCalc } from '../hooks/useFluidCalc';
import { usePatient } from '../context/PatientContext';
import { fmt } from '../utils/calc';
import OrTrackerCard from './OrTrackerCard';

const Card = ({ title, icon, children, accent = 'teal' }) => (
    <section className="bg-surface border border-line rounded-2xl p-4 shadow-sm">
        {title && (
            <h3 className={`font-bold text-${accent}-700 dark:text-${accent}-300 flex items-center gap-2 border-b border-line pb-2 mb-3`}>
                {icon}{title}
            </h3>
        )}
        {children}
    </section>
);

const Stat = ({ label, value, sub, accent = 'teal' }) => (
    <div className="bg-surface-2 rounded-xl p-3">
        <div className="text-[10px] uppercase text-fg-muted font-bold tracking-wide">{label}</div>
        <div className={`text-2xl font-bold text-${accent}-700 dark:text-${accent}-300 leading-tight`}>{value}</div>
        {sub && <div className="text-[10px] text-fg-muted font-mono mt-0.5">{sub}</div>}
    </div>
);

const FluidCard = () => {
    const { weight } = usePatient();
    const [currentHb, setCurrentHb] = useState(12);
    const [targetHb, setTargetHb] = useState(8);

    const {
        maint, formulaMaint, tbv, tbvFactor, tbvLabel, abl,
        isotonicBolus, alb5, alb25Min, alb25Max, rbc, plt,
        hetastarch, hetastarchDaily,
        buffSalineMin, buffSalineMax,
        buretrolMaxFill
    } = useFluidCalc(currentHb, targetHb);

    const w = parseFloat(weight);

    return (
        <div className="space-y-4">
            <Card title="Maintenance & Total Blood Volume" icon={<Droplet size={18} />}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Stat
                        label="Maintenance"
                        value={<>{fmt(maint)} <span className="text-sm">mL/hr</span></>}
                        sub={`${formulaMaint} • Buretrol fill ≤ ${fmt(buretrolMaxFill)} mL`}
                    />
                    <Stat
                        label="Total Blood Volume"
                        value={<>{fmt(tbv)} <span className="text-sm">mL</span></>}
                        sub={`${w} kg × ${tbvFactor} mL/kg • ${tbvLabel}`}
                        accent="rose"
                    />
                </div>
            </Card>

            <Card title="Bolus & Maintenance Tips" icon={<Beaker size={18} />}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="bg-blue-50 dark:bg-blue-950/40 p-3 rounded-xl border border-blue-200 dark:border-blue-900">
                        <div className="font-bold text-blue-800 dark:text-blue-200">Isotonic bolus</div>
                        <div className="text-xl font-bold text-blue-700 dark:text-blue-300">{fmt(isotonicBolus.min)} - {fmt(isotonicBolus.max)} mL</div>
                        <div className="text-[10px] text-fg-muted font-mono">10-20 mL/kg LR or NS</div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-950/40 p-3 rounded-xl border border-blue-200 dark:border-blue-900">
                        <div className="font-bold text-blue-800 dark:text-blue-200">Maintenance choice</div>
                        <div className="text-xs text-fg-soft mt-0.5">D2.5 in LR/NS for &lt; 20 kg or NPO &gt; 12 hr (5 mL D50 + 95 mL LR/NS).</div>
                    </div>
                </div>
            </Card>

            <Card title="Allowable Blood Loss" icon={<FlaskConical size={18} />}>
                <div className="flex gap-3 items-end mb-3">
                    <div className="flex-1">
                        <label className="text-[10px] text-fg-muted uppercase font-bold">Start Hb</label>
                        <input type="number" value={currentHb} onChange={e => setCurrentHb(e.target.value)}
                            className="w-full font-bold text-lg p-1.5 border border-line rounded-lg bg-surface text-fg" />
                    </div>
                    <span className="pb-2 text-fg-muted">→</span>
                    <div className="flex-1">
                        <label className="text-[10px] text-fg-muted uppercase font-bold">Min Hb</label>
                        <input type="number" value={targetHb} onChange={e => setTargetHb(e.target.value)}
                            className="w-full font-bold text-lg p-1.5 border border-line rounded-lg bg-surface text-fg" />
                    </div>
                </div>
                <div className="flex justify-between items-center bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 p-3 rounded-xl text-rose-800 dark:text-rose-200 font-bold">
                    <span>ABL Limit</span>
                    <span className="text-2xl">{fmt(abl)} mL</span>
                </div>
                <div className="text-[10px] text-fg-muted text-right font-mono mt-1">TBV × (Start − Min) / Average Hb</div>
            </Card>

            <Card title="Blood & Colloid Products">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    {[
                        { name: 'Albumin 5%',  detail: '10 mL/kg', value: `${fmt(alb5)} mL`, color: 'blue' },
                        { name: 'Albumin 25%', detail: '2-3 mL/kg', value: `${fmt(alb25Min)} - ${fmt(alb25Max)} mL`, color: 'blue' },
                        { name: 'Packed RBC',  detail: '10 mL/kg → ↑Hb 1', value: `${fmt(rbc)} mL`, color: 'red' },
                        { name: 'Platelets',   detail: '1 unit per 10 kg', value: `${fmt(plt)} units`, color: 'amber' },
                        { name: 'Hetastarch',  detail: `10 mL/kg, max ${fmt(hetastarchDaily)} mL/day`, value: `${fmt(hetastarch)} mL`, color: 'emerald' },
                    ].map(p => (
                        <div key={p.name} className={`flex justify-between items-center bg-${p.color}-50 dark:bg-${p.color}-950/30 p-2.5 rounded-lg border border-${p.color}-200 dark:border-${p.color}-900`}>
                            <div>
                                <span className="font-bold text-fg">{p.name}</span>
                                <div className="text-[10px] text-fg-muted font-mono">{p.detail}</div>
                            </div>
                            <span className={`font-bold text-${p.color}-700 dark:text-${p.color}-300`}>{p.value}</span>
                        </div>
                    ))}
                </div>
            </Card>

            <OrTrackerCard />

            <Card title="Hypertonic (Buffered) Saline" icon={<Snowflake size={18} />} accent="purple">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="bg-purple-50 dark:bg-purple-950/40 p-3 rounded-xl border border-purple-200 dark:border-purple-900">
                        <div className="font-bold text-purple-800 dark:text-purple-200">2% Buffered Saline</div>
                        <div className="text-xl font-bold text-purple-700 dark:text-purple-300">{fmt(buffSalineMin)} - {fmt(buffSalineMax)} mL</div>
                        <div className="text-[10px] text-fg-muted font-mono">1-3 mL/kg over 20 min — PIV OK.</div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-950/40 p-3 rounded-xl border border-purple-200 dark:border-purple-900">
                        <div className="font-bold text-purple-800 dark:text-purple-200">3% Buffered Saline</div>
                        <div className="text-xl font-bold text-purple-700 dark:text-purple-300">{fmt(buffSalineMin)} - {fmt(buffSalineMax)} mL</div>
                        <div className="text-[10px] text-fg-muted font-mono">CVC ideally. Monitor serum sodium hourly.</div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default FluidCard;
