import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup, renderHook } from '@testing-library/react';
import { assessCaudalReference } from '../src/utils/regionalReference';
import LocalAnestheticPlan from '../src/components/LocalAnestheticPlan';
import RegionalCard from '../src/components/RegionalCard';
import { useAnticoag } from '../src/hooks/useAnticoag';
import { entries as procedures } from '../src/data/specialty/procedures';

let patient;
let lang = 'en';
vi.mock('../src/context/PatientContext', () => ({ usePatient: () => patient }));
vi.mock('../src/context/LanguageContext', () => ({ useLanguage: () => ({ lang, t: (en, ja) => lang === 'ja' ? ja : en }) }));
afterEach(() => { cleanup(); lang = 'en'; });
const child = { age: 3, ageUnit: 'years', ageYears: 3, weight: 10, isPreemie: false };
const plan = { drug: 'Bupivacaine', route: 'caudal', mode: 'single', formulation: 'plain', concentration: 0.25, concentrationUnit: 'percent', volume: 10 };

describe('One explicitly applicable single-caudal reference', () => {
    it.each([0, 3, 12, 215.999])('compares a pediatric age of %s months without selecting a dose', age => {
        expect(assessCaudalReference(plan, 10, { ...child, age, ageUnit: 'months' })).toMatchObject({ status: 'reference', ceilingMg: 25, ceilingMgPerKg: 2.5 });
    });
    it.each(['', null, true, -1, 'bad', Infinity, 216])('withholds a missing or out-of-scope age %s', age => {
        expect(assessCaudalReference(plan, 10, { ...child, age, ageUnit: 'months' })).toMatchObject({ status: 'held', reason: 'age' });
    });
    it.each([
        [{ route: 'epidural' }, 'route'], [{ route: 'spinal' }, 'route'], [{ mode: 'continuous' }, 'route'],
        [{ drug: 'Lidocaine' }, 'drug'], [{ formulation: '' }, 'formulation'], [{ formulation: 'admixture' }, 'formulation'],
        [{ concentration: 0.125 }, 'concentration'], [{ concentration: 0.3 }, 'concentration'],
    ])('does not borrow this ceiling for incompatible input %j', (change, reason) => {
        expect(assessCaudalReference({ ...plan, ...change }, 10, child)).toMatchObject({ status: 'held', reason });
    });
    it('holds prematurity and invalid patient/plan inputs', () => {
        expect(assessCaudalReference(plan, 10, { ...child, isPreemie: true }).reason).toBe('prematurity');
        expect(assessCaudalReference(plan, 10, { ...child, ageUnit: 'invalid' }).reason).toBe('age');
        for (const weight of [0, '', -1, Infinity]) expect(assessCaudalReference(plan, weight, child).status).toBe('held');
    });
    it('flags the 3.125 mg/kg bupivacaine combination and the ropivacaine boundary separately', () => {
        expect(assessCaudalReference({ ...plan, volume: 12.5 }, 10, child)).toMatchObject({ status: 'above-reference', ceilingMg: 25 });
        const ropi = { ...plan, drug: 'Ropivacaine', concentration: 0.2 };
        expect(assessCaudalReference(ropi, 10, child)).toMatchObject({ status: 'reference', ceilingMg: 20, ceilingMgPerKg: 2 });
        expect(assessCaudalReference({ ...ropi, volume: 10.01 }, 10, child).status).toBe('above-reference');
    });
});

const fill = (volume = '12.5') => {
    const change = (label, value) => fireEvent.change(screen.getByLabelText(label), { target: { value } });
    change(lang === 'ja' ? '投与経路' : 'Route', 'caudal');
    change(lang === 'ja' ? '投与方法' : 'Administration', 'single');
    change(lang === 'ja' ? '薬剤' : 'Drug', 'Bupivacaine');
    change(lang === 'ja' ? '製剤・添加薬' : 'Formulation / admixture', 'plain');
    change(lang === 'ja' ? '濃度' : 'Concentration', '0.25');
    change(lang === 'ja' ? '予定量 (mL)' : 'Planned volume (mL)', volume);
};

