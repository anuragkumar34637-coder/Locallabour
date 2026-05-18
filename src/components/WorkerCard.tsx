import React from 'react';
import { Star, MapPin, CheckCircle2, Phone, Calendar } from 'lucide-react';
import { AppUser, WorkerProfile } from '../types';
import { TRANSLATIONS } from '../constants';
import { motion } from 'motion/react';

interface WorkerCardProps {
  worker: AppUser & { profile: WorkerProfile };
  lang: 'en' | 'hi';
  onBook: () => void;
  onView: () => void;
}

export default function WorkerCard({ worker, lang, onBook, onView }: WorkerCardProps) {
  const t = TRANSLATIONS[lang];
  const p = worker.profile;

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white border-4 border-slate-200 p-6 shadow-sm hover:border-[#1E3A8A] transition-all group"
    >
      <div className="flex items-start gap-5 mb-5">
        <div className="w-24 h-24 bg-slate-100 flex-none border-2 border-slate-100 overflow-hidden">
          <img src={worker.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${worker.uid}`} alt={worker.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
        </div>

        <div className="flex-1 min-w-0 flex flex-col h-24">
          <div className="flex justify-between items-start mb-1">
            <h4 className="font-black text-xl tracking-tight text-slate-900 truncate">{worker.name}</h4>
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-sm uppercase tracking-widest ${
              p.availability ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
            }`}>
              {p.availability ? 'Active Now' : 'Busy'}
            </span>
          </div>

          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 truncate">
            {p.category} Specialist
          </p>

          <div className="mt-auto flex items-center gap-1.5 text-[#EAB308]">
             <span className="text-sm font-black text-slate-900">{p.rating}</span>
             <div className="flex">
               {[...Array(5)].map((_, i) => (
                 <Star key={i} size={12} fill={i < Math.floor(p.rating) ? "currentColor" : "none"} stroke="currentColor" />
               ))}
             </div>
             <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">({p.reviewCount})</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6 text-xs font-bold text-slate-500 bg-slate-50 p-2 border border-slate-100">
        <MapPin size={14} className="text-[#1E3A8A]" />
        <span className="truncate">{worker.location?.address}</span>
      </div>

      <div className="flex gap-2">
        <button 
          onClick={onBook}
          disabled={!p.availability}
          className={`flex-grow py-3 font-black text-xs uppercase tracking-widest transition-all ${
            p.availability 
              ? 'bg-[#1E3A8A] text-white hover:bg-[#1D4ED8]' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          {p.availability ? t.bookNow : 'Unavailable'}
        </button>
        <button 
          onClick={onView}
          className="px-4 py-3 border-2 border-[#1E3A8A] text-[#1E3A8A] font-black text-xs uppercase tracking-widest hover:bg-slate-50"
        >
          Details
        </button>
      </div>
    </motion.div>
  );
}
