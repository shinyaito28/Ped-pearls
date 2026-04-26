// Maternal-Fetal Anesthesia Flow Charts — NCH Fetal Medicine.
// Source: NCH Sharepoint / Fetal Medicine / Maternal-Fetal Anesthesia Flow Charts_March 2026.pdf
//
// Five procedure types, each with its own room set-up, meds, intra-op flow,
// and post-op disposition. The picker selects which procedure's protocol
// is shown.

export const entry = {
    id: 'flow_maternal_fetal',
    hub: 'fetal',
    kind: 'flowchart',
    title: 'Maternal-Fetal Anesthesia Flows',
    shortDescription: 'Picker for 5 fetal procedure types — MIFS, mid-gestation, EXIT-resection, EXIT-airway, scheduled cesarean.',
    tags: ['fetal surgery', 'mifs', 'exit', 'mid-gestation', 'scheduled cesarean', 'cse', 'epidural', 'magnesium', 'nitroglycerin', 'uterine relaxation'],
    emergency: true,
    weightAware: false, // doses are weight-based for the FETUS only — manual calc
    ageRules: null,
    source: 'NCH Sharepoint / Fetal Medicine',
    lastReviewed: '2026-04',
    component: 'MaternalFetalCard',
};

// Common pre-op gastric prophylaxis given for all fetal procedures.
export const commonPreop = [
    'Sodium citrate, famotidine, and metoclopramide given in pre-op',
    'Pre-evaluation — consider IV midazolam',
    'Confirm maternal (and fetal if applicable) blood available',
];

// Generic maternal hemodynamic targets — same across procedures.
export const maternalHemodynamics = {
    bp: 'SBP > 100 or MAP within 10–20% of baseline',
    pressors: [
        'Ephedrine 5–10 mg IV boluses prn',
        'Phenylephrine 50–100 mcg IV boluses prn',
        'Phenylephrine infusion available (0.1–0.5 mcg/kg/min)',
    ],
    fluids: 'Limit IV fluids if mother on pre-op magnesium sulfate',
};

// Fetal IM cocktail (per procedure variants below).
export const fetalCocktailMidGestation = [
    'Fentanyl 10 mcg/kg',
    'Atropine 20 mcg/kg',
    'Vecuronium 0.2 mg/kg',
];
export const fetalCocktailExit = [
    'Fentanyl 5 mcg/kg',
    'Atropine 20 mcg/kg',
    'Vecuronium 0.1 mg/kg',
];

// Fetal emergency drugs (per procedure variants below).
export const fetalEmergencyMidGestation = [
    'Atropine 0.1 mg in TB syringe ×3',
    'Epinephrine 1 mcg/kg in TB syringe ×3',
    'Epinephrine 10 mcg/kg in TB syringe ×3',
];
export const fetalEmergencyExit = [
    'Atropine 0.1 mg in TB syringe ×2',
    'Epinephrine 10 mcg/kg in TB syringe ×2',
    'Heparin 100 units/kg if ECMO possible (EXIT-to-Resection only)',
];

