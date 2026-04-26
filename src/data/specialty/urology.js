// Urology hub — catalog entries.
// Source: NCH Sharepoint / Urology / Urology Intraoperative Protocols & Guidelines /
//   - Anesthesia Protocol for Bladder Extrophy_ Kelly Procedure 2026.pdf
//   - Anesthesia for robotic cases.doc (legacy .doc, converted via Word COM)
//   - Fluorescent imaging for the da Vinci.docx (NCH internal note)
//   - Guide for Fluorescence Indocyanine Green - da Vinci.pdf (Intuitive Surgical official guide)
//   - PSH Urology Laparoscopic Pyeloplasty Pathway (already in Procedures hub)

const COMMON = {
    hub: 'urology',
    kind: 'catalog',
    weightAware: false,
    ageRules: null,
    source: 'NCH Sharepoint / Urology Intraoperative Protocols',
    lastReviewed: '2026-04',
};

export const entries = [
    {
        ...COMMON,
        id: 'uro_bladder_exstrophy_kelly',
        title: 'Bladder Exstrophy + Kelly Procedure — Pain Plan',
        shortDescription: 'Epidural × 5 days (pubic symphysis sutured); 7-8 d admit; NO NSAIDs if CKD/single kidney/high VUR.',
        tags: ['bladder exstrophy', 'kelly procedure', 'cuckow', 'soft tissue reconstruction bladder neck', 'epidural urology', 'pubic symphysis', 'oxybutynin', 'urethral drains', 'suprapubic catheter', 'ureteral reimplantation'],
        emergency: false,
        sections: [
            {
                heading: 'Stay overview',
                emphasis: 'info',
                body: '- **7-8 day admission** (risk for wound dehiscence + bladder spasms)\n- **Epidural indwelling up to 5 day goal** (pubic symphysis is sutured)\n- Diet advanced as tolerated unless bowel surgically touched\n- **NO NSAIDs** if **CKD / single kidney / high-grade VUR**\n- Expectation: PRN-only pain meds by discharge',
            },
            {
                heading: 'Drain anatomy by procedure',
                emphasis: 'plain',
                body: '- **Bladder Exstrophy patients**: bilateral urethral drains + urethral catheter\n- **Kelly Procedure patients**: suprapubic catheter + bilateral urethral drains + Foley catheter\n\n**Kelly procedure** = soft-tissue reconstruction of bladder neck. Existing muscle + soft tissue used to create a sphincter ring. **Ureteral re-implantation** also occurs.',
            },
            {
                heading: 'Intra-op',
                emphasis: 'warn',
                body: '- Pre-op huddle: **surgeon + Pediatric Anesthesia attending + Pain Service attending** decide regional plan (epidural)\n- **Epidural choices**: Chloroprocaine 1.5% / Ropivacaine 0.1% / Ropivacaine 0.2% ± Clonidine\n- If not an epidural candidate: **NCA / PCA / CCA**\n- **IV acetaminophen 15 mg/kg (max 1 g)** at start of case\n- **IV diazepam 0.1 mg/kg (max 4 mg)** at end of case (bladder spasm preempt)\n- **Ketorolac 0.5 mg/kg (max 30 mg)** at end of case — **CONTRAINDICATED if CKD / single kidney / high-grade VUR / elevated BUN-Cr**',
            },
            {
                heading: 'PACU + POD #0',
                emphasis: 'plain',
                body: '- Continue epidural and/or pain pump\n- If epidural inadequate dermatome OR osteotomies done: **PCA/NCA/CCA with consideration for basal**\n- **Scheduled IV diazepam 0.5 mg/kg q6h (max 4 mg/dose) × min 24-48 hr** (bladder spasm)\n- **Scheduled IV APAP q6h alternating with ketorolac**\n- **Scheduled ketorolac 0.5 mg/kg q6h** (alternating with APAP)\n- IV opioid PRN\n- **Consults**: Child Life, Massage, Therapeutic Recreation, Music Therapy, Art Therapy\n- **Oxybutynin per Urology**',
            },
            {
                heading: 'POD #1',
                emphasis: 'plain',
                body: '- Continue epidural ± pain pump\n- Continue scheduled diazepam IV\n- Continue scheduled APAP + ketorolac (consider PO)\n- Add **oxycodone if tolerating PO**:\n  - **<50 kg**: 0.1 mg/kg/dose q4h PRN\n  - **>50 kg**: 5 mg up to 10 mg q4h PRN\n- IV opioid PRN unless pain pump active\n- Continue therapies + Oxybutynin',
            },
            {
                heading: 'POD #2-5',
                emphasis: 'plain',
                body: '- Continue epidural ± pain pump\n- Assess when basal can be DC\'d\n- **Plan: epidural OFF on POD #5** (may DC POD #4 if eating well + no pain issues)\n- Diazepam: consider PO; assess transition to PRN\n- APAP + ketorolac: consider PO\n- **Oxycodone**: assess transition from scheduled → PRN\n- IV opioid PRN unless pain pump active',
            },
            {
                heading: 'Bladder spasm management (consult Urology)',
                emphasis: 'warn',
                body: 'If frequent bladder spasms → discuss with Urology team for **adding Ditropan**:\n- **Oxybutynin PO**: 0.2 mg/kg TID (or PRN)\n- **Oxybutynin Patch**: NOT for **<4 yr or <19 kg** (per pharmacy)',
            },
        ],
    },
    {
        ...COMMON,
        id: 'uro_robotic_cases',
        title: 'Robotic Surgery — General Anesthesia Guidelines',
        shortDescription: 'Multimodal: GETA + remifentanil infusion + cisatracurium/roc/vec; PCV-VG; ICG-aware.',
        tags: ['robotic surgery', 'da vinci', 'pcv-vg', 'cisatracurium robotic', 'rocuronium', 'remifentanil infusion', 'bis monitor', 'pneumoperitoneum'],
        emergency: false,
        related: ['uro_icg_fluorescent_imaging'],
        sections: [
            {
                heading: 'Induction',
                emphasis: 'info',
                body: '- **Mask induction with sevoflurane** OR IV induction with **propofol**\n- **NMB**: cisatracurium / vecuronium / rocuronium with **TOF monitoring** (if positioning allows); redose as needed (no patient movement on robotic ports)\n- **BIS monitor** after induction',
            },
            {
                heading: 'Maintenance',
                emphasis: 'plain',
                body: '- **Fentanyl 2-4 mcg/kg** prior to incision\n- **Remifentanil infusion 0.05-0.3 mcg/kg/min** for hemodynamic stability\n- **Dexamethasone 0.25 mg/kg (max 20 mg)** after induction; repeat at end if case > 6 hr\n- **Desflurane or sevoflurane** to maintain **BIS 40-60**\n- **PCV-VG (pressure-controlled ventilation, volume-guaranteed)** on Avance machine — accommodates pneumoperitoneum compliance changes',
            },
            {
                heading: 'End of case',
                emphasis: 'plain',
                body: '- **Ketorolac 0.5 mg/kg** and/or **acetaminophen 10-15 mg/kg** after surgical manipulation complete (discuss ketorolac with surgeon)\n- DC remifentanil when procedure complete\n- Titrate **hydromorphone or morphine** for post-op analgesia\n- **Local anesthesia at port sites** by surgeon\n- Reverse NMB + extubate as clinically indicated',
            },
        ],
    },
    {
        ...COMMON,
        id: 'uro_icg_fluorescent_imaging',
        title: 'ICG Fluorescent Imaging (da Vinci) — Anesthesia Protocol',
        shortDescription: 'Iodinated; 2 mg/kg/day max; rapid IV bolus 0.5-1.5 mL of 2.5 mg/mL via 2-stopcock + flush technique.',
        tags: ['icg', 'indocyanine green', 'fluorescent imaging', 'da vinci', 'pulse ox transient drop', 'iodine allergy', 'firefly', 'robotic vasculature'],
        emergency: false,
        related: ['uro_robotic_cases'],
        sections: [
            {
                heading: 'What ICG is',
                emphasis: 'info',
                body: '- **Indocyanine Green (ICG)**: water-soluble dye for vasculature visualization in robotic surgery\n- Packaged: **25 mg jar of green powder** + 10 mL sterile water vial\n- **After reconstitution**: 10 mL vial = **2.5 mg/mL solution**\n- **Half-life**: 2-5 min when bound to plasma proteins\n- **Use within 6 hours** of reconstitution',
            },
            {
                heading: 'Critical safety',
                emphasis: 'critical',
                body: '- **ICG contains sodium iodide** — use with caution in patients with **iodine / iodinated contrast allergy**\n- Hospital protocol for known allergy pre-treatment may apply\n- **ICG injection causes BRIEF transient drop in pulse ox readings** immediately after administration — anticipate, do not panic; SpO2 returns to baseline as dye distributes\n- Similar transient effect as methylene blue',
            },
            {
                heading: 'Dosing',
                emphasis: 'warn',
                body: '- **Typical dose**: **0.5-1.5 mL** of 2.5 mg/mL concentration per IV injection (1.25-3.75 mg per dose)\n- Communicate with surgeon for desired dose\n- **Maximum daily dose: 2 mg/kg body weight** — do NOT exceed\n- **Minimum 2-5 minutes between injections**',
            },
            {
                heading: 'Preparation',
                emphasis: 'plain',
                body: '1. Reconstitute ICG with the 10 mL aqueous solution → **2.5 mg/mL**\n2. Withdraw the desired dose into a separate **3 mL syringe** for each planned imaging sequence\n3. Withdraw **10-12 mL normal saline** for each planned sequence into separate 12 mL syringes (flush)',
            },
            {
                heading: 'Administration — peripheral IV technique',
                emphasis: 'critical',
                body: '**For optimum fluorescence imaging, each dose must be a RAPID BOLUS.**\n\n- Inject through **central line** OR peripheral IV **close to IV cannula**\n\n**Two-stopcock peripheral IV technique**:\n1. Connect **2 three-way stopcocks end-to-end** as close as possible to the IV cannula\n2. Connect ICG injection syringe to the **proximal stopcock** (closest to IV)\n3. Connect 12 mL saline flush to the **distal stopcock**\n4. When surgeon calls for injection: **open proximal stopcock + deliver ICG into the line** (do NOT yet enter bloodstream — saline flush stopcock should be turned OFF on incoming IV fluid line)\n5. After ICG delivered: **close proximal stopcock + immediately inject saline flush from distal stopcock** → delivers ICG as rapid bolus into bloodstream\n\nReady next syringe set immediately for next injection (wait 2-5 min from first injection).',
            },
            {
                heading: 'Source',
                emphasis: 'plain',
                body: '- NCH internal "Fluorescent imaging for the da Vinci.docx"\n- **Intuitive Surgical "Anesthesia Quick Reference Guide for Fluorescence Imaging"** (PN 552001-02 Rev A; Customer Service US 1-800-876-1310)',
            },
        ],
    },
    {
        ...COMMON,
        id: 'uro_pyeloplasty_crossref',
        title: 'Laparoscopic Pyeloplasty PSH Pathway (cross-link)',
        shortDescription: 'See Procedures hub: caudal + multimodal IV + Valium PRN spasm.',
        tags: ['pyeloplasty', 'urology', 'psh', 'laparoscopic'],
        emergency: false,
        related: ['proc_pyeloplasty_psh'],
        sections: [
            {
                heading: 'Cross-link',
                emphasis: 'info',
                body: 'The Laparoscopic Pyeloplasty PSH pathway is in the **Procedures hub** (`proc_pyeloplasty_psh`). Same NCH source. Caudal + multimodal IV approach with Valium PRN for ureteral / bladder spasm.',
            },
        ],
    },
];
