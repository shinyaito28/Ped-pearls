import { usePatient } from '../context/PatientContext';

export const useCorrectionCalc = (baseExcess = -5) => {
    const { weight } = usePatient();
    const w = parseFloat(weight);

    const deficit = baseExcess < 0 ? Math.abs(baseExcess) : 0;
    const bicarb = w * deficit * 0.3;

    const d25 = w * 2;
    const d10 = w * 4; // Neonate 2-5ml/kg

    const kLow = w * 0.5;
    const kHigh = w * 1.0;

    const hyperKCalc = w * 50;
    const hyperKBicarb = w * 1;
    const hyperKInsulin = w * 0.1;
    const hyperKGluc = w * 2;

    return {
        bicarb, d25, d10, kLow, kHigh,
        hyperKCalc, hyperKBicarb, hyperKInsulin, hyperKGluc
    };
};
