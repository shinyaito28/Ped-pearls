
// Vitals Data based on PALS / Pediatric Pearls
// Returns: { hr, rr, sbp, dbp }
// SBP is the PALS hypotension threshold, computed dynamically for 1–10 yr (<70 + 2×age).
// HR/RR age buckets follow the Pearls table (<1, 1-3, 3-6, 6-12, ≥12);
// SBP boundary: term neonate through 28 days / <1y / 1-10y / >10y.
// Reference: https://www.childrens.com/specialties-services/conditions/low-blood-pressure-hypotension

export const sbpHypotensionReference = 'https://www.childrens.com/specialties-services/conditions/low-blood-pressure-hypotension';

const displayNumber = number => String(Number(number.toFixed(10)));

export const getSbpHypotension = (ageYears, isNeonate, { ageDays, isPreemie = false } = {}) => {
    if ((typeof ageYears !== 'number' && typeof ageYears !== 'string')
        || (typeof ageYears === 'string' && !ageYears.trim())) return null;
    const years = Number(ageYears);
    if (!Number.isFinite(years) || years < 0) return null;
    const neonatal = Number.isFinite(ageDays) ? ageDays <= 28 : Boolean(isNeonate && years < 1);
    if (neonatal && isPreemie) return { threshold: null, band: 'preterm', formula: null };
    if (neonatal) return { threshold: 60, band: 'term-neonate', formula: null };
    if (years < 1) return { threshold: 70, band: 'infant', formula: null };
    if (years <= 10) return {
        threshold: Number((70 + 2 * years).toFixed(10)), band: 'child',
        formula: `70 + 2 × ${displayNumber(years)} = ${displayNumber(70 + 2 * years)}`
    };
    return { threshold: 90, band: 'older-child', formula: null };
};

export const getVitals = (age, isNeonate, options = {}) => {
    const sbpDetails = getSbpHypotension(age, isNeonate, options);
    if (!sbpDetails) return { hr: '—', rr: '—', sbp: '—', dbp: '—', sbpDetails: null };
    let vitals = { hr: '100-180', rr: '30-60', sbp: '<60', dbp: '-' };

    if (isNeonate) {
        vitals = { hr: '100-205', rr: '30-60', sbp: '<60', dbp: '35-55' };
    } else {
        const ageYr = parseFloat(age);

        let hr, rr, dbp;
        if (ageYr < 1) {
            hr = '100-190'; rr = '30-60'; dbp = '35-60';
        } else if (ageYr < 3) {
            hr = '98-140'; rr = '24-40'; dbp = '40-65';
        } else if (ageYr < 6) {
            hr = '80-120'; rr = '22-34'; dbp = '55-70';
        } else if (ageYr < 12) {
            hr = '75-118'; rr = '18-30'; dbp = '60-80';
        } else {
            hr = '60-100'; rr = '12-16'; dbp = '65-85';
        }

        vitals = { hr, rr, dbp };
    }

    return { ...vitals, sbp: sbpDetails.threshold == null ? '—' : `<${displayNumber(sbpDetails.threshold)}`, sbpDetails };
};
