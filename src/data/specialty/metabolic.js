// Metabolic / Genetic Disorders hub — catalog entries.
// Source: NCH Sharepoint / Metabolic & Genetic Disorders /
//   - Anesthesia Guidelines for Ketogenic Diet_Aug 2023.pdf
//   - MCAD surgical care guidelines.docx
//   - Mitochondrial Disorder Guidelines.docx
//   - Mastocystosis recommendations.pdf (extracted empty — placeholder)
//   - Venezuelan Heritage_mtND4 NCH protocol. Jan. 30 2026.docx (long, detailed)

const COMMON = {
    hub: 'metabolic',
    kind: 'catalog',
    weightAware: false,
    ageRules: null,
    source: 'NCH Sharepoint / Metabolic & Genetic',
    lastReviewed: '2026-04',
};

export const entries = [
    {
        ...COMMON,
        id: 'metabolic_ketogenic_diet',
        title: 'Ketogenic Diet — Periop Anesthesia',
        shortDescription: 'Limit carbs from meds <1-2 g/d; sugar-free APAP/ibuprofen; D5W only for hypoglycemia.',
        tags: ['ketogenic diet', 'kd', 'epilepsy', 'sugar-free', 'beta-hydroxybutyrate', 'plasma-lyte', 'normosol', 'sufentanil avoid'],
        emergency: false,
        sections: [
            {
                heading: 'Concerns',
                emphasis: 'info',
                body: '- Impact of KD on acid-base + serum electrolytes\n- Choice of IV fluids + their impact on acid-base\n- **Alteration of ketogenic state by glucose** in IV fluids or medications (oral and IV)\n- Risk of hypoglycemia\n- Impact of ketosis + acidosis on cardiovascular function\n- **Most oral preparations contain carbohydrate** — evaluate individually\n- **Goal: limit carbs from meds to 1-2 g/day** (Lexicomp has carb content; pharmacist verify)',
            },
            {
                heading: 'Pre-op',
                emphasis: 'plain',
                body: '- Continue home AED regimen incl. day-of-surgery doses (consult neurology/pharmacy if NPO blocks dosing)\n- **Blood glucose on arrival** to surgery unit\n- Pre-op sedation: IV midazolam given orally in non-glucose solution OR intranasal midazolam/dexmedetomidine\n- **Sugar-free liquid acetaminophen + ibuprofen available** — must be ordered as such (main pharmacy)',
            },
            {
                heading: 'Induction + IV fluids',
                emphasis: 'warn',
                body: '- Mask or IV induction\n- IV fluids: 0.9% NS, LR, **Plasma-Lyte, Normosol-R** all used\n  - **LR lactate may theoretically impact ketosis**\n  - Plasma-Lyte or Normosol-R **preferred for longer cases** (avoid dilutional acidosis)',
            },
            {
                heading: 'Maintenance',
                emphasis: 'warn',
                body: '- Inhalational or IV maintenance per anesthesia team\n- **Sufentanil can ONLY be made in D5W** — use alternative opioid infusion\n- Most other infusions can be mixed in NS — consult pharmacy\n- Short cases: 0.9% NS preferred\n- Cases > 3 hr or significant fluid shifts: consider 2% buffered hypertonic saline, Plasma-Lyte, Normosol-R, OR pharmacy-prepared 0.9% saline with ½ chloride + ½ acetate',
            },
            {
                heading: 'Glucose + acid-base targets',
                emphasis: 'critical',
                body: '- **Ideal blood glucose: 50-80 mg/dL**\n- **Hypoglycemia < 40 mg/dL**: small doses of glucose-containing solution (e.g. **10% glucose**) — careful to avoid significant glucose elevation\n- **pH > 7.2 generally well-tolerated**, no treatment\n- **pH < 7.2** OR **pH > 7.2 + clinical hemodynamic deterioration**: IV bicarbonate',
            },
            {
                heading: 'Recovery',
                emphasis: 'plain',
                body: '- Blood glucose on arrival to PACU\n- Cases > 3 hr: send serum electrolytes + blood gas\n- Consider **beta-hydroxybutyrate level** for primary team if patient admitted',
            },
        ],
    },
    {
        ...COMMON,
        id: 'metabolic_mcad',
        title: 'MCAD Deficiency — Periop Care',
        shortDescription: 'Children <2 yr can\'t fast >8 hr; D10W at maintenance + L-carnitine 25-50 mg/kg q6h.',
        tags: ['mcad', 'medium chain acyl-coa', 'fatty acid oxidation', 'l-carnitine', 'd10w', 'newborn screen', 'metabolic decompensation'],
        emergency: false,
        sections: [
            {
                heading: 'Background',
                emphasis: 'info',
                body: '- MCAD = autosomal recessive disorder of fatty acid β-oxidation, ~1:10,000 newborns\n- Part of Ohio expanded newborn screening — most NCH infants diagnosed shortly after birth\n- Episodes of metabolic decompensation: hypoglycemia, acidosis, hyperammonemia, coma — precipitated by infection, stress, **fasting**\n- **Children < 2 yr should not fast > 8 hr** (less if stressed or ill)\n- Potentially lethal if unrecognized',
            },
            {
                heading: 'Coordination',
                emphasis: 'warn',
                body: '- Surgeon\'s office must notify Metabolic Service ASAP (Metabolic Nurse Kim Regis at **614-722-3543**)\n- Metabolic service provides written recs to PAT for outpatient surgery\n- **All outpatient surgery in Main OR — NOT candidates for Outpatient Surgery Center**',
            },
            {
                heading: 'Fasting + IV plan',
                emphasis: 'critical',
                body: '- Outpatient procedures: regular fasting OK (no milk/solids 8 hr; clears 2 hr — Pedialyte, apple juice, sprite)\n- **At time of NPO**: start IV infusion of **D10W at maintenance rate**\n- **Continue IV after surgery** until adequate (normal) PO intake demonstrated',
            },
            {
                heading: 'L-carnitine',
                emphasis: 'warn',
                body: '- **L-carnitine 25-50 mg/kg IV** prior to surgery\n- **Q6h afterwards** as long as IV fluids required',
            },
            {
                heading: 'Glucose monitoring',
                emphasis: 'plain',
                body: '- Pre- and post-op blood sugar checks\n- **Q2h monitoring if recovery from anesthesia is prolonged**\n- Prolonged stay or slow wake → consider admission under Metabolic Service for prolonged observation',
            },
            {
                heading: 'When to admit',
                emphasis: 'info',
                body: 'Patients with complicating medical factors, history of severe previous decompensation, or requiring extensive surgery → **admit to Metabolic (Genetics) service** for medical management.',
            },
        ],
    },
    {
        ...COMMON,
        id: 'metabolic_mitochondrial',
        title: 'Mitochondrial Disorder Guidelines',
        shortDescription: 'D5/D10 at 1.25-1.5× maintenance; AVOID LR; volatile MAC reduced for complex 1 deficits.',
        tags: ['mitochondrial', 'complex i', 'sevoflurane', 'propofol', 'l-carnitine', 'lactic acidosis', 'avoid lr', 'antioxidant'],
        emergency: false,
        sections: [
            {
                heading: 'Treatment principles',
                emphasis: 'info',
                body: '- Keep patients well-hydrated\n- Provide sufficient anabolic substrate\n- Correct secondary metabolic derangements\n- **Avoid pharmacological mitochondrial toxins**\n- Provide cofactor and/or salvage therapies',
            },
            {
                heading: 'IV fluids + substrate',
                emphasis: 'critical',
                body: '- **Dextrose 5% or 10%** at **1.25-1.5× maintenance rate**\n- Consider higher dextrose if not correcting; add insulin if hyperglycemic (insulin = potent anabolic hormone)\n- **NEVER use Lactated Ringer\'s**\n- Once initial crisis passes: enteral feeding; protein once hyperammonemia resolved; lipids if no fatty-acid oxidation defect\n- Continue IV until normal PO intake (deter catabolism, not just dehydration)',
            },
            {
                heading: 'Lab targets',
                emphasis: 'warn',
                body: '- Routine chemistries, CBC, liver function, **ammonia, glucose, ketosis, lactic acidosis** — monitor + correct\n- **pH < 7.22 or HCO3 < 14**: NaHCO3 1 mEq/kg bolus → continuous infusion\n- Hyperammonemia: occurs from secondary urea cycle inhibition; **level > 200 µM may require salvage therapy or dialysis**\n- Aggressively treat infection + fever',
            },
            {
                heading: 'L-carnitine + antioxidants',
                emphasis: 'plain',
                body: '- **L-carnitine IV ≥ 100 mg/kg/day** during acute illness (up to 300 mg/kg/day used)\n- If patient on higher home oral dose, use that dose IV\n- Continue home supplements + antioxidants PO if possible',
            },
            {
                heading: 'Medications to avoid',
                emphasis: 'critical',
                body: '- **Generally avoid during illness**: valproic acid, statins, aminoglycoside antibiotics, erythromycin\n- Use with extreme caution long-term\n- No absolute contraindications — alternatives if no prior adverse reaction\n- Long-term: select anti-HIV, traditional neuroleptics, select chemo agents may worsen mitochondrial function',
            },
            {
                heading: 'Anesthesia considerations',
                emphasis: 'warn',
                body: '- **Increased sensitivity to volatile agents** — much lower dose to achieve BIS < 60 (especially complex 1 deficiency)\n- **Sevoflurane recommended** (volatile of choice)\n- **Propofol**: safe for brief sedation < 30-60 min; limit propofol to short procedures',
            },
            {
                heading: 'Fasting + surgery',
                emphasis: 'plain',
                body: '- Pre- and post-op: dextrose-containing IV to prevent catabolism\n- Continue IV until time of discharge\n- **Never LR**\n- Monitor chemistry, CBC, liver function, ammonia, glucose, ketosis, lactic acidosis',
            },
        ],
    },
    {
        ...COMMON,
        id: 'metabolic_mtnd4_venezuelan',
        title: 'mtND4 Variant — Venezuelan Heritage Action Plan',
        shortDescription: 'Severe neuro injury after sevo in mtND4 patients of Venezuelan ancestry. TIVA + flush machine.',
        tags: ['mtnd4', 'venezuelan', 'sevoflurane avoid', 'tiva', 'remimazolam', 'ketamine', 'dexmedetomidine', 'mitochondrial', 'genetic flag'],
        emergency: true,
        sections: [
            {
                heading: 'Brief context',
                emphasis: 'critical',
                body: '~25 worldwide cases of otherwise healthy patients of **Venezuelan descent** developing **severe neurologic impairment / death** after uneventful general anesthesia. All share the **mitochondrial DNA variant MT-ND4:m.11232 T<C** (affects complex I of electron transport chain). Patients are **healthy until exposed to a triggering anesthetic** → rapid neuronal necrosis (basal ganglia + cerebellum). Reported in USA, Venezuela, Colombia, Chile, Guyana, Germany, Spain.',
            },
            {
                heading: 'Who is at risk',
                emphasis: 'warn',
                body: '- Patients with **maternal Venezuelan ancestry**\n- Family history of: delayed emergence, neurologic impairment, unexplained death after anesthesia\n- Personal history: unexplained delayed emergence, neurologic complications post-anesthesia\n- No prior anesthetic history',
            },
            {
                heading: 'PAT screening sequence',
                emphasis: 'info',
                body: '- Family history reviewed first — if positive → ask about maternal Venezuelan heritage\n- If yes to both → flag in EPIC as **"Maternal Venezuelan Heritage"** (similar to MH flag for DOS)\n- Inform family of risks (severe neurologic injury, death)\n- High-risk + family declines → consider delaying/cancelling elective surgery + refer for genetics workup',
            },
            {
                heading: 'Pre-op',
                emphasis: 'warn',
                body: '- Schedule in **Main OR** (non-propofol TIVA availability + post-op risk)\n- Outpatient/OPB scheduling OK based on case + comorbidities\n- **Document baseline neurologic exam**\n- **Limit NPO** (no more than 8h meal / 6h light meal-formula / 4h breastmilk / 1h clears)\n- Premed: PO/IN midazolam, IN dexmed, or IV midazolam acceptable\n- Pre-op IV preferred (alternatives: nitrous IV or ketamine IM)\n- **Baseline POCT glucose, electrolytes, lactic acid**\n- **D5-NS** start; **avoid LR**',
            },
            {
                heading: 'Intra-op — flush + contraindications',
                emphasis: 'critical',
                body: '- **Flush anesthesia machine, disconnect vaporizers, attach charcoal filters** (similar to MH precautions)\n- **Contraindicated**: Sevoflurane, other halogenated anesthetics, **succinylcholine, atropine, metoclopramide**\n- **Contraindicated fluids**: Lactated Ringer\'s\n- **Consider regional / neuraxial when possible**\n- TIVA combinations: dexmedetomidine + opioids + ketamine + benzodiazepines + nitrous oxide',
            },
            {
                heading: 'Medication safety table',
                emphasis: 'warn',
                body: '- **Likely safe**: midazolam boluses, dexmedetomidine, fentanyl, remifentanil, ketamine, rocuronium + sugammadex, lidocaine, bupivacaine, ropivacaine, acetaminophen\n- **Uncertain**: remimazolam (no Venezuelan-specific data, but emerging evidence shows minimal mitochondrial activity), propofol (in vitro shows no triggering, but no published clinical evidence), etomidate\n- **Avoid**: sevoflurane/desflurane/isoflurane, **succinylcholine, atropine, neostigmine**, atracurium/cisatracurium/mivacurium, **ibuprofen/naproxen**, **metoclopramide/domperidone**, valproic acid, metformin, aminoglycosides, linezolid, macrolides, tetracyclines, pentobarbital',
            },
            {
                heading: 'Suggested TIVA dosing',
                emphasis: 'info',
                body: '- **Remifentanil**: start 0.2 mcg/kg/min, titrate 0.1-0.5 mcg/kg/min\n- **Dexmedetomidine**: 1 mcg/kg over 10 min bolus → 1-2 mcg/kg/hr\n- **Ketamine**: 1-2 mg/kg bolus → 0.2-0.5 mg/kg/hr (or 0.2-0.5 mg/kg q1h, stop ≥ 30 min before extubation)\n- **Remimazolam < 40 kg**: 50-200 mcg/kg bolus (max 5 mg) → 15-30 mcg/kg/min infusion\n- **Remimazolam > 40 kg**: 5 mg bolus, then 2.5 mg q2min until LOC → 15-30 mcg/kg/min\n- **Optimal BIS for remimazolam: 60-70 range**\n- Use rocuronium + sugammadex when paralytic needed',
            },
            {
                heading: 'Intra-op monitoring',
                emphasis: 'plain',
                body: '- Processed EEG (BIS) encouraged but not mandatory (ketamine + remimazolam can artificially elevate BIS)\n- **Continue D5-NS intraoperatively**\n- Long cases: monitor glucose, electrolytes, lactic acid\n- **Avoid**: hypotension, hypothermia, hyperthermia, hypoxia, hyperoxia, hypocapnia, hypercapnia\n- **Quantitative twitch monitoring** during case + reversal\n- **Reverse NMB with sugammadex**\n- Avoid anemia (consider RBC if Hb < 8)',
            },
            {
                heading: 'Post-op',
                emphasis: 'warn',
                body: '- Close monitoring of emergence\n- Ensure proper NMB reversal\n- **No extubation until adequate respiratory function + neurologically intact**\n- **Delayed emergence**: rule out residual anesthetic; monitor glucose/electrolytes/lactic acid; look for metabolic + lactic acidosis\n- **No wake-up or abnormal CT**: activate **Neurology response early** (CT, rapid response, ICU + Neurology consult)\n- Suspected case: report to **Anesthesia Incident Reporting System (AIRS)** at AQI; collect blood in lavender tube; order "DNA extraction/storage" with HOLD pending family consent for genetic testing; contact Genetics',
            },
        ],
    },
    {
        ...COMMON,
        id: 'metabolic_mastocytosis_pointer',
        title: 'Mastocytosis Recommendations',
        shortDescription: 'PDF extracted empty (image-only) — see Sharepoint original.',
        tags: ['mastocytosis', 'mast cell', 'tryptase', 'histamine', 'flushing'],
        emergency: false,
        sections: [
            {
                heading: 'Source not yet transcribed',
                emphasis: 'warn',
                body: 'The "Mastocytosis recommendations.pdf" returned no extractable text (image-only). Open the original under `original_pictures/Sharepoint/Metabolic & Genetic Disorders/` for the full NCH protocol. Common bedside themes (verify against source): avoid histamine-releasing drugs (atracurium, morphine), pre-medicate with H1 + H2 blocker, dexamethasone, have epinephrine ready, watch for anaphylactoid reactions, tryptase if reaction occurs.',
            },
        ],
    },
];
