import React, { useState, useMemo } from 'react';
import { HeartPulse, Activity, Droplet, Copy, Check, AlertTriangle, Info, ChevronDown, ChevronRight } from 'lucide-react';
import { usePatient } from '../context/PatientContext';
import { useLanguage } from '../context/LanguageContext';
import { useRotemCpb, useRotemPostCpb } from '../hooks/useRotemCalc';
import { preparation, cpbInputs, postCpbInputs } from '../data/rotem_protocol';
import { CpbDecisionLadder, PostCpbDecisionTree } from './RotemDecisionTree';
import RotemTrace from './RotemTrace';
import RotemTooltip from './RotemTooltip';
import { fmt } from '../utils/calc';

// Map an input slider id to the props needed to render a mock ROTEM trace
// for that slider. The trace reflects the current values of the relevant
// assay so HEPTEM CT, HEPTEM CFT and HEPTEM MCF sliders all share one trace
// with different markers highlighted.
const traceConfigForInput = (id, values) => {
    if (id === 'heptemCT' || id === 'heptemCFT' || id === 'heptemMCF') {
        return {
            assay: 'HEPTEM',
            ct: values.heptemCT ?? 200,
            cft: values.heptemCFT ?? 90,
            mcf: values.heptemMCF ?? 55,
            ampMax: 80,
            mcfGoal: 50,
            highlight: id === 'heptemCT' ? 'CT' : id === 'heptemCFT' ? 'CFT' : 'MCF',
            triggered:
                id === 'heptemCT' ? values.heptemCT > 240 :
                id === 'heptemCFT' ? values.heptemCFT > 110 :
                values.heptemMCF < 50,
        };
    }
    if (id === 'fibtemMCF') {
        return {
            assay: 'FIBTEM',
            ct: values.heptemCT ?? 200,
            cft: values.heptemCFT ?? 90,
            mcf: values.fibtemMCF ?? 12,
            ampMax: 25,
            mcfGoal: 9,
            highlight: 'MCF',
            triggered: values.fibtemMCF < 9,
        };
    }
    if (id === 'extemCT') {
        return {
            assay: 'EXTEM',
            ct: values.extemCT ?? 80,
            cft: 90,
            mcf: 55,
            ampMax: 80,
            mcfGoal: 50,
            highlight: 'CT',
            triggered: values.extemCT > 111,
            showA10: true,
        };
    }
    if (id === 'a10extem') {
        const a10 = values.a10extem ?? 42;
        return {
            assay: 'EXTEM',
            ct: values.extemCT ?? 80,
            cft: 90,
            mcf: Math.max(a10 * 1.3, a10 + 5),
            ampMax: 80,
            mcfGoal: 38,
            highlight: 'A10',
            a10,
            triggered: a10 < 38,
            showA10: true,
        };
    }
    if (id === 'a10fibtem') {
        const a10 = values.a10fibtem ?? 12;
        return {
            assay: 'FIBTEM',
            ct: values.extemCT ?? 80,
            cft: 90,
            mcf: Math.max(a10 * 1.3, a10 + 1.5),
            ampMax: 25,
            mcfGoal: 9,
            highlight: 'A10',
            a10,
            triggered: a10 < 9,
            showA10: true,
        };
    }
    return null;
};

// Extract the term to look up for a slider's tooltip.
const tooltipTermForInput = (id) => {
    if (id.startsWith('heptem')) return 'HEPTEM';
    if (id.startsWith('fibtem')) return 'FIBTEM';
    if (id === 'extemCT') return 'EXTEM';
    if (id === 'a10extem') return 'A10';
    if (id === 'a10fibtem') return 'A10';
    return null;
};

// ---------------------------------------------------------------------------
// Slider with threshold markers — a number input + range slider that turn rose
// when the value crosses a clinical threshold ('over' = bad if over, 'under' =
// bad if under). The threshold bar color follows the same convention.
// ---------------------------------------------------------------------------

