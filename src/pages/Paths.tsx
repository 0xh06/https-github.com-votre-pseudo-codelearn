import { motion } from 'framer-motion';
import Seo from '../components/Seo';

const PATHS = [
  { id: 'beg', title: 'Fondamentaux', icon: '🌱', color: 'green', steps: 5 },
  { id: 'int', title: 'Algorithmes de Tri', icon: '📊', color: 'blue', steps: 8 },
  { id: 'adv', title: 'Graphes & Dynamic', icon: '🕸️', color: 'purple', steps: 12 },
];

export default function Paths() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Seo title="Parcours" description="Suivez des chemins d'apprentissage guides." />
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-4">Parcours d'Apprentissage</h1>
        <p className="text-[var(--text-dim)]">Suivez un guide etape par etape pour devenir un expert.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PATHS.map((path) => (
          <motion.div
            key={path.id}
            whileHover={{ y: -8 }}
            className="card relative overflow-hidden"
          >
            <div className="text-4xl mb-6">{path.icon}</div>
            <h3 className="text-xl font-bold mb-2">{path.title}</h3>
            <div className="text-sm text-[var(--text-dim)] mb-6">{path.steps} étapes • Certificat inclus</div>
            
            <div className="h-2 bg-[var(--bg3)] rounded-full mb-6">
              <div className="h-full bg-[var(--green)] rounded-full w-0 transition-all duration-1000" />
            </div>

            <button className="btn btn-secondary w-full py-2">Continuer</button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
