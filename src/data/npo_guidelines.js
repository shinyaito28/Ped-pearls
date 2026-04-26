// NPO guidelines for elective pediatric anesthesia.
// Source: ASA Practice Guidelines for Preoperative Fasting (2017),
// updated by ASA 2023 statement allowing clear liquids to 1-2 hr in healthy children.

export const npoTypes = [
    { id: 'clear-2023',  label: 'Clear liquids (ASA 2023)',  labelJa: '清澄液 (ASA 2023)',         hours: 1, detail: 'Healthy children: 1 hr (10 mL/kg max). Updated ASA 2023 statement.', detailJa: '健康な小児: 1 時間 (最大 10 mL/kg)。ASA 2023 改訂声明。' },
    { id: 'clear',       label: 'Clear liquids (classic)',   labelJa: '清澄液(従来)',           hours: 2, detail: 'Water, apple/cranberry juice (no pulp), Pedialyte, black coffee/tea, sports drinks.', detailJa: '水、リンゴ/クランベリージュース(果肉なし)、Pedialyte、ブラックコーヒー/紅茶、スポーツドリンク。' },
    { id: 'breast',      label: 'Breast milk',               labelJa: '母乳',                     hours: 4, detail: 'Human breast milk only.', detailJa: '人乳のみ。' },
    { id: 'formula',     label: 'Formula / non-human milk',  labelJa: '人工乳 / 非人乳',           hours: 6, detail: 'Infant formula, cow / soy / almond milk.', detailJa: '乳児用調製乳、牛乳 / 豆乳 / アーモンドミルク。' },
    { id: 'light',       label: 'Light meal',                labelJa: '軽食',                     hours: 6, detail: 'Toast + clear liquid. No fat or meat.', detailJa: 'トースト + 清澄液。脂肪や肉は不可。' },
    { id: 'heavy',       label: 'Heavy meal',                labelJa: '重食',                     hours: 8, detail: 'Fried / fatty / meat-containing meal.', detailJa: '揚げ物 / 脂質 / 肉含有食。' },
];

export const npoSpecialNotes = [
    'Apply only to elective procedures in patients without conditions delaying gastric emptying (e.g. obesity, diabetes, GERD, ileus, head injury).',
    'For emergency cases assume full stomach and use rapid-sequence induction.',
    'ASA 2023: in unselected healthy children, 1 hr clear-liquid fasting is reasonable to reduce dehydration / agitation. Local protocol may differ.',
    'Encourage clear liquids until 2 hr (or 1 hr per local protocol) before surgery — fasting longer than this is not beneficial.'
];

export const npoSpecialNotesJa = [
    '胃排出遅延を伴う患者(肥満、糖尿病、GERD、イレウス、頭部外傷など)を除く待機手技にのみ適用。',
    '緊急症例ではフルストマックを想定し迅速導入 (RSI) を使用。',
    'ASA 2023: 選別されていない健康な小児では脱水 / 興奮軽減のため清澄液絶飲 1 時間が妥当。施設プロトコールにより異なる場合あり。',
    '手術 2 時間前(または施設プロトコールにより 1 時間前)まで清澄液を促す — それ以上の長時間絶食は有益ではない。'
];

