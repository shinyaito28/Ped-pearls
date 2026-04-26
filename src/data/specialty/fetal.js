// Fetal / Maternal hub — catalog entries (flowcharts shipped separately).
// Source: NCH Sharepoint / Fetal Medicine /
//   - Current Guidelines for Maternal-Fetal Interventions_March 2026.pdf (master 22-page guide)

const COMMON = {
    hub: 'fetal',
    kind: 'catalog',
    weightAware: false,
    ageRules: null,
    source: 'NCH Sharepoint / Fetal Medicine',
    lastReviewed: '2026-04',
};

export const entries = [
    {
        ...COMMON,
        id: 'fetal_common_prep',
        title: 'Common Pre-Op + Hand-off (every fetal case)',
        shortDescription: 'Aspiration ppx, drug kit, hemorrhage kit, PACU distraction-free zone.',
        tags: ['fetal prep', 'aspiration ppx', 'sodium citrate', 'metoclopramide', 'famotidine', 'distraction free zone', 'pacu'],
        emergency: false,
        related: ['flow_maternal_fetal', 'flow_emergency_cesarean', 'fetal_med_kit'],
        sections: [
            {
                heading: 'Pre-op assessment',
                emphasis: 'info',
                body: '- Anesthesia evaluation by fetal team member or case anesthesia team\n- Full assessment incl. airway exam + regional landmarks\n- Discuss risks/benefits\n- Maternal studies typically include CBC, electrolytes, EKG, type & screen, CXR/US (per maternal comorbidities)\n- **Confirm fetal info**: estimated GA, EFW, multiple/singleton, prior procedures (amnioreduction, shunt), fetal ECHO, karyotype, US/MRI findings',
            },
            {
                heading: 'Day-of pre-op',
                emphasis: 'info',
                body: '- Aspiration ppx (MFM orders): **Metoclopramide 10 mg IV + Famotidine 20 mg IV + Sodium Citrate (Bicitra) 30 mL PO**\n- IV(s) typically placed by OB team prior to OR\n- IV midazolam usually given prior to OR (mother\'s preference)\n- Confirm blood products ordered: 4 U PRBC type & cross for mother; **15-20 mL/kg O-neg PRBC for fetus** as appropriate; 2 U PRBC for fetus if ECMO possible; 15 mL/kg platelets + FFP if vascular surgery or tumor',
            },
            {
                heading: 'Equipment set-up',
                emphasis: 'plain',
                body: '- Maternal: video laryngoscopy (standard of care for OB), maternal airway equipment, fluid warmer with NS, IV pole + Alaris pumps\n- Troop elevation pillow as needed\n- Fetal Anesthesia Drug Kit from main OR Pyxis\n- Fetal-specific: buretrol for fetal IV, transfusion tubing/filter, fetal airway (multiple oral ETT sizes + stylet), sterile Ambu bag, 2nd O2 tank, 2nd pulse ox cable with sterile probe cover',
            },
            {
                heading: 'Hemorrhage kit (always available in OR)',
                emphasis: 'critical',
                body: 'OB nurses have it (main OR Pyxis + Delta PACU Pyxis):\n- **Carboprost (Hemabate) 0.25 mg IM** — avoid in asthma\n- **Methylergonovine (Methergine) 0.2 mg IM/IV/intrauterine** — avoid in HTN\n- **Misoprostol (Cytotec) 800 mcg PV or PR** (given by fetal RN)',
            },
            {
                heading: 'PACU + post-op',
                emphasis: 'info',
                body: '- Patients return to **Delta PACU bed 37**\n- "Distraction-free zone" on arrival; limit staff in room\n- PACU RNs place maternal monitors; OB RNs place fetal monitors\n- Hand off when PACU RNs ready\n- If epidural in place: verify continuous + PCEA doses with PACU RN, connect & start, **document sensory level**, communicate with pain team prior to discharge',
            },
        ],
    },
    {
        ...COMMON,
        id: 'fetal_med_kit',
        title: 'Fetal Anesthesia Drug Kit (Pyxis contents)',
        shortDescription: 'Drugs in the fetal kit, uterotonics, tocolytics, fetal cocktail, emergency drugs.',
        tags: ['fetal cocktail', 'fetal kit', 'pyxis', 'oxytocin', 'pitocin', 'nitroglycerin', 'terbutaline', 'magnesium', 'duramorph', 'ropivacaine'],
        emergency: false,
        related: ['fetal_common_prep', 'flow_maternal_fetal'],
        sections: [
            {
                heading: 'Fetal Anesthesia Medication Kit (main OR Pyxis)',
                emphasis: 'info',
                body: '- Oxytocin vial (mix 30 U in 500 mL 0.9% NS); pre-made bag also in pharmacy\n- Nitroglycerin 250 mL bottle (200 mcg/mL) — dilute 1 mL in 10 mL NS for **20 mcg/mL**\n- Terbutaline (typically 125-250 mcg SubQ)\n- 1.5% Lidocaine with 1:200,000 epi (for epidural test dose)\n- 2% Lidocaine (for epidural use)\n- 0.2% Ropivacaine (for epidural use)\n- 0.75% Bupivacaine in 8.25% Dextrose (spinal/CSE)\n- Sodium bicarbonate 50 mL (1 mEq/mL) — add 1 mEq per 10 mL 2% Lidocaine for epidural\n- Atropine 1 mg/mL (for fetal cocktail)\n- Vecuronium (reconstitute to 2 mg/mL in NS for fetal cocktail)\n- Calcium gluconate (for fetal emergencies)',
            },
            {
                heading: 'Uterotonics (post-clamp atony)',
                emphasis: 'warn',
                body: '- **Oxytocin 30 U in 500 mL 0.9% NS** — never infuse too quickly (hypotension)\n- Preferred dosing per NCH pharmacy: **5 U bolus over 10 min (500 mL/hr), then 70 mL/hr until bag complete**\n- No IV access: 10 U IM\n- Backup: Carboprost / Methergine / Misoprostol (see Hemorrhage kit)',
            },
            {
                heading: 'Tocolytics + uterine relaxation',
                emphasis: 'warn',
                body: '- **Mg sulfate**: 3-4 g IV bolus over 30 min, then **2 g/hr** infusion (typically 44 g in 500 mL)\n- Terbutaline (Brethine): **125-250 mcg SQ or IV**\n- Nifedipine 20 mg PO q6h (hold if SBP <90 or DBP <50)\n- Indomethacin 50 mg load → 25 mg PO/PR q6h (48-72 hr); GA <32 wk\n- **Nitroglycerin 30-50 mcg per dose IV** for uterine relaxation (boluses; consider infusion for refractory tone)',
            },
            {
                heading: 'Fetal cocktail (use "Fetal Cocktail" order set)',
                emphasis: 'critical',
                body: '- **Mid-gestation**: Fentanyl **10 mcg/kg**, Atropine **20 mcg/kg** (min 0.1 mg, use 1 mg/mL atropine), Vecuronium **0.2 mg/kg** (concentrate to 2 mg/mL)\n- **Delivery (EXIT)**: Fentanyl **5 mcg/kg**, Atropine **20 mcg/kg**, Vecuronium **0.1 mg/kg**\n- Mixed into 2 TB syringes for sterile field hand-off',
            },
            {
                heading: 'Fetal emergency drugs (MFM APN orders)',
                emphasis: 'critical',
                body: '- **Epinephrine 10 mcg/kg in TB syringe ×3** (code dose)\n- **Atropine 20 mcg/kg** (min 0.1 mg) in TB syringe ×3\n- Epinephrine **1 mcg/kg** in TB syringe ×3\n- Calcium gluconate **15-30 mg/kg** in TB syringe ×3 (rarely used)\n- **Heparin 100 U/kg** if ECMO possible',
            },
            {
                heading: 'Maternal infusions (NCH "Anesthesia Fetal Interventions" order set)',
                emphasis: 'plain',
                body: '- Phenylephrine infusion: start **0.1-0.5 mcg/kg/min**\n- Propofol 100 mL bottles for infusion\n- Remifentanil infusion: start **0.1 mcg/kg/min** (sedation)\n- Dexmedetomidine: start **0.5-1 mcg/kg/hr** (sedation)\n- Magnesium sulfate (44 g in 500 mL)\n- Rocuronium/vecuronium + Sugammadex (preferred reversal)\n- Oxytocin pre-made bag\n- 0.2% Ropivacaine (epidural dose at end of case)\n- PF Morphine (Duramorph) — order from pharmacy',
            },
        ],
    },
    {
        ...COMMON,
        id: 'fetal_pain_management',
        title: 'Pain Management Summary (by fetal procedure type)',
        shortDescription: 'Intra-op + post-op pain plan per procedure; epidural duration; Duramorph cautions.',
        tags: ['fetal pain', 'epidural', 'duramorph', 'pcea', 'ropivacaine', 'oxycodone', 'pain service'],
        emergency: false,
        related: ['flow_maternal_fetal', 'fetal_common_prep'],
        sections: [
            {
                heading: 'Pain Service consult criteria',
                emphasis: 'info',
                body: 'Periop Pain Service involved **only** for patients who keep an epidural (mid-gestation) or who receive Duramorph (EXIT or interventions on placental support).',
            },
            {
                heading: 'Minimally Invasive (~17-24 wk, fetoscopic small ports)',
                emphasis: 'plain',
                body: '- Anesthesia: Local + IV sedation OR epidural (depends on placenta/incision)\n- Baby NOT delivered\n- Pain consult: NO\n- Intra-op: ± IV fentanyl, remifentanil infusion, dexmedetomidine infusion\n- Post-op: per surgery/MFM (epidural removed at end of case; no Duramorph)',
            },
            {
                heading: 'Mid-Gestation (~22-26 wk, large incision; goal NOT to deliver)',
                emphasis: 'warn',
                body: '- Anesthesia: GETA + epidural\n- Baby NOT delivered\n- Pain consult: YES\n- Intra-op: IV acetaminophen + fentanyl, remifentanil, thoracic epidural dosed at end of case (local only)\n- **Post-op**: IV acetaminophen 15 mg/kg q6h + epidural ×24-48 hr\n  - **Epidural infusion**: 0.2% Ropivacaine @ 10-12 mL/hr OR Ropivacaine 0.15-0.2% @ 8-10 mL/hr with **PCEA 2 mL q15min (max 18 mL/hr)**',
            },
            {
                heading: 'EXIT-to-Resection (term, baby delivered)',
                emphasis: 'warn',
                body: '- Anesthesia: GETA + epidural; baby delivered\n- Pain consult: YES\n- Intra-op: IV acetaminophen, fentanyl, ± ketorolac; lumbar epidural dosed at end; **epidural morphine (Duramorph) 1-3 mg**\n- Post-op: IV acetaminophen 15 mg/kg q6h + IV ketorolac 15 mg q6h + IV nalbuphine q4h PRN itch/pain + oxycodone PO 5 mg q4h PRN moderate, 10 mg q4h severe pain\n- Epidural usually removed ~4 hr after case; may infuse ×24 hr depending on incision',
            },
            {
                heading: 'EXIT-to-Airway / Cesarean Delivery (term, baby delivered)',
                emphasis: 'warn',
                body: '- Anesthesia: Spinal, CSE, or epidural; baby delivered\n- Pain consult: YES\n- Intra-op: IV acetaminophen ± fentanyl ± ketorolac\n  - **CSE/spinal**: IT fentanyl 10 mcg + neuraxial morphine (0.05-0.15 mg IT or 1-3 mg epidural)\n  - Lumbar epidural dosed at end of case\n- Post-op: same as EXIT-resection (acetaminophen, ketorolac, nalbuphine, oxycodone)\n- Epidural removed ~4 hr; may infuse ×24 hr depending on incision',
            },
            {
                heading: 'Duramorph + oxycodone caution',
                emphasis: 'critical',
                body: '- **Be cautious** with oxycodone within 24 hr of neuraxial morphine (Duramorph)\n- Increased risk of respiratory depression\n- When ordered with "Anesthesia Fetal Intervention" order set, Duramorph order **links to post-op monitoring orders** automatically',
            },
        ],
    },
    {
        ...COMMON,
        id: 'fetal_resuscitation_strategies',
        title: 'Fetal Resuscitation Strategies (intra-op)',
        shortDescription: 'Fetal HR < 110 = distress. Optimize uterine relaxation + maternal hemodynamics first.',
        tags: ['fetal distress', 'fetal hr', 'amnioinfusion', 'fetal resuscitation', 'nitroglycerin', 'uterine relaxation', 'fetal cocktail'],
        emergency: true,
        related: ['flow_maternal_fetal', 'fetal_med_kit'],
        sections: [
            {
                heading: 'Trigger criteria',
                emphasis: 'critical',
                body: '- **Fetal HR < 110 BPM** (normal 140-180)\n- Decreased ventricular filling and/or cardiac dysfunction\n- Normal SpO2 50-70%',
            },
            {
                heading: 'Maneuver sequence',
                emphasis: 'warn',
                body: '- **Optimize uterine relaxation**: increase volatile agent, administer nitroglycerin (20-40 mcg bolus), consider nitroglycerin infusion for refractory tone\n- **Optimize maternal hemodynamics**: BP at or above maternal baseline, left uterine displacement, **100% FiO2**\n- **Amnioinfusion** (rapid infuser run by OB RN) to relieve cord compression and/or reposition fetus\n- IM atropine and/or epinephrine on the field if maneuvers insufficient',
            },
            {
                heading: 'Pre-procedure family decision (mid-gestation, ≥23 wk)',
                emphasis: 'critical',
                body: 'Family decides plan for fetal distress before the procedure. Some mothers opt for Cesarean delivery + full resuscitation; others request no resuscitation. **Confirm and document the chosen plan during pre-op**. Neonatal resuscitation managed by the fetal anesthesia team until NICU arrives.',
            },
            {
                heading: 'EXIT cases (placental support)',
                emphasis: 'warn',
                body: '- Same maneuver sequence as above\n- If maternal distress or persistent fetal distress: delivery may need to happen prior to intervention\n- Transfer fetal care to **2nd anesthesia team and/or NICU**\n- UAC + UVC often placed by NICU team after delivery',
            },
        ],
    },
    {
        ...COMMON,
        id: 'fetal_emergent_cesarean_protocol_crossref',
        title: 'Emergent Cesarean Delivery Protocol — see flowchart',
        shortDescription: 'The standalone "Emergent Cesarean Delivery Protocol" PDF content is fully captured in the interactive flowchart card.',
        tags: ['emergent cesarean', 'protocol', 'cross-link', 'rsi cesarean', 'oxytocin'],
        emergency: true,
        related: ['flow_emergency_cesarean'],
        sections: [
            {
                heading: 'Where this content lives',
                emphasis: 'info',
                body: 'The **"Emergent Cesarean Delivery Protocol_March 2026.pdf"** is the longer 2-page protocol form of the **same content** that\'s already in the interactive **Emergency Cesarean Section Flowsheet** (`flow_emergency_cesarean`) flowchart card.\n\n**For bedside use → open the flowchart card** (interactive: stable vs hemorrhage RSI dose toggle, weight-based calculations, full step sequence). Sections covered there:\n- Pre-procedure (call fetal team, sodium citrate, fetal kit, oxytocin from pharmacy, blood to fridge)\n- Room set-up (machine, video laryngoscopy, troop pillow)\n- RSI doses by maternal stability (propofol/sux vs etomidate/ketamine)\n- Intra-op flow + maintenance hemodynamics (SBP > 100, ephedrine/phenylephrine)\n- **Oxytocin dosing**: 5 U over 10 min (500 mL/hr) → 70 mL/hr until bag complete\n- Backup uterotonics (Methergine, Hemabate, Misoprostol)\n- Post-cord-clamp uterine atony management\n- Emergence + epidural alternative dosing (if time allows)\n\n*This pointer entry exists only to confirm the source file is captured.*',
            },
        ],
    },
];
