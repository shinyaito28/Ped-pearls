// ROTEM nomenclature reference. Used for the small (i) tooltips that sit
// next to each slider label in CardiacRotemCard so a clinician unfamiliar
// with viscoelastic testing can decode the abbreviations at a glance.

export const rotemGlossary = {
    HEPTEM: {
        title: 'HEPTEM',
        body: 'Heparinase-treated EXTEM. Inactivates heparin in the sample so coagulation parameters are interpretable while the patient is fully anticoagulated on bypass.'
    },
    EXTEM: {
        title: 'EXTEM',
        body: 'Tissue-factor-activated extrinsic pathway assay. Reflects fibrin polymerisation + platelet contribution in the absence of heparin.'
    },
    FIBTEM: {
        title: 'FIBTEM',
        body: 'EXTEM with the platelet contribution blocked by cytochalasin D. Isolates fibrinogen / fibrin polymerisation; low MCF flags fibrinogen deficiency.'
    },
    CT: {
        title: 'CT — Clotting Time',
        body: 'Time (sec) from start of measurement until 2 mm amplitude. Prolonged CT suggests procoagulant deficiency (factor / heparin effect).'
    },
    CFT: {
        title: 'CFT — Clot Formation Time',
        body: 'Time (sec) from 2 mm to 20 mm amplitude. Prolonged CFT reflects slow clot kinetics — platelet or fibrinogen deficit.'
    },
    A10: {
        title: 'A10 — Amplitude at 10 min',
        body: 'Clot amplitude (mm) 10 minutes after CT. Predicts MCF early so transfusion decisions can be made without waiting for full run-out.'
    },
    MCF: {
        title: 'MCF — Maximum Clot Firmness',
        body: 'Peak amplitude (mm) reached during the test. Reflects overall clot strength — combined platelet + fibrinogen contribution.'
    },
    Kcentra: {
        title: 'Kcentra (4-factor PCC)',
        body: 'Prothrombin Complex Concentrate (factors II, VII, IX, X + protein C/S). Used here at 20 U/kg to correct CT/CFT prolongation post-bypass.'
    }
};

export const lookupTerm = (key) => rotemGlossary[key] || null;
