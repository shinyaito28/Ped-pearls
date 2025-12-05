import React from 'react';
import { FolderOpen, Trash2, Save } from 'lucide-react';
import { usePatient } from '../context/PatientContext';

const ProfileModal = ({ onClose }) => {
    const { savedProfiles, loadProfile, deleteProfile, saveProfile } = usePatient();

    const handleLoad = (p) => {
        loadProfile(p);
        onClose();
    };

    const handleSave = () => {
        saveProfile();
        // Don't close immediately so user sees it saved? Or close? User preference usually close.
    };

    return (
        <div className="absolute top-14 right-4 z-50 bg-white shadow-xl border border-slate-200 rounded-lg p-4 w-64">
            <h4 className="font-bold text-slate-700 mb-2 text-sm flex items-center gap-2">
                <FolderOpen size={16} /> Saved Profiles
            </h4>
            {savedProfiles.length === 0 && <div className="text-xs text-slate-400 italic">No saved profiles.</div>}
            <ul className="space-y-2 max-h-48 overflow-y-auto">
                {savedProfiles.map(p => (
                    <li key={p.id} className="flex justify-between items-center bg-slate-50 p-2 rounded hover:bg-slate-100">
                        <button onClick={() => handleLoad(p)} className="text-xs text-left font-bold text-slate-700 flex-1">
                            {p.name}
                        </button>
                        <button onClick={() => deleteProfile(p.id)} className="text-slate-400 hover:text-red-500">
                            <Trash2 size={14} />
                        </button>
                    </li>
                ))}
            </ul>
            <button onClick={handleSave} className="mt-3 w-full bg-teal-600 text-white text-xs font-bold py-2 rounded flex items-center justify-center gap-2 hover:bg-teal-700">
                <Save size={14} /> Save Current
            </button>
        </div>
    );
};

export default ProfileModal;
