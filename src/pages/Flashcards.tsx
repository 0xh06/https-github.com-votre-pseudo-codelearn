import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import Seo from '../components/Seo';

export default function Flashcards() {
  const { srs } = useStore();
  const dueCount = Object.values(srs).filter(item => item.nextReview <= Date.now()).length;

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <Seo title="Flashcards" description="Repetition espacee pour memoriser les concepts clefs." />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="mb-10 p-10 bg-[var(--bg2)] rounded-3xl border border-[var(--border)] shadow-2xl">
          <div className="text-6xl mb-6">🧠</div>
          <h1 className="text-3xl font-bold mb-4">Repetition Espacée</h1>
          <p className="text-[var(--text-dim)] mb-8">
            Memorisez les algorithmes et la syntaxe pour toujours.
          </p>
          
          <div className="flex justify-center gap-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--blue)]">{dueCount}</div>
              <div className="text-xs uppercase tracking-widest text-[var(--text-dim)]">A reviser</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--green)]">{Object.keys(srs).length}</div>
              <div className="text-xs uppercase tracking-widest text-[var(--text-dim)]">Maîtrisés</div>
            </div>
          </div>

          <button 
            className={`mt-10 btn btn-primary w-full py-4 rounded-2xl text-lg ${dueCount === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={dueCount === 0}
          >
            {dueCount > 0 ? 'Demarrer la session' : 'Tout est a jour !'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
