// Aggregator for the Specialty tab. Hubs are the launchpad cards;
// entries are flowcharts (Phase 1) and catalog manuals (Phase 2+).
//
// The hub registry is the single source of truth for the launchpad UI,
// per-hub colour accents, and the search index's hub filtering.

export const hubs = [
    { id: 'entpulm',    label: 'ENT / Pulm / OMFS',  iconName: 'Stethoscope', accent: 'cyan',    description: 'Mediastinal mass, jet vent, OSA, orthognathic' },
    { id: 'fetal',      label: 'Fetal / Maternal',   iconName: 'Baby',        accent: 'pink',    description: 'Maternal-fetal flow, emergency cesarean' },
    { id: 'neuro',      label: 'Neuro / Craniofacial', iconName: 'Brain',     accent: 'violet',  description: 'AFM, ROSA, seizure ppx, DI flowchart, craniofacial transfusion' },
    { id: 'outofor',    label: 'Out-of-OR',          iconName: 'MapPin',      accent: 'sky',     description: 'MRI/iMRI, IR, ECT, GI, OSU' },
    { id: 'preop',      label: 'Pre-op / PAT',       iconName: 'ClipboardCheck', accent: 'slate', description: 'PAT screening, OSA flowsheet' },
    { id: 'hematology', label: 'Hematology / Onc',   iconName: 'Droplets',    accent: 'rose',    description: 'JW, sickle cell, bleeding, mediastinal mass, ERAS' },
    { id: 'endocrine',  label: 'Endocrine',          iconName: 'Activity',    accent: 'amber',   description: 'DM, adrenal, DI, hypertonic saline' },
    { id: 'transplant', label: 'Transplant',         iconName: 'Replace',     accent: 'emerald', description: 'Kidney, liver donor & recipient' },
    { id: 'ortho',      label: 'Orthopedics',        iconName: 'Bone',        accent: 'orange',  description: 'Spinal fusion, IONM, limb procedures' },
    { id: 'gensurg',    label: 'General Surgery',    iconName: 'Scissors',    accent: 'teal',    description: 'CDH, bariatric, IBD ERAS, appendectomy' },
    { id: 'metabolic',  label: 'Metabolic / Genetic', iconName: 'Dna',        accent: 'fuchsia', description: 'MCAD, mito, ketogenic, mastocytosis, MPS III' },
    { id: 'procedures', label: 'Pain Procedures',    iconName: 'Anchor',      accent: 'purple',  description: 'Pectus Nuss, TPIAT, dorsal rhizotomy, hemipelvectomy' },
];

// --- Entries (flowcharts populated in Phase 1, catalog in Phase 2+) ---------
// Each flowchart module exports `entry` and any supporting structured data.
// To add a flowchart: import it here and append to `flowcharts`.

import { entry as diFlowchart } from './flowcharts/di_flowchart';
import { entry as mediastinalMass } from './flowcharts/mediastinal_mass';
import { entry as emergencyCesarean } from './flowcharts/emergency_cesarean';
import { entry as maternalFetal } from './flowcharts/maternal_fetal_flow';
import { entry as craniofacialTransfusion } from './flowcharts/craniofacial_transfusion';
import { entry as osaPatFlowsheet } from './flowcharts/osa_pat_flowsheet';
import { entry as imriChecklist } from './flowcharts/imri_checklist';
import { entry as irHeparinStroke } from './flowcharts/ir_heparin_stroke';

import { entries as hematologyEntries } from './hematology';
import { entries as endocrineEntries } from './endocrine';
import { entries as neuroEntries } from './neuro';
import { entries as outoforEntries } from './outofor';
import { entries as fetalEntries } from './fetal';
import { entries as transplantEntries } from './transplant';
import { entries as orthoEntries } from './ortho';
import { entries as gensurgEntries } from './gensurg';
import { entries as entpulmEntries } from './entpulm';
import { entries as metabolicEntries } from './metabolic';
import { entries as proceduresEntries } from './procedures';
import { entries as preopEntries } from './preop';

export const flowcharts = [
    mediastinalMass,
    emergencyCesarean,
    maternalFetal,
    diFlowchart,
    craniofacialTransfusion,
    osaPatFlowsheet,
    imriChecklist,
    irHeparinStroke,
];
export const catalog = [
    ...hematologyEntries,
    ...endocrineEntries,
    ...neuroEntries,
    ...outoforEntries,
    ...fetalEntries,
    ...transplantEntries,
    ...orthoEntries,
    ...gensurgEntries,
    ...entpulmEntries,
    ...metabolicEntries,
    ...proceduresEntries,
    ...preopEntries,
];

export const allEntries = [...flowcharts, ...catalog];

export const entriesByHub = (hubId) =>
    allEntries.filter(e => e.hub === hubId);

export const emergencyEntries = () =>
    allEntries.filter(e => e.emergency);

export const findEntry = (id) =>
    allEntries.find(e => e.id === id);

export const findHub = (id) =>
    hubs.find(h => h.id === id);
