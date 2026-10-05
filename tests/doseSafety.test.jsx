import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, renderHook, act, fireEvent, screen, within, cleanup } from '@testing-library/react';
import { PatientProvider, usePatient } from '../src/context/PatientContext';
import { useDrugList } from '../src/hooks/useDrugList';
import { calculateDose } from '../src/utils/calc';
import { infusionPresets, calcInfusionMlPerHr, calcDoseFromMlPerHr } from '../src/data/infusion_presets';
import InfusionCalcCard from '../src/components/InfusionCalcCard';
import AllDrugsCard from '../src/components/AllDrugsCard';
import GlobalSearch from '../src/components/GlobalSearch';
import EmergencyCard from '../src/components/EmergencyCard';

afterEach(() => { cleanup(); localStorage.clear(); vi.restoreAllMocks(); });
const wrapper = ({ children }) => <PatientProvider>{children}</PatientProvider>;

describe('Dose basis and source-unit regressions', () => {
    it.each([10, 25])('keeps fixed amounts independent of %s kg, including no supplied weight', weight => {
        expect(calculateDose('0.5 mL', weight).result.trim()).toBe('0.50 mL');
        expect(calculateDose('100-200 mg', weight).result.trim()).toBe('100 - 200 mg');
        expect(calculateDose('0.5 mL', '').result.trim()).toBe('0.50 mL');
    });
    it.each([
        ['10-25 Units/kg/hr', '100 - 250 Units/hr', true],
        ['0.1 Units/kg/hr', '1.0 Units/hr', true],
        ['0.5-1 unit/kg', '5.0 - 10 Units', false],
        ['0.25-1 g/kg', '2.5 - 10 g', false],
        ['1-2 g/kg', '10 - 20 g', false],
    ])('retains the source dimension for %s', (dose, expected, infusion) => {
        const actual = calculateDose(dose, 10);
        expect(actual.result.trim()).toBe(expected);
        expect(actual.isInfusion).toBe(infusion);
    });
    it('does not infer mg or calculate with invalid kg', () => {
        expect(calculateDose('1 bananas/kg', 10).result).toBe('-');
        for (const weight of [0, -1, '', NaN, Infinity]) {
            expect(calculateDose('0.02 mg/kg', weight, null, 0.1).result).toBe('-');
        }
    });
    it('integrates metadata into drug results and preserves age restrictions', () => {
        const { result } = renderHook(() => ({ drugs: useDrugList(), patient: usePatient() }), { wrapper });
        act(() => result.current.patient.setWeight(10));
        const find = name => result.current.drugs.find(d => d.name === name);
        expect(find('Epinephrine, Racemic (Neb)').calc.trim()).toBe('0.50 mL');
        expect(find('Tigan (Trimethobenzamide)').calc.trim()).toBe('100 - 200 mg');
        expect(find('Protamine').calc).toBe('-');
        expect(find('Protamine').requiresInput).toBe('heparin');
        expect(find('Promethazine').badge).toBe('contraindicated');
        act(() => result.current.patient.setWeight(25));
        expect(find('Epinephrine, Racemic (Neb)').calc.trim()).toBe('0.50 mL');
        expect(find('Protamine').calc).toBe('-');
    });
    it('shows required heparin input in the drug list instead of a weight-derived dose', () => {
        render(<AllDrugsCard />, { wrapper });
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Protamine' } });
        expect(screen.getByLabelText('Protamine heparin basis')).toBeVisible();
        expect(screen.getByLabelText('Protamine heparin units')).toBeVisible();
        fireEvent.change(screen.getByLabelText('Protamine heparin basis'), { target: { value: 'patient-cumulative' } });
        fireEvent.change(screen.getByLabelText('Protamine heparin units'), { target: { value: '3000' } });
        expect(screen.getByText('30')).toBeVisible();
        expect(screen.queryByText(/^10 mg/)).not.toBeInTheDocument();
    });
    it('shows the fixed amount in the Crisis drug group', () => {
        render(<EmergencyCard />, { wrapper });
        expect(screen.getByText('Epinephrine, Racemic (Neb)')).toBeVisible();
        expect(screen.getByText('0.50 mL')).toBeVisible();
        expect(screen.queryByText(/^4\.8 mL/)).not.toBeInTheDocument();
    });
    it('uses corrected results and heparin-input guidance in global search', async () => {
        render(<GlobalSearch onClose={() => {}} onNavigate={() => {}} />, { wrapper });
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Protamine' } });
        expect(screen.getByText('Needs heparin dose. See Cardiac tab.')).toBeVisible();
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Racemic' } });
        expect(screen.getByText('0.50 mL')).toBeVisible();
        await act(async () => {});
    });
});

