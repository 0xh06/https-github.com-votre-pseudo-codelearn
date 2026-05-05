import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { ALGORITHMS } from '../data/content';

const PATHS = [
  { 
    id: 'beg', 
    title: 'Fondamentaux', 
    icon: '🌱', 
    color: 'green', 
    desc: 'Bases algorithmiques et structures simples.',
    algos: ['bubble-sort', 'binary-search', 'fibonacci-dp'] 
  },
  { 
    id: 'int', 
    title: 'Tris & Recherche', 
    icon: '📊', 
    color: 'blue', 
    desc: 'Maîtrisez les tris avancés et les graphes.',
    algos: ['quick-sort', 'merge-sort', 'bfs', 'dfs'] 
  },
  { 
    id: 'adv', 
    title: 'Graphes & Dynamique', 
    icon: '🕸️', 
    color: 'purple', 
    desc: 'Problèmes complexes et optimisation.',
    algos: ['knapsack', 'heap-sort', 'kadane'] 
  },
];

export default function Paths() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Seo title="Parcours" description="Suivez des chemins d'apprentissage guidés." />
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Parcours d'Apprentissage</h1>
        <p className="text-[var(--text-dim)] text-lg">Suivez un guide étape par étape pour devenir un expert.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PATHS.map((path, i) => (
          <motion.div
            key={path.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card relative overflow-hidden flex flex-col"
          >
            <div className="text-5xl mb-6">{path.icon}</div>
            <h3 className="text-2xl font-bold mb-2">{path.title}</h3>
            <p className="text-sm text-[var(--text-dim)] mb-6 flex-1">{path.desc}</p>
            
            <div className="space-y-3 mb-8">
              {path.algos.map(algoId => {
                const algo = ALGORITHMS.find(a => a.id === algoId);
                return (
                  <Link 
                    key={algoId} 
                    to={`/algorithms/${algoId}`}
                    className="flex items-center gap-3 p-2 bg-[var(--bg3)] rounded-lg hover:bg-[var(--border)] transition-colors text-xs font-medium"
                  >
                    <div className="w-2 h-2 rounded-full bg-[var(--green)]" />
                    {algo?.name}
                  </Link>
                );
              })}
            </div>

            <div className="pt-6 border-t border-[var(--border)]">
              <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold text-[var(--text-dim)] mb-2">
                <span>Progression</span>
                <span>0%</span>
              </div>
              <div className="h-1.5 bg-[var(--bg3)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--green)] w-0 transition-all duration-1000" />
              </div>
            </div>

            <Link 
              to={`/algorithms/${path.algos[0]}`}
              className="mt-6 btn btn-secondary w-full py-2.5 text-sm font-bold"
            >
              Continuer
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
