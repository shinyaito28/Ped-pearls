import { useEffect, useState, useCallback } from 'react';

const STORAGE_KEY = 'ped_pearls_theme';

const getSystemPref = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark' : 'light';

const apply = (mode) => {
    if (typeof document === 'undefined') return;
    const resolved = mode === 'system' ? getSystemPref() : mode;
    document.documentElement.classList.toggle('dark', resolved === 'dark');
    document.documentElement.dataset.theme = resolved;

    // Sync the iOS status-bar / Android URL-bar color.
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', resolved === 'dark' ? '#0b1220' : '#0d9488');
};

export const useTheme = () => {
    const [mode, setMode] = useState(() => {
        try {
            return localStorage.getItem(STORAGE_KEY) || 'system';
        } catch {
            return 'system';
        }
    });

    useEffect(() => {
        apply(mode);
        try { localStorage.setItem(STORAGE_KEY, mode); } catch { /* ignore */ }
    }, [mode]);

    // Re-apply when system preference changes if mode is 'system'.
    useEffect(() => {
        if (mode !== 'system' || typeof window === 'undefined') return;
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = () => apply('system');
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, [mode]);

    const cycle = useCallback(() => {
        setMode(prev => prev === 'system' ? 'light' : (prev === 'light' ? 'dark' : 'system'));
    }, []);

    const resolved = mode === 'system' ? getSystemPref() : mode;

    return { mode, resolved, setMode, cycle };
};
