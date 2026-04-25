import { describe, it, expect } from 'vitest';
import { resolveCpb, resolvePostCpb, postCpbPath } from '../src/data/rotem_protocol';

// All ROTEM test fixtures are derived directly from the institutional guide
// the user supplied. If a clinical value below changes, verify against the
// source photograph before updating the assertion.

describe('resolveCpb — CPB phase recommendations', () => {
    const w = 3.5; // term neonate

    it('No recommendations when all values are within goal', () => {
        const r = resolveCpb({ heptemCT: 200, heptemCFT: 90, heptemMCF: 55, fibtemMCF: 12 }, w);
        expect(r).toEqual([]);
    });

    it('HEPTEM CT > 240 triggers Kcentra 20 U/kg', () => {
        const r = resolveCpb({ heptemCT: 280, heptemCFT: 90, heptemMCF: 55, fibtemMCF: 12 }, w);
        expect(r).toHaveLength(1);
        expect(r[0].product).toBe('Kcentra (4F-PCC)');
        expect(r[0].total).toBeCloseTo(70, 1); // 3.5 × 20
        expect(r[0].unit).toBe('U');
    });

    it('HEPTEM CFT > 110 triggers Kcentra 20 U/kg', () => {
        const r = resolveCpb({ heptemCT: 200, heptemCFT: 130, heptemMCF: 55, fibtemMCF: 12 }, w);
        expect(r[0].product).toBe('Kcentra (4F-PCC)');
        expect(r[0].reason).toContain('CFT 130s > 110s');
    });

    it('HEPTEM MCF 40-50 → Platelets 20 mL/kg', () => {
        const r = resolveCpb({ heptemCT: 200, heptemCFT: 90, heptemMCF: 45, fibtemMCF: 12 }, w);
        const plt = r.find(x => x.product === 'Platelets');
        expect(plt).toBeDefined();
        expect(plt.dose).toBe('20 mL/kg');
        expect(plt.total).toBeCloseTo(70, 1); // 3.5 × 20
    });

    it('HEPTEM MCF 30-40 → Platelets 30 mL/kg', () => {
        const r = resolveCpb({ heptemCT: 200, heptemCFT: 90, heptemMCF: 35, fibtemMCF: 12 }, w);
        const plt = r.find(x => x.product === 'Platelets');
        expect(plt.dose).toBe('30 mL/kg');
        expect(plt.total).toBeCloseTo(105, 1);
    });

    it('HEPTEM MCF < 30 → Platelets 40 mL/kg', () => {
        const r = resolveCpb({ heptemCT: 200, heptemCFT: 90, heptemMCF: 25, fibtemMCF: 12 }, w);
        const plt = r.find(x => x.product === 'Platelets');
        expect(plt.dose).toBe('40 mL/kg');
        expect(plt.total).toBeCloseTo(140, 1);
        expect(plt.severity).toBe('high');
    });

    it('FIBTEM MCF 8-9 → Cryo 1 unit', () => {
        const r = resolveCpb({ heptemCT: 200, heptemCFT: 90, heptemMCF: 55, fibtemMCF: 8.5 }, w);
        const cryo = r.find(x => x.product === 'Cryoprecipitate');
        expect(cryo.total).toBe(1);
        expect(cryo.dose).toBe('1 unit');
    });

    it('FIBTEM MCF 7-8 → Cryo 2 units', () => {
        const r = resolveCpb({ heptemCT: 200, heptemCFT: 90, heptemMCF: 55, fibtemMCF: 7.5 }, w);
        const cryo = r.find(x => x.product === 'Cryoprecipitate');
        expect(cryo.total).toBe(2);
        expect(cryo.dose).toBe('2 units');
    });

    it('FIBTEM MCF < 7 → Cryo 3 units, high severity', () => {
        const r = resolveCpb({ heptemCT: 200, heptemCFT: 90, heptemMCF: 55, fibtemMCF: 6 }, w);
        const cryo = r.find(x => x.product === 'Cryoprecipitate');
        expect(cryo.total).toBe(3);
        expect(cryo.severity).toBe('high');
    });

    it('Multiple deficits at once stack as multiple recommendations', () => {
        const r = resolveCpb({ heptemCT: 280, heptemCFT: 90, heptemMCF: 35, fibtemMCF: 7.5 }, w);
        expect(r).toHaveLength(3);
        expect(r.map(x => x.product)).toEqual(['Kcentra (4F-PCC)', 'Platelets', 'Cryoprecipitate']);
    });
});

