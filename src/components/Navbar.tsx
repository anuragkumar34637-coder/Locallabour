import React from 'react';
import { Menu, User, Bell, Languages, LogOut, Home, Search as SearchIcon, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TRANSLATIONS } from '../constants';

interface NavbarProps {
  lang: 'en' | 'hi';
  setLang: (l: 'en' | 'hi') => void;
  user: any;
  currentView: string;
  setView: (v: string) => void;
}

export default function Navbar({ lang, setLang, user, currentView, setView }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const t = TRANSLATIONS[lang];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1E3A8A] text-white h-16 flex items-center border-b-4 border-[#EAB308]">
      <div className="max-w-7xl mx-auto w-full px-8 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('home')}>
          <div className="w-8 h-8 bg-[#EAB308] rounded-sm flex items-center justify-center font-black text-[#1E3A8A]">
            LL
          </div>
          <span className="text-xl font-black tracking-tighter uppercase">LocalLabor</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-8 font-bold text-sm uppercase tracking-wider">
            <button 
              onClick={() => setView('home')}
              className={`transition-colors ${currentView === 'home' ? 'text-[#EAB308]' : 'hover:text-[#EAB308]'}`}
            >
              {t.home}
            </button>
            <button 
              onClick={() => setView('bookings')}
              className={`transition-colors ${currentView === 'bookings' ? 'text-[#EAB308]' : 'hover:text-[#EAB308]'}`}
            >
              {t.myBookings}
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-2 bg-[#1E40AF] px-3 py-1 rounded-sm border border-[#1D4ED8] text-xs font-bold"
            >
              <span className="opacity-70">Language:</span>
              <span>{lang === 'en' ? 'HINDI' : 'ENGLISH'}</span>
            </button>
            
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="bg-white text-[#1E3A8A] px-4 py-1 text-sm font-black rounded-sm uppercase transition-transform active:scale-95"
            >
              {user?.name.split(' ')[0]}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1E3A8A] border-t-4 border-[#EAB308] flex items-center justify-around h-16 z-50">
        <button onClick={() => setView('home')} className={`flex flex-col items-center gap-0.5 ${currentView === 'home' ? 'text-[#EAB308]' : 'text-white/60'}`}>
          <Home size={18} />
          <span className="text-[10px] font-black uppercase tracking-widest">Home</span>
        </button>
        <button onClick={() => setView('search')} className={`flex flex-col items-center gap-0.5 ${currentView === 'search' ? 'text-[#EAB308]' : 'text-white/60'}`}>
          <SearchIcon size={18} />
          <span className="text-[10px] font-black uppercase tracking-widest">Search</span>
        </button>
        <button onClick={() => setView('bookings')} className={`flex flex-col items-center gap-0.5 ${currentView === 'bookings' ? 'text-[#EAB308]' : 'text-white/60'}`}>
          <Calendar size={18} />
          <span className="text-[10px] font-black uppercase tracking-widest">Bookings</span>
        </button>
      </div>

      {/* Profile Sidebar/Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 md:z-40"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-white shadow-2xl z-[60] p-6"
            >
               <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold text-gray-900">Account</h2>
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                      <LogOut size={20} className="rotate-180" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4 mb-8 p-4 bg-orange-50 rounded-2xl">
                    <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 border-2 border-white shadow-sm overflow-hidden">
                       {user?.photoURL ? (
                        <img src={user.photoURL} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        <User size={32} />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">{user?.role}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button className="w-full text-left p-3 rounded-xl hover:bg-gray-50 flex items-center gap-3 text-gray-700">
                      <User size={18} />
                      <span>Edit Profile</span>
                    </button>
                    <button className="w-full text-left p-3 rounded-xl hover:bg-gray-50 flex items-center gap-3 text-gray-700">
                      <Bell size={18} />
                      <span>Notifications</span>
                    </button>
                    <button 
                      onClick={() => { setView('bookings'); setIsOpen(false); }}
                      className="w-full text-left p-3 rounded-xl hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                    >
                      <Calendar size={18} />
                      <span>Booking History</span>
                    </button>
                  </div>

                  <div className="mt-auto">
                    <button className="w-full p-4 bg-gray-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors">
                      <LogOut size={18} />
                      {t.logout}
                    </button>
                  </div>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
