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
        if (d.weight) setWeight(d.weight);
        if (d.age) setAge(d.age);
        if (d.ageUnit) setAgeUnit(d.ageUnit);
        if (d.isPreemie !== undefined) setIsPreemie(d.isPreemie);
        return d; // Return data for other components to consume corrections/labs
    };

    const deleteProfile = (id) => {
        setSavedProfiles(prev => prev.filter(p => p.id !== id));
    };

    return (
        <PatientContext.Provider value={{
            weight, setWeight,
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
