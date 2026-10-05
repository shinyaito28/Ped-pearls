import { adultLocalAnestheticReferences } from '../data/adultLocalAnestheticReferences';
import { positiveNumber } from './localAnestheticPlan';

export const calculateAdultLocalAnestheticReference = ({ drug, epinephrine, weight, concentration, concentrationUnit = 'percent' }) => {
    const kg = positiveNumber(weight);
    const reference = Object.hasOwn(adultLocalAnestheticReferences, drug) ? adultLocalAnestheticReferences[drug] : null;
    if (!kg || !reference || typeof epinephrine !== 'boolean') return null;
    const preset = reference[epinephrine ? 'epi' : 'plain'];
    const weightBasedMg = kg * preset.mgPerKg;
    if (!Number.isFinite(weightBasedMg)) return null;
    const ceilingMg = Math.min(weightBasedMg, preset.absoluteMg);
    const entered = positiveNumber(concentration);
    const mgPerMl = entered && ['percent', 'mgPerMl'].includes(concentrationUnit)
        ? concentrationUnit === 'percent' ? entered * 10 : entered : null;
    const rawMl = mgPerMl && Number.isFinite(mgPerMl) ? ceilingMg / mgPerMl : null;
    let ceilingMl = rawMl !== null && Number.isFinite(rawMl) && Number.isFinite(rawMl * 100)
        ? Math.floor(rawMl * 100) / 100 : null;
    // Floor to 0.01 mL and check the displayed dose against the unrounded ceiling.
    if (ceilingMl !== null && ceilingMl * mgPerMl > ceilingMg) ceilingMl = Math.max(0, Math.floor(ceilingMl * 100 - 1) / 100);
    return { ...preset, weightBasedMg, ceilingMg, mgPerMl: Number.isFinite(mgPerMl) ? mgPerMl : null, ceilingMl,
        absoluteCapActive: weightBasedMg >= preset.absoluteMg };
};

export const floorReferenceDisplay = value => Number.isFinite(value) && value >= 0
    ? String(Math.floor(value * 100) / 100) : '—';