describe('Infusion concentration dimensions', () => {
    it('converts 0.4 U/mL to 400 mU/mL in both directions', () => {
        expect(calcInfusionMlPerHr(0.5, 10, 0.4, 'mU/kg/min', 'U/mL')).toBeCloseTo(0.75, 8);
        expect(calcDoseFromMlPerHr(0.75, 10, 0.4, 'mU/kg/min', 'U/mL')).toBeCloseTo(0.5, 8);
    });
    it('converts mg/mL to mcg/mL without changing dose coefficients', () => {
        expect(calcInfusionMlPerHr(1, 10, 1, 'mcg/kg/min', 'mg/mL')).toBeCloseTo(0.6, 8);
        expect(calcDoseFromMlPerHr(0.6, 10, 1, 'mcg/kg/min', 'mg/mL')).toBeCloseTo(1, 8);
    });
    it('rejects incompatible dimensions and invalid concentration, but accepts zero dose', () => {
        expect(calcInfusionMlPerHr(1, 10, 1, 'mcg/kg/min', 'U/mL')).toBeNaN();
        expect(calcDoseFromMlPerHr(1, 10, 1, 'units/kg/hr', 'mg/mL')).toBeNaN();
        expect(calcInfusionMlPerHr(1, 10, 0, 'mcg/kg/min', 'mcg/mL')).toBeNaN();
        expect(calcInfusionMlPerHr(1, 10, 1, 'mU/kg/min')).toBeNaN();
        expect(calcInfusionMlPerHr(0, 10, 1, 'mcg/kg/min', 'mcg/mL')).toBe(0);
    });
    it.each(infusionPresets)('preserves the expected rate and reverse dose for $drug', preset => {
        const { drug, defaultDose, concentration, unit, concUnit } = preset;
        // Independently calculated fixture: only Vasopressin's concentration
        // is currently expressed in a different substance unit.
        const expected = defaultDose * 10 * (unit.endsWith('/min') ? 60 : 1) / concentration / (drug === 'Vasopressin' ? 1000 : 1);
        expect(calcInfusionMlPerHr(defaultDose, 10, concentration, unit, concUnit)).toBeCloseTo(expected, 8);
        expect(calcDoseFromMlPerHr(expected, 10, concentration, unit, concUnit)).toBeCloseTo(defaultDose, 8);
    });
    it('uses corrected conversion in the UI, quick table, copy text and reverse calculation', async () => {
        const writeText = vi.fn().mockResolvedValue();
        Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
        let patient;
        const Rig = () => { patient = usePatient(); return <InfusionCalcCard />; };
        render(<Rig />, { wrapper });
        act(() => patient.setWeight(10));
        fireEvent.change(screen.getByRole('combobox'), { target: { value: '3' } });
        expect(screen.getByText('0.75')).toBeVisible();
        const rows = within(screen.getByRole('table')).getAllByRole('row');
        expect(rows.slice(1).map(row => within(row).getAllByRole('cell')[1].textContent)).toEqual(['0.45', '1.7', '3.0']);
        fireEvent.click(screen.getByRole('button', { name: 'copy' }));
        expect(writeText).toHaveBeenCalledWith('Vasopressin: 0.50 mU/kg/min = 0.75 mL/hr (0.4 U/mL, 10 kg)');
        fireEvent.click(screen.getAllByRole('button')[1]);
        fireEvent.change(screen.getAllByRole('spinbutton')[0], { target: { value: '0.75' } });
        expect(screen.getByText('0.50')).toBeVisible();
        await act(async () => {});
        fireEvent.change(screen.getAllByRole('spinbutton')[1], { target: { value: '' } });
        expect(screen.getByRole('button', { name: 'copy' })).toBeDisabled();
        expect(screen.getByText('Enter a valid weight, dose/rate and concentration.')).toBeVisible();
    });
});
