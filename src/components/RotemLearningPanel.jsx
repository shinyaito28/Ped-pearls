import React, { useId, useState } from 'react';
import { ArrowDown, BookOpen, ChevronDown, ExternalLink, ShieldAlert } from 'lucide-react';

const PAPER = 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10304858/';
const LABEL = 'https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=eee1afb8-324c-42e4-8bf0-f0c9da5e6d42';

// Static teaching content only. It does not read patient values or call dosing resolvers.
export const RotemLearningSafety = () => (
    <aside lang="ja" aria-label="ROTEMの学習上の注意" className="mx-4 my-3 rounded-xl border border-amber-300 bg-amber-50 p-3 text-xs leading-relaxed text-amber-900 dark:border-amber-800">
        <div className="flex items-start gap-2">
            <ShieldAlert size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
            <div className="space-y-1.5">
                <p><strong>学習用。</strong> アプリの実装に基づく基準であり、自動的な投与指示ではありません。出血、外科的止血、残存ヘパリン、体温、Ca、pH、既投与製剤、現行施設プロトコルを確認してください。</p>
                <p>NCH2.0のレシピ方式とROTEMの補充量を合算する意味ではありません。</p>
                <p>PCC（Kcentra）の小児での安全性・有効性は未確立です。血栓リスクと反復投与に注意してください。添付文書では反復投与の安全性・有効性も未確立で、推奨されていません。 <SourceLink href={LABEL}>DailyMed</SourceLink></p>
            </div>
        </div>
    </aside>
);

function SourceLink({ href, children }) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline underline-offset-2 hover:opacity-80">{children}<ExternalLink size={11} aria-hidden="true" /><span className="sr-only">（別タブで開く）</span></a>;
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
    return (
        <figure aria-label="CPB中からCPB後までのROTEM学習図" className="rounded-2xl border border-line bg-surface p-3 sm:p-4">
            <figcaption className="mb-3 text-sm font-bold text-fg">時期と検査の役割を、図でつかむ</figcaption>
            <PhaseBanner timing="CPB中・復温時" assay="HEPTEM ＋ FIBTEM">離脱後に使う製剤を予測・手配する（Order）</PhaseBanner>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
                <MeaningCard label="開始・形成" assay="HEPTEM CT / CFT" color="factor">PCCの手配を検討</MeaningCard>
                <MeaningCard label="全体の強さ" assay="HEPTEM MCF" color="platelet">血小板の手配を検討</MeaningCard>
                <MeaningCard label="フィブリン側" assay="FIBTEM MCF" color="fibrin">クリオの手配を検討</MeaningCard>
            </div>
            <ArrowDown size={18} className="mx-auto my-2 text-fg-muted" aria-hidden="true" />
            <div className="rounded-xl border border-line bg-surface-2 p-3 text-center text-sm font-bold text-fg">CPB離脱 → プロタミン → 初回補充・ANH返血</div>
            <p className="mt-1.5 text-center text-xs leading-relaxed text-fg-muted">ANH：術前に採取した自己血の返血。初回補充と返血の順序は現行施設プロトコルで確認。</p>
            <ArrowDown size={18} className="mx-auto my-2 text-fg-muted" aria-hidden="true" />
            <PhaseBanner timing="CPB後・初回補充後" assay="EXTEM ＋ FIBTEM">出血が続く場合に再評価する（Reassess）</PhaseBanner>
            <div className="mt-2 grid items-start gap-2 sm:grid-cols-2">
                <div className={`rounded-xl border p-3 ${tone.factor}`}>
                    <p className="text-xs font-semibold">開始の評価</p>
                    <p className="mt-1 font-bold">EXTEM CT &gt; 111秒</p>
                    <p className="mt-2 text-sm leading-relaxed">原因を確認したうえで、FFP / PCCの適応を検討。</p>
                </div>
                <div className="rounded-xl border border-line p-3">
                    <p className="text-xs font-semibold text-fg-muted">振幅の評価</p>
                    <p className="mt-1 font-bold text-fg">EXTEM A10 &lt; 38 mm</p>
                    <p className="mt-1 text-xs text-fg-soft">FIBTEM A10でフィブリン側を見て分岐</p>
                    <div className="mt-3 grid gap-2 lg:grid-cols-2">
                        <div className={`rounded-lg border p-2.5 text-sm ${tone.fibrin}`}>
                            <p className="font-bold">FIBTEM A10 &lt; 9 mm</p>
                            <p className="mt-1">フィブリン側が弱い</p>
                            <p className="mt-1 font-semibold">→ クリオ側へ</p>
                        </div>
                        <div className={`rounded-lg border p-2.5 text-sm ${tone.platelet}`}>
                            <p className="font-bold">FIBTEM A10 ≥ 9 mm</p>
                            <p className="mt-1">フィブリン側は保たれる</p>
                            <p className="mt-1 font-semibold">→ 血小板側へ</p>
                        </div>
                    </div>
                </div>
            </div>
            <p className="mt-3 rounded-lg bg-surface-2 p-2.5 text-xs leading-relaxed text-fg-soft"><strong>CT判定と振幅判定は並列です。</strong> 固定の投与順を意味しません。EXTEM A10 ≥ 38 mmでは振幅による追加補充分岐はありませんが、CTや出血の評価は別に行います。</p>
        </figure>
    );
}

