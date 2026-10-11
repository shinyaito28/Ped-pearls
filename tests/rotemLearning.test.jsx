import React from 'react';
import { beforeEach, describe, it, expect } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import CardiacRotemCard from '../src/components/CardiacRotemCard';
import Layout from '../src/components/Layout';
import { LanguageProvider } from '../src/context/LanguageContext';
import { PatientProvider } from '../src/context/PatientContext';

const copy = {
    en: {
        header: /Post-Bypass ROTEM Guidance/, safety: 'ROTEM learning precautions', guide: 'ROTEM learning guide',
        during: 'During CPB', after: 'After CPB', ffp: 'FFP 20 mL/kg or PCC 20 U/kg',
        order: /not automatic treatment orders/, combined: /not intended to be added/, pediatric: /Pediatric safety and efficacy/,
        parallel: 'Assess CT and amplitude in parallel.', overlap: /overlap at boundaries/,
        source: 'Compare the 2023 paper with the app', original: /HEPTEM CT > 240 s AND CFT > 110 s/,
        exactlyNine: /Exactly 9 is not addressed/,
    },
    ja: {
        header: /バイパス後 ROTEM ガイダンス/, safety: 'ROTEMの学習上の注意', guide: 'ROTEM学習ガイド',
        during: 'CPB中', after: 'CPB後', ffp: 'FFP 20 mL/kg または PCC 20 U/kg',
        order: /自動的な投与指示ではありません/, combined: /合算する意味ではありません/, pediatric: /小児での安全性・有効性は未確立/,
        parallel: 'CT判定と振幅判定は並列です。', overlap: /境界に重複があります/,
        source: '2023年原著とアプリの違いを確認', original: /HEPTEM CT > 240秒 AND CFT > 110秒/,
        exactlyNine: /ちょうど9の扱いは不明/,
    },
};

function renderCard(lang) {
    localStorage.setItem('ped_pearls_lang', lang);
    return render(<LanguageProvider><PatientProvider><CardiacRotemCard /></PatientProvider></LanguageProvider>);
}

function openCard(c) {
    fireEvent.click(screen.getByRole('button', { name: c.header }));
}

beforeEach(() => localStorage.clear());

