// Neuro / Craniofacial hub — catalog entries (flowcharts shipped separately).
// Source: NCH Sharepoint / Neuro & Craniofacial / Neuro Intraoperative Protocols /
//   - Keppra Loading dose for seizure prophylaxis…
//   - Intraoperative Diabetes Insipidus and Vasopressin.docx (companion to DI flowchart)
//   - ROSA Neurosurgery Protocol.docx
//   - Dorsal Rhizotomy Protocol-Final.docx
//   - Acute Flaccid Myelitis Microsurgery / Brachial plexus protocol / Microsurgery (3 sub-files)

const COMMON = {
    hub: 'neuro',
    kind: 'catalog',
    weightAware: false,
    ageRules: null,
    source: 'NCH Sharepoint / Neuro Intraoperative Protocols',
    lastReviewed: '2026-04',
};

export const entries = [
    {
        ...COMMON,
        id: 'neuro_keppra_loading',
        title: 'Keppra Loading — Seizure Prophylaxis',
        shortDescription: 'Intraop levetiracetam load if requested by neurosurgeon.',
        tags: ['keppra', 'levetiracetam', 'seizure prophylaxis', 'aed', 'craniotomy'],
        emergency: false,
        sections: [
            {
                heading: 'Loading regimen',
                emphasis: 'info',
                body: 'Load **Keppra 30-50 mg/kg over 15-30 min** during the neurosurgical case if requested by neurosurgeon.',
            },
            {
                heading: 'Adverse effects',
                emphasis: 'plain',
                body: 'Watch for **sedation** — otherwise side effects are limited.',
            },
        ],
    },
    {
        ...COMMON,
        id: 'neuro_intraop_di_vasopressin',
        title: 'Intra-op DI + Vasopressin (companion to DI Flowchart)',
        shortDescription: 'Diagnostic criteria, vasopressin titration goals, fluid plan, EPIC pump caveats.',
        tags: ['di', 'diabetes insipidus', 'vasopressin', 'craniopharyngioma', 'pituitary', 'transcranial', 'transphenoidal'],
        emergency: true,
        related: ['flow_di_management', 'endo_pat_dm_adrenal_di'],
        sections: [
            {
                heading: 'Background',
                emphasis: 'info',
                body: '- DI = deficiency of arginine vasopressin (ADH) → no water reabsorption in distal tubules\n- Common with hypothalamic / pituitary / optic-nerve lesions (craniopharyngioma, optic glioma, pituitary adenoma)\n- **75% of transcranial pituitary resections** develop DI; **10-44% of transphenoidal**\n- Onset: intra-op or first 12 hr post-op\n- Only **6%** become permanent',
            },
            {
                heading: 'Pre-op (children with known DI)',
                emphasis: 'info',
                body: '- Parents give usual DDAVP dose on DOS within 1 hr of procedure\n- Restrict fluids to **insensible losses** (UOP + ~1-2 mL/kg/hr ≈ ½ maintenance) for the case duration\n- Adjust based on serum Na+ and UOP',
            },
            {
                heading: 'Intra-op diagnosis (must meet ALL)',
                emphasis: 'critical',
                body: '- Polyuria: UOP > **3 mL/kg/hr**\n- Serum Na+ > **145 mEq/L** (iSTAT and lab sample)\n- Serum osmolarity > **300 mOsm/kg**\n- Urine osmolarity < **300 mOsm/kg** OR specific gravity < 1.01',
            },
            {
                heading: 'Vasopressin protocol',
                emphasis: 'critical',
                body: '- Inform surgeon, call OR pharmacy 22171 for vasopressin infusion + replacement IVF (D5 ¼NS)\n- **Start: 0.5 mU/kg/hr**\n- Titrate **+0.2-0.5 mU/kg/hr q15min** until UOP at goal\n- Goal UOP: **1-2 mL/kg/hr** (document q15min until achieved, then q1h)\n- Goal Na+: **140-150 mEq/L** (document q30min until at goal, then q1h × 8 hr; if stable can switch to q4h)',
            },
            {
                heading: 'Fluid replacement',
                emphasis: 'warn',
                body: '- Evaluate IN/OUT q15min; keep regular IVF at **½ maintenance**\n- Replace excess UOP (IN minus OUT) **1:1 with D5 ¼NS or ¼NS** to maintain euvolemia\n- Check Na+ q30min until plateau, then q1h',
            },
            {
                heading: 'EPIC pump traps',
                emphasis: 'warn',
                body: '- The pump library does NOT include vasopressin\n- EPIC has **6 different indications** (DI, LOOP, NICU, SHOCK, FLAT RATE, GI BLEED) and multiple concentrations\n- Doses are in U/kg/HOUR vs **mU/kg/MINUTE** depending on indication\n- **The DI dose is mU/kg/HOUR** — verify the right indication before infusing',
            },
            {
                heading: 'Sample timing + euvolemia note',
                emphasis: 'plain',
                body: '- Collect urine samples from the **most recent UO** — samples contaminated with urine from 2-3 hr earlier will mislead diagnosis/treatment\n- Euvolemic patients on vasopressin will continue to produce **~0.5 mL/kg/hr urine**\n- Anuria + tachycardia/hypotension may represent hypovolemia',
            },
            {
                heading: 'Disposition',
                emphasis: 'plain',
                body: 'All patients on a vasopressin infusion → **PICU**.',
            },
        ],
    },
    {
        ...COMMON,
        id: 'neuro_rosa',
        title: 'ROSA Neurosurgery Protocol',
        shortDescription: 'SEEG / ECOG case — TIVA/TOF management for robotic stereotactic electrode placement.',
        tags: ['rosa', 'seeg', 'ecog', 'epilepsy', 'stereotactic', 'tiva', 'remifentanil', 'vecuronium', 'isoflurane'],
        emergency: false,
        sections: [
            {
                heading: 'Pre-op',
                emphasis: 'info',
                body: '- AEDs: continue per neurology recommendations (generally take all on schedule)\n- If preop AED dose questions arise → reach out to neurology\n- Premedication: **avoid midazolam**; if sedation required → dexmedetomidine (nasal or IV)',
            },
            {
                heading: 'Lines + positioning',
                emphasis: 'plain',
                body: '- Two peripheral IVs; consider arterial line for comorbidities/age\n- Temperature: oral or nasal core (no Foley temp due to possible postop MRI)\n- Position: supine, bed in OR 12 rotated with head by OR door — away from anesthesia machine — to allow large O-ring CT scanner',
            },
            {
                heading: 'Medications',
                emphasis: 'info',
                body: '- Antibiotics: cefazolin within 1 hr of incision\n- **Mannitol and dexamethasone NOT required** per neurosurgeons\n- Isoflurane for maintenance — keep < 1 MAC (preferably 0.5 MAC)\n- Remifentanil + vecuronium infusions + minimal stimulation create very low MAC requirement\n- Isoflurane only used in build-up to TIVA switch; any volatile fine for closure after EEG/TIVA',
            },
            {
                heading: 'Infusions',
                emphasis: 'warn',
                body: '- **Remifentanil**: entire case (rapid wake-up, supports ECOG)\n- **Vecuronium**: entire case at **0.05-0.1 mg/kg/hr** to maintain 1 twitch TOF; consider continuous TOF monitor. **Any movement is absolutely contraindicated**. Most patients on AEDs metabolize NMBAs rapidly.\n- **Propofol**: only during ECOG (improves recordings at low dose) — start at **50-100 mcg/kg/min** when neurosurgery says ~5 SEEG depth electrodes remain',
            },
            {
                heading: 'Series of intraop events',
                emphasis: 'plain',
                body: '- Induction (sevo or IV; avoid midazolam)\n- Lines, Foley, positioning, padding\n- Start remifentanil + vecuronium infusions; switch to low-flow isoflurane\n- Time-out → antibiotics\n- Rigid cranial fixation, ROSA attached + registered, sterile prep + drape\n- Incision\n- Intraoperative head CT + ECOG setup\n- ~5 SEEG electrodes remaining → turn off isoflurane, switch to TIVA propofol\n- ECOG ~20-30 min — neurophysiologist guides propofol titration\n- Switch back to volatile when ECOG complete\n- Closure (small)\n- Transport to MRI-OR if applicable\n- Extubation, neuro exam, disposition',
            },
            {
                heading: 'Disposition',
                emphasis: 'success',
                body: '- **MRI → PACU → H10 inpatient ward** for developmentally appropriate patients who won\'t disturb wires\n- **MRI → PACU → PICU** for developmentally delayed, autistic, young, etc.; may need dexmedetomidine infusion. Patients on sedating infusions DO NOT typically go to PACU but can with dexmed.\n- **OR → PICU directly** for non-MRI patients needing sedation/ICU care; communicate with PICU before arrival',
            },
        ],
    },
    {
        ...COMMON,
        id: 'neuro_dorsal_rhizotomy',
        title: 'Dorsal Rhizotomy Protocol',
        shortDescription: 'Neuromonitoring case + multimodal analgesia + neurosurgically placed epidural.',
        tags: ['dorsal rhizotomy', 'cerebral palsy', 'spasticity', 'epidural', 'neuromonitoring', 'gabapentin', 'valium', 'ketorolac'],
        emergency: false,
        sections: [
            {
                heading: 'Intra-op',
                emphasis: 'info',
                body: '- **Gabapentin pre-op**\n- Induction + maintenance per anesthesia team\n- Neuromonitoring during procedure\n- IV ketorolac at end of case **0.5 mg/kg** (then q6h on the floor)\n- IV acetaminophen **15 mg/kg** at end of case (then q6h)\n- IV valium at end of case **0.05-0.1 mg/kg** (then q6h)\n- **Neurosurgery places an epidural at end of procedure**\n- Test dose: 1.5% lidocaine with epi 1:200,000 — **0.1 mL/kg up to 3 mL**\n- Epidural infusion (LA + opioid) starts in PACU\n- PRN IV opioid as needed',
            },
            {
                heading: 'POD #0 → #1',
                emphasis: 'plain',
                body: '- Epidural LA + opioid running\n- Scheduled ketorolac 0.5 mg/kg q6h (max 20 doses)\n- Scheduled acetaminophen IV 10-15 mg/kg q6h — change to PO when tolerating clears\n- Scheduled IV valium 0.05 mg/kg q6h — change to PRN/PO when tolerating clears\n- Gabapentin 3-4 mg/kg TID\n- PRN IV opioid\n- Massage therapy consult',
            },
            {
                heading: 'POD #2-4',
                emphasis: 'plain',
                body: '- Continue current pain plan if doing well\n- POD #3: epidural removed AM by Neurosurgery or Pain service\n- Continue scheduled ketorolac (max 20 doses), acetaminophen, PRN valium\n- Consider PRN oxycodone for breakthrough or scheduled PO oxycodone with PRN IV opioid',
            },
        ],
    },
    {
        ...COMMON,
        id: 'neuro_afm_microsurgery',
        title: 'AFM / Brachial Plexus / Microsurgery — 3 Protocols',
        shortDescription: 'Common: NO NMB, remi/sufentanil. AFM=TIVA. Microsurg flap=NO vasopressors + IV heparin per surgeon.',
        tags: ['afm', 'acute flaccid myelitis', 'brachial plexus', 'microsurgery', 'muscle flap', 'nerve transfer', 'free flap', 'no nmb', 'tiva', 'remifentanil', 'sufentanil', 'heparin flap'],
        emergency: false,
        sections: [
            {
                heading: 'Common to all three (universal preamble)',
                emphasis: 'info',
                body: '- Standard premedication as needed\n- Inhalation or IV induction\n- Antibiotics per surgical team\n- **Pre-operative huddle to discuss invasive lines + IV access options**\n- **No neuromuscular blocking agents during the case** (preserve nerve stimulation for surgical identification)\n- **Dexmedetomidine boluses 0.25-0.5 mcg/kg** (or up to 5 mcg/kg in AFM) prn\n- **PONV ppx**: Dexamethasone **0.2 mg/kg (max 10 mg)** + Ondansetron **0.15 mg/kg (max 4 mg)**\n- **Post-op analgesia**: Acetaminophen **15 mg/kg (max 1000 mg)** + Hydromorphone titrated to RR\n- Recovery: PACU → inpatient ward; post-op plan per anesthesia + surgical team discussion',
            },
            {
                heading: 'AFM (Acute Flaccid Myelitis) — TIVA-based',
                emphasis: 'warn',
                body: '**Maintenance**:\n- **TIVA**: Propofol infusion **titrated to BIS 45-60** + Remifentanil OR Sufentanil infusion\n- **Lidocaine infusion 1 mg/kg/hr**\n- *Optional*: **Ketamine infusion 0.25 mg/kg/hr**\n- **Dexmedetomidine boluses 0.25-5 mcg/kg** prn',
            },
            {
                heading: 'Brachial Plexus — Inhalational + opioid infusion',
                emphasis: 'warn',
                body: '**Maintenance**:\n- **Inhalational anesthetic** titrated to clinical need\n- **Remifentanil OR Sufentanil infusion**\n- *Optional*:\n  - **Ketamine infusion 0.25 mg/kg/hr**\n  - **Lidocaine infusion 1 mg/kg/hr**\n- **Dexmedetomidine boluses 0.25-0.5 mcg/kg** prn',
            },
            {
                heading: 'Microsurgery (Muscle Flap) — flap-perfusion priorities',
                emphasis: 'critical',
                body: '**Maintenance**:\n- **Inhalational anesthetic** titrated to clinical need\n- **Remifentanil OR Sufentanil infusion**\n- *Optional*: Ketamine 0.25 mg/kg/hr, Lidocaine 1 mg/kg/hr\n- **Dexmedetomidine boluses 0.25-0.5 mcg/kg** prn\n\n**Flap-specific rules**:\n- **NO use of any vasoactive agents** — vasopressors compromise flap perfusion. **If pressors needed, discuss with surgeon FIRST**\n- **IV Heparin** to be administered by anesthesia team **after discussion with surgeon for dose + timing** (anti-coagulation for flap thrombosis prevention)\n\n**Post-op analgesia (in addition to common):**\n- **Muscle or nerve catheter placement by surgical team** OR consult **acute pain service** for catheter infusion management',
            },
            {
                heading: 'Why all three avoid NMB',
                emphasis: 'plain',
                body: 'These are nerve / nerve-transfer / flap procedures. Surgeon needs **intra-op nerve stimulation** to confirm motor unit identity (esp. AFM nerve transfers + brachial plexus reconstruction). NMB would mask responses → wrong nerve sacrificed. Use TIVA / volatile alone with opioid infusion to maintain depth instead.',
            },
            {
                heading: 'Source',
                emphasis: 'plain',
                body: 'NCH Neuro Intraoperative Protocols / Acute Flaccid Myelitis Microsurgery / 3 PDFs (June 2021): AFM Protocol.pdf, Brachial plexus protocol.pdf, Microsurgery.6.2021.pdf.',
            },
        ],
    },
];
