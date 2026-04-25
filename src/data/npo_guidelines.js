// NPO guidelines for elective pediatric anesthesia.
// Source: ASA Practice Guidelines for Preoperative Fasting (2017),
// updated by ASA 2023 statement allowing clear liquids to 1-2 hr in healthy children.

export const npoTypes = [
    { id: 'clear-2023',  label: 'Clear liquids (ASA 2023)', hours: 1,  detail: 'Healthy children: 1 hr (10 mL/kg max). Updated ASA 2023 statement.' },
    { id: 'clear',       label: 'Clear liquids (classic)',  hours: 2,  detail: 'Water, apple/cranberry juice (no pulp), Pedialyte, black coffee/tea, sports drinks.' },
    { id: 'breast',      label: 'Breast milk',              hours: 4,  detail: 'Human breast milk only.' },
    { id: 'formula',     label: 'Formula / non-human milk', hours: 6,  detail: 'Infant formula, cow / soy / almond milk.' },
    { id: 'light',       label: 'Light meal',               hours: 6,  detail: 'Toast + clear liquid. No fat or meat.' },
    { id: 'heavy',       label: 'Heavy meal',               hours: 8,  detail: 'Fried / fatty / meat-containing meal.' },
];

export const npoSpecialNotes = [
    'Apply only to elective procedures in patients without conditions delaying gastric emptying (e.g. obesity, diabetes, GERD, ileus, head injury).',
    'For emergency cases assume full stomach and use rapid-sequence induction.',
    'ASA 2023: in unselected healthy children, 1 hr clear-liquid fasting is reasonable to reduce dehydration / agitation. Local protocol may differ.',
    'Encourage clear liquids until 2 hr (or 1 hr per local protocol) before surgery — fasting longer than this is not beneficial.'
];

export const asaPSClasses = [
    { id: 'I',   label: 'ASA I',   tag: 'Healthy', desc: 'Normal healthy patient. Non-smoking, no or minimal alcohol use.', accent: 'emerald' },
    { id: 'II',  label: 'ASA II',  tag: 'Mild systemic disease', desc: 'Mild disease without substantive functional limitation (e.g. controlled HTN/DM, mild lung disease, smoker, social drinker, BMI 30-40, pregnancy).', accent: 'teal' },
    { id: 'III', label: 'ASA III', tag: 'Severe systemic disease', desc: 'Substantive functional limitation (e.g. poorly controlled HTN/DM, COPD, BMI >40, active hepatitis, alcohol dependence, ESRD on regular dialysis, EF <40%, history (>3 mo) of MI / CVA / TIA / CAD with stents).', accent: 'amber' },
    { id: 'IV',  label: 'ASA IV',  tag: 'Severe — constant threat to life', desc: 'Recent (<3 mo) MI / CVA / TIA / CAD with stents, ongoing cardiac ischemia or severe valve dysfunction, severe reduction of EF, sepsis, DIC, ARD, ESRD not on dialysis.', accent: 'orange' },
    { id: 'V',   label: 'ASA V',   tag: 'Moribund — not expected to survive without operation', desc: 'Ruptured AAA, massive trauma, intracranial bleed with mass effect, ischemic bowel with significant cardiac pathology or multiple organ failure.', accent: 'red' },
    { id: 'VI',  label: 'ASA VI',  tag: 'Brain-dead (organ donor)', desc: 'Brain-dead patient whose organs are being removed for donor purposes.', accent: 'slate' },
];

export const apfelFactors = [
    { id: 'female',      label: 'Female sex (post-puberty)', detail: 'Not used in pre-pubertal children.' },
    { id: 'nonsmoker',   label: 'Non-smoker',                detail: 'For adolescents.' },
    { id: 'history',     label: 'History of PONV or motion sickness', detail: '' },
    { id: 'opioid',      label: 'Postoperative opioid use planned',   detail: '' }
];

// Pediatric POVOC (post-op vomiting in children) score — Eberhart et al.
export const povocFactors = [
    { id: 'age3',        label: 'Age ≥ 3 years',              detail: '' },
    { id: 'duration30',  label: 'Surgery duration ≥ 30 min',  detail: '' },
    { id: 'historyHere', label: 'History of POV in child / parent / sibling', detail: '' },
    { id: 'strab',       label: 'Strabismus surgery',         detail: '' }
];
// 0 → 9%, 1 → 10%, 2 → 30%, 3 → 55%, 4 → 70% PONV risk.
export const povocRisk = [9, 10, 30, 55, 70];

export const cormackLehaneGrades = [
    { id: 'I',   label: 'Grade I',   desc: 'Most of glottis visible. Easy intubation.', accent: 'emerald' },
    { id: 'IIa', label: 'Grade IIa', desc: 'Posterior glottis visible. Usually easy.', accent: 'teal' },
    { id: 'IIb', label: 'Grade IIb', desc: 'Only arytenoids visible. Difficult — try BURP.', accent: 'amber' },
    { id: 'III', label: 'Grade III', desc: 'Only epiglottis visible. Difficult — bougie / video laryngoscope.', accent: 'orange' },
    { id: 'IV',  label: 'Grade IV',  desc: 'Neither epiglottis nor glottis visible. Activate Difficult Airway protocol.', accent: 'red' },
];