const ThresholdSlider = ({ spec, value, onChange, allValues }) => {
    const { lang, t: tt } = useLanguage();
    const t = spec.thresholds[0];
    const isBad = t.direction === 'over' ? value > t.at : value < t.at;
    const meaning = lang === 'ja' && t.meaningJa ? t.meaningJa : t.meaning;
    const accent = isBad ? 'rose' : 'emerald';
    const trackBg = isBad ? 'bg-rose-100' : 'bg-emerald-100';
    const fillBg  = isBad ? 'bg-rose-500' : 'bg-emerald-500';

    // Marker position as a percentage of the slider range.
    const markerPct = ((t.at - spec.min) / (spec.max - spec.min)) * 100;
    const valuePct  = ((value  - spec.min) / (spec.max - spec.min)) * 100;

    const traceProps = traceConfigForInput(spec.id, allValues);
    const tooltipTerm = tooltipTermForInput(spec.id);

    const sliderControls = (
        <div className="space-y-1 flex-1 min-w-0">
            <div className="flex items-baseline justify-between gap-2">
                <label className="text-[11px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wide flex items-center gap-1">
                    {spec.label}
                    {tooltipTerm && <RotemTooltip term={tooltipTerm} />}
                </label>
                <div className="flex items-center gap-1">
                    <input
                        type="number"
                        value={value}
                        min={spec.min}
                        max={spec.max}
                        step={spec.step}
                        onChange={e => onChange(parseFloat(e.target.value) || 0)}
                        className={`w-20 bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-right font-bold text-sm
                            focus:border-${accent}-500 focus:outline-none`}
                    />
                    <span className="text-[10px] text-slate-500 font-mono w-8">{spec.unit}</span>
                </div>
            </div>

            <div className="relative h-2 rounded-full overflow-hidden">
                <div className={`absolute inset-0 ${trackBg}`} />
                <div className={`absolute top-0 left-0 h-full ${fillBg} transition-all`}
                     style={{ width: `${Math.min(Math.max(valuePct, 0), 100)}%` }} />
                <div className="absolute top-[-2px] bottom-[-2px] w-px bg-slate-700"
                     style={{ left: `${markerPct}%` }} title={`${tt('Threshold:', '閾値:')} ${t.at} ${spec.unit}`} />
            </div>

            <input
                type="range"
                value={value}
                min={spec.min}
                max={spec.max}
                step={spec.step}
                onChange={e => onChange(parseFloat(e.target.value))}
                className="w-full h-1 cursor-pointer accent-rose-500"
                aria-label={spec.label}
            />

            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>{spec.min}</span>
                <span className={isBad ? 'text-rose-600 font-bold' : 'text-emerald-600 font-bold'}>
                    {tt('Threshold', '閾値')} {t.at}{spec.unit} — {meaning}
                </span>
                <span>{spec.max}</span>
            </div>
        </div>
    );

    if (!traceProps) return sliderControls;

    return (
        <div className="flex flex-col md:flex-row md:items-center gap-3">
            {sliderControls}
            <div className="md:flex-shrink-0 flex justify-end md:justify-start">
                <RotemTrace {...traceProps} width={220} height={90} />
            </div>
        </div>
    );
};

// ---------------------------------------------------------------------------
// Recommendation card — one per active recommendation
// ---------------------------------------------------------------------------

const RecBlock = ({ rec, weight }) => {
    const { t } = useLanguage();
    const accent = rec.severity === 'high' ? 'rose' : 'amber';

    // Display rules:
    //   - Volume products (Kcentra, Platelets, FFP) → show total mL/U
    //   - Unit products (Cryo) → show units regardless of weight
    const showWeightWarning = !weight && rec.unit !== 'units';

    return (
        <div className={`bg-${accent}-50 border-2 border-${accent}-300 rounded-2xl p-3`}>
            <div className="flex items-baseline justify-between gap-2">
                <div>
                    <div className={`text-[10px] uppercase font-bold tracking-wide text-${accent}-700`}>
                        {rec.severity === 'high' ? t('Critical', '緊急') : t('Order', 'オーダー')}
                    </div>
                    <div className={`text-base font-bold text-${accent}-900`}>{rec.product}</div>
                </div>
                <div className="text-right">
                    <div className={`text-2xl font-black text-${accent}-800`}>
                        {showWeightWarning ? '—' : fmt(rec.total)}
                        <span className="text-sm font-bold ml-1">{rec.unit}</span>
                    </div>
                    <div className="text-[10px] text-slate-600 font-mono">{rec.dose}</div>
                </div>
            </div>
            <div className="text-[11px] text-slate-600 mt-2 italic">{rec.reason}</div>
            {showWeightWarning && (
                <div className="text-[10px] text-rose-700 mt-1">{t('Enter a positive weight to compute the total volume.', '総体積計算には体重を入力してください。')}</div>
            )}
        </div>
    );
};

// ---------------------------------------------------------------------------
// Main card
// ---------------------------------------------------------------------------

