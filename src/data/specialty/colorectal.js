// Colorectal hub — catalog entries.
// Source: NCH Sharepoint / Colorectal / Colorectal Protocols & Guidelines /
//   - Colorectal ERAS Ane protocol.docx
//   - Guide- Green dye in Colorectal.pdf (Novadaq SPY Elite® ICG protocol)
//   - Colorectal excel sheet.xlsx (binary tracker — not transcribed)

const COMMON = {
    hub: 'colorectal',
    kind: 'catalog',
    weightAware: false,
    ageRules: null,
    source: 'NCH Sharepoint / Colorectal Protocols & Guidelines',
    lastReviewed: '2026-04',
};

export const entries = [
    {
        ...COMMON,
        id: 'colorectal_eras',
        title: 'Colorectal ERAS — Anesthesia Protocol',
        titleJa: '大腸 ERAS — 麻酔プロトコール',
        shortDescription: '3hr pre-op buffer; gabapentin + APAP pre-op; epidural OR TAP OR lido infusion; ket+precedex; fluid 3-4 mL/kg/hr.',
        shortDescriptionJa: '術前 3 時間バッファ;術前ギャバペンチン + APAP;硬膜外 / TAP / リドカイン持続;ケタミン + Precedex;輸液 3-4 mL/kg/hr。',
        tags: ['colorectal', 'colorectal eras', 'gabapentin colorectal', 'mid thoracic epidural', 'tap block', 'lidocaine infusion colorectal', 'ketamine bolus', 'precedex colorectal', 'limit fluids', 'no ng tube'],
        emergency: false,
        sections: [
            {
                heading: 'Pre-op (patient must be in pre-op 3 hr before case)',
                headingJa: '術前(患者は症例 3 時間前に術前エリア)',
                emphasis: 'info',
                body: '- **Electrolyte-based clears until 2 hr pre-op**\n- **Gabapentin 10 mg/kg PO (max 600 mg) 3 hr pre-op**\n- **Acetaminophen 10 mg/kg PO or rectal**',
                bodyJa: '- **術前 2 時間まで電解質ベース清澄液**\n- 術前 3 時間に **ギャバペンチン 10 mg/kg PO (最大 600 mg)**\n- **アセトアミノフェン 10 mg/kg PO または直腸**',
            },
            {
                heading: 'Intra-op',
                headingJa: '術中',
                emphasis: 'warn',
                body: '- **Decadron 0.5 mg/kg IV (max 10 mg)**\n- **Regional choice (1 of 3)**:\n  - **Mid-thoracic epidural**\n  - **Bilateral TAP blocks**\n  - **Lidocaine infusion 1 mg/kg bolus → 1 mg/kg/hr**\n- **Ketamine bolus 1 mg/kg after induction** (optional ketamine infusion **0.5 mg/kg/hr**, DC at start of closure)\n- **Precedex bolus 0.5 mcg/kg + infusion 0.5 mcg/kg/hr** → **reduce to 0.3 mcg/kg/hr 1 hr before closure** → DC at end of case\n- **Ketorolac 0.5 mg/kg (max 30 mg) towards end of surgery / start of closure** — confirm with surgeon',
                bodyJa: '- **Decadron 0.5 mg/kg IV (最大 10 mg)**\n- **区域麻酔選択(3 つから 1 つ)**:\n  - **中位胸部硬膜外**\n  - **両側 TAP ブロック**\n  - **リドカイン持続 1 mg/kg ボーラス → 1 mg/kg/hr**\n- **導入後にケタミン 1 mg/kg ボーラス**(オプションでケタミン持続 **0.5 mg/kg/hr**、閉創開始時に DC)\n- **Precedex 0.5 mcg/kg ボーラス + 持続 0.5 mcg/kg/hr** → **閉創 1 時間前に 0.3 mcg/kg/hr へ減量** → 症例終了時に DC\n- **手術終了 / 閉創開始あたりにケトロラク 0.5 mg/kg (最大 30 mg)** — 外科医に確認',
            },
            {
                heading: 'Fluid + supportive',
                headingJa: '輸液 + 支持療法',
                emphasis: 'warn',
                body: '- **Limit fluid administration to 3-4 mL/kg/hr** for the case\n- **Albumin** for persistent hypotension\n- **Blood products** if necessary\n- **Maintain normothermia**\n- **Avoid nasogastric tubes**\n- Narcotic amount + type at anesthesia team\'s discretion — but **attempt to limit narcotics** + use other adjunctive medications above',
                bodyJa: '- 症例中の輸液は **3-4 mL/kg/hr に制限**\n- 持続性低血圧には **アルブミン**\n- 必要時に **血液製剤**\n- **正常体温を維持**\n- **NG チューブを避ける**\n- 麻薬量と種類は麻酔チーム裁量 — ただし **麻薬使用の制限を試み**、上記の他の補助薬を活用',
            },
            {
                heading: 'Reminder',
                headingJa: '注意点',
                emphasis: 'plain',
                body: '*"These are basic guidelines and patient care/safety is always at the discretion of the individual anesthesiologist caring for the patient. We are trying to decrease narcotic use as tolerated by each patient."* — per NCH source',
                bodyJa: '*「これは基本的なガイドラインであり、患者ケア/安全は常に担当麻酔科医の裁量に委ねられる。各患者の許容範囲内で麻薬使用減を目指している。」* — NCH ソースより',
            },
        ],
    },
    {
        ...COMMON,
        id: 'colorectal_green_dye',
        title: 'Green Dye in Colorectal (SPY Elite® ICG)',
        titleJa: '大腸での緑色色素 (SPY Elite® ICG)',
        shortDescription: 'ICG via SPY Elite® System for colorectal anastomosis perfusion. 5-10 mg per image sequence.',
        shortDescriptionJa: '大腸吻合部灌流用 ICG を SPY Elite® System で。1 イメージシーケンスあたり 5-10 mg。',
        tags: ['icg', 'spy elite', 'novadaq', 'green dye', 'fluorescence', 'anastomosis perfusion', 'colorectal imaging'],
        emergency: false,
        related: ['uro_icg_fluorescent_imaging'],
        sections: [
            {
                heading: 'What it is',
                headingJa: '何か',
                emphasis: 'info',
                body: '**Indocyanine Green (ICG)** with the **SPY Elite® System** (Novadaq) — used during colorectal procedures for **intraoperative perfusion assessment** of the anastomosis (assesses tissue viability before completing the join).\n\nSame drug as the da Vinci ICG protocol (`uro_icg_fluorescent_imaging`) but different device + injection sequence.',
                bodyJa: '**SPY Elite® System** (Novadaq) と **インドシアニングリーン (ICG)** — 大腸手技中の吻合部 **術中灌流評価**に使用(吻合完了前に組織生存性を評価)。\n\n薬剤は da Vinci ICG プロトコール(`uro_icg_fluorescent_imaging`)と同じだが、機器 + 注入シーケンスが異なる。',
            },
            {
                heading: 'Preparation',
                headingJa: '調製',
                emphasis: 'plain',
                body: '- ICG mixed with the **10 mL pH-balanced aqueous solution** supplied by the manufacturer\n- **Use within 6 hours** of reconstitution\n- **Caution in patients with iodide allergy** (hospital pre-treatment protocol may apply)',
                bodyJa: '- メーカー付属の **10 mL pH 調整水溶液**で ICG を混合\n- 再構成 **6 時間以内に使用**\n- **ヨウ素アレルギー患者では慎重に**(病院前処置プロトコールが適用されうる)',
            },
            {
                heading: 'Dosing',
                headingJa: '投与量',
                emphasis: 'warn',
                body: '- **Maximum: 2 mg/kg** (as for all ICG uses)\n- **Average dose per image sequence: 5-10 mg**\n- Refer to **SPY Elite® System Operator\'s Manual** + Kit IFU for procedure-specific doses\n- **Pre-draw individual ICG doses + saline flushes into separate syringes** in advance to facilitate rapid on-demand administration',
                bodyJa: '- **最大: 2 mg/kg** (全 ICG 使用と同じ)\n- **イメージシーケンスあたり平均量: 5-10 mg**\n- 手技別用量は **SPY Elite® System オペレータマニュアル** + Kit IFU 参照\n- 急速オンデマンド投与を容易にするため、**ICG 各回分 + 生食フラッシュを個別シリンジに事前に吸引**',
            },
            {
                heading: 'Injection protocol — communication-driven',
                headingJa: '注入プロトコール — コミュニケーション主導',
                emphasis: 'critical',
                body: '- **Inject ONLY when surgeon + SPY operator say "inject"**\n- Each dose must be **a TIGHT BOLUS** (rapid plasma protein binding required)\n- **Central line OR peripheral IV** (port close to cannula for rapid infusion)\n- **Anesthesia communicates with SPY operator** that ICG is being injected\n- **Immediately follow with 10 mL bolus saline flush** (a free-flowing IV is NOT a substitute — the tubing must be cleared rapidly)\n- **Anesthesia communicates with SPY operator** that the flush is being injected\n- Communication is critical: image capture timing depends on injection timing',
                bodyJa: '- 外科医 + SPY オペレータが「inject」と言った時のみ **注入**\n- 各回は **タイトなボーラス** でなければならない(血漿蛋白との急速結合が必要)\n- **中心静脈ライン または末梢 IV**(急速投与用にカニューレ近傍ポート)\n- ICG 投与中であることを **麻酔科が SPY オペレータに伝達**\n- **直ちに 10 mL 生食ボーラスフラッシュ** を後追い(流れている IV では代替不可 — チューブを急速にクリアする必要がある)\n- フラッシュ投与中であることを **麻酔科が SPY オペレータに伝達**\n- コミュニケーションが極めて重要: 画像キャプチャのタイミングが注入タイミングに依存',
            },
            {
                heading: 'Adverse effects',
                headingJa: '副作用',
                emphasis: 'plain',
                body: '- **Brief fluctuation in pulse oximeter readings** immediately after administration (transient, returns to baseline)\n- Hypersensitivity in iodide-allergic patients — see Preparation',
                bodyJa: '- 投与直後に **パルスオキシメータ値の短時間変動**(一過性、ベースラインに復帰)\n- ヨウ素アレルギー患者での過敏反応 — 「調製」参照',
            },
            {
                heading: 'Source',
                headingJa: '出典',
                emphasis: 'plain',
                body: 'Novadaq SPY Elite® System "Anesthesia Quick Reference Guide for Intraoperative Perfusion Assessment". Customer Service: 1-800-230-3352 (option 2). The device is intended for plastic, reconstructive, micro, GI, and cardiovascular procedures under physician direction.',
                bodyJa: 'Novadaq SPY Elite® System "Anesthesia Quick Reference Guide for Intraoperative Perfusion Assessment"。カスタマーサービス: 1-800-230-3352(オプション 2)。本デバイスは医師の指示下に形成、再建、マイクロサージャリー、消化器、心血管手技で使用。',
            },
        ],
    },
    {
        ...COMMON,
        id: 'colorectal_tracker_pointer',
        title: 'Colorectal Tracker (Excel)',
        titleJa: '大腸トラッカー (Excel)',
        shortDescription: '.xlsx admin tracker — not bedside reference.',
        shortDescriptionJa: '.xlsx の管理用トラッカー — ベッドサイド参照ではない。',
        tags: ['colorectal tracker', 'admin', 'spreadsheet'],
        emergency: false,
        sections: [
            {
                heading: 'Source pointer',
                headingJa: 'ソースポインタ',
                emphasis: 'plain',
                body: 'The "Colorectal excel sheet.xlsx" is an administrative tracker — not bedside reference. Available locally under `original_pictures/Sharepoint/Colorectal excel sheet.xlsx` for sarcoma + colorectal team use.',
                bodyJa: '"Colorectal excel sheet.xlsx" は管理用トラッカーであり、ベッドサイド参照ではない。`original_pictures/Sharepoint/Colorectal excel sheet.xlsx` 配下にローカル保存。肉腫 + 大腸チーム用。',
            },
        ],
    },
];
