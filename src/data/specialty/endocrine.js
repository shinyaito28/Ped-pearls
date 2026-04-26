// Endocrine hub — catalog entries.
// Source: NCH Sharepoint / Endocrine /
//   - DM guidelines.docx + DM guidelines without available endocrine consult.docx
//   - DM, adrenal insuff, and DI recs.docx
//   - DM and weight loss medications March 2025.pdf
//   - Guidelines for Hypertonic Saline.docx
//   - MPS III Gene Therapy.docx + MPS III Gene Therapy Trial Anesthetic Protocol.docx

const COMMON = {
    hub: 'endocrine',
    kind: 'catalog',
    weightAware: false,
    ageRules: null,
    source: 'NCH Sharepoint / Endocrine',
    lastReviewed: '2026-04',
};

export const entries = [
    {
        ...COMMON,
        id: 'endo_dm_with_consult',
        title: 'Diabetes — PAT Workflow (with Endo consult)',
        shortDescription: 'Schedule first case; obtain Endo consult; route to anesthesia for completion.',
        tags: ['dm', 'diabetes', 'pat', 'pre-anesthesia testing', 'endocrine consult', 'first case'],
        emergency: false,
        related: ['endo_dm_no_consult', 'endo_dm_meds_chart'],
        sections: [
            {
                heading: 'PAT principles',
                emphasis: 'info',
                body: '- Schedule as **first patient of the day** when possible\n- Endocrine consult\n- When Endo consult received → send to Anesthesia for completion\n- If unable to obtain Endo consult → send to **PAT Director review**',
            },
        ],
    },
    {
        ...COMMON,
        id: 'endo_dm_no_consult',
        title: 'Diabetes — Pre-op Without Endo Consult',
        shortDescription: 'Insulin pump / basal / infusion / metformin handling on DOS.',
        tags: ['dm', 'diabetes', 'insulin pump', 'lantus', 'levemir', 'metformin', 'glargine'],
        emergency: false,
        related: ['endo_dm_with_consult', 'endo_dm_meds_chart'],
        sections: [
            {
                heading: 'Insulin pump',
                emphasis: 'info',
                body: '- Continue insulin pump unless surgery time > 2 hr\n- If pump catheter near surgical site → notify anesthesia\n- Continue subcutaneous insulin at basal rate for time of day',
            },
            {
                heading: 'Basal insulin (Lantus/Levemir)',
                emphasis: 'info',
                body: '- Continue home basal insulin regimen\n- Day of surgery: **hold morning dose of rapid-acting insulin** (Regular, Humalog, Novolog, Apidra)',
            },
            {
                heading: 'Insulin infusion candidates',
                emphasis: 'info',
                body: 'On the day before surgery, continue home insulin dosing schedule; adjust insulin for NPO.',
            },
            {
                heading: 'Oral metformin',
                emphasis: 'warn',
                body: '**Hold oral metformin and metformin-containing combinations for 72 hours before surgery** (Metformin, Actoplus Met, Avandamet, Fortamet, Glucophage, Glumetza, Janumet, Metaglip, Prandimet, Riomet)',
            },
            {
                heading: 'Day of surgery for all DM patients',
                emphasis: 'plain',
                body: '- Obtain blood glucose on admission to Surgery Unit\n- For glucose **<70 mg/dL or >250 mg/dL** → notify anesthesiologist\n- Insert peripheral IV on admission; saline lock or maintenance fluids',
            },
        ],
    },
    {
        ...COMMON,
        id: 'endo_dm_meds_chart',
        title: 'DM + Weight-Loss Medication Chart (Mar 2025)',
        shortDescription: 'Pre-op handling for insulin variants, oral hypoglycemics, GLP-1, SGLT-2, anti-obesity.',
        tags: ['dm', 'glp-1', 'sglt-2', 'ozempic', 'wegovy', 'metformin', 'sulfonylurea', 'phentermine', 'orlistat'],
        emergency: false,
        sections: [
            {
                heading: 'Insulins',
                emphasis: 'info',
                body: '- **Long-acting** (glargine, detemir, degludec): continue usual dose on DOS; if hypoglycemic episodes, can reduce by 20%. Toujeo + Tresiba dose reduction must be done 3 days in advance.\n- **Short-acting** (Humalog, Novolog, Regular, Apidra): hold while NPO\n- **NPH**: ½ usual morning dose on DOS\n- **Pre-mixed** (Humulin/Novolog 70/30, 75/25): ⅓ usual morning dose on DOS',
            },
            {
                heading: 'Oral hypoglycemics',
                emphasis: 'warn',
                body: '- **Acarbose** (alpha-glucosidase): hold on DOS\n- **Metformin** (biguanide): **hold 48 hr** prior to DOS — lactic acidosis risk with renal impairment, sepsis, cirrhosis, hypoperfusion\n- **Sulfonylureas** (glipizide, glyburide, glimepiride, gliclazide): hold on DOS. **Exception: do NOT hold glyburide if taken for monogenic/neonatal diabetes**\n- **DPP-4 inhibitors** (sitagliptin, saxagliptin, vildagliptin, linagliptin): hold on DOS',
            },
            {
                heading: 'GLP-1 agonists (DM + weight loss)',
                emphasis: 'critical',
                body: '- **Daily formulations: hold 24 hr**\n- **Weekly formulations (Ozempic, Wegovy, Rybelsus): hold 7 days**\n- Reason: delayed gastric emptying → aspiration risk',
            },
            {
                heading: 'SGLT-2 inhibitors',
                emphasis: 'warn',
                body: '- **Canagliflozin (Invokana), dapagliflozin (Farxiga), empagliflozin (Jardiance): hold 3 days** prior to DOS\n- **Ertugliflozin (Steglatro): hold 4 days** prior\n- Reason: euglycemic ketoacidosis (lipolysis/ketogenesis with fasting + surgery stress)',
            },
            {
                heading: 'Anti-obesity (non-GLP-1)',
                emphasis: 'warn',
                body: '- **Phentermine, phentermine-topiramate (Qsymia)**: hold 7 days pre-op (refractory hypotension risk with induction)\n- **Orlistat (Xenical, lipase inhibitor)**: continue on DOS — no clear guidelines',
            },
        ],
    },
    {
        ...COMMON,
        id: 'endo_pat_dm_adrenal_di',
        title: 'PAT for DM + Adrenal Insufficiency + DI (Stress dosing)',
        shortDescription: 'Hydrocortisone bolus/drip, DM intra-op IVF + glucose targets, DI fluid plan.',
        tags: ['adrenal insufficiency', 'glucocorticoid', 'hydrocortisone', 'stress dose', 'di', 'diabetes insipidus', 'iv fluids', 'd5'],
        emergency: false,
        related: ['flow_di_management'],
        sections: [
            {
                heading: 'Glucocorticoid / adrenal insufficiency — bolus dosing',
                emphasis: 'warn',
                body: '- Day prior to procedure: usual home doses\n- **Pre-induction: hydrocortisone 50 mg/m²/dose IV/IM × 1**\n- If procedure > 4 hr: repeat dose\n- Post-op: oral stress doses 3× normal daily dose q8h\n- Patient\'s home steroid regimen may resume 24 hr after procedure',
            },
            {
                heading: 'Glucocorticoid — drip dosing for procedures > 6 hr',
                emphasis: 'warn',
                body: '- Total **50 mg/m²** of hydrocortisone divided over total proposed procedure duration\n- If procedure > 6 hr: re-administer the same calculated dose\n- Stress doses (50 mg/m²/day) divided q8h × 24 hr post-op\n- Home steroid regimen on post-op day 1',
            },
            {
                heading: 'DM intra-op (with insulin pump or basal/bolus regimen)',
                emphasis: 'info',
                body: '- Long-acting insulin (Lantus, Levemir) given overnight or AM of procedure even if NPO — **safe**\n- IVF: **N/S + 20 mEq/L KCl** at maintenance rate (4-2-1)\n- **Target BG: 150-250 mg/dL**\n- BG <100: add D5 → **D5 N/S + 20 mEq/L KCl**\n- BG >250: remove dextrose\n- BG checks **q1h** during procedure',
            },
            {
                heading: 'DI — major surgery (significant fluid/blood losses)',
                emphasis: 'critical',
                body: '- Schedule first case AM if possible\n- Hold morning DDAVP\n- If serum Na+ > 145 mEq/L AND polyuria > 4 mL/kg/hr → start aqueous vasopressin infusion (20 U/500 mL) at **0.5 mU/kg/hr**\n- Titrate **+0.5 mU/kg/hr q10min** until UOP < 2 mL/kg/hr\n- IVF rate: **⅔ maintenance** (D5 ½NS + 20 mEq/L KCl for ≥3 yr, D5 ¼NS + 20 mEq/L KCl for <3 yr)',
            },
            {
                heading: 'DI — minor surgery (tubes, MRI/CT)',
                emphasis: 'info',
                body: '- Usual DDAVP dose AM of procedure\n- IVF rate: ⅔ maintenance',
            },
        ],
    },
    {
        ...COMMON,
        id: 'endo_hypertonic_saline',
        title: 'Hypertonic Saline — Periop Administration',
        shortDescription: 'Concentration table + bolus / infusion dosing for ICP / hyponatremia / resuscitation.',
        tags: ['hypertonic saline', '3% saline', '23.4%', 'icp', 'sodium', 'osmolar', 'fluid resuscitation', 'tbi', 'craniosynostosis'],
        emergency: true,
        sections: [
            {
                heading: 'Available concentrations at NCH',
                emphasis: 'info',
                body: '- **2%** (342 mEq/L Na chloride-only, or 296 mEq/L buffered with NaAcetate) — central or peripheral\n- **3%** (513 mEq/L Na, or 449 mEq/L buffered) — central preferred, peripheral OK\n- **6%** (1026 mEq/L Na, chloride only) — **central line ONLY**\n- **23.4%** (4004 mEq/L Na, chloride only) — **central line ONLY**',
            },
            {
                heading: '2% dosing',
                emphasis: 'info',
                body: '- Bolus 5-10 mL/kg for fluid resuscitation\n- Infusion to equal hourly maintenance fluids',
            },
            {
                heading: '3% dosing',
                emphasis: 'warn',
                body: '- Bolus **3-5 mL/kg of 3% NaCl**, then infusion **1 mL/kg/hr**\n- Suggested max bolus: 300 mL\n- Suggested max starting infusion rate: 30 mL/hr',
            },
            {
                heading: '6% dosing (volume-overload concerns)',
                emphasis: 'warn',
                body: '- Use when 3% NaCl infusion ≥ 60 mL/hr — switch to 6% with **half the dose** of 3%\n- Bolus typically **1.5-2.5 mL/kg** (max 150 mL)',
            },
            {
                heading: '23.4% — refractory ICP only',
                emphasis: 'critical',
                body: '- Suggested dose: **0.5 mL/kg, max 30 mL**\n- **Do NOT administer if serum Na+ > 165 mEq/L**',
            },
            {
                heading: 'Goals + monitoring',
                emphasis: 'plain',
                body: '- Monitor serum Na+ **q1-4h** during therapy\n- Goal serum Na+: **150-160 mEq/L**\n- If Na+ > 165: titrate infusion **down 0.25 mL/kg/hr q12h**\n- Goal serum osmolarity: **< 360**\n- Avoid raising Na+ > 12 mEq/12 hr; when decreasing, avoid drop > 10 mEq/24 hr',
            },
        ],
    },
    {
        ...COMMON,
        id: 'endo_mps3_gene_therapy',
        title: 'MPS III Gene Therapy Anesthetic',
        shortDescription: 'IV viral-vector infusion under GA — workflow, lines, post-op disposition.',
        tags: ['mps iii', 'sanfilippo', 'gene therapy', 'viral vector', 'aav', 'research', 'picu'],
        emergency: false,
        sections: [
            {
                heading: 'Workflow',
                emphasis: 'info',
                body: '- Patient arrives to pre-op **4 hr early**\n- Anesthesia assessment + consent + clearance ASAP — vector preparation takes time, no waste on cancelled patients\n- Induce GA as you see fit\n- Place a **2nd IV as the dedicated gene therapy line** — research provides the proper tubing\n- Emergence in OR\n- These cases are **always done at the end of the day**',
            },
            {
                heading: 'Disposition',
                emphasis: 'plain',
                body: '- **PICU post-op for monitoring** (research protocol requirement; the patients themselves are usually fine)\n- We usually take them to PICU directly. PACU first allowed only if absolutely necessary.',
            },
            {
                heading: 'Why anesthesia at all',
                emphasis: 'plain',
                body: 'Anesthesia eliminates the risk of the child pulling out the IV during the viral-vector infusion. Otherwise the procedure is just an IV infusion.',
            },
        ],
    },
];
