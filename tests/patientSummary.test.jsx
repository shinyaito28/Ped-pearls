import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, renderHook, screen, fireEvent, act, cleanup } from '@testing-library/react';
import PatientChip from '../src/components/PatientChip';
import { useCollapsibleBar } from '../src/hooks/useCollapsibleBar';
import { formatPatientSummaryNumber } from '../src/utils/patientSummary';

let patient = {}, lang = 'en';
vi.mock('../src/context/PatientContext', () => ({ usePatient: () => patient }));
vi.mock('../src/context/LanguageContext', () => ({ useLanguage: () => ({ t: (en, ja) => lang === 'ja' ? ja : en }) }));
afterEach(() => { cleanup(); vi.useRealTimers(); localStorage.clear(); lang = 'en'; });
const setup = (values = {}) => {
    patient = { age: 3, ageUnit: 'years', weight: 10, height: 95, gender: 'male', isPreemie: false, ...values };
    const props = { onExpand: vi.fn(), pref: 'auto', setPref: vi.fn() };
    render(<PatientChip {...props} />);
    return props;
};

describe('Accessible patient summary', () => {
    it('names exact age and unit, weight, height and sex and expands from the main button', () => {
        const props = setup();
        const button = screen.getByRole('button', { name: 'Expand patient inputs: 3y, 10 kg, 95 cm, male' });
        expect(button).toHaveAttribute('aria-expanded', 'false');
        expect(button).toHaveAttribute('aria-controls', 'patient-inputs');
        fireEvent.click(button);
        expect(props.onExpand).toHaveBeenCalledOnce();
    });
    it('shortens only the visual long values and retains their exact accessible values', () => {
        setup({ weight: '12.34567890123', height: '123.4567890123' });
        expect(screen.getByRole('button', { name: /12\.34567890123 kg, 123\.4567890123 cm/ })).toBeVisible();
        expect(screen.getByText('≈12.35')).toBeVisible();
        expect(patient.weight).toBe('12.34567890123');
        expect(patient.height).toBe('123.4567890123');
    });
    it('keeps newborn zero distinct from absent values', () => {
        setup({ age: 0, ageUnit: 'days', height: '' });
        expect(screen.getByRole('button', { name: /0d, 10 kg, — cm/ })).toBeVisible();
    });
    it('identifies months, female and premature status in Japanese', () => {
        lang = 'ja'; setup({ age: 12, ageUnit: 'months', gender: 'female', isPreemie: true });
        expect(screen.getByRole('button', { name: '患者入力欄を展開: 12か月, 10 kg, 95 cm, 女、早産児' })).toBeVisible();
        expect(screen.getByTitle('早産児')).toHaveTextContent('早');
    });
    it('closes preferences with Escape and restores keyboard focus', () => {
        setup(); const button = screen.getByRole('button', { name: 'Bar preferences' });
        fireEvent.click(button);
        expect(screen.getByRole('dialog')).toBeVisible();
        fireEvent.keyDown(window, { key: 'Escape' });
        expect(screen.queryByRole('dialog')).toBeNull();
        expect(button).toHaveFocus();
    });
    it('keeps the existing always-open preference available', () => {
        const props = setup(); fireEvent.click(screen.getByRole('button', { name: 'Bar preferences' }));
        fireEvent.click(screen.getByRole('button', { name: /Always show/ }));
        expect(props.setPref).toHaveBeenCalledWith('always-open');
        expect(screen.queryByRole('dialog')).toBeNull();
    });
});

describe('Display-only number abbreviation', () => {
    it.each([0, 1.234, 0.0001, 12.34, 123.456])('retains ordinary clinical values exactly: %s', value => {
        expect(formatPatientSummaryNumber(value)).toBe(String(value));
    });
    it('makes huge or tiny values explicit approximations without silently clipping digits', () => {
        for (const value of [123456789.1234, 1.23456789e-120, Number.MAX_VALUE]) {
            const text = formatPatientSummaryNumber(value);
            expect(text.startsWith('≈')).toBe(true);
            expect(text.length).toBeLessThanOrEqual(7);
        }
    });
    it('does not turn missing or invalid values into zero', () => {
        for (const value of ['', null, undefined, NaN, Infinity]) expect(formatPatientSummaryNumber(value)).toBe('—');
    });
});

describe('Existing five-second lifecycle', () => {
    it('collapses at five seconds, not before, and expands again', () => {
        vi.useFakeTimers(); const { result } = renderHook(() => useCollapsibleBar({ canCollapse: true }));
        act(() => vi.advanceTimersByTime(4999)); expect(result.current.mode).toBe('expanded');
        act(() => vi.advanceTimersByTime(1)); expect(result.current.mode).toBe('collapsed');
        act(() => result.current.expand()); expect(result.current.mode).toBe('expanded');
    });
    it('restarts the five-second delay after an interaction', () => {
        vi.useFakeTimers(); const { result } = renderHook(() => useCollapsibleBar({ canCollapse: true }));
        act(() => vi.advanceTimersByTime(4000)); act(() => result.current.bumpInteraction());
        act(() => vi.advanceTimersByTime(4999)); expect(result.current.mode).toBe('expanded');
        act(() => vi.advanceTimersByTime(1)); expect(result.current.mode).toBe('collapsed');
    });
    it('does not hide invalid weight inputs', () => {
        vi.useFakeTimers(); const { result } = renderHook(() => useCollapsibleBar({ canCollapse: false }));
        act(() => vi.advanceTimersByTime(10000)); expect(result.current.mode).toBe('expanded');
    });
    it('retains a stored always-open preference', () => {
        vi.useFakeTimers(); localStorage.setItem('ped_pearls_bar_pref', 'always-open');
        const { result } = renderHook(() => useCollapsibleBar({ canCollapse: true }));
        act(() => vi.advanceTimersByTime(10000)); expect(result.current.mode).toBe('expanded');
    });
});
