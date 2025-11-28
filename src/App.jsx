import React, { useState, useMemo } from 'react';
import { 
  Activity, Syringe, Droplet, Stethoscope, AlertTriangle, Search, 
  Brain, Zap, Pin, Anchor, Calculator, FlaskConical, Info,
  Baby, Ruler, Save, FolderOpen, Trash2, Filter, Clock, Menu, X
} from 'lucide-react';

const PediatricAnesthesiaCalc = () => {
  // --- State: Patient Data ---
  const [weight, setWeight] = useState(10); // kg
  const [age, setAge] = useState(1);
  const [ageUnit, setAgeUnit] = useState('years'); // 'days', 'months', 'years'
  const [isPreemie, setIsPreemie] = useState(false);
  
  // --- State: UI & Inputs ---
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all_drugs'); 
  const [pinnedDrugs, setPinnedDrugs] = useState(['Epinephrine (Cardiac Arrest)', 'Atropine', 'Succinylcholine', 'Propofol (Induction)']);
  const [drugCategoryFilter, setDrugCategoryFilter] = useState('All'); 

  // --- State: Profiles (Saved Settings) ---
  const [savedProfiles, setSavedProfiles] = useState([]);
  
  // --- State: Lab / Correction Inputs ---
  const [baseExcess, setBaseExcess] = useState(-5);
  const [currentHb, setCurrentHb] = useState(12);
  const [targetHb, setAllowedHb] = useState(8); 

  // --- Helpers ---
  const getAgeInMonths = () => {
    if (ageUnit === 'years') return parseFloat(age) * 12;
    if (ageUnit === 'months') return parseFloat(age);
    if (ageUnit === 'days') return parseFloat(age) / 30.4;
    return 0;
  };
  const getAgeInDays = () => {
     if (ageUnit === 'years') return parseFloat(age) * 365;
     if (ageUnit === 'months') return parseFloat(age) * 30.4;
     if (ageUnit === 'days') return parseFloat(age);
     return 0;
  }

  const ageMonths = getAgeInMonths();
  const ageYears = getAgeInMonths() / 12;
  const w = parseFloat(weight);
  
  const isNeonate = getAgeInDays() <= 30;
  const isTeen = ageYears >= 12;

  // --- Profile Management ---
  const saveProfile = () => {
    const newProfile = {
      id: Date.now(),
      name: `${weight}kg / ${age}${ageUnit} ${isPreemie ? '(Preemie)' : ''}`,
      data: { weight, age, ageUnit, isPreemie, baseExcess, currentHb, targetHb }
    };
    setSavedProfiles([...savedProfiles, newProfile]);
  };

  const loadProfile = (profile) => {
    const d = profile.data;
    setWeight(d.weight);
    setAge(d.age);
    setAgeUnit(d.ageUnit);
    setIsPreemie(d.isPreemie);
    if (d.baseExcess !== undefined) setBaseExcess(d.baseExcess);
    if (d.currentHb !== undefined) setCurrentHb(d.currentHb);
    if (d.targetHb !== undefined) setAllowedHb(d.targetHb);
  };

  const deleteProfile = (id) => {
    setSavedProfiles(savedProfiles.filter(p => p.id !== id));
  };

  // --- Formatting Helpers ---
  const fmt = (num) => {
    if (isNaN(num) || !isFinite(num)) return '-';
    if (num < 1) return num.toFixed(2);
    if (num < 10) return num.toFixed(1);
    return num.toFixed(0);
  };

  // Generic Dose Calculator with Min/Max logic
  const calculateDose = (doseStr, maxVal = null, minVal = null) => {
    let type = 'single';
    let min = 0, max = 0, single = 0;
    let unit = 'mg';
    let isInfusion = false;

    const d = doseStr.toLowerCase();

    if (d.includes('/kg/min') || d.includes('/kg/hr') || d.includes('/kg/hour')) {
      isInfusion = true;
      unit = d.includes('mcg') ? 'mcg' : (d.includes('mu') ? 'mU' : 'mg');
      const time = (d.includes('hr') || d.includes('hour')) ? 'hr' : 'min';
      unit += `/${time}`; 
    } else {
      unit = d.includes('mcg') ? 'mcg' : (d.includes('units') ? 'Units' : (d.includes('meq') ? 'mEq' : (d.includes('ml') ? 'mL' : 'mg')));
    }

    const matches = doseStr.match(/(\d+(\.\d+)?)/g);
    if (!matches) return { result: '-', formula: '-', isInfusion };

    if (doseStr.includes('-') && matches.length >= 2) {
      type = 'range';
      min = parseFloat(matches[0]);
      max = parseFloat(matches[1]);
    } else {
      single = parseFloat(matches[0]);
    }

    const applyLimits = (val) => {
      let v = val;
      let msg = '';
      if (maxVal && v > maxVal) { v = maxVal; msg = '(Max)'; }
      if (minVal && v < minVal) { v = minVal; msg = '(Min)'; }
      return { v, msg };
    };

    if (isInfusion) {
      if (type === 'range') {
        const minRate = min * w;
        const maxRate = max * w;
        return { result: `${fmt(minRate)} - ${fmt(maxRate)} ${unit}`, formula: `${min}-${max} × ${w}kg`, isInfusion };
      } else {
        const rate = single * w;
        return { result: `${fmt(rate)} ${unit}`, formula: `${single} × ${w}kg`, isInfusion };
      }
    } else {
      if (type === 'range') {
        const vMin = applyLimits(min * w);
        const vMax = applyLimits(max * w);
        
        if (vMin.msg === '(Max)' && vMax.msg === '(Max)') {
           return { result: `${fmt(vMax.v)} ${unit} (Max)`, formula: `Capped at ${maxVal}`, isInfusion };
        }

        return { 
          result: `${fmt(vMin.v)} - ${fmt(vMax.v)} ${unit} ${vMax.msg}`, 
          formula: `${min}-${max} × ${w}kg` + (maxVal ? ` (Max ${maxVal})` : '') + (minVal ? ` (Min ${minVal})` : ''), 
          isInfusion 
        };
      } else {
        const v = applyLimits(single * w);
        return { 
          result: `${fmt(v.v)} ${unit} ${v.msg}`, 
          formula: `${single} × ${w}kg` + (maxVal ? ` (Max ${maxVal})` : '') + (minVal ? ` (Min ${minVal})` : ''), 
          isInfusion 
        };
      }
    }
  };

  // --- 1. Master Drug List (Updated with Missing Antibiotics) ---
  const getAllDrugs = () => {
    const atropineMax = isTeen ? 1.0 : 0.5;
    
    const list = [
      // === EMERGENCY ===
      { name: 'Epinephrine (Cardiac Arrest)', cat: 'Emergency', dose: '10 mcg/kg', note: '1:10,000 (0.1 mL/kg)', max: 1000 },
      { name: 'Epinephrine (Vasopressor)', cat: 'Emergency', dose: '2-10 mcg/kg', note: 'Bolus for hypotension', max: 1000 },
      { name: 'Atropine', cat: 'Emergency', dose: '0.02 mg/kg', note: `Min 0.1mg, Max ${isTeen?'1mg (Teen)':'0.5mg (Child)'}`, max: atropineMax, min: 0.1 },
      { name: 'Succinylcholine', cat: 'Emergency', dose: '1-2 mg/kg', note: 'IV (IM: 4 mg/kg). Airway Emergency.', max: 150 },
      { name: 'Adenosine', cat: 'Emergency', dose: '0.1 mg/kg', note: 'Rapid push. Max 6mg (1st), 12mg (2nd)', max: 12 },
      { name: 'Calcium Chloride', cat: 'Emergency', dose: '10-15 mg/kg', note: 'Central line preferred. Slow IV.', max: 2000 },
      { name: 'Calcium Gluconate', cat: 'Emergency', dose: '30-50 mg/kg', note: 'Peripheral OK. Slow IV.', max: 2000 },
      { name: 'Sodium Bicarbonate', cat: 'Emergency', dose: '1-2 mEq/kg', note: 'Dilute 1:1 for infants', max: 50 },
      { name: 'Dantrolene', cat: 'Emergency', dose: '2.5 mg/kg', note: 'Malignant Hyperthermia. Repeat PRN.', max: null },
      { name: 'Lipid Emulsion 20%', cat: 'Emergency', dose: '1.5 mL/kg', note: 'LAST Bolus. Then 0.25 mL/kg/min.', max: 100 },
      { name: 'Vasopressin (Arrest)', cat: 'Emergency', dose: '0.5-1 unit/kg', note: 'Pulseless Arrest', max: 40 },
      { name: 'Amiodarone (Bolus)', cat: 'Emergency', dose: '5 mg/kg', note: 'VF/VT Arrest. (Perfusing: Load over 20-60m)', max: 300 },
      { name: 'Naloxone', cat: 'Emergency', dose: '1-10 mcg/kg', note: 'Opioid Reversal', max: null },
      { name: 'Flumazenil', cat: 'Emergency', dose: '10 mcg/kg', note: 'Benzo Reversal. Max 1mg', max: 1000 },
      { name: 'Potassium Chloride', cat: 'Emergency', dose: '0.5-1 mEq/kg', note: 'Hypokalemia. Slow over 1-2h', max: 40 },

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
      { name: 'Acetaminophen (IV)', cat: 'Pain', dose: isNeonate ? '7.5-10 mg/kg' : '15 mg/kg', note: 'Max 1g (Max 75mg/kg/day)', max: 1000 },
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
      { name: 'Ondansetron', cat: 'Other', dose: '0.15 mg/kg', note: 'Max 4mg. PONV', max: 4 },
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

      // === ANTIBIOTICS (Updated) ===
      { name: 'Cefotaxime', cat: 'Antibiotic', dose: '50 mg/kg', note: 'Neonatal sepsis (Instead of Ceftriaxone)', max: 2000 },
      { name: 'Cefazolin (Ancef)', cat: 'Antibiotic', dose: '30-50 mg/kg', note: 'Max 2g. Ppx', max: 2000 },
      { name: 'Ampicillin', cat: 'Antibiotic', dose: '50 mg/kg', note: 'Max 2g', max: 2000 },
      { name: 'Ampicillin/Sulbactam', cat: 'Antibiotic', dose: '50 mg/kg', note: 'Max 2g', max: 2000 },
      { name: 'Ceftriaxone', cat: 'Antibiotic', dose: isNeonate ? '0 mg/kg' : '50 mg/kg', note: isNeonate ? 'CONTRAINDICATED' : 'Max 2g', max: 2000 },
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
    return list.map((d, i) => {
      const { result, formula, isInfusion } = calculateDose(d.dose, d.max, d.min);
      return { ...d, id: i, calc: result, formula: formula, isInfusion };
    });
  };

  // --- 2. Sedation Data ---
  const getSedationData = () => {
    const list = [
      { agent: 'Clonidine (PO)', dose: '4-5 mcg/kg', max: null, note: 'Pre-med' },
      { agent: 'Dexmedetomidine (IV)', dose: '0.5-2 mcg/kg', max: null, note: 'Load over 10 min' },
      { agent: 'Diazepam (PO)', dose: '0.25-0.3 mg/kg', max: null, note: 'DO NOT give IM' },
      { agent: 'Diphenhydramine (PO/IM)', dose: '1-2 mg/kg', max: '50 mg', note: 'Benadryl' },
      { agent: 'Ketamine (IM)', dose: '3-7 mg/kg', max: null, note: 'Sedation / Dart' },
      { agent: 'Ketamine (IV)', dose: '1-2 mg/kg', max: null, note: 'Sedation' },
      { agent: 'Ketazolam (PO)', dose: '0.1 mg/kg', max: null, note: 'Ketamine 6mg/kg + Midazolam 0.6mg/kg + Atropine 0.02mg/kg Mix' },
      { agent: 'Midazolam (Oral)', dose: '0.5-1 mg/kg', max: '20 mg', note: 'Mix IV form w/ Tylenol/Syrup' },
      { agent: 'Midazolam (Rectal)', dose: '0.5-1 mg/kg', max: null, note: 'Use 10ml syringe + 14F catheter' },
      { agent: 'Midazolam (Nasal)', dose: '0.2-0.3 mg/kg', max: null, note: 'Can be irritating' },
      { agent: 'Midazolam (IV)', dose: '0.05-0.1 mg/kg', max: null, note: 'Increments' },
      { agent: 'Pentobarbital', dose: '2-6 mg/kg', max: '200 mg', note: 'IM/PO' },
    ];

    const ketaMix = {
       ketamine: fmt(w * 6),
       midaz: fmt(w * 0.6),
       atropine: fmt(w * 0.02)
    };

    return {
       list: list.map(d => {
          const { result, formula } = calculateDose(d.dose, d.max ? parseFloat(d.max) : null);
          return { ...d, calc: result, formula };
       }),
       ketaMix
    };
  };

  // --- 3. Airway Logic ---
  const getAirway = () => {
    let ettUncuffed, ettCuffed, ettRule, depth, depthRule, blade, lma;

    if (isPreemie || w < 2.5) {
       ettUncuffed = '2.5 mm';
       ettCuffed = 'N/A';
       ettRule = 'Preemie <2.5kg';
       blade = 'Miller 0';
       lma = '1'; // Smallest
    } else if (isNeonate || (ageUnit==='months' && ageMonths < 1)) {
       ettUncuffed = '3.0 mm';
       ettCuffed = 'N/A';
       ettRule = 'Term NB';
       blade = 'Miller 0';
       lma = '1';
    } else {
       if (ageYears >= 2) {
          const size = (ageYears / 4) + 4;
          ettUncuffed = `${size.toFixed(1)} mm`;
          ettCuffed = `${(size - 0.5).toFixed(1)} mm`;
          ettRule = '(Age/4) + 4';
          blade = 'Mac 2';
       } else {
          ettUncuffed = ageMonths < 6 ? '3.5 mm' : (ageMonths < 18 ? '4.0 mm' : '4.5 mm');
          ettCuffed = ageMonths < 6 ? '3.0 mm' : (ageMonths < 18 ? '3.5 mm' : '4.0 mm');
          ettRule = 'Age-based Table';
          blade = ageMonths < 6 ? 'Miller 1' : 'Mac 1 / Miller 1';
       }
       if (w <= 5) lma = '1';
       else if (w <= 10) lma = '1.5';
       else if (w <= 20) lma = '2';
       else if (w <= 30) lma = '2.5';
       else if (w <= 50) lma = '3';
       else lma = '4'; // >50
    }

    if (w <= 3) {
       if (w <= 1) depth = '7 cm';
       else if (w <= 2) depth = '8 cm';
       else depth = '9 cm';
       depthRule = '1kg=7, 2kg=8, 3kg=9';
    } else if (ageYears >= 1) {
       depth = `${Math.floor(ageYears + 11)} cm`;
       depthRule = 'Age + 11 cm';
    } else {
       const id = parseFloat(ettUncuffed);
       depth = `${(id * 3).toFixed(1)} cm`;
       depthRule = 'ID × 3';
    }

    return { ettUncuffed, ettCuffed, ettRule, depth, depthRule, blade, lma };
  };

  // --- 4. Fluids (Updated TBV Factors from Image 7) ---
  const getFluids = () => {
    let maint = 0;
    let formulaMaint = '';
    if (w <= 10) { maint = w * 4; formulaMaint=`${w}kg × 4mL`; }
    else if (w <= 20) { maint = 40 + (w - 10) * 2; formulaMaint=`40 + (${w-10}kg × 2mL)`; }
    else { maint = 60 + (w - 20) * 1; formulaMaint=`60 + (${w-20}kg × 1mL)`; }

    // TBV Factors (Image 7)
    let tbvFactor = 75;
    if (isPreemie) tbvFactor = 100;
    else if (isNeonate) tbvFactor = 90; // Term NB
    else if (ageMonths <= 6) tbvFactor = 80; // 6 mo
    else if (ageYears <= 1) tbvFactor = 75; // 1 yo
    else if (isTeen) tbvFactor = 70; // Teen (65-70) -> Use 70 for safety calc
    else tbvFactor = 75; // Default Child
    
    const tbv = w * tbvFactor;

    const start = parseFloat(currentHb);
    const limit = parseFloat(targetHb);
    const avg = (start + limit) / 2;
    const abl = avg > 0 ? (tbv * (start - limit)) / avg : 0;

    const alb5 = w * 10; // 5% -> 10 mL/kg
    const alb25 = w * 2.5; // 25% -> 2-3 mL/kg
    const rbc = w * 10; // 10 mL/kg
    const plt = w / 10; // 1 unit per 10kg

    return { maint, formulaMaint, tbv, tbvFactor, abl, start, limit, alb5, alb25, rbc, plt };
  };

  // --- 5. Regional ---
  const getRegional = () => {
    // Landmarks
    let landmark = '';
    let cord = '';
    if (isNeonate || ageYears < 1) {
       landmark = 'L5 - S1'; // Baby
       cord = 'L3';
    } else {
       landmark = 'L4 - L5'; // Kids
       cord = 'L1'; // Adult/Older kid
    }

    // Volumes (Ranges)
    const caudalMin = w * 0.5;
    const caudalMax = w * 1.25;
    const spinalMin = w * 0.1;
    const spinalMax = w * 0.2;
    const penileMin = w * 0.5;
    const penileMax = w * 1.0;

    // Max Doses (mg)
    const maxLido = w * 5;
    const maxLidoEpi = w * 7;
    const maxBupi = w * 2.5;
    const maxRopi = w * 3;

    // Max Volume Caps in mL based on standard concentrations
    // Lido 1% = 10 mg/mL
    const volLido1 = maxLido / 10;
    const volLidoEpi1 = maxLidoEpi / 10;
    // Bupi 0.25% = 2.5 mg/mL
    const volBupi025 = maxBupi / 2.5;
    // Ropi 0.2% = 2 mg/mL
    const volRopi02 = maxRopi / 2;

    return { 
       landmark, cord, 
       caudal: `${fmt(caudalMin)} - ${fmt(caudalMax)} mL`,
       spinal: `${fmt(spinalMin)} - ${fmt(spinalMax)} mL`,
       penile: `${fmt(penileMin)} - ${fmt(penileMax)} mL`,
       maxLido, maxLidoEpi, maxBupi, maxRopi,
       volLido1, volLidoEpi1, volBupi025, volRopi02
    };
  };

  // --- 6. Corrections ---
  const getCorrections = () => {
     const deficit = baseExcess < 0 ? Math.abs(baseExcess) : 0;
     const bicarb = w * deficit * 0.3;
     
     const d25 = w * 2;
     const d10 = w * 4; // Neonate 2-5ml/kg

     const kLow = w * 0.5;
     const kHigh = w * 1.0;

     const hyperKCalc = w * 50; 
     const hyperKBicarb = w * 1; 
     const hyperKInsulin = w * 0.1;
     const hyperKGluc = w * 2;

     return { 
       bicarb, d25, d10, kLow, kHigh, 
       hyperKCalc, hyperKBicarb, hyperKInsulin, hyperKGluc 
     };
  };

  // --- Execution ---
  const drugs = useMemo(() => getAllDrugs(), [weight, age, isPreemie]);
  const sed = useMemo(() => getSedationData(), [weight, age]);
  const airway = getAirway();
  const fluids = getFluids();
  const regional = getRegional();
  const corr = getCorrections();

  // Filtering & Categories
  const filteredDrugs = useMemo(() => {
    let list = drugs;
    if (drugCategoryFilter !== 'All') {
      list = list.filter(d => d.cat === drugCategoryFilter);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(d => d.name.toLowerCase().includes(q) || d.cat.toLowerCase().includes(q));
    }
    return list.sort((a, b) => {
      const ap = pinnedDrugs.includes(a.name);
      const bp = pinnedDrugs.includes(b.name);
      if (ap && !bp) return -1;
      if (!ap && bp) return 1;
      return 0;
    });
  }, [drugs, searchQuery, pinnedDrugs, drugCategoryFilter]);

  const togglePin = (name) => {
    setPinnedDrugs(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
  };

  const categories = ['All', 'Emergency', 'Sedation', 'Pain', 'CV', 'Neuro', 'Antibiotic', 'Relaxant', 'Reversal', 'Other'];

  // --- Renders ---

  const renderAirway = () => (
    <div className="space-y-4">
       <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <h3 className="font-bold text-slate-700 flex items-center gap-2 border-b pb-2 mb-3"><Stethoscope size={18}/> Tube & Laryngoscopy</h3>
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-blue-50 p-3 rounded">
                <div className="text-xs text-slate-500">ETT (Uncuffed)</div>
                <div className="text-2xl font-bold text-slate-800">{airway.ettUncuffed}</div>
                <div className="text-[10px] text-slate-400">{airway.ettRule}</div>
             </div>
             <div className="bg-blue-50 p-3 rounded">
                <div className="text-xs text-slate-500">ETT (Cuffed)</div>
                <div className="text-2xl font-bold text-slate-800">{airway.ettCuffed}</div>
             </div>
             <div className="bg-slate-50 p-3 rounded col-span-2 flex justify-between items-center">
                <div>
                   <div className="text-xs text-slate-500">Depth (at lip)</div>
                   <div className="text-xl font-bold text-blue-700">{airway.depth}</div>
                </div>
                <div className="text-[10px] text-slate-400 text-right">Rule: {airway.depthRule}</div>
             </div>
             <div className="p-2 border rounded">
                <div className="text-xs text-slate-500">Blade</div>
                <div className="font-bold">{airway.blade}</div>
             </div>
             <div className="p-2 border rounded">
                <div className="text-xs text-slate-500">LMA</div>
                <div className="font-bold">#{airway.lma}</div>
             </div>
          </div>
       </div>
    </div>
  );

  const renderFluids = () => (
    <div className="space-y-4">
       {/* Maintenance & TBV */}
       <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 grid grid-cols-2 gap-4">
          <div>
             <h3 className="text-xs font-bold text-slate-500 uppercase mb-1">Maintenance</h3>
             <div className="text-2xl font-bold text-teal-700">{fluids.maint} <span className="text-sm">mL/hr</span></div>
             <div className="text-[10px] text-slate-400 font-mono">{fluids.formulaMaint}</div>
          </div>
          <div>
             <h3 className="text-xs font-bold text-slate-500 uppercase mb-1">Blood Vol (TBV)</h3>
             <div className="text-2xl font-bold text-rose-700">{fluids.tbv.toFixed(0)} <span className="text-sm">mL</span></div>
             <div className="text-[10px] text-slate-400 font-mono">{w}kg × {fluids.tbvFactor} mL/kg</div>
          </div>
       </div>

       {/* ABL */}
       <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <h3 className="font-bold text-slate-700 flex items-center gap-2 mb-2"><FlaskConical size={18}/> Allowable Blood Loss</h3>
          <div className="flex gap-4 items-center bg-slate-50 p-2 rounded mb-2">
             <div className="flex-1"><label className="text-[10px]">Start Hb</label><input type="number" value={currentHb} onChange={e=>setCurrentHb(e.target.value)} className="w-full font-bold p-1 border rounded"/></div>
             <span>→</span>
             <div className="flex-1"><label className="text-[10px]">Min Hb</label><input type="number" value={targetHb} onChange={e=>setAllowedHb(e.target.value)} className="w-full font-bold p-1 border rounded"/></div>
          </div>
          <div className="flex justify-between items-center bg-rose-50 p-3 rounded text-rose-900 font-bold">
             <span>ABL Limit</span>
             <span className="text-xl">{fmt(fluids.abl)} mL</span>
          </div>
          <div className="text-[9px] text-slate-400 text-right font-mono mt-1">TBV × (Start - Min) / Average Hb</div>
       </div>

       {/* Albumin & Blood Products */}
       <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <h3 className="font-bold text-slate-700 border-b pb-2 mb-3">Volume & Products</h3>
          <div className="grid grid-cols-1 gap-2 text-sm">
             <div className="flex justify-between bg-blue-50 p-2 rounded items-center">
                <div><span>Albumin 5%</span> <div className="text-[9px] text-slate-500 font-mono">{w}kg × 10 mL/kg</div></div>
                <span className="font-bold text-blue-700">{fmt(fluids.alb5)} mL</span>
             </div>
             <div className="flex justify-between bg-blue-50 p-2 rounded items-center">
                <div><span>Albumin 25%</span> <div className="text-[9px] text-slate-500 font-mono">{w}kg × 2.5 mL/kg</div></div>
                <span className="font-bold text-blue-700">{fmt(fluids.alb25)} mL</span>
             </div>
             <div className="flex justify-between bg-red-50 p-2 rounded items-center">
                <div><span>Packed RBC</span> <div className="text-[9px] text-slate-500 font-mono">{w}kg × 10 mL/kg</div></div>
                <span className="font-bold text-red-700">{fmt(fluids.rbc)} mL</span>
             </div>
             <div className="flex justify-between bg-yellow-50 p-2 rounded items-center">
                <div><span>Platelets</span> <div className="text-[9px] text-slate-500 font-mono">{w}kg / 10kg</div></div>
                <span className="font-bold text-yellow-700">{fmt(fluids.plt)} Units</span>
             </div>
          </div>
       </div>
    </div>
  );

  const renderRegional = () => (
     <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 space-y-4">
        <h3 className="font-bold text-purple-800 flex items-center gap-2 border-b pb-2"><Anchor size={18}/> Regional Pearls (Image 6)</h3>
        
        <div className="bg-purple-50 p-3 rounded flex justify-between items-center">
           <div>
              <div className="text-xs text-purple-600 font-bold uppercase">Landmarks ({isNeonate || ageYears < 1 ? 'Infant' : 'Child'})</div>
              <div className="text-sm">Iliac Crest: <b>{regional.landmark}</b></div>
              <div className="text-sm">Cord Ends: <b>{regional.cord}</b></div>
           </div>
           <Info size={20} className="text-purple-300"/>
        </div>

        <div className="grid grid-cols-1 gap-3">
           <div className="border p-3 rounded">
              <div className="font-bold text-sm text-slate-700">Caudal Block (Bupivacaine 0.125% - 0.25%)</div>
              <div className="text-xl font-bold text-purple-700">{regional.caudal}</div>
              <div className="text-[9px] text-slate-400 font-mono">{w}kg × (0.5 - 1.25) mL/kg</div>
           </div>
           <div className="border p-3 rounded">
              <div className="font-bold text-sm text-slate-700">Spinal Block (Bupivacaine 0.5%)</div>
              <div className="text-xl font-bold text-purple-700">{regional.spinal}</div>
              <div className="text-[9px] text-slate-400 font-mono">{w}kg × (0.1 - 0.2) mL/kg</div>
           </div>
           <div className="border p-3 rounded">
              <div className="font-bold text-sm text-slate-700">Penile Block (Bupivacaine 0.25% No Epi)</div>
              <div className="text-xl font-bold text-purple-700">{regional.penile}</div>
              <div className="text-[9px] text-slate-400 font-mono">{w}kg × (0.5 - 1) mL/kg</div>
           </div>
        </div>

        <div className="bg-slate-50 p-3 rounded">
           <div className="text-xs font-bold text-slate-500 uppercase mb-2">Max Doses & Volumes (LAST Prevention)</div>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="bg-white p-2 rounded border border-slate-200">
                 <span className="block font-bold text-slate-700">Lidocaine (Plain)</span>
                 <div className="flex justify-between items-baseline">
                    <span className="text-lg font-bold text-slate-800">{fmt(regional.maxLido)} mg</span>
                    <span className="text-xs text-slate-500">5 mg/kg</span>
                 </div>
                 <div className="text-[10px] text-purple-600 font-mono mt-1 border-t pt-1">
                    Max Vol (1%): <b>{fmt(regional.volLido1)} mL</b>
                 </div>
              </div>
              <div className="bg-white p-2 rounded border border-slate-200">
                 <span className="block font-bold text-slate-700">Lidocaine (+Epinephrine)</span>
                 <div className="flex justify-between items-baseline">
                    <span className="text-lg font-bold text-slate-800">{fmt(regional.maxLidoEpi)} mg</span>
                    <span className="text-xs text-slate-500">7 mg/kg</span>
                 </div>
                 <div className="text-[10px] text-purple-600 font-mono mt-1 border-t pt-1">
                    Max Vol (1%): <b>{fmt(regional.volLidoEpi1)} mL</b>
                 </div>
              </div>
              <div className="bg-white p-2 rounded border border-slate-200">
                 <span className="block font-bold text-slate-700">Bupivacaine (0.25%)</span>
                 <div className="flex justify-between items-baseline">
                    <span className="text-lg font-bold text-slate-800">{fmt(regional.maxBupi)} mg</span>
                    <span className="text-xs text-slate-500">2.5 mg/kg</span>
                 </div>
                 <div className="text-[10px] text-purple-600 font-mono mt-1 border-t pt-1">
                    Max Vol (0.25%): <b>{fmt(regional.volBupi025)} mL</b>
                 </div>
              </div>
              <div className="bg-white p-2 rounded border border-slate-200">
                 <span className="block font-bold text-slate-700">Ropivacaine (0.2%)</span>
                 <div className="flex justify-between items-baseline">
                    <span className="text-lg font-bold text-slate-800">{fmt(regional.maxRopi)} mg</span>
                    <span className="text-xs text-slate-500">3 mg/kg</span>
                 </div>
                 <div className="text-[10px] text-purple-600 font-mono mt-1 border-t pt-1">
                    Max Vol (0.2%): <b>{fmt(regional.volRopi02)} mL</b>
                 </div>
              </div>
           </div>
        </div>
     </div>
  );

  const renderSedation = () => (
     <div className="space-y-4">
        <div className="bg-indigo-50 border border-indigo-100 p-3 rounded">
           <h3 className="font-bold text-indigo-900 flex items-center gap-2"><Brain size={18}/> Sedation & Adjuncts</h3>
           <p className="text-xs text-indigo-600">Route-specific dosing and cocktails.</p>
        </div>

        <div className="bg-white border border-slate-200 p-3 rounded shadow-sm">
           <h4 className="font-bold text-slate-700 text-sm mb-2">"Ketazolam" PO Mix</h4>
           <div className="flex flex-wrap gap-2 text-sm">
              <div className="bg-slate-100 px-2 py-1 rounded">Ketamine: <b>{sed.ketaMix.ketamine} mg</b> <span className="text-[9px] text-slate-400">({w}×6)</span></div>
              <div className="bg-slate-100 px-2 py-1 rounded">Midazolam: <b>{sed.ketaMix.midaz} mg</b> <span className="text-[9px] text-slate-400">({w}×0.6)</span></div>
              <div className="bg-slate-100 px-2 py-1 rounded">Atropine: <b>{sed.ketaMix.atropine} mg</b> <span className="text-[9px] text-slate-400">({w}×0.02)</span></div>
           </div>
        </div>

        <div className="space-y-2">
           {sed.list.map((d, i) => (
              <div key={i} className="bg-white border border-slate-200 p-3 rounded flex justify-between items-center shadow-sm">
                 <div>
                    <div className="font-bold text-slate-800">{d.agent}</div>
                    <div className="text-[10px] text-slate-500">{d.note}</div>
                 </div>
                 <div className="text-right">
                    <div className="font-bold text-indigo-700">{d.calc}</div>
                    <div className="text-[9px] text-slate-400 font-mono">{d.formula}</div>
                 </div>
              </div>
           ))}
        </div>
     </div>
  );

  const renderCorrections = () => (
     <div className="space-y-4">
        {/* Hypoglycemia */}
        <div className="bg-white border border-slate-200 p-4 rounded shadow-sm">
           <h3 className="font-bold text-slate-700 mb-2 flex items-center gap-2"><Zap size={18}/> Hypoglycemia</h3>
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-yellow-50 p-2 rounded">
                 <div className="text-xs font-bold text-yellow-800">Child (Dextrose 25%)</div>
                 <div className="text-xl font-bold">{fmt(corr.d25)} mL</div>
                 <div className="text-[9px] text-slate-400 font-mono">{w}kg × 2 mL/kg</div>
              </div>
              <div className="bg-yellow-50 p-2 rounded">
                 <div className="text-xs font-bold text-yellow-800">Neonate (Dextrose 10%)</div>
                 <div className="text-xl font-bold">{fmt(corr.d10)} mL</div>
                 <div className="text-[9px] text-slate-400 font-mono">{w}kg × 4 mL/kg</div>
              </div>
           </div>
        </div>
        {/* Hypokalemia */}
        <div className="bg-white border border-slate-200 p-4 rounded shadow-sm">
           <h3 className="font-bold text-slate-700 mb-2 flex items-center gap-2"><Activity size={18}/> Hypokalemia (Low K)</h3>
           <div className="bg-orange-50 p-2 rounded flex justify-between items-center">
              <div>
                 <span className="text-sm font-bold text-orange-800">Potassium Chloride</span>
                 <div className="text-[9px] text-orange-600 font-mono">{w}kg × (0.5 - 1) mEq</div>
              </div>
              <span className="text-xl font-bold text-orange-700">{fmt(corr.kLow)} - {fmt(corr.kHigh)} mEq</span>
           </div>
           <div className="text-[10px] text-slate-400 mt-1">Give slow over 1-2 hours.</div>
        </div>
        {/* Hyperkalemia */}
        <div className="bg-white p-4 rounded border border-slate-200 shadow-sm">
           <h3 className="font-bold text-slate-700 mb-2 flex items-center gap-2"><AlertTriangle size={18}/> Hyperkalemia (High K)</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
              <div className="bg-slate-50 p-2 rounded">
                 <div className="text-xs text-slate-500">1. Calcium Gluconate</div>
                 <div className="font-bold text-slate-800">{fmt(corr.hyperKCalc)} mg</div>
                 <div className="text-[9px] text-slate-400 font-mono">{w} × 50mg</div>
              </div>
              <div className="bg-slate-50 p-2 rounded">
                 <div className="text-xs text-slate-500">2. Sodium Bicarbonate</div>
                 <div className="font-bold text-slate-800">{fmt(corr.hyperKBicarb)} mEq</div>
                 <div className="text-[9px] text-slate-400 font-mono">{w} × 1mEq</div>
              </div>
              <div className="bg-slate-50 p-2 rounded">
                 <div className="text-xs text-slate-500">3. Insulin + D25%</div>
                 <div className="font-bold text-slate-800">{fmt(corr.hyperKInsulin)} U + {fmt(corr.hyperKGluc)}mL</div>
                 <div className="text-[9px] text-slate-400 font-mono">0.1U/kg + 2ml/kg</div>
              </div>
           </div>
        </div>
        {/* Acidosis */}
        <div className="bg-white p-4 rounded border border-slate-200 shadow-sm">
           <h3 className="font-bold text-slate-700 mb-2 flex items-center gap-2"><Calculator size={18}/> Metabolic Acidosis</h3>
           <div className="flex items-center gap-4 mb-2">
              <label className="text-xs font-bold text-slate-600">Base Excess:</label>
              <input type="number" value={baseExcess} onChange={e=>setBaseExcess(parseFloat(e.target.value))} className="border rounded w-16 p-1 text-center font-bold"/>
           </div>
           <div className="bg-rose-50 p-2 rounded flex justify-between">
              <div>
                 <span className="text-sm font-bold text-rose-800">Sodium Bicarbonate (Full)</span>
                 <div className="text-[9px] text-rose-500 font-mono">{w}kg × {Math.abs(baseExcess)} × 0.3</div>
              </div>
              <span className="text-xl font-bold text-rose-700">{fmt(corr.bicarb)} mEq</span>
           </div>
        </div>
     </div>
  );

  const renderAllDrugs = () => (
    <div className="bg-white rounded border border-slate-200 shadow-sm">
       <div className="p-3 border-b bg-slate-50 flex flex-col gap-3 sticky top-0 z-10">
          <div className="flex justify-between items-center">
             <h3 className="font-bold text-slate-700 flex items-center gap-2"><Syringe size={18}/> All Drugs</h3>
             {/* Search Bar */}
             <div className="relative">
                <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"/>
                <input type="text" placeholder="Search..." value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} className="w-32 md:w-48 text-sm border rounded pl-8 pr-2 py-1"/>
             </div>
          </div>
          {/* Category Filters */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
             {categories.map(c => (
                <button 
                   key={c} 
                   onClick={()=>setDrugCategoryFilter(c)}
                   className={`text-[10px] px-2 py-1 rounded whitespace-nowrap border ${drugCategoryFilter===c ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-slate-600 border-slate-200'}`}
                >
                   {c}
                </button>
             ))}
          </div>
       </div>
       <div className="divide-y divide-slate-100 max-h-[60vh] overflow-y-auto">
          {filteredDrugs.map((d) => (
             <div key={d.id} className={`p-3 flex justify-between items-center hover:bg-slate-50 ${pinnedDrugs.includes(d.name)?'bg-amber-50/50':''}`}>
                <div className="flex-1 mr-2">
                   <div className="font-bold text-sm text-slate-800 flex items-center gap-2">
                      <button onClick={()=>togglePin(d.name)} className={pinnedDrugs.includes(d.name)?'text-amber-500':'text-slate-300'}>
                         <Pin size={14} fill={pinnedDrugs.includes(d.name)?'currentColor':'none'}/>
                      </button>
                      {d.name}
                      {d.isInfusion && <Clock size={12} className="text-blue-500" />}
                   </div>
                   <div className="text-[10px] text-slate-500">{d.note} ({d.dose})</div>
                </div>
                <div className="text-right">
                   <div className="font-bold text-teal-700 whitespace-nowrap">{d.calc}</div>
                   <div className="text-[9px] text-slate-400 font-mono hidden sm:block">{d.formula}</div>
                </div>
             </div>
          ))}
       </div>
    </div>
  );

  // Profile Modal
  const renderProfileModal = () => (
     <div className="absolute top-14 right-4 z-50 bg-white shadow-xl border border-slate-200 rounded-lg p-4 w-64">
        <h4 className="font-bold text-slate-700 mb-2 text-sm flex items-center gap-2"><FolderOpen size={16}/> Saved Profiles</h4>
        {savedProfiles.length === 0 && <div className="text-xs text-slate-400 italic">No saved profiles.</div>}
        <ul className="space-y-2 max-h-48 overflow-y-auto">
           {savedProfiles.map(p => (
              <li key={p.id} className="flex justify-between items-center bg-slate-50 p-2 rounded hover:bg-slate-100">
                 <button onClick={() => loadProfile(p)} className="text-xs text-left font-bold text-slate-700 flex-1">
                    {p.name}
                 </button>
                 <button onClick={() => deleteProfile(p.id)} className="text-slate-400 hover:text-red-500"><Trash2 size={14}/></button>
              </li>
           ))}
        </ul>
        <button onClick={saveProfile} className="mt-3 w-full bg-teal-600 text-white text-xs font-bold py-2 rounded flex items-center justify-center gap-2 hover:bg-teal-700">
           <Save size={14}/> Save Current
        </button>
     </div>
  );

  const [showProfiles, setShowProfiles] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 pb-12 relative">
      {/* Header */}
      <header className="bg-slate-800 text-white p-3 sticky top-0 z-50 shadow-md">
         <div className="max-w-4xl mx-auto flex flex-col gap-2">
            <div className="flex justify-between items-start">
               <div className="flex flex-col">
                  <h1 className="text-lg font-bold flex items-center gap-1 leading-none">
                     <Baby className="text-teal-400" size={20} /> 
                     Peds <span className="font-light text-teal-400">Pearl</span>
                  </h1>
                  <span className="text-[9px] text-slate-400 mt-0.5 ml-6">Anesthesia Ref</span>
               </div>
               
               <div className="flex gap-2 items-center">
                  <label className="flex items-center gap-1 cursor-pointer bg-slate-700 px-2 py-1 rounded border border-slate-600 hover:bg-slate-600 transition">
                     <input type="checkbox" checked={isPreemie} onChange={e=>setIsPreemie(e.target.checked)} className="rounded text-teal-500 w-3 h-3 focus:ring-0"/>
                     <span className="text-[10px] font-bold text-amber-400 whitespace-nowrap">Preemie</span>
                  </label>
                  <button onClick={() => setShowProfiles(!showProfiles)} className="bg-slate-700 p-1.5 rounded border border-slate-600 hover:bg-slate-600 text-teal-400">
                     <Save size={16} />
                  </button>
               </div>
            </div>
            
            {/* Input Bar (Optimized for Mobile) */}
            <div className="grid grid-cols-2 gap-2 bg-slate-700 p-2 rounded shadow-inner border border-slate-600">
               <div className="flex flex-col">
                  <label className="text-[9px] text-slate-400 uppercase font-bold mb-0.5">Weight (kg)</label>
                  <input type="number" value={weight} onChange={e=>setWeight(Math.max(0, e.target.value))} 
                         className="w-full bg-slate-800/50 text-white font-bold text-lg p-1 rounded outline-none border border-transparent focus:border-teal-500 text-center" placeholder="0"/>
               </div>
               <div className="flex flex-col">
                  <label className="text-[9px] text-slate-400 uppercase font-bold mb-0.5">Age</label>
                  <div className="flex gap-1 h-full">
                     <input type="number" value={age} onChange={e=>setAge(Math.max(0, e.target.value))} 
                            className="w-1/2 bg-slate-800/50 text-white font-bold text-lg p-1 rounded outline-none border border-transparent focus:border-teal-500 text-center" placeholder="0"/>
                     <select value={ageUnit} onChange={e=>setAgeUnit(e.target.value)} className="w-1/2 bg-slate-800 text-white text-xs rounded border-none p-0 pl-1 cursor-pointer focus:ring-0">
                        <option value="years">Yrs</option>
                        <option value="months">Mos</option>
                        <option value="days">Days</option>
                     </select>
                  </div>
               </div>
            </div>
         </div>
      </header>

      {showProfiles && renderProfileModal()}

      {/* Tabs */}
      <div className="bg-white sticky top-[112px] z-40 shadow-sm border-b border-slate-200 overflow-x-auto no-scrollbar">
         <div className="max-w-4xl mx-auto flex">
            {[
               { id: 'fluids', label: 'Fluids', icon: Droplet },
               { id: 'airway', label: 'Airway', icon: Stethoscope },
               { id: 'sedation', label: 'Sedation', icon: Brain },
               { id: 'regional', label: 'Regional', icon: Anchor },
               { id: 'corrections', label: 'Corrections', icon: Calculator },
               { id: 'all_drugs', label: 'Drugs', icon: Syringe },
            ].map(tab => (
               <button 
                  key={tab.id}
                  onClick={()=>setActiveTab(tab.id)}
                  className={`flex-1 min-w-[80px] py-3 text-[10px] font-bold flex flex-col items-center gap-1 border-b-2 transition-colors ${
                     activeTab === tab.id ? 'border-teal-500 text-teal-700 bg-teal-50/20' : 'border-transparent text-slate-500 hover:bg-slate-50'
                  }`}
               >
                  <tab.icon size={18} />
                  {tab.label}
               </button>
            ))}
         </div>
      </div>

      <main className="max-w-4xl mx-auto p-4 space-y-6" onClick={() => setShowProfiles(false)}>
         {activeTab === 'fluids' && renderFluids()}
         {activeTab === 'airway' && renderAirway()}
         {activeTab === 'sedation' && renderSedation()}
         {activeTab === 'regional' && renderRegional()}
         {activeTab === 'corrections' && renderCorrections()}
         {activeTab === 'all_drugs' && renderAllDrugs()}

         <div className="text-center pt-10 text-[10px] text-slate-400">
            Based on Nationwide Children's Pediatric Anesthesia Pearls (2021)<br/>
            Always verify doses clinically.
         </div>
      </main>
    </div>
  );
};

export default PediatricAnesthesiaCalc;