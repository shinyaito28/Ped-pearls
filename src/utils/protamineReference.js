import { positiveNumber } from './localAnestheticPlan';

export const protamineHeparinBases = ['patient-cumulative', 'patient-initial', 'combined', 'residual'];

// Arithmetic reference only. No protocol selection, elapsed-time model or automatic dose cap.
export const calculateProtamineReference = ({ basis, heparinUnits, ratio, weight, concentration }) => {
    if (!protamineHeparinBases.includes(basis)
        || (typeof heparinUnits !== 'number' && typeof heparinUnits !== 'string')
        || String(heparinUnits).trim() === '') return null;
    const units = Number(heparinUnits), selectedRatio = positiveNumber(ratio);
    if (!Number.isFinite(units) || units < 0 || !selectedRatio) return null;
    const mg = units / 100 * selectedRatio;
    if (!Number.isFinite(mg) || (units > 0 && mg === 0)) return null;
    const kg = positiveNumber(weight), mgPerMl = positiveNumber(concentration);
    const mgPerKg = kg && Number.isFinite(mg / kg) ? mg / kg : null;
    const ml = mgPerMl && Number.isFinite(mg / mgPerMl) ? mg / mgPerMl : null;
    return { basis, heparinUnits: units, ratio: selectedRatio, mg, mgPerKg, ml };
};
