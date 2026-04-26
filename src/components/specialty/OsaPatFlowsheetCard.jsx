import React, { useState, useMemo } from 'react';
import { ClipboardCheck } from 'lucide-react';
import { FlowchartShell, Section, Bullets } from './FlowchartShell';
import { useLanguage } from '../../context/LanguageContext';
import {
    screeningQuestions, screeningQuestionsJa,
    evaluateOlder,
    evaluateYounger,
    dispoLabels,
    obesityClasses, obesityClassesJa,
} from '../../data/specialty/flowcharts/osa_pat_flowsheet';

const OsaPatFlowsheetCard = ({ entry }) => {
    const { lang, t } = useLanguage();
    const [ageGroup, setAgeGroup] = useState('older'); // 'older' | 'younger'
    const [bmi, setBmi] = useState('');
    const [bmiPercentile, setBmiPercentile] = useState('under99');
    const [answers, setAnswers] = useState(Array(6).fill(false));

    const positiveCount = answers.filter(Boolean).length;
    const hasApnea = answers[5]; // Q6 is the apnea question

    const result = useMemo(() => {
        if (ageGroup === 'older') {
            const b = parseFloat(bmi) || 0;
            if (b <= 0) return null;
            return evaluateOlder(b, positiveCount, hasApnea);
        }
        return evaluateYounger(bmiPercentile, positiveCount, hasApnea);
    }, [ageGroup, bmi, bmiPercentile, positiveCount, hasApnea]);

    const dispo = result ? dispoLabels[result.dispo] : null;
    const questions = lang === 'ja' ? screeningQuestionsJa : screeningQuestions;
    const obesity = lang === 'ja' ? obesityClassesJa : obesityClasses;

    const toggle = (i) => {
        setAnswers(prev => prev.map((v, idx) => idx === i ? !v : v));
    };

    return (
        <FlowchartShell
            title={t(entry.title, entry.titleJa)}
            subtitle={t(entry.shortDescription, entry.shortDescriptionJa)}
            icon={ClipboardCheck}
            accent="slate"
            source={entry.source}
            lastReviewed={entry.lastReviewed}
        >
            <div>
                <label className="text-[10px] uppercase font-bold text-fg-muted tracking-wide mb-1 block">{t('Patient age', '患者年齢')}</label>
                <div className="flex bg-surface-2/60 rounded-xl p-1 border border-line">
                    {[
                        { id: 'older', label: t('12 years and older', '12 歳以上') },
                        { id: 'younger', label: t('Less than 12 years', '12 歳未満') },
                    ].map(opt => {
                        const active = ageGroup === opt.id;
                        return (
                            <button
                                key={opt.id}
                                onClick={() => setAgeGroup(opt.id)}
                                className={`flex-1 py-2 px-2 rounded-lg text-xs font-bold transition-all ${active ? 'bg-surface shadow-sm ring-2 ring-slate-500 text-fg' : 'text-fg-soft hover:bg-surface'}`}
                            >
                                {opt.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {ageGroup === 'older' ? (
                <div>
                    <label className="text-[10px] uppercase font-bold text-fg-muted tracking-wide mb-1 block">BMI (kg/m²)</label>
                    <input
                        type="number"
                        inputMode="decimal"
                        value={bmi}
                        onChange={e => setBmi(e.target.value)}
                        placeholder={t('e.g. 32', '例: 32')}
                        className="w-full bg-surface text-fg font-mono px-3 py-2 rounded-lg border border-line outline-none focus:border-slate-500"
                    />
                </div>
            ) : (
                <div>
                    <label className="text-[10px] uppercase font-bold text-fg-muted tracking-wide mb-1 block">{t('BMI percentile band', 'BMI パーセンタイル帯')}</label>
                    <select
                        value={bmiPercentile}
                        onChange={e => setBmiPercentile(e.target.value)}
                        className="w-full bg-surface text-fg font-bold px-3 py-2 rounded-lg border border-line focus:border-slate-500 outline-none text-sm"
                    >
                        <option value="under99">{t('Below 99th %ile', '99 パーセンタイル未満')}</option>
                        <option value="99to140">{t('99th %ile to <140% of 95th %ile', '99 パーセンタイル 〜 95 パーセンタイルの 140% 未満')}</option>
                        <option value="over140">{t('≥ 140% of 95th %ile', '95 パーセンタイルの 140% 以上')}</option>
                    </select>
                </div>
            )}

            <Section title={t('OSA screening questions', 'OSA スクリーニング質問')} emphasis="info">
                <div className="space-y-1.5">
                    {questions.map((q, i) => (
                        <label key={i} className="flex items-start gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={answers[i]}
                                onChange={() => toggle(i)}
                                className="mt-1 w-4 h-4 accent-slate-600"
                            />
                            <span className="text-[13px] text-fg-soft flex-1">{q}</span>
                        </label>
                    ))}
                </div>
                <div className="mt-2 pt-2 border-t border-current/10 text-[12px] font-bold">
                    {positiveCount} / 6 {t('positive', '陽性')} {hasApnea ? t('(includes apnea)', '(無呼吸を含む)') : ''}
                </div>
            </Section>

            {dispo && result && (
                <Section title={`${t('Disposition:', '判定:')} ${lang === 'ja' ? dispo.labelJa : dispo.label}`} emphasis={dispo.emphasis}>
                    <div className="text-sm">{lang === 'ja' ? result.reasonJa : result.reason}</div>
                </Section>
            )}

            <Section title={t('Obesity classification reference', '肥満分類参照')} emphasis="plain">
                <Bullets items={obesity} />
            </Section>
        </FlowchartShell>
    );
};

export default OsaPatFlowsheetCard;
