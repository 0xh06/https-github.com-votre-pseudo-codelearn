import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { ALGORITHMS } from '../data/content';
import { useStore } from '../store/useStore';
import { CheckCircle2, Circle, ChevronRight, GraduationCap, Code2, Rocket } from 'lucide-react';

const PATHS = [
  { 
    id: 'beg', 
    title: 'Fondamentaux de l\'Informatique', 
    level: 'Junior',
    icon: <GraduationCap className="w-6 h-6" />,
    color: 'green', 
    desc: 'Maîtrisez les bases indispensables pour tout développeur.',
    algos: ['bubble-sort', 'binary-search', 'fibonacci-dp'],
    objective: 'Comprendre la complexité algorithmique et les structures de base.'
  },
  { 
    id: 'int', 
    title: 'Algorithmes de Tri & Graphes', 
    level: 'Intermédiaire',
    icon: <Code2 className="w-6 h-6" />,
    color: 'blue', 
    desc: 'Optimisez vos programmes avec des algorithmes performants.',
    algos: ['quick-sort', 'merge-sort', 'bfs', 'dfs'],
    objective: 'Savoir choisir le bon algorithme pour traiter des données massives.'
  },
  { 
    id: 'adv', 
    title: 'Expertise & Dynamique', 
    level: 'Senior',
    icon: <Rocket className="w-6 h-6" />,
    color: 'purple', 
    desc: 'Résolvez les problèmes les plus complexes du génie logiciel.',
    algos: ['knapsack', 'heap-sort', 'kadane'],
    objective: 'Maîtriser la programmation dynamique et l\'optimisation avancée.'
  },
];

export default function Paths() {
  const { favorites } = useStore();

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <Seo title="Parcours Professionnels" description="Suivez des parcours d'apprentissage structurés pour devenir ingénieur." />
      
      <div className="text-center mb-20">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[var(--green)] font-bold text-xs uppercase tracking-[0.3em] mb-4 block"
        >
          Learning Paths
        </motion.span>
        <h1 className="text-5xl font-bold mb-6">Votre Roadmap de Carrière</h1>
        <p className="text-[var(--text-dim)] text-xl max-w-2xl mx-auto">
          Des parcours structurés conçus par des experts pour vous amener du niveau débutant à l'expertise senior.
        </p>
      </div>

      <div className="space-y-12">
        {PATHS.map((path, i) => {
          const completedCount = path.algos.filter(a => favorites.includes(a)).length;
          const progress = Math.round((completedCount / path.algos.length) * 100);
          const colorVar = path.color === 'green' ? 'var(--green)' : path.color === 'blue' ? 'var(--blue)' : 'var(--purple)';

          return (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`card p-8 border-l-4`}
              style={{ borderLeftColor: colorVar }}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-[var(--bg3)]" style={{ color: colorVar }}>
                    {path.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{path.title}</h3>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-dim)]">
                      {path.level}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black" style={{ color: colorVar }}>{progress}%</div>
                  <div className="text-[10px] text-[var(--text-dim)] uppercase tracking-widest">{completedCount}/{path.algos.length} complétés</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-[var(--bg3)] rounded-full mb-8 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: colorVar }}
                />
              </div>

              <p className="text-[var(--text-dim)] mb-8 text-sm leading-relaxed">
                {path.desc}
              </p>

              {/* Algo List */}
              <div className="space-y-3 mb-8">
                {path.algos.map(algoId => {
                  const algo = ALGORITHMS.find(a => a.id === algoId);
                  const isCompleted = favorites.includes(algoId);
                  return (
                    <Link 
                      key={algoId} 
                      to={`/algorithms/${algoId}`}
                      className="flex items-center justify-between group p-3 bg-[var(--bg3)] rounded-xl hover:bg-[var(--bg2)] border border-transparent hover:border-[var(--border)] transition-all"
                    >
                      <div className="flex items-center gap-3">
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-[var(--green)]" />
                        ) : (
                          <Circle className="w-5 h-5 text-[var(--text-dim)] group-hover:text-[var(--green)] transition-colors" />
                        )}
                        <span className={`text-sm font-medium ${isCompleted ? 'line-through text-[var(--text-dim)]' : ''}`}>
                          {algo?.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-[var(--text-dim)] uppercase">{algo?.timeO}</span>
                        <ChevronRight className="w-4 h-4 text-[var(--text-dim)] group-hover:translate-x-1 transition-all" />
                      </div>
                    </Link>
                  );
                })}
              </div>

              <Link 
                to={`/algorithms/${path.algos[0]}`}
                className="btn btn-primary w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold group"
              >
                {progress === 100 ? 'Revoir le parcours' : progress > 0 ? 'Continuer' : 'Démarrer le parcours'}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
