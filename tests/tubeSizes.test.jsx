import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, renderHook, act, fireEvent, screen, within, cleanup } from '@testing-library/react';
import { halfMillimeterNeighbors, tubeSizeOptions } from '../src/utils/tubeSizes';
import { PatientProvider, usePatient } from '../src/context/PatientContext';
import { useAirwayCalc } from '../src/hooks/useAirwayCalc';
import AirwayCard from '../src/components/AirwayCard';
import TubeSizePicker from '../src/components/TubeSizePicker';

vi.mock('../src/components/CatheterCard', () => ({ default: () => null }));
vi.mock('../src/components/DifficultAirwayCard', () => ({ default: () => null }));
afterEach(() => { cleanup(); localStorage.clear(); });
const wrapper = ({ children }) => <PatientProvider>{children}</PatientProvider>;

describe('Tube candidates use unrounded estimates', () => {
    it.each([
        [3.5, [3.5]], [3.6, [3.5, 4]], [3.75, [3.5, 4]],
        [5.6, [5.5, 6]], [4.49999999999, [4.5]],
    ])('finds half-mm neighbours for %s mm', (mm, expected) => {
        expect(halfMillimeterNeighbors(mm)).toEqual(expected);
    });
    it('does not invent sizes for unavailable or invalid results', () => {
        for (const size of [0, -1, NaN, Infinity]) expect(halfMillimeterNeighbors(size)).toEqual([]);
        expect(tubeSizeOptions('N/A')).toEqual([]);
        expect(tubeSizeOptions('3.0 mm')).toEqual([3]);
        expect(tubeSizeOptions('7.0-7.5 mm')).toEqual([7, 7.5]);
    });
    it('keeps both midpoint options unselected until the operator chooses', () => {
        render(<TubeSizePicker label="ETT test" reference="3.8 mm" calculatedMm={3.75} rule="test" />);
        expect(screen.getByText('Calculated estimate: 3.75 mm')).toBeVisible();
        const lower = screen.getByRole('button', { name: '3.5 mm' });
        const upper = screen.getByRole('button', { name: '4.0 mm' });
        expect(lower).toHaveAttribute('aria-pressed', 'false');
        expect(upper).toHaveAttribute('aria-pressed', 'false');
        fireEvent.click(lower);
        expect(lower).toHaveAttribute('aria-pressed', 'true');
        fireEvent.click(upper);
        expect(lower).toHaveAttribute('aria-pressed', 'false');
        expect(upper).toHaveAttribute('aria-pressed', 'true');
    });
    it('retains formula precision, existing newborn/infant/adult branches and depth', () => {
        const { result } = renderHook(() => ({ airway: useAirwayCalc(), patient: usePatient() }), { wrapper });
        const setAge = (age, ageUnit) => act(() => { result.current.patient.setAge(age); result.current.patient.setAgeUnit(ageUnit); });
        setAge(3, 'years');
        expect(result.current.airway.ettUncuffedCalculatedMm).toBe(4.75);
        expect(result.current.airway.ettCuffedCalculatedMm).toBe(4.25);
        expect(result.current.airway.depth).toBe('14 cm');
        setAge(8.4, 'years');
        expect(result.current.airway.ettCuffedCalculatedMm).toBeCloseTo(5.6, 10);
        setAge(0, 'days');
        expect(result.current.airway.ettUncuffed).toBe('3.0 mm');
        expect(result.current.airway.ettCuffed).toBe('N/A');
        expect(result.current.airway.ettCuffedCalculatedMm).toBeNull();
        setAge(3, 'months');
        expect(result.current.airway.ettUncuffed).toBe('3.5 mm');
        expect(result.current.airway.ettUncuffedCalculatedMm).toBeNull();
        setAge(12, 'years');
        expect(result.current.airway.beyondPediatricRange).toBe(true);
        expect(result.current.airway.ettCuffed).toBe('7.0-7.5 mm');
    });
    it('resets selected candidates when patient inputs change, even within the same neighbours', () => {
        let patient;
        const Rig = () => { patient = usePatient(); return <AirwayCard />; };
        render(<Rig />, { wrapper });
        act(() => patient.setAge(3));
        const group = () => screen.getByRole('group', { name: 'ETT (Cuffed)' });
        const lower = () => within(group()).getByRole('button', { name: '4.0 mm' });
        fireEvent.click(lower());
        expect(lower()).toHaveAttribute('aria-pressed', 'true');
        act(() => patient.setAge(3.1));
        expect(lower()).toHaveAttribute('aria-pressed', 'false');
        expect(screen.getByText('14.1 cm')).toBeVisible();
        act(() => { patient.setAge(0); patient.setAgeUnit('days'); });
        expect(within(group()).queryByRole('button')).not.toBeInTheDocument();
        expect(within(group()).getAllByText('N/A').length).toBeGreaterThan(0);
    });
});
