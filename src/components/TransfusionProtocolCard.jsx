import React, { useState, useMemo } from 'react';
import { Droplet, AlertTriangle, ChevronDown, ChevronRight, Filter, Layers, Info } from 'lucide-react';
import { usePatient } from '../context/PatientContext';
import { useLanguage } from '../context/LanguageContext';
import { procedureTypes, txaPracticeOptions, buildTransfusionPlan } from '../data/transfusion_protocol';
import { fmt } from '../utils/calc';

const ProductRow = ({ label, p, unit = 'mL' }) => (
    <div className="flex items-center justify-between gap-2 text-sm py-1">
        <span className="font-bold text-fg">{label}</span>
        <span className="font-mono text-fg-soft text-right">
            {p.perKgLow}-{p.perKgHigh} {unit}/kg <span className="text-fg-muted">→</span> <b className="text-rose-700 dark:text-rose-300">{fmt(p.mLLow)}-{fmt(p.mLHigh)} {unit}</b>
        </span>
    </div>
);

const TransfusionProtocolCard = () => {
    const { weight } = usePatient();
    const { lang, t } = useLanguage();
    const w = parseFloat(weight) || 0;

    const [collapsed, setCollapsed] = useState(true);
    const [procedureId, setProcedureId] = useState('neonate');
    const [txaPractice, setTxaPractice] = useState('routine');

    const plan = useMemo(
        () => buildTransfusionPlan({ weight, procedureId, txaPractice }),
        [weight, procedureId, txaPractice]
    );

    const filterRem = lang === 'ja' && plan.filterRemindersJa ? plan.filterRemindersJa : plan.filterReminders;
    const txaRationale = lang === 'ja' && plan.txa.rationaleJa ? plan.txa.rationaleJa : plan.txa.rationale;
    const txaTiming = plan.txa.dose ? (lang === 'ja' && plan.txa.dose.timingJa ? plan.txa.dose.timingJa : plan.txa.dose.timing) : null;
    const primeNotes = plan.prime.eligible ? (lang === 'ja' && plan.prime.notesJa ? plan.prime.notesJa : plan.prime.notes) : null;

    return (
        <div className="bg-surface border border-line rounded-2xl shadow-sm">
            <button
                onClick={() => setCollapsed(c => !c)}
                className="w-full flex items-center gap-3 p-4 border-b border-line hover:bg-surface-2/40"
                aria-expanded={!collapsed}
            >
                <div className="bg-rose-500/10 text-rose-600 dark:text-rose-400 p-2 rounded-lg">
                    <Droplet size={18} />
                </div>
                <div className="flex-1 text-left">
                    <h3 className="font-bold text-fg">{t('Transfusion Protocol (NCH 2.0)', '輸血プロトコール (NCH 2.0)')}</h3>
                    <p className="text-[11px] text-fg-muted">{t('Recipe-based — complementary to ROTEM-driven dosing.', 'レシピベース — ROTEM ベース投与の補完。')}</p>
                </div>
                {collapsed ? <ChevronRight size={16} className="text-fg-muted" /> : <ChevronDown size={16} className="text-fg-muted" />}
            </button>

            {!collapsed && (
                <div className="p-4 space-y-4">
                    {/* Procedure picker */}
                    <div>
                        <label className="text-[10px] uppercase font-bold text-fg-muted tracking-wide mb-1 block">{t('Procedure', '手技')}</label>
                        <select
                            value={procedureId}
                            onChange={e => setProcedureId(e.target.value)}
                            className="w-full bg-surface text-fg font-bold px-3 py-2 rounded-lg border border-line focus:border-rose-500 outline-none"
                        >
                            {procedureTypes.map(c => (
                                <option key={c.id} value={c.id}>
                                    {lang === 'ja' && c.labelJa ? c.labelJa : c.label}{c.highRisk ? (lang === 'ja' ? ' — 高リスク' : ' — high-risk') : ''}
                                </option>
                            ))}
                        </select>
                        <p className="text-[10px] text-fg-muted mt-1">
                            {t('High-risk procedures get the post-CPB product recipe below; lower-risk procedures fall back to ROTEM-guided dosing.', '高リスク手技には下記の CPB 後製剤レシピを適用;低リスク手技は ROTEM ガイド投与にフォールバック。')}
                        </p>
                    </div>

                    {/* TXA practice toggle */}
                    <div>
                        <label className="text-[10px] uppercase font-bold text-fg-muted tracking-wide mb-1 block">{t('Attending TXA practice', '主治医の TXA プラクティス')}</label>
                        <div className="flex bg-surface-2/60 rounded-xl p-1 border border-line">
                            {txaPracticeOptions.map(opt => {
                                const active = txaPractice === opt.id;
                                return (
                                    <button
                                        key={opt.id}
                                        onClick={() => setTxaPractice(opt.id)}
                                        className={`flex-1 py-2 px-2 rounded-lg transition-all text-left ${active ? 'bg-surface shadow-sm ring-2 ring-rose-500' : 'hover:bg-surface'}`}
                                    >
                                        <div className={`text-xs font-bold ${active ? 'text-rose-700 dark:text-rose-300' : 'text-fg-soft'}`}>{lang === 'ja' && opt.labelJa ? opt.labelJa : opt.label}</div>
                                        <div className="text-[10px] text-fg-muted leading-tight mt-0.5">{lang === 'ja' && opt.descriptionJa ? opt.descriptionJa : opt.description}</div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* TXA result */}
                    <div className={plan.txa.indicated
                        ? 'bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-3'
                        : 'bg-surface-2/60 border border-line rounded-lg p-3 opacity-75'
                    }>
                        <div className="flex items-baseline justify-between gap-2 mb-1">
                            <div className={`text-[11px] uppercase font-bold tracking-wide ${plan.txa.indicated ? 'text-amber-800 dark:text-amber-300' : 'text-fg-muted'}`}>
                                {t('Tranexamic Acid', 'トラネキサム酸')} {plan.txa.indicated ? t('— indicated', '— 適応') : t('— not indicated', '— 非適応')}
                            </div>
                            {plan.txa.indicated && plan.txa.dose && (
                                <div className="text-2xl font-black text-amber-900 dark:text-amber-200">
                                    {fmt(plan.txa.dose.dose)} <span className="text-sm font-bold">mg</span>
                                </div>
                            )}
                        </div>
                        <div className="text-[11px] text-fg-soft italic">{txaRationale}</div>
                        {plan.txa.indicated && plan.txa.dose && (
                            <div className="text-[11px] text-amber-900 dark:text-amber-200 mt-1">
                                {plan.txa.dose.perKg} mg/kg{plan.txa.dose.capped ? ` (${t('capped at', '上限化')} ${plan.txa.dose.cap} mg)` : ''}
                                <ul className="list-disc list-inside mt-1 pl-1 space-y-0.5">
                                    {txaTiming.map((tt, i) => <li key={i}>{tt}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Blood prime */}
                    {plan.prime.eligible && (
                        <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-lg p-3">
                            <div className="text-[11px] uppercase font-bold text-rose-800 dark:text-rose-300 tracking-wide mb-1">{t('Blood prime (< 3 kg)', '血液プライム (< 3 kg)')}</div>
                            <div className="text-sm text-rose-900 dark:text-rose-200">
                                <div className="flex justify-between"><span>{t('Prime FFP:', 'プライム FFP:')}</span> <b>{fmt(plan.prime.primeFFPmL)} mL</b></div>
                                <div className="flex justify-between"><span>{t('Warming FFP:', '加温時 FFP:')}</span> <b>{fmt(plan.prime.warmingFFPmL)} mL</b></div>
                            </div>
                            <div className="text-[11px] mt-1 text-rose-800 dark:text-rose-300 italic">{primeNotes}</div>
                        </div>
                    )}

                    {/* High-risk post-CPB plan */}
                    {plan.products && (
                        <div className="bg-surface-2/60 border border-line rounded-lg p-3">
                            <div className="flex items-center gap-2 text-[11px] uppercase font-bold text-fg-muted tracking-wide mb-2">
                                <Layers size={12} />
                                {t('Post-CPB high-risk plan —', 'CPB 後高リスクプラン —')} {lang === 'ja' && plan.products.roundsJa ? plan.products.roundsJa : plan.products.rounds}
                            </div>
                            {w <= 0 ? (
                                <div className="text-rose-700 text-sm">{t('Enter a positive weight to compute volumes.', '体積計算には体重を入力してください。')}</div>
                            ) : (
                                <div className="divide-y divide-line">
                                    <ProductRow label={t('Platelets', '血小板')} p={plan.products.platelets} />
                                    <ProductRow label={t('Cryoprecipitate', 'クリオプレシピテート')} p={plan.products.cryo} />
                                    <ProductRow label="FFP" p={plan.products.ffp} />
                                </div>
                            )}
                            <div className="mt-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200 text-[12px] p-2.5 rounded">
                                <b>{t('Rescue (after round 2 with no clot):', 'レスキュー (Round 2 後も凝塊なし):')}</b> {lang === 'ja' && plan.products.rescueAfterRound2.productJa ? plan.products.rescueAfterRound2.productJa : plan.products.rescueAfterRound2.product} {plan.products.rescueAfterRound2.perKgMcg} mcg/kg → <b>{fmt(plan.products.rescueAfterRound2.totalMcg)} mcg</b>
                            </div>
                        </div>
                    )}

                    {/* Filter reminders */}
                    <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200 text-[11px] p-2.5 rounded-lg">
                        <div className="font-bold flex items-center gap-1 mb-1"><Filter size={12} /> {t('Filter rules', 'フィルタールール')}</div>
                        <ul className="list-disc list-inside pl-2 space-y-0.5">
                            {filterRem.map((r, i) => <li key={i}>{r}</li>)}
                        </ul>
                    </div>

                    {!plan.procedure.highRisk && (
                        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-[11px] p-2.5 rounded-lg flex items-start gap-2">
                            <AlertTriangle size={12} className="flex-shrink-0 mt-0.5" />
                            <div>
                                {t('Selected procedure is', '選択した手技は')} <b>{t('not classified high-risk', '高リスクに分類されない')}</b>{t('. The tier-1 NCH transfusion plan above doesn\'t apply directly — fall back to ROTEM-guided dosing in the card above and clinical judgement.', '。上記の Tier-1 NCH 輸血プランは直接適用されない — 上記カードの ROTEM ガイド投与と臨床判断にフォールバック。')}
                            </div>
                        </div>
                    )}

                    <div className="bg-surface-2/60 border border-line text-fg-muted text-[10px] p-2.5 rounded-lg flex items-start gap-2">
                        <Info size={11} className="flex-shrink-0 mt-0.5" />
                        <div>
                            {t('Original protocol differentiates TXA practice by attending. To keep this app generic, those individual preferences are abstracted into the', '原本プロトコールは主治医ごとに TXA プラクティスが異なる。本アプリでは汎用化のため、個人の好みを以下に抽象化:')} <b>{t('Routine', 'ルーチン')}</b> / <b>{t('Selective', '選択的')}</b> {t('toggle above. Confirm with the attending of the day.', 'トグル。当日の主治医に確認すること。')}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransfusionProtocolCard;
