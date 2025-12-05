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

    // --- Auto Weight Calculation ---
    const [isManualWeight, setIsManualWeight] = useState(false);

    const calculateStandardWeight = (ageVal, unit) => {
        let estWeight = 10;
        let ageInMo = 0;

        if (unit === 'years') ageInMo = parseFloat(ageVal) * 12;
        else if (unit === 'months') ageInMo = parseFloat(ageVal);
        else if (unit === 'days') ageInMo = parseFloat(ageVal) / 30.4;

        if (isNaN(ageInMo)) return 10;

        // Formula from Page 1
        if (ageInMo <= 1) estWeight = 3.5; // NB
        else if (ageInMo <= 3) estWeight = 6;
        else if (ageInMo <= 6) estWeight = 8;
        else if (ageInMo <= 9) estWeight = 9.5;
        else if (ageInMo <= 12) estWeight = 10;
        else if (ageInMo < 120) { // 1-9 Years (approx 10y)
            const yr = ageInMo / 12;
            estWeight = (yr * 2) + 9;
        } else {
            // For older kids > 9yr, use (Age x 3) roughly or APLS (Age+4)*2
            // Table says 2-9 yr: (Age X 2)+9.
            // Let's stick to (Age * 3) for >9 as it scales better to adult weights (12yo -> 36kg, 18yo -> 54kg)
            // or just capped logic.
            const yr = ageInMo / 12;
            estWeight = yr * 3;
        }
        return parseFloat(estWeight.toFixed(1));
    };

    // Auto-update weight when age changes, unless manual
    useEffect(() => {
        if (!isManualWeight) {
            const w = calculateStandardWeight(age, ageUnit);
            setWeight(w);
        }
    }, [age, ageUnit, isManualWeight]);

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
            name: `${weight}kg / ${age}${ageUnit} ${isPreemie ? '(Preemie)' : ''}`,
            data: { weight, age, ageUnit, isPreemie, ...extraData }
        };
        setSavedProfiles(prev => [...prev, newProfile]);
    };

    const loadProfile = (profile) => {
        const d = profile.data;
        if (d.weight) {
            setWeight(d.weight);
            setIsManualWeight(true); // Treat loaded profile as manual set
        }
        if (d.age) setAge(d.age);
        if (d.ageUnit) setAgeUnit(d.ageUnit);
        if (d.isPreemie !== undefined) setIsPreemie(d.isPreemie);
        return d;
    };

    const deleteProfile = (id) => {
        setSavedProfiles(prev => prev.filter(p => p.id !== id));
    };

    return (
        <PatientContext.Provider value={{
            weight, setWeight: handleManualWeightChange,
            resetToAutoWeight, isManualWeight,
            age, setAge,
            ageUnit, setAgeUnit,
            isPreemie, setIsPreemie,
            savedProfiles, saveProfile, loadProfile, deleteProfile,
            ageMonths, ageYears, isNeonate, isTeen
        }}>
            {children}
        </PatientContext.Provider>
    );
};
