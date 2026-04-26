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
        id: 'entpulm_thyroid_lobectomy_tcu',
        title: 'Thyroid Lobectomy — TCU Pathway',
        shortDescription: '≥11 yr, healthy, NIM ETT for RLN, deep extubation, Celebrex × 10 d, TCU min 4 hr.',
        tags: ['thyroid', 'lobectomy', 'tcu', 'transitional care unit', 'nim ett', 'recurrent laryngeal nerve', 'rln', 'celecoxib', 'deep extubation', 'eras'],
        emergency: false,
        sections: [
            {
                heading: 'Patient eligibility (PAT review)',
                emphasis: 'warn',
                body: '- Patient **≥ 11 years of age**\n- **Thyroid LOBECTOMY only** (NOT total thyroidectomy)\n- PAT review sent to Director (healthy, limited co-morbid conditions)',
            },
            {
                heading: 'Pre-op Celebrex prescribing (in surgery clinic)',
                emphasis: 'info',
                body: 'Patient given Celebrex Rx in clinic; advised to take **first dose evening before surgery, second dose early AM of surgery**:\n- **10-25 kg**: 50 mg BID\n- **25-40 kg**: 100 mg BID\n- **>40 kg**: 200 mg BID',
            },
            {
                heading: 'Day of surgery — pre-op meds',
                emphasis: 'plain',
                body: '- **No new or acute illness; no clinical findings of concern**\n- **PO midazolam** as needed: 0.3-0.5 mg/kg (max 15 mg)\n- **PO acetaminophen**: 10-15 mg/kg (max 1000 mg)\n- **PO celecoxib (Celebrex)** — same weight tier:\n  - 10-25 kg → 50 mg BID; 25-40 kg → 100 mg BID; >40 kg → 200 mg BID\n- **Transdermal scopolamine 1.5 mg patch** — placed **behind contralateral ear** from operative side\n- **Aprepitant (Emend) PO**: ≥ 40 kg → 40 mg; < 40 kg → 1 mg/kg',
            },
            {
                heading: 'Intra-op — induction + airway',
                emphasis: 'critical',
                body: '- Inhalation or IV induction\n- Consider **LTA with lidocaine 1 mg/kg** prior to intubation\n- **1-2 PIVs** (consider 2 if tucking arms or running opioid infusion)\n- **NIM ETT for recurrent laryngeal nerve (RLN) monitoring** — sized + provided by OR/monitoring team. ENT places monitoring leads in patients too small for NIM tube\n- **NO neuromuscular blockade/paralytics during RLN monitoring**\n- Consider **remifentanil or sufentanil infusion** to supplement inhaled anesthetic',
            },
            {
                heading: 'Intra-op — analgesia, PONV, local',
                emphasis: 'warn',
                body: '- **Analgesia** at anesthesia team\'s discretion:\n  - Fentanyl 1-3 mcg/kg, OR\n  - Morphine 0.05-0.1 mg/kg, OR\n  - Hydromorphone 0.005-0.01 mg/kg\n- **PONV ppx**:\n  - Dexamethasone **0.15 mg/kg (max 8 mg)**\n  - Ondansetron **0.15 mg/kg (max 4 mg)**\n  - Consider **TIVA for high PONV risk**\n- **Local infiltration at surgical site at maximal dose**: up to **2 mg/kg 0.5% bupivacaine (0.4 mL/kg) with epi 1:200,000**',
            },
            {
                heading: 'Emergence — deep extubation',
                emphasis: 'critical',
                body: '- **Emergence and DEEP tracheal extubation in the OR**\n- **AVOID coughing or bucking** during emergence + extubation (protects neck dissection field, ↓ hematoma risk)',
            },
            {
                heading: 'PACU + TCU disposition',
                emphasis: 'info',
                body: '- **PACU Phase 1: minimum 1 hour**\n- IVF at **0.5 × maintenance rate per weight**\n- **No prolonged O2 requirement or respiratory events** beyond extubation\n- Opioid rescue at anesthesiologist discretion; **notify surgery team if not satisfactory after 3 rescue doses**\n- Communication anesthesia ↔ attending surgeon for any discharge concerns\n- Anesthesia sign-out PACU → TCU\n- **TCU monitoring minimum 4 hours**, able to drink PO, pain controlled\n- Pain meds in SU; surgical team handles discharge instructions + evaluation; **surgeon of record responsible for TCU discharge home**',
            },
            {
                heading: 'Post-op (home)',
                emphasis: 'plain',
                body: '- **Celebrex 200 mg BID × 10 days**\n- **Acetaminophen 10 mg/kg q6h** — patient should receive APAP or Celebrex **at 3-hour intervals × 48 hr**\n- **Oxycodone 0.1 mg/kg (max 5 mg) q4h PRN severe pain** — **5 tablets prescribed** (limited supply)\n- Surgical clinic nurse phone follow-up POD #1\n- 1-month clinic visit with surgeon\n- Bring pain medication tracking form',
            },
        ],
    },
    {
        ...COMMON,
        id: 'entpulm_jet_vent',
        title: 'Jet Ventilation Setup',
        shortDescription: 'NCH source = photos only of equipment hookup. Operating parameters from general references.',
        tags: ['jet ventilation', 'high frequency', 'laryngeal', 'manujet', 'subglottic', 'supraglottic', 'shared airway'],
        emergency: false,
        sections: [
            {
                heading: 'Source caveat',
                emphasis: 'warn',
                body: 'The NCH "Jet Vent Set Up.pdf" + .pptx contain **photographs of equipment hookup ONLY** — no textual instructions for driving pressure, rate, or patient parameters. Photos show: yellow O2 high-pressure hose connecting from a wall outlet to a small jet-ventilator handpiece (likely Manujet III-style) at the anesthesia machine. **Operating parameters below are general pediatric jet ventilation references; verify against attending preference + ENT/Pulm protocol before each case.**',
            },
            {
                heading: 'Indications',
                emphasis: 'info',
                body: '- **Supraglottic / glottic surgery** with shared airway (microlaryngoscopy, vocal cord lesion, suspension laryngoscopy)\n- **Subglottic procedures** (LASER airway, dilation)\n- **CICO emergency**: transtracheal jet ventilation as a temporizing rescue (Pedi airway algorithm)\n- Bronchoscopy / rigid bronch with shared airway',
            },
            {
                heading: 'Equipment hookup (per NCH source photos)',
                emphasis: 'plain',
                body: '- **Yellow high-pressure O2 hose** from wall outlet (50 psi) to jet-ventilator handpiece\n- **Manujet handpiece** mounted at anesthesia machine — manual squeeze-trigger controls each insufflation\n- **Pressure gauge + pressure regulator** on handpiece allows set driving pressure adjustment\n- **Catheter/needle** (transtracheal or supraglottic) connects via Luer to handpiece outlet\n- Always verify O2 source pressure + circuit integrity before patient connection',
            },
            {
                heading: 'Suggested driving pressures (general pediatric ranges)',
                emphasis: 'warn',
                body: 'These are **textbook ranges**, NOT NCH-specific from the source — adjust to chest rise + SpO2:\n- **Neonate / infant**: 5-15 psi\n- **Small child (~1-5 yr)**: 10-25 psi\n- **Older child (~5-12 yr)**: 20-35 psi\n- **Adolescent / adult-size**: 30-50 psi\n- **Rate**: typically 12-20 breaths/min with manual jetting (let lungs deflate fully between insufflations)\n- Visual confirmation of **chest rise** is the primary tidal volume monitor — start LOW + titrate up',
            },
            {
                heading: 'Monitoring + complications',
                emphasis: 'critical',
                body: '- **Continuous SpO2** (no end-tidal CO2 from open jet)\n- **Visual chest rise** = tidal volume surrogate\n- **Barotrauma** is the major risk: if no chest fall between insufflations → **stop, reassess** (tube obstruction? air trapping? pneumothorax?)\n- **Watch for hypercarbia** — jet ventilation can underventilate even with adequate oxygenation\n- **Blood gas** if prolonged jet (>10-15 min)\n- Have **percutaneous needle/cricothyrotomy + standard bag-mask** immediately available as rescue',
            },
            {
                heading: 'Source files',
                emphasis: 'plain',
                body: 'NCH source under `original_pictures/Sharepoint/ENT_Pulmonary/ENT_Pulm_OMFS Periop Considerations/`:\n- `Jet Vent Set Up.pdf` (2 pages, photos only)\n- `Jet Vent Set Up.pptx` (2 slides, image-only)\n\nThe NCH photos are bedside reference for *which sockets/cables/handpiece* to use. Operating parameters above are **textbook supplements** — confirm with ENT, Pulm, or attending of the day.',
            },
        ],
    },
    {
        ...COMMON,
        id: 'entpulm_trach_vented',
        title: 'Trach-Vented Patient — PAT Workflow',
        shortDescription: 'Mandatory NCH Pulmonary consult at PAT; Pulm determines disposition; handoff in PACU.',
        tags: ['tracheostomy', 'trach', 'mechanical ventilation', 'pulmonology consult', 'pat review', 'home vent'],
        emergency: false,
        sections: [
            {
                heading: 'PAT review process',
                emphasis: 'warn',
                body: '- **Mandatory NCH Pulmonary consult** during PAT review — applies to **external patients too** (Pulm needs to be aware + comfortable placing orders)\n- Continue Pulm consult even if **patient is non-compliant** with home treatment modality — still obtain pulmonologist recommendations\n- **Pulmonologist determines disposition** (where the patient goes post-anesthesia)',
            },
            {
                heading: 'Day of surgery — handoff',
                emphasis: 'plain',
                body: 'After GA completion, handoff to pulmonologist in PACU at **x5-0221** (NCH internal).',
            },
            {
                heading: 'Status note',
                emphasis: 'info',
                body: '⚠ Per the source document: **this process is under review currently; expect changes** (note as of NCH source). Verify current workflow with Pulm or PAT director if discrepancy seen.',
            },
        ],
    },
    {
        ...COMMON,
        id: 'entpulm_osa_screening_evidence',
        title: 'OSA Screening — Evidence + SASM Recommendations',
        shortDescription: 'For NCH operational pathway: see OSA PAT Flowsheet. SASM 2016 reference key points below.',
        tags: ['osa', 'preop screening', 'polysomnography', 'sleep disordered breathing', 'sasm guideline', 'stop-bang', 'cpap', 'undiagnosed osa', 'periop osa'],
        emergency: false,
        related: ['flow_osa_pat'],
        sections: [
            {
                heading: 'For NCH bedside use → OSA PAT Flowsheet',
                emphasis: 'success',
                body: 'The **NCH OSA PAT Flowsheet** (interactive, in Pre-op hub) is the operational triage tool: age band + BMI + 6 OSA questions → live disposition (ASC OK / Earlier in day / Anesthesia review / Move to MOR). **Use that for actual case scheduling.**\n\nThis entry is the **evidence-and-guideline reference** — supports decisions when OSA PAT Flowsheet recommends "Anesthesia review" or there\'s a borderline case.',
            },
            {
                heading: 'OSA epidemiology + relevance',
                emphasis: 'info',
                body: '- **Prevalence in surgical patients**: 9-26% general; up to **70% in bariatric** patients\n- **Up to 90% of moderate-to-severe OSA remains undiagnosed**\n- **Most surgical patients with OSA arrive at the OR undiagnosed**\n- OSA severity (AHI) **may worsen post-op** → contributes to ↑ post-op complication risk',
            },
            {
                heading: 'Screening tools — STOP-Bang etc.',
                emphasis: 'plain',
                body: '- **STOP-Bang** (8 yes/no items: Snoring, Tired, Observed apnea, BP elevated, BMI >35, Age >50, Neck >40 cm, Gender male)\n  - Score ≥3 → high risk\n  - Score ≥5 → moderate-to-severe OSA likely\n- **Berlin questionnaire** + **ASA checklist** also validated\n- **No single screening tool has perfect sensitivity/specificity** — trade-off vs cost\n- **Higher threshold** in low-prevalence populations',
            },
            {
                heading: 'SASM 2016 — key recommendations',
                emphasis: 'warn',
                body: '- **Insufficient evidence to cancel/delay surgery for additional sleep testing** in patients identified as high-risk for OSA, **UNLESS** there is evidence of:\n  - **Hypoventilation**\n  - **Severe pulmonary hypertension**\n  - **Resting hypoxemia** without other diagnosed cardiopulmonary disease\n- Screen-positive patients with high threshold values **assumed to have moderate-to-severe OSA** in absence of polysomnography\n- **Primary care + surgeon should share responsibility** for early identification at initial surgical visit (gives more time for optimization)\n- Consider **adding pre-op serum bicarbonate** — improves predictive accuracy\n- Note exception: polysomnography IS standard pre-op for **bariatric, tonsillectomy, or upper-airway surgery for OSA**',
            },
            {
                heading: 'CPAP perioperative use — current evidence',
                emphasis: 'info',
                body: '- **<20% of OSA patients** receive CPAP in actual clinical practice\n- Studies (mostly low-to-moderate quality) suggest CPAP applied preoperatively + postoperatively **may reduce post-op complications**\n- Recent meta-analysis: **trend toward 0.4-day shorter LOS** with CPAP (P=.05)\n- Significant reduction in postoperative AHI when CPAP used\n- **If patient already on CPAP at home: continue intra-op (under sedation) + post-op when feasible**',
            },
            {
                heading: 'Source files',
                emphasis: 'plain',
                body: '- **SASM 2016 Guidelines** on Preop Screening + Assessment of Adult Patients with OSA (Anesth Analg 2016;123:452-73) — `Preop Screening Pts with OSA.pdf`\n- "Screening and polysomnography to predict sleep disordered breathing" — `Screening and polysom to predict sleep disordered breathing.pdf`\n\nBoth under `original_pictures/Sharepoint/ENT_Pulmonary/ENT_Pulm_OMFS Periop Considerations/`. **Adult guidelines** — pediatric extrapolation per attending judgement (the OSA PAT Flowsheet uses NCH peds-specific age/BMI cutoffs).',
            },
        ],
    },
];
