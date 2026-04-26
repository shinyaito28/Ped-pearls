// OSA PAT Flowsheet — NCH Ambulatory Surgery Centers screening tool.
// Source: NCH Sharepoint / Ambulatory Surgery Centers / OSA PAT flowsheet_Oct 2025.pdf
//
// Screens patients for OSA risk and recommends disposition (move to MOR,
// send for Anesthesia review, or move scheduled case earlier in the day).

export const entry = {
    id: 'flow_osa_pat',
    hub: 'preop',
    kind: 'flowchart',
    title: 'OSA PAT Flowsheet',
    shortDescription: 'Age + BMI + 6 OSA questions → ASC vs MOR vs Anesthesia review.',
    tags: ['osa', 'obstructive sleep apnea', 'pat', 'pre-anesthesia testing', 'asc', 'mor', 'snore', 'apnea', 'screening'],
    emergency: false,
    weightAware: false,
    ageRules: null,
    source: 'NCH Sharepoint / Ambulatory Surgery Centers',
    lastReviewed: '2026-04',
    component: 'OsaPatFlowsheetCard',
};

export const screeningQuestions = [
    'Does your child snore at night?',
    'Is your child restless at night or wakes up frequently?',
    'Is your child a mouth breather during the day or for the majority of the night?',
    'Does your child have behavioral issues related to poor sleep?',
    'Does your child drool at night or wet the bed?',
    'Have you ever noticed your child pause, hold their breath or gasp while sleeping? (apnea)',
];

// Disposition logic — separated by age group.
// Returns { dispo, reason }.
export const evaluateOlder = (bmi, positiveCount, hasApnea) => {
    if (bmi >= 40) return { dispo: 'mor', reason: 'BMI ≥ 40 → Move to MOR (regardless of OSA screen)' };
    if (bmi >= 35) {
        if (positiveCount >= 2) return { dispo: 'review', reason: 'BMI 35–39 with ≥ 2 positive OSA questions → Anesthesia review' };
        return { dispo: 'asc', reason: 'BMI 35–39 with < 2 positive — ASC OK' };
    }
    // BMI < 35
    if (positiveCount >= 3 && hasApnea) return { dispo: 'earlier', reason: 'BMI < 35 with ≥ 3 positive (incl. apnea) → Move scheduled case earlier in the day' };
    return { dispo: 'asc', reason: 'Below threshold — ASC OK' };
};

export const evaluateYounger = (bmiPercentile, positiveCount, hasApnea) => {
    // bmiPercentile is one of: 'under99', '99to140', 'over140'
    if (bmiPercentile === 'over140') return { dispo: 'mor', reason: 'BMI ≥ 140% of 95th %ile → Move to MOR' };
    if (bmiPercentile === '99to140') {
        if (positiveCount >= 3) return { dispo: 'mor', reason: 'BMI 99–140% with ≥ 3 positive OSA → Move to MOR' };
        if (positiveCount >= 2) return { dispo: 'review', reason: 'BMI 99–140% with 2 positive OSA → Anesthesia review' };
        return { dispo: 'asc', reason: 'BMI 99–140% with < 2 positive — ASC OK' };
    }
    // under 99th percentile
    if (positiveCount >= 3 && hasApnea) return { dispo: 'earlier', reason: 'BMI < 99th %ile with ≥ 3 positive (incl. apnea) → Move scheduled case earlier in the day' };
    return { dispo: 'asc', reason: 'Below threshold — ASC OK' };
};

export const dispoLabels = {
    asc:     { label: 'ASC OK',                     emphasis: 'success', short: 'ASC' },
    earlier: { label: 'Move scheduled case earlier in the day', emphasis: 'warn',  short: 'Earlier' },
    review:  { label: 'Send for Anesthesia review',  emphasis: 'warn',    short: 'Review' },
    mor:     { label: 'Move to MOR',                  emphasis: 'critical', short: 'MOR' },
};

export const obesityClasses = [
    'Class 2 obesity: 120–139% of 95th %ile, or BMI 35–39 kg/m²',
    'Class 3 obesity: ≥ 140% of 95th %ile, or BMI ≥ 40 kg/m²',
];
