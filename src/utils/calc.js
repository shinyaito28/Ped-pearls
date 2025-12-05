export const fmt = (num) => {
    if (isNaN(num) || !isFinite(num)) return '-';
    if (num < 1) return num.toFixed(2);
    if (num < 10) return num.toFixed(1);
    return num.toFixed(0);
};

// Generic Dose Calculator with Min/Max logic
export const calculateDose = (doseStr, weight, maxVal = null, minVal = null) => {
    let type = 'single';
    let min = 0, max = 0, single = 0;
    let unit = 'mg';
    let isInfusion = false;

    const d = doseStr.toLowerCase();
    const w = parseFloat(weight);

    if (d.includes('/kg/min') || d.includes('/kg/hr') || d.includes('/kg/hour')) {
        isInfusion = true;
        unit = d.includes('mcg') ? 'mcg' : (d.includes('mu') ? 'mU' : 'mg');
        const time = (d.includes('hr') || d.includes('hour')) ? 'hr' : 'min';
        unit += `/${time}`;
    } else {
        unit = d.includes('mcg') ? 'mcg' : (d.includes('units') ? 'Units' : (d.includes('meq') ? 'mEq' : (d.includes('ml') ? 'mL' : 'mg')));
    }

    const matches = doseStr.match(/(\d+(\.\d+)?)/g);
    if (!matches) return { result: '-', formula: '-', isInfusion };

    if (doseStr.includes('-') && matches.length >= 2) {
        type = 'range';
        min = parseFloat(matches[0]);
        max = parseFloat(matches[1]);
    } else {
        single = parseFloat(matches[0]);
    }

    const applyLimits = (val) => {
        let v = val;
        let msg = '';
        if (maxVal && v > maxVal) { v = maxVal; msg = '(Max)'; }
        if (minVal && v < minVal) { v = minVal; msg = '(Min)'; }
        return { v, msg };
    };

    if (isInfusion) {
        if (type === 'range') {
            const minRate = min * w;
            const maxRate = max * w;
            return { result: `${fmt(minRate)} - ${fmt(maxRate)} ${unit}`, formula: `${min}-${max} × ${w}kg`, isInfusion };
        } else {
            const rate = single * w;
            return { result: `${fmt(rate)} ${unit}`, formula: `${single} × ${w}kg`, isInfusion };
        }
    } else {
        if (type === 'range') {
            const vMin = applyLimits(min * w);
            const vMax = applyLimits(max * w);

            if (vMin.msg === '(Max)' && vMax.msg === '(Max)') {
                return { result: `${fmt(vMax.v)} ${unit} (Max)`, formula: `Capped at ${maxVal}`, isInfusion };
            }

            return {
                result: `${fmt(vMin.v)} - ${fmt(vMax.v)} ${unit} ${vMax.msg}`,
                formula: `${min}-${max} × ${w}kg` + (maxVal ? ` (Max ${maxVal})` : '') + (minVal ? ` (Min ${minVal})` : ''),
                isInfusion
            };
        } else {
            const v = applyLimits(single * w);
            return {
                result: `${fmt(v.v)} ${unit} ${v.msg}`,
                formula: `${single} × ${w}kg` + (maxVal ? ` (Max ${maxVal})` : '') + (minVal ? ` (Min ${minVal})` : ''),
                isInfusion
            };
        }
    }
};
