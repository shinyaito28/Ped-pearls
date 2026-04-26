# Changelog

All notable changes to **Ped Pearls** are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project loosely follows [Semantic Versioning](https://semver.org/).

Source of truth for drug data is `original_pictures/IMG_0061-0068.HEIC` (Nationwide Children's Hospital *Pediatric Anesthesia Pearls* 2021).

---

## [Unreleased]

Ideas / TODOs for the next release. Move them to a numbered version when shipped.

### Phase 7 — NCH Sharepoint manual library integration (Phase 0 + 1)

The full NCH Sharepoint anesthesia manual library (158 files / 26 subspecialties) is now available locally under `original_pictures/Sharepoint/` (gitignored). The app gains a **new top-level Specialty tab** that opens a launchpad of 12 subspecialty hubs; each hub renders its protocols using a consistent collapsible-card scaffold. Existing 9 tabs are unchanged — Specialty is added as the 10th, preserving every prior workflow at the same tap depth.

- **Phase 0 — infrastructure**
  - New tab `Specialty` (lazy-loaded) wired into [Layout.jsx](src/components/Layout.jsx) via a `Suspense` boundary; existing 9 workflow-phase tabs are untouched.
  - Specialty launchpad ([SpecialtyLauncher.jsx](src/components/specialty/SpecialtyLauncher.jsx)) — 12 hub cards in a 2-column responsive grid (Hematology, Endocrine, Neuro, Fetal, Transplant, Out-of-OR, Orthopedics, GenSurg, ENT/Pulm, Metabolic, Procedures, Pre-op).
  - Hub view ([SpecialtyHubCard.jsx](src/components/specialty/SpecialtyHubCard.jsx)) — renders that hub's flowcharts via a registry, with empty-state placeholder for hubs awaiting Phase 2+ content.
  - Generic catalog renderer ([ManualCard.jsx](src/components/specialty/ManualCard.jsx)) for Phase 2+ manual entries (markdown-lite body parser, emphasis-styled sections, related cross-links).
  - Shared flowchart shell ([FlowchartShell.jsx](src/components/specialty/FlowchartShell.jsx)) with `Section`, `Bullets`, `KeyValue`, and `RequireWeight` primitives so all flowchart cards have the same visual idiom as [TransfusionProtocolCard.jsx](src/components/TransfusionProtocolCard.jsx).
  - Catalog data layer at [src/data/specialty/](src/data/specialty/) — hub registry + per-flowchart modules + schema doc.
  - **Global search refactored** ([GlobalSearch.jsx](src/components/GlobalSearch.jsx)) — Fuse.js (~12 KB gz, lazy-imported on first ⌘K) replaces substring matching for sections + Specialty entries. Drugs and sedation keep their direct match. New "Specialty manuals" result group; existing "Sections" results unchanged.
  - **Extraction script** at [scripts/extract_sharepoint.mjs](scripts/extract_sharepoint.mjs) walks the Sharepoint tree and writes Markdown skeletons for every .docx (mammoth) and .pdf (pdf-parse v2) into `scratch/sharepoint_drafts/` (gitignored). 154 files extracted in the first sweep (57 .docx, 79 .pdf, 18 placeholders for .pptx/.xlsx/.doc). `Information for Families` and `Contact Lists` folders are skipped at the script level (no attending names ever enter the app).
  - `.gitignore` adds `original_pictures/Sharepoint/` and `scratch/`. `fuse.js` added as runtime dep; `mammoth` and `pdf-parse` as devDeps.

- **Phase 1 — 8 high-value flowchart cards** (each with its own data + interactive component, registered in [flowchartRegistry.js](src/components/specialty/flowchartRegistry.js)):
  - **DI Flowchart** ([DiFlowchartCard.jsx](src/components/specialty/DiFlowchartCard.jsx)) — Neuro hub. Branches on known vs suspected new-onset, then Na+ band (hypo/normo/hyper). Free-water-deficit calculator (input Na+ actual/goal, weight from PatientBar) and vasopressin drip starter (0.5 mU/kg/hr with weight-aware titration and target UOP).
  - **Mediastinal Mass Algorithm** ([MediastinalMassCard.jsx](src/components/specialty/MediastinalMassCard.jsx)) — ENT/Pulm hub. 3-tier triage (no symptoms / symptoms or ≥25% airway narrowing / respiratory distress) → disposition + consult cascade + biopsy plan.
  - **Emergency Cesarean Flowsheet** ([EmergencyCesareanCard.jsx](src/components/specialty/EmergencyCesareanCard.jsx)) — Fetal hub. Pre-procedure / room set-up / RSI doses (weight-aware: standard vs hemorrhage variants) / intra-op / oxytocin (5 U over 10 min, then 70 mL/hr) / post-clamp / emergence + indwelling-epidural alternative.
  - **Maternal-Fetal Anesthesia Flows** ([MaternalFetalCard.jsx](src/components/specialty/MaternalFetalCard.jsx)) — Fetal hub. 5-procedure picker (MIFS / Mid-Gestation / EXIT-to-Resection / EXIT-to-Airway / Scheduled Cesarean) → procedure-specific anesthesia plan, lines, fetal IM cocktail, fetal emergency drugs.
  - **Craniofacial IntraOp Transfusion** ([CraniofacialTransfusionCard.jsx](src/components/specialty/CraniofacialTransfusionCard.jsx)) — Neuro hub. Surgical approach + step picker → weight-based pRBC (15 mL/kg), crystalloid (10 mL/kg), colloid (10 mL/kg), and FFP-after-pRBC threshold (45 mL/kg). Visible warning that the source PDF's Hb-threshold table did not extract cleanly and needs source verification.
  - **OSA PAT Flowsheet** ([OsaPatFlowsheetCard.jsx](src/components/specialty/OsaPatFlowsheetCard.jsx)) — Pre-op hub. Age-band (≥12 vs <12) + BMI input + 6 OSA screening questions → live disposition (ASC OK / Earlier in day / Anesthesia review / Move to MOR).
  - **iMRI Pre-Scanning Checklist** ([ImriChecklistCard.jsx](src/components/specialty/ImriChecklistCard.jsx)) — Out-of-OR hub. 21-item MR-safety sweep with `localStorage` persistence and reset.
  - **IR Arterial Sheath Heparin** ([IrHeparinStrokeCard.jsx](src/components/specialty/IrHeparinStrokeCard.jsx)) — Out-of-OR hub. Weight-tier infusion rate table (≥60 / 40-60 / 20-40 / <20 kg → 180 / 90 / 45 / 20 mL/hr at 2 U/mL) with auto-highlight of the active tier. Stroke Protocol pointer noted (.doc source needs manual transcription).
- **Crisis tab cross-link** — [EmergencyCard.jsx](src/components/EmergencyCard.jsx) gains a "Subspecialty emergencies" panel listing all 5 emergency-flagged Specialty entries (Mediastinal Mass, Emergency Cesarean, Maternal-Fetal, DI, IR Heparin). One tap jumps to the respective hub via the new `navigateToSpecialty(hubId)` callback. Crisis-tap depth preserved at 1.
- **Bundle impact** — Specialty chunk 8.65 KB gz, Fuse 8.66 KB gz, both lazy. Main bundle grows by ~8 KB gz (specialty data files referenced by the EmergencyCard cross-link). 119 tests still pass.

### Phase 7 — Phases 2-4 (catalog rollout, all 12 hubs populated)

Following Phase 0 + 1 (infrastructure + 8 flowchart cards), Phases 2-4 fill all 12 subspecialty hubs with curated catalog entries using the generic `<ManualCard>` renderer. Per the agreed workflow, drafts were extracted from Sharepoint sources, structured into JS catalog modules, and shipped for **medical review** by the user (not yet validated against source PDFs — `lastReviewed: '2026-04'` marks them as needing the review pass).

- **Phase 2 — Hematology / Endocrine / Neuro hubs (18 entries)**
  - Hematology (7 entries): JW patient pathway, Hemophilia A/B/vWD bleeding doses, ERAST tumor, Erythropoietin policy, Sickle cell pointer, HAE Emergency pointer
  - Endocrine (6 entries): DM PAT (with/without consult), DM/weight-loss medication chart (Mar 2025), PAT for DM+adrenal+DI (stress dosing), Hypertonic Saline 2%/3%/6%/23.4%, MPS III gene therapy
  - Neuro (5 catalog entries — flowcharts shipped in Phase 1): Keppra loading, Intra-op DI + vasopressin (companion to DI Flowchart), ROSA neurosurgery protocol, Dorsal Rhizotomy, AFM/Brachial plexus/Microsurgery pointer
  - Files created: [src/data/specialty/hematology.js](src/data/specialty/hematology.js), [endocrine.js](src/data/specialty/endocrine.js), [neuro.js](src/data/specialty/neuro.js)
- **Phase 3 — Out-of-OR / Fetal / Transplant / Orthopedics (24 entries)**
  - Out-of-OR (9 entries): ECT routine + methohexital + flumazenil, Protamine for IR heparin reversal (UFH + LMWH tables), Cardiac Stress MRI dobutamine staging, Stop-Vent CT inspiratory-hold protocol, VCUG, Urodynamics, GI Suite contraindications, Off-hours MRI workflow, OSU coverage rules
  - Fetal (4 catalog entries — flowcharts shipped in Phase 1): Common pre-op + hand-off principles, Fetal Anesthesia Drug Kit + uterotonics + tocolytics + fetal cocktail + emergency drugs, Pain management summary by procedure type, Fetal resuscitation strategies
  - Transplant (5 entries): Liver transplant pre-OR setup, Liver transplant infusions + drug plan, Liver transplant phase-by-phase anesthetic, Organ procurement (DBD donor care), Kidney transplant pointer (legacy .doc)
  - Orthopedics (6 entries): Spinal Fusion multimodal pain protocol, Long Bone Fractures Valium protocol, Hemipelvectomy/Limb Salvage sarcoma protocol, plus pointers for Remimazolam adjunct, IOM amplitude-loss management, limb lengthening regional, SELMS
  - Files created: [outofor.js](src/data/specialty/outofor.js), [fetal.js](src/data/specialty/fetal.js), [transplant.js](src/data/specialty/transplant.js), [ortho.js](src/data/specialty/ortho.js)
- **Phase 4 — GenSurg / ENT-Pulm / Metabolic / Procedures / Pre-op (28 entries)**
  - GenSurg (4 entries): CDH NICU acute management algorithm with HFOV + ECMO ladder, Lap appendectomy protocol, IBD ERAS checklist + dose table, Robotic bariatric surgery anesthesia + ERAS
  - ENT/Pulm (6 entries): Orthognathic surgery (controlled hypotension MAP 55-65, IMF wire cutters at bedside), DISE protocol (dexmed + ketamine combo, avoid midazolam), plus pointers for Thyroid lobectomy, Jet ventilation, Trach-vented patients, OSA screening
  - Metabolic (5 entries): Ketogenic diet (sugar-free preps, sufentanil avoid), MCAD perioperative care (D10W + L-carnitine), Mitochondrial disorder guidelines, **mtND4 Venezuelan heritage action plan** (full protocol — flush machine, TIVA, contraindications), Mastocytosis pointer
  - Procedures (8 entries): Pectus/Nuss pathway with cryoablation, TPIAT pain plan (celiac plexus + thoracic epidural OR bilateral T10 ESB), Spinal Fusion 2025 cross-link, Caffeine for PDPH (PO 200-300 mg, NaBenzoate IV with in-line filter), plus pointers for pyeloplasty, ASRA anticoag-regional, spinal/caudal pearls, adjunct infusions
  - Pre-op (7 entries): Viral illness cancellation timeline, Premie post-op monitoring (PGA criteria + 8 hr observation), Urine pregnancy guidelines, AED administration alternatives table (IV/ODT/oral suspension), Drugs SHOULD vs SHOULD NOT on AM of surgery, plus pointers for Emend and Adult Patient Admission
  - Files created: [gensurg.js](src/data/specialty/gensurg.js), [entpulm.js](src/data/specialty/entpulm.js), [metabolic.js](src/data/specialty/metabolic.js), [procedures.js](src/data/specialty/procedures.js), [preop.js](src/data/specialty/preop.js)
- **Bundle impact (Phases 2-4)** — main bundle grew from 109 KB gz (Phase 0) → 145 KB (Phase 2) → 163.5 KB gz (Phase 4), incorporating all 70 catalog entries + 8 flowchart entries. Specialty hub component code stays in the lazy-loaded chunk (~8.65 KB gz). All 119 tests still pass; one bundle-size warning above 500 KB raw (acceptable for a clinical reference app, served + cached as PWA).
- **Pointer entries**: ~17 entries are documented "pointers" rather than full content — sources are in legacy .doc format that didn't auto-extract (Sickle cell, Trach-vented, IOM amplitude loss, Stroke Protocol, etc.) or are images/PPTX (Mastocytosis, HAE, Jet Vent, ABO Verif, CPG-Thrombosis). Each lists the source file path and key themes for future manual transcription.
- **Future**: medical review pass against source PDFs (user); transcription of pointer entries; possible further code-splitting if main bundle exceeds workable PWA precache size.

### Phase 6 progress (in flight)
- **Fix-up after first user test of Phase 6-D**:
  - **Transfusion case-type picker reworked** — the original picker mixed procedures (Neonate / Ao Arch / Arterial Switch / Norwood / Comp.II) with the source document's surgeon-initial codes (PM / SC / TS), which were opaque to anyone outside the institution. The card now exposes two clean axes: a **Procedure picker** that drives the high-risk classification (post-CPB product recipe + blood prime) and an **Attending TXA practice toggle** (Routine / Selective) that decides whether TXA is indicated. No surgeon initials are surfaced. Tests updated; total 119 (was 114).
  - **Dark-mode readability patch in [src/index.css](src/index.css)** — `hover:bg-slate-50` / `hover:bg-slate-100` / `hover:bg-white` variants and the opacity-modified `bg-amber-50/50` and `bg-red-50/60` classes were not covered by the bare-class dark-mode patches added in Phase 2.1. Hovering a drug row in dark mode used to flash a near-white background under the patched bright text → unreadable. Now patched. `divide-slate-100` similarly extended.
- **Phase 6-A** — Airway calculator extended past the NCH source range. Previously, the `(Age/4)+4` branch returned `Mac 2 / Miller 1 / Wis-Hipple 1.5` for **every** ≥2 yr patient, including 16 yr olds. Fixed in [src/hooks/useAirwayCalc.js](src/hooks/useAirwayCalc.js) — blade now tiers through Mac 2 / Miller 2 (6–10 yr), Mac 3 / Miller 2 (10–12 yr), and Mac 3-4 / Miller 2-3 (≥12 yr). ETT for ≥12 yr drops out of the pediatric formula and switches to adult sizing (7.0 mm F / 7.5–8.0 mm M). [`AirwayCard`](src/components/AirwayCard.jsx) shows an amber notice when adult-sizing fallbacks are in effect. 21 new tests in [tests/useAirwayCalc.test.js](tests/useAirwayCalc.test.js) (total 79).
- **Phase 6-B** — Patient input bar is now collapsible. After 5 s of inactivity (and once weight is valid) the full form folds down to a single-row chip showing `[age] [sex] [weight] [height]` with an edit pencil. Click anywhere on the chip to expand back. A settings cog persists the user's preference (`auto-collapse` / `always-show`) in `localStorage`. The tab strip's sticky `top` offset shifts with the header height so content slides up under the smaller bar. New: [src/hooks/useCollapsibleBar.js](src/hooks/useCollapsibleBar.js), [src/components/PatientBar.jsx](src/components/PatientBar.jsx), [src/components/PatientChip.jsx](src/components/PatientChip.jsx); refactor of [Layout.jsx](src/components/Layout.jsx) to compose them.
- **Phase 6-C** — ROTEM card visualisation upgrade. Each threshold slider now ships with a **mini mock-trace** to its right showing the characteristic ROTEM "missile" shape, with the active marker (CT / CFT / MCF / A10) highlighted and the trace outlined in rose when the clinical threshold is breached. HEPTEM is rendered blue, EXTEM emerald, FIBTEM purple, matching the Tem software conventions. Slider labels also gained an info-icon **glossary tooltip** explaining HEPTEM, EXTEM, FIBTEM, CT, CFT, MCF, and A10. New: [src/components/RotemTrace.jsx](src/components/RotemTrace.jsx), [src/components/RotemTooltip.jsx](src/components/RotemTooltip.jsx), [src/data/rotem_glossary.js](src/data/rotem_glossary.js), [tests/rotemTrace.test.js](tests/rotemTrace.test.js) (9 new waveform tests, total 88).
- **Phase 6-D follow-up** — Cardiac tab visual rebalance. The original ROTEM card had a large rose hero header that dominated the tab; it now uses the same compact collapsible pattern as the four newer cards, with a "N active" badge surfaced on the header when recommendations are triggered. **All five cards default collapsed** so opening the tab shows a calm 5-row overview. Card order now follows clinical workflow chronology rather than implementation order — Timeline+TRAVEL → Room Setup → Heparin/Protamine → Transfusion → ROTEM (used at end of case).
- **Phase 6-D** — Cardiac tab expanded with **4 new workflow cards**, all sourced from the NCH cardiac fellow rotation guide + transfusion + anticoagulation protocols. Each card is independently collapsible and persists checkbox / preference state in `localStorage`.
  - **Pre-induction Room Setup** ([src/components/CardiacRoomSetupCard.jsx](src/components/CardiacRoomSetupCard.jsx)) — checklist of rescue drugs (full + dilute epi/phenylephrine, CaCl, atropine), maintenance drugs (paralytic ×2, opioid, heparin, TXA, cefazolin), monitors (SpO₂×2, BIS, NIRS) and setup conventions (IV pump max-volume, syringe taping). Phenylephrine syringes and CaCl syringe size are computed from patient weight.
  - **Heparin / Protamine Calculator** ([src/components/HeparinProtamineCard.jsx](src/components/HeparinProtamineCard.jsx)) — toggle between **NCH Investigational** and **U of M** heparin protocols. U of M auto-computes the loading dose by age tier (600 / 500 / 450 U/kg). Re-dose triggers when HPT < 2.0 IU/mL or ACT < 480 sec → +100 U/kg. Protamine reversal uses the 1 mg per 100 U convention with the 5 mg/kg cap (NCH neonate exception preserved); hemobag adds 50 mg. Cath-lab heparin (100 U/kg flat) is also surfaced. Pure resolvers in [src/data/anticoagulation_protocol.js](src/data/anticoagulation_protocol.js) covered by 16 unit tests.
  - **Transfusion Protocol** ([src/components/TransfusionProtocolCard.jsx](src/components/TransfusionProtocolCard.jsx)) — case-type picker (neonate, Aortic arch, Arterial switch, Norwood, Comprehensive II, PM, SC, TS, other). High-risk classification surfaces the post-CPB 1st/2nd-round product plan (Plt 20-40 mL/kg, Cryo 10-15 mL/kg, FFP 5-10 mL/kg) and rescue Factor VII 90 mcg/kg if no clot after round 2. Blood-prime plan auto-shows for patients < 3 kg. TXA dose (20 mg/kg up to 1 g) renders for every case with the three administration time-points. Pure resolvers in [src/data/transfusion_protocol.js](src/data/transfusion_protocol.js) covered by 10 unit tests.
  - **Cardiac OR Timeline + TRAVEL** ([src/components/CardiacWorkflowCard.jsx](src/components/CardiacWorkflowCard.jsx)) — 6 phase accordion (Pre-incision → Cannula → RAP/VAP → CPB → Coming off bypass → Transport) with checkboxes per step, plus the **TRAVEL** separation-from-bypass mnemonic widget (Temperature / Rhythm / Air on TEE / Ventilation / Electrolytes / table Level) with per-letter expand-on-tap rationale. Handoff summary copies to clipboard. Data in [src/data/cardiac_timeline.js](src/data/cardiac_timeline.js).
  - GlobalSearch index extended with `setup`, `heparin`, `protamine`, `transfusion`, `txa`, `factor vii`, `travel`, `precedex`, `milrinone`, `muf`. Total tests 114 (was 88).

### Cardiac section roadmap (Phase 5+)
- **Heparin / Protamine calculator** — ACT goals, heparin loading dose by weight + ACT response curve, protamine reversal at 1 mg per 100 U heparin, tracking of CPB ACTs over time.
- **Intraoperative antifibrinolytic dosing** — TXA & EACA loading + maintenance schemas specific to pediatric cardiac surgery (high-dose).
- **ECMO basics** — VA / VV cannula sizing by weight, initial settings, ACT/anticoagulation targets, weaning checklist.
- **Pulmonary HTN / TET spell crisis card** — phenylephrine, knee-chest position, 100% FiO₂, NaHCO₃, deepen anesthesia, fentanyl bolus algorithm.

### General app roadmap
- PWA icon set: produce 192/512/1024 maskable PNGs and an iOS splash image (currently only one `icon.png` is shipped).
- Real-time vital-sign input on the Physio tab + range-violation background colour.
- Branch protection rule on `main` that requires the `CI (PR build + test)` workflow to pass before merging.
- ESLint configuration audit — `npm run lint` currently runs but has not been actively maintained.
- `Read mode` toggle (large-font, all-cards-expanded view) for accessibility.
- More unit tests: `useCorrectionCalc`, `useAirwayCalc` ETT/blade/depth, `usePatient` CDC interpolation edge cases (preemie 0.5 kg, teen 80 kg).
- Optional offline cache audit — make sure `original_pictures` are *not* in the SW precache (they're 1 MB each).

---

## [0.4.0] - 2026-04-25 — Phase 5: Cardiac anesthesia (kickoff) — ROTEM decision tree

First entry in a new **Cardiac** tab, scaffolding the section for upcoming cardiac-anesthesia content (Heparin/Protamine, antifibrinolytics, ECMO, pulmonary HTN — see [Unreleased]).

### Added
- **New `Cardiac` tab** (rose accent, `<HeartPulse>` icon, 7th tab) — placed between Physio and Drugs.
- **`CardiacRotemCard`** ([src/components/CardiacRotemCard.jsx](src/components/CardiacRotemCard.jsx)) — ROTEM-guided post-bypass blood product management for neonatal cardiac surgery, sourced from a user-provided institutional protocol.
  - Two phases (CPB / Post-CPB) toggled with a pill UI.
  - **Threshold sliders** for HEPTEM CT/CFT/MCF, FIBTEM MCF, EXTEM CT, A10 EXTEM, A10 FIBTEM. Slider track turns rose past the clinical threshold.
  - Real-time recommendation cards for **Kcentra (4F-PCC) 20 U/kg, Platelets 20–40 mL/kg, Cryoprecipitate 1–3 units, FFP/Kcentra**.
  - **Live SVG decision tree** — CPB phase shows a 3-row deficit ladder; Post-CPB phase shows the goal-met / platelets / cryo branching tree from the institutional guide. The active path highlights teal with a glow; inactive branches fade to dashed slate.
  - Patient-weight-aware (uses `usePatient`) — totals are calculated as mL or units automatically.
  - Copy-to-clipboard handoff summary.
  - Preparation panel (PRBCs 2 units, FFP 2 × 20 mL/kg) with weight-converted volumes.
- **`RotemDecisionTree`** ([src/components/RotemDecisionTree.jsx](src/components/RotemDecisionTree.jsx)) — pure SVG, no canvas/D3 dependency. Exports `<CpbDecisionLadder>` and `<PostCpbDecisionTree>`.
- **`useRotemCalc`** hook + pure resolver functions in [src/data/rotem_protocol.js](src/data/rotem_protocol.js).
- **24 new unit tests** ([tests/useRotemCalc.test.js](tests/useRotemCalc.test.js)) — every clinical threshold and dose tier is locked as a contract; total test count now 58.
- GlobalSearch index extended with cardiac keywords (`rotem`, `heptem`, `fibtem`, `extem`, `cpb`, `bypass`, `kcentra`, `cryo`, `a10`, `mcf`, `cft`, `cardiopulmonary`).

---

## [0.3.0] - 2026-04-25 — Phase 4: CI/CD, testing, dual-deploy stability

### Added
- `.github/workflows/deploy.yml` — auto-deploy to GitHub Pages on every push to `main` (`actions/deploy-pages@v4`).
- `.github/workflows/ci.yml` — PR + non-main push CI runs lint + test + build.
- `.github/PULL_REQUEST_TEMPLATE.md` — checklist requiring `original_pictures` source citation for any dose change.
- `vitest` setup (`vitest.config.js`, `tests/setup.js`) with `jsdom` 25 and `@testing-library/react` 16.
- 34 unit tests across 5 files: `calc.test.js`, `useFluidCalc.test.js`, `useRegionalCalc.test.js`, `useDrugList.test.js` (age rules + neonate antibiotics), `infusion.test.js`.
- `README.md` (new) — project overview, dev workflow, contribution guide.
- `.gitignore` (new) — excludes `node_modules/`, `dist/`, `.env`, OS metadata.

### Changed
- `DEPLOY_GUIDE.md` rewritten for the GitHub Actions workflow (Vercel kept as fallback).
- `package.json` bumped to `0.3.0`, added `test` and `test:watch` scripts.
- Untracked **12,898** files in `node_modules/` that were accidentally committed in the initial commit.

### Fixed
- **Vercel deploy at `ped-pearls.vercel.app` was blank** because Phase 4 had baked `base: '/Ped-pearls/'` into `vite.config.js`. Reverted `vite.config.js` to default `base: '/'` (Vercel-friendly) and now pass `--base=/Ped-pearls/` only inside the GitHub Actions build step. Both deploys coexist.
- **PWA Service Worker stale-cache lock-in** — added `workbox: { skipWaiting: true, clientsClaim: true, cleanupOutdatedCaches: true }` so a new deploy immediately replaces the old SW instead of users being stuck on a cached HTML.

---

## [0.2.1] - 2026-04-25 — Phase 3: Anesthesia workflow features

### Added
- **InfusionCalcCard** (`src/components/InfusionCalcCard.jsx` + `src/data/infusion_presets.js`) — bidirectional dose ⇄ mL/hr calculator with 31 standard concentration presets, in-range validator, and clipboard summary.
- **OrTrackerCard** (`src/components/OrTrackerCard.jsx`) — cumulative EBL/IVF/UOP tracker with localStorage persistence, ABL progress bar with 80%/100% alarm levels, handoff-ready summary copy.
- **NPOGuidelineCard** (`src/components/NPOGuidelineCard.jsx` + `src/data/npo_guidelines.js`) — 6 intake types (incl. ASA 2023 1-hr clear-liquid), real-time clearance countdown.
- **PreOpAssessmentCard** (`src/components/PreOpAssessmentCard.jsx`) — ASA-PS I-VI + Emergency, POVOC pediatric PONV score (4 factors → ~9-70%), Cormack-Lehane I-IV, single-line handoff summary copy.
- **DifficultAirwayCard** (`src/components/DifficultAirwayCard.jsx`) — DAS / APA Pediatric A/B/C/D plans with weight-specific FONA recommendations (needle cric. <8y, scalpel-bougie ≥8y).
- Workflow tab is now structured as 5 sub-tabs: NPO / Pre-op / IE Ppx / Cart / Links.
- GlobalSearch index extended with the new sections so `Cmd+K` finds them.

### Changed / Fixed (external links)
- **Pedi Crisis 2.0 (SPA)** URL was 404 — changed `/mobile-app-pedi-crisis-2-0/` → `/pedi-crisis-app/`.
- Added **SPA Critical Events Checklists** and **LipidRescue.org** as additional resources.
- ASA Practice Guidelines URL switched to `/standards-and-guidelines`.

---

## [0.2.0] - 2026-04-25 — Phase 2: Wholesale UI redesign

### Added
- CSS-variable design tokens (`--bg-app`, `--fg-primary`, `--fg-muted`, …) in `src/index.css`, wired into Tailwind via `colors: { app, surface, fg, … }` (`tailwind.config.js`).
- Dark / Light / System theme via `useTheme.js` + `ThemeToggle.jsx`, persisted to `localStorage`. iOS status bar `<meta theme-color>` is auto-synced.
- **Glassmorphism header** (`.glass`), pill-style age-unit selector (D/M/Y), sex M/F pill, sticky weight-warning banner.
- **GlobalSearch** (`src/components/GlobalSearch.jsx`) bound to `Cmd/Ctrl + K` — fuzzy search across all drugs, sedation routes, and 14 sections.
- Restructured tab navigation with per-tab accent color and pulse-soft animation on the Crisis tab icon.

### Changed
- Restructured `Layout.jsx` for the new header + tabs.
- Tailwind `safelist` extended to include all dynamic `bg-{color}-{shade}`, `text-{…}`, `border-{…}` permutations used by the EmergencyCard accents.

### Phase 2.1 — readability patch (same release)
- Light mode: `--fg-muted` shifted slate-400 → slate-500 so formulas / footers are legible.
- Dark mode: pastel surface backgrounds (`bg-blue-50`, …) re-mapped to **tinted-alpha of the same color's -900 at 32%** instead of being flat-reset to slate-800. Color-coding survives.
- Dark mode: accent text in the 700/800/900 range is shifted up to bright 200-300 shades; accent borders 100-300 shifted down to 700-800. Cards remain visually distinct.

---

## [0.1.0] - 2026-04-25 — Phase 1 + 1.5: Drug data accuracy

This is the most clinically important release. The app now matches the canonical reference card (`original_pictures/IMG_0061-0068.HEIC`).

### Fixed (35+ dose discrepancies vs source)
- **Calcium Gluconate** 30 mg/kg (was 60-100) — major safety fix
- **Calcium Chloride** 10-15 mg/kg (was 10-20)
- **Glycopyrrolate** 15 mcg/kg (was 0.01 mg/kg)
- **Flumazenil** 1-10 mcg/kg q1min, max 1 mg (was 10 mcg/kg max 0.2 mg)
- **Etomidate** 0.3 mg/kg, **Ephedrine** 0.2-0.3 mg/kg, **Furosemide** 0.5-2 mg/kg
- **Naloxone** 1-10 mcg/kg, **Neostigmine** 0.03-0.07 mg/kg
- **Adenosine** 0.1-0.3 mg/kg, max 12 mg
- **Esmolol** load over 2 min (was 1 min)
- **Isoproterenol** 0.05-10 mcg/kg/min (was 0.05-1)
- **PGE1** 0.05-2 mcg/kg/min (was 0.05-0.1)
- **Milrinone load** 25-50 mcg/kg over 20 min
- **Atropine** routes split: IV/IO 0.01-0.02 mg/kg vs IM/PO 0.02-0.04 mg/kg
- **Tranexamic Acid** load 50-100 mg/kg + 5 mg/kg/hr maintenance
- **Hydromorphone** + PO/PR 50-80 mcg/kg
- **Rocuronium** + IM 1-1.8 mg/kg + infusion 4-16 mcg/kg/min
- **Vecuronium** + infusion 0.1-0.25 mg/kg/hr
- **Phenylephrine** + infusion 0.5-20 mcg/kg/min
- **Sufentanil** + 0.1-0.5 mcg/kg/hr infusion
- **Vasopressin** + DI 0.5-3 mU/kg/hr
- **Acetaminophen** 4-tier IV dosing + PO 10-15 mg/kg + PR 20-40 mg/kg initial
- **Dexamethasone** three uses (Stridor / PONV / ICP)
- ~30 missing drugs added (Aminocaproic Acid, Butorphanol, Chloral Hydrate, DDAVP, Dolasetron, Granisetron, Haloperidol, Heparin, Ibuprofen, Methadone, Metoclopramide, Nalbuphine, Naproxen, OxyCODONE, Oxybutynin, Pancuronium, Promethazine, Prochlorperazine, Ranitidine, Scopolamine, Terbutaline, Tigan, Trilisate, etc.).

### Added
- **Age-rule mechanism** — `ageRules: [{minMonths, maxYears, badge, label, dose, max}]` on drug entries; `useDrugList.js` resolves the matching rule against current patient context.
- **DoseBadge** component (`src/components/DoseBadge.jsx`) with 5 styles: `neonate` (purple), `caution` (amber), `contraindicated` (red, animated, red row bg), `adult` (blue), `info` (teal).
- Age-based contraindications: **Promethazine <2y**, **Tramadol <12y** (FDA black-box).
- Age-based caution: **Ketorolac/Ibuprofen <6mo**, **Naproxen <2y**.
- Acetaminophen IV 4-tier (preemie / term neonate / 2-12y / ≥50kg adult-fixed 1 g).
- Antibiotic auto-switch to neonate doses + extended q-intervals for 12 antibiotics.
- New cards: **MHProtocolCard** (7-step + patient quick doses), **IEProphylaxisCard**, **StandardCartCard**, **ElectricalShockCard**, **CatheterCard** (arterial + CVL sizes + height-based depth).
- Sedation expansions: Ketamine IM split (sedation 2-3 vs GA 5-8 mg/kg), Clonidine 6 routes, Dexmedetomidine maint/nasal, Pentobarbital IV, Diazepam IV.

### Regional fixes (`useRegionalCalc.js` + `RegionalCard.jsx`)
- Lidocaine **4.5 mg/kg** plain (was 5)
- Bupivacaine **+epi 3 mg/kg** added
- Ropivacaine **3.5 mg/kg** plain & +epi (was 3)
- **Chloroprocaine 11 / 14 mg/kg** added (was missing entirely)
- Block adjuncts (clonidine, dexamethasone, epi, fentanyl, morphine)
- Epidural test dose + infusion rates by drug/concentration
- Volume conversions for 0.125%, 0.25%, 0.5%, 1%, 2%, 3% concentrations

### Fluids (`useFluidCalc.js` + `FluidCard.jsx`)
- 2% / 3% buffered saline calculator (1-3 mL/kg over 20 min)
- Hetastarch (10 mL/kg, 35 mL/kg/day cap)
- D2.5 in LR/NS reminder for <20 kg or NPO >12 hr
- Buretrol fill cap 20 mL/kg

### Infrastructure
- `vite.config.js` — initial `base: '/Ped-pearls/'` for GitHub Pages (later refined in 0.3.0).

---

## [0.0.1] - Initial commit (pre-overhaul)

Original single-file `App.jsx` (936 lines) by Quentin Fisher, M. Corridore et al. as a personal pediatric anesthesia helper. Multiple drug doses were transcribed incorrectly vs the source card — this is the baseline that the [0.1.0] release corrected.
