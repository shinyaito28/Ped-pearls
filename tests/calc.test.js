import { describe, it, expect } from 'vitest';
import { fmt, calculateDose } from '../src/utils/calc';

describe('fmt — number formatter', () => {
    it('returns "-" for invalid numbers', () => {
        expect(fmt(NaN)).toBe('-');
        expect(fmt(Infinity)).toBe('-');
    });
    it('formats <1 with two decimals', () => {
        expect(fmt(0.55)).toBe('0.55');
    });
    it('formats <10 with one decimal', () => {
        expect(fmt(2.4)).toBe('2.4');
    });
    it('formats >=10 as integer', () => {
        expect(fmt(12.7)).toBe('13');
    });
});

describe('calculateDose — generic kg-based dose calculator', () => {
    it('multiplies a single dose by weight (e.g. 2 mg/kg × 10 kg = 20 mg)', () => {
        const r = calculateDose('2 mg/kg', 10);
        expect(r.result).toMatch(/^20\s*mg/);
        expect(r.isInfusion).toBe(false);
    });
    it('returns a range when dose is "0.5-1 mg/kg" × 10 kg = 5-10 mg', () => {
        const r = calculateDose('0.5-1 mg/kg', 10);
        expect(r.result).toContain('5');
        expect(r.result).toContain('10');
    });
    it('caps at max value when computed dose exceeds max', () => {
        // Cefazolin 50 mg/kg × 60 kg = 3000 mg, but max is 2000 mg.
        const r = calculateDose('50 mg/kg', 60, 2000);
        expect(r.result).toContain('2000');
        expect(r.result).toMatch(/Max/i);
    });
    it('respects min value (Atropine min 0.1 mg)', () => {
        // 0.02 mg/kg × 1 kg = 0.02 mg, but min 0.1 mg.
        const r = calculateDose('0.02 mg/kg', 1, null, 0.1);
        expect(r.result).toMatch(/0\.10|0\.1\s/);
    });
    it('flags infusion units (mcg/kg/min)', () => {
        const r = calculateDose('0.05-1 mcg/kg/min', 10);
        expect(r.isInfusion).toBe(true);
        expect(r.result).toMatch(/mcg\/min/);
    });
    it('handles per-hour infusion', () => {
        const r = calculateDose('1-5 mcg/kg/hr', 10);
        expect(r.isInfusion).toBe(true);
        expect(r.result).toMatch(/mcg\/hr/);
    });
    it('handles mEq units', () => {
        const r = calculateDose('1-2 mEq/kg', 10);
        expect(r.result).toContain('mEq');
    });
});
