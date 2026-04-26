// Source: Pediatric Anesthesia Pearls 2021, Sedation/Adjuncts panel (image IMG_0063).
// Each entry uses an `agent` label (route-specific) and a parseable `dose` string.

export const sedationList = [
    // --- Premedication / Anxiolysis ---
    { agent: 'Clonidine (PO)',                agentJa: 'クロニジン (経口)',           dose: '4-5 mcg/kg',     max: null, note: 'Pre-med.',                        noteJa: '前投薬。' },
    { agent: 'Clonidine (Regional)',          agentJa: 'クロニジン (区域麻酔)',       dose: '1-2 mcg/kg',     max: null, note: 'Preservative-free only. Block adjunct.', noteJa: '保存剤無添加のみ。ブロック補助薬。' },
    { agent: 'Clonidine (IV pain)',           agentJa: 'クロニジン (IV 鎮痛)',         dose: '1-2 mcg/kg',     max: null, note: 'Analgesia.',                      noteJa: '鎮痛。' },
    { agent: 'Clonidine (IV shivering)',      agentJa: 'クロニジン (IV シバリング)', dose: '3 mcg/kg',       max: null, note: 'Postop shivering.',               noteJa: '術後シバリング。' },
    { agent: 'Clonidine (IV PONV)',           agentJa: 'クロニジン (IV PONV)',         dose: '2 mcg/kg',       max: null, note: 'PONV.',                            noteJa: 'PONV。' },
    { agent: 'Clonidine (IV preinduction)',   agentJa: 'クロニジン (IV 導入前)',       dose: '2 mcg/kg',       max: null, note: 'Agitation prevention.',           noteJa: '興奮予防。' },

    // --- Dexmedetomidine ---
    { agent: 'Dexmedetomidine (Load)',        agentJa: 'Dexmedetomidine (ローディング)', dose: '0.5-2 mcg/kg',  max: null, note: 'IV over 10 min. DO NOT push.',        noteJa: 'IV を 10 分かけて。急速投与不可。' },
    { agent: 'Dexmedetomidine (Maint)',       agentJa: 'Dexmedetomidine (維持)',        dose: '0.2-1 mcg/kg/hr', max: null, note: 'IV maintenance.',                    noteJa: 'IV 維持。' },
    { agent: 'Dexmedetomidine (Nasal)',       agentJa: 'Dexmedetomidine (経鼻)',        dose: '1-3 mcg/kg',     max: null, note: 'Intranasal premed.',                 noteJa: '経鼻前投薬。' },

    // --- Benzos ---
    { agent: 'Diazepam (PO)',                 agentJa: 'ジアゼパム (経口)',             dose: '0.25-0.3 mg/kg', max: null, note: 'DO NOT give IM.',                     noteJa: 'IM 投与不可。' },
    { agent: 'Diazepam (IV)',                 agentJa: 'ジアゼパム (IV)',               dose: '0.05-0.1 mg/kg', max: 10,   note: 'IV titrate.',                          noteJa: 'IV 漸増。' },

    // --- Antihistamine ---
    { agent: 'Diphenhydramine (PO/IM)',       agentJa: 'ジフェンヒドラミン (PO/IM)',  dose: '1-2 mg/kg',      max: 50,   note: 'Benadryl.',                            noteJa: 'Benadryl。' },

    // --- Ketamine routes ---
    { agent: 'Ketamine (IM Sedation)',        agentJa: 'ケタミン (IM 鎮静)',            dose: '2-3 mg/kg',      max: null, note: 'IM sedation. Add atropine 0.02 mg/kg.', noteJa: 'IM 鎮静。アトロピン 0.02 mg/kg を追加。' },
    { agent: 'Ketamine (IM GA)',              agentJa: 'ケタミン (IM 全身麻酔)',        dose: '5-8 mg/kg',      max: null, note: 'IM general anesthesia. Add midaz 0.1-0.15 mg/kg.', noteJa: 'IM 全身麻酔。midazolam 0.1-0.15 mg/kg を追加。' },
    { agent: 'Ketamine (IV Induction)',       agentJa: 'ケタミン (IV 導入)',            dose: '2 mg/kg',        max: null, note: 'IV induction.',                       noteJa: 'IV 導入。' },
    { agent: 'Ketamine (IV Analgesia)',       agentJa: 'ケタミン (IV 鎮痛)',            dose: '0.25-0.5 mg/kg', max: null, note: 'IV sub-dissociative analgesia.',     noteJa: 'IV 亜解離性鎮痛。' },

    // (Ketazolam PO mix is rendered separately by useSedationMix() in SedationCard.)

    // --- Midazolam routes ---
    { agent: 'Midazolam (Oral)',              agentJa: 'Midazolam (経口)',              dose: '0.5-1 mg/kg',    max: 20,   note: 'Mix w/ acetaminophen syrup 10-15 mg/kg for palatability.', noteJa: '飲みやすさ向上のためアセトアミノフェンシロップ 10-15 mg/kg と混合。' },
    { agent: 'Midazolam (Rectal)',            agentJa: 'Midazolam (直腸)',              dose: '0.5-1 mg/kg',    max: null, note: 'Most practical up to 18 mo. 10 mL syringe + lubricated 14F suction catheter.',
        noteJa: '18 ヶ月まで最も実用的。10 mL シリンジ + 潤滑剤を塗った 14F 吸引カテーテル。',
        ageRules: [
            { maxMonths: 18, badge: 'info', label: 'Optimal age window (≤18 months) for rectal route', labelJa: '直腸ルートに最適な年齢域 (≤18 ヶ月)' },
            { minMonths: 18, badge: 'caution', label: '>18 months — older children typically refuse PR; consider PO/IN.', labelJa: '>18 ヶ月 — 年長児は PR を拒否することが多い;PO/IN を検討。' }
        ]
    },
    { agent: 'Midazolam (Nasal)',             agentJa: 'Midazolam (経鼻)',              dose: '0.2-0.3 mg/kg',  max: null, note: 'Can be irritating.',                  noteJa: '刺激性あり。' },
    { agent: 'Midazolam (IV)',                agentJa: 'Midazolam (IV)',                dose: '0.05-0.1 mg/kg', max: null, note: 'Increments.',                          noteJa: '少量ずつ漸増。' },

    // --- Barbiturate ---
    { agent: 'Pentobarbital (IM/PO)',         agentJa: 'ペントバルビタール (IM/PO)',  dose: '2-6 mg/kg',      max: 200,  note: 'IM/PO.',                               noteJa: 'IM/PO。' },
    { agent: 'Pentobarbital (IV)',            agentJa: 'ペントバルビタール (IV)',      dose: '1-3 mg/kg',      max: null, note: 'IV titrate.',                          noteJa: 'IV 漸増。' },
];
