import React, { useState, useEffect, useRef } from 'react';
import { Beaker, Copy, Check, Info, ChevronDown, ChevronRight, Activity } from 'lucide-react';
import { usePatient } from '../context/PatientContext';
import { useLanguage } from '../context/LanguageContext';
import { useAnticoag } from '../hooks/useAnticoag';
import { fmt } from '../utils/calc';
import { calculateCpbProtamineReference } from '../utils/cpbProtamineReference';

const NumInput = ({ label, value, onChange, unit, placeholder, step = 1 }) => (
    <label className="flex flex-col gap-0.5 flex-1 min-w-0">
        <span className="text-[10px] uppercase font-bold text-fg-muted tracking-wide">{label}</span>
        <div className="flex items-stretch">
            <input
                type="number"
                min="0"
                aria-label={label}
                value={value ?? ''}
                step={step}
                placeholder={placeholder}
                onChange={e => onChange(e.target.value === '' ? null : parseFloat(e.target.value))}
                className="min-h-[44px] w-full min-w-0 bg-surface text-fg font-bold px-2 py-1.5 rounded-l-lg outline-none border border-line focus:border-rose-500 text-right"
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
    const { weight, ageYears, age, ageUnit, gender, isPreemie } = usePatient();
    const { lang, t } = useLanguage();
    const w = parseFloat(weight) || 0;

    const [collapsed, setCollapsed] = useState(false);
    const [protocol, setProtocol] = useState('UOFM');  // 'NCH' | 'UOFM'
    const [hmsCombinedDose, setHmsCombinedDose] = useState(null);
    const [hpt, setHpt] = useState(null);
    const [act, setAct] = useState(null);
    const [pumpUnits, setPumpUnits] = useState(null);
    const [totalUnits, setTotalUnits] = useState(null);
    const [loadingUnits, setLoadingUnits] = useState(null);
    const [includeHemobag, setIncludeHemobag] = useState(false);
    const [copied, setCopied] = useState(false);
    const [protamineMode, setProtamineMode] = useState('planning');
    const [ratio, setRatio] = useState(1);
    const [concentration, setConcentration] = useState(null);
    const [boundaryBasis, setBoundaryBasis] = useState('');

    const actualDoseContext = JSON.stringify([weight, age, ageUnit, gender, isPreemie, protocol]);
    const confirmedContext = useRef(actualDoseContext);
    const actualInputsCurrent = confirmedContext.current === actualDoseContext;

    const { loading, redose, cathLab } = useAnticoag({
        protocol,
        hmsCombinedDose: actualInputsCurrent ? hmsCombinedDose : null,
        hpt: actualInputsCurrent ? hpt : null,
        act: actualInputsCurrent ? act : null,
        loadingUnits: actualInputsCurrent ? loadingUnits : null,
        totalUnits: actualInputsCurrent ? totalUnits : null,
        pumpUnits: actualInputsCurrent ? pumpUnits : null,
        includeHemobag: actualInputsCurrent && includeHemobag
    });

    useEffect(() => {
        confirmedContext.current = actualDoseContext;
        setHmsCombinedDose(null); setHpt(null); setAct(null);
        setLoadingUnits(null); setTotalUnits(null); setPumpUnits(null);
        setIncludeHemobag(false); setCopied(false);
        setRatio(1); setConcentration(null); setBoundaryBasis('');
    }, [weight, age, ageUnit, gender, isPreemie, protocol]);
    const reference = calculateCpbProtamineReference({
        protocol, mode: protamineMode, weight, age, ageUnit,
        hmsCombinedDose: actualInputsCurrent ? hmsCombinedDose : null,
        loadingUnits: actualInputsCurrent ? loadingUnits : null,
        totalUnits: actualInputsCurrent ? totalUnits : null,
        pumpUnits: actualInputsCurrent ? pumpUnits : null,
        ratio: actualInputsCurrent ? ratio : 1,
        concentration: actualInputsCurrent ? concentration : null,
        boundaryBasis: actualInputsCurrent ? boundaryBasis : ''
    });
    const displayAmount = value => value == null ? '—' : value !== 0 && (Math.abs(value) < 0.0001 || Math.abs(value) >= 1e7)
        ? value.toExponential(3) : Number(value.toFixed(4)).toLocaleString('en-US', { maximumFractionDigits: 4 });
    const ageDays = age == null || String(age).trim() === '' ? NaN : Number(age) * ({ years: 365, months: 30.4, days: 1 }[ageUnit] ?? NaN);
    const needsBoundary = protocol === 'UOFM' && ageDays === 30;
    const needsInitial = ageDays < 30 || (needsBoundary && boundaryBasis === 'initial');
    const protoLabel = protocol === 'NCH' ? 'NCH Investigational' : 'U of M';
    const modeLabel = protamineMode === 'planning' ? t('Preparation reference', '準備用参考量') : t('Entered actual UFH reference', '実投与UFHからの参考量');
    const basisLabels = {
        'combined-plan': t('Planned HMS total: patient + circuit, counted once', 'HMS予定合算量：患者＋回路を一度だけ計上'),
        'initial-plan': t('Planned initial patient dose; additional doses excluded', '患者初回予定量のみ：追加ヘパリンは含めない'),
        'actual-combined': t('Actual patient cumulative + actual circuit', '患者実投与累積量＋実回路量'),
        'actual-initial': t('Actual initial patient dose (neonatal basis)', '患者実投与初回量（新生児基準）'),
        'actual-cumulative': t('Actual patient cumulative; circuit excluded', '患者実投与累積量：回路分除外')
    };
    const basisKey = reference?.sourceBasis ?? (protocol === 'NCH'
        ? protamineMode === 'planning' ? 'combined-plan' : 'actual-combined'
        : protamineMode === 'planning' ? 'initial-plan' : needsInitial ? 'actual-initial' : 'actual-cumulative');
    const protamineBasis = needsBoundary && protamineMode === 'actual' && !boundaryBasis
        ? t('Select the 30-day age basis', '30日境界の基準を選択') : basisLabels[basisKey];
    const protamineValue = reference ? `${displayAmount(reference.mg)} mg` : '—';
    const changeMode = mode => {
        setProtamineMode(mode); setLoadingUnits(null); setTotalUnits(null); setPumpUnits(null);
        setRatio(1); setConcentration(null); setBoundaryBasis(''); setIncludeHemobag(false); setCopied(false);
    };

    const loadingMethod = lang === 'ja' && loading.methodJa ? loading.methodJa : loading.method;
    const loadingNotes = lang === 'ja' && loading.notesJa ? loading.notesJa : loading.notes;
    const redoseReasons = lang === 'ja' && redose.reasonsJa ? redose.reasonsJa : redose.reasons;
    const redoseHold = redose.reviewReason === 'hms'
        ? t('Withheld — HMS confirmation required', '保留 — HMS確認が必要')
        : t('Withheld — valid patient, HPT and ACT required', '保留 — 有効な患者条件・HPT・ACTが必要');

    const copySummary = () => {
        const lines = [
            `${t('Anticoagulation summary', '抗凝固サマリー')} (${fmt(w)} kg) — ${protoLabel}`,
            `${t('Heparin loading recommendation', 'ヘパリン初回予定量')}: ${loading.doseUnits != null ? `${fmt(loading.doseUnits)} U` : '—'} [${loadingMethod}]`,
            `${t('Redose', '追加投与')}: ${redose.reviewRequired ? redoseHold : redose.trigger ? `${fmt(redose.doseUnits)} U [${redoseReasons.join('; ')}]` : t('Not triggered', '該当なし')}`,
            `${t('Cath lab heparin', 'カテ室ヘパリン')}: ${fmt(cathLab.doseUnits)} U (100 U/kg)`,
            `${t('Protamine', 'プロタミン')} — ${modeLabel}: ${protamineValue}`,
            `${t('Basis', '基準')}: ${protamineBasis}`,
            reference ? `${reference.heparinUnits} U × ${reference.ratio} mg / 100 U = ${displayAmount(reference.mg)} mg` : t('Required input missing or invalid', '必要な入力が未入力・不正'),
            reference?.ml != null ? `${displayAmount(reference.ml)} mL (${concentration} mg/mL)` : '',
            reference?.exceedsLimit ? `${t('Exceeds institutional 5 mg/kg reference', '施設5 mg/kg基準超過')}: ${displayAmount(reference.institutionalLimitMg)} mg — ${t('confirm protocol', 'プロトコル確認')}` : '',
            includeHemobag ? t('Hemobag: base conversion only; returned-blood additional dose not included', 'Hemobag：基本換算のみ。返血時の追加量は含まない') : '',
            t('Reference only; confirm residual heparin, timing and adequate reversal with perfusion.', '参考量。残存ヘパリン・経過時間・十分な拮抗を灌流チームと確認。'),
        ].filter(Boolean);
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
                    <h3 className="font-bold text-fg">{t('Heparin / Protamine Calculator — CPB', 'ヘパリン / プロタミン計算機 — 人工心肺')}</h3>
                    <p className="text-[11px] text-fg-muted">{t('NCH Investigational + U of M Technique. Always read-back dose.', 'NCH Investigational + U of M Technique。常に用量復唱。')}</p>
                </div>
                {collapsed ? <ChevronRight size={16} className="text-fg-muted" /> : <ChevronDown size={16} className="text-fg-muted" />}
            </button>

            {!collapsed && (
                <div className="p-4 space-y-4">
                    {/* Protocol toggle */}
                    <div className="flex bg-surface-2/60 rounded-xl p-1 border border-line">
                        {[
                            { id: 'UOFM', label: t('U of M Technique', 'U of M テクニック'), sub: t('Slope < 80 or > 120', 'Slope < 80 または > 120') },
                            { id: 'NCH',  label: 'NCH Investigational', sub: t('HDR slope 80-120', 'HDR slope 80-120') }
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
                            <Activity size={12} /> {t('Heparin loading dose', 'ヘパリンローディング量')}
                        </div>
                        {protocol === 'NCH' && (
                            <NumInput
                                label={t('HMS COMBINED dose (patient + pump)', 'HMS COMBINED 量(患者 + ポンプ)')}
                                value={hmsCombinedDose}
                                onChange={setHmsCombinedDose}
                                unit="U"
                                placeholder={t('e.g. 4200', '例: 4200')}
                                step={100}
                            />
                        )}
                        <ResultRow
                            label={t('Loading dose', 'ローディング量')}
                            value={loading.doseUnits ? `${fmt(loading.doseUnits)} U` : '—'}
                            sub={loadingNotes}
                            accent="rose"
                        />
                    </div>

                    {/* Preparation and actual administration stay distinct. */}
                    <section aria-label="CPB protamine reference" className="space-y-2 pt-2 border-t border-line">
                        <h4 className="text-sm font-bold text-fg">{t('Protamine — CPB reference', 'プロタミン — 人工心肺参考量')}</h4>
                        <p className="text-xs text-fg-muted" data-cpb-reference-weight>{protoLabel} · {t('Header weight', '上部体重')} {displayAmount(Number(weight) > 0 ? Number(weight) : null)} kg</p>
                        <div className="grid grid-cols-2 gap-2" role="group" aria-label="CPB protamine mode">
                            {['planning', 'actual'].map(mode => <button key={mode} type="button" aria-pressed={protamineMode === mode}
                                aria-label={mode === 'planning' ? 'CPB preparation mode' : 'CPB actual heparin mode'}
                                onClick={() => changeMode(mode)}
                                className={`min-h-[44px] rounded border px-2 text-xs font-bold ${protamineMode === mode ? 'border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300' : 'border-line text-fg-muted'}`}>
                                {mode === 'planning' ? t('Preparation', '準備量') : t('Actual UFH', '実投与UFH')}
                            </button>)}
                        </div>
                        <p className="text-xs text-fg-muted" data-cpb-reference-basis>{protamineBasis}</p>
                        {protamineMode === 'planning' && <p className="text-xs text-fg-muted">{t('Preparation arithmetic only; planned heparin is not recorded as administered.', '準備用の参考換算です。予定量を実投与量として扱いません。')}</p>}
                        {protamineMode === 'actual' && <>
                            {needsBoundary && <label className="block text-xs text-fg-muted">{t('At exactly 30 days: confirm source age basis', '30日ちょうど：原資料の年齢基準を確認')}
                                <select aria-label="CPB 30-day heparin basis" value={boundaryBasis} onChange={e => { setBoundaryBasis(e.target.value); setLoadingUnits(null); setTotalUnits(null); }} className="min-h-[44px] w-full rounded border border-line bg-surface px-2">
                                    <option value="">{t('Select basis', '基準を選択')}</option>
                                    <option value="initial">{t('Initial patient dose', '患者初回量')}</option>
                                    <option value="cumulative">{t('Cumulative patient dose', '患者累積量')}</option>
                                </select>
                            </label>}
                            <div className="flex flex-wrap gap-2">
                                {protocol === 'UOFM' && needsInitial && <NumInput label={t('Actual initial patient heparin (neonate)', '患者への実投与初回ヘパリン（新生児）')} value={loadingUnits} onChange={setLoadingUnits} unit="U" step={100} />}
                                {(protocol === 'NCH' || (!needsInitial && (!needsBoundary || boundaryBasis))) && <NumInput label={t('Actual patient cumulative heparin (exclude circuit)', '患者への実投与ヘパリン累積量（回路分除外）')} value={totalUnits} onChange={setTotalUnits} unit="U" step={100} />}
                                {protocol === 'NCH' && <NumInput label={t('Actual circuit heparin (NCH; 0 if none)', '実回路ヘパリン（NCH・なしは0）')} value={pumpUnits} onChange={setPumpUnits} unit="U" step={100} />}
                            </div>
                        </>}
                        <ResultRow label={modeLabel} value={<output data-cpb-reference-mg>{protamineValue}</output>}
                            sub={reference ? `${reference.heparinUnits} U × ${reference.ratio} mg / 100 U${reference.mgPerKg != null ? ` · ${displayAmount(reference.mgPerKg)} mg/kg` : ''}` : t('Enter the required heparin amount and valid patient inputs.', '必要なヘパリン量と有効な患者情報を入力。')}
                            accent={reference?.exceedsLimit ? 'amber' : 'rose'} />
                        {reference?.ml != null && <p data-cpb-reference-ml className="text-sm font-bold text-fg">{displayAmount(reference.ml)} mL</p>}
                        {reference?.exceedsLimit && <p className="text-xs text-amber-800 dark:text-amber-200" data-cpb-limit-caution>
                            {t('Above institutional 5 mg/kg', '施設5 mg/kg基準超過')} ({displayAmount(reference.institutionalLimitMg)} mg)。 {reference.neonatalExceptionUnresolved
                                ? t('U of M neonatal exception differs between sources; confirm.', 'U of M新生児例外は原資料間で不一致。確認。')
                                : t('Confirm the protocol limit; this conversion is not a final dose.', 'プロトコル上限を確認。この換算は最終投与量ではありません。')}
                        </p>}
                        <label className="flex min-h-[44px] items-center gap-2 text-xs text-fg-soft cursor-pointer">
                            <input type="checkbox" aria-label="CPB Hemobag involved" checked={includeHemobag} onChange={e => setIncludeHemobag(e.target.checked)} className="h-4 w-4 accent-rose-500" />
                            {t('Hemobag involved', 'Hemobag使用')}
                        </label>
                        {includeHemobag && <p className="text-xs text-amber-800 dark:text-amber-200">{t('Base conversion only. Returned-blood additional dose is separate; no automatic 50 mg.', '基本換算のみ。返血時の追加量は別確認。50 mgは自動加算しません。')}</p>}
                        <p className="text-xs text-fg-muted">{t('Confirm residual heparin, timing and adequate reversal with perfusion.', '残存ヘパリン・経過時間・十分な拮抗を灌流チームと確認。')}</p>
                        <details className="text-xs text-fg-muted">
                            <summary className="min-h-[44px] cursor-pointer flex items-center">{t('Ratio, volume and source details', '比率・容量・出典の詳細')}</summary>
                            <div className="grid grid-cols-2 gap-2 mb-2">
                                <NumInput label={t('CPB ratio (mg / 100 U)', 'CPB比率 (mg / 100 U)')} value={ratio} onChange={setRatio} step={0.1} />
                                <NumInput label={t('CPB concentration (mg/mL)', 'CPB製剤濃度 (mg/mL)')} value={concentration} onChange={setConcentration} step={0.1} />
                            </div>
                            <p className="mb-2">{t('Protocol 3.2: NCH patient + circuit total; U of M neonatal initial patient dose or cumulative patient dose after 30 days. Both list 5 mg/kg. Rotation guide 2020 assigns a neonatal exception to U of M; it is not applied automatically.', 'Protocol 3.2：NCHは患者＋回路合算、U of Mは新生児初回量／30日超の患者累積量。両者5 mg/kg。Rotation guide 2020の新生児例外はU of Mですが、自動適用しません。')}</p>
                            <p className="mb-2">{t('Hemobag +50 mg in the 2020 guide concerns return of blood in teens/older patients. Timing and total are separate clinical decisions.', '2020年ガイドのHemobag＋50 mgは年長者の返血時の記載です。時点と総量は別の臨床判断です。')}</p>
                            <p className="mb-2">{t('1 mg/100 U is reference arithmetic, not a universal optimal CPB ratio. Use slow IV administration; the label 50 mg/10 min guidance is not a whole-case cap. Longer CPB needs individualized residual-heparin assessment.', '1 mg/100 Uは参考換算で、CPBの一律最適比率ではありません。緩徐静注。添付文書の50 mg/10分は症例全体の上限ではありません。長時間CPBでは残存ヘパリンを個別評価。')}</p>
                            <a className="underline block py-1" href="https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c76876da-b9a8-45d0-9278-7df3288d3a06" target="_blank" rel="noreferrer">{t('Protamine label (2025)', 'プロタミン添付文書（2025）')}</a>
                        </details>
                    </section>

                    {/* Redose section */}
                    <div className="space-y-2">
                        <div className="text-[11px] uppercase font-bold text-fg-muted tracking-wide flex items-center gap-1">
                            <Activity size={12} /> {t('Re-dose check', '追加投与チェック')}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <NumInput label="HPT" value={hpt} onChange={setHpt} unit="IU/mL" placeholder={t('e.g. 1.8', '例: 1.8')} step={0.1} />
                            <NumInput label="ACT" value={act} onChange={setAct} unit={t('sec', '秒')} placeholder={t('e.g. 450', '例: 450')} step={10} />
                        </div>
                        <ResultRow
                            label={t('Redose', '追加投与')}
                            value={redose.reviewRequired ? redoseHold : redose.trigger ? `${fmt(redose.doseUnits)} U` : t('Not triggered', '該当せず')}
                            sub={redose.reviewRequired ? (redose.reviewReason === 'hms' ? t('NCH source: re-dose according to the HMS COMBINED patient + circuit recommendation. The U of M 100 U/kg rule is not applied.', 'NCH資料：患者＋回路のHMS COMBINED推奨量に従って追加投与。U of Mの100 U/kg則を適用しません。') : t('No negative check is established from missing or invalid measurements. Enter both positive finite HPT and ACT values and valid patient inputs.', '測定値の欠落・不正から「該当せず」とは判断しません。正の有限値のHPT・ACTと有効な患者条件が必要です。')) : redose.trigger ? redoseReasons.join('; ') : t('HPT ≥ 2.0 IU/mL AND ACT ≥ 480 sec', 'HPT ≥ 2.0 IU/mL かつ ACT ≥ 480 秒')}
                            accent={redose.reviewRequired || redose.trigger ? 'amber' : 'emerald'}
                        />
                    </div>

                    {/* Cath lab */}
                    <div className="bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 text-sky-900 dark:text-sky-200 text-[12px] p-2.5 rounded-lg flex items-start gap-2">
                        <Info size={12} className="flex-shrink-0 mt-0.5" />
                        <div>
                            <b>{t('Cath lab:', 'カテ室:')}</b> {t('heparin', 'ヘパリン')} <b>100 U/kg</b> = <b>{fmt(cathLab.doseUnits)} U</b>. {t('Closed-loop comm: announce dose in U + mL through headset, wait for monitor person to acknowledge, surgeon reads back.', 'クローズドループ: 用量を U + mL でヘッドセットから伝達、モニター係の確認を待ち、外科医が復唱。')}
                        </div>
                    </div>

                    <button
                        onClick={copySummary}
                        className="w-full text-xs bg-surface-2/60 border border-line rounded-md px-3 py-2 hover:border-teal-400 flex items-center justify-center gap-1.5"
                    >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                        {copied ? t('Copied', 'コピー済み') : t('Copy anticoag summary', '抗凝固サマリーをコピー')}
                    </button>
                </div>
            )}
        </div>
    );
};

export default HeparinProtamineCard;
