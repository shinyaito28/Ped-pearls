import React from 'react';
import { ChevronLeft, Inbox } from 'lucide-react';
import { findHub, entriesByHub } from '../../data/specialty';
import { flowchartComponents } from './flowchartRegistry';
import ManualCard from './ManualCard';

const SpecialtyHubCard = ({ hubId, onBack }) => {
    const hub = findHub(hubId);
    const entries = entriesByHub(hubId);

    if (!hub) {
        return (
            <div className="bg-surface border border-line rounded-2xl p-6 text-center text-fg-muted">
                Unknown hub: <span className="font-mono">{hubId}</span>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <button
                onClick={onBack}
                className="flex items-center gap-1.5 text-sm text-fg-soft hover:text-fg tap-target px-2 -ml-2"
            >
                <ChevronLeft size={16} />
                <span className="font-medium">All specialties</span>
            </button>

            <div className={`bg-${hub.accent}-500/10 border border-${hub.accent}-200 dark:border-${hub.accent}-800 rounded-2xl p-4`}>
                <h2 className={`text-xl font-black text-${hub.accent}-700 dark:text-${hub.accent}-300`}>
                    {hub.label}
                </h2>
                <p className="text-xs text-fg-soft mt-0.5">{hub.description}</p>
            </div>

            {entries.length === 0 ? (
                <div className="bg-surface border border-line rounded-2xl p-8 text-center">
                    <Inbox size={28} className="text-fg-muted mx-auto mb-2" />
                    <div className="text-sm text-fg-soft font-medium">No content yet</div>
                    <div className="text-xs text-fg-muted mt-1">
                        This hub is reserved for an upcoming phase. Cardiac, Crisis, and the other
                        existing tabs cover the workflow basics in the meantime.
                    </div>
                </div>
            ) : (
                <div className="space-y-3">
                    {entries.map(entry => {
                        if (entry.kind === 'flowchart') {
                            const Comp = flowchartComponents[entry.component];
                            if (!Comp) {
                                return (
                                    <div key={entry.id} className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 rounded-2xl p-3 text-sm">
                                        Flowchart component <span className="font-mono">{entry.component}</span> not registered.
                                    </div>
                                );
                            }
                            return <Comp key={entry.id} entry={entry} />;
                        }
                        return <ManualCard key={entry.id} entry={entry} />;
                    })}
                </div>
            )}
        </div>
    );
};

export default SpecialtyHubCard;
