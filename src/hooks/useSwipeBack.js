import { useRef, useEffect } from 'react';

// useSwipeBack — wires touch events on the given element ref so that a
// rightward horizontal swipe from the left edge fires `onBack()`.
//
// Why "from the left edge": that's the iOS-native back-swipe gesture
// users already expect. Constraining the start position avoids
// accidental triggers from horizontal scrolling inside cards (tables,
// pickers, code blocks).
//
// Tunables:
//   - edgeStartPx: max distance from the left edge where the gesture
//     is allowed to start. Anything starting further right is ignored.
//   - minDeltaXpx: minimum horizontal travel required to count as a back
//     swipe.
//   - maxDeltaYpx: maximum vertical travel allowed. A swipe with more
//     vertical motion than this is treated as a scroll, not a back.
//   - maxDurationMs: gesture must complete in this window — slow
//     scrolls don't count.
//
// Returns a ref to attach to the scrollable container.

export const useSwipeBack = ({
    onBack,
    edgeStartPx = 50,
    minDeltaXpx = 80,
    maxDeltaYpx = 60,
    maxDurationMs = 700,
} = {}) => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el || typeof onBack !== 'function') return;

        let startX = 0;
        let startY = 0;
        let startTime = 0;
        let armed = false;

        const onTouchStart = (e) => {
            if (!e.touches || e.touches.length !== 1) return;
            const t = e.touches[0];
            // Only arm if the touch starts near the left edge.
            armed = t.clientX <= edgeStartPx;
            if (armed) {
                startX = t.clientX;
                startY = t.clientY;
                startTime = Date.now();
            }
        };

        const onTouchEnd = (e) => {
            if (!armed) return;
            armed = false;
            const t = (e.changedTouches && e.changedTouches[0]) || null;
            if (!t) return;
            const dx = t.clientX - startX;
            const dy = Math.abs(t.clientY - startY);
            const dt = Date.now() - startTime;
            if (dx >= minDeltaXpx && dy <= maxDeltaYpx && dt <= maxDurationMs) {
                onBack();
            }
        };

        el.addEventListener('touchstart', onTouchStart, { passive: true });
        el.addEventListener('touchend', onTouchEnd, { passive: true });
        return () => {
            el.removeEventListener('touchstart', onTouchStart);
            el.removeEventListener('touchend', onTouchEnd);
        };
    }, [onBack, edgeStartPx, minDeltaXpx, maxDeltaYpx, maxDurationMs]);

    return ref;
};
