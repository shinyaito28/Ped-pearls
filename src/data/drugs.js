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
    { name: 'Epinephrine (Cardiac Arrest)', cat: 'Emergency', dose: '10 mcg/kg', note: 'IV/IO, 1:10,000 (0.1 mL/kg). q3-5min. ETT dose 100 mcg/kg.', noteJa: 'IV/IO、1:10,000 (0.1 mL/kg)。q3-5 分。ETT 投与は 100 mcg/kg。', max: 1000 },
    { name: 'Epinephrine (Anaphylaxis)', cat: 'Emergency', dose: '10 mcg/kg', note: 'IM 1 mg/mL (0.01 mL/kg). Max 0.3-0.5 mg.', noteJa: 'IM 1 mg/mL (0.01 mL/kg)。最大 0.3-0.5 mg。', max: 500 },
    { name: 'Epinephrine (Vasopressor)', cat: 'Emergency', dose: '2-10 mcg/kg', note: 'IV/IO bolus for hypotension.', noteJa: '低血圧に対する IV/IO ボーラス。', max: 1000 },
    { name: 'Epinephrine, Racemic (Neb)', cat: 'Emergency', dose: '0.5 mL', note: '2.5% solution 0.25-0.5 mL in 3 mL NS. Stridor.', noteJa: '2.5% 溶液 0.25-0.5 mL を NS 3 mL に。喘鳴。', max: null },
    { name: 'Atropine (IV/IO)', cat: 'Emergency', dose: '0.01-0.02 mg/kg', note: 'Min 0.1 mg. Bradycardia.', noteJa: '最小 0.1 mg。徐脈。', max: 'teen_dependent', min: 0.1 },
    { name: 'Atropine (IM/PO)', cat: 'Emergency', dose: '0.02-0.04 mg/kg', note: 'Min 0.1 mg. Premed/anti-sialagogue.', noteJa: '最小 0.1 mg。前投薬/唾液分泌抑制。', max: 'teen_dependent', min: 0.1 },
    { name: 'Succinylcholine (IV)', cat: 'Emergency', dose: '1-2 mg/kg', note: 'RSI. Watch hyperkalemia.', noteJa: 'RSI。高 K 血症に注意。', max: 150 },
    { name: 'Succinylcholine (IM)', cat: 'Emergency', dose: '4 mg/kg', note: 'IM if no IV access.', noteJa: 'IV アクセスなしの場合に IM。', max: 200 },
    { name: 'Rocuronium (RSI)', cat: 'Emergency', dose: '0.6-1.2 mg/kg', note: 'IV. Reversible w/ Sugammadex.', noteJa: 'IV。Sugammadex で拮抗可。', max: null },
    { name: 'Adenosine', cat: 'Emergency', dose: '0.1-0.3 mg/kg', note: 'Rapid IV push w/ flush. 0.1 mg/kg 1st (max 6 mg) → 0.2 mg/kg 2nd (max 12 mg) → 0.3 mg/kg. Total ≤ 12 mg / 0.4 mg/kg.', noteJa: 'IV 急速投与 + フラッシュ。1 回目 0.1 mg/kg (最大 6 mg) → 2 回目 0.2 mg/kg (最大 12 mg) → 0.3 mg/kg。総量 ≤ 12 mg / 0.4 mg/kg。', max: 12 },
    { name: 'Calcium Chloride', cat: 'Emergency', dose: '10-15 mg/kg', note: 'IV (central preferred). Slow.', noteJa: 'IV(中心静脈推奨)。緩徐に。', max: 2000 },
    { name: 'Calcium Gluconate', cat: 'Emergency', dose: '30 mg/kg', note: 'IV (peripheral OK). Slow.', noteJa: 'IV(末梢可)。緩徐に。', max: 3000 },
    { name: 'Sodium Bicarbonate', cat: 'Emergency', dose: '1-2 mEq/kg', note: 'Acidosis or per ABG. Dilute for infants.', noteJa: 'アシドーシスまたは ABG に応じて。乳児は希釈。', max: 50 },
    { name: 'Dantrolene', cat: 'Emergency', dose: '2.5 mg/kg', note: 'MH. Repeat PRN. 1 mg/kg q6h once stable.', noteJa: 'MH。必要時に反復。安定後は 1 mg/kg q6h。', max: null },
    { name: 'Lipid Emulsion 20%', cat: 'Emergency', dose: '1.5 mL/kg', note: 'LAST bolus over 1 min. Then 0.25 mL/kg/min. Max 10 mL/kg in 30 min.', noteJa: 'LAST に 1 分かけてボーラス。続いて 0.25 mL/kg/min。30 分で最大 10 mL/kg。', max: null },
    { name: 'Vasopressin (Arrest)', cat: 'Emergency', dose: '0.5-1 unit/kg', note: 'Pulseless arrest. Adult 40 units.', noteJa: '無脈性心停止。成人 40 単位。', max: 40 },
    { name: 'Amiodarone (Bolus)', cat: 'Emergency', dose: '5 mg/kg', note: 'VF/pVT arrest: push. Otherwise over 5-60 min. Max 15 mg/kg or 300 mg.', noteJa: 'VF/pVT 停止時は急速投与。それ以外は 5-60 分かけて。最大 15 mg/kg または 300 mg。', max: 300 },
    { name: 'Amiodarone (Infusion)', cat: 'Emergency', dose: '5-15 mcg/kg/min', note: 'Maintenance after arrhythmia bolus.', noteJa: '不整脈ボーラス後の維持。', max: null },
    { name: 'Lidocaine (Bolus)', cat: 'Emergency', dose: '1 mg/kg', note: 'IV VF/VT or LA toxicity. Repeat in 5-10 min.', noteJa: 'IV VF/VT または LA 中毒。5-10 分後に反復。', max: 100 },
    { name: 'Lidocaine (Infusion)', cat: 'Emergency', dose: '10-50 mcg/kg/min', note: 'Antiarrhythmic infusion.', noteJa: '抗不整脈持続投与。', max: null },
    { name: 'Naloxone', cat: 'Emergency', dose: '1-10 mcg/kg', note: 'IV/IM/SQ/ETT. Opioid reversal. Titrate; full reversal 10 mcg/kg.', noteJa: 'IV/IM/SQ/ETT。オピオイド拮抗。漸増;完全拮抗 10 mcg/kg。', max: null },
    { name: 'Flumazenil', cat: 'Emergency', dose: '1-10 mcg/kg', note: 'IV q1min. Max 1 mg total. Caution: seizure.', noteJa: 'IV q1 分。総量最大 1 mg。痙攣に注意。', max: 1000 },
    { name: 'Potassium Chloride', cat: 'Emergency', dose: '0.5-1 mEq/kg', note: 'IV over 1-2 hr. Hypokalemia.', noteJa: '1-2 時間かけて IV。低 K 血症。', max: 40 },
    { name: 'Dextrose 25%', cat: 'Emergency', dose: '2 mL/kg', note: 'Hypoglycemia (= 0.5 g/kg). Children.', noteJa: '低血糖 (= 0.5 g/kg)。小児。', max: null },
    { name: 'Dextrose 10%', cat: 'Emergency', dose: '5 mL/kg', note: 'Hypoglycemia (= 0.5 g/kg). Neonates/infants.', noteJa: '低血糖 (= 0.5 g/kg)。新生児/乳児。', max: null },
    { name: 'Diphenhydramine', cat: 'Emergency', dose: '1-2 mg/kg', note: 'Anaphylaxis/allergy. Max 50 mg.', noteJa: 'アナフィラキシー/アレルギー。最大 50 mg。', max: 50 },
    { name: 'Hydrocortisone', cat: 'Emergency', dose: '2 mg/kg', note: 'Asthma / anaphylaxis / adrenal crisis.', noteJa: '喘息 / アナフィラキシー / 副腎クリーゼ。', max: 100 },
    { name: 'Methylprednisolone (Asthma)', cat: 'Emergency', dose: '1-2 mg/kg', note: 'Then 0.5-2 mg/kg q6h.', noteJa: 'その後 0.5-2 mg/kg q6h。', max: 60 },
    { name: 'Methylprednisolone (Cord)', cat: 'Emergency', dose: '30 mg/kg', note: 'Spinal cord protection: 30 mg/kg over 15 min then 5.4 mg/kg/hr.', noteJa: '脊髄保護: 30 mg/kg を 15 分かけて、続いて 5.4 mg/kg/hr。', max: null },
    { name: 'Methylprednisolone (Adrenal)', cat: 'Emergency', dose: '2 mg/kg', note: 'Adrenal supplementation.', noteJa: '副腎補充。', max: null },
    { name: 'Albuterol (Neb)', cat: 'Emergency', dose: '0.15 mg/kg', note: 'Min 2.5 mg. Bronchospasm.', noteJa: '最小 2.5 mg。気管支痙攣。', max: 5 },
    { name: 'Lorazepam', cat: 'Emergency', dose: '0.1 mg/kg', note: 'IV/IM. Status epilepticus. Max 4 mg.', noteJa: 'IV/IM。てんかん重積。最大 4 mg。', max: 4 },
    { name: 'Midazolam (IM/IN)', cat: 'Emergency', dose: '0.2 mg/kg', note: 'Seizure / pre-med if no IV.', noteJa: 'IV なしの痙攣 / 前投薬。', max: 10 },

    // ============================================================================
    // SEDATION / INDUCTION
    // ============================================================================
    { name: 'Propofol (Induction)', cat: 'Sedation', dose: '2-5 mg/kg', note: 'IV induction. Pain on injection.', noteJa: 'IV 導入。注射時痛あり。', max: null },
    { name: 'Propofol (Infusion)', cat: 'Sedation', dose: '75-300 mcg/kg/min', note: 'TIVA maintenance. Standard 10 mg/mL.', noteJa: 'TIVA 維持。標準 10 mg/mL。', max: null },
    { name: 'Ketamine (Induction IV)', cat: 'Sedation', dose: '2 mg/kg', note: 'IV induction. Add atropine 0.02 mg/kg & midazolam 0.1-0.15 mg/kg.', noteJa: 'IV 導入。アトロピン 0.02 mg/kg + midazolam 0.1-0.15 mg/kg を追加。', max: null },
    { name: 'Ketamine (Sedation IM)', cat: 'Sedation', dose: '2-3 mg/kg', note: 'IM sedation.', noteJa: 'IM 鎮静。', max: null },
    { name: 'Ketamine (GA IM)', cat: 'Sedation', dose: '5-8 mg/kg', note: 'IM general anesthesia.', noteJa: 'IM 全身麻酔。', max: null },
    { name: 'Midazolam (IV)', cat: 'Sedation', dose: '0.05-0.1 mg/kg', note: 'IV increments. Max ~5-10 mg.', noteJa: 'IV 漸増。最大 ~5-10 mg。', max: 5 },
    { name: 'Dexmedetomidine (Load)', cat: 'Sedation', dose: '0.5-2 mcg/kg', note: 'IV over 10 min. DO NOT push.', noteJa: 'IV を 10 分かけて。急速投与不可。', max: null },
    { name: 'Dexmedetomidine (Maint)', cat: 'Sedation', dose: '0.2-1 mcg/kg/hr', note: 'Maintenance infusion.', noteJa: '維持投与。', max: null },
    { name: 'Dexmedetomidine (Nasal)', cat: 'Sedation', dose: '1-3 mcg/kg', note: 'Intranasal pre-med.', noteJa: '経鼻前投薬。', max: null },
    { name: 'Remifentanil (Bolus)', cat: 'Sedation', dose: '0.5-1 mcg/kg', note: 'IV bolus.', noteJa: 'IV ボーラス。', max: null },
    { name: 'Remifentanil (Sedation)', cat: 'Sedation', dose: '0.02-0.1 mcg/kg/min', note: 'Sedation rate.', noteJa: '鎮静レート。', max: null },
    { name: 'Remifentanil (GA)', cat: 'Sedation', dose: '0.2-0.8 mcg/kg/min', note: 'General anesthesia rate.', noteJa: '全身麻酔レート。', max: null },
    { name: 'Sufentanil (Bolus)', cat: 'Sedation', dose: '0.1 mcg/kg', note: 'IV bolus.', noteJa: 'IV ボーラス。', max: null },
    { name: 'Sufentanil (Infusion)', cat: 'Sedation', dose: '0.1-0.5 mcg/kg/hr', note: 'Maintenance infusion.', noteJa: '維持投与。', max: null },
    { name: 'Etomidate', cat: 'Sedation', dose: '0.3 mg/kg', note: 'IV induction (range 0.2-0.6). Adrenal suppression.', noteJa: 'IV 導入(範囲 0.2-0.6)。副腎抑制あり。', max: null },
    { name: 'Thiopental (Induction)', cat: 'Sedation', dose: '5-8 mg/kg', note: 'IV induction.', noteJa: 'IV 導入。', max: null },
    { name: 'Thiopental (Increment)', cat: 'Sedation', dose: '0.5-1 mg/kg', note: 'IV maintenance increment.', noteJa: 'IV 維持の追加投与。', max: null },
    { name: 'Pentobarbital (IM/PO)', cat: 'Sedation', dose: '2-6 mg/kg', note: 'Max 200 mg.', noteJa: '最大 200 mg。', max: 200 },
    { name: 'Pentobarbital (IV)', cat: 'Sedation', dose: '1-3 mg/kg', note: 'IV titrate.', noteJa: 'IV 漸増。', max: null },
    { name: 'Chloral Hydrate', cat: 'Sedation', dose: '50 mg/kg', note: 'PO sedation (rare).', noteJa: '経口鎮静(稀)。', max: null },

    // ============================================================================
    // PAIN / ANALGESIA
    // ============================================================================
    { name: 'Fentanyl (IV/Intranasal)', cat: 'Pain', dose: '1-2 mcg/kg', note: 'IV/IN increments.', noteJa: 'IV/IN 漸増。', max: null },
    { name: 'Fentanyl (Infusion)', cat: 'Pain', dose: '1-5 mcg/kg/hr', note: 'IV maintenance.', noteJa: 'IV 維持。', max: null },
    { name: 'Morphine (IV)', cat: 'Pain', dose: '0.1 mg/kg', note: 'IV increments.', noteJa: 'IV 漸増。', max: null },
    { name: 'Morphine (Epidural)', cat: 'Pain', dose: '30 mcg/kg', note: 'Preservative-free. 10-30 mcg/kg.', noteJa: '保存剤無添加。10-30 mcg/kg。', max: null },
    { name: 'Hydromorphone (IV)', cat: 'Pain', dose: '15-30 mcg/kg', note: 'IV q3-6h (= 0.015-0.03 mg/kg).', noteJa: 'IV q3-6h (= 0.015-0.03 mg/kg)。', max: null },
    { name: 'Hydromorphone (PO/PR)', cat: 'Pain', dose: '50-80 mcg/kg', note: 'PO/PR q3-6h.', noteJa: 'PO/PR q3-6h。', max: null },
    { name: 'Methadone', cat: 'Pain', dose: '0.1 mg/kg', note: 'IV/IM/PO/SQ q8-12h. Long acting.', noteJa: 'IV/IM/PO/SQ q8-12h。長時間作用。', max: null },
    { name: 'Meperidine (Demerol)', cat: 'Pain', dose: '0.3-2 mg/kg', note: 'Postop shivering primarily.', noteJa: '主に術後シバリング目的。', max: null },
    { name: 'Acetaminophen (IV)', cat: 'Pain', dose: 'apap_iv_age', note: 'IV. Neonate ≤2yr 10 mg/kg q6h, ≥2yr 15 mg/kg q6h, ≥50kg 1 g q6h. Max 60-75 mg/kg/day.', noteJa: 'IV。新生児〜2 歳 10 mg/kg q6h、2 歳以上 15 mg/kg q6h、50 kg 以上 1 g q6h。最大 60-75 mg/kg/日。', max: 1000 },
    { name: 'Acetaminophen (PO)', cat: 'Pain', dose: '10-15 mg/kg', note: 'PO q4-6h.', noteJa: 'PO q4-6h。', max: 1000 },
    { name: 'Acetaminophen (PR)', cat: 'Pain', dose: '20-40 mg/kg', note: 'PR initial dose only. Subsequent 10-15 mg/kg.', noteJa: 'PR は初回のみ。以後 10-15 mg/kg。', max: 1300 },
    { name: 'Ketorolac', cat: 'Pain', dose: '0.5-1 mg/kg', note: 'IM/IV load then 0.5 mg/kg q6h. Max 30 mg.', noteJa: 'IM/IV ローディング後 0.5 mg/kg q6h。最大 30 mg。', max: 30,
        ageRules: [
            { maxMonths: 6, badge: 'caution', label: '<6 months — generally avoided (renal immaturity, bleeding risk)', labelJa: '<6 ヶ月 — 原則回避(腎未熟、出血リスク)' }
        ]
    },
    { name: 'Ibuprofen (PO/PR)', cat: 'Pain', dose: '6-10 mg/kg', note: 'q6h.', noteJa: 'q6h。', max: 600,
        ageRules: [
            { maxMonths: 6, badge: 'caution', label: '<6 months — caution (renal immaturity)', labelJa: '<6 ヶ月 — 注意(腎未熟)' }
        ]
    },
    { name: 'Naproxen (PO)', cat: 'Pain', dose: '5-7 mg/kg', note: 'q8-12h.', noteJa: 'q8-12h。', max: 500,
        ageRules: [
            { maxYears: 2, badge: 'caution', label: '<2 years — generally avoided', labelJa: '<2 歳 — 原則回避' }
        ]
    },
    { name: 'Choline Mag Trisalicylate', cat: 'Pain', dose: '10-15 mg/kg', note: 'PO q4-6h (Trilisate).', noteJa: 'PO q4-6h (Trilisate)。', max: null },
    { name: 'OxyCODONE', cat: 'Pain', dose: '0.1 mg/kg', note: 'PO q4-6h.', noteJa: 'PO q4-6h。', max: 10 },
    { name: 'Nalbuphine', cat: 'Pain', dose: '0.1 mg/kg', note: 'IV/IM/SQ.', noteJa: 'IV/IM/SQ。', max: null },
    { name: 'Butorphanol', cat: 'Pain', dose: '10-20 mcg/kg', note: 'IV/IM/intranasal.', noteJa: 'IV/IM/経鼻。', max: null },
    { name: 'Tramadol', cat: 'Pain', dose: '1-2 mg/kg', note: 'Not routine in pediatric anesthesia.', noteJa: '小児麻酔ではルーチン使用しない。', max: null,
        ageRules: [
            { maxYears: 12, badge: 'contraindicated', dose: '0 mg/kg', max: 0, label: 'FDA black-box <12 yr (post-tonsillectomy resp depression / death)', labelJa: 'FDA ブラックボックス警告 <12 歳(扁桃摘出後の呼吸抑制 / 死亡)' }
        ]
    },

    // ============================================================================
    // RELAXANTS / REVERSAL
    // ============================================================================
    { name: 'Rocuronium (IV)', cat: 'Relaxant', dose: '0.6-1.2 mg/kg', note: 'IV intubation.', noteJa: 'IV 挿管。', max: null },
    { name: 'Rocuronium (IM)', cat: 'Relaxant', dose: '1-1.8 mg/kg', note: 'IM if no IV.', noteJa: 'IV なしなら IM。', max: null },
    { name: 'Rocuronium (Infusion)', cat: 'Relaxant', dose: '4-16 mcg/kg/min', note: 'Maintenance infusion.', noteJa: '維持投与。', max: null },
    { name: 'Vecuronium (IV)', cat: 'Relaxant', dose: '0.1 mg/kg', note: 'IV intubation.', noteJa: 'IV 挿管。', max: null },
    { name: 'Vecuronium (Infusion)', cat: 'Relaxant', dose: '0.1-0.25 mg/kg/hr', note: 'Maintenance infusion.', noteJa: '維持投与。', max: null },
    { name: 'Pancuronium', cat: 'Relaxant', dose: '0.1 mg/kg', note: 'IV. Long acting.', noteJa: 'IV。長時間作用。', max: null },
    { name: 'Cis-Atracurium (IV)', cat: 'Relaxant', dose: '0.1-0.2 mg/kg', note: 'IV. Hofmann elimination. Redose 0.03 mg/kg.', noteJa: 'IV。Hofmann 消失。追加 0.03 mg/kg。', max: null },
    { name: 'Cis-Atracurium (Infusion)', cat: 'Relaxant', dose: '1-4 mcg/kg/min', note: 'Maintenance infusion.', noteJa: '維持投与。', max: null },
    { name: 'Sugammadex', cat: 'Reversal', dose: '2 mg/kg', note: '2 mg/kg (TOF ≥2), 4 mg/kg (PTC 1-2), 16 mg/kg immediate (Roc only).', noteJa: '2 mg/kg (TOF ≥2)、4 mg/kg (PTC 1-2)、16 mg/kg 即時拮抗(Roc のみ)。', max: null },
    { name: 'Neostigmine', cat: 'Reversal', dose: '0.03-0.07 mg/kg', note: 'IV reversal. Give with glycopyrrolate. Max 5 mg.', noteJa: 'IV 拮抗。グリコピロラート併用。最大 5 mg。', max: 5 },
    { name: 'Glycopyrrolate', cat: 'Reversal', dose: '15 mcg/kg', note: 'IV with neostigmine (= 0.015 mg/kg).', noteJa: 'IV neostigmine 併用 (= 0.015 mg/kg)。', max: null },

    // ============================================================================
    // CARDIOVASCULAR / PRESSORS
    // ============================================================================
    { name: 'Epinephrine (Infusion)', cat: 'CV', dose: '0.02-1 mcg/kg/min', note: 'Inotrope/pressor. Central preferred.', noteJa: '陽性変力/昇圧。中心静脈推奨。', max: null },
    { name: 'Norepinephrine (Infusion)', cat: 'CV', dose: '0.05-1 mcg/kg/min', note: 'Pressor. Central preferred.', noteJa: '昇圧。中心静脈推奨。', max: null },
    { name: 'Dopamine (Infusion)', cat: 'CV', dose: '2-20 mcg/kg/min', note: 'Inotrope. Vesicant.', noteJa: '陽性変力。血管刺激性あり。', max: null },
    { name: 'Dobutamine (Infusion)', cat: 'CV', dose: '2-20 mcg/kg/min', note: 'β1 inotrope.', noteJa: 'β1 陽性変力。', max: null },
    { name: 'Milrinone (Load)', cat: 'CV', dose: '25-50 mcg/kg', note: 'Load over 20 min. Watch BP.', noteJa: '20 分かけてローディング。BP に注意。', max: null },
    { name: 'Milrinone (Infusion)', cat: 'CV', dose: '0.25-0.75 mcg/kg/min', note: 'Maintenance. Standard 200 mcg/mL.', noteJa: '維持。標準 200 mcg/mL。', max: null },
    { name: 'Ephedrine', cat: 'CV', dose: '0.2-0.3 mg/kg', note: 'IV bolus. Max 10 mg.', noteJa: 'IV ボーラス。最大 10 mg。', max: 10 },
    { name: 'Phenylephrine (Bolus)', cat: 'CV', dose: '5-10 mcg/kg', note: 'IV bolus.', noteJa: 'IV ボーラス。', max: null },
    { name: 'Phenylephrine (Infusion)', cat: 'CV', dose: '0.5-20 mcg/kg/min', note: 'IV infusion.', noteJa: 'IV 持続。', max: null },
    { name: 'Nicardipine (Infusion)', cat: 'CV', dose: '1-5 mcg/kg/min', note: 'Antihypertensive. Adult 2.5-15 mg/hr.', noteJa: '降圧薬。成人 2.5-15 mg/hr。', max: null },
    { name: 'Nitroglycerine (Infusion)', cat: 'CV', dose: '0.5-20 mcg/kg/min', note: 'Vasodilator.', noteJa: '血管拡張薬。', max: null },
    { name: 'Nitroprusside (Infusion)', cat: 'CV', dose: '0.5-10 mcg/kg/min', note: 'Vasodilator. Watch cyanide.', noteJa: '血管拡張薬。シアン化物に注意。', max: null },
    { name: 'Esmolol (Load)', cat: 'CV', dose: '500 mcg/kg', note: 'IV load over 2 min, then maintenance.', noteJa: '2 分かけて IV ローディング、その後維持。', max: null },
    { name: 'Esmolol (Infusion)', cat: 'CV', dose: '25-300 mcg/kg/min', note: 'Maintenance infusion.', noteJa: '維持投与。', max: null },
    { name: 'Labetalol', cat: 'CV', dose: '0.1 mg/kg', note: 'IV increments.', noteJa: 'IV 漸増。', max: null },
    { name: 'Hydralazine', cat: 'CV', dose: '0.1-0.5 mg/kg', note: 'IV q4h. Max 20 mg/dose. Adult 10-20 mg.', noteJa: 'IV q4h。1 回最大 20 mg。成人 10-20 mg。', max: 20 },
    { name: 'Vasopressin (Infusion)', cat: 'CV', dose: '0.3-2 mU/kg/min', note: 'Pressor (= 0.0003-0.002 U/kg/min).', noteJa: '昇圧 (= 0.0003-0.002 U/kg/min)。', max: null },
    { name: 'Vasopressin (DI)', cat: 'CV', dose: '0.5-3 mU/kg/hr', note: 'Diabetes insipidus.', noteJa: '尿崩症。', max: null },
    { name: 'Prostaglandin E1', cat: 'CV', dose: '0.05-2 mcg/kg/min', note: 'Ductal-dependent CHD. Watch apnea — start low (0.05 mcg/kg/min) and titrate up.', noteJa: '動脈管依存 CHD。無呼吸に注意 — 低用量 (0.05 mcg/kg/min) で開始し漸増。', max: null },
    { name: 'Isoproterenol', cat: 'CV', dose: '0.05-10 mcg/kg/min', note: 'IV β1-chronotrope.', noteJa: 'IV β1 陽性変時。', max: null },
    { name: 'Clevidipine (Infusion)', cat: 'CV', dose: '0.5-5 mcg/kg/min', note: 'Lipid-based Ca-channel blocker. Adult 1-21 mg/hr.', noteJa: '脂肪乳剤製剤の Ca 拮抗薬。成人 1-21 mg/hr。', max: null },
    { name: 'Phentolamine (Bolus)', cat: 'CV', dose: '0.05-0.1 mg/kg', note: 'α-blocker. Max 5 mg.', noteJa: 'α 遮断薬。最大 5 mg。', max: 5 },
    { name: 'Phentolamine (Infusion)', cat: 'CV', dose: '2-20 mcg/kg/min', note: 'α-blocker infusion.', noteJa: 'α 遮断薬持続。', max: null },
    { name: 'Procainamide (Load)', cat: 'CV', dose: '2-6 mg/kg', note: 'IV q5min up to 15 mg/kg total. Watch QRS.', noteJa: 'IV q5 分、総量 15 mg/kg まで。QRS に注意。', max: null },
    { name: 'Procainamide (Infusion)', cat: 'CV', dose: '20-80 mcg/kg/min', note: 'Maintenance.', noteJa: '維持。', max: null },
    { name: 'Tolazoline (Test)', cat: 'CV', dose: '1 mg/kg', note: 'IV test dose for pulmonary HTN.', noteJa: '肺高血圧の IV テストドーズ。', max: null },
    { name: 'Tolazoline (Infusion)', cat: 'CV', dose: '15-30 mcg/kg/min', note: 'Pulm HTN infusion.', noteJa: '肺高血圧持続投与。', max: null },
    { name: 'Heparin (Bolus)', cat: 'CV', dose: '50-100 Units/kg', note: 'IV bolus. Follow ACT/PTT.', noteJa: 'IV ボーラス。ACT/PTT でフォロー。', max: null },
    { name: 'Heparin (Infusion)', cat: 'CV', dose: '10-25 Units/kg/hr', note: 'Maintenance. Follow ACT/PTT.', noteJa: '維持。ACT/PTT でフォロー。', max: null },
    { name: 'Protamine', cat: 'CV', dose: '1 mg', note: 'Per 100 Units heparin. Slow IV.', noteJa: 'ヘパリン 100 単位ごと。緩徐 IV。', max: null },
    { name: 'Propranolol (TET spell)', cat: 'CV', dose: '0.15-0.25 mg/kg', note: 'IV for TET spell.', noteJa: 'TET 発作時の IV。', max: null },
    { name: 'Propranolol (Dysrhythmia)', cat: 'CV', dose: '0.01-0.1 mg/kg', note: 'IV per dose.', noteJa: 'IV 1 回量。', max: null },

    // ============================================================================
    // NEURO / SEIZURE
    // ============================================================================
    { name: 'Mannitol (ICP)', cat: 'Neuro', dose: '0.25-1 g/kg', note: 'Slow IV infusion for ICP.', noteJa: 'ICP 上昇時の緩徐 IV。', max: null },
    { name: 'Mannitol (Diuresis)', cat: 'Neuro', dose: '1-2 g/kg', note: 'Slow IV infusion for diuresis.', noteJa: '利尿目的の緩徐 IV。', max: null },
    { name: 'Levetiracetam (Keppra)', cat: 'Neuro', dose: '20-50 mg/kg', note: 'IV over 15 min. Adult 1-3 g.', noteJa: '15 分かけて IV。成人 1-3 g。', max: 3000 },
    { name: 'Fosphenytoin', cat: 'Neuro', dose: '10-20 mg/kg', note: 'IV PE load over 10-20 min.', noteJa: 'IV PE ローディングを 10-20 分かけて。', max: null },
    { name: 'Phenobarbital', cat: 'Neuro', dose: '15-25 mg/kg', note: 'IV seizure load. Then 4-6 mg/kg/day PO.', noteJa: '痙攣の IV ローディング。その後 4-6 mg/kg/日 PO。', max: null },
    { name: 'Diazepam (IV)', cat: 'Neuro', dose: '0.05-0.1 mg/kg', note: 'IV seizure / anxiolysis.', noteJa: 'IV 痙攣 / 抗不安。', max: 10 },

    // ============================================================================
    // OTHER / SUPPORTIVE
    // ============================================================================
    { name: 'Dexamethasone (Stridor)', cat: 'Other', dose: '0.2-0.5 mg/kg', note: 'Airway edema / stridor. Max 10-12 mg.', noteJa: '気道浮腫 / 喘鳴。最大 10-12 mg。', max: 12 },
    { name: 'Dexamethasone (PONV)', cat: 'Other', dose: '0.4 mg/kg', note: 'IV PONV prophylaxis.', noteJa: 'IV PONV 予防。', max: 10 },
    { name: 'Dexamethasone (ICP)', cat: 'Other', dose: '1-2 mg/kg', note: 'Then 0.25-0.35 mg/kg q6h.', noteJa: 'その後 0.25-0.35 mg/kg q6h。', max: null },
    { name: 'Ondansetron', cat: 'Other', dose: '0.15 mg/kg', note: 'IV/PO q4h. PONV. Max 4 mg.', noteJa: 'IV/PO q4h。PONV。最大 4 mg。', max: 4 },
    { name: 'Metoclopramide', cat: 'Other', dose: '0.1 mg/kg', note: 'IV/PO prokinetic.', noteJa: 'IV/PO 消化管運動促進。', max: 10 },
    { name: 'Droperidol', cat: 'Other', dose: '15-60 mcg/kg', note: 'IV/IM. Watch QT.', noteJa: 'IV/IM。QT に注意。', max: null },
    { name: 'Furosemide (Bolus)', cat: 'Other', dose: '0.5-2 mg/kg', note: 'Slow IV (ototoxic).', noteJa: '緩徐 IV(耳毒性)。', max: null },
    { name: 'Furosemide (Infusion)', cat: 'Other', dose: '0.1-0.4 mg/kg/hr', note: 'Continuous diuresis.', noteJa: '持続利尿。', max: null },
    { name: 'Magnesium Sulfate', cat: 'Other', dose: '25-75 mg/kg', note: 'IV over 30 min. Asthma/torsades. Max 2 g.', noteJa: '30 分かけて IV。喘息 / torsades。最大 2 g。', max: 2000 },
    { name: 'Insulin (Bolus)', cat: 'Other', dose: '0.1 Units/kg', note: 'IV/SQ. Hyperkalemia/DKA.', noteJa: 'IV/SQ。高 K 血症 / DKA。', max: null },
    { name: 'Insulin (Infusion)', cat: 'Other', dose: '0.1 Units/kg/hr', note: 'IV maintenance.', noteJa: 'IV 維持。', max: null },
    { name: 'Glucagon', cat: 'Other', dose: '0.1 mg/kg', note: 'Hypoglycemia / β-blocker OD. Max 1 mg.', noteJa: '低血糖 / β 遮断薬過量。最大 1 mg。', max: 1 },
    { name: 'Tranexamic Acid (Load)', cat: 'Other', dose: '50-100 mg/kg', note: 'IV load.', noteJa: 'IV ローディング。', max: null },
    { name: 'Tranexamic Acid (Infusion)', cat: 'Other', dose: '5 mg/kg/hr', note: 'Maintenance.', noteJa: '維持。', max: null },
    { name: 'Aminocaproic Acid (Load)', cat: 'Other', dose: '100-200 mg/kg', note: 'IV/PO load over 30 min.', noteJa: '30 分かけて IV/PO ローディング。', max: null },
    { name: 'Aminocaproic Acid (Infusion)', cat: 'Other', dose: '10-33 mg/kg/hr', note: 'Maintenance.', noteJa: '維持。', max: null },
    { name: 'Novoseven', cat: 'Other', dose: '90 mcg/kg', note: 'rFVIIa over 2-5 min. Range 35-120 mcg/kg, repeat q2h.', noteJa: 'rFVIIa を 2-5 分かけて。範囲 35-120 mcg/kg、q2h で反復。', max: null },
    { name: 'DDAVP', cat: 'Other', dose: '0.3 mcg/kg', note: 'IV. Bleeding / DI.', noteJa: 'IV。出血 / DI。', max: null },
    { name: 'Promethazine', cat: 'Other', dose: '0.25-1 mg/kg', note: 'IV/IM/PO q4-6h. Phenergan.', noteJa: 'IV/IM/PO q4-6h。Phenergan。', max: 25,
        ageRules: [
            { maxYears: 2, badge: 'contraindicated', dose: '0 mg/kg', max: 0, label: 'CONTRAINDICATED <2 yr (FDA black-box: severe respiratory depression)', labelJa: '<2 歳で禁忌(FDA ブラックボックス: 重度呼吸抑制)' }
        ]
    },
    { name: 'Prochlorperazine', cat: 'Other', dose: '0.1-0.15 mg/kg', note: 'PO/IM/PR q6-8h. Compazine.', noteJa: 'PO/IM/PR q6-8h。Compazine。', max: 10 },
    { name: 'Tigan (Trimethobenzamide)', cat: 'Other', dose: '100-200 mg', note: 'PO/PR fixed dose.', noteJa: 'PO/PR 固定量。', max: null },
    { name: 'Dolasetron', cat: 'Other', dose: '0.35 mg/kg', note: 'IV. Anzemet.', noteJa: 'IV。Anzemet。', max: 12.5 },
    { name: 'Granisetron', cat: 'Other', dose: '10 mcg/kg', note: 'IV/IM. Kytril.', noteJa: 'IV/IM。Kytril。', max: null },
    { name: 'Haloperidol', cat: 'Other', dose: '10-30 mcg/kg', note: 'IV/IM.', noteJa: 'IV/IM。', max: null },
    { name: 'Scopolamine', cat: 'Other', dose: '6 mcg/kg', note: 'IV/IM. Max 0.4 mg.', noteJa: 'IV/IM。最大 0.4 mg。', max: 400 },
    { name: 'Ranitidine (PO)', cat: 'Other', dose: '2 mg/kg', note: 'PO H2 blocker.', noteJa: 'PO H2 ブロッカー。', max: 150 },
    { name: 'Ranitidine (IV)', cat: 'Other', dose: '1 mg/kg', note: 'IV H2 blocker.', noteJa: 'IV H2 ブロッカー。', max: 50 },
    { name: 'Oxybutynin', cat: 'Other', dose: '0.1 mg/kg', note: 'PO bladder spasm.', noteJa: 'PO 膀胱スパズム。', max: null },
    { name: 'Terbutaline (SQ)', cat: 'Other', dose: '5-10 mcg/kg', note: 'SQ q15min × 2. Max 250 mcg.', noteJa: 'SQ q15 分 × 2。最大 250 mcg。', max: 250 },
    { name: 'Terbutaline (Bolus)', cat: 'Other', dose: '10 mcg/kg', note: 'IV bolus before infusion.', noteJa: '持続前の IV ボーラス。', max: null },
    { name: 'Terbutaline (Infusion)', cat: 'Other', dose: '0.2-10 mcg/kg/min', note: 'IV maintenance.', noteJa: 'IV 維持。', max: null },

    // ============================================================================
    // ANTIBIOTICS
    // ============================================================================
    // Note: many neonate doses are smaller (CDC dosing). q-interval extends if <37 wk PCA.
    { name: 'Cefazolin (Ancef)', cat: 'Antibiotic', dose: '50 mg/kg', neonateDose: '25 mg/kg', note: 'q3h (q6h <37wk PCA). Surgical ppx. Max 2 g.', noteJa: 'q3h (PCA <37 週は q6h)。術前予防。最大 2 g。', max: 2000, neonateMax: 2000 },
    { name: 'Cefoxitin', cat: 'Antibiotic', dose: '40 mg/kg', neonateDose: '30 mg/kg', note: 'q3h (q6h <37wk PCA). Max 2 g.', noteJa: 'q3h (PCA <37 週は q6h)。最大 2 g。', max: 2000 },
    { name: 'Ceftriaxone', cat: 'Antibiotic', dose: 'ceftriaxone_check', note: 'q24h. NEVER under 30 days of age. Max 2 g (1 g for IE ppx).', noteJa: 'q24h。生後 30 日未満では絶対禁忌。最大 2 g (IE 予防は 1 g)。', max: 2000 },
    { name: 'Cefotaxime', cat: 'Antibiotic', dose: '50 mg/kg', note: 'Neonatal sepsis (alt to Ceftriaxone). Max 2 g.', noteJa: '新生児敗血症 (Ceftriaxone 代替)。最大 2 g。', max: 2000 },
    { name: 'Ampicillin', cat: 'Antibiotic', dose: '50 mg/kg', neonateDose: '50 mg/kg', note: 'q3h (q6h <37wk PCA). Max 2 g.', noteJa: 'q3h (PCA <37 週は q6h)。最大 2 g。', max: 2000 },
    { name: 'Ampicillin/Sulbactam', cat: 'Antibiotic', dose: '50 mg/kg', neonateDose: '50 mg/kg', note: 'q3h (q6h <37wk PCA). Max 2 g.', noteJa: 'q3h (PCA <37 週は q6h)。最大 2 g。', max: 2000 },
    { name: 'Vancomycin', cat: 'Antibiotic', dose: '20 mg/kg', neonateDose: '15 mg/kg', note: 'q6h (q12h <37wk PCA). Slow IV >1 hr. Max 2 g.', noteJa: 'q6h (PCA <37 週は q12h)。1 時間超かけて緩徐 IV。最大 2 g。', max: 2000 },
    { name: 'Gentamicin', cat: 'Antibiotic', dose: '5 mg/kg', neonateDose: '5 mg/kg', note: 'q24h (q36h <37wk PCA).', noteJa: 'q24h (PCA <37 週は q36h)。', max: null },
    { name: 'Metronidazole', cat: 'Antibiotic', dose: '15 mg/kg', neonateDose: '7.5 mg/kg', note: 'q6h (q12h <37wk PCA). Max 1 g.', noteJa: 'q6h (PCA <37 週は q12h)。最大 1 g。', max: 1000 },
    { name: 'Clindamycin', cat: 'Antibiotic', dose: '20 mg/kg', neonateDose: '10 mg/kg', note: 'q3h (q6h <37wk PCA). Redose 10 mg/kg. Max 900 mg.', noteJa: 'q3h (PCA <37 週は q6h)。追加 10 mg/kg。最大 900 mg。', max: 900 },
    { name: 'Piperacillin/Tazobactam', cat: 'Antibiotic', dose: '100 mg/kg', neonateDose: '100 mg/kg', note: 'q3h (q6h <37wk PCA). Max 4 g.', noteJa: 'q3h (PCA <37 週は q6h)。最大 4 g。', max: 4000 },
    { name: 'Nafcillin', cat: 'Antibiotic', dose: '50 mg/kg', neonateDose: '25 mg/kg', note: 'q3h (q6h <37wk PCA). Max 2 g.', noteJa: 'q3h (PCA <37 週は q6h)。最大 2 g。', max: 2000 },
    { name: 'Ciprofloxacin', cat: 'Antibiotic', dose: '10 mg/kg', neonateDose: '10 mg/kg', note: 'q6h (q6h <37wk PCA). Max 400 mg.', noteJa: 'q6h (PCA <37 週も q6h)。最大 400 mg。', max: 400 },
    { name: 'Amoxicillin (Oral)', cat: 'Antibiotic', dose: '50 mg/kg', note: 'IE prophylaxis 30-60 min before procedure. Max 2 g.', noteJa: 'IE 予防、手技 30-60 分前。最大 2 g。', max: 2000 },
    { name: 'Cephalexin (Oral)', cat: 'Antibiotic', dose: '50 mg/kg', note: 'IE prophylaxis. Max 2 g.', noteJa: 'IE 予防。最大 2 g。', max: 2000 },
    { name: 'Azithromycin (Oral)', cat: 'Antibiotic', dose: '15 mg/kg', note: 'IE prophylaxis. Max 500 mg.', noteJa: 'IE 予防。最大 500 mg。', max: 500 },
    { name: 'Clarithromycin (Oral)', cat: 'Antibiotic', dose: '15 mg/kg', note: 'IE prophylaxis. Max 500 mg.', noteJa: 'IE 予防。最大 500 mg。', max: 500 },
];
