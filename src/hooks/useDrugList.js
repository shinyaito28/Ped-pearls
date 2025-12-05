import { useMemo } from 'react';
import { usePatient } from '../context/PatientContext';
import { drugList } from '../data/drugs';
import { sedationList } from '../data/sedation';
import { calculateDose, fmt } from '../utils/calc';

export const useDrugList = (type = 'all') => {
    const { weight, isTeen, isNeonate } = usePatient();
    const w = parseFloat(weight);

    const processedDrugs = useMemo(() => {
        const list = type === 'sedation' ? sedationList : drugList;

        return list.map((d, i) => {
            // Handle dynamic max/min/dose values
            let max = d.max;
            let dose = d.dose;

            // Atropine dynamic max
            if (d.name === 'Atropine' && d.max === 'teen_dependent') {
                max = isTeen ? 1.0 : 0.5;
            }

            // Ceftriaxone contraindication
            if (d.name === 'Ceftriaxone' && d.dose === 'ceftriaxone_check') {
                if (isNeonate) {
                    dose = '0 mg/kg';
                    max = 0; // effectively 0
                } else {
                    dose = '50 mg/kg';
                    max = 2000;
                }
            }

            // APAP neonate
            if (d.name === 'Acetaminophen (IV)' && d.dose === 'neonate_dependent') {
                dose = isNeonate ? '7.5-10 mg/kg' : '15 mg/kg';
            }

            const { result, formula, isInfusion } = calculateDose(dose, w, max, d.min);

            // Special handling for Ceftriaxone neonate msg
            let finalResult = result;
            if (d.name === 'Ceftriaxone' && isNeonate) {
                finalResult = 'CONTRAINDICATED';
            }

            return { ...d, id: i, calc: finalResult, formula, isInfusion, realDose: dose };
        });
    }, [weight, isTeen, isNeonate, type]);

    return processedDrugs;
};

export const useSedationMix = () => {
    const { weight } = usePatient();
    const w = parseFloat(weight);
    return {
        ketamine: fmt(w * 6),
        midaz: fmt(w * 0.6),
        atropine: fmt(w * 0.02)
    };
};
