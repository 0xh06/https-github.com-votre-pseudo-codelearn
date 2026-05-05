import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { EXERCISES } from '../data/content';
import Seo from '../components/Seo';
import { ChevronRight, Flame, Mountain, Sprout, Search, Filter } from 'lucide-react';

export default function Exercises() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Seo title="Exercices" description="Entrainez-vous avec des problemes de type LeetCode." />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-3xl font-bold mb-4">Exercices Pratiques</h1>
        <p className="text-[var(--text-dim)]">
          Progressez avec des exercices classes par difficulte.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {EXERCISES.map((ex) => (
          <Link key={ex.id} to={`/exercises/${ex.id}`}>
            <motion.div
              whileHover={{ y: -5, borderColor: 'var(--green)' }}
              className="card group h-full flex flex-col p-6 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  {ex.level === 'Debutant' ? <Sprout className="w-5 h-5 text-green-500" /> : 
                   ex.level === 'Intermediaire' ? <Mountain className="w-5 h-5 text-yellow-500" /> : 
                   <Flame className="w-5 h-5 text-red-500" />}
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                    ex.level === 'Debutant' ? 'border-green-500/20 text-green-500' : 
                    ex.level === 'Intermediaire' ? 'border-yellow-500/20 text-yellow-500' : 
                    'border-red-500/20 text-red-500'
                  }`}>
                    {ex.level}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[var(--text-dim)]">ID: #{ex.id}</span>
              </div>

              <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--green)] transition-colors">{ex.title}</h3>
              <p className="text-sm text-[var(--text-dim)] flex-1 mb-6 leading-relaxed">
                {ex.desc}
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--border)]">
                <span className="text-xs text-[var(--text-dim)] font-medium">Temps moyen: 15 min</span>
                <div className="flex items-center gap-1 text-[var(--green)] font-bold text-sm">
                  Résoudre <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
