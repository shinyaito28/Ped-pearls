// Urology hub — catalog entries.
// Source: NCH Sharepoint / Urology / Urology Intraoperative Protocols & Guidelines /
//   - Anesthesia Protocol for Bladder Extrophy_ Kelly Procedure 2026.pdf
//   - Anesthesia for robotic cases.doc (legacy .doc, converted via Word COM)
//   - Fluorescent imaging for the da Vinci.docx (NCH internal note)
//   - Guide for Fluorescence Indocyanine Green - da Vinci.pdf (Intuitive Surgical official guide)
//   - PSH Urology Laparoscopic Pyeloplasty Pathway (already in Procedures hub)

const COMMON = {
    hub: 'urology',
    kind: 'catalog',
    weightAware: false,
    ageRules: null,
    source: 'NCH Sharepoint / Urology Intraoperative Protocols',
    lastReviewed: '2026-04',
};

export const entries = [
    {
        ...COMMON,
        id: 'uro_bladder_exstrophy_kelly',
        title: 'Bladder Exstrophy + Kelly Procedure — Pain Plan',
        titleJa: '膀胱外反 + Kelly 手術 — ペインプラン',
        shortDescription: 'Epidural × 5 days (pubic symphysis sutured); 7-8 d admit; NO NSAIDs if CKD/single kidney/high VUR.',
        shortDescriptionJa: '硬膜外 × 5 日(恥骨結合縫合);7-8 日入院;CKD/単腎/高度 VUR では NSAIDs 不可。',
        tags: ['bladder exstrophy', 'kelly procedure', 'cuckow', 'soft tissue reconstruction bladder neck', 'epidural urology', 'pubic symphysis', 'oxybutynin', 'urethral drains', 'suprapubic catheter', 'ureteral reimplantation'],
        emergency: false,
        sections: [
            {
                heading: 'Stay overview',
                headingJa: '入院概要',
                emphasis: 'info',
                body: '- **7-8 day admission** (risk for wound dehiscence + bladder spasms)\n- **Epidural indwelling up to 5 day goal** (pubic symphysis is sutured)\n- Diet advanced as tolerated unless bowel surgically touched\n- **NO NSAIDs** if **CKD / single kidney / high-grade VUR**\n- Expectation: PRN-only pain meds by discharge',
                bodyJa: '- **7-8 日入院**(創離開 + 膀胱スパズムリスク)\n- **硬膜外留置最大 5 日目標**(恥骨結合が縫合されているため)\n- 腸管が外科的に触れていなければ忍容性に応じ食上げ\n- **CKD / 単腎 / 高度 VUR** あれば **NSAIDs 不可**\n- 期待値: 退院までに頓用のみのペイン薬',
            },
            {
                heading: 'Drain anatomy by procedure',
                headingJa: '手技別ドレーン解剖',
                emphasis: 'plain',
                body: '- **Bladder Exstrophy patients**: bilateral urethral drains + urethral catheter\n- **Kelly Procedure patients**: suprapubic catheter + bilateral urethral drains + Foley catheter\n\n**Kelly procedure** = soft-tissue reconstruction of bladder neck. Existing muscle + soft tissue used to create a sphincter ring. **Ureteral re-implantation** also occurs.',
                bodyJa: '- **膀胱外反患者**: 両側尿道ドレーン + 尿道カテーテル\n- **Kelly 手術患者**: 膀胱瘻カテーテル + 両側尿道ドレーン + Foley カテーテル\n\n**Kelly 手術** = 膀胱頸部の軟部組織再建。既存の筋肉 + 軟部組織を用いて括約筋輪を形成。**尿管再植え込み**も同時に施行。',
            },
            {
                heading: 'Intra-op',
                headingJa: '術中',
                emphasis: 'warn',
                body: '- Pre-op huddle: **surgeon + Pediatric Anesthesia attending + Pain Service attending** decide regional plan (epidural)\n- **Epidural choices**: Chloroprocaine 1.5% / Ropivacaine 0.1% / Ropivacaine 0.2% ± Clonidine\n- If not an epidural candidate: **NCA / PCA / CCA**\n- **IV acetaminophen 15 mg/kg (max 1 g)** at start of case\n- **IV diazepam 0.1 mg/kg (max 4 mg)** at end of case (bladder spasm preempt)\n- **Ketorolac 0.5 mg/kg (max 30 mg)** at end of case — **CONTRAINDICATED if CKD / single kidney / high-grade VUR / elevated BUN-Cr**',
                bodyJa: '- 術前ハドル: **外科医 + 小児麻酔主治医 + Pain Service 主治医** で区域麻酔計画(硬膜外)を決定\n- **硬膜外選択肢**: クロロプロカイン 1.5% / Ropivacaine 0.1% / Ropivacaine 0.2% ± クロニジン\n- 硬膜外候補でなければ: **NCA / PCA / CCA**\n- 症例開始時に **IV アセトアミノフェン 15 mg/kg (最大 1 g)**\n- 症例終了時に **IV ジアゼパム 0.1 mg/kg (最大 4 mg)**(膀胱スパズム先回り)\n- 症例終了時に **ケトロラク 0.5 mg/kg (最大 30 mg)** — **CKD / 単腎 / 高度 VUR / BUN-Cr 上昇では禁忌**',
            },
            {
                heading: 'PACU + POD #0',
                headingJa: 'PACU + POD #0',
                emphasis: 'plain',
                body: '- Continue epidural and/or pain pump\n- If epidural inadequate dermatome OR osteotomies done: **PCA/NCA/CCA with consideration for basal**\n- **Scheduled IV diazepam 0.5 mg/kg q6h (max 4 mg/dose) × min 24-48 hr** (bladder spasm)\n- **Scheduled IV APAP q6h alternating with ketorolac**\n- **Scheduled ketorolac 0.5 mg/kg q6h** (alternating with APAP)\n- IV opioid PRN\n- **Consults**: Child Life, Massage, Therapeutic Recreation, Music Therapy, Art Therapy\n- **Oxybutynin per Urology**',
                bodyJa: '- 硬膜外 および/または ペインポンプ継続\n- 硬膜外の皮膚分節カバー不十分または骨切り施行: **PCA/NCA/CCA + basal を検討**\n- **定時 IV ジアゼパム 0.5 mg/kg q6h (1 回最大 4 mg) × 最低 24-48 時間**(膀胱スパズム)\n- **定時 IV APAP q6h を ケトロラクと交互**\n- **定時 ケトロラク 0.5 mg/kg q6h**(APAP と交互)\n- IV オピオイド頓用\n- **コンサルト**: Child Life、マッサージ、Therapeutic Recreation、音楽療法、芸術療法\n- **泌尿器科指示で Oxybutynin**',
            },
            {
                heading: 'POD #1',
                headingJa: 'POD #1',
                emphasis: 'plain',
                body: '- Continue epidural ± pain pump\n- Continue scheduled diazepam IV\n- Continue scheduled APAP + ketorolac (consider PO)\n- Add **oxycodone if tolerating PO**:\n  - **<50 kg**: 0.1 mg/kg/dose q4h PRN\n  - **>50 kg**: 5 mg up to 10 mg q4h PRN\n- IV opioid PRN unless pain pump active\n- Continue therapies + Oxybutynin',
                bodyJa: '- 硬膜外 ± ペインポンプ継続\n- 定時 IV ジアゼパム継続\n- 定時 APAP + ケトロラク継続(PO を検討)\n- **経口可能なら オキシコドン追加**:\n  - **<50 kg**: 0.1 mg/kg/回 q4h 頓用\n  - **>50 kg**: 5 mg〜10 mg q4h 頓用\n- ペインポンプ非作動時は IV オピオイド頓用\n- 各療法 + Oxybutynin 継続',
            },
            {
                heading: 'POD #2-5',
                headingJa: 'POD #2-5',
                emphasis: 'plain',
                body: '- Continue epidural ± pain pump\n- Assess when basal can be DC\'d\n- **Plan: epidural OFF on POD #5** (may DC POD #4 if eating well + no pain issues)\n- Diazepam: consider PO; assess transition to PRN\n- APAP + ketorolac: consider PO\n- **Oxycodone**: assess transition from scheduled → PRN\n- IV opioid PRN unless pain pump active',
                bodyJa: '- 硬膜外 ± ペインポンプ継続\n- basal を中止できるタイミングを評価\n- **計画: POD #5 に硬膜外 OFF**(摂食良好 + 痛みなしなら POD #4 で DC 可)\n- ジアゼパム: PO を検討;頓用への移行を評価\n- APAP + ケトロラク: PO を検討\n- **オキシコドン**: 定時 → 頓用への移行を評価\n- ペインポンプ非作動時は IV オピオイド頓用',
            },
            {
                heading: 'Bladder spasm management (consult Urology)',
                headingJa: '膀胱スパズム管理(泌尿器科コンサルト)',
                emphasis: 'warn',
                body: 'If frequent bladder spasms → discuss with Urology team for **adding Ditropan**:\n- **Oxybutynin PO**: 0.2 mg/kg TID (or PRN)\n- **Oxybutynin Patch**: NOT for **<4 yr or <19 kg** (per pharmacy)',
                bodyJa: '頻繁な膀胱スパズム → 泌尿器科チームと **Ditropan 追加**を協議:\n- **Oxybutynin PO**: 0.2 mg/kg TID(または頓用)\n- **Oxybutynin パッチ**: **<4 歳または <19 kg では不可**(薬局)',
            },
        ],
    },
    {
        ...COMMON,
        id: 'uro_robotic_cases',
        title: 'Robotic Surgery — General Anesthesia Guidelines',
        titleJa: 'ロボット手術 — 全身麻酔ガイドライン',
        shortDescription: 'Multimodal: GETA + remifentanil infusion + cisatracurium/roc/vec; PCV-VG; ICG-aware.',
        shortDescriptionJa: '多剤併用: GETA + remifentanil 持続 + cisatracurium/roc/vec;PCV-VG;ICG 対応。',
        tags: ['robotic surgery', 'da vinci', 'pcv-vg', 'cisatracurium robotic', 'rocuronium', 'remifentanil infusion', 'bis monitor', 'pneumoperitoneum'],
        emergency: false,
        related: ['uro_icg_fluorescent_imaging'],
        sections: [
            {
                heading: 'Induction',
                headingJa: '導入',
                emphasis: 'info',
                body: '- **Mask induction with sevoflurane** OR IV induction with **propofol**\n- **NMB**: cisatracurium / vecuronium / rocuronium with **TOF monitoring** (if positioning allows); redose as needed (no patient movement on robotic ports)\n- **BIS monitor** after induction',
                bodyJa: '- **セボフルランによるマスク導入** または **プロポフォール**による IV 導入\n- **NMB**: cisatracurium / vecuronium / rocuronium、体位許せば **TOF モニタリング**;必要時に追加(ロボットポート上での体動不可)\n- 導入後に **BIS モニター**',
            },
            {
                heading: 'Maintenance',
                headingJa: '維持',
                emphasis: 'plain',
                body: '- **Fentanyl 2-4 mcg/kg** prior to incision\n- **Remifentanil infusion 0.05-0.3 mcg/kg/min** for hemodynamic stability\n- **Dexamethasone 0.25 mg/kg (max 20 mg)** after induction; repeat at end if case > 6 hr\n- **Desflurane or sevoflurane** to maintain **BIS 40-60**\n- **PCV-VG (pressure-controlled ventilation, volume-guaranteed)** on Avance machine — accommodates pneumoperitoneum compliance changes',
                bodyJa: '- 切開前に **フェンタニル 2-4 mcg/kg**\n- 血行動態安定のため **remifentanil 持続 0.05-0.3 mcg/kg/min**\n- 導入後に **デキサメタゾン 0.25 mg/kg (最大 20 mg)**;症例 > 6 時間なら終了時に反復\n- **デスフルランまたはセボフルラン**で **BIS 40-60** を維持\n- Avance 機で **PCV-VG (圧調節 + 一回換気量保証)** — 気腹コンプライアンス変化に適応',
            },
            {
                heading: 'End of case',
                headingJa: '症例終了',
                emphasis: 'plain',
                body: '- **Ketorolac 0.5 mg/kg** and/or **acetaminophen 10-15 mg/kg** after surgical manipulation complete (discuss ketorolac with surgeon)\n- DC remifentanil when procedure complete\n- Titrate **hydromorphone or morphine** for post-op analgesia\n- **Local anesthesia at port sites** by surgeon\n- Reverse NMB + extubate as clinically indicated',
                bodyJa: '- 外科操作終了後に **ケトロラク 0.5 mg/kg** および/または **アセトアミノフェン 10-15 mg/kg**(ケトロラクは外科医と相談)\n- 手技完了で remifentanil を DC\n- 術後鎮痛に **ハイドロモルフォンまたはモルヒネ**を漸増\n- 外科医が **ポート部位に局所麻酔**\n- 臨床所見に応じて NMB を拮抗 + 抜管',
            },
        ],
    },
    {
        ...COMMON,
        id: 'uro_icg_fluorescent_imaging',
        title: 'ICG Fluorescent Imaging (da Vinci) — Anesthesia Protocol',
        titleJa: 'ICG 蛍光イメージング (da Vinci) — 麻酔プロトコール',
        shortDescription: 'Iodinated; 2 mg/kg/day max; rapid IV bolus 0.5-1.5 mL of 2.5 mg/mL via 2-stopcock + flush technique.',
        shortDescriptionJa: 'ヨード含;2 mg/kg/日 max;2.5 mg/mL を 0.5-1.5 mL、2 ストップコック + フラッシュ法で急速 IV ボーラス。',
        tags: ['icg', 'indocyanine green', 'fluorescent imaging', 'da vinci', 'pulse ox transient drop', 'iodine allergy', 'firefly', 'robotic vasculature'],
        emergency: false,
        related: ['uro_robotic_cases'],
        sections: [
            {
                heading: 'What ICG is',
                headingJa: 'ICG とは',
                emphasis: 'info',
                body: '- **Indocyanine Green (ICG)**: water-soluble dye for vasculature visualization in robotic surgery\n- Packaged: **25 mg jar of green powder** + 10 mL sterile water vial\n- **After reconstitution**: 10 mL vial = **2.5 mg/mL solution**\n- **Half-life**: 2-5 min when bound to plasma proteins\n- **Use within 6 hours** of reconstitution',
                bodyJa: '- **インドシアニングリーン (ICG)**: ロボット手術での血管可視化に用いる水溶性色素\n- パッケージ: **25 mg の緑色粉末**容器 + 10 mL 滅菌水バイアル\n- **再構成後**: 10 mL バイアル = **2.5 mg/mL 溶液**\n- **半減期**: 血漿蛋白結合時 2-5 分\n- 再構成 **6 時間以内に使用**',
            },
            {
                heading: 'Critical safety',
                headingJa: '安全上の重要事項',
                emphasis: 'critical',
                body: '- **ICG contains sodium iodide** — use with caution in patients with **iodine / iodinated contrast allergy**\n- Hospital protocol for known allergy pre-treatment may apply\n- **ICG injection causes BRIEF transient drop in pulse ox readings** immediately after administration — anticipate, do not panic; SpO2 returns to baseline as dye distributes\n- Similar transient effect as methylene blue',
                bodyJa: '- **ICG はヨウ化ナトリウムを含む** — **ヨード / ヨード造影剤アレルギー**患者では慎重に\n- 既知アレルギー前処置プロトコールが適用されうる\n- **ICG 投与は投与直後に SpO2 値の短時間一過性低下を起こす** — 予測しパニックにならない;色素が分布するにつれて SpO2 はベースラインに戻る\n- メチレンブルーと類似の一過性効果',
            },
            {
                heading: 'Dosing',
                headingJa: '投与量',
                emphasis: 'warn',
                body: '- **Typical dose**: **0.5-1.5 mL** of 2.5 mg/mL concentration per IV injection (1.25-3.75 mg per dose)\n- Communicate with surgeon for desired dose\n- **Maximum daily dose: 2 mg/kg body weight** — do NOT exceed\n- **Minimum 2-5 minutes between injections**',
                bodyJa: '- **標準用量**: 1 回 IV 投与あたり 2.5 mg/mL 濃度の **0.5-1.5 mL** (1 回 1.25-3.75 mg)\n- 外科医と希望用量を協議\n- **1 日最大: 2 mg/kg** — 超えない\n- 投与間隔は **最低 2-5 分**',
            },
            {
                heading: 'Preparation',
                headingJa: '調製',
                emphasis: 'plain',
                body: '1. Reconstitute ICG with the 10 mL aqueous solution → **2.5 mg/mL**\n2. Withdraw the desired dose into a separate **3 mL syringe** for each planned imaging sequence\n3. Withdraw **10-12 mL normal saline** for each planned sequence into separate 12 mL syringes (flush)',
                bodyJa: '1. 10 mL 水溶液で ICG を再構成 → **2.5 mg/mL**\n2. 各イメージングシーケンスごとに別の **3 mL シリンジ**に希望量を吸引\n3. 各シーケンスごとに別の 12 mL シリンジに **生食 10-12 mL** を吸引(フラッシュ用)',
            },
            {
                heading: 'Administration — peripheral IV technique',
                headingJa: '投与 — 末梢 IV 技法',
                emphasis: 'critical',
                body: '**For optimum fluorescence imaging, each dose must be a RAPID BOLUS.**\n\n- Inject through **central line** OR peripheral IV **close to IV cannula**\n\n**Two-stopcock peripheral IV technique**:\n1. Connect **2 three-way stopcocks end-to-end** as close as possible to the IV cannula\n2. Connect ICG injection syringe to the **proximal stopcock** (closest to IV)\n3. Connect 12 mL saline flush to the **distal stopcock**\n4. When surgeon calls for injection: **open proximal stopcock + deliver ICG into the line** (do NOT yet enter bloodstream — saline flush stopcock should be turned OFF on incoming IV fluid line)\n5. After ICG delivered: **close proximal stopcock + immediately inject saline flush from distal stopcock** → delivers ICG as rapid bolus into bloodstream\n\nReady next syringe set immediately for next injection (wait 2-5 min from first injection).',
                bodyJa: '**至適な蛍光イメージングのため、各投与は急速ボーラスでなければならない。**\n\n- **中心静脈ライン**または **IV カニューレ近傍**の末梢 IV から投与\n\n**2 ストップコック末梢 IV 技法**:\n1. **3 方活栓 2 つを連結**して IV カニューレにできるだけ近接させる\n2. ICG 注射シリンジを **近位活栓**(IV に最も近い側)に接続\n3. 12 mL 生食フラッシュを **遠位活栓**に接続\n4. 外科医が注入を要求: **近位活栓を開放し ICG をライン内に投与**(まだ血流には入らない — 生食フラッシュ側活栓は流入 IV 輸液ラインへ OFF にしておく)\n5. ICG 投与後: **近位活栓を閉鎖し、直ちに遠位活栓から生食フラッシュを注入** → ICG が急速ボーラスとして血流に入る\n\n次回投与に備えてすぐに次のシリンジセットを準備(初回投与から 2-5 分待機)。',
            },
            {
                heading: 'Source',
                headingJa: '出典',
                emphasis: 'plain',
                body: '- NCH internal "Fluorescent imaging for the da Vinci.docx"\n- **Intuitive Surgical "Anesthesia Quick Reference Guide for Fluorescence Imaging"** (PN 552001-02 Rev A; Customer Service US 1-800-876-1310)',
                bodyJa: '- NCH 内部 "Fluorescent imaging for the da Vinci.docx"\n- **Intuitive Surgical "Anesthesia Quick Reference Guide for Fluorescence Imaging"** (PN 552001-02 Rev A;米国カスタマーサービス 1-800-876-1310)',
            },
        ],
    },
    {
        ...COMMON,
        id: 'uro_pyeloplasty_crossref',
        title: 'Laparoscopic Pyeloplasty PSH Pathway (cross-link)',
        titleJa: '腹腔鏡下腎盂形成 PSH パスウェイ(クロスリンク)',
        shortDescription: 'See Procedures hub: caudal + multimodal IV + Valium PRN spasm.',
        shortDescriptionJa: 'Procedures ハブ参照: カウダル + 多剤併用 IV + 頓用 Valium。',
        tags: ['pyeloplasty', 'urology', 'psh', 'laparoscopic'],
        emergency: false,
        related: ['proc_pyeloplasty_psh'],
        sections: [
            {
                heading: 'Cross-link',
                headingJa: 'クロスリンク',
                emphasis: 'info',
                body: 'The Laparoscopic Pyeloplasty PSH pathway is in the **Procedures hub** (`proc_pyeloplasty_psh`). Same NCH source. Caudal + multimodal IV approach with Valium PRN for ureteral / bladder spasm.',
                bodyJa: '腹腔鏡下腎盂形成 PSH パスウェイは **Procedures ハブ** (`proc_pyeloplasty_psh`) に存在。同じ NCH ソース。カウダル + 多剤併用 IV アプローチ + 尿管 / 膀胱スパズム時の頓用 Valium。',
            },
        ],
    },
];
