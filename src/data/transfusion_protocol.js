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
    { id: 'neonate', label: 'Neonate (any cardiac case)',         labelJa: '新生児(任意の心臓症例)',         highRisk: true },
    { id: 'aoarch',  label: 'Aortic arch repair',                 labelJa: '大動脈弓形成',                   highRisk: true },
    { id: 'switch',  label: 'Arterial switch',                    labelJa: '動脈スイッチ',                   highRisk: true },
    { id: 'norwood', label: 'Norwood',                            labelJa: 'Norwood',                        highRisk: true },
    { id: 'comp2',   label: 'Comprehensive II (Hybrid stage 2)',  labelJa: 'Comprehensive II (Hybrid 第 2 期)', highRisk: true },
    { id: 'other',   label: 'Other / lower-risk procedure',       labelJa: 'その他 / 低リスク手技',          highRisk: false }
];

// --- Attending TXA practice -------------------------------------------------
export const txaPracticeOptions = [
    { id: 'routine',   label: 'Routine — TXA in every case',        labelJa: 'ルーチン — 全症例で TXA',        description: 'Standard institutional practice for most attendings.', descriptionJa: '大半の主治医での標準的施設プラクティス。' },
    { id: 'selective', label: 'Selective — TXA only for high-risk', labelJa: '選択的 — 高リスクのみ TXA',     description: 'Some attendings give TXA only for neonate / Ao arch / arterial switch / Norwood / Comp.II.', descriptionJa: '一部の主治医は新生児 / 大動脈弓 / 動脈スイッチ / Norwood / Comp.II のみで TXA 投与。' }
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
        timing: ['Pre-incision', 'After protamine', '3rd dose by perfusion on bypass'],
        timingJa: ['切開前', 'プロタミン後', 'バイパス中の 3 回目は灌流士']
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
        rationaleJa: indicated
            ? (txaPractice === 'routine'
                ? 'ルーチンの TXA プラクティス — 全症例で投与。'
                : `${proc.labelJa} は高リスク — TXA 適応。`)
            : `${proc.labelJa} は高リスクではなく、主治医は選択的 TXA — スキップ。`,
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
        notes: 'Patient <3 kg: blood prime + 20 mL/kg FFP during warming',
        notesJa: '患者 <3 kg: 血液プライム + 加温中に FFP 20 mL/kg'
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
        roundsJa: 'Round 1 + Round 2(同量)',
        rescueAfterRound2: {
            product: 'Activated factor VII',
            productJa: '活性化第 VII 因子',
            perKgMcg: 90,
            totalMcg: w * 90,
            indication: 'No discernable clot after round 2',
            indicationJa: 'Round 2 後も判別できる凝塊が形成されない'
        }
    };
};

// --- Filter rules (Pall 40 µm) ---------------------------------------------
export const filterReminders = [
    'ANH: administered via anesthesia blood tubing — NOT through 40 µm Pall (orange) filter',
    'FFP & Platelets (post-CPB): same — anesthesia blood tubing, not Pall filter',
    'PRBCs / cell saver: standard 40 µm filter is fine'
];

export const filterRemindersJa = [
    'ANH: 麻酔用血液チューブから投与 — 40 µm Pall(オレンジ)フィルターを通さない',
    'FFP + 血小板(CPB 後): 同じく — 麻酔用血液チューブ、Pall フィルター不可',
    'PRBC / セルセーバー: 標準 40 µm フィルターで可'
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
        filterReminders,
        filterRemindersJa
    };
};
