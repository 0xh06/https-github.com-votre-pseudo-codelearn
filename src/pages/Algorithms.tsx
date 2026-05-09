import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ALGORITHMS } from '../data/content';
import Seo from '../components/Seo';
import { useStore } from '../store/useStore';
import { Search, Clock, Database, ChevronRight, Layers, Eye, Zap, CheckCircle2 } from 'lucide-react';

const CATEGORIES = ['Tous', 'Tri', 'Recherche', 'Graphes', 'Dynamique', 'Arrays'];
const DIFFICULTIES = ['Tous', 'Débutant', 'Intermédiaire', 'Avancé'];

const CATEGORY_ICONS: Record<string, string> = {
  'Tri': '🔄', 'Recherche': '🔍', 'Graphes': '🕸️', 'Dynamique': '🧠', 'Arrays': '📊'
};
const CATEGORY_COLORS: Record<string, string> = {
  'Tri': '#6366f1', 'Recherche': '#3b82f6', 'Graphes': '#8b5cf6', 'Dynamique': '#f59e0b', 'Arrays': '#64748b'
};

const diffStyle = (d: string) => {
  if (d === 'Débutant') return { color: '#6366f1', bg: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.25)' };
  if (d === 'Intermédiaire') return { color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.25)' };
  return { color: '#f43f5e', bg: 'rgba(244,63,94,0.08)', border: 'rgba(244,63,94,0.25)' };
};

const HAS_VISUALIZER = new Set(['bubble-sort', 'quick-sort', 'binary-search']);

