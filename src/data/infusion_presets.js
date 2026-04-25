// Standard infusion concentrations for pediatric anesthesia / PICU.
// Default concentrations follow common Nationwide Children's / institutional defaults
// but the InfusionCalcCard lets the user override `concentration` for any drug.

// `unit`: 'mcg/kg/min' | 'mcg/kg/hr' | 'mg/kg/hr' | 'units/kg/hr' | 'mU/kg/min'
// `concUnit`: 'mcg/mL' | 'mg/mL' | 'U/mL' | 'mU/mL'

export const infusionPresets = [
    // --- Vasopressors / Inotropes ---
    { drug: 'Epinephrine',        cat: 'Vasopressor', unit: 'mcg/kg/min', concentration: 16,   concUnit: 'mcg/mL', defaultDose: 0.05, doseRange: [0.02, 1],   note: '4 mg in 250 mL = 16 mcg/mL.' },
    { drug: 'Norepinephrine',     cat: 'Vasopressor', unit: 'mcg/kg/min', concentration: 16,   concUnit: 'mcg/mL', defaultDose: 0.05, doseRange: [0.05, 1],   note: '4 mg in 250 mL = 16 mcg/mL.' },
    { drug: 'Phenylephrine',      cat: 'Vasopressor', unit: 'mcg/kg/min', concentration: 100,  concUnit: 'mcg/mL', defaultDose: 1,    doseRange: [0.5, 20],   note: '10 mg in 100 mL = 100 mcg/mL.' },
    { drug: 'Vasopressin',        cat: 'Vasopressor', unit: 'mU/kg/min',  concentration: 0.4,  concUnit: 'U/mL',   defaultDose: 0.5,  doseRange: [0.3, 2],    note: '20 U in 50 mL = 0.4 U/mL = 400 mU/mL.' },
    { drug: 'Dopamine',           cat: 'Inotrope',    unit: 'mcg/kg/min', concentration: 1600, concUnit: 'mcg/mL', defaultDose: 5,    doseRange: [2, 20],     note: '400 mg in 250 mL = 1600 mcg/mL.' },
    { drug: 'Dobutamine',         cat: 'Inotrope',    unit: 'mcg/kg/min', concentration: 1000, concUnit: 'mcg/mL', defaultDose: 5,    doseRange: [2, 20],     note: '250 mg in 250 mL = 1000 mcg/mL.' },
    { drug: 'Milrinone',          cat: 'Inotrope',    unit: 'mcg/kg/min', concentration: 200,  concUnit: 'mcg/mL', defaultDose: 0.5,  doseRange: [0.25, 0.75],note: '20 mg in 100 mL = 200 mcg/mL.' },
    { drug: 'Isoproterenol',      cat: 'Inotrope',    unit: 'mcg/kg/min', concentration: 4,    concUnit: 'mcg/mL', defaultDose: 0.05, doseRange: [0.05, 10],  note: '1 mg in 250 mL = 4 mcg/mL.' },

    // --- Vasodilators ---
    { drug: 'Nitroglycerine',     cat: 'Vasodilator', unit: 'mcg/kg/min', concentration: 100,  concUnit: 'mcg/mL', defaultDose: 1,    doseRange: [0.5, 20],   note: '50 mg in 500 mL = 100 mcg/mL.' },
    { drug: 'Nitroprusside',      cat: 'Vasodilator', unit: 'mcg/kg/min', concentration: 200,  concUnit: 'mcg/mL', defaultDose: 1,    doseRange: [0.5, 10],   note: '50 mg in 250 mL = 200 mcg/mL. Watch cyanide.' },
    { drug: 'Nicardipine',        cat: 'Vasodilator', unit: 'mcg/kg/min', concentration: 100,  concUnit: 'mcg/mL', defaultDose: 1,    doseRange: [1, 5],      note: '25 mg in 250 mL = 100 mcg/mL.' },
    { drug: 'Clevidipine',        cat: 'Vasodilator', unit: 'mcg/kg/min', concentration: 500,  concUnit: 'mcg/mL', defaultDose: 1,    doseRange: [0.5, 5],    note: 'Lipid emulsion 0.5 mg/mL.' },
    { drug: 'PGE1',               cat: 'Vasodilator', unit: 'mcg/kg/min', concentration: 20,   concUnit: 'mcg/mL', defaultDose: 0.05, doseRange: [0.05, 0.1], note: '500 mcg in 25 mL = 20 mcg/mL. Watch apnea.' },

    // --- Beta-blocker ---
    { drug: 'Esmolol',            cat: 'Beta-blocker', unit: 'mcg/kg/min', concentration: 10000, concUnit: 'mcg/mL', defaultDose: 50, doseRange: [25, 300],   note: '2.5 g in 250 mL = 10 mg/mL = 10,000 mcg/mL.' },

    // --- Sedation / Analgesia (TIVA standards) ---
    { drug: 'Propofol',           cat: 'Sedation',    unit: 'mcg/kg/min', concentration: 10000, concUnit: 'mcg/mL', defaultDose: 100, doseRange: [75, 300],   note: '10 mg/mL (1%) — TIVA standard.' },
    { drug: 'Dexmedetomidine',    cat: 'Sedation',    unit: 'mcg/kg/hr',  concentration: 4,    concUnit: 'mcg/mL', defaultDose: 0.5,  doseRange: [0.2, 1],    note: '200 mcg in 50 mL = 4 mcg/mL.' },
    { drug: 'Ketamine',           cat: 'Sedation',    unit: 'mg/kg/hr',   concentration: 1,    concUnit: 'mg/mL',  defaultDose: 0.5,  doseRange: [0.25, 2],   note: '100 mg in 100 mL = 1 mg/mL.' },
    { drug: 'Remifentanil',       cat: 'Sedation',    unit: 'mcg/kg/min', concentration: 50,   concUnit: 'mcg/mL', defaultDose: 0.1,  doseRange: [0.02, 0.8], note: '2 mg in 40 mL = 50 mcg/mL.' },
    { drug: 'Fentanyl',           cat: 'Analgesia',   unit: 'mcg/kg/hr',  concentration: 10,   concUnit: 'mcg/mL', defaultDose: 2,    doseRange: [1, 5],      note: '500 mcg in 50 mL = 10 mcg/mL.' },
    { drug: 'Morphine',           cat: 'Analgesia',   unit: 'mcg/kg/hr',  concentration: 100,  concUnit: 'mcg/mL', defaultDose: 20,   doseRange: [10, 40],    note: '5 mg in 50 mL = 100 mcg/mL.' },

    // --- NMB infusions ---
    { drug: 'Rocuronium',         cat: 'NMB',          unit: 'mcg/kg/min', concentration: 1000, concUnit: 'mcg/mL', defaultDose: 8,   doseRange: [4, 16],     note: '50 mg in 50 mL = 1 mg/mL = 1000 mcg/mL.' },
    { drug: 'Vecuronium',         cat: 'NMB',          unit: 'mcg/kg/min', concentration: 100,  concUnit: 'mcg/mL', defaultDose: 1.5, doseRange: [0.8, 4.2],   note: '10 mg in 100 mL = 100 mcg/mL.' },
    { drug: 'Cis-Atracurium',     cat: 'NMB',          unit: 'mcg/kg/min', concentration: 2000, concUnit: 'mcg/mL', defaultDose: 2,   doseRange: [1, 4],      note: '20 mg in 10 mL = 2 mg/mL.' },

    // --- Antiarrhythmic ---
    { drug: 'Lidocaine',          cat: 'Antiarrhythmic', unit: 'mcg/kg/min', concentration: 8000, concUnit: 'mcg/mL', defaultDose: 30, doseRange: [10, 50], note: '2 g in 250 mL = 8 mg/mL.' },
    { drug: 'Amiodarone',         cat: 'Antiarrhythmic', unit: 'mcg/kg/min', concentration: 1800, concUnit: 'mcg/mL', defaultDose: 10, doseRange: [5, 15],  note: '450 mg in 250 mL = 1.8 mg/mL.' },
    { drug: 'Procainamide',       cat: 'Antiarrhythmic', unit: 'mcg/kg/min', concentration: 4000, concUnit: 'mcg/mL', defaultDose: 30, doseRange: [20, 80], note: '2 g in 500 mL = 4 mg/mL.' },

    // --- Other ---
    { drug: 'Heparin',            cat: 'Anticoag',     unit: 'units/kg/hr', concentration: 100, concUnit: 'U/mL',   defaultDose: 20, doseRange: [10, 25],   note: '25,000 U in 250 mL = 100 U/mL.' },
    { drug: 'Insulin',            cat: 'Endo',         unit: 'units/kg/hr', concentration: 1,   concUnit: 'U/mL',   defaultDose: 0.1, doseRange: [0.05, 0.2], note: '100 U in 100 mL = 1 U/mL.' },
    { drug: 'Furosemide',         cat: 'Other',        unit: 'mg/kg/hr',    concentration: 10,  concUnit: 'mg/mL',  defaultDose: 0.2, doseRange: [0.1, 0.4], note: '100 mg in 10 mL = 10 mg/mL.' },
    { drug: 'Tranexamic Acid',    cat: 'Other',        unit: 'mg/kg/hr',    concentration: 100, concUnit: 'mg/mL',  defaultDose: 5,   doseRange: [5, 10],    note: '1 g in 10 mL = 100 mg/mL.' },
];

// Convert any infusion to mL/hr for syringe pump.
// dose * weight * timeFactor / concentration_in_drug_units
//   timeFactor for /min units is 60 (to get hr), 1 for /hr units.
export const calcInfusionMlPerHr = (dose, weight, concentration, unit) => {
    if (!dose || !weight || !concentration) return 0;
    const timeFactor = unit.endsWith('/min') ? 60 : 1;
    return (dose * weight * timeFactor) / concentration;
};

// Convert mL/hr back to dose.
export const calcDoseFromMlPerHr = (mlPerHr, weight, concentration, unit) => {
    if (!mlPerHr || !weight || !concentration) return 0;
    const timeFactor = unit.endsWith('/min') ? 60 : 1;
    return (mlPerHr * concentration) / (weight * timeFactor);
};
