// Source: AHA 2007 / Circulation 2007;116:1736-1754, reproduced in
// Pediatric Anesthesia Pearls 2021 (image IMG_0064).

export const ieHighRiskConditions = [
    'Prosthetic cardiac valve or prosthetic material used for cardiac valve repair',
    'Previous infectious endocarditis',
    'Unrepaired cyanotic CHD, including palliative shunts and conduits',
    'Completely repaired CHD with prosthetic material — only during the first 6 months after the procedure',
    'Repaired CHD with residual defects at or adjacent to the site of a prosthetic patch / device (inhibits endothelialization)',
    'Cardiac transplant recipients who develop cardiac valvulopathy'
];

export const ieIndicatedProcedures = [
    'Dental procedures involving manipulation of gingival tissue, the periapical region, or perforation of oral mucosa',
    'Respiratory tract procedures with incision or biopsy',
    'Procedures on infected skin, skin structures, or musculoskeletal tissue'
];

export const ieNotIndicated = [
    'GU/GI tract procedures — antibiotic prophylaxis solely for IE prevention is NOT recommended.'
];

// Give 30-60 min prior to procedure. Doses are given as kg-based formulae plus a hard maximum.
export const ieRegimens = [
    {
        scenario: 'Standard — Oral',
        rows: [
            { drug: 'Amoxicillin', dose: '50 mg/kg', max: '2 g' }
        ]
    },
    {
        scenario: 'Unable to take Oral — IV/IM',
        rows: [
            { drug: 'Ampicillin', dose: '50 mg/kg', max: '2 g' },
            { drug: 'Cefazolin', dose: '50 mg/kg', max: '1 g (IE max)' },
            { drug: 'Ceftriaxone', dose: '50 mg/kg', max: '1 g (IE max)' }
        ]
    },
    {
        scenario: 'PCN allergy — Oral',
        rows: [
            { drug: 'Cephalexin', dose: '50 mg/kg', max: '2 g' },
            { drug: 'Clindamycin', dose: '20 mg/kg', max: '600 mg' },
            { drug: 'Azithromycin', dose: '15 mg/kg', max: '500 mg' },
            { drug: 'Clarithromycin', dose: '15 mg/kg', max: '500 mg' }
        ]
    },
    {
        scenario: 'PCN allergy — IV/IM',
        rows: [
            { drug: 'Clindamycin', dose: '20 mg/kg', max: '600 mg' },
            { drug: 'Cefazolin', dose: '50 mg/kg', max: '1 g' },
            { drug: 'Ceftriaxone', dose: '50 mg/kg', max: '1 g' }
        ]
    }
];
