import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import HeparinProtamineCard from '../src/components/HeparinProtamineCard';
import { calculateCpbProtamineReference as calc } from '../src/utils/cpbProtamineReference';

let patient = { weight: 20, age: 3, ageYears: 3, ageUnit: 'years', gender: 'male', isPreemie: false };
let language = 'en';
vi.mock('../src/context/PatientContext', () => ({ usePatient: () => patient }));
vi.mock('../src/context/LanguageContext', () => ({ useLanguage: () => ({ lang: language, t: (en, ja) => language === 'ja' ? ja : en }) }));
afterEach(() => { cleanup(); vi.unstubAllGlobals(); language = 'en'; patient = { weight: 20, age: 3, ageYears: 3, ageUnit: 'years', gender: 'male', isPreemie: false }; });
const base = { protocol: 'UOFM', mode: 'planning', weight: 20, age: 3, ageUnit: 'years' };
const mg = view => view.container.querySelector('[data-cpb-reference-mg]');
const actual = () => fireEvent.click(screen.getByLabelText('CPB actual heparin mode'));

describe('Source-specific CPB preparation and actual UFH arithmetic', () => {
    it.each([[0.5, 12000], [1, 10000], [5, 10000], [5.01, 9000], [12, 9000]])('uses the U of M initial recommendation at age%s without claiming cumulative administration', (age, units) => {
        expect(calc({ ...base, age })).toMatchObject({ sourceBasis: 'initial-plan', heparinUnits: units, mg: units / 100 });
    });
    it('uses 12months as1year and neonatal3kg as an18mg preparation conversion', () => {
        expect(calc({ ...base, age: 12, ageUnit: 'months' }).heparinUnits).toBe(10000);
        expect(calc({ ...base, age: 10, ageUnit: 'days', weight: 3 })).toMatchObject({ heparinUnits: 1800, mg: 18, institutionalLimitMg: 15, neonatalExceptionUnresolved: true });
    });
    it('uses a planned NCH HMS combined recommendation once and never adds actual pump input', () => {
        expect(calc({ ...base, protocol: 'NCH', hmsCombinedDose: 4200, pumpUnits: 1000 })).toMatchObject({ sourceBasis: 'combined-plan', heparinUnits: 4200, mg: 42 });
        expect(calc({ ...base, protocol: 'NCH', pumpUnits: 1000 })).toBeNull();
    });
    it('does not substitute a planned recommendation for missing actual initial or cumulative units', () => {
        expect(calc({ ...base, mode: 'actual' })).toBeNull();
        expect(calc({ ...base, mode: 'actual', age: 10, ageUnit: 'days', weight: 3 })).toBeNull();
        expect(calc({ ...base, protocol: 'NCH', mode: 'actual', hmsCombinedDose: 4200, pumpUnits: 1000 })).toBeNull();
    });
    it('NCH actual3200patient+1000circuit is42mg; explicit0circuit is32mg', () => {
        expect(calc({ ...base, protocol: 'NCH', mode: 'actual', totalUnits: 3200, pumpUnits: 1000 })).toMatchObject({ sourceBasis: 'actual-combined', mg: 42, patientUnits: 3200, circuitUnits: 1000 });
        expect(calc({ ...base, protocol: 'NCH', mode: 'actual', totalUnits: 3200, pumpUnits: 0 }).mg).toBe(32);
        expect(calc({ ...base, protocol: 'NCH', mode: 'actual', totalUnits: 3200 })).toBeNull();
    });
    it('U of M uses neonatal initial1500U not cumulative4200U, and switches after30days', () => {
        const actualInputs = { ...base, mode: 'actual', weight: 3, ageUnit: 'days', loadingUnits: 1500, totalUnits: 4200 };
        expect(calc({ ...actualInputs, age: 29 })).toMatchObject({ sourceBasis: 'actual-initial', mg: 15 });
        expect(calc({ ...actualInputs, age: 31 })).toMatchObject({ sourceBasis: 'actual-cumulative', mg: 42 });
    });
    it('30days needs an explicit actual-dose basis, not an inferred category', () => {
        const inputs = { ...base, mode: 'actual', age: 30, ageUnit: 'days', loadingUnits: 1500, totalUnits: 4200 };
        expect(calc(inputs)).toBeNull();
        expect(calc({ ...inputs, boundaryBasis: 'initial' }).mg).toBe(15);
        expect(calc({ ...inputs, boundaryBasis: 'cumulative' }).mg).toBe(42);
        expect(calc({ ...inputs, protocol: 'NCH', pumpUnits: 1000 }).mg).toBe(52);
        expect(calc({ ...base, age: 30, ageUnit: 'days' }).mg).toBe(120);
    });
    it('keeps raw80mg visible, separately reports a50mg institutional threshold, and adds no Hemobag amount', () => {
        expect(calc({ ...base, mode: 'actual', weight: 10, totalUnits: 8000, includeHemobag: true })).toMatchObject({ mg: 80, exceedsLimit: true, institutionalLimitMg: 50 });
        expect(calc({ ...base, mode: 'actual', totalUnits: 8000 }).mg).toBe(80);
    });
    it('exposes the U of M neonatal discrepancy only for U of M, not NCH', () => {
        const inputs = { ...base, age: 10, ageUnit: 'days', weight: 3, mode: 'actual', loadingUnits: 1800, totalUnits: 1800, pumpUnits: 200 };
        expect(calc(inputs)).toMatchObject({ mg: 18, neonatalExceptionUnresolved: true });
        expect(calc({ ...inputs, protocol: 'NCH' })).toMatchObject({ mg: 20, neonatalExceptionUnresolved: false, exceedsLimit: true });
    });
    it('explicitzero is0mg, ratio1.3 is39mg, and mL requires an entered concentration', () => {
        const inputs = { ...base, mode: 'actual', totalUnits: 3000 };
        expect(calc(inputs)).toMatchObject({ mg: 30, ml: null });
        expect(calc({ ...inputs, ratio: 1.3, concentration: 10 })).toMatchObject({ mg: 39, ml: 3.9 });
        expect(calc({ ...inputs, totalUnits: 0, concentration: 10 })).toMatchObject({ mg: 0, ml: 0 });
    });
    it.each(['', null, -1, true, NaN, Infinity])('rejects invalid age%s even in planning mode', age => expect(calc({ ...base, age })).toBeNull());
    it.each(['', null, 0, -1, true, Infinity])('rejects invalid weight%s', weight => expect(calc({ ...base, weight })).toBeNull());
    it('rejects unknown modes/units/protocols and overflow', () => {
        expect(calc({ ...base, mode: 'unknown' })).toBeNull();
        expect(calc({ ...base, ageUnit: 'unknown' })).toBeNull();
        expect(calc({ ...base, protocol: 'unknown' })).toBeNull();
        expect(calc({ ...base, weight: 1e308 })).toBeNull();
        expect(calc({ ...base, mode: 'actual', totalUnits: 1e308, ratio: 1e308 })).toBeNull();
    });
});

