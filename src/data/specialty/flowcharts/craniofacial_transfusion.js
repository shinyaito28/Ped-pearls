// Open Craniosynostosis Surgery — Intraoperative Blood Transfusion Algorithm.
// Source: NCH Sharepoint / Neuro Intraoperative Protocols / Craniofacial IntraOp Transfusion Flow Chart 4.0.pdf
// Updated 2/19/2021.
//
// IMPORTANT: The original PDF includes a Table 1 (Hb thresholds × surgery
// step) that did NOT extract cleanly. The thresholds below are placeholders
// pending source verification — confirm against the original Table 1 before
// using clinically.

export const entry = {
    id: 'flow_craniofacial_transfusion',
    hub: 'neuro',
    kind: 'flowchart',
    title: 'Craniofacial IntraOp Transfusion',
    titleJa: '頭蓋顔面手術 術中輸血',
    shortDescription: 'Open craniosynostosis surgery — pRBC/crystalloid/colloid by weight, step-by-step.',
    shortDescriptionJa: '開頭縫合早期癒合症手術 — 体重別 pRBC/晶質液/膠質液、ステップ毎。',
    tags: ['craniofacial', 'craniosynostosis', 'cvr', 'foa', 'transfusion', 'prbc', 'crystalloid', 'colloid', 'albumin', 'mtp'],
    emergency: false,
    weightAware: true,
    ageRules: null,
    source: 'NCH Sharepoint / Neuro Intraoperative Protocols',
    lastReviewed: '2026-04',
    component: 'CraniofacialTransfusionCard',
};

// Surgical approach options (Box A — pre-surgery assessment).
export const surgicalApproaches = [
    { id: 'cvr_foa', label: 'Anterior CVR + FOA', labelJa: '前方 CVR + FOA' },
    { id: 'midpost', label: 'Mid-vault and/or posterior CVR', labelJa: '中間穹窿および/または後方 CVR' },
    { id: 'distractors', label: 'Posterior distractors', labelJa: '後方ディストラクター' },
    { id: 'other', label: 'Other', labelJa: 'その他' },
];

// Lab timing schedule (Box B).
export const labTiming = [
    'During IV & a-line placement: aBL + H&H',
    'After bone drilling complete and bone removed: aBL',
    'In PACU: H&H',
    'PRN labs if other concerns (discuss with surgeons)',
];

export const labTimingJa = [
    'IV + 動脈ライン留置中: 動脈血液ガス + H&H',
    '骨削開完了 + 骨摘出後: 動脈血液ガス',
    'PACU で: H&H',
    'その他の懸念があれば必要時に検査(外科医と協議)',
];

// Fluid replacement (Box C).
export const fluidReplacement = [
    'Lactated Ringer\'s or Plasmalyte for intraoperative fluid replacement',
    'Albumin: consider in patients with hypotension, hypovolemia, or hemodynamic instability (e.g. PPV 10–12% on a-line)',
    'Crystalloid/colloid prioritized BEFORE pRBCs unless acute severe hemorrhage',
    'Step 1: crystalloid 10 mL/kg',
    'Step 2: colloid (albumin) 10 mL/kg',
];

export const fluidReplacementJa = [
    '術中輸液は Lactated Ringer\'s または Plasmalyte',
    'アルブミン: 低血圧、循環血液量減少、血行動態不安定(例: 動脈ライン上 PPV 10-12%)で検討',
    '急性重度出血でない限り pRBC より晶質液/膠質液を優先',
    'Step 1: 晶質液 10 mL/kg',
    'Step 2: 膠質液(アルブミン) 10 mL/kg',
];

// Blood product administration (Box D).
export const productAdministration = [
    'Administer based on surgical step + Hb result (Table 1 — verify against source)',
    'Active severe bleeding with hemodynamic instability',
    'Required: communication between Anesthesia and Surgery before transfusion',
    'Start with 15 mL/kg pRBC',
    'Other products (e.g. FFP) if ≥ 45 mL/kg pRBC given',
    'Consider MTP if active uncontrolled hemorrhage',
];

