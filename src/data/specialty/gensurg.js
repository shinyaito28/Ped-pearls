// General Surgery hub — catalog entries.
// Source: NCH Sharepoint / General Surgery / General Surgery Intraoperative Protocols & Guidelines /
//   - CDH NICU Guildelines FINALvsdx.pdf (algorithmic — large)
//   - Lap appendectomy protocol.docx
//   - IBD Enhanced Recovery 3.2.26.docx
//   - Anesthesia Protocol for Metabolic and Bariatric Surgery March 5 2025.pdf
//   - Pectus_Nuss Pathway 062624.pdf (will live in Procedures hub instead)
//   - Thyroid lobectomy TCU Nov 2022.pdf (also in ENT hub — primary clinical home is ENT)
//   - ERAST_12_2023.pdf (already in Hematology hub)

const COMMON = {
    hub: 'gensurg',
    kind: 'catalog',
    weightAware: false,
    ageRules: null,
    source: 'NCH Sharepoint / General Surgery',
    lastReviewed: '2026-04',
};

export const entries = [
    {
        ...COMMON,
        id: 'gensurg_cdh_nicu',
        title: 'CDH — NICU Acute Management Algorithm',
        shortDescription: 'Conventional → HFOV → ECMO ladder for congenital diaphragmatic hernia.',
        tags: ['cdh', 'congenital diaphragmatic hernia', 'ecmo', 'hfov', 'pulmonary hypertension', 'nicu', 'preductal', 'postductal'],
        emergency: true,
        sections: [
            {
                heading: 'Initial NICU admission',
                emphasis: 'info',
                body: '- Admit to NICU C4B; conventional mechanical ventilation\n- **10-12 Fr OG tube to LIS** if not done\n- Double-lumen central venous + arterial access\n- Monitor pre- and post-ductal saturations\n- Notify surgeon\n- **Maintain quiet & dark environment** with minimal stimuli\n- IVF: D10W @ TFG 65 mL/kg/d; cerebral + renal NIRS\n- Avoid routine paralysis; start sedation',
            },
            {
                heading: 'Initial labs + imaging',
                emphasis: 'plain',
                body: '- Neonatal workup, CBC + diff + plt, ABG with iCa, lactate, glucose on admission\n- Chromosomal microarray if CDH; genome if CDH+\n- 12-24 HOL labs: Chem 10, bilirubin panel, newborn screen\n- CXR + KUB; **HUS in first 24 hr**\n- If at risk for sepsis: blood culture + ampicillin + gentamicin\n- **ECHO within 12-24 hr** for stable patients, **STAT if pH<7.1, lactate>5, BE>10, severe shunting, or systemic hypotension**',
            },
            {
                heading: 'Sedation regimen',
                emphasis: 'warn',
                body: '- **Fentanyl 1-2 mcg/kg/hr** if hypotensive OR **Morphine 0.02-0.05 mg/kg/hr**\n- **Precedex 0.2 mcg/kg/hr** titrate to effect\n- 2nd line: **Versed 0.02 mg/kg/hr** titrate\n- **Vecuronium** as bridge to other therapies and/or ECMO',
            },
            {
                heading: 'Initial ventilator settings (PRVC)',
                emphasis: 'info',
                body: '- **PEEP 3-4 cm H₂O**\n- **Rate 50-60**\n- I-time 0.15-0.2 sec\n- **TV 3-4 mL/kg**\n- Pressure limits to keep **PIP < 25**',
            },
            {
                heading: 'HFOV settings (when transitioned)',
                emphasis: 'warn',
                body: '- **MAP 10-13** (max 15)\n- **Hz 8**\n- Goal expansion: **8 ribs on contralateral side**\n- Start amplitude based on chest wiggle / hypercapnea (24-40+)',
            },
            {
                heading: 'Optimal physiologic targets',
                emphasis: 'success',
                body: '- **Preductal SaO2 ≥ 85%** (10 min - 2 hr: ≥80%)\n- **Postductal SaO2 ≥ 70%**\n- pH > 7.25\n- **pCO2 45-65** (permissive)\n- Preductal pO2 50-80\n- UOP > 1 mL/kg/hr; lactate < 3\n- **MAP goal 35-45** (higher 50-60 if PAH with R→L shunt + low preductal as bridge)',
            },
            {
                heading: 'ECMO indications',
                emphasis: 'critical',
                body: '- Failed medical management\n- Refractory **hypoxemia (preductal SaO2 < 85%) or hypercapnia (PCO2 > 65)** despite max vent settings\n- Unable to wean from 100% FiO2\n- Persistent air leak\n- Persistent metabolic acidosis (pH < 7.15) and lactate > 3\n- Refractory severe ventricular dysfunction\n- Pressor-resistant hypotension\n- **All ECMO starts as VV** unless contraindicated\n- Relative contraindications: major congenital/chromosomal anomalies, non-repairable congenital heart defects',
            },
            {
                heading: 'Criteria for repair in OR',
                emphasis: 'info',
                body: '- > 1 day of life\n- Optimal vent status (>24 hr on FiO2 <50%, TV>4 on PIP<25, or HFOV MAP<13)\n- Improvement in PH on repeat ECHO 1 day pre-op\n- Normal acid-base, adequate UOP, minimal pressors\n- Significant improvement of anasarca\n- **Off ECMO**\n- Otherwise: bedside repair in NICU at surgeon\'s discretion',
            },
            {
                heading: 'Fluid management',
                emphasis: 'plain',
                body: '- Use blood products if indicated (**keep Hct > 35-40%**)\n- **Avoid albumin**\n- Max NS 10 mL/kg ×1-2 doses\n- Adjust pressors / PAH meds; consider low-dose epi for hypotension or perfusion concerns',
            },
        ],
    },
    {
        ...COMMON,
        id: 'gensurg_lap_appy',
        title: 'Laparoscopic Appendectomy Protocol',
        shortDescription: 'Pre-load → induction → maintenance with TAP/local + multimodal PONV/analgesia.',
        tags: ['appendectomy', 'lap appy', 'tap block', 'rsi', 'dexmedetomidine', 'desflurane', 'bis'],
        emergency: false,
        sections: [
            {
                heading: 'Pre-op',
                emphasis: 'info',
                body: '- **Midazolam 0.05-0.1 mg/kg (max 2 mg) prn**\n- Fluid load: **10 mL/kg**',
            },
            {
                heading: 'Induction',
                emphasis: 'plain',
                body: '- **Lidocaine 1 mg/kg**\n- **Propofol 2-3 mg/kg**\n- **Fentanyl 2-3 mcg/kg**\n- NMBA: **succinylcholine or rocuronium for RSI**\n- Small doses of non-depolarizing NMBA prn for intra-op relaxation',
            },
            {
                heading: 'Maintenance',
                emphasis: 'plain',
                body: '- Additional fluid load **10-20 mL/kg**\n- Local infiltration of port sites by surgeon OR **TAP block by anesthesia**\n- **Dexamethasone 0.1 mg/kg (max 4 mg)**\n- **Ondansetron 0.15 mg/kg (max 8 mg)**\n- Desflurane titrated to **BIS 40-60**\n- **Dexmedetomidine 1 mcg/kg over 5 min**\n- **Acetaminophen 15 mg/kg (max 1000 mg)**\n- **Ketorolac 0.5 mg/kg (max 30 mg) at end of case** pending surgeon approval\n- Lidocaine 1 mg/kg q1h',
            },
            {
                heading: 'Emergence',
                emphasis: 'success',
                body: '- Slow reversal of NMB\n- **Hydromorphone 2-3 mcg/kg IV increments** as needed',
            },
        ],
    },
    {
        ...COMMON,
        id: 'gensurg_ibd_eras',
        title: 'IBD ERAS Checklist',
        shortDescription: 'Carbohydrate prep, regional, opioid sparing, no NG/Foley/PCA, dose table.',
        tags: ['ibd', 'eras', 'colectomy', 'ipaa', 'qab block', 'tap block', 'fluid sparing', 'enoxaparin'],
        emergency: false,
        sections: [
            {
                heading: 'Pre-op patient checklist',
                emphasis: 'info',
                body: '- ERAS instructions (diet, mechanical/oral bowel prep, in-house goals)\n- Maintain physical activity\n- Hydration + carb-rich meals 2 days pre-op\n- Day before: mechanical + oral antibiotic prep + clears + 2 bottles Ensure Clear before midnight\n- NPO at midnight EXCEPT **12-20 oz Gatorade 3 hr pre-op**',
            },
            {
                heading: 'Pre-op meds',
                emphasis: 'plain',
                body: '- **Gabapentin (high dose) PO**\n- **Acetaminophen PO**\n- **Aprepitant PO**\n- Consider regional:\n  - **Unilateral QL or TAP** for stoma cases\n  - **Bilateral QL or TAP** for SILS midline single-incision\n  - **Epidural for open cases**',
            },
            {
                heading: 'Intra-op meds + management',
                emphasis: 'warn',
                body: '- **Minimize opioids (< 0.3 mg/kg IV morphine equivalents)**\n- Ketamine bolus + continuous infusion\n- Ketorolac IV; PONV ppx (Dex IV + Ondansetron IV)\n- Heparin SubQ after regional block placement (if applicable)\n- Maintain euvolemia; **for laparoscopic, limit to 2 mL/kg/hr**\n- **Avoid NG/OG tube + Foley catheter**',
            },
            {
                heading: 'Post-op (ERAS order set)',
                emphasis: 'plain',
                body: '- **Fluid sparing to 1 mL/kg/hr**\n- Ambulate POD#0 ×1, then BID+ daily\n- **No PCA**\n- Pain control: acetaminophen + ketorolac + standard-dose gabapentin\n- Multimodal: ondansetron, oxycodone PO if uncontrolled (PO preferred)\n- Nutrition: clears POD#0 → stop IVF after first 300 mL PO → soft diet + Ensure Plus POD#1\n- VTE ppx: enoxaparin if <12 yo, heparin SubQ if >12 yo',
            },
            {
                heading: 'Dose table',
                emphasis: 'info',
                body: '- **Acetaminophen** PO/IV: 15 mg/kg (max 1000 mg) q6h\n- **Aprepitant** PO: 40 mg (1-3 mg/kg) ×1\n- **Enoxaparin** SubQ: 0.5 mg/kg (max 30 mg) BID (qday if epidural in place); discussion POD#1 if <12\n- **Gabapentin** PO: high dose 10 mg/kg (max 600 mg) TID; standard 5 mg/kg (max 300 mg) TID\n- **Ibuprofen** PO: 10 mg/kg (max 600 mg) q6h\n- **Ketamine** IV: 0.5 mg/kg bolus → 0.25 mg/kg/hr continuous\n- **Ketorolac** IV: 0.5 mg/kg (max 30 mg) q6h\n- **Ondansetron** PO/IV: 0.15 mg/kg (max 4 mg) q6h PRN\n- **Oxycodone** PO: 0.05 mg/kg (max 5 mg) q6h PRN',
            },
            {
                heading: 'Discharge',
                emphasis: 'success',
                body: '- Tolerate PO; flatus or BM; pain well-controlled\n- Home Rx: acetaminophen prn, ibuprofen prn, gabapentin (limit 3 days, surgeon preference), ondansetron prn, **probiotics for s/p colectomy IPAA (Visbiome or VSL #3)**',
            },
        ],
    },
    {
        ...COMMON,
        id: 'gensurg_bariatric',
        title: 'Robotic Bariatric Surgery — Anesthesia + ERAS',
        shortDescription: 'Bariatric/metabolic surgery: opioid-sparing TIVA-adjuncts; no Foley; PCV-VG; TAP blocks.',
        tags: ['bariatric', 'metabolic surgery', 'robotic', 'eras', 'pcv-vg', 'tap', 'gastric bypass', 'sleeve'],
        emergency: false,
        sections: [
            {
                heading: 'Pre-op (ERAS)',
                emphasis: 'info',
                body: '- Patient in pre-op area **2 hr before procedure**\n- **20 oz Gatorade or electrolyte drink 2 hr pre-op**; no other fluids/solids for 8 hr\n- **Gabapentin 10 mg/kg PO (max 600 mg)** pre-op\n- Scopolamine patch + **Aprepitant 40 mg PO** pre-op\n- Standard pre-anesthesia eval, special attention to difficult-airway risks',
            },
            {
                heading: 'Induction + airway',
                emphasis: 'warn',
                body: '- IV induction: **propofol + fentanyl or remifentanil**\n- Airway: ETT — consider routine **video laryngoscopy** to mitigate unanticipated difficult airway\n- Succinylcholine if difficult airway concerns\n- NMB: **vecuronium or rocuronium** with TOF if positioning allows; redose prn',
            },
            {
                heading: 'Intra-op meds',
                emphasis: 'plain',
                body: '- **Dexamethasone 0.25 mg/kg (max 10 mg)** after induction; repeat at end if case > 6 hr\n- BIS monitor after induction\n- **Fentanyl 2-4 mcg/kg pre-incision** + **remifentanil 0.05-0.3 mcg/kg/min** for hemodynamic stability\n- Desflurane or sevoflurane, **BIS 40-60**\n- Adjuncts (DC when trocar removed):\n  - **Ketamine**: 0.5 mg/kg bolus → 0.25 mg/kg/hr\n  - **Dexmedetomidine**: 0.5 mcg/kg bolus → 0.3 mcg/kg/hr\n  - **Lidocaine**: 1 mg/kg bolus → 20 mcg/kg/min (max 2 mg/min)\n- Consider **PCV-VG** on Avance machine',
            },
            {
                heading: 'Monitoring + positioning',
                emphasis: 'plain',
                body: '- Maintain normothermia\n- **No Foley catheter; axillary temp probe only; no esophageal stethoscope/temp**\n- Pad pressure points (foam, Z-flow); extremities neutral\n- **DVT ppx**: virtually all get SCDs prior to induction',
            },
            {
                heading: 'Fluids',
                emphasis: 'warn',
                body: '- **Limit isotonic fluids to 2 L**\n- Use **5% albumin** if needed\n- Maintain **zero fluid balance**',
            },
            {
                heading: 'End of case',
                emphasis: 'plain',
                body: '- **Ketorolac 30 mg + acetaminophen 1000 mg** after surgical manipulation complete (discuss ketorolac with attending surgeon)\n- Metoclopramide 10 mg IV when requested\n- Ondansetron 0.15 mg/kg (max 8 mg)\n- **Pain team consultation for TAP blocks** before emergence\n- Reversal with **sugammadex** + extubation',
            },
            {
                heading: 'Post-op',
                emphasis: 'success',
                body: '- PACU: intermittent **hydromorphone 0.25 mg PRN**\n- **Acetaminophen 1000 mg IV q6h alternating with ketorolac 30 mg IV q6h**\n- Transition to **PO acetaminophen 1000 mg + ibuprofen 600 mg q6h** to complete 48 hr\n- Continue **gabapentin 300 mg PO q6h × 48 hr**\n- Oxycodone 5-10 mg PO q4h prn\n- Ambulation per surgical service; SCDs; incentive spirometry from PACU',
            },
        ],
    },
];
