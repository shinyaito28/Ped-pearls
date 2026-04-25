// Source: Pediatric Anesthesia Pearls 2021, Malignant Hyperthermia panel (image IMG_0061).

export const mhHotline = {
    label: 'MHAUS Hotline',
    number: '1-800-644-9737',
    url: 'https://www.mhaus.org/'
};

export const mhSigns = [
    'Tachycardia',
    'Arrhythmias',
    '↑ EtCO2 (often the earliest sign)',
    '↑ Temperature',
    'Hypoxia',
    'Fasciculations',
    'Muscle rigidity (esp. masseter)',
    '↑ K (hyperkalemia)',
    'Myoglobinuria',
    'Metabolic + respiratory acidosis'
];

// Step-by-step treatment protocol verbatim from the reference card.
export const mhSteps = [
    {
        n: 1,
        title: 'CALL FOR HELP & CALL HOTLINE',
        body: 'Hyperventilate with 100% FiO2. Stop all volatile agents and succinylcholine. Stop surgery if possible.',
        accent: 'red'
    },
    {
        n: 2,
        title: 'Dantrolene 2.5 mg/kg IV',
        body: 'Repeat as needed. After patient is stable: 1 mg/kg IV q6h. Reconstitute Ryanodex (250 mg/vial) or original Dantrolene (20 mg/vial in 60 mL sterile water).',
        accent: 'red'
    },
    {
        n: 3,
        title: 'Cool the patient',
        body: 'Iced IV fluids, lavage stomach / bladder / rectum, surface ice packs. Goal core temperature < 38 °C, then stop cooling to avoid overshoot.',
        accent: 'sky'
    },
    {
        n: 4,
        title: 'Send labs',
        body: 'ABG, electrolytes, ionized calcium, glucose, CK / CPK, DIC profile (PT/PTT/fibrinogen). Repeat q6h until stable.',
        accent: 'amber'
    },
    {
        n: 5,
        title: 'Treat acidosis & hyperkalemia',
        body: 'Sodium bicarbonate 1-2 mEq/kg per ABG. Treat ↑K with glucose + insulin (D25% 2 mL/kg + Insulin 0.1 U/kg) and CaCl 10-15 mg/kg.',
        accent: 'orange'
    },
    {
        n: 6,
        title: 'Maintain UOP ≥ 2 mL/kg/hr',
        body: 'Aggressive hydration. Furosemide 0.5-2 mg/kg or Mannitol 0.25-1 g/kg as needed.',
        accent: 'teal'
    },
    {
        n: 7,
        title: 'AVOID Calcium Channel Blockers',
        body: 'CCBs + Dantrolene → severe hyperkalemia + myocardial depression. Use β-blockers or amiodarone for arrhythmia instead.',
        accent: 'rose'
    }
];

export const mhPostAcute = [
    'Monitor in PICU for at least 24 hr (recrudescence in ~25%).',
    'Continue Dantrolene 1 mg/kg IV q6h × 24-48 hr.',
    'Counsel patient & family. Refer to MHAUS for genetic testing.',
    'File event with NAMHR (North American MH Registry).'
];