const CardiacRotemCard = () => {
    const { weight } = usePatient();
    const { lang, t } = useLanguage();
    const w = parseFloat(weight) || 0;

    const [collapsed, setCollapsed] = useState(true);
    const [phase, setPhase] = useState('cpb'); // 'cpb' | 'postcpb'
    const [copied, setCopied] = useState(false);

    // CPB inputs
    const [cpb, setCpb] = useState(() =>
        Object.fromEntries(cpbInputs.map(i => [i.id, i.default]))
    );
    // Post-CPB inputs
    const [postcpb, setPostcpb] = useState(() =>
        Object.fromEntries(postCpbInputs.map(i => [i.id, i.default]))
    );

    const cpbRecs = useRotemCpb(cpb);
    const postCpbRecs = useRotemPostCpb(postcpb);
    const recs = phase === 'cpb' ? cpbRecs : postCpbRecs;

    // Preparation calculation
    const ffpVolPerOrder = w * 20;
    const ffpVolTotal = ffpVolPerOrder * 2;

    const copySummary = () => {
        const phaseLabel = phase === 'cpb' ? 'CPB' : 'Post-CPB';
        if (recs.length === 0) {
            const text = `${phaseLabel} ROTEM (${fmt(w)} kg) — ${t('all values within goal, no products required.', '全値が目標内、製剤不要。')}`;
            navigator.clipboard?.writeText(text).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
            return;
        }
        const lines = [
            `${phaseLabel} ROTEM ${t('recommendations', '推奨')} (${fmt(w)} kg):`,
            ...recs.map(r => `• ${r.product}: ${r.dose} = ${fmt(r.total)} ${r.unit}  [${r.reason}]`)
        ];
        navigator.clipboard?.writeText(lines.join('\n')).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const inputsForPhase = phase === 'cpb' ? cpbInputs : postCpbInputs;
    const valuesForPhase = phase === 'cpb' ? cpb : postcpb;
    const setForPhase    = phase === 'cpb' ? setCpb : setPostcpb;

    const triggerCount = recs.length;

    return (
        <div className="bg-surface border border-line rounded-2xl shadow-sm">
            {/* Collapsible header — matches the other Cardiac cards */}
            <button
                onClick={() => setCollapsed(c => !c)}
                className="w-full flex items-center gap-3 p-4 border-b border-line hover:bg-surface-2/40"
                aria-expanded={!collapsed}
            >
                <div className="bg-rose-500/10 text-rose-600 dark:text-rose-400 p-2 rounded-lg">
                    <HeartPulse size={18} />
                </div>
                <div className="flex-1 text-left">
                    <h3 className="font-bold text-fg">{t('Post-Bypass ROTEM Guidance', 'バイパス後 ROTEM ガイダンス')}</h3>
                    <p className="text-[11px] text-fg-muted">{t('Threshold sliders + decision tree for neonatal blood products.', '閾値スライダー + 新生児血液製剤の決定木。')}</p>
                </div>
                {triggerCount > 0 && collapsed && (
                    <span className="text-[10px] uppercase font-bold tracking-wide bg-rose-500/15 text-rose-600 dark:text-rose-400 px-2 py-0.5 rounded">
                        {triggerCount} {t('active', 'アクティブ')}
                    </span>
                )}
                {collapsed ? <ChevronRight size={16} className="text-fg-muted" /> : <ChevronDown size={16} className="text-fg-muted" />}
            </button>

            {!collapsed && (
                <div className="p-4 space-y-4">
                    {/* Preparation panel */}
                    <div className="bg-surface-2/60 border border-line rounded-xl p-3">
                        <h4 className="font-bold text-rose-700 dark:text-rose-300 flex items-center gap-2 text-sm mb-2">
                            <Droplet size={14} /> {t('Preparation (before bypass)', '準備(バイパス前)')}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                            {preparation.map((p, i) => (
                                <div key={i} className="bg-surface border border-line rounded-lg p-2">
                                    <div className="font-bold text-fg text-sm">{lang === 'ja' && p.itemJa ? p.itemJa : p.item}</div>
                                    <div className="text-[11px] text-fg-muted">{lang === 'ja' && p.detailJa ? p.detailJa : p.detail}</div>
                                    {p.item === 'FFP' && w > 0 && (
                                        <div className="mt-1 text-[11px] text-rose-700 dark:text-rose-300 font-mono">
                                            @ {fmt(w)} kg → {fmt(ffpVolPerOrder)} mL × 2 ={' '}
                                            <b>{fmt(ffpVolTotal)} mL</b>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Phase toggle */}
                    <div className="flex bg-surface-2/60 rounded-xl p-1 border border-line">
                        {[
                            { id: 'cpb',     label: t('CPB ROTEM', 'CPB ROTEM'),           sub: t('rewarm + after 2nd FFP', '再加温 + 2 回目 FFP 後'),                       icon: Activity },
                            { id: 'postcpb', label: t('Post-CPB ROTEM', 'Post-CPB ROTEM'), sub: t('after protamine + products + ANH', 'プロタミン + 製剤 + ANH 後'),       icon: HeartPulse }
                        ].map(p => {
                            const Icon = p.icon;
                            const isActive = phase === p.id;
                            return (
                                <button
                                    key={p.id}
                                    onClick={() => setPhase(p.id)}
                                    className={`flex-1 py-2 px-3 rounded-lg transition-all ${isActive ? 'bg-surface shadow-sm ring-2 ring-rose-500' : 'hover:bg-surface'}`}
                                >
                                    <div className={`flex items-center justify-center gap-2 ${isActive ? 'text-rose-700 dark:text-rose-300' : 'text-fg-soft'}`}>
                                        <Icon size={14} />
                                        <span className="text-sm font-bold">{p.label}</span>
                                    </div>
                                    <div className="text-[10px] text-fg-muted mt-0.5">{p.sub}</div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Inputs */}
                    <div>
                        <h4 className="font-bold text-fg-soft text-[11px] uppercase tracking-wide flex items-center gap-1 mb-3">
                            <Activity size={12} /> {t('ROTEM values', 'ROTEM 値')} — {phase === 'cpb' ? 'HEPTEM + FIBTEM' : 'EXTEM + FIBTEM'}
                        </h4>
                        <div className="space-y-5">
                            {inputsForPhase.map(spec => (
                                <ThresholdSlider
                                    key={spec.id}
                                    spec={spec}
                                    value={valuesForPhase[spec.id]}
                                    allValues={valuesForPhase}
                                    onChange={(v) => setForPhase(prev => ({ ...prev, [spec.id]: v }))}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Recommendations */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-rose-700 dark:text-rose-300 text-[11px] uppercase tracking-wide flex items-center gap-1">
                                <AlertTriangle size={12} /> {t('Recommended products', '推奨製剤')}
                            </h4>
                            <button
                                onClick={copySummary}
                                className="text-xs bg-surface-2/60 border border-line rounded-md px-2 py-1 hover:border-teal-400 flex items-center gap-1"
                            >
                                {copied ? <Check size={12} /> : <Copy size={12} />}
                                {copied ? t('Copied', 'コピー済み') : t('Copy summary', 'サマリーをコピー')}
                            </button>
                        </div>

                        {recs.length === 0 ? (
                            <div className="bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-300 dark:border-emerald-800 rounded-xl p-3 flex items-center gap-3">
                                <Check size={24} className="text-emerald-600 flex-shrink-0" />
                                <div>
                                    <div className="font-bold text-emerald-800 dark:text-emerald-300">{t('All values within goal', '全値が目標内')}</div>
                                    <div className="text-xs text-emerald-700 dark:text-emerald-400">{t('No products required at this time.', '現時点で製剤は不要。')}</div>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {recs.map((r, i) => (
                                    <RecBlock key={i} rec={r} weight={w} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Decision tree */}
                    <div>
                        <h4 className="font-bold text-fg-soft text-[11px] uppercase tracking-wide flex items-center gap-1 mb-2">
                            <HeartPulse size={12} className="text-rose-600" /> {t('Decision tree', '決定木')}
                        </h4>
                        <div className="bg-surface-2/40 border border-line rounded-lg p-2 overflow-x-auto">
                            {phase === 'cpb' ? (
                                <CpbDecisionLadder {...cpb} />
                            ) : (
                                <PostCpbDecisionTree a10extem={postcpb.a10extem} a10fibtem={postcpb.a10fibtem} />
                            )}
                        </div>
                    </div>

                    {/* Footnote */}
                    <div className="bg-surface-2/60 border border-line rounded-lg p-2.5 flex items-start gap-2 text-[11px] text-fg-muted">
                        <Info size={12} className="flex-shrink-0 mt-0.5" />
                        <div>
                            {t('Source: institutional', '出典: 施設の')} <i>{t('Anesthesia Guide to Blood Product Management for Post-Bypass Bleeding in Neonates', '新生児バイパス後出血の血液製剤管理麻酔ガイド')}</i>{t('.', '。')}
                            {t(' The Post-CPB tree treats', ' Post-CPB ツリーは')} <b>{t('A10 EXTEM ≥ 38 mm as the goal', 'A10 EXTEM ≥ 38 mm を目標')}</b>{t(' — values below this trigger the platelet vs cryoprecipitate branch based on A10 FIBTEM. Always verify with current institutional protocol and clinical judgement.', 'とし、これ未満では A10 FIBTEM に基づき血小板またはクリオの分岐をトリガー。常に最新の施設プロトコールと臨床判断で確認すること。')}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardiacRotemCard;
