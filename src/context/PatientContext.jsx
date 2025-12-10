import React, { createContext, useState, useContext, useEffect } from 'react';

const PatientContext = createContext();

export const usePatient = () => {
    const context = useContext(PatientContext);
    if (!context) {
        throw new Error('usePatient must be used within a PatientProvider');
    }
    return context;
};

export const PatientProvider = ({ children }) => {
    // --- State: Patient Data ---
    const [weight, setWeight] = useState(10); // kg
    const [age, setAge] = useState(1);
    const [ageUnit, setAgeUnit] = useState('years'); // 'days', 'months', 'years'
    const [isPreemie, setIsPreemie] = useState(false);
    const [gender, setGender] = useState('male'); // 'male' | 'female'
    const [isManualWeight, setIsManualWeight] = useState(false);

    // --- State: Profiles (Saved Settings) ---
    const [savedProfiles, setSavedProfiles] = useState(() => {
        const saved = localStorage.getItem('ped_pearls_profiles');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('ped_pearls_profiles', JSON.stringify(savedProfiles));
    }, [savedProfiles]);

    // --- Helpers ---
    const getAgeInMonths = () => {
        if (ageUnit === 'years') return parseFloat(age) * 12;
        if (ageUnit === 'months') return parseFloat(age);
        if (ageUnit === 'days') return parseFloat(age) / 30.4;
        return 0;
    };

    const getAgeInDays = () => {
        if (ageUnit === 'years') return parseFloat(age) * 365;
        if (ageUnit === 'months') return parseFloat(age) * 30.4;
        if (ageUnit === 'days') return parseFloat(age);
        return 0;
    };

    const ageMonths = getAgeInMonths();
    const ageYears = ageMonths / 12;
    const isNeonate = getAgeInDays() <= 30;
    const isTeen = ageYears >= 12;

    // --- CDC Weight Logic ---
    // CDC 50th Percentile Weight Data (KG)
    // Points: Months (0-24), then Years (2-20)
    const cdcData = {
        male: {
            0: 3.5, 1: 4.5, 2: 5.6, 3: 6.4, 4: 7.0, 5: 7.5,
            6: 7.9, 9: 8.9, 12: 9.6, 15: 10.3, 18: 10.9, 21: 11.5,
            24: 12.2, // 2yr
            36: 14.3, // 3yr
            48: 16.3, // 4yr
            60: 18.3, // 5yr
            72: 20.5, // 6yr
            84: 22.9, // 7yr
            96: 25.4, // 8yr
            108: 28.1, // 9yr
            120: 31.2, // 10yr
            132: 35.3, // 11yr
            144: 39.9, // 12yr
            156: 45.0, // 13yr
            168: 50.8, // 14yr
            180: 56.0, // 15yr
            192: 60.8, // 16yr
            204: 64.6, // 17yr
            216: 67.2, // 18yr
            240: 70.0  // 20yr (Cap)
        },
        female: {
            0: 3.4, 1: 4.2, 2: 5.1, 3: 5.8, 4: 6.4, 5: 6.9,
            6: 7.3, 9: 8.2, 12: 8.9, 15: 9.6, 18: 10.2, 21: 10.9,
            24: 11.5, // 2yr
            36: 13.9, // 3yr
            48: 15.8, // 4yr
            60: 17.9, // 5yr
            72: 20.2, // 6yr
            84: 22.4, // 7yr
            96: 25.0, // 8yr
            108: 28.2, // 9yr
            120: 31.9, // 10yr
            132: 36.9, // 11yr
            144: 41.5, // 12yr
            156: 45.8, // 13yr
            168: 49.4, // 14yr
            180: 52.0, // 15yr
            192: 53.9, // 16yr
            204: 55.4, // 17yr
            216: 56.6, // 18yr
            240: 58.0  // 20yr (Cap)
        }
    };

    const getInterpolatedWeight = (months, sex) => {
        const data = cdcData[sex] || cdcData.male;
        const points = Object.keys(data).map(Number).sort((a, b) => a - b);

        // Cap at max age in data
        if (months >= points[points.length - 1]) return data[points[points.length - 1]];
        if (months <= points[0]) return data[points[0]];

        // Find range
        for (let i = 0; i < points.length - 1; i++) {
            if (months >= points[i] && months < points[i + 1]) {
                const x0 = points[i];
                const x1 = points[i + 1];
                const y0 = data[x0];
                const y1 = data[x1];
                // Linear interpolation
                return y0 + (months - x0) * (y1 - y0) / (x1 - x0);
            }
        }
        return 10;
    };

    const calculateStandardWeight = (ageVal, unit) => {
        let ageInMo = 0;
        if (unit === 'years') ageInMo = parseFloat(ageVal) * 12;
        else if (unit === 'months') ageInMo = parseFloat(ageVal);
        else if (unit === 'days') ageInMo = parseFloat(ageVal) / 30.4;

        if (isNaN(ageInMo)) return 10;

        // Use CDC Data
        const w = getInterpolatedWeight(ageInMo, gender);
        return parseFloat(w.toFixed(1));
    };

    // Auto-update weight when age changes, unless manual
    useEffect(() => {
        if (!isManualWeight) {
            const w = calculateStandardWeight(age, ageUnit);
            setWeight(w);
        }
    }, [age, ageUnit, gender, isManualWeight]);

    const handleManualWeightChange = (val) => {
        setIsManualWeight(true);
        setWeight(val);
    };

    const resetToAutoWeight = () => {
        setIsManualWeight(false);
        setWeight(calculateStandardWeight(age, ageUnit));
    };

    // --- Profile Management ---
    const saveProfile = (extraData = {}) => {
        const newProfile = {
            id: Date.now(),
            name: `${gender === 'male' ? 'M' : 'F'} / ${weight}kg / ${age}${ageUnit} ${isPreemie ? '(Preemie)' : ''}`,
            data: { weight, age, ageUnit, gender, isPreemie, ...extraData }
        };
        setSavedProfiles(prev => [...prev, newProfile]);
    };

    const loadProfile = (profile) => {
        const d = profile.data;
        if (d.weight) {
            setWeight(d.weight);
            setIsManualWeight(true);
        }
        if (d.age) setAge(d.age);
        if (d.ageUnit) setAgeUnit(d.ageUnit);
        if (d.gender) setGender(d.gender);
        if (d.isPreemie !== undefined) setIsPreemie(d.isPreemie);
        return d;
    };

    const deleteProfile = (id) => {
        setSavedProfiles(prev => prev.filter(p => p.id !== id));
    };

    // --- State: Height & Derived ---
    const [height, setHeight] = useState(''); // cm
    const [manualHeight, setManualHeight] = useState(false);

    // IBW Calculation (Traub-Johnson / Devine) - Simplified for Peds
    // Ideal Body Weight is controversial in peds. 
    // We will use standard growth chart 50th percentile estimation for "Ideal" if only age is known (which we essentially already do with 'auto weight').
    // If Height is known, we can use:
    // IBW = 50th percentile weight for that height (Height-Weight method preferred in Peds)
    // For this app, simply exposing the CDC 50% weight (which is our `weight` when auto) IS the IBW essentially.
    // But for obese kids, we need a way to see "Ideal" vs "Actual".

    // Let's assume 'weight' state is the ACTUAL weight used for calculations.
    // We will add a read-only 'idealWeight' derived from Age (CDC 50%) or Height.

    // Height estimation (if not provided): formula age x 6 + 77 (for 2-12y) or similar approximation?
    // Better to just use CDC length/stature tables if we had them. 
    // For now, simple estimation:
    const estimateHeight = (ageY) => {
        if (ageY < 1) return 50 + (ageY * 25); // very rough: 50cm at birth, 75cm at 1yr
        if (ageY < 13) return (ageY * 6) + 77;
        return 160; // teen
    };

    const currentHeight = manualHeight && height ? parseFloat(height) : estimateHeight(ageYears);

    // Lean Body Weight (James Formula is for adults, not peds).
    // For Peds, LBW is often approx by BMI charts or specific formulas (Peters).
    // Simple logic: LBW generally not exceeding IBW by much. 
    // We will placeholder LBW as 1.2 * IBW or just 20-30% less than ABW if obese?
    // Actually, PALS recommends using ABW for most drugs, IBW for some.
    // We will provide IBW (based on 50th percentile for Age) as the reference.

    const idealWeight = calculateStandardWeight(age, ageUnit);
    // Note: calculateStandardWeight uses the CDC 50th percentile table we already have.

    // Update Height when Age changes (if auto)
    useEffect(() => {
        if (!manualHeight) {
            setHeight(Math.round(estimateHeight(ageYears)));
        }
    }, [ageYears, manualHeight]);


    const handleHeightChange = (val) => {
        setManualHeight(true);
        setHeight(val);
    };

    return (
        <PatientContext.Provider value={{
            weight, setWeight: handleManualWeightChange,
            resetToAutoWeight, isManualWeight,
            age, setAge,
            ageUnit, setAgeUnit,
            gender, setGender,
            height, setHeight: handleHeightChange,
            idealWeight,
            isPreemie, setIsPreemie,
            savedProfiles, saveProfile, loadProfile, deleteProfile,
            ageMonths, ageYears, isNeonate, isTeen
        }}>
            {children}
        </PatientContext.Provider>
    );
};
