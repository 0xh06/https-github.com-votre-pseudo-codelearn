import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { ALGORITHMS } from '../data/content';
import { useStore } from '../store/useStore';
import { CheckCircle2, Circle, ChevronRight, GraduationCap, Code2, Rocket, Lock } from 'lucide-react';

const PATHS = [
  {
    id: 'beg',
    title: 'Fondamentaux de l\'Informatique',
    level: 'Junior',
    icon: <GraduationCap className="w-6 h-6" />,
    color: 'green',
    desc: 'Maîtrisez les bases indispensables pour tout développeur.',
    algos: ['bubble-sort', 'binary-search', 'fibonacci-dp'],
    objective: 'Comprendre la complexité algorithmique et les structures de base.',
    proOnly: false,
  },
  {
    id: 'int',
    title: 'Algorithmes de Tri & Graphes',
    level: 'Intermédiaire',
    icon: <Code2 className="w-6 h-6" />,
    color: 'blue',
    desc: 'Optimisez vos programmes avec des algorithmes performants et des parcours de graphes.',
    algos: ['quick-sort', 'merge-sort', 'bfs', 'dfs'],
    objective: 'Savoir choisir et implémenter les bons algorithmes sur données volumineuses.',
    proOnly: false,
  },
  {
    id: 'adv',
    title: 'Expertise & Optimisation',
    level: 'Senior',
    icon: <Rocket className="w-6 h-6" />,
    color: 'purple',
    desc: 'Renforcez la programmation dynamique et les techniques d\'optimisation avancées.',
    algos: ['kadane', 'dfs', 'merge-sort'],
    objective: 'Préparer les problèmes difficiles d\'entretien et les optimisations O(n) / O(n log n).',
    proOnly: true,
  },
];

export default function Paths() {
  const { favorites, subscriptionPlan } = useStore();
  const isPro = subscriptionPlan === 'pro';

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <Seo
        title="Parcours structurés"
        description="Parcours d'apprentissage progressifs : fondamentaux, graphes, optimisation — pour entretiens et compétences réelles."
      />

      <div className="text-center mb-20">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[var(--green)] font-bold text-xs uppercase tracking-[0.3em] mb-4 block"
        >
          Learning paths
        </motion.span>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Votre roadmap, du junior au senior</h1>
        <p className="text-[var(--text-dim)] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Des séquences ordonnées avec objectifs mesurables — pas une simple liste de tutoriels. Chaque étape renvoie vers le bon algorithme et la pratique dans l&apos;éditeur.
        </p>
      </div>

      <div className="space-y-10">
        {PATHS.map((path, i) => {
          const completedCount = path.algos.filter((a) => favorites.includes(a)).length;
          const progress = Math.round((completedCount / path.algos.length) * 100);
          const colorVar =
            path.color === 'green' ? 'var(--green)' : path.color === 'blue' ? 'var(--blue)' : 'var(--purple)';
          const locked = path.proOnly && !isPro;

          return (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="card p-6 md:p-8 border-l-4 relative overflow-hidden"
              style={{ borderLeftColor: colorVar }}
            >
              {locked && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-[var(--bg)]/75 backdrop-blur-sm p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--purple)]/15 border border-[var(--purple)]/30 flex items-center justify-center">
                    <Lock className="w-7 h-7 text-[var(--purple)]" />
                  </div>
                  <p className="text-sm md:text-base text-[var(--text-bright)] font-semibold max-w-sm">
                    Parcours Expert réservé aux membres Pro — accès illimité aux révisions et au contenu avancé.
                  </p>
                  <Link to="/pricing" className="btn btn-primary px-6 py-3 rounded-xl font-bold">
                    Voir les offres Pro
                  </Link>
                </div>
              )}

              <div className={locked ? 'opacity-35 pointer-events-none select-none' : ''}>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-[var(--bg3)] shrink-0" style={{ color: colorVar }}>
                      {path.icon}
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold">{path.title}</h3>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-dim)]">
                        {path.level}
                      </span>
                      <p className="text-sm text-[var(--text-dim)] mt-2 leading-relaxed max-w-xl">{path.objective}</p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <div className="text-2xl font-black" style={{ color: colorVar }}>
                      {progress}%
                    </div>
                    <div className="text-[10px] text-[var(--text-dim)] uppercase tracking-widest">
                      {completedCount}/{path.algos.length} favoris
                    </div>
                  </div>
                </div>

                <div className="w-full h-2 bg-[var(--bg3)] rounded-full mb-6 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: colorVar }}
                  />
                </div>

                <p className="text-[var(--text-dim)] mb-6 text-sm leading-relaxed">{path.desc}</p>

                <div className="space-y-2 mb-6">
                  {path.algos.map((algoId) => {
                    const algo = ALGORITHMS.find((a) => a.id === algoId);
                    const isDone = favorites.includes(algoId);
                    return (
                      <Link
                        key={algoId}
                        to={`/algorithms/${algoId}`}
                        className="flex items-center justify-between group p-3 bg-[var(--bg3)] rounded-xl hover:bg-[var(--bg2)] border border-transparent hover:border-[var(--border)] transition-all"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {isDone ? (
                            <CheckCircle2 className="w-5 h-5 text-[var(--green)] shrink-0" />
                          ) : (
                            <Circle className="w-5 h-5 text-[var(--text-dim)] group-hover:text-[var(--green)] transition-colors shrink-0" />
                          )}
                          <span
                            className={`text-sm font-medium truncate ${isDone ? 'line-through text-[var(--text-dim)]' : ''}`}
                          >
                            {algo?.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
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
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
