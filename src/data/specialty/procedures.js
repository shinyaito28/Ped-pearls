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
        id: 'proc_anticoag_regional_pointer',
        title: 'Anticoagulation + Regional Summary (ASRA)',
        shortDescription: 'Source .docx available — needs structured transcription.',
        tags: ['asra', 'anticoagulation', 'regional', 'epidural', 'lovenox', 'enoxaparin', 'heparin', 'lmwh', 'antiplatelet'],
        emergency: false,
        sections: [
            {
                heading: 'Source available — needs medical review',
                emphasis: 'warn',
                body: 'The "Anticoagulation & Regional Summary.docx" under `original_pictures/Sharepoint/Acute & Regional Pain Medicine/ASRA & Regional Guidelines/` summarizes the ASRA timing intervals between anticoagulant doses and neuraxial/deep regional placement. Transcribe into a structured table (anticoagulant → minimum interval before placement → minimum interval after catheter removal) for bedside reference. Until then, refer to the ASRA pocket card or the source file directly.',
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
