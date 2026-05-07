import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import AvatarRenderer from './AvatarRenderer';
import { getLevelInfo } from '../utils/levels';

export default function StudyRoom() {
  const { xp, avatar } = useStore();
  const levelData = getLevelInfo(xp);
  
  // Determine room style based on level
  let roomTheme = 'novice';
  if (levelData.level >= 5) roomTheme = 'intermediate';
  if (levelData.level >= 10) roomTheme = 'expert';

  const roomConfig = {
    novice: {
      bg: 'bg-stone-900',
      wallColor: 'bg-stone-800',
      desk: 'bg-amber-800/80',
      items: ['📦', '🌱', '📚'],
      glow: 'shadow-[0_0_30px_rgba(217,119,6,0.1)]'
    },
    intermediate: {
      bg: 'bg-slate-900',
      wallColor: 'bg-slate-800',
      desk: 'bg-slate-700/80',
      items: ['💻', '🪴', '☕'],
      glow: 'shadow-[0_0_40px_rgba(59,130,246,0.15)]'
    },
    expert: {
      bg: 'bg-indigo-950',
      wallColor: 'bg-[#0f172a]',
      desk: 'bg-black/60',
      items: ['🖥️', '🖲️', '⚡', '🪴'],
      glow: 'shadow-[0_0_50px_rgba(139,92,246,0.25)]'
    }
  };

  const theme = roomConfig[roomTheme as keyof typeof roomConfig];

  return (
    <div className={`relative w-full h-80 rounded-[32px] overflow-hidden ${theme.bg} border border-white/10 group`}>
      {/* Wall Texture */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay" style={{ backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)' }} />
      
      {/* Window */}
      <div className={`absolute top-8 left-12 w-32 h-32 rounded-2xl border-4 border-[#1a1a1a] bg-gradient-to-b ${
        roomTheme === 'novice' ? 'from-sky-300 to-sky-100' :
        roomTheme === 'intermediate' ? 'from-indigo-500 to-purple-400' :
        'from-fuchsia-900 via-purple-900 to-black'
      } overflow-hidden shadow-inner`}>
        {/* Window details */}
        <div className="absolute top-1/2 left-0 right-0 h-2 bg-[#1a1a1a]" />
        <div className="absolute top-0 bottom-0 left-1/2 w-2 bg-[#1a1a1a]" />
        
        {/* Sky Elements */}
        {roomTheme === 'novice' && (
           <motion.div animate={{ x: [0, 40, 0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-4 left-4 text-white opacity-80 text-2xl">☁️</motion.div>
        )}
        {roomTheme === 'intermediate' && (
           <div className="absolute top-4 right-4 text-yellow-200 text-3xl opacity-90 shadow-yellow-200 glow">✨</div>
        )}
        {roomTheme === 'expert' && (
           <>
             <div className="absolute top-4 right-4 text-purple-300 text-sm opacity-50">✦</div>
             <div className="absolute top-8 left-6 text-fuchsia-300 text-xs opacity-50">✦</div>
             <motion.div animate={{ y: [-100, 100], x: [100, -100] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }} className="absolute w-1 h-8 bg-white rotate-45 opacity-60 blur-[1px]" />
           </>
        )}
      </div>

      {/* Posters */}
      <div className="absolute top-8 right-16 w-24 h-32 bg-white/5 border border-white/10 rounded-lg transform rotate-3 flex flex-col items-center justify-center p-2 shadow-xl backdrop-blur-sm">
        <div className="w-full h-16 bg-[var(--green)]/20 rounded mb-2 flex items-center justify-center text-2xl">
          {roomTheme === 'novice' ? '🎯' : roomTheme === 'intermediate' ? '🚀' : '🧠'}
        </div>
        <div className="w-3/4 h-2 bg-white/20 rounded-full mb-1" />
        <div className="w-1/2 h-2 bg-white/10 rounded-full" />
      </div>

      {/* The Avatar */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 drop-shadow-2xl">
        <AvatarRenderer config={avatar} size={220} />
      </div>

      {/* The Desk */}
      <div className={`absolute bottom-0 left-0 right-0 h-32 ${theme.desk} backdrop-blur-md border-t border-white/10 flex items-end justify-center pb-4 z-30 ${theme.glow}`}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        {/* Desk Items */}
        <div className="flex items-end gap-12 w-full max-w-lg px-8">
          <div className="text-4xl filter drop-shadow-xl hover:-translate-y-2 transition-transform cursor-pointer">
            {theme.items[0]}
          </div>
          <div className="flex-1" /> {/* Space for Avatar behind desk */}
          <div className="flex items-end gap-6">
            {theme.items.slice(1).map((item, i) => (
              <div key={i} className={`text-4xl filter drop-shadow-xl hover:-translate-y-2 transition-transform cursor-pointer ${i === 1 ? 'scale-75 origin-bottom' : ''}`}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ambient Lighting */}
      <div className={`absolute inset-0 mix-blend-overlay opacity-40 bg-gradient-to-t ${
        roomTheme === 'novice' ? 'from-amber-500/20 to-transparent' :
        roomTheme === 'intermediate' ? 'from-blue-500/20 to-transparent' :
        'from-fuchsia-500/30 via-transparent to-transparent'
      } pointer-events-none z-40`} />
      
      {/* Rank Indicator */}
      <div className="absolute top-4 right-4 glass px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest text-[var(--text-dim)] border-white/10 z-50 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[var(--green)] animate-pulse" />
        {roomTheme === 'novice' ? 'Bureau Novice' : roomTheme === 'intermediate' ? 'Setup Intermédiaire' : 'Station Expert'}
      </div>
    </div>
  );
}
