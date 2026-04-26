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
        id: 'ortho_iom_amplitude_loss',
        title: 'Spine Surgery — Acute Loss of SSEP / MEP',
        shortDescription: 'MAP ≥ 90, FiO2 1.0, Hb ≥ 8-10, normocarbia. 15-min rule → wake-up test → spinal injury protocol.',
        tags: ['neuromonitoring', 'iom', 'ssep', 'mep', 'amplitude loss', 'spinal cord injury', 'wake up test', 'stagnara', 'spinal distraction', 'methylprednisolone', 'scpp'],
        emergency: true,
        sections: [
            {
                heading: 'Trigger + cause',
                emphasis: 'critical',
                body: 'Acute, complete loss of SSEPs or MEPs during **spinal distraction** = OR-team crisis.\n\nSpinal cord injury can occur from:\n- **Direct injury**\n- **Vascular injury related to implant**\n- **Vascular compromise NOT directly related to implant** (ischemia secondary to hypotension)\n\n→ Urgent need to **restore adequate perfusion to the spinal cord**.',
            },
            {
                heading: 'Step 1 — Raise MAP to ≥ 90 mmHg (↑ spinal cord perfusion pressure)',
                emphasis: 'critical',
                body: '- **Reduce anesthetic agent dose**\n- **↑ intravascular volume**: colloid, blood transfusion to ↑ Hct\n- **Vasoconstrictor**: phenylephrine\n- Goal: **Hb ≥ 8-10 g/dL**',
            },
            {
                heading: 'Step 2 — Optimize oxygenation + ventilation',
                emphasis: 'critical',
                body: '- **FiO2 → 100%**\n- **Normocarbia** (correct hypocapnia + hypercapnia)\n- ABG to confirm',
            },
            {
                heading: 'Step 3 — Temperature + surgeon evaluation',
                emphasis: 'warn',
                body: '- Assess temperature; **aggressively treat** if abnormal\n- **Surgeon evaluates field** for reversible intervention or other direct injury (in parallel with above)',
            },
            {
                heading: 'Step 4 — 15-minute rule',
                emphasis: 'critical',
                body: '**If MEPs/SSEPs are NOT restored over 15 minutes**:\n- **Reverse any recent surgical correction**\n- Anesthesiologist prepares patient for **Stagnara wake-up test** to confirm MEP/SSEP findings',
            },
            {
                heading: 'Step 5 — Spinal Injury Protocol (if wake-up confirms loss)',
                emphasis: 'critical',
                body: '- **Methylprednisolone 30 mg/kg loading dose IV over 60 minutes**\n- **Then infusion 5.4 mg/kg/hr × 23 hours**\n- MOA: ↓ inflammation + edema, membrane stabilizing, ↓ free-radical-induced lipid oxidation',
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
        id: 'ortho_semls_protocol',
        title: 'SEMLS — Single-Event Multilevel Surgery Pain Plan',
        shortDescription: 'CP / multilevel ortho: gabapentin start pre-op, epidural 3-7 d, scheduled APAP/ketorolac alternating, ileus prevention.',
        tags: ['semls', 'selms', 'single event multilevel', 'cerebral palsy', 'multilevel orthopedic', 'gabapentin', 'neurontin', 'epidural ortho', 'valium muscle spasm', 'methylnaltrexone', 'naloxone drip', 'ileus prevention', 'miralax', 'senna'],
        emergency: false,
        sections: [
            {
                heading: 'Day of surgery — pre-op',
                emphasis: 'info',
                body: '**Neurontin (gabapentin)** as a one-time pre-op dose:\n- **≥ 50 kg: 600 mg PO** (one-time)\n- **< 50 kg: 7.5 mg/kg PO** (one-time)',
            },
            {
                heading: 'Intra-op',
                emphasis: 'plain',
                body: '- First dose of **Toradol (ketorolac)**\n- First dose of **Valium (diazepam)**',
            },
            {
                heading: 'Post-op (immediate)',
                emphasis: 'warn',
                body: '- **Epidural**\n- **IV acetaminophen + ketorolac SCHEDULED, ALTERNATING dosing**\n- **Valium scheduled for first 24 hr → then PRN**\n- **Neurontin (continued)**:\n  - **≥ 50 kg**: 600 mg pre-op was given → **continue 300 mg TID while admitted, up to 5 days**\n  - **< 50 kg**: 7.5 mg/kg pre-op was given → **continue 5 mg/kg TID while admitted**\n- **Opioid IV PRN**\n- **Education**: discuss with family that **epidural anticipated 3-4 days minimum**; total hospital stay typically **5-7 days post-op**, then rest of post-op pain management plan',
            },
            {
                heading: 'POD #1',
                emphasis: 'plain',
                body: '- IV/PO acetaminophen + ketorolac scheduled alternating\n- Transition to **oral analgesics** (oxycodone OR Norco):\n  - **Hydrocodone/APAP 0.1-0.2 mg/kg** (5-10 mg max) **q4h PRN** for patients who can swallow pills\n  - **Hydrocodone/APAP elixir 0.1-0.2 mg/kg [10 mg max] q4h PRN** for patients who cannot swallow pills\n  - **Oxycodone 0.1 mg/kg**\n- **Consults**: massage therapy + hypnosis if appropriate; OT/PT; child life; psychology if recommended pre-op or as needed',
            },
            {
                heading: 'POD #2',
                emphasis: 'plain',
                body: 'Valium → **PRN if not already changed**',
            },
            {
                heading: 'POD #3-5',
                emphasis: 'plain',
                body: '- Make adjustments to PO dosing if necessary\n- **Primary service assumes pain management** when patient doing well + epidural removed\n- **Orthopedic team writes home-going medications**\n- **Valium script for home > 3 days**',
            },
            {
                heading: 'Post-op constipation / ileus prevention',
                emphasis: 'warn',
                body: '**When starting clears**:\n- **Miralax**: < 50 kg → **0.8 g/kg/day**; > 50 kg → **17 g/day**, OR\n- **Senna**: 6-12 yr → **8.6 mg BID** (max 17.2 mg BID); ≥ 12 yr → **8.6 mg BID** (max 34.4 mg BID)\n\n**Consider naloxone drip**: **0.25-1 mcg/kg/hr** (opioid-induced ileus mitigation while preserving analgesia)\n\n**If patient remains NPO + has deviated from protocol → methylnaltrexone**:\n- Administer **every other day, max once every 24 hr**\n- **< 38 kg**: 0.15 mg/kg (round dose up to nearest 0.1 mL)\n- **38 to < 62 kg**: 8 mg flat\n- **62-114 kg**: 12 mg flat\n- **> 114 kg**: 0.15 mg/kg (round dose up to nearest 0.1 mL)',
            },
            {
                heading: 'About SEMLS',
                emphasis: 'info',
                body: '**SEMLS (Single-Event Multilevel Surgery)** = a CP / pediatric orthopedic strategy of doing all needed musculoskeletal corrections in a single anesthetic to minimize repeat surgeries. Common procedures: bony osteotomies (femoral, tibial), tendon lengthenings/transfers, joint releases. Long ORs, large fluid shifts, postoperatively significant pain + spasm. *Note: NCH source title spells "SEMLS" (per the document) — file misnomer "SELMS" sometimes appears.*',
            },
        ],
    },
];