const cpbRows = [
    ['HEPTEM CT > 240秒 OR CFT > 110秒', 'PCC 20 U/kg', 'factor'],
    ['HEPTEM MCF 40–50 mm', '血小板 20 mL/kg', 'platelet'],
    ['HEPTEM MCF 30–40 mm', '血小板 30 mL/kg', 'platelet'],
    ['HEPTEM MCF < 30 mm', '血小板 40 mL/kg', 'platelet'],
    ['FIBTEM MCF 8–9 mm', 'クリオ 1 unit', 'fibrin'],
    ['FIBTEM MCF 7–8 mm', 'クリオ 2 units', 'fibrin'],
    ['FIBTEM MCF < 7 mm', 'クリオ 3 units', 'fibrin'],
];

const postRows = [
    ['EXTEM CT > 111秒', 'FFP 20 mL/kg または PCC 20 U/kg', 'factor'],
    ['EXTEM A10 ≥ 38 mm', '振幅による追加補充分岐なし（CT判定は別）', null],
    ['EXTEM A10 < 38 mm ＋ FIBTEM A10 ≥ 9 mm', '血小板側へ', 'platelet'],
    ['EXTEM A10 < 38 mm ＋ FIBTEM A10 < 9 mm', 'クリオ側へ', 'fibrin'],
];