export default function Algorithms() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Tous');
  const [difficulty, setDifficulty] = useState('Tous');
  const { completed, uiLang } = useStore();

  const filtered = useMemo(() => {
    return ALGORITHMS.filter(a => {
      const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.description.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === 'Tous' || a.category === category;
      const matchDiff = difficulty === 'Tous' || a.difficulty === difficulty;
      return matchSearch && matchCat && matchDiff;
    });
  }, [search, category, difficulty]);

  const totalAlgos = ALGORITHMS.length;
  const completedCount = ALGORITHMS.filter(a => completed.includes(a.id as any)).length;
  const progressPct = Math.round((completedCount / totalAlgos) * 100);

  return (
    <div className="container mx-auto px-4 py-10">
      <Seo title="Algorithmes" description="Explorez tous les algorithmes essentiels avec visualisations et code." />

      {/* Hero Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r from-white to-[var(--text-dim)] bg-clip-text text-transparent">
              {uiLang === 'fr' ? "Bibliothèque d'Algorithmes" : 'Algorithm Library'}
            </h1>
            <p className="text-[var(--text-dim)] text-sm">
              {uiLang === 'fr' ? 'Maîtrisez les algorithmes fondamentaux avec visualisations interactives et pratique de code.' : 'Master fundamental algorithms with interactive visualizations and code practice.'}
            </p>
          </div>
          {/* Global Progress */}
          <div className="shrink-0 p-4 bg-[var(--bg2)] border border-[var(--border)] rounded-2xl min-w-[200px]">
            <div className="text-xs text-[var(--text-dim)] uppercase tracking-widest font-bold mb-2">
              {uiLang === 'fr' ? 'Progression globale' : 'Global Progress'}
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-[var(--bg3)] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-[var(--primary)] to-teal-400 rounded-full"
                />
              </div>
              <span className="text-sm font-black text-[var(--primary)]">{progressPct}%</span>
            </div>
            <div className="text-[10px] text-[var(--text-dim)] mt-1.5">
              {completedCount} / {totalAlgos} {uiLang === 'fr' ? 'complétés' : 'completed'}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Category Quick-Jump */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.filter(c => c !== 'Tous').map(c => (
          <button
            key={c}
            onClick={() => setCategory(cat => cat === c ? 'Tous' : c)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
              category === c ? 'text-white border-transparent' : 'bg-[var(--bg2)] text-[var(--text-dim)] border-[var(--border)] hover:border-[var(--text-dim)]'
            }`}
            style={category === c ? { backgroundColor: CATEGORY_COLORS[c], borderColor: CATEGORY_COLORS[c] } : {}}
          >
            <span>{CATEGORY_ICONS[c]}</span> {c}
          </button>
        ))}
      </motion.div>

      {/* Search + Filters */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-3 mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-dim)]" />
          <input
            type="text"
            placeholder={uiLang === 'fr' ? 'Rechercher un algorithme...' : 'Search an algorithm...'}
            className="w-full bg-[var(--bg2)] border border-[var(--border)] rounded-2xl py-3 pl-11 pr-4 focus:border-[var(--primary)] outline-none transition-all text-sm"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-dim)] hover:text-white text-xs">✕</button>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 text-[10px] text-[var(--text-dim)] font-bold uppercase tracking-widest mr-1">
            <Layers className="w-3 h-3" /> {uiLang === 'fr' ? 'Niveau :' : 'Level:'}
          </div>
          {DIFFICULTIES.map(d => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-all ${
                difficulty === d
                  ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                  : 'bg-[var(--bg3)] text-[var(--text-dim)] border-[var(--border)] hover:border-[var(--text-dim)]'
              }`}
            >
              {d}
            </button>
          ))}
          <span className="ml-auto text-[10px] text-[var(--text-dim)]">
            {filtered.length} {uiLang === 'fr' ? 'algorithme(s)' : 'algorithm(s)'}
          </span>
        </div>
      </motion.div>

      {/* Algorithm Cards */}
      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-20 text-[var(--text-dim)]">
            <div className="text-5xl mb-4">🔍</div>
            <div className="font-bold text-lg mb-2">{uiLang === 'fr' ? 'Aucun résultat' : 'No results'}</div>
            <div className="text-sm">{uiLang === 'fr' ? "Essayez d'autres filtres." : 'Try different filters.'}</div>
          </motion.div>
        ) : (
          <motion.div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((algo, i) => {
              const ds = diffStyle(algo.difficulty);
              const catColor = CATEGORY_COLORS[algo.category] || '#10b981';
              const isCompleted = completed.includes(algo.id as any);
              const hasViz = HAS_VISUALIZER.has(algo.id);
              return (
                <motion.div
                  key={algo.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.04, type: 'spring', stiffness: 120 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <Link to={`/algorithms/${algo.id}`} className="block h-full">
                    <div
                      className="relative h-full flex flex-col p-5 rounded-2xl border border-white/5 bg-[var(--bg2)] transition-all group overflow-hidden hover:bg-[var(--bg3)]"
                      style={{ borderColor: 'rgba(255,255,255,0.05)' }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = catColor + '80')}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}
                    >
                      {/* Glow effect */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{ background: `radial-gradient(ellipse at top left, ${catColor}10 0%, transparent 70%)` }}
                      />

                      {/* Top badges */}
                      <div className="flex items-start justify-between gap-2 mb-4 relative">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-8 h-8 rounded-xl flex items-center justify-center text-base shrink-0"
                            style={{ background: catColor + '15', border: `1px solid ${catColor}30` }}
                          >
                            {CATEGORY_ICONS[algo.category] || '📌'}
                          </span>
                          <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: catColor }}>{algo.category}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {hasViz && (
                            <span className="flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                              <Eye className="w-2.5 h-2.5" /> Viz
                            </span>
                          )}
                          {isCompleted && (
                            <span className="flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                              <CheckCircle2 className="w-2.5 h-2.5" /> OK
                            </span>
                          )}
                          <span
                            className="text-[9px] font-black px-2.5 py-1 rounded-full border"
                            style={{ color: ds.color, background: ds.bg, borderColor: ds.border }}
                          >
                            {algo.difficulty}
                          </span>
                        </div>
                      </div>

                      {/* Name + desc */}
                      <h3 className="text-lg font-black mb-2 group-hover:text-[var(--primary)] transition-colors relative">{algo.name}</h3>
                      <p className="text-xs text-[var(--text-dim)] flex-1 mb-4 leading-relaxed line-clamp-2 relative">{algo.description}</p>

                      {/* Complexity chips */}
                      <div className="flex items-center gap-2 mb-4 relative">
                        <div className="flex items-center gap-1 text-[10px] font-mono font-black px-2 py-1 rounded-lg bg-[var(--bg3)] border border-[var(--border)]">
                          <Clock className="w-3 h-3 text-[var(--text-dim)]" /> {algo.timeO}
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-mono font-black px-2 py-1 rounded-lg bg-[var(--bg3)] border border-[var(--border)]">
                          <Database className="w-3 h-3 text-[var(--text-dim)]" /> {algo.spaceO}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center justify-between pt-3 border-t border-[var(--border)] relative">
                        <div className="flex items-center gap-1.5">
                          {(algo as any).challenges && (
                            <span className="text-[9px] text-[var(--text-dim)] flex items-center gap-1">
                              <Zap className="w-2.5 h-2.5" /> {(algo as any).challenges.length} défis
                            </span>
                          )}
                        </div>
                        <span
                          className="text-xs font-black flex items-center gap-1 transition-all group-hover:gap-2"
                          style={{ color: catColor }}
                        >
                          {uiLang === 'fr' ? 'Explorer' : 'Explore'} <ChevronRight className="w-4 h-4" />
                        </span>
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
