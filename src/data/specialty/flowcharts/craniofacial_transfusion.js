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
    shortDescription: 'Open craniosynostosis surgery — pRBC/crystalloid/colloid by weight, step-by-step.',
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
    { id: 'cvr_foa', label: 'Anterior CVR + FOA' },
    { id: 'midpost', label: 'Mid-vault and/or posterior CVR' },
    { id: 'distractors', label: 'Posterior distractors' },
    { id: 'other', label: 'Other' },
];

// Lab timing schedule (Box B).
export const labTiming = [
    'During IV & a-line placement: aBL + H&H',
    'After bone drilling complete and bone removed: aBL',
    'In PACU: H&H',
    'PRN labs if other concerns (discuss with surgeons)',
];

// Fluid replacement (Box C).
export const fluidReplacement = [
    'Lactated Ringer\'s or Plasmalyte for intraoperative fluid replacement',
    'Albumin: consider in patients with hypotension, hypovolemia, or hemodynamic instability (e.g. PPV 10–12% on a-line)',
    'Crystalloid/colloid prioritized BEFORE pRBCs unless acute severe hemorrhage',
    'Step 1: crystalloid 10 mL/kg',
    'Step 2: colloid (albumin) 10 mL/kg',
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

// Surgical algorithm steps in chronological order.
export const algorithmSteps = [
    {
        id: 'preop',
        label: 'Pre-surgery (day of)',
        actions: [
            'Pre-surgery assessment by anesthesiologist (Box A)',
            'Notify surgeon of any abnormalities',
            'Verify blood product availability',
            'Request pRBC to be in OR refrigerator',
        ],
    },
    {
        id: 'timeout',
        label: 'Surgical time-out',
        actions: ['Discuss blood transfusion algorithm during time-out'],
    },
    {
        id: 'incision',
        label: 'Skin incision (1st aBL & H&H result)',
        actions: [
            'If Hb meets threshold (Table 1): pRBC 15 mL/kg, repeat aBL 30–60 min after transfusion',
            'If no transfusion needed: verify fluid status — if mild hypovolemia, give crystalloid 10 mL/kg → colloid 10 mL/kg',
        ],
    },
    {
        id: 'bone',
        label: 'Bone drilling complete (2nd aBL)',
        actions: [
            'If Hb meets threshold (Table 1): pRBC 15 mL/kg, repeat aBL 30–60 min after',
            'Otherwise verify fluid status, give crystalloid → colloid as above',
            'Additional PRN labs if active bleeding',
        ],
    },
    {
        id: 'pacu',
        label: 'PACU H&H stat',
        actions: [
            'If Hb meets threshold: pRBC 15 mL/kg, repeat aBL 30–60 min',
            'Otherwise: verify fluid status, transfer to PICU, stop',
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
