// Source: Pediatric Anesthesia Pearls 2021, "Standard Cart Drugs" panel (image IMG_0065).

export const standardCartDrugs = [
    { n: 1, drug: 'Propofol', detail: '10 mg/mL (1%) for induction & infusion.' },
    { n: 2, drug: 'Atropine + Succinylcholine syringes', detail: 'Drawn-up syringes with a 22 g needle ready for IM if no IV.' },
    { n: 3, drug: 'Paralytic of choice', detail: 'Rocuronium or vecuronium.' },
    { n: 4, drug: 'Epinephrine', detail: '10 mcg/mL AND 100 mcg/mL ready (different concentrations for vasopressor vs arrest).' },
    { n: 5, drug: 'Fentanyl', detail: '10 mcg/mL for patients < 25 kg (avoids dosing errors).' }
];

export const standardCartTips = [
    'Use 1 mL or 3 mL syringes for infants — drawing volumes < 0.1 mL is unreliable in 10 mL syringes.',
    'Label every syringe (drug name + concentration) immediately after drawing up.',
    'Check expiration dates on each shift; restock after every case.'
];

export const standardCartAntibiotics = [
    { drug: 'Ampicillin',          dose: '50 mg/kg',  max: '2 g',     neonate: '50 mg/kg',  freq: 'q3h (q6h <37wk PCA)' },
    { drug: 'Ampicillin/Sulbactam',dose: '50 mg/kg',  max: '2 g',     neonate: '50 mg/kg',  freq: 'q3h (q6h <37wk PCA)' },
    { drug: 'Cefazolin',           dose: '50 mg/kg',  max: '2 g',     neonate: '25 mg/kg',  freq: 'q3h (q6h <37wk PCA)' },
    { drug: 'Cefoxitin',           dose: '40 mg/kg',  max: '2 g',     neonate: '30 mg/kg',  freq: 'q3h (q6h <37wk PCA)' },
    { drug: 'Ceftriaxone',         dose: '50 mg/kg',  max: '2 g',     neonate: 'NEVER <30 days', freq: 'q24h' },
    { drug: 'Ciprofloxacin',       dose: '10 mg/kg',  max: '400 mg',  neonate: '10 mg/kg',  freq: 'q6h (q6h <37wk PCA)' },
    { drug: 'Clindamycin',         dose: '20 mg/kg',  max: '900 mg',  neonate: '10 mg/kg',  freq: 'q3h (q6h <37wk PCA), redose 10 mg/kg' },
    { drug: 'Piperacillin/Tazo',   dose: '100 mg/kg', max: '4 g',     neonate: '100 mg/kg', freq: 'q3h (q6h <37wk PCA)' },
    { drug: 'Gentamicin',          dose: '5 mg/kg',   max: '—',       neonate: '5 mg/kg',   freq: 'q24h (q36h <37wk PCA)' },
    { drug: 'Metronidazole',       dose: '15 mg/kg',  max: '1 g',     neonate: '7.5 mg/kg', freq: 'q6h (q12h <37wk PCA)' },
    { drug: 'Nafcillin',           dose: '50 mg/kg',  max: '2 g',     neonate: '25 mg/kg',  freq: 'q3h (q6h <37wk PCA)' },
    { drug: 'Vancomycin',          dose: '20 mg/kg',  max: '—',       neonate: '15 mg/kg',  freq: 'q6h (q12h <37wk PCA)' }
];