export const productAdministrationJa = [
    '手術ステップ + Hb 結果に基づいて投与(Table 1 — 原本で要確認)',
    '血行動態不安定を伴う活動性重度出血',
    '輸血前に麻酔科と外科の連絡が必須',
    'pRBC 15 mL/kg で開始',
    'pRBC ≥ 45 mL/kg 投与後は他の製剤(例: FFP)を追加',
    'コントロール不能な活動性出血では MTP を検討',
];

// Surgical algorithm steps in chronological order.
export const algorithmSteps = [
    {
        id: 'preop',
        label: 'Pre-surgery (day of)',
        labelJa: '手術前(当日)',
        actions: [
            'Pre-surgery assessment by anesthesiologist (Box A)',
            'Notify surgeon of any abnormalities',
            'Verify blood product availability',
            'Request pRBC to be in OR refrigerator',
        ],
        actionsJa: [
            '麻酔科医による手術前評価 (Box A)',
            '異常があれば外科医に通知',
            '血液製剤の利用可能性を確認',
            'pRBC を OR 冷蔵庫へ依頼',
        ],
    },
    {
        id: 'timeout',
        label: 'Surgical time-out',
        labelJa: '手術タイムアウト',
        actions: ['Discuss blood transfusion algorithm during time-out'],
        actionsJa: ['タイムアウト中に輸血アルゴリズムを協議'],
    },
    {
        id: 'incision',
        label: 'Skin incision (1st aBL & H&H result)',
        labelJa: '皮膚切開(1 回目の動脈血液ガス + H&H 結果)',
        actions: [
            'If Hb meets threshold (Table 1): pRBC 15 mL/kg, repeat aBL 30–60 min after transfusion',
            'If no transfusion needed: verify fluid status — if mild hypovolemia, give crystalloid 10 mL/kg → colloid 10 mL/kg',
        ],
        actionsJa: [
            'Hb が閾値に達していれば (Table 1): pRBC 15 mL/kg、輸血 30-60 分後に動脈血液ガス再検',
            '輸血不要なら: 輸液状態を確認 — 軽度循環血液量減少なら晶質液 10 mL/kg → 膠質液 10 mL/kg',
        ],
    },
    {
        id: 'bone',
        label: 'Bone drilling complete (2nd aBL)',
        labelJa: '骨削開完了(2 回目の動脈血液ガス)',
        actions: [
            'If Hb meets threshold (Table 1): pRBC 15 mL/kg, repeat aBL 30–60 min after',
            'Otherwise verify fluid status, give crystalloid → colloid as above',
            'Additional PRN labs if active bleeding',
        ],
        actionsJa: [
            'Hb が閾値に達していれば (Table 1): pRBC 15 mL/kg、30-60 分後に動脈血液ガス再検',
            'そうでなければ輸液状態を確認、晶質液 → 膠質液を上記同様に投与',
            '活動性出血があれば必要に応じて追加検査',
        ],
    },
    {
        id: 'pacu',
        label: 'PACU H&H stat',
        labelJa: 'PACU で H&H STAT',
        actions: [
            'If Hb meets threshold: pRBC 15 mL/kg, repeat aBL 30–60 min',
            'Otherwise: verify fluid status, transfer to PICU, stop',
        ],
        actionsJa: [
            'Hb が閾値に達していれば: pRBC 15 mL/kg、30-60 分後に動脈血液ガス再検',
            'そうでなければ: 輸液状態を確認、PICU へ移送、終了',
        ],
    },
];

// --- Weight-based product calculator -----------------------------------------
export const productVolumes = (weightKg) => {
    const w = parseFloat(weightKg) || 0;
    if (w <= 0) return null;
    return {
        prbc15: w * 15,
        crystalloid10: w * 10,
        colloid10: w * 10,
        ffpThreshold: w * 45, // give FFP after this much pRBC
    };
};
