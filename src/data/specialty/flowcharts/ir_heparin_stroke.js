// IR — Arterial Sheath Heparin Infusion + Stroke Protocol pointer.
// Source: NCH Sharepoint / Out of OR / IR /
//   - Heparin infusion for arterial sheath Sept 2018 v2.docx (extracted)
//   - Emergent Stroke Protocol.doc (binary .doc — needs manual review)
//
// The heparin sheath protocol provides weight-tier infusion rates to
// prevent thrombus formation on intracerebral catheter sheaths during
// combined IR + neurosurgical anesthetics.

export const entry = {
    id: 'flow_ir_heparin_stroke',
    hub: 'outofor',
    kind: 'flowchart',
    title: 'IR Arterial Sheath — Heparin Infusion',
    titleJa: 'IR 動脈シース — ヘパリン持続',
    shortDescription: 'Weight-tier heparin rate for sheath thrombus prevention; ACT/PTT monitoring.',
    shortDescriptionJa: 'シース血栓予防のための体重別ヘパリンレート;ACT/PTT モニタリング。',
    tags: ['ir', 'interventional radiology', 'heparin', 'arterial sheath', 'thrombus', 'act', 'ptt', 'stroke', 'neurointervention'],
    emergency: true,
    weightAware: true,
    ageRules: null,
    source: 'NCH Sharepoint / Out of OR / IR',
    lastReviewed: '2026-04',
    component: 'IrHeparinStrokeCard',
};

// Standardized heparin solution: 2 units/mL.
export const heparinConcentration = '2 units/mL';

// Weight tiers — flat infusion rates (mL/hr).
export const weightTiers = [
    { id: 'over60', match: (w) => w >= 60,           label: '≥ 60 kg',  rateMlPerHr: 180 },
    { id: '40to60', match: (w) => w >= 40 && w < 60, label: '40–60 kg', rateMlPerHr: 90 },
    { id: '20to40', match: (w) => w >= 20 && w < 40, label: '20–40 kg', rateMlPerHr: 45 },
    { id: 'under20', match: (w) => w < 20,            label: '< 20 kg',  rateMlPerHr: 20 },
];

export const tierForWeight = (weightKg) => {
    const w = parseFloat(weightKg) || 0;
    if (w <= 0) return null;
    return weightTiers.find(t => t.match(w)) || null;
};

export const setupSteps = [
    'Anesthesia team prepares dedicated infusion pump with standardized heparin (2 units/mL) and sterile tubing',
    'Arterial access with sheath placement obtained by interventional provider',
    'Sterile tubing handed off to interventional provider, flushed with heparin solution, attached to sheath',
    'Discuss infusion plan with neurosurgery team',
    'Initiate heparin infusion based on weight tier (table above)',
];

export const setupStepsJa = [
    '麻酔チームが標準ヘパリン (2 units/mL) と滅菌チューブで専用持続ポンプを準備',
    'IR 担当者が動脈アクセス + シース留置を取得',
    '滅菌チューブを IR 担当者に手渡し、ヘパリン溶液でフラッシュ後、シースに接続',
    '脳神経外科チームと持続計画を協議',
    '体重区分(上記表)に従ってヘパリン持続を開始',
];

export const monitoringSteps = [
    'Baseline ACT or PTT obtained (can be done at time of arterial access if difficult sample)',
    'ACT or PTT q4h during the infusion',
    'For concerns of bleeding or anticoagulation: repeat ACT/PTT at shorter intervals; discuss with IR + neurosurgery',
    'Goal anticoagulation: NORMAL range — this dose should NOT elevate PTT or ACT',
];

export const monitoringStepsJa = [
    'ベースライン ACT または PTT を取得(採血困難なら動脈アクセス時に取得可)',
    '持続中 ACT または PTT を q4h',
    '出血または抗凝固懸念時: ACT/PTT をより短い間隔で反復;IR + 脳神経外科と協議',
    '目標抗凝固: 正常域 — この用量は PTT や ACT を上昇させない設計',
];

export const documentationSteps = [
    'Heparin concentration documented in anesthesia record',
    'Infusion rate documented',
    'Coagulation studies (ACT/PTT) documented',
];

