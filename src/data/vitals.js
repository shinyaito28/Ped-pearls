
// Vitals Data based on PALS / Pediatric Pearls
// Returns: { hr_awake, hr_sleep, rr, sbp_hypotension }

export const getVitals = (age, isNeonate) => {
    let vitals = { hr: '100-180', rr: '30-60', sbp: '<60', dbp: '-' };

    if (isNeonate) {
        // Neonate (<1mo)
        vitals = { hr: '100-205', rr: '30-60', sbp: '<60', dbp: '35-55' }; // SBP PALS hypotension <60
    } else {
        const ageYr = parseFloat(age); // Assume age is in years for lookup ease (or convert)
        // Note: The context handles unit conversion, we'll assume we get 'years' value passed mainly or handle ranges

        if (ageYr < 1) {
            // Infant (1mo - 1yr)
            vitals = { hr: '100-190', rr: '30-60', sbp: '<70', dbp: '35-60' };
        } else if (ageYr >= 1 && ageYr < 3) {
            // Toddler (1-3y)
            vitals = { hr: '98-140', rr: '24-40', sbp: '<70 + (2x age)', dbp: '40-65' };
        } else if (ageYr >= 3 && ageYr < 6) {
            // Preschool (3-5y)
            vitals = { hr: '80-120', rr: '22-34', sbp: '<70 + (2x age)', dbp: '55-70' };
        } else if (ageYr >= 6 && ageYr < 12) {
            // School Age (6-12y)
            vitals = { hr: '75-118', rr: '18-30', sbp: '<70 + (2x age)', dbp: '60-80' };
        } else if (ageYr >= 12) {
            // Adolescent (>12y)
            vitals = { hr: '60-100', rr: '12-16', sbp: '<90', dbp: '65-85' };
        }
    }

    // Formatting SBP logic for 1-10 years: < 70 + 2xAge
    // We kept the string for display, but let's refine if needed.
    return vitals;
};
