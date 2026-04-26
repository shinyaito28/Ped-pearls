import React, { useState, useMemo, useEffect } from 'react';
import { Activity, Plus, RotateCcw, Copy, Check, AlertTriangle, Droplet, Beaker, Trash2 } from 'lucide-react';
import { usePatient } from '../context/PatientContext';
import { useLanguage } from '../context/LanguageContext';
import { useFluidCalc } from '../hooks/useFluidCalc';
import { fmt } from '../utils/calc';

const STORAGE_KEY = 'ped_pearls_or_tracker';

const fmtClock = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const OrTrackerCard = () => {
    const { weight } = usePatient();
    const { t } = useLanguage();
    const w = parseFloat(weight) || 0;
    const [currentHb, setCurrentHb] = useState(12);
    const [targetHb, setTargetHb] = useState(8);
    const { abl, maint } = useFluidCalc(currentHb, targetHb);

    // Persist the current session to localStorage so refresh doesn't wipe it.
    const [session, setSession] = useState(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : { entries: [], startedAt: null };
        } catch {
            return { entries: [], startedAt: null };
        }
    });

    useEffect(() => {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(session)); } catch { /* ignore */ }
    }, [session]);

    const [type, setType] = useState('ebl'); // 'ebl' | 'ivf' | 'uop'
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');
    const [copied, setCopied] = useState(false);

    const addEntry = () => {
        const a = parseFloat(amount);
        if (!a || a <= 0) return;
        const now = new Date();
        setSession(prev => ({
            entries: [...prev.entries, { type, amount: a, note, time: now.toISOString() }],
            startedAt: prev.startedAt || now.toISOString()
        }));
        setAmount('');
        setNote('');
    };

    const removeEntry = (i) => {
        setSession(prev => ({ ...prev, entries: prev.entries.filter((_, idx) => idx !== i) }));
    };

    const reset = () => {
        if (confirm(t('Reset OR tracker session? This will clear all entries.', 'OR トラッカーセッションをリセットしますか?全エントリが削除されます。'))) {
            setSession({ entries: [], startedAt: null });
        }
    };

    const totals = useMemo(() => {
        const ebl = session.entries.filter(e => e.type === 'ebl').reduce((s, e) => s + e.amount, 0);
        const ivf = session.entries.filter(e => e.type === 'ivf').reduce((s, e) => s + e.amount, 0);
        const uop = session.entries.filter(e => e.type === 'uop').reduce((s, e) => s + e.amount, 0);
        return { ebl, ivf, uop };
    }, [session.entries]);

    const eblPct = abl > 0 ? (totals.ebl / abl) * 100 : 0;
    const eblBar = Math.min(eblPct, 100);
    const alarmLevel = eblPct >= 100 ? 'critical' : eblPct >= 80 ? 'warn' : 'ok';

    const sessionDuration = session.startedAt
        ? Math.floor((Date.now() - new Date(session.startedAt).getTime()) / 60000)
        : 0;
    const expectedMaint = (maint * sessionDuration) / 60; // mL since start
    const uopRate = sessionDuration > 0 ? (totals.uop / (sessionDuration / 60)) / w : 0; // mL/kg/hr

    const copySummary = () => {
        const lines = [
            `${t('OR session', 'OR セッション')} ${session.startedAt ? `${t('started', '開始')} ${fmtClock(new Date(session.startedAt))}` : ''} • ${sessionDuration} ${t('min', '分')}`,
            `${t('Weight', '体重')} ${fmt(w)} kg • ABL ${fmt(abl)} mL (Hb ${currentHb}→${targetHb})`,
            `EBL: ${fmt(totals.ebl)} mL (${fmt(eblPct)}% ${t('of ABL', 'of ABL')})`,
            `IVF: ${fmt(totals.ivf)} mL (${t('expected maint', '予測維持輸液')} ${fmt(expectedMaint)} mL)`,
            `UOP: ${fmt(totals.uop)} mL (${fmt(uopRate)} mL/kg/hr)`
        ];
        navigator.clipboard?.writeText(lines.join('\n')).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 space-y-4">
            <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2">
                <h3 className="font-bold text-rose-700 flex items-center gap-2">
                    <Activity size={18} /> {t('OR Tracker (EBL / IVF / UOP)', 'OR トラッカー (EBL / IVF / UOP)')}
                </h3>
                <div className="flex gap-1">
                    <button
                        onClick={copySummary}
                        disabled={session.entries.length === 0}
                        className="text-xs bg-slate-50 border border-slate-200 rounded-md px-2 py-1 hover:border-teal-400 disabled:opacity-50 flex items-center gap-1"
                        aria-label="copy summary"
                    >
                        {copied ? <Check size={12} /> : <Copy size={12} />}
                        {copied ? t('Copied', 'コピー済み') : t('Summary', 'サマリー')}
                    </button>
                    <button
                        onClick={reset}
                        className="text-xs bg-slate-50 border border-slate-200 rounded-md px-2 py-1 hover:border-rose-400 flex items-center gap-1 text-rose-600"
                    >
                        <RotateCcw size={12} /> {t('Reset', 'リセット')}
                    </button>
                </div>
            </div>

            {/* Hb inputs to derive ABL */}
            <div className="grid grid-cols-2 gap-2 text-xs">
                <label className="flex items-center gap-2">
                    <span className="text-slate-500 font-bold">{t('Start Hb', '開始 Hb')}</span>
                    <input type="number" value={currentHb} onChange={e => setCurrentHb(e.target.value)} className="w-16 bg-slate-50 border border-slate-200 rounded-md p-1 font-bold" />
                </label>
                <label className="flex items-center gap-2">
                    <span className="text-slate-500 font-bold">{t('Min Hb', '最低 Hb')}</span>
                    <input type="number" value={targetHb} onChange={e => setTargetHb(e.target.value)} className="w-16 bg-slate-50 border border-slate-200 rounded-md p-1 font-bold" />
                </label>
            </div>

            {/* Totals dashboard */}
            <div className="grid grid-cols-3 gap-2">
                <div className="bg-rose-50 border border-rose-200 rounded-lg p-2">
                    <div className="text-[10px] uppercase font-bold text-rose-700">EBL</div>
                    <div className="text-lg font-black text-rose-800">{fmt(totals.ebl)} <span className="text-xs">mL</span></div>
                    <div className="text-[10px] text-slate-500">ABL {fmt(abl)} mL</div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
                    <div className="text-[10px] uppercase font-bold text-blue-700">IVF</div>
                    <div className="text-lg font-black text-blue-800">{fmt(totals.ivf)} <span className="text-xs">mL</span></div>
                    <div className="text-[10px] text-slate-500">{t('Maint', '維持')} {fmt(expectedMaint)} mL</div>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-2">
                    <div className="text-[10px] uppercase font-bold text-amber-700">UOP</div>
                    <div className="text-lg font-black text-amber-800">{fmt(totals.uop)} <span className="text-xs">mL</span></div>
                    <div className="text-[10px] text-slate-500">{fmt(uopRate)} mL/kg/hr</div>
                </div>
            </div>

            {/* ABL progress bar */}
            <div>
                <div className="flex justify-between text-[10px] uppercase font-bold mb-1">
                    <span className={alarmLevel === 'critical' ? 'text-rose-700' : alarmLevel === 'warn' ? 'text-amber-700' : 'text-slate-500'}>
                        {t('EBL vs ABL', 'EBL vs ABL')}
                    </span>
                    <span className={alarmLevel === 'critical' ? 'text-rose-700' : alarmLevel === 'warn' ? 'text-amber-700' : 'text-slate-700'}>
                        {fmt(eblPct)}%
                    </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
                    <div
                        className={`h-full transition-all ${alarmLevel === 'critical' ? 'bg-rose-500' : alarmLevel === 'warn' ? 'bg-amber-400' : 'bg-emerald-400'}`}
                        style={{ width: `${eblBar}%` }}
                    />
                </div>
                {alarmLevel !== 'ok' && (
                    <div className={`text-xs font-bold mt-1 flex items-center gap-1 ${alarmLevel === 'critical' ? 'text-rose-700' : 'text-amber-700'}`}>
                        <AlertTriangle size={12} />
                        {alarmLevel === 'critical' ? t('EBL has exceeded ABL — consider transfusion now.', 'EBL が ABL を超過 — 直ちに輸血を検討。') : t('EBL approaching ABL — check Hb / type & cross.', 'EBL が ABL に接近 — Hb 確認 / type & cross。')}
                    </div>
                )}
            </div>

            {/* Add entry form */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                <div className="text-[10px] uppercase font-bold text-slate-500 mb-2">{t('Add new entry', '新規エントリ追加')}</div>
                <div className="flex flex-wrap items-end gap-2">
                    <div className="flex bg-white border border-slate-200 rounded-md overflow-hidden">
                        {[
                            { id: 'ebl', label: 'EBL', icon: Droplet, color: 'rose' },
                            { id: 'ivf', label: 'IVF', icon: Beaker, color: 'blue' },
                            { id: 'uop', label: 'UOP', icon: Droplet, color: 'amber' }
                        ].map(tab => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setType(tab.id)}
                                    className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 transition-colors ${type === tab.id ? `bg-${tab.color}-100 text-${tab.color}-700` : 'text-slate-500 hover:bg-slate-50'}`}
                                >
                                    <Icon size={12} /> {tab.label}
                                </button>
                            );
                        })}
                    </div>
                    <input
                        type="number"
                        placeholder="mL"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        className="flex-1 min-w-[80px] bg-white border border-slate-200 rounded-md p-1.5 text-sm font-bold"
                    />
                    <input
                        type="text"
                        placeholder={t('Note (optional)', 'メモ (任意)')}
                        value={note}
                        onChange={e => setNote(e.target.value)}
                        className="flex-1 min-w-[120px] bg-white border border-slate-200 rounded-md p-1.5 text-sm"
                    />
                    <button
                        onClick={addEntry}
                        disabled={!amount}
                        className="bg-teal-600 text-white text-xs font-bold px-3 py-1.5 rounded-md hover:bg-teal-700 disabled:opacity-50 flex items-center gap-1"
                    >
                        <Plus size={14} /> {t('Add', '追加')}
                    </button>
                </div>
            </div>

            {/* Entries log */}
            {session.entries.length > 0 && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
                    <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-500 border-b border-slate-200">
                        {t('Log', 'ログ')} ({session.entries.length} {session.entries.length === 1 ? t('entry', '件') : t('entries', '件')})
                    </div>
                    <ul className="divide-y divide-slate-200 max-h-48 overflow-y-auto">
                        {session.entries.slice().reverse().map((e, ri) => {
                            const i = session.entries.length - 1 - ri;
                            const colorMap = { ebl: 'rose', ivf: 'blue', uop: 'amber' };
                            return (
                                <li key={i} className="px-3 py-2 flex items-center gap-2 text-xs">
                                    <span className={`text-[10px] uppercase font-bold w-10 text-${colorMap[e.type]}-700`}>{e.type}</span>
                                    <span className="font-bold text-slate-800 w-16">{e.amount} mL</span>
                                    <span className="text-slate-500 font-mono w-14">{fmtClock(new Date(e.time))}</span>
                                    <span className="flex-1 text-slate-500 truncate">{e.note}</span>
                                    <button onClick={() => removeEntry(i)} className="text-slate-400 hover:text-rose-500" aria-label="delete entry">
                                        <Trash2 size={12} />
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}

            {session.entries.length === 0 && (
                <div className="text-xs text-slate-500 italic text-center py-2">
                    {t('Session is empty. Add your first EBL / IVF / UOP entry above.', 'セッションは空です。上記から最初の EBL / IVF / UOP エントリを追加してください。')}
                </div>
            )}
        </div>
    );
};

export default OrTrackerCard;
