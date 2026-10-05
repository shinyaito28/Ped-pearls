import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, within, cleanup } from '@testing-library/react';
import { getVitals, getSbpHypotension } from '../src/data/vitals';
import CorrectionsCard from '../src/components/CorrectionsCard';

let patient = { age: 10, ageUnit: 'years', ageYears: 10, weight: 31.2, idealWeight: 31.2, isNeonate: false };
vi.mock('../src/context/PatientContext', () => ({ usePatient: () => patient }));
vi.mock('../src/context/LanguageContext', () => ({ useLanguage: () => ({ t: en => en }) }));
afterEach(cleanup);

describe('Systolic hypotension reference', () => {
    it.each([[0, true, 60], [0.5, false, 70], [1, false, 72], [3.1, false, 76.2], [9.99, false, 89.98], [10, false, 90], [10.01, false, 90], [11, false, 90]])('evaluates %s years with strict less-than and correct units', (age, neonate, threshold) => {
        expect(getSbpHypotension(age, neonate).threshold).toBe(threshold);
        expect(getVitals(age, neonate).sbp).toBe(`<${threshold}`);
    });
    it.each(['', ' ', null, undefined, NaN, Infinity, -1, 'abc', '3junk'])('does not substitute a neonatal/adolescent threshold for unavailable age %s', age => {
        expect(getSbpHypotension(age, true)).toBeNull();
        expect(getVitals(age, true).sbp).toBe('—');
    });
    it('uses actual days at the neonatal boundary instead of the global 30-day flag', () => {
        expect(getSbpHypotension(28 / 364.8, true, { ageDays: 28 }).threshold).toBe(60);
        expect(getSbpHypotension(29 / 364.8, true, { ageDays: 29 }).threshold).toBe(70);
        expect(getSbpHypotension(0, true, { ageDays: 0, isPreemie: true }).threshold).toBeNull();
    });
    it('shows an evaluated 10-year threshold as the primary value and the formula separately', () => {
        render(<CorrectionsCard />);
        const tile = screen.getByLabelText('Systolic hypotension threshold');
        expect(within(tile).getByText('<90')).toBeVisible();
        expect(within(tile).getByText('mmHg')).toBeVisible();
        expect(within(tile).getByText('70 + 2 × 10 = 90')).toBeVisible();
        expect(tile).not.toHaveTextContent('2x age');
    });
    it('clears a previous threshold when the actual age input is empty', () => {
        const view = render(<CorrectionsCard />);
        patient = { ...patient, age: '', ageYears: NaN };
        view.rerender(<CorrectionsCard />);
        expect(screen.getByLabelText('Systolic hypotension threshold')).toHaveTextContent('Enter age');
        expect(screen.getByLabelText('Systolic hypotension threshold')).not.toHaveTextContent('<90');
        patient = { ...patient, age: 10, ageYears: 10 };
    });
});
