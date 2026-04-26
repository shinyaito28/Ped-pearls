// Emergent Cesarean Delivery — NCH Fetal Medicine flowsheet.
// Source: NCH Sharepoint / Fetal Medicine / Emergency Cesarean Section Flowsheet_March 2026.pdf

export const entry = {
    id: 'flow_emergency_cesarean',
    hub: 'fetal',
    kind: 'flowchart',
    title: 'Emergent Cesarean Delivery',
    titleJa: '緊急帝王切開',
    shortDescription: 'Pre-procedure → RSI → maintenance → uterine atony reversal.',
    shortDescriptionJa: '手技前 → RSI → 維持 → 子宮弛緩への対応。',
    tags: ['cesarean', 'c-section', 'emergent delivery', 'rsi', 'oxytocin', 'pitocin', 'methergine', 'hemabate', 'uterine atony', 'fetal'],
    emergency: true,
    weightAware: true,
    ageRules: null,
    source: 'NCH Sharepoint / Fetal Medicine',
    lastReviewed: '2026-04',
    component: 'EmergencyCesareanCard',
};

// Pre-procedure checklist.
export const preprocedure = [
    'Call the on-call fetal team member',
    'Confirm sodium citrate given en route to OR',
    'Obtain fetal kit from main OR Pyxis + premade Oxytocin from pharmacy',
    'Set up OR with help from techs',
    'Send for maternal blood (to fridge)',
    'Preoxygenate while placing monitors',
];

export const preprocedureJa = [
    'オンコール胎児チームメンバーに連絡',
    'OR 移動中にクエン酸ナトリウム投与済を確認',
    'メイン OR Pyxis から胎児キット + 薬局から既製オキシトシンを取得',
    'テクニシャンの協力で OR をセットアップ',
    '母体血液を依頼(冷蔵庫へ)',
    'モニター装着中に前酸素化',
];

// Room set-up checklist.
export const roomSetup = [
    'Machine check with suction',
    'Standard ASA monitors',
    'Video laryngoscope and styletted ETT',
    'Troop elevation pillow',
    'Consider additional difficult airway equipment',
    'BIS monitor, OG, temp probe',
];

export const roomSetupJa = [
    '吸引付き麻酔器チェック',
    '標準 ASA モニター',
    'ビデオ喉頭鏡 + スタイレット入り ETT',
    'Troop 挙上枕',
    '追加の困難気道器具を検討',
    'BIS モニター、OG、体温プローブ',
];

// RSI dosing — weight-aware.
// Standard: Propofol 1.5-2 mg/kg + succinylcholine 1-1.5 mg/kg
// Hemorrhage / unstable: Etomidate 0.3 mg/kg or Ketamine 0.5-1 mg/kg
export const rsiDoses = (weightKg) => {
    const w = parseFloat(weightKg) || 0;
    if (w <= 0) return null;
    return {
        standard: [
            { drug: 'Propofol', drugJa: 'プロポフォール', range: `${(w * 1.5).toFixed(0)}–${(w * 2).toFixed(0)} mg`, perKg: '1.5–2 mg/kg' },
            { drug: 'Succinylcholine', drugJa: 'スキサメトニウム', range: `${(w * 1).toFixed(0)}–${(w * 1.5).toFixed(0)} mg`, perKg: '1–1.5 mg/kg' },
        ],
        unstable: [
            { drug: 'Etomidate', drugJa: 'Etomidate', range: `${(w * 0.3).toFixed(0)} mg`, perKg: '0.3 mg/kg' },
            { drug: 'Ketamine',  drugJa: 'ケタミン', range: `${(w * 0.5).toFixed(0)}–${(w * 1).toFixed(0)} mg`, perKg: '0.5–1 mg/kg' },
        ],
    };
};

// Intra-op flow.
export const intraop = [
    'RSI induction supine with LUD; use video laryngoscopy',
    'Once airway secure, alert surgeons to begin with the word "CUT"',
    'Maintenance: 0.75–1 MAC volatile +/- 50% N2O',
    'Avoid N2O if fetal distress; use 100% FiO2',
    'Administer antibiotics while patient is prepped/draped',
    'Place additional lines prn and OG',
    'Delivery: resuscitation of baby by NICU',
];

