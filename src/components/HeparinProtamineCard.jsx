import React, { useState } from 'react';
import { Beaker, AlertTriangle, Copy, Check, Info, ChevronDown, ChevronRight, Activity } from 'lucide-react';
import { usePatient } from '../context/PatientContext';
import { useAnticoag } from '../hooks/useAnticoag';
import { fmt } from '../utils/calc';

const NumInput = ({ label, value, onChange, unit, placeholder, step = 1 }) => (
    <label className="flex flex-col gap-0.5 flex-1 min-w-[120px]">
        <span className="text-[10px] uppercase font-bold text-fg-muted tracking-wide">{label}</span>
        <div className="flex items-stretch">
            <input
                type="number"
                value={value ?? ''}
                step={step}
                placeholder={placeholder}
                onChange={e => onChange(e.target.value === '' ? null : parseFloat(e.target.value))}
                className="w-full bg-surface text-fg font-bold px-2 py-1.5 rounded-l-lg outline-none border border-line focus:border-rose-500 text-right"
            />
            {unit && (
                <span className="bg-surface-2 text-fg-muted text-[10px] font-mono px-2 py-1.5 rounded-r-lg border border-l-0 border-line flex items-center">
                    {unit}
                </span>
            )}
        </div>
    </label>
);

const ResultRow = ({ label, value, sub, accent = 'slate' }) => {
    const map = {
        rose:    'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200',
        amber:   'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200',
        emerald: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200',
        slate:   'bg-surface-2/60 border-line text-fg'
    };
    return (
        <div className={`border rounded-lg p-2.5 ${map[accent]}`}>
            <div className="flex items-baseline justify-between gap-2">
                <span className="text-[11px] uppercase font-bold tracking-wide">{label}</span>
                <span className="font-black text-lg">{value}</span>
            </div>
            {sub && <div className="text-[11px] mt-0.5 opacity-75">{sub}</div>}
        </div>
    );
};