export const documentationStepsJa = [
    'ヘパリン濃度を麻酔記録に記載',
    '持続レートを記載',
    '凝固検査 (ACT/PTT) を記載',
];

// Stroke Protocol — NCH MRI Emergent Stroke Protocol
// (Radiology Dept Procedure Manual, originated 5/15/2017).
// Source: NCH Sharepoint / Out of OR / IR / Emergent Stroke Protocol (1).doc
// (Word COM -> .docx -> python-docx).
//
// This is the imaging triage / scheduling protocol (NOT the
// thrombolysis dose protocol). Defines when an MRI counts as
// "Emergent Stroke" + what abbreviated MRI series is performed.

export const strokeProtocolScheduling = {
    afterHours: 'After normal MRI work hours (Mon-Fri 22:30-06:00, all day Sat-Sun)',
    triggerCriteria: 'Patient presents with new-onset stroke symptoms < 6 hours',
    requiredConsultation: [
        'An attending Neurologist OR Neurosurgeon must be involved with patient evaluation + management',
        'They must be available to speak to the Radiologist for the exam to be declared an emergency',
    ],
    delayedScenario: 'If symptoms > 6 hours: MRI is NOT emergent — perform within 18 hours of MRI request',
    cerebellarException: 'EXCEPTION: Suspected cerebellar stroke (rapid deterioration without surgical intervention)',
    treatmentWindow: 'Emergent declaration only if treatment can begin within 4.5-6 hours of new symptoms (4.5 hr for IV thrombolysis, 6 hr for endovascular thrombectomy)',
};

export const strokeProtocolSchedulingJa = {
    afterHours: '通常 MRI 業務時間外 (月-金 22:30-06:00、土・日終日)',
    triggerCriteria: '発症 6 時間未満の新規脳卒中症状で来院',
    requiredConsultation: [
        '主治医の神経内科医または脳神経外科医が患者評価 + 管理に関与必須',
        '緊急扱いとするため、放射線科医と直接話せる状態でなければならない',
    ],
    delayedScenario: '症状が 6 時間超: MRI は緊急ではない — MRI 依頼から 18 時間以内に施行',
    cerebellarException: '例外: 小脳卒中疑い(外科介入なしでも急速悪化)',
    treatmentWindow: '新規症状から 4.5-6 時間以内に治療開始可能な場合のみ緊急扱い (IV 血栓溶解は 4.5 時間、血管内血栓除去は 6 時間)',
};

export const strokeProtocolImaging = [
    '**Short Stroke Protocol** initially:',
    '  - Axial Diffusion (DWI)',
    '  - Axial FLAIR',
    '  - Axial GRE T2*',
    'If diffusion POSITIVE (radiologist call): **head MRA** is performed (separate order/accession # for billing)',
    'Ordering physician notified of results if positive',
    'Positive exam → patient receives treatment, then returns for **Full Stroke Protocol** once stable',
];

export const strokeProtocolImagingJa = [
    '初回は **Short Stroke Protocol**:',
    '  - Axial Diffusion (DWI)',
    '  - Axial FLAIR',
    '  - Axial GRE T2*',
    '拡散強調陽性(放射線科医判断): **頭部 MRA** を施行(請求用に別オーダー/accession # )',
    '陽性の場合、依頼医に結果を通知',
    '陽性所見 → 患者は治療を受け、安定後に **Full Stroke Protocol** で再撮像',
];

export const strokeProtocolWorkflow = [
    'After-hours: Radiologist calls in MRI technologists to complete the exam',
    'Anesthesia involvement: per emergency-MRI workflow (see outofor_offhours_mri)',
    'Confirm patient is hemodynamically stable + airway secure if intubated',
    'Standard MR-safety pre-scanning checklist (see flow_imri_checklist for iMRI; standard MRI follows similar principles)',
];

export const strokeProtocolWorkflowJa = [
    '時間外: 放射線科医が MRI 技師を呼び出して検査を完了',
    '麻酔関与: 緊急 MRI ワークフローに準拠 (outofor_offhours_mri 参照)',
    '患者の血行動態安定 + 挿管中なら気道確保を確認',
    '標準的 MR 安全性スキャン前チェックリスト (iMRI は flow_imri_checklist 参照;標準 MRI も同様の原則)',
];
