import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Vitest config — separate from vite.config.js so build-time `base` does not
// affect the test runner. Hooks are React Components, so we need the React
// plugin and a jsdom environment.
export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './tests/setup.js',
        include: ['tests/**/*.{test,spec}.{js,jsx}']
    }
});
