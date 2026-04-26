// Hematology / Oncology hub — catalog entries.
// Source: NCH Sharepoint / Hematology & Oncology /
//   - Care of the JW patient_Aug 2023.pdf
//   - NCH Guidelines for tx bleeding episodes.pdf
//   - Erythropoietin policy.docx
//   - Enhanced Recovery after Surgery for Tumor resections (ERAST)_12_2023.pdf
//   - Hereditary Angioedema Emergency.pptx (binary placeholder — needs transcription)
//   - Pre-op Instructions for Sickle Cell Patients.doc + Sickle Cell SOPs (binary placeholders)

const COMMON = {
    hub: 'hematology',
    kind: 'catalog',
    weightAware: false,
    ageRules: null,
    source: 'NCH Sharepoint / Hematology & Oncology',
    lastReviewed: '2026-04',
};

export const entries = [
    {
        ...COMMON,
        id: 'heme_jw_patient',
        title: 'Jehovah\'s Witness — Care Pathway',
        shortDescription: 'Pre-op blood-conservation, intra-op alternatives, JW consent + legal workflow.',
        tags: ['jw', 'jehovah', 'jehovah\'s witness', 'bloodless', 'cell saver', 'anh', 'erythropoietin', 'rviia', 'pcc', 'consent'],
        emergency: false,
        related: ['heme_erythropoietin'],
        sections: [
            {
                heading: 'Pre-op (involve surgeon)',
                emphasis: 'info',
                body: '- Baseline Hb, Hct, and coagulation function\n- Discontinue OTC and herbal medications affecting coagulation/platelet function\n- Consider preoperative erythropoietin (see related entry)\n- Consider autologous blood donation\n- Alert NCH legal department to day of surgery and patient information\n- Surgical and anesthesia pathway based on comorbid conditions',
            },
            {
                heading: 'Intra-op — definitely acceptable',
                emphasis: 'success',
                body: '- Antifibrinolytic (TXA — standard intraoperative dosing)\n- Acute normovolemic hemodilution (ANH) — set up so blood does not lose continuous connection to the patient\n- Cell saver — same continuous-connection requirement\n- Albumin (most JW patients accept; confirm)',
            },
            {
                heading: 'Intra-op — variable acceptance (discuss with parents)',
                emphasis: 'warn',
                body: '- Alternatives to blood products:\n- rFVIIa (NovoSeven)\n- Prothrombin complex concentrate (PCC)\n- Non-red-cell blood products: FFP, Cryoprecipitate\n- **Significant variation** in JW family acceptance — discuss each item during the preoperative interview and consent process.',
            },
            {
                heading: 'Consent + legal workflow',
                emphasis: 'critical',
                body: '- Standard pre-op consent — check "no blood products"\n- Surgeon to obtain "Letter of Understanding Regarding Blood Transfusion" signed by parents\n- Day of surgery: call/email legal offices after pre-op interview; obtain name of who is on call day + night\n- **If transfusion required to avoid mortality (true emergency): transfuse, THEN call legal office**\n- If need is urgent (not yet life-threatening): call legal office — they will obtain a court order for transfusion',
            },
            {
                heading: 'Continuous-connection setup details',
                emphasis: 'info',
                body: 'Specific ANH and cell-saver set-up details (so the blood circuit is never disconnected from the patient) can be obtained from the cardiac anesthesia team or the NCH perfusion team.',
            },
        ],
    },
    {
        ...COMMON,
        id: 'heme_bleeding_disorders',
        title: 'Hemophilia A / B / vWD — Bleeding Treatment',
        shortDescription: 'Factor replacement targets by bleed type. Always check the live Factor Replacement List.',
        tags: ['hemophilia', 'factor viii', 'factor ix', 'vwd', 'von willebrand', 'humate-p', 'ddavp', 'stimate', 'amicar', 'bleed'],
        emergency: true,
        related: [],
        sections: [
            {
                heading: 'Always do these first',
                emphasis: 'critical',
                body: '- Contact Hematologist on-call (614-722-3564 business hrs / 614-722-2000 after-hours)\n- Check the current **Factor Replacement List** in ED, PICU, J5, or Hem/Onc clinic for individual patient instructions\n- Recombinant products preferred over plasma-derived for both Factor VIII and Factor IX',
            },
            {
                heading: 'Hemophilia A (Factor VIII deficiency) — bolus dosing',
                emphasis: 'warn',
                body: '- **Life/limb threatening** (CNS/eye, retroperitoneal, airway, GI, compartment syndrome, hip hemarthrosis): **rFVIII 50 U/kg STAT bolus** — treat suspected CNS bleed BEFORE imaging\n- CNS bleed positive on CT: continuous infusion **3 U/kg/hr** to keep FVIII >100% × 24 hr → 2-3 U/kg/hr × 5-7 d to keep >50% → >30% × 7 more days\n- Iliopsoas: 50 U/kg load → 25 U/kg q12h vs continuous infusion → 20 U/kg qOday × 10-14 d\n- Hemarthrosis: **25-50 U/kg**; severe → repeat next day, then qOday × 1 wk\n- Mucosal/epistaxis/extraction: 20 U/kg single dose + Amicar 100-200 mg/kg load → 50-100 mg/kg q6h × 10 d\n- Pre-op (major surgery): **50 U/kg ½–1 hr pre-op**, check with hematologist for intra/post-op',
            },
            {
                heading: 'Hemophilia B (Factor IX deficiency) — bolus dosing',
                emphasis: 'warn',
                body: '- **Life/limb threatening: rFIX 100 U/kg STAT bolus**\n- CNS positive on CT: **50 U/kg q12h** to maintain FIX >100% × 24 hr → 25 U/kg q24h × 5-7 d to keep >40% → >30% × 7 more days\n- Iliopsoas: 100 U/kg load → 25-50 U/kg q12-24h → 40 U/kg qOday × 10-14 d\n- Hemarthrosis: **35 U/kg**; severe → repeat next day, then qOday × 1 wk\n- Mucosal: 35 U/kg + Amicar (same dose as Hem A)\n- Pre-op major surgery: **100 U/kg ½–1 hr pre-op**\n- Note: Recombinant FIX (Benefix) doses already adjusted upward by 1.2× for increased volume of distribution',
            },
            {
                heading: 'von Willebrand Disease — Humate-P (RCOF units)',
                emphasis: 'warn',
                body: '- **Life/limb threatening: 50 U RCOF/kg STAT bolus**, then continuous 3 U RCOF/kg/hr to keep RCOF >100% × 24 hr → 2-3 U/kg/hr × 5-7 d to keep >50% → >30% × 7 more days\n- Mucosal/epistaxis: DDAVP/Stimate for responders OR 20 U RCOF/kg single dose + Amicar (same dose)\n- Hemarthrosis early: DDAVP for responders or 15-20 U RCOF/kg; late joint: 25-50 U RCOF/kg\n- Pre-op major surgery: 50 U RCOF/kg ½-1 hr pre-op (DDAVP for non-invasive procedures if responder)',
            },
            {
                heading: 'DDAVP / Stimate basics',
                emphasis: 'info',
                body: '- IV DDAVP: **0.3 mcg/kg** in 25-50 mL NS over 30 min\n- IN Stimate: 150 mcg (1 puff) if ≤50 kg; 300 mcg (2 puffs) if >50 kg\n- Restrict fluids to ≤ maintenance for 24 hr after each dose\n- Do not dose more frequently than q12h (tachyphylaxis)\n- Monitor serum Na — risk of hyponatremic seizures',
            },
            {
                heading: 'Amicar contraindications',
                emphasis: 'critical',
                body: '- **Amicar is CONTRAINDICATED in hematuria** — promotes clot formation in the urinary tract\n- For hematuria: strict bed rest + 1.5× maintenance IVF for 24-48 hr → if not resolved, replace factor + start Prednisone (if HIV negative)',
            },
            {
                heading: 'Inhibitor patients (escalation)',
                emphasis: 'critical',
                body: '- **Contact hematologist on-call ASAP**, arrange admission\n- High-responder Hem A (≥10 BU): rFVIIa (NovoSeven) 90-180 mcg/kg q4h initially; if not successful → aPCC (FEIBA) 75 U/kg/dose, no more than q12h or 3 sequential doses without DIC monitoring\n- Hem B with inhibitors: rFVIIa 90-180 mcg/kg q4h; FEIBA contraindicated if anaphylaxis to FIX exposure',
            },
        ],
    },
    {
        ...COMMON,
        id: 'heme_erast',
        title: 'ERAST — Tumor Resection Enhanced Recovery',
        shortDescription: 'Enhanced Recovery after Surgery for Tumor resections — pre/intra/post-op bundle.',
        tags: ['eras', 'erast', 'tumor', 'oncology', 'opioid sparing', 'normothermia', 'ponv', 'goal-directed'],
        emergency: false,
        sections: [
            {
                heading: 'Pre-op',
                emphasis: 'info',
                body: '- Counsel about ERAST brochure; set expectations\n- Carbohydrate load — 10 mL/kg up to 350 mL (sports drink, apple juice, Pedialyte) up to 2 hr pre-op (omit if <6 mo)\n- Avoid prolonged fasting — regular diet night before; clears until 2 hr pre-op; no bowel prep when not procedure-required\n- Antibiotic prophylaxis within 60 min of incision',
            },
            {
                heading: 'Pre-induction huddle rubric',
                emphasis: 'plain',
                body: '- Maintain normothermia 36-38 °C (pre-warm OR + bed, underbody forced air, fluid warmer, warming lights if <10 kg)\n- If patient ≥ 10 yr: place SCDs prior to induction\n- Fluid goals: euvolemia by goal-directed therapy; consider 2% buffered saline if extensive shifts/blood loss\n- Opioid-sparing: acetaminophen + ketorolac; lidocaine/ketamine/dexmed infusions as indicated (clear with Pain Team if regional planned)\n- Regional plan: epidural / TAP / ESP / QL catheter pre-incision when feasible; otherwise 1-shot or wound catheters\n- PONV ppx: aprepitant ± scopolamine for high-risk (age >3, female, prior PONV/motion sickness, gyn/uro/breast); dex + ondansetron intraop',
            },
            {
                heading: 'Intra-op',
                emphasis: 'info',
                body: '- Pre-incision epidural for open cases\n- Maintain euvolemia — avoid fluid overload; 2% buffered hypertonic saline for big shifts\n- 36-38 °C\n- Adjuncts: ketamine 0.1-0.3 mg/kg/hr, dexmed 0.2-0.7 mcg/kg/hr, lidocaine 1 mg/kg/hr (max 60 mg/hr)\n- Lap- or robot-assisted when oncologically reasonable',
            },
            {
                heading: 'Post-op',
                emphasis: 'success',
                body: '- Avoid NG tube — remove before leaving OR if used intra-op\n- Early feeding: clears POD#0, regular diet POD#1; out of bed POD#1 (document); PT consult\n- Saline lock IV by POD#1-2 unless clinically indicated\n- Early Foley removal based on epidural level\n- Scheduled acetaminophen + ketorolac upon leaving OR; change to PRN as needed\n- **Goal: <0.15 mg/kg IV morphine equivalents per day**',
            },
        ],
    },
    {
        ...COMMON,
        id: 'heme_erythropoietin',
        title: 'Erythropoietin Policy (perioperative)',
        shortDescription: 'Outpatient + inpatient EPO dosing, iron schedule, contraindications.',
        tags: ['erythropoietin', 'epo', 'epoetin', 'procrit', 'iron', 'jw', 'preop hemoglobin'],
        emergency: false,
        related: ['heme_jw_patient'],
        sections: [
            {
                heading: 'Outpatient EPO (epoetin alfa) options',
                emphasis: 'info',
                body: '- **600 U/kg SC, max 10,000 U** — once a week × 4 doses (day -21, -14, -7, 0)\n- OR **500 U/kg SC twice/week × 8 doses** starting 4 wk pre-op, last dose 1 wk pre-op',
            },
            {
                heading: 'Inpatient (post-op) EPO',
                emphasis: 'info',
                body: '500 U/kg SC every Monday, Wednesday, Friday',
            },
            {
                heading: 'Monitoring',
                emphasis: 'plain',
                body: '- Check Hb prior to starting and again at 14 d before surgery\n- Target Hb: **13-14 g/dL**',
            },
            {
                heading: 'Iron supplementation',
                emphasis: 'plain',
                body: '- Ferrous sulfate **7.5 mg/kg/dose PO BID** (note: this is the ferrous sulfate dose, not elemental iron)\n- Elemental iron equivalent: 3 mg/kg/dose BID, max 325 mg\n- Infants: Fer-In-Sol drops 75 mg/mL for smaller volume\n- Start Colace (docusate) with iron',
            },
            {
                heading: 'Contraindications + DVT ppx',
                emphasis: 'critical',
                body: '- **Avoid EPO** with: history of VTE, family history of hypercoagulable state, oncologic disease, hypertension\n- Consider post-op DVT ppx (SCDs)',
            },
        ],
    },
    {
        ...COMMON,
        id: 'heme_sickle_cell',
        title: 'Sickle Cell — Pre-op Instructions',
        shortDescription: 'Source files (.doc) need manual transcription — see SOPs in Sharepoint.',
        tags: ['sickle cell', 'scd', 'hgb s', 'transfusion', 'preop instructions'],
        emergency: false,
        sections: [
            {
                heading: 'Source not yet transcribed',
                emphasis: 'warn',
                body: 'The NCH Sickle Cell SOPs and Pre-op Instructions are in legacy .doc format that did not auto-extract. Open the originals in `original_pictures/Sharepoint/Hematology & Oncology/` and transcribe them into structured sections here. Until then, principles include: pre-op transfusion to target HbS <30% for major surgery, avoid hypoxia/dehydration/hypothermia/acidosis intra-op, and aggressive O2 + fluid strategy.',
            },
        ],
    },
    {
        ...COMMON,
        id: 'heme_hereditary_angioedema',
        title: 'Hereditary Angioedema (HAE) Emergency',
        shortDescription: 'Source is .pptx — needs manual transcription. Stub for awareness.',
        tags: ['hae', 'hereditary angioedema', 'c1 esterase inhibitor', 'icatibant', 'ecallantide', 'airway'],
        emergency: true,
        sections: [
            {
                heading: 'Source not yet transcribed',
                emphasis: 'warn',
                body: 'The NCH Hereditary Angioedema Emergency .pptx did not auto-extract. Principles: anticipate airway swelling, avoid ACE-I, secure airway early in attacks, give C1 esterase inhibitor concentrate (Berinert/Cinryze) or icatibant or ecallantide for acute attacks. Open the .pptx in `original_pictures/Sharepoint/Hematology & Oncology/` for full NCH dosing.',
            },
        ],
    },
];
