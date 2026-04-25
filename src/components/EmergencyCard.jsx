import React, { useState } from 'react';
import { AlertTriangle, ExternalLink, Zap, HeartPulse, Activity, Brain, ShieldAlert, Droplet, Flame } from 'lucide-react';
import { useDrugList } from '../hooks/useDrugList';
import { emergencyGroups, crisisLinks } from '../data/emergency_data';
import ElectricalShockCard from './ElectricalShockCard';
import MHProtocolCard from './MHProtocolCard';
import DoseBadge from './DoseBadge';

const groupIcon = (id) => {
    switch (id) {
        case 'code': return <Zap className="text-red-500" size={20} fill="currentColor" />;
        case 'arrhythmia': return <HeartPulse className="text-rose-500" size={20} />;
        case 'seizure': return <Brain className="text-purple-500" size={20} />;
        case 'anaphylaxis': return <Activity className="text-orange-500" size={20} />;
        case 'reversal': return <ShieldAlert className="text-teal-500" size={20} />;
        case 'last': return <Droplet className="text-yellow-600" size={20} />;
        case 'hyperK': return <Flame className="text-amber-500" size={20} />;
        default: return null;
    }
};

const accentBg = (color) => `bg-${color}-50 border-${color}-100`;
const accentText = (color) => `text-${color}-800`;

const EmergencyCard = () => {
    const allDrugs = useDrugList('all');
    const [view, setView] = useState('drugs'); // 'drugs' | 'mh' | 'shock'

    const getDrug = (name) => allDrugs.find(d => d.name === name);

    return (
        <div className="space-y-4 pb-8">
            {/* Crisis header */}
            <div className="bg-red-600 text-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-3">
                    <AlertTriangle size={32} className="text-yellow-300" />
                    <div className="flex-1">
                        <h2 className="text-2xl font-black uppercase tracking-wider">Emergency</h2>
                        <p className="text-red-100 text-sm font-medium">Crisis checklists & rapid weight-based dosing</p>
                    </div>
                </div>
            </div>

            {/* External links */}
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

            {/* Sub-view switcher */}
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden flex">
                {[
                    { id: 'drugs', label: 'Drug Groups' },
                    { id: 'mh', label: 'MH Protocol' },
                    { id: 'shock', label: 'Counter Shock' }
                ].map(t => (
                    <button
                        key={t.id}
                        onClick={() => setView(t.id)}
                        className={`flex-1 py-2 text-xs font-bold transition-colors ${view === t.id ? 'bg-red-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {view === 'mh' && <MHProtocolCard />}
            {view === 'shock' && <ElectricalShockCard />}

            {view === 'drugs' && (
                <div className="space-y-6 mt-4">
                    {emergencyGroups.map(group => (
                        <div key={group.id} className="bg-white rounded-lg border-2 border-slate-100 overflow-hidden shadow-sm">
                            <div className={`px-4 py-2 border-b flex items-center gap-2 ${accentBg(group.color)}`}>
                                {groupIcon(group.id)}
                                <h3 className={`font-bold text-lg ${accentText(group.color)}`}>{group.title}</h3>
                            </div>
                            <div className="divide-y divide-slate-100">
                                {group.drugs.map(drugName => {
                                    const d = getDrug(drugName);
                                    if (!d) return (
                                        <div key={drugName} className="p-3 text-xs text-slate-400 italic">
                                            {drugName} (entry not found)
                                        </div>
                                    );
                                    const rowBg = d.badge === 'contraindicated' ? 'bg-red-50' : '';
                                    return (
                                        <div key={d.name} className={`p-4 flex justify-between items-start hover:bg-slate-50 ${rowBg}`}>
                                            <div className="flex-1 pr-4">
                                                <div className="font-bold text-slate-800 text-base">{d.name}</div>
                                                <div className="text-xs text-slate-500 font-medium">{d.note}</div>
                                            </div>
                                            <div className="text-right flex flex-col items-end gap-1">
                                                <div className="text-xl font-black text-slate-900 tracking-tight">{d.calc}</div>
                                                <div className="text-[11px] text-slate-400 font-mono">{d.formula}</div>
                                                <DoseBadge badge={d.badge} label={d.badgeLabel} compact />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EmergencyCard;
