import React from 'react';
import { Sparkles, Send, X, Bot, User, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TRANSLATIONS } from '../constants';

interface AIAssistantProps {
  lang: 'en' | 'hi';
  isOpen: boolean;
  onClose: () => void;
  laborers: any[];
  onSelectWorker: (id: string) => void;
}

export default function AIAssistant({ lang, isOpen, onClose, laborers, onSelectWorker }: AIAssistantProps) {
  const t = TRANSLATIONS[lang];
  const [problem, setProblem] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [recommendation, setRecommendation] = React.useState<{ recommendedId: string; reasoning: string } | null>(null);

  const getRecommendation = async () => {
    if (!problem.trim()) return;
    setLoading(true);
    setRecommendation(null);
    try {
      const res = await fetch('/api/ai/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          problem, 
          laborers: laborers.map(l => ({ id: l.uid, name: l.name, skills: l.profile.skills, category: l.profile.category })) 
        })
      });
      const data = await res.json();
      setRecommendation(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const recommendedWorker = laborers.find(l => l.uid === recommendation?.recommendedId);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-8 right-8 z-[70] w-full max-w-md"
        >
          <div className="bg-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(30,58,138,1)] overflow-hidden flex flex-col max-h-[80vh]">
            {/* Header */}
            <div className="bg-[#1E3A8A] p-5 flex items-center justify-between text-white border-b-4 border-[#EAB308]">
              <div className="flex items-center gap-3">
                <Sparkles size={20} className="text-[#EAB308]" />
                <div>
                  <h3 className="font-black uppercase tracking-widest text-sm">{t.aiSupport}</h3>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-60">Geometric Intelligence</p>
                </div>
              </div>
              <button onClick={onClose} className="p-1 hover:bg-white/10 transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
              {!recommendation && !loading && (
                <div className="text-center py-6">
                  <Bot size={40} className="mx-auto mb-4 text-[#1E3A8A] opacity-20" />
                  <h4 className="font-black text-slate-900 mb-2 uppercase tracking-tight">{t.askAi}</h4>
                  <p className="text-xs text-slate-500 font-bold">Describe your repair or service needs in plain words.</p>
                </div>
              )}

              {loading && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-10 h-10 border-4 border-slate-200 border-t-[#1E3A8A] animate-spin mb-4"></div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{t.aiThinking}</p>
                </div>
              )}

              {recommendation && recommendedWorker && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="bg-white p-5 border-4 border-slate-200 mb-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-slate-100 flex items-center justify-center text-[#1E3A8A]">
                        <User size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#1E3A8A] mb-0.5">Top Match</p>
                        <h4 className="font-black text-slate-900 text-lg uppercase">
                          {recommendedWorker.name}
                        </h4>
                      </div>
                    </div>
                    <div className="p-4 bg-blue-50 border-l-4 border-[#1E3A8A] italic text-slate-700 text-xs font-medium leading-relaxed mb-4">
                      "{recommendation.reasoning}"
                    </div>
                    <button 
                      onClick={() => onSelectWorker(recommendedWorker.uid)}
                      className="w-full py-3 bg-[#1E3A8A] text-white font-black uppercase tracking-widest text-[10px] hover:bg-[#1D4ED8] transition-all"
                    >
                      {t.viewProfile}
                    </button>
                  </div>
                  <button 
                    onClick={() => setRecommendation(null)}
                    className="text-[10px] font-black text-[#1E3A8A] uppercase tracking-widest hover:underline mx-auto block"
                  >
                    Request New Match
                  </button>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t-2 border-slate-100">
              <div className="relative flex gap-2">
                <input
                  type="text"
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && getRecommendation()}
                  placeholder="Describe your issue..."
                  className="flex-1 py-3 px-4 bg-slate-100 border-2 border-slate-200 font-bold focus:border-[#1E3A8A] outline-none text-sm uppercase tracking-tight"
                />
                <button 
                  onClick={getRecommendation}
                  disabled={loading || !problem.trim()}
                  className="bg-[#1E3A8A] text-white p-3 hover:bg-[#1D4ED8] transition-colors disabled:opacity-50"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
