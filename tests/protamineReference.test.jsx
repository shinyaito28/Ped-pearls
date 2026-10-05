import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import ProtamineReferenceCalculator from '../src/components/ProtamineReferenceCalculator';
import { calculateProtamineReference as calc } from '../src/utils/protamineReference';

let patient = { weight: 20, age: 3, ageUnit: 'years', gender: 'male', isPreemie: false };
let language = 'en';
vi.mock('../src/context/PatientContext', () => ({ usePatient: () => patient }));
vi.mock('../src/context/LanguageContext', () => ({ useLanguage: () => ({ t: (en, ja) => language === 'ja' ? ja : en }) }));
afterEach(() => { cleanup(); language = 'en'; patient = { weight: 20, age: 3, ageUnit: 'years', gender: 'male', isPreemie: false }; });
const reference = { basis: 'patient-cumulative', heparinUnits: 3000, ratio: 1 };

describe('Protamine reference arithmetic, independent of therapeutic dosing', () => {
    it('converts3000U to30mg and3mL only when10mg/mL is entered', () => {
        expect(calc(reference)).toMatchObject({ mg: 30, ml: null, mgPerKg: null });
        expect(calc({ ...reference, concentration: 10, weight: 20 })).toMatchObject({ mg: 30, ml: 3, mgPerKg: 1.5 });
    });
    it('uses the chosen1.3 ratio without inferring a dose or cap from weight', () => {
        expect(calc({ ...reference, ratio: 1.3 }).mg).toBe(39);
        expect(calc({ ...reference, heparinUnits: 8000, weight: 3 }).mg).toBe(80);
    });
    it('counts an actual combined total once, and adds no Hemobag amount', () => {
        expect(calc({ ...reference, basis: 'combined', heparinUnits: 4200, pumpUnits: 1000, includeHemobag: true }).mg).toBe(42);
    });
    it('accepts explicitly enteredzero aszero arithmetic with no fallback', () => {
        expect(calc({ ...reference, heparinUnits: 0, concentration: 10 })).toMatchObject({ mg: 0, ml: 0 });
    });
    it.each(['', ' ', null, undefined, -1, Infinity, NaN, true, '3000junk'])('rejects unavailable/invalid UFH units %s', heparinUnits => {
        expect(calc({ ...reference, heparinUnits })).toBeNull();
    });
    it.each(['', 0, -1, Infinity, 'bad', true])('requires a positive finite ratio %s', ratio => {
        expect(calc({ ...reference, ratio })).toBeNull();
    });
    it('requires a named basis and rejects overflow', () => {
        expect(calc({ ...reference, basis: '' })).toBeNull();
        expect(calc({ ...reference, basis: 'unknown' })).toBeNull();
        expect(calc({ ...reference, heparinUnits: 1e308, ratio: 1e308 })).toBeNull();
    });
    it.each(['', 0, -1, Infinity, 'bad'])('withholds mL at missing/invalid concentration%s while keeping mg', concentration => {
        expect(calc({ ...reference, concentration })).toMatchObject({ mg: 30, ml: null });
    });
});

describe('Visible calculator and actual-input boundaries', () => {
    it('starts without an inferred heparin basis or actual dose, then calculates30mg', () => {
        const view = render(<ProtamineReferenceCalculator />);
        expect(screen.getByLabelText('Protamine heparin basis')).toHaveValue('');
        expect(screen.getByLabelText('Protamine heparin units')).toHaveValue(null);
        expect(view.container.querySelector('[data-protamine-reference-mg]')).toHaveTextContent('—');
        fireEvent.change(screen.getByLabelText('Protamine heparin basis'), { target: { value: 'patient-cumulative' } });
        fireEvent.change(screen.getByLabelText('Protamine heparin units'), { target: { value: '3000' } });
        expect(view.container.querySelector('[data-protamine-reference-mg]')).toHaveTextContent('30 mg');
        fireEvent.change(screen.getByLabelText('Protamine ratio mg per 100 units'), { target: { value: '1.3' } });
        expect(view.container.querySelector('[data-protamine-reference-mg]')).toHaveTextContent('39 mg');
        fireEvent.click(screen.getByText('Volume, sources and scope'));
        fireEvent.change(screen.getByLabelText('Protamine product concentration mg per mL'), { target: { value: '10' } });
        expect(view.container.querySelector('[data-protamine-reference-ml]')).toHaveTextContent('3.9 mL');
        fireEvent.change(screen.getByLabelText('Protamine heparin units'), { target: { value: '' } });
        expect(view.container.querySelector('[data-protamine-reference-mg]')).toHaveTextContent('—');
        expect(view.container.querySelector('[data-protamine-reference-ml]')).toBeNull();
    });
    it('clears actual input when the named basis changes', () => {
        const view = render(<ProtamineReferenceCalculator />);
        fireEvent.change(screen.getByLabelText('Protamine heparin basis'), { target: { value: 'combined' } });
        fireEvent.change(screen.getByLabelText('Protamine heparin units'), { target: { value: '4200' } });
        expect(view.container.querySelector('[data-protamine-reference-mg]')).toHaveTextContent('42 mg');
        fireEvent.change(screen.getByLabelText('Protamine heparin basis'), { target: { value: 'patient-initial' } });
        expect(screen.getByLabelText('Protamine heparin units')).toHaveValue(null);
        expect(view.container.querySelector('[data-protamine-reference-mg]')).toHaveTextContent('—');
    });
    it.each(['weight', 'age', 'ageUnit', 'gender', 'isPreemie'])('clears old actual amounts when patient%s changes', field => {
        const view = render(<ProtamineReferenceCalculator />);
        fireEvent.change(screen.getByLabelText('Protamine heparin basis'), { target: { value: 'patient-cumulative' } });
        fireEvent.change(screen.getByLabelText('Protamine heparin units'), { target: { value: '3000' } });
        patient = { ...patient, [field]: { weight: 21, age: 4, ageUnit: 'months', gender: 'female', isPreemie: true }[field] };
        view.rerender(<ProtamineReferenceCalculator />);
        expect(screen.getByLabelText('Protamine heparin units')).toHaveValue(null);
        expect(screen.getByLabelText('Protamine heparin basis')).toHaveValue('');
        expect(view.container.querySelector('[data-protamine-reference-mg]')).toHaveTextContent('—');
    });
    it('shows uncapped80mg conversion for a neonatal header and explicitzero without inference', () => {
        patient = { ...patient, weight: 3, age: 10, ageUnit: 'days' };
        const view = render(<ProtamineReferenceCalculator />);
        fireEvent.change(screen.getByLabelText('Protamine heparin basis'), { target: { value: 'patient-initial' } });
        fireEvent.change(screen.getByLabelText('Protamine heparin units'), { target: { value: '8000' } });
        expect(view.container.querySelector('[data-protamine-reference-mg]')).toHaveTextContent('80 mg');
        fireEvent.change(screen.getByLabelText('Protamine heparin units'), { target: { value: '0' } });
        expect(view.container.querySelector('[data-protamine-reference-mg]')).toHaveTextContent('0 mg');
    });
    it('keeps Japanese copy concise and the detailed scope folded', () => {
        language = 'ja';
        const view = render(<ProtamineReferenceCalculator />);
        expect(screen.getByText('プロタミン参考換算')).toBeVisible();
        expect(screen.getByText('参考換算です。経過時間・残存量・プロトコルを確認。')).toBeVisible();
        expect(view.container.querySelector('details')).not.toHaveAttribute('open');
    });
});
