import { usePatient } from '../context/PatientContext';

export const useFluidCalc = (currentHb, targetHb) => {
    const { weight, isPreemie, isNeonate, ageMonths, ageYears, isTeen } = usePatient();
    const w = parseFloat(weight);

    let maint = 0;
    let formulaMaint = '';

    // 4-2-1 Rule
    if (w <= 10) {
        maint = w * 4;
        formulaMaint = `${w}kg × 4mL`;
    } else if (w <= 20) {
        maint = 40 + (w - 10) * 2;
        formulaMaint = `40 + (${w - 10}kg × 2mL)`;
    } else {
        maint = 60 + (w - 20) * 1;
        formulaMaint = `60 + (${w - 20}kg × 1mL)`;
    }

    // TBV Factors (Image 7)
    let tbvFactor = 75;
    if (isPreemie) tbvFactor = 100;
    else if (isNeonate) tbvFactor = 90; // Term NB
    else if (ageMonths <= 6) tbvFactor = 80; // 6 mo
    else if (ageYears <= 1) tbvFactor = 75; // 1 yo
    else if (isTeen) tbvFactor = 70; // Teen (65-70) -> Use 70
    else tbvFactor = 75; // Default Child

    const tbv = w * tbvFactor;

    const start = parseFloat(currentHb || 12);
    const limit = parseFloat(targetHb || 8);
    const avg = (start + limit) / 2;
    const abl = avg > 0 ? (tbv * (start - limit)) / avg : 0;

    const alb5 = w * 10; // 5% -> 10 mL/kg
    const alb25 = w * 2.5; // 25% -> 2-3 mL/kg
    const rbc = w * 10; // 10 mL/kg
    const plt = w / 10; // 1 unit per 10kg

    return { maint, formulaMaint, tbv, tbvFactor, abl, alb5, alb25, rbc, plt };
};
