import { useMemo } from 'react';
import { usePatient } from '../context/PatientContext';
import { drugList } from '../data/drugs';
import { sedationList } from '../data/sedation';
import { calculateDose, fmt } from '../utils/calc';

// Pick the matching age-rule for the current patient. Each rule may specify any of:
//   minDays / maxDays   (inclusive lower / exclusive upper, in days)
//   minMonths / maxMonths
//   minYears / maxYears
//   minWeight / maxWeight (kg)
// Plus payload fields: dose, max, min, label (description shown in UI),
// badge ('neonate' | 'caution' | 'contraindicated' | 'adult' | 'info'),
// contraindicated (boolean — short-circuits dose calculation).
const matchAgeRule = (rules, ctx) => {
    if (!rules || rules.length === 0) return null;
    const { ageDays, ageMonths, ageYears, weight } = ctx;
    for (const r of rules) {
        if (r.minDays !== undefined && ageDays < r.minDays) continue;
        if (r.maxDays !== undefined && ageDays >= r.maxDays) continue;
        if (r.minMonths !== undefined && ageMonths < r.minMonths) continue;
        if (r.maxMonths !== undefined && ageMonths >= r.maxMonths) continue;
        if (r.minYears !== undefined && ageYears < r.minYears) continue;
        if (r.maxYears !== undefined && ageYears >= r.maxYears) continue;
        if (r.minWeight !== undefined && weight < r.minWeight) continue;
        if (r.maxWeight !== undefined && weight >= r.maxWeight) continue;
        return r;
    }
    return null;
};

export const useDrugList = (type = 'all') => {
    const { weight, isTeen, isNeonate, isPreemie, ageMonths, ageYears } = usePatient();
    const w = parseFloat(weight);
    // Derive ageDays from months (context exposes months; days = months × 30.4).
    const ageDays = ageMonths * 30.4;

    const processedDrugs = useMemo(() => {
        const list = type === 'sedation' ? sedationList : drugList;

        return list.map((d, i) => {
            let max = d.max;
            let dose = d.dose;
            let activeRule = null;
            let badge = null;
            let badgeLabel = null;

            // 1) Resolve age-based rules (the new general mechanism).
            if (d.ageRules) {
                activeRule = matchAgeRule(d.ageRules, { ageDays, ageMonths, ageYears, weight: w });
                if (activeRule) {
                    if (activeRule.dose) dose = activeRule.dose;
                    if (activeRule.max !== undefined) max = activeRule.max;
                    if (activeRule.badge) {
                        badge = activeRule.badge;
                        badgeLabel = activeRule.label || null;
                    }
                }
            }

            // 2) Legacy specials (kept for backward compatibility).
            if (max === 'teen_dependent') {
                max = isTeen ? 1.0 : 0.5;
            }

            if (d.dose === 'ceftriaxone_check') {
                if (isNeonate) {
                    dose = '0 mg/kg';
                    max = 0;
                    badge = 'contraindicated';
                    badgeLabel = 'CONTRAINDICATED <30 days';
                } else {
                    dose = '50 mg/kg';
                    max = 2000;
                }
            }

            if (d.dose === 'apap_iv_age') {
                // 4-tier acetaminophen IV from the original card:
                // - <33 wk PCA (preemie): 7.5 mg/kg q8h
                // - term neonate ≤28 days: 10 mg/kg q6h
                // - 2 - 12 yr & <50 kg: 15 mg/kg q6h, max 75 mg/kg/day
                // - ≥50 kg or adult: 1 g q6h, max 4 g/day
                if (isPreemie) {
                    dose = '7.5 mg/kg';
                    badge = 'neonate';
                    badgeLabel = 'Preemie <37 wk PCA — 7.5 mg/kg q8h, max 22.5 mg/kg/day';
                } else if (isNeonate) {
                    dose = '10 mg/kg';
                    badge = 'neonate';
                    badgeLabel = 'Neonate (33-37 wk) — 10 mg/kg q6h, max 40 mg/kg/day';
                } else if (w >= 50) {
                    dose = '20 mg/kg'; // expressed per kg so calculator can show; capped at 1 g below
                    max = 1000;
                    badge = 'adult';
                    badgeLabel = '≥50 kg — fixed 1 g q6h, max 4 g/day';
                } else if (ageYears < 2) {
                    dose = '10 mg/kg';
                    badge = 'info';
                    badgeLabel = '≤2 yr — 10 mg/kg q6h, max 60 mg/kg/day';
                } else {
                    dose = '15 mg/kg';
                    badge = 'info';
                    badgeLabel = '2-12 yr <50 kg — 15 mg/kg q6h, max 75 mg/kg/day';
                }
            }

            // 3) Generic neonateDose helper (used by antibiotics).
            if (d.neonateDose && isNeonate && !activeRule) {
                dose = d.neonateDose;
                if (d.neonateMax !== undefined) max = d.neonateMax;
                badge = 'neonate';
                badgeLabel = `Neonate dose: ${d.neonateDose}`;
            }

            const { result, formula, isInfusion } = calculateDose(dose, w, max, d.min);

            // Special handling for Ceftriaxone neonate msg
            let finalResult = result;
            if (d.dose === 'ceftriaxone_check' && isNeonate) {
                finalResult = 'CONTRAINDICATED';
            }

            return {
                ...d,
                id: i,
                calc: finalResult,
                formula,
                isInfusion,
                realDose: dose,
                badge,
                badgeLabel,
                activeRule
            };
        });
    }, [weight, isTeen, isNeonate, isPreemie, ageMonths, ageYears, type]);

    return processedDrugs;
};

export const useSedationMix = () => {
    const { weight } = usePatient();
    const w = parseFloat(weight);
    return {
        ketamine: fmt(w * 6),
        midaz: fmt(w * 0.6),
        atropine: fmt(w * 0.02)
    };
};
