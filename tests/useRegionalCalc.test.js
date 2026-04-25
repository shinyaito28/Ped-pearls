import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import React from 'react';
import { PatientProvider } from '../src/context/PatientContext';
import { useRegionalCalc } from '../src/hooks/useRegionalCalc';

const wrapWith = ({ children }) => React.createElement(PatientProvider, null, children);

describe('useRegionalCalc — max LA doses (per Ped Pearls 2021)', () => {
    it('Lidocaine plain = 4.5 mg/kg', () => {
        const { result } = renderHook(() => useRegionalCalc(), { wrapper: wrapWith });
        const w = 9.6; // CDC 1y default ~9.6 kg
        expect(result.current.maxLido / w).toBeCloseTo(4.5, 1);
    });
    it('Lidocaine + epi = 7 mg/kg', () => {
        const { result } = renderHook(() => useRegionalCalc(), { wrapper: wrapWith });
        const w = 9.6;
        expect(result.current.maxLidoEpi / w).toBeCloseTo(7, 1);
    });
    it('Bupi plain = 2.5 / + epi = 3 mg/kg', () => {
        const { result } = renderHook(() => useRegionalCalc(), { wrapper: wrapWith });
        const w = 9.6;
        expect(result.current.maxBupi / w).toBeCloseTo(2.5, 1);
        expect(result.current.maxBupiEpi / w).toBeCloseTo(3, 1);
    });
    it('Ropi plain = +epi = 3.5 mg/kg', () => {
        const { result } = renderHook(() => useRegionalCalc(), { wrapper: wrapWith });
        const w = 9.6;
        expect(result.current.maxRopi / w).toBeCloseTo(3.5, 1);
        expect(result.current.maxRopiEpi / w).toBeCloseTo(3.5, 1);
    });
    it('Chloroprocaine plain 11 / + epi 14 mg/kg', () => {
        const { result } = renderHook(() => useRegionalCalc(), { wrapper: wrapWith });
        const w = 9.6;
        expect(result.current.maxChloro / w).toBeCloseTo(11, 1);
        expect(result.current.maxChloroEpi / w).toBeCloseTo(14, 1);
    });
    it('Caudal volume range = 0.5 - 1.25 mL/kg', () => {
        const { result } = renderHook(() => useRegionalCalc(), { wrapper: wrapWith });
        const w = 9.6;
        expect(result.current.caudalMin / w).toBeCloseTo(0.5, 2);
        expect(result.current.caudalMax / w).toBeCloseTo(1.25, 2);
    });
});
