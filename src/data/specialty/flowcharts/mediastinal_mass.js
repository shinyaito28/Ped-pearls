// Mediastinal Mass Management — NCH consensus algorithm.
// Source: NCH Sharepoint / Hematology & Oncology Periop / Mediastinal Mass Management_09122022.pdf
// Original CPG#: ONC-CPG-24, Effective 9/12/2022.

export const entry = {
    id: 'flow_mediastinal_mass',
    hub: 'entpulm',
    kind: 'flowchart',
    title: 'Mediastinal Mass Management',
    shortDescription: 'Triage by symptoms + CT airway narrowing — tier disposition + diagnostic workup.',
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

// Three risk tiers, defined by symptom set + CT airway narrowing.
export const tiers = [
    {
        id: 'mild',
        label: 'No CV/airway obstruction symptoms',
        criteria: [
            'No stridor, orthopnea, or SVC syndrome',
            'OR chest CT < 25% airway narrowing',
            'Vitals normal, SpO2 ≥ 95% RA',
        ],
        dispo: 'Admission to Oncology',
        consults: [
            'Anesthesiology consult',
            'Pediatric Surgery consult',
            'Alert PICU for possible bed if status changes',
        ],
        biopsy: [
            'Tissue biopsy — to be determined after Pediatric Surgery discussion',
            'Consider IR consult',
            'Consider CT surgery consult',
            'Consider diagnostic taps: pleural / pericardial effusion',
        ],
        emphasis: 'success',
    },
    {
        id: 'moderate',
        label: 'CV/airway obstruction symptoms or ≥ 25% CT narrowing',
        criteria: [
            'Stridor, orthopnea, or SVC syndrome',
            'OR chest CT ≥ 25% airway narrowing',
        ],
        dispo: 'Admission to PICU',
        consults: [
            'Anesthesiology consult',
            'Pediatric Surgery consult',
            'Oncology consult',
        ],
        biopsy: [
            'Tissue biopsy — to be determined after Pediatric Surgery discussion',
            'Consider IR consult',
            'Consider CT surgery consult',
            'Consider diagnostic taps: pleural / pericardial effusion',
        ],
        emphasis: 'warn',
    },
    {
        id: 'severe',
        label: 'Respiratory distress / cannot lay flat / SpO2 ≤ 94%',
        criteria: [
            'Respiratory distress',
            'Patient cannot lay flat',
            'Abnormal vital signs',
            'SpO2 ≤ 94%',
        ],
        dispo: 'Immediate consults — emergency posture',
        consults: [
            'Anesthesiology — STAT',
            'ENT — STAT',
            'Pediatric Surgery',
            'Hematology & Oncology',
            'Pediatric ICU',
        ],
        biopsy: [
            'Corticosteroid or radiation therapy if biopsy not feasible or safe',
        ],
        emphasis: 'critical',
    },
];
