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

export const ieHighRiskConditionsJa = [
    '人工心臓弁または弁修復に使用された人工材料',
    '感染性心内膜炎の既往',
    '未修復のチアノーゼ性 CHD(緩和シャントおよび導管を含む)',
    '人工材料を用いて完全修復された CHD — 手技後 6 ヶ月間のみ',
    '人工パッチ/デバイス部位またはその近接に残存欠損のある修復後 CHD(内皮化を阻害)',
    '心臓弁膜症を発症した心臓移植レシピエント'
];

export const ieIndicatedProcedures = [
    'Dental procedures involving manipulation of gingival tissue, the periapical region, or perforation of oral mucosa',
    'Respiratory tract procedures with incision or biopsy',
    'Procedures on infected skin, skin structures, or musculoskeletal tissue'
];

export const ieIndicatedProceduresJa = [
    '歯肉組織、根尖周囲、または口腔粘膜の穿通を伴う歯科手技',
    '切開または生検を伴う気道手技',
    '感染した皮膚、皮膚付属器、筋骨格組織への手技'
];

export const ieNotIndicated = [
    'GU/GI tract procedures — antibiotic prophylaxis solely for IE prevention is NOT recommended.'
];

export const ieNotIndicatedJa = [
    '泌尿生殖器/消化管手技 — IE 予防のみを目的とした抗菌薬予防投与は推奨されない。'
];

// Give 30-60 min prior to procedure. Doses are given as kg-based formulae plus a hard maximum.
export const ieRegimens = [
    {
        scenario: 'Standard — Oral',
        scenarioJa: '標準 — 経口',
        rows: [
            { drug: 'Amoxicillin', dose: '50 mg/kg', max: '2 g' }
        ]
    },
    {
        scenario: 'Unable to take Oral — IV/IM',
        scenarioJa: '経口不可 — IV/IM',
        rows: [
            { drug: 'Ampicillin', dose: '50 mg/kg', max: '2 g' },
            { drug: 'Cefazolin', dose: '50 mg/kg', max: '1 g (IE max)' },
            { drug: 'Ceftriaxone', dose: '50 mg/kg', max: '1 g (IE max)' }
        ]
    },
    {
        scenario: 'PCN allergy — Oral',
        scenarioJa: 'ペニシリンアレルギー — 経口',
        rows: [
            { drug: 'Cephalexin', dose: '50 mg/kg', max: '2 g' },
            { drug: 'Clindamycin', dose: '20 mg/kg', max: '600 mg' },
            { drug: 'Azithromycin', dose: '15 mg/kg', max: '500 mg' },
            { drug: 'Clarithromycin', dose: '15 mg/kg', max: '500 mg' }
        ]
    },
    {
        scenario: 'PCN allergy — IV/IM',
        scenarioJa: 'ペニシリンアレルギー — IV/IM',
        rows: [
            { drug: 'Clindamycin', dose: '20 mg/kg', max: '600 mg' },
            { drug: 'Cefazolin', dose: '50 mg/kg', max: '1 g' },
            { drug: 'Ceftriaxone', dose: '50 mg/kg', max: '1 g' }
        ]
    }
];
