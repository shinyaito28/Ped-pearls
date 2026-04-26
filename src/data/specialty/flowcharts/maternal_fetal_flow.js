// Maternal-Fetal Anesthesia Flow Charts — NCH Fetal Medicine.
// Source: NCH Sharepoint / Fetal Medicine / Maternal-Fetal Anesthesia Flow Charts_March 2026.pdf
//
// Five procedure types, each with its own room set-up, meds, intra-op flow,
// and post-op disposition. The picker selects which procedure's protocol
// is shown.

export const entry = {
    id: 'flow_maternal_fetal',
    hub: 'fetal',
    kind: 'flowchart',
    title: 'Maternal-Fetal Anesthesia Flows',
    titleJa: '母体-胎児麻酔フロー',
    shortDescription: 'Picker for 5 fetal procedure types — MIFS, mid-gestation, EXIT-resection, EXIT-airway, scheduled cesarean.',
    shortDescriptionJa: '5 つの胎児手技タイプ用ピッカー — MIFS、中期妊娠、EXIT-resection、EXIT-airway、予定帝切。',
    tags: ['fetal surgery', 'mifs', 'exit', 'mid-gestation', 'scheduled cesarean', 'cse', 'epidural', 'magnesium', 'nitroglycerin', 'uterine relaxation'],
    emergency: true,
    weightAware: false, // doses are weight-based for the FETUS only — manual calc
    ageRules: null,
    source: 'NCH Sharepoint / Fetal Medicine',
    lastReviewed: '2026-04',
    component: 'MaternalFetalCard',
};

// Common pre-op gastric prophylaxis given for all fetal procedures.
export const commonPreop = [
    'Sodium citrate, famotidine, and metoclopramide given in pre-op',
    'Pre-evaluation — consider IV midazolam',
    'Confirm maternal (and fetal if applicable) blood available',
];

export const commonPreopJa = [
    '術前にクエン酸ナトリウム、ファモチジン、メトクロプラミドを投与',
    '術前評価 — IV midazolam を検討',
    '母体(および該当時は胎児)血液の利用可能性を確認',
];

// Generic maternal hemodynamic targets — same across procedures.
export const maternalHemodynamics = {
    bp: 'SBP > 100 or MAP within 10–20% of baseline',
    bpJa: 'SBP > 100 または MAP をベースラインの 10-20% 以内',
    pressors: [
        'Ephedrine 5–10 mg IV boluses prn',
        'Phenylephrine 50–100 mcg IV boluses prn',
        'Phenylephrine infusion available (0.1–0.5 mcg/kg/min)',
    ],
    pressorsJa: [
        'エフェドリン 5-10 mg IV ボーラス頓用',
        'フェニレフリン 50-100 mcg IV ボーラス頓用',
        'フェニレフリン持続を準備 (0.1-0.5 mcg/kg/min)',
    ],
    fluids: 'Limit IV fluids if mother on pre-op magnesium sulfate',
    fluidsJa: '母体が術前マグネシウム硫酸投与中なら IV 輸液を制限',
};

// Fetal IM cocktail (per procedure variants below).
export const fetalCocktailMidGestation = [
    'Fentanyl 10 mcg/kg',
    'Atropine 20 mcg/kg',
    'Vecuronium 0.2 mg/kg',
];
export const fetalCocktailMidGestationJa = [
    'フェンタニル 10 mcg/kg',
    'アトロピン 20 mcg/kg',
    'Vecuronium 0.2 mg/kg',
];
export const fetalCocktailExit = [
    'Fentanyl 5 mcg/kg',
    'Atropine 20 mcg/kg',
    'Vecuronium 0.1 mg/kg',
];
export const fetalCocktailExitJa = [
    'フェンタニル 5 mcg/kg',
    'アトロピン 20 mcg/kg',
    'Vecuronium 0.1 mg/kg',
];

