// Source: Pediatric Anesthesia Pearls 2021, Sedation/Adjuncts panel (image IMG_0063).
// Each entry uses an `agent` label (route-specific) and a parseable `dose` string.

export const sedationList = [
    // --- Premedication / Anxiolysis ---
    { agent: 'Clonidine (PO)', dose: '4-5 mcg/kg', max: null, note: 'Pre-med.' },
    { agent: 'Clonidine (Regional)', dose: '1-2 mcg/kg', max: null, note: 'Preservative-free only. Block adjunct.' },
    { agent: 'Clonidine (IV pain)', dose: '1-2 mcg/kg', max: null, note: 'Analgesia.' },
    { agent: 'Clonidine (IV shivering)', dose: '3 mcg/kg', max: null, note: 'Postop shivering.' },
    { agent: 'Clonidine (IV PONV)', dose: '2 mcg/kg', max: null, note: 'PONV.' },
    { agent: 'Clonidine (IV preinduction)', dose: '2 mcg/kg', max: null, note: 'Agitation prevention.' },

    // --- Dexmedetomidine ---
    { agent: 'Dexmedetomidine (Load)', dose: '0.5-2 mcg/kg', max: null, note: 'IV over 10 min. DO NOT push.' },
    { agent: 'Dexmedetomidine (Maint)', dose: '0.2-1 mcg/kg/hr', max: null, note: 'IV maintenance.' },
    { agent: 'Dexmedetomidine (Nasal)', dose: '1-3 mcg/kg', max: null, note: 'Intranasal premed.' },

    // --- Benzos ---
    { agent: 'Diazepam (PO)', dose: '0.25-0.3 mg/kg', max: null, note: 'DO NOT give IM.' },
    { agent: 'Diazepam (IV)', dose: '0.05-0.1 mg/kg', max: 10, note: 'IV titrate.' },

    // --- Antihistamine ---
    { agent: 'Diphenhydramine (PO/IM)', dose: '1-2 mg/kg', max: 50, note: 'Benadryl.' },

    // --- Ketamine routes ---
    { agent: 'Ketamine (IM Sedation)', dose: '2-3 mg/kg', max: null, note: 'IM sedation. Add atropine 0.02 mg/kg.' },
    { agent: 'Ketamine (IM GA)', dose: '5-8 mg/kg', max: null, note: 'IM general anesthesia. Add midaz 0.1-0.15 mg/kg.' },
    { agent: 'Ketamine (IV Induction)', dose: '2 mg/kg', max: null, note: 'IV induction.' },
    { agent: 'Ketamine (IV Analgesia)', dose: '0.25-0.5 mg/kg', max: null, note: 'IV sub-dissociative analgesia.' },

    // (Ketazolam PO mix is rendered separately by useSedationMix() in SedationCard.)

    // --- Midazolam routes ---
    { agent: 'Midazolam (Oral)', dose: '0.5-1 mg/kg', max: 20, note: 'Mix w/ acetaminophen syrup 10-15 mg/kg for palatability.' },
    { agent: 'Midazolam (Rectal)', dose: '0.5-1 mg/kg', max: null, note: 'Most practical up to 18 mo. 10 mL syringe + lubricated 14F suction catheter.',
        ageRules: [
            { maxMonths: 18, badge: 'info', label: 'Optimal age window (≤18 months) for rectal route' },
            { minMonths: 18, badge: 'caution', label: '>18 months — older children typically refuse PR; consider PO/IN.' }
        ]
    },
    { agent: 'Midazolam (Nasal)', dose: '0.2-0.3 mg/kg', max: null, note: 'Can be irritating.' },
    { agent: 'Midazolam (IV)', dose: '0.05-0.1 mg/kg', max: null, note: 'Increments.' },

    // --- Barbiturate ---
    { agent: 'Pentobarbital (IM/PO)', dose: '2-6 mg/kg', max: 200, note: 'IM/PO.' },
    { agent: 'Pentobarbital (IV)', dose: '1-3 mg/kg', max: null, note: 'IV titrate.' },
];
