import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ALGORITHMS } from '../data/content';
import Seo from '../components/Seo';
import { Search, Filter, ChevronRight, Clock, Layers } from 'lucide-react';

const CATEGORIES = ['Tous', 'Tri', 'Recherche', 'Graphes', 'Dynamique', 'Arrays'];
const DIFFICULTIES = ['Tous', 'Débutant', 'Intermédiaire', 'Avancé'];

const diffColor = (d: string) => {
  if (d === 'Débutant') return 'text-green-400 border-green-400/30 bg-green-400/5';
  if (d === 'Intermédiaire') return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/5';
  return 'text-red-400 border-red-400/30 bg-red-400/5';
};

export default function Algorithms() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Tous');
  const [difficulty, setDifficulty] = useState('Tous');

  const filtered = useMemo(() => {
    return ALGORITHMS.filter(a => {
      const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.description.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === 'Tous' || a.category === category;
      const matchDiff = difficulty === 'Tous' || a.difficulty === difficulty;
      return matchSearch && matchCat && matchDiff;
    });
  }, [search, category, difficulty]);

  return (
    <div className="container mx-auto px-4 py-12">
      <Seo title="Algorithmes" description="Explorez tous les algorithmes essentiels avec visualisations et code." />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="text-4xl font-bold mb-3">Bibliothèque d'Algorithmes</h1>
        <p className="text-[var(--text-dim)]">Maîtrisez les algorithmes fondamentaux avec du code et des explications claires.</p>
      </motion.div>

      {/* Search + Filters */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-4 mb-10">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-dim)]" />
          <input
            type="text"
            placeholder="Rechercher un algorithme..."
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
            <Filter className="w-3 h-3" /> Catégorie:
          </div>
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${
                category === c
                  ? 'bg-[var(--green)] text-black border-[var(--green)]'
                  : 'bg-[var(--bg3)] text-[var(--text-dim)] border-[var(--border)] hover:border-[var(--text-dim)]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex items-center gap-1 text-xs text-[var(--text-dim)] font-bold uppercase tracking-widest mr-2">
            <Layers className="w-3 h-3" /> Niveau:
          </div>
          {DIFFICULTIES.map(d => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${
                difficulty === d
                  ? 'bg-[var(--green)] text-black border-[var(--green)]'
                  : 'bg-[var(--bg3)] text-[var(--text-dim)] border-[var(--border)] hover:border-[var(--text-dim)]'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
        <div className="text-xs text-[var(--text-dim)]">
          {filtered.length} algorithme{filtered.length !== 1 ? 's' : ''} trouvé{filtered.length !== 1 ? 's' : ''}
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
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((algo, i) => (
              <motion.div
                key={algo.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={`/algorithms/${algo.id}`}>
                  <div className="card group h-full flex flex-col p-6 hover:border-[var(--green)]/50 transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-bold text-[var(--text-dim)] uppercase tracking-widest bg-[var(--bg3)] px-2.5 py-1 rounded-full border border-[var(--border)]">
                        {algo.category}
                      </span>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${diffColor(algo.difficulty)}`}>
                        {algo.difficulty}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--green)] transition-colors">{algo.name}</h3>
                    <p className="text-sm text-[var(--text-dim)] flex-1 mb-4 leading-relaxed line-clamp-2">{algo.description}</p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--border)]">
                      <div className="flex items-center gap-2 text-xs text-[var(--text-dim)]">
                        <Clock className="w-3 h-3" />
                        <span className="font-mono font-bold">{algo.timeO}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[var(--green)] font-bold text-xs group-hover:gap-2 transition-all">
                        Explorer <ChevronRight className="w-4 h-4" />
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
