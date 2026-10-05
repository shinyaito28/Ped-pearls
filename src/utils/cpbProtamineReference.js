import { calculateProtamineReference } from './protamineReference';
import { positiveNumber } from './localAnestheticPlan';

const nonnegative = value => {
    if (!['number', 'string'].includes(typeof value) || String(value).trim() === '') return null;
    const n = Number(value);
    return Number.isFinite(n) && n >= 0 ? n : null;
};

// Source-specific reference arithmetic. Planning never fills administered-dose inputs.
// The institutional 5 mg/kg limit is reported, not silently applied to the arithmetic.
export const calculateCpbProtamineReference = ({ protocol, mode, weight, age, ageUnit,
    hmsCombinedDose, loadingUnits, totalUnits, pumpUnits, ratio = 1,
    concentration, boundaryBasis = '' }) => {
    const kg = positiveNumber(weight), numericAge = nonnegative(age);
    const daysMultiplier = { years: 365, months: 30.4, days: 1 }[ageUnit];
    const yearsMultiplier = { years: 1, months: 1 / 12, days: 1 / 365 }[ageUnit];
    if (!kg || numericAge == null || !daysMultiplier || !['NCH', 'UOFM'].includes(protocol)
        || !['planning', 'actual'].includes(mode) || !Number.isFinite(kg * 5)) return null;
    const days = numericAge * daysMultiplier, years = numericAge * yearsMultiplier;
    if (!Number.isFinite(days) || !Number.isFinite(years)) return null;
    let units, sourceBasis, perKg = null, patientUnits = null, circuitUnits = null;
    if (mode === 'planning') {
        if (protocol === 'NCH') {
            units = nonnegative(hmsCombinedDose);
            sourceBasis = 'combined-plan';
        } else {
            perKg = years < 1 ? 600 : years <= 5 ? 500 : 450;
            units = Math.round(kg * perKg);
            sourceBasis = 'initial-plan';
        }
    } else if (protocol === 'NCH') {
        patientUnits = nonnegative(totalUnits); circuitUnits = nonnegative(pumpUnits);
        if (patientUnits == null || circuitUnits == null) return null;
        units = patientUnits + circuitUnits;
        sourceBasis = 'actual-combined';
    } else {
        if (days === 30 && !['initial', 'cumulative'].includes(boundaryBasis)) return null;
        const initial = days < 30 || (days === 30 && boundaryBasis === 'initial');
        units = nonnegative(initial ? loadingUnits : totalUnits);
        sourceBasis = initial ? 'actual-initial' : 'actual-cumulative';
    }
    const combined = ['combined-plan', 'actual-combined'].includes(sourceBasis);
    const result = calculateProtamineReference({ basis: combined ? 'combined' :
        sourceBasis.includes('initial') ? 'patient-initial' : 'patient-cumulative',
        heparinUnits: units, ratio, weight: kg, concentration });
    if (!result) return null;
    return { ...result, protocol, mode, sourceBasis, perKg, patientUnits, circuitUnits,
        weight: kg, ageDays: days, institutionalLimitMg: kg * 5, exceedsLimit: result.mg > kg * 5,
        neonatalExceptionUnresolved: protocol === 'UOFM' && days < 30 && result.mg > kg * 5,
        ageBoundary: days === 30 };
};
