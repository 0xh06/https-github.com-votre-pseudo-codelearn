import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Code2, Terminal, User, Settings, Zap, BookOpen, Map as MapIcon, Hammer } from 'lucide-react';
import { ALGORITHMS, EXERCISES } from '../data/content';
import { LANGUAGE_COURSES } from '../data/languageContent';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Combine all searchable items
  const items = [
    // Pages
    { id: 'p1', title: 'Tableau de Bord (Profil)', icon: <User />, type: 'Page', path: '/profile' },
    { id: 'p2', title: 'Roadmaps & Parcours', icon: <MapIcon />, type: 'Page', path: '/paths' },
    { id: 'p3', title: 'Paramètres', icon: <Settings />, type: 'Page', path: '/settings' },
    { id: 'p4', title: 'Catalogue Algorithmes', icon: <BookOpen />, type: 'Page', path: '/algorithms' },
    { id: 'p5', title: 'Arène des Défis', icon: <Zap />, type: 'Page', path: '/exercises' },
    
    // Languages
    ...Object.values(LANGUAGE_COURSES).map(l => ({
      id: `lang_${l.id}`,
      title: `Cours : ${l.name}`,
      icon: <Terminal />,
      type: 'Langage',
      path: `/languages/${l.id}`
    })),

    // Algorithms
    ...ALGORITHMS.map(a => ({
      id: `algo_${a.id}`,
      title: `Algo : ${a.name}`,
      icon: <Code2 />,
      type: 'Algorithme',
      path: `/algorithms/${a.id}`
    })),

    // Exercises
    ...EXERCISES.map(e => ({
      id: `ex_${e.id}`,
      title: `Défi : ${e.title}`,
      icon: <Zap />,
      type: 'Exercice',
      path: `/exercises/${e.id}`
    })),

    // Projects (La Forge)
    { id: 'proj_1', title: 'Projet : Todo List React', icon: <Hammer />, type: 'Projet', path: '/projects/todo-react' },
    { id: 'proj_2', title: 'Projet : Bot Météo Python', icon: <Hammer />, type: 'Projet', path: '/projects/weather-py' },

    // Quick Actions
    { id: 'action_1', title: 'Passer au Thème Sombre/Clair', icon: <Settings />, type: 'Action', path: '#theme' },
    { id: 'action_2', title: 'Personnaliser l\'Avatar', icon: <User />, type: 'Action', path: '/avatar' }
  ];

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase()) || 
    item.type.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 10); // Max 10 results

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    setActiveIndex(0);
  }, [search]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearch('');
    }
  }, [isOpen]);

  const handleExecute = (path: string) => {
    if (path === '#theme') {
      const isLight = document.documentElement.classList.contains('light-theme');
      if (isLight) {
        document.documentElement.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
      }
    } else {
      navigate(path);
    }
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev < filteredItems.length - 1 ? prev + 1 : prev));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : prev));
    }
    if (e.key === 'Enter' && filteredItems[activeIndex]) {
      e.preventDefault();
      handleExecute(filteredItems[activeIndex].path);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99999]"
          />
          <div className="fixed inset-0 flex items-start justify-center pt-[15vh] z-[100000] pointer-events-none">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden pointer-events-auto flex flex-col"
            >
              <div className="flex items-center gap-4 px-4 py-4 border-b border-white/5 relative">
                <Search className="w-5 h-5 text-[var(--text-dim)]" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Où voulez-vous aller ? (ex: Python, Bubble Sort, Profil...)"
                  className="w-full bg-transparent border-none outline-none text-white text-lg font-medium placeholder:text-white/20"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <div className="flex gap-1">
                  <kbd className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-[var(--text-dim)]">ESC</kbd>
                </div>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-2 custom-scrollbar">
                {filteredItems.length === 0 ? (
                  <div className="p-8 text-center text-[var(--text-dim)] font-medium">
                    Aucun résultat pour "{search}"
                  </div>
                ) : (
                  filteredItems.map((item, i) => (
                    <button
                      key={item.id}
                      onClick={() => handleExecute(item.path)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl transition-all text-left ${
                        activeIndex === i 
                          ? 'bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 shadow-[0_0_20px_rgba(99,102,241,0.1)]' 
                          : 'text-[var(--text-dim)] border border-transparent hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${activeIndex === i ? 'bg-[var(--primary)]/20' : 'bg-white/5'}`}>
                          {React.cloneElement(item.icon as React.ReactElement<any>, { className: 'w-4 h-4' })}
                        </div>
                        <span className={`font-black ${activeIndex === i ? 'text-white' : ''}`}>{item.title}</span>
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${activeIndex === i ? 'text-[var(--primary)]' : 'opacity-40'}`}>
                        {item.type}
                      </span>
                    </button>
                  ))
                )}
              </div>
              <div className="px-4 py-3 border-t border-white/5 bg-white/[0.02] flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-[var(--text-dim)]">
                <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 rounded bg-white/10">↑</kbd><kbd className="px-1.5 py-0.5 rounded bg-white/10">↓</kbd> Naviguer</span>
                <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 rounded bg-white/10">↵</kbd> Sélectionner</span>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
