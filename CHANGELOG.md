# Changelog

All notable changes to **Ped Pearls** are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project loosely follows [Semantic Versioning](https://semver.org/).

Source of truth for drug data is `original_pictures/IMG_0061-0068.HEIC` (Nationwide Children's Hospital *Pediatric Anesthesia Pearls* 2021).

---

## [Unreleased]

Ideas / TODOs for the next release. Move them to a numbered version when shipped.

- PWA icon set: produce 192/512/1024 maskable PNGs and an iOS splash image (currently only one `icon.png` is shipped).
- Real-time vital-sign input on the Physio tab + range-violation background colour.
- Branch protection rule on `main` that requires the `CI (PR build + test)` workflow to pass before merging.
- ESLint configuration audit — `npm run lint` currently runs but has not been actively maintained.
- `Read mode` toggle (large-font, all-cards-expanded view) for accessibility.
- More unit tests: `useCorrectionCalc`, `useAirwayCalc` ETT/blade/depth, `usePatient` CDC interpolation edge cases (preemie 0.5 kg, teen 80 kg).
- Optional offline cache audit — make sure `original_pictures` are *not* in the SW precache (they're 1 MB each).

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
