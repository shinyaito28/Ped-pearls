// Mediastinal Mass Management — NCH consensus algorithm.
// Source: NCH Sharepoint / Hematology & Oncology Periop / Mediastinal Mass Management_09122022.pdf
// Original CPG#: ONC-CPG-24, Effective 9/12/2022.

export const entry = {
    id: 'flow_mediastinal_mass',
    hub: 'entpulm',
    kind: 'flowchart',
    title: 'Mediastinal Mass Management',
    titleJa: '縦隔腫瘤管理',
    shortDescription: 'Triage by symptoms + CT airway narrowing — tier disposition + diagnostic workup.',
    shortDescriptionJa: '症状 + CT 気道狭窄度でトリアージ — ティア別行き先 + 診断精査。',
    tags: ['mediastinal mass', 'svc syndrome', 'orthopnea', 'stridor', 'oncology', 'tissue biopsy', 'airway compression', 'cv obstruction'],
    emergency: true,
    weightAware: false,
    ageRules: null,
    source: 'NCH Sharepoint / Hematology & Oncology Periop',
    lastReviewed: '2026-04',
    component: 'MediastinalMassCard',
};

// Diagnostic evaluation for any mediastinal mass.
export const diagnosticWorkup = [
    'PA/lateral chest radiograph (if chest CT not yet completed)',
    'CBC, PT/PTT/INR, fibrinogen, tumor lysis labs',
    'Echocardiogram',
    'Chest CT — ensure patient can tolerate supine position before scan',
];

export const diagnosticWorkupJa = [
    'PA/側面胸部 X 線(胸部 CT 未撮影なら)',
    'CBC、PT/PTT/INR、フィブリノゲン、腫瘍崩壊検査',
    '心エコー',
    '胸部 CT — スキャン前に仰臥位耐性を確認',
];

// Three risk tiers, defined by symptom set + CT airway narrowing.
export const tiers = [
    {
        id: 'mild',
        label: 'No CV/airway obstruction symptoms',
        labelJa: '心血管/気道閉塞症状なし',
        criteria: [
            'No stridor, orthopnea, or SVC syndrome',
            'OR chest CT < 25% airway narrowing',
            'Vitals normal, SpO2 ≥ 95% RA',
        ],
        criteriaJa: [
            '吸気性喘鳴、起座呼吸、SVC 症候群なし',
            'または胸部 CT で気道狭窄 < 25%',
            'バイタル正常、室内気で SpO2 ≥ 95%',
        ],
        dispo: 'Admission to Oncology',
        dispoJa: '腫瘍科入院',
        consults: [
            'Anesthesiology consult',
            'Pediatric Surgery consult',
            'Alert PICU for possible bed if status changes',
        ],
        consultsJa: [
            '麻酔科コンサルト',
            '小児外科コンサルト',
            '状態変化時のベッド確保のため PICU に通知',
        ],
        biopsy: [
            'Tissue biopsy — to be determined after Pediatric Surgery discussion',
            'Consider IR consult',
            'Consider CT surgery consult',
            'Consider diagnostic taps: pleural / pericardial effusion',
        ],
        biopsyJa: [
            '組織生検 — 小児外科と協議後に決定',
            'IR コンサルトを検討',
            '心臓血管外科コンサルトを検討',
            '診断的穿刺(胸水 / 心嚢液)を検討',
        ],
        emphasis: 'success',
    },
    {
        id: 'moderate',
        label: 'CV/airway obstruction symptoms or ≥ 25% CT narrowing',
        labelJa: '心血管/気道閉塞症状あり、または CT 狭窄 ≥ 25%',
        criteria: [
            'Stridor, orthopnea, or SVC syndrome',
            'OR chest CT ≥ 25% airway narrowing',
        ],
        criteriaJa: [
            '吸気性喘鳴、起座呼吸、または SVC 症候群あり',
            'または胸部 CT で気道狭窄 ≥ 25%',
        ],
        dispo: 'Admission to PICU',
        dispoJa: 'PICU 入院',
        consults: [
            'Anesthesiology consult',
            'Pediatric Surgery consult',
            'Oncology consult',
        ],
        consultsJa: [
            '麻酔科コンサルト',
            '小児外科コンサルト',
            '腫瘍科コンサルト',
        ],
        biopsy: [
            'Tissue biopsy — to be determined after Pediatric Surgery discussion',
            'Consider IR consult',
            'Consider CT surgery consult',
            'Consider diagnostic taps: pleural / pericardial effusion',
        ],
        biopsyJa: [
            '組織生検 — 小児外科と協議後に決定',
            'IR コンサルトを検討',
            '心臓血管外科コンサルトを検討',
            '診断的穿刺(胸水 / 心嚢液)を検討',
        ],
        emphasis: 'warn',
    },
    {
        id: 'severe',
        label: 'Respiratory distress / cannot lay flat / SpO2 ≤ 94%',
        labelJa: '呼吸窮迫 / 平臥不能 / SpO2 ≤ 94%',
        criteria: [
            'Respiratory distress',
            'Patient cannot lay flat',
            'Abnormal vital signs',
            'SpO2 ≤ 94%',
        ],
        criteriaJa: [
            '呼吸窮迫',
            '患者が平臥不能',
            'バイタル異常',
            'SpO2 ≤ 94%',
        ],
        dispo: 'Immediate consults — emergency posture',
        dispoJa: '即時コンサルト — 緊急対応体制',
        consults: [
            'Anesthesiology — STAT',
            'ENT — STAT',
            'Pediatric Surgery',
            'Hematology & Oncology',
            'Pediatric ICU',
        ],
        consultsJa: [
            '麻酔科 — STAT',
            '耳鼻科 — STAT',
            '小児外科',
            '血液腫瘍科',
            'PICU',
        ],
        biopsy: [
            'Corticosteroid or radiation therapy if biopsy not feasible or safe',
        ],
        biopsyJa: [
            '生検が不可能または安全でない場合はコルチコステロイドまたは放射線療法',
        ],
        emphasis: 'critical',
    },
];