// Fetal emergency drugs (per procedure variants below).
export const fetalEmergencyMidGestation = [
    'Atropine 0.1 mg in TB syringe ×3',
    'Epinephrine 1 mcg/kg in TB syringe ×3',
    'Epinephrine 10 mcg/kg in TB syringe ×3',
];
export const fetalEmergencyMidGestationJa = [
    'アトロピン 0.1 mg を TB シリンジ ×3',
    'エピネフリン 1 mcg/kg を TB シリンジ ×3',
    'エピネフリン 10 mcg/kg を TB シリンジ ×3',
];
export const fetalEmergencyExit = [
    'Atropine 0.1 mg in TB syringe ×2',
    'Epinephrine 10 mcg/kg in TB syringe ×2',
    'Heparin 100 units/kg if ECMO possible (EXIT-to-Resection only)',
];
export const fetalEmergencyExitJa = [
    'アトロピン 0.1 mg を TB シリンジ ×2',
    'エピネフリン 10 mcg/kg を TB シリンジ ×2',
    'ECMO 可能性あればヘパリン 100 units/kg (EXIT-to-Resection のみ)',
];

export const procedures = [
    {
        id: 'mifs',
        label: 'Minimally Invasive Fetal Surgery',
        labelJa: '低侵襲胎児手術 (MIFS)',
        anesthesia: 'Anesthetic depends on placenta location',
        anesthesiaJa: '麻酔法は胎盤の位置による',
        keyPoints: [
            'Posterior placenta: local + dexmedetomidine and/or remifentanil infusion',
            'Anterior placenta: epidural + dexmedetomidine and/or remifentanil',
            'Dexmed: start 0.5 mcg/kg/hr; Remi: start 0.1 mcg/kg/min',
            'Epidural: 2% Lido + Bicarb (1 mEq/mL) — bolus 10 mL, then 5 mL q5 min for 15–20 mL total, target T4–T6',
        ],
        keyPointsJa: [
            '後壁胎盤: 局所麻酔 + dexmedetomidine および/または remifentanil 持続',
            '前壁胎盤: 硬膜外 + dexmedetomidine および/または remifentanil',
            'Dexmed: 0.5 mcg/kg/hr で開始;Remi: 0.1 mcg/kg/min で開始',
            '硬膜外: 2% リドカイン + 重炭酸 (1 mEq/mL) — 10 mL ボーラス、その後 5 mL を q5 分で計 15-20 mL、目標 T4-T6',
        ],
        lines: ['Maternal PIV ×1'],
        linesJa: ['母体末梢 IV ×1'],
        emergency: false,
    },
    {
        id: 'midges',
        label: 'Mid-Gestation Fetal Surgery',
        labelJa: '中期妊娠胎児手術',
        anesthesia: 'GA with epidural + uterine relaxation',
        anesthesiaJa: '硬膜外併用全身麻酔 + 子宮弛緩',
        keyPoints: [
            'Place T10–12 epidural with test dose, then RSI supine with LUD',
            'Maintenance: Propofol + Remifentanil + volatile + Rocuronium 0.6 mg/kg IV',
            'Maintain uterine relaxation: Mg sulfate 3–4 g over 20 min then 2 g/hr; nitroglycerin boluses 20–40 mcg prn',
            'Increase volatile to enhance uterine relaxation',
            'Fetal cocktail IM by surgeon (see Fetal cocktails below)',
            'Hysterotomy closure: decrease volatile, continue Mg, load epidural with 10–20 mL 0.2% Ropi + 1–2 mg Duramorph',
            'Emergence: Sugammadex, Ondansetron 4 mg, Acetaminophen 15 mg/kg, extubate awake',
        ],
        keyPointsJa: [
            'T10-12 硬膜外をテストドーズ後に留置、続いて左子宮偏位のもと仰臥位 RSI',
            '維持: プロポフォール + Remifentanil + 揮発性麻酔 + Rocuronium 0.6 mg/kg IV',
            '子宮弛緩維持: マグネシウム硫酸 3-4 g を 20 分かけて、その後 2 g/hr;ニトログリセリン 20-40 mcg ボーラス頓用',
            '子宮弛緩強化のため揮発性麻酔を増量',
            '外科医が胎児カクテル IM(下記「胎児カクテル」参照)',
            '子宮閉創: 揮発性減量、Mg 継続、硬膜外に 0.2% Ropi 10-20 mL + Duramorph 1-2 mg を投与',
            '抜管: Sugammadex、Ondansetron 4 mg、アセトアミノフェン 15 mg/kg、覚醒下抜管',
        ],
        lines: ['Maternal PIV ×2', 'Arterial line', 'Fluid warmer with NS', 'Optional fetal PIV with NS in buretrol + transfusion tubing/filter'],
        linesJa: ['母体末梢 IV ×2', '動脈ライン', 'NS の輸液加温器', 'オプションで胎児 PIV(buretrol 内 NS + 輸血チューブ/フィルター)'],
        emergency: true,
        fetalCocktail: 'midGestation',
        fetalEmergency: 'midGestation',
        fluidLimit: 'Max 1 L for the procedure',
        fluidLimitJa: '手技中の最大 1 L',
    },
    {
        id: 'exit-resection',
        label: 'EXIT-to-Resection (GA + regional)',
        labelJa: 'EXIT-to-Resection(全身麻酔 + 区域)',
        anesthesia: 'GA + lumbar epidural; baby resuscitated in 2nd OR if needed',
        anesthesiaJa: '全身麻酔 + 腰部硬膜外;必要なら 2 番目の OR で児を蘇生',
        keyPoints: [
            'Place lumbar epidural, RSI supine with LUD',
            'Maintain uterine relaxation: increase volatile + nitroglycerin boluses prn',
            'Fetal cocktail IM by surgeon (see Fetal cocktails); pulse ox on hand',
            'Continuous fetal echo by MFM; consider 24 Ga PIV for fetus',
            'ETT sutured in place for fetus before cord division',
            'After cord clamping: turn off volatile, reverse uterine atony, oxytocin infusion (5 U/10 min, then 70 mL/hr)',
            'Consider Methergine and Carboprost prn',
            'Load epidural: 10–20 mL 0.2% Ropi + 1–2 mg Duramorph',
            'Emergence: Sugammadex, Ondansetron 4 mg, Acetaminophen 15 mg/kg, Ketorolac 15 mg, extubate awake',
        ],
        keyPointsJa: [
            '腰部硬膜外を留置、左子宮偏位のもと仰臥位 RSI',
            '子宮弛緩維持: 揮発性麻酔増量 + ニトログリセリンボーラス頓用',
            '外科医が胎児カクテル IM(下記「胎児カクテル」参照);手にパルスオキシメータ',
            'MFM が持続胎児心エコー;胎児に 24 Ga PIV を検討',
            '臍帯切離前に胎児用 ETT を縫合固定',
            '臍帯クランプ後: 揮発性麻酔 OFF、子宮弛緩を補正、オキシトシン持続(5 U/10 分、その後 70 mL/hr)',
            '頓用で Methergine と Carboprost を検討',
            '硬膜外に 0.2% Ropi 10-20 mL + Duramorph 1-2 mg を投与',
            '抜管: Sugammadex、Ondansetron 4 mg、アセトアミノフェン 15 mg/kg、ケトロラク 15 mg、覚醒下抜管',
        ],
        lines: ['Maternal PIV ×2', 'Arterial line', 'Fluid warmer with NS', 'Optional fetal PIV + transfusion tubing'],
        linesJa: ['母体末梢 IV ×2', '動脈ライン', 'NS の輸液加温器', 'オプションで胎児 PIV + 輸血チューブ'],
        emergency: true,
        fetalCocktail: 'exit',
        fetalEmergency: 'exit',
    },
    {
        id: 'exit-airway',
        label: 'EXIT-to-Airway / Cesarean (Awake + regional)',
        labelJa: 'EXIT-to-Airway / 帝王切開(覚醒 + 区域麻酔)',
        anesthesia: 'Awake mother under CSE; no GA unless airway emergency',
        anesthesiaJa: 'CSE 下に母体覚醒;気道緊急でない限り全身麻酔は使用しない',
        keyPoints: [
            'Place lumbar CSE (no epidural test dose)',
            'Spinal: 1.6 mL 0.75% bupivacaine + 10 mcg fentanyl ± 0.1 mg PF morphine — check T6 level',
            'Maintain uterine relaxation: nitroglycerin boluses prn',
            'Fetal cocktail IM by surgeon prn (see Fetal cocktails)',
            'Cord clamping: reverse uterine atony, start oxytocin infusion, consider Methergine + Hemabate',
            'Load epidural: 10–20 mL 0.2% Ropi + 1–2 mg Duramorph (if not given IT)',
            'Post-op: Acetaminophen 15 mg/kg, Ketorolac 15 mg, Ondansetron 4 mg; support person in OR',
        ],
        keyPointsJa: [
            '腰部 CSE を留置(硬膜外テストドーズなし)',
            '脊麻: 0.75% bupivacaine 1.6 mL + フェンタニル 10 mcg ± PF モルヒネ 0.1 mg — T6 レベルを確認',
            '子宮弛緩維持: ニトログリセリンボーラス頓用',
            '必要時に外科医が胎児カクテル IM(下記「胎児カクテル」参照)',
            '臍帯クランプ: 子宮弛緩を補正、オキシトシン持続を開始、Methergine + Hemabate を検討',
            '硬膜外に 0.2% Ropi 10-20 mL + Duramorph 1-2 mg を投与(IT 投与していなければ)',
            '術後: アセトアミノフェン 15 mg/kg、ケトロラク 15 mg、Ondansetron 4 mg;サポート者を OR に',
        ],
        lines: ['Maternal PIV ×2', 'Fluid warmer with NS', 'Optional fetal PIV + transfusion tubing'],
        linesJa: ['母体末梢 IV ×2', 'NS の輸液加温器', 'オプションで胎児 PIV + 輸血チューブ'],
        emergency: true,
        fetalCocktail: 'exit',
        fetalEmergency: 'exit',
    },
    {
        id: 'scheduled-cesarean',
        label: 'Scheduled Cesarean Delivery',
        labelJa: '予定帝王切開分娩',
        anesthesia: 'CSE; baby cared for by NICU or 2nd anesthesia team',
        anesthesiaJa: 'CSE;児は NICU または 2 番目の麻酔チームがケア',
        keyPoints: [
            'Place lumbar CSE (no epidural test dose)',
            'Spinal: 1.6 mL 0.75% bupivacaine + 10 mcg fentanyl ± 0.1 mg PF morphine — check T6 level',
            'Start phenylephrine infusion immediately after dosing spinal (0.5 mcg/kg/min)',
            'Cord clamping: reverse uterine atony, start oxytocin (5 U/10 min, then 70 mL/hr)',
            'Consider Methergine and Hemabate prn',
            'Load epidural: 10–20 mL 0.2% Ropi + 1–2 mg Duramorph (if not given IT)',
            'Post-op: Acetaminophen 15 mg/kg, Ketorolac 15 mg, Ondansetron 4 mg; support person in OR',
        ],
        keyPointsJa: [
            '腰部 CSE を留置(硬膜外テストドーズなし)',
            '脊麻: 0.75% bupivacaine 1.6 mL + フェンタニル 10 mcg ± PF モルヒネ 0.1 mg — T6 レベルを確認',
            '脊麻投与直後にフェニレフリン持続を開始 (0.5 mcg/kg/min)',
            '臍帯クランプ: 子宮弛緩を補正、オキシトシン開始 (5 U/10 分、その後 70 mL/hr)',
            '頓用で Methergine と Hemabate を検討',
            '硬膜外に 0.2% Ropi 10-20 mL + Duramorph 1-2 mg を投与(IT 投与していなければ)',
            '術後: アセトアミノフェン 15 mg/kg、ケトロラク 15 mg、Ondansetron 4 mg;サポート者を OR に',
        ],
        lines: ['Maternal PIV ×2', 'Fluid warmer with NS'],
        linesJa: ['母体末梢 IV ×2', 'NS の輸液加温器'],
        emergency: false,
    },
];
