import React, { useState } from 'react';
import { Stethoscope, AlertTriangle, ExternalLink, Wind, ShieldAlert, Zap, RotateCcw } from 'lucide-react';
import { useAirwayCalc } from '../hooks/useAirwayCalc';
import { usePatient } from '../context/PatientContext';
import { useLanguage } from '../context/LanguageContext';

// Source: DAS / APA Paediatric Difficult Airway Guidelines (2015, reaffirmed).
// Three core algorithms for children aged 1-8 yr:
//   1) Difficult mask ventilation
//   2) Unanticipated difficult tracheal intubation
//   3) Cannot intubate cannot oxygenate (CICO / CICV) in a paralysed child
const plans = [
    {
        id: 'A', title: 'Plan A — Direct laryngoscopy', titleJa: 'Plan A — 直接喉頭鏡', accent: 'sky', icon: Stethoscope,
        bullets: [
            'Optimise position (sniffing). Pre-oxygenate to FiO₂ 1.0.',
            'Limit attempts (≤4 total) — minimise trauma & desaturation.',
            'Use a stylet, smaller ETT, change blade, external laryngeal manipulation.',
            'Switch to video laryngoscopy early if available.',
            'If oxygenation deteriorates → declare difficulty, move to Plan B.'
        ],
        bulletsJa: [
            '体位最適化(sniffing position)。FiO₂ 1.0 で前酸素化。',
            '試行回数を制限(計 4 回以下) — 外傷 + 脱飽和を最小化。',
            'スタイレット使用、ETT サイズ変更、ブレード変更、外的喉頭操作。',
            '可能なら早期にビデオ喉頭鏡へ切替。',
            '酸素化悪化 → 困難気道を宣言、Plan B へ移行。'
        ]
    },
    {
        id: 'B', title: 'Plan B — SGA / LMA rescue', titleJa: 'Plan B — SGA / LMA でレスキュー', accent: 'teal', icon: Wind,
        bullets: [
            'Insert a supraglottic airway (LMA or i-gel) sized to weight.',
            'Confirm ventilation with EtCO₂. Allow patient to recover gas.',
            'Decide: wake up vs continue via SGA vs intubate through SGA (fibre-optic).',
            'If SGA also fails to ventilate → declare CICO and call Plan D.'
        ],
        bulletsJa: [
            '体重相応の声門上気道(LMA または i-gel)を挿入。',
            'EtCO₂ で換気を確認。患者にガス回復させる。',
            '判断: 覚醒 vs SGA で継続 vs SGA 越しにファイバー挿管。',
            'SGA でも換気不能 → CICO 宣言、Plan D を発動。'
        ]
    },
    {
        id: 'C', title: 'Plan C — Wake up', titleJa: 'Plan C — 覚醒', accent: 'amber', icon: RotateCcw,
        bullets: [
            'If oxygenation maintained but intubation failed: wake the child up.',
            'Reverse muscle relaxant (sugammadex 16 mg/kg if rocuronium given).',
            'Reschedule with a difficult-airway plan (awake fibre-optic, ENT presence, smaller ETT).'
        ],
        bulletsJa: [
            '酸素化維持されているが挿管失敗: 児を覚醒させる。',
            '筋弛緩薬を拮抗 (rocuronium 投与済みなら sugammadex 16 mg/kg)。',
            '困難気道計画(覚醒下ファイバー、ENT 立ち会い、より小さい ETT)で再スケジューリング。'
        ]
    },
    {
        id: 'D', title: 'Plan D — CICO emergency front-of-neck access', titleJa: 'Plan D — CICO 緊急 front-of-neck access', accent: 'rose', icon: ShieldAlert,
        bullets: [
            'Declare CICO. Call for help / ENT immediately.',
            '100% O₂ via face mask + SGA, two-handed jaw thrust.',
            'Needle cricothyrotomy (≤8 yr): 14-18 G IV cannula through cricothyroid membrane.',
            'Connect to high-pressure jet ventilation or Manujet at low flow (∼1 L/min).',
            'Convert to surgical airway as soon as ENT arrives.',
            '⚠ Do NOT use scalpel-bougie technique in <8 yr — high risk of severe injury.'
        ],
        bulletsJa: [
            'CICO を宣言。直ちに応援要請 / ENT を呼ぶ。',
            'フェイスマスク + SGA で 100% O₂、両手 jaw thrust。',
            '輪状甲状靱帯穿刺(8 歳以下): 14-18 G IV カニューレを輪状甲状靱帯から穿刺。',
            '高圧ジェット換気または Manujet を低流量(約 1 L/min)で接続。',
            'ENT 到着次第、外科的気道に切替。',
            '⚠ 8 歳未満では scalpel-bougie 法を使用しない — 重度損傷リスクが高い。'
        ]
    }
];

