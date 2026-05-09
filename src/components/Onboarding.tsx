import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, ChevronRight, Trophy, Code2 } from 'lucide-react';

const ONBOARDING_KEY = 'codelearn_onboarding_completed';

const STEPS = [
  {
    icon: <Bot className="w-12 h-12 text-[var(--primary)]" />,
    title: "Bienvenue sur CodeLearn",
    desc: "L'académie d'élite pour maîtriser les algorithmes et la logique de programmation. Je serai ton Expert-Instructeur.",
    color: "var(--primary)"
  },
  {
    icon: <Code2 className="w-12 h-12 text-[var(--blue)]" />,
    title: "Pratique Intensive",
    desc: "Code directement dans le navigateur, passe les tests automatisés et apprends de tes erreurs grâce à mon feedback instantané.",
    color: "var(--blue)"
  },
  {
    icon: <Trophy className="w-12 h-12 text-[var(--yellow)]" />,
    title: "Gagne de l'XP & Évolue",
    desc: "Chaque exercice validé te rapporte de l'XP. Monte en grade, débloque des succès et personnalise ton Avatar !",
    color: "var(--yellow)"
  }
];

export default function Onboarding() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const isCompleted = localStorage.getItem(ONBOARDING_KEY);
    if (!isCompleted) {
      setTimeout(() => setIsOpen(true), 1500);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      completeOnboarding();
    }
  };

  const completeOnboarding = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={completeOnboarding}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg glass rounded-[32px] p-8 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            <div 
              className="absolute -top-32 -left-32 w-64 h-64 blur-[80px] rounded-full opacity-50 transition-colors duration-500"
              style={{ backgroundColor: STEPS[currentStep].color }}
            />
            
            <div className="relative z-10 flex flex-col items-center text-center space-y-6">
              <motion.div
                key={`icon-${currentStep}`}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 15 }}
                className="w-24 h-24 rounded-[24px] bg-[var(--bg)] border border-white/10 flex items-center justify-center shadow-xl relative"
              >
                <div className="absolute inset-0 bg-white/5 rounded-[24px]" />
                {STEPS[currentStep].icon}
              </motion.div>

              <div className="space-y-4">
                <motion.h2 
                  key={`title-${currentStep}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl font-black text-white"
                >
                  {STEPS[currentStep].title}
                </motion.h2>
                <motion.p 
                  key={`desc-${currentStep}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-[var(--text-dim)] font-medium text-lg leading-relaxed"
                >
                  {STEPS[currentStep].desc}
                </motion.p>
              </div>

              <div className="flex gap-2 py-4">
                {STEPS.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === currentStep ? "w-8 bg-[var(--primary)]" : "w-2 bg-white/20"
                    }`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="w-full py-4 rounded-xl font-black text-white flex items-center justify-center gap-2 transition-all shadow-lg"
                style={{ backgroundColor: STEPS[currentStep].color }}
              >
                {currentStep === STEPS.length - 1 ? "Commencer l'aventure" : "Suivant"}
                {currentStep === STEPS.length - 1 ? <Sparkles className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </motion.button>
              
              <button 
                onClick={completeOnboarding}
                className="text-xs text-[var(--text-dim)] hover:text-white transition-colors"
              >
                Passer le tutoriel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
