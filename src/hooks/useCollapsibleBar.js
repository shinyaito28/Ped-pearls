import { useState, useEffect, useRef, useCallback } from 'react';

const STORAGE_KEY = 'ped_pearls_bar_pref';
const COLLAPSE_DELAY_MS = 5000;

// Hook that manages the patient bar's expanded ↔ collapsed lifecycle.
//
//   mode:  'expanded' | 'collapsed'
//   pref:  'auto' | 'always-open'   (persisted in localStorage)
//
// Auto-collapse fires COLLAPSE_DELAY_MS after the last interaction, but only
// when pref === 'auto' and weight is valid. Any call to bumpInteraction()
// resets the timer; expand() forces expanded state immediately.
export const useCollapsibleBar = ({ canCollapse }) => {
    const [pref, setPrefState] = useState(() => {
        try {
            const v = localStorage.getItem(STORAGE_KEY);
            return v === 'always-open' ? 'always-open' : 'auto';
        } catch {
            return 'auto';
        }
    });
    const [mode, setMode] = useState('expanded');
    const timerRef = useRef(null);

    const clearTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };

    const scheduleCollapse = useCallback(() => {
        clearTimer();
        if (pref !== 'auto' || !canCollapse) return;
        timerRef.current = setTimeout(() => {
            setMode('collapsed');
            timerRef.current = null;
        }, COLLAPSE_DELAY_MS);
    }, [pref, canCollapse]);

    const expand = useCallback(() => {
        clearTimer();
        setMode('expanded');
        scheduleCollapse();
    }, [scheduleCollapse]);

    const collapse = useCallback(() => {
        clearTimer();
        setMode('collapsed');
    }, []);

    const bumpInteraction = useCallback(() => {
        // Re-arm the auto-collapse timer; only meaningful in expanded mode.
        if (mode === 'expanded') scheduleCollapse();
    }, [mode, scheduleCollapse]);

    const setPref = useCallback((next) => {
        try { localStorage.setItem(STORAGE_KEY, next); } catch { /* noop */ }
        setPrefState(next);
        if (next === 'always-open') {
            clearTimer();
            setMode('expanded');
        } else if (next === 'auto') {
            scheduleCollapse();
        }
    }, [scheduleCollapse]);

    // Mount: schedule the initial auto-collapse if eligible.
    useEffect(() => {
        scheduleCollapse();
        return clearTimer;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // If canCollapse becomes false (weight invalid) while waiting to collapse,
    // cancel the timer and force expanded so the user sees the input fields.
    useEffect(() => {
        if (!canCollapse) {
            clearTimer();
            setMode('expanded');
        }
    }, [canCollapse]);

    return { mode, pref, expand, collapse, bumpInteraction, setPref };
};
