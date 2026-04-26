// Cardiac OR timeline + TRAVEL pneumonic.
// Sourced from NCH "Cardiac Anesthesia Rotation Guide" (2020-08-01).
// Each phase has a list of action items; checkboxes are persisted in
// localStorage by `key`.

export const timelinePhases = [
    {
        id: 'pre-incision',
        title: 'Pre-incision',
        steps: [
            { key: 'aline',         label: 'A-line placed (sterile, 24G→22G upsize on Cook 0.015 wire for neonate)' },
            { key: 'abg-anh',       label: 'ABG drawn → perfusion decides on ANH' },
            { key: 'cvl',           label: 'CVL placed (5 cm only smallest neonates; Dr. Carrillo prefers 8 cm)' },
            { key: 'tee',           label: 'Cardiology called for TEE before prep/drape' },
            { key: 'paralytic',     label: 'Paralytic redose' },
            { key: 'opioid-extra',  label: 'Additional opioid added' },
            { key: 'precedex',      label: 'Precedex drip started (with/without bolus)' },
            { key: 'txa-pre',       label: 'TXA 20 mg/kg up to 1 g administered' },
            { key: 'cefazolin',     label: 'Cefazolin given (within 30 min of incision; time to surgeon entering room)' }
        ]
    },
    {
        id: 'cannula',
        title: 'Cannula placement',
        steps: [
            { key: 'stay-sutures',  label: 'Stay sutures in place' },
            { key: 'heparin',       label: 'Heparin given (or surgeon gives if no CVL); read back dose + volume' },
            { key: 'act-abg',       label: 'ACT/ABG drawn (before aortic cannula placement)' }
        ]
    },
    {
        id: 'rap-vap',
        title: 'RAP / VAP',
        steps: [
            { key: 'phenyl-ready',  label: '2-3 phenylephrine syringes ready' },
            { key: 'flush-ready',   label: 'Several flushes ready' },
            { key: 'manual-flush',  label: 'Small CVL? prepare for manual flush via 6-inch extension' }
        ]
    },
    {
        id: 'cpb',
        title: 'On CPB',
        steps: [
            { key: 'milrinone-prep',    label: 'Milrinone tubing primed; 25 mcg/kg load drawn for perfusion' },
            { key: 'mg-prep',           label: 'Magnesium 50 mg/kg drawn (omit if Del Nido per attending)' },
            { key: 'ra-trifold',        label: 'RA-line trifold prepared if RA lines planned' },
            { key: 'pca-nca',           label: 'PCA / NCA ordered (or pain team contacted)' },
            { key: 'antibiotic-redose', label: 'Antibiotic redose handed to perfusion if needed' }
        ]
    },
    {
        id: 'off-bypass',
        title: 'Coming off bypass',
        steps: [
            { key: 'rewarm',        label: 'Surgeon tells perfusion to rewarm — call attending if not in room' },
            { key: 'milrinone-on',  label: 'Milrinone started after perfusion administers loading dose' },
            { key: 'travel-check',  label: 'TRAVEL pneumonic complete (see widget)' },
            { key: 'muf',           label: 'MUF initiated (neonates / infants / small children)' },
            { key: 'protamine',     label: 'Protamine via peripheral IV, 1:1 saline dilution, 20 mL/hr carrier' },
            { key: 'txa-post',      label: 'TXA 2nd dose after protamine' },
            { key: 'anh',           label: 'ANH first, then other products as needed' },
            { key: 'hemobag',       label: 'If "hemobag" used (teen+) → +50 mg protamine' },
            { key: 'abg-post',      label: 'ABG drawn after protamine + ANH/cell saver in' },
            { key: 'apap',          label: 'IV acetaminophen at sternal closure (document time for ICU!)' }
        ]
    },
    {
        id: 'transport',
        title: 'Transport to CTICU',
        steps: [
            { key: 'monitors',      label: 'Transport monitors on patient at all times' },
            { key: 'volume-line',   label: 'At least one line infusing fluid (volume to bolus available)' },
            { key: 'albumin',       label: 'Albumin in pocket: 50 mL bottle (neonate/infant) or 250 mL bag (older)' },
            { key: 'bag-mask',      label: 'Bag, mask, transport circuit available — even if NC' },
            { key: 'resus-drugs',   label: 'Resuscitation + intubation drugs and equipment (blade, ETT, oral airway, stylet)' },
            { key: 'signout',       label: 'Sign-out form completed' }
        ]
    }
];

// TRAVEL pneumonic — required checks before separating from bypass.
export const travelChecklist = [
    {
        key: 'T',
        letter: 'T',
        title: 'Temperature',
        detail: 'Adequate rewarming (avoid hyperthermia, target ~36-37°C core)'
    },
    {
        key: 'R',
        letter: 'R',
        title: 'Rhythm',
        detail: 'Sinus rhythm (or paced) at appropriate rate; rule out heart block'
    },
    {
        key: 'A',
        letter: 'A',
        title: 'Air on TEE',
        detail: 'TEE confirms no intracardiac air; deair maneuvers complete'
    },
    {
        key: 'V',
        letter: 'V',
        title: 'Ventilation',
        detail: 'Acceptable TV / PIP / FiO2 set; lungs recruited; ETT clear'
    },
    {
        key: 'E',
        letter: 'E',
        title: 'Electrolytes',
        detail: 'Warm ABG with normal K, iCa, glucose, lactate; acid-base reasonable'
    },
    {
        key: 'L',
        letter: 'L',
        title: 'table Level',
        detail: 'OR table level so transducers read correctly; zero CVP/A-line'
    }
];
