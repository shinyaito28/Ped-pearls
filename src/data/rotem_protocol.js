// ROTEM-guided blood product management for neonatal post-bypass bleeding.
// Source: user-provided institutional "Anesthesia Guide to Blood Product
// Management for Post-Bypass Bleeding in Neonates".
//
// Two phases:
//   • CPB phase    — drawn during rewarm + after 2nd FFP 20 mL/kg.
//                    Run HEPTEM + FIBTEM. Heparin is on board, so HEPTEM
//                    (heparinase) is the relevant CT/CFT/MCF assay.
//   • Post-CPB phase — drawn after protamine + products + ANH.
//                    Run EXTEM + FIBTEM. Heparin reversed, so EXTEM is the
//                    relevant assay.
//
// All resolver functions below are pure (no React, no hooks) so they can be
// imported in tests as well as in the calc hook.

// ---------------------------------------------------------------------------
// Static reference content
// ---------------------------------------------------------------------------

export const preparation = [
    { item: 'PRBCs', itemJa: 'PRBC', detail: '2 units, split larger unit into two', detailJa: '2 単位、大きい単位は 2 つに分割' },
    { item: 'FFP',   itemJa: 'FFP',  detail: 'Two orders of 20 mL/kg',              detailJa: '20 mL/kg を 2 オーダー' }
];

// Each phase declares the inputs the user is asked for, with a slider range
// and a list of named threshold breakpoints. The CardiacRotemCard reads these
// to render sliders with coloured zones.
export const cpbInputs = [
    {
        id: 'heptemCT',
        label: 'HEPTEM CT',
        unit: 'sec',
        min: 100,
        max: 500,
        step: 5,
        default: 200,
        // Threshold direction: 'over' = intervention triggered when value > threshold
        thresholds: [{ at: 240, direction: 'over', meaning: 'Kcentra trigger', meaningJa: 'Kcentra トリガー' }]
    },
    {
        id: 'heptemCFT',
        label: 'HEPTEM CFT',
        unit: 'sec',
        min: 50,
        max: 300,
        step: 5,
        default: 90,
        thresholds: [{ at: 110, direction: 'over', meaning: 'Kcentra trigger', meaningJa: 'Kcentra トリガー' }]
    },
    {
        id: 'heptemMCF',
        label: 'HEPTEM MCF',
        unit: 'mm',
        min: 0,
        max: 80,
        step: 1,
        default: 55,
        thresholds: [{ at: 50, direction: 'under', meaning: 'Platelets goal', meaningJa: '血小板目標' }]
    },
    {
        id: 'fibtemMCF',
        label: 'FIBTEM MCF',
        unit: 'mm',
        min: 0,
        max: 25,
        step: 1,
        default: 12,
        thresholds: [{ at: 9, direction: 'under', meaning: 'Cryo goal', meaningJa: 'クリオ目標' }]
    }
];

export const postCpbInputs = [
    {
        id: 'extemCT',
        label: 'EXTEM CT',
        unit: 'sec',
        min: 50,
        max: 250,
        step: 1,
        default: 80,
        thresholds: [{ at: 111, direction: 'over', meaning: 'FFP / Kcentra', meaningJa: 'FFP / Kcentra' }]
    },
    {
        id: 'a10extem',
        label: 'A10 EXTEM',
        unit: 'mm',
        min: 0,
        max: 70,
        step: 1,
        default: 42,
        thresholds: [{ at: 38, direction: 'under', meaning: 'Intervention triggered', meaningJa: '介入トリガー' }]
    },
    {
        id: 'a10fibtem',
        label: 'A10 FIBTEM',
        unit: 'mm',
        min: 0,
        max: 25,
        step: 1,
        default: 12,
        thresholds: [{ at: 9, direction: 'under', meaning: 'Choose Cryo over Platelets', meaningJa: '血小板よりクリオを選択' }]
    }
];

// ---------------------------------------------------------------------------
// Pure resolvers — same dosing logic the test file asserts against.
// ---------------------------------------------------------------------------

/** CPB phase recommendations.
 *  Returns an array of { product, dose, total, unit, reason, severity }.
 *  `total` is in `unit` (mL or U) at the patient's `weight` kg.
 */
