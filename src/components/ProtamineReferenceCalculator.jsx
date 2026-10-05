import React, { useState } from 'react';
import { usePatient } from '../context/PatientContext';
import { useLanguage } from '../context/LanguageContext';
import { calculateProtamineReference } from '../utils/protamineReference';

const display = value => value == null ? '—' : value !== 0 && Math.abs(value) < 0.0001
    ? value.toExponential(3) : Number(value.toFixed(4)).toLocaleString('en-US', { maximumFractionDigits: 4 });

const ProtamineReferenceSession = () => {
    const { weight } = usePatient();
    const { t } = useLanguage();
    const [basis, setBasis] = useState('');
    const [heparin, setHeparin] = useState('');
    const [ratio, setRatio] = useState('1');
    const [concentration, setConcentration] = useState('');
    const result = calculateProtamineReference({ basis, heparinUnits: heparin, ratio, weight, concentration });
    const inputClass = 'min-h-[44px] w-full min-w-0 rounded border border-line bg-surface px-2 text-sm text-fg [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none';

    return <section aria-label="Protamine reference calculator" className="mt-3 rounded-lg border border-line bg-surface-2/40 p-3 space-y-2 text-left">
        <h4 className="font-bold text-sm text-fg">{t('Protamine reference conversion', 'プロタミン参考換算')}</h4>
        <label className="block text-xs text-fg-muted">{t('Heparin basis', 'ヘパリン量の基準')}
            <select aria-label="Protamine heparin basis" className={inputClass} value={basis} onChange={e => { setBasis(e.target.value); setHeparin(''); }}>
                <option value="">{t('Select basis', '基準を選択')}</option>
                <option value="patient-cumulative">{t('Patient cumulative (excl. circuit)', '患者累積（回路分除外）')}</option>
                <option value="patient-initial">{t('Actual patient initial dose', '患者実投与初回量')}</option>
                <option value="combined">{t('Actual patient + circuit total', '実投与合算量（患者＋回路）')}</option>
                <option value="residual">{t('Measured residual amount', '測定された残存量')}</option>
            </select>
        </label>
        <div className="grid grid-cols-2 gap-2">
            <label className="text-xs text-fg-muted">{t('Selected UFH amount (U)', '選択基準のUFH量 (U)')}
                <input aria-label="Protamine heparin units" type="number" min="0" step="any" placeholder="—" value={heparin} onChange={e => setHeparin(e.target.value)} className={inputClass} />
            </label>
            <label className="text-xs text-fg-muted">{t('Ratio (mg / 100 U)', '比率 (mg / 100 U)')}
                <input aria-label="Protamine ratio mg per 100 units" type="number" min="0" step="any" value={ratio} onChange={e => setRatio(e.target.value)} className={inputClass} />
            </label>
        </div>
        <div className="flex items-baseline justify-between gap-2 rounded bg-surface p-2" aria-live="polite">
            <span className="text-xs text-fg-muted">{t('Reference conversion', '参考換算量')}</span>
            <output data-protamine-reference-mg className="font-bold text-lg text-rose-600">{display(result?.mg)} {result && <span className="text-xs">mg</span>}</output>
        </div>
        {result && <p className="text-xs text-fg-muted">{`${result.heparinUnits} U × ${result.ratio} mg / 100 U = ${display(result.mg)} mg`}{result.mgPerKg != null && ` · ${display(result.mgPerKg)} mg/kg`}</p>}
        {!result && <p className="text-xs text-amber-700 dark:text-amber-200">{t('Select the basis and enter heparin units.', '基準を選び、ヘパリン量を入力')}</p>}
        <p className="text-xs text-fg-muted">{t('Reference arithmetic. Confirm elapsed time, residual heparin and protocol.', '参考換算です。経過時間・残存量・プロトコルを確認。')}</p>
        <details className="text-xs text-fg-muted">
            <summary className="min-h-[44px] flex items-center cursor-pointer">{t('Volume, sources and scope', '容量・出典・適用範囲')}</summary>
            <label className="block mb-2">{t('Product concentration (mg/mL)', '製剤濃度 (mg/mL)')}
                <input aria-label="Protamine product concentration mg per mL" type="number" min="0" step="any" placeholder="—" value={concentration} onChange={e => setConcentration(e.target.value)} className={inputClass} />
            </label>
            {result?.ml != null && <p data-protamine-reference-ml className="font-bold mb-2">{display(result.ml)} mL</p>}
            <p className="mb-2">{t('No dose is inferred from weight. This does not measure adequate reversal or automatically reduce doses with time. Combined heparin is entered once; Hemobag does not add50mg automatically. Not for LMWH.', '体重から投与量を推定しません。拮抗の十分性や経時減量は判定しません。合算ヘパリン量は1回入力し、Hemobagの50mgを自動追加しません。LMWHには適用しません。')}</p>
            <p className="mb-2">{t('1mg/100U is label-backed reference arithmetic, not a universal optimal CPB ratio. The label50mg over10minutes concerns administration, not a whole-case cap. Institutional5mg/kg limits and neonatal exceptions require the selected protocol.', '1mg/100Uは添付文書に基づく参考換算で、すべてのCPBの最適比率ではありません。50mg/10分は投与条件で、症例全体の一律上限ではありません。院内5mg/kg基準・新生児例外は選択プロトコルで確認。')}</p>
            <p className="mb-2">{t('NCH Protocol3.2: combined patient + circuit; U of M: neonatal initial dose or cumulative patient dose after30days. Cardiac Rotation2020 assigns the neonatal exception to U of M. These institutional rules are not automatically applied to this arithmetic.', 'NCH Protocol3.2：患者＋回路の合算。U of M：新生児は初回量、30日超は患者累積量。Cardiac Rotation2020の新生児上限例外はU of M。ここでは院内ルールを自動適用しません。')}</p>
            <a className="underline block py-1" href="https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c76876da-b9a8-45d0-9278-7df3288d3a06" target="_blank" rel="noreferrer">{t('Protamine label (2025)', 'プロタミン添付文書（2025）')}</a>
        </details>
    </section>;
};

const ProtamineReferenceCalculator = () => {
    const { weight, age, ageUnit, gender, isPreemie } = usePatient();
    return <ProtamineReferenceSession key={JSON.stringify([weight, age, ageUnit, gender, isPreemie])} />;
};
export default ProtamineReferenceCalculator;
