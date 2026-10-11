import React, { useId, useState } from 'react';
import { ArrowDown, BookOpen, ChevronDown, ExternalLink, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const PAPER = 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10304858/';
const LABEL = 'https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=eee1afb8-324c-42e4-8bf0-f0c9da5e6d42';

// Static teaching content only. It does not read patient values or call dosing resolvers.
export const RotemLearningSafety = () => {
    const { lang, t } = useLanguage();
    return (
    <aside lang={lang} aria-label={t('ROTEM learning precautions', 'ROTEMの学習上の注意')} className="mx-4 my-3 rounded-xl border border-amber-300 bg-amber-50 p-3 text-xs leading-relaxed text-amber-900 dark:border-amber-800">
        <div className="flex items-start gap-2">
            <ShieldAlert size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
            <div className="space-y-1.5">
                <p><strong>{t('For learning only.', '学習用。')}</strong> {t("These criteria reflect the app's implementation and are not automatic treatment orders. Review bleeding, surgical hemostasis, residual heparin, temperature, calcium, pH, blood products already given, and the current institutional protocol.", 'アプリの実装に基づく基準であり、自動的な投与指示ではありません。出血、外科的止血、残存ヘパリン、体温、Ca、pH、既投与製剤、現行施設プロトコルを確認してください。')}</p>
                <p>{t('These amounts are not intended to be added to the NCH2.0 recipe-based doses.', 'NCH2.0のレシピ方式とROTEMの補充量を合算する意味ではありません。')}</p>
                <p>{t('Pediatric safety and efficacy of PCC (Kcentra) have not been established. Use caution regarding thrombosis risk and repeat dosing. The label also states that safety and efficacy of repeat dosing have not been established and repeat dosing is not recommended.', 'PCC（Kcentra）の小児での安全性・有効性は未確立です。血栓リスクと反復投与に注意してください。添付文書では反復投与の安全性・有効性も未確立で、推奨されていません。')} <SourceLink href={LABEL}>DailyMed</SourceLink></p>
            </div>
        </div>
    </aside>
    );
};

function SourceLink({ href, children }) {
    const { t } = useLanguage();
    return <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline underline-offset-2 hover:opacity-80">{children}<ExternalLink size={11} aria-hidden="true" /><span className="sr-only">{t(' (opens in a new tab)', '（別タブで開く）')}</span></a>;
}

const tone = {
    factor: 'border-violet-200 bg-violet-50 text-violet-900 dark:border-violet-800',
    platelet: 'border-teal-200 bg-teal-50 text-teal-900 dark:border-teal-800',
    fibrin: 'border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-800',
};

function MeaningCard({ label, assay, children, color }) {
    return (
        <div className={`rounded-xl border p-3 text-center ${tone[color]}`}>
            <p className="text-xs font-semibold">{label}</p>
            <p className="mt-1 text-sm font-bold">{assay}</p>
            <ArrowDown size={15} className="mx-auto my-2" aria-hidden="true" />
            <p className="text-sm font-semibold">{children}</p>
        </div>
    );
}

function PhaseBanner({ timing, assay, children }) {
    return (
        <div className="rounded-xl bg-surface-2 p-3 text-center">
            <p className="text-xs font-semibold text-fg-muted">{timing}</p>
            <p className="mt-1 text-lg font-bold text-fg sm:text-xl">{assay}</p>
            <p className="mt-1 text-xs text-fg-soft">{children}</p>
        </div>
    );
}

function LearningFlow() {
    const { t } = useLanguage();
    return (
        <figure aria-label={t('ROTEM learning diagram during and after CPB', 'CPB中からCPB後までのROTEM学習図')} className="rounded-2xl border border-line bg-surface p-3 sm:p-4">
            <figcaption className="mb-3 text-sm font-bold text-fg">{t('See when to use each assay and what it tells you', '時期と検査の役割を、図でつかむ')}</figcaption>
            <PhaseBanner timing={t('During CPB / rewarming', 'CPB中・復温時')} assay={t('HEPTEM + FIBTEM', 'HEPTEM ＋ FIBTEM')}>{t('Anticipate and order products for use after separation from CPB', '離脱後に使う製剤を予測・手配する（Order）')}</PhaseBanner>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
                <MeaningCard label={t('Clot initiation / formation', '開始・形成')} assay="HEPTEM CT / CFT" color="factor">{t('Consider ordering PCC', 'PCCの手配を検討')}</MeaningCard>
                <MeaningCard label={t('Overall clot strength', '全体の強さ')} assay="HEPTEM MCF" color="platelet">{t('Consider ordering platelets', '血小板の手配を検討')}</MeaningCard>
                <MeaningCard label={t('Fibrin contribution', 'フィブリン側')} assay="FIBTEM MCF" color="fibrin">{t('Consider ordering cryoprecipitate', 'クリオの手配を検討')}</MeaningCard>
            </div>
            <ArrowDown size={18} className="mx-auto my-2 text-fg-muted" aria-hidden="true" />
            <div className="rounded-xl border border-line bg-surface-2 p-3 text-center text-sm font-bold text-fg">{t('Separation from CPB → protamine → initial replacement / ANH return', 'CPB離脱 → プロタミン → 初回補充・ANH返血')}</div>
            <p className="mt-1.5 text-center text-xs leading-relaxed text-fg-muted">{t('ANH: return of autologous blood collected before surgery. Confirm the sequence of initial replacement and blood return in the current institutional protocol.', 'ANH：術前に採取した自己血の返血。初回補充と返血の順序は現行施設プロトコルで確認。')}</p>
            <ArrowDown size={18} className="mx-auto my-2 text-fg-muted" aria-hidden="true" />
            <PhaseBanner timing={t('After CPB / initial replacement', 'CPB後・初回補充後')} assay={t('EXTEM + FIBTEM', 'EXTEM ＋ FIBTEM')}>{t('Reassess if bleeding continues', '出血が続く場合に再評価する（Reassess）')}</PhaseBanner>
            <div className="mt-2 grid items-start gap-2 sm:grid-cols-2">
                <div className={`rounded-xl border p-3 ${tone.factor}`}>
                    <p className="text-xs font-semibold">{t('Assess clot initiation', '開始の評価')}</p>
                    <p className="mt-1 font-bold">{t('EXTEM CT > 111 s', 'EXTEM CT > 111秒')}</p>
                    <p className="mt-2 text-sm leading-relaxed">{t('Evaluate the cause before considering whether FFP / PCC is indicated.', '原因を確認したうえで、FFP / PCCの適応を検討。')}</p>
                </div>
                <div className="rounded-xl border border-line p-3">
                    <p className="text-xs font-semibold text-fg-muted">{t('Assess clot amplitude', '振幅の評価')}</p>
                    <p className="mt-1 font-bold text-fg">EXTEM A10 &lt; 38 mm</p>
                    <p className="mt-1 text-xs text-fg-soft">{t('Use FIBTEM A10 to assess the fibrin contribution and select the branch', 'FIBTEM A10でフィブリン側を見て分岐')}</p>
                    <div className="mt-3 grid gap-2 lg:grid-cols-2">
                        <div className={`rounded-lg border p-2.5 text-sm ${tone.fibrin}`}>
                            <p className="font-bold">FIBTEM A10 &lt; 9 mm</p>
                            <p className="mt-1">{t('Low fibrin contribution', 'フィブリン側が弱い')}</p>
                            <p className="mt-1 font-semibold">{t('→ Cryoprecipitate branch', '→ クリオ側へ')}</p>
                        </div>
                        <div className={`rounded-lg border p-2.5 text-sm ${tone.platelet}`}>
                            <p className="font-bold">FIBTEM A10 ≥ 9 mm</p>
                            <p className="mt-1">{t('Fibrin contribution preserved', 'フィブリン側は保たれる')}</p>
                            <p className="mt-1 font-semibold">{t('→ Platelet branch', '→ 血小板側へ')}</p>
                        </div>
                    </div>
                </div>
            </div>
            <p className="mt-3 rounded-lg bg-surface-2 p-2.5 text-xs leading-relaxed text-fg-soft"><strong>{t('Assess CT and amplitude in parallel.', 'CT判定と振幅判定は並列です。')}</strong> {t('This does not imply a fixed administration sequence. EXTEM A10 ≥ 38 mm has no amplitude-based branch for further replacement; assess CT and bleeding separately.', '固定の投与順を意味しません。EXTEM A10 ≥ 38 mmでは振幅による追加補充分岐はありませんが、CTや出血の評価は別に行います。')}</p>
        </figure>
    );
}

const cpbRows = t => [
    [t('HEPTEM CT > 240 s OR CFT > 110 s', 'HEPTEM CT > 240秒 OR CFT > 110秒'), 'PCC 20 U/kg', 'factor'],
    ['HEPTEM MCF 40–50 mm', t('Platelets 20 mL/kg', '血小板 20 mL/kg'), 'platelet'],
    ['HEPTEM MCF 30–40 mm', t('Platelets 30 mL/kg', '血小板 30 mL/kg'), 'platelet'],
    ['HEPTEM MCF < 30 mm', t('Platelets 40 mL/kg', '血小板 40 mL/kg'), 'platelet'],
    ['FIBTEM MCF 8–9 mm', t('Cryoprecipitate 1 unit', 'クリオ 1 unit'), 'fibrin'],
    ['FIBTEM MCF 7–8 mm', t('Cryoprecipitate 2 units', 'クリオ 2 units'), 'fibrin'],
    ['FIBTEM MCF < 7 mm', t('Cryoprecipitate 3 units', 'クリオ 3 units'), 'fibrin'],
];

const postRows = t => [
    [t('EXTEM CT > 111 s', 'EXTEM CT > 111秒'), t('FFP 20 mL/kg or PCC 20 U/kg', 'FFP 20 mL/kg または PCC 20 U/kg'), 'factor'],
    ['EXTEM A10 ≥ 38 mm', t('No amplitude-based branch for further replacement (assess CT separately)', '振幅による追加補充分岐なし（CT判定は別）'), null],
    [t('EXTEM A10 < 38 mm + FIBTEM A10 ≥ 9 mm', 'EXTEM A10 < 38 mm ＋ FIBTEM A10 ≥ 9 mm'), t('Platelet branch', '血小板側へ'), 'platelet'],
    [t('EXTEM A10 < 38 mm + FIBTEM A10 < 9 mm', 'EXTEM A10 < 38 mm ＋ FIBTEM A10 < 9 mm'), t('Cryoprecipitate branch', 'クリオ側へ'), 'fibrin'],
];

function ReferenceRows({ rows }) {
    const { t } = useLanguage();
    return (
        <table className="w-full table-fixed text-left text-xs leading-relaxed sm:text-sm">
            <thead className="text-fg-muted"><tr><th scope="col" className="w-[56%] py-2 pr-3 font-medium">{t('Assay / ranges displayed in the app', '検査・アプリの表示区間')}</th><th scope="col" className="py-2 font-medium">{t('Replacement amounts displayed in the app', 'アプリの補充量表示')}</th></tr></thead>
            <tbody className="divide-y divide-line">
                {rows.map(([condition, product, color]) => (
                    <tr key={condition}>
                        <th scope="row" className="break-words py-2.5 pr-3 font-medium text-fg-soft">{condition}</th>
                        <td className="py-2.5"><span className={`inline-block rounded-lg px-2 py-1 font-semibold ${color ? tone[color] : 'bg-surface-2 text-fg-soft'}`}>{product}</span></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

function QuickReference() {
    const { t } = useLanguage();
    const [phase, setPhase] = useState('cpb');
    const id = useId();
    const tabs = [{ id: 'cpb', label: t('During CPB', 'CPB中') }, { id: 'postcpb', label: t('After CPB', 'CPB後') }];
    const selectWithKeyboard = (event) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === 'Home' ? 'cpb' : event.key === 'End' ? 'postcpb' : phase === 'cpb' ? 'postcpb' : 'cpb';
        setPhase(next);
        document.getElementById(`${id}-${next}-tab`)?.focus();
    };
    return (
        <section aria-label={t('ROTEM quick reference based on the app implementation', 'アプリの実装に基づくROTEM早見表')} className="rounded-2xl border border-line bg-surface p-3 sm:p-4">
            <h5 className="mb-3 text-sm font-bold text-fg">{t('Switch the phase to view the quick reference', '時期を切り替えて、早見表を確認')}</h5>
            <div role="tablist" aria-label={t('Quick reference phase', '早見表の時期')} className="mb-4 flex rounded-xl border border-line bg-surface-2 p-1">
                {tabs.map(tab => <button key={tab.id} id={`${id}-${tab.id}-tab`} type="button" role="tab" aria-selected={phase === tab.id} aria-controls={`${id}-${tab.id}-panel`} tabIndex={phase === tab.id ? 0 : -1} onClick={() => setPhase(tab.id)} onKeyDown={selectWithKeyboard} className={`min-h-11 flex-1 rounded-lg px-3 py-2 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 ${phase === tab.id ? 'bg-surface text-fg shadow-sm ring-1 ring-line' : 'text-fg-muted hover:text-fg'}`}>{tab.label}</button>)}
            </div>
            {tabs.map(tab => (
                <div key={tab.id} role="tabpanel" id={`${id}-${tab.id}-panel`} aria-labelledby={`${id}-${tab.id}-tab`} hidden={phase !== tab.id} tabIndex={0}>
                    <h6 className="text-lg font-bold text-fg">{tab.id === 'cpb' ? t('HEPTEM + FIBTEM', 'HEPTEM ＋ FIBTEM') : t('EXTEM + FIBTEM', 'EXTEM ＋ FIBTEM')}</h6>
                    <p className="mb-3 mt-1 text-xs leading-relaxed text-fg-muted">{tab.id === 'cpb' ? t('Measure during rewarming to anticipate and order products for use after separation from CPB. This is not a treatment order.', '復温時に測定し、離脱後に使う製剤を予測・手配。ここは投与指示ではありません。') : t('After protamine, initial replacement, and ANH return. Reassess further replacement if bleeding continues.', 'プロタミン・初回補充・ANH返血後。出血持続時の追加補充を再評価。')}</p>
                    <ReferenceRows rows={tab.id === 'cpb' ? cpbRows(t) : postRows(t)} />
                    {tab.id === 'postcpb' && <div className="mt-3 space-y-3">
                        <div className={`rounded-xl border p-3 ${tone.platelet}`}><p className="text-sm font-bold">{t('Platelet branch display (EXTEM A10 < 38 + FIBTEM A10 ≥ 9)', '血小板側の表示（EXTEM A10 < 38 ＋ FIBTEM A10 ≥ 9）')}</p><p className="mt-1 text-xs leading-relaxed sm:text-sm">{t('EXTEM A10: 30–40 mm → 20 mL/kg, 20–30 mm → 30 mL/kg, < 20 mm → 40 mL/kg', 'EXTEM A10：30–40 mm → 20 mL/kg、20–30 mm → 30 mL/kg、< 20 mm → 40 mL/kg')}</p></div>
                        <div className={`rounded-xl border p-3 ${tone.fibrin}`}><p className="text-sm font-bold">{t('Cryoprecipitate branch display (EXTEM A10 < 38 + FIBTEM A10 < 9)', 'クリオ側の表示（EXTEM A10 < 38 ＋ FIBTEM A10 < 9）')}</p><p className="mt-1 text-xs leading-relaxed sm:text-sm">{t('FIBTEM A10: 8–9 mm → 1 unit, 7–8 mm → 2 units, < 7 mm → 3 units', 'FIBTEM A10：8–9 mm → 1 unit、7–8 mm → 2 units、< 7 mm → 3 units')}</p></div>
                        <p className="text-xs leading-relaxed text-fg-soft">{t('CT-based FFP / PCC assessment and amplitude-based platelet / cryoprecipitate assessment are parallel. The app displays FFP 20 mL/kg, which differs from 5–10 mL/kg in the paper.', 'CTによるFFP / PCCと、振幅による血小板 / クリオは並列評価です。アプリのFFP 20 mL/kgは原著の5–10 mL/kgと異なります。')}</p>
                    </div>}
                    {tab.id === 'cpb' && <p className="mt-3 text-xs leading-relaxed text-fg-soft">{t('The PCC condition uses ', 'PCC条件はアプリでは')}<strong>OR</strong>{t(' in the app and ', '、2023年原著では')}<strong>AND</strong>{t(' in the 2023 paper. The paper describes ordering during rewarming and using products after separation from CPB.', 'です。原著では復温時に手配し、離脱後に使用します。')}</p>}
                </div>
            ))}
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-900 dark:border-amber-800">
                <p><strong>{t('Do not confuse MCF with A10.', 'MCFとA10を混同しない。')}</strong> {t('MCF is maximum clot firmness; A10 is the amplitude 10 minutes after clotting starts. The during-CPB table uses MCF; the post-CPB amplitude branches use A10.', 'MCFは最大の強さ、A10は凝固開始から10分時点の振幅です。CPB中の表はMCF、CPB後の振幅分岐はA10を使います。')}</p>
                <p className="mt-2">{t('The ranges reproduce the existing app display and overlap at boundaries such as 40, 30, and 8 mm. The display alone also leaves 50 and 9 mm ambiguous. After CPB, the prerequisite EXTEM A10 < 38 mm takes precedence over the displayed 30–40 mm range.', '区間は既存アプリの表示をそのまま記載しており、40・30・8 mmなどの境界に重複があります。50・9 mmの扱いも表示だけでは決まりません。CPB後の30–40 mmは、前提のEXTEM A10 < 38 mmが優先します。')}</p>
                <details className="mt-2">
                    <summary className="min-h-11 cursor-pointer py-2 font-semibold">{t('Check the current calculation behavior at boundaries', '境界値での現在の計算実装を確認')}</summary>
                    <p className="mt-1">{t('During CPB: HEPTEM MCF = 50 has no platelet branch; 40 gives 20 mL/kg and 30 gives 30 mL/kg. FIBTEM MCF = 9 has no cryoprecipitate branch; 8 gives 1 unit and 7 gives 2 units.', 'CPB中：HEPTEM MCF＝50は血小板分岐なし、40は20 mL/kg、30は30 mL/kg。FIBTEM MCF＝9はクリオ分岐なし、8は1 unit、7は2 units。')}</p>
                    <p className="mt-2">{t('After CPB: EXTEM A10 = 38 has no amplitude-based branch. Below 38, FIBTEM A10 = 9 selects the platelet branch. EXTEM A10 = 30 gives 20 mL/kg; 20 gives 30 mL/kg. In the cryoprecipitate branch, FIBTEM A10 = 8 gives 1 unit and 7 gives 2 units.', 'CPB後：EXTEM A10＝38は振幅分岐なし。38未満でFIBTEM A10＝9は血小板側。EXTEM A10＝30は20 mL/kg、20は30 mL/kg。クリオ側ではFIBTEM A10＝8は1 unit、7は2 units。')}</p>
                    <p className="mt-2">{t('This describes the behavior of the code, not a clinically correct boundary or an official institutional instruction.', 'これはコードの挙動の説明です。境界値の臨床的な正解や施設の正式指示を示すものではありません。')}</p>
                </details>
            </div>
        </section>
    );
}

function SourceDifferences() {
    const { t } = useLanguage();
    const differences = [
        [t('PCC condition during CPB', 'CPB中のPCC条件'), t('HEPTEM CT > 240 s AND CFT > 110 s. “Order” Kcentra 20 U/kg.', 'HEPTEM CT > 240秒 AND CFT > 110秒。Kcentra 20 U/kgを「Order」。'), t('CT > 240 s OR CFT > 110 s. PCC 20 U/kg.', 'CT > 240秒 OR CFT > 110秒。PCC 20 U/kg。')],
        [t('FFP amount after CPB', 'CPB後のFFP量'), '5–10 mL/kg', t('20 mL/kg (or PCC 20 U/kg)', '20 mL/kg（またはPCC 20 U/kg）')],
        [t('FIBTEM A10 = 9 mm after CPB', 'CPB後のFIBTEM A10＝9 mm'), t('Branches at > 9 and < 9. Exactly 9 is not addressed.', '> 9と< 9で分岐。ちょうど9の扱いは不明。'), t('≥ 9 selects the platelet branch (requires EXTEM A10 < 38).', '≥ 9で血小板側（EXTEM A10 < 38が前提）。')],
        [t('FIBTEM MCF during CPB', 'CPB中のFIBTEM MCF'), t('The figure has an unusual label that can be read as “1 unit of cryoprecipitate even at > 8 mm.”', '図では「> 8 mmでもクリオ1 unit」と読める不自然な表記。'), t('Display: 8–9 mm → cryoprecipitate 1 unit. Calculation: ≥ 8 and < 9.', '表示は8–9 mm → クリオ1 unit。計算では8以上9未満。')],
    ];
    return (
        <details className="group rounded-2xl border border-line bg-surface">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 p-4 text-sm font-bold text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-500">{t('Compare the 2023 paper with the app', '2023年原著とアプリの違いを確認')}<ChevronDown size={17} className="shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" /></summary>
            <div className="space-y-3 border-t border-line p-3 text-xs leading-relaxed sm:p-4 sm:text-sm">
                <p className="text-fg-soft">{t('The original ', '原著の ')}<SourceLink href={`${PAPER}figure/F2/`}>Figure 2</SourceLink>{t(' and ', ' と ')}<SourceLink href={`${PAPER}figure/F3/`}>Figure 3</SourceLink>{t(' differ from the app as shown below. Neither should be assumed to represent current official NCH instructions.', ' には、アプリと次の違いがあります。どちらも現行NCHの正式指示とは断定できません。')}</p>
                <div className="space-y-2">
                    {differences.map(([topic, original, app]) => <div key={topic} className="rounded-xl border border-line p-3"><p className="mb-2 font-bold text-fg">{topic}</p><dl className="grid gap-2 sm:grid-cols-2"><div className="rounded-lg bg-surface-2 p-2.5"><dt className="mb-1 text-xs font-bold text-fg-muted">{t('2023 paper', '2023年原著')}</dt><dd className="text-fg-soft">{original}</dd></div><div className="rounded-lg bg-teal-50 p-2.5"><dt className="mb-1 text-xs font-bold text-teal-800">Ped Pearls</dt><dd className="text-fg-soft">{app}</dd></div></dl></div>)}
                </div>
                <p className="text-fg-soft">{t('The differences in AND versus OR, FFP amounts, and boundaries have clinical implications. Do not independently correct the unusual label in the paper or use this table to determine treatment; check the current institutional protocol.', 'ANDとOR、FFP量、境界値の違いには臨床的な意味があります。原著の不自然な表記を独自に訂正したり、この表から投与を確定したりせず、現行施設プロトコルで確認してください。')}</p>
                <p className="text-fg-soft">{t('The paper describes ordering products and PCC based on ROTEM during rewarming for use after separation from CPB. It describes returning ANH blood after heparin reversal, then administering products based on the during-CPB ROTEM results. “Initial replacement / ANH return” in this diagram groups that period for learning.', '原著本文では、復温時のROTEMで製剤とPCCを手配し、離脱後に使用します。ヘパリン拮抗後にANHを返血し、その後CPB中のROTEMに基づく製剤を投与した記載があります。本図の「初回補充・ANH返血」は、この時期をまとめた学習表示です。')}</p>
                <p className="text-fg-muted">{t('Source: ', '出典：')}<SourceLink href={PAPER}>{t('2023 paper (full text)', '2023年論文（全文）')}</SourceLink>{t(' / PCC precautions: ', ' ／ PCCの注意：')}<SourceLink href={LABEL}>{t('Kcentra prescribing information', 'Kcentra添付文書')}</SourceLink></p>
            </div>
        </details>
    );
}

export default function RotemLearningPanel() {
    const { lang, t } = useLanguage();
    return (
        <section lang={lang} aria-label={t('ROTEM learning guide', 'ROTEM学習ガイド')} className="space-y-4">
            <div className="flex items-center gap-2 text-fg"><BookOpen size={18} className="text-teal-600" aria-hidden="true" /><h4 className="text-base font-bold">{t('Read ROTEM by phase', 'ROTEMを時期で読み分ける')}</h4><span className="ml-auto rounded-full bg-surface-2 px-2 py-1 text-[11px] text-fg-muted">{t('Learning guide', '学習ガイド')}</span></div>
            <div className="rounded-2xl border border-teal-200 bg-teal-50 p-4 text-center text-teal-900 dark:border-teal-800">
                <p className="text-xs font-semibold">{t('Memory aid', '覚え方')}</p>
                <p className="mt-1 text-lg font-bold sm:text-xl">{t('HEP on bypass, EX after, FIB throughout', '中はHEP、後はEX、FIBはずっと')}</p>
                <p className="mt-2 text-xs leading-relaxed">{t('Use HEPTEM during cardiopulmonary bypass (CPB), EXTEM after CPB, and FIBTEM in both phases.', 'CPB（人工心肺）中はHEPTEM、CPB後はEXTEM。FIBTEMは両方で見る。')}</p>
            </div>
            <LearningFlow />
            <QuickReference />
            <SourceDifferences />
        </section>
    );
}
