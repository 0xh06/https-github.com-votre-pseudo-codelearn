import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function UIPolish() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar at the Top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--primary)] via-[var(--blue)] to-[var(--purple)] z-[2000] origin-left"
        style={{ scaleX }}
      />

      {/* Custom Magic Cursor (Desktop only) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[var(--primary)]/50 pointer-events-none z-[9999] hidden md:block"
        animate={{
          x: mousePos.x - 16,
          y: mousePos.y - 16,
          transition: { type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }
        }}
      >
        <div className="absolute inset-0 rounded-full bg-[var(--primary)]/10 blur-[4px]" />
      </motion.div>
      
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[var(--primary)] pointer-events-none z-[9999] hidden md:block"
        animate={{
          x: mousePos.x - 4,
          y: mousePos.y - 4,
          transition: { type: 'spring', damping: 40, stiffness: 450, mass: 0.1 }
        }}
      />

      {/* Background Cyber-Grid */}
      <div className="fixed inset-0 -z-[50] pointer-events-none overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
          }}
        />
        
        {/* Animated Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-[var(--primary)]/5 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-[var(--purple)]/5 blur-[150px] rounded-full"
        />
      </div>

      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay -z-[40]" 
           style={{ backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)' }} />
    </>
  );
}
