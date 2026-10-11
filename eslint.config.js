import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
    { ignores: ['dist/**', 'node_modules/**'] },
    {
        files: ['**/*.{js,jsx,mjs}'],
        ...js.configs.recommended,
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parserOptions: { ecmaFeatures: { jsx: true } },
        },
    },
    {
        files: ['src/**/*.{js,jsx}'],
        languageOptions: { globals: globals.browser },
        plugins: { react, 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
        rules: {
            'react/jsx-uses-react': 'error',
            'react/jsx-uses-vars': 'error',
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        },
    },
    {
        files: ['tests/**/*.{js,jsx}'],
        languageOptions: { globals: { ...globals.browser, ...globals.vitest } },
        plugins: { react },
        rules: {
            'react/jsx-uses-react': 'error',
            'react/jsx-uses-vars': 'error',
        },
    },
    {
        files: ['*.config.js', 'scripts/**/*.{js,mjs}'],
        languageOptions: { globals: globals.node },
    },
];
