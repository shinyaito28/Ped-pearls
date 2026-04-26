// Orthopedics hub — catalog entries.
// Source: NCH Sharepoint / Othopedics (sic — folder name typo) /
//   - Spinal fusion protocol 11-2020.docx
//   - Long Bone Fractures_Valium March 2026.pdf
//   - Hemipelvectomy Protocol_June 2024.pdf
//   - Limb Salvage Protocol_June 2024.pdf
//   - Iobst / Regional Anesthesia for Limb Lengthening
//   - SELMS Patients Dr Whitaker.pdf
//   - Spinal Fusion_Remimazolam adjunct (.doc placeholder)
//   - Spine surgery amplitude loss management (.doc placeholder)

const COMMON = {
    hub: 'ortho',
    kind: 'catalog',
    weightAware: false,
    ageRules: null,
    source: 'NCH Sharepoint / Orthopedics',
    lastReviewed: '2026-04',
};

export const entries = [
    {
        ...COMMON,
        id: 'ortho_spinal_fusion_pain',
        title: 'Spinal Fusion — Multimodal Pain Protocol',
        shortDescription: 'Idiopathic fusion / growing rod / VEPTR / MAGEC: gabapentin + methadone + opioid infusion.',
        tags: ['spinal fusion', 'scoliosis', 'veptr', 'magec', 'gabapentin', 'methadone', 'sufentanil', 'remifentanil', 'clevidipine', 'pca', 'naloxone'],
        emergency: false,
        sections: [
            {
                heading: 'Population',
                emphasis: 'info',
                body: 'Idiopathic spinal fusion, growing rod insertion, VEPTR insertion, MAGEC rod insertion.',
            },
            {
                heading: 'Pre-op',
                emphasis: 'plain',
                body: '- Baseline BUN/creatinine + Hb prior to day of surgery',
            },
            {
                heading: 'Day of surgery (premedication)',
                emphasis: 'info',
                body: '- **Gabapentin**: ≥50 kg → 600 mg PO; <50 kg → 7.5 mg/kg\n- **Aprepitant** (PONV): ≥40 kg → 40 mg PO; <40 kg → 1 mg/kg PO (capsule or liquid suspension)',
            },
            {
                heading: 'Intra-op',
                emphasis: 'warn',
                body: '- Desflurane titrated to **BIS 50-60**; intermittent midazolam prn\n- **Methadone 0.15 mg/kg after induction**\n- Opioid infusion: **sufentanil 0.1-0.5 mcg/kg/hr** OR **remifentanil 0.1-0.5 mcg/kg/min** to keep MAP **55-65 mmHg** per surgeon\n- Clevidipine 1-5 mcg/kg/min if MAP exceeds range at max opioid\n- Adjuncts (attending discretion):\n  - Esmolol 10-25 mcg/kg/min\n  - Lidocaine 1 mg/kg load → 1 mg/kg/hr\n  - Ketamine 0.25 mg/kg/hr\n- PONV: **Ondansetron 0.15 mg/kg (max 4 mg) + Dexamethasone 0.15 mg/kg (max 4 mg)**\n- **Dexmedetomidine 0.3-0.5 mcg/kg bolus** after extubation\n- Discuss with surgeon: IV acetaminophen 15 mg/kg (max 1 g) at end of case; IV ketorolac 0.5 mg/kg (max 30 mg) at end',
            },
            {
                heading: 'PACU / POD #0',
                emphasis: 'plain',
                body: '- **Gabapentin** until discharge: ≥50 kg → 300 mg TID; <50 kg → 5 mg/kg TID. Complex PMH → discuss with Pain Service Attending\n- **Demand-only hydromorphone PCA** (3-5 mcg/kg/dose, lockout 10-12 min)\n- **Naloxone infusion 0.25 mcg/kg/hr** (concurrent with PCA)\n- Scheduled **IV ketorolac** 0.5 mg/kg (max 15 mg) q6h ×8 doses (alternating with IV acetaminophen; up to 30 mg if needed POD#1-2). Then transition to oral ibuprofen 10 mg/kg ×8 doses\n- Scheduled **IV acetaminophen** 15 mg/kg (max 1000 mg) q6h ×8 doses, then transition to oral\n- Diazepam if needed: 0.05 mg/kg or ≥40 kg → 2 mg q6h IV/PRN if not tolerating PO',
            },
            {
                heading: 'POD #1',
                emphasis: 'plain',
                body: '- Aprepitant prn for PONV: ≥40 kg → 20 mg PO; <40 kg → 0.5 mg/kg PO\n- CAM therapies (ordered by primary service): massage, hypnosis/guided imagery, gum-chewing, aromatherapy\n- PT/TR consults (Ortho service)\n- **Scheduled oxycodone (0.1 mg/kg max 5 mg) PO q4h** starting AM (adjust by opioid requirement)\n- Continue PCA at current dose/lockout',
            },
            {
                heading: 'POD #2',
                emphasis: 'success',
                body: '- DC PCA infusion in AM\n- Start **PRN IV opioid q2h**\n- Continue scheduled oxycodone, acetaminophen, ketorolac/ibuprofen\n- Ortho manages bowel regimen\n- Pain service signs off PM POD #2 if doing well — manages nausea until then\n- Ortho orders BUN/creatinine post-op if UOP concern starting POD #3\n- **Gabapentin DC at discharge**',
            },
        ],
    },
    {
        ...COMMON,
        id: 'ortho_long_bone_valium',
        title: 'Long Bone Fractures — Valium Protocol',
        shortDescription: 'Femur/tibia shaft fractures (incl. trauma): pre-induction + scheduled diazepam.',
        tags: ['long bone', 'femur', 'tibia', 'fracture', 'diazepam', 'valium', 'muscle spasm', 'trauma'],
        emergency: false,
        sections: [
            {
                heading: 'Population',
                emphasis: 'info',
                body: 'All patients with **femur and tibia shaft fractures** (including trauma cases).',
            },
            {
                heading: 'Pre-op / pre-induction (anesthesia)',
                emphasis: 'warn',
                body: '**Diazepam (Valium) 0.05 mg/kg IV (max 5 mg)** — given preoperatively or immediately prior to induction. Ordered + administered by anesthesia.',
            },
            {
                heading: 'Post-op (Ortho resident / APP)',
                emphasis: 'plain',
                body: '- Scheduled: **Diazepam 0.05 mg/kg IV (max 5 mg) q8h ×3 doses**\n- After scheduled doses: **Diazepam 0.05 mg/kg (max 5 mg) IV PRN** for muscle spasm or pain',
            },
        ],
    },
    {
        ...COMMON,
        id: 'ortho_hemipelvectomy_limb_salvage',
        title: 'Hemipelvectomy / Limb Salvage — Sarcoma Pain Protocol',
        shortDescription: 'Pre-op gabapentin × 7 d → ketamine + methadone + epidural intra-op → multimodal post-op.',
        tags: ['hemipelvectomy', 'limb salvage', 'amputation', 'sarcoma', 'gabapentin', 'methadone', 'ketamine infusion', 'celecoxib', 'epidural'],
        emergency: false,
        sections: [
            {
                heading: 'Pre-op (7 days prior to surgery)',
                emphasis: 'info',
                body: '- Sarcoma team coordination: patients seen during last chemo admission pre-op\n- Pain Team supplies gabapentin initiation schedule before last clinic day\n- **Gabapentin starts 7 days pre-op**:\n  - **<50 kg**: 5 mg/kg TID\n  - **≥50 kg**: 300 mg TID\n  - Continue + titrate as needed',
            },
            {
                heading: 'Day of surgery',
                emphasis: 'plain',
                body: '- **Continue gabapentin**:\n  - ≤50 kg → 6 mg/kg (round up to closest capsule if not liquid)\n  - ≥50 kg → 400 mg flat\n- Likely escalate post-op based on symptoms',
            },
            {
                heading: 'Intra-op',
                emphasis: 'warn',
                body: '- **Epidural candidacy** decided by surgeon + anesthesiologist + pain attending pre-op (CI: compartment syndrome concern, coagulopathy, low platelets, anatomy)\n- **Ketamine infusion 0.1-0.2 mg/kg/hr**\n- **IV methadone 0.1 mg/kg (max 10 mg) after induction**\n- **IV diazepam 0.1 mg/kg (max 4 mg/dose) ×1** at end of case\n- IV acetaminophen 15 mg/kg (max 1 g) at end of case\n- **NO NSAIDs**',
            },
            {
                heading: 'PACU / POD #0',
                emphasis: 'plain',
                body: '- Continue epidural\n- Start morphine or hydromorphone NCA/CCA/PCA\n- Continue ketamine 0.1 mg/kg/hr (max 10 mg/hr) — Pain APRN reorders as Pain Pump\n- Add **IV methadone 0.05 mg/kg or PO methadone 0.1 mg/kg/dose (max 5 mg) q8h** from OR dose time\n- Add diazepam IV/PO or another muscle relaxant (flexeril, zanaflex) scheduled ×48 hr min\n- Schedule IV/PO acetaminophen\n- Add **Celecoxib (Celebrex)**:\n  - 10-25 kg: **50 mg BID**\n  - >25-30 kg: **100 mg BID**\n  - >30 kg: **200 mg BID**\n  - Liquid concentration: 10 mg/mL\n- Continue gabapentin pre-op dose\n- Consult psychology, child life, TR, PT, massage, consider acupuncture',
            },
            {
                heading: 'POD #1 → Discharge',
                emphasis: 'success',
                body: '- Continue epidural + pain pump (titrate epidural to "functional" pain for PT)\n- Continue ketamine (recommend 3 days; max 7)\n- Continue methadone — switch to PO when tolerating diet (IV ratio 50-70% of PO; max 5 mg unless chronic opioid → 7.5 mg)\n- Continue diazepam (consider PO route)\n- Continue acetaminophen + gabapentin + celecoxib + therapies\n- POD #2-6: assess epidural removal readiness\n- Wean PCA: add IV opioid PRN for severe pain only; start oxycodone PRN (<50 kg → 0.1 mg/kg q4h; ≥50 kg → 5-7.5 mg q4h)\n- Consider **clonidine PO 0.1 mg QHS** if pain not controlled + difficulty sleeping\n- **Discharge home on gabapentin TID ×6-8 wk** before weaning; methadone wean plan; PRN oral opioid + Valium prn or alternate muscle relaxant\n- Sarcoma team consults Pain Team during chemo admissions to maintain/escalate/de-escalate gabapentin + adjuncts\n- After 6 wk post-op: consider weaning gabapentin (wean opioid first if still on it)',
            },
        ],
    },
    {
        ...COMMON,
        id: 'ortho_remimazolam_adjunct_pointer',
        title: 'Spinal Fusion + Remimazolam Adjunct (July 2025)',
        shortDescription: 'Source is .doc — needs manual transcription. Note remimazolam is the new sedative.',
        tags: ['spinal fusion', 'remimazolam', 'byfavo', 'adjunct', 'sedation'],
        emergency: false,
        related: ['ortho_spinal_fusion_pain'],
        sections: [
            {
                heading: 'Source not yet transcribed',
                emphasis: 'warn',
                body: 'The "Spinal Fusion_Remimazolam adjunct protocol_July 2025.doc" is in legacy .doc format and did not auto-extract. Open the original under `original_pictures/Sharepoint/Othopedics/Orthopedics Intraoperative Protocols & Guidelines/` and transcribe the remimazolam dosing + monitoring schema here. Remimazolam (Byfavo) is a short-acting benzodiazepine reversible with flumazenil — likely positioned as a midazolam alternative for the BIS 50-60 maintenance phase.',
            },
        ],
    },
    {
        ...COMMON,
        id: 'ortho_iom_amplitude_loss_pointer',
        title: 'Spine Surgery — Management of IOM Amplitude Loss',
        shortDescription: 'Source is .doc — needs manual transcription. Critical intraop emergency response.',
        tags: ['neuromonitoring', 'iom', 'ssep', 'mep', 'amplitude loss', 'spine cord injury', 'wake up test'],
        emergency: true,
        sections: [
            {
                heading: 'Source not yet transcribed',
                emphasis: 'warn',
                body: 'The "Anesthetic management with amplitude loss during spine surgery vtr.doc" is in legacy .doc format and did not auto-extract. Open the original under `original_pictures/Sharepoint/Othopedics/Orthopedics Intraoperative Protocols & Guidelines/`.\n\nGeneral principles to verify against source: rule out anesthetic causes first (deepening, NMBA, hypotension below MAP target), optimize hemodynamics (raise MAP, transfuse if anemic), notify surgeon (may pause and reverse instrumentation), consider Stagnara wake-up test.',
            },
        ],
    },
    {
        ...COMMON,
        id: 'ortho_limb_lengthening_regional',
        title: 'Limb Lengthening — Regional Anesthesia (Iobst Protocol)',
        shortDescription: 'Catheter-based regional for limb lengthening procedures (.docx — needs richer transcription).',
        tags: ['limb lengthening', 'iobst', 'regional anesthesia', 'catheter', 'continuous block', 'distractor'],
        emergency: false,
        sections: [
            {
                heading: 'Source available — needs richer transcription',
                emphasis: 'warn',
                body: 'Two source files cover this:\n- `Iobst Patient Protocol for Regional Anesthesia for Limb Lengthening Procedures 01_11_23.docx`\n- `Regional Anesthesia Protocol for limb lengthening procedures.docx`\n\nBoth extracted to `scratch/sharepoint_drafts/Othopedics/Orthopedics Intraoperative Protocols & Guidelines/`. Common themes (verify against source): perineural catheter placement (often femoral + sciatic), dilute local anesthetic infusion, multi-day pain coverage during distraction, catheter checklist coordination with the existing Catheter card, escalation if breakthrough pain.',
            },
        ],
    },
    {
        ...COMMON,
        id: 'ortho_selms_pointer',
        title: 'SELMS Patient Protocol (Dr Whitaker)',
        shortDescription: 'PDF extracted but content needs medical review for distillation.',
        tags: ['selms', 'spinal', 'whitaker'],
        emergency: false,
        sections: [
            {
                heading: 'Source available — needs medical review',
                emphasis: 'warn',
                body: 'The "SELMS Patients Dr Whitaker.pdf" extracted text but content is procedure-specific and benefits from clinical curation before exposure here. Open the original under `original_pictures/Sharepoint/Othopedics/Orthopedics Intraoperative Protocols & Guidelines/` and structure the protocol into sections.',
            },
        ],
    },
];
