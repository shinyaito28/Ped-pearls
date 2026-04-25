// Drug names here MUST match `name` fields in `src/data/drugs.js` exactly.

export const emergencyGroups = [
    {
        id: 'code',
        title: 'Cardiac Arrest / Code',
        color: 'red',
        description: 'PALS resuscitation core drugs',
        drugs: [
            'Epinephrine (Cardiac Arrest)',
            'Atropine (IV/IO)',
            'Succinylcholine (IV)',
            'Rocuronium (RSI)',
            'Calcium Chloride',
            'Calcium Gluconate',
            'Sodium Bicarbonate',
            'Magnesium Sulfate',
            'Dextrose 25%',
            'Dextrose 10%',
            'Vasopressin (Arrest)'
        ]
    },
    {
        id: 'arrhythmia',
        title: 'Arrhythmia / Low Output',
        color: 'rose',
        drugs: [
            'Adenosine',
            'Amiodarone (Bolus)',
            'Amiodarone (Infusion)',
            'Lidocaine (Bolus)',
            'Procainamide (Load)',
            'Epinephrine (Vasopressor)',
            'Norepinephrine (Infusion)',
            'Dopamine (Infusion)'
        ]
    },
    {
        id: 'anaphylaxis',
        title: 'Anaphylaxis / Asthma',
        color: 'orange',
        drugs: [
            'Epinephrine (Anaphylaxis)',
            'Diphenhydramine',
            'Albuterol (Neb)',
            'Methylprednisolone (Asthma)',
            'Hydrocortisone',
            'Magnesium Sulfate',
            'Epinephrine, Racemic (Neb)'
        ]
    },
    {
        id: 'seizure',
        title: 'Seizure / Status Epilepticus',
        color: 'purple',
        drugs: [
            'Midazolam (IV)',
            'Midazolam (IM/IN)',
            'Diazepam (IV)',
            'Lorazepam',
            'Levetiracetam (Keppra)',
            'Fosphenytoin',
            'Phenobarbital'
        ]
    },
    {
        id: 'reversal',
        title: 'Reversal',
        color: 'teal',
        drugs: [
            'Naloxone',
            'Flumazenil',
            'Sugammadex',
            'Neostigmine',
            'Glycopyrrolate'
        ]
    },
    {
        id: 'last',
        title: 'Local Anesthetic Toxicity (LAST)',
        color: 'yellow',
        drugs: [
            'Lipid Emulsion 20%'
        ]
    },
    {
        id: 'hyperK',
        title: 'Hyperkalemia / Acidosis',
        color: 'amber',
        drugs: [
            'Calcium Gluconate',
            'Calcium Chloride',
            'Sodium Bicarbonate',
            'Insulin (Bolus)',
            'Dextrose 25%',
            'Albuterol (Neb)'
        ]
    }
];

export const crisisLinks = [
    // Verified URLs (Apr 2026):
    { name: 'Pedi Crisis 2.0 (SPA)', url: 'https://pedsanesthesia.org/pedi-crisis-app/' },
    { name: 'SPA Critical Events Checklists', url: 'https://pedsanesthesia.org/critical-events-checklists/' },
    { name: 'PALS Algorithms (AHA)', url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/algorithms' },
    { name: 'DAS Pediatric Difficult Airway', url: 'https://das.uk.com/guidelines/paediatric-difficult-airway-guidelines' },
    { name: 'MHAUS — Hotline 1-800-644-9737', url: 'https://www.mhaus.org/' },
    { name: 'LipidRescue (LAST resource)', url: 'http://www.lipidrescue.org/' }
];
