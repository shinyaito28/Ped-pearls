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
            loadingUnits: 1500, totalUnits: 4200
        });
        // Actual initial 1500 U / 100 = 15 mg; cumulative dose is not the neonatal basis.
        expect(r.rawMg).toBeCloseTo(15, 1);
        expect(r.mg).toBe(15);
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
    it.each(['NCH', 'UOFM'])('withholds %s neonatal doses above the disputed 5 mg/kg limit', protocol => {
        const r = protamineReversal({ protocol, weight: 3, ageYears: 0.05, loadingUnits: 1800, totalUnits: 1800, pumpUnits: 200 });
        expect(r.allowOverCap).toBe(false); expect(r.mg).toBeNull(); expect(r.status).toBe('held');
    });
    it('withholds the final dose when Hemobag requires protocol confirmation', () => {
        const r = protamineReversal({ protocol: 'UOFM', weight: 60, ageYears: 16, totalUnits: 30000, includeHemobag: true });
        expect(r.hemobagAdded).toBe(0); expect(r.mg).toBeNull(); expect(r.basis).toMatch(/Hemobag/);
    });
    it('requires actual patient and circuit inputs for NCH without falling back to a combined recommendation', () => {
        expect(protamineReversal({ protocol: 'NCH', weight: 20, ageYears: 3, loadingUnits: 4200, pumpUnits: 1000 }).mg).toBeNull();
        expect(protamineReversal({ protocol: 'NCH', weight: 20, ageYears: 3, totalUnits: 4200 }).mg).toBeNull();
        expect(protamineReversal({ protocol: 'NCH', weight: 20, ageYears: 3, totalUnits: 3200, pumpUnits: 1000 }).mg).toBe(42);
        expect(protamineReversal({ protocol: 'NCH', weight: 20, ageYears: 3, totalUnits: 3200, pumpUnits: 0 }).mg).toBe(32);
    });
    it('rejects missing, negative, nonfinite and overflowing required inputs', () => {
        const valid = { protocol: 'UOFM', weight: 20, ageYears: 3, totalUnits: 1000 };
        for (const field of ['weight', 'ageYears', 'totalUnits']) for (const value of [null, '', -1, NaN, Infinity, true])
            expect(protamineReversal({ ...valid, [field]: value }).mg).toBeNull();
        expect(protamineReversal({ ...valid, weight: 1e308 }).mg).toBeNull();
        expect(protamineReversal({ ...valid, ageDays: 30 }).mg).toBeNull();
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
