export const fmt = (num) => {
    if (isNaN(num) || !isFinite(num)) return '-';
    if (num < 1) return num.toFixed(2);
    if (num < 10) return num.toFixed(1);
    return num.toFixed(0);
};

// Preserve the source's unit; never infer mg for an unrecognised unit.
const doseUnits = { mcg: 'mcg', mg: 'mg', g: 'g', ml: 'mL', meq: 'mEq', mu: 'mU', unit: 'Units', units: 'Units', u: 'Units' };

// kg-based, fixed and heparin-dependent amounts are distinct calculation bases.
// The heparin ratio is a reference only here: the Cardiac calculator collects
// the required heparin inputs and applies its existing protocol-specific limits.
export const calculateDose = (doseStr, weight, maxVal = null, minVal = null, options = {}) => {
    if (options.doseBasis === 'heparin') {
        return { result: '-', formula: 'Requires heparin units; see Cardiac calculator', isInfusion: false, requiresInput: 'heparin' };
    }
    const parsed = String(doseStr).match(/^\s*(\d+(?:\.\d+)?|\.\d+)(?:\s*[-–]\s*(\d+(?:\.\d+)?|\.\d+))?\s*(mcg|mg|g|ml|meq|mu|units?|u)(\/kg)?(?:\/(min|hr|hour))?\s*$/i);
    if (!parsed) return { result: '-', formula: '-', isInfusion: false };

    const [, first, second, sourceUnit, perKg, time] = parsed;
    const basis = options.doseBasis || (perKg ? 'perKg' : 'fixed');
    const isInfusion = Boolean(time);
    if (!['fixed', 'perKg'].includes(basis) || (basis === 'fixed' && perKg) || (basis === 'perKg' && !perKg)) {
        return { result: '-', formula: '-', isInfusion };
    }
    const w = parseFloat(weight);
    if (basis === 'perKg' && (!Number.isFinite(w) || w <= 0)) {
        return { result: '-', formula: 'Requires positive weight', isInfusion };
    }
    const unit = doseUnits[sourceUnit.toLowerCase()] + (time ? `/${time.toLowerCase() === 'min' ? 'min' : 'hr'}` : '');
    const factor = basis === 'perKg' ? w : 1;
    const baseFormula = `${first}${second ? `-${second}` : ''}` + (basis === 'perKg' ? ` × ${w}kg` : ` ${unit} (fixed)`);
    const hasMax = maxVal != null && Number.isFinite(Number(maxVal));
    const hasMin = minVal != null && Number.isFinite(Number(minVal));
    const applyLimits = (value) => {
        // Infusion range references previously had no hard caps. Preserve that.
        if (isInfusion) return { value, message: '' };
        if (hasMax && value > Number(maxVal)) return { value: Number(maxVal), message: '(Max)' };
        if (hasMin && value < Number(minVal)) return { value: Number(minVal), message: '(Min)' };
        return { value, message: '' };
    };
    const low = applyLimits(Number(first) * factor);
    const high = second ? applyLimits(Number(second) * factor) : null;
    const limits = !isInfusion ? (hasMax ? ` (Max ${maxVal})` : '') + (hasMin ? ` (Min ${minVal})` : '') : '';
    if (high && low.message === '(Max)' && high.message === '(Max)') {
        return { result: `${fmt(high.value)} ${unit} (Max)`, formula: `Capped at ${maxVal}`, isInfusion };
    }
    return {
        result: high ? `${fmt(low.value)} - ${fmt(high.value)} ${unit} ${high.message}` : `${fmt(low.value)} ${unit} ${low.message}`,
        formula: baseFormula + limits,
        isInfusion
    };
};
