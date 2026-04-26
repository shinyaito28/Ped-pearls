import { describe, it, expect } from 'vitest';
import { ampAt, buildTracePath, buildMissilePath } from '../src/components/RotemTrace';

describe('RotemTrace — ampAt waveform', () => {
    it('returns 0 before CT', () => {
        expect(ampAt(1, 200, 90, 55)).toBe(0); // 200s = 3.33min, t=1min
        expect(ampAt(3, 200, 90, 55)).toBe(0);
        expect(ampAt(3.33, 200, 90, 55)).toBe(0);
    });

    it('crosses 20 mm at CT + CFT minutes (definition of CFT)', () => {
        const ct = 200, cft = 90, mcf = 55;
        const t = (ct + cft) / 60; // CT + CFT in minutes
        const a = ampAt(t, ct, cft, mcf);
        expect(a).toBeCloseTo(20, 0); // within 1 mm
    });

    it('asymptotically approaches MCF for large t', () => {
        const a60 = ampAt(60, 200, 90, 55);
        expect(a60).toBeGreaterThan(50);
        expect(a60).toBeLessThanOrEqual(55);
    });

    it('lower MCF produces lower amplitude at all times after CT', () => {
        const aHigh = ampAt(20, 200, 90, 55);
        const aLow  = ampAt(20, 200, 90, 30);
        expect(aLow).toBeLessThan(aHigh);
    });

    it('returns 0 when MCF is 0 or negative', () => {
        expect(ampAt(20, 200, 90, 0)).toBe(0);
        expect(ampAt(20, 200, 90, -5)).toBe(0);
    });

    it('handles MCF below 20 mm without NaN (degenerate FIBTEM case)', () => {
        const a = ampAt(20, 200, 90, 12);
        expect(Number.isFinite(a)).toBe(true);
        expect(a).toBeGreaterThan(0);
        expect(a).toBeLessThan(12);
    });
});

describe('RotemTrace — path builders', () => {
    const bounds = { x0: 10, y0: 10, w: 200, h: 80 };

    it('buildTracePath produces a valid SVG path string', () => {
        const d = buildTracePath({ ctSec: 200, cftSec: 90, mcf: 55 }, bounds);
        expect(d).toMatch(/^M /);
        expect(d.split(' L ').length).toBeGreaterThan(20); // many sample points
    });

    it('buildMissilePath returns a closed shape', () => {
        const d = buildMissilePath({ ctSec: 200, cftSec: 90, mcf: 55 }, bounds);
        expect(d).toMatch(/^M /);
        expect(d).toMatch(/Z$/);
    });

    it('higher MCF produces a path with smaller (more upward) y values', () => {
        const dLow = buildTracePath({ ctSec: 200, cftSec: 90, mcf: 30 }, bounds);
        const dHigh = buildTracePath({ ctSec: 200, cftSec: 90, mcf: 55 }, bounds);
        // Sample the last point's y coordinate from both paths.
        const lastY = (s) => {
            const tokens = s.split(' ');
            return parseFloat(tokens[tokens.length - 1]);
        };
        expect(lastY(dHigh)).toBeLessThan(lastY(dLow));
    });
});
