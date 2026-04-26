// iMRI Pre-Scanning Checklist — NCH Department of Anesthesiology.
// Source: NCH Sharepoint / Out of OR / MRI / iMRI Pre-Scanning Checklist_Feb 2025.pdf
//
// MR-safety checklist run before sliding the patient into the iMRI scanner.

export const entry = {
    id: 'flow_imri_checklist',
    hub: 'outofor',
    kind: 'flowchart',
    title: 'iMRI Pre-Scanning Checklist',
    titleJa: 'iMRI スキャン前チェックリスト',
    shortDescription: 'STOP → THINK → ACT — MR-safety sweep before iMRI scan.',
    shortDescriptionJa: 'STOP → THINK → ACT — iMRI スキャン前の MR 安全性確認。',
    tags: ['imri', 'mri', 'magnet', 'mr safety', 'ferromagnetic', '5 g line', 'pre-scan', 'checklist', 'iMRI OR'],
    emergency: false,
    weightAware: false,
    ageRules: null,
    source: 'NCH Sharepoint / Out of OR / MRI',
    lastReviewed: '2026-04',
    component: 'ImriChecklistCard',
};

export const introSteps = [
    'STOP — pause everything before the scan',
    'THINK — focus on completing this checklist',
    'ACT — perform the checklist below',
];

export const introStepsJa = [
    'STOP — スキャン前にすべてを止める',
    'THINK — このチェックリスト完了に集中',
    'ACT — 以下のチェックリストを実施',
];

export const checklist = [
    'Ask all non-essential personnel to leave the room',
    'Anesthesiologist alerted that pre-scanning is starting (present if timing/staffing permits)',
    'Patient is hemodynamically stable',
    'Anesthesia needle count is correct',
    'Patient does NOT have a reinforced ETT',
    'Top of the anesthesia machine is clear (work tray + machine top)',
    'Anesthesia backstand is clear and closed',
    'Nerve stimulator and leads are removed and stored in the closed backstand',
    'ABL machine is out of the room',
    'Bair hugger turned off and tethered',
    'Patient core temperature does not exceed 37 °C',
    'Invivo monitor is plugged into the boom (black outlet)',
    'Fluid warmer is off and either tethered or removed',
    'Alaris pumps removed from the room',
    'Anesthesia machine wheels are locked',
    'Anesthesia boom is outside of the 5 G line',
    'Anesthesia computer is tethered',
    'Green tackle box is stored outside of the 5 G line',
    'Walkies, voceras, pagers, stethoscopes, cell phones, and metal badge holders are stowed',
    'No jewelry — watches, earrings, necklaces',
    'CHECK POCKETS!',
];

export const checklistJa = [
    '不要な人員は全員退室を依頼',
    '麻酔科医にスキャン前準備開始を通知(タイミング/人員が許せば立会い)',
    '患者の血行動態が安定',
    '麻酔の針カウントが正確',
    '患者に補強型 ETT を使用していない',
    '麻酔器の上面が片付いている(作業トレイ + 機器上面)',
    '麻酔バックスタンドが片付いていて閉じている',
    '神経刺激装置とリードが取り外され、閉じたバックスタンドに収納されている',
    'ABL 機器が室外にある',
    'Bair hugger が OFF され固定されている',
    '患者深部体温が 37 °C を超えていない',
    'Invivo モニターがブーム(黒いコンセント)に接続されている',
    '輸液加温器が OFF され固定または撤去されている',
    'Alaris ポンプが室外に撤去されている',
    '麻酔器のキャスターがロックされている',
    '麻酔ブームが 5 G 線外にある',
    '麻酔用コンピュータが固定されている',
    '緑色 tackle box が 5 G 線外に保管されている',
    'ウォーキー、Vocera、ポケベル、聴診器、携帯電話、金属バッジホルダーが収納されている',
    '宝飾品なし — 腕時計、ピアス、ネックレス',
    'ポケットを確認!',
];

export const closing = 'List complete — perform a final visual sweep. Anesthesia team is ready for scanning.';
export const closingJa = 'リスト完了 — 最終視覚確認を実施。麻酔チームはスキャン準備完了。';

export const STORAGE_KEY = 'pp_imri_checklist_v1';
