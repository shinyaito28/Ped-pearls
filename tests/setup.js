import '@testing-library/jest-dom/vitest';

// jsdom does not implement matchMedia; useTheme uses it. Stub a safe default.
if (typeof window !== 'undefined' && !window.matchMedia) {
    window.matchMedia = (query) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
    });
}
