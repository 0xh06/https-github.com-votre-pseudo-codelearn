import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';

interface Particle {
  id: number;
  x: number;
  y: number;
  amount: number;
  angle: number;
  velocity: number;
}

export default function XPBubbles() {
  const xp = useStore((state) => state.xp);
  const [prevXp, setPrevXp] = useState(xp);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (xp > prevXp) {
      const amountGain = xp - prevXp;
      const burstId = Date.now();
      
      // Center of the burst
      const centerX = Math.random() * 40 + 30; // 30% to 70%
      const centerY = Math.random() * 40 + 30; // 30% to 70%

      // Create multiple particles for the burst
      const newParticles = Array.from({ length: 8 }).map((_, i) => ({
        id: burstId + i,
        x: centerX,
        y: centerY,
        amount: Math.round(amountGain / 8),
        angle: (i * 45) + (Math.random() * 20),
        velocity: 10 + Math.random() * 10
      }));
      
      setParticles((prev) => [...prev, ...newParticles]);
      setPrevXp(xp);

      // Auto-remove after animation
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !newParticles.find(np => np.id === p.id)));
      }, 2000);
    }
  }, [xp, prevXp]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: `${p.x}%`, y: `${p.y}%`, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 1, 0], 
              x: [`${p.x}%`, `${p.x + Math.cos(p.angle * Math.PI / 180) * p.velocity}%`],
              y: [`${p.y}%`, `${p.y + Math.sin(p.angle * Math.PI / 180) * p.velocity}%`],
              scale: [0, 1.5, 1, 0.5],
              rotate: [0, p.angle * 2]
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute flex items-center gap-1"
          >
            <div className="bg-gradient-to-br from-[var(--primary)] to-[#818cf8] text-black px-3 py-1 rounded-full font-black text-sm shadow-[0_0_20px_var(--primary-glow)] border border-white/20">
              +{p.amount}
            </div>
            <span className="text-xl">✨</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