const HeparinProtamineCard = () => {
    const { weight, ageYears } = usePatient();
    const w = parseFloat(weight) || 0;

    const [collapsed, setCollapsed] = useState(true);
    const [protocol, setProtocol] = useState('UOFM');  // 'NCH' | 'UOFM'
    const [hmsCombinedDose, setHmsCombinedDose] = useState(null);
    const [hpt, setHpt] = useState(null);
    const [act, setAct] = useState(null);
    const [pumpUnits, setPumpUnits] = useState(null);
    const [totalUnits, setTotalUnits] = useState(null);
    const [includeHemobag, setIncludeHemobag] = useState(false);
    const [copied, setCopied] = useState(false);

    const { loading, redose, cathLab, protamine } = useAnticoag({
        protocol,
        hmsCombinedDose,
        hpt,
        act,
        loadingUnits: undefined,    // hook falls back to loading.doseUnits
        totalUnits: totalUnits ?? 0,
        pumpUnits: pumpUnits ?? 0,
        includeHemobag
    });

    const copySummary = () => {
        const lines = [
            `Anticoagulation summary (${fmt(w)} kg, ${fmt(ageYears, 1)} yr) — protocol: ${protocol === 'NCH' ? 'NCH Investigational' : 'U of M'}`,
            `• Loading: ${loading.doseUnits ? `${fmt(loading.doseUnits)} U` : '— (enter HMS combined dose)'}  [${loading.method}]`,
            redose.trigger ? `• REDOSE: ${redose.doseUnits} U  [${redose.reasons.join('; ')}]` : '• Redose: not triggered',
            `• Cath lab heparin: ${cathLab.doseUnits} U (100 U/kg)`,
            `• Protamine: ${protamine.mg} mg${protamine.capApplied ? '  ⚠ capped at 5 mg/kg' : ''}${protamine.allowOverCap ? ' (NCH neonate exception)' : ''}`,
            `  basis: ${protamine.basis}`,
        ];
        navigator.clipboard?.writeText(lines.join('\n')).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="bg-surface border border-line rounded-2xl shadow-sm">
            <button
                onClick={() => setCollapsed(c => !c)}
                className="w-full flex items-center gap-3 p-4 border-b border-line hover:bg-surface-2/40"
                aria-expanded={!collapsed}
            >
                <div className="bg-rose-500/10 text-rose-600 dark:text-rose-400 p-2 rounded-lg">
                    <Beaker size={18} />
                </div>
                <div className="flex-1 text-left">
                    <h3 className="font-bold text-fg">Heparin / Protamine Calculator</h3>
                    <p className="text-[11px] text-fg-muted">NCH Investigational + U of M Technique. Always read-back dose.</p>
                </div>
                {collapsed ? <ChevronRight size={16} className="text-fg-muted" /> : <ChevronDown size={16} className="text-fg-muted" />}
            </button>

            {!collapsed && (
                <div className="p-4 space-y-4">
                    {/* Protocol toggle */}
                    <div className="flex bg-surface-2/60 rounded-xl p-1 border border-line">
                        {[
                            { id: 'UOFM', label: 'U of M Technique', sub: 'Slope < 80 or > 120' },
                            { id: 'NCH',  label: 'NCH Investigational', sub: 'HDR slope 80-120' }
                        ].map(p => {
                            const active = protocol === p.id;
                            return (
                                <button
                                    key={p.id}
                                    onClick={() => setProtocol(p.id)}
                                    className={`flex-1 py-2 px-3 rounded-lg transition-all ${active ? 'bg-surface shadow-sm ring-2 ring-rose-500' : 'hover:bg-surface'}`}
                                >
                                    <div className={`text-sm font-bold ${active ? 'text-rose-700 dark:text-rose-300' : 'text-fg-soft'}`}>{p.label}</div>
                                    <div className="text-[10px] text-fg-muted">{p.sub}</div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Loading dose section */}
                    <div className="space-y-2">
                        <div className="text-[11px] uppercase font-bold text-fg-muted tracking-wide flex items-center gap-1">
                            <Activity size={12} /> Heparin loading dose
                        </div>
                        {protocol === 'NCH' && (
                            <NumInput
                                label="HMS COMBINED dose (patient + pump)"
                                value={hmsCombinedDose}
                                onChange={setHmsCombinedDose}
                                unit="U"
                                placeholder="e.g. 4200"
                                step={100}
                            />
                        )}
                        <ResultRow
                            label="Loading dose"
                            value={loading.doseUnits ? `${fmt(loading.doseUnits)} U` : '—'}
                            sub={loading.notes}
                            accent="rose"
                        />
                    </div>

                    {/* Redose section */}
                    <div className="space-y-2">
                        <div className="text-[11px] uppercase font-bold text-fg-muted tracking-wide flex items-center gap-1">
                            <Activity size={12} /> Re-dose check
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <NumInput label="HPT" value={hpt} onChange={setHpt} unit="IU/mL" placeholder="e.g. 1.8" step={0.1} />
                            <NumInput label="ACT" value={act} onChange={setAct} unit="sec" placeholder="e.g. 450" step={10} />
                        </div>
                        <ResultRow
                            label="Redose"
                            value={redose.trigger ? `${fmt(redose.doseUnits)} U` : 'Not triggered'}
                            sub={redose.trigger ? redose.reasons.join('; ') : 'HPT ≥ 2.0 IU/mL AND ACT ≥ 480 sec'}
                            accent={redose.trigger ? 'amber' : 'emerald'}
                        />
                    </div>

                    {/* Cath lab */}
                    <div className="bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 text-sky-900 dark:text-sky-200 text-[12px] p-2.5 rounded-lg flex items-start gap-2">
                        <Info size={12} className="flex-shrink-0 mt-0.5" />
                        <div>
                            <b>Cath lab:</b> heparin <b>100 U/kg</b> = <b>{fmt(cathLab.doseUnits)} U</b>. Closed-loop comm: announce dose in U + mL through headset, wait for monitor person to acknowledge, surgeon reads back.
                        </div>
                    </div>

                    {/* Protamine section */}
                    <div className="space-y-2 pt-2 border-t border-line">
                        <div className="text-[11px] uppercase font-bold text-fg-muted tracking-wide flex items-center gap-1">
                            <Activity size={12} /> Protamine reversal
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <NumInput label="Total heparin given" value={totalUnits} onChange={setTotalUnits} unit="U" placeholder="cumulative" step={100} />
                            <NumInput label="Pump prime heparin (NCH)" value={pumpUnits} onChange={setPumpUnits} unit="U" placeholder="circuit" step={100} />
                        </div>
                        <label className="flex items-center gap-2 text-xs text-fg-soft cursor-pointer">
                            <input
                                type="checkbox"
                                checked={includeHemobag}
                                onChange={e => setIncludeHemobag(e.target.checked)}
                                className="w-3.5 h-3.5 accent-rose-500"
                            />
                            Hemobag administered (teen+) — adds 50 mg
                        </label>

                        <ResultRow
                            label="Protamine"
                            value={`${protamine.mg} mg`}
                            sub={protamine.basis + (protamine.capApplied ? ` • CAPPED at 5 mg/kg = ${protamine.cap} mg` : '') + (protamine.allowOverCap && protamine.rawMg > protamine.cap ? ' • NCH neonate exception (cap not applied)' : '')}
                            accent={protamine.capApplied ? 'amber' : 'rose'}
                        />

                        <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200 text-[11px] p-2.5 rounded-lg space-y-1">
                            <div className="font-bold flex items-center gap-1"><AlertTriangle size={12} /> Administration</div>
                            <ul className="list-disc list-inside space-y-0.5 pl-2">
                                {protamine.notes.map((n, i) => <li key={i}>{n}</li>)}
                            </ul>
                        </div>
                    </div>

                    <button
                        onClick={copySummary}
                        className="w-full text-xs bg-surface-2/60 border border-line rounded-md px-3 py-2 hover:border-teal-400 flex items-center justify-center gap-1.5"
                    >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                        {copied ? 'Copied' : 'Copy anticoag summary'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default HeparinProtamineCard;
