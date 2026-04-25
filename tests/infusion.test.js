import { describe, it, expect } from 'vitest';
import { calcInfusionMlPerHr, calcDoseFromMlPerHr } from '../src/data/infusion_presets';

describe('Infusion calculator math', () => {
    it('Epi 0.05 mcg/kg/min × 10 kg / 16 mcg/mL = 1.875 mL/hr', () => {
        const ml = calcInfusionMlPerHr(0.05, 10, 16, 'mcg/kg/min');
        expect(ml).toBeCloseTo(1.875, 3);
    });
    it('Dexmedetomidine 0.5 mcg/kg/hr × 20 kg / 4 mcg/mL = 2.5 mL/hr', () => {
        const ml = calcInfusionMlPerHr(0.5, 20, 4, 'mcg/kg/hr');
        expect(ml).toBeCloseTo(2.5, 3);
    });
    it('Round-trip: rate → dose → rate is stable', () => {
        const dose = 0.1, weight = 10, conc = 16, unit = 'mcg/kg/min';
        const ml = calcInfusionMlPerHr(dose, weight, conc, unit);
        const recovered = calcDoseFromMlPerHr(ml, weight, conc, unit);
        expect(recovered).toBeCloseTo(dose, 5);
    });
    it('Returns 0 when weight is 0 (avoid NaN in UI)', () => {
        expect(calcInfusionMlPerHr(0.05, 0, 16, 'mcg/kg/min')).toBe(0);
    });
});
