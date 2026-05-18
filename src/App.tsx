import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryList from './components/CategoryList';
import WorkerCard from './components/WorkerCard';
import AIAssistant from './components/AIAssistant';
import { MOCK_WORKERS, MOCK_USER } from './mockData';
import { TRANSLATIONS } from './constants';
import { Booking, WorkerProfile, AppUser } from './types';
import { Filter, X, ChevronRight, CheckCircle, Search, Star } from 'lucide-react';

export default function App() {
  const [lang, setLang] = React.useState<'en' | 'hi'>('en');
  const [currentView, setView] = React.useState('home');
  const [selectedCategory, setSelectedCategory] = React.useState<string | undefined>();
  const [isAiOpen, setIsAiOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedWorker, setSelectedWorker] = React.useState<(AppUser & { profile: WorkerProfile }) | null>(null);
  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [showBookingModal, setShowBookingModal] = React.useState(false);

  const t = TRANSLATIONS[lang];

  // Filtering Logic
  const filteredWorkers = MOCK_WORKERS.filter(worker => {
    const matchesCategory = selectedCategory ? worker.profile.category === selectedCategory : true;
    const matchesQuery = searchQuery 
      ? worker.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        worker.profile.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
      : true;
    return matchesCategory && matchesQuery;
  });

  const handleBook = (worker: AppUser & { profile: WorkerProfile }) => {
    setSelectedWorker(worker);
    setShowBookingModal(true);
  };

  const confirmBooking = () => {
    if (!selectedWorker) return;
    const newBooking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      customerId: MOCK_USER.uid,
      workerId: selectedWorker.uid,
      status: 'pending',
      serviceType: selectedWorker.profile.category,
      description: 'Scheduled Service',
      scheduledAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setBookings([newBooking, ...bookings]);
    setShowBookingModal(false);
    setView('bookings');
  };

  return (
    <div className="min-h-screen bg-[#FCFCFB] text-gray-900 font-sans">
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        user={MOCK_USER} 
        currentView={currentView} 
        setView={setView} 
      />

      <main className="pt-16 pb-20 md:pb-8">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero 
                lang={lang} 
                onSearch={(q) => { setSearchQuery(q); setView('search'); }} 
                onAskAI={() => setIsAiOpen(true)} 
              />
              
              <CategoryList 
                lang={lang} 
                onCategorySelect={(id) => { setSelectedCategory(id === selectedCategory ? undefined : id); setView('search'); }}
                selectedCategory={selectedCategory}
              />

              <div className="max-w-7xl mx-auto px-8 py-12">
                <div className="flex items-end justify-between mb-8">
                  <div>
                    <h3 className="text-xs font-black uppercase text-slate-400 tracking-[0.3em] mb-1">Available Now</h3>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">{t.nearbyWorkers}</h2>
                  </div>
                  <button onClick={() => setView('search')} className="text-xs font-black text-[#1E3A8A] uppercase tracking-widest hover:underline">
                    View All Workers
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {MOCK_WORKERS.slice(0, 4).map(worker => (
                    <WorkerCard 
                      key={worker.uid} 
                      worker={worker} 
                      lang={lang} 
                      onBook={() => handleBook(worker)} 
                      onView={() => { setSelectedWorker(worker); setView('profile'); }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {currentView === 'search' && (
            <motion.div 
              key="search"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-7xl mx-auto px-8 py-12"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b-4 border-slate-100 pb-8">
                <div>
                  <h3 className="text-xs font-black uppercase text-slate-400 tracking-[0.3em] mb-1">Marketplace</h3>
                  <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase">Search & Filter</h1>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Keyword Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-11 pr-4 py-3 bg-white border-2 border-slate-200 font-bold focus:border-[#1E3A8A] outline-none text-sm uppercase tracking-tight w-full md:w-64"
                    />
                  </div>
                  <button 
                    onClick={() => { setSelectedCategory(undefined); setSearchQuery(''); }}
                    className="p-3 bg-white border-2 border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-500 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {filteredWorkers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {filteredWorkers.map(worker => (
                    <WorkerCard 
                      key={worker.uid} 
                      worker={worker} 
                      lang={lang} 
                      onBook={() => handleBook(worker)} 
                      onView={() => { setSelectedWorker(worker); setView('profile'); }}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-24 bg-white border-4 border-slate-100 italic">
                  <h3 className="text-xl font-black text-slate-300 uppercase tracking-widest">No Matches Found</h3>
                </div>
              )}
            </motion.div>
          )}

          {currentView === 'bookings' && (
            <motion.div 
              key="bookings"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl mx-auto px-8 py-12"
            >
              <h1 className="text-4xl font-black text-slate-900 mb-10 tracking-tight uppercase border-b-4 border-slate-100 pb-4">{t.myBookings}</h1>
              
              {bookings.length > 0 ? (
                <div className="space-y-6">
                  {bookings.map(booking => {
                    const worker = MOCK_WORKERS.find(w => w.uid === booking.workerId);
                    return (
                      <div key={booking.id} className="bg-white p-6 border-4 border-slate-100 flex items-center justify-between group hover:border-[#1E3A8A] transition-colors shadow-sm">
                        <div className="flex items-center gap-5">
                          <div className="w-16 h-16 bg-slate-100 border-2 border-slate-100 grayscale transition-all group-hover:grayscale-0">
                            <img src={worker?.photoURL} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1E3A8A] mb-1">{booking.serviceType}</p>
                            <p className="text-lg font-black text-slate-900 uppercase">{worker?.name}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                               Scheduled: {new Date(booking.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] border-2 ${
                            booking.status === 'pending' ? 'bg-yellow-50 text-yellow-600 border-yellow-200' : 'bg-green-50 text-green-600 border-green-200'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-24 bg-white border-4 border-slate-100 border-dashed">
                  <h3 className="text-xl font-black text-slate-200 uppercase tracking-widest mb-6">Zero Active Requests</h3>
                  <button onClick={() => setView('search')} className="bg-[#1E3A8A] text-white px-8 py-3 font-black uppercase tracking-widest text-xs">Search for workers</button>
                </div>
              )}
            </motion.div>
          )}

          {currentView === 'profile' && selectedWorker && (
             <motion.div 
                key="profile"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-4xl mx-auto px-8 py-12"
             >
                <div className="bg-white border-4 border-slate-900 shadow-[12px_12px_0px_0px_rgba(30,58,138,1)] overflow-hidden">
                   <div className="h-40 bg-[#1E3A8A] relative border-b-4 border-[#EAB308]">
                      <button onClick={() => setView('search')} className="absolute top-6 left-6 h-10 px-4 bg-white text-[#1E3A8A] font-black uppercase tracking-widest text-xs flex items-center gap-2">
                        <X size={16} /> Back
                      </button>
                   </div>
                   <div className="px-12 pb-12">
                      <div className="relative -mt-20 mb-10 flex items-end gap-8">
                         <div className="w-48 h-48 border-8 border-white bg-slate-100 shadow-lg grayscale hover:grayscale-0 transition-all">
                            <img src={selectedWorker.photoURL} alt="" className="w-full h-full object-cover" />
                         </div>
                         <div className="pb-4">
                            <h1 className="text-5xl font-black text-slate-900 mb-2 tracking-tight uppercase leading-none">{selectedWorker.name}</h1>
                            <p className="text-lg font-black text-[#1E3A8A] uppercase tracking-[0.2em] opacity-60">{selectedWorker.profile.category} SPECIALIST</p>
                         </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                         <div className="md:col-span-7">
                            <div className="flex flex-wrap items-center gap-6 mb-10 pb-6 border-b-2 border-slate-100">
                               <div className="flex items-center gap-2 text-[#EAB308]">
                                  <Star size={20} fill="currentColor" />
                                  <span className="text-xl font-black text-slate-900">{selectedWorker.profile.rating}</span>
                                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">({selectedWorker.profile.reviewCount} REVIEWS)</span>
                               </div>
                               <div className="flex items-center gap-2 text-slate-500 font-black uppercase tracking-widest text-xs">
                                  <MapPin size={18} className="text-[#1E3A8A]" />
                                  {selectedWorker.location?.address}
                               </div>
                            </div>
                            
                            <div className="bg-slate-50 p-8 border-2 border-slate-100">
                               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4">Professional Statement</h3>
                               <p className="text-slate-700 leading-relaxed font-bold italic border-l-4 border-[#1E3A8A] pl-6 text-lg">"{selectedWorker.profile.bio}"</p>
                            </div>
                         </div>

                         <div className="md:col-span-5">
                            <div className="p-8 bg-[#1E3A8A] text-white shadow-[8px_8px_0px_0px_rgba(234,179,8,1)]">
                               <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-2">Base Hourly Rate</p>
                               <p className="text-5xl font-black mb-8">₹{selectedWorker.profile.hourlyRate}</p>
                               
                               <button 
                                  onClick={() => handleBook(selectedWorker)}
                                  className="w-full py-4 bg-white text-[#1E3A8A] font-black uppercase tracking-[0.2em] text-xs transition-colors hover:bg-slate-50 mb-3"
                               >
                                  Confirm Hire
                               </button>
                               <button className="w-full py-4 border-2 border-white/20 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-white/10 transition-colors">
                                  Request Callback
                               </button>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AIAssistant 
        lang={lang} 
        isOpen={isAiOpen} 
        onClose={() => setIsAiOpen(false)} 
        laborers={MOCK_WORKERS}
        onSelectWorker={(id) => {
          const w = MOCK_WORKERS.find(x => x.uid === id);
          if (w) {
            setSelectedWorker(w);
            setView('profile');
            setIsAiOpen(false);
          }
        }}
      />

      {/* Booking Confirmation Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBookingModal(false)}
              className="absolute inset-0 bg-[#1E3A8A]/90"
            />
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="relative w-full max-w-xl bg-white border-4 border-slate-900 p-12 shadow-[16px_16px_0px_0px_rgba(234,179,8,1)]"
            >
              <div className="text-center mb-10">
                <h2 className="text-4xl font-black text-slate-900 mb-2 uppercase tracking-tighter leading-none">Hire Confirmation</h2>
                <div className="w-16 h-1 bg-[#1E3A8A] mx-auto mt-4"></div>
              </div>

              <div className="space-y-4 mb-10">
                <div className="flex items-center justify-between p-5 bg-slate-100 border-2 border-slate-200">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Technician</span>
                  <span className="font-black text-slate-900 uppercase">{selectedWorker?.name}</span>
                </div>
                <div className="flex items-center justify-between p-5 bg-slate-100 border-2 border-slate-200">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hourly Rate</span>
                  <span className="font-black text-slate-900">₹{selectedWorker?.profile.hourlyRate}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setShowBookingModal(false)}
                  className="py-4 border-2 border-slate-200 font-black text-slate-400 uppercase tracking-widest text-[10px] hover:bg-slate-50"
                >
                  Terminate
                </button>
                <button 
                  onClick={confirmBooking}
                  className="py-4 bg-[#1E3A8A] text-white font-black uppercase tracking-widest text-[10px] shadow-[4px_4px_0px_0px_rgba(234,179,8,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
                >
                  Execute Booking
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
