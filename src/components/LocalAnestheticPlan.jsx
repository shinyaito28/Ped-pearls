import React, { useEffect, useRef, useState } from 'react';
import { usePatient } from '../context/PatientContext';
import { useLanguage } from '../context/LanguageContext';
import { calculateLocalAnestheticPlan, localAnestheticNames, totalLocalAnestheticPlans } from '../utils/localAnestheticPlan';
import { assessCaudalReference, regionalReferenceSource } from '../utils/regionalReference';

const emptyPlan = () => ({ drug: '', route: '', mode: '', formulation: '', concentration: '', concentrationUnit: 'percent', volume: '' });
const display = value => Number(value.toPrecision(6)).toString();

export default function LocalAnestheticPlan() {
    const { weight, age, ageUnit, gender, isPreemie } = usePatient();
    const { t } = useLanguage();
    const [plan, setPlan] = useState(emptyPlan);
    const [entries, setEntries] = useState([]);
    const patientKey = JSON.stringify([weight, age, ageUnit, gender, isPreemie]);
    const confirmedPatient = useRef(patientKey);
    const current = confirmedPatient.current === patientKey;
    // A plan must be entered again when the patient calculation inputs change.
    useEffect(() => { confirmedPatient.current = patientKey; setPlan(emptyPlan()); setEntries([]); }, [weight, age, ageUnit, gender, isPreemie]);
    const update = (key, value) => setPlan(previous => ({ ...previous, [key]: value }));
    const result = current ? calculateLocalAnestheticPlan(plan, weight) : null;
    const visibleEntries = current ? entries : [];
    const reference = result ? assessCaudalReference(plan, weight, { age, ageUnit, isPreemie }) : null;
    const missingReference = {
        inputs: t('Complete the inputs.', '入力を確認してください。'),
        route: t('No validated automatic recommendation for this route and administration. Single caudal reference only.', 'この経路・投与方法の自動推奨は未設定です。比較対象は単回カウダルの参考値のみです。'),
        drug: t('No cited caudal reference is configured for this drug.', 'この薬剤のカウダル比較基準は未設定です。'),
        formulation: t('Confirm plain formulation without epinephrine or other adjuvants to compare this reference.', 'この参考値との比較には、エピネフリン・他の添加薬を含まない製剤であることを確認してください。'),
        age: t('A valid pediatric age under 18 years is required; blank age is not a newborn.', '18歳未満の有効な年齢が必要です。空欄を新生児として扱いません。'),
        prematurity: t('Prematurity-specific suitability is not established by this reference.', 'この参考値だけでは早産児への適用を判断できません。'),
        concentration: t('This reference specifies bupivacaine 0.25% or ropivacaine 0.2%; a different concentration requires its own protocol.', 'この参考値はBupivacaine 0.25%またはRopivacaine 0.2%です。異なる濃度には別途プロトコルの確認が必要です。'),
    };
    const routes = {
        peripheral: t('Peripheral nerve block', '末梢神経ブロック'),
        wound: t('Wound', '創部'), caudal: t('Caudal', '仙骨硬膜外'),
        epidural: t('Epidural', '硬膜外'), spinal: t('Intrathecal', 'くも膜下'),
        intravenous: t('Intravenous', '静脈内'),
    };
    const modeLabel = mode => mode === 'continuous' ? t('Continuous', '持続') : t('Single administration', '単回投与');
    const totals = totalLocalAnestheticPlans(visibleEntries);
    const inputClass = 'w-full border border-slate-300 rounded p-2 text-sm min-h-[44px] bg-white';
    const add = () => {
        if (!result) return;
        setEntries(previous => [...previous, { ...plan, ...result }]);
        setPlan(previous => ({ ...previous, volume: '' }));
    };
    return (
        <section className="bg-white rounded-lg border border-slate-200 p-4 space-y-3" aria-label={t('Local anesthetic planned amount', '局麻予定量')}>
            <h3 className="font-bold text-purple-800">{t('Local anesthetic planned amount', '局麻予定量')}</h3>
            <p className="text-xs text-slate-600">{t('Enter your planned concentration and volume. This converts units; it does not select a protocol, recommend a dose or assess drug/route suitability.', '予定している濃度と量を入力してください。単位を換算します。プロトコル・投与量の推奨や、薬剤と経路の適合判定は行いません。')}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="text-xs font-semibold">{t('Route', '投与経路')}
                    <select className={inputClass} value={plan.route} onChange={event => setPlan(previous => ({ ...previous, route: event.target.value, volume: '' }))}>
                        <option value="">{t('Select route', '投与経路を選択')}</option>
                        {Object.entries(routes).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
                    </select>
                </label>
                <label className="text-xs font-semibold">{t('Administration', '投与方法')}
                    <select className={inputClass} value={plan.mode} onChange={event => setPlan(previous => ({ ...previous, mode: event.target.value, volume: '' }))}>
                        <option value="">{t('Select administration', '投与方法を選択')}</option>
                        <option value="single">{modeLabel('single')}</option>
                        <option value="continuous">{modeLabel('continuous')}</option>
                    </select>
                </label>
                <label className="text-xs font-semibold">{t('Drug', '薬剤')}
                    <select className={inputClass} value={plan.drug} onChange={event => setPlan(previous => ({ ...previous, drug: event.target.value, formulation: '', concentration: '', volume: '' }))}>
                        <option value="">{t('Select drug', '薬剤を選択')}</option>
                        {localAnestheticNames.map(name => <option key={name}>{name}</option>)}
                    </select>
                </label>
                <label className="text-xs font-semibold">{t('Formulation / admixture', '製剤・添加薬')}
                    <select className={inputClass} value={plan.formulation} onChange={event => update('formulation', event.target.value)}>
                        <option value="">{t('Unconfirmed (conversion only)', '未確認（換算のみ）')}</option>
                        <option value="plain">{t('Plain — no epinephrine or other adjuvants', '添加薬なし（エピネフリンも含まない）')}</option>
                        <option value="admixture">{t('With epinephrine / other adjuvants', 'エピネフリン・他の添加薬あり')}</option>
                    </select>
                </label>
                <div className="flex gap-2 items-end">
                    <label className="text-xs font-semibold flex-1">{t('Concentration', '濃度')}
                        <input className={inputClass} type="number" min="0" step="any" inputMode="decimal" value={plan.concentration} onChange={event => update('concentration', event.target.value)} />
                    </label>
                    <label className="text-xs font-semibold">{t('Concentration unit', '濃度の単位')}
                        <select className={inputClass} value={plan.concentrationUnit} onChange={event => setPlan(previous => ({ ...previous, concentrationUnit: event.target.value, concentration: '' }))}>
                            <option value="percent">%</option><option value="mgPerMl">mg/mL</option>
                        </select>
                    </label>
                </div>
                <label className="text-xs font-semibold">{plan.mode === 'continuous' ? t('Planned rate (mL/hr)', '予定速度 (mL/hr)') : t('Planned volume (mL)', '予定量 (mL)')}
                    <input className={inputClass} type="number" min="0" step="any" inputMode="decimal" value={plan.volume} onChange={event => update('volume', event.target.value)} />
                </label>
            </div>
            <div className="bg-purple-50 rounded p-3 text-sm" aria-live="polite">
                {result ? <>
                    <div>{display(result.percent)}% = {display(result.mgPerMl)} mg/mL</div>
                    <div className="font-bold text-purple-900">{display(result.mg)} {plan.mode === 'continuous' ? 'mg/hr' : 'mg'} · {display(result.mgPerKg)} {plan.mode === 'continuous' ? 'mg/kg/hr' : 'mg/kg'}</div>
                    <div className="text-xs">{routes[plan.route]} · {modeLabel(plan.mode)} · {weight} kg</div>
                </> : t('Select route, administration and drug, then enter positive finite concentration, volume and patient weight.', '経路・投与方法・薬剤を選び、濃度・量・患者体重に正の有限値を入力してください。')}
            </div>
            {reference && <section aria-label={t('Single caudal reference comparison', '単回カウダル参考値との比較')} className="rounded border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900 dark:text-amber-200 space-y-2" role="status">
                <div className="font-semibold">{t('Reference comparison — not a dose recommendation', '参考値との比較 — 投与量の推奨ではありません')}</div>
                {reference.status === 'held' ? <p>{t('Comparison withheld:', '比較保留：')} {missingReference[reference.reason]}</p> : <>
                    <p>{plan.drug}: {reference.ceilingMgPerKg} mg/kg · {t('single caudal reference ceiling', '単回カウダルの参考上限')} = {display(reference.ceilingMg)} mg ({weight} kg)</p>
                    <p className="font-semibold">{reference.status === 'above-reference'
                        ? t('Above the cited reference ceiling. Confirm the plan before use; the entered amount has not been reduced.', '出典の参考上限を超えています。使用前に計画を確認してください。入力量は減量していません。')
                        : t('At or below this reference ceiling. This does not establish a suitable or safe dose.', 'この参考上限以下です。適切・安全な用量であることを示すものではありません。')}</p>
                </>}
                <p>{t('Children under 18 years; one plain single caudal amount at bupivacaine 0.25% or ropivacaine 0.2%. Confirm age-specific and product suitability, especially in infants. Other blocks, repeat doses, infusions and mixed drugs are not assessed.', '18歳未満・添加薬なし・Bupivacaine 0.25%またはRopivacaine 0.2%の単回カウダル1回分が比較対象です。特に乳児では年齢・製剤への適合を確認してください。他のブロック、再投与、持続、異なる薬剤の併用は評価しません。')}</p>
                {visibleEntries.length > 0 && <p>{t('Other planned amounts have been entered. This comparison is not a cumulative or combined allowance.', '他の予定量が入力されています。この比較は累積量・併用量の許容量を示しません。')}</p>}
                <a href={regionalReferenceSource.url} target="_blank" rel="noreferrer" className="underline">{regionalReferenceSource.title}</a>
            </section>}
            <button type="button" disabled={!result} onClick={add} className="min-h-[44px] px-4 rounded bg-purple-700 text-white disabled:opacity-40">{t('Add planned amount', '予定量に追加')}</button>
            {visibleEntries.length > 0 && <div className="space-y-2">
                <h4 className="font-semibold text-sm">{t('Entered plans', '入力した予定量')}</h4>
                {visibleEntries.map((entry, index) => <div key={index} className="border rounded p-2 text-xs flex flex-wrap justify-between gap-2">
                    <div>{entry.drug} · {routes[entry.route]} · {modeLabel(entry.mode)}<br />{display(entry.percent)}% ({display(entry.mgPerMl)} mg/mL) × {entry.volume} {entry.mode === 'continuous' ? 'mL/hr' : 'mL'} = {display(entry.mg)} {entry.mode === 'continuous' ? 'mg/hr' : 'mg'}</div>
                    <button type="button" className="min-h-[44px] px-3 text-rose-700" aria-label={`${t('Remove plan', '予定量を削除')} ${index + 1}`} onClick={() => setEntries(previous => previous.filter((_, i) => i !== index))}>{t('Remove', '削除')}</button>
                </div>)}
                <h4 className="font-semibold text-sm">{t('Arithmetic totals by drug, route and administration', '薬剤・経路・投与方法別の算術合計')}</h4>
                {totals.map(total => <div key={`${total.drug}:${total.route}:${total.mode}`} className="text-sm">{total.drug} · {routes[total.route]} · {modeLabel(total.mode)}: <b>{total.mg === null ? t('Total is out of calculation range', '合計は計算範囲外') : `${display(total.mg)} ${total.mode === 'continuous' ? 'mg/hr' : 'mg'}`}</b></div>)}
                <button type="button" className="min-h-[44px] text-purple-700" onClick={() => { setEntries([]); setPlan(emptyPlan()); }}>{t('Clear plans', '予定量をクリア')}</button>
            </div>}
            <p className="text-xs text-slate-600">{t('These are planned amounts, not an administration record. Totals stay separate by drug, route and administration. No cumulative clinical limit, mixed-drug allowance or remaining safe amount is calculated. Route-separated totals do not remove the risk of additive systemic toxicity.', 'これは投与予定量であり、投与記録ではありません。薬剤・経路・投与方法を分けて集計します。臨床的な累積上限、異なる薬剤の共通許容量、安全に追加できる残量は計算しません。経路別に集計しても、全身毒性が重なるリスクはなくなりません。')}</p>
        </section>
    );
}
