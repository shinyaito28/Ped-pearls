import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import AdultLocalAnestheticReference from '../src/components/AdultLocalAnestheticReference';
import { calculateAdultLocalAnestheticReference as calc } from '../src/utils/adultLocalAnestheticReference';
import RegionalCard from '../src/components/RegionalCard';

let patient = { age: 10, ageYears: 10, weight: 31.2, isNeonate: false };
let language = 'en';
vi.mock('../src/context/PatientContext', () => ({ usePatient: () => patient }));
vi.mock('../src/context/LanguageContext', () => ({ useLanguage: () => ({ t: (en, ja) => language === 'ja' ? ja : en }) }));
afterEach(() => { cleanup(); language = 'en'; patient = { age: 10, ageYears: 10, weight: 31.2, isNeonate: false }; });

describe('Adult prototype references: arithmetic and scope', () => {
    it.each([
        ['Bupivacaine', false, 2.5, 175], ['Bupivacaine', true, 3, 225],
        ['Lidocaine', false, 4.5, 300], ['Lidocaine', true, 7, 500],
        ['Ropivacaine', false, 3, 200], ['Ropivacaine', true, 3, 200],
        ['Chloroprocaine', false, 11, 800], ['Chloroprocaine', true, 14, 1000],
        ['Levobupivacaine', false, 2, 150], ['Levobupivacaine', true, 2, 150]
    ])('%s epinephrine=%s: uses weight coefficient and absolute cap', (drug, epinephrine, mgPerKg, cap) => {
        expect(calc({ drug, epinephrine, weight: 100 }).ceilingMg).toBe(cap);
        expect(calc({ drug, epinephrine, weight: 20 }).ceilingMg).toBe(20 * mgPerKg);
    });
    it.each(['', ' ', null, undefined, 0, -1, Infinity, '20junk', 1e308])('withholds amounts at unavailable/overflowing weight %s', weight => {
        expect(calc({ drug: 'Bupivacaine', epinephrine: false, weight })).toBeNull();
    });
    it('does not accept unknown drugs or inferred epinephrine', () => {
        expect(calc({ drug: 'toString', epinephrine: false, weight: 70 })).toBeNull();
        expect(calc({ drug: 'Lidocaine', epinephrine: 'true', weight: 70 })).toBeNull();
    });
    it('converts percent and mg/mL equivalently and never rounds volume upward', () => {
        const a = calc({ drug: 'Lidocaine', epinephrine: true, weight: 100, concentration: 0.3 });
        const b = calc({ drug: 'Lidocaine', epinephrine: true, weight: 100, concentration: 3, concentrationUnit: 'mgPerMl' });
        expect(a.mgPerMl).toBe(3); expect(a.ceilingMl).toBe(166.66); expect(b.ceilingMl).toBe(a.ceilingMl);
        expect(a.ceilingMl * a.mgPerMl).toBeLessThanOrEqual(a.ceilingMg);
        for (const concentration of [0.03, 0.127, 0.25, 0.3, 0.7, 1, 2, 3, 37.9]) {
            const v = calc({ drug: 'Bupivacaine', epinephrine: false, weight: 53.3, concentration });
            expect(v.ceilingMl * v.mgPerMl).toBeLessThanOrEqual(v.ceilingMg);
        }
    });
    it.each(['', 0, -1, 'bad', Infinity])('shows mg but no volume at absent/invalid concentration %s', concentration => {
        const result = calc({ drug: 'Bupivacaine', epinephrine: false, weight: 70, concentration });
        expect(result.ceilingMg).toBe(175); expect(result.ceilingMl).toBeNull();
    });
    it('uses the top patient weight directly without another input or fallback', () => {
        const view = render(<AdultLocalAnestheticReference />);
        expect(screen.getByLabelText('Adult reference scope')).toHaveTextContent('not a pediatric recommended dose');
        expect(screen.queryByLabelText('Adult reference weight in kg')).toBeNull();
        expect(view.container.querySelector('[data-shared-reference-weight]')).toHaveTextContent('31.2 kg');
        expect(view.container.querySelector('[data-adult-ceiling-mg]')).toHaveTextContent('78 mg');
        expect(patient.weight).toBe(31.2);
        patient = { ...patient, weight: 50 };
        view.rerender(<AdultLocalAnestheticReference />);
        expect(view.container.querySelector('[data-adult-ceiling-mg]')).toHaveTextContent('125 mg');
    });
    it('updates drug/epinephrine/concentration directly, and removes stale numbers on blank weight', () => {
        patient = { ...patient, weight: 20 };
        const view = render(<AdultLocalAnestheticReference />);
        fireEvent.change(screen.getByLabelText('Adult reference drug'), { target: { value: 'Lidocaine' } });
        fireEvent.change(screen.getByLabelText('Adult reference epinephrine'), { target: { value: 'true' } });
        fireEvent.change(screen.getByLabelText('Adult reference concentration'), { target: { value: '1' } });
        expect(view.container.querySelector('[data-adult-ceiling-mg]')).toHaveTextContent('140 mg');
        expect(view.container.querySelector('[data-adult-ceiling-ml]')).toHaveTextContent('14 mL');
        fireEvent.change(screen.getByLabelText('Adult reference concentration unit'), { target: { value: 'mgPerMl' } });
        fireEvent.change(screen.getByLabelText('Adult reference concentration'), { target: { value: '10' } });
        expect(view.container.querySelector('[data-adult-ceiling-ml]')).toHaveTextContent('14 mL');
        patient = { ...patient, weight: '' };
        view.rerender(<AdultLocalAnestheticReference />);
        expect(view.container.querySelector('[data-adult-ceiling-mg]')).toHaveTextContent('— mg');
        expect(view.container.querySelector('[data-adult-ceiling-ml]')).toHaveTextContent('— mL');
    });
    it('changes the scope note at adulthood without replacing the shared weight', () => {
        patient = { age: 17.999, ageYears: 17.999, weight: 20 };
        const view = render(<AdultLocalAnestheticReference />);
        expect(screen.getByLabelText('Adult reference scope')).toHaveTextContent('not a pediatric recommended dose');
        patient = { ...patient, age: 18, ageYears: 18 };
        view.rerender(<AdultLocalAnestheticReference />);
        expect(screen.getByLabelText('Adult reference scope')).toHaveTextContent('Adult-source reference calculation.');
        expect(screen.getByLabelText('Adult reference scope')).not.toHaveTextContent('pediatric');
        expect(view.container.querySelector('[data-shared-reference-weight]')).toHaveTextContent('20 kg');
        expect(view.container.querySelector('[data-adult-ceiling-mg]')).toHaveTextContent('50 mg');
    });
    it('keeps browsing controls available when patient weight is missing', () => {
        patient = { ...patient, weight: '' };
        render(<RegionalCard />);
        expect(screen.getByLabelText('Adult reference drug')).toBeVisible();
        expect(screen.getByLabelText('Adult reference concentration')).toBeVisible();
        expect(screen.queryByLabelText('Adult reference weight in kg')).toBeNull();
        expect(screen.getByRole('status')).toBeVisible();
    });
    it.each(['', ' ', null, undefined, 0, -1, Infinity, '20junk', 1e308])('clears previous UI results when the header weight becomes %s', weight => {
        const view = render(<AdultLocalAnestheticReference />);
        fireEvent.change(screen.getByLabelText('Adult reference concentration'), { target: { value: '0.25' } });
        expect(view.container.querySelector('[data-adult-ceiling-mg]')).toHaveTextContent('78 mg');
        patient = { ...patient, weight };
        view.rerender(<AdultLocalAnestheticReference />);
        expect(view.container.querySelector('[data-shared-reference-weight]')).toHaveTextContent('—');
        expect(view.container.querySelector('[data-adult-ceiling-mg]')).toHaveTextContent('— mg');
        expect(view.container.querySelector('[data-adult-ceiling-ml]')).toHaveTextContent('— mL');
        expect(screen.getByText('Enter a valid weight in the header.')).toBeVisible();
    });
    it.each([0, 0.999, 1, 17.999, 18, NaN, -1])('updates age-specific notes for age %s', ageYears => {
        patient = { ...patient, ageYears };
        const view = render(<AdultLocalAnestheticReference />);
        const validAge = Number.isFinite(ageYears) && ageYears >= 0;
        expect(Boolean(view.container.querySelector('[data-infant-caution]'))).toBe(validAge && ageYears < 1);
        expect(Boolean(screen.queryByText('Age not confirmed.'))).toBe(!validAge);
        expect(view.container.querySelector('[data-adult-ceiling-mg]')).toHaveTextContent('78 mg');
    });
    it('keeps concise Japanese pediatric copy visible with detailed caveats folded', () => {
        language = 'ja';
        const view = render(<AdultLocalAnestheticReference />);
        expect(screen.getByLabelText('Adult reference scope')).toHaveTextContent('成人資料に基づく参考計算（小児推奨量ではありません）');
        expect(view.container.querySelector('details')).not.toHaveAttribute('open');
        expect(screen.getByText(/目標量・安全保証ではなく参考上限/)).not.toBeVisible();
        fireEvent.click(screen.getByText('出典と適用範囲'));
        expect(screen.getByText(/目標量・安全保証ではなく参考上限/)).toBeVisible();
        expect(screen.getByText(/min\(31.2 kg/)).toBeVisible();
    });
    it('keeps a concise preterm caution adjacent to the calculation', () => {
        patient = { ...patient, ageYears: 0, isPreemie: true };
        render(<AdultLocalAnestheticReference />);
        expect(screen.getByText('Preterm: confirm a separate protocol.')).toBeVisible();
    });
});
