import React from 'react';
import { AlertTriangle, Phone, Snowflake, Activity, Droplet, ShieldAlert, Ban } from 'lucide-react';
import { mhHotline, mhSigns, mhSignsJa, mhSteps, mhPostAcute, mhPostAcuteJa } from '../data/mh_protocol';
import { usePatient } from '../context/PatientContext';
import { useLanguage } from '../context/LanguageContext';
import { fmt } from '../utils/calc';

const accentColor = (a) => {
    switch (a) {
        case 'red':    return 'border-red-300 bg-red-50';
        case 'sky':    return 'border-sky-300 bg-sky-50';
        case 'amber':  return 'border-amber-300 bg-amber-50';
        case 'orange': return 'border-orange-300 bg-orange-50';
        case 'teal':   return 'border-teal-300 bg-teal-50';
        case 'rose':   return 'border-rose-300 bg-rose-50';
        default:       return 'border-slate-300 bg-slate-50';
    }
};

const stepIcon = (n) => {
    switch (n) {
        case 1: return <Phone size={18} className="text-red-600" />;
        case 2: return <ShieldAlert size={18} className="text-red-600" />;
        case 3: return <Snowflake size={18} className="text-sky-600" />;
        case 4: return <Activity size={18} className="text-amber-600" />;
        case 5: return <Droplet size={18} className="text-orange-600" />;
        case 6: return <Droplet size={18} className="text-teal-600" />;
        case 7: return <Ban size={18} className="text-rose-600" />;
        default: return null;
    }
};

const MHProtocolCard = () => {
    const { weight } = usePatient();
    const { lang, t } = useLanguage();
    const w = parseFloat(weight) || 0;

    const dantroleneFirst = w * 2.5;
    const dantroleneMaint = w * 1;
    const bicarbDose = { min: w * 1, max: w * 2 };
    const insulin = w * 0.1;
    const dextrose25 = w * 2;
    const cacl = { min: w * 10, max: w * 15 };

    const signs = lang === 'ja' ? mhSignsJa : mhSigns;
    const postAcute = lang === 'ja' ? mhPostAcuteJa : mhPostAcute;

    return (
        <div className="space-y-4">
            <div className="bg-rose-600 text-white p-4 rounded-lg shadow-lg flex items-center gap-3">
                <AlertTriangle size={32} className="text-yellow-300" />
                <div className="flex-1">
                    <h2 className="text-2xl font-black uppercase tracking-wider">{t('Malignant Hyperthermia', '悪性高熱症')}</h2>
                    <p className="text-rose-100 text-xs font-medium">{t('Pediatric Anesthesia Pearls — full protocol', '小児麻酔パール — 完全プロトコール')}</p>
                </div>
                <a
                    href={mhHotline.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-rose-700 px-3 py-2 rounded-lg font-bold flex flex-col items-end shadow"
                >
                    <span className="text-[10px] uppercase tracking-wide">{lang === 'ja' ? mhHotline.labelJa : mhHotline.label}</span>
                    <span className="text-base">{mhHotline.number}</span>
                </a>
            </div>

            {/* Signs */}
            <div className="bg-white border border-rose-100 rounded-lg p-4">
                <h3 className="font-bold text-rose-800 border-b border-rose-100 pb-2 mb-2">{t('Early Signs', '早期徴候')}</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm text-slate-700 list-disc pl-5">
                    {signs.map(s => <li key={s}>{s}</li>)}
                </ul>
            </div>

            {/* Patient-specific quick doses */}
            <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
                <h3 className="font-bold text-rose-800 border-b border-rose-200 pb-2 mb-2">
                    {t('Quick doses for this patient', 'この患者の用量')} ({fmt(w)} kg)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                    <div className="bg-white p-2 rounded border border-rose-200">
                        <div className="text-[10px] font-bold text-rose-600 uppercase">{t('Dantrolene first dose', 'Dantrolene 初回量')}</div>
                        <div className="text-lg font-bold text-rose-800">{fmt(dantroleneFirst)} mg</div>
                        <div className="text-[10px] text-slate-500 font-mono">2.5 mg/kg IV</div>
                    </div>
                    <div className="bg-white p-2 rounded border border-rose-200">
                        <div className="text-[10px] font-bold text-rose-600 uppercase">{t('Dantrolene maintenance', 'Dantrolene 維持量')}</div>
                        <div className="text-lg font-bold text-rose-800">{fmt(dantroleneMaint)} mg q6h</div>
                        <div className="text-[10px] text-slate-500 font-mono">{t('1 mg/kg once stable', '1 mg/kg 安定後')}</div>
                    </div>
                    <div className="bg-white p-2 rounded border border-rose-200">
                        <div className="text-[10px] font-bold text-rose-600 uppercase">NaHCO3</div>
                        <div className="text-lg font-bold text-rose-800">{fmt(bicarbDose.min)}-{fmt(bicarbDose.max)} mEq</div>
                        <div className="text-[10px] text-slate-500 font-mono">1-2 mEq/kg</div>
                    </div>
                    <div className="bg-white p-2 rounded border border-rose-200">
                        <div className="text-[10px] font-bold text-rose-600 uppercase">{t('Insulin', 'インスリン')}</div>
                        <div className="text-lg font-bold text-rose-800">{fmt(insulin)} U</div>
                        <div className="text-[10px] text-slate-500 font-mono">0.1 U/kg + D25 {fmt(dextrose25)} mL</div>
                    </div>
                    <div className="bg-white p-2 rounded border border-rose-200">
                        <div className="text-[10px] font-bold text-rose-600 uppercase">CaCl</div>
                        <div className="text-lg font-bold text-rose-800">{fmt(cacl.min)}-{fmt(cacl.max)} mg</div>
                        <div className="text-[10px] text-slate-500 font-mono">10-15 mg/kg</div>
                    </div>
                </div>
            </div>

            {/* Step-by-step protocol */}
            <div className="space-y-2">
                {mhSteps.map(s => (
                    <div key={s.n} className={`p-3 rounded-lg border-2 ${accentColor(s.accent)}`}>
                        <div className="flex items-start gap-3">
                            <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center font-black text-rose-700 border-2 border-rose-200 flex-shrink-0">
                                {s.n}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 font-bold text-slate-800">
                                    {stepIcon(s.n)}
                                    {lang === 'ja' && s.titleJa ? s.titleJa : s.title}
                                </div>
                                <div className="text-xs text-slate-600 mt-1">{lang === 'ja' && s.bodyJa ? s.bodyJa : s.body}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Post-acute */}
            <div className="bg-white border border-slate-200 rounded-lg p-4">
                <h3 className="font-bold text-slate-700 border-b border-slate-200 pb-2 mb-2">{t('After the acute phase', '急性期後')}</h3>
                <ul className="text-xs text-slate-600 list-disc pl-5 space-y-1">
                    {postAcute.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
            </div>
        </div>
    );
};

export default MHProtocolCard;
