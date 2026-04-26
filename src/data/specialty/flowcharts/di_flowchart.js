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
    shortDescription: 'Branching by Na+, with vasopressin drip + free-water deficit calculators.',
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

// Suspected new-onset DI workup (UOP > 3 mL/kg/hr).
export const suspectedNewOnsetWorkup = [
    'Serum Na+',
    'Urine Na+',
    'Serum Osmolality',
    'Urine Osmolality',
    'Urine Specific Gravity',
    'Blood Glucose',
];

export const newOnsetCriteria = {
    label: 'New-onset DI criteria (post-op concern)',
    items: [
        'UOP > 3 mL/kg/hr',
        'Serum Na+ > 145 mEq/L',
        'Serum Osm > 300 mOsm/kg',
        'Urine Osm < 300 mOsm/kg',
    ],
};

// Sodium-band branching. Serum Na+ targets and management actions.
export const naBands = [
    {
        id: 'hypo',
        label: 'Hyponatremia',
        range: 'Na+ < 135 mEq/L',
        critical: 'Consider PICU if Na+ < 120',
        actions: [
            'Hold home DDAVP',
            'Do NOT place on IVF (if NPO with hypoglycemia concerns, discuss with endocrinology)',
            'Order serum Na+ q4h until normonatremic ×2',
            'When normonatremic ×1 AND UOP > 3 mL/kg/hr for ≥1 hr: notify practitioner; resume DDAVP with Na+ check 1 hr before each dose',
        ],
        etiology: ['Increased oral or IVF intake → dilution'],
    },
    {
        id: 'normo',
        label: 'Normonatremia',
        range: 'Na+ 135–150 mEq/L',
        critical: 'Range 135–150 is acceptable for known DI (vs 135–145 normal range otherwise)',
        actions: [
            'Order home DDAVP per home regimen',
            'Order serum Na+ 1 hr before every DDAVP dose',
            'Na+ result used for decisions must be < 2 hours old',
        ],
    },
    {
        id: 'hyper',
        label: 'Hypernatremia',
        range: 'Na+ > 150 mEq/L (severe > 150)',
        critical: 'Consider PICU if Na+ > 165',
        actions: [
            'Give home DDAVP dose now if not already given',
            'Calculate free water deficit (calculator below)',
            'Replace over 24 hr with D5 ½NS (floor) or D5 ½NS + 20 mEq/L KCl (ICU)',
            'Discontinue free water deficit replacement when Na+ < 150',
            'Order serum Na+ q4h until normonatremic ×2',
        ],
        etiology: [
            'Increased insensible water loss',
            'URI in nasal DDAVP users',
            'DDAVP medication expiration',
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
