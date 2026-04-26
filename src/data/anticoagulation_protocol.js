// NCH cardiac anticoagulation protocol (NCH Investigational + U of M Technique).
// Sourced from "NCH Investigational Anticoagulation Protocol 3.x" used in
// fellow rotation, plus the cardiac rotation guide. All resolver functions are
// pure for unit testing.
//
// NOTE: Heparin-to-protamine reversal uses the standard 1 mg protamine per
//       100 units heparin convention.

export const PROTOCOLS = {
    NCH: 'NCH Investigational',
    UOFM: 'U of M Technique'
};

// HMS HDR slope decision: 80-120 → NCH; otherwise → ATIII trial → U of M.
export const slopeDecision = (slope) => {
    if (slope >= 80 && slope <= 120) {
        return {
            protocol: 'NCH',
            reason: `HDR slope ${slope} (80-120) — NCH Investigational`,
            reasonJa: `HDR slope ${slope} (80-120) — NCH Investigational`,
        };
    }
    return {
        protocol: 'UOFM-or-ATIII',
        reason: `HDR slope ${slope} out of 80-120. If ATIII <100% → replace 1 vial → repeat HDR. If still out of range → U of M.`,
        reasonJa: `HDR slope ${slope} は 80-120 の範囲外。ATIII <100% なら 1 バイアル補充 → HDR 再検。それでも範囲外なら U of M。`,
    };
};

// Heparin loading dose (units).
//   protocol: 'NCH' | 'UOFM'
//   weight (kg)
//   ageYears
//   hmsCombinedDose (units, total of patient + pump as recommended by HMS) for NCH
export const heparinLoading = ({ protocol, weight, ageYears, hmsCombinedDose }) => {
    const w = parseFloat(weight) || 0;
    if (protocol === 'NCH') {
        if (!hmsCombinedDose || hmsCombinedDose <= 0) {
            return {
                doseUnits: null,
                method: 'NCH (HMS-driven)',
                methodJa: 'NCH (HMS ベース)',
                notes: 'Enter HMS-recommended COMBINED dose (patient + pump)',
                notesJa: 'HMS 推奨の COMBINED 量(患者 + ポンプ)を入力'
            };
        }
        return {
            doseUnits: Math.round(hmsCombinedDose),
            method: 'NCH (HMS-driven, COMBINED)',
            methodJa: 'NCH (HMS ベース、COMBINED)',
            notes: 'Patient + pump combined per HMS recommendation',
            notesJa: 'HMS 推奨に従って患者 + ポンプ合算'
        };
    }
    // U of M simple formula
    let perKg;
    if (ageYears < 1) perKg = 600;
    else if (ageYears <= 5) perKg = 500;
    else perKg = 450;
    return {
        doseUnits: Math.round(w * perKg),
        method: `U of M (${perKg} U/kg)`,
        methodJa: `U of M (${perKg} U/kg)`,
        notes: ageYears < 1
            ? '<1 yr → 600 U/kg'
            : ageYears <= 5 ? '1-5 yr → 500 U/kg' : '>5 yr → 450 U/kg',
        notesJa: ageYears < 1
            ? '1 歳未満 → 600 U/kg'
            : ageYears <= 5 ? '1-5 歳 → 500 U/kg' : '>5 歳 → 450 U/kg'
    };
};

// Cath-lab heparin: flat 100 U/kg.
export const heparinCathLab = ({ weight }) => {
    const w = parseFloat(weight) || 0;
    return { doseUnits: Math.round(w * 100), perKg: 100, label: 'Cath lab: 100 U/kg', labelJa: 'カテ室: 100 U/kg' };
};

// Re-dose criterion: HPT <2.0 IU/mL OR ACT <480 sec → 100 U/kg.
export const heparinRedose = ({ hpt, act, weight }) => {
    const w = parseFloat(weight) || 0;
    const hptLow = hpt != null && hpt < 2.0;
    const actLow = act != null && act < 480;
    const trigger = hptLow || actLow;
    return {
        trigger,
        reasons: [
            hptLow ? `HPT ${hpt} < 2.0 IU/mL` : null,
            actLow ? `ACT ${act} < 480 sec` : null
        ].filter(Boolean),
        reasonsJa: [
            hptLow ? `HPT ${hpt} < 2.0 IU/mL` : null,
            actLow ? `ACT ${act} < 480 秒` : null
        ].filter(Boolean),
        doseUnits: trigger ? Math.round(w * 100) : 0,
        perKg: 100
    };
};

// Protamine reversal (mg).
//   protocol: 'NCH' | 'UOFM'
//   weight, ageYears
//   loadingUnits   (initial heparin loading, used by U of M neonate)
//   totalUnits     (cumulative heparin, used by U of M >30d and reference)
//   pumpUnits      (heparin in the bypass circuit; for NCH COMBINED accounting)
//   includeHemobag (boolean: +50 mg if true, used in teens/adults)
export const protamineReversal = ({
    protocol, weight, ageYears, loadingUnits = 0, totalUnits = 0,
    pumpUnits = 0, includeHemobag = false
}) => {
    const w = parseFloat(weight) || 0;
    const isNeonate = ageYears != null && ageYears < (30 / 365);

    let mg = 0;
    let basis = '';
    let basisJa = '';
    if (protocol === 'NCH') {
        // Combined patient + pump 1:1
        const combined = (totalUnits || loadingUnits) + pumpUnits;
        mg = combined / 100;
        basis = `1:1 of COMBINED ${combined} U (patient + pump)`;
        basisJa = `COMBINED ${combined} U (患者 + ポンプ) に対し 1:1`;
    } else {
        // U of M: neonate uses loading dose only; >30d uses total cumulative.
        if (isNeonate) {
            mg = loadingUnits / 100;
            basis = `1:1 of loading dose ${loadingUnits} U (neonate)`;
            basisJa = `ローディング量 ${loadingUnits} U に対し 1:1(新生児)`;
        } else {
            mg = totalUnits / 100;
            basis = `1:1 of total heparin ${totalUnits} U`;
            basisJa = `ヘパリン総量 ${totalUnits} U に対し 1:1`;
        }
    }

    const cap = w * 5; // 5 mg/kg
    let cappedMg = mg;
    let capApplied = false;
    // NCH neonate is the only exception that may exceed 5 mg/kg per source.
    const allowOverCap = protocol === 'NCH' && isNeonate;
    if (mg > cap && !allowOverCap) {
        cappedMg = cap;
        capApplied = true;
    }

    if (includeHemobag) cappedMg += 50;

    return {
        mg: Math.round(cappedMg * 10) / 10,
        rawMg: Math.round(mg * 10) / 10,
        cap: Math.round(cap * 10) / 10,
        capApplied,
        allowOverCap,
        hemobagAdded: includeHemobag ? 50 : 0,
        basis,
        basisJa,
        notes: [
            'Run through peripheral IV (NOT central line)',
            'Carrier 20 mL/hr',
            '1:1 dilution with NS (especially neonates/infants)',
            'Watch tidal volume + peak pressure → epi 1-2 mcg if reaction'
        ],
        notesJa: [
            '末梢 IV から投与(中心静脈ラインは使わない)',
            'キャリア 20 mL/hr',
            'NS で 1:1 希釈(特に新生児/乳児)',
            'TV + ピーク圧を観察 → 反応あればエピ 1-2 mcg'
        ]
    };
};
