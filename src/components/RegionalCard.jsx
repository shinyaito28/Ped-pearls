import React from 'react';
import { Anchor, Info, AlertTriangle, Beaker } from 'lucide-react';
import { useRegionalCalc } from '../hooks/useRegionalCalc';
import { usePatient } from '../context/PatientContext';
import { useLanguage } from '../context/LanguageContext';
import { fmt } from '../utils/calc';

const RegionalCard = () => {
    const { weight, isNeonate, ageYears } = usePatient();
    const { t } = useLanguage();
    const w = parseFloat(weight);
    const r = useRegionalCalc();

    const range = (min, max) => `${fmt(min)} - ${fmt(max)}`;

    const LaCard = ({ name, plain, plainDose, withEpi, withEpiDose, vol, volLabel, volEpi, volEpiLabel, accent }) => (
        <div className={`bg-white p-2 rounded border border-${accent}-200`}>
            <span className="block font-bold text-slate-700">{name}</span>
            <div className="grid grid-cols-2 gap-2 mt-1">
                <div>
                    <div className="text-[10px] uppercase text-slate-500 font-bold">{t('Plain', 'プレーン')}</div>
                    <div className="text-base font-bold text-slate-800">{fmt(plain)} mg</div>
                    <div className="text-[10px] text-slate-500">{plainDose}</div>
                    {vol !== undefined && <div className="text-[10px] text-purple-600 font-mono mt-0.5">{volLabel}: <b>{fmt(vol)} mL</b></div>}
                </div>
                <div>
                    <div className="text-[10px] uppercase text-slate-500 font-bold">{t('+ Epi', '+ エピ')}</div>
                    <div className="text-base font-bold text-slate-800">{fmt(withEpi)} mg</div>
                    <div className="text-[10px] text-slate-500">{withEpiDose}</div>
                    {volEpi !== undefined && <div className="text-[10px] text-purple-600 font-mono mt-0.5">{volEpiLabel}: <b>{fmt(volEpi)} mL</b></div>}
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-4">
            {/* Landmarks */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                <h3 className="font-bold text-purple-800 flex items-center gap-2 border-b pb-2 mb-3">
                    <Anchor size={18} /> {t('Regional Anesthesia', '区域麻酔')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="bg-purple-50 p-2 rounded">
                        <div className="text-[10px] uppercase text-purple-700 font-bold">{t('Iliac crest line', '腸骨稜線')}</div>
                        <div className="text-sm font-bold text-purple-900">{r.landmark}</div>
                    </div>
                    <div className="bg-purple-50 p-2 rounded">
                        <div className="text-[10px] uppercase text-purple-700 font-bold">{t('Spinal cord ends', '脊髄末端')}</div>
                        <div className="text-sm font-bold text-purple-900">{r.cord}</div>
                    </div>
                    <div className="bg-purple-50 p-2 rounded">
                        <div className="text-[10px] uppercase text-purple-700 font-bold">{t('Dural sac ends', '硬膜嚢末端')}</div>
                        <div className="text-sm font-bold text-purple-900">{r.dural}</div>
                    </div>
                </div>
                <div className="text-[10px] text-slate-500 mt-2">
                    {t('Thoracic landmarks: scapular spine T3, inferior scapula T7.', '胸部ランドマーク: 肩甲棘 T3、肩甲骨下角 T7。')} {(isNeonate || ageYears < 1) ? t('Infant', '乳児') : t('Child', '小児')} {t('approach.', 'アプローチ。')}
                </div>
            </div>

            {/* Single-shot block volumes */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                <h3 className="font-bold text-slate-700 border-b pb-2 mb-3">{t('Single-shot block volumes', '単回ブロック投与量')}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="border p-3 rounded">
                        <div className="font-bold text-sm text-slate-700">{t('Caudal (Bupi 0.125-0.25%)', 'カウダル (Bupi 0.125-0.25%)')}</div>
                        <div className="text-xl font-bold text-purple-700">{range(r.caudalMin, r.caudalMax)} mL</div>
                        <div className="text-[9px] text-slate-400 font-mono">{w} kg × 0.5-1.25 mL/kg • {t('below umbilicus', '臍下')}</div>
                    </div>
                    <div className="border p-3 rounded">
                        <div className="font-bold text-sm text-slate-700">{t('Spinal', '脊麻')}</div>
                        <div className="text-xl font-bold text-purple-700">{range(r.spinalMin, r.spinalMax)} mL</div>
                        <div className="text-[9px] text-slate-400 font-mono">{w} kg × 0.1-0.2 mL/kg • {t('max 1-1.2 mL', '最大 1-1.2 mL')}</div>
                        <div className="text-[10px] text-slate-500 mt-1">
                            Bupi 0.5%: {r.spinalBupiDuration} • Ropi 0.5%: {r.spinalRopiDuration}
                        </div>
                    </div>
                    <div className="border p-3 rounded">
                        <div className="font-bold text-sm text-slate-700">{t('Penile (Bupi 0.25%, NO epi)', '陰茎ブロック (Bupi 0.25%、エピ不可)')}</div>
                        <div className="text-xl font-bold text-purple-700">{range(r.penileMin, r.penileMax)} mL</div>
                        <div className="text-[9px] text-slate-400 font-mono">{t("2-3 mL midline + 2 / 10 o'clock, 22-25 g", '正中 2-3 mL + 2 時 / 10 時方向、22-25 g')}</div>
                    </div>
                    <div className="border p-3 rounded">
                        <div className="font-bold text-sm text-slate-700">{t('Extremity block', '四肢ブロック')}</div>
                        <div className="text-xl font-bold text-purple-700">{range(r.extremityMin, r.extremityMax)} mL</div>
                        <div className="text-[9px] text-slate-400 font-mono">{w} kg × 0.5-1 mL/kg</div>
                    </div>
                </div>
            </div>

            {/* Epidural details */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                <h3 className="font-bold text-slate-700 border-b pb-2 mb-3">{t('Epidural test dose & infusion', '硬膜外テストドーズ + 持続')}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="bg-purple-50 p-2 rounded">
                        <div className="font-bold text-purple-800">{t('Test dose (LA + epi 1:200,000)', 'テストドーズ (LA + epi 1:200,000)')}</div>
                        <div className="text-lg font-bold text-purple-700">{fmt(Math.min(r.testDoseMin, 3))} mL</div>
                        <div className="text-[10px] text-slate-500">{t('0.1 mL/kg, max 3 mL', '0.1 mL/kg、最大 3 mL')}</div>
                        <div className="text-[10px] text-slate-500 mt-1">{t('+ in 1st min: ↑HR > 10 bpm OR ↑SBP > 15 mmHg OR T-wave amplitude ±25%.', '+ 1 分以内: ↑HR > 10 bpm または ↑SBP > 15 mmHg または T 波振幅 ±25%。')}</div>
                    </div>
                    <div className="bg-purple-50 p-2 rounded">
                        <div className="font-bold text-purple-800">{t('Continuous infusion', '持続投与')}</div>
                        <div className="text-xs text-slate-700 grid gap-1 mt-1">
                            <div>Bupivacaine 0.1%: <b>{fmt(r.epiBupiMin)} - {fmt(r.epiBupiMax)} mL/hr</b> <span className="text-slate-400">(0.2-0.4 mg/kg/hr)</span></div>
                            <div>Ropivacaine 0.1%: <b>{fmt(r.epiRopiMin)} - {fmt(r.epiRopiMax)} mL/hr</b> <span className="text-slate-400">(0.8-1.6 mg/kg/hr)</span></div>
                            <div>3% Chloroprocaine: <b>{fmt(r.epiChloro)} mL/hr</b> <span className="text-slate-400">(1 mL/kg/hr)</span></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Max LA doses */}
            <div className="bg-slate-50 p-3 rounded border border-slate-200">
                <div className="text-xs font-bold text-slate-600 uppercase mb-2 flex items-center gap-2">
                    <AlertTriangle size={14} className="text-rose-500" /> {t('Max local anesthetic doses (LAST prevention)', '局所麻酔薬最大量 (LAST 予防)')}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <LaCard name={t('Lidocaine', 'リドカイン')} accent="slate"
                        plain={r.maxLido} plainDose="4.5 mg/kg"
                        withEpi={r.maxLidoEpi} withEpiDose="7 mg/kg"
                        vol={r.volLido1} volLabel="1% (10 mg/mL)"
                        volEpi={r.volLidoEpi1} volEpiLabel={t('1% (+epi)', '1% (+エピ)')}
                    />
                    <LaCard name={t('Bupivacaine', 'Bupivacaine')} accent="slate"
                        plain={r.maxBupi} plainDose="2.5 mg/kg"
                        withEpi={r.maxBupiEpi} withEpiDose="3 mg/kg"
                        vol={r.volBupi025} volLabel="0.25% (2.5 mg/mL)"
                        volEpi={r.volBupiEpi025} volEpiLabel={t('0.25% (+epi)', '0.25% (+エピ)')}
                    />
                    <LaCard name={t('Ropivacaine', 'Ropivacaine')} accent="slate"
                        plain={r.maxRopi} plainDose="3.5 mg/kg"
                        withEpi={r.maxRopiEpi} withEpiDose="3.5 mg/kg"
                        vol={r.volRopi02} volLabel="0.2% (2 mg/mL)"
                        volEpi={r.volRopiEpi02} volEpiLabel={t('0.2% (+epi)', '0.2% (+エピ)')}
                    />
                    <LaCard name={t('Chloroprocaine', 'クロロプロカイン')} accent="slate"
                        plain={r.maxChloro} plainDose="11 mg/kg"
                        withEpi={r.maxChloroEpi} withEpiDose="14 mg/kg"
                        vol={r.volChloro3} volLabel="3% (30 mg/mL)"
                        volEpi={r.volChloroEpi3} volEpiLabel={t('3% (+epi)', '3% (+エピ)')}
                    />
                </div>
                <div className="text-[10px] text-rose-700 mt-2 italic">{t('⚠ Multiple blocks: total dose must stay under the lowest single-block max.', '⚠ 複数ブロック: 総量は最も低い単独ブロック最大量を下回ること。')}</div>
            </div>

            {/* Block adjuncts */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                <h3 className="font-bold text-slate-700 border-b pb-2 mb-3 flex items-center gap-2">
                    <Beaker size={16} /> {t('Block adjuncts (prolong duration 20-40%)', 'ブロック補助薬(持続時間 20-40% 延長)')}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                    {Object.entries(r.adjuncts).map(([k, v]) => {
                        const cap = k[0].toUpperCase() + k.slice(1);
                        const calc = typeof v.calc === 'object'
                            ? `${fmt(v.calc.min)} - ${fmt(v.calc.max)}`
                            : fmt(v.calc);
                        const unit = (k === 'dexamethasone' || k === 'morphine') ? (k === 'dexamethasone' ? 'mg' : 'mcg') : 'mcg';
                        return (
                            <div key={k} className="bg-slate-50 p-2 rounded">
                                <div className="font-bold text-slate-800 text-xs">{cap}</div>
                                <div className="text-base font-bold text-purple-700">{calc} {unit}</div>
                                <div className="text-[10px] text-slate-500">{v.dose}</div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="text-[10px] text-slate-400 italic flex items-start gap-2">
                <Info size={12} className="flex-shrink-0 mt-0.5" />
                {t('Always aspirate. Use ultrasound when able. Target nerve stimulator 0.4-0.5 mA. Know where intra-lipid is stored.', '常に吸引試験。可能なら超音波を使用。神経刺激装置目標 0.4-0.5 mA。脂肪乳剤の保管場所を把握しておく。')}
            </div>
        </div>
    );
};

export default RegionalCard;
