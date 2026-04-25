import { usePatient } from '../context/PatientContext';

// 4-2-1 maintenance + ABL + blood/colloid product volumes.
// Source: Pediatric Anesthesia Pearls 2021 (image IMG_0062).
export const useFluidCalc = (currentHb, targetHb) => {
    const { weight, isPreemie, isNeonate, ageMonths, ageYears, isTeen } = usePatient();
    const w = parseFloat(weight);

    // ----- Maintenance fluid (4-2-1 rule) -----
    let maint = 0;
    let formulaMaint = '';

    if (w <= 10) {
        maint = w * 4;
        formulaMaint = `${w} kg × 4 mL/hr`;
    } else if (w <= 20) {
        maint = 40 + (w - 10) * 2;
        formulaMaint = `40 + (${w - 10} kg × 2 mL/hr)`;
    } else {
        // Shortcut: if wt > 20 kg, maint = 40 + wt
        maint = 40 + w;
        formulaMaint = `40 + ${w} (shortcut for >20 kg)`;
    }

    // ----- TBV factor (mL/kg) by age stratum -----
    let tbvFactor = 75;
    let tbvLabel = 'Default child (75 mL/kg)';
    if (isPreemie) { tbvFactor = 100; tbvLabel = 'Preemie (100 mL/kg)'; }
    else if (isNeonate) { tbvFactor = 90; tbvLabel = 'Term neonate (90 mL/kg)'; }
    else if (ageMonths <= 6) { tbvFactor = 80; tbvLabel = '≤ 6 months (80 mL/kg)'; }
    else if (ageYears <= 1) { tbvFactor = 75; tbvLabel = '≤ 1 yr (75 mL/kg)'; }
    else if (isTeen) { tbvFactor = 70; tbvLabel = 'Teen (65-70 mL/kg)'; }
    else { tbvFactor = 75; tbvLabel = 'Child (75 mL/kg)'; }

    const tbv = w * tbvFactor;

    // ----- Allowable Blood Loss (ABL) -----
    const start = parseFloat(currentHb || 12);
    const limit = parseFloat(targetHb || 8);
    const avg = (start + limit) / 2;
    const abl = avg > 0 ? (tbv * (start - limit)) / avg : 0;

    // ----- Boluses & blood products -----
    const isotonicBolus = { min: w * 10, max: w * 20 }; // 10-20 mL/kg LR/NS
    const alb5 = w * 10;     // 5% albumin: 10 mL/kg
    const alb25Min = w * 2;  // 25% albumin: 2-3 mL/kg
    const alb25Max = w * 3;
    const rbc = w * 10;      // PRBC 10 mL/kg → ↑Hb 1 g/dL
    const plt = w / 10;      // 1 unit per 10 kg
    const hetastarch = w * 10; // 10 mL/kg, max 35 mL/kg/day
    const hetastarchDaily = w * 35;

    // ----- Hypertonic (buffered) saline -----
    // 1-3 mL/kg over 20 min (PIV OK for 2%, CVC ideal for 3%)
    const buffSalineMin = w * 1;
    const buffSalineMax = w * 3;

    // ----- Buretrol fill cap -----
    const buretrolMaxFill = w * 20; // ≤ 20 mL/kg

    return {
        maint, formulaMaint,
        tbv, tbvFactor, tbvLabel,
        abl,
        isotonicBolus,
        alb5, alb25Min, alb25Max,
        rbc, plt,
        hetastarch, hetastarchDaily,
        buffSalineMin, buffSalineMax,
        buretrolMaxFill
    };
};
