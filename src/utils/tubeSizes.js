// Mathematical neighbours, not a clinical rounding recommendation.
// Preserve the unrounded estimate so a displayed decimal never selects a tube.
export const halfMillimeterNeighbors = (mm) => {
    if (!Number.isFinite(mm) || mm <= 0) return [];
    const doubled = mm * 2;
    const nearest = Math.round(doubled);
    if (Math.abs(doubled - nearest) < 1e-9) return [nearest / 2];
    return [...new Set([Math.floor(doubled) / 2, Math.ceil(doubled) / 2])].filter(size => size > 0);
};

export const tubeSizeOptions = (reference, calculatedMm = null) => {
    if (calculatedMm !== null) return halfMillimeterNeighbors(calculatedMm);
    // Table entries and adult ranges retain precisely their existing sizes.
    if (!/^\d+(?:\.\d+)?(?:-\d+(?:\.\d+)?)? mm$/.test(reference)) return [];
    return reference.replace(' mm', '').split('-').map(Number);
};
