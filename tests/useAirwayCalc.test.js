import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { PatientProvider, usePatient } from '../src/context/PatientContext';
import { useAirwayCalc } from '../src/hooks/useAirwayCalc';

// Wrap useAirwayCalc together with the patient setters so each test can set
// age/gender/preemie before reading the calculator's outputs.
const useTestRig = () => {
    const airway = useAirwayCalc();
    const patient = usePatient();
    return { airway, patient };
};

const wrap = ({ children }) => React.createElement(PatientProvider, null, children);

const setAge = (rig, value, unit = 'years') => {
    act(() => {
        rig.patient.setAge(value);
        rig.patient.setAgeUnit(unit);
    });
};
const setGender = (rig, g) => act(() => rig.patient.setGender(g));
const setPreemie = (rig, flag) => act(() => rig.patient.setIsPreemie(flag));

describe('useAirwayCalc — laryngoscope blade by age', () => {
    it('preemie → Miller 0', () => {
        const { result } = renderHook(useTestRig, { wrapper: wrap });
        setPreemie(result.current, true);
        expect(result.current.airway.blade).toBe('Miller 0');
    });

    it('term neonate (5 days) → Miller 0', () => {
        const { result } = renderHook(useTestRig, { wrapper: wrap });
        setAge(result.current, 5, 'days');
        expect(result.current.airway.blade).toBe('Miller 0');
    });

    it('3 months → Miller 1', () => {
        const { result } = renderHook(useTestRig, { wrapper: wrap });
        setAge(result.current, 3, 'months');
        expect(result.current.airway.blade).toBe('Miller 1');
    });

    it('9 months → Miller 1 / Wis-Hipple 1.5', () => {
        const { result } = renderHook(useTestRig, { wrapper: wrap });
        setAge(result.current, 9, 'months');
        expect(result.current.airway.blade).toBe('Miller 1 / Wis-Hipple 1.5');
    });

    it('1 yr (default) → Mac 1 / Miller 1 / Wis-Hipple 1.5', () => {
        const { result } = renderHook(useTestRig, { wrapper: wrap });
        // Default already 1 yr, but assert explicitly.
        setAge(result.current, 1, 'years');
        expect(result.current.airway.blade).toBe('Mac 1 / Miller 1 / Wis-Hipple 1.5');
    });

    it('4 yr → Mac 2 / Miller 1 / Wis-Hipple 1.5 (NCH source range)', () => {
        const { result } = renderHook(useTestRig, { wrapper: wrap });
        setAge(result.current, 4, 'years');
        expect(result.current.airway.blade).toBe('Mac 2 / Miller 1 / Wis-Hipple 1.5');
    });

    it('8 yr → Mac 2 / Miller 2 (was incorrectly Mac 2 before)', () => {
        const { result } = renderHook(useTestRig, { wrapper: wrap });
        setAge(result.current, 8, 'years');
        expect(result.current.airway.blade).toBe('Mac 2 / Miller 2');
    });

    it('11 yr → Mac 3 / Miller 2', () => {
        const { result } = renderHook(useTestRig, { wrapper: wrap });
        setAge(result.current, 11, 'years');
        expect(result.current.airway.blade).toBe('Mac 3 / Miller 2');
    });

    it('14 yr → Mac 3-4 / Miller 2-3', () => {
        const { result } = renderHook(useTestRig, { wrapper: wrap });
        setAge(result.current, 14, 'years');
        expect(result.current.airway.blade).toBe('Mac 3-4 / Miller 2-3');
    });

    it('16 yr → Mac 3-4 / Miller 2-3 (was incorrectly Mac 2 before)', () => {
        const { result } = renderHook(useTestRig, { wrapper: wrap });
        setAge(result.current, 16, 'years');
        expect(result.current.airway.blade).toBe('Mac 3-4 / Miller 2-3');
    });
});

