/** @type {import('tailwindcss').Config} */
const dynamicColors = ['red', 'rose', 'orange', 'amber', 'yellow', 'lime', 'green',
    'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'slate'];
const dynamicShades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
const safelist = [];
dynamicColors.forEach(c => {
    dynamicShades.forEach(s => {
        safelist.push(`bg-${c}-${s}`);
        safelist.push(`text-${c}-${s}`);
        safelist.push(`border-${c}-${s}`);
        safelist.push(`hover:bg-${c}-${s}`);
        safelist.push(`hover:border-${c}-${s}`);
        safelist.push(`dark:bg-${c}-${s}`);
        safelist.push(`dark:text-${c}-${s}`);
        safelist.push(`dark:border-${c}-${s}`);
    });
});

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    safelist,
    theme: {
        extend: {
            colors: {
                // Semantic tokens — wired to CSS variables defined in src/index.css.
                app:        'rgb(var(--bg-app) / <alpha-value>)',
                surface:    'rgb(var(--bg-surface) / <alpha-value>)',
                'surface-2':'rgb(var(--bg-surface-2) / <alpha-value>)',
                fg:         'rgb(var(--fg-primary) / <alpha-value>)',
                'fg-soft':  'rgb(var(--fg-secondary) / <alpha-value>)',
                'fg-muted': 'rgb(var(--fg-muted) / <alpha-value>)',
                line:       'rgb(var(--border) / <alpha-value>)',
                'line-strong': 'rgb(var(--border-strong) / <alpha-value>)',
            },
            animation: {
                'pulse-slow': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'ui-monospace', 'monospace']
            }
        },
    },
    plugins: [],
}
