import { motion } from 'framer-motion';
import { EXERCISES } from '../data/content';
import Seo from '../components/Seo';

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

      <div className="space-y-4">
        {EXERCISES.map((ex) => (
          <motion.div
            key={ex.id}
            whileHover={{ x: 5 }}
            className="card flex items-center justify-between p-4 cursor-pointer"
          >
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xs font-bold text-[var(--text-dim)] uppercase tracking-tighter">#{ex.id}</span>
                <h3 className="font-bold">{ex.title}</h3>
              </div>
              <p className="text-sm text-[var(--text-dim)]">{ex.desc}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className={`text-xs px-2 py-0.5 rounded border ${
                ex.level === 'Debutant' ? 'border-green-500/30 text-green-500' : 
                ex.level === 'Intermediaire' ? 'border-yellow-500/30 text-yellow-500' : 
                'border-red-500/30 text-red-500'
              }`}>
                {ex.level}
              </span>
              <button className="btn btn-secondary px-4 py-1 text-sm">Resoudre</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
