import React, { useState } from 'react';
import { Info, BookOpen, ExternalLink, ShieldAlert, ClipboardCheck, Clock, Pill, Heart } from 'lucide-react';
import IEProphylaxisCard from './IEProphylaxisCard';
import StandardCartCard from './StandardCartCard';
import NPOGuidelineCard from './NPOGuidelineCard';
import PreOpAssessmentCard from './PreOpAssessmentCard';

const externalRefs = [
    // Verified URLs (Apr 2026):
    { name: 'Pedi Crisis 2.0 (SPA)',                url: 'https://pedsanesthesia.org/pedi-crisis-app/' },
    { name: 'SPA Critical Events Checklists',       url: 'https://pedsanesthesia.org/critical-events-checklists/' },
    { name: 'PALS Algorithms (AHA)',                url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/algorithms' },
    { name: 'DAS Pediatric Difficult Airway',       url: 'https://das.uk.com/guidelines/paediatric-difficult-airway-guidelines' },
    { name: 'MHAUS — Hotline & Resources',          url: 'https://www.mhaus.org/' },
    { name: 'LipidRescue.org (LAST)',               url: 'http://www.lipidrescue.org/' },
    { name: 'ASA Standards & Practice Parameters',  url: 'https://www.asahq.org/standards-and-guidelines' }
];

const sections = [
    { id: 'npo',     label: 'NPO',    icon: Clock },
    { id: 'preop',   label: 'Pre-op', icon: ClipboardCheck },
    { id: 'ieppx',   label: 'IE Ppx', icon: Heart },
    { id: 'cart',    label: 'Cart',   icon: Pill },
    { id: 'links',   label: 'Links',  icon: ExternalLink },
];

const ReferenceCard = () => {
    const [active, setActive] = useState('npo');

    return (
        <div className="space-y-4">
            <div className="bg-slate-800 text-white p-4 rounded-2xl shadow flex items-center gap-3">
                <BookOpen size={26} className="text-teal-300" />
                <div>
                    <h2 className="text-lg font-black">Workflow & Reference</h2>
                    <p className="text-slate-300 text-xs">NPO • Pre-op • IE prophylaxis • Standard cart • External links</p>
                </div>
            </div>

            {/* Sub-section picker */}
            <div className="bg-white border border-slate-200 rounded-xl p-1 flex overflow-x-auto no-scrollbar">
                {sections.map(s => {
                    const Icon = s.icon;
                    const isActive = active === s.id;
                    return (
                        <button
                            key={s.id}
                            onClick={() => setActive(s.id)}
                            className={`flex-1 min-w-[80px] flex items-center justify-center gap-1.5 text-xs font-bold py-2 rounded-lg transition-colors ${isActive ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}
                        >
                            <Icon size={14} /> {s.label}
                        </button>
                    );
                })}
            </div>

            {active === 'npo'   && <NPOGuidelineCard />}
            {active === 'preop' && <PreOpAssessmentCard />}
            {active === 'ieppx' && <IEProphylaxisCard />}
            {active === 'cart'  && <StandardCartCard />}
            {active === 'links' && (
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4">
                    <h3 className="font-bold text-slate-700 flex items-center gap-2 border-b border-slate-200 pb-2 mb-3">
                        <ShieldAlert size={18} className="text-teal-600" /> External Resources
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {externalRefs.map(ref => (
                            <a
                                key={ref.name}
                                href={ref.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-teal-50 border border-teal-200 hover:border-teal-400 px-3 py-2 rounded-lg flex items-center justify-between group transition-colors"
                            >
                                <span className="font-bold text-teal-800 text-sm">{ref.name}</span>
                                <ExternalLink size={14} className="text-teal-300 group-hover:text-teal-600" />
                            </a>
                        ))}
                    </div>
                    <div className="text-[10px] text-slate-500 italic flex items-start gap-2 mt-4 pt-3 border-t border-slate-200">
                        <Info size={12} className="flex-shrink-0 mt-0.5" />
                        Based on Nationwide Children's Pediatric Anesthesia Pearls (2021). This card is a guide; always use clinical judgment and verify dosing.
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReferenceCard;
