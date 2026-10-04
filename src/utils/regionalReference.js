import { calculateLocalAnestheticPlan, positiveNumber } from './localAnestheticPlan';

export const regionalReferenceSource = {
    title: 'ESRA/ASRA Pediatric Regional Anesthesia Advisory (2018), p.213',
    url: 'https://www.esraitalia.it/wp-content/uploads/2021/04/LA-dose-and-adjuvants-for-kids.pdf',
};

// A comparison of one clinician-entered amount, never a recommended dose or
// a mixed-drug/cumulative allowance. Other routes/formulations are not pooled.
export const assessCaudalReference = (plan, weight, patient) => {
    const held = reason => ({ status: 'held', reason });
    const result = calculateLocalAnestheticPlan(plan, weight);
    if (!result) return held('inputs');
    if (plan.route !== 'caudal' || plan.mode !== 'single') return held('route');
    if (!['Bupivacaine', 'Ropivacaine'].includes(plan.drug)) return held('drug');
    if (plan.formulation !== 'plain') return held('formulation');
    const rawAge = patient?.age;
    const multiplier = { years: 12, months: 1, days: 1 / 30.4 }[patient?.ageUnit];
    if (!['number', 'string'].includes(typeof rawAge) ||
        (typeof rawAge === 'string' && !rawAge.trim()) || !multiplier)
        return held('age');
    const months = Number(rawAge) * multiplier;
    if (!Number.isFinite(months) || months < 0 || months >= 216) return held('age');
    if (patient?.isPreemie) return held('prematurity');
    const mgPerMl = plan.drug === 'Bupivacaine' ? 2.5 : 2;
    if (Math.abs(result.mgPerMl - mgPerMl) > 1e-9) return held('concentration');
    const ceilingMgPerKg = plan.drug === 'Bupivacaine' ? 2.5 : 2;
    const ceilingMg = positiveNumber(weight) * ceilingMgPerKg;
    if (!Number.isFinite(ceilingMg)) return held('inputs');
    return {
        status: result.mgPerKg > ceilingMgPerKg ? 'above-reference' : 'reference',
        ceilingMgPerKg, ceilingMg, source: regionalReferenceSource,
    };
};
