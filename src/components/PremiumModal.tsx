import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Sparkles, X, ChevronRight, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  xpEarned: number;
  badge?: {
    icon: string;
    name: string;
    color: string;
  };
  actionLabel?: string;
  onAction?: () => void;
}

export default function PremiumModal({ 
  isOpen, 
  onClose, 
  title, 
  subtitle, 
  xpEarned, 
  badge,
  actionLabel,
  onAction 
}: PremiumModalProps) {
  
  useEffect(() => {
    if (isOpen) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg glass rounded-[32px] overflow-hidden border-white/10 shadow-2xl"
          >
            {/* Top Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[var(--green)] to-transparent opacity-50" />
            
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors text-[var(--text-dim)]"
            >
              <X size={20} />
            </button>

            <div className="p-8 md:p-12 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-[0_0_40px_rgba(241,196,15,0.4)] rotate-12"
              >
                <Trophy size={48} className="text-black" />
              </motion.div>

              <h2 className="text-4xl font-black mb-3 premium-gradient font-[var(--font-display)]">
                {title}
              </h2>
              <p className="text-[var(--text-dim)] text-lg mb-8 font-medium">
                {subtitle}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center">
                  <div className="flex items-center gap-2 text-[var(--yellow)] mb-1">
                    <Sparkles size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">XP Gagné</span>
                  </div>
                  <div className="text-3xl font-black text-white">+{xpEarned}</div>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center">
                  <div className="flex items-center gap-2 text-[var(--blue)] mb-1">
                    <Zap size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Bonus</span>
                  </div>
                  <div className="text-3xl font-black text-white">x1.5</div>
                </div>
              </div>

              {badge && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-10 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4 text-left"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg" style={{ backgroundColor: badge.color + '20', border: `1px solid ${badge.color}40` }}>
                    {badge.icon}
                  </div>
                  <div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-[var(--text-dim)] mb-0.5">Nouveau Badge</div>
                    <div className="text-sm font-black text-white">{badge.name}</div>
                  </div>
                </motion.div>
              )}

              <div className="flex flex-col gap-3">
                {actionLabel && onAction && (
                  <button
                    onClick={onAction}
                    className="btn btn-primary w-full py-4 text-sm font-black rounded-2xl flex items-center justify-center gap-2"
                  >
                    {actionLabel} <ChevronRight size={18} />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="text-xs font-black uppercase tracking-widest text-[var(--text-dim)] hover:text-white transition-colors py-2"
                >
                  Fermer
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
