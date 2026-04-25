// Source: Pediatric Anesthesia Pearls 2021, Intravascular Catheter Sizes panel (image IMG_0062).

export const arterialCatheters = [
    { range: 'Infant',     size: '24 gauge', comment: 'Femoral OK if > 5 kg.' },
    { range: '10 - 40 kg', size: '22 gauge', comment: 'Use 3F 5 cm if longer access needed.' },
    { range: '> 40 kg',    size: '20 gauge', comment: 'Radial / DP / PT / femoral; consider 2.5F 2.5 cm catheter.' }
];

export const centralVenousCatheters = [
    { weight: '< 2-3 kg',   catheter: '3F 5 cm',          comment: 'Single lumen only.' },
    { weight: '3 - 4 kg',   catheter: '4F 5 or 8 cm',     comment: 'Single lumen for volume.' },
    { weight: '5 - 10 kg',  catheter: '4F 8 / 9 / 12 cm', comment: 'Single lumen for volume or Double lumen 4 Fr.' },
    { weight: '10 - 12 kg', catheter: '5F 8 cm',          comment: '' },
    { weight: '12 - 40 kg', catheter: '5F 12-15 cm',      comment: '' },
    { weight: '> 40 kg',    catheter: '7F 15 cm',         comment: '' }
];

// Length calculation for CVL insertion depth (cm).
// Based on patient height (cm).
export const calcCvlDepth = (heightCm) => {
    const h = parseFloat(heightCm);
    if (isNaN(h) || h <= 0) return null;
    if (h < 100) return h / 10 - 1;
    return h / 10 - 2;
};

export const catheterPearls = [
    'Use sterile prep & drape, full barrier precautions per Vascular Access Device policy.',
    'Use ultrasound + an assistant for CVL placement.',
    'Post-insertion CXR is required after placement.',
    'Use polyurethane catheters for venous insertion (less thrombogenic).',
    'Always check length to child prior to insertion (use the formula above).'
];
