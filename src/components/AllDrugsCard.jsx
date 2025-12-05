import React, { useState, useMemo } from 'react';
import { Syringe, Search, Pin, Clock } from 'lucide-react';
import { useDrugList } from '../hooks/useDrugList';

const AllDrugsCard = () => {
    const drugs = useDrugList('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [drugCategoryFilter, setDrugCategoryFilter] = useState('All');
    const [pinnedDrugs, setPinnedDrugs] = useState(['Epinephrine (Cardiac Arrest)', 'Atropine', 'Succinylcholine', 'Propofol (Induction)']);

    const categories = ['All', 'Emergency', 'Sedation', 'Pain', 'CV', 'Neuro', 'Antibiotic', 'Relaxant', 'Reversal', 'Other'];

    const filteredDrugs = useMemo(() => {
        let list = drugs;
        if (drugCategoryFilter !== 'All') {
            list = list.filter(d => d.cat === drugCategoryFilter);
        }
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            list = list.filter(d => d.name.toLowerCase().includes(q) || d.cat.toLowerCase().includes(q));
        }
        return list.sort((a, b) => {
            const ap = pinnedDrugs.includes(a.name);
            const bp = pinnedDrugs.includes(b.name);
            if (ap && !bp) return -1;
            if (!ap && bp) return 1;
            return 0;
        });
    }, [drugs, searchQuery, pinnedDrugs, drugCategoryFilter]);

    const togglePin = (name) => {
        setPinnedDrugs(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
    };

    return (
        <div className="bg-white rounded border border-slate-200 shadow-sm">
            <div className="p-3 border-b bg-slate-50 flex flex-col gap-3 sticky top-0 z-10">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-slate-700 flex items-center gap-2"><Syringe size={18} /> All Drugs</h3>
                    {/* Search Bar */}
                    <div className="relative">
                        <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="text" placeholder="Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-32 md:w-48 text-sm border rounded pl-8 pr-2 py-1" />
                    </div>
                </div>
                {/* Category Filters */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                    {categories.map(c => (
                        <button
                            key={c}
                            onClick={() => setDrugCategoryFilter(c)}
                            className={`text-[10px] px-2 py-1 rounded whitespace-nowrap border ${drugCategoryFilter === c ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-slate-600 border-slate-200'}`}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            </div>
            <div className="divide-y divide-slate-100 max-h-[60vh] overflow-y-auto">
                {filteredDrugs.map((d) => (
                    <div key={d.id} className={`p-3 flex justify-between items-center hover:bg-slate-50 ${pinnedDrugs.includes(d.name) ? 'bg-amber-50/50' : ''}`}>
                        <div className="flex-1 mr-2">
                            <div className="font-bold text-sm text-slate-800 flex items-center gap-2">
                                <button onClick={() => togglePin(d.name)} className={pinnedDrugs.includes(d.name) ? 'text-amber-500' : 'text-slate-300'}>
                                    <Pin size={14} fill={pinnedDrugs.includes(d.name) ? 'currentColor' : 'none'} />
                                </button>
                                {d.name}
                                {d.isInfusion && <Clock size={12} className="text-blue-500" />}
                            </div>
                            <div className="text-[10px] text-slate-500">{d.note} ({d.realDose})</div>
                        </div>
                        <div className="text-right">
                            <div className="font-bold text-teal-700 whitespace-nowrap">{d.calc}</div>
                            <div className="text-[9px] text-slate-400 font-mono hidden sm:block">{d.formula}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllDrugsCard;
