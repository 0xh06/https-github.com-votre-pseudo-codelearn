import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ALGORITHMS } from '../data/content';
import Seo from '../components/Seo';
import { useState } from 'react';

export default function Algorithms() {
  const [filter, setFilter] = useState('Tous');
  const categories = ['Tous', ...new Set(ALGORITHMS.map(a => a.category))];

  const filteredAlgos = filter === 'Tous' 
    ? ALGORITHMS 
    : ALGORITHMS.filter(a => a.category === filter);

  return (
    <div className="container mx-auto px-4 py-12">
      <Seo title="Algorithmes" description="Liste complète des algorithmes de tri, recherche et graphes." />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Bibliothèque d'Algorithmes</h1>
        <p className="text-[var(--text-dim)] text-lg">
          Explorez les concepts fondamentaux de l'informatique avec des explications claires et du code prêt à l'emploi.
        </p>
      </motion.div>

      {/* Filter Bar */}
      <div className="flex gap-2 mb-10 overflow-auto pb-2 scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all border ${
              filter === cat 
                ? 'bg-[var(--green)] text-black border-[var(--green)]' 
                : 'bg-[var(--bg3)] text-[var(--text-dim)] border-[var(--border)] hover:border-[var(--text-dim)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlgos.map((algo) => (
          <Link key={algo.id} to={`/algorithms/${algo.id}`}>
            <motion.div
              whileHover={{ y: -5 }}
              className="card group cursor-pointer h-full border-t-4 border-t-transparent hover:border-t-[var(--green)]"
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`badge ${
                  algo.difficulty === 'Débutant' ? 'bg-green-500/10 text-[var(--green)]' : 
                  algo.difficulty === 'Intermédiaire' ? 'bg-yellow-500/10 text-[var(--yellow)]' : 
                  'bg-red-500/10 text-[var(--red)]'
                }`}>
                  {algo.difficulty}
                </span>
                <span className="text-xs font-mono text-[var(--text-dim)]">{algo.timeO}</span>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--green)] transition-colors">
                {algo.name}
              </h3>
              <p className="text-sm text-[var(--text-dim)] line-clamp-2">
                {algo.description}
              </p>
              <div className="mt-6 pt-4 border-t border-[var(--border)] flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--green)]">Voir détails</span>
                <span className="text-xs text-[var(--text-dim)]">{algo.category}</span>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
