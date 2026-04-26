// Cardiac Subspecialty hub — separate from the existing Cardiac TAB
// (which has TRAVEL/ROTEM/transfusion/etc. from NCH 2021 cardiac
// rotation guide). This hub holds the NCH Sharepoint Cardiac
// Perioperative Considerations docs: case-based coverage rules,
// common congenital heart conditions reference, and Long QT.

const COMMON = {
    hub: 'cardiacsub',
    kind: 'catalog',
    weightAware: false,
    ageRules: null,
    source: 'NCH Sharepoint / Cardiac Perioperative Considerations',
    lastReviewed: '2026-04',
};

export const entries = [
    {
        ...COMMON,
        id: 'cardiacsub_chd_coverage',
        title: 'Cardiac Anesthesia Coverage Criteria (CHD)',
        shortDescription: 'Which CHD patients MUST be covered by Cardiac Anesthesia vs general team.',
        tags: ['cardiac anesthesia', 'cardiac coverage', 'chd', 'single ventricle', 'fontan', 'glenn', 'pulmonary hypertension', 'cardiomyopathy', 'lvot obstruction', 'mitral stenosis', 'rvot obstruction', 'williams syndrome', 'heart transplant', 'ecmo', 'vad', 'tof', 'av canal'],
        emergency: false,
        sections: [
            {
                heading: 'Always cardiac anesthesia (no exceptions)',
                emphasis: 'critical',
                body: '- All patients **requiring prostaglandin** therapy to maintain ductal patency\n- All **Single Ventricle (SV)** patients **PRIOR to Glenn / Comprehensive Stage II**\n- SV patients with **failing Fontan physiology** (SV dysfunction, ↑ end-diastolic pressure, mod-severe AV valve regurgitation, high Fontan pressure, ascites)\n- **TEVG Fontan MRI** (per study protocol)\n- **All unrepaired cyanotic defects** (incl. unrepaired TOF + complete AV canal)\n- **Cardiomyopathy + EF ≤ 30%**\n- **Heart transplant recipients (post or awaiting)**\n- Patients on **ECMO / VAD** (any mechanical support)\n- **CTICU patients** evaluated per these characteristics',
            },
            {
                heading: 'Single Ventricle — POST Glenn / Comp II',
                emphasis: 'warn',
                body: 'All SV patients **post Glenn / Comp II** are **reviewed by Cardiac Anesthesia** for general-team appropriateness:\n- **Cardiac Anesthesia covers** if: failing SV physiology, significant ventricular dysfunction, or ≥ moderate AV valve regurgitation\n- Otherwise: General team OK',
            },
            {
                heading: 'NON-cyanotic CHD (NOT requiring cardiac anesthesia)',
                emphasis: 'success',
                body: '- Unrepaired **ASD**\n- **Transitional AV canal**\n- **PDA**\n- **PFO**\n- **VSD** (incl. VSD s/p PA banding)\n\n→ General team is appropriate.',
            },
            {
                heading: 'Pulmonary Hypertension — coverage rules',
                emphasis: 'warn',
                body: '- **Structural heart disease + on triple PH therapy** → Cardiac Anesthesia\n- **Non-structural PH** (CDH, BPD) **with severe PH** (PA pressures **systemic or supra-systemic**) → Cardiac Anesthesia\n- All other non-structural PH → General team',
            },
            {
                heading: 'Valvular lesions — gradient thresholds',
                emphasis: 'warn',
                body: '**LVOT obstruction (echo)**:\n- **Moderate**: ≥ 3 m/s OR ≥ 36 mmHg → reviewed by Cardiac Anesthesia; covered if **symptomatic** (syncope, CHF, dyspnea, arrhythmia); otherwise general team\n- **Severe**: ≥ 4 m/s OR ≥ 64 mmHg → **always Cardiac Anesthesia**\n\n**Mitral stenosis (mean gradient)**:\n- **Moderate**: 5-10 mmHg → reviewed; if symptomatic → Cardiac Anesthesia, else general team\n- **Severe**: > 10 mmHg → **always Cardiac Anesthesia**\n\n**RVOT obstruction with RV failure** → Cardiac Anesthesia',
            },
            {
                heading: 'Williams syndrome',
                emphasis: 'warn',
                body: 'Cardiac Anesthesia covers if **ANY**:\n- **Age ≤ 5 years**\n- Requires **pre-admission for hydration**\n- **≥ moderate LVOT obstruction**\n\n*(All Williams syndrome cases warrant high vigilance regardless of who covers — supravalvar AS + risk of sudden cardiac death.)*',
            },
            {
                heading: 'Cardiac Anesthesia consultation availability',
                emphasis: 'plain',
                body: 'If Cardiac Anesthesia consultant notes they will be **available for consultation** — they will be **in-house and available at the time of the case** (general team can run with consultant backup).',
            },
        ],
    },
    {
        ...COMMON,
        id: 'cardiacsub_syndromes_with_chd',
        title: 'Syndromes with Cardiac Implications — Quick List',
        shortDescription: 'Common syndromes to flag for cardiac evaluation pre-op (not exhaustive).',
        tags: ['syndromes', 'chd associations', 'hunter', 'hurler', 'mps', 'williams', 'noonan', 'goldenhar', 'marfan', 'smith-lemli-opitz', 'wolf-hirschhorn', 'beckwith-wiedemann', 'digeorge', '22q11', 'velocardiofacial'],
        emergency: false,
        related: ['cardiacsub_chd_coverage'],
        sections: [
            {
                heading: 'Disclaimer',
                emphasis: 'info',
                body: 'This is **not exhaustive** — it is a basic checklist to make sure children with the more common syndromes + cardiac concerns are not overlooked during PAT.',
            },
            {
                heading: 'Syndromes to flag for cardiac evaluation',
                emphasis: 'warn',
                body: '- **Hunter syndrome** (MPS II)\n- **Hurler syndrome** (MPS I)\n- **Williams syndrome** — supravalvar AS, sudden death risk\n- **Noonan syndrome** — pulmonary valve stenosis, HCM\n- **Goldenhar syndrome** — VSD, ASD, TOF, conotruncal\n- **Marfan syndrome** — aortic root dilatation, MR\n- **Smith-Lemli-Opitz**\n- **Wolf-Hirschhorn syndrome** — CHD in ~50%\n- **Beckwith-Wiedemann syndrome**\n- **DiGeorge / velocardiofacial / 22q11.2 deletion** — conotruncal anomalies (TOF, IAA-B, truncus, VSD)',
            },
            {
                heading: 'When to escalate',
                emphasis: 'plain',
                body: 'Any of these syndromes flagged in PAT should trigger:\n- Pre-op echocardiogram review\n- Consider ECG\n- Cardiology consult if not previously evaluated\n- Apply Cardiac Anesthesia coverage criteria (see related entry) based on echo findings',
            },
        ],
    },
    {
        ...COMMON,
        id: 'cardiacsub_long_qt',
        title: 'Long QT Syndrome — Anesthetic Management',
        shortDescription: 'Continue β-block, normalize lytes, propofol/thiopental induction, avoid QT-prolonging meds, manage TdP.',
        tags: ['lqts', 'long qt', 'lqt syndrome', 'torsades de pointes', 'tdp', 'beta-blocker', 'qt prolongation', 'magnesium torsades', 'esmolol', 'icd', 'pacing'],
        emergency: true,
        related: ['cardiacsub_chd_coverage'],
        sections: [
            {
                heading: 'Pre-operative',
                emphasis: 'warn',
                body: '- **Continue therapeutic β-blockade**\n- Ensure **normal K+, Ca²⁺, Mg²⁺**\n- **Avoid QT-prolonging drugs**\n- Continue **genotype-directed therapy**\n- **Anxiolytic premedication**\n- **If symptomatic**: consider pacing — liaise with cardiologist\n- **If pacemaker / ICD in situ**: check settings (consider deactivating ICD intra-op + external pads ready)',
            },
            {
                heading: 'Peri-operative — monitoring + induction',
                emphasis: 'critical',
                body: '- **Pre-induction: monitor > 1 ECG lead**\n- **Low threshold for intra-arterial monitoring**\n- **Central venous access**:\n  - Facilitates emergency pacing\n  - Ensures adequate filling despite β-block\n- **Induction**: thiopental or propofol\n- **Maintenance**: consider propofol infusion (TIVA)\n- **AVOID halothane**; all volatiles prolong QTc (use carefully if needed)\n- **Vecuronium** probably safe\n- **Cisatracurium** theoretically attractive but no clinical experience\n- **Avoid reversal** if possible (neostigmine + glycopyrrolate may briefly affect QT)',
            },
            {
                heading: 'Minimize sympathetic stimulation',
                emphasis: 'critical',
                body: '- **Topical LA / esmolol during laryngoscopy + intubation**\n- **Regional techniques** where appropriate\n- **Extubate during surgical anesthesia or with esmolol cover**\n- Maintain **normoxia, normocarbia, normothermia, normoglycemia**\n- Maintain **normal K+, Ca²⁺, Mg²⁺**',
            },
            {
                heading: 'Post-operative',
                emphasis: 'warn',
                body: '- **Continuous ECG monitoring**\n- Recover in **quiet environment**\n- Ensure maintenance of therapeutic β-blockade\n- **HDU / ICU monitoring**\n- **Good analgesia** (pain → sympathetic surge)',
            },
            {
                heading: 'Management of Torsades de Pointes (TdP)',
                emphasis: 'critical',
                body: '**Sustained TdP**: **DC cardioversion**\n\n**Short bursts of TdP — prevention/treatment**:\n- **Magnesium 30 mg/kg IV bolus over 2-3 min** → infusion **2-4 mg/hr**\n- **Repeat bolus after 15 min** if bursts not suppressed\n- **Trans-venous pacing at 90-110 bpm** (overdrive pacing prevents bradycardia-dependent TdP)',
            },
            {
                heading: 'Source',
                emphasis: 'plain',
                body: 'Booker PD, et al. Long QT syndrome and anaesthesia. Br J Anaesth 2003;90:349-66 (NCH Sharepoint reference).',
            },
        ],
    },
];
