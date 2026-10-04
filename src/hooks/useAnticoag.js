import { useMemo } from 'react';
import { usePatient } from '../context/PatientContext';
import {
    heparinLoading, heparinRedose, protamineReversal, heparinCathLab
} from '../data/anticoagulation_protocol';
import { positiveNumber } from '../utils/localAnestheticPlan';

// Wrapper that injects the current patient's weight + age into the pure
// resolvers. Inputs come from CardiacRotemCard / HeparinProtamineCard UI.
export const useAnticoag = ({ protocol, hmsCombinedDose, hpt, act, totalUnits, loadingUnits, pumpUnits, includeHemobag }) => {
    const { weight, ageYears, age, ageUnit } = usePatient();
    const numericAge = age == null || typeof age === 'boolean' || String(age).trim() === '' ? NaN : Number(age);
    const dayMultiplier = { days: 1, months: 30.4, years: 365 }[ageUnit];
    const ageDays = numericAge * dayMultiplier;

    const loading = useMemo(
        () => heparinLoading({ protocol, weight, ageYears, hmsCombinedDose }),
        [protocol, weight, ageYears, hmsCombinedDose]
    );

    const redose = useMemo(
        () => {
            if (protocol === 'NCH') return { trigger: false, reviewRequired: true, reviewReason: 'hms', doseUnits: null, reasons: [], reasonsJa: [] };
            if (!positiveNumber(weight) || !Number.isFinite(Number(weight) * 100) || !Number.isFinite(numericAge) || numericAge < 0 || !dayMultiplier ||
                !positiveNumber(hpt) || !positiveNumber(act))
                return { trigger: false, reviewRequired: true, reviewReason: 'measurements', doseUnits: null, reasons: [], reasonsJa: [] };
            const result = heparinRedose({ hpt, act, weight });
            if (result.trigger && (!Number.isFinite(result.doseUnits) || result.doseUnits <= 0))
                return { trigger: false, reviewRequired: true, reviewReason: 'measurements', doseUnits: null, reasons: [], reasonsJa: [] };
            return result;
        },
        [protocol, hpt, act, weight, numericAge, dayMultiplier]
    );

    const cathLab = useMemo(
        () => heparinCathLab({ weight }),
        [weight]
    );

    const protamine = useMemo(
        () => protamineReversal({
            protocol, weight, ageYears, ageDays,
            loadingUnits,
            totalUnits, pumpUnits, includeHemobag
        }),
        [protocol, weight, ageYears, ageDays, loadingUnits, totalUnits, pumpUnits, includeHemobag]
    );

    return { loading, redose, cathLab, protamine };
};
