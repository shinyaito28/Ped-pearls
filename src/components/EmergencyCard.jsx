
import React from 'react';
import { AlertTriangle, ExternalLink, Zap, HeartPulse, Activity, Brain, ShieldAlert } from 'lucide-react';
import { useDrugList } from '../hooks/useDrugList';
import { emergencyGroups, crisisLinks } from '../data/emergency_data';

const EmergencyCard = () => {

    // Get all drugs with calc
    const allDrugs = useDrugList('all');

    // Helper to find drug data by name
    const getDrug = (name) => {
        return allDrugs.find(d => d.name === name);
    };

    return (
        <div className="space-y-4 pb-8">
            {/* Header: Red Siren / Crisis Mode */}
            <div className="bg-red-600 text-white p-4 rounded-lg shadow-lg animate-pulse-slow">
                <div className="flex items-center gap-3">
                    <AlertTriangle size={32} className="text-yellow-300" />
                    <div>
                        <h2 className="text-2xl font-black uppercase tracking-wider">Emergency</h2>
                        <p className="text-red-100 text-sm font-medium">Crisis Checklists & Rapid Dosing</p>
                    </div>
                </div>
            </div>

            {/* External Protocols (Pedi Crisis 2.0 etc) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {crisisLinks.map((link, idx) => (
                    <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white border-2 border-red-100 hover:border-red-400 p-3 rounded-lg shadow-sm flex items-center justify-between group transition-all"
                    >
                        <span className="font-bold text-red-700 flex items-center gap-2">
                            <ShieldAlert size={18} />
                            {link.name}
                        </span>
                        <ExternalLink size={16} className="text-slate-300 group-hover:text-red-500" />
                    </a>
                ))}
            </div>

            {/* Drug Groups */}
            <div className="space-y-6 mt-4">
                {emergencyGroups.map(group => (
                    <div key={group.id} className="bg-white rounded-lg border-2 border-slate-100 overflow-hidden shadow-sm">
                        {/* Group Header */}
                        <div className={`px-4 py-2 border-b flex items-center gap-2 bg-${group.color}-50 border-${group.color}-100`}>
                            {group.id === 'code' && <Zap className="text-red-500" size={20} fill="currentColor" />}
                            {group.id === 'arrhythmia' && <HeartPulse className="text-rose-500" size={20} />}
                            {group.id === 'seizure' && <Brain className="text-purple-500" size={20} />}
                            {group.id === 'anaphylaxis' && <Activity className="text-orange-500" size={20} />}

                            <h3 className={`font-bold text-lg text-${group.color}-800`}>{group.title}</h3>
                        </div>

                        {/* Drugs List */}
                        <div className="divide-y divide-slate-100">
                            {group.drugs.map(drugName => {
                                const d = getDrug(drugName);
                                if (!d) return null; // Skip if drug name not matching logic
                                return (
                                    <div key={d.name} className="p-4 flex justify-between items-center hover:bg-slate-50">
                                        <div className="flex-1 pr-4">
                                            <div className="font-bold text-slate-800 text-base">{d.name}</div>
                                            <div className="text-xs text-slate-500 font-medium">{d.note}</div>
                                        </div>
                                        <div className="text-right">
                                            {/* Large, high-contrast dose display */}
                                            <div className="text-xl font-black text-slate-900 tracking-tight">{d.calc}</div>
                                            <div className="text-[11px] text-slate-400 font-mono">{d.formula}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmergencyCard;
