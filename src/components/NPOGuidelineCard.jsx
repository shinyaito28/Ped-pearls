import React, { useState, useMemo, useEffect } from 'react';
import { Clock, AlertTriangle, Check } from 'lucide-react';
import { npoTypes, npoSpecialNotes } from '../data/npo_guidelines';

const NPOGuidelineCard = () => {
    const [selectedId, setSelectedId] = useState('clear');
    const [lastIntake, setLastIntake] = useState(''); // 'YYYY-MM-DDTHH:mm'
    const [now, setNow] = useState(() => new Date());

    // Re-tick every 30s so the elapsed/remaining display stays current.
    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 30000);
        return () => clearInterval(id);
    }, []);

    const selected = npoTypes.find(t => t.id === selectedId);

    const computed = useMemo(() => {
        if (!lastIntake || !selected) return null;
        const intake = new Date(lastIntake);
        if (isNaN(intake.getTime())) return null;
        const npoEnds = new Date(intake.getTime() + selected.hours * 60 * 60 * 1000);
        const elapsedMin = Math.floor((now - intake) / 60000);
        const remainingMin = Math.floor((npoEnds - now) / 60000);
        const cleared = remainingMin <= 0;
        return { intake, npoEnds, elapsedMin, remainingMin, cleared };
    }, [lastIntake, selected, now]);

    const fmtTime = (d) => d ? d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-';
    const fmtMin = (m) => {
        if (m === undefined || isNaN(m)) return '-';
        const abs = Math.abs(m);
        const h = Math.floor(abs / 60);
        const mm = abs % 60;
        const sign = m < 0 ? '-' : '';
        return `${sign}${h}h ${mm}m`;
    };

    return (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 space-y-4">
            <h3 className="font-bold text-emerald-700 flex items-center gap-2 border-b border-slate-200 pb-2">
                <Clock size={18} /> NPO Status Calculator
            </h3>

            {/* Type picker */}
            <div>
                <label className="text-[10px] text-slate-500 uppercase font-bold mb-1 block">Last intake type</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {npoTypes.map(t => (
                        <button
                            key={t.id}
                            onClick={() => setSelectedId(t.id)}
                            className={`text-left p-2.5 rounded-lg border-2 transition-colors ${selectedId === t.id ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-slate-50 hover:border-slate-300'}`}
                        >
                            <div className="flex justify-between items-start gap-2">
                                <div className="font-bold text-sm text-slate-800">{t.label}</div>
                                <div className="text-xs font-bold text-emerald-700 whitespace-nowrap">{t.hours} hr</div>
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5">{t.detail}</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Time input */}
            <div>
                <label className="text-[10px] text-slate-500 uppercase font-bold mb-1 block">Time of last intake</label>
                <input
                    type="datetime-local"
                    value={lastIntake}
                    onChange={e => setLastIntake(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-mono text-sm text-slate-800"
                />
                <button
                    onClick={() => {
                        const d = new Date();
                        const pad = n => String(n).padStart(2, '0');
                        setLastIntake(`${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`);
                    }}
                    className="text-[10px] text-emerald-600 hover:underline mt-1"
                >
                    Set to now
                </button>
            </div>

            {/* Result panel */}
            {computed && (
                <div className={`rounded-2xl p-4 border-2 ${computed.cleared ? 'border-emerald-300 bg-emerald-50' : 'border-rose-300 bg-rose-50'}`}>
                    <div className="flex items-center gap-2 mb-2">
                        {computed.cleared
                            ? <><Check size={20} className="text-emerald-600" /><span className="font-bold text-emerald-800 text-lg">NPO Cleared — OK to proceed</span></>
                            : <><AlertTriangle size={20} className="text-rose-600" /><span className="font-bold text-rose-800 text-lg">Still NPO — wait {fmtMin(computed.remainingMin)}</span></>
                        }
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                        <div className="bg-white rounded-md p-2 border border-slate-200">
                            <div className="text-[10px] uppercase text-slate-500 font-bold">Last intake</div>
                            <div className="font-mono">{fmtTime(computed.intake)}</div>
                        </div>
                        <div className="bg-white rounded-md p-2 border border-slate-200">
                            <div className="text-[10px] uppercase text-slate-500 font-bold">Cleared at</div>
                            <div className="font-mono">{fmtTime(computed.npoEnds)}</div>
                        </div>
                        <div className="bg-white rounded-md p-2 border border-slate-200">
                            <div className="text-[10px] uppercase text-slate-500 font-bold">Time since intake</div>
                            <div className="font-mono">{fmtMin(computed.elapsedMin)}</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Special notes */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <div className="text-[10px] uppercase font-bold text-amber-800 mb-1">Important notes</div>
                <ul className="text-xs text-amber-900 list-disc pl-5 space-y-1">
                    {npoSpecialNotes.map((n, i) => <li key={i}>{n}</li>)}
                </ul>
            </div>
        </div>
    );
};

export default NPOGuidelineCard;
