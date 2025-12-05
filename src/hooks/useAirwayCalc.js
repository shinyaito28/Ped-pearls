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

        // --- Adult Limit Cap ---
        const ETT_MAX_UNCUFFED = 8.0;
        const ETT_MAX_CUFFED = 7.5;
        if (parseFloat(ettUncuffed) > ETT_MAX_UNCUFFED) { ettUncuffed = `${ETT_MAX_UNCUFFED} mm`; ettRule += ' (Max 8.0)'; }
        if (parseFloat(ettCuffed) > ETT_MAX_CUFFED) { ettCuffed = `${ETT_MAX_CUFFED} mm`; }

        if (w <= 5) lma = '1';
        else if (w <= 10) lma = '1.5';
        else if (w <= 20) lma = '2';
        else if (w <= 30) lma = '2.5';
        else if (w <= 50) lma = '3';
        else lma = '4'; // >50
        if (w > 70) lma = '5';
    }

    if (w <= 3) {
        if (w <= 1) depth = '7 cm';
        else if (w <= 2) depth = '8 cm';
        else depth = '9 cm';
        depthRule = '1kg=7, 2kg=8, 3kg=9';
    } else if (ageYears >= 1) {
        let d = Math.floor(ageYears + 11);
        if (d > 22) d = 22; // Cap depth
        depth = `${d} cm`;
        depthRule = 'Age + 11 cm';
    } else {
        const id = parseFloat(ettUncuffed);
        depth = `${(id * 3).toFixed(1)} cm`;
        depthRule = 'ID × 3';
    }

    // --- One Lung Ventilation (OLV) ---
    // Rules of thumb based on research:
    // DLT: Min 26Fr (>8yr / 130cm / 30kg)
    // Bronchial Blocker: 5Fr (Extraluminal <2yo, Intraluminal >2yo) or 7Fr
    // Univent

    let olv = { type: '-', size: '-' };
    if (ageYears < 2) {
        olv = { type: 'Bronchial Blocker (Extraluminal)', size: 'Arndt 5Fr (Parallel to ETT)' };
    } else if (ageYears < 6) {
        olv = { type: 'Bronchial Blocker (Intraluminal)', size: `Arndt 5Fr (in ${parseFloat(ettUncuffed) >= 4.5 ? '>=4.5' : '??'}mm ETT)` };
    } else if (ageYears < 8) {
        olv = { type: 'Bronchial Blocker / Univent', size: 'Arndt 5Fr / 7Fr or Univent 3.5/4.5' };
    } else if (ageYears < 10) {
        olv = { type: 'DLT Small / Blocker', size: '26 Fr DLT or Arndt 7Fr' };
    } else if (ageYears < 12) {
        olv = { type: 'DLT', size: '28 Fr' };
    } else if (ageYears < 14) {
        olv = { type: 'DLT', size: '32 Fr' };
    } else if (ageYears < 16) {
        olv = { type: 'DLT', size: '35 Fr' };
    } else {
        olv = { type: 'DLT', size: '35/37 Fr (F), 37/39 Fr (M)' };
    }

    return { ettUncuffed, ettCuffed, ettRule, depth, depthRule, blade, lma, olv };
};