describe('Visible CPB reference workflow and context boundaries', () => {
    it('starts open with100mg preparation, shared20kg weight and no actual input fallback', () => {
        const view = render(<HeparinProtamineCard />);
        expect(mg(view)).toHaveTextContent('100 mg');
        expect(view.container.querySelector('[data-cpb-reference-weight]')).toHaveTextContent('20 kg');
        expect(screen.getByText('Planned initial patient dose; additional doses excluded')).toBeVisible();
        actual();
        expect(mg(view)).toHaveTextContent('—');
        expect(screen.getByLabelText('Actual patient cumulative heparin (exclude circuit)')).toHaveValue(null);
    });
    it('computes actual3000U to30mg; changing header weight clearsactual rather than reusing it', () => {
        const view = render(<HeparinProtamineCard />); actual();
        fireEvent.change(screen.getByLabelText('Actual patient cumulative heparin (exclude circuit)'), { target: { value: '3000' } });
        expect(mg(view)).toHaveTextContent('30 mg');
        patient = { ...patient, weight: 25 }; view.rerender(<HeparinProtamineCard />);
        expect(mg(view)).toHaveTextContent('—');
        fireEvent.click(screen.getByLabelText('CPB preparation mode'));
        expect(mg(view)).toHaveTextContent('125 mg');
    });
    it.each(['age', 'ageUnit', 'gender', 'isPreemie'])('clears actual dose on patient%s changes', field => {
        const view = render(<HeparinProtamineCard />); actual();
        fireEvent.change(screen.getByLabelText('Actual patient cumulative heparin (exclude circuit)'), { target: { value: '3000' } });
        patient = { ...patient, [field]: { age: 4, ageUnit: 'months', gender: 'female', isPreemie: true }[field] };
        view.rerender(<HeparinProtamineCard />);
        expect(mg(view)).toHaveTextContent('—');
    });
    it('NCH preparation42mg and actual42mg count combined HMS and separate actual totals once', () => {
        const view = render(<HeparinProtamineCard />);
        fireEvent.click(screen.getByRole('button', { name: /NCH Investigational HDR/ }));
        fireEvent.change(screen.getByLabelText('HMS COMBINED dose (patient + pump)'), { target: { value: '4200' } });
        expect(mg(view)).toHaveTextContent('42 mg'); actual(); expect(mg(view)).toHaveTextContent('—');
        fireEvent.change(screen.getByLabelText('Actual patient cumulative heparin (exclude circuit)'), { target: { value: '3200' } });
        fireEvent.change(screen.getByLabelText('Actual circuit heparin (NCH; 0 if none)'), { target: { value: '1000' } });
        expect(mg(view)).toHaveTextContent('42 mg');
        fireEvent.click(screen.getByLabelText('CPB Hemobag involved'));
        expect(mg(view)).toHaveTextContent('42 mg');
        expect(screen.getByText(/Base conversion only/)).toBeVisible();
    });
    it('retains a neonatal18mg conversion with the precise source warning and15mg threshold', () => {
        patient = { ...patient, age: 10, ageUnit: 'days', ageYears: 10 / 365, weight: 3 };
        const view = render(<HeparinProtamineCard />);
        expect(mg(view)).toHaveTextContent('18 mg');
        expect(view.container.querySelector('[data-cpb-limit-caution]')).toHaveTextContent('15 mg');
        expect(view.container.querySelector('[data-cpb-limit-caution]')).toHaveTextContent('U of M neonatal exception');
        actual(); expect(mg(view)).toHaveTextContent('—');
        fireEvent.change(screen.getByLabelText('Actual initial patient heparin (neonate)'), { target: { value: '1500' } });
        expect(mg(view)).toHaveTextContent('15 mg');
    });
    it('keeps actual80mg,0mg and invalid/blank states distinct, with optional volume', () => {
        const view = render(<HeparinProtamineCard />); actual();
        const input = screen.getByLabelText('Actual patient cumulative heparin (exclude circuit)');
        fireEvent.change(input, { target: { value: '8000' } }); expect(mg(view)).toHaveTextContent('80 mg');
        fireEvent.change(input, { target: { value: '0' } }); expect(mg(view)).toHaveTextContent('0 mg');
        fireEvent.change(input, { target: { value: '-1' } }); expect(mg(view)).toHaveTextContent('—');
        fireEvent.change(input, { target: { value: '' } }); expect(mg(view)).toHaveTextContent('—');
        fireEvent.change(input, { target: { value: '3000' } });
        fireEvent.change(screen.getByLabelText('CPB concentration (mg/mL)'), { target: { value: '10' } });
        expect(view.container.querySelector('[data-cpb-reference-ml]')).toHaveTextContent('3 mL');
    });
    it('requires an explicit basis at30days and clears actual amounts when it changes', () => {
        patient = { ...patient, age: 30, ageUnit: 'days', ageYears: 30 / 365, weight: 3 };
        const view = render(<HeparinProtamineCard />); actual();
        expect(mg(view)).toHaveTextContent('—');
        fireEvent.change(screen.getByLabelText('CPB 30-day heparin basis'), { target: { value: 'initial' } });
        fireEvent.change(screen.getByLabelText('Actual initial patient heparin (neonate)'), { target: { value: '1500' } });
        expect(mg(view)).toHaveTextContent('15 mg');
        fireEvent.change(screen.getByLabelText('CPB 30-day heparin basis'), { target: { value: 'cumulative' } });
        expect(mg(view)).toHaveTextContent('—');
    });
    it('copies preparation/actual labels and arithmetic without claiming final reversal', async () => {
        const writeText = vi.fn().mockResolvedValue(undefined); vi.stubGlobal('navigator', { clipboard: { writeText } });
        render(<HeparinProtamineCard />);
        await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Copy anticoag summary' })); });
        expect(writeText.mock.calls[0][0]).toMatch(/Preparation reference: 100 mg/);
        expect(writeText.mock.calls[0][0]).toMatch(/Planned initial patient/);
        actual(); fireEvent.change(screen.getByLabelText('Actual patient cumulative heparin (exclude circuit)'), { target: { value: '3000' } });
        await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Copy anticoag summary' })); });
        expect(writeText.mock.calls[1][0]).toMatch(/Entered actual UFH reference: 30 mg/);
        expect(writeText.mock.calls[1][0]).toMatch(/Reference only/);
    });
    it('keeps Japanese planning vs actual labels visible and details folded', () => {
        language = 'ja'; const view = render(<HeparinProtamineCard />);
        expect(screen.getByText('準備用参考量')).toBeVisible();
        expect(screen.getByText('準備用の参考換算です。予定量を実投与量として扱いません。')).toBeVisible();
        expect(view.container.querySelector('section[aria-label="CPB protamine reference"] details')).not.toHaveAttribute('open');
    });
});
