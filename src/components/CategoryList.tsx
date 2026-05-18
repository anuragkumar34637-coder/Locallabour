import React from 'react';
import * as Icons from 'lucide-react';
import { CATEGORIES, TRANSLATIONS } from '../constants';
import { motion } from 'motion/react';

interface CategoryListProps {
  lang: 'en' | 'hi';
  onCategorySelect: (id: string) => void;
  selectedCategory?: string;
}

export default function CategoryList({ lang, onCategorySelect, selectedCategory }: CategoryListProps) {
  const t = TRANSLATIONS[lang];

  return (
    <section className="max-w-7xl mx-auto px-8 py-12">
      <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-8">
        {t.categories}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        {CATEGORIES.map((cat, idx) => {
          const IconComponent = (Icons as any)[cat.icon] || Icons.Hammer;
          const isSelected = selectedCategory === cat.id;

          return (
            <motion.button
              key={cat.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCategorySelect(cat.id)}
              className={`flex flex-col items-center gap-3 p-5 transition-all border-2 ${
                isSelected 
                  ? 'bg-white border-[#1E3A8A] text-[#1E3A8A] shadow-[4px_4px_0px_0px_rgba(30,58,138,1)]' 
                  : 'bg-white border-slate-200 text-slate-600 hover:border-[#1E3A8A] hover:bg-slate-50'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                isSelected ? 'bg-blue-100' : 'bg-slate-100'
              }`}>
                <IconComponent size={20} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-center">
                {lang === 'hi' ? cat.labelHi : cat.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
