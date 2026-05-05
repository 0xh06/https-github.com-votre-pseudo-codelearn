import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ALGORITHMS } from '../data/content';
import Seo from '../components/Seo';

export default function Algorithms() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Seo title="Algorithmes" description="Liste complete des algorithmes de tri, recherche et graphes." />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-3xl font-bold mb-4">Bibliothèque d'Algorithmes</h1>
        <p className="text-[var(--text-dim)]">
          Explorez plus de 50 algorithmes essentiels pour vos entretiens et projets.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ALGORITHMS.map((algo) => (
          <Link key={algo.id} to={`/algorithms/${algo.id}`}>
            <motion.div
              whileHover={{ y: -5 }}
              className="card group cursor-pointer h-full"
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
          </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
