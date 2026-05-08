import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { EXERCISES } from '../data/content';
import Seo from '../components/Seo';
import { ChevronRight, Flame, Mountain, Sprout, Search, Layers, Zap, Star, Trophy, Clock } from 'lucide-react';
import { useStore } from '../store/useStore';

const LEVELS = ['Tous', 'Debutant', 'Intermediaire', 'Avance'];

export default function Exercises() {
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('Tous');
  const { completed } = useStore();

  const filtered = useMemo(() => {
    return EXERCISES.filter(ex => {
      const matchSearch = ex.title.toLowerCase().includes(search.toLowerCase()) || 
                          ex.desc.toLowerCase().includes(search.toLowerCase());
      const matchLevel = level === 'Tous' || ex.level === level;
      return matchSearch && matchLevel;
    });
  }, [search, level]);

  const dailyChallenge = EXERCISES[Math.floor(Math.random() * EXERCISES.length)];

  return (
    <div className="container mx-auto px-4 py-24 relative overflow-hidden">
      <Seo title="Exercices | Pratique le Code" description="Entraîne-toi avec des défis algorithmiques réels et valide tes acquis." />

      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--blue)]/5 blur-[120px] -z-10 rounded-full" />
      <div className="absolute top-[40%] left-[-200px] w-[500px] h-[500px] bg-[var(--primary)]/5 blur-[120px] -z-10 rounded-full" />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20 space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
          <Zap className="text-[var(--blue)] w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-dim)]">Pratique Interactive</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">ARENE DES <span className="premium-gradient">DEFIS</span></h1>
        <p className="text-[var(--text-dim)] text-xl max-w-2xl mx-auto font-medium">
          Transforme tes connaissances théoriques en compétences réelles avec nos exercices testés.
        </p>
      </motion.div>

      {/* Daily Challenge Spotlight */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-24 relative group"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-[var(--primary)] to-[var(--blue)] rounded-[48px] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative glass p-10 md:p-16 rounded-[48px] border-white/10 overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Trophy size={200} className="text-white" />
          </div>
          
          <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-[32px] bg-gradient-to-br from-[var(--primary)] to-[var(--blue)] flex items-center justify-center text-4xl shadow-2xl shrink-0">
              ⚡
            </div>
            <div className="flex-1 text-center md:text-left space-y-6">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--primary)] mb-2">Défi du Jour</div>
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">{dailyChallenge.title}</h2>
              </div>
              <p className="text-lg text-[var(--text-dim)] max-w-2xl leading-relaxed">
                {dailyChallenge.desc}
              </p>
              <Link 
                to={`/exercises/${dailyChallenge.id}`}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all active:scale-95"
              >
                Relever le Défi <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Search + Filters */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-8 mb-16">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative flex-1 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-dim)] group-focus-within:text-[var(--primary)] transition-colors" />
            <input
              type="text"
              placeholder="Rechercher par titre ou mot-clé..."
              className="w-full bg-white/[0.03] border border-white/5 rounded-[32px] py-6 pl-16 pr-6 focus:border-[var(--primary)] outline-none transition-all text-sm font-medium"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-3 items-center px-4">
            {LEVELS.map(l => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={`px-8 py-4 rounded-[24px] text-xs font-black uppercase tracking-widest border transition-all ${
                  level === l
                    ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-lg shadow-[var(--primary)]/20'
                    : 'bg-white/[0.03] text-[var(--text-dim)] border-white/5 hover:border-white/10'
                }`}
              >
                {l === 'Debutant' ? 'Débutant' : l === 'Intermediaire' ? 'Intermédiaire' : l === 'Avance' ? 'Avancé' : 'Tous'}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-40 glass rounded-[64px] border-white/5"
          >
            <div className="text-7xl mb-6">🔍</div>
            <div className="text-2xl font-black text-white mb-2">Silence Radio</div>
            <p className="text-[var(--text-dim)]">Aucun défi ne correspond à ta recherche.</p>
          </motion.div>
        ) : (
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((ex, i) => {
              const isCompleted = completed.includes(ex.id);
              return (
                <motion.div
                  key={ex.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link to={`/exercises/${ex.id}`}>
                    <div className="group h-full flex flex-col p-10 rounded-[48px] glass border-white/5 hover:border-white/10 transition-all relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
                      
                      <div className="flex justify-between items-start mb-8 relative z-10">
                        <div className="flex items-center gap-3">
                          <div className={`p-3 rounded-2xl ${
                            ex.level === 'Debutant' ? 'bg-indigo-500/10 text-indigo-400' : 
                            ex.level === 'Intermediaire' ? 'bg-yellow-500/10 text-yellow-400' : 
                            'bg-red-500/10 text-red-400'
                          }`}>
                            {ex.level === 'Debutant' ? <Sprout size={20} /> : 
                             ex.level === 'Intermediaire' ? <Mountain size={20} /> : 
                             <Flame size={20} />}
                          </div>
                          <span className={`text-[9px] font-black uppercase tracking-[0.2em]`}>
                            {ex.level === 'Debutant' ? 'Débutant' : ex.level === 'Intermediaire' ? 'Intermédiaire' : 'Avancé'}
                          </span>
                        </div>
                        {isCompleted && (
                          <div className="px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 text-[9px] font-black uppercase tracking-widest">
                            Complété
                          </div>
                        )}
                      </div>

                      <h3 className="text-2xl font-black text-white mb-4 group-hover:text-[var(--primary)] transition-colors relative z-10">{ex.title}</h3>
                      <p className="text-[var(--text-dim)] font-medium leading-relaxed flex-1 mb-8 relative z-10 line-clamp-2">
                        {ex.desc}
                      </p>

                      <div className="flex items-center justify-between pt-6 border-t border-white/5 relative z-10">
                        <div className="flex items-center gap-4 text-[var(--text-dim)] text-xs font-bold">
                          <div className="flex items-center gap-1.5">
                            <Clock size={14} /> 15m
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Star size={14} /> 100 XP
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-[var(--primary)] font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                          Résoudre <ChevronRight size={16} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
