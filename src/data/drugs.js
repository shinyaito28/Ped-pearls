// Source: Nationwide Children's Pediatric Anesthesia Pearls (Q. Fisher 1995, M. Corridore & E. Heitmiller 2008,
// M. Corridore & S. Lynch 2021). See `original_pictures/IMG_0061-0068.HEIC`.
// Doses are stored as parseable strings used by `calculateDose()` in `src/utils/calc.js`.
// Special markers: `dose: 'ceftriaxone_check'` (neonate contraindication), `dose: 'apap_iv_age'`
// (Acetaminophen IV branches by neonate/PCA), `max: 'teen_dependent'` (Atropine cap),
// `neonateDose` / `neonateMax` (used when patient is a neonate).

export const drugList = [
    // ============================================================================
    // EMERGENCY / RESUSCITATION
    // ============================================================================
    { name: 'Epinephrine (Cardiac Arrest)', cat: 'Emergency', dose: '10 mcg/kg', note: 'IV/IO, 1:10,000 (0.1 mL/kg). q3-5min. ETT dose 100 mcg/kg.', max: 1000 },
    { name: 'Epinephrine (Anaphylaxis)', cat: 'Emergency', dose: '10 mcg/kg', note: 'IM 1 mg/mL (0.01 mL/kg). Max 0.3-0.5 mg.', max: 500 },
    { name: 'Epinephrine (Vasopressor)', cat: 'Emergency', dose: '2-10 mcg/kg', note: 'IV/IO bolus for hypotension.', max: 1000 },
    { name: 'Epinephrine, Racemic (Neb)', cat: 'Emergency', dose: '0.5 mL', note: '2.5% solution 0.25-0.5 mL in 3 mL NS. Stridor.', max: null },
    { name: 'Atropine (IV/IO)', cat: 'Emergency', dose: '0.01-0.02 mg/kg', note: 'Min 0.1 mg. Bradycardia.', max: 'teen_dependent', min: 0.1 },
    { name: 'Atropine (IM/PO)', cat: 'Emergency', dose: '0.02-0.04 mg/kg', note: 'Min 0.1 mg. Premed/anti-sialagogue.', max: 'teen_dependent', min: 0.1 },
    { name: 'Succinylcholine (IV)', cat: 'Emergency', dose: '1-2 mg/kg', note: 'RSI. Watch hyperkalemia.', max: 150 },
    { name: 'Succinylcholine (IM)', cat: 'Emergency', dose: '4 mg/kg', note: 'IM if no IV access.', max: 200 },
    { name: 'Rocuronium (RSI)', cat: 'Emergency', dose: '0.6-1.2 mg/kg', note: 'IV. Reversible w/ Sugammadex.', max: null },
    { name: 'Adenosine', cat: 'Emergency', dose: '0.1-0.3 mg/kg', note: 'Rapid IV push w/ flush. 0.1 mg/kg 1st (max 6 mg) → 0.2 mg/kg 2nd (max 12 mg) → 0.3 mg/kg. Total ≤ 12 mg / 0.4 mg/kg.', max: 12 },
    { name: 'Calcium Chloride', cat: 'Emergency', dose: '10-15 mg/kg', note: 'IV (central preferred). Slow.', max: 2000 },
    { name: 'Calcium Gluconate', cat: 'Emergency', dose: '30 mg/kg', note: 'IV (peripheral OK). Slow.', max: 3000 },
    { name: 'Sodium Bicarbonate', cat: 'Emergency', dose: '1-2 mEq/kg', note: 'Acidosis or per ABG. Dilute for infants.', max: 50 },
    { name: 'Dantrolene', cat: 'Emergency', dose: '2.5 mg/kg', note: 'MH. Repeat PRN. 1 mg/kg q6h once stable.', max: null },
    { name: 'Lipid Emulsion 20%', cat: 'Emergency', dose: '1.5 mL/kg', note: 'LAST bolus over 1 min. Then 0.25 mL/kg/min. Max 10 mL/kg in 30 min.', max: null },
    { name: 'Vasopressin (Arrest)', cat: 'Emergency', dose: '0.5-1 unit/kg', note: 'Pulseless arrest. Adult 40 units.', max: 40 },
    { name: 'Amiodarone (Bolus)', cat: 'Emergency', dose: '5 mg/kg', note: 'VF/pVT arrest: push. Otherwise over 5-60 min. Max 15 mg/kg or 300 mg.', max: 300 },
    { name: 'Amiodarone (Infusion)', cat: 'Emergency', dose: '5-15 mcg/kg/min', note: 'Maintenance after arrhythmia bolus.', max: null },
    { name: 'Lidocaine (Bolus)', cat: 'Emergency', dose: '1 mg/kg', note: 'IV VF/VT or LA toxicity. Repeat in 5-10 min.', max: 100 },
    { name: 'Lidocaine (Infusion)', cat: 'Emergency', dose: '10-50 mcg/kg/min', note: 'Antiarrhythmic infusion.', max: null },
    { name: 'Naloxone', cat: 'Emergency', dose: '1-10 mcg/kg', note: 'IV/IM/SQ/ETT. Opioid reversal. Titrate; full reversal 10 mcg/kg.', max: null },
    { name: 'Flumazenil', cat: 'Emergency', dose: '1-10 mcg/kg', note: 'IV q1min. Max 1 mg total. Caution: seizure.', max: 1000 },
    { name: 'Potassium Chloride', cat: 'Emergency', dose: '0.5-1 mEq/kg', note: 'IV over 1-2 hr. Hypokalemia.', max: 40 },
    { name: 'Dextrose 25%', cat: 'Emergency', dose: '2 mL/kg', note: 'Hypoglycemia (= 0.5 g/kg). Children.', max: null },
    { name: 'Dextrose 10%', cat: 'Emergency', dose: '5 mL/kg', note: 'Hypoglycemia (= 0.5 g/kg). Neonates/infants.', max: null },
    { name: 'Diphenhydramine', cat: 'Emergency', dose: '1-2 mg/kg', note: 'Anaphylaxis/allergy. Max 50 mg.', max: 50 },
    { name: 'Hydrocortisone', cat: 'Emergency', dose: '2 mg/kg', note: 'Asthma / anaphylaxis / adrenal crisis.', max: 100 },
    { name: 'Methylprednisolone (Asthma)', cat: 'Emergency', dose: '1-2 mg/kg', note: 'Then 0.5-2 mg/kg q6h.', max: 60 },
    { name: 'Methylprednisolone (Cord)', cat: 'Emergency', dose: '30 mg/kg', note: 'Spinal cord protection: 30 mg/kg over 15 min then 5.4 mg/kg/hr.', max: null },
    { name: 'Methylprednisolone (Adrenal)', cat: 'Emergency', dose: '2 mg/kg', note: 'Adrenal supplementation.', max: null },
    { name: 'Albuterol (Neb)', cat: 'Emergency', dose: '0.15 mg/kg', note: 'Min 2.5 mg. Bronchospasm.', max: 5 },
    { name: 'Lorazepam', cat: 'Emergency', dose: '0.1 mg/kg', note: 'IV/IM. Status epilepticus. Max 4 mg.', max: 4 },
    { name: 'Midazolam (IM/IN)', cat: 'Emergency', dose: '0.2 mg/kg', note: 'Seizure / pre-med if no IV.', max: 10 },

    // ============================================================================
    // SEDATION / INDUCTION
    // ============================================================================
    { name: 'Propofol (Induction)', cat: 'Sedation', dose: '2-5 mg/kg', note: 'IV induction. Pain on injection.', max: null },
    { name: 'Propofol (Infusion)', cat: 'Sedation', dose: '75-300 mcg/kg/min', note: 'TIVA maintenance. Standard 10 mg/mL.', max: null },
    { name: 'Ketamine (Induction IV)', cat: 'Sedation', dose: '2 mg/kg', note: 'IV induction. Add atropine 0.02 mg/kg & midazolam 0.1-0.15 mg/kg.', max: null },
    { name: 'Ketamine (Sedation IM)', cat: 'Sedation', dose: '2-3 mg/kg', note: 'IM sedation.', max: null },
    { name: 'Ketamine (GA IM)', cat: 'Sedation', dose: '5-8 mg/kg', note: 'IM general anesthesia.', max: null },
    { name: 'Midazolam (IV)', cat: 'Sedation', dose: '0.05-0.1 mg/kg', note: 'IV increments. Max ~5-10 mg.', max: 5 },
    { name: 'Dexmedetomidine (Load)', cat: 'Sedation', dose: '0.5-2 mcg/kg', note: 'IV over 10 min. DO NOT push.', max: null },
    { name: 'Dexmedetomidine (Maint)', cat: 'Sedation', dose: '0.2-1 mcg/kg/hr', note: 'Maintenance infusion.', max: null },
    { name: 'Dexmedetomidine (Nasal)', cat: 'Sedation', dose: '1-3 mcg/kg', note: 'Intranasal pre-med.', max: null },
    { name: 'Remifentanil (Bolus)', cat: 'Sedation', dose: '0.5-1 mcg/kg', note: 'IV bolus.', max: null },
    { name: 'Remifentanil (Sedation)', cat: 'Sedation', dose: '0.02-0.1 mcg/kg/min', note: 'Sedation rate.', max: null },
    { name: 'Remifentanil (GA)', cat: 'Sedation', dose: '0.2-0.8 mcg/kg/min', note: 'General anesthesia rate.', max: null },
    { name: 'Sufentanil (Bolus)', cat: 'Sedation', dose: '0.1 mcg/kg', note: 'IV bolus.', max: null },
    { name: 'Sufentanil (Infusion)', cat: 'Sedation', dose: '0.1-0.5 mcg/kg/hr', note: 'Maintenance infusion.', max: null },
    { name: 'Etomidate', cat: 'Sedation', dose: '0.3 mg/kg', note: 'IV induction (range 0.2-0.6). Adrenal suppression.', max: null },
    { name: 'Thiopental (Induction)', cat: 'Sedation', dose: '5-8 mg/kg', note: 'IV induction.', max: null },
    { name: 'Thiopental (Increment)', cat: 'Sedation', dose: '0.5-1 mg/kg', note: 'IV maintenance increment.', max: null },
    { name: 'Pentobarbital (IM/PO)', cat: 'Sedation', dose: '2-6 mg/kg', note: 'Max 200 mg.', max: 200 },
    { name: 'Pentobarbital (IV)', cat: 'Sedation', dose: '1-3 mg/kg', note: 'IV titrate.', max: null },
    { name: 'Chloral Hydrate', cat: 'Sedation', dose: '50 mg/kg', note: 'PO sedation (rare).', max: null },

    // ============================================================================
    // PAIN / ANALGESIA
    // ============================================================================
    { name: 'Fentanyl (IV/Intranasal)', cat: 'Pain', dose: '1-2 mcg/kg', note: 'IV/IN increments.', max: null },
    { name: 'Fentanyl (Infusion)', cat: 'Pain', dose: '1-5 mcg/kg/hr', note: 'IV maintenance.', max: null },
    { name: 'Morphine (IV)', cat: 'Pain', dose: '0.1 mg/kg', note: 'IV increments.', max: null },
    { name: 'Morphine (Epidural)', cat: 'Pain', dose: '30 mcg/kg', note: 'Preservative-free. 10-30 mcg/kg.', max: null },
    { name: 'Hydromorphone (IV)', cat: 'Pain', dose: '15-30 mcg/kg', note: 'IV q3-6h (= 0.015-0.03 mg/kg).', max: null },
    { name: 'Hydromorphone (PO/PR)', cat: 'Pain', dose: '50-80 mcg/kg', note: 'PO/PR q3-6h.', max: null },
    { name: 'Methadone', cat: 'Pain', dose: '0.1 mg/kg', note: 'IV/IM/PO/SQ q8-12h. Long acting.', max: null },
    { name: 'Meperidine (Demerol)', cat: 'Pain', dose: '0.3-2 mg/kg', note: 'Postop shivering primarily.', max: null },
    { name: 'Acetaminophen (IV)', cat: 'Pain', dose: 'apap_iv_age', note: 'IV. Neonate ≤2yr 10 mg/kg q6h, ≥2yr 15 mg/kg q6h, ≥50kg 1 g q6h. Max 60-75 mg/kg/day.', max: 1000 },
    { name: 'Acetaminophen (PO)', cat: 'Pain', dose: '10-15 mg/kg', note: 'PO q4-6h.', max: 1000 },
    { name: 'Acetaminophen (PR)', cat: 'Pain', dose: '20-40 mg/kg', note: 'PR initial dose only. Subsequent 10-15 mg/kg.', max: 1300 },
    { name: 'Ketorolac', cat: 'Pain', dose: '0.5-1 mg/kg', note: 'IM/IV load then 0.5 mg/kg q6h. Max 30 mg.', max: 30,
        ageRules: [
            { maxMonths: 6, badge: 'caution', label: '<6 months — generally avoided (renal immaturity, bleeding risk)' }
        ]
    },
    { name: 'Ibuprofen (PO/PR)', cat: 'Pain', dose: '6-10 mg/kg', note: 'q6h.', max: 600,
        ageRules: [
            { maxMonths: 6, badge: 'caution', label: '<6 months — caution (renal immaturity)' }
        ]
    },
    { name: 'Naproxen (PO)', cat: 'Pain', dose: '5-7 mg/kg', note: 'q8-12h.', max: 500,
        ageRules: [
            { maxYears: 2, badge: 'caution', label: '<2 years — generally avoided' }
        ]
    },
    { name: 'Choline Mag Trisalicylate', cat: 'Pain', dose: '10-15 mg/kg', note: 'PO q4-6h (Trilisate).', max: null },
    { name: 'OxyCODONE', cat: 'Pain', dose: '0.1 mg/kg', note: 'PO q4-6h.', max: 10 },
    { name: 'Nalbuphine', cat: 'Pain', dose: '0.1 mg/kg', note: 'IV/IM/SQ.', max: null },
    { name: 'Butorphanol', cat: 'Pain', dose: '10-20 mcg/kg', note: 'IV/IM/intranasal.', max: null },
    { name: 'Tramadol', cat: 'Pain', dose: '1-2 mg/kg', note: 'Not routine in pediatric anesthesia.', max: null,
        ageRules: [
            { maxYears: 12, badge: 'contraindicated', dose: '0 mg/kg', max: 0, label: 'FDA black-box <12 yr (post-tonsillectomy resp depression / death)' }
        ]
    },

    // ============================================================================
    // RELAXANTS / REVERSAL
    // ============================================================================
    { name: 'Rocuronium (IV)', cat: 'Relaxant', dose: '0.6-1.2 mg/kg', note: 'IV intubation.', max: null },
    { name: 'Rocuronium (IM)', cat: 'Relaxant', dose: '1-1.8 mg/kg', note: 'IM if no IV.', max: null },
    { name: 'Rocuronium (Infusion)', cat: 'Relaxant', dose: '4-16 mcg/kg/min', note: 'Maintenance infusion.', max: null },
    { name: 'Vecuronium (IV)', cat: 'Relaxant', dose: '0.1 mg/kg', note: 'IV intubation.', max: null },
    { name: 'Vecuronium (Infusion)', cat: 'Relaxant', dose: '0.1-0.25 mg/kg/hr', note: 'Maintenance infusion.', max: null },
    { name: 'Pancuronium', cat: 'Relaxant', dose: '0.1 mg/kg', note: 'IV. Long acting.', max: null },
    { name: 'Cis-Atracurium (IV)', cat: 'Relaxant', dose: '0.1-0.2 mg/kg', note: 'IV. Hofmann elimination. Redose 0.03 mg/kg.', max: null },
    { name: 'Cis-Atracurium (Infusion)', cat: 'Relaxant', dose: '1-4 mcg/kg/min', note: 'Maintenance infusion.', max: null },
    { name: 'Sugammadex', cat: 'Reversal', dose: '2 mg/kg', note: '2 mg/kg (TOF ≥2), 4 mg/kg (PTC 1-2), 16 mg/kg immediate (Roc only).', max: null },
    { name: 'Neostigmine', cat: 'Reversal', dose: '0.03-0.07 mg/kg', note: 'IV reversal. Give with glycopyrrolate. Max 5 mg.', max: 5 },
    { name: 'Glycopyrrolate', cat: 'Reversal', dose: '15 mcg/kg', note: 'IV with neostigmine (= 0.015 mg/kg).', max: null },

    // ============================================================================
    // CARDIOVASCULAR / PRESSORS
    // ============================================================================
    { name: 'Epinephrine (Infusion)', cat: 'CV', dose: '0.02-1 mcg/kg/min', note: 'Inotrope/pressor. Central preferred.', max: null },
    { name: 'Norepinephrine (Infusion)', cat: 'CV', dose: '0.05-1 mcg/kg/min', note: 'Pressor. Central preferred.', max: null },
    { name: 'Dopamine (Infusion)', cat: 'CV', dose: '2-20 mcg/kg/min', note: 'Inotrope. Vesicant.', max: null },
    { name: 'Dobutamine (Infusion)', cat: 'CV', dose: '2-20 mcg/kg/min', note: 'β1 inotrope.', max: null },
    { name: 'Milrinone (Load)', cat: 'CV', dose: '25-50 mcg/kg', note: 'Load over 20 min. Watch BP.', max: null },
    { name: 'Milrinone (Infusion)', cat: 'CV', dose: '0.25-0.75 mcg/kg/min', note: 'Maintenance. Standard 200 mcg/mL.', max: null },
    { name: 'Ephedrine', cat: 'CV', dose: '0.2-0.3 mg/kg', note: 'IV bolus. Max 10 mg.', max: 10 },
    { name: 'Phenylephrine (Bolus)', cat: 'CV', dose: '5-10 mcg/kg', note: 'IV bolus.', max: null },
    { name: 'Phenylephrine (Infusion)', cat: 'CV', dose: '0.5-20 mcg/kg/min', note: 'IV infusion.', max: null },
    { name: 'Nicardipine (Infusion)', cat: 'CV', dose: '1-5 mcg/kg/min', note: 'Antihypertensive. Adult 2.5-15 mg/hr.', max: null },
    { name: 'Nitroglycerine (Infusion)', cat: 'CV', dose: '0.5-20 mcg/kg/min', note: 'Vasodilator.', max: null },
    { name: 'Nitroprusside (Infusion)', cat: 'CV', dose: '0.5-10 mcg/kg/min', note: 'Vasodilator. Watch cyanide.', max: null },
    { name: 'Esmolol (Load)', cat: 'CV', dose: '500 mcg/kg', note: 'IV load over 2 min, then maintenance.', max: null },
    { name: 'Esmolol (Infusion)', cat: 'CV', dose: '25-300 mcg/kg/min', note: 'Maintenance infusion.', max: null },
    { name: 'Labetalol', cat: 'CV', dose: '0.1 mg/kg', note: 'IV increments.', max: null },
    { name: 'Hydralazine', cat: 'CV', dose: '0.1-0.5 mg/kg', note: 'IV q4h. Max 20 mg/dose. Adult 10-20 mg.', max: 20 },
    { name: 'Vasopressin (Infusion)', cat: 'CV', dose: '0.3-2 mU/kg/min', note: 'Pressor (= 0.0003-0.002 U/kg/min).', max: null },
    { name: 'Vasopressin (DI)', cat: 'CV', dose: '0.5-3 mU/kg/hr', note: 'Diabetes insipidus.', max: null },
    { name: 'Prostaglandin E1', cat: 'CV', dose: '0.05-2 mcg/kg/min', note: 'Ductal-dependent CHD. Watch apnea — start low (0.05 mcg/kg/min) and titrate up.', max: null },
    { name: 'Isoproterenol', cat: 'CV', dose: '0.05-10 mcg/kg/min', note: 'IV β1-chronotrope.', max: null },
    { name: 'Clevidipine (Infusion)', cat: 'CV', dose: '0.5-5 mcg/kg/min', note: 'Lipid-based Ca-channel blocker. Adult 1-21 mg/hr.', max: null },
    { name: 'Phentolamine (Bolus)', cat: 'CV', dose: '0.05-0.1 mg/kg', note: 'α-blocker. Max 5 mg.', max: 5 },
    { name: 'Phentolamine (Infusion)', cat: 'CV', dose: '2-20 mcg/kg/min', note: 'α-blocker infusion.', max: null },
    { name: 'Procainamide (Load)', cat: 'CV', dose: '2-6 mg/kg', note: 'IV q5min up to 15 mg/kg total. Watch QRS.', max: null },
    { name: 'Procainamide (Infusion)', cat: 'CV', dose: '20-80 mcg/kg/min', note: 'Maintenance.', max: null },
    { name: 'Tolazoline (Test)', cat: 'CV', dose: '1 mg/kg', note: 'IV test dose for pulmonary HTN.', max: null },
    { name: 'Tolazoline (Infusion)', cat: 'CV', dose: '15-30 mcg/kg/min', note: 'Pulm HTN infusion.', max: null },
    { name: 'Heparin (Bolus)', cat: 'CV', dose: '50-100 Units/kg', note: 'IV bolus. Follow ACT/PTT.', max: null },
    { name: 'Heparin (Infusion)', cat: 'CV', dose: '10-25 Units/kg/hr', note: 'Maintenance. Follow ACT/PTT.', max: null },
    { name: 'Protamine', cat: 'CV', dose: '1 mg', note: 'Per 100 Units heparin. Slow IV.', max: null },
    { name: 'Propranolol (TET spell)', cat: 'CV', dose: '0.15-0.25 mg/kg', note: 'IV for TET spell.', max: null },
    { name: 'Propranolol (Dysrhythmia)', cat: 'CV', dose: '0.01-0.1 mg/kg', note: 'IV per dose.', max: null },

    // ============================================================================
    // NEURO / SEIZURE
    // ============================================================================
    { name: 'Mannitol (ICP)', cat: 'Neuro', dose: '0.25-1 g/kg', note: 'Slow IV infusion for ICP.', max: null },
    { name: 'Mannitol (Diuresis)', cat: 'Neuro', dose: '1-2 g/kg', note: 'Slow IV infusion for diuresis.', max: null },
    { name: 'Levetiracetam (Keppra)', cat: 'Neuro', dose: '20-50 mg/kg', note: 'IV over 15 min. Adult 1-3 g.', max: 3000 },
    { name: 'Fosphenytoin', cat: 'Neuro', dose: '10-20 mg/kg', note: 'IV PE load over 10-20 min.', max: null },
    { name: 'Phenobarbital', cat: 'Neuro', dose: '15-25 mg/kg', note: 'IV seizure load. Then 4-6 mg/kg/day PO.', max: null },
    { name: 'Diazepam (IV)', cat: 'Neuro', dose: '0.05-0.1 mg/kg', note: 'IV seizure / anxiolysis.', max: 10 },

    // ============================================================================
    // OTHER / SUPPORTIVE
    // ============================================================================
    { name: 'Dexamethasone (Stridor)', cat: 'Other', dose: '0.2-0.5 mg/kg', note: 'Airway edema / stridor. Max 10-12 mg.', max: 12 },
    { name: 'Dexamethasone (PONV)', cat: 'Other', dose: '0.4 mg/kg', note: 'IV PONV prophylaxis.', max: 10 },
    { name: 'Dexamethasone (ICP)', cat: 'Other', dose: '1-2 mg/kg', note: 'Then 0.25-0.35 mg/kg q6h.', max: null },
    { name: 'Ondansetron', cat: 'Other', dose: '0.15 mg/kg', note: 'IV/PO q4h. PONV. Max 4 mg.', max: 4 },
    { name: 'Metoclopramide', cat: 'Other', dose: '0.1 mg/kg', note: 'IV/PO prokinetic.', max: 10 },
    { name: 'Droperidol', cat: 'Other', dose: '15-60 mcg/kg', note: 'IV/IM. Watch QT.', max: null },
    { name: 'Furosemide (Bolus)', cat: 'Other', dose: '0.5-2 mg/kg', note: 'Slow IV (ototoxic).', max: null },
    { name: 'Furosemide (Infusion)', cat: 'Other', dose: '0.1-0.4 mg/kg/hr', note: 'Continuous diuresis.', max: null },
    { name: 'Magnesium Sulfate', cat: 'Other', dose: '25-75 mg/kg', note: 'IV over 30 min. Asthma/torsades. Max 2 g.', max: 2000 },
    { name: 'Insulin (Bolus)', cat: 'Other', dose: '0.1 Units/kg', note: 'IV/SQ. Hyperkalemia/DKA.', max: null },
    { name: 'Insulin (Infusion)', cat: 'Other', dose: '0.1 Units/kg/hr', note: 'IV maintenance.', max: null },
    { name: 'Glucagon', cat: 'Other', dose: '0.1 mg/kg', note: 'Hypoglycemia / β-blocker OD. Max 1 mg.', max: 1 },
    { name: 'Tranexamic Acid (Load)', cat: 'Other', dose: '50-100 mg/kg', note: 'IV load.', max: null },
    { name: 'Tranexamic Acid (Infusion)', cat: 'Other', dose: '5 mg/kg/hr', note: 'Maintenance.', max: null },
    { name: 'Aminocaproic Acid (Load)', cat: 'Other', dose: '100-200 mg/kg', note: 'IV/PO load over 30 min.', max: null },
    { name: 'Aminocaproic Acid (Infusion)', cat: 'Other', dose: '10-33 mg/kg/hr', note: 'Maintenance.', max: null },
    { name: 'Novoseven', cat: 'Other', dose: '90 mcg/kg', note: 'rFVIIa over 2-5 min. Range 35-120 mcg/kg, repeat q2h.', max: null },
    { name: 'DDAVP', cat: 'Other', dose: '0.3 mcg/kg', note: 'IV. Bleeding / DI.', max: null },
    { name: 'Promethazine', cat: 'Other', dose: '0.25-1 mg/kg', note: 'IV/IM/PO q4-6h. Phenergan.', max: 25,
        ageRules: [
            { maxYears: 2, badge: 'contraindicated', dose: '0 mg/kg', max: 0, label: 'CONTRAINDICATED <2 yr (FDA black-box: severe respiratory depression)' }
        ]
    },
    { name: 'Prochlorperazine', cat: 'Other', dose: '0.1-0.15 mg/kg', note: 'PO/IM/PR q6-8h. Compazine.', max: 10 },
    { name: 'Tigan (Trimethobenzamide)', cat: 'Other', dose: '100-200 mg', note: 'PO/PR fixed dose.', max: null },
    { name: 'Dolasetron', cat: 'Other', dose: '0.35 mg/kg', note: 'IV. Anzemet.', max: 12.5 },
    { name: 'Granisetron', cat: 'Other', dose: '10 mcg/kg', note: 'IV/IM. Kytril.', max: null },
    { name: 'Haloperidol', cat: 'Other', dose: '10-30 mcg/kg', note: 'IV/IM.', max: null },
    { name: 'Scopolamine', cat: 'Other', dose: '6 mcg/kg', note: 'IV/IM. Max 0.4 mg.', max: 400 },
    { name: 'Ranitidine (PO)', cat: 'Other', dose: '2 mg/kg', note: 'PO H2 blocker.', max: 150 },
    { name: 'Ranitidine (IV)', cat: 'Other', dose: '1 mg/kg', note: 'IV H2 blocker.', max: 50 },
    { name: 'Oxybutynin', cat: 'Other', dose: '0.1 mg/kg', note: 'PO bladder spasm.', max: null },
    { name: 'Terbutaline (SQ)', cat: 'Other', dose: '5-10 mcg/kg', note: 'SQ q15min × 2. Max 250 mcg.', max: 250 },
    { name: 'Terbutaline (Bolus)', cat: 'Other', dose: '10 mcg/kg', note: 'IV bolus before infusion.', max: null },
    { name: 'Terbutaline (Infusion)', cat: 'Other', dose: '0.2-10 mcg/kg/min', note: 'IV maintenance.', max: null },

    // ============================================================================
    // ANTIBIOTICS
    // ============================================================================
    // Note: many neonate doses are smaller (CDC dosing). q-interval extends if <37 wk PCA.
    { name: 'Cefazolin (Ancef)', cat: 'Antibiotic', dose: '50 mg/kg', neonateDose: '25 mg/kg', note: 'q3h (q6h <37wk PCA). Surgical ppx. Max 2 g.', max: 2000, neonateMax: 2000 },
    { name: 'Cefoxitin', cat: 'Antibiotic', dose: '40 mg/kg', neonateDose: '30 mg/kg', note: 'q3h (q6h <37wk PCA). Max 2 g.', max: 2000 },
    { name: 'Ceftriaxone', cat: 'Antibiotic', dose: 'ceftriaxone_check', note: 'q24h. NEVER under 30 days of age. Max 2 g (1 g for IE ppx).', max: 2000 },
    { name: 'Cefotaxime', cat: 'Antibiotic', dose: '50 mg/kg', note: 'Neonatal sepsis (alt to Ceftriaxone). Max 2 g.', max: 2000 },
    { name: 'Ampicillin', cat: 'Antibiotic', dose: '50 mg/kg', neonateDose: '50 mg/kg', note: 'q3h (q6h <37wk PCA). Max 2 g.', max: 2000 },
    { name: 'Ampicillin/Sulbactam', cat: 'Antibiotic', dose: '50 mg/kg', neonateDose: '50 mg/kg', note: 'q3h (q6h <37wk PCA). Max 2 g.', max: 2000 },
    { name: 'Vancomycin', cat: 'Antibiotic', dose: '20 mg/kg', neonateDose: '15 mg/kg', note: 'q6h (q12h <37wk PCA). Slow IV >1 hr. Max 2 g.', max: 2000 },
    { name: 'Gentamicin', cat: 'Antibiotic', dose: '5 mg/kg', neonateDose: '5 mg/kg', note: 'q24h (q36h <37wk PCA).', max: null },
    { name: 'Metronidazole', cat: 'Antibiotic', dose: '15 mg/kg', neonateDose: '7.5 mg/kg', note: 'q6h (q12h <37wk PCA). Max 1 g.', max: 1000 },
    { name: 'Clindamycin', cat: 'Antibiotic', dose: '20 mg/kg', neonateDose: '10 mg/kg', note: 'q3h (q6h <37wk PCA). Redose 10 mg/kg. Max 900 mg.', max: 900 },
    { name: 'Piperacillin/Tazobactam', cat: 'Antibiotic', dose: '100 mg/kg', neonateDose: '100 mg/kg', note: 'q3h (q6h <37wk PCA). Max 4 g.', max: 4000 },
    { name: 'Nafcillin', cat: 'Antibiotic', dose: '50 mg/kg', neonateDose: '25 mg/kg', note: 'q3h (q6h <37wk PCA). Max 2 g.', max: 2000 },
    { name: 'Ciprofloxacin', cat: 'Antibiotic', dose: '10 mg/kg', neonateDose: '10 mg/kg', note: 'q6h (q6h <37wk PCA). Max 400 mg.', max: 400 },
    { name: 'Amoxicillin (Oral)', cat: 'Antibiotic', dose: '50 mg/kg', note: 'IE prophylaxis 30-60 min before procedure. Max 2 g.', max: 2000 },
    { name: 'Cephalexin (Oral)', cat: 'Antibiotic', dose: '50 mg/kg', note: 'IE prophylaxis. Max 2 g.', max: 2000 },
    { name: 'Azithromycin (Oral)', cat: 'Antibiotic', dose: '15 mg/kg', note: 'IE prophylaxis. Max 500 mg.', max: 500 },
    { name: 'Clarithromycin (Oral)', cat: 'Antibiotic', dose: '15 mg/kg', note: 'IE prophylaxis. Max 500 mg.', max: 500 },
];
