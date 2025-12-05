import React from 'react';
import { Info, AlertTriangle, ShieldCheck } from 'lucide-react';

const ReferenceCard = () => {
    return (
        <div className="space-y-4">
            {/* MH Protocol */}
            <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
                <h3 className="font-bold text-rose-800 flex items-center gap-2 border-b border-rose-200 pb-2 mb-3">
                    <AlertTriangle size={18} /> Malignant Hyperthermia
                </h3>
                <div className="text-sm space-y-2 text-rose-900">
                    <div className="font-bold">Hotline: 800-644-9737 (USA)</div>
                    <ul className="list-disc pl-5 space-y-1 text-xs">
                        <li><b>Signs:</b> Tachycardia, ↑↑EtCO2, Rigidity, Acidosis, Hyperkalemia.</li>
                        <li><b>Treatment:</b></li>
                        <ol className="list-decimal pl-5 space-y-0.5">
                            <li>Stop Volatile agents / Succinylcholine. Hyperventilate 100% O2.</li>
                            <li><b>Dantrolene 2.5 mg/kg</b> IV PRN.</li>
                            <li>Cool (Ice packs, Lavage). Goal {'<'}38°C.</li>
                            <li>Treat Acidosis (Bicarb), Hyperkalemia (Ca, Insulin/Gluc).</li>
                        </ol>
                    </ul>
                </div>
            </div>

            {/* Endocarditis */}
            <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
                <h3 className="font-bold text-sky-800 flex items-center gap-2 border-b border-sky-200 pb-2 mb-3">
                    <ShieldCheck size={18} /> Infective Endocarditis Prophylaxis
                </h3>
                <div className="text-xs text-sky-900 space-y-2">
                    <p><b>High Risk Conditions Only:</b> Prosthetic valves, Previous IE, Unrepaired Cyanotic CHD, Repaired CHD with residual defects.</p>
                    <p><b>Procedures:</b> Dental (gingival manipulation), Respiratory tract incision/biopsy, Infected skin/musculoskeletal tissue.</p>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="bg-white p-2 rounded">
                            <div className="font-bold">Oral Ppx</div>
                            <div>Amoxicillin 50 mg/kg</div>
                            <div className="text-[9px] text-slate-400">PCN Allergy: Clinda 20mg/kg, Azithro 15mg/kg</div>
                        </div>
                        <div className="bg-white p-2 rounded">
                            <div className="font-bold">IV/IM Ppx</div>
                            <div>Ampicillin / Cefazolin 50 mg/kg</div>
                            <div className="text-[9px] text-slate-400">PCN Allergy: Clinda 20mg/kg, Cefazolin 50mg/kg</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReferenceCard;
