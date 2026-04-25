import React from 'react';

// Visual marker for an age- or weight-conditional dose. Driven by the `badge`
// (neonate / caution / contraindicated / adult / info) and `label` returned
// from useDrugList for each drug.
const styles = {
    neonate:        { cls: 'bg-purple-100 text-purple-800 border-purple-300', text: 'NEONATE' },
    caution:        { cls: 'bg-amber-100 text-amber-800 border-amber-300', text: 'CAUTION' },
    contraindicated:{ cls: 'bg-red-100 text-red-800 border-red-300 animate-pulse', text: 'NOT FOR THIS AGE' },
    adult:          { cls: 'bg-blue-100 text-blue-800 border-blue-300', text: 'ADULT FIXED' },
    info:           { cls: 'bg-teal-100 text-teal-800 border-teal-300', text: 'AGE-SPECIFIC' }
};

const DoseBadge = ({ badge, label, compact = false }) => {
    if (!badge) return null;
    const s = styles[badge] || styles.info;
    return (
        <div className="flex flex-col items-end gap-0.5">
            <span
                className={`inline-block text-[9px] uppercase font-bold px-1.5 py-0.5 rounded border ${s.cls}`}
                title={label || s.text}
            >
                {s.text}
            </span>
            {!compact && label && (
                <span className="text-[10px] text-slate-500 italic max-w-[280px] text-right leading-tight">
                    {label}
                </span>
            )}
        </div>
    );
};

export default DoseBadge;
