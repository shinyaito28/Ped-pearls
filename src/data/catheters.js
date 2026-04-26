// Source: Pediatric Anesthesia Pearls 2021, Intravascular Catheter Sizes panel (image IMG_0062).

export const arterialCatheters = [
    { range: 'Infant',     rangeJa: '乳児',      size: '24 gauge', comment: 'Femoral OK if > 5 kg.',                                              commentJa: '5 kg 超なら大腿可。' },
    { range: '10 - 40 kg', rangeJa: '10 - 40 kg', size: '22 gauge', comment: 'Use 3F 5 cm if longer access needed.',                              commentJa: 'より長いアクセス必要なら 3F 5 cm を使用。' },
    { range: '> 40 kg',    rangeJa: '> 40 kg',   size: '20 gauge', comment: 'Radial / DP / PT / femoral; consider 2.5F 2.5 cm catheter.',         commentJa: '橈骨 / 足背 / 後脛骨 / 大腿;2.5F 2.5 cm カテーテルを検討。' }
];

export const centralVenousCatheters = [
    { weight: '< 2-3 kg',   catheter: '3F 5 cm',          comment: 'Single lumen only.',                          commentJa: 'シングルルーメンのみ。' },
    { weight: '3 - 4 kg',   catheter: '4F 5 or 8 cm',     comment: 'Single lumen for volume.',                    commentJa: '容量目的にシングルルーメン。' },
    { weight: '5 - 10 kg',  catheter: '4F 8 / 9 / 12 cm', comment: 'Single lumen for volume or Double lumen 4 Fr.', commentJa: '容量目的のシングルルーメン、またはダブルルーメン 4 Fr。' },
    { weight: '10 - 12 kg', catheter: '5F 8 cm',          comment: '',                                              commentJa: '' },
    { weight: '12 - 40 kg', catheter: '5F 12-15 cm',      comment: '',                                              commentJa: '' },
    { weight: '> 40 kg',    catheter: '7F 15 cm',         comment: '',                                              commentJa: '' }
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

export const catheterPearlsJa = [
    '滅菌消毒 + ドレープを使用、Vascular Access Device ポリシーに従いフルバリア予防策。',
    'CVL 留置には超音波 + 介助者を使用。',
    '留置後の CXR は必須。',
    '静脈穿刺にはポリウレタンカテーテルを使用(血栓形成性が低い)。',
    '挿入前に必ず児に対して長さを確認(上記式を使用)。'
];
