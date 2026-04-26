// Pre-induction setup checklist for the cardiac OR.
// Sourced from NCH "Cardiac Anesthesia Rotation Guide" (2020-08-01).
//
// Each entry has:
//   key:     stable id used for localStorage of completion state
//   group:   'rescue' | 'maintenance' | 'monitors' | 'other'
//   label:   human-readable name
//   conc:    standard preparation concentration (string)
//   note:    short clinical note
//   compute(weight): optional function producing { syringe, doseRange } based
//                   on weight (only for items where size depends on weight)

export const computeCaClSyringe = (weight) => {
    const w = parseFloat(weight) || 0;
    if (w <= 0) return { syringe: '?', notes: 'Enter weight', notesJa: '体重を入力' };
    if (w <= 5)  return { syringe: 'TB syringe (1 mL)', notes: 'Neonate — TB syringe; CaCl 100 mg/mL', notesJa: '新生児 — TB シリンジ;CaCl 100 mg/mL' };
    if (w <= 10) return { syringe: '3 mL syringe', notes: 'Infant — 3 mL syringe', notesJa: '乳児 — 3 mL シリンジ' };
    return { syringe: '3-5 mL syringe', notes: '3-5 mL syringe; CaCl 100 mg/mL', notesJa: '3-5 mL シリンジ;CaCl 100 mg/mL' };
};

export const computePhenylephrineSyringes = (weight) => {
    const w = parseFloat(weight) || 0;
    if (w <= 30) return { dilute: '2-3 syringes', strength: '10 mcg/mL (dilute)', notes: 'Patient ≤30 kg → multiple dilute syringes for RAP/VAP', notesJa: '患者 ≤30 kg → RAP/VAP 用に希釈シリンジを複数' };
    return { dilute: '1 syringe (full + dilute)', strength: '100 mcg/mL + 10 mcg/mL', notes: 'Larger patient → full strength 100 mcg/mL primary', notesJa: '体格大 → メインは 100 mcg/mL の原液' };
};

