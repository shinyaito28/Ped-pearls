import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

// LanguageContext — bilingual (English / Japanese) state for the app.
//
// Default language: 'en' (so any user opening the app sees English,
// matching the design intent of the app being shareable with English-
// speaking colleagues).
//
// Triple-tap on the brand logo (Layout.jsx) flips between 'en' <-> 'ja'.
// Choice persists in localStorage('ped_pearls_lang').
//
// The `t(en, ja)` helper picks the right string based on current
// language. If `ja` is undefined or empty, falls back to `en` —
// this lets us roll out translations incrementally without breakage.

const STORAGE_KEY = 'ped_pearls_lang';

const LanguageContext = createContext({
    lang: 'en',
    setLang: () => {},
    toggleLang: () => {},
    t: (en) => en,
});

export const LanguageProvider = ({ children }) => {
    const [lang, setLangState] = useState('en');

    // Load persisted preference once on mount.
    useEffect(() => {
        try {
            const v = localStorage.getItem(STORAGE_KEY);
            if (v === 'en' || v === 'ja') setLangState(v);
        } catch { /* ignore */ }
    }, []);

    const setLang = useCallback((next) => {
        if (next !== 'en' && next !== 'ja') return;
        setLangState(next);
        try { localStorage.setItem(STORAGE_KEY, next); } catch { /* ignore */ }
    }, []);

    const toggleLang = useCallback(() => {
        setLang(lang === 'en' ? 'ja' : 'en');
    }, [lang, setLang]);

    const t = useCallback((en, ja) => {
        if (lang === 'ja' && ja) return ja;
        return en;
    }, [lang]);

    return (
        <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