export const procedures = [
    {
        id: 'mifs',
        label: 'Minimally Invasive Fetal Surgery',
        anesthesia: 'Anesthetic depends on placenta location',
        keyPoints: [
            'Posterior placenta: local + dexmedetomidine and/or remifentanil infusion',
            'Anterior placenta: epidural + dexmedetomidine and/or remifentanil',
            'Dexmed: start 0.5 mcg/kg/hr; Remi: start 0.1 mcg/kg/min',
            'Epidural: 2% Lido + Bicarb (1 mEq/mL) — bolus 10 mL, then 5 mL q5 min for 15–20 mL total, target T4–T6',
        ],
        lines: ['Maternal PIV ×1'],
        emergency: false,
    },
    {
        id: 'midges',
        label: 'Mid-Gestation Fetal Surgery',
        anesthesia: 'GA with epidural + uterine relaxation',
        keyPoints: [
            'Place T10–12 epidural with test dose, then RSI supine with LUD',
            'Maintenance: Propofol + Remifentanil + volatile + Rocuronium 0.6 mg/kg IV',
            'Maintain uterine relaxation: Mg sulfate 3–4 g over 20 min then 2 g/hr; nitroglycerin boluses 20–40 mcg prn',
            'Increase volatile to enhance uterine relaxation',
            'Fetal cocktail IM by surgeon (see Fetal cocktails below)',
            'Hysterotomy closure: decrease volatile, continue Mg, load epidural with 10–20 mL 0.2% Ropi + 1–2 mg Duramorph',
            'Emergence: Sugammadex, Ondansetron 4 mg, Acetaminophen 15 mg/kg, extubate awake',
        ],
        lines: ['Maternal PIV ×2', 'Arterial line', 'Fluid warmer with NS', 'Optional fetal PIV with NS in buretrol + transfusion tubing/filter'],
        emergency: true,
        fetalCocktail: 'midGestation',
        fetalEmergency: 'midGestation',
        fluidLimit: 'Max 1 L for the procedure',
    },
    {
        id: 'exit-resection',
        label: 'EXIT-to-Resection (GA + regional)',
        anesthesia: 'GA + lumbar epidural; baby resuscitated in 2nd OR if needed',
        keyPoints: [
            'Place lumbar epidural, RSI supine with LUD',
            'Maintain uterine relaxation: increase volatile + nitroglycerin boluses prn',
            'Fetal cocktail IM by surgeon (see Fetal cocktails); pulse ox on hand',
            'Continuous fetal echo by MFM; consider 24 Ga PIV for fetus',
            'ETT sutured in place for fetus before cord division',
            'After cord clamping: turn off volatile, reverse uterine atony, oxytocin infusion (5 U/10 min, then 70 mL/hr)',
            'Consider Methergine and Carboprost prn',
            'Load epidural: 10–20 mL 0.2% Ropi + 1–2 mg Duramorph',
            'Emergence: Sugammadex, Ondansetron 4 mg, Acetaminophen 15 mg/kg, Ketorolac 15 mg, extubate awake',
        ],
        lines: ['Maternal PIV ×2', 'Arterial line', 'Fluid warmer with NS', 'Optional fetal PIV + transfusion tubing'],
        emergency: true,
        fetalCocktail: 'exit',
        fetalEmergency: 'exit',
    },
    {
        id: 'exit-airway',
        label: 'EXIT-to-Airway / Cesarean (Awake + regional)',
        anesthesia: 'Awake mother under CSE; no GA unless airway emergency',
        keyPoints: [
            'Place lumbar CSE (no epidural test dose)',
            'Spinal: 1.6 mL 0.75% bupivacaine + 10 mcg fentanyl ± 0.1 mg PF morphine — check T6 level',
            'Maintain uterine relaxation: nitroglycerin boluses prn',
            'Fetal cocktail IM by surgeon prn (see Fetal cocktails)',
            'Cord clamping: reverse uterine atony, start oxytocin infusion, consider Methergine + Hemabate',
            'Load epidural: 10–20 mL 0.2% Ropi + 1–2 mg Duramorph (if not given IT)',
            'Post-op: Acetaminophen 15 mg/kg, Ketorolac 15 mg, Ondansetron 4 mg; support person in OR',
        ],
        lines: ['Maternal PIV ×2', 'Fluid warmer with NS', 'Optional fetal PIV + transfusion tubing'],
        emergency: true,
        fetalCocktail: 'exit',
        fetalEmergency: 'exit',
    },
    {
        id: 'scheduled-cesarean',
        label: 'Scheduled Cesarean Delivery',
        anesthesia: 'CSE; baby cared for by NICU or 2nd anesthesia team',
        keyPoints: [
            'Place lumbar CSE (no epidural test dose)',
            'Spinal: 1.6 mL 0.75% bupivacaine + 10 mcg fentanyl ± 0.1 mg PF morphine — check T6 level',
            'Start phenylephrine infusion immediately after dosing spinal (0.5 mcg/kg/min)',
            'Cord clamping: reverse uterine atony, start oxytocin (5 U/10 min, then 70 mL/hr)',
            'Consider Methergine and Hemabate prn',
            'Load epidural: 10–20 mL 0.2% Ropi + 1–2 mg Duramorph (if not given IT)',
            'Post-op: Acetaminophen 15 mg/kg, Ketorolac 15 mg, Ondansetron 4 mg; support person in OR',
        ],
        lines: ['Maternal PIV ×2', 'Fluid warmer with NS'],
        emergency: false,
    },
];
