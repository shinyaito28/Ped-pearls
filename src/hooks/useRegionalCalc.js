import { usePatient } from '../context/PatientContext';

// Source: Pediatric Anesthesia Pearls 2021, Regional panel (image IMG_0063).
export const useRegionalCalc = () => {
    const { weight, isNeonate, ageYears } = usePatient();
    const w = parseFloat(weight);

    // ----- Landmarks -----
    let landmark, cord, dural;
    if (isNeonate || ageYears < 1) {
        landmark = 'L5 - S1 (baby)';
        cord = 'L3 (infant <1 yr)';
        dural = 'S4 (infant)';
    } else if (ageYears < 8) {
        landmark = 'L4 - L5 (kids)';
        cord = 'L1 (older child)';
        dural = 'S2 (older child)';
    } else {
        landmark = 'L3 - L4 (adult)';
        cord = 'L1 (adult)';
        dural = 'S2 (adult)';
    }

    // ----- Single-shot block volumes (mL) -----
    const caudalMin = w * 0.5;
    const caudalMax = w * 1.25;
    const spinalMin = w * 0.1;
    const spinalMax = w * 0.2;
    const penileMin = w * 0.5;
    const penileMax = w * 1.0;
    const extremityMin = w * 0.5;
    const extremityMax = w * 1.0;

    // ----- Spinal duration (range, median) -----
    const spinalBupiDuration = '30-180 min (~80 min)';
    const spinalRopiDuration = '25-240 min (~90 min)';

    // ----- Epidural test dose -----
    const testDoseMin = w * 0.1;          // 0.1 mL/kg
    const testDoseMax = Math.min(testDoseMin, 3); // capped at 3 mL of LA + epi 1:200,000

    // ----- Epidural infusions (mg/kg/hr → mL/hr at standard concentrations) -----
    // Bupivacaine 0.1% (1 mg/mL):  rate = (mg/kg/hr × kg) / 1
    // Ropivacaine 0.1% (1 mg/mL):  same math
    // 3% Chloroprocaine: 1 mL/kg/hr
    const epiBupiMin = w * 0.2;  // 0.2 mg/kg/hr
    const epiBupiMax = w * 0.4;  // 0.4 mg/kg/hr
    const epiRopiMin = w * 0.8;
    const epiRopiMax = w * 1.6;
    const epiChloro  = w * 1.0;  // mL/kg/hr

    // ----- Maximum LA doses (mg) -----
    const maxLido      = w * 4.5;
    const maxLidoEpi   = w * 7;
    const maxBupi      = w * 2.5;
    const maxBupiEpi   = w * 3;
    const maxRopi      = w * 3.5;
    const maxRopiEpi   = w * 3.5;
    const maxChloro    = w * 11;
    const maxChloroEpi = w * 14;

    // ----- Volumes at standard concentrations (mL) -----
    // Concentration in mg/mL: Lido 1% = 10; Bupi 0.25% = 2.5; Bupi 0.5% = 5; Ropi 0.2% = 2; Ropi 0.5% = 5; Chloro 3% = 30
    const vol = (mg, mgPerMl) => mg / mgPerMl;

    const volLido1       = vol(maxLido, 10);
    const volLidoEpi1    = vol(maxLidoEpi, 10);
    const volBupi025     = vol(maxBupi, 2.5);
    const volBupiEpi025  = vol(maxBupiEpi, 2.5);
    const volBupi05      = vol(maxBupi, 5);
    const volRopi02      = vol(maxRopi, 2);
    const volRopiEpi02   = vol(maxRopiEpi, 2);
    const volRopi05      = vol(maxRopi, 5);
    const volChloro3     = vol(maxChloro, 30);
    const volChloroEpi3  = vol(maxChloroEpi, 30);

    // ----- Block adjuncts (mg or mcg, prolong block 20-40%) -----
    const adjuncts = {
        clonidine:    { dose: '1-2 mcg/kg',    calc: { min: w * 1, max: w * 2 } },
        dexamethasone:{ dose: '0.1 mg/kg',     calc: w * 0.1 },
        epinephrine:  { dose: '1-2 mcg/kg',    calc: { min: w * 1, max: w * 2 } },
        fentanyl:     { dose: '1-2 mcg/kg',    calc: { min: w * 1, max: w * 2 } },
        morphine:     { dose: '30 mcg/kg',     calc: w * 30 }
    };

    return {
        landmark, cord, dural,
        caudalMin, caudalMax, spinalMin, spinalMax,
        penileMin, penileMax, extremityMin, extremityMax,
        spinalBupiDuration, spinalRopiDuration,
        testDoseMin, testDoseMax,
        epiBupiMin, epiBupiMax, epiRopiMin, epiRopiMax, epiChloro,
        maxLido, maxLidoEpi, maxBupi, maxBupiEpi, maxRopi, maxRopiEpi, maxChloro, maxChloroEpi,
        volLido1, volLidoEpi1,
        volBupi025, volBupiEpi025, volBupi05,
        volRopi02, volRopiEpi02, volRopi05,
        volChloro3, volChloroEpi3,
        adjuncts
    };
};
