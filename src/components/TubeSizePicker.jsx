import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { tubeSizeOptions } from '../utils/tubeSizes';

const TubeSizePicker = ({ label, reference, calculatedMm = null, rule }) => {
    const { t } = useLanguage();
    const options = tubeSizeOptions(reference, calculatedMm);
    const [selected, setSelected] = useState(null);
    const estimate = calculatedMm === null ? reference : `${Number(calculatedMm.toFixed(3))} mm`;
    return (
        <div className="bg-blue-50 p-3 rounded" role="group" aria-label={label}>
            <div className="text-xs text-slate-600">{label}</div>
            <div className="text-sm text-slate-600 mt-1">
                {calculatedMm === null ? t('Reference:', '参考値:') : t('Calculated estimate:', '計算上の推定値:')} {estimate}
            </div>
            {options.length > 0 ? (
                <>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {options.map(size => (
                            <button key={size} type="button" aria-pressed={selected === size}
                                onClick={() => setSelected(size)}
                                className={`min-h-[44px] min-w-[64px] px-3 rounded border text-xl font-bold ${selected === size ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-slate-800 border-blue-300'}`}>
                                {size.toFixed(1)} mm
                            </button>
                        ))}
                    </div>
                    <div className="text-xs text-slate-600 mt-2" aria-live="polite">
                        {selected === null ? t('Choose a candidate; no automatic selection.', '候補を選択してください。自動選択はしません。') : `${t('Selected candidate:', '選択した候補:')} ${selected.toFixed(1)} mm`}
                    </div>
                    {calculatedMm !== null && <div className="text-xs text-slate-600 mt-1">{t('Adjacent 0.5 mm sizes. Confirm suitability and available tube sizes.', '0.5 mm刻みの隣接候補です。適合と使用製品の規格を確認してください。')}</div>}
                </>
            ) : <div className="text-2xl font-bold text-slate-800 mt-2">{reference}</div>}
            <div className="text-xs text-slate-500 mt-2">{rule}</div>
        </div>
    );
};

export default TubeSizePicker;
