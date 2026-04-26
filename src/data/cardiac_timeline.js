// Cardiac OR timeline + TRAVEL pneumonic.
// Sourced from NCH "Cardiac Anesthesia Rotation Guide" (2020-08-01).
// Each phase has a list of action items; checkboxes are persisted in
// localStorage by `key`.

export const timelinePhases = [
    {
        id: 'pre-incision',
        title: 'Pre-incision',
        titleJa: '切開前',
        steps: [
            { key: 'aline',         label: 'A-line placed (sterile, 24G→22G upsize on Cook 0.015 wire for neonate)',  labelJa: 'A ライン留置(滅菌、新生児では Cook 0.015 ワイヤで 24G→22G にアップサイズ)' },
            { key: 'abg-anh',       label: 'ABG drawn → perfusion decides on ANH', labelJa: 'ABG 採取 → 灌流士が ANH を判断' },
            { key: 'cvl',           label: 'CVL placed (5 cm only smallest neonates; Dr. Carrillo prefers 8 cm)', labelJa: 'CVL 留置(最小新生児のみ 5 cm;主治医によっては 8 cm を好む)' },
            { key: 'tee',           label: 'Cardiology called for TEE before prep/drape', labelJa: '消毒/ドレープ前に循環器科に TEE を依頼' },
            { key: 'paralytic',     label: 'Paralytic redose', labelJa: '筋弛緩薬の追加' },
            { key: 'opioid-extra',  label: 'Additional opioid added', labelJa: 'オピオイド追加' },
            { key: 'precedex',      label: 'Precedex drip started (with/without bolus)', labelJa: 'Precedex 持続開始(ボーラスあり/なし)' },
            { key: 'txa-pre',       label: 'TXA 20 mg/kg up to 1 g administered', labelJa: 'TXA 20 mg/kg(最大 1 g)投与' },
            { key: 'cefazolin',     label: 'Cefazolin given (within 30 min of incision; time to surgeon entering room)', labelJa: 'Cefazolin 投与(切開 30 分以内;外科医入室時刻に合わせる)' }
        ]
    },
    {
        id: 'cannula',
        title: 'Cannula placement',
        titleJa: 'カニューレ留置',
        steps: [
            { key: 'stay-sutures',  label: 'Stay sutures in place', labelJa: 'ステイ縫合糸装着' },
            { key: 'heparin',       label: 'Heparin given (or surgeon gives if no CVL); read back dose + volume', labelJa: 'ヘパリン投与(CVL なければ外科医が投与);用量 + 容量を復唱' },
            { key: 'act-abg',       label: 'ACT/ABG drawn (before aortic cannula placement)', labelJa: 'ACT/ABG 採取(大動脈カニューレ留置前)' }
        ]
    },
    {
        id: 'rap-vap',
        title: 'RAP / VAP',
        titleJa: 'RAP / VAP',
        steps: [
            { key: 'phenyl-ready',  label: '2-3 phenylephrine syringes ready', labelJa: 'フェニレフリンシリンジ 2-3 本準備' },
            { key: 'flush-ready',   label: 'Several flushes ready', labelJa: 'フラッシュ用シリンジを複数準備' },
            { key: 'manual-flush',  label: 'Small CVL? prepare for manual flush via 6-inch extension', labelJa: '小径 CVL? 6 インチ延長で手動フラッシュの準備' }
        ]
    },
    {
        id: 'cpb',
        title: 'On CPB',
        titleJa: 'CPB 中',
        steps: [
            { key: 'milrinone-prep',    label: 'Milrinone tubing primed; 25 mcg/kg load drawn for perfusion', labelJa: 'Milrinone チューブをプライム;灌流用に 25 mcg/kg ローディング量を準備' },
            { key: 'mg-prep',           label: 'Magnesium 50 mg/kg drawn (omit if Del Nido per attending)', labelJa: 'マグネシウム 50 mg/kg を準備(主治医指示で Del Nido 使用時は省略)' },
            { key: 'ra-trifold',        label: 'RA-line trifold prepared if RA lines planned', labelJa: 'RA ライン予定なら RA ライン三方活栓セットを準備' },
            { key: 'pca-nca',           label: 'PCA / NCA ordered (or pain team contacted)', labelJa: 'PCA / NCA をオーダー(または pain team に連絡)' },
            { key: 'antibiotic-redose', label: 'Antibiotic redose handed to perfusion if needed', labelJa: '必要時に抗菌薬追加分を灌流士に渡す' }
        ]
    },
    {
        id: 'off-bypass',
        title: 'Coming off bypass',
        titleJa: 'バイパス離脱',
        steps: [
            { key: 'rewarm',        label: 'Surgeon tells perfusion to rewarm — call attending if not in room', labelJa: '外科医が灌流士に再加温を指示 — 主治医不在なら呼ぶ' },
            { key: 'milrinone-on',  label: 'Milrinone started after perfusion administers loading dose', labelJa: '灌流士がローディング投与後に Milrinone 開始' },
            { key: 'travel-check',  label: 'TRAVEL pneumonic complete (see widget)', labelJa: 'TRAVEL ニーモニック完了(ウィジェット参照)' },
            { key: 'muf',           label: 'MUF initiated (neonates / infants / small children)', labelJa: 'MUF 開始(新生児 / 乳児 / 小児)' },
            { key: 'protamine',     label: 'Protamine via peripheral IV, 1:1 saline dilution, 20 mL/hr carrier', labelJa: 'プロタミンを末梢 IV から、生食 1:1 希釈、20 mL/hr キャリア' },
            { key: 'txa-post',      label: 'TXA 2nd dose after protamine', labelJa: 'プロタミン後に TXA 2 回目投与' },
            { key: 'anh',           label: 'ANH first, then other products as needed', labelJa: 'まず ANH、次に必要に応じて他製剤' },
            { key: 'hemobag',       label: 'If "hemobag" used (teen+) → +50 mg protamine', labelJa: '"hemobag" 使用時(思春期以上) → プロタミン +50 mg' },
            { key: 'abg-post',      label: 'ABG drawn after protamine + ANH/cell saver in', labelJa: 'プロタミン + ANH/セルセーバー注入後に ABG' },
            { key: 'apap',          label: 'IV acetaminophen at sternal closure (document time for ICU!)', labelJa: '胸骨閉鎖時に IV アセトアミノフェン(ICU 用に時刻を記録!)' }
        ]
    },
    {
        id: 'transport',
        title: 'Transport to CTICU',
        titleJa: 'CTICU への移送',
        steps: [
            { key: 'monitors',      label: 'Transport monitors on patient at all times', labelJa: '移送モニターを常に装着' },
            { key: 'volume-line',   label: 'At least one line infusing fluid (volume to bolus available)', labelJa: '少なくとも 1 本のラインで輸液持続(ボーラス用容量を確保)' },
            { key: 'albumin',       label: 'Albumin in pocket: 50 mL bottle (neonate/infant) or 250 mL bag (older)', labelJa: 'ポケットにアルブミン: 50 mL ボトル(新生児/乳児)または 250 mL バッグ(年長児)' },
            { key: 'bag-mask',      label: 'Bag, mask, transport circuit available — even if NC', labelJa: 'バッグ、マスク、移送回路を準備 — NC でも' },
            { key: 'resus-drugs',   label: 'Resuscitation + intubation drugs and equipment (blade, ETT, oral airway, stylet)', labelJa: '蘇生 + 挿管薬および器具(ブレード、ETT、経口エアウェイ、スタイレット)' },
            { key: 'signout',       label: 'Sign-out form completed', labelJa: 'サインアウト用紙を完成' }
        ]
    }
];

