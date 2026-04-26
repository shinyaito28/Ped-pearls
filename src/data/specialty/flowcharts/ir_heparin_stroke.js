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

export const strokeProtocolImaging = [
    '**Short Stroke Protocol** initially:',
    '  - Axial Diffusion (DWI)',
    '  - Axial FLAIR',
    '  - Axial GRE T2*',
    'If diffusion POSITIVE (radiologist call): **head MRA** is performed (separate order/accession # for billing)',
    'Ordering physician notified of results if positive',
    'Positive exam → patient receives treatment, then returns for **Full Stroke Protocol** once stable',
];

export const strokeProtocolWorkflow = [
    'After-hours: Radiologist calls in MRI technologists to complete the exam',
    'Anesthesia involvement: per emergency-MRI workflow (see outofor_offhours_mri)',
    'Confirm patient is hemodynamically stable + airway secure if intubated',
    'Standard MR-safety pre-scanning checklist (see flow_imri_checklist for iMRI; standard MRI follows similar principles)',
];
