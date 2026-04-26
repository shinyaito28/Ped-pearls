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
    shortDescription: 'Weight-tier heparin rate for sheath thrombus prevention; ACT/PTT monitoring.',
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

export const monitoringSteps = [
    'Baseline ACT or PTT obtained (can be done at time of arterial access if difficult sample)',
    'ACT or PTT q4h during the infusion',
    'For concerns of bleeding or anticoagulation: repeat ACT/PTT at shorter intervals; discuss with IR + neurosurgery',
    'Goal anticoagulation: NORMAL range — this dose should NOT elevate PTT or ACT',
];

export const documentationSteps = [
    'Heparin concentration documented in anesthesia record',
    'Infusion rate documented',
    'Coagulation studies (ACT/PTT) documented',
];

// Stroke Protocol pointer — the source .doc was binary and did not extract.
// Until the file is manually transcribed, surface a note rather than guess
// at content that could have clinical doses.
export const strokeProtocolNote = {
    title: 'Emergent Stroke Protocol',
    body: 'The NCH IR Emergent Stroke Protocol source file is in a legacy .doc format that did not auto-extract. Open the original PDF/Word file in the IR folder for the full protocol — once transcribed, the steps will appear here.',
};
