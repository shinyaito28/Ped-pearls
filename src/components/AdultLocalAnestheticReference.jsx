import React, { useState } from 'react';
import { usePatient } from '../context/PatientContext';
import { useLanguage } from '../context/LanguageContext';
import { adultLocalAnestheticReferences } from '../data/adultLocalAnestheticReferences';
import { calculateAdultLocalAnestheticReference, floorReferenceDisplay } from '../utils/adultLocalAnestheticReference';

const AdultLocalAnestheticReference = () => {
    const { weight, ageYears, isPreemie } = usePatient();
    const { t } = useLanguage();
    const validAge = Number.isFinite(ageYears) && ageYears >= 0;
    const pediatric = validAge && ageYears < 18;
    const infant = validAge && ageYears < 1;
    const [drug, setDrug] = useState('Bupivacaine');
    const [epinephrine, setEpinephrine] = useState(false);
    const [concentration, setConcentration] = useState('');
    const [concentrationUnit, setConcentrationUnit] = useState('percent');
    const source = adultLocalAnestheticReferences[drug];
    const result = calculateAdultLocalAnestheticReference({ drug, epinephrine, weight, concentration, concentrationUnit });
    const preset = source[epinephrine ? 'epi' : 'plain'];
    const inputClass = 'min-h-[44px] w-full rounded border border-slate-300 bg-white px-2 text-sm text-slate-800 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none';

    return <section aria-label={t('Local anesthetic reference calculator', '局麻の参考計算')} className="bg-white border border-slate-200 rounded-lg p-4 space-y-3">
        <div>
            <h3 className="font-bold text-slate-800">{t('Local anesthetic reference ceiling', '局所麻酔薬の参考上限')}</h3>
            <p className="text-xs text-slate-600">{t('Single injection · Infiltration / minor nerve block', '単回投与 · 浸潤／小神経ブロック')}</p>
        </div>
        <div role="note" aria-label="Adult reference scope" className="rounded bg-amber-50 px-2 py-1.5 text-xs text-amber-900">
            <p>{pediatric || !validAge
                ? t('Adult-source reference calculation (not a pediatric recommended dose).', '成人資料に基づく参考計算（小児推奨量ではありません）')
                : t('Adult-source reference calculation.', '成人資料に基づく参考計算')}
            </p>
            {infant && <p data-infant-caution>{t('Infants: confirm age-specific limits.', '乳児：年齢別の基準を確認')}</p>}
            {isPreemie && pediatric && <p>{t('Preterm: confirm a separate protocol.', '早産児：個別の基準を確認')}</p>}
            {!validAge && <p>{t('Age not confirmed.', '年齢未確認')}</p>}
        </div>
        <div className="grid grid-cols-2 gap-2">
            <label className="text-xs text-slate-600">{t('Drug', '薬剤')}
                <select aria-label="Adult reference drug" title={drug} value={drug} onChange={e => setDrug(e.target.value)} className={`${inputClass} text-xs`}>
                    {Object.keys(adultLocalAnestheticReferences).map(name => <option key={name}>{name}</option>)}
                </select>
            </label>
            <label className="text-xs text-slate-600">{t('Epinephrine', 'エピネフリン')}
                <select aria-label="Adult reference epinephrine" value={String(epinephrine)} onChange={e => setEpinephrine(e.target.value === 'true')} className={inputClass}>
                    <option value="false">{t('Without', 'なし')}</option><option value="true">{t('With', 'あり')}</option>
                </select>
            </label>
            <div className="text-xs text-slate-600">{t('Weight from header', '上部の患者体重')}
                <p data-shared-reference-weight className="min-h-[44px] flex items-center font-semibold text-sm text-slate-800 break-all">{result ? `${weight} kg` : '—'}</p>
            </div>
            <label className="text-xs text-slate-600">{t('Concentration', '濃度')}
                <div className="flex gap-1">
                    <input aria-label="Adult reference concentration" type="number" min="0" step="any" placeholder="—" value={concentration} onChange={e => setConcentration(e.target.value)} className={`${inputClass} min-w-0`} />
                    <select aria-label="Adult reference concentration unit" value={concentrationUnit} onChange={e => setConcentrationUnit(e.target.value)} className="min-h-[44px] rounded border bg-white text-xs text-slate-800"><option value="percent">%</option><option value="mgPerMl">mg/mL</option></select>
                </div>
            </label>
        </div>
        <div className="grid grid-cols-3 gap-2 rounded bg-slate-50 p-3 text-center" aria-live="polite">
            <div><div className="text-[10px] text-slate-500">{t('Reference coefficient', '参考係数')}</div><div className="font-bold text-slate-800">{preset.mgPerKg} <span className="text-xs">mg/kg</span></div></div>
            <div><div className="text-[10px] text-slate-500">{t('Reference ceiling', '参考総量上限')}</div><div data-adult-ceiling-mg className="font-bold text-purple-800">{floorReferenceDisplay(result?.ceilingMg)} <span className="text-xs">mg</span></div></div>
            <div><div className="text-[10px] text-slate-500">{t('Volume at this concentration', 'この濃度での容量')}</div><div data-adult-ceiling-ml className="font-bold text-purple-800">{floorReferenceDisplay(result?.ceilingMl)} <span className="text-xs">mL</span></div></div>
        </div>
        {!result && <p className="text-xs text-amber-900">{t('Enter a valid weight in the header.', '上部に有効な体重を入力')}</p>}
        {result?.mgPerMl > 0 && <p className="text-xs text-slate-600">{concentration}{concentrationUnit === 'percent' ? '%' : ' mg/mL'} = {result.mgPerMl} mg/mL</p>}
        <details className="text-xs text-slate-600">
            <summary className="min-h-[44px] flex items-center cursor-pointer">{t('Sources and scope', '出典と適用範囲')}</summary>
            {result && <p className="mb-2">{`min(${weight} kg × ${preset.mgPerKg} mg/kg, ${preset.absoluteMg} mg) = ${floorReferenceDisplay(result.ceilingMg)} mg`}</p>}
            <p className="mb-2">{t('A reference ceiling, not a target or a safety guarantee. Prior doses and different local anesthetics add toxicity. Volume is rounded down to 0.01 mL.', '目標量・安全保証ではなく参考上限です。先行投与や別の局麻薬も毒性に加算されます。mLは0.01単位で切り下げます。')}</p>
            <p className="mb-2">{t(source.basisEn, source.basisJa)}</p>
            <p className="mb-2">{t('Conventional single-shot adult references only. Major blocks, neuraxial, IV, infusions, liposomal products and patient-specific reductions need their own protocol. Pending clinical-owner acceptance.', '通常製剤の成人単回参考値です。大きなブロック・脊麻／硬膜外・静注・持続投与・リポソーム製剤・患者別減量は個別の基準が必要です。臨床担当による採用確認待ち。')}</p>
            {source.sources.map(item => <a key={item.url} href={item.url} target="_blank" rel="noreferrer" className="underline block py-1">{item.title}</a>)}
        </details>
    </section>;
};
export default AdultLocalAnestheticReference;