describe('Visible cautions and independent arithmetic', () => {
    it('leaves an above-reference entered amount intact and clears the comparison when age disappears', () => {
        patient = { ...child };
        const view = render(<LocalAnestheticPlan />);
        fill();
        expect(screen.getByText('31.25 mg · 3.125 mg/kg')).toBeVisible();
        expect(screen.getByText(/Above the cited reference ceiling/)).toBeVisible();
        expect(screen.getByLabelText('Planned volume (mL)')).toHaveValue(12.5);
        patient = { ...child, age: '' };
        view.rerender(<LocalAnestheticPlan />);
        expect(screen.queryByText(/Above the cited reference ceiling/)).not.toBeInTheDocument();
        expect(screen.queryByText('31.25 mg · 3.125 mg/kg')).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Add planned amount' })).toBeDisabled();
    });
    it('keeps arithmetic available when a formulation cannot support a reference comparison', () => {
        patient = { ...child };
        render(<LocalAnestheticPlan />);
        fill();
        fireEvent.change(screen.getByLabelText('Formulation / admixture'), { target: { value: 'admixture' } });
        expect(screen.getByText('31.25 mg · 3.125 mg/kg')).toBeVisible();
        expect(screen.getByText(/Comparison withheld:/)).toBeVisible();
        expect(screen.queryByText(/single caudal reference ceiling =/)).not.toBeInTheDocument();
    });
    it('does not pool routes or provide a cumulative remaining allowance', () => {
        patient = { ...child };
        render(<LocalAnestheticPlan />);
        fill('10');
        fireEvent.click(screen.getByRole('button', { name: 'Add planned amount' }));
        fireEvent.change(screen.getByLabelText('Route'), { target: { value: 'spinal' } });
        fireEvent.change(screen.getByLabelText('Planned volume (mL)'), { target: { value: '2' } });
        fireEvent.click(screen.getByRole('button', { name: 'Add planned amount' }));
        expect(screen.getByText('Arithmetic totals by drug, route and administration')).toBeVisible();
        expect(screen.queryByText('30 mg')).not.toBeInTheDocument();
        expect(screen.getByText(/Route-separated totals do not remove/)).toBeVisible();
    });
    it('shows the Japanese warning and formulation condition', () => {
        patient = { ...child }; lang = 'ja';
        render(<LocalAnestheticPlan />);
        fill();
        expect(screen.getByText(/出典の参考上限を超えています/)).toBeVisible();
        expect(screen.getByText('31.25 mg · 3.125 mg/kg')).toBeVisible();
        expect(screen.getByRole('link', { name: /ESRA\/ASRA/ })).toHaveAttribute('href', 'https://www.esraitalia.it/wp-content/uploads/2021/04/LA-dose-and-adjuvants-for-kids.pdf');
    });
    it('withholds generic maxima, unspecified blocks and route-unclear adjuvant calculations', () => {
        patient = { ...child, ageYears: 3, isNeonate: false };
        render(<RegionalCard />);
        fireEvent.click(screen.getByText('Pediatric and procedure-specific references'));
        fireEvent.click(screen.getByText('NCH source figures, adjuvants and evidence'));
        expect(screen.getByText(/Patient-specific maximum amounts are withheld/)).toBeVisible();
        expect(screen.getByText(/Automatic caudal volume withheld/)).toBeVisible();
        expect(screen.getByText(/Age, site allocation and protocol are not established/)).toBeVisible();
        expect(screen.getByText(/Automatic amounts are withheld/)).toBeVisible();
        expect(screen.getByText(/Lidocaine: 4.5 \/ 7 mg\/kg/)).not.toBeVisible();
        expect(screen.getByText('morphine: 30 mcg/kg')).not.toBeVisible();
    });
});

describe('Re-dose measurement and source-context guards', () => {
    it.each([{}, { hpt: 2.1 }, { act: 500 }, { hpt: '', act: 500 }, { hpt: 0, act: 500 }, { hpt: 2.1, act: -1 }])('withholds U of M instead of a green negative for %j', inputs => {
        patient = { ...child };
        const { result } = renderHook(() => useAnticoag({ protocol: 'UOFM', ...inputs }));
        expect(result.current.redose).toMatchObject({ reviewRequired: true, reviewReason: 'measurements', doseUnits: null });
    });
    it.each([1e308, 0.00001])('withholds overflow or rounded-zero re-dose for weight %s', weight => {
        patient = { ...child, weight };
        expect(renderHook(() => useAnticoag({ protocol: 'UOFM', hpt: 1.9, act: 500 })).result.current.redose).toMatchObject({ reviewRequired: true, doseUnits: null });
    });
    it('preserves the U of M 100 U/kg criterion with valid measurements, and does not apply it to NCH', () => {
        patient = { ...child };
        expect(renderHook(() => useAnticoag({ protocol: 'UOFM', hpt: 1.9, act: 500 })).result.current.redose).toMatchObject({ trigger: true, doseUnits: 1000 });
        expect(renderHook(() => useAnticoag({ protocol: 'UOFM', hpt: 2, act: 480 })).result.current.redose.trigger).toBe(false);
        expect(renderHook(() => useAnticoag({ protocol: 'NCH', hpt: 1.9, act: 500 })).result.current.redose).toMatchObject({ reviewReason: 'hms', doseUnits: null });
    });
    it('labels the spinal-caudal numbers as source references in both languages', () => {
        const entry = procedures.find(p => p.id === 'proc_spinal_caudal');
        const premed = entry.sections.find(s => s.heading === 'Spinal-Caudal — pre-op + setup');
        expect(premed.body).toMatch(/Source-only reference.*midazolam 0.8 mg\/kg/);
        expect(premed.bodyJa).toMatch(/経路・上限・適用する鎮静計画/);
        const cpc = entry.sections.find(s => s.heading === 'Spinal-Caudal — intra-op management');
        expect(cpc.body).toMatch(/not a general epidural infusion recommendation/);
        expect(cpc.bodyJa).toMatch(/一般の硬膜外持続用量としては推奨しません/);
    });
});
