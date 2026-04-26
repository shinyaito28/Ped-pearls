// Transplant hub — catalog entries.
// Source: NCH Sharepoint / Transplant /
//   - Nationwide Pediatric Liver Transplant Protocol 5.4.21.docx
//   - Organ procurement - donor care_Oct 2023.pdf
//   - Kidney Transplant and Donor Protocols (.doc — placeholder, needs transcription)
//   - Pre-Transplant ABO Verif.pdf (extracted empty — placeholder)

const COMMON = {
    hub: 'transplant',
    kind: 'catalog',
    weightAware: false,
    ageRules: null,
    source: 'NCH Sharepoint / Transplant',
    lastReviewed: '2026-04',
};

export const entries = [
    {
        ...COMMON,
        id: 'transplant_liver_setup',
        title: 'Liver Transplant — Pre-OR Setup + Blood Products',
        shortDescription: 'Notify blood bank/lab/pharmacy/perfusion; weight-tier blood orders; line/IV plan.',
        tags: ['liver transplant', 'blood bank', 'rotem', 'belmont', 'central line', 'introducer', 'piv', 'pediatric liver'],
        emergency: false,
        related: ['transplant_liver_intraop', 'transplant_liver_phases'],
        sections: [
            {
                heading: 'Notify before patient arrives in OR',
                emphasis: 'info',
                body: '- **Blood Bank** (25391): place order based on patient weight\n- **Lab** (25599): need for STAT lab handling\n- **Pharmacy**: medication orders\n- **Perioperative techs**: order infusion pumps\n- Consider asking IR for pre-op PICC/central line if difficult access\n- Confirm antibiotics + immunosuppressives (typically Solumedrol) ordered + in OR\n- **Verify ROTEM login** and **CLM access for printing lab labels** before commencement',
            },
            {
                heading: 'Blood products on hold to OR (by weight)',
                emphasis: 'warn',
                body: '- **<20 kg**: 3 U PRBC, 3 U FFP, 1 U platelets\n- **20-40 kg**: 4 U PRBC, 4 U FFP, 1 U platelets\n- **40-60 kg**: 8 U PRBC, 8 U FFP, 2 U platelets\n- **>60 kg**: 10 U PRBC, 10 U FFP, 2 U platelets\n- Stay ahead **2-4 units** of PRBC and FFP — anesthesia team calls or places EPIC orders for additional products\n- Discuss cryoprecipitate with surgeon (some want it if fibrinogen <200)',
            },
            {
                heading: 'Warming + monitors',
                emphasis: 'plain',
                body: '- Warming lights + room warmed until patient draped\n- Underbody Bair hugger + upper body Bair hugger (turn off lower body if using during IVC clamp)\n- Sheets of plastic to wrap extremities and head\n- Core temp probe (esophageal, nasal, or Foley)\n- OG tube vs NG tube if Roux-en-Y planned\n- Upper extremity pulse ox (consider lower extremity to monitor ischemia; upper for uninterrupted reading)\n- **Cerebral NIRS, Left Renal NIRS** (right renal NIRS won\'t read during explant due to ambient light)\n- ABL machine + syringes; Belmont primed with Plasmalyte/Normosol\n- Ultrasound with sterile covers for central line, A-line, PIV',
            },
            {
                heading: 'Central + arterial access (by weight)',
                emphasis: 'warn',
                body: '- **≤4 kg**: 4Fr 5cm double-lumen CVC\n- **5-30 kg**: 5Fr 12cm double-lumen CVC\n- **30-50 kg**: 6Fr 10cm Introducer\n- **>50 kg**: 8.5Fr 10cm Introducer\n- Large bore: RIC Rapid Infusion Catheter Exchange Set 7Fr/8.5Fr; micro-puncture introducer 4Fr/5Fr\n- A-line via Cook radial sets; consider bilateral so labs always have a waveform monitored',
            },
            {
                heading: 'Infusion plan (manifold)',
                emphasis: 'info',
                body: '- 2 IV poles, 3 Alaris mamas, 8 infusion pumps (half regular, half syringe)\n- **Maintenance + vasoactive → central line/PICC**\n- **Belmont → RIC/central/largest PIV** (all blood + volume; test max flow first)\n- PIV with Plasmalyte/Normosol NOT on warmer for platelets/cryo\n- PIV with Plasmalyte/Normosol on a warmer\n- Maintenance fluid: consider D5 vs D10 carrier to maintain GIR 4-6 during anhepatic phase',
            },
        ],
    },
    {
        ...COMMON,
        id: 'transplant_liver_intraop',
        title: 'Liver Transplant — Infusions + Drug Plan',
        shortDescription: 'Vasopressin/Epi/Norepi/Calcium/Vec/Lasix/Insulin/Fentanyl plus syringes to draw up.',
        tags: ['liver transplant', 'vasopressin', 'epinephrine', 'norepinephrine', 'calcium chloride', 'vecuronium', 'tranexamic', 'amicar', 'heparin', 'dextran'],
        emergency: false,
        related: ['transplant_liver_setup', 'transplant_liver_phases'],
        sections: [
            {
                heading: 'Infusions — programmed and connected to manifold',
                emphasis: 'warn',
                body: '- Maintenance IV fluids — D5 v D10 carrier for GIR 4-6 during anhepatic\n- **Vasopressin** 0.5-5 mU/kg/min (max 10 mU/kg/min)\n- **Epinephrine** 0.05 mcg/kg/min (range 0.05-2)\n- **Norepinephrine** 0.1 mcg/kg/min (range 0.1-2)\n- **Calcium chloride** 10 mcg/kg/hr (range 10-30)\n- **Vecuronium** 0.1 mg/kg/hr (range 0.1-0.2)\n- **Lasix** 0.1-0.5 mg/kg/hr (NOT compatible with Amicar — consider Bumex 2-8 mcg/kg/hr instead)\n- **Insulin**: load 0.01-0.1 U; infuse 0.1 U/kg/hr\n- **Fentanyl** 5 mcg/kg/hr (range 1-20)',
            },
            {
                heading: 'Order + have available (not yet running)',
                emphasis: 'info',
                body: '- **Dexmedetomidine** 0.3-1.2 mcg/kg/hr — do NOT start until after reperfusion (avoid sympathectomy)\n- **TXA** 2-10 mg/kg/hr OR **Aminocaproic acid** 10 mg/kg/hr — discuss bolus 50 mg/kg with surgeon. **May increase hepatic artery thrombosis risk — use lowest dose to correct hyperfibrinolysis**\n- Heparin 5-10 U/kg/hr (discuss with surgeon)\n- **Dextran 40** (discuss with surgeon) — weight-tier dosing:\n  - <10 kg: 5 mL/hr ×8 hr → 1.5 mL/hr ×96 hr\n  - 10-20 kg: 10 mL/hr ×8 hr → 3 mL/hr ×96 hr\n  - 20-30 kg: 15 mL/hr ×8 hr → 5 mL/hr ×96 hr\n  - 30-60 kg: 30 mL/hr ×8 hr → 10 mL/hr ×96 hr\n  - >60 kg: 60 mL/hr ×8 hr → 20 mL/hr ×96 hr',
            },
            {
                heading: 'Syringes to draw up',
                emphasis: 'plain',
                body: '- Propofol or other induction agent\n- Lidocaine\n- Rocuronium vs Cisatracurium\n- Fentanyl\n- **Epinephrine** 1-10 mcg/kg/dose: 100 mcg/mL + 10 mcg/mL + 1 mcg/mL syringes\n- **Calcium chloride** 10-20 mg/kg/dose: 5 syringes (dilute to 10 mg/mL if <10 kg, 100 mg/mL if ≥10 kg)\n- Phenylephrine 1-10 mcg/kg/dose\n- Vasopressin 0.005-0.5 U/kg\n- NaHCO₃ 0.5-1 mEq/kg/dose\n- Succinylcholine\n- Albumin 10-20 mL/kg (more if large ascites)',
            },
            {
                heading: 'Available but not drawn up',
                emphasis: 'plain',
                body: '- Magnesium 25-50 mg/kg\n- Lasix 1 mg/kg/dose\n- **Regular insulin 0.1 U/kg IV bolus (max 10 U) with dextrose** — for hyperkalemia treatment\n- Dextrose 50\n- Mannitol 0.5-1 g/kg (if requested)',
            },
            {
                heading: 'Lab tubes to have available',
                emphasis: 'info',
                body: '- 10 purple top (CBC, 1/set)\n- 20 blue top (PT/PTT/INR/fibrinogen + ROTEM, 2/set)\n- 5 lithium green (Chem 10)\n- 20 ABL syringes for ABG/electrolytes/lactate/H&H',
            },
        ],
    },
    {
        ...COMMON,
        id: 'transplant_liver_phases',
        title: 'Liver Transplant — Phase-by-Phase Anesthetic',
        shortDescription: 'Pre-incision → Dissection → Anhepatic → Reperfusion → Closure.',
        tags: ['liver transplant', 'anhepatic', 'reperfusion', 'cross clamp', 'piggyback', 'bicaval', 'rotem', 'pediatric'],
        emergency: false,
        related: ['transplant_liver_setup', 'transplant_liver_intraop'],
        sections: [
            {
                heading: 'Pre-induction → Induction',
                emphasis: 'plain',
                body: '- Patient to OR; call blood bank, blood to OR fridge\n- Zoll pads on as moving over; standard ASA monitors\n- Place NIRS BEFORE induction for baseline\n- Print baseline EKG strip; pre-O2\n- **RSI**\n- Radial A-line (possibly bilateral); large-bore PIV ×2-3 (Micropuncture/RIC for larger IV); RIJ CVC under ultrasound\n- Connect Zoll pad to defibrillator (monitor mode)\n- OG/NG tube; core temp + Foley temp; under + upper Bair hugger; wrap head/extremities in plastic',
            },
            {
                heading: 'Pre-incision',
                emphasis: 'info',
                body: '- Check blood products; consider asking perfusionist to wash pRBCs\n- Prime Belmont with albumin/blood/Normosol → connect to largest bore line; check max infusion rate\n- **Baseline labs**: ROTEM, ABG, coags, CBC, lactate (use 2 ABL syringes — only ABG/Na/K/iCa/glucose/H&H or ABG/lactate per syringe)\n- Transduce A-line + CVP (proximal port); manifold to central distal port/PICC\n- Hotlines + 1 cold line to PIVs; label all lines\n- **Antibiotics + immunosuppressants (likely Solumedrol)** prior to incision\n- Start carrier infusion + pressors as needed\n- Position with all pressure points padded; head/neck/extremities neutral; verify line function',
            },
            {
                heading: 'Time-out',
                emphasis: 'plain',
                body: '- Standard time-out\n- Antibiotics in prior to incision\n- **Planned procedure**: piggyback vs bi-caval clamp\n- Donor liver size/anatomy\n- Risk for blood loss\n- Need for heparin\n- Immunosuppressants\n- Surgical/anesthetic concerns',
            },
            {
                heading: 'Dissection / Pre-Anhepatic',
                emphasis: 'warn',
                body: '- **Replace ascites with albumin**\n- Replace blood loss with pRBC to keep **Hct 25-30**\n- FFP based on field, ROTEM, INR — **goal INR 2-2.5**\n- Usually wait until after reperfusion to give platelets (sequestered in spleen)\n- **Limit crystalloid**\n- Allow CVP to drift to low-normal to reduce blood loss (as long as hemodynamically stable)\n- **Pressor priority**: Vasopressin → Norepinephrine → Epinephrine\n- Full set of labs ≥ q1h; Chem 10 q2-3h; ABG more frequently if abnormal\n- Correct acidosis (NaHCO₃ if pH <7.2 or BE -5; or hyperventilate if mild)\n- Increase calcium replacement during large transfusion (citrate)\n- **Aggressively treat hyperkalemia**: wash pRBC, hyperventilate, dextrose/glucose, calcium, Lasix\n- Bi-caval clamp: preload with fluid; surgeon test-clamps first; consider epi at this time to shift K + ↑ CO\n- Cross-clamp → ↓ BP, ↓ EtCO2, compensatory tachycardia (peds + portal HTN tolerate well)',
            },
            {
                heading: 'Anhepatic (~30 min)',
                emphasis: 'critical',
                body: '- IVC + portal vein re-anastomosed\n- ↑ Calcium replacement (further fall)\n- Acidosis worsens — hyperventilate, NaHCO₃ if pH <7.2 or BE >-5\n- Correct hyperkalemia\n- Limit fluid to prevent engorgement of new liver (especially pRBC — sequester in bowel during portal vein clamp)\n- Heparin bolus may be requested before liver out: **50 U/kg bolus → 5-10 U/kg/hr infusion**\n- **15 min before reperfusion**: draw ABG; have epi/calcium/bicarb/atropine available; defibrillator on; consider decreasing volatile; **FiO2 → 1.0**',
            },
            {
                heading: 'Neohepatic / Reperfusion',
                emphasis: 'critical',
                body: '- Surgeon flushes donor liver immediately prior\n- **Unclamp IVC** → ↑ preload, ↑ BP\n- **Unclamp portal vein** → ↑ EtCO2, **bradycardia + hypotension**\n- **Give epi (start 0.1 mcg/kg) bolus — don\'t wait for the bradycardia**\n- Watch T-wave; give calcium if T-wave changes\n- Large liver to small patient → ↑ reperfusion syndrome risk; be ready to transfuse to fill new liver\n- Labs **10 min after reperfusion, then q30min**\n- Trend lactate for liver function\n- Limit fluids to prevent venous congestion of new liver\n- **Glucose < 200**: insulin resistance + steroid + stress + glycogen release → may need insulin infusion\n- Continue FFP ± cryo (new liver doesn\'t produce factors immediately); INR goal 2.0-2.5\n- Replace blood loss → keep Hct 25-30 (peds at ↑ hepatic artery thrombosis risk; don\'t over-correct)\n- **Correct thrombocytopenia at this time**',
            },
            {
                heading: 'Closure / Transport',
                emphasis: 'success',
                body: '- May use mesh closure if liver is large compared to patient — watch airway pressures during closure\n- Simplify lines/drips to ready for transport\n- **Start dexmedetomidine infusion**\n- Prepare transport drugs + emergency airway equipment\n- Call for transport monitor / ICU bed / O2 tank\n- Transport to ICU with emergency airway + drugs\n- **Sign-out: Anesthesia attending to PICU attending**',
            },
        ],
    },
    {
        ...COMMON,
        id: 'transplant_donor_procurement',
        title: 'Organ Procurement — DBD Donor Care',
        shortDescription: 'Donation after brain-death (NOT cardiac death). Maintain hemodynamics + endocrine to cross-clamp.',
        tags: ['organ procurement', 'donor', 'brain death', 'dbd', 'lifeline', 'orc', 'methylprednisolone', 'mannitol', 'heparin', 'cross clamp'],
        emergency: false,
        sections: [
            {
                heading: 'Scope',
                emphasis: 'critical',
                body: 'Applies to **donation after brain-death (DBD) only** — does NOT apply to Donation after Cardiac Death (separate policy on the Anesthesiology Sharepoint site).\n\nBrain death determined per NCH "Neurologic Criteria to Determine Death" (Patient/Family Care, Death Issues, #12:11) — generally requires **two separate examinations** after ensuring no metabolic or medication confounders. Donor brought to OR on ventilator. Procurement runs **2-6 hours**.',
            },
            {
                heading: 'Hand-off + transport',
                emphasis: 'info',
                body: '- Routine bedside hand-off in PICU between anesthesia, PICU team (bedside RN + fellow/attending), and the **Organ Recovery Coordinator (ORC)** — all present\n- Topics: current/planned medications + locations, transport logistics including **Honor Walk**\n- Transport to OR with anesthesia + ORC\n- **Maintain a complete anesthesia record** — may need to print and provide to ORC',
            },
            {
                heading: 'Continue from PICU',
                emphasis: 'info',
                body: '- Vasoactive agents being used to maintain BP\n- Endocrine support (levothyroxine or hydrocortisone) if started in ICU\n- If DI present: continue **vasopressin + UOP replacement** per PICU recs',
            },
            {
                heading: 'Intra-op meds (per LOOP protocols)',
                emphasis: 'warn',
                body: '- **Methylprednisolone 500 mg + Mannitol 1 g/kg (max 100 g, 20% solution)** at the start of the case\n- **Heparin 400 U/kg (max 30,000 U for adults)** through central line **3 min before aortic cross-clamp**, as directed by ORC/recovery surgeon\n- **Communicate with Lifeline when heparin is administered**\n- Pancreas donation: betadine 120 mL via NG, then NG clamped (per surgeon)\n- Lung donation: anesthesiologist may give Prostaglandin 500 mcg (lung recovery team supplies)',
            },
            {
                heading: 'Hemodynamic + ventilation targets',
                emphasis: 'warn',
                body: '- 2 large-bore PIV ± central + arterial cannula (preferably ABOVE the waist)\n- Esophageal or Foley temp probe\n- NMBA prior to incision (relax abdominal musculature, ablate spinal reflex motor response)\n- **SBP ≥ 100 mmHg / MAP 70-90 / CVP 5-12** with crystalloid + colloid — **do NOT use Hespan**\n- 0.9% NS / LR / Normosol-R via PIVs as needed\n- Dopamine if fluids fail; epinephrine if dopamine 10-15 mcg/kg/min ineffective\n- **UOP > 100 mL/hr (adolescent) or > 2 mL/kg/hr (younger)** — replace mL-for-mL hourly until cross-clamp\n- O2 sat 100% unless donor surgeons direct otherwise\n- **Avoid disruption of breathing circuit / pulmonary de-recruitment** — periodic recruitment maneuvers may be requested',
            },
            {
                heading: 'Cross-clamp + end of case',
                emphasis: 'critical',
                body: '- Sequence: abdominal team begins dissection (heart/lung team present for gross exam)\n- Lung team may do limited bronchoscopy per their protocol\n- All teams complete dissections; ready for aortic cross-clamp\n- Anesthesiologist gives heparin; aorta cannulated\n- **Pull back central lines BEFORE cross-clamp**\n- Lung donors: continue ventilation **until directed by lung recovery team**\n- After cross-clamp (or last ventilation if lungs procured): **disconnect ETT, turn off all infusions, monitors, ventilator**\n- End anesthesia record + leave OR\n- ORC requests a copy; LOOP event in EMR allows record closed without postoperative note',
            },
            {
                heading: 'Have available',
                emphasis: 'plain',
                body: '- 8-10 L isotonic fluids (NS / LR / Normosol-R)\n- NMBA\n- Heparin, mannitol 20%, methylprednisolone\n- Vasoactive agents (dopamine ± epinephrine)\n- Blood on hold (LOOP ORC ascertains availability)',
            },
        ],
    },
    {
        ...COMMON,
        id: 'transplant_kidney_pointer',
        title: 'Kidney Transplant + Donor Protocols',
        shortDescription: 'Source is .doc (binary) — needs manual transcription.',
        tags: ['kidney transplant', 'renal transplant', 'donor', 'recipient'],
        emergency: false,
        sections: [
            {
                heading: 'Source not yet transcribed',
                emphasis: 'warn',
                body: 'The "Kidney Transplant and Donor Protocols CB Edits 03.01.23.doc" is in legacy .doc format and did not auto-extract. Open the original under `original_pictures/Sharepoint/Transplant/Transplant Intraoperative Protocols & Guidelines/` and transcribe key sections (recipient hemodynamic targets, immunosuppression timing, anti-rejection agents, fluid management around clamp/unclamp, post-op disposition) here on next pass.',
            },
        ],
    },
    {
        ...COMMON,
        id: 'transplant_abo_verif_pointer',
        title: 'Pre-Transplant ABO Verification',
        shortDescription: 'Source PDF extracted empty (image-based) — see Sharepoint original.',
        tags: ['abo', 'crossmatch', 'verification', 'safety'],
        emergency: false,
        sections: [
            {
                heading: 'Source not yet transcribed',
                emphasis: 'warn',
                body: 'The Pre-Transplant ABO Verification PDF returned no extractable text (likely image-only). Open the original under `original_pictures/Sharepoint/Transplant/Transplant Perioperative Considerations/` for the verification workflow and add structured steps here once transcribed.',
            },
        ],
    },
];
