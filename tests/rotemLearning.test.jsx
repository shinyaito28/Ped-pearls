import React from 'react';
import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import CardiacRotemCard from '../src/components/CardiacRotemCard';
import { LanguageProvider } from '../src/context/LanguageContext';
import { PatientProvider } from '../src/context/PatientContext';

function renderCard() {
    return render(<LanguageProvider><PatientProvider><CardiacRotemCard /></PatientProvider></LanguageProvider>);
}

function openCard() {
    fireEvent.click(screen.getByRole('button', { name: /Post-Bypass ROTEM Guidance/ }));
}

describe('ROTEM teaching content stays separate from dosing', () => {
    it('keeps the safety notice visible when the main card is collapsed', () => {
        renderCard();
        expect(screen.getByRole('complementary', { name: 'ROTEMの学習上の注意' })).toBeVisible();
        expect(screen.getByText(/自動的な投与指示ではありません/)).toBeVisible();
        expect(screen.getByText(/合算する意味ではありません/)).toBeVisible();
        expect(screen.getByText(/小児での安全性・有効性は未確立/)).toBeVisible();
        expect(screen.queryByRole('region', { name: 'ROTEM学習ガイド' })).not.toBeInTheDocument();
    });

    it('switches the reference by mouse and keyboard without changing calculator values or phase', () => {
        renderCard();
        openCard();
        const ct = screen.getByRole('slider', { name: 'HEPTEM CT' });
        fireEvent.change(ct, { target: { value: '300' } });
        expect(ct).toHaveValue('300');
        expect(screen.getAllByText('Kcentra (4F-PCC)')[0]).toBeVisible();
        fireEvent.click(screen.getByRole('tab', { name: 'CPB後' }));
        const panel = screen.getByRole('tabpanel');
        expect(within(panel).getByText('FFP 20 mL/kg または PCC 20 U/kg')).toBeVisible();
        expect(ct).toHaveValue('300');
        expect(screen.queryByRole('slider', { name: 'EXTEM CT' })).not.toBeInTheDocument();
        fireEvent.keyDown(screen.getByRole('tab', { name: 'CPB後' }), { key: 'ArrowLeft' });
        expect(screen.getByRole('tab', { name: 'CPB中' })).toHaveAttribute('aria-selected', 'true');
        expect(screen.getByRole('tab', { name: 'CPB中' })).toHaveFocus();
        expect(ct).toHaveValue('300');
    });

    it('discloses source discrepancies and boundary ambiguity without hiding the parallel evaluation caveat', () => {
        renderCard();
        openCard();
        expect(screen.getByText(/CT判定と振幅判定は並列/)).toBeVisible();
        expect(screen.getByText(/境界に重複があります/)).toBeVisible();
        fireEvent.click(screen.getByText('2023年原著とアプリの違いを確認'));
        expect(screen.getByText(/HEPTEM CT > 240秒 AND CFT > 110秒/)).toBeVisible();
        expect(screen.getByText('5–10 mL/kg')).toBeVisible();
        expect(screen.getByText(/ちょうど9の扱いは不明/)).toBeVisible();
        expect(screen.getByRole('link', { name: /Figure 2/ })).toHaveAttribute('href', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10304858/figure/F2/');
        fireEvent.click(screen.getByText('2023年原著とアプリの違いを確認'));
        expect(screen.getByText('5–10 mL/kg')).not.toBeVisible();
    });
});