export const asaPSClasses = [
    { id: 'I',   label: 'ASA I',   tag: 'Healthy',                                   tagJa: '健康',                                       desc: 'Normal healthy patient. Non-smoking, no or minimal alcohol use.', descJa: '正常で健康な患者。非喫煙、飲酒なしまたは極少量。', accent: 'emerald' },
    { id: 'II',  label: 'ASA II',  tag: 'Mild systemic disease',                     tagJa: '軽度全身疾患',                               desc: 'Mild disease without substantive functional limitation (e.g. controlled HTN/DM, mild lung disease, smoker, social drinker, BMI 30-40, pregnancy).', descJa: '実質的機能制限のない軽度疾患(例: コントロール良好 HTN/DM、軽度肺疾患、喫煙、社交飲酒、BMI 30-40、妊娠)。', accent: 'teal' },
    { id: 'III', label: 'ASA III', tag: 'Severe systemic disease',                   tagJa: '重度全身疾患',                               desc: 'Substantive functional limitation (e.g. poorly controlled HTN/DM, COPD, BMI >40, active hepatitis, alcohol dependence, ESRD on regular dialysis, EF <40%, history (>3 mo) of MI / CVA / TIA / CAD with stents).', descJa: '実質的機能制限あり(例: コントロール不良 HTN/DM、COPD、BMI >40、活動性肝炎、アルコール依存、定期透析中の ESRD、EF <40%、>3 ヶ月前の MI / CVA / TIA / CAD ステント留置歴)。', accent: 'amber' },
    { id: 'IV',  label: 'ASA IV',  tag: 'Severe — constant threat to life',           tagJa: '重度 — 生命への持続的脅威',                  desc: 'Recent (<3 mo) MI / CVA / TIA / CAD with stents, ongoing cardiac ischemia or severe valve dysfunction, severe reduction of EF, sepsis, DIC, ARD, ESRD not on dialysis.', descJa: '最近 (<3 ヶ月) の MI / CVA / TIA / CAD ステント留置、進行中の心筋虚血または重度弁機能不全、EF 重度低下、敗血症、DIC、ARD、未透析の ESRD。', accent: 'orange' },
    { id: 'V',   label: 'ASA V',   tag: 'Moribund — not expected to survive without operation', tagJa: '瀕死 — 手術なしでは生存不可',     desc: 'Ruptured AAA, massive trauma, intracranial bleed with mass effect, ischemic bowel with significant cardiac pathology or multiple organ failure.', descJa: '破裂 AAA、大量外傷、腫瘤効果を伴う頭蓋内出血、有意な心病変または多臓器不全を伴う腸管虚血。', accent: 'red' },
    { id: 'VI',  label: 'ASA VI',  tag: 'Brain-dead (organ donor)',                  tagJa: '脳死(臓器ドナー)',                           desc: 'Brain-dead patient whose organs are being removed for donor purposes.', descJa: 'ドナー目的で臓器摘出される脳死患者。', accent: 'slate' },
];

export const apfelFactors = [
    { id: 'female',      label: 'Female sex (post-puberty)',                        labelJa: '女性(思春期後)',                       detail: 'Not used in pre-pubertal children.', detailJa: '思春期前の児では使用しない。' },
    { id: 'nonsmoker',   label: 'Non-smoker',                                       labelJa: '非喫煙',                                 detail: 'For adolescents.',                   detailJa: '思春期向け。' },
    { id: 'history',     label: 'History of PONV or motion sickness',               labelJa: 'PONV または動揺病の既往',                detail: '',                                   detailJa: '' },
    { id: 'opioid',      label: 'Postoperative opioid use planned',                 labelJa: '術後オピオイド使用予定',                 detail: '',                                   detailJa: '' }
];

// Pediatric POVOC (post-op vomiting in children) score — Eberhart et al.
export const povocFactors = [
    { id: 'age3',        label: 'Age ≥ 3 years',                                                labelJa: '3 歳以上',                                                  detail: '',                                                  detailJa: '' },
    { id: 'duration30',  label: 'Surgery duration ≥ 30 min',                                    labelJa: '手術時間 30 分以上',                                       detail: '',                                                  detailJa: '' },
    { id: 'historyHere', label: 'History of POV in child / parent / sibling',                   labelJa: '本人 / 親 / 同胞の POV 既往',                              detail: '',                                                  detailJa: '' },
    { id: 'strab',       label: 'Strabismus surgery',                                            labelJa: '斜視手術',                                                 detail: '',                                                  detailJa: '' }
];
// 0 → 9%, 1 → 10%, 2 → 30%, 3 → 55%, 4 → 70% PONV risk.
export const povocRisk = [9, 10, 30, 55, 70];

export const cormackLehaneGrades = [
    { id: 'I',   label: 'Grade I',   desc: 'Most of glottis visible. Easy intubation.',                                                       descJa: '声門大部分が見える。挿管容易。',                                                                         accent: 'emerald' },
    { id: 'IIa', label: 'Grade IIa', desc: 'Posterior glottis visible. Usually easy.',                                                        descJa: '後方声門が見える。通常は容易。',                                                                         accent: 'teal' },
    { id: 'IIb', label: 'Grade IIb', desc: 'Only arytenoids visible. Difficult — try BURP.',                                                  descJa: '披裂のみ見える。困難 — BURP を試行。',                                                                  accent: 'amber' },
    { id: 'III', label: 'Grade III', desc: 'Only epiglottis visible. Difficult — bougie / video laryngoscope.',                              descJa: '喉頭蓋のみ見える。困難 — ブージー / ビデオ喉頭鏡。',                                                  accent: 'orange' },
    { id: 'IV',  label: 'Grade IV',  desc: 'Neither epiglottis nor glottis visible. Activate Difficult Airway protocol.',                    descJa: '喉頭蓋も声門も見えない。困難気道プロトコール発動。',                                                    accent: 'red' },
];
