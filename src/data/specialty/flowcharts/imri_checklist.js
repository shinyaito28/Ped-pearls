// iMRI Pre-Scanning Checklist — NCH Department of Anesthesiology.
// Source: NCH Sharepoint / Out of OR / MRI / iMRI Pre-Scanning Checklist_Feb 2025.pdf
//
// MR-safety checklist run before sliding the patient into the iMRI scanner.

export const entry = {
    id: 'flow_imri_checklist',
    hub: 'outofor',
    kind: 'flowchart',
    title: 'iMRI Pre-Scanning Checklist',
    shortDescription: 'STOP → THINK → ACT — MR-safety sweep before iMRI scan.',
    tags: ['imri', 'mri', 'magnet', 'mr safety', 'ferromagnetic', '5 g line', 'pre-scan', 'checklist', 'iMRI OR'],
    emergency: false,
    weightAware: false,
    ageRules: null,
    source: 'NCH Sharepoint / Out of OR / MRI',
    lastReviewed: '2026-04',
    component: 'ImriChecklistCard',
};

export const introSteps = [
    'STOP — pause everything before the scan',
    'THINK — focus on completing this checklist',
    'ACT — perform the checklist below',
];

export const checklist = [
    'Ask all non-essential personnel to leave the room',
    'Anesthesiologist alerted that pre-scanning is starting (present if timing/staffing permits)',
    'Patient is hemodynamically stable',
    'Anesthesia needle count is correct',
    'Patient does NOT have a reinforced ETT',
    'Top of the anesthesia machine is clear (work tray + machine top)',
    'Anesthesia backstand is clear and closed',
    'Nerve stimulator and leads are removed and stored in the closed backstand',
    'ABL machine is out of the room',
    'Bair hugger turned off and tethered',
    'Patient core temperature does not exceed 37 °C',
    'Invivo monitor is plugged into the boom (black outlet)',
    'Fluid warmer is off and either tethered or removed',
    'Alaris pumps removed from the room',
    'Anesthesia machine wheels are locked',
    'Anesthesia boom is outside of the 5 G line',
    'Anesthesia computer is tethered',
    'Green tackle box is stored outside of the 5 G line',
    'Walkies, voceras, pagers, stethoscopes, cell phones, and metal badge holders are stowed',
    'No jewelry — watches, earrings, necklaces',
    'CHECK POCKETS!',
];

export const closing = 'List complete — perform a final visual sweep. Anesthesia team is ready for scanning.';

export const STORAGE_KEY = 'pp_imri_checklist_v1';
