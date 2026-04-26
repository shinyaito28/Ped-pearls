// ROTEM nomenclature reference. Used for the small (i) tooltips that sit
// next to each slider label in CardiacRotemCard so a clinician unfamiliar
// with viscoelastic testing can decode the abbreviations at a glance.

export const rotemGlossary = {
    HEPTEM: {
        title: 'HEPTEM',
        body: 'Heparinase-treated EXTEM. Inactivates heparin in the sample so coagulation parameters are interpretable while the patient is fully anticoagulated on bypass.',
        bodyJa: 'ヘパリナーゼ処理 EXTEM。検体中のヘパリンを失活させ、バイパス中の完全抗凝固下でも凝固パラメータを解釈可能にする。'
    },
    EXTEM: {
        title: 'EXTEM',
        body: 'Tissue-factor-activated extrinsic pathway assay. Reflects fibrin polymerisation + platelet contribution in the absence of heparin.',
        bodyJa: '組織因子活性化型の外因系アッセイ。ヘパリン非存在下のフィブリン重合 + 血小板寄与を反映。'
    },
    FIBTEM: {
        title: 'FIBTEM',
        body: 'EXTEM with the platelet contribution blocked by cytochalasin D. Isolates fibrinogen / fibrin polymerisation; low MCF flags fibrinogen deficiency.',
        bodyJa: 'cytochalasin D で血小板寄与をブロックした EXTEM。フィブリノゲン / フィブリン重合を分離評価;MCF 低下はフィブリノゲン不足を示唆。'
    },
    CT: {
        title: 'CT — Clotting Time',
        body: 'Time (sec) from start of measurement until 2 mm amplitude. Prolonged CT suggests procoagulant deficiency (factor / heparin effect).',
        bodyJa: '測定開始から振幅 2 mm までの時間(秒)。CT 延長は凝固促進物質不足(凝固因子 / ヘパリン作用)を示唆。'
    },
    CFT: {
        title: 'CFT — Clot Formation Time',
        body: 'Time (sec) from 2 mm to 20 mm amplitude. Prolonged CFT reflects slow clot kinetics — platelet or fibrinogen deficit.',
        bodyJa: '振幅 2 mm から 20 mm までの時間(秒)。CFT 延長は凝塊形成動態の遅延を反映 — 血小板またはフィブリノゲン不足。'
    },
    A10: {
        title: 'A10 — Amplitude at 10 min',
        body: 'Clot amplitude (mm) 10 minutes after CT. Predicts MCF early so transfusion decisions can be made without waiting for full run-out.',
        bodyJa: 'CT から 10 分後の凝塊振幅(mm)。MCF を早期予測でき、完走を待たず輸血判断が可能。'
    },
    MCF: {
        title: 'MCF — Maximum Clot Firmness',
        body: 'Peak amplitude (mm) reached during the test. Reflects overall clot strength — combined platelet + fibrinogen contribution.',
        bodyJa: '検査中に到達するピーク振幅(mm)。凝塊の総合的強度を反映 — 血小板 + フィブリノゲンの複合寄与。'
    },
    Kcentra: {
        title: 'Kcentra (4-factor PCC)',
        body: 'Prothrombin Complex Concentrate (factors II, VII, IX, X + protein C/S). Used here at 20 U/kg to correct CT/CFT prolongation post-bypass.',
        bodyJa: 'プロトロンビン複合体製剤 (因子 II、VII、IX、X + protein C/S)。バイパス後の CT/CFT 延長補正に 20 U/kg で使用。'
    }
};

export const lookupTerm = (key) => rotemGlossary[key] || null;
