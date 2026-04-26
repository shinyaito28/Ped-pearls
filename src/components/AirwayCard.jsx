import React from 'react';
import { Stethoscope, AlertTriangle } from 'lucide-react';
import { useAirwayCalc } from '../hooks/useAirwayCalc';
import { useLanguage } from '../context/LanguageContext';
import CatheterCard from './CatheterCard';
import DifficultAirwayCard from './DifficultAirwayCard';

const AirwayCard = () => {
    const { t } = useLanguage();
    const {
        ettUncuffed, ettCuffed, ettRule,
        depth, depthRule, blade, lma,
        airqMaxEtt, olv, beyondPediatricRange
    } = useAirwayCalc();

    return (
        <div className="space-y-4">
            {beyondPediatricRange && (
                <div className="bg-amber-50 border border-amber-300 text-amber-900 text-xs px-3 py-2 rounded-lg flex items-start gap-2">
                    <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" />
                    <div>
                        {t('Source guide (NCH 2021) covers neonate–pediatric only. For adolescents/adults, defaulting to adult sizing — verify with adult airway references.', 'ソースガイド (NCH 2021) は新生児〜小児のみ。思春期/成人は成人サイズにフォールバック — 成人気道リファレンスで確認。')}
                    </div>
                </div>
            )}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                <h3 className="font-bold text-slate-700 flex items-center gap-2 border-b pb-2 mb-3">
                    <Stethoscope size={18} /> {t('Tube & Laryngoscopy', 'チューブ + 喉頭鏡')}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-3 rounded">
                        <div className="text-xs text-slate-500">{t('ETT (Uncuffed)', 'ETT(カフなし)')}</div>
                        <div className="text-2xl font-bold text-slate-800">{ettUncuffed}</div>
                        <div className="text-[10px] text-slate-400">{ettRule}</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                        <div className="text-xs text-slate-500">{t('ETT (Cuffed)', 'ETT(カフあり)')}</div>
                        <div className="text-2xl font-bold text-slate-800">{ettCuffed}</div>
                        <div className="text-[10px] text-slate-400">{t('If using cuffed, reduce by 0.5 mm ID.', 'カフあり使用時は内径を 0.5 mm 減らす。')}</div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded col-span-2 flex justify-between items-center">
                        <div>
                            <div className="text-xs text-slate-500">{t('Depth at lip', '口唇での深さ')}</div>
                            <div className="text-xl font-bold text-blue-700">{depth}</div>
                        </div>
                        <div className="text-[10px] text-slate-500 text-right">{t('Rule:', '式:')} {depthRule}</div>
                    </div>
                    <div className="p-2 border rounded">
                        <div className="text-xs text-slate-500">{t('Blade options', 'ブレード選択肢')}</div>
                        <div className="font-bold text-slate-800">{blade}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{t('Straight blade is best for infants < 1 yr.', '< 1 歳の乳児にはストレートブレードが最適。')}</div>
                    </div>
                    <div className="p-2 border rounded">
                        <div className="text-xs text-slate-500">{t('LMA size', 'LMA サイズ')}</div>
                        <div className="font-bold text-slate-800">#{lma}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{t('AirQ accepts ETT up to', 'AirQ は ETT 最大')} {airqMaxEtt.toFixed(1)} {t('mm ID.', 'mm ID まで対応。')}</div>
                    </div>
                </div>
            </div>

            {/* OLV */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                <div className="bg-slate-50 p-3 rounded border border-slate-200">
                    <div className="text-xs font-bold text-slate-500 uppercase mb-1">{t('One Lung Ventilation', '分離肺換気')}</div>
                    <div className="flex justify-between items-center">
                        <div className="text-sm font-bold text-slate-700">{olv.type}</div>
                        <div className="text-sm font-mono bg-white px-2 py-1 rounded border">{olv.size}</div>
                    </div>
                    <div className="text-[9px] text-slate-400 mt-1 italic">
                        {t('Always confirm placement with fiberoptic. (BB 5 Fr OD ≈ 2.5 mm.)', '常にファイバーで留置位置を確認。(BB 5 Fr OD ≈ 2.5 mm)')}
                    </div>
                </div>
            </div>

            <CatheterCard />

            <DifficultAirwayCard />
        </div>
    );
};

export default AirwayCard;
