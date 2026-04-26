// Pre-induction setup checklist for the cardiac OR.
// Sourced from NCH "Cardiac Anesthesia Rotation Guide" (2020-08-01).
//
// Each entry has:
//   key:     stable id used for localStorage of completion state
//   group:   'rescue' | 'maintenance' | 'monitors' | 'other'
//   label:   human-readable name
//   conc:    standard preparation concentration (string)
//   note:    short clinical note
//   compute(weight): optional function producing { syringe, doseRange } based
//                   on weight (only for items where size depends on weight)

export const computeCaClSyringe = (weight) => {
    const w = parseFloat(weight) || 0;
    if (w <= 0) return { syringe: '?', notes: 'Enter weight' };
    if (w <= 5)  return { syringe: 'TB syringe (1 mL)', notes: 'Neonate — TB syringe; CaCl 100 mg/mL' };
    if (w <= 10) return { syringe: '3 mL syringe', notes: 'Infant — 3 mL syringe' };
    return { syringe: '3-5 mL syringe', notes: '3-5 mL syringe; CaCl 100 mg/mL' };
};

export const computePhenylephrineSyringes = (weight) => {
    const w = parseFloat(weight) || 0;
    if (w <= 30) return { dilute: '2-3 syringes', strength: '10 mcg/mL (dilute)', notes: 'Patient ≤30 kg → multiple dilute syringes for RAP/VAP' };
    return { dilute: '1 syringe (full + dilute)', strength: '100 mcg/mL + 10 mcg/mL', notes: 'Larger patient → full strength 100 mcg/mL primary' };
};

export const setupChecklist = [
    // ---- Rescue drugs ----
    {
        key: 'epi-full',
        group: 'rescue',
        label: 'Epinephrine — full strength',
        conc: '10 mcg/mL',
        note: 'Bolus emergencies'
    },
    {
        key: 'epi-dilute',
        group: 'rescue',
        label: 'Epinephrine — dilute',
        conc: '1 mcg/mL',
        note: 'Special label — yellow/red tape recommended for fast identification'
    },
    {
        key: 'phenyl-full',
        group: 'rescue',
        label: 'Phenylephrine — full strength',
        conc: '100 mcg/mL',
        note: 'Bigger patients — preferred when ≥30 kg'
    },
    {
        key: 'phenyl-dilute',
        group: 'rescue',
        label: 'Phenylephrine — dilute',
        conc: '10 mcg/mL',
        note: '≤30 kg → 2-3 syringes for RAP/VAP',
        compute: computePhenylephrineSyringes
    },
    {
        key: 'cacl',
        group: 'rescue',
        label: 'Calcium Chloride',
        conc: '100 mg/mL',
        note: 'Sized to patient weight',
        compute: computeCaClSyringe
    },
    {
        key: 'atropine',
        group: 'rescue',
        label: 'Atropine (optional)',
        conc: '0.1 mg/mL or 0.4 mg/mL',
        note: 'Useful for bradycardia / vagal events; minimum 0.1 mg dose'
    },

    // ---- Maintenance drugs ----
    {
        key: 'paralytic',
        group: 'maintenance',
        label: 'Paralytic — at least 2 doses',
        conc: 'attending preference',
        note: '1 for induction, 1 for line completion / TEE placement'
    },
    {
        key: 'opioid',
        group: 'maintenance',
        label: 'Opioid (Fentanyl)',
        conc: 'standard',
        note: '10-15 mcg/kg total between induction and incision (NCH default)'
    },
    {
        key: 'heparin',
        group: 'maintenance',
        label: 'Heparin',
        conc: 'see anticoagulation card',
        note: 'NCH HMS-driven OR U of M weight formula. Always confirm dose + read back.'
    },
    {
        key: 'txa',
        group: 'maintenance',
        label: 'Tranexamic Acid (TXA)',
        conc: 'standard',
        note: '20 mg/kg up to 1 g pre-incision + post-protamine; 3rd dose by perfusion on bypass'
    },
    {
        key: 'cefazolin',
        group: 'maintenance',
        label: 'Cefazolin',
        conc: '50 mg/kg up to 2 g',
        note: 'Within 30 min of incision; redose q3h'
    },

    // ---- Monitors ----
    {
        key: 'spo2-x2',
        group: 'monitors',
        label: 'SpO2 monitor ×2',
        conc: '',
        note: 'Massimo probe in glass cabinet'
    },
    {
        key: 'bis',
        group: 'monitors',
        label: 'BIS monitor',
        conc: '',
        note: 'For adult/teenager cases'
    },
    {
        key: 'nirs',
        group: 'monitors',
        label: 'NIRS — set up by perfusion',
        conc: '',
        note: 'On room air, prior to induction'
    },

    // ---- Other ----
    {
        key: 'ivf-pump',
        group: 'other',
        label: 'IV fluids on infusion pump',
        conc: '',
        note: '5 mL/hr rate, max 10 mL/kg "volume to be infused" — caps any inadvertent bolus'
    },
    {
        key: 'taping',
        group: 'other',
        label: 'Syringe taping (longitudinal + circumferential)',
        conc: '',
        note: 'Same drug, same place, every time. Yellow/red tape on dilute epi.'
    }
];

export const groupLabels = {
    rescue: 'Rescue drugs',
    maintenance: 'Maintenance drugs',
    monitors: 'Monitors',
    other: 'Setup'
};
