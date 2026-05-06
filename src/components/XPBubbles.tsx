import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';

interface Particle {
  id: number;
  x: number;
  y: number;
  amount: number;
}

export default function XPBubbles() {
  const xp = useStore((state) => state.xp);
  const [prevXp, setPrevXp] = useState(xp);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (xp > prevXp) {
      const amount = xp - prevXp;
      const id = Date.now();
      
      // Random position near the top or where the user might be looking
      const x = Math.random() * 60 + 20; // 20% to 80% width
      const y = Math.random() * 40 + 30; // 30% to 70% height
      
      setParticles((prev) => [...prev, { id, x, y, amount }]);
      setPrevXp(xp);

      // Auto-remove after animation
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== id));
      }, 2000);
    }
  }, [xp, prevXp]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: `${p.y}%`, x: `${p.x}%`, scale: 0.5 }}
            animate={{ 
              opacity: [0, 1, 1, 0], 
              y: [`${p.y}%`, `${p.y - 15}%`],
              scale: [0.5, 1.2, 1, 1.5]
            }}
            exit={{ opacity: 0 }}
            className="absolute flex flex-col items-center"
          >
            <div className="bg-[var(--green)] text-black px-4 py-2 rounded-full font-black text-xl shadow-[0_0_30px_rgba(16,185,129,0.8)] border-2 border-white/20">
              +{p.amount} XP
            </div>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="text-2xl mt-2"
            >
              ✨
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