describe('useAirwayCalc — ETT sizing', () => {
    it('preemie → 2.5 mm', () => {
        const { result } = renderHook(useTestRig, { wrapper: wrap });
        setPreemie(result.current, true);
        expect(result.current.airway.ettUncuffed).toBe('2.5 mm');
        expect(result.current.airway.ettCuffed).toBe('N/A');
    });

    it('term NB → 3.0 mm', () => {
        const { result } = renderHook(useTestRig, { wrapper: wrap });
        setAge(result.current, 5, 'days');
        expect(result.current.airway.ettUncuffed).toBe('3.0 mm');
    });

    it('4 yr → (4/4)+4 = 5.0 mm uncuffed, 4.5 cuffed', () => {
        const { result } = renderHook(useTestRig, { wrapper: wrap });
        setAge(result.current, 4, 'years');
        expect(result.current.airway.ettUncuffed).toBe('5.0 mm');
        expect(result.current.airway.ettCuffed).toBe('4.5 mm');
    });

    it('8 yr → (8/4)+4 = 6.0 mm uncuffed, 5.5 cuffed', () => {
        const { result } = renderHook(useTestRig, { wrapper: wrap });
        setAge(result.current, 8, 'years');
        expect(result.current.airway.ettUncuffed).toBe('6.0 mm');
        expect(result.current.airway.ettCuffed).toBe('5.5 mm');
    });

    it('14 yr female → adult ETT 7.0 mm, flag beyondPediatricRange', () => {
        const { result } = renderHook(useTestRig, { wrapper: wrap });
        setAge(result.current, 14, 'years');
        setGender(result.current, 'female');
        expect(result.current.airway.ettUncuffed).toBe('7.0 mm');
        expect(result.current.airway.ettCuffed).toBe('6.5-7.0 mm');
        expect(result.current.airway.ettRule).toBe('≥12 yr → adult sizing');
        expect(result.current.airway.beyondPediatricRange).toBe(true);
    });

    it('16 yr male → adult ETT 7.5-8.0 mm', () => {
        const { result } = renderHook(useTestRig, { wrapper: wrap });
        setAge(result.current, 16, 'years');
        setGender(result.current, 'male');
        expect(result.current.airway.ettUncuffed).toBe('7.5-8.0 mm');
        expect(result.current.airway.ettCuffed).toBe('7.0-7.5 mm');
        expect(result.current.airway.beyondPediatricRange).toBe(true);
    });

    it('11 yr → still pediatric range, no flag', () => {
        const { result } = renderHook(useTestRig, { wrapper: wrap });
        setAge(result.current, 11, 'years');
        expect(result.current.airway.beyondPediatricRange).toBe(false);
        expect(result.current.airway.ettRule).toBe('(Age / 4) + 4');
    });
});

describe('useAirwayCalc — depth at lip', () => {
    it('5 yr → age + 11 = 16 cm', () => {
        const { result } = renderHook(useTestRig, { wrapper: wrap });
        setAge(result.current, 5, 'years');
        expect(result.current.airway.depth).toBe('16 cm');
    });

    it('teen ≥ 11 yr caps at 22 cm', () => {
        const { result } = renderHook(useTestRig, { wrapper: wrap });
        setAge(result.current, 16, 'years');
        expect(result.current.airway.depth).toBe('22 cm');
    });
});

describe('useAirwayCalc — OLV regression check', () => {
    it('16 yr male → DLT 35-37 (F), 37-39 (M)', () => {
        const { result } = renderHook(useTestRig, { wrapper: wrap });
        setAge(result.current, 16, 'years');
        expect(result.current.airway.olv.type).toBe('DLT');
        expect(result.current.airway.olv.size).toMatch(/35-37 Fr.*37-39 Fr/);
    });
    it('5 yr → Bronchial Blocker (Intraluminal)', () => {
        const { result } = renderHook(useTestRig, { wrapper: wrap });
        setAge(result.current, 5, 'years');
        expect(result.current.airway.olv.type).toBe('Bronchial Blocker (Intraluminal)');
    });
});
