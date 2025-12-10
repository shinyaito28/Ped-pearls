export const drugList = [
    // === EMERGENCY ===
    { name: 'Epinephrine (Cardiac Arrest)', cat: 'Emergency', dose: '10 mcg/kg', note: '1:10,000 (0.1 mL/kg). q3-5min', max: 1000 },
    { name: 'Epinephrine (Anaphylaxis)', cat: 'Emergency', dose: '10 mcg/kg', note: 'IM (max 0.3-0.5 mg). 1mg/mL.', max: 500 }, // Added specific Anaphylaxis entry
    { name: 'Epinephrine (Vasopressor)', cat: 'Emergency', dose: '2-10 mcg/kg', note: 'Bolus for hypotension', max: 1000 },
    { name: 'Atropine', cat: 'Emergency', dose: '0.02 mg/kg', note: 'Min 0.1mg. Bradycardia.', max: 'teen_dependent', min: 0.1 },
    { name: 'Succinylcholine', cat: 'Emergency', dose: '1-2 mg/kg', note: 'IV (IM: 4 mg/kg). RSI.', max: 150 },
    { name: 'Rocuronium', cat: 'Emergency', dose: '0.6-1.2 mg/kg', note: 'RSI / Intubation', max: null }, // Moving/Duplicating to Emergency for visibility if filtered, but usually just cat changes. We'll rely on name matching for groups.
    { name: 'Adenosine', cat: 'Emergency', dose: '0.1 mg/kg', note: 'Rapid push. Max 6mg (1st), 12mg (2nd)', max: 12 },
    { name: 'Calcium Chloride', cat: 'Emergency', dose: '10-20 mg/kg', note: 'Central line preferred. Slow IV.', max: 2000 },
    { name: 'Calcium Gluconate', cat: 'Emergency', dose: '60-100 mg/kg', note: 'Peripheral OK. Slow IV.', max: 3000 }, // Updated dose range
    { name: 'Sodium Bicarbonate', cat: 'Emergency', dose: '1-2 mEq/kg', note: 'Acidosis/TCA. Dilute for infants.', max: 50 },
    { name: 'Dantrolene', cat: 'Emergency', dose: '2.5 mg/kg', note: 'Malignant Hyperthermia. Repeat PRN.', max: null },
    { name: 'Lipid Emulsion 20%', cat: 'Emergency', dose: '1.5 mL/kg', note: 'LAST Bolus. Then 0.25 mL/kg/min.', max: 100 },
    { name: 'Vasopressin (Arrest)', cat: 'Emergency', dose: '0.5-1 unit/kg', note: 'Pulseless Arrest', max: 40 },
    { name: 'Amiodarone (Bolus)', cat: 'Emergency', dose: '5 mg/kg', note: 'VF/VT Arrest / Arrhythmia', max: 300 },
    { name: 'Lidocaine (Bolus)', cat: 'Emergency', dose: '1 mg/kg', note: 'VF/VT / Arrhythmia', max: 100 }, // Added
    { name: 'Naloxone', cat: 'Emergency', dose: '2-10 mcg/kg', note: 'Opioid Reversal. Titrate.', max: null }, // Updated dose
    { name: 'Flumazenil', cat: 'Emergency', dose: '10 mcg/kg', note: 'Benzo Reversal. Max 0.2mg/dose.', max: 200 }, // Updated max single dose
    { name: 'Potassium Chloride', cat: 'Emergency', dose: '0.5-1 mEq/kg', note: 'Hypokalemia. Slow over 1-2h', max: 40 },
    { name: 'Dextrose', cat: 'Emergency', dose: '0.5-1 g/kg', note: 'D10: 5-10 mL/kg, D25: 2-4 mL/kg', max: 25 }, // Added Dextrose
    { name: 'Diphenhydramine', cat: 'Emergency', dose: '1-2 mg/kg', note: 'Anaphylaxis/Allergy. Max 50mg.', max: 50 }, // Added
    { name: 'Hydrocortisone', cat: 'Emergency', dose: '2 mg/kg', note: 'Asthma / Anaphylaxis', max: 100 }, // Added
    { name: 'Albuterol (Neb)', cat: 'Emergency', dose: '0.15 mg/kg', note: 'Min 2.5mg. Asthma.', max: 5 }, // Added
    { name: 'Lorazepam', cat: 'Emergency', dose: '0.1 mg/kg', note: 'Max 4mg. Seizure.', max: 4 }, // Added
    { name: 'Midazolam (IM/IN)', cat: 'Emergency', dose: '0.2 mg/kg', note: 'Seizure / Pre-med', max: 10 }, // Added


    // === SEDATION / INDUCTION ===
    { name: 'Propofol (Induction)', cat: 'Sedation', dose: '2-5 mg/kg', note: 'Induction Bolus. Pain on injection.', max: null },
    { name: 'Propofol (Infusion)', cat: 'Sedation', dose: '75-300 mcg/kg/min', note: 'Maintenance Anesthesia', max: null },
    { name: 'Ketamine (Induction)', cat: 'Sedation', dose: '2 mg/kg', note: 'IV Induction', max: null },
    { name: 'Midazolam (IV)', cat: 'Sedation', dose: '0.05-0.1 mg/kg', note: 'Max 5-10mg', max: 5 },
    { name: 'Dexmedetomidine (Load)', cat: 'Sedation', dose: '0.5-2 mcg/kg', note: 'Load over 10 min', max: null },
    { name: 'Dexmedetomidine (Maint)', cat: 'Sedation', dose: '0.2-1 mcg/kg/hr', note: 'Maintenance Infusion', max: null },
    { name: 'Remifentanil (Bolus)', cat: 'Sedation', dose: '0.5-1 mcg/kg', note: 'IV Bolus', max: null },
    { name: 'Remifentanil (Sedation)', cat: 'Sedation', dose: '0.02-0.1 mcg/kg/min', note: 'Sedation Rate', max: null },
    { name: 'Remifentanil (GA)', cat: 'Sedation', dose: '0.2-0.8 mcg/kg/min', note: 'General Anesthesia Rate', max: null },
    { name: 'Sufentanil', cat: 'Sedation', dose: '0.1 mcg/kg', note: 'IV', max: null },
    { name: 'Etomidate', cat: 'Sedation', dose: '0.2-0.3 mg/kg', note: 'Induction. Adrenal suppression.', max: null },
    { name: 'Thiopental', cat: 'Sedation', dose: '5-8 mg/kg', note: 'Induction', max: null },

    // === PAIN / ANALGESIA ===
    { name: 'Fentanyl', cat: 'Pain', dose: '1-2 mcg/kg', note: 'Analgesia', max: null },
    { name: 'Ketamine (Pain)', cat: 'Pain', dose: '0.25-0.5 mg/kg', note: 'IV Analgesia', max: null },
    { name: 'Acetaminophen (IV)', cat: 'Pain', dose: 'neonate_dependent', note: 'Max 1g (Max 75mg/kg/day)', max: 1000 }, // Special handling
    { name: 'Ketorolac', cat: 'Pain', dose: '0.5 mg/kg', note: 'Max 30mg. q6h', max: 30 },
    { name: 'Morphine', cat: 'Pain', dose: '0.1 mg/kg', note: 'IV Increments', max: null },
    { name: 'Hydromorphone', cat: 'Pain', dose: '15-30 mcg/kg', note: 'IV (0.015-0.03 mg/kg)', max: null },
    { name: 'Methadone', cat: 'Pain', dose: '0.1 mg/kg', note: 'Long acting. q8-12h', max: null },
    { name: 'Meperidine (Demerol)', cat: 'Pain', dose: '0.3-2 mg/kg', note: 'Post-op Shivering', max: null },
    { name: 'Tramadol', cat: 'Pain', dose: '1-2 mg/kg', note: 'Not routine', max: null },

    // === RELAXANTS / REVERSAL ===
    { name: 'Rocuronium', cat: 'Relaxant', dose: '0.6-1.2 mg/kg', note: 'Relaxant', max: null },
    { name: 'Vecuronium', cat: 'Relaxant', dose: '0.1 mg/kg', note: 'Relaxant', max: null },
    { name: 'Cis-Atracurium', cat: 'Relaxant', dose: '0.1-0.2 mg/kg', note: 'Hoffman elimination', max: null },
    { name: 'Sugammadex', cat: 'Reversal', dose: '2-4 mg/kg', note: '2mg/kg (TOF>=2), 4mg/kg (PTC 1-2), 16mg/kg (Imm)', max: null },
    { name: 'Neostigmine', cat: 'Reversal', dose: '0.05 mg/kg', note: 'Max 5mg. Give w/ Glyco.', max: 5 },
    { name: 'Glycopyrrolate', cat: 'Reversal', dose: '0.01 mg/kg', note: 'With Neostigmine', max: null },

    // === CV / PRESSORS ===
    { name: 'Epinephrine Infusion', cat: 'CV', dose: '0.02-1 mcg/kg/min', note: 'Inotrope/Pressor. Central line preferred.', max: null },
    { name: 'Norepinephrine', cat: 'CV', dose: '0.05-1 mcg/kg/min', note: 'Pressor. Central line preferred.', max: null },
    { name: 'Dopamine', cat: 'CV', dose: '2-20 mcg/kg/min', note: 'Inotrope. Vesicant.', max: null },
    { name: 'Dobutamine', cat: 'CV', dose: '2-20 mcg/kg/min', note: 'Inotrope.', max: null },
    { name: 'Milrinone (Load)', cat: 'CV', dose: '50 mcg/kg', note: 'Load over 10-60 min. Watch BP.', max: null },
    { name: 'Milrinone (Infusion)', cat: 'CV', dose: '0.25-0.75 mcg/kg/min', note: 'Maintenance', max: null },
    { name: 'Ephedrine', cat: 'CV', dose: '0.1-0.3 mg/kg', note: 'Bolus. Max 10mg', max: 10 },
    { name: 'Phenylephrine', cat: 'CV', dose: '5-10 mcg/kg', note: 'Bolus', max: null },
    { name: 'Nicardipine', cat: 'CV', dose: '1-5 mcg/kg/min', note: 'Infusion. Antihypertensive.', max: null },
    { name: 'Nitroglycerine', cat: 'CV', dose: '0.5-20 mcg/kg/min', note: 'Vasodilator.', max: null },
    { name: 'Nitroprusside', cat: 'CV', dose: '0.5-10 mcg/kg/min', note: 'Vasodilator. Watch Cyanide.', max: null },
    { name: 'Esmolol (Load)', cat: 'CV', dose: '500 mcg/kg', note: 'Load over 1 min', max: null },
    { name: 'Esmolol (Infusion)', cat: 'CV', dose: '50-300 mcg/kg/min', note: 'Maintenance', max: null },
    { name: 'Labetalol', cat: 'CV', dose: '0.1 mg/kg', note: 'IV increments', max: null },
    { name: 'Hydralazine', cat: 'CV', dose: '0.1-0.5 mg/kg', note: 'Max 20mg', max: 20 },
    { name: 'Vasopressin Infusion', cat: 'CV', dose: '0.3-2 mU/kg/min', note: 'Pressor (0.0003-0.002 U/kg/min)', max: null },
    { name: 'Prostaglandin E1', cat: 'CV', dose: '0.05-0.1 mcg/kg/min', note: 'Ductal dependent lesions. Watch Apnea.', max: null },
    { name: 'Isoproterenol', cat: 'CV', dose: '0.05-10 mcg/kg/min', note: 'Chronotrope', max: null },
    { name: 'Clevidipine', cat: 'CV', dose: '0.5-5 mcg/kg/min', note: 'Ca blocker. Lipid based.', max: null },
    { name: 'Phentolamine', cat: 'CV', dose: '0.05-0.1 mg/kg', note: 'Alpha blocker', max: 5 },
    { name: 'Procainamide', cat: 'CV', dose: '2-6 mg/kg', note: 'Load over 5 min. Watch QRS.', max: null },
    { name: 'Tolazoline', cat: 'CV', dose: '1 mg/kg', note: 'Pulm HTN. Test dose then infusion.', max: null },

    // === NEURO / OTHER ===
    { name: 'Dexamethasone', cat: 'Other', dose: '0.2-0.5 mg/kg', note: 'Max 10-12mg. PONV/Airway edema', max: 12 },
    { name: 'Ondansetron', cat: 'Other', dose: '0.15 mg/kg', note: 'Max 4g. PONV', max: 4 },
    { name: 'Metoclopramide', cat: 'Other', dose: '0.1 mg/kg', note: 'Prokinetic', max: null },
    { name: 'Droperidol', cat: 'Other', dose: '15-60 mcg/kg', note: 'PONV. Watch QT interval', max: null },
    { name: 'Furosemide', cat: 'Other', dose: '0.5-1 mg/kg', note: 'Diuretic. Give slow (ototoxic)', max: null },
    { name: 'Mannitol', cat: 'Neuro', dose: '0.25-1 g/kg', note: 'ICP reduction', max: null },
    { name: 'Levetiracetam', cat: 'Neuro', dose: '20-50 mg/kg', note: 'Seizure (Keppra)', max: null },
    { name: 'Fosphenytoin', cat: 'Neuro', dose: '10-20 mg/kg', note: 'PE load', max: null },
    { name: 'Phenobarbital', cat: 'Neuro', dose: '15-25 mg/kg', note: 'Load', max: null },
    { name: 'Diazepam', cat: 'Neuro', dose: '0.1 mg/kg', note: 'IV. Seizure', max: null },
    { name: 'Magnesium Sulfate', cat: 'Other', dose: '25-75 mg/kg', note: 'Asthma/Torsades. Max 2g. Slow infusion.', max: 2000 },
    { name: 'Methylprednisolone', cat: 'Other', dose: '1-2 mg/kg', note: 'Asthma load', max: null },
    { name: 'Insulin (Regular)', cat: 'Other', dose: '0.1 Units/kg', note: 'Hyperkalemia', max: null },
    { name: 'Glucagon', cat: 'Other', dose: '0.1 mg/kg', note: 'Hypoglycemia/Beta blocker OD', max: 1 },
    { name: 'Tranexamic Acid', cat: 'Other', dose: '50 mg/kg', note: 'Loading dose (High dose protocol)', max: null },
    { name: 'Novoseven', cat: 'Other', dose: '90 mcg/kg', note: 'Factor VIIa', max: null },
    { name: 'Protamine', cat: 'Other', dose: '1 mg', note: 'Per 100 Units Heparin. Slow IV.', max: null },
    { name: 'Promethazine', cat: 'Other', dose: '0.25-1 mg/kg', note: 'Phenergan', max: null },
    { name: 'Prochlorperazine', cat: 'Other', dose: '0.1-0.15 mg/kg', note: 'Compazine', max: null },
    { name: 'Tigan', cat: 'Other', dose: '100-200 mg', note: 'Fixed dose PO/PR', max: null },
    { name: 'Dolasetron', cat: 'Other', dose: '0.35 mg/kg', note: 'Anzemet', max: 12.5 },
    { name: 'Granisetron', cat: 'Other', dose: '10 mcg/kg', note: 'Kytril', max: null },

    // === ANTIBIOTICS ===
    { name: 'Cefotaxime', cat: 'Antibiotic', dose: '50 mg/kg', note: 'Neonatal sepsis (Instead of Ceftriaxone)', max: 2000 },
    { name: 'Cefazolin (Ancef)', cat: 'Antibiotic', dose: '30-50 mg/kg', note: 'Max 2g. Ppx', max: 2000 },
    { name: 'Ampicillin', cat: 'Antibiotic', dose: '50 mg/kg', note: 'Max 2g', max: 2000 },
    { name: 'Ampicillin/Sulbactam', cat: 'Antibiotic', dose: '50 mg/kg', note: 'Max 2g', max: 2000 },
    { name: 'Ceftriaxone', cat: 'Antibiotic', dose: 'ceftriaxone_check', note: 'Max 2g (Contraindicated in Neonates)', max: 2000 }, // Special handling
    { name: 'Cefoxitin', cat: 'Antibiotic', dose: '40 mg/kg', note: 'Max 2g', max: 2000 },
    { name: 'Clindamycin', cat: 'Antibiotic', dose: '10-13 mg/kg', note: 'Max 900mg', max: 900 },
    { name: 'Vancomycin', cat: 'Antibiotic', dose: '15-20 mg/kg', note: 'Slow IV (>1hr)', max: 2000 },
    { name: 'Gentamicin', cat: 'Antibiotic', dose: '5 mg/kg', note: 'q24h', max: null },
    { name: 'Metronidazole', cat: 'Antibiotic', dose: '15 mg/kg', note: 'Max 1g', max: 1000 },
    { name: 'Piperacillin/Tazobactam', cat: 'Antibiotic', dose: '100 mg/kg', note: 'Max 4g', max: 4000 },
    { name: 'Nafcillin', cat: 'Antibiotic', dose: '50 mg/kg', note: 'Max 2g', max: 2000 },
    { name: 'Ciprofloxacin', cat: 'Antibiotic', dose: '10 mg/kg', note: 'Max 400mg', max: 400 },
    { name: 'Amoxicillin (Oral)', cat: 'Antibiotic', dose: '50 mg/kg', note: 'Endocarditis Ppx', max: 2000 },
    { name: 'Cephalexin (Oral)', cat: 'Antibiotic', dose: '50 mg/kg', note: 'Endocarditis Ppx', max: 2000 },
    { name: 'Azithromycin (Oral)', cat: 'Antibiotic', dose: '15 mg/kg', note: 'Endocarditis Ppx', max: 500 },
    { name: 'Clarithromycin (Oral)', cat: 'Antibiotic', dose: '15 mg/kg', note: 'Endocarditis Ppx', max: 500 },
];
