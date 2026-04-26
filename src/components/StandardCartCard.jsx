import React from 'react';
import { Package, Lightbulb, FlaskConical } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { standardCartDrugs, standardCartTips, standardCartTipsJa, standardCartAntibiotics } from '../data/standard_cart';

const StandardCartCard = () => {
    const { lang, t } = useLanguage();
    const tips = lang === 'ja' ? standardCartTipsJa : standardCartTips;

    return (
        <div className="space-y-4">
            <div className="bg-slate-700 text-white p-4 rounded-lg shadow flex items-center gap-3">
                <Package size={26} />
                <div>
                    <h2 className="text-lg font-black">{t('Standard Anesthesia Cart', '標準麻酔カート')}</h2>
                    <p className="text-slate-300 text-xs">{t('What every pediatric room must have ready', '全ての小児用ルームで準備すべきもの')}</p>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                <div className="px-3 py-2 bg-slate-50 border-b border-slate-200 font-bold text-slate-700">{t('Pre-drawn syringes', '事前準備シリンジ')}</div>
                <ul className="divide-y divide-slate-100">
                    {standardCartDrugs.map(d => (
                        <li key={d.n} className="px-3 py-2 flex items-start gap-3">
                            <div className="bg-teal-100 text-teal-700 font-bold w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">
                                {d.n}
                            </div>
                            <div>
                                <div className="font-bold text-slate-800">{lang === 'ja' && d.drugJa ? d.drugJa : d.drug}</div>
                                <div className="text-xs text-slate-500">{lang === 'ja' && d.detailJa ? d.detailJa : d.detail}</div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm">
                <h3 className="font-bold text-amber-800 flex items-center gap-2 mb-2"><Lightbulb size={16} /> {t('Practical tips', '実用的ヒント')}</h3>
                <ul className="list-disc pl-5 space-y-1 text-amber-900">
                    {tips.map((tip, i) => <li key={i}>{tip}</li>)}
                </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                <div className="px-3 py-2 bg-slate-50 border-b border-slate-200 font-bold text-slate-700 flex items-center gap-2">
                    <FlaskConical size={16} /> {t("Pre & intra-operative antibiotics (Nationwide Children's pharmacy)", "術前 + 術中抗菌薬 (Nationwide Children's 薬局)")}
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                        <thead className="bg-slate-50 text-[10px] uppercase text-slate-500 font-bold">
                            <tr>
                                <th className="text-left py-1 pl-3">{t('Drug', '薬剤')}</th>
                                <th className="text-left py-1">{t('Std (max)', '標準(最大)')}</th>
                                <th className="text-left py-1">{t('Neonate', '新生児')}</th>
                                <th className="text-left py-1 pr-3">{t('Frequency', '頻度')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {standardCartAntibiotics.map((a, i) => (
                                <tr key={i} className="border-t border-slate-100">
                                    <td className="py-1.5 pl-3 font-bold text-slate-800 whitespace-nowrap">{a.drug}</td>
                                    <td className="py-1.5 text-slate-600 whitespace-nowrap">{a.dose} <span className="text-slate-400">({a.max})</span></td>
                                    <td className="py-1.5 text-slate-600 whitespace-nowrap">{lang === 'ja' && a.neonateJa ? a.neonateJa : a.neonate}</td>
                                    <td className="py-1.5 pr-3 text-slate-500">{lang === 'ja' && a.freqJa ? a.freqJa : a.freq}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="text-[10px] text-slate-400 px-3 py-2 border-t border-slate-100">
                    {t("Call Nationwide Children's Hospital Pharmacy at 614-722-9360 for dosing in obese/hepatic/renal impairment.", '肥満/肝機能障害/腎機能障害患者の用量については Nationwide Children\'s 薬局 614-722-9360 へ。')}
                </div>
            </div>
        </div>
    );
};

export default StandardCartCard;
