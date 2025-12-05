import { usePatient } from '../context/PatientContext';

export const useAirwayCalc = () => {
    const { weight, ageMonths, ageYears, isNeonate, isPreemie, ageUnit } = usePatient();
    const w = parseFloat(weight);

    let ettUncuffed, ettCuffed, ettRule, depth, depthRule, blade, lma;

    if (isPreemie || w < 2.5) {
        ettUncuffed = '2.5 mm';
        ettCuffed = 'N/A';
        ettRule = 'Preemie <2.5kg';
        blade = 'Miller 0';
        lma = '1'; // Smallest
    } else if (isNeonate || (ageUnit === 'months' && ageMonths < 1)) {
        ettUncuffed = '3.0 mm';
        ettCuffed = 'N/A';
        ettRule = 'Term NB';
        blade = 'Miller 0';
        lma = '1';
    } else {
        if (ageYears >= 2) {
            const size = (ageYears / 4) + 4;
            ettUncuffed = `${size.toFixed(1)} mm`;
            ettCuffed = `${(size - 0.5).toFixed(1)} mm`;
            ettRule = '(Age/4) + 4';
            blade = 'Mac 2';
        } else {
            ettUncuffed = ageMonths < 6 ? '3.5 mm' : (ageMonths < 18 ? '4.0 mm' : '4.5 mm');
            ettCuffed = ageMonths < 6 ? '3.0 mm' : (ageMonths < 18 ? '3.5 mm' : '4.0 mm');
            ettRule = 'Age-based Table';
            blade = ageMonths < 6 ? 'Miller 1' : 'Mac 1 / Miller 1';
        }

        if (w <= 5) lma = '1';
        else if (w <= 10) lma = '1.5';
        else if (w <= 20) lma = '2';
        else if (w <= 30) lma = '2.5';
        else if (w <= 50) lma = '3';
        else lma = '4'; // >50
    }

    if (w <= 3) {
        if (w <= 1) depth = '7 cm';
        else if (w <= 2) depth = '8 cm';
        else depth = '9 cm';
        depthRule = '1kg=7, 2kg=8, 3kg=9';
    } else if (ageYears >= 1) {
        depth = `${Math.floor(ageYears + 11)} cm`;
        depthRule = 'Age + 11 cm';
    } else {
        const id = parseFloat(ettUncuffed);
        depth = `${(id * 3).toFixed(1)} cm`;
        depthRule = 'ID × 3';
    }

    return { ettUncuffed, ettCuffed, ettRule, depth, depthRule, blade, lma };
};
