// ASC (Ambulatory Surgery Centers) hub — catalog entries.
// Source: NCH Sharepoint / Ambulatory Surgery Centers /
//   - ASC Guidelines March 2026.pdf (frequently revised — 17 revisions documented since 2013)
//   - OSA PAT flowsheet (already a flowchart card flow_osa_pat)

const COMMON = {
    hub: 'asc',
    kind: 'catalog',
    weightAware: false,
    ageRules: null,
    source: 'NCH Sharepoint / Ambulatory Surgery Centers',
    lastReviewed: '2026-04',
};

export const entries = [
    {
        ...COMMON,
        id: 'asc_appropriate_cases_guidelines',
        title: 'ASC — Appropriate Cases Guidelines (March 2026)',
        titleJa: 'ASC — 適応症例ガイドライン (2026 年 3 月)',
        shortDescription: 'NOT-permitted vs PAT-review-required vs OK lists. ≤4 hr anesthesia, same-day discharge.',
        shortDescriptionJa: '不可 vs PAT レビュー必要 vs 可 のリスト。麻酔 ≤4 時間、当日退院。',
        tags: ['asc', 'ambulatory surgery center', 'outpatient surgery', 'pat review', 'preterm', 'bmi cutoff', 'mh history', 'osa', 'cpap', 'icd', 'pacemaker', 'mitochondrial', 'eb', 'venezuelan heritage', 'glp-1'],
        emergency: false,
        related: ['flow_osa_pat', 'preop_adult_admission'],
        sections: [
            {
                heading: 'Goals',
                headingJa: '目的',
                emphasis: 'info',
                body: '- **Care for patients safely + follow ambulatory periop standards**\n- **Minimize cancellation** of procedures\n- **Avoid postoperative admissions**',
                bodyJa: '- **患者を安全にケアし、外来周術期標準に従う**\n- 手技の **キャンセルを最小化**\n- **術後入院を回避**',
            },
            {
                heading: 'Ideal procedures',
                headingJa: '理想的な手技',
                emphasis: 'success',
                body: '- Procedures schedulable for **same-day discharge** following uncomplicated surgery + anesthetic\n- Expected **blood loss is minimal**\n- **Likelihood of complications is rare**\n- **Minimal chance of post-op hospital admission**\n- **Less than 4 hours of anesthesia time**\n- Cases scheduled for timely completion within ASC operating hours',
                bodyJa: '- 合併症のない手術 + 麻酔後に **当日退院**として予定可能な手技\n- 予測 **出血が最小**\n- **合併症発生は稀**\n- **術後入院の可能性最小**\n- **麻酔時間 4 時間未満**\n- ASC 営業時間内で完了するよう予定された症例',
            },
            {
                heading: '🚫 NOT permitted at ASC — Age + body composition',
                headingJa: '🚫 ASC 不可 — 年齢 + 体組成',
                emphasis: 'critical',
                body: '- **Preterm (<37 weeks gestation at birth) at < 60 wk PCA** — *exception: cases under exclusively local anesthesia*\n- **Full-term (≥37 wk) at < 44 wk PCA** — *exception: local anesthesia only*\n- **≥12 yo with BMI ≥ 40**\n- **<12 yo with BMI > 99th percentile + 3 positive OSA screening questions**\n- **<12 yo with BMI ≥ 140% of 95th %ile**\n- **<3 yo for adenotonsillectomy**\n- **<18 mo for adenoidectomy**\n- **PAST documented MH events**',
                bodyJa: '- 在胎 <37 週で出生した **早産児で PCA < 60 週** — *例外: 純粋に局所麻酔のみの症例*\n- 在胎 ≥37 週の **満期児で PCA < 44 週** — *例外: 局所麻酔のみ*\n- **12 歳以上で BMI ≥ 40**\n- **12 歳未満で BMI > 99 パーセンタイル + OSA スクリーニング質問 3 個陽性**\n- **12 歳未満で BMI ≥ 95 パーセンタイルの 140%**\n- **3 歳未満のアデノ扁桃切除**\n- **18 ヶ月未満のアデノイド切除**\n- **MH イベント既往の記録あり**',
            },
            {
                heading: '🚫 NOT permitted at ASC — Procedure type',
                headingJa: '🚫 ASC 不可 — 手技種別',
                emphasis: 'warn',
                body: '- **Outpatient laparoscopic procedures (incl. diagnostic) <6 mo of age**\n  - **Exception**: laparoscopic CAN be done at ASC if:\n    - **≥ 6 months of age**\n    - **6-12 mo: must START by 11:00 AM**\n    - **≥ 12 mo: can start after 11:00 AM but should END by 3:00 PM**\n  - **Groin laparoscopy**: OK under 6 mo\n- **Direct laryngoscopy + bronchoscopy** (ENT/Pulm)',
                bodyJa: '- **6 ヶ月未満の外来腹腔鏡手技(診断的を含む)**\n  - **例外**: 以下の場合 ASC で腹腔鏡可:\n    - **6 ヶ月以上**\n    - **6-12 ヶ月: 11:00 AM までに開始必須**\n    - **12 ヶ月以上: 11:00 AM 以降開始可だが 3:00 PM までに終了**\n  - **鼠径部腹腔鏡**: 6 ヶ月未満でも可\n- **直接喉頭鏡 + 気管支鏡** (ENT/Pulm)',
            },
            {
                heading: '🚫 NOT permitted — Hematology / Endocrine',
                headingJa: '🚫 不可 — 血液 / 内分泌',
                emphasis: 'warn',
                body: '- **Bleeding disorders** (vWD, hemophilia) requiring pre/post-op IV therapy, transfusion, or special labs\n- **Hematologic disorders** (sickle cell) requiring same\n- **Type 1 DM (insulin-dependent)** OR **poorly controlled Type 2 DM**\n- **Maternal Venezuelan heritage** (mtND4 anesthetic risk — see metabolic_mtnd4_venezuelan)',
                bodyJa: '- 術前後 IV 療法、輸血、特殊検査を要する **出血性疾患**(vWD、血友病)\n- 同様の対応を要する **血液疾患**(鎌状赤血球症)\n- **1 型糖尿病(インスリン依存)** または **コントロール不良 2 型糖尿病**\n- **母方 Venezuelan 系**(mtND4 麻酔リスク — metabolic_mtnd4_venezuelan 参照)',
            },
            {
                heading: '🚫 NOT permitted — Respiratory',
                headingJa: '🚫 不可 — 呼吸器',
                emphasis: 'warn',
                body: '- **Uncontrolled asthma** clinically symptomatic and/or on oral steroids\n- **Severe OSA** OR **CPAP/BiPAP-dependence**\n- **Active pulmonary hypertension**\n- **Documented difficult airway**\n- **Respiratory isolation needed**\n- **Known or suspected airway papilloma**',
                bodyJa: '- 臨床症状あり および/または 経口ステロイド使用中の **コントロール不良喘息**\n- **重症 OSA** または **CPAP/BiPAP 依存**\n- **活動性肺高血圧**\n- **記録された困難気道**\n- **呼吸器隔離が必要**\n- **既知または疑い気道乳頭腫**',
            },
            {
                heading: '🚫 NOT permitted — Neurological',
                headingJa: '🚫 不可 — 神経',
                emphasis: 'warn',
                body: '- **Uncontrolled or newly diagnosed seizures**\n- **Neuromuscular disorders** (e.g. Duchenne MD)\n- **Combined spinal-caudal** required for procedure',
                bodyJa: '- **コントロール不良または新規診断のてんかん**\n- **神経筋疾患**(例: Duchenne MD)\n- 手技に **脊麻-カウダル併用**が必要',
            },
            {
                heading: '🚫 NOT permitted — Cardiac',
                headingJa: '🚫 不可 — 心臓',
                emphasis: 'warn',
                body: '- **Unrepaired or partially repaired CHD** (TOF, HLHS, Eisenmenger\'s, post-Glenn, single-ventricle physiology, unrepaired ASD/VSD with physiological impact)\n- **Pacemakers OR implanted defibrillators (AICD)**',
                bodyJa: '- **未修復または部分修復 CHD** (TOF、HLHS、Eisenmenger、Glenn 後、単心室生理、生理的影響のある未修復 ASD/VSD)\n- **ペースメーカーまたは植え込み型除細動器 (AICD)**',
            },
            {
                heading: '🚫 NOT permitted — Miscellaneous',
                headingJa: '🚫 不可 — その他',
                emphasis: 'warn',
                body: '- **Opioid dependence or substance abuse** (incl. patients on Suboxone)\n- **Current prisoners** OR **minors in juvenile detention**\n- **History of significant violent behavior**\n- **Mitochondrial disorders**\n- **Epidermolysis Bullosa (EB)**',
                bodyJa: '- **オピオイド依存または物質乱用** (Suboxone 患者を含む)\n- **現在拘禁中** または **少年拘置所の未成年**\n- **重大な暴力行動の既往**\n- **ミトコンドリア病**\n- **表皮水疱症 (EB)**',
            },
            {
                heading: '⚠ Allowed AFTER PAT review by attending anesthesiologist',
                headingJa: '⚠ 麻酔科主治医の PAT レビュー後に許可',
                emphasis: 'info',
                body: '**General**:\n- **<12 yo with BMI > 99th %ile + 2 (NOT 3) positive OSA questions**\n- **≥12 yo with BMI 35-39 + 2 positive OSA questions**\n- **<12 yo with BMI 99-139% of 95th %ile**\n- Significant psychological/medical issues hampering same-day discharge\n- **Difficult-to-manage behavior** (aggressive, severe autism) — patient must tolerate intranasal/oral/IM premed administration\n- **Acute illness** (fever, URI, diarrhea) without other ASC contraindications — evaluated day prior\n- **Recent hospitalization or ER visit**\n- **Recent vaccinations** (within 48 hr — risk of febrile response masking surgical illness)\n- **Well-controlled stable Type 2 DM** (NIDDM)\n- **Adults ≥22 yo** — scheduling must provide reason for NCH facility + PCP H&P within last 12 mo (sooner if status changes)\n- **Westerville site**: adenoidectomy patients (with or without BTI) classified as outpatient-in-a-bed if all other criteria met',
                bodyJa: '**一般**:\n- **12 歳未満で BMI > 99 パーセンタイル + OSA 質問 2 個(3 個ではない)陽性**\n- **12 歳以上で BMI 35-39 + OSA 質問 2 個陽性**\n- **12 歳未満で BMI 95 パーセンタイルの 99-139%**\n- 当日退院を妨げる重大な心理的/医学的問題\n- **管理困難な行動**(攻撃的、重度自閉症) — 経鼻/経口/IM 前投薬投与を許容できる必要\n- 他の ASC 禁忌のない **急性疾患**(発熱、URI、下痢) — 前日に評価\n- **最近の入院または ER 受診**\n- **最近の予防接種**(48 時間以内 — 発熱反応が手術疾患をマスクするリスク)\n- **安定したコントロール良好の 2 型糖尿病** (NIDDM)\n- **22 歳以上の成人** — スケジューリング時に NCH 施設利用理由 + 12 ヶ月以内の PCP H&P を提供必須(状態変化があればより早期に)\n- **Westerville サイト**: アデノイド切除患者(BTI ありなしにかかわらず)は他基準すべて満たせば outpatient-in-a-bed として分類',
            },
            {
                heading: '⚠ Allowed AFTER PAT review — Respiratory + Cardiac + Misc',
                headingJa: '⚠ PAT レビュー後に許可 — 呼吸器 + 心臓 + その他',
                emphasis: 'info',
                body: '**Respiratory**: stable cystic fibrosis; moderate stable asthma\n\n**Cardiac**: **repaired and stable CHD** (ASD, VSD, PDA, TOF s/p full repair)\n\n**Miscellaneous**:\n- Extensive or complicated medical history\n- **Non-cardiac implantable devices** (VP shunt, sacral nerve stimulator, baclofen pump, gastric pacemaker, etc.)\n- **Bleeding/sickle cell disease that does NOT require IV meds or labs**\n- **Craniofacial syndromes** (Pierre-Robin, Trisomy 21) **WITH prior airway documentation** showing easy management (mask + laryngoscopy)\n- **GLP-1 agonists / semaglutides**: hold per pre-op timing protocol (daily formulations day-of, weekly formulations 1 week prior)',
                bodyJa: '**呼吸器**: 安定嚢胞性線維症;中等症安定喘息\n\n**心臓**: **修復済かつ安定 CHD** (ASD、VSD、PDA、TOF 完全修復後)\n\n**その他**:\n- 広範または複雑な医学既往\n- **非心臓植え込みデバイス**(VP シャント、仙骨神経刺激装置、バクロフェンポンプ、胃ペースメーカーなど)\n- **IV 薬剤または検査を要しない出血/鎌状赤血球症**\n- 過去の気道記録で容易な管理(マスク + 喉頭展開)が示されている **頭蓋顔面症候群**(Pierre-Robin、21 トリソミー)\n- **GLP-1 作動薬 / セマグルチド**: 術前タイミングプロトコールに従い中止(連日製剤は当日、週製剤は 1 週前)',
            },
            {
                heading: 'Cross-references',
                headingJa: 'クロスリファレンス',
                emphasis: 'success',
                body: '- **OSA PAT Flowsheet** (interactive flowchart, Pre-op hub) — for the live OSA-question + BMI tier decision logic\n- **Adult Patient Admission** (Pre-op hub) — for adult >21 admission to NCH\n- **Venezuelan mtND4 protocol** (Metabolic hub) — full action plan for the Venezuelan heritage exclusion above',
                bodyJa: '- **OSA PAT Flowsheet**(対話型フローチャート、Pre-op ハブ) — リアルタイム OSA 質問 + BMI ティア判定ロジック用\n- **Adult Patient Admission**(Pre-op ハブ) — 21 歳超の NCH 入院について\n- **Venezuelan mtND4 protocol**(Metabolic ハブ) — 上記 Venezuelan 系除外の完全アクションプラン',
            },
            {
                heading: 'Source revisions',
                headingJa: 'ソース改訂',
                emphasis: 'plain',
                body: 'NCH Policy originated 8/13. Revised: 9/15, 11/18, 5/19, 8/2020, 7/2021, 11/2021, 12/21, 1/23, 7/23, 8/23, 10/23, 12/24, 1/25, 2/25, 6/25, 10/25, 1/26, **3/26** (current). The frequent revision cadence reflects evolving criteria — verify against latest source if a borderline case.',
                bodyJa: 'NCH ポリシー 2013 年 8 月起源。改訂: 2015/9、2018/11、2019/5、2020/8、2021/7・11・12、2023/1・7・8・10、2024/12、2025/1・2・6・10、2026/1、**2026/3**(現行)。頻繁な改訂頻度は基準が進化していることを反映 — 境界例では最新ソースで確認。',
            },
        ],
    },
];
