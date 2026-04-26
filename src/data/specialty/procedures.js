// Pain Procedures hub — catalog entries.
// Source: NCH Sharepoint / Acute & Regional Pain Medicine /
//   - Procedure-based Pain Protocols/
//     Pectus_Nuss Pathway 062624.pdf, TPIAT Pain Protocol 1_14_26.docx,
//     Caffeine for post LP headache.docx, Spinal fusion protocol 07-2025.docx,
//     Hemipelvectomy/Limb Salvage (also in Ortho hub),
//     Iobst limb lengthening (also in Ortho hub),
//     PSH Urology Laparoscopic Pyeloplasty Pathway,
//     SELMS Patients Dr Whitaker.pdf,
//     Dorsal Rhizotomy (also in Neuro hub)
//   - Adjunct infusion protocols/
//     Dexmedetomidine, Ketamine, Lidocaine NCH protocols
//   - ASRA & Regional Guidelines/
//     Anticoagulation & Regional Summary, Caffeine for post LP, Credentialing
//   - Spinal Anesthesia/
//     Spinal- caudal protocol, Spinal Anesthesia Pearls.pdf

const COMMON = {
    hub: 'procedures',
    kind: 'catalog',
    weightAware: false,
    ageRules: null,
    source: 'NCH Sharepoint / Acute & Regional Pain Medicine',
    lastReviewed: '2026-04',
};

