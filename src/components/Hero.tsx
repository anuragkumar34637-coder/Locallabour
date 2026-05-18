import React from 'react';
import { Search, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { TRANSLATIONS } from '../constants';

interface HeroProps {
  lang: 'en' | 'hi';
  onSearch: (query: string) => void;
  onAskAI: () => void;
}

export default function Hero({ lang, onSearch, onAskAI }: HeroProps) {
  const t = TRANSLATIONS[lang];
  const [query, setQuery] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="relative pt-24 pb-12 overflow-hidden bg-slate-50">
      <div className="relative max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white border-4 border-slate-900 p-12 shadow-[12px_12px_0px_0px_rgba(30,58,138,1)] text-left"
        >
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-black text-[#1E3A8A] leading-tight mb-4 uppercase tracking-tighter">
              {t.heroTitle}
            </h1>
            <p className="text-xl text-slate-600 font-bold mb-10 max-w-2xl">
              {t.heroSub}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full p-5 pl-14 bg-slate-100 border-4 border-slate-200 font-black focus:border-[#1E3A8A] outline-none transition-colors uppercase tracking-tight"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
            </div>
            
            <button 
              type="submit"
              className="bg-[#1E3A8A] text-white px-12 py-5 font-black uppercase tracking-widest hover:bg-[#1D4ED8] transition-colors shadow-[4px_4px_0px_0px_rgba(234,179,8,1)]"
            >
              {lang === 'en' ? 'Find Now' : 'खोजें'}
            </button>
          </form>

          <button 
            type="button"
            onClick={onAskAI}
            className="mt-8 flex items-center gap-3 font-black uppercase tracking-widest text-xs text-slate-400 hover:text-[#1E3A8A] transition-colors"
          >
            <Sparkles size={16} />
            <span>Need recommendations? Ask our AI agent</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