function ReferenceRows({ rows }) {
    return (
        <table className="w-full table-fixed text-left text-xs leading-relaxed sm:text-sm">
            <thead className="text-fg-muted"><tr><th scope="col" className="w-[56%] py-2 pr-3 font-medium">検査・アプリの表示区間</th><th scope="col" className="py-2 font-medium">アプリの補充量表示</th></tr></thead>
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
    const [phase, setPhase] = useState('cpb');
    const id = useId();
    const tabs = [{ id: 'cpb', label: 'CPB中' }, { id: 'postcpb', label: 'CPB後' }];
    const selectWithKeyboard = (event) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === 'Home' ? 'cpb' : event.key === 'End' ? 'postcpb' : phase === 'cpb' ? 'postcpb' : 'cpb';
        setPhase(next);
        document.getElementById(`${id}-${next}-tab`)?.focus();
    };
    return (
        <section aria-label="アプリの実装に基づくROTEM早見表" className="rounded-2xl border border-line bg-surface p-3 sm:p-4">
            <h5 className="mb-3 text-sm font-bold text-fg">時期を切り替えて、早見表を確認</h5>
            <div role="tablist" aria-label="早見表の時期" className="mb-4 flex rounded-xl border border-line bg-surface-2 p-1">
                {tabs.map(tab => <button key={tab.id} id={`${id}-${tab.id}-tab`} type="button" role="tab" aria-selected={phase === tab.id} aria-controls={`${id}-${tab.id}-panel`} tabIndex={phase === tab.id ? 0 : -1} onClick={() => setPhase(tab.id)} onKeyDown={selectWithKeyboard} className={`min-h-11 flex-1 rounded-lg px-3 py-2 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 ${phase === tab.id ? 'bg-surface text-fg shadow-sm ring-1 ring-line' : 'text-fg-muted hover:text-fg'}`}>{tab.label}</button>)}
            </div>
            {tabs.map(tab => (
                <div key={tab.id} role="tabpanel" id={`${id}-${tab.id}-panel`} aria-labelledby={`${id}-${tab.id}-tab`} hidden={phase !== tab.id} tabIndex={0}>
                    <h6 className="text-lg font-bold text-fg">{tab.id === 'cpb' ? 'HEPTEM ＋ FIBTEM' : 'EXTEM ＋ FIBTEM'}</h6>
                    <p className="mb-3 mt-1 text-xs leading-relaxed text-fg-muted">{tab.id === 'cpb' ? '復温時に測定し、離脱後に使う製剤を予測・手配。ここは投与指示ではありません。' : 'プロタミン・初回補充・ANH返血後。出血持続時の追加補充を再評価。'}</p>
                    <ReferenceRows rows={tab.id === 'cpb' ? cpbRows : postRows} />
                    {tab.id === 'postcpb' && <div className="mt-3 space-y-3">
                        <div className={`rounded-xl border p-3 ${tone.platelet}`}><p className="text-sm font-bold">血小板側の表示（EXTEM A10 &lt; 38 ＋ FIBTEM A10 ≥ 9）</p><p className="mt-1 text-xs leading-relaxed sm:text-sm">EXTEM A10：30–40 mm → 20 mL/kg、20–30 mm → 30 mL/kg、&lt; 20 mm → 40 mL/kg</p></div>
                        <div className={`rounded-xl border p-3 ${tone.fibrin}`}><p className="text-sm font-bold">クリオ側の表示（EXTEM A10 &lt; 38 ＋ FIBTEM A10 &lt; 9）</p><p className="mt-1 text-xs leading-relaxed sm:text-sm">FIBTEM A10：8–9 mm → 1 unit、7–8 mm → 2 units、&lt; 7 mm → 3 units</p></div>
                        <p className="text-xs leading-relaxed text-fg-soft">CTによるFFP / PCCと、振幅による血小板 / クリオは並列評価です。アプリのFFP 20 mL/kgは原著の5–10 mL/kgと異なります。</p>
                    </div>}
                    {tab.id === 'cpb' && <p className="mt-3 text-xs leading-relaxed text-fg-soft">PCC条件はアプリでは<strong>OR</strong>、2023年原著では<strong>AND</strong>です。原著では復温時に手配し、離脱後に使用します。</p>}
                </div>
            ))}
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-900 dark:border-amber-800">
                <p><strong>MCFとA10を混同しない。</strong> MCFは最大の強さ、A10は凝固開始から10分時点の振幅です。CPB中の表はMCF、CPB後の振幅分岐はA10を使います。</p>
                <p className="mt-2">区間は既存アプリの表示をそのまま記載しており、40・30・8 mmなどの境界に重複があります。50・9 mmの扱いも表示だけでは決まりません。CPB後の30–40 mmは、前提のEXTEM A10 &lt; 38 mmが優先します。</p>
                <details className="mt-2">
                    <summary className="min-h-11 cursor-pointer py-2 font-semibold">境界値での現在の計算実装を確認</summary>
                    <p className="mt-1">CPB中：HEPTEM MCF＝50は血小板分岐なし、40は20 mL/kg、30は30 mL/kg。FIBTEM MCF＝9はクリオ分岐なし、8は1 unit、7は2 units。</p>
                    <p className="mt-2">CPB後：EXTEM A10＝38は振幅分岐なし。38未満でFIBTEM A10＝9は血小板側。EXTEM A10＝30は20 mL/kg、20は30 mL/kg。クリオ側ではFIBTEM A10＝8は1 unit、7は2 units。</p>
                    <p className="mt-2">これはコードの挙動の説明です。境界値の臨床的な正解や施設の正式指示を示すものではありません。</p>
                </details>
            </div>
        </section>
    );
}

