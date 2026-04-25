import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle = () => {
    const { mode, cycle } = useTheme();

    const icon = mode === 'dark' ? <Moon size={16} /> : (mode === 'light' ? <Sun size={16} /> : <Monitor size={16} />);
    const labelMap = { system: 'Auto', light: 'Light', dark: 'Dark' };

    return (
        <button
            onClick={cycle}
            aria-label="theme"
            title={`Theme: ${labelMap[mode]} (click to cycle)`}
            className="flex items-center gap-1 bg-surface-2 px-2 py-1.5 rounded-lg border border-line text-fg hover:border-teal-500 transition-colors text-xs font-bold tap-target"
        >
            {icon}
            <span className="hidden sm:inline">{labelMap[mode]}</span>
        </button>
    );
};

export default ThemeToggle;
