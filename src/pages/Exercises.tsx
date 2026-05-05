import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { EXERCISES } from '../data/content';
import Seo from '../components/Seo';
import { ChevronRight, Flame, Mountain, Sprout, Search, Layers } from 'lucide-react';

const LEVELS = ['Tous', 'Debutant', 'Intermediaire', 'Avance'];

export default function Exercises() {
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('Tous');

  const filtered = useMemo(() => {
    return EXERCISES.filter(ex => {
      const matchSearch = ex.title.toLowerCase().includes(search.toLowerCase()) || 
                          ex.desc.toLowerCase().includes(search.toLowerCase());
      const matchLevel = level === 'Tous' || ex.level === level;
      return matchSearch && matchLevel;
    });
  }, [search, level]);

  return (
    <div className="container mx-auto px-4 py-12">
      <Seo title="Exercices" description="Entraînez-vous avec des problèmes de type LeetCode." />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="text-4xl font-bold mb-3">Exercices Pratiques</h1>
        <p className="text-[var(--text-dim)]">Progressez avec des exercices classés par difficulté.</p>
      </motion.div>

      {/* Search + Filters */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-4 mb-10">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-dim)]" />
          <input
            type="text"
            placeholder="Rechercher un exercice..."
            className="w-full bg-[var(--bg2)] border border-[var(--border)] rounded-2xl py-3.5 pl-12 pr-4 focus:border-[var(--green)] outline-none transition-all text-sm"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-dim)] hover:text-white text-xs">✕</button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex items-center gap-1 text-xs text-[var(--text-dim)] font-bold uppercase tracking-widest mr-2">
            <Layers className="w-3 h-3" /> Niveau:
          </div>
          {LEVELS.map(l => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${
                level === l
                  ? 'bg-[var(--green)] text-black border-[var(--green)]'
                  : 'bg-[var(--bg3)] text-[var(--text-dim)] border-[var(--border)] hover:border-[var(--text-dim)]'
              }`}
            >
              {l === 'Debutant' ? 'Débutant' : l === 'Intermediaire' ? 'Intermédiaire' : l === 'Avance' ? 'Avancé' : 'Tous'}
            </button>
          ))}
        </div>
        <div className="text-xs text-[var(--text-dim)]">
          {filtered.length} exercice{filtered.length !== 1 ? 's' : ''} trouvé{filtered.length !== 1 ? 's' : ''}
        </div>
      </motion.div>

      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-20 text-[var(--text-dim)]"
          >
            <div className="text-5xl mb-4">🔍</div>
            <div className="font-bold text-lg mb-2">Aucun résultat</div>
            <div className="text-sm">Essayez d'autres filtres ou termes de recherche.</div>
          </motion.div>
        ) : (
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((ex, i) => (
              <motion.div
                key={ex.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={`/exercises/${ex.id}`}>
                  <div className="card group h-full flex flex-col p-6 hover:border-[var(--green)]/50 transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2">
                        {ex.level === 'Debutant' ? <Sprout className="w-5 h-5 text-green-500" /> : 
                         ex.level === 'Intermediaire' ? <Mountain className="w-5 h-5 text-yellow-500" /> : 
                         <Flame className="w-5 h-5 text-red-500" />}
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                          ex.level === 'Debutant' ? 'border-green-500/30 text-green-400 bg-green-500/5' : 
                          ex.level === 'Intermediaire' ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/5' : 
                          'border-red-500/30 text-red-400 bg-red-500/5'
                        }`}>
                          {ex.level === 'Debutant' ? 'Débutant' : ex.level === 'Intermediaire' ? 'Intermédiaire' : 'Avancé'}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[var(--text-dim)] bg-[var(--bg3)] px-2 py-0.5 rounded-full border border-[var(--border)]">
                        ID: #{ex.id}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--green)] transition-colors">{ex.title}</h3>
                    <p className="text-sm text-[var(--text-dim)] flex-1 mb-6 leading-relaxed">
                      {ex.desc}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--border)]">
                      <span className="text-xs text-[var(--text-dim)] font-medium">Temps estimé: 15 min</span>
                      <div className="flex items-center gap-1 text-[var(--green)] font-bold text-sm group-hover:gap-2 transition-all">
                        Résoudre <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
