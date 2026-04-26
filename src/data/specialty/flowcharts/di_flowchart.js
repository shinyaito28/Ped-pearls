// Diabetes Insipidus Management — NCH Neuro Intraoperative Protocol.
// Source: NCH Sharepoint / Neuro Intraoperative Protocols / DI Flowchart 11-2.pdf
//
// The protocol branches on (a) whether DI is known vs suspected new-onset
// and (b) the current serum Na+. It also includes a vasopressin drip
// titration with weight-based dosing.

export const entry = {
    id: 'flow_di_management',
    hub: 'neuro',
    kind: 'flowchart',
    title: 'Diabetes Insipidus Management',
    titleJa: '尿崩症 (DI) 管理',
    shortDescription: 'Branching by Na+, with vasopressin drip + free-water deficit calculators.',
    shortDescriptionJa: '血清 Na+ で分岐、バソプレシン持続 + 自由水不足量計算機。',
    tags: ['di', 'diabetes insipidus', 'ddavp', 'vasopressin', 'hyponatremia', 'hypernatremia', 'free water deficit', 'sellar', 'craniopharyngioma'],
    emergency: true,
    weightAware: true,
    ageRules: null,
    source: 'NCH Sharepoint / Neuro Intraoperative Protocols',
    lastReviewed: '2026-04',
    component: 'DiFlowchartCard',
};

// Initial labs ordered for ALL DI patients (whether known or suspected).
export const initialOrders = [
    'Serum Na+',
    'Strict I&Os',
    'Mandatory Endocrinology consult',
    'Notify practitioner if headache, nausea, vomiting, restlessness, drowsiness, or AMS',
];

export const initialOrdersJa = [
    '血清 Na+',
    '厳格な IN/OUT',
    '内分泌科コンサルト必須',
    '頭痛、嘔気、嘔吐、不穏、傾眠、または意識障害があれば医師に通知',
];

// Suspected new-onset DI workup (UOP > 3 mL/kg/hr).
export const suspectedNewOnsetWorkup = [
    'Serum Na+',
    'Urine Na+',
    'Serum Osmolality',
    'Urine Osmolality',
    'Urine Specific Gravity',
    'Blood Glucose',
];

export const suspectedNewOnsetWorkupJa = [
    '血清 Na+',
    '尿中 Na+',
    '血清浸透圧',
    '尿浸透圧',
    '尿比重',
    '血糖',
];

export const newOnsetCriteria = {
    label: 'New-onset DI criteria (post-op concern)',
    labelJa: '新規 DI 診断基準(術後懸念)',
    items: [
        'UOP > 3 mL/kg/hr',
        'Serum Na+ > 145 mEq/L',
        'Serum Osm > 300 mOsm/kg',
        'Urine Osm < 300 mOsm/kg',
    ],
    itemsJa: [
        'UOP > 3 mL/kg/hr',
        '血清 Na+ > 145 mEq/L',
        '血清浸透圧 > 300 mOsm/kg',
        '尿浸透圧 < 300 mOsm/kg',
    ],
};

// Sodium-band branching. Serum Na+ targets and management actions.
export const naBands = [
    {
        id: 'hypo',
        label: 'Hyponatremia',
        labelJa: '低 Na 血症',
        range: 'Na+ < 135 mEq/L',
        critical: 'Consider PICU if Na+ < 120',
        criticalJa: 'Na+ < 120 なら PICU を検討',
        actions: [
            'Hold home DDAVP',
            'Do NOT place on IVF (if NPO with hypoglycemia concerns, discuss with endocrinology)',
            'Order serum Na+ q4h until normonatremic ×2',
            'When normonatremic ×1 AND UOP > 3 mL/kg/hr for ≥1 hr: notify practitioner; resume DDAVP with Na+ check 1 hr before each dose',
        ],
        actionsJa: [
            '自宅 DDAVP を中止',
            'IVF を投与しない (NPO で低血糖懸念があれば内分泌科と協議)',
            '血清 Na+ を q4h でオーダー、正常 Na+ 値が ×2 確認されるまで',
            '正常 Na+ 値が ×1 確認 + UOP > 3 mL/kg/hr が 1 時間以上: 医師に通知;DDAVP を再開、各投与の 1 時間前に Na+ 確認',
        ],
        etiology: ['Increased oral or IVF intake → dilution'],
        etiologyJa: ['経口または IVF 摂取増加 → 希釈'],
    },
    {
        id: 'normo',
        label: 'Normonatremia',
        labelJa: '正常 Na 血症',
        range: 'Na+ 135–150 mEq/L',
        critical: 'Range 135–150 is acceptable for known DI (vs 135–145 normal range otherwise)',
        criticalJa: '既知 DI では 135-150 の範囲が許容(他の場合の通常範囲 135-145 と比較)',
        actions: [
            'Order home DDAVP per home regimen',
            'Order serum Na+ 1 hr before every DDAVP dose',
            'Na+ result used for decisions must be < 2 hours old',
        ],
        actionsJa: [
            '自宅レジメンに従って自宅 DDAVP をオーダー',
            'DDAVP の各投与 1 時間前に血清 Na+ をオーダー',
            '判断に用いる Na+ 値は 2 時間以内のものでなければならない',
        ],
    },
    {
        id: 'hyper',
        label: 'Hypernatremia',
        labelJa: '高 Na 血症',
        range: 'Na+ > 150 mEq/L (severe > 150)',
        critical: 'Consider PICU if Na+ > 165',
        criticalJa: 'Na+ > 165 なら PICU を検討',
        actions: [
            'Give home DDAVP dose now if not already given',
            'Calculate free water deficit (calculator below)',
            'Replace over 24 hr with D5 ½NS (floor) or D5 ½NS + 20 mEq/L KCl (ICU)',
            'Discontinue free water deficit replacement when Na+ < 150',
            'Order serum Na+ q4h until normonatremic ×2',
        ],
        actionsJa: [
            '未投与なら今すぐ自宅 DDAVP を投与',
            '自由水不足量を計算(下記計算機)',
            '24 時間かけて D5 ½NS(病棟)または D5 ½NS + 20 mEq/L KCl(ICU)で補充',
            'Na+ < 150 で自由水不足の補充を中止',
            '血清 Na+ を q4h でオーダー、正常 Na+ ×2 まで',
        ],
        etiology: [
            'Increased insensible water loss',
            'URI in nasal DDAVP users',
            'DDAVP medication expiration',
        ],
        etiologyJa: [
            '不感蒸泄の増加',
            '経鼻 DDAVP ユーザーの上気道感染',
            'DDAVP 薬剤の期限切れ',
        ],
    },
];