describe('resolvePostCpb — Post-CPB phase recommendations', () => {
    const w = 3.5;

    it('A10 EXTEM ≥ 38 + EXTEM CT ≤ 111 → no recommendation (goal met)', () => {
        const r = resolvePostCpb({ extemCT: 80, a10extem: 42, a10fibtem: 12 }, w);
        expect(r).toEqual([]);
    });

    it('EXTEM CT > 111 → FFP or Kcentra (regardless of A10)', () => {
        const r = resolvePostCpb({ extemCT: 130, a10extem: 42, a10fibtem: 12 }, w);
        expect(r[0].product).toBe('FFP or Kcentra');
    });

    it('A10 EXTEM < 38 + A10 FIBTEM ≥ 9 → Platelets (A10 EXTEM 30-40 → 20 mL/kg)', () => {
        const r = resolvePostCpb({ extemCT: 80, a10extem: 35, a10fibtem: 12 }, w);
        const plt = r.find(x => x.product === 'Platelets');
        expect(plt.dose).toBe('20 mL/kg');
        expect(plt.total).toBeCloseTo(70, 1);
    });

    it('A10 EXTEM 20-30 → Platelets 30 mL/kg', () => {
        const r = resolvePostCpb({ extemCT: 80, a10extem: 25, a10fibtem: 12 }, w);
        const plt = r.find(x => x.product === 'Platelets');
        expect(plt.dose).toBe('30 mL/kg');
    });

    it('A10 EXTEM < 20 → Platelets 40 mL/kg, high severity', () => {
        const r = resolvePostCpb({ extemCT: 80, a10extem: 15, a10fibtem: 12 }, w);
        const plt = r.find(x => x.product === 'Platelets');
        expect(plt.dose).toBe('40 mL/kg');
        expect(plt.severity).toBe('high');
    });

    it('A10 EXTEM < 38 + A10 FIBTEM < 9 → Cryo (fibrinogen first)', () => {
        const r = resolvePostCpb({ extemCT: 80, a10extem: 30, a10fibtem: 7.5 }, w);
        const cryo = r.find(x => x.product === 'Cryoprecipitate');
        expect(cryo.total).toBe(2);
        expect(cryo.reason).toContain('fibrinogen limited');
    });

    it('A10 FIBTEM < 7 → Cryo 3 units', () => {
        const r = resolvePostCpb({ extemCT: 80, a10extem: 30, a10fibtem: 5 }, w);
        const cryo = r.find(x => x.product === 'Cryoprecipitate');
        expect(cryo.total).toBe(3);
    });
});

describe('postCpbPath — decision tree active path', () => {
    it('goal-met when A10 EXTEM ≥ 38', () => {
        expect(postCpbPath({ a10extem: 42, a10fibtem: 12 })).toBe('goal-met');
    });
    it('platelets-30-40 when A10 EXTEM 30-37 + A10 FIBTEM ≥ 9', () => {
        expect(postCpbPath({ a10extem: 35, a10fibtem: 12 })).toBe('platelets-30-40');
    });
    it('platelets-20-30 when A10 EXTEM 20-29', () => {
        expect(postCpbPath({ a10extem: 25, a10fibtem: 12 })).toBe('platelets-20-30');
    });
    it('platelets-lt-20 when A10 EXTEM < 20', () => {
        expect(postCpbPath({ a10extem: 15, a10fibtem: 12 })).toBe('platelets-lt-20');
    });
    it('cryo branches on A10 FIBTEM < 9 regardless of A10 EXTEM', () => {
        expect(postCpbPath({ a10extem: 30, a10fibtem: 8.5 })).toBe('cryo-1');
        expect(postCpbPath({ a10extem: 30, a10fibtem: 7.5 })).toBe('cryo-2');
        expect(postCpbPath({ a10extem: 30, a10fibtem: 6 })).toBe('cryo-3');
    });
});

describe('Edge cases — weight 0 / non-finite', () => {
    it('Weight 0 → totals are 0 but recommendations still surface', () => {
        const r = resolveCpb({ heptemCT: 280, heptemCFT: 90, heptemMCF: 55, fibtemMCF: 12 }, 0);
        expect(r).toHaveLength(1);
        expect(r[0].total).toBe(0);
    });
    it('NaN weight → 0 totals, no crash', () => {
        const r = resolveCpb({ heptemCT: 280, heptemCFT: 90, heptemMCF: 55, fibtemMCF: 12 }, NaN);
        expect(r[0].total).toBe(0);
    });
});
