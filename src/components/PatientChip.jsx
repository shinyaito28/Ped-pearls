import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Settings2, Lock, Clock } from 'lucide-react';
import { usePatient } from '../context/PatientContext';
import { useLanguage } from '../context/LanguageContext';
import { formatPatientSummaryNumber } from '../utils/patientSummary';

// Compact 1-row summary that replaces the full patient input bar after
// auto-collapse. Click anywhere on the chip to expand back to the form.
//
// Right-side cog opens a small popover for the auto-collapse preference.
const PatientChip = ({ onExpand, pref, setPref }) => {
    const { age, ageUnit, gender, weight, height, isPreemie } = usePatient();
    const { t } = useLanguage();
    const [showSettings, setShowSettings] = useState(false);
    const settingsRef = useRef(null);
    const settingsButtonRef = useRef(null);

    useEffect(() => {
        const onClick = (e) => {
            if (settingsRef.current && !settingsRef.current.contains(e.target)) {
                setShowSettings(false);
            }
        };
        if (showSettings) {
            const onKeyDown = e => {
                if (e.key === 'Escape') {
                    setShowSettings(false);
                    settingsButtonRef.current?.focus();
                }
            };
            window.addEventListener('mousedown', onClick);
            window.addEventListener('keydown', onKeyDown);
            return () => {
                window.removeEventListener('mousedown', onClick);
                window.removeEventListener('keydown', onKeyDown);
            };
        }
    }, [showSettings]);

    const ageUnitShort = ageUnit === 'days' ? t('d', '日') : ageUnit === 'months' ? t('mo', 'か月') : t('y', '歳');
    const ageLabel = `${formatPatientSummaryNumber(age)}${ageUnitShort}`;
    const weightLabel = formatPatientSummaryNumber(weight), heightLabel = formatPatientSummaryNumber(height);
    const full = v => v == null || String(v).trim() === '' ? '—' : String(v);
    const label = `${t('Expand patient inputs', '患者入力欄を展開')}: ${full(age)}${ageUnitShort}, ${full(weight)} kg, ${full(height)} cm, ${gender === 'female' ? t('female', '女') : t('male', '男')}${isPreemie ? t(', premature', '、早産児') : ''}`;
    const approximate = [ageLabel, weightLabel, heightLabel].some(v => v.includes('≈'));
    const sexGlyph = gender === 'female' ? '♀' : '♂';
    const sexAccent = gender === 'female' ? 'text-rose-500' : 'text-sky-500';

    return (
        <div data-patient-summary className="flex min-w-0 items-center gap-1 border-t border-line">
            <button
                onClick={onExpand}
                className="flex h-11 min-w-0 flex-1 items-center gap-1 rounded-md px-1.5 text-left text-[11px] min-[360px]:text-xs leading-none tap-target hover:bg-surface-2/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-500 transition-colors"
                aria-label={label}
                aria-expanded="false"
                aria-controls="patient-inputs"
                title={`${label}${approximate ? t(' · ≈ marks shortened display values; expand to read exact inputs.', ' · ≈は表示だけの概数です。展開すると元の入力値を確認できます。') : ''}`}
            >
                <div aria-hidden="true" className="flex min-w-0 flex-1 items-baseline gap-0.5 whitespace-nowrap tabular-nums sm:gap-2">
                    <span className="font-bold text-fg">{ageLabel}</span>
                    <span className={`hidden min-[360px]:inline font-bold ${sexAccent}`}>{sexGlyph}</span>
                    <span className="text-fg-muted">·</span>
                    <span className="font-bold text-fg">{weightLabel}<span className="font-normal text-[10px] text-fg-muted"> kg</span></span>
                    <span className="text-fg-muted">·</span>
                    <span className="font-bold text-fg">{heightLabel}<span className="font-normal text-[10px] text-fg-muted"> cm</span></span>
                    {isPreemie && (
                        <span title={t('Preemie', '早産児')} className="text-[10px] font-bold text-amber-700 dark:text-amber-300">
                            {t('P', '早')}
                        </span>
                    )}
                </div>
                <ChevronDown aria-hidden="true" size={14} className="shrink-0 text-fg-muted" />
            </button>

            {/* Settings popover */}
            <div className="relative" ref={settingsRef}>
                <button
                    onClick={(e) => { e.stopPropagation(); setShowSettings(s => !s); }}
                    ref={settingsButtonRef}
                    aria-label={t('Bar preferences', '患者欄の表示設定')}
                    aria-expanded={showSettings}
                    aria-haspopup="dialog"
                    className="flex h-11 w-11 shrink-0 items-center justify-center text-fg-muted hover:text-fg rounded-md tap-target focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-500"
                >
                    <Settings2 size={14} />
                </button>
                {showSettings && (
                    <div role="dialog" aria-label={t('Bar preferences', '患者欄の表示設定')} className="absolute right-0 top-full mt-1 w-56 bg-surface border border-line rounded-lg shadow-lg z-50 p-1 text-sm">
                        <button
                            onClick={() => { setPref('auto'); setShowSettings(false); }}
                            className={`w-full text-left px-2 py-1.5 rounded flex items-center gap-2 ${pref === 'auto' ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold' : 'hover:bg-surface-2'}`}
                        >
                            <Clock size={14} />
                            <div className="flex-1">
                                <div>{t('Auto-collapse', '自動折りたたみ')}</div>
                                <div className="text-[10px] text-fg-muted font-normal">{t('Hide after 5 s of inactivity', '5 秒非操作で非表示')}</div>
                            </div>
                        </button>
                        <button
                            onClick={() => { setPref('always-open'); setShowSettings(false); }}
                            className={`w-full text-left px-2 py-1.5 rounded flex items-center gap-2 ${pref === 'always-open' ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold' : 'hover:bg-surface-2'}`}
                        >
                            <Lock size={14} />
                            <div className="flex-1">
                                <div>{t('Always show', '常時表示')}</div>
                                <div className="text-[10px] text-fg-muted font-normal">{t('Keep the full input bar visible', '入力バーを常に表示')}</div>
                            </div>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientChip;
