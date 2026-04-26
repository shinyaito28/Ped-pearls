// Aggregator for the Specialty tab. Hubs are the launchpad cards;
// entries are flowcharts (Phase 1) and catalog manuals (Phase 2+).
//
// The hub registry is the single source of truth for the launchpad UI,
// per-hub colour accents, and the search index's hub filtering.

export const hubs = [
    { id: 'entpulm',    label: 'ENT / Pulm / OMFS',    labelJa: '耳鼻 / 呼吸 / OMFS',    iconName: 'Stethoscope', accent: 'cyan',    description: 'Mediastinal mass, jet vent, OSA, orthognathic',                       descriptionJa: '縦隔腫瘤、ジェット換気、OSA、顎矯正手術' },
    { id: 'fetal',      label: 'Fetal / Maternal',     labelJa: '胎児 / 母体',           iconName: 'Baby',        accent: 'pink',    description: 'Maternal-fetal flow, emergency cesarean',                              descriptionJa: '胎児手術フロー、緊急帝王切開' },
    { id: 'neuro',      label: 'Neuro / Craniofacial', labelJa: '神経 / 頭蓋顔面',       iconName: 'Brain',       accent: 'violet',  description: 'AFM, ROSA, seizure ppx, DI flowchart, craniofacial transfusion',       descriptionJa: 'AFM、ROSA、痙攣予防、DI フローチャート、頭蓋顔面輸血' },
    { id: 'outofor',    label: 'Out-of-OR',            labelJa: '院外/別棟',             iconName: 'MapPin',      accent: 'sky',     description: 'MRI/iMRI, IR, ECT, GI, OSU',                                           descriptionJa: 'MRI/iMRI、IR、ECT、GI、OSU' },
    { id: 'preop',      label: 'Pre-op / PAT',         labelJa: '術前 / PAT',            iconName: 'ClipboardCheck', accent: 'slate', description: 'PAT screening, OSA flowsheet',                                       descriptionJa: 'PATスクリーニング、OSAフローシート' },
    { id: 'hematology', label: 'Hematology / Onc',     labelJa: '血液 / 腫瘍',           iconName: 'Droplets',    accent: 'rose',    description: 'JW, sickle cell, bleeding, mediastinal mass, ERAS',                    descriptionJa: 'JW患者、鎌状赤血球症、出血、縦隔腫瘤、ERAS' },
    { id: 'endocrine',  label: 'Endocrine',            labelJa: '内分泌',                iconName: 'Activity',    accent: 'amber',   description: 'DM, adrenal, DI, hypertonic saline',                                   descriptionJa: '糖尿病、副腎不全、DI、高張食塩水' },
    { id: 'transplant', label: 'Transplant',           labelJa: '移植',                  iconName: 'Replace',     accent: 'emerald', description: 'Kidney, liver donor & recipient',                                      descriptionJa: '腎臓、肝臓ドナー・レシピエント' },
    { id: 'ortho',      label: 'Orthopedics',          labelJa: '整形外科',              iconName: 'Bone',        accent: 'orange',  description: 'Spinal fusion, IONM, limb procedures',                                 descriptionJa: '脊椎固定、IONM、四肢手術' },
    { id: 'gensurg',    label: 'General Surgery',      labelJa: '一般外科',              iconName: 'Scissors',    accent: 'teal',    description: 'CDH, bariatric, IBD ERAS, appendectomy',                               descriptionJa: 'CDH、肥満手術、IBD ERAS、虫垂切除' },
    { id: 'metabolic',  label: 'Metabolic / Genetic',  labelJa: '代謝 / 遺伝',           iconName: 'Dna',         accent: 'fuchsia', description: 'MCAD, mito, ketogenic, mastocytosis, MPS III',                         descriptionJa: 'MCAD、ミトコンドリア病、ケトン食、肥満細胞症、MPS III' },
    { id: 'procedures', label: 'Pain Procedures',      labelJa: '疼痛・手技',            iconName: 'Anchor',      accent: 'purple',  description: 'Pectus Nuss, TPIAT, dorsal rhizotomy, hemipelvectomy',                  descriptionJa: 'Nuss法、TPIAT、後根切断術、半骨盤切除' },
    { id: 'cardiacsub', label: 'Cardiac Subspecialty', labelJa: '心臓専門領域',          iconName: 'HeartPulse',  accent: 'red',     description: 'CHD case-based, common congenital, Long QT',                           descriptionJa: 'CHD症例別、主要先天性心疾患、Long QT' },
    { id: 'urology',    label: 'Urology',              labelJa: '泌尿器',                iconName: 'Filter',      accent: 'yellow',  description: 'Bladder exstrophy, robotic, ICG fluorescent, pyeloplasty',             descriptionJa: '膀胱外反、ロボット、ICG蛍光、腎盂形成' },
    { id: 'colorectal', label: 'Colorectal',           labelJa: '大腸',                  iconName: 'Donut',       accent: 'lime',    description: 'Colorectal ERAS, green dye, motility',                                 descriptionJa: '大腸 ERAS、緑色蛍光、運動性' },
    { id: 'asc',        label: 'ASC (Ambulatory)',     labelJa: 'ASC (外来手術)',        iconName: 'Clipboard',   accent: 'indigo',  description: 'Ambulatory Surgery Center triage + OSA PAT',                           descriptionJa: '外来手術センター適格判定 + OSA PAT' },
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
import { entries as cardiacsubEntries } from './cardiacsub';
import { entries as urologyEntries } from './urology';
import { entries as colorectalEntries } from './colorectal';
import { entries as ascEntries } from './asc';

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
    ...cardiacsubEntries,
    ...urologyEntries,
    ...colorectalEntries,
    ...ascEntries,
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
