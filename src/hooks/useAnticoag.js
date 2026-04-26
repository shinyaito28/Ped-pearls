import { useMemo } from 'react';
import { usePatient } from '../context/PatientContext';
import {
    heparinLoading, heparinRedose, protamineReversal, heparinCathLab
} from '../data/anticoagulation_protocol';

// Wrapper that injects the current patient's weight + age into the pure
// resolvers. Inputs come from CardiacRotemCard / HeparinProtamineCard UI.
export const useAnticoag = ({ protocol, hmsCombinedDose, hpt, act, totalUnits, loadingUnits, pumpUnits, includeHemobag }) => {
    const { weight, ageYears } = usePatient();

    const loading = useMemo(
        () => heparinLoading({ protocol, weight, ageYears, hmsCombinedDose }),
        [protocol, weight, ageYears, hmsCombinedDose]
    );

    const redose = useMemo(
        () => heparinRedose({ hpt, act, weight }),
        [hpt, act, weight]
    );

    const cathLab = useMemo(
        () => heparinCathLab({ weight }),
        [weight]
    );

    const protamine = useMemo(
        () => protamineReversal({
            protocol, weight, ageYears,
            loadingUnits: loadingUnits ?? loading.doseUnits ?? 0,
            totalUnits, pumpUnits, includeHemobag
        }),
        [protocol, weight, ageYears, loadingUnits, loading.doseUnits, totalUnits, pumpUnits, includeHemobag]
    );

    return { loading, redose, cathLab, protamine };
};
