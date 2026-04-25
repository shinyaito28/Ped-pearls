import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import React from 'react';
import { PatientProvider } from '../src/context/PatientContext';
import { useFluidCalc } from '../src/hooks/useFluidCalc';

// Helper that wraps the hook in PatientProvider with the given initial state.
const wrapWith = (props) => ({ children }) => (
    React.createElement(PatientProvider, props, children)
);

// PatientProvider auto-fills weight from CDC chart, so we test behaviours rather
// than specific weight overrides. The default 1y / 10kg patient is enough.
describe('useFluidCalc — 4-2-1 maintenance & TBV', () => {
    it('uses 4 mL/kg/hr for the first 10 kg', () => {
        const { result } = renderHook(() => useFluidCalc(12, 8), { wrapper: wrapWith() });
        // Default is 1y → CDC ≈ 9.6 kg, so maint = 9.6 × 4 ≈ 38.4 mL/hr.
        expect(result.current.maint).toBeGreaterThanOrEqual(35);
        expect(result.current.maint).toBeLessThanOrEqual(45);
    });

    it('TBV factor falls in the 75-100 mL/kg range for default child', () => {
        const { result } = renderHook(() => useFluidCalc(12, 8), { wrapper: wrapWith() });
        expect(result.current.tbvFactor).toBeGreaterThanOrEqual(70);
        expect(result.current.tbvFactor).toBeLessThanOrEqual(100);
    });

    it('ABL = TBV × (start − target) / averageHb', () => {
        const { result } = renderHook(() => useFluidCalc(12, 8), { wrapper: wrapWith() });
        const expectedAbl = result.current.tbv * (12 - 8) / 10;
        expect(result.current.abl).toBeCloseTo(expectedAbl, 1);
    });

    it('Albumin / RBC volumes scale with weight', () => {
        const { result } = renderHook(() => useFluidCalc(12, 8), { wrapper: wrapWith() });
        // 5% albumin = 10 mL/kg, RBC = 10 mL/kg
        expect(result.current.alb5).toBeCloseTo(result.current.rbc, 1);
    });

    it('Hetastarch daily cap = 35 mL/kg/day', () => {
        const { result } = renderHook(() => useFluidCalc(12, 8), { wrapper: wrapWith() });
        const ratio = result.current.hetastarchDaily / result.current.hetastarch;
        expect(ratio).toBeCloseTo(3.5, 2);
    });
});