export const resolveCpb = ({ heptemCT, heptemCFT, heptemMCF, fibtemMCF }, weight) => {
    const w = parseFloat(weight) || 0;
    const recs = [];

    // 1) Procoagulant insufficiency → Kcentra
    if (heptemCT > 240 || heptemCFT > 110) {
        const reasons = [];
        if (heptemCT > 240) reasons.push(`HEPTEM CT ${heptemCT}s > 240s`);
        if (heptemCFT > 110) reasons.push(`HEPTEM CFT ${heptemCFT}s > 110s`);
        recs.push({
            product: 'Kcentra (4F-PCC)',
            dose: '20 U/kg',
            total: w * 20,
            unit: 'U',
            reason: reasons.join(' AND '),
            severity: 'high'
        });
    }

    // 2) Platelet deficit
    if (heptemMCF < 50) {
        const perKg = heptemMCF >= 40 ? 20 : heptemMCF >= 30 ? 30 : 40;
        recs.push({
            product: 'Platelets',
            dose: `${perKg} mL/kg`,
            total: w * perKg,
            unit: 'mL',
            reason: `HEPTEM MCF ${heptemMCF} mm (goal > 50 mm)`,
            severity: heptemMCF < 30 ? 'high' : 'medium'
        });
    }

    // 3) Fibrinogen deficit
    if (fibtemMCF < 9) {
        const units = fibtemMCF >= 8 ? 1 : fibtemMCF >= 7 ? 2 : 3;
        recs.push({
            product: 'Cryoprecipitate',
            dose: `${units} unit${units > 1 ? 's' : ''}`,
            total: units,
            unit: 'units',
            reason: `FIBTEM MCF ${fibtemMCF} mm (goal > 9 mm)`,
            severity: fibtemMCF < 7 ? 'high' : 'medium'
        });
    }

    return recs;
};

/** Post-CPB phase recommendations.
 *  Branches: A10 EXTEM ≥ 38 → no intervention; otherwise FIBTEM choice picks
 *  Platelets vs Cryo. EXTEM CT > 111 always triggers FFP/Kcentra.
 */
export const resolvePostCpb = ({ extemCT, a10extem, a10fibtem }, weight) => {
    const w = parseFloat(weight) || 0;
    const recs = [];

    if (extemCT > 111) {
        recs.push({
            product: 'FFP or Kcentra',
            dose: 'FFP 20 mL/kg or Kcentra 20 U/kg',
            total: w * 20,
            unit: 'mL (FFP) or U (Kcentra)',
            reason: `EXTEM CT ${extemCT}s > 111s`,
            severity: 'high'
        });
    }

    if (a10extem < 38) {
        // Intervention required — pick fibrinogen vs platelets based on FIBTEM.
        if (a10fibtem < 9) {
            // Fibrinogen-limited
            const units = a10fibtem >= 8 ? 1 : a10fibtem >= 7 ? 2 : 3;
            recs.push({
                product: 'Cryoprecipitate',
                dose: `${units} unit${units > 1 ? 's' : ''}`,
                total: units,
                unit: 'units',
                reason: `A10 EXTEM ${a10extem} mm < 38 mm AND A10 FIBTEM ${a10fibtem} mm < 9 mm (fibrinogen limited)`,
                severity: a10fibtem < 7 ? 'high' : 'medium'
            });
        } else {
            // Platelet-limited
            const perKg = a10extem >= 30 ? 20 : a10extem >= 20 ? 30 : 40;
            recs.push({
                product: 'Platelets',
                dose: `${perKg} mL/kg`,
                total: w * perKg,
                unit: 'mL',
                reason: `A10 EXTEM ${a10extem} mm < 38 mm AND A10 FIBTEM ${a10fibtem} mm ≥ 9 mm (platelet limited)`,
                severity: a10extem < 20 ? 'high' : 'medium'
            });
        }
    }

    return recs;
};

/** Convenience: produce the active path for the Post-CPB decision tree.
 *  Returns one of: 'goal-met', 'platelets-30-40', 'platelets-20-30',
 *  'platelets-lt-20', 'cryo-1', 'cryo-2', 'cryo-3'.
 */
export const postCpbPath = ({ a10extem, a10fibtem }) => {
    if (a10extem >= 38) return 'goal-met';
    if (a10fibtem < 9) {
        if (a10fibtem >= 8) return 'cryo-1';
        if (a10fibtem >= 7) return 'cryo-2';
        return 'cryo-3';
    }
    if (a10extem >= 30) return 'platelets-30-40';
    if (a10extem >= 20) return 'platelets-20-30';
    return 'platelets-lt-20';
};
