import { describe, it, expect } from 'vitest';
import {
    heparinLoading, heparinRedose, protamineReversal, heparinCathLab,
    slopeDecision
} from '../src/data/anticoagulation_protocol';

describe('Anticoagulation — heparin loading (U of M)', () => {
    it('<1 yr: 600 U/kg', () => {
        const r = heparinLoading({ protocol: 'UOFM', weight: 5, ageYears: 0.1 });
        expect(r.doseUnits).toBe(3000);
        expect(r.method).toMatch(/600/);
    });
    it('1-5 yr: 500 U/kg', () => {
        const r = heparinLoading({ protocol: 'UOFM', weight: 15, ageYears: 3 });
        expect(r.doseUnits).toBe(7500);
    });
    it('>5 yr: 450 U/kg', () => {
        const r = heparinLoading({ protocol: 'UOFM', weight: 30, ageYears: 8 });
        expect(r.doseUnits).toBe(13500);
    });
});

describe('Anticoagulation — heparin loading (NCH)', () => {
    it('uses HMS-recommended COMBINED dose', () => {
        const r = heparinLoading({ protocol: 'NCH', weight: 5, ageYears: 0.1, hmsCombinedDose: 4200 });
        expect(r.doseUnits).toBe(4200);
        expect(r.method).toMatch(/COMBINED/);
    });
    it('returns null + prompt if no HMS dose entered', () => {
        const r = heparinLoading({ protocol: 'NCH', weight: 5, ageYears: 0.1 });
        expect(r.doseUnits).toBeNull();
    });
});

describe('Anticoagulation — cath lab heparin', () => {
    it('100 U/kg flat', () => {
        expect(heparinCathLab({ weight: 12 }).doseUnits).toBe(1200);
    });
});

describe('Anticoagulation — heparin redose', () => {
    it('triggers when HPT < 2.0 IU/mL', () => {
        const r = heparinRedose({ hpt: 1.5, act: 600, weight: 10 });
        expect(r.trigger).toBe(true);
        expect(r.doseUnits).toBe(1000);
        expect(r.reasons.join(' ')).toMatch(/HPT/);
    });
    it('triggers when ACT < 480 sec', () => {
        const r = heparinRedose({ hpt: 2.5, act: 450, weight: 10 });
        expect(r.trigger).toBe(true);
        expect(r.doseUnits).toBe(1000);
        expect(r.reasons.join(' ')).toMatch(/ACT/);
    });
    it('does not trigger when both adequate', () => {
        const r = heparinRedose({ hpt: 2.5, act: 600, weight: 10 });
        expect(r.trigger).toBe(false);
        expect(r.doseUnits).toBe(0);
    });
});

describe('Anticoagulation — protamine reversal', () => {
    it('U of M neonate: 1:1 of loading dose', () => {
        const r = protamineReversal({
            protocol: 'UOFM', weight: 3.5, ageYears: 0.05,
            loadingUnits: 2100, totalUnits: 4200
        });
        // 2100 U / 100 = 21 mg
        expect(r.rawMg).toBeCloseTo(21, 1);
        expect(r.basis).toMatch(/loading.*neonate/i);
    });
    it('U of M >30 days: 1:1 of total cumulative heparin', () => {
        const r = protamineReversal({
            protocol: 'UOFM', weight: 20, ageYears: 5,
            loadingUnits: 10000, totalUnits: 14000
        });
        // 14000 / 100 = 140 mg, but cap is 5*20 = 100 mg
        expect(r.rawMg).toBe(140);
        expect(r.cap).toBe(100);
        expect(r.capApplied).toBe(true);
        expect(r.mg).toBe(100);
    });
    it('5 mg/kg cap applies in standard cases', () => {
        const r = protamineReversal({
            protocol: 'UOFM', weight: 10, ageYears: 3,
            loadingUnits: 5000, totalUnits: 8000
        });
        // 8000/100 = 80, cap = 50 → mg=50, capApplied=true
        expect(r.cap).toBe(50);
        expect(r.capApplied).toBe(true);
        expect(r.mg).toBe(50);
    });
    it('NCH neonate may exceed 5 mg/kg per source', () => {
        const r = protamineReversal({
            protocol: 'NCH', weight: 3, ageYears: 0.05,
            loadingUnits: 1800, totalUnits: 1800, pumpUnits: 200
        });
        // combined = 2000, 2000/100 = 20 mg; cap = 15 mg → allowed over
        expect(r.allowOverCap).toBe(true);
        expect(r.mg).toBe(20);
    });
    it('Hemobag adds 50 mg', () => {
        const r = protamineReversal({
            protocol: 'UOFM', weight: 60, ageYears: 16,
            loadingUnits: 27000, totalUnits: 30000,
            includeHemobag: true
        });
        // 30000/100 = 300, cap = 300 → no cap, +50 hemobag = 350
        expect(r.hemobagAdded).toBe(50);
        expect(r.mg).toBe(350);
    });
});

describe('Anticoagulation — slope decision', () => {
    it('80-120 → NCH', () => {
        expect(slopeDecision(100).protocol).toBe('NCH');
    });
    it('out of range → ATIII / U of M', () => {
        expect(slopeDecision(70).protocol).toBe('UOFM-or-ATIII');
        expect(slopeDecision(130).protocol).toBe('UOFM-or-ATIII');
    });
});
