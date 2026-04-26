import React, { useState, useEffect } from 'react';
import {
    Stethoscope, Baby, Brain, MapPin, ClipboardCheck, Droplets, Activity,
    Replace, Bone, Scissors, Dna, Anchor, Library
} from 'lucide-react';
import { hubs, entriesByHub } from '../../data/specialty';
import SpecialtyHubCard from './SpecialtyHubCard';

// String → component mapping for hub icons. Keeps the data layer free of
// React imports.
const ICONS = {
    Stethoscope, Baby, Brain, MapPin, ClipboardCheck, Droplets, Activity,
    Replace, Bone, Scissors, Dna, Anchor, Library,
};

const SpecialtyLauncher = ({ initialHubId, onConsumeInitialHub }) => {
    const [activeHub, setActiveHub] = useState(initialHubId || null);

    // Allow the parent (Layout) to deep-link into a specific hub once.
    useEffect(() => {
        if (initialHubId) {
            setActiveHub(initialHubId);
            onConsumeInitialHub?.();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialHubId]);

    if (activeHub) {
        return <SpecialtyHubCard hubId={activeHub} onBack={() => setActiveHub(null)} />;
    }

    return (
        <div className="space-y-4">
            <div className="bg-teal-500/10 border border-teal-200 dark:border-teal-800 rounded-2xl p-4">
                <div className="flex items-center gap-2">
                    <div className="bg-teal-500/20 text-teal-700 dark:text-teal-300 p-1.5 rounded-lg">
                        <Library size={18} />
                    </div>
                    <div>
                        <h2 className="text-lg font-black text-teal-700 dark:text-teal-300">Specialty</h2>
                        <p className="text-[11px] text-fg-soft">NCH subspecialty manuals — pick a hub.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {hubs.map(hub => {
                    const Icon = ICONS[hub.iconName] || Library;
                    const count = entriesByHub(hub.id).length;
                    const empty = count === 0;
                    return (
                        <button
                            key={hub.id}
                            onClick={() => setActiveHub(hub.id)}
                            className={`text-left p-3 rounded-2xl border transition-all tap-target ${
                                empty
                                    ? 'bg-surface border-line opacity-60 hover:opacity-100'
                                    : `bg-surface border-line hover:border-${hub.accent}-500`
                            }`}
                        >
                            <div className="flex items-center gap-2 mb-1.5">
                                <div className={`bg-${hub.accent}-500/10 text-${hub.accent}-600 dark:text-${hub.accent}-400 p-1.5 rounded-lg`}>
                                    <Icon size={16} />
                                </div>
                                <div className="font-bold text-sm text-fg flex-1 leading-tight">{hub.label}</div>
                            </div>
                            <div className="text-[11px] text-fg-muted leading-snug">{hub.description}</div>
                            <div className="text-[10px] text-fg-muted mt-1.5 font-mono">
                                {empty ? 'coming soon' : `${count} ${count === 1 ? 'entry' : 'entries'}`}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default SpecialtyLauncher;
