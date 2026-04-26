import React, { useState, useMemo, useEffect } from 'react';
import { Clock, AlertTriangle, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { npoTypes, npoSpecialNotes, npoSpecialNotesJa } from '../data/npo_guidelines';

const NPOGuidelineCard = () => {
    const { lang, t } = useLanguage();
    const [selectedId, setSelectedId] = useState('clear');
    const [lastIntake, setLastIntake] = useState(''); // 'YYYY-MM-DDTHH:mm'
    const [now, setNow] = useState(() => new Date());

    // Re-tick every 30s so the elapsed/remaining display stays current.
    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 30000);
        return () => clearInterval(id);
    }, []);

    const selected = npoTypes.find(tt => tt.id === selectedId);
    const notes = lang === 'ja' ? npoSpecialNotesJa : npoSpecialNotes;

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
        return `${sign}${h}${t('h', '時間')} ${mm}${t('m', '分')}`;
    };

    return (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 space-y-4">
            <h3 className="font-bold text-emerald-700 flex items-center gap-2 border-b border-slate-200 pb-2">
                <Clock size={18} /> {t('NPO Status Calculator', 'NPO 状態計算機')}
            </h3>

            {/* Type picker */}
            <div>
                <label className="text-[10px] text-slate-500 uppercase font-bold mb-1 block">{t('Last intake type', '最終摂取の種類')}</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {npoTypes.map(tt => (
                        <button
                            key={tt.id}
                            onClick={() => setSelectedId(tt.id)}
                            className={`text-left p-2.5 rounded-lg border-2 transition-colors ${selectedId === tt.id ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-slate-50 hover:border-slate-300'}`}
                        >
                            <div className="flex justify-between items-start gap-2">
                                <div className="font-bold text-sm text-slate-800">{lang === 'ja' && tt.labelJa ? tt.labelJa : tt.label}</div>
                                <div className="text-xs font-bold text-emerald-700 whitespace-nowrap">{tt.hours} {t('hr', '時間')}</div>
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5">{lang === 'ja' && tt.detailJa ? tt.detailJa : tt.detail}</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Time input */}
            <div>
                <label className="text-[10px] text-slate-500 uppercase font-bold mb-1 block">{t('Time of last intake', '最終摂取時刻')}</label>
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
                    {t('Set to now', '現在時刻に設定')}
                </button>
            </div>

            {/* Result panel */}
            {computed && (
                <div className={`rounded-2xl p-4 border-2 ${computed.cleared ? 'border-emerald-300 bg-emerald-50' : 'border-rose-300 bg-rose-50'}`}>
                    <div className="flex items-center gap-2 mb-2">
                        {computed.cleared
                            ? <><Check size={20} className="text-emerald-600" /><span className="font-bold text-emerald-800 text-lg">{t('NPO Cleared — OK to proceed', 'NPO クリア — 進行可能')}</span></>
                            : <><AlertTriangle size={20} className="text-rose-600" /><span className="font-bold text-rose-800 text-lg">{t('Still NPO — wait', 'まだ NPO — 残り')} {fmtMin(computed.remainingMin)}</span></>
                        }
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                        <div className="bg-white rounded-md p-2 border border-slate-200">
                            <div className="text-[10px] uppercase text-slate-500 font-bold">{t('Last intake', '最終摂取')}</div>
                            <div className="font-mono">{fmtTime(computed.intake)}</div>
                        </div>
                        <div className="bg-white rounded-md p-2 border border-slate-200">
                            <div className="text-[10px] uppercase text-slate-500 font-bold">{t('Cleared at', 'クリア時刻')}</div>
                            <div className="font-mono">{fmtTime(computed.npoEnds)}</div>
                        </div>
                        <div className="bg-white rounded-md p-2 border border-slate-200">
                            <div className="text-[10px] uppercase text-slate-500 font-bold">{t('Time since intake', '摂取からの経過時間')}</div>
                            <div className="font-mono">{fmtMin(computed.elapsedMin)}</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Special notes */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <div className="text-[10px] uppercase font-bold text-amber-800 mb-1">{t('Important notes', '重要な注意点')}</div>
                <ul className="text-xs text-amber-900 list-disc pl-5 space-y-1">
                    {notes.map((n, i) => <li key={i}>{n}</li>)}
                </ul>
            </div>
        </div>
    );
};

export default NPOGuidelineCard;
