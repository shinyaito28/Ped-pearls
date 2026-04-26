// Source: Pediatric Anesthesia Pearls 2021, Malignant Hyperthermia panel (image IMG_0061).

export const mhHotline = {
    label: 'MHAUS Hotline',
    labelJa: 'MHAUS ホットライン',
    number: '1-800-644-9737',
    url: 'https://www.mhaus.org/'
};

export const mhSigns = [
    'Tachycardia',
    'Arrhythmias',
    '↑ EtCO2 (often the earliest sign)',
    '↑ Temperature',
    'Hypoxia',
    'Fasciculations',
    'Muscle rigidity (esp. masseter)',
    '↑ K (hyperkalemia)',
    'Myoglobinuria',
    'Metabolic + respiratory acidosis'
];

export const mhSignsJa = [
    '頻脈',
    '不整脈',
    '↑ EtCO2(最早期徴候であることが多い)',
    '↑ 体温',
    '低酸素',
    '線維束性収縮',
    '筋硬直(特に咬筋)',
    '↑ K(高 K 血症)',
    'ミオグロビン尿',
    '代謝性 + 呼吸性アシドーシス'
];

// Step-by-step treatment protocol verbatim from the reference card.
export const mhSteps = [
    {
        n: 1,
        title: 'CALL FOR HELP & CALL HOTLINE',
        titleJa: '応援要請 + ホットラインに連絡',
        body: 'Hyperventilate with 100% FiO2. Stop all volatile agents and succinylcholine. Stop surgery if possible.',
        bodyJa: 'FiO2 100% で過換気。全揮発性麻酔薬とスキサメトニウムを中止。可能なら手術を中止。',
        accent: 'red'
    },
    {
        n: 2,
        title: 'Dantrolene 2.5 mg/kg IV',
        titleJa: 'Dantrolene 2.5 mg/kg IV',
        body: 'Repeat as needed. After patient is stable: 1 mg/kg IV q6h. Reconstitute Ryanodex (250 mg/vial) or original Dantrolene (20 mg/vial in 60 mL sterile water).',
        bodyJa: '必要に応じて反復。安定後: 1 mg/kg IV q6h。Ryanodex (250 mg/バイアル) または original Dantrolene (20 mg/バイアル、滅菌水 60 mL に溶解) を再構成。',
        accent: 'red'
    },
    {
        n: 3,
        title: 'Cool the patient',
        titleJa: '患者を冷却',
        body: 'Iced IV fluids, lavage stomach / bladder / rectum, surface ice packs. Goal core temperature < 38 °C, then stop cooling to avoid overshoot.',
        bodyJa: '冷却 IV 輸液、胃 / 膀胱 / 直腸の洗浄、表面アイスパック。深部体温目標 < 38 °C、達したらオーバーシュート回避のため冷却中止。',
        accent: 'sky'
    },
    {
        n: 4,
        title: 'Send labs',
        titleJa: '検査を提出',
        body: 'ABG, electrolytes, ionized calcium, glucose, CK / CPK, DIC profile (PT/PTT/fibrinogen). Repeat q6h until stable.',
        bodyJa: 'ABG、電解質、イオン化カルシウム、血糖、CK / CPK、DIC プロファイル (PT/PTT/フィブリノゲン)。安定まで q6h で反復。',
        accent: 'amber'
    },
    {
        n: 5,
        title: 'Treat acidosis & hyperkalemia',
        titleJa: 'アシドーシス + 高 K 血症の治療',
        body: 'Sodium bicarbonate 1-2 mEq/kg per ABG. Treat ↑K with glucose + insulin (D25% 2 mL/kg + Insulin 0.1 U/kg) and CaCl 10-15 mg/kg.',
        bodyJa: 'ABG に応じて重炭酸ナトリウム 1-2 mEq/kg。↑K はブドウ糖 + インスリン (D25% 2 mL/kg + Insulin 0.1 U/kg) と CaCl 10-15 mg/kg で治療。',
        accent: 'orange'
    },
    {
        n: 6,
        title: 'Maintain UOP ≥ 2 mL/kg/hr',
        titleJa: 'UOP ≥ 2 mL/kg/hr を維持',
        body: 'Aggressive hydration. Furosemide 0.5-2 mg/kg or Mannitol 0.25-1 g/kg as needed.',
        bodyJa: '積極的補液。必要に応じて Furosemide 0.5-2 mg/kg または Mannitol 0.25-1 g/kg。',
        accent: 'teal'
    },
    {
        n: 7,
        title: 'AVOID Calcium Channel Blockers',
        titleJa: 'カルシウム拮抗薬を避ける',
        body: 'CCBs + Dantrolene → severe hyperkalemia + myocardial depression. Use β-blockers or amiodarone for arrhythmia instead.',
        bodyJa: 'CCB + Dantrolene → 重度高 K 血症 + 心筋抑制。不整脈にはβ遮断薬または amiodarone を使用。',
        accent: 'rose'
    }
];

export const mhPostAcute = [
    'Monitor in PICU for at least 24 hr (recrudescence in ~25%).',
    'Continue Dantrolene 1 mg/kg IV q6h × 24-48 hr.',
    'Counsel patient & family. Refer to MHAUS for genetic testing.',
    'File event with NAMHR (North American MH Registry).'
];

export const mhPostAcuteJa = [
    'PICU で最低 24 時間モニタリング(約 25% で再燃)。',
    'Dantrolene 1 mg/kg IV q6h を 24-48 時間継続。',
    '患者 + 家族にカウンセリング。遺伝学的検査のため MHAUS に紹介。',
    'NAMHR (North American MH Registry) にイベント報告。'
];
