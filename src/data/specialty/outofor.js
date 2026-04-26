// Out-of-OR / Off-site hub — catalog entries.
// Source: NCH Sharepoint / Out of OR_Off-site /
//   - ECT/ECT wall cheat sheet.docx + Use of Flumazenil.pdf
//   - GI Procedure Center/GI Suite Patients_Jan 2024.pdf
//   - IR/Protamine Dosing 3.25.2021.pdf
//   - MRI/Cardiac Stress MRI_Feb 2025.pdf
//   - MRI/Off-hours MRI.docx
//   - Nuc Med_CT_VCUG/VCUG.docx + Urodynamics.docx + Stop Vent CT Protocol.docx
//   - OSU/Cases at OSU and pediatric anesthesia coverage.pdf

const COMMON = {
    hub: 'outofor',
    kind: 'catalog',
    weightAware: false,
    ageRules: null,
    source: 'NCH Sharepoint / Out of OR_Off-site',
    lastReviewed: '2026-04',
};

export const entries = [
    {
        ...COMMON,
        id: 'outofor_ect_routine',
        title: 'ECT — Anesthetic Routine + Methohexital',
        shortDescription: 'Awake IV when possible; methohexital 1-2 mg/kg; bag mask + bite block.',
        tags: ['ect', 'electroconvulsive', 'methohexital', 'sux', 'succinylcholine', 'flumazenil', 'depression', 'psych'],
        emergency: false,
        sections: [
            {
                heading: 'Anesthetic routine',
                emphasis: 'info',
                body: '- Awake IV whenever possible\n- IM ketamine is fine if needed\n- IV induction with methohexital + sux (propofol/ketamine acceptable when needed)\n- Bag mask on 100% O2\n- **Bite block**\n- **Hands off** during ECT\n- Inhalation induction for IV placement: lower end-tidal agent to <1% prior to sux + ECT',
            },
            {
                heading: 'Methohexital',
                emphasis: 'warn',
                body: '- Stocked in PACU Pyxis (won\'t fit in our backstands)\n- 500 mg vial — dilute in 50 mL saline → **10 mg/mL**\n- Dose: **1-2 mg/kg** (keeping below 2 mg/kg prevents interference with seizure activity)\n- Recommend dosing out of a 10-20 mL syringe once diluted\n- Time to clinical recovery: 5-15 min',
            },
            {
                heading: 'Flumazenil — for daily-benzo patients',
                emphasis: 'warn',
                body: '- Typical dose: **0.5 mg given immediately prior to ECT tx**\n- Stocked in procedure-center PACU Pyxis (0.5 mg/5 mL)\n- 2 mg Versed commonly given immediately after ECT to prevent delirium/withdrawal in PACU\n- No intrinsic actions other than benzo antagonism\n- Onset: 1-2 min; peak: 2-6 min; effect t½: 7-15 min (~20 min duration); elimination t½: 40-79 min',
            },
        ],
    },
    {
        ...COMMON,
        id: 'outofor_protamine_ir',
        title: 'Protamine for IR Heparin Reversal',
        shortDescription: 'Time + heparin-dose lookup table; protamine NOT weight-based; SLOW infusion.',
        tags: ['protamine', 'heparin reversal', 'ir', 'enoxaparin', 'lovenox', 'lmwh', 'syringe pump'],
        emergency: true,
        related: ['flow_ir_heparin_stroke'],
        sections: [
            {
                heading: 'Key principles (UFH)',
                emphasis: 'info',
                body: '- Protamine dose depends on **heparin dose AND time since heparin given**\n- **NOT weight-based**\n- 1 mg protamine reverses ~100 U UFH\n- Onset: ~5 min',
            },
            {
                heading: 'UFH dosing table',
                emphasis: 'warn',
                body: '**< 30 min since heparin:** 5 mg / 10 mg / 20 mg / 30 mg / 40 mg / 50 mg (max) for heparin <500 / 500-1000 / 1000-2000 / 2000-3000 / 4000-5000 / >5000 U\n\n**30-60 min:** 3 / 7 / 15 / 20 / 30 / 30 mg\n\n**60-120 min:** 2 / 5 / 10 / 15 / 20 / 20 mg\n\n**> 120 min:** 1.5 / 3 / 7 / 10 / 15 / 15 mg',
            },
            {
                heading: 'Enoxaparin (LMWH) reversal',
                emphasis: 'warn',
                body: '- Anti-Xa activity is **never fully reversed** — max 60-75% achievable\n- Excessive protamine may **worsen** bleeding\n- **0-8 hr since enoxaparin:** 1 mg protamine per **mg** of enoxaparin given\n- **>8 hr:** 0.5 mg protamine per mg of enoxaparin\n- 2nd dose if needed: 0.5 mg per mg of enoxaparin',
            },
            {
                heading: 'Administration',
                emphasis: 'critical',
                body: '- Available as 50 mg/5 mL = **10 mg/mL**\n- **SLOWLY VIA SYRINGE PUMP over 10 min** — rapid infusion → hypotension\n- May dilute up to 10 mL with NS to facilitate 10-min infusion\n- **Have EPINEPHRINE and CALCIUM on hand** for protamine reaction\n- Reaction signs: ↓ vent compliance, loss of EtCO2, hypotension\n- Risk factors: high dose, repeated doses, prior protamine, fish allergy, vasectomy, severe LV dysfunction, abnormal pulmonary hemodynamics',
            },
        ],
    },
    {
        ...COMMON,
        id: 'outofor_cardiac_stress_mri',
        title: 'Cardiac Stress MRI — Dobutamine Protocol',
        shortDescription: '5-stage dobutamine titration to target HR; +/- atropine; PIV ×2.',
        tags: ['cardiac mri', 'stress mri', 'dobutamine', 'atropine', 'gadavist', 'perfusion'],
        emergency: false,
        sections: [
            {
                heading: 'Setup',
                emphasis: 'info',
                body: '- Consider extra anti-emetics (nausea common even non-sedate)\n- **PIV ×2**: one for dobutamine ONLY, one for Gadavist + push meds + NS bolus\n- Dobutamine concentration: **1000 mcg/mL if <7 kg**, **4000 mcg/mL if >7 kg**\n- Cardiology orders the dobutamine + study meds the day of MRI\n- Alaris pump prepared and administered by radiology/cardiology staff',
            },
            {
                heading: 'Workflow',
                emphasis: 'plain',
                body: '- Resting images (incl. resting perfusion, 1st of 2 contrast injections)\n- Monitor HR, BP, SpO2 throughout — review prior to dobutamine start\n- Stress images (incl. stress perfusion, 2nd contrast injection)',
            },
            {
                heading: 'Dobutamine titration',
                emphasis: 'warn',
                body: '- Vitals (HR, BP, SpO2) **3 min after infusion start** and after each rate increase\n- Cardiologist directs rate increase **q4 min** if vitals acceptable\n- **Stage I (start): 5 mcg/kg/min**\n- Stage II: 10 mcg/kg/min\n- Stage III: 20 mcg/kg/min\n- Stage IV: 30 mcg/kg/min\n- **Stage V (max): 40 mcg/kg/min**\n- Atropine **0.01 mg/kg (max 0.5 mg) IV ×1** if target HR not reached at max dobutamine',
            },
            {
                heading: 'Targets + completion',
                emphasis: 'success',
                body: '- Target HR depends on age — may be as high as **180**\n- Once target HR reached: stress images (5-10 min)\n- After stress images: **stop dobutamine infusion**',
            },
        ],
    },
    {
        ...COMMON,
        id: 'outofor_stop_vent_ct',
        title: 'Stop-Vent / Inspiratory-Hold Chest CT Protocol',
        shortDescription: 'Recruitment maneuvers + held-inspiration scans for cancer screening / peripheral disease.',
        tags: ['ct', 'chest ct', 'stop vent', 'breath hold', 'recruitment', 'peep', 'oncology screening'],
        emergency: false,
        sections: [
            {
                heading: 'Indications',
                emphasis: 'info',
                body: 'For patients where the CT is being done for **cancer screening** or other processes looking for small disease in the periphery, unless medically contraindicated.',
            },
            {
                heading: 'Induction + initial ventilation',
                emphasis: 'plain',
                body: '- IV or inhalational induction (no advantage to either)\n- Early bag-valve mask ventilation\n- PIP **24-26 cm H₂O** to generate **VT 10-12 mL/kg**\n- Expeditious PIV (if not present) + ETT placement\n- Immediate controlled ventilation\n- VT 10-12 mL/kg (PIP up to 30), **PEEP 8 cm H₂O**, inspiratory time 1.2 s to minimize atelectasis\n- Rapid decrease of FiO2 to 30% as tolerated',
            },
            {
                heading: 'Recruitment + held-inspiration scan',
                emphasis: 'warn',
                body: '- Immediately prior to formal inspiratory scan (CT tech notifies): **3 recruitment breaths**\n- Hold each breath for **15-20 sec at 30 cm H₂O**\n- For the inspiratory scan: provide **inspiratory breath hold at 30 cm H₂O**\n- Watch for hemodynamic changes\n- Consider propofol or remifentanil bolus prior to held inspiration to facilitate apnea if over-breathing limits time',
            },
            {
                heading: 'Communication',
                emphasis: 'critical',
                body: 'Coordination with the CT technician is **crucial** — inspiratory scans must be taken **after** recruitment maneuvers but **during** the held inspiration.',
            },
        ],
    },
    {
        ...COMMON,
        id: 'outofor_vcug',
        title: 'VCUG — Anesthetic Goals',
        shortDescription: 'Light sedation only to facilitate catheter; patient must be awake to void.',
        tags: ['vcug', 'voiding cystourethrogram', 'fluoroscopy', 'urology', 'reflux', 'nitrous'],
        emergency: false,
        sections: [
            {
                heading: 'What it is',
                emphasis: 'info',
                body: '- Looks for bladder/urethral abnormalities + ureteral reflux\n- Done in fluoroscopy\n- Straight bladder catheter; bladder filled with contrast; images obtained while voiding',
            },
            {
                heading: 'Anesthesia goals',
                emphasis: 'warn',
                body: '- Our **only purpose** is to facilitate catheter placement\n- Radiologist wants the patient **awake for voiding**',
            },
            {
                heading: 'Typical routine (not a protocol)',
                emphasis: 'plain',
                body: '- PO Versed in pre-op\n- **Nitrous for catheter placement**\n- Usually **no IV needed**\n- Child Life present to distract once awake\n- Procedure 20-30 min\n- Usually skips PACU (straight to phase II)',
            },
        ],
    },
    {
        ...COMMON,
        id: 'outofor_urodynamics',
        title: 'Urodynamics — Anesthetic Goals',
        shortDescription: 'Same as VCUG — light sedation for catheter, awake for voiding.',
        tags: ['urodynamics', 'urology', 'emg', 'rectal catheter', 'bladder filling'],
        emergency: false,
        related: ['outofor_vcug'],
        sections: [
            {
                heading: 'What it is',
                emphasis: 'info',
                body: '- Test of urinary tract function — ordered by Urology\n- Done in procedure room (no fluoroscopy)\n- Straight catheter for bladder filling, EMG stickers near rectum, rectal catheter',
            },
            {
                heading: 'Anesthesia goals',
                emphasis: 'warn',
                body: '- Same as VCUG\n- Light sedation only to facilitate catheter placement\n- Patient must be **awake when bladder filled** to void normally\n- Certain behavioral patients: urology may allow full sedation throughout',
            },
            {
                heading: 'Typical routine',
                emphasis: 'plain',
                body: '- PO Versed pre-op + nitrous for catheter\n- Usually no IV\n- Child Life present\n- 20-30 min\n- Usually skips PACU',
            },
        ],
    },
    {
        ...COMMON,
        id: 'outofor_gi_suite_contraindications',
        title: 'GI Suite — Patient Contraindications',
        shortDescription: 'When NOT to do the case in the GI Procedure Center (move to MOR).',
        tags: ['gi suite', 'endoscopy', 'colonoscopy', 'contraindications', 'mor', 'ambulatory'],
        emergency: false,
        sections: [
            {
                heading: 'Move to MOR if any of the following',
                emphasis: 'critical',
                body: '- **< 2 yr** for routine upper or lower endoscopy (no therapeutic interventions)\n- **< 4 yr** requiring complex therapeutic interventions of upper/lower GI tract\n- Continuous infusions of vasoactive or other meds (octreotide, TPN/lipids, PCA, PPI, insulin)\n- DM requiring insulin therapy + glucose monitoring\n- Likely repeated lab analysis (glucose, lytes, ABGs)\n- Active bleeding with **Hb < 8 g/dL**\n- Likely transfusion therapies\n- At risk for intraop hemodynamic instability (e.g. acute pancreatitis)\n- From acute care units (PICU, NICU)\n- On mechanical ventilation or BiPAP\n- Complex multi-system PMH\n- Requiring TIVA (e.g. Endo-Flip)',
            },
        ],
    },
    {
        ...COMMON,
        id: 'outofor_offhours_mri',
        title: 'Off-hours / Emergent MRI Workflow',
        shortDescription: 'Emergent ≤ 1 hr; urgent ≤ 4 hr; in-house team handles short OR cases.',
        tags: ['mri', 'off-hours', 'emergent mri', 'urgent mri', 'on-call', 'board runner'],
        emergency: false,
        sections: [
            {
                heading: 'Trigger',
                emphasis: 'info',
                body: '- Excludes already-intubated patients\n- On-call radiology attending approves study + contacts attending anesthesiologist (call hours) or board runner (0700-1600)\n- Radiologist discusses need with the attending ordering the procedure\n- Attending anesthesiologist notified whether emergent or urgent (decision is up to attending radiologist + ordering attending)',
            },
            {
                heading: 'Time targets',
                emphasis: 'warn',
                body: '- **Emergent:** initiated within **1 hour**\n- **Urgent:** initiated within **4 hours**\n- Notify PACU RN charge nurse or on-call nurse if PACU visit anticipated',
            },
            {
                heading: 'Off-hours staffing',
                emphasis: 'plain',
                body: '- During working hours: case goes into next open MRI scanner, bumps other cases\n- Off-hours, current OR case finishes <30 min: in-house team does MRI, holds other non-emergent OR cases\n- Off-hours, current OR case >30 min remaining: **back-up attending called in** for the MRI\n- Pending cases from previous night: hand off to day board runner',
            },
        ],
    },
    {
        ...COMMON,
        id: 'outofor_osu_coverage',
        title: 'OSU Coverage Rules (NCH peds anesthesia at OSU)',
        shortDescription: 'Age ≤ 12, weekday 0700-1700, non-urgent only; joint approval for exceptions.',
        tags: ['osu', 'ohio state', 'james', 'coverage', 'radiation oncology', 'proton beam'],
        emergency: false,
        sections: [
            {
                heading: 'Coverage criteria (all must be met)',
                emphasis: 'info',
                body: '- **Age 12 years and younger**\n- **Non-emergent or non-urgent** cases from **7 AM until 5 PM weekday**\n- Generally cannot accommodate cases based primarily on surgeon preference or lack of NCH privileges',
            },
            {
                heading: 'Exceptions',
                emphasis: 'warn',
                body: '- Rare and unique situations may justify NCH coverage at OSUWMC or The James for ≤12 yo\n- Requires **joint approval by NCH and OSUWMC physician leadership**\n- Family must be notified before scheduling\n- Only one pediatric anesthesiology attending available — cases queue **after radiation oncology and proton beam cases**',
            },
            {
                heading: 'Routine OSU coverage',
                emphasis: 'plain',
                body: 'NCH currently has **one attending assigned** for daytime coverage of cases at OSU including radiation oncology and the proton beam center.',
            },
        ],
    },
];
