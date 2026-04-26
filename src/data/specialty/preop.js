// Pre-op / PAT hub — catalog entries.
// Source: NCH Sharepoint / PAT_Pre-Op /
//   - Viral Illness Guidelines.docx
//   - Guidelines for Post-operative Monitoring of Young Infants/Premature.pdf (Sept 2025)
//   - Guidelines for Urine pregnancy tests1.docx
//   - Approval for admission of Adult Pt.pdf + NCH criteria for patients over age 21.docx
//   - Preoperative Medications/Antiepileptic Drug Administration Alternatives.pdf
//   - Preoperative Medications/Drugs that SHOULD be given on AM of surgery_Jan 25 2024.pdf
//   - Preoperative Medications/Emend (Aprepitant) Periop Guidelines.docx + .pdf
//   - DM and weight loss medications March 2025.pdf (also in Endocrine hub)

const COMMON = {
    hub: 'preop',
    kind: 'catalog',
    weightAware: false,
    ageRules: null,
    source: 'NCH Sharepoint / PAT_Pre-Op',
    lastReviewed: '2026-04',
};

export const entries = [
    {
        ...COMMON,
        id: 'preop_viral_illness',
        title: 'Viral Illness Cancellation Guidelines',
        shortDescription: 'URI/RSV/croup: 2 wk delay (4 wk if warranted). Pneumonia 4-6 wk. Asthma exacerbation 1-2 wk.',
        tags: ['viral illness', 'uri', 'rsv', 'croup', 'pneumonia', 'asthma exacerbation', 'cancellation', 'delay'],
        emergency: false,
        sections: [
            {
                heading: 'Delay timeline',
                emphasis: 'warn',
                body: '- **Viral illness** (incl. croup, RSV, URI): **2 weeks** from illness recovery. Stretch to **4 weeks** if warranted.\n- **Documented pneumonia**: **4-6 weeks** after\n- **Asthma exacerbation requiring pulse steroids**: **1-2 weeks** delay\n- Steroid use for croup is in/out of favor (per attending preference)',
            },
        ],
    },
    {
        ...COMMON,
        id: 'preop_infant_postop_monitoring',
        title: 'Post-op Monitoring — Premies + Young Infants',
        shortDescription: 'PGA <44 wk (term) or <60 wk (premie): 8 hr observation; admit if any risk factor.',
        tags: ['premature', 'premies', 'pga', 'post-anesthesia apnea', 'apnea', 'bradycardia', 'observation', 'cardiorespiratory monitor'],
        emergency: false,
        sections: [
            {
                heading: 'Background',
                emphasis: 'info',
                body: '- Young infants at increased risk of post-anesthesia apnea + bradycardia\n- Highest risks: **premies before 60 wk PGA**, **term infants < 44 wk PGA**\n- Infants requiring elective procedures during high-risk periods need extended post-anesthesia monitoring',
            },
            {
                heading: 'Included patients',
                emphasis: 'plain',
                body: '- Former **full-term** (≥37 wk at delivery) infants **< 44 wk PGA** on day of surgery\n- Former **premature** (<37 wk at delivery) infants **< 60 wk PGA** on day of surgery',
            },
            {
                heading: 'Excluded patients',
                emphasis: 'plain',
                body: '- Former full-term or premature infants with **tracheostomies AND on home ventilation**\n- Note: home CPAP/BiPAP does NOT exclude — observation still required',
            },
            {
                heading: 'Procedure',
                emphasis: 'warn',
                body: '- Families informed of minimum **8 hr post-op stay** if patient qualifies\n- **Regional and local anesthesia** preferred; **limit total narcotic use**\n- 8-hour observation if NONE of the following:\n  - Pre-op: active BPD, history of apnea/bradycardia, anemia (Hb<9), cardiac disease, IVH grade 3+, hypoglycemia\n  - Periop: concerns for apnea/bradycardia or respiratory distress\n- If criteria not met → **admit overnight with continuous cardiorespiratory monitoring**\n- Apneic or cardio-respiratory event during observation → **24 hours event-free required** before discharge',
            },
            {
                heading: 'Discharge criteria',
                emphasis: 'success',
                body: '- Free from cardio-respiratory events\n- **SpO2 > 96% on RA**\n- HR + BP normal for age\n- Adequate oral intake\n- Pain adequately controlled with **Tylenol only** (no narcotics post-op)\n- IV remains in place but saline-locked; DC at discharge',
            },
            {
                heading: 'Operational',
                emphasis: 'plain',
                body: '- Cardio-respiratory monitor continuously while in hospital\n- **Procedure should occur by 10:00 AM** to facilitate discharge at reasonable hour',
            },
            {
                heading: 'Spinal anesthesia caveat',
                emphasis: 'critical',
                body: '**Premature infants undergoing spinal anesthesia** are STILL required to have extended monitoring — apnea has been reported in this population even in the absence of systemic opioids/benzodiazepines.',
            },
        ],
    },
    {
        ...COMMON,
        id: 'preop_urine_pregnancy',
        title: 'Urine Pregnancy Test Guidelines',
        shortDescription: 'HCG sample <48 hr; female ≥12 yr or signs of puberty/sexual activity/menses.',
        tags: ['hcg', 'pregnancy test', 'urine', 'preop', 'female adolescent'],
        emergency: false,
        sections: [
            {
                heading: 'Sample timing',
                emphasis: 'warn',
                body: '- **HCG (urine sample) cannot be more than 48 hours old** — risk of conversion in interim\n- Applies to inpatients and outpatients',
            },
            {
                heading: 'Indications',
                emphasis: 'info',
                body: '- Female patients **>12 years old**\n- OR signs of puberty\n- OR sexual activity\n- OR onset of menses\n- May be waived at the discretion of the anesthesiologist',
            },
        ],
    },
    {
        ...COMMON,
        id: 'preop_aed_alternatives',
        title: 'Antiepileptic Drug — Administration Alternatives',
        shortDescription: 'IV/ODT/oral suspension equivalents for major AEDs (Keppra, Lamictal, Valproic, etc.)',
        tags: ['aed', 'antiepileptic', 'keppra', 'levetiracetam', 'lamotrigine', 'lamictal', 'valproic acid', 'depakote', 'phenobarbital', 'lacosamide', 'clobazam', 'odt'],
        emergency: false,
        sections: [
            {
                heading: 'IV-ready (1:1 IV:PO) — give same maintenance dose',
                emphasis: 'success',
                body: '- **Brivaracetam** (Briviact) — 1:1 IV:PO; can also convert Brivaracetam → Levetiracetam at 1:10-1:15\n- **Diazepam** (Valium) — 1:1 IV:PO\n- **Lacosamide** (Vimpat) — 1:1 IV:PO\n- **Levetiracetam** (Keppra) — 1:1 IV:PO\n- **Lorazepam** (Ativan) — 1:1 IV:PO\n- **Phenobarbital** — 1:1 IV:PO\n- **Phenytoin** (Dilantin) — 1:1 IV:PO (mgPE); fosphenytoin preferred\n- **Valproic acid** (Depakote) — total daily PO equivalent → IV total daily ÷ Q6H',
            },
            {
                heading: 'ODT / chewable available (same maintenance dose)',
                emphasis: 'plain',
                body: '- Carbamazepine (Tegretol/Carbatrol): chewable 100 mg\n- Clonazepam (Klonopin): ODT 0.5 mg\n- Lamotrigine (Lamictal): ODT 50/100 mg; chewable 5/25/100 mg\n- Phenytoin: chewable 50 mg',
            },
            {
                heading: 'Clobazam (Onfi) — special',
                emphasis: 'warn',
                body: '- IV alternative: **Lorazepam 0.05-0.1 mg/kg/dose Q6H**\n- OR consider **0.5 mg clonazepam for every 10 mg clobazam** (max 3 mg clonazepam/day)',
            },
            {
                heading: 'Oral suspension formulations available',
                emphasis: 'plain',
                body: '- Carbamazepine 100 mg/5 mL; Ethosuximide 250 mg/5 mL; Felbamate 600 mg/5 mL\n- Gabapentin 250 mg/5 mL; Lamotrigine 1 mg/mL; Levetiracetam 100 mg/mL\n- Lorazepam 2 mg/mL; Oxcarbazepine 300 mg/5 mL; Phenobarbital 20 mg/5 mL\n- Phenytoin 125 mg/5 mL; Rufinamide 40 mg/mL; Topiramate 6 mg/mL\n- Valproic acid 250 mg/5 mL; Zonisamide 10 mg/mL\n- Brivaracetam 10 mg/mL; Lacosamide 10 mg/mL; Diazepam 1 mg/mL\n- Clonazepam 0.1 mg/mL',
            },
            {
                heading: 'XR + delivery caveats',
                emphasis: 'warn',
                body: '- All listed PO formulations may be given with small amounts of clear liquids up to time of surgery\n- All solid forms (tablets/capsules) may be **crushed or opened and mixed with water**\n- If unable to take PO: NG tube + 5-30 mL water flush\n- **For XR formulations**: substitute immediate-release for one dose. NPO > 24 hr post-op → divide total DAILY dose into:\n  - 2 doses (lamotrigine, levetiracetam, oxcarbazepine, topiramate)\n  - 3 doses (carbamazepine)\n- **G/J tube patients**: give as normally scheduled. **Reduced JT absorption**: clonazepam, lamotrigine, phenobarbital, topiramate, valproic acid, zonisamide\n- **Vigabatrin (Sabril)**: family provides home supply\n- Unless unable to swallow, give PO meds even if NPO',
            },
        ],
    },
    {
        ...COMMON,
        id: 'preop_morning_meds',
        title: 'Drugs SHOULD vs SHOULD NOT — AM of Surgery',
        shortDescription: 'Continue: BP / asthma / AED / anti-reflux / thyroid. Hold: ACE-I / ARB / metformin / diuretics.',
        tags: ['ace inhibitor', 'arb', 'metformin', 'glp-1', 'phentermine', 'diuretic', 'anticoagulant', 'thyroid', 'antihypertensive', 'asthma'],
        emergency: false,
        related: ['endo_dm_meds_chart'],
        sections: [
            {
                heading: 'GIVE on AM of surgery',
                emphasis: 'success',
                body: '- **Anti-hypertensives** (excluding ACE-I and ARB)\n- **Asthma medications** (Albuterol, Xopenex, Flovent, etc.)\n- **Anti-seizure medications** (Dilantin, Phenobarbital, Lamictal, Trileptal, etc.)\n- **Anti-reflux medications** (Prilosec, Zantac, Zofran)\n- **Thyroid medications** (Synthroid)',
            },
            {
                heading: 'HOLD prior to OR',
                emphasis: 'warn',
                body: '- **Metformin: hold ≥ 48 hr**; other oral hypoglycemics (see DM med chart in Endocrine hub)\n- **ACE inhibitors** (Lisinopril, Enalopril): **hold 24 hr**\n- **Angiotensin Receptor Blockers** (Losartan/Cozaar, Irbesartan/Atacand, Candesartan/Avapro): hold\n- **Anticoagulants**: discuss with cardiac or heme team if can be safely DC\'d\n- **Diuretics**: discuss with attending anesthesiologist',
            },
            {
                heading: 'Special considerations',
                emphasis: 'critical',
                body: '- **GLP-1 agonists** (Ozempic injections, Rybelsus tablets, Wegovy injections):\n  - **Daily formulations: hold day of surgery**\n  - **Weekly formulations: hold 7 days prior**\n  - Consult Endocrinology if needed\n- **Phentermine** (Adipex-P, Lomaira, Qsymia w/ topiramate): **hold 7 days prior**',
            },
            {
                heading: 'Note',
                emphasis: 'plain',
                body: 'Listed drugs are examples and most common. Many categories have too many to list — this is **not a complete list**. Verify with the institutional pharmacist or attending if uncertain.',
            },
        ],
    },
    {
        ...COMMON,
        id: 'preop_emend_aprepitant',
        title: 'Emend (Aprepitant) Periop Guidelines',
        shortDescription: '40 mg PO 3hr pre-op for high-risk PONV; ≥30 kg only; capsule 5x cheaper than liquid.',
        tags: ['emend', 'aprepitant', 'ponv', 'ponv prophylaxis', 'antiemetic', 'substance p', 'nk1 receptor', 'long qt', 'strabismus', 'middle ear', 'posterior fossa'],
        emergency: false,
        sections: [
            {
                heading: 'What it is + dosing',
                emphasis: 'info',
                body: '- **Substance P / NK-1 receptor antagonist**\n- FDA approved for chemo-induced N/V + adult pre-op PONV prophylaxis\n- **Pediatric PONV dosing not officially available** — these guidelines are NCH institutional consensus\n- **Adult dose: 40 mg PO 3 hours prior to anesthesia**',
            },
            {
                heading: 'NCH clinical guidelines',
                emphasis: 'warn',
                body: '- **Adult dose: 40 mg PO**\n- **Do NOT use in patients < 30 kg** (no validated PONV dose)\n- **Use capsule if possible**:\n  - 40 mg **capsule: $60/dose**\n  - Oral **liquid: $320/dose** (5× more expensive)\n- **Prophylactic use only — NOT for rescue**; must be given pre-operatively',
            },
            {
                heading: 'Indications — when to consider',
                emphasis: 'warn',
                body: '- **History of severe PONV** despite prophylaxis with ondansetron + dexamethasone ± scopolamine — requiring **hospital admission or prolonged PACU stay**\n- **Contraindication to standard antiemetics**:\n  - **Long QT syndrome** → can\'t use ondansetron\n  - Dexamethasone contraindicated\n  - Scopolamine patch contraindicated\n- **High-risk PONV surgery**:\n  - **Posterior fossa exploration / occipital craniectomy**\n  - **Strabismus surgery**\n  - **Middle ear surgery**',
            },
            {
                heading: 'How to administer',
                emphasis: 'plain',
                body: '- Give **pre-operatively in the Surgical Unit** with sip of water\n- **Capsule can be opened** and added to:\n  - Other premedications (acetaminophen or midazolam elixir)\n  - 5 mL of water, apple juice, or Sprite\n- Available from the pharmacy in the **main OR**',
            },
            {
                heading: 'Patient education',
                emphasis: 'warn',
                body: '- As indicated, patients should receive **EPIC information sheet** regarding need for **alternative method of birth control for 28 days** (aprepitant CYP3A4 induction reduces hormonal contraceptive efficacy)',
            },
            {
                heading: 'EPIC ordering note',
                emphasis: 'plain',
                body: '- **For patients < 30 kg: Emend does NOT appear as an option** in EPIC PONV dosing guidelines\n- **For patients ≥ 30 kg**: standard ordering pathway available',
            },
            {
                heading: 'How this differs from catalog usage',
                emphasis: 'info',
                body: 'Aprepitant 1 mg/kg PO appears throughout other catalog protocols (ERAS, Spinal Fusion, Sarcoma, Bariatric, Pectus, Orthognathic, Thyroid Lobectomy) as a routine pre-op PONV adjunct **including for patients < 40 kg**. Those uses derive dosing from chemo-induced N/V data, not the periop PONV guideline. **The 40 mg PO / ≥30 kg restriction here is the institutional PONV-only guideline** — verify with attending preference if pediatric dose discrepancy is encountered.',
            },
        ],
    },
    {
        ...COMMON,
        id: 'preop_adult_admission',
        title: 'Adult Patient (>21 yo) Admission to NCH',
        shortDescription: 'Case-by-case PAT Director review; H&P <1 yr; age-tier labs (CBC/Chem 7 ± EKG/CXR/Hb1ac).',
        tags: ['adult', 'over 21', 'admission criteria', 'transition', 'osu', 'pat director', 'occ-789', 'cbc chem 7', 'ekg htn'],
        emergency: false,
        related: ['outofor_osu_coverage'],
        sections: [
            {
                heading: 'Workflow + approval form',
                emphasis: 'info',
                body: '- **Reviewed case-by-case** for patients external to NCH system **> 21 years old**\n- **Send to PAT Director review**\n- **Hospital admission requires the OCC-789 form** "Approval for Admission of Adult Patient" with **3 signature paths** (any of these; verbal approval also acceptable):\n  - **Chief Medical Officer** + Date/Time\n  - **Surgeon-in-Chief** + Date/Time\n  - **Director of Pediatric Dentistry** + Date/Time\n- **Verbal approval workflow**: document "Received from / Received by / Date / Time"\n- These guidelines are **NOT absolute** — clinical judgement applies',
            },
            {
                heading: 'Required documentation — all > 21 yo',
                emphasis: 'warn',
                body: '- **History & Physical < 1 year old**\n- Send to **PAT Director review** before scheduling',
            },
            {
                heading: 'Pre-op labs (preliminary — more if comorbid)',
                emphasis: 'plain',
                body: '**For patients > 50 yo**:\n- **CBC + Chem 7** on all (recent within last month)\n- **EKG** on anyone on HTN meds OR > 50 yo (recent within last 6 months, no change in symptoms)\n- **CXR** on anyone with respiratory issues\n- **Hb1ac** on all diabetics (Type 1 + Type 2)\n\n*These are preliminary. More information may be required based on patient history + co-morbid conditions.*',
            },
            {
                heading: 'Cross-references',
                emphasis: 'success',
                body: '- For pediatric coverage at OSUWMC instead: see **outofor_osu_coverage** (OSU coverage rules — NCH peds anesthesia covers patients ≤12 yr only at OSU)\n- The 21-and-older patient at NCH is the inverse situation: an adult presenting to a pediatric facility, requiring formal approval workflow',
            },
            {
                heading: 'Source files',
                emphasis: 'plain',
                body: '- **OCC-789 form** "Approval for Admission of Adult Patient" (revised 6/26/12) — `Approval for admission of Adult Pt.pdf`\n- "NCH criteria for patients over age 21 years old" (.docx + .pdf) — screening parameters\n\nBoth under `original_pictures/Sharepoint/PAT_Pre-Op/`.',
            },
        ],
    },
];
