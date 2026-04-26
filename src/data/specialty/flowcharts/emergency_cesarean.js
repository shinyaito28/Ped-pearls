// Emergent Cesarean Delivery — NCH Fetal Medicine flowsheet.
// Source: NCH Sharepoint / Fetal Medicine / Emergency Cesarean Section Flowsheet_March 2026.pdf

export const entry = {
    id: 'flow_emergency_cesarean',
    hub: 'fetal',
    kind: 'flowchart',
    title: 'Emergent Cesarean Delivery',
    shortDescription: 'Pre-procedure → RSI → maintenance → uterine atony reversal.',
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

// Room set-up checklist.
export const roomSetup = [
    'Machine check with suction',
    'Standard ASA monitors',
    'Video laryngoscope and styletted ETT',
    'Troop elevation pillow',
    'Consider additional difficult airway equipment',
    'BIS monitor, OG, temp probe',
];

// RSI dosing — weight-aware.
// Standard: Propofol 1.5-2 mg/kg + succinylcholine 1-1.5 mg/kg
// Hemorrhage / unstable: Etomidate 0.3 mg/kg or Ketamine 0.5-1 mg/kg
export const rsiDoses = (weightKg) => {
    const w = parseFloat(weightKg) || 0;
    if (w <= 0) return null;
    return {
        standard: [
            { drug: 'Propofol', range: `${(w * 1.5).toFixed(0)}–${(w * 2).toFixed(0)} mg`, perKg: '1.5–2 mg/kg' },
            { drug: 'Succinylcholine', range: `${(w * 1).toFixed(0)}–${(w * 1.5).toFixed(0)} mg`, perKg: '1–1.5 mg/kg' },
        ],
        unstable: [
            { drug: 'Etomidate', range: `${(w * 0.3).toFixed(0)} mg`, perKg: '0.3 mg/kg' },
            { drug: 'Ketamine',  range: `${(w * 0.5).toFixed(0)}–${(w * 1).toFixed(0)} mg`, perKg: '0.5–1 mg/kg' },
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

// Maternal hemodynamic targets.
export const maintenance = {
    bp: 'SBP > 100 or MAP within 10–20% of baseline',
    pressors: [
        'Ephedrine 5–10 mg IV boluses prn',
        'Phenylephrine 50–100 mcg IV boluses prn',
        'Consider phenylephrine infusion (0.1–0.5 mcg/kg/min)',
    ],
    fluids: 'Limit IV fluids if mother on pre-op magnesium sulfate',
};

// Oxytocin dosing (after umbilical cord clamping).
export const oxytocin = {
    bolus: '5 Units over 10 min (500 mL/hr)',
    infusion: 'Then 70 mL/hr until bag complete or arrival in PACU',
    backup: ['Methylergonovine (Methergine)', 'Carboprost (Hemabate)', 'Misoprostol (Cytotec)'],
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

// Emergence package.
export const emergence = [
    'Ondansetron 4 mg IV',
    'Acetaminophen 15 mg/kg IV',
    'Ketorolac 15–30 mg',
    'Extubate awake',
];

// If indwelling epidural and time allows (10–15 min), dose for surgical block.
export const epiduralAlternative = [
    'Discuss urgency with surgical team — needs 10–15 min',
    'Patient often on 0.2% Ropivacaine infusion for post-op pain',
    'Bolus 5 mL of 2% Lidocaine with 1:200k epi q~5 min (total 5–15 mL)',
    'Should achieve T4–T6 level within 10–15 min depending on dosing speed',
    'Check sensory level frequently to avoid over- or under-dosing',
];