export const intraopJa = [
    '左子宮偏位を保ちつつ仰臥位で RSI 導入;ビデオ喉頭鏡を使用',
    '気道確保後、外科医に「CUT」の合図で開始させる',
    '維持: 0.75-1 MAC 揮発性麻酔 ± 50% N2O',
    '胎児ジストレスなら N2O 回避;FiO2 100% を使用',
    '消毒/ドレーピング中に抗菌薬を投与',
    '必要に応じて追加ライン + OG を留置',
    '娩出: 新生児の蘇生は NICU が担当',
];

// Maternal hemodynamic targets.
export const maintenance = {
    bp: 'SBP > 100 or MAP within 10–20% of baseline',
    bpJa: 'SBP > 100 または MAP をベースラインの 10-20% 以内',
    pressors: [
        'Ephedrine 5–10 mg IV boluses prn',
        'Phenylephrine 50–100 mcg IV boluses prn',
        'Consider phenylephrine infusion (0.1–0.5 mcg/kg/min)',
    ],
    pressorsJa: [
        'エフェドリン 5-10 mg IV ボーラス頓用',
        'フェニレフリン 50-100 mcg IV ボーラス頓用',
        'フェニレフリン持続 (0.1-0.5 mcg/kg/min) を検討',
    ],
    fluids: 'Limit IV fluids if mother on pre-op magnesium sulfate',
    fluidsJa: '母体が術前マグネシウム硫酸投与中なら IV 輸液を制限',
};

// Oxytocin dosing (after umbilical cord clamping).
export const oxytocin = {
    bolus: '5 Units over 10 min (500 mL/hr)',
    bolusJa: '5 単位を 10 分かけて (500 mL/hr)',
    infusion: 'Then 70 mL/hr until bag complete or arrival in PACU',
    infusionJa: 'その後 70 mL/hr で、バッグ終了または PACU 到着まで',
    backup: ['Methylergonovine (Methergine)', 'Carboprost (Hemabate)', 'Misoprostol (Cytotec)'],
    backupJa: ['Methylergonovine (Methergine)', 'Carboprost (Hemabate)', 'Misoprostol (Cytotec)'],
};

// Post-cord-clamping actions.
export const postClamp = [
    'Rapidly address uterine tone — start oxytocin infusion',
    'Turn off or titrate volatile agent',
    'Consider TIVA with propofol infusion',
    'Methylergonovine and/or Carboprost prn',
    'If epidural in place, consider 10 mL bolus of 0.2% Ropivacaine',
    'If removing epidural, document "tip intact"',
];

export const postClampJa = [
    '速やかに子宮 tone に対応 — オキシトシン持続を開始',
    '揮発性麻酔薬を OFF または減量',
    'プロポフォール持続による TIVA を検討',
    '必要時に Methylergonovine および/または Carboprost',
    '硬膜外留置中なら 0.2% Ropivacaine 10 mL ボーラスを検討',
    '硬膜外抜去時は「先端完全(tip intact)」を記録',
];

// Emergence package.
export const emergence = [
    'Ondansetron 4 mg IV',
    'Acetaminophen 15 mg/kg IV',
    'Ketorolac 15–30 mg',
    'Extubate awake',
];

export const emergenceJa = [
    'Ondansetron 4 mg IV',
    'アセトアミノフェン 15 mg/kg IV',
    'ケトロラク 15-30 mg',
    '覚醒下抜管',
];

// If indwelling epidural and time allows (10–15 min), dose for surgical block.
export const epiduralAlternative = [
    'Discuss urgency with surgical team — needs 10–15 min',
    'Patient often on 0.2% Ropivacaine infusion for post-op pain',
    'Bolus 5 mL of 2% Lidocaine with 1:200k epi q~5 min (total 5–15 mL)',
    'Should achieve T4–T6 level within 10–15 min depending on dosing speed',
    'Check sensory level frequently to avoid over- or under-dosing',
];

export const epiduralAlternativeJa = [
    '緊急度を外科チームと協議 — 10-15 分必要',
    '患者は術後鎮痛のため 0.2% Ropivacaine 持続中であることが多い',
    '2% リドカイン + 1:200k エピを 5 mL ずつ約 5 分間隔でボーラス(計 5-15 mL)',
    '投与速度に応じて 10-15 分で T4-T6 レベルに到達するはず',
    '過量/不足を避けるため感覚レベルを頻回チェック',
];
