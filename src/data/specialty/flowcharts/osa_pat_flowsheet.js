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
    titleJa: 'OSA PAT フローシート',
    shortDescription: 'Age + BMI + 6 OSA questions → ASC vs MOR vs Anesthesia review.',
    shortDescriptionJa: '年齢 + BMI + OSA 質問 6 個 → ASC / MOR / 麻酔科レビュー判定。',
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

export const screeningQuestionsJa = [
    'お子さんは夜間にいびきをかきますか?',
    'お子さんは夜間落ち着かない、または頻回に目を覚ましますか?',
    'お子さんは日中または夜間の大半で口呼吸をしていますか?',
    'お子さんは睡眠不良に関連した行動問題がありますか?',
    'お子さんは夜間によだれを垂らす、または寝小便をしますか?',
    'お子さんが睡眠中に呼吸を止める、息を詰める、あえぐのを見たことがありますか?(無呼吸)',
];

// Disposition logic — separated by age group.
// Returns { dispo, reason }.
export const evaluateOlder = (bmi, positiveCount, hasApnea) => {
    if (bmi >= 40) return { dispo: 'mor', reason: 'BMI ≥ 40 → Move to MOR (regardless of OSA screen)', reasonJa: 'BMI ≥ 40 → MOR へ移動 (OSA スクリーンに関わらず)' };
    if (bmi >= 35) {
        if (positiveCount >= 2) return { dispo: 'review', reason: 'BMI 35–39 with ≥ 2 positive OSA questions → Anesthesia review', reasonJa: 'BMI 35-39 + OSA 質問 2 個以上陽性 → 麻酔科レビュー' };
        return { dispo: 'asc', reason: 'BMI 35–39 with < 2 positive — ASC OK', reasonJa: 'BMI 35-39 + 陽性 2 個未満 — ASC で可' };
    }
    // BMI < 35
    if (positiveCount >= 3 && hasApnea) return { dispo: 'earlier', reason: 'BMI < 35 with ≥ 3 positive (incl. apnea) → Move scheduled case earlier in the day', reasonJa: 'BMI < 35 + 3 個以上陽性(無呼吸を含む) → 当日早めの時間に移動' };
    return { dispo: 'asc', reason: 'Below threshold — ASC OK', reasonJa: '閾値未満 — ASC で可' };
};

export const evaluateYounger = (bmiPercentile, positiveCount, hasApnea) => {
    // bmiPercentile is one of: 'under99', '99to140', 'over140'
    if (bmiPercentile === 'over140') return { dispo: 'mor', reason: 'BMI ≥ 140% of 95th %ile → Move to MOR', reasonJa: 'BMI ≥ 95 パーセンタイルの 140% → MOR へ移動' };
    if (bmiPercentile === '99to140') {
        if (positiveCount >= 3) return { dispo: 'mor', reason: 'BMI 99–140% with ≥ 3 positive OSA → Move to MOR', reasonJa: 'BMI 99-140% + OSA 3 個以上陽性 → MOR へ移動' };
        if (positiveCount >= 2) return { dispo: 'review', reason: 'BMI 99–140% with 2 positive OSA → Anesthesia review', reasonJa: 'BMI 99-140% + OSA 2 個陽性 → 麻酔科レビュー' };
        return { dispo: 'asc', reason: 'BMI 99–140% with < 2 positive — ASC OK', reasonJa: 'BMI 99-140% + 陽性 2 個未満 — ASC で可' };
    }
    // under 99th percentile
    if (positiveCount >= 3 && hasApnea) return { dispo: 'earlier', reason: 'BMI < 99th %ile with ≥ 3 positive (incl. apnea) → Move scheduled case earlier in the day', reasonJa: 'BMI < 99 パーセンタイル + 3 個以上陽性(無呼吸を含む) → 当日早めの時間に移動' };
    return { dispo: 'asc', reason: 'Below threshold — ASC OK', reasonJa: '閾値未満 — ASC で可' };
};

export const dispoLabels = {
    asc:     { label: 'ASC OK',                                 labelJa: 'ASC で可',              emphasis: 'success',  short: 'ASC' },
    earlier: { label: 'Move scheduled case earlier in the day', labelJa: '当日早めの時間に移動', emphasis: 'warn',     short: 'Earlier' },
    review:  { label: 'Send for Anesthesia review',             labelJa: '麻酔科レビューへ',     emphasis: 'warn',     short: 'Review' },
    mor:     { label: 'Move to MOR',                            labelJa: 'MOR へ移動',           emphasis: 'critical', short: 'MOR' },
};

export const obesityClasses = [
    'Class 2 obesity: 120–139% of 95th %ile, or BMI 35–39 kg/m²',
    'Class 3 obesity: ≥ 140% of 95th %ile, or BMI ≥ 40 kg/m²',
];

export const obesityClassesJa = [
    'Class 2 肥満: 95 パーセンタイルの 120-139%、または BMI 35-39 kg/m²',
    'Class 3 肥満: 95 パーセンタイルの 140% 以上、または BMI ≥ 40 kg/m²',
];