export const entries = [
    {
        ...COMMON,
        id: 'proc_pectus_nuss',
        title: 'Pectus / Nuss Repair Pathway',
        shortDescription: 'Cryoablation-friendly anesthetic; methadone + bilateral intercostal blocks; no epidural.',
        tags: ['pectus', 'nuss', 'cryoablation', 'methadone', 'intercostal', 'sevb', 'paravertebral', 'eras'],
        emergency: false,
        sections: [
            {
                heading: 'Pre-op',
                emphasis: 'info',
                body: '- Mailed educational handout / MyChart link\n- PT consult: posture, core strength, prehabilitation, post-op activity restriction prep\n- For repair: discuss non-op vs Ravitch vs Nuss, technical details, **cryoablation**, realistic pain expectations, expected post-op course\n- Pre-op testing: bar allergy testing, CT scan + ECHO (transitioning to pectus protocol MRI), exercise stress only if insurance-required, cardiology + PFTs only if indicated',
            },
            {
                heading: 'Day of surgery — pre-op meds',
                emphasis: 'plain',
                body: '- NPO after midnight except clears (Gatorade) up to 2 hr\n- Chlorhexidine wipes; void in pre-op\n- **Gabapentin 300 mg PO once** (or higher: 600 mg if >50 kg, 7.5 mg/kg if <50 kg) — Lyrica alternative\n- **Acetaminophen 15 mg/kg PO once (max 1000 mg)** — alternatively IV intra-op\n- **Scopolamine patch 1.5 mg** in pre-op holding (one patch if > 40 kg)\n- **Aprepitant**: 40 mg cap if > 40 kg, 1 mg/kg liquid if <40 kg',
            },
            {
                heading: 'Intra-op',
                emphasis: 'warn',
                body: '- **Cefazolin 50 mg/kg (max 2000 mg)** within 60 min of incision (clindamycin if allergic); repeat q3h\n- **No routine A-line / central line** unless indicated\n- 2 PIVs + type & screen\n- **NO epidural placement, NO Foley**\n- SCDs; pharmacologic VTE ppx (enoxaparin) only for high-risk (discuss surgeon)\n- GA — minimize opioids (no single-lung needed) per ERAS:\n  - **Dexmedetomidine 0.3-0.5 mcg/kg/hr**\n  - **Ketamine 0.25 mg/kg/hr**\n- **NO lidocaine infusion** given amount of local for intercostal blocks\n- **Methadone 0.15 mg/kg IV ×1**',
            },
            {
                heading: 'Cryoablation + intercostal blocks',
                emphasis: 'info',
                body: '- Surgeon performs **bilateral intercostal cryoablation** (T3-T9 typically)\n- Local anesthetic infiltration at chest tube + bar entry sites\n- This is the core of the multimodal pain plan — replaces traditional epidural',
            },
            {
                heading: 'Post-op',
                emphasis: 'plain',
                body: '- Multimodal: scheduled IV/PO acetaminophen + ketorolac/ibuprofen + gabapentin\n- Consider **PCA hydromorphone or morphine** demand-only with naloxone infusion\n- **Aprepitant 20 mg PO (if > 40 kg) or 0.5 mg/kg (if <40 kg)** PRN PONV POD #1\n- Early mobilization; PT\n- Transition to oral by POD #1-2',
            },
        ],
    },
    {
        ...COMMON,
        id: 'proc_tpiat',
        title: 'TPIAT — Total Pancreatectomy + Islet Autotransplant',
        shortDescription: 'Celiac plexus block + thoracic epidural OR bilateral T10 ESB; methadone; ketamine + dexmed gtt.',
        tags: ['tpiat', 'pancreatectomy', 'islet', 'celiac plexus', 'epidural', 'erector spinae', 'esb', 'methadone', 'ketamine'],
        emergency: false,
        sections: [
            {
                heading: 'Pre-op',
                emphasis: 'info',
                body: 'Patient evaluated pre-operatively in the **outpatient pain clinic**.',
            },
            {
                heading: 'Intra-op pain plan — celiac plexus block',
                emphasis: 'warn',
                body: '**Celiac plexus block by surgeons under direct supervision**:\n- 0.2% ropivacaine **0.3 mL/kg** (max 20 mL)',
            },
            {
                heading: 'Intra-op pain plan — neuraxial / regional choice',
                emphasis: 'critical',
                body: '**If no low-dose lovenox in past 12 hr** (or contraindicating anticoag) → **thoracic epidural at start of case**:\n- Initial bolus: **0.1-0.2 mL/kg of 0.2% ropivacaine**\n- Infusion: **0.2% ropivacaine ± clonidine** (with consideration for post-op dexmed infusion) at **0.1-0.2 mL/kg/hr**\n\n**If lovenox or other contraindications** → **bilateral T10 erector spinae block (ESB) catheters at start of case** by acute pain service:\n- Patient prone for placement\n- Initial bolus: **0.2-0.4 mL/kg/side (max 30 mL/side) of 0.2% ropivacaine**\n- Bilateral infusions: 0.2% ropivacaine, **no basal**, programmed bolus **0.1 mL/kg q60min**, no patient-controlled bolus',
            },
            {
                heading: 'Intra-op systemic',
                emphasis: 'warn',
                body: '- **Methadone 0.1 mg/kg IV (max 10 mg) prior to incision**\n- **Re-dose methadone 0.05 mg/kg (max 5 mg) at start of closure**\n- Intermittent opioid boluses prn\n- **Ketamine 0.1 mg/kg/hr (max 10 mg/hr)** — entire case + continue post-op\n- **No lidocaine infusion** unless epidural + ESB cannot be placed\n- **Dexmedetomidine 0.3-0.9 mcg/kg/hr** — start at closure + continue post-op',
            },
            {
                heading: 'Pain team coordination',
                emphasis: 'plain',
                body: '- Call Pain team to write orders for PCA/NCA + inform of extubation plan\n- OR circulator or anesthesiologist calls Pain APRN at end of case before PICU transfer',
            },
            {
                heading: 'Post-op (ICU minimum 7 days)',
                emphasis: 'info',
                body: '- **ICU manages**: dexmed, opioid, benzodiazepine infusions\n- **Pain team manages**: ketamine infusion, IV methadone, PCA pump, ESB catheter infusions\n- Continue ketamine at 0.1 mg/kg/hr\n- **Patients on pre-op opioids (scheduled)**: IV methadone 0.05 mg/kg (max 5 mg) q8h, start 8 hr after last intra-op methadone; demand-dose-only PCA/NCA before extubation\n- **Opioid-naive**: no post-op methadone; PCA/NCA with continuous (basal) dose\n- IV acetaminophen, **NO NSAIDs**',
            },
            {
                heading: 'Post-op methadone caveat',
                emphasis: 'warn',
                body: 'Standardized early post-op methadone is **dependent on identifying a healthcare provider, local to the patient, able/willing to manage methadone dosing + wean** after discharge. The pediatric pancreatology team handles this preoperatively.',
            },
        ],
    },
    {
        ...COMMON,
        id: 'proc_spinal_fusion_pain_2025',
        title: 'Spinal Fusion Pain Protocol (July 2025)',
        shortDescription: 'Updated 2025 version; cross-link to Ortho hub for complete protocol.',
        tags: ['spinal fusion', 'scoliosis', 'pain', 'multimodal', 'updated 2025'],
        emergency: false,
        related: ['ortho_spinal_fusion_pain'],
        sections: [
            {
                heading: 'Source available — see Ortho hub',
                emphasis: 'info',
                body: 'The "Spinal fusion protocol 07-2025.docx" updates the 2020 protocol. The complete protocol entry lives in the **Ortho hub** (`ortho_spinal_fusion_pain`); the 2025 version may differ in dosing — verify against the source under `original_pictures/Sharepoint/Acute & Regional Pain Medicine/Procedure-based Pain Protocols/Spinal fusion protocol 07-2025.docx`.',
            },
        ],
    },
    {
        ...COMMON,
        id: 'proc_caffeine_pdph',
        title: 'Caffeine for Post-LP / Post-Dural-Puncture Headache',
        shortDescription: 'PO 200-300 mg single dose; IV caffeine sodium benzoate alternative (NICU only for citrate).',
        tags: ['pdph', 'post-dural puncture', 'lp headache', 'caffeine', 'sodium benzoate', 'epidural blood patch', 'in-line filter'],
        emergency: false,
        sections: [
            {
                heading: 'First-line',
                emphasis: 'info',
                body: 'Conservative measures: **bed rest, analgesics, oral hydration**. Epidural blood patch for severe headache or if conservative measures fail. Caffeine should be given **early in the day** to avoid sleep disruption.',
            },
            {
                heading: 'Oral caffeine (preferred)',
                emphasis: 'plain',
                body: '- **Most adolescents: 200-300 mg as a single dose**\n- 200 mg tablets stocked on the non-formulary shelf in main pharmacy',
            },
            {
                heading: 'Caffeine sodium benzoate IV (avoid in neonates — benzoate)',
                emphasis: 'warn',
                body: '- **Send with 0.22-micron in-line filter** for ALL lots (per American Reagent as of 2016)\n- **<40 kg**: 250 mg in 500 mL NS\n- **>40 kg**: 500 mg in 1000 mL NS\n- Initial dose: **8 mg/kg/dose (max 500 mg)** ×1 in **20 mL/kg NS (max 1000 mL)**\n- Repeat: 8 mg/kg/dose (max 500 mg) q6h, **max 2 doses per day**',
            },
            {
                heading: 'Caffeine citrate (NICU only)',
                emphasis: 'plain',
                body: '- IV caffeine citrate reserved primarily for NICU patients\n- For reference (CHOP/OSU protocol): initial 5 mg/kg (max 300 mg); repeat 7.5 mg/kg (max 500 mg) q6h, max 2 doses/day; each with 20 mL/kg NS bolus (max 1000 mL)',
            },
        ],
    },
    {
        ...COMMON,
        id: 'proc_pyeloplasty_psh',
        title: 'Laparoscopic Pyeloplasty PSH Pathway',
        shortDescription: 'Source PDF available — needs medical-review distillation.',
        tags: ['pyeloplasty', 'urology', 'psh', 'perioperative surgical home', 'laparoscopic'],
        emergency: false,
        sections: [
            {
                heading: 'Source available — needs medical review',
                emphasis: 'warn',
                body: 'The "PSH Urology Laparoscopic Pyeloplasty Pathway.2.pdf" extracted text but content is procedure-specific. Open the original under `original_pictures/Sharepoint/Acute & Regional Pain Medicine/Procedure-based Pain Protocols/` and structure into sections (pre-op meds, regional plan, intra-op fluid management, drain removal, discharge criteria).',
            },
        ],
    },
    {
        ...COMMON,
        id: 'proc_anticoag_regional',
        title: 'Anticoagulation + Regional (ASRA 2010)',
        shortDescription: 'Bedside timing table: agent → wait before placement → catheter removal interval → restart.',
        tags: ['asra', 'anticoagulation', 'regional', 'epidural', 'spinal', 'neuraxial', 'lovenox', 'enoxaparin', 'heparin', 'lmwh', 'ufh', 'warfarin', 'clopidogrel', 'plavix', 'antiplatelet', 'thrombolytic', 'fondaparinux', 'argatroban', 'bivalirudin', 'epidural hematoma'],
        emergency: false,
        sections: [
            {
                heading: 'Background + when to worry',
                emphasis: 'info',
                body: '- **Epidural hematoma**: rare but catastrophic. Risk ↑ with age, spinal cord/vertebral abnormalities, coagulopathy, difficult needle placement, indwelling catheter + anticoagulation\n- Estimated incidence: <1/150,000 epidural; <1/220,000 spinal — but recent series suggest as high as **1/3,000 in selected populations**\n- These intervals are based on the **ASRA Third Consensus Conference (2010)** — peripheral / plexus blocks: same rules apply (Grade 1C)',
            },
            {
                heading: 'ABSOLUTE — neuraxial NOT to be performed',
                emphasis: 'critical',
                body: '- **Thrombolytic therapy (recent or planned)**: avoid neuraxial; if neuraxial done first, avoid thrombolytic for **10 days** (Grade 1A)\n- **Thrombin inhibitors** (desirudin, lepirudin, **bivalirudin, argatroban**): do NOT perform neuraxial (Grade 2C)\n- **Fondaparinux**: avoid neuraxial (insufficient data)\n- LMWH dose given **2 hr pre-op** (peak anticoagulant activity): avoid neuraxial (Grade 1A)',
            },
            {
                heading: 'Unfractionated Heparin (UFH) — SC dosing',
                emphasis: 'warn',
                body: '- **5000 U BID SC**: NO contraindication to neuraxial. Risk ↓ by delaying heparin until after the block (Grade 1C)\n- **>10,000 U/day OR TID dosing**: safety NOT established — frequent neuro exam if neuraxial performed (Grade 2C)\n- Heparin **>4 days** (HIT risk): platelet count BEFORE neuraxial + before catheter removal',
            },
            {
                heading: 'UFH — IV intra-op (vascular surgery) combined with neuraxial',
                emphasis: 'warn',
                body: 'Acceptable **with all** of the following (Grade 1A):\n- Avoid in patients with other coagulopathies\n- **Heparin 1 hr AFTER needle placement**\n- **Catheter removal 2-4 hr after last heparin dose**; **re-heparin 1 hr after catheter removal**\n- Post-op neuro monitoring; avoid local anesthetic via catheter (mask motor block detection)\n- Bloody/difficult tap may ↑ risk but does NOT mandate cancellation — risk-benefit discussion with surgeon\n- **Cardiac surgery full anticoagulation + neuraxial**: insufficient data — avoid local anesthetic, monitor neuro (Grade 2C)',
            },
            {
                heading: 'LMWH — pre-op (BEFORE neuraxial)',
                emphasis: 'critical',
                body: '- **Prophylactic dose** (e.g. enoxaparin 30 mg BID or 40 mg daily): **wait ≥ 12 hr** after last dose before needle placement (Grade 1C)\n- **Therapeutic / higher dose** (enoxaparin 1 mg/kg q12h, 1.5 mg/kg daily; dalteparin 120 U/kg q12h or 200 U/kg daily; tinzaparin 175 U/kg daily): **wait ≥ 24 hr** (Grade 1C)\n- **Anti-Xa level NOT predictive** of bleeding — do NOT use to time block (Grade 1A)',
            },
            {
                heading: 'LMWH — post-op (AFTER neuraxial)',
                emphasis: 'critical',
                body: 'Patients OK for single-shot or catheter techniques. Management depends on dosing schedule (Grade 1C):\n\n**BID dosing** (↑ risk of spinal hematoma):\n- First post-op LMWH dose: **NO earlier than 24 hr post-op**\n- Indwelling catheter may be left overnight but **MUST be removed BEFORE LMWH initiation**\n- First dose of LMWH: **delay ≥ 2 hr after catheter removal**\n\n**Single-daily dosing**:\n- First post-op LMWH dose: **6-8 hr post-op**\n- 2nd dose: **NO sooner than 24 hr later**\n- Indwelling catheter may be safely maintained — **remove ≥ 10-12 hr after last LMWH dose**\n- Subsequent dose: **≥ 2 hr after catheter removal**\n\n**Either schedule**: avoid concomitant antiplatelets / UFH / dextran (Grade 1A)',
            },
            {
                heading: 'Warfarin',
                emphasis: 'warn',
                body: '- **Stop 4-5 days pre-op** + check INR before neuraxial block (Grade 1B)\n- Avoid concomitant aspirin/NSAIDs/ticlopidine/clopidogrel/UFH/LMWH (Grade 1A)\n- Initial pre-op warfarin dose given **>24 hr earlier** OR a 2nd dose given: **check INR** before block (Grade 2C)\n- **Catheter removal target: INR < 1.5** (correlates with clotting factor activity ≥ 40%); continue neuro testing × 24 hr after removal (Grade 2C)\n- **INR 1.5-3 with indwelling catheter**: caution removal, review for other anticoagulants not affecting INR (NSAIDs, clopidogrel, UFH, LMWH); continue neuro checks until INR stabilizes (Grade 1C/2C)\n- **INR > 3 with indwelling catheter**: hold or reduce warfarin (Grade 1A); no definitive recommendation for catheter removal at therapeutic levels',
            },
            {
                heading: 'Antiplatelets',
                emphasis: 'warn',
                body: '- **NSAIDs** (alone): NO added bleeding risk for neuraxial; no specific timing concerns for needle/catheter (Grade 1A). But **NSAIDs + oral anticoagulant / UFH / LMWH → avoid neuraxial** (Grade 2C). **COX-2 inhibitors** (minimal platelet effect) preferred if anti-inflammatory needed during anticoagulation\n- **Ticlopidine: hold 14 days** before neuraxial (Grade 1C)\n- **Clopidogrel (Plavix): hold 7 days** before neuraxial. If block needed at 5-7 days → document normalized platelet function (Grade 1C)\n- **GP IIb/IIIa inhibitors** (do NOT perform until platelet function recovered):\n  - **Abciximab (ReoPro)**: 24-48 hr\n  - **Eptifibatide (Integrilin) / Tirofiban (Aggrastat)**: 4-8 hr',
            },
            {
                heading: 'Patient on epidural catheter who unexpectedly received thrombolytic',
                emphasis: 'critical',
                body: '- No definitive recommendation on timing of removal\n- **Measure fibrinogen** (one of the last clotting factors to recover) to guide removal timing (Grade 2C)\n- Neuro checks q2h or less while catheter in place\n- Avoid local anesthetic infusion (allows motor block assessment)',
            },
            {
                heading: 'Herbal therapies + parturient + peripheral blocks',
                emphasis: 'plain',
                body: '- **Herbal drugs alone** (garlic, ginkgo, ginseng): NO mandatory discontinuation; no contraindication to regional (Grade 1C)\n- **Anticoagulated parturient**: insufficient data — apply ASRA guidelines as for other surgical patients (Grade 2C)\n- **Plexus / peripheral nerve blocks**: apply ASRA neuraxial guidelines (Grade 1C)',
            },
            {
                heading: 'Source',
                emphasis: 'info',
                body: 'Horlocker TT, et al. Regional Anesthesia in the Patient Receiving Antithrombotic or Thrombolytic Therapy. ASRA Third Edition. Reg Anesth Pain Med 2010;35:64-101.\n\n*Note: ASRA released a 4th edition (2018) and Anticoagulation in the Pain Patient guidelines (2019) — verify timing intervals against current ASRA guidance for high-stakes cases.*',
            },
        ],
    },
    {
        ...COMMON,
        id: 'proc_spinal_caudal_pointer',
        title: 'Spinal / Caudal Anesthesia Pearls',
        shortDescription: 'Source .docx + .pdf available — needs structured transcription.',
        tags: ['spinal anesthesia', 'caudal', 'awake spinal', 'neonatal spinal', 'pediatric regional'],
        emergency: false,
        sections: [
            {
                heading: 'Source available — needs medical review',
                emphasis: 'warn',
                body: 'Two sources cover spinal/caudal pearls:\n- `Spinal- caudal protocol.docx`\n- `Spinal Anesthesia Pearls.pdf`\n\nBoth under `original_pictures/Sharepoint/Acute & Regional Pain Medicine/Spinal Anesthesia/`. Distill into one entry covering: agent + dose by weight, expected duration, awake spinal for ex-premies, caudal volumes by spread target, complication watch.',
            },
        ],
    },
    {
        ...COMMON,
        id: 'proc_adjunct_infusions_pointer',
        title: 'Adjunct Infusion Protocols (Dexmed / Ketamine / Lidocaine)',
        shortDescription: 'NCH analgesia infusion protocols — sources available.',
        tags: ['dexmedetomidine infusion', 'ketamine infusion', 'lidocaine infusion', 'adjunct', 'opioid sparing'],
        emergency: false,
        sections: [
            {
                heading: 'Source available — needs structured transcription',
                emphasis: 'warn',
                body: 'Three NCH protocols under `original_pictures/Sharepoint/Acute & Regional Pain Medicine/Adjunct infusion protocols/`:\n- `Dexmedetomidine infusion for analgesia protocol NCH 9-2025 updates.pdf`\n- `ketamine of analgesia protocol NCH update Feb 2023 - final.pdf`\n- `Lidocaine for Pain Analgesia Protocol NCH update 8-2023.pdf`\n\nDose ranges already appear scattered through other protocol entries in this catalog (ERAS, sarcoma, spinal fusion). Consolidate into a dedicated single entry on next pass with: starting dose, titration steps, max dose/duration, monitoring requirements, contraindications.',
            },
        ],
    },
];
