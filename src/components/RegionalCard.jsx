import React from 'react';
import { Anchor, Info, Beaker } from 'lucide-react';
import { useRegionalCalc } from '../hooks/useRegionalCalc';
import { usePatient } from '../context/PatientContext';
import { useLanguage } from '../context/LanguageContext';
import { fmt } from '../utils/calc';
import { positiveNumber } from '../utils/localAnestheticPlan';
import LocalAnestheticPlan from './LocalAnestheticPlan';

const RegionalCard = () => {
    const { weight, isNeonate, ageYears } = usePatient();
    const { t } = useLanguage();
    const r = useRegionalCalc();

    if (positiveNumber(weight) === null || !Number.isFinite(Number(weight) * 30)) return (
        <div role="status" className="bg-white border border-slate-200 rounded p-4">
            {t('Enter a positive finite patient weight within the calculation range to calculate regional amounts.', '区域麻酔の量を計算するには、計算可能な正の有限値を患者体重に入力してください。')}
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
                <h3 className="font-bold text-slate-700 border-b pb-2 mb-3">{t('Single-shot block references — conditions required', '単回ブロックの参考値 — 条件の確認が必要')}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="border p-3 rounded">
                        <div className="font-bold text-sm text-slate-700">{t('Caudal (Bupi 0.125-0.25%)', 'カウダル (Bupi 0.125-0.25%)')}</div>
                        <div className="text-xs text-amber-900 mt-2">{t('Automatic caudal volume withheld: select a drug, concentration and intended amount below. The source ranges cannot be combined freely.', 'カウダル容積の自動推奨は保留しています。下欄で薬剤・濃度・予定量を入力してください。原資料の範囲は自由に組み合わせられません。')}</div>
                        <details className="text-xs mt-2"><summary>{t('NCH 2021 historical caudal range', 'NCH 2021のカウダル参考範囲')}</summary><p>Bupivacaine 0.125–0.25%; 0.5–1.25 mL/kg.</p></details>
                        <p className="text-xs text-amber-900 bg-amber-50 p-2 rounded mt-2">{t('Concentration and volume ranges are not interchangeable options: 1.25 mL/kg × 0.25% (2.5 mg/mL) = 3.125 mg/kg, above the separate plain-bupivacaine reference of 2.5 mg/kg. Confirm the specific protocol and planned mg/kg.', '濃度と容積の範囲から任意の組合せを選べるとは限りません。1.25 mL/kg × 0.25%（2.5 mg/mL）＝3.125 mg/kgとなり、別欄のBupivacaineエピなし参考値2.5 mg/kgを超えます。適用プロトコルと予定mg/kgを確認してください。')}</p>
                    </div>
                    <div className="border p-3 rounded">
                        <div className="font-bold text-sm text-slate-700">{t('Spinal — historical source range', '脊麻 — 過去資料の参考範囲')}</div>
                        <details className="text-xs mt-2">
                            <summary>{t('Show the historical NCH source range', '過去のNCH資料の範囲を表示')}</summary>
                            <p>0.5% = 5 mg/mL; 0.1–0.2 mL/kg = 0.5–1 mg/kg (Bupivacaine / Ropivacaine).</p>
                        </details>
                        <div className="text-xs text-slate-600 mt-1">{t('Historical NCH 2021 volume reference; not an age-specific recommendation. The 2015 NCH spinal sheet lists a usual 1 mL maximum only for bupivacaine in children under 12 months. It does not establish a shared bupivacaine/ropivacaine cap.', 'NCH 2021の歴史的な容積参考値で、年齢別推奨ではありません。2015年NCH脊麻資料の通常最大1 mLは12か月未満のBupivacaineに限る記載です。BupivacaineとRopivacaine共通の上限ではありません。')}</div>
                        <div role="status" className="text-xs text-amber-800 bg-amber-50 p-2 rounded mt-1">{t('No age-specific automatic spinal dose is established here. Confirm drug, baricity, age, weight and protocol. The displayed historical weight range is not capped.', 'ここでは年齢別の脊麻用量を自動推奨していません。薬剤・比重・年齢・体重・プロトコルを確認してください。表示された歴史的な体重換算範囲には上限を適用していません。')}</div>
                        <div className="text-[10px] text-slate-500 mt-1">
                            Bupi 0.5%: {r.spinalBupiDuration} • Ropi 0.5%: {r.spinalRopiDuration}
                        </div>
                    </div>
                    <div className="border p-3 rounded">
                        <div className="font-bold text-sm text-slate-700">{t('Penile (Bupi 0.25%, NO epi)', '陰茎ブロック (Bupi 0.25%、エピ不可)')}</div>
                        <p className="text-xs text-amber-900 mt-2">{t('Reference only: 0.5–1 mL/kg at 0.25%, without epinephrine. Age, site allocation and protocol are not established here; no automatic volume is recommended.', '参考値のみ：0.25%、エピネフリンなしで0.5–1 mL/kg。年齢・部位別配分・適用手順が未確定のため、容積は自動推奨しません。')}</p>
                        <div className="text-[9px] text-slate-400 font-mono">{t("2-3 mL midline + 2 / 10 o'clock, 22-25 g", '正中 2-3 mL + 2 時 / 10 時方向、22-25 g')}</div>
                    </div>
                    <div className="border p-3 rounded">
                        <div className="font-bold text-sm text-slate-700">{t('Extremity block', '四肢ブロック')}</div>
                        <p className="text-xs text-amber-900 mt-2">{t('Reference only: 0.5–1 mL/kg. Drug, concentration, nerve/site and age are missing; no automatic volume is recommended.', '参考値のみ：0.5–1 mL/kg。薬剤・濃度・神経や部位・年齢条件が不足しているため、容積は自動推奨しません。')}</p>

                    </div>
                </div>
            </div>

            {/* Epidural details */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                <h3 className="font-bold text-slate-700 border-b pb-2 mb-3">{t('Epidural test dose & infusion source review', '硬膜外テストドーズ・持続投与資料の確認')}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="bg-purple-50 p-2 rounded">
                        <div className="font-bold text-purple-800">{t('Test-dose volume reference (LA + epi 1:200,000)', 'テストドーズ容積の参考計算 (LA + epi 1:200,000)')}</div>
                        <div className="text-lg font-bold text-purple-700">{fmt(Math.min(r.testDoseMin, 3))} mL</div>
                        <div className="text-[10px] text-slate-500">{t('0.1 mL/kg, max 3 mL', '0.1 mL/kg、最大 3 mL')}</div>
                        <p className="text-xs text-slate-600 mt-2">{t('NCH 2021 volume calculation only. Confirm the local anesthetic, concentration, patient and route; this is not a generic safe drug dose.', 'NCH 2021の容積換算です。局麻薬・濃度・患者・経路への適合を確認してください。薬剤共通の安全用量を示しません。')}</p>
                        <div className="text-[10px] text-slate-500 mt-1">{t('+ in 1st min: ↑HR > 10 bpm OR ↑SBP > 15 mmHg OR T-wave amplitude ±25%.', '+ 1 分以内: ↑HR > 10 bpm または ↑SBP > 15 mmHg または T 波振幅 ±25%。')}</div>
                    </div>
                    <section className="bg-amber-50 border border-amber-200 p-3 rounded" aria-label={t('Infusion protocol review', '持続投与プロトコル確認')}>
                        <div className="font-bold text-amber-900">{t('Continuous infusion — review pending', '持続投与 — プロトコル確認中')}</div>
                        <p className="text-xs text-amber-900 mt-2">{t('Bupivacaine / Ropivacaine: patient-specific automatic rates are withheld while age, concentration and the applicable protocol are reviewed. The photographed reference alone does not establish suitability.', 'Bupivacaine / Ropivacaine：対象年齢・濃度・適用プロトコルの確認中のため、体重別の自動速度表示を保留しています。元写真との一致だけでは適用の妥当性を確認できません。')}</p>
                        <p className="text-xs text-slate-700 mt-2">{t('Chloroprocaine: protocol-dependent. The spinal–caudal document specifies a start time after spinal placement. Confirm the procedure, timing and patient criteria before selecting a rate.', 'Chloroprocaine：手順に依存します。spinal–caudal資料には脊麻後の開始時点が指定されています。手順・開始時点・患者条件を確認してから速度を決めてください。')}</p>
                        <details className="mt-3 text-xs text-slate-700">
                            <summary className="cursor-pointer min-h-[44px] flex items-center font-semibold">{t('Original source figures — protocol not verified', '元資料の記載 — 適用プロトコル未確認')}</summary>
                            <div className="space-y-2 pt-2">
                                <p>{t('For source review only; no patient-specific rate is calculated in this section.', '出典照合のための記載です。この欄では患者ごとの速度を算出しません。')}</p>
                                <p>Bupivacaine: 0.2-0.4 mg/kg/hr · Ropivacaine: 0.8-1.6 mg/kg/hr</p>
                                <p>{t('IMG_0063 lists mg/kg/hr but no age groups or bupivacaine/ropivacaine concentrations. “Infusion” follows the epidural test-dose text; the line itself does not name a route.', 'IMG_0063はmg/kg/hrと記載しますが、年齢区分とBupivacaine/Ropivacaineの濃度はありません。「Infusion」は硬膜外テストドーズの後にあり、行自体に経路名はありません。')}</p>
                                <p>Chloroprocaine: 3% · 1 cc/kg/hr = 1 mL/kg/hr = 30 mg/kg/hr</p>
                                <p>{t('Spinal–caudal document: 3% chloroprocaine at 1 mL/kg/hr, starting ONE hour after spinal placement. This is a separate procedure-specific source, not a general infusion recommendation.', 'Spinal–caudal資料：3% Chloroprocaineを1 mL/kg/hr、脊麻後1時間から開始。これは手順別の資料であり、一般的な持続投与の推奨ではありません。')}</p>
                            </div>
                        </details>
                    </section>
                </div>
            </div>

            <LocalAnestheticPlan />

            <section className="bg-amber-50 p-3 rounded border border-amber-200">
                <h3 className="font-semibold text-sm text-amber-900 dark:text-amber-200">{t('Historical single-dose figures — no generic safe maximum', '過去資料の単回参考値 — 共通の安全上限ではありません')}</h3>
                <p className="text-xs text-amber-900 dark:text-amber-200 mt-2">{t('Age, route, formulation, absolute mg caps and cumulative exposure are not defined by this table. Patient-specific maximum amounts are withheld. Use an applicable protocol; do not apply a single-dose figure to an infusion or combine different drugs.', 'この表では年齢・経路・製剤・絶対mg上限・累積量の条件が定義されていません。患者別の極量計算は保留しています。適用プロトコルを確認し、単回値を持続投与に流用したり、異なる薬剤の許容量を合算したりしないでください。')}</p>
                <details className="text-xs mt-2">
                    <summary className="min-h-[44px] flex items-center">{t('Show NCH 2021 source figures (plain / with epinephrine)', 'NCH 2021の原値を表示（エピなし／エピあり）')}</summary>
                    <p>Lidocaine: 4.5 / 7 mg/kg · Bupivacaine: 2.5 / 3 mg/kg</p>
                    <p>Ropivacaine: 3.5 / 3.5 mg/kg · Chloroprocaine: 11 / 14 mg/kg</p>
                    <p>{t('Source: Regional Pearls, IMG_0063; current institutional approval is unconfirmed.', '出典：Regional Pearls、IMG_0063。現在の院内承認は未確認です。')}</p>
                </details>
            </section>

            <section className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                <h3 className="font-bold text-slate-700 flex items-center gap-2"><Beaker size={16} /> {t('Block adjuvants — route confirmation required', 'ブロック添加薬 — 投与経路の確認が必要')}</h3>
                <p className="text-xs text-amber-900 bg-amber-50 p-2 rounded mt-2">{t('These NCH 2021 figures do not identify intrathecal, epidural, perineural or IV use, age or product suitability. Automatic amounts are withheld. Do not transfer an adjuvant dose between routes.', 'NCH 2021のこの欄では、くも膜下・硬膜外・神経周囲・静脈内の区別、年齢、製剤への適合が不明です。自動用量は保留しています。添加薬の用量を別経路に流用しないでください。')}</p>
                <details className="text-xs mt-2">
                    <summary className="min-h-[44px] flex items-center">{t('Show historical adjuvant figures — not recommendations', '過去の添加薬の原値を表示 — 推奨量ではありません')}</summary>
                    {Object.entries(r.adjuncts).map(([name, value]) => <p key={name}>{name}: {value.dose}</p>)}
                </details>
            </section>

            <section className="text-xs text-slate-600 border border-slate-200 rounded p-3 space-y-2" aria-label={t('Regional reference sources', '区域麻酔の出典')}>
                <p>{t('NCH Regional Pearls: recorded as 2021 (IMG_0063); the photo does not establish current approval. NCH Spinal Anesthesia Pearls: revised 9/2015; its usual 1 mL infant limit applies to bupivacaine, not ropivacaine.', 'NCH Regional Pearlsは2021版として収録（IMG_0063）。写真だけでは現在の承認を確認できません。NCH Spinal Anesthesia Pearlsは9/2015改訂で、乳児の通常最大1 mLはBupivacaineの記載です。Ropivacaine共通の上限ではありません。')}</p>
                <p>{t('ESRA/ASRA 2018 epidural infusion reference: bupivacaine / ropivacaine 0.2 mg/kg/hr under 3 months, 0.3 at 3 months–1 year, 0.4 above 1 year. These are route-specific comparisons, not replacement settings. Ropivacaine SmPC uses different age bands; source figures must not be pooled.', 'ESRA/ASRA 2018の硬膜外持続参考値：Bupivacaine／Ropivacaineは3か月未満0.2、3か月–1歳0.3、1歳超0.4 mg/kg/hr。経路別の比較値で、設定値への置換はしていません。Ropivacaine SmPCは月齢区分が異なり、資料の値を混在させません。')}</p>
                <a className="underline block" href="https://www.esraitalia.it/wp-content/uploads/2021/04/LA-dose-and-adjuvants-for-kids.pdf" target="_blank" rel="noreferrer">ESRA/ASRA Pediatric Regional Anesthesia Advisory (2018), pp.212–214</a>
                <a className="underline block" href="https://www.medicines.org.uk/emc/product/100394/smpc" target="_blank" rel="noreferrer">Ropivacaine 2 mg/mL SmPC, §4.2 (revised 2024-01-10)</a>
            </section>

            <div className="text-[10px] text-slate-400 italic flex items-start gap-2">
                <Info size={12} className="flex-shrink-0 mt-0.5" />
                {t('Always aspirate. Use ultrasound when able. Target nerve stimulator 0.4-0.5 mA. Know where intra-lipid is stored.', '常に吸引試験。可能なら超音波を使用。神経刺激装置目標 0.4-0.5 mA。脂肪乳剤の保管場所を把握しておく。')}
            </div>
        </div>
    );
};

export default RegionalCard;
