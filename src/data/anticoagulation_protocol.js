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

// Institutional CPB reversal reference only, not generic heparin/LMWH reversal.
// Anticoagulation Protocol 3.2 and Cardiac Rotation 2020 disagree about
// neonatal doses above 5 mg/kg. Do not infer administration from a recommendation.
export const protamineReversal = ({
    protocol, weight, ageYears, ageDays, loadingUnits, totalUnits,
    pumpUnits, includeHemobag = false
}) => {
    const number = value => {
        if (value == null || typeof value === 'boolean' || String(value).trim() === '') return null;
        const n = Number(value);
        return Number.isFinite(n) ? n : null;
    };
    const w = number(weight), age = number(ageYears);
    const days = ageDays == null ? (age == null ? null : age * 365) : number(ageDays);
    const result = {
        mg: null, rawMg: null, cap: w != null && w > 0 ? w * 5 : null,
        capApplied: false, allowOverCap: false, hemobagAdded: 0,
        basis: '', basisJa: '', status: 'held',
        notes: ['CPB institutional reference only. Confirm with the perfusion/anesthesia team; not a generic heparin or LMWH reversal calculator.'],
        notesJa: ['人工心肺（CPB）の院内参考計算です。灌流・麻酔チームと確認してください。一般的なヘパリン・LMWH拮抗には適用しません。']
    };
    const hold = (en, ja) => ({ ...result, mg: null, rawMg: null, capApplied: false, status: 'held', basis: en, basisJa: ja });
    if (w == null || w <= 0 || !Number.isFinite(w * 5) || days == null || days < 0 || !['NCH', 'UOFM'].includes(protocol))
        return hold('Enter a valid weight, age and CPB protocol.', '有効な体重・年齢・CPBプロトコルを入力してください。');
    if (days === 30) return hold('The source does not define the exact 30-day boundary. Confirm the age category.', '資料は生後30日ちょうどの分類を定義していません。年齢区分を確認してください。');
    const isNeonate = days < 30;
    const loading = number(loadingUnits), total = number(totalUnits), pump = number(pumpUnits);
    let units;
    if (protocol === 'NCH') {
        if (total == null || total < 0 || pump == null || pump < 0)
            return hold('Enter actual patient heparin excluding the circuit, and actual circuit heparin (enter 0 if none). HMS recommendations are not administered doses.', '患者への実投与ヘパリン総量（回路分を除く）と実際の回路ヘパリン量（なしは0）を入力してください。HMS推奨量を実投与量として扱いません。');
        units = total + pump;
        result.basis = `1 mg / 100 U: actual patient ${total} U + actual circuit ${pump} U = ${units} U`;
        result.basisJa = `1 mg / 100 U：患者実投与 ${total} U + 回路実量 ${pump} U = ${units} U`;
    } else {
        units = isNeonate ? loading : total;
        if (units == null || units < 0)
            return hold(isNeonate ? 'Enter the actual initial heparin loading dose administered to the patient.' : 'Enter the actual cumulative heparin administered to the patient.', isNeonate ? '患者に実投与した初回ヘパリン量を入力してください。' : '患者に実投与したヘパリン累積量を入力してください。');
        result.basis = `1 mg / 100 U: actual ${isNeonate ? 'loading dose (neonate)' : 'patient cumulative dose'} ${units} U`;
        result.basisJa = `1 mg / 100 U：実投与${isNeonate ? '初回量（新生児）' : '患者累積量'} ${units} U`;
    }
    if (!Number.isFinite(units) || !Number.isFinite(units / 100)) return hold('Input exceeds the calculation range.', '入力値が計算範囲を超えています。');
    if (units <= 0) return hold('Enter a positive actual heparin amount to calculate a protamine reference.', 'プロタミン参考量を計算するには、正の実投与ヘパリン量を入力してください。');
    const raw = units / 100;
    if (includeHemobag) return hold('Hemobag: the 2020 source lists an additional 50 mg for teens/older patients, but timing and the total cap need confirmation. Automatic final dose withheld.', 'Hemobag：2020年資料に思春期以降で50 mg追加の記載がありますが、投与時点と総量上限の確認が必要です。最終量の自動計算を保留しています。');
    if (isNeonate && raw > result.cap) return hold('Neonatal dose exceeds 5 mg/kg. Institutional sources disagree about an exception; automatic dose withheld.', '新生児で5 mg/kgを超えます。院内資料間で例外の記載が異なるため、自動計算を保留しています。');
    result.rawMg = raw;
    result.capApplied = raw > result.cap;
    result.mg = Math.round(Math.min(raw, result.cap) * 10) / 10;
    if (result.mg === 0) return hold('The reference dose is below the display precision. Automatic dose withheld; confirm the amount.', '参考量が表示精度未満です。自動計算を保留し、量の確認が必要です。');
    result.status = 'reference';
    return result;
};