// TRAVEL pneumonic — required checks before separating from bypass.
export const travelChecklist = [
    {
        key: 'T',
        letter: 'T',
        title: 'Temperature',
        titleJa: '体温 (Temperature)',
        detail: 'Adequate rewarming (avoid hyperthermia, target ~36-37°C core)',
        detailJa: '十分な再加温(高体温を避け、深部体温 ~36-37°C を目標)'
    },
    {
        key: 'R',
        letter: 'R',
        title: 'Rhythm',
        titleJa: 'リズム (Rhythm)',
        detail: 'Sinus rhythm (or paced) at appropriate rate; rule out heart block',
        detailJa: '適切な心拍数の洞調律(またはペーシング);房室ブロックを除外'
    },
    {
        key: 'A',
        letter: 'A',
        title: 'Air on TEE',
        titleJa: 'TEE で空気 (Air on TEE)',
        detail: 'TEE confirms no intracardiac air; deair maneuvers complete',
        detailJa: 'TEE で心腔内空気がないことを確認;脱気手技完了'
    },
    {
        key: 'V',
        letter: 'V',
        title: 'Ventilation',
        titleJa: '換気 (Ventilation)',
        detail: 'Acceptable TV / PIP / FiO2 set; lungs recruited; ETT clear',
        detailJa: '許容される TV / PIP / FiO2 を設定;肺をリクルート;ETT 清浄'
    },
    {
        key: 'E',
        letter: 'E',
        title: 'Electrolytes',
        titleJa: '電解質 (Electrolytes)',
        detail: 'Warm ABG with normal K, iCa, glucose, lactate; acid-base reasonable',
        detailJa: '正常 K、iCa、血糖、乳酸の warm ABG;酸塩基平衡が妥当'
    },
    {
        key: 'L',
        letter: 'L',
        title: 'table Level',
        titleJa: 'テーブル水平 (table Level)',
        detail: 'OR table level so transducers read correctly; zero CVP/A-line',
        detailJa: 'OR テーブルを水平にしてトランスデューサが正しく読み取れるように;CVP/A ラインをゼロ点調整'
    }
];
