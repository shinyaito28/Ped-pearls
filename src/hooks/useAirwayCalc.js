import { usePatient } from '../context/PatientContext';

// Source: Pediatric Anesthesia Pearls 2021 (image IMG_0061).
// For ages beyond the source's pediatric range (≥12 yr), values default to
// adult sizing — flagged in the UI so the operator knows the source guide
// no longer applies.
export const useAirwayCalc = () => {
    const { weight, age, ageMonths, ageYears, isNeonate, isPreemie, ageUnit, gender } = usePatient();
    const w = parseFloat(weight);

    let ettUncuffed, ettCuffed, ettRule, depth, depthRule, blade, lma;
    let beyondPediatricRange = false;
    let ettUncuffedCalculatedMm = null, ettCuffedCalculatedMm = null;

    // ----- ETT size -----
    if (isPreemie || w < 2.5) {
        ettUncuffed = '2.5 mm';
        ettCuffed = 'N/A';
        ettRule = 'Preemie < 2.5 kg';
        blade = 'Miller 0';
        lma = '1';
    } else if (isNeonate || (ageUnit === 'months' && ageMonths < 1)) {
        ettUncuffed = '3.0 mm';
        ettCuffed = 'N/A';
        ettRule = 'Term NB';
        blade = 'Miller 0';
        lma = '1';
    } else {
        // ----- ETT size -----
        // The (Age/4)+4 formula and the NCH source guide both stop being useful
        // around 12 yr; switch to adult sizing past that point.
        if (ageYears >= 12) {
            beyondPediatricRange = true;
            ettUncuffed = gender === 'female' ? '7.0 mm' : '7.5-8.0 mm';
            ettCuffed   = gender === 'female' ? '6.5-7.0 mm' : '7.0-7.5 mm';
            ettRule     = '≥12 yr → adult sizing';
        } else if (ageYears >= 2) {
            const size = (ageYears / 4) + 4;
            ettUncuffedCalculatedMm = size;
            ettCuffedCalculatedMm = size - 0.5;
            ettUncuffed = `${size.toFixed(1)} mm`;
            ettCuffed = `${(size - 0.5).toFixed(1)} mm`;
            ettRule = '(Age / 4) + 4';
        } else {
            ettUncuffed = ageMonths < 6 ? '3.5 mm' : (ageMonths < 18 ? '4.0 mm' : '4.5 mm');
            ettCuffed   = ageMonths < 6 ? '3.0 mm' : (ageMonths < 18 ? '3.5 mm' : '4.0 mm');
            ettRule = 'Age-based table';
        }

        // ----- Laryngoscope blade -----
        if (ageMonths < 6) blade = 'Miller 1';
        else if (ageMonths < 12) blade = 'Miller 1 / Wis-Hipple 1.5';
        else if (ageYears < 2) blade = 'Mac 1 / Miller 1 / Wis-Hipple 1.5';
        else if (ageYears < 6) blade = 'Mac 2 / Miller 1 / Wis-Hipple 1.5';
        else if (ageYears < 10) blade = 'Mac 2 / Miller 2';
        else if (ageYears < 12) blade = 'Mac 3 / Miller 2';
        else blade = 'Mac 3-4 / Miller 2-3';

        // Pediatric ETT cap (only meaningful inside the (Age/4)+4 ladder).
        const ETT_MAX_UNCUFFED = 8.0;
        const ETT_MAX_CUFFED = 7.5;
        if (ageYears < 12) {
            if (parseFloat(ettUncuffed) > ETT_MAX_UNCUFFED) { ettUncuffed = `${ETT_MAX_UNCUFFED} mm`; ettRule += ' (capped 8.0)'; }
            if (parseFloat(ettCuffed) > ETT_MAX_CUFFED) { ettCuffed = `${ETT_MAX_CUFFED} mm`; }
        }

        // ----- LMA -----
        if (w <= 5) lma = '1';
        else if (w <= 10) lma = '1.5';
        else if (w <= 20) lma = '2';
        else if (w <= 30) lma = '2.5';
        else if (w <= 50) lma = '3';
        else if (w <= 70) lma = '4';
        else lma = '5';
    }

    // Source: IMG_0061, lips to mid-trachea. The age + 11 formula is
    // explicitly 1–10 yr; no floor, 22-cm cap or adult extrapolation is stated.
    let depthHeld = false;
    if (!Number.isFinite(w) || w <= 0 || !Number.isFinite(ageYears) || ageYears < 0) {
        depth = '—'; depthRule = 'Valid age and weight required'; depthHeld = true;
    } else if (w <= 3) {
        // The newborn card lists exactly 1, 2 and 3 kg. Intermediate weights,
        // very premature infants and older low-weight children need a specific reference.
        if (isNeonate && [1, 2, 3].includes(w)) {
            depth = `${w + 6} cm`;
            depthRule = 'NCH newborn reference: 1 kg = 7, 2 kg = 8, 3 kg = 9';
        } else {
            depth = '—'; depthRule = 'Newborn table applicability / intermediate weight requires confirmation'; depthHeld = true;
        }
    } else if (ageYears >= 1 && ageYears <= 10) {
        depth = `${Number((ageYears + 11).toFixed(2))} cm`;
        depthRule = 'NCH reference: age + 11 cm, 1–10 yr, lips to mid-trachea';
    } else if (ageYears > 10) {
        depth = '—'; depthRule = 'Outside the NCH age + 11 source range (1–10 yr)'; depthHeld = true;
    } else {
        const id = parseFloat(ettUncuffed);
        depth = `${(id * 3).toFixed(1)} cm`;
        depthRule = 'NCH ETT ID × 3 reference; confirm the actual tube and position';
    }

    // ----- One Lung Ventilation (OLV) -----
    let olv = { type: '-', size: '-' };
    if (ageYears < 2) {
        olv = { type: 'Bronchial Blocker (Extraluminal)', size: 'Arndt 5 Fr (parallel to ETT)' };
    } else if (ageYears < 6) {
        olv = { type: 'Bronchial Blocker (Intraluminal)', size: `Arndt 5 Fr (in ${parseFloat(ettUncuffed) >= 4.5 ? '≥4.5' : '4.0+'} mm ETT)` };
    } else if (ageYears < 8) {
        olv = { type: 'Bronchial Blocker / Univent', size: 'Arndt 5/7 Fr or Univent 3.5 / 4.5' };
    } else if (ageYears < 10) {
        olv = { type: 'DLT Small / Blocker', size: '26 Fr DLT or Arndt 7 Fr' };
    } else if (ageYears < 12) {
        olv = { type: 'DLT', size: '28 Fr' };
    } else if (ageYears < 14) {
        olv = { type: 'DLT', size: '32 Fr' };
    } else if (ageYears < 16) {
        olv = { type: 'DLT', size: '35 Fr' };
    } else {
        olv = { type: 'DLT', size: '35-37 Fr (F), 37-39 Fr (M)' };
    }

    // ----- LMA AirQ guidance -----
    // AirQ LMAs typically accept ETT (LMA size + size of AirQ) — practical translation:
    const airqMaxEtt =
        w <= 5  ? 3.5 :
        w <= 10 ? 4.0 :
        w <= 20 ? 4.5 :
        w <= 30 ? 5.0 :
        w <= 50 ? 6.0 :
        w <= 70 ? 6.0 : 7.0;

    return {
        ettUncuffed, ettCuffed, ettRule,
        ettUncuffedCalculatedMm, ettCuffedCalculatedMm,
        tubeSelectionKey: JSON.stringify([age, ageUnit, weight, gender, isPreemie]),
        depth, depthRule, depthHeld,
        blade, lma,
        airqMaxEtt,
        olv,
        beyondPediatricRange
    };
};