function SourceDifferences() {
    const differences = [
        ['CPB中のPCC条件', 'HEPTEM CT > 240秒 AND CFT > 110秒。Kcentra 20 U/kgを「Order」。', 'CT > 240秒 OR CFT > 110秒。PCC 20 U/kg。'],
        ['CPB後のFFP量', '5–10 mL/kg', '20 mL/kg（またはPCC 20 U/kg）'],
        ['CPB後のFIBTEM A10＝9 mm', '> 9と< 9で分岐。ちょうど9の扱いは不明。', '≥ 9で血小板側（EXTEM A10 < 38が前提）。'],
        ['CPB中のFIBTEM MCF', '図では「> 8 mmでもクリオ1 unit」と読める不自然な表記。', '表示は8–9 mm → クリオ1 unit。計算では8以上9未満。'],
    ];
    return (
        <details className="group rounded-2xl border border-line bg-surface">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 p-4 text-sm font-bold text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-500">2023年原著とアプリの違いを確認<ChevronDown size={17} className="shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" /></summary>
            <div className="space-y-3 border-t border-line p-3 text-xs leading-relaxed sm:p-4 sm:text-sm">
                <p className="text-fg-soft">原著の <SourceLink href={`${PAPER}figure/F2/`}>Figure 2</SourceLink> と <SourceLink href={`${PAPER}figure/F3/`}>Figure 3</SourceLink> には、アプリと次の違いがあります。どちらも現行NCHの正式指示とは断定できません。</p>
                <div className="space-y-2">
                    {differences.map(([topic, original, app]) => <div key={topic} className="rounded-xl border border-line p-3"><p className="mb-2 font-bold text-fg">{topic}</p><dl className="grid gap-2 sm:grid-cols-2"><div className="rounded-lg bg-surface-2 p-2.5"><dt className="mb-1 text-xs font-bold text-fg-muted">2023年原著</dt><dd className="text-fg-soft">{original}</dd></div><div className="rounded-lg bg-teal-50 p-2.5"><dt className="mb-1 text-xs font-bold text-teal-800">Ped Pearls</dt><dd className="text-fg-soft">{app}</dd></div></dl></div>)}
                </div>
                <p className="text-fg-soft">ANDとOR、FFP量、境界値の違いには臨床的な意味があります。原著の不自然な表記を独自に訂正したり、この表から投与を確定したりせず、現行施設プロトコルで確認してください。</p>
                <p className="text-fg-soft">原著本文では、復温時のROTEMで製剤とPCCを手配し、離脱後に使用します。ヘパリン拮抗後にANHを返血し、その後CPB中のROTEMに基づく製剤を投与した記載があります。本図の「初回補充・ANH返血」は、この時期をまとめた学習表示です。</p>
                <p className="text-fg-muted">出典：<SourceLink href={PAPER}>2023年論文（全文）</SourceLink> ／ PCCの注意：<SourceLink href={LABEL}>Kcentra添付文書</SourceLink></p>
            </div>
        </details>
    );
}

export default function RotemLearningPanel() {
    return (
        <section lang="ja" aria-label="ROTEM学習ガイド" className="space-y-4">
            <div className="flex items-center gap-2 text-fg"><BookOpen size={18} className="text-teal-600" aria-hidden="true" /><h4 className="text-base font-bold">ROTEMを時期で読み分ける</h4><span className="ml-auto rounded-full bg-surface-2 px-2 py-1 text-[11px] text-fg-muted">学習ガイド</span></div>
            <div className="rounded-2xl border border-teal-200 bg-teal-50 p-4 text-center text-teal-900 dark:border-teal-800">
                <p className="text-xs font-semibold">覚え方</p>
                <p className="mt-1 text-lg font-bold sm:text-xl">中はHEP、後はEX、FIBはずっと</p>
                <p className="mt-2 text-xs leading-relaxed">CPB（人工心肺）中はHEPTEM、CPB後はEXTEM。FIBTEMは両方で見る。</p>
            </div>
            <LearningFlow />
            <QuickReference />
            <SourceDifferences />
        </section>
    );
}
