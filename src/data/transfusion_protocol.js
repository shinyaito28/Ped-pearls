// NCH Transfusion Protocol 2.0 — institutional pediatric cardiac protocol.
// Complementary to the ROTEM-driven recommendations: this is the recipe-based
// protocol; ROTEM is the assay-driven counterpart. Show both side by side so
// the operator can cross-check.
//
// The original document mixes two orthogonal concepts:
//   1. PROCEDURE — neonate / Ao Arch / Arterial Switch / Norwood / Comp.II are
//      classified high-risk. They get the post-CPB product recipe (Plt 20-40
//      mL/kg, Cryo 10-15, FFP 5-10) and benefit from blood prime if <3 kg.
//   2. ATTENDING TXA PRACTICE — some attendings give TXA in every case; others
//      give it selectively (only for the high-risk procedures above). The
//      document encodes this as surgeon initials but those are not exposed
//      here; the operator picks "Routine" or "Selective" from a toggle.

// --- Procedure list ---------------------------------------------------------
export const procedureTypes = [
    { id: 'neonate', label: 'Neonate (any cardiac case)',           highRisk: true },
    { id: 'aoarch',  label: 'Aortic arch repair',                   highRisk: true },
    { id: 'switch',  label: 'Arterial switch',                      highRisk: true },
    { id: 'norwood', label: 'Norwood',                              highRisk: true },
    { id: 'comp2',   label: 'Comprehensive II (Hybrid stage 2)',    highRisk: true },
    { id: 'other',   label: 'Other / lower-risk procedure',         highRisk: false }
];

// --- Attending TXA practice -------------------------------------------------
export const txaPracticeOptions = [
    { id: 'routine',   label: 'Routine — TXA in every case',        description: 'Standard institutional practice for most attendings.' },
    { id: 'selective', label: 'Selective — TXA only for high-risk', description: 'Some attendings give TXA only for neonate / Ao arch / arterial switch / Norwood / Comp.II.' }
];

// --- TXA dose ---------------------------------------------------------------
// 20 mg/kg up to 1 g, given pre-incision + after protamine + 3rd dose by
// perfusion while on bypass.
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

// Decide whether TXA is indicated for the current case.
//   procedureId   — one of procedureTypes[].id
//   txaPractice   — 'routine' | 'selective'
//   weight (kg)   — for the actual dose
export const txaIndication = ({ procedureId, txaPractice, weight }) => {
    const proc = procedureTypes.find(p => p.id === procedureId) || procedureTypes[procedureTypes.length - 1];
    const indicated = txaPractice === 'routine' ? true : proc.highRisk;
    return {
        indicated,
        rationale: indicated
            ? (txaPractice === 'routine'
                ? 'Routine TXA practice — give for every case.'
                : `${proc.label} is high-risk — TXA indicated.`)
            : `${proc.label} is not high-risk and attending uses TXA selectively — skip TXA.`,
        dose: indicated ? txaDose(weight) : null
    };
};

// --- Blood prime <3 kg ------------------------------------------------------
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

// --- Post-CPB high-risk product recipe -------------------------------------
// Round 1 + Round 2 (same volumes). Rescue Factor VII if no clot after round 2.
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

// --- Filter rules (Pall 40 µm) ---------------------------------------------
export const filterReminders = [
    'ANH: administered via anesthesia blood tubing — NOT through 40 µm Pall (orange) filter',
    'FFP & Platelets (post-CPB): same — anesthesia blood tubing, not Pall filter',
    'PRBCs / cell saver: standard 40 µm filter is fine'
];

// --- Top-level resolver -----------------------------------------------------
export const buildTransfusionPlan = ({ weight, procedureId, txaPractice = 'routine' }) => {
    const proc = procedureTypes.find(p => p.id === procedureId) || procedureTypes[procedureTypes.length - 1];
    const txa = txaIndication({ procedureId, txaPractice, weight });
    const prime = bloodPrimePlan(weight);
    const products = proc.highRisk ? postCpbProductsHighRisk(weight) : null;

    return {
        procedure: proc,
        txa,
        prime,
        products,
        filterReminders
    };
};
