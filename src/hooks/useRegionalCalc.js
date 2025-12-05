import { usePatient } from '../context/PatientContext';

export const useRegionalCalc = () => {
    const { weight, isNeonate, ageYears } = usePatient();
    const w = parseFloat(weight);

    // Landmarks
    let landmark = '';
    let cord = '';
    if (isNeonate || ageYears < 1) {
        landmark = 'L5 - S1'; // Baby
        cord = 'L3';
    } else {
        landmark = 'L4 - L5'; // Kids
        cord = 'L1'; // Adult/Older kid
    }

    // Volumes (Ranges)
    const caudalMin = w * 0.5;
    const caudalMax = w * 1.25;
    const spinalMin = w * 0.1;
    const spinalMax = w * 0.2;
    const penileMin = w * 0.5;
    const penileMax = w * 1.0;

    // Max Doses (mg)
    const maxLido = w * 5;
    const maxLidoEpi = w * 7;
    const maxBupi = w * 2.5;
    const maxRopi = w * 3;

    // Max Volume Caps in mL based on standard concentrations
    // Lido 1% = 10 mg/mL
    const volLido1 = maxLido / 10;
    const volLidoEpi1 = maxLidoEpi / 10;
    // Bupi 0.25% = 2.5 mg/mL
    const volBupi025 = maxBupi / 2.5;
    // Ropi 0.2% = 2 mg/mL
    const volRopi02 = maxRopi / 2;

    return {
        landmark, cord,
        caudalMin, caudalMax,
        spinalMin, spinalMax,
        penileMin, penileMax,
        maxLido, maxLidoEpi, maxBupi, maxRopi,
        volLido1, volLidoEpi1, volBupi025, volRopi02
    };
};