const DifficultAirwayCard = () => {
    const [openPlan, setOpenPlan] = useState('A');
    const { lma, ettUncuffed, ettCuffed, blade } = useAirwayCalc();
    const { weight, ageYears } = usePatient();
    const { lang, t } = useLanguage();
    const w = parseFloat(weight) || 0;

    // Needle cricothyrotomy: 14-18 G IV cannula in <8 yr; surgical FONA only ≥8 yr.
    const fonaRecommendation = ageYears < 8
        ? {
            method: t('Needle cricothyrotomy + jet vent', '輪状甲状靱帯穿刺 + ジェット換気'),
            size: t('14-18 G IV cannula', '14-18 G IV カニューレ'),
        }
        : {
            method: t('Scalpel-bougie surgical airway', 'Scalpel-bougie 外科的気道'),
            size: t('≥6.0 mm cuffed ETT through cricothyroid membrane', '≥6.0 mm カフ付き ETT を輪状甲状靱帯から'),
        };

    return (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 space-y-4">
            <h3 className="font-bold text-rose-700 flex items-center gap-2 border-b border-slate-200 pb-2">
                <AlertTriangle size={18} /> {t('Difficult Airway — DAS / APA Paediatric Algorithm (1-8 yr)', '困難気道 — DAS / APA 小児アルゴリズム (1-8 歳)')}
            </h3>

            {/* Patient-specific airway gear */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                <div className="text-[10px] uppercase font-bold text-slate-500 mb-2">{t('Recommended gear for', '推奨機材 ')}{w} kg / {ageYears.toFixed(1)} {t('yr', '歳')}</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="bg-white p-2 rounded border border-slate-200">
                        <div className="text-[10px] uppercase text-slate-500 font-bold">{t('ETT (uncuffed)', 'ETT(カフなし)')}</div>
                        <div className="font-bold text-slate-800">{ettUncuffed}</div>
                    </div>
                    <div className="bg-white p-2 rounded border border-slate-200">
                        <div className="text-[10px] uppercase text-slate-500 font-bold">{t('ETT (cuffed)', 'ETT(カフあり)')}</div>
                        <div className="font-bold text-slate-800">{ettCuffed}</div>
                    </div>
                    <div className="bg-white p-2 rounded border border-slate-200">
                        <div className="text-[10px] uppercase text-slate-500 font-bold">LMA / i-gel</div>
                        <div className="font-bold text-slate-800">#{lma}</div>
                    </div>
                    <div className="bg-white p-2 rounded border border-slate-200">
                        <div className="text-[10px] uppercase text-slate-500 font-bold">{t('Blade', 'ブレード')}</div>
                        <div className="font-bold text-slate-800">{blade}</div>
                    </div>
                </div>
                <div className="mt-2 bg-rose-50 border border-rose-200 rounded p-2 text-xs">
                    <div className="text-[10px] uppercase font-bold text-rose-700">{t('Emergency FONA (this patient)', '緊急 FONA(この患者)')}</div>
                    <div className="font-bold text-rose-800">{fonaRecommendation.method}</div>
                    <div className="text-rose-700">{fonaRecommendation.size}</div>
                </div>
            </div>

            {/* Plan tabs */}
            <div className="grid grid-cols-4 gap-2">
                {plans.map(p => {
                    const Icon = p.icon;
                    const isOpen = openPlan === p.id;
                    const titleParts = (lang === 'ja' && p.titleJa ? p.titleJa : p.title).split(' — ');
                    const planLabel = titleParts[1] || titleParts[0];
                    return (
                        <button
                            key={p.id}
                            onClick={() => setOpenPlan(p.id)}
                            className={`p-2 rounded-lg border-2 text-center transition-colors ${isOpen ? `border-${p.accent}-500 bg-${p.accent}-50` : 'border-slate-200 bg-slate-50 hover:border-slate-300'}`}
                        >
                            <Icon size={18} className={`mx-auto text-${p.accent}-600 mb-0.5`} />
                            <div className={`font-black text-${p.accent}-700`}>{p.id}</div>
                            <div className="text-[9px] text-slate-600">{planLabel}</div>
                        </button>
                    );
                })}
            </div>

            {/* Active plan body */}
            {plans.filter(p => p.id === openPlan).map(p => (
                <div key={p.id} className={`rounded-2xl p-4 border-2 border-${p.accent}-300 bg-${p.accent}-50`}>
                    <div className={`font-black text-${p.accent}-800 text-base mb-2`}>{lang === 'ja' && p.titleJa ? p.titleJa : p.title}</div>
                    <ul className={`text-sm text-${p.accent}-900 list-disc pl-5 space-y-1.5`}>
                        {(lang === 'ja' && p.bulletsJa ? p.bulletsJa : p.bullets).map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                </div>
            ))}

            {/* External resources */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <a
                    href="https://das.uk.com/guidelines/paediatric-difficult-airway-guidelines"
                    target="_blank" rel="noopener noreferrer"
                    className="bg-white border border-rose-200 hover:border-rose-400 px-3 py-2 rounded-lg flex items-center justify-between group transition-colors"
                >
                    <span className="font-bold text-rose-800 flex items-center gap-2">
                        <Zap size={14} /> {t('DAS / APA Pediatric Algorithms (PDFs)', 'DAS / APA 小児アルゴリズム (PDF)')}
                    </span>
                    <ExternalLink size={14} className="text-rose-300 group-hover:text-rose-600" />
                </a>
                <a
                    href="https://pedsanesthesia.org/critical-events-checklists/"
                    target="_blank" rel="noopener noreferrer"
                    className="bg-white border border-rose-200 hover:border-rose-400 px-3 py-2 rounded-lg flex items-center justify-between group transition-colors"
                >
                    <span className="font-bold text-rose-800 flex items-center gap-2">
                        <Zap size={14} /> {t('SPA Critical Events Checklists', 'SPA 重大イベントチェックリスト')}
                    </span>
                    <ExternalLink size={14} className="text-rose-300 group-hover:text-rose-600" />
                </a>
            </div>
        </div>
    );
};

export default DifficultAirwayCard;
