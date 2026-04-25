# Ped Pearls

Pediatric anesthesia bedside reference & calculator. Built for the small group of clinicians using it during cases — focused on getting the **right dose, fast**, with the right age caveats.

Live: <https://shinyaito28.github.io/Ped-pearls/>
Source-of-truth: Nationwide Children's Hospital *Pediatric Anesthesia Pearls* 2021 (M. Corridore, S. Lynch). Original card photographs are kept in `original_pictures/` for traceability.

---

## What's inside

- **Crisis tab** — PALS/code drug doses, MH 7-step protocol with patient-specific quick doses, electrical counter shock J calculator, MHAUS hotline.
- **Fluids tab** — 4-2-1 maintenance, TBV factor by age stratum, ABL formula, blood/colloid products, hypertonic saline, and an **OR Tracker** for cumulative EBL/IVF/UOP with ABL alarm.
- **Airway tab** — ETT/LMA/blade by age & weight, OLV recommendation, intravascular catheter sizes, and the DAS/APA Pediatric Difficult Airway algorithm with patient-specific FONA recommendations.
- **Sedation tab** — All routes (IV, IM, oral, rectal, intranasal) for ketamine / midazolam / dex / etc., plus the Ketazolam PO mix calculator.
- **Regional tab** — Caudal/spinal/penile/extremity volumes, epidural test dose & infusion rates, max LA doses for lido / bupi / ropi / **chloroprocaine**, block adjuncts.
- **Physio tab** — Hyperkalemia / hypoglycemia / acidosis correction calculators, vital sign limits by age.
- **Drugs tab** — 125+ drug entries with **age-rule badges** (NEONATE / CAUTION / NOT FOR THIS AGE / ADULT-FIXED) and an **Infusion Calculator** with 31 standard concentration presets.
- **Workflow tab** — NPO calculator (incl. ASA 2023 1-hr clear liquids), Pre-op assessment (ASA-PS / POVOC / Cormack-Lehane) with handoff summary copy, IE Prophylaxis, Standard Cart contents, external resources.

Global search: **Cmd/Ctrl + K** — fuzzy search across drugs, sedation routes, and sections.
Theme: Auto / Light / Dark, optimised for low-light OR reading. iOS status bar follows the chosen theme.

---

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # 34 unit tests via vitest
npm run test:watch
npm run build
npm run preview
```

Stack: React 18 + Vite 5 + Tailwind 3 + vite-plugin-pwa. Tests use vitest + @testing-library/react.

---

## Contributing / changing doses

> 🟥 **Do not change a dose without a source.** Cite either:
> - one of the photographs in `original_pictures/IMG_006X.HEIC` (preferred, this is our canonical reference), or
> - a peer-reviewed pediatric anesthesia source.

Workflow:

1. Branch off `main`: `git checkout -b fix/calcium-gluc-dose`
2. Make changes — most dose data lives in [src/data/drugs.js](src/data/drugs.js), age rules in `ageRules: [...]`.
3. Run `npm test` and `npm run build` locally.
4. Open a PR. The template (`.github/PULL_REQUEST_TEMPLATE.md`) asks you to cite the source image.
5. CI (`.github/workflows/ci.yml`) will lint, test and build.
6. Merge to `main` → GitHub Actions auto-deploys to Pages (`.github/workflows/deploy.yml`).

---

## Project layout

```
src/
  components/   — All cards (FluidCard, AirwayCard, EmergencyCard, …) + Layout, ThemeToggle, GlobalSearch
  hooks/        — useFluidCalc, useAirwayCalc, useRegionalCalc, useDrugList (age rules), useTheme
  context/      — PatientContext (CDC weight chart, age, sex, preemie)
  data/         — drugs.js, sedation.js, mh_protocol.js, ie_prophylaxis.js, infusion_presets.js, …
  utils/        — calc.js (dose parser/formatter shared across hooks)
tests/          — vitest unit tests (calc, hooks, infusion math, age-rule contraindications)
.github/        — deploy.yml, ci.yml, PULL_REQUEST_TEMPLATE.md
original_pictures/ — Canonical reference card photographs (IMG_0061-0068.HEIC)
```

---

## Disclaimer

This app is a **reference aid**, not a substitute for clinical judgement. Always verify doses, especially for unfamiliar drugs, neonates, and emergency drugs. Maintained for personal & limited clinical use.