describe.each(['en', 'ja'])('ROTEM teaching content in %s stays separate from dosing', lang => {
    const c = copy[lang];
    it('keeps the safety notice visible when the main card is collapsed', () => {
        renderCard(lang);
        expect(screen.getByRole('complementary', { name: c.safety })).toBeVisible();
        expect(screen.getByRole('complementary', { name: c.safety })).toHaveAttribute('lang', lang);
        expect(screen.getByText(c.order)).toBeVisible();
        expect(screen.getByText(c.combined)).toBeVisible();
        expect(screen.getByText(c.pediatric)).toBeVisible();
        expect(screen.queryByRole('region', { name: c.guide })).not.toBeInTheDocument();
    });

    it('switches the reference by mouse and keyboard without changing calculator values or phase', () => {
        renderCard(lang);
        openCard(c);
        const ct = screen.getByRole('slider', { name: 'HEPTEM CT' });
        fireEvent.change(ct, { target: { value: '300' } });
        expect(ct).toHaveValue('300');
        expect(screen.getAllByText('Kcentra (4F-PCC)')[0]).toBeVisible();
        fireEvent.click(screen.getByRole('tab', { name: c.after }));
        const panel = screen.getByRole('tabpanel');
        expect(within(panel).getByText(c.ffp)).toBeVisible();
        expect(ct).toHaveValue('300');
        expect(screen.queryByRole('slider', { name: 'EXTEM CT' })).not.toBeInTheDocument();
        fireEvent.keyDown(screen.getByRole('tab', { name: c.after }), { key: 'ArrowLeft' });
        expect(screen.getByRole('tab', { name: c.during })).toHaveAttribute('aria-selected', 'true');
        expect(screen.getByRole('tab', { name: c.during })).toHaveFocus();
        expect(ct).toHaveValue('300');
    });

    it('discloses source discrepancies and boundary ambiguity without hiding the parallel evaluation caveat', () => {
        renderCard(lang);
        openCard(c);
        const guide = screen.getByRole('region', { name: c.guide });
        expect(guide).toHaveAttribute('lang', lang);
        if (lang === 'en') {
            // Includes hidden panels, disclosures, accessible labels, and new-tab link text.
            expect(guide.textContent).not.toMatch(/[\u3040-\u30ff\u3400-\u9fff]/);
            expect([...guide.querySelectorAll('[aria-label]')].map(el => el.getAttribute('aria-label')).join(' ')).not.toMatch(/[\u3040-\u30ff\u3400-\u9fff]/);
        }
        expect(screen.getByText(c.parallel)).toBeVisible();
        expect(screen.getByText(c.overlap)).toBeVisible();
        fireEvent.click(screen.getByText(c.source));
        expect(screen.getByText(c.original)).toBeVisible();
        expect(screen.getByText('5–10 mL/kg')).toBeVisible();
        expect(screen.getByText(c.exactlyNine)).toBeVisible();
        expect(screen.getByRole('link', { name: /Figure 2/ })).toHaveAttribute('href', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10304858/figure/F2/');
        expect(screen.getByRole('link', { name: /Figure 2/ })).toHaveAccessibleName(lang === 'en' ? 'Figure 2 (opens in a new tab)' : 'Figure 2 （別タブで開く）');
        fireEvent.click(screen.getByText(c.source));
        expect(screen.getByText('5–10 mL/kg')).not.toBeVisible();
    });
});

it('follows the existing brand triple-tap, preserves state, and restores the stored language on remount', () => {
    const app = () => <LanguageProvider><PatientProvider><Layout /></PatientProvider></LanguageProvider>;
    const view = render(app());
    fireEvent.click(screen.getByRole('button', { name: 'Cardiac', exact: true }));
    openCard(copy.en);
    const ct = screen.getByRole('slider', { name: 'HEPTEM CT' });
    fireEvent.change(ct, { target: { value: '300' } });
    fireEvent.click(screen.getByRole('tab', { name: copy.en.after }));
    fireEvent.click(screen.getByText(copy.en.source));
    const brand = screen.getByTitle('Triple-tap to toggle language');
    fireEvent.click(brand);
    fireEvent.click(brand);
    expect(screen.getByRole('region', { name: copy.en.guide })).toBeVisible();
    fireEvent.click(brand);
    const japanese = screen.getByRole('region', { name: copy.ja.guide });
    expect(japanese).toHaveAttribute('lang', 'ja');
    expect(screen.getByRole('tab', { name: copy.ja.after })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('5–10 mL/kg')).toBeVisible();
    expect(ct).toHaveValue('300');
    expect(localStorage.getItem('ped_pearls_lang')).toBe('ja');
    const numericContent = japanese.textContent.match(/\d+(?:\.\d+)?/g).sort();
    const rowNumbers = [...japanese.querySelectorAll('table tr')].map(row => row.textContent.match(/\d+(?:\.\d+)?/g));
    const japaneseBrand = screen.getByTitle('三段階タップで言語切替');
    for (let i = 0; i < 3; i++) fireEvent.click(japaneseBrand);
    const english = screen.getByRole('region', { name: copy.en.guide });
    expect(english.textContent.match(/\d+(?:\.\d+)?/g).sort()).toEqual(numericContent);
    expect([...english.querySelectorAll('table tr')].map(row => row.textContent.match(/\d+(?:\.\d+)?/g))).toEqual(rowNumbers);
    expect(ct).toHaveValue('300');
    expect(screen.getByRole('tab', { name: copy.en.after })).toHaveAttribute('aria-selected', 'true');
    expect(localStorage.getItem('ped_pearls_lang')).toBe('en');
    view.unmount();
    render(app());
    expect(screen.getByTitle('Triple-tap to toggle language')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Cardiac', exact: true }));
    expect(screen.getByRole('complementary', { name: copy.en.safety })).toBeVisible();
});
