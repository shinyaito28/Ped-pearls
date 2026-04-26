// NCH Transfusion Protocol 2.0 — institutional pediatric cardiac protocol.
// Complementary to the ROTEM-driven recommendations: this is the recipe-based
// protocol; ROTEM is the assay-driven counterpart. Show both side by side so
// the operator can cross-check.

// TXA case categories. Each maps to the indication classification per the
// Transfusion Protocol document.
export const txaCaseTypes = [
    { id: 'neonate', label: 'Neonate (any cardiac case)', highRisk: true },
    { id: 'aoarch',  label: 'Aortic arch repair',           highRisk: true },
    { id: 'switch',  label: 'Arterial switch',              highRisk: true },
    { id: 'norwood', label: 'Norwood',                      highRisk: true },
    { id: 'comp2',   label: 'Comprehensive II (Hybrid stage 2)', highRisk: true },
    { id: 'pm',      label: 'PM (post-CPB management)',     highRisk: false },
    { id: 'sc',      label: 'SC',                           highRisk: false },
    { id: 'ts',      label: 'TS',                           highRisk: false },
    { id: 'other',   label: 'Other (non-listed)',           highRisk: false }
];

// TXA dose: 20 mg/kg up to 1 g pre-incision; same after protamine; 3rd dose
// administered by perfusion while on bypass.
export const txaDose = (weight) => {
    const w = parseFloat(weight) || 0;
    const dose = Math.min(w * 20, 1000);
    return {
        dose,
        perKg: 20,
        capped: w * 20 > 1000,
        cap: 1000,
        timing: ['Pre-incision', 'After protamine', '3rd dose by perfusion on bypass']
    };
};

// Blood prime (<3 kg). 20 mL/kg FFP in prime + 20 mL/kg FFP during warming.
export const bloodPrimePlan = (weight) => {
    const w = parseFloat(weight) || 0;
    if (w <= 0 || w >= 3) return { eligible: false };
    return {
        eligible: true,
        primeFFPmL: w * 20,
        warmingFFPmL: w * 20,
        notes: 'Patient <3 kg: blood prime + 20 mL/kg FFP during warming'
    };
};

// Post-CPB high-risk neonate transfusion plan — round 1 + round 2 (same).
export const postCpbProductsHighRisk = (weight) => {
    const w = parseFloat(weight) || 0;
    return {
        platelets: { perKgLow: 20, perKgHigh: 40, mLLow: w * 20, mLHigh: w * 40 },
        cryo:      { perKgLow: 10, perKgHigh: 15, mLLow: w * 10, mLHigh: w * 15 },
        ffp:       { perKgLow: 5,  perKgHigh: 10, mLLow: w * 5,  mLHigh: w * 10 },
        rounds: 'Round 1 + Round 2 (same volumes)',
        rescueAfterRound2: {
            product: 'Activated factor VII',
            perKgMcg: 90,
            totalMcg: w * 90,
            indication: 'No discernable clot after round 2'
        }
    };
};

// Filter rule reminder.
export const filterReminders = [
    'ANH: administered via anesthesia blood tubing — NOT through 40 µm Pall (orange) filter',
    'FFP & Platelets (post-CPB): same — anesthesia blood tubing, not Pall filter',
    'PRBCs / cell saver: standard 40 µm filter is fine'
];

// Resolver: classify a case + return a plan summary.
export const buildTransfusionPlan = ({ weight, caseTypeId }) => {
    const txa = txaDose(weight);
    const caseType = txaCaseTypes.find(c => c.id === caseTypeId) || txaCaseTypes[txaCaseTypes.length - 1];
    const prime = bloodPrimePlan(weight);
    const products = caseType.highRisk ? postCpbProductsHighRisk(weight) : null;

    return {
        caseType,
        txa,
        prime,
        products,
        filterReminders
    };
};