// --- Free water deficit calculator ------------------------------------------
// FWD (L) = ((Na_actual - Na_goal) / Na_goal) × 0.6 × weight_kg
export const freeWaterDeficit = (weightKg, naActual, naGoal = 145) => {
    const w = parseFloat(weightKg) || 0;
    const a = parseFloat(naActual) || 0;
    const g = parseFloat(naGoal) || 145;
    if (w <= 0 || a <= 0 || g <= 0) return null;
    const deficitL = ((a - g) / g) * 0.6 * w;
    return {
        deficitL: deficitL,
        deficitmL: deficitL * 1000,
        ratemLperHr: (deficitL * 1000) / 24,
        formula: `((${a} - ${g}) / ${g}) × 0.6 × ${w} = ${deficitL.toFixed(2)} L`,
    };
};

// --- Vasopressin drip dosing ------------------------------------------------
// Start 0.5 milliU/kg/hr; titrate by 0.2-0.5 milliU/kg/hr q30min for UOP 1-3.5 mL/kg/hr.
export const vasopressinStart = (weightKg) => {
    const w = parseFloat(weightKg) || 0;
    if (w <= 0) return null;
    return {
        startMilliUperHr: w * 0.5,
        titrationStepLow: w * 0.2,
        titrationStepHigh: w * 0.5,
        targetUOPlow: w * 1,
        targetUOPhigh: w * 3.5,
    };
};

export const vasopressinNotes = [
    'Start at 0.5 milliU/kg/hr STAT',
    'Order serum Na+ q1h STAT until Na+ 135–150 ×2 AND UOP 1–2 mL/kg/hr, then min q4h STAT',
    'Titrate by 0.2–0.5 milliU/kg/hr q30min until UOP 1–3.5 mL/kg/hr',
    'Must order q1h Na+ STAT ×2 if drip rate is changed',
    'If UOP < 1 mL/kg/hr ×2 hr: decrease 50% q1h ×2, then DC if patient tolerates DDAVP (subQ/IN/PO)',
    'If serum Na+ < 135: DC drip. Do not restart until Na+ > 145 AND meets DI criteria',
    'For sellar/supra-sellar tumor post-op: DC drip on POD #2; monitor UOP; re-init if UOP > 3.5 mL/kg/hr',
    'Re-initiation: start at last dose prior to DC',
];

export const vasopressinNotesJa = [
    '0.5 milliU/kg/hr STAT で開始',
    'Na+ 135-150 ×2 + UOP 1-2 mL/kg/hr が確認できるまで血清 Na+ を q1h STAT、その後最低 q4h STAT',
    'UOP 1-3.5 mL/kg/hr になるまで 0.2-0.5 milliU/kg/hr ずつ q30 分で漸増',
    '持続レート変更時は q1h Na+ STAT ×2 を必ずオーダー',
    'UOP < 1 mL/kg/hr が 2 時間続く: 50% ずつ q1h で 2 回減量、その後 DDAVP (subQ/IN/PO) 許容なら DC',
    '血清 Na+ < 135: 持続 DC。Na+ > 145 + DI 基準を満たすまで再開しない',
    'sellar/supra-sellar 腫瘍術後: POD #2 で持続 DC;UOP を監視;UOP > 3.5 mL/kg/hr で再開',
    '再開時: DC 直前の用量で開始',
];
