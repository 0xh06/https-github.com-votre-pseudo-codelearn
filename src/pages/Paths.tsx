import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { ALGORITHMS } from '../data/content';
import { CheckCircle2, Lock, ChevronRight, GraduationCap, Code2, Rocket } from 'lucide-react';

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
  return (
    <div className="container mx-auto px-4 py-20 max-w-5xl">
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

      <div className="relative">
        {/* Connection Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--green)] via-[var(--blue)] to-[var(--purple)] opacity-20 hidden md:block" />

        <div className="space-y-32 relative">
          {PATHS.map((path, i) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12`}
            >
              {/* Content Side */}
              <div className="w-full md:w-1/2">
                <div className={`card p-8 border-l-4 ${
                  path.color === 'green' ? 'border-l-[var(--green)]' : 
                  path.color === 'blue' ? 'border-l-[var(--blue)]' : 
                  'border-l-[var(--purple)]'
                }`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-3 rounded-xl bg-[var(--bg3)] text-${path.color}-400`}>
                      {path.icon}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-[var(--bg3)] rounded-full text-[var(--text-dim)]">
                      {path.level}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-4">{path.title}</h3>
                  <p className="text-[var(--text-dim)] mb-8 text-sm leading-relaxed">
                    {path.desc}
                  </p>

                  <div className="space-y-4 mb-10">
                    <div className="text-[10px] uppercase font-bold text-[var(--text-dim)] tracking-widest border-b border-[var(--border)] pb-2 mb-4">Programme du module</div>
                    {path.algos.map(algoId => {
                      const algo = ALGORITHMS.find(a => a.id === algoId);
                      return (
                        <Link 
                          key={algoId} 
                          to={`/algorithms/${algoId}`}
                          className="flex items-center justify-between group p-3 bg-[var(--bg3)] rounded-xl hover:bg-[var(--bg2)] border border-transparent hover:border-[var(--border)] transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-4 h-4 text-[var(--text-dim)] group-hover:text-[var(--green)] transition-colors" />
                            <span className="text-sm font-medium">{algo?.name}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-[var(--text-dim)] group-hover:translate-x-1 transition-all" />
                        </Link>
                      );
                    })}
                  </div>

                  <Link 
                    to={`/algorithms/${path.algos[0]}`}
                    className="btn btn-primary w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold group"
                  >
                    Démarrer le parcours
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
                  </Link>
                </div>
              </div>

              {/* Icon / Step Marker Side */}
              <div className="hidden md:flex w-20 h-20 rounded-full bg-[var(--bg)] border-4 border-[var(--bg3)] z-10 items-center justify-center text-2xl font-bold shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                {i + 1}
              </div>

              {/* Visual Side (Placeholder for now) */}
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="relative group">
                  <div className={`absolute inset-0 bg-${path.color}-500/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className="card p-12 aspect-square flex flex-col items-center justify-center text-center border-dashed border-2 border-[var(--border)] opacity-30">
                    <div className="text-6xl mb-6 opacity-50">{path.icon}</div>
                    <div className="text-xs uppercase font-bold tracking-widest">{path.objective}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