export const setupChecklist = [
    // ---- Rescue drugs ----
    {
        key: 'epi-full',
        group: 'rescue',
        label: 'Epinephrine — full strength',
        labelJa: 'エピネフリン — 原液',
        conc: '10 mcg/mL',
        note: 'Bolus emergencies',
        noteJa: '緊急ボーラス用'
    },
    {
        key: 'epi-dilute',
        group: 'rescue',
        label: 'Epinephrine — dilute',
        labelJa: 'エピネフリン — 希釈',
        conc: '1 mcg/mL',
        note: 'Special label — yellow/red tape recommended for fast identification',
        noteJa: '特別ラベル — 迅速識別のため黄色/赤テープ推奨'
    },
    {
        key: 'phenyl-full',
        group: 'rescue',
        label: 'Phenylephrine — full strength',
        labelJa: 'フェニレフリン — 原液',
        conc: '100 mcg/mL',
        note: 'Bigger patients — preferred when ≥30 kg',
        noteJa: '体格大 — ≥30 kg で優先'
    },
    {
        key: 'phenyl-dilute',
        group: 'rescue',
        label: 'Phenylephrine — dilute',
        labelJa: 'フェニレフリン — 希釈',
        conc: '10 mcg/mL',
        note: '≤30 kg → 2-3 syringes for RAP/VAP',
        noteJa: '≤30 kg → RAP/VAP 用に 2-3 本',
        compute: computePhenylephrineSyringes
    },
    {
        key: 'cacl',
        group: 'rescue',
        label: 'Calcium Chloride',
        labelJa: '塩化カルシウム',
        conc: '100 mg/mL',
        note: 'Sized to patient weight',
        noteJa: '患者体重に応じてサイジング',
        compute: computeCaClSyringe
    },
    {
        key: 'atropine',
        group: 'rescue',
        label: 'Atropine (optional)',
        labelJa: 'アトロピン(オプション)',
        conc: '0.1 mg/mL or 0.4 mg/mL',
        note: 'Useful for bradycardia / vagal events; minimum 0.1 mg dose',
        noteJa: '徐脈 / 迷走神経反射に有用;最小投与量 0.1 mg'
    },

    // ---- Maintenance drugs ----
    {
        key: 'paralytic',
        group: 'maintenance',
        label: 'Paralytic — at least 2 doses',
        labelJa: '筋弛緩薬 — 最低 2 回分',
        conc: 'attending preference',
        note: '1 for induction, 1 for line completion / TEE placement',
        noteJa: '1 回は導入用、1 回はライン完成 / TEE 留置用'
    },
    {
        key: 'opioid',
        group: 'maintenance',
        label: 'Opioid (Fentanyl)',
        labelJa: 'オピオイド(フェンタニル)',
        conc: 'standard',
        note: '10-15 mcg/kg total between induction and incision (NCH default)',
        noteJa: '導入から切開までで合計 10-15 mcg/kg (NCH デフォルト)'
    },
    {
        key: 'heparin',
        group: 'maintenance',
        label: 'Heparin',
        labelJa: 'ヘパリン',
        conc: 'see anticoagulation card',
        note: 'NCH HMS-driven OR U of M weight formula. Always confirm dose + read back.',
        noteJa: 'NCH HMS ベース、または U of M 体重式。常に用量確認 + 復唱。'
    },
    {
        key: 'txa',
        group: 'maintenance',
        label: 'Tranexamic Acid (TXA)',
        labelJa: 'トラネキサム酸 (TXA)',
        conc: 'standard',
        note: '20 mg/kg up to 1 g pre-incision + post-protamine; 3rd dose by perfusion on bypass',
        noteJa: '20 mg/kg(最大 1 g)を切開前 + プロタミン後に投与;バイパス中の 3 回目は灌流士'
    },
    {
        key: 'cefazolin',
        group: 'maintenance',
        label: 'Cefazolin',
        labelJa: 'Cefazolin',
        conc: '50 mg/kg up to 2 g',
        note: 'Within 30 min of incision; redose q3h',
        noteJa: '切開 30 分以内に投与;q3h で追加'
    },

    // ---- Monitors ----
    {
        key: 'spo2-x2',
        group: 'monitors',
        label: 'SpO2 monitor ×2',
        labelJa: 'SpO2 モニター ×2',
        conc: '',
        note: 'Massimo probe in glass cabinet',
        noteJa: 'Massimo プローブはガラス棚内'
    },
    {
        key: 'bis',
        group: 'monitors',
        label: 'BIS monitor',
        labelJa: 'BIS モニター',
        conc: '',
        note: 'For adult/teenager cases',
        noteJa: '成人/思春期症例用'
    },
    {
        key: 'nirs',
        group: 'monitors',
        label: 'NIRS — set up by perfusion',
        labelJa: 'NIRS — 灌流士がセットアップ',
        conc: '',
        note: 'On room air, prior to induction',
        noteJa: '室内気下、導入前に装着'
    },

    // ---- Other ----
    {
        key: 'ivf-pump',
        group: 'other',
        label: 'IV fluids on infusion pump',
        labelJa: 'IV 輸液をポンプで',
        conc: '',
        note: '5 mL/hr rate, max 10 mL/kg "volume to be infused" — caps any inadvertent bolus',
        noteJa: 'レート 5 mL/hr、"投与予定量" を最大 10 mL/kg に設定 — 不用意なボーラスを上限化'
    },
    {
        key: 'taping',
        group: 'other',
        label: 'Syringe taping (longitudinal + circumferential)',
        labelJa: 'シリンジテーピング(縦 + 周方向)',
        conc: '',
        note: 'Same drug, same place, every time. Yellow/red tape on dilute epi.',
        noteJa: '同じ薬剤を毎回同じ場所に。希釈エピには黄色/赤テープ。'
    }
];

export const groupLabels = {
    rescue: 'Rescue drugs',
    maintenance: 'Maintenance drugs',
    monitors: 'Monitors',
    other: 'Setup'
};

export const groupLabelsJa = {
    rescue: 'レスキュー薬',
    maintenance: '維持薬',
    monitors: 'モニター',
    other: 'セットアップ'
};
