// Source: Pediatric Anesthesia Pearls 2021, "Standard Cart Drugs" panel (image IMG_0065).

export const standardCartDrugs = [
    { n: 1, drug: 'Propofol',                                 drugJa: 'プロポフォール',                              detail: '10 mg/mL (1%) for induction & infusion.',                                          detailJa: '10 mg/mL (1%) を導入 + 持続投与に。' },
    { n: 2, drug: 'Atropine + Succinylcholine syringes',     drugJa: 'アトロピン + スキサメトニウム シリンジ',     detail: 'Drawn-up syringes with a 22 g needle ready for IM if no IV.',                       detailJa: 'IV 不可時の IM 用に 22 G 針付きで吸引済シリンジを準備。' },
    { n: 3, drug: 'Paralytic of choice',                     drugJa: '選択した筋弛緩薬',                          detail: 'Rocuronium or vecuronium.',                                                          detailJa: 'Rocuronium または vecuronium。' },
    { n: 4, drug: 'Epinephrine',                              drugJa: 'エピネフリン',                              detail: '10 mcg/mL AND 100 mcg/mL ready (different concentrations for vasopressor vs arrest).', detailJa: '10 mcg/mL と 100 mcg/mL の両方を準備(昇圧用と心停止用で濃度が異なる)。' },
    { n: 5, drug: 'Fentanyl',                                 drugJa: 'フェンタニル',                              detail: '10 mcg/mL for patients < 25 kg (avoids dosing errors).',                            detailJa: '<25 kg の患者には 10 mcg/mL(投薬ミス回避)。' }
];

export const standardCartTips = [
    'Use 1 mL or 3 mL syringes for infants — drawing volumes < 0.1 mL is unreliable in 10 mL syringes.',
    'Label every syringe (drug name + concentration) immediately after drawing up.',
    'Check expiration dates on each shift; restock after every case.'
];

export const standardCartTipsJa = [
    '乳児には 1 mL または 3 mL シリンジを使用 — 10 mL シリンジで <0.1 mL を引くのは不正確。',
    '吸引後直ちに各シリンジに(薬剤名 + 濃度)ラベル。',
    '勤務交代ごとに有効期限を確認;各症例後に補充。'
];

export const standardCartAntibiotics = [
    { drug: 'Ampicillin',          dose: '50 mg/kg',  max: '2 g',     neonate: '50 mg/kg',  freq: 'q3h (q6h <37wk PCA)',                          freqJa: 'q3h (PCA <37 週は q6h)' },
    { drug: 'Ampicillin/Sulbactam',dose: '50 mg/kg',  max: '2 g',     neonate: '50 mg/kg',  freq: 'q3h (q6h <37wk PCA)',                          freqJa: 'q3h (PCA <37 週は q6h)' },
    { drug: 'Cefazolin',           dose: '50 mg/kg',  max: '2 g',     neonate: '25 mg/kg',  freq: 'q3h (q6h <37wk PCA)',                          freqJa: 'q3h (PCA <37 週は q6h)' },
    { drug: 'Cefoxitin',           dose: '40 mg/kg',  max: '2 g',     neonate: '30 mg/kg',  freq: 'q3h (q6h <37wk PCA)',                          freqJa: 'q3h (PCA <37 週は q6h)' },
    { drug: 'Ceftriaxone',         dose: '50 mg/kg',  max: '2 g',     neonate: 'NEVER <30 days', neonateJa: '生後 30 日未満では絶対禁忌',         freq: 'q24h',                                          freqJa: 'q24h' },
    { drug: 'Ciprofloxacin',       dose: '10 mg/kg',  max: '400 mg',  neonate: '10 mg/kg',  freq: 'q6h (q6h <37wk PCA)',                          freqJa: 'q6h (PCA <37 週も q6h)' },
    { drug: 'Clindamycin',         dose: '20 mg/kg',  max: '900 mg',  neonate: '10 mg/kg',  freq: 'q3h (q6h <37wk PCA), redose 10 mg/kg',         freqJa: 'q3h (PCA <37 週は q6h)、追加 10 mg/kg' },
    { drug: 'Piperacillin/Tazo',   dose: '100 mg/kg', max: '4 g',     neonate: '100 mg/kg', freq: 'q3h (q6h <37wk PCA)',                          freqJa: 'q3h (PCA <37 週は q6h)' },
    { drug: 'Gentamicin',          dose: '5 mg/kg',   max: '—',       neonate: '5 mg/kg',   freq: 'q24h (q36h <37wk PCA)',                        freqJa: 'q24h (PCA <37 週は q36h)' },
    { drug: 'Metronidazole',       dose: '15 mg/kg',  max: '1 g',     neonate: '7.5 mg/kg', freq: 'q6h (q12h <37wk PCA)',                         freqJa: 'q6h (PCA <37 週は q12h)' },
    { drug: 'Nafcillin',           dose: '50 mg/kg',  max: '2 g',     neonate: '25 mg/kg',  freq: 'q3h (q6h <37wk PCA)',                          freqJa: 'q3h (PCA <37 週は q6h)' },
    { drug: 'Vancomycin',          dose: '20 mg/kg',  max: '—',       neonate: '15 mg/kg',  freq: 'q6h (q12h <37wk PCA)',                         freqJa: 'q6h (PCA <37 週は q12h)' }
];
