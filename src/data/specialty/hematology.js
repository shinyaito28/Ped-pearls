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
        title: 'Sickle Cell — Periop + Acute Complications',
        shortDescription: 'Pre-op transfuse to Hb 10 (↓ ACS 30%→10%); warm + O2 + hydration intra-op; PCA + ICS post-op.',
        tags: ['sickle cell', 'scd', 'hgb s', 'hgb ss', 'sbeta thal', 'transfusion', 'acs', 'acute chest syndrome', 'voc', 'vaso-occlusive crisis', 'priapism', 'stroke', 'apheresis', 'codeine', 'ceftriaxone', 'incentive spirometry'],
        emergency: false,
        related: ['heme_jw_patient'],
        sections: [
            {
                heading: 'Pre-op transfusion plan',
                emphasis: 'critical',
                body: '- **Goal Hb 10 g/dL (range 9-11)** — Hgb ≥10 reduces post-op ACS risk from **~30% → 10%** (most patients with Hgb SS or S-Beta⁰ Thal need transfusion; Sβ+ Thal often does NOT)\n- **Routine**: CBC + Type & Cross **2-7 days pre-op**; **simple transfusion PRBCs 10-20 mL/kg** to reach goal\n- **Apheresis patients**: schedule surgery **within 1 wk of regularly scheduled apheresis**; ending goal Hb 10\n- **Apheresis to ↓ HgbS%**: reserved for **very high-risk procedures only** (pre-BMT, neurosurgery, major orthopedic)\n- **Develop a written surgery plan** with the sickle cell team — call the **sickle cell nurse clinicians at (614) 722-6349**',
            },
            {
                heading: 'Pre-op hydration + scheduling',
                emphasis: 'warn',
                body: '- Schedule as **1st or 2nd case** of the day\n- **Pre-operative admission usually NOT necessary**\n- Patient drinks clears until **2 hr pre-op**\n- **Wake child 3-4 hr pre-op + drink 4 hr worth of maintenance fluids** as clears\n- Suggested clear liquid intake (4 hr maintenance):\n  - 5 kg → ≥ 80 mL (3 oz) | 10 kg → ~160 mL (5-6 oz)\n  - 15 kg → ≥ 200 mL (6-7 oz) | 20 kg → ≥ 240 mL (8 oz)\n  - 25 kg → ≥ 260 mL (9 oz) | 30 kg → 9-10 oz | 40 kg → 10-11 oz\n  - 50 kg → 12 oz | 60 kg → 13 oz\n- **On arrival to pre-op area**: place IV, send **repeat H&H + Type & Cross**, start maintenance IVF',
            },
            {
                heading: 'Intra-op priorities',
                emphasis: 'critical',
                body: '- **WARM patient — most important intra-op factor** to prevent post-op SCD complications (Bair hugger, warm fluids, room warmth)\n- **Maintain oxygenation** (no permissive hypoxia)\n- **Maintain hydration** (avoid dehydration)\n- Avoid acidosis, hypotension, hypothermia, hypoxia (the classic "sickling pentad" with venous stasis)',
            },
            {
                heading: 'Emergency surgery (no time for pre-op transfusion)',
                emphasis: 'critical',
                body: '- **CBC + Type & Cross immediately**\n- **If Hb < 10**: transfuse **PRBCs 15 mL/kg over 2-3 hr**\n- **Call Blood Bank** + inform of SCD → they will use **sickle-negative + minor antigen-matched blood** to ↓ transfusion reaction\n- **No pre-op exchange transfusion if Hgb > 10** (would significantly delay surgery)\n- **Activate MTP** if appropriate\n- **Call hematologist on-call** for any emergency surgery in SCD patient',
            },
            {
                heading: 'Post-op management',
                emphasis: 'warn',
                body: '- Preferred unit: **J5** (specialized SCD nursing)\n- **Lap splenectomy → PICU** for careful observation\n- Hematology consult NOT required for most procedures\n- **Hourly incentive spirometry while awake** — only proven prevention of ACS\n- Encourage early ambulation\n- **Maintain SpO2 > 93%** to prevent sickling\n- Pain control scheduled to procedure to prevent VOC',
            },
            {
                heading: 'Post-op pain control (PCA dosing)',
                emphasis: 'info',
                body: '- Narcotic-naive: standard doses; many SCD children have prior narcotic experience and require higher doses\n- **Morphine PCA**: continuous **0.03-0.04 mg/kg/hr** + bolus **0.01-0.02 mg/kg q10-15 min**\n- **Dilaudid PCA**: continuous **0.003-0.005 mg/kg/hr** + bolus **0.003 mg/kg q10-15 min**\n- PO (when tolerating + appropriate to procedure): **Hydrocodone/APAP 0.2 mg hydrocodone/kg q6h scheduled (max 10 mg)**\n- **Tylenol with codeine is CONTRAINDICATED** in SCD — codeine metabolism via CYP2D6 highly variable',
            },
            {
                heading: 'Acute Chest Syndrome (ACS) — periop emergency',
                emphasis: 'critical',
                body: '**Definition**: New CXR infiltrate + fever, chest pain, hypoxia, or respiratory symptoms (treat empirically if hypoxia + fever even without infiltrate — infiltrate sometimes follows clinical signs).\n\n**Why it matters**: 10% of adults admitted with ACS die during hospitalization; **leading cause of acute death in SCD**; often follows VOC.\n\n**Treatment**:\n- **Admit** — deterioration can be rapid\n- **Antibiotics: Ceftriaxone + Azithromycin** at onset; complete 10-d broad spectrum (Omnicef/Augmentin) + 5-d Azithromycin\n- **Aggressive pulmonary toilet + incentive spirometry**\n- **O2 to keep SpO2 > 93%** (continuous pulse ox)\n- **Albuterol 2.5 mg HHN q4-6h × 48 hr** — assess response, stop at 48 hr if no clinical difference\n- **Transfuse PRBCs to Hb > 10**\n- Severe / baseline Hb > 10 → consider **partial or complete exchange transfusion**\n- Pain control: ibuprofen ± narcotic\n- **Maintenance IVF — do NOT fluid restrict**\n- **Steroids should NOT typically be used** for ACS; if needed for asthma exacerbation → discharge with **6-8 day taper** to prevent rebound VOC',
            },
            {
                heading: 'Fever (T > 101 °F) workup',
                emphasis: 'warn',
                body: '- ASAP evaluation: **CBC, retic, blood culture, SpO2** on all patients\n- Consider UA/urine culture, CXR, LP per clinical concern\n- **Ceftriaxone 50 mg/kg (max 2 g) IV** immediately after blood culture\n- Allergy: Clindamycin or Levaquin (must cover Strep pneumo)\n- **Admit** if: history of bacteremia, surgical splenectomy, ACS (CXR infiltrate)\n- Strongly consider admission if: T > 103, WBC > 30k or < 5k, plt < 100k, hydration/transport/compliance issues\n- Outpatient after Ceftriaxone: **Omnicef × 2 days** while cultures pending; message SCD nurse clinician (722-6349)\n- **No specific age criterion for admission** — infants difficult to assess, conservative management recommended',
            },
            {
                heading: 'Vaso-Occlusive Crisis (VOC) — IV regimen if home failed',
                emphasis: 'warn',
                body: 'Triggers: cold, dehydration, fever, illness, vigorous exercise, hypoxia, emotional stress, fatigue.\n\n**ER / acute treatment**:\n- Evaluate, CBC, retic, SpO2; FACES or 1-10 pain scale\n- **Toradol 0.5 mg/kg (max 30 mg) IV ×1** — hold ibuprofen if plt < 50k\n- **Initial IV narcotic**:\n  - **Morphine 0.1 mg/kg** (start dose) OR\n  - **Dilaudid 0.015-0.02 mg/kg** (start dose)\n- **PCA "button only"**: divide initial bolus dose by 6, q10min\n- **IVF**: NS bolus 10-20 mL/kg → **1.5× MIVF with D5 ½NS + 20 mEq/L KCl**\n- Heating pad; adjuncts: Colace, Atarax, ondansetron\n- If improved → discharge on scheduled ibuprofen + narcotic × 48 hr\n- **If fails ER → admit + start continuous narcotic**:\n  - Morphine continuous 0.03-0.04 mg/kg/hr + PCA 0.01-0.02 mg/kg q10-15 min\n  - Dilaudid continuous 0.003-0.005 mg/kg/hr + PCA 0.003 mg/kg q10-15 min',
            },
            {
                heading: 'Stroke — EMERGENCY',
                emphasis: 'critical',
                body: '- **Page Hematologist on-call to activate Apheresis team** if any stroke concern\n- **Non-contrast CT** to exclude hemorrhagic stroke\n- Labs: CBC, retic, bilirubin, AST/ALT, metabolic panel, Type & Cross\n- **If Hb < 10**: simple transfusion PRBCs 10 mL/kg while awaiting apheresis\n- **Erythrocytapheresis: goal Hb 10 g/dL, HgbS < 15%**\n- **Admit PICU initially → J5**\n- Consults: Neurology, Psychology, SW, PT, OT, Speech, TR\n- **No role for tPA in children with SCD-related stroke** (discuss with hematologist for Sβ+ Thal)\n- Epi: 10% of children with HgbSS have stroke before 20 yr; peak 2-6 yr; ischemic in MCA territory most common',
            },
            {
                heading: 'Priapism',
                emphasis: 'warn',
                body: '- **Definition**: unwanted, sustained, painful erection\n- **Home**: oral hydration + ibuprofen 10 mg/kg + oral narcotic; gentle exercise; if > 1-2 hr or first episode → call SCD team + ER\n- **ER**: NS bolus 10-20 mL/kg → 1.5× MIVF; **Toradol 0.5 mg/kg IV ×1**; Morphine 0.1 mg/kg or Dilaudid 0.015-0.02 mg/kg IV ×1\n- **Consult Urology** for local measures (irrigation, drainage)\n- Admit for continued pain + hydration\n- **No role for simple transfusion**\n- Exchange transfusion only if Urologic measures fail (carries risk of "ASPEN-like" neurologic syndrome — acute neurologic events with exchange transfusion for priapism)',
            },
        ],
    },
    {
        ...COMMON,
        id: 'heme_hereditary_angioedema',
        title: 'Hereditary Angioedema (HAE) Emergency',
        shortDescription: 'Bradykinin-mediated — antihistamines/epi don\'t work. Berinert (NCH formulary) or icatibant.',
        tags: ['hae', 'hereditary angioedema', 'c1 esterase inhibitor', 'c1-inh', 'icatibant', 'firazyr', 'ecallantide', 'kalbitor', 'berinert', 'cinryze', 'ruconest', 'lanadelumab', 'berotralstat', 'bradykinin', 'kallikrein', 'airway', 'tongue swelling'],
        emergency: true,
        sections: [
            {
                heading: 'Recognition (NOT anaphylaxis)',
                emphasis: 'critical',
                body: '- Self-limiting episodes of edema involving skin, GI tract, larynx\n- **Bradykinin-mediated** (NOT histamine, NOT mast-cell)\n- Skin: face, extremities, genitals; abdominal: severe pain, vomiting, diarrhea\n- **Laryngeal/tongue edema is life-threatening**\n- Symptoms wax/wane over hours-days — anticipate need for **emergent re-intubation**\n- C1-INH deficiency: low C4 (C1 normally cleaves C4 in classical complement pathway)\n- Triggers: stress/anxiety, trauma, infection (H. pylori, bacteriuria), ACE-I, estrogens, dental procedures',
            },
            {
                heading: 'What does NOT work',
                emphasis: 'critical',
                body: '- **Antihistamines**: little effect (not histamine-mediated)\n- **Steroids**: limited acute response; may use 60 mg ×5 d if persistent\n- **Epinephrine**: minimally responsive (vs anaphylaxis where it is first-line)\n- → Don\'t delay specific HAE therapy waiting for these to work',
            },
            {
                heading: 'Initial bedside treatment',
                emphasis: 'critical',
                body: '- Call **difficult airway team early**; ENT + anesthesia present\n- Empiric **IM epinephrine 0.5 mg + IV methylprednisolone 60 mg** while ruling out anaphylactoid mimic — but proceed to specific therapy below\n- **Emergent OR for intubation** — flexible transnasal fiberoptic (decongest with oxymetazoline, anesthetize with lidocaine)\n- Plan for **PICU disposition** with risk of self-extubation + recurrent swelling',
            },
            {
                heading: 'C1-INH [Human] — Berinert (NCH formulary, consignment fridge)',
                emphasis: 'warn',
                body: '- **MOA**: C1-INH concentrate from human plasma (Blood Product)\n- **Dose: IV 20 units/kg** (≥5 yr)\n- Onset: **15 min** (fastest of all options)\n- Cinryze: IV 1,000 units (≥6 yr); Cinryze + Haegarda also for prophylaxis\n- AE: hypersensitivity (rash, pruritus), thrombotic events\n- Cost: ~$3,403 per 500-unit kit',
            },
            {
                heading: 'Icatibant — Firazyr (NCH formulary, H2 Pyxis)',
                emphasis: 'warn',
                body: '- **MOA**: Synthetic bradykinin B2-receptor antagonist\n- **Hazardous drug**\n- **Dose (≥2 yr): SubQ 0.4 mg/kg (max 30 mg/dose)**, may repeat q6h (max 90 mg/d)\n- Onset: **2 hr**\n- AE: CNS depression, ↑ transaminases\n- Allergy team\'s typical recommendation: 30 mg subQ; redose at 6 hr if partial/incomplete response',
            },
            {
                heading: 'Ecallantide — Kalbitor (NOT on NCH formulary)',
                emphasis: 'plain',
                body: '- **MOA**: Kallikrein inhibitor\n- **Dose (≥8 yr): SubQ 30 mg** (10 mg/1 mL ×3); may repeat once in 24 hr\n- Onset: 30 min – 4 hr\n- AE: hypersensitivity, immunogenicity',
            },
            {
                heading: 'C1-INH Recombinant — Ruconest (NOT on NCH formulary)',
                emphasis: 'plain',
                body: '- **Dose (≥5 yr): IV 50 units/kg (max 4,200 units/dose)**, no more than 2 doses in 24 hr\n- Onset: 90 min\n- Same dose twice weekly as prophylaxis ≥13 yr',
            },
            {
                heading: 'Diagnostic labs (during attack)',
                emphasis: 'info',
                body: '- **C4** (low in Type I/II)\n- **C1-INH level** (mg/dL)\n- **C1-INH function** (%)\n- **Tryptase** — to rule out mast-cell process (normal in HAE: ≤10.9 µg/L)\n- HAE Type III: normal C1-INH/C4; suspect if response to icatibant + clinical picture',
            },
            {
                heading: 'Long-term prophylaxis (Allergy outpatient)',
                emphasis: 'plain',
                body: '- **Lanadelumab (Takhyzro)**: kallikrein inhibitor mAb, SubQ 300 mg q2wk (≥12 yr); space to q4wk if controlled\n- **Berotralstat (Orladeyo)**: kallikrein inhibitor PO 150 mg qday (≥12 yr); ↓ to 110 mg if GI or hepatic dysfunction\n- Cinryze and Haegarda (C1-INH) also for prophylaxis\n- Neither lanadelumab nor berotralstat on NCH formulary',
            },
            {
                heading: 'Discharge meds (after ruling out histamine-mediated)',
                emphasis: 'info',
                body: '- Epinephrine **0.3 mg IM PRN** auto-injector\n- Famotidine 20 mg PO BID\n- Cetirizine 10 mg PO BID (may ↑ to 40 mg/d)\n- Allergy follow-up',
            },
        ],
    },
];
