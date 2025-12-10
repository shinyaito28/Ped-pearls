export const emergencyGroups = [
    {
        id: 'code',
        title: 'Cardiac Arrest / Shock (Code)',
        color: 'red',
        description: 'PALS / resuscitation core drugs',
        drugs: [
            'Epinephrine (Cardiac Arrest)',
            'Atropine',
            'Succinylcholine',
            'Rocuronium',
            'Calcium Chloride',
            'Calcium Gluconate',
            'Sodium Bicarbonate',
            'Magnesium Sulfate',
            'Dextrose'
        ]
    },
    {
        id: 'arrhythmia',
        title: 'Arrhythmia / CV',
        color: 'rose',
        drugs: [
            'Adenosine',
            'Amiodarone (Bolus)',
            'Lidocaine (Bolus)', // Need to add to drugs.js
            'Epinephrine (Vasopressor)',
            'Norepinephrine', // Infusion
            'Dopamine' // Infusion
        ]
    },
    {
        id: 'anaphylaxis',
        title: 'Anaphylaxis / Asthma',
        color: 'orange',
        drugs: [
            'Epinephrine (Vasopressor)', // IM dose is same conc usually but let's check drugs.js
            'Diphenhydramine', // Need to add
            'Albuterol (Neb)', // Need to add
            'Methylprednisolone',
            'Hydrocortisone' // Need to add
        ]
    },
    {
        id: 'seizure',
        title: 'Seizure / Status Epilepticus',
        color: 'purple',
        drugs: [
            'Midazolam (IV)',
            'Midazolam (IM/IN)', // Need to add distinct entry if calc differs widely or use note
            'Diazepam',
            'Lorazepam', // Need to add
            'Levetiracetam',
            'Fosphenytoin'
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
            'Neostigmine'
        ]
    },
    {
        id: 'last',
        title: 'Local Anesthetic Toxicity (LAST)',
        color: 'yellow',
        drugs: [
            'Lipid Emulsion 20%'
        ]
    }
];

export const crisisLinks = [
    { name: 'Pedi Crisis 2.0 (SPA)', url: 'https://www.pedsanesthesia.org/mobile-app-pedi-crisis-2-0/' },
    { name: 'PALS Algorithms', url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/algorithms' },
    { name: 'DAS Difficult Airway', url: 'https://das.uk.com/guidelines/paediatric-difficult-airway-guidelines' }
];
