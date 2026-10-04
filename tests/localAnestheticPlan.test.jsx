import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { calculateLocalAnestheticPlan, totalLocalAnestheticPlans } from '../src/utils/localAnestheticPlan';
import LocalAnestheticPlan from '../src/components/LocalAnestheticPlan';
import RegionalCard from '../src/components/RegionalCard';

let patient;
vi.mock('../src/context/PatientContext', () => ({ usePatient: () => patient }));
vi.mock('../src/context/LanguageContext', () => ({ useLanguage: () => ({ t: en => en }) }));
const plan = { drug: 'Bupivacaine', route: 'peripheral', mode: 'single', concentration: '0.25', concentrationUnit: 'percent', volume: '10' };
afterEach(cleanup);

describe('Planned local anesthetic unit conversions, not dose recommendations', () => {
    it.each([
        ['Bupivacaine', 'single', 'percent', 0.125, 5, 10, 1.25, 6.25, 0.625],
        ['Bupivacaine', 'single', 'mgPerMl', 2.5, 10, 20, 2.5, 25, 1.25],
        ['Ropivacaine', 'continuous', 'percent', 0.2, 5, 10, 2, 10, 1],
        ['Chloroprocaine', 'continuous', 'percent', 3, 4, 8, 30, 120, 15],
    ])('converts %s %s from explicit concentration and entered volume', (drug, mode, unit, concentration, volume, weight, mgPerMl, mg, mgPerKg) => {
        const result = calculateLocalAnestheticPlan({ ...plan, drug, mode, concentrationUnit: unit, concentration, volume }, weight);
        expect(result.mgPerMl).toBeCloseTo(mgPerMl);
        expect(result.percent).toBeCloseTo(mgPerMl / 10);
        expect(result.mg).toBeCloseTo(mg);
        expect(result.mgPerKg).toBeCloseTo(mgPerKg);
    });
    it('withholds results for missing, invalid and overflowing inputs', () => {
        for (const value of ['', 0, -1, NaN, Infinity, '1 kg', '1e309', null, true]) {
            expect(calculateLocalAnestheticPlan(plan, value)).toBeNull();
            expect(calculateLocalAnestheticPlan({ ...plan, concentration: value }, 10)).toBeNull();
            expect(calculateLocalAnestheticPlan({ ...plan, volume: value }, 10)).toBeNull();
        }
        for (const key of ['drug', 'route', 'mode', 'concentrationUnit']) expect(calculateLocalAnestheticPlan({ ...plan, [key]: '' }, 10)).toBeNull();
        expect(calculateLocalAnestheticPlan({ ...plan, concentration: 1e308 }, 10)).toBeNull();
        expect(calculateLocalAnestheticPlan({ ...plan, volume: 1e308 }, 10)).toBeNull();
    });
    it('exposes the caudal upper-volume / upper-concentration combination in mg/kg without inventing a cap', () => {
        const result = calculateLocalAnestheticPlan({ ...plan, route: 'caudal', concentration: 0.25, volume: 12.5 }, 10);
        expect(result.mgPerMl).toBe(2.5);
        expect(result.mg).toBe(31.25);
        expect(result.mgPerKg).toBe(3.125);
    });
    it('keeps drugs, routes and mg versus mg/hr separate without a mixed allowance', () => {
        const rows = [
            { drug: 'Bupivacaine', route: 'peripheral', mode: 'single', mg: 10 },
            { drug: 'Bupivacaine', route: 'peripheral', mode: 'single', mg: 15 },
            { drug: 'Bupivacaine', route: 'epidural', mode: 'single', mg: 5 },
            { drug: 'Bupivacaine', route: 'peripheral', mode: 'continuous', mg: 7 },
            { drug: 'Ropivacaine', route: 'peripheral', mode: 'single', mg: 20 },
        ];
        const result = totalLocalAnestheticPlans(rows);
        expect(result).toHaveLength(4);
        expect(result[0].mg).toBe(25);
        expect(result[1].mg).toBe(5);
        expect(result[2].mg).toBe(7);
        expect(result[3].mg).toBe(20);
        const acrossRoutes = totalLocalAnestheticPlans(rows, false);
        expect(acrossRoutes).toHaveLength(4);
        expect(acrossRoutes[0].mg).toBe(25);
        expect(acrossRoutes[0].routes).toEqual(['peripheral']);
        expect(acrossRoutes[1].mg).toBe(5);
        expect(totalLocalAnestheticPlans([rows[0], { ...rows[0], mg: Infinity }])[0].mg).toBe(10);
        expect(totalLocalAnestheticPlans([{ ...rows[0], mg: 1e308 }, { ...rows[0], mg: 1e308 }])[0].mg).toBeNull();
    });
});

