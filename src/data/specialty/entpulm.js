// ENT / Pulm / OMFS hub — catalog entries.
// Source: NCH Sharepoint / ENT_Pulmonary /
//   - Anesthesia for orthognathic surgery_Jan 2023.docx
//   - DISE_Sleep Endo protocol 2022.docx
//   - Thyroid lobectomy TCU Nov 2022.pdf
//   - Mediastinal Mass Management Algorithm.docx (already as flowchart)
//   - Jet Vent Set Up.pdf + .pptx (extracted empty / binary placeholder)
//   - Guidelines for Trach Vented patients.doc (binary placeholder)
//   - Preop Screening Pts with OSA.pdf + Screening and polysom.pdf

const COMMON = {
    hub: 'entpulm',
    kind: 'catalog',
    weightAware: false,
    ageRules: null,
    source: 'NCH Sharepoint / ENT_Pulm_OMFS',
    lastReviewed: '2026-04',
};

export const entries = [
    {
        ...COMMON,
        id: 'entpulm_orthognathic',
        title: 'Orthognathic Surgery — Anesthesia Plan',
        shortDescription: 'Nasal RAE, controlled hypotension MAP 55-65, awake extubation with wire cutters at bedside.',
        tags: ['orthognathic', 'maxillofacial', 'omfs', 'nasal rae', 'controlled hypotension', 'imf', 'wire cutters', 'remimazolam'],
        emergency: false,
        sections: [
            {
                heading: 'Pre-op',
                emphasis: 'info',
                body: '- Urinary HCG; Hb/Hct; type and cross/screen per procedure (or in OR fridge based on anesthesiologist preference)\n- Standard premedication prn\n- **PONV ppx**: Aprepitant PO **1 mg/kg (max 40 mg)**; Scopolamine patch if ≥ 40 kg',
            },
            {
                heading: 'Induction + airway',
                emphasis: 'warn',
                body: '- Inhalation or IV induction\n- **LTA with lidocaine 4 mg/kg (max 100 mg)**\n- **Arterial line + 2 PIVs**\n- NMBA of choice (no neuromonitoring planned)\n- **Potential difficult airway** due to anatomy — consider video laryngoscopy\n- **Nasal RAE tube** (may be sewn in by surgeon)\n- **Afrin (oxymetazoline)** + standard techniques to prevent epistaxis during nasal intubation',
            },
            {
                heading: 'Positioning + setup',
                emphasis: 'plain',
                body: '- Supine, shoulder roll, arms tucked + padded\n- Bed turned 90-180° or moved caudally; HOB elevated 15-60° (discuss pre-op)\n- Eye protection per surgeon; Bair hugger; Foley + temp probe based on duration\n- Local: 0.25% bupivacaine with epi 1:200,000 by surgeon\n- Antibiotics per team (Cefazolin / Unasyn / Clindamycin)\n- **NG tube placed by surgeon** — suction stomach + remove at end to facilitate nasal breathing post-op\n- Acetaminophen 15 mg/kg (max 1000 mg) PO/IV at start, q6h after\n- BIS monitor',
            },
            {
                heading: 'Maintenance',
                emphasis: 'info',
                body: '- **FiO2 ≤ 0.3**\n- Inhalational in air/O2 OR TIVA propofol → **BIS 45-60**\n- Remifentanil ± **methadone 0.1 mg/kg (max 10 mg)** OR sufentanil infusion\n- Consider **Remimazolam infusion 5-10 mcg/kg/min**\n- Intermittent NMB or continuous infusion with TOF monitoring\n- **Dexamethasone 0.2 mg/kg (max 10 mg)** — repeat q6h while in OR\n- Ondansetron 0.15 mg/kg (max 4 mg)\n- Hydromorphone titrated to RR\n- TXA at surgical team\'s discretion (standard NCH dosing)',
            },
            {
                heading: 'Controlled hypotension (goal MAP 55-65)',
                emphasis: 'warn',
                body: '- **Clevidipine 1-5 mcg/kg/min** OR **labetolol 0.1-0.2 mg/kg q5-10 min** (intermittent)\n- Add **esmolol 25-200 mcg/kg/min** if needed',
            },
            {
                heading: 'Emergence + extubation',
                emphasis: 'critical',
                body: '- **Visualize removal of throat pack** prior to closure\n- Consider nasal trumpet contralateral to ETT\n- **Mouth may be wired in IMF or tightly banded** — **wire cutters at bedside at all times** if wired shut\n- Reverse with sugammadex\n- **Dexmedetomidine prior to extubation; additional dose post-extubation**\n- **Awake extubation in OR with surgeon present** — suction OP/NP during extubation; avoid agitation/movement\n- BP control during emergence: labetolol/esmolol/clevidipine\n- Lidocaine 1 mg/kg during emergence prn (mind total dose if LTA + surgical infiltration)\n- May leave **remifentanil 0.05 mcg/kg/min** during emergence + extubation\n- Pain team consult per surgeon recommendations',
            },
        ],
    },
    {
        ...COMMON,
        id: 'entpulm_dise',
        title: 'DISE — Drug-Induced Sleep Endoscopy',
        shortDescription: 'Dexmed + ketamine combo preserves respiration; avoid premed + topical lidocaine.',
        tags: ['dise', 'sleep endoscopy', 'osa', 'dexmedetomidine', 'ketamine', 'sevoflurane', 'no midazolam'],
        emergency: false,
        sections: [
            {
                heading: 'Patient selection',
                emphasis: 'info',
                body: '- Persistent OSA after initial therapy\n- OSA without adenotonsillar hypertrophy\n- OSA + craniofacial or neurodevelopmental abnormalities',
            },
            {
                heading: 'Pre-op + setup',
                emphasis: 'warn',
                body: '- **Avoid premedication** unless deemed necessary (midazolam may interfere with airway findings + REM)\n- Standard ASA monitors\n- **Neck in neutral position**\n- **No nasal topical decongestants or topical nasal lidocaine**',
            },
            {
                heading: 'Induction + sedation',
                emphasis: 'plain',
                body: '- Inhalation induction with sevoflurane in N2O + O2 for IV placement (alternatively N2O alone)\n- **Discontinue sevoflurane and N2O**\n- **Dexmedetomidine IV bolus 2 mcg/kg (max 60 mcg) over 5 min** (modify by age/comorbidity)\n- **Dexmedetomidine infusion 1-2 mcg/kg/hr**\n- **Ketamine IV bolus 1 mg/kg**, repeat incremental boluses prn (max 2 mg/kg if <50 kg or 100 mg if >50 kg)\n- ± **Propofol 0.5 mg/kg bolus** if inadequate sedation after above\n- **Oxygen via nasal cannula or blow-by**',
            },
            {
                heading: 'Why this combination',
                emphasis: 'info',
                body: '- Dexmed + ketamine combination provides adequate depth while preserving respiratory drive + upper airway muscle tone\n- Propofol monotherapy: rapid onset/recovery but respiratory compromise/desaturation at higher doses\n- Midazolam may eliminate REM sleep + cause upper airway obstruction (case-specific decision for premed)',
            },
        ],
    },
    {
        ...COMMON,
        id: 'entpulm_thyroid_lobectomy_pointer',
        title: 'Thyroid Lobectomy (TCU)',
        shortDescription: 'Source PDF available — needs medical-review distillation.',
        tags: ['thyroid', 'lobectomy', 'tcu', 'nerve monitoring'],
        emergency: false,
        sections: [
            {
                heading: 'Source available — needs medical review',
                emphasis: 'warn',
                body: 'The "Thyroid lobectomy TCU Nov 2022.pdf" extracted text but content is procedure-specific and benefits from clinical curation before exposure. Open the original under `original_pictures/Sharepoint/ENT_Pulmonary/ENT_Pulm_OMFS Intraoperative Protocol & Guidelines/` and structure into sections. Common themes: NIM ETT for recurrent laryngeal nerve monitoring (no NMB after intubation), positioning for neck access, TCU candidate criteria.',
            },
        ],
    },
    {
        ...COMMON,
        id: 'entpulm_jet_vent_pointer',
        title: 'Jet Ventilation Setup',
        shortDescription: 'Source PDF + PPTX did not auto-extract — needs manual transcription.',
        tags: ['jet ventilation', 'high frequency', 'laryngeal', 'manujet', 'subglottic'],
        emergency: false,
        sections: [
            {
                heading: 'Source not yet transcribed',
                emphasis: 'warn',
                body: 'The "Jet Vent Set Up.pdf" extracted empty (image-only) and the .pptx is a binary placeholder. Open the originals under `original_pictures/Sharepoint/ENT_Pulmonary/ENT_Pulm_OMFS Periop Considerations/` for the setup workflow (driving pressures by patient size, T-piece + Manujet handpiece, monitoring chest rise + saturations, barotrauma precautions).',
            },
        ],
    },
    {
        ...COMMON,
        id: 'entpulm_trach_vented_pointer',
        title: 'Trach-Vented Patients — Guidelines',
        shortDescription: 'Source is .doc — needs manual transcription.',
        tags: ['tracheostomy', 'trach', 'mechanical ventilation', 'tts', 'cuffed trach'],
        emergency: false,
        sections: [
            {
                heading: 'Source not yet transcribed',
                emphasis: 'warn',
                body: 'The "Guidelines for Trach Vented patients.doc" is in legacy .doc format. Open the original under `original_pictures/Sharepoint/ENT_Pulmonary/ENT_Pulm_OMFS Periop Considerations/` and transcribe key points (trach inventory, swap-to-circuit during transport, anchoring, cuffed vs uncuffed, suction setup, emergency tube replacement).',
            },
        ],
    },
    {
        ...COMMON,
        id: 'entpulm_osa_screening_pointer',
        title: 'Pre-op OSA Screening',
        shortDescription: 'Source PDFs available — see also OSA PAT Flowsheet (interactive).',
        tags: ['osa', 'preop screening', 'polysomnography', 'sleep disordered breathing', 'flowsheet'],
        emergency: false,
        related: ['flow_osa_pat'],
        sections: [
            {
                heading: 'Source available — interactive flowsheet shipped',
                emphasis: 'info',
                body: 'The interactive **OSA PAT Flowsheet** is shipped under the Pre-op hub. Two related source PDFs ("Preop Screening Pts with OSA.pdf" + "Screening and polysom to predict sleep disordered breathing.pdf") cover the screening rationale and the polysomnography evidence base — both are reference reading rather than bedside protocols.',
            },
        ],
    },
];
