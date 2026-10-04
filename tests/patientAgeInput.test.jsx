import React from 'react';
import { it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { PatientProvider, usePatient } from '../src/context/PatientContext';
import PatientBar from '../src/components/PatientBar';
import { useAnticoag } from '../src/hooks/useAnticoag';
vi.mock('../src/context/LanguageContext', () => ({ useLanguage: () => ({ lang: 'en', t: en => en }) }));
afterEach(() => { cleanup(); localStorage.clear(); });

it('clearing the actual age control preserves empty age and withholds protamine without changing derived weight or height', () => {
    let patient, anticoag;
    const Rig = () => {
        patient = usePatient();
        anticoag = useAnticoag({ protocol: 'UOFM', loadingUnits: 1500, totalUnits: 1000 });
        return <PatientBar bumpInteraction={() => {}} onCollapse={() => {}} pref="default" setPref={() => {}} />;
    };
    render(<PatientProvider><Rig /></PatientProvider>);
    const previousWeight = patient.weight, previousHeight = patient.height;
    fireEvent.change(screen.getByLabelText('age value'), { target: { value: '' } });
    expect(patient.age).toBe('');
    expect(patient.weight).toBe(previousWeight);
    expect(patient.height).toBe(previousHeight);
    expect(anticoag.protamine.mg).toBeNull();
    expect(screen.getByText(/Blank age is not a newborn age of zero/)).toBeVisible();
    fireEvent.change(screen.getByLabelText('age value'), { target: { value: '0' } });
    expect(patient.age).toBe(0);
    expect(patient.isNeonate).toBe(true);
    expect(anticoag.protamine.mg).toBe(15);
});
