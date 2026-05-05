import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { ALGORITHMS } from '../data/content';
import Seo from '../components/Seo';

export default function FlashcardSession() {
  const { srs, updateSrs } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionFinished, setSessionFinished] = useState(false);

  // Filter items due for review
  const dueItems = Object.entries(srs)
    .filter(([_, item]) => item.nextReview <= Date.now())
    .map(([id, _]) => ALGORITHMS.find(a => a.id === id))
    .filter(Boolean);

  const currentAlgo = dueItems[currentIndex];

  const handleScore = (score: number) => {
    if (currentAlgo) {
      updateSrs(currentAlgo.id, score);
    }
    
    if (currentIndex < dueItems.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowAnswer(false);
    } else {
      setSessionFinished(true);
    }
  };

  if (dueItems.length === 0 || sessionFinished) {
    return (
      <div className="container mx-auto px-4 py-20 text-center max-w-lg">
        <h1 className="text-3xl font-bold mb-4">Session terminée !</h1>
        <p className="text-[var(--text-dim)] mb-8">
          Félicitations, vous avez révisé tous vos concepts pour aujourd'hui.
        </p>
        <Link to="/flashcards" className="btn btn-primary px-8 py-3 w-full">Retour au tableau de bord</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <Seo title="Session de Révision" />
      
      <div className="flex justify-between items-center mb-8 text-sm text-[var(--text-dim)]">
        <span>Question {currentIndex + 1} / {dueItems.length}</span>
        <Link to="/flashcards" className="hover:text-[var(--text-bright)]">Quitter</Link>
      </div>

      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait">
          {!showAnswer ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, rotateY: -90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: 90 }}
              className="card h-[400px] flex flex-col items-center justify-center text-center p-10 cursor-pointer"
              onClick={() => setShowAnswer(true)}
            >
              <div className="text-[var(--green)] font-bold mb-4 uppercase tracking-widest text-xs">Concept</div>
              <h2 className="text-4xl font-bold">{currentAlgo?.name}</h2>
              <p className="mt-10 text-[var(--text-dim)] animate-pulse">Cliquez pour voir la réponse</p>
            </motion.div>
          ) : (
            <motion.div
              key="answer"
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: -90 }}
              className="card h-[400px] flex flex-col p-10"
            >
              <div className="flex-1 overflow-auto">
                <h3 className="text-xl font-bold mb-4 text-[var(--green)]">Description</h3>
                <p className="text-[var(--text)] mb-6">{currentAlgo?.description}</p>
                <h3 className="text-xl font-bold mb-4 text-[var(--blue)]">Complexité</h3>
                <p className="font-mono text-sm">{currentAlgo?.timeO} (temps) / {currentAlgo?.spaceO} (espace)</p>
              </div>

              <div className="grid grid-cols-5 gap-2 mt-6">
                {[1, 2, 3, 4, 5].map(score => (
                  <button
                    key={score}
                    onClick={() => handleScore(score)}
                    className="py-2 rounded bg-[var(--bg3)] hover:bg-[var(--green)] hover:text-black transition-all font-bold text-sm"
                  >
                    {score}
                  </button>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-[var(--text-dim)] uppercase tracking-tighter font-bold">
                <span>Pas compris</span>
                <span>Maîtrisé</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
