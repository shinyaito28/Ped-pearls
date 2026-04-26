// Colorectal hub — catalog entries.
// Source: NCH Sharepoint / Colorectal / Colorectal Protocols & Guidelines /
//   - Colorectal ERAS Ane protocol.docx
//   - Guide- Green dye in Colorectal.pdf (Novadaq SPY Elite® ICG protocol)
//   - Colorectal excel sheet.xlsx (binary tracker — not transcribed)

const COMMON = {
    hub: 'colorectal',
    kind: 'catalog',
    weightAware: false,
    ageRules: null,
    source: 'NCH Sharepoint / Colorectal Protocols & Guidelines',
    lastReviewed: '2026-04',
};

export const entries = [
    {
        ...COMMON,
        id: 'colorectal_eras',
        title: 'Colorectal ERAS — Anesthesia Protocol',
        shortDescription: '3hr pre-op buffer; gabapentin + APAP pre-op; epidural OR TAP OR lido infusion; ket+precedex; fluid 3-4 mL/kg/hr.',
        tags: ['colorectal', 'colorectal eras', 'gabapentin colorectal', 'mid thoracic epidural', 'tap block', 'lidocaine infusion colorectal', 'ketamine bolus', 'precedex colorectal', 'limit fluids', 'no ng tube'],
        emergency: false,
        sections: [
            {
                heading: 'Pre-op (patient must be in pre-op 3 hr before case)',
                emphasis: 'info',
                body: '- **Electrolyte-based clears until 2 hr pre-op**\n- **Gabapentin 10 mg/kg PO (max 600 mg) 3 hr pre-op**\n- **Acetaminophen 10 mg/kg PO or rectal**',
            },
            {
                heading: 'Intra-op',
                emphasis: 'warn',
                body: '- **Decadron 0.5 mg/kg IV (max 10 mg)**\n- **Regional choice (1 of 3)**:\n  - **Mid-thoracic epidural**\n  - **Bilateral TAP blocks**\n  - **Lidocaine infusion 1 mg/kg bolus → 1 mg/kg/hr**\n- **Ketamine bolus 1 mg/kg after induction** (optional ketamine infusion **0.5 mg/kg/hr**, DC at start of closure)\n- **Precedex bolus 0.5 mcg/kg + infusion 0.5 mcg/kg/hr** → **reduce to 0.3 mcg/kg/hr 1 hr before closure** → DC at end of case\n- **Ketorolac 0.5 mg/kg (max 30 mg) towards end of surgery / start of closure** — confirm with surgeon',
            },
            {
                heading: 'Fluid + supportive',
                emphasis: 'warn',
                body: '- **Limit fluid administration to 3-4 mL/kg/hr** for the case\n- **Albumin** for persistent hypotension\n- **Blood products** if necessary\n- **Maintain normothermia**\n- **Avoid nasogastric tubes**\n- Narcotic amount + type at anesthesia team\'s discretion — but **attempt to limit narcotics** + use other adjunctive medications above',
            },
            {
                heading: 'Reminder',
                emphasis: 'plain',
                body: '*"These are basic guidelines and patient care/safety is always at the discretion of the individual anesthesiologist caring for the patient. We are trying to decrease narcotic use as tolerated by each patient."* — per NCH source',
            },
        ],
    },
    {
        ...COMMON,
        id: 'colorectal_green_dye',
        title: 'Green Dye in Colorectal (SPY Elite® ICG)',
        shortDescription: 'ICG via SPY Elite® System for colorectal anastomosis perfusion. 5-10 mg per image sequence.',
        tags: ['icg', 'spy elite', 'novadaq', 'green dye', 'fluorescence', 'anastomosis perfusion', 'colorectal imaging'],
        emergency: false,
        related: ['uro_icg_fluorescent_imaging'],
        sections: [
            {
                heading: 'What it is',
                emphasis: 'info',
                body: '**Indocyanine Green (ICG)** with the **SPY Elite® System** (Novadaq) — used during colorectal procedures for **intraoperative perfusion assessment** of the anastomosis (assesses tissue viability before completing the join).\n\nSame drug as the da Vinci ICG protocol (`uro_icg_fluorescent_imaging`) but different device + injection sequence.',
            },
            {
                heading: 'Preparation',
                emphasis: 'plain',
                body: '- ICG mixed with the **10 mL pH-balanced aqueous solution** supplied by the manufacturer\n- **Use within 6 hours** of reconstitution\n- **Caution in patients with iodide allergy** (hospital pre-treatment protocol may apply)',
            },
            {
                heading: 'Dosing',
                emphasis: 'warn',
                body: '- **Maximum: 2 mg/kg** (as for all ICG uses)\n- **Average dose per image sequence: 5-10 mg**\n- Refer to **SPY Elite® System Operator\'s Manual** + Kit IFU for procedure-specific doses\n- **Pre-draw individual ICG doses + saline flushes into separate syringes** in advance to facilitate rapid on-demand administration',
            },
            {
                heading: 'Injection protocol — communication-driven',
                emphasis: 'critical',
                body: '- **Inject ONLY when surgeon + SPY operator say "inject"**\n- Each dose must be **a TIGHT BOLUS** (rapid plasma protein binding required)\n- **Central line OR peripheral IV** (port close to cannula for rapid infusion)\n- **Anesthesia communicates with SPY operator** that ICG is being injected\n- **Immediately follow with 10 mL bolus saline flush** (a free-flowing IV is NOT a substitute — the tubing must be cleared rapidly)\n- **Anesthesia communicates with SPY operator** that the flush is being injected\n- Communication is critical: image capture timing depends on injection timing',
            },
            {
                heading: 'Adverse effects',
                emphasis: 'plain',
                body: '- **Brief fluctuation in pulse oximeter readings** immediately after administration (transient, returns to baseline)\n- Hypersensitivity in iodide-allergic patients — see Preparation',
            },
            {
                heading: 'Source',
                emphasis: 'plain',
                body: 'Novadaq SPY Elite® System "Anesthesia Quick Reference Guide for Intraoperative Perfusion Assessment". Customer Service: 1-800-230-3352 (option 2). The device is intended for plastic, reconstructive, micro, GI, and cardiovascular procedures under physician direction.',
            },
        ],
    },
    {
        ...COMMON,
        id: 'colorectal_tracker_pointer',
        title: 'Colorectal Tracker (Excel)',
        shortDescription: '.xlsx admin tracker — not bedside reference.',
        tags: ['colorectal tracker', 'admin', 'spreadsheet'],
        emergency: false,
        sections: [
            {
                heading: 'Source pointer',
                emphasis: 'plain',
                body: 'The "Colorectal excel sheet.xlsx" is an administrative tracker — not bedside reference. Available locally under `original_pictures/Sharepoint/Colorectal excel sheet.xlsx` for sarcoma + colorectal team use.',
            },
        ],
    },
];
