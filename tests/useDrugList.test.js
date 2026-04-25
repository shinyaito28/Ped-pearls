import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { PatientProvider, usePatient } from '../src/context/PatientContext';
import { useDrugList } from '../src/hooks/useDrugList';

// Helper: a wrapper that exposes both the patient setters and the drug list.
const useTestRig = () => {
    const drugs = useDrugList('all');
    const patient = usePatient();
    return { drugs, patient };
};

const wrap = ({ children }) => React.createElement(PatientProvider, null, children);

describe('useDrugList — Phase 1 dose accuracy fixes', () => {
    it('Calcium Gluconate is 30 mg/kg (not 60-100)', () => {
        const { result } = renderHook(() => useTestRig(), { wrapper: wrap });
        const cg = result.current.drugs.find(d => d.name === 'Calcium Gluconate');
        expect(cg).toBeDefined();
        expect(cg.dose).toBe('30 mg/kg');
    });
    it('Glycopyrrolate is 15 mcg/kg (= 0.015 mg/kg)', () => {
        const { result } = renderHook(() => useTestRig(), { wrapper: wrap });
        const gly = result.current.drugs.find(d => d.name === 'Glycopyrrolate');
        expect(gly.dose).toBe('15 mcg/kg');
    });
    it('Calcium Chloride is 10-15 mg/kg (not 10-20)', () => {
        const { result } = renderHook(() => useTestRig(), { wrapper: wrap });
        const cc = result.current.drugs.find(d => d.name === 'Calcium Chloride');
        expect(cc.dose).toBe('10-15 mg/kg');
    });
    it('Etomidate is 0.3 mg/kg', () => {
        const { result } = renderHook(() => useTestRig(), { wrapper: wrap });
        const et = result.current.drugs.find(d => d.name === 'Etomidate');
        expect(et.dose).toBe('0.3 mg/kg');
    });
    it('Flumazenil is 1-10 mcg/kg max 1 mg', () => {
        const { result } = renderHook(() => useTestRig(), { wrapper: wrap });
        const f = result.current.drugs.find(d => d.name === 'Flumazenil');
        expect(f.dose).toBe('1-10 mcg/kg');
        expect(f.max).toBe(1000);
    });
});

describe('useDrugList — age-rule contraindications', () => {
    it('Promethazine is contraindicated <2 yr (default 1 yr patient)', () => {
        const { result } = renderHook(() => useTestRig(), { wrapper: wrap });
        const p = result.current.drugs.find(d => d.name === 'Promethazine');
        expect(p.badge).toBe('contraindicated');
    });
    it('Tramadol is contraindicated <12 yr', () => {
        const { result } = renderHook(() => useTestRig(), { wrapper: wrap });
        const t = result.current.drugs.find(d => d.name === 'Tramadol');
        expect(t.badge).toBe('contraindicated');
    });
});

describe('useDrugList — antibiotic neonate dosing', () => {
    it('Cefazolin uses neonate 25 mg/kg when patient is a neonate', () => {
        const { result, rerender } = renderHook(() => useTestRig(), { wrapper: wrap });
        // Switch the patient to a neonate (5 days old).
        act(() => {
            result.current.patient.setAge(5);
            result.current.patient.setAgeUnit('days');
        });
        rerender();
        const cef = result.current.drugs.find(d => d.name === 'Cefazolin (Ancef)');
        expect(cef.realDose).toBe('25 mg/kg');
        expect(cef.badge).toBe('neonate');
    });
});
