import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, renderHook, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { useAirwayCalc } from '../src/hooks/useAirwayCalc';
import { useAnticoag } from '../src/hooks/useAnticoag';
import HeparinProtamineCard from '../src/components/HeparinProtamineCard';
import { entries as procedures } from '../src/data/specialty/procedures';
import { protamineReversal } from '../src/data/anticoagulation_protocol';

let patient;
vi.mock('../src/context/PatientContext', () => ({ usePatient: () => patient }));
vi.mock('../src/context/LanguageContext', () => ({ useLanguage: () => ({ lang: 'en', t: en => en }) }));
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
const setPatient = (age, weight = 20) => {
    patient = { age, ageYears: age, ageMonths: age * 12, ageUnit: 'years', weight, isNeonate: age * 365 <= 30, isPreemie: false, gender: 'male' };
};

describe('Institutional airway source applicability', () => {
    it.each([[1, '12 cm'], [1.9, '12.9 cm'], [10, '21 cm'], [10.01, '—'], [16, '—']])('uses the exact documented age range for %s yr', (age, expected) => {
        setPatient(age);
        const { result } = renderHook(useAirwayCalc);
        expect(result.current.depth).toBe(expected);
        expect(result.current.depthHeld).toBe(age > 10);
    });
    it.each([[0, 1, '7 cm'], [0, 2, '8 cm'], [0, 3, '9 cm'], [0, 0.6, '—'], [0, 2.3, '—'], [1, 2, '—']])('limits the newborn table at age %s and weight %s', (age, weight, expected) => {
        setPatient(age, weight);
        expect(renderHook(useAirwayCalc).result.current.depth).toBe(expected);
    });
});

describe('Administered heparin is distinct from a recommendation', () => {
    it.each(['', null, true, 'invalid'])('withholds the reference for missing or invalid age %s', age => {
        setPatient(3);
        patient.age = age;
        const { result } = renderHook(() => useAnticoag({ protocol: 'UOFM', loadingUnits: 1500, totalUnits: 3200 }));
        expect(result.current.protamine.mg).toBeNull();
        expect(result.current.protamine.status).toBe('held');
    });
    it('withholds zero and subprecision amounts instead of displaying a misleading zero', () => {
        for (const totalUnits of [0, 1, 4]) {
            const result = protamineReversal({ protocol: 'UOFM', weight: 20, ageYears: 3, totalUnits });
            expect(result.mg).toBeNull(); expect(result.status).toBe('held');
        }
    });
    it('does not apply the U of M 100 U/kg re-dose rule to NCH', () => {
        setPatient(3);
        const { result } = renderHook(() => useAnticoag({ protocol: 'NCH', hpt: 1.9, act: 500 }));
        expect(result.current.redose.reviewRequired).toBe(true);
        expect(result.current.redose.doseUnits).toBeNull();
    });
    it('does not infer neonatal administration from the weight-based loading recommendation', () => {
        setPatient(0.01, 3);
        const { result } = renderHook(() => useAnticoag({ protocol: 'UOFM' }));
        expect(result.current.loading.doseUnits).toBe(1800);
        expect(result.current.protamine.mg).toBeNull();
    });
    it('does not reuse or double count HMS combined heparin', () => {
        setPatient(3);
        const { result } = renderHook(() => useAnticoag({ protocol: 'NCH', hmsCombinedDose: 4200, pumpUnits: 1000 }));
        expect(result.current.loading.doseUnits).toBe(4200);
        expect(result.current.protamine.mg).toBeNull();
    });
    it('copies a withheld state and clears actual doses when the patient changes', async () => {
        setPatient(3);
        const writeText = vi.fn().mockResolvedValue(undefined);
        vi.stubGlobal('navigator', { clipboard: { writeText } });
        const view = render(<HeparinProtamineCard />);
        fireEvent.click(screen.getByRole('button', { name: /Heparin \/ Protamine Calculator/ }));
        const input = () => screen.getByLabelText('Actual patient cumulative heparin (exclude circuit)');
        fireEvent.click(screen.getByRole('button', { name: 'Copy anticoag summary' }));
        expect(writeText.mock.calls[0][0]).toMatch(/Protamine:.*Withheld/);
        expect(writeText.mock.calls[0][0]).not.toMatch(/null mg|NCH neonate exception/);
        await waitFor(() => expect(screen.getByText('Copied')).toBeVisible());
        fireEvent.change(input(), { target: { value: '3200' } });
        expect(screen.getByText('32 mg')).toBeVisible();
        setPatient(4);
        view.rerender(<HeparinProtamineCard />);
        expect(input()).toHaveValue(null);
        expect(screen.queryByText('32 mg')).not.toBeInTheDocument();
        fireEvent.change(input(), { target: { value: '3200' } });
        fireEvent.click(screen.getByRole('button', { name: /NCH Investigational HDR/ }));
        expect(input()).toHaveValue(null);
        expect(screen.getByText('Withheld — confirmation required')).toBeVisible();
    });
});

describe('TPIAT catheter-dependent IV lidocaine eligibility', () => {
    it('keeps the same source condition in setup, operative sequence and analgesia in both languages', () => {
        const entry = procedures.find(item => item.id === 'proc_tpiat');
        const serialized = JSON.stringify(entry);
        expect(serialized).not.toMatch(/BOTH not placed|両方とも未留置なら省略/);
        expect(serialized.match(/Lidocaine 1 mg\/kg\/hr only if neither epidural nor ESB catheter can be placed/g)).toHaveLength(3);
        expect(serialized.match(/硬膜外・ESBカテーテルのいずれも留置できない場合のみ/g)).toHaveLength(3);
    });
});