const fill = (mode = 'single') => {
    fireEvent.change(screen.getByLabelText('Route'), { target: { value: 'peripheral' } });
    fireEvent.change(screen.getByLabelText('Administration'), { target: { value: mode } });
    fireEvent.change(screen.getByLabelText('Drug'), { target: { value: 'Bupivacaine' } });
    fireEvent.change(screen.getByLabelText('Concentration'), { target: { value: '0.25' } });
    fireEvent.change(screen.getByLabelText(mode === 'continuous' ? 'Planned rate (mL/hr)' : 'Planned volume (mL)'), { target: { value: '10' } });
};

describe('Planned amount UI and patient guards', () => {
    it('starts without protocol/drug/concentration defaults and converts then removes a plan', () => {
        patient = { weight: 10, age: 3, ageUnit: 'years', gender: 'male', isPreemie: false };
        render(<LocalAnestheticPlan />);
        expect(screen.getByRole('button', { name: 'Add planned amount' })).toBeDisabled();
        expect(screen.getByLabelText('Drug')).toHaveValue('');
        expect(screen.getByLabelText('Concentration')).toHaveValue(null);
        fill();
        expect(screen.getByText('25 mg · 2.5 mg/kg')).toBeVisible();
        expect(screen.getByText('0.25% = 2.5 mg/mL')).toBeVisible();
        fireEvent.click(screen.getByRole('button', { name: 'Add planned amount' }));
        expect(screen.getByRole('heading', { name: 'Entered plans' })).toBeVisible();
        fireEvent.click(screen.getByRole('button', { name: 'Remove plan 1' }));
        expect(screen.queryByRole('heading', { name: 'Entered plans' })).not.toBeInTheDocument();
    });
    it('labels continuous results per hour and clears concentration when its unit changes', () => {
        patient = { weight: 10, age: 3, ageUnit: 'years' };
        render(<LocalAnestheticPlan />);
        fill('continuous');
        expect(screen.getByText('25 mg/hr · 2.5 mg/kg/hr')).toBeVisible();
        fireEvent.change(screen.getByLabelText('Concentration unit'), { target: { value: 'mgPerMl' } });
        expect(screen.getByRole('button', { name: 'Add planned amount' })).toBeDisabled();
        expect(screen.getByLabelText('Concentration')).toHaveValue(null);
        fireEvent.change(screen.getByLabelText('Concentration'), { target: { value: '2.5' } });
        expect(screen.getByText('25 mg/hr · 2.5 mg/kg/hr')).toBeVisible();
    });
    it.each([['Route', 'epidural'], ['Administration', 'continuous'], ['Drug', 'Ropivacaine']])('requires amount re-entry when %s changes', (label, value) => {
        patient = { weight: 10, age: 3, ageUnit: 'years' };
        render(<LocalAnestheticPlan />);
        fill();
        expect(screen.getByRole('button', { name: 'Add planned amount' })).toBeEnabled();
        fireEvent.change(screen.getByLabelText(label), { target: { value } });
        expect(screen.getByRole('button', { name: 'Add planned amount' })).toBeDisabled();
        expect(screen.getByLabelText(value === 'continuous' ? 'Planned rate (mL/hr)' : 'Planned volume (mL)')).toHaveValue(null);
        if (label === 'Drug') expect(screen.getByLabelText('Concentration')).toHaveValue(null);
    });
    it.each([['weight', 20], ['age', 4], ['ageUnit', 'months'], ['gender', 'female'], ['isPreemie', true]])('clears plans when %s changes', (key, value) => {
        patient = { weight: 10, age: 3, ageUnit: 'years', gender: 'male', isPreemie: false };
        const view = render(<LocalAnestheticPlan />);
        fill();
        fireEvent.click(screen.getByRole('button', { name: 'Add planned amount' }));
        patient = { ...patient, [key]: value };
        view.rerender(<LocalAnestheticPlan />);
        expect(screen.queryByRole('heading', { name: 'Entered plans' })).not.toBeInTheDocument();
        expect(screen.getByLabelText('Drug')).toHaveValue('');
        expect(screen.getByRole('button', { name: 'Add planned amount' })).toBeDisabled();
    });
    it('withholds automatic spinal amounts and identifies the drug-specific infant reference', () => {
        patient = { weight: 20, age: 6, ageYears: 6, ageUnit: 'years', isNeonate: false };
        render(<RegionalCard />);
        expect(screen.queryByText('2.0 - 4.0 mL')).not.toBeInTheDocument();
        expect(screen.getByText(/The 2015 NCH spinal sheet lists/)).toBeVisible();
        const source = screen.getByText(/0.1–0.2 mL\/kg = 0.5–1 mg\/kg/);
        expect(source).not.toBeVisible();
        expect(source.closest('details')).not.toHaveAttribute('open');
        expect(screen.getByText(/Lidocaine: 4.5 \/ 7 mg\/kg/)).not.toBeVisible();
        expect(screen.queryByText(/total dose must stay under the lowest/)).not.toBeInTheDocument();
        expect(screen.getByText(/Concentration and volume ranges are not interchangeable options/)).toBeVisible();
    });
    it('shows the entered caudal combination as 3.125 mg/kg', () => {
        patient = { weight: 10, age: 3, ageUnit: 'years' };
        render(<LocalAnestheticPlan />);
        fill();
        fireEvent.change(screen.getByLabelText('Route'), { target: { value: 'caudal' } });
        fireEvent.change(screen.getByLabelText('Planned volume (mL)'), { target: { value: '12.5' } });
        expect(screen.getByText('31.25 mg · 3.125 mg/kg')).toBeVisible();
        expect(screen.getByText('Caudal · Single administration · 10 kg')).toBeVisible();
    });
    it('withholds patient-specific infusion rates and keeps uncertain coefficients inside a closed source disclosure', () => {
        patient = { weight: 20, age: 6, ageYears: 6, ageUnit: 'years', isNeonate: false };
        render(<RegionalCard />);
        expect(screen.getByText('Continuous infusion — review pending')).toBeVisible();
        expect(screen.queryByText(/Ropivacaine 0\.1%/)).not.toBeInTheDocument();
        expect(screen.queryByText(/Bupivacaine 0\.1%/)).not.toBeInTheDocument();
        const original = screen.getByText('Bupivacaine: 0.2-0.4 mg/kg/hr · Ropivacaine: 0.8-1.6 mg/kg/hr');
        expect(original).not.toBeVisible();
        expect(original.closest('details')).not.toHaveAttribute('open');
        expect(screen.getByText(/Chloroprocaine: protocol-dependent/)).toBeVisible();
        expect(screen.getByText('Chloroprocaine: 3% · 1 cc/kg/hr = 1 mL/kg/hr = 30 mg/kg/hr')).not.toBeVisible();
    });
    it.each([0, -1, '', Infinity, '20 kg', 1e308])('withholds regional calculated amounts for invalid weight %s', weight => {
        patient = { weight, ageYears: 6, isNeonate: false };
        render(<RegionalCard />);
        expect(screen.getByRole('status')).toHaveTextContent('Enter a positive finite patient weight');
        expect(screen.queryByText('Single-shot block references — conditions required')).not.toBeInTheDocument();
    });
});
