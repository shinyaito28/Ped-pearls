// ASC (Ambulatory Surgery Centers) hub — catalog entries.
// Source: NCH Sharepoint / Ambulatory Surgery Centers /
//   - ASC Guidelines March 2026.pdf (frequently revised — 17 revisions documented since 2013)
//   - OSA PAT flowsheet (already a flowchart card flow_osa_pat)

const COMMON = {
    hub: 'asc',
    kind: 'catalog',
    weightAware: false,
    ageRules: null,
    source: 'NCH Sharepoint / Ambulatory Surgery Centers',
    lastReviewed: '2026-04',
};

export const entries = [
    {
        ...COMMON,
        id: 'asc_appropriate_cases_guidelines',
        title: 'ASC — Appropriate Cases Guidelines (March 2026)',
        shortDescription: 'NOT-permitted vs PAT-review-required vs OK lists. ≤4 hr anesthesia, same-day discharge.',
        tags: ['asc', 'ambulatory surgery center', 'outpatient surgery', 'pat review', 'preterm', 'bmi cutoff', 'mh history', 'osa', 'cpap', 'icd', 'pacemaker', 'mitochondrial', 'eb', 'venezuelan heritage', 'glp-1'],
        emergency: false,
        related: ['flow_osa_pat', 'preop_adult_admission'],
        sections: [
            {
                heading: 'Goals',
                emphasis: 'info',
                body: '- **Care for patients safely + follow ambulatory periop standards**\n- **Minimize cancellation** of procedures\n- **Avoid postoperative admissions**',
            },
            {
                heading: 'Ideal procedures',
                emphasis: 'success',
                body: '- Procedures schedulable for **same-day discharge** following uncomplicated surgery + anesthetic\n- Expected **blood loss is minimal**\n- **Likelihood of complications is rare**\n- **Minimal chance of post-op hospital admission**\n- **Less than 4 hours of anesthesia time**\n- Cases scheduled for timely completion within ASC operating hours',
            },
            {
                heading: '🚫 NOT permitted at ASC — Age + body composition',
                emphasis: 'critical',
                body: '- **Preterm (<37 weeks gestation at birth) at < 60 wk PCA** — *exception: cases under exclusively local anesthesia*\n- **Full-term (≥37 wk) at < 44 wk PCA** — *exception: local anesthesia only*\n- **≥12 yo with BMI ≥ 40**\n- **<12 yo with BMI > 99th percentile + 3 positive OSA screening questions**\n- **<12 yo with BMI ≥ 140% of 95th %ile**\n- **<3 yo for adenotonsillectomy**\n- **<18 mo for adenoidectomy**\n- **PAST documented MH events**',
            },
            {
                heading: '🚫 NOT permitted at ASC — Procedure type',
                emphasis: 'warn',
                body: '- **Outpatient laparoscopic procedures (incl. diagnostic) <6 mo of age**\n  - **Exception**: laparoscopic CAN be done at ASC if:\n    - **≥ 6 months of age**\n    - **6-12 mo: must START by 11:00 AM**\n    - **≥ 12 mo: can start after 11:00 AM but should END by 3:00 PM**\n  - **Groin laparoscopy**: OK under 6 mo\n- **Direct laryngoscopy + bronchoscopy** (ENT/Pulm)',
            },
            {
                heading: '🚫 NOT permitted — Hematology / Endocrine',
                emphasis: 'warn',
                body: '- **Bleeding disorders** (vWD, hemophilia) requiring pre/post-op IV therapy, transfusion, or special labs\n- **Hematologic disorders** (sickle cell) requiring same\n- **Type 1 DM (insulin-dependent)** OR **poorly controlled Type 2 DM**\n- **Maternal Venezuelan heritage** (mtND4 anesthetic risk — see metabolic_mtnd4_venezuelan)',
            },
            {
                heading: '🚫 NOT permitted — Respiratory',
                emphasis: 'warn',
                body: '- **Uncontrolled asthma** clinically symptomatic and/or on oral steroids\n- **Severe OSA** OR **CPAP/BiPAP-dependence**\n- **Active pulmonary hypertension**\n- **Documented difficult airway**\n- **Respiratory isolation needed**\n- **Known or suspected airway papilloma**',
            },
            {
                heading: '🚫 NOT permitted — Neurological',
                emphasis: 'warn',
                body: '- **Uncontrolled or newly diagnosed seizures**\n- **Neuromuscular disorders** (e.g. Duchenne MD)\n- **Combined spinal-caudal** required for procedure',
            },
            {
                heading: '🚫 NOT permitted — Cardiac',
                emphasis: 'warn',
                body: '- **Unrepaired or partially repaired CHD** (TOF, HLHS, Eisenmenger\'s, post-Glenn, single-ventricle physiology, unrepaired ASD/VSD with physiological impact)\n- **Pacemakers OR implanted defibrillators (AICD)**',
            },
            {
                heading: '🚫 NOT permitted — Miscellaneous',
                emphasis: 'warn',
                body: '- **Opioid dependence or substance abuse** (incl. patients on Suboxone)\n- **Current prisoners** OR **minors in juvenile detention**\n- **History of significant violent behavior**\n- **Mitochondrial disorders**\n- **Epidermolysis Bullosa (EB)**',
            },
            {
                heading: '⚠ Allowed AFTER PAT review by attending anesthesiologist',
                emphasis: 'info',
                body: '**General**:\n- **<12 yo with BMI > 99th %ile + 2 (NOT 3) positive OSA questions**\n- **≥12 yo with BMI 35-39 + 2 positive OSA questions**\n- **<12 yo with BMI 99-139% of 95th %ile**\n- Significant psychological/medical issues hampering same-day discharge\n- **Difficult-to-manage behavior** (aggressive, severe autism) — patient must tolerate intranasal/oral/IM premed administration\n- **Acute illness** (fever, URI, diarrhea) without other ASC contraindications — evaluated day prior\n- **Recent hospitalization or ER visit**\n- **Recent vaccinations** (within 48 hr — risk of febrile response masking surgical illness)\n- **Well-controlled stable Type 2 DM** (NIDDM)\n- **Adults ≥22 yo** — scheduling must provide reason for NCH facility + PCP H&P within last 12 mo (sooner if status changes)\n- **Westerville site**: adenoidectomy patients (with or without BTI) classified as outpatient-in-a-bed if all other criteria met',
            },
            {
                heading: '⚠ Allowed AFTER PAT review — Respiratory + Cardiac + Misc',
                emphasis: 'info',
                body: '**Respiratory**: stable cystic fibrosis; moderate stable asthma\n\n**Cardiac**: **repaired and stable CHD** (ASD, VSD, PDA, TOF s/p full repair)\n\n**Miscellaneous**:\n- Extensive or complicated medical history\n- **Non-cardiac implantable devices** (VP shunt, sacral nerve stimulator, baclofen pump, gastric pacemaker, etc.)\n- **Bleeding/sickle cell disease that does NOT require IV meds or labs**\n- **Craniofacial syndromes** (Pierre-Robin, Trisomy 21) **WITH prior airway documentation** showing easy management (mask + laryngoscopy)\n- **GLP-1 agonists / semaglutides**: hold per pre-op timing protocol (daily formulations day-of, weekly formulations 1 week prior)',
            },
            {
                heading: 'Cross-references',
                emphasis: 'success',
                body: '- **OSA PAT Flowsheet** (interactive flowchart, Pre-op hub) — for the live OSA-question + BMI tier decision logic\n- **Adult Patient Admission** (Pre-op hub) — for adult >21 admission to NCH\n- **Venezuelan mtND4 protocol** (Metabolic hub) — full action plan for the Venezuelan heritage exclusion above',
            },
            {
                heading: 'Source revisions',
                emphasis: 'plain',
                body: 'NCH Policy originated 8/13. Revised: 9/15, 11/18, 5/19, 8/2020, 7/2021, 11/2021, 12/21, 1/23, 7/23, 8/23, 10/23, 12/24, 1/25, 2/25, 6/25, 10/25, 1/26, **3/26** (current). The frequent revision cadence reflects evolving criteria — verify against latest source if a borderline case.',
            },
        ],
    },
];
