// Registry mapping flowchart entry `component` strings to React components.
//
// To add a flowchart:
//   1. Build src/data/specialty/flowcharts/<name>.js (exports `entry`)
//   2. Build src/components/specialty/<Name>Card.jsx
//   3. Import + register the component below
//   4. Append the `entry` to `flowcharts` in src/data/specialty/index.js

import DiFlowchartCard from './DiFlowchartCard';
import MediastinalMassCard from './MediastinalMassCard';
import EmergencyCesareanCard from './EmergencyCesareanCard';
import MaternalFetalCard from './MaternalFetalCard';
import CraniofacialTransfusionCard from './CraniofacialTransfusionCard';
import OsaPatFlowsheetCard from './OsaPatFlowsheetCard';
import ImriChecklistCard from './ImriChecklistCard';
import IrHeparinStrokeCard from './IrHeparinStrokeCard';

export const flowchartComponents = {
    DiFlowchartCard,
    MediastinalMassCard,
    EmergencyCesareanCard,
    MaternalFetalCard,
    CraniofacialTransfusionCard,
    OsaPatFlowsheetCard,
    ImriChecklistCard,
    IrHeparinStrokeCard,
};
