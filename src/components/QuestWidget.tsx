import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Target, CheckCircle2, X, Trophy } from 'lucide-react';

export default function QuestWidget() {
  const { xp, completed, completedUniversal, unlockedAccessories } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  const quests = [
    { id: 1, title: 'Premiers Pas', task: 'Compléter une leçon universelle', done: completedUniversal.length > 0, icon: '🌱' },
    { id: 2, title: 'Accumulateur', task: 'Atteindre 1000 XP', done: xp >= 1000, icon: '💰' },
    { id: 3, title: 'Collectionneur', task: 'Débloquer 4 accessoires', done: unlockedAccessories.length >= 4, icon: '🎩' },
    { id: 4, title: 'Érudit', task: 'Finir le module débutant', done: completedUniversal.includes('b4_loops'), icon: '📚' },
    { id: 5, title: 'Architecte', task: 'Débloquer le module Expert', done: completedUniversal.includes('i3_objects'), icon: '🏛️' },
    { id: 6, title: 'Codeur Aguerri', task: 'Compléter 5 défis de l\'Arène', done: (completed?.length || 0) >= 5, icon: '⚔️' },
  ];

  const completedCount = quests.filter(q => q.done).length;
  const progressPct = (completedCount / quests.length) * 100;

  return (
    <div className="fixed bottom-8 left-8 z-[1000] flex flex-col items-start gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, x: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20, x: -20 }}
            className="w-80 glass rounded-[40px] border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 bg-gradient-to-br from-white/[0.05] to-transparent border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-yellow-400/20 flex items-center justify-center text-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.2)]">
                  <Trophy size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Quêtes</h3>
                  <div className="text-[9px] font-black uppercase tracking-widest text-yellow-400/60">Journal de Bord</div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-xl transition-colors text-[var(--text-dim)]">
                <X size={18} />
              </button>
            </div>

            {/* List */}
            <div className="p-6 space-y-3">
              {quests.map((q) => (
                <div 
                  key={q.id} 
                  className={`flex items-center gap-4 p-4 rounded-3xl border transition-all duration-500 ${
                    q.done 
                    ? 'bg-[var(--primary)]/5 border-[var(--primary)]/10 opacity-50 grayscale-[0.5]' 
                    : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${q.done ? 'bg-[var(--primary)]/10' : 'bg-white/5'}`}>
                    {q.done ? <CheckCircle2 size={20} className="text-[var(--primary)]" /> : q.icon}
                  </div>
                  <div className="flex-1">
                    <div className={`text-[11px] font-black uppercase tracking-wider ${q.done ? 'text-[var(--text-dim)] line-through' : 'text-white'}`}>{q.title}</div>
                    <div className="text-[9px] font-bold text-[var(--text-dim)]">{q.task}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress Footer */}
            <div className="p-8 bg-white/[0.02] border-t border-white/5 space-y-4">
              <div className="flex justify-between items-end">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-dim)]">Progression</div>
                <div className="text-xl font-black text-white">{completedCount}<span className="text-[var(--text-dim)]">/{quests.length}</span></div>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden p-0.5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  className="h-full bg-gradient-to-r from-[var(--primary)] to-[#818cf8] rounded-full shadow-[0_0_10px_var(--primary-glow)]" 
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-16 h-16 rounded-[24px] glass border-white/10 flex items-center justify-center shadow-2xl group transition-all ${isOpen ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'text-[var(--primary)]'}`}
      >
        <Target size={28} className={`${!isOpen && 'group-hover:rotate-12'} transition-transform duration-500`} />
        
        {!isOpen && completedCount < quests.length && (
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 border-[3px] border-[var(--bg)] flex items-center justify-center text-[10px] font-black text-white shadow-lg">
            {quests.length - completedCount}
          </div>
        )}
        
        {!isOpen && (
          <div className="absolute inset-0 rounded-[24px] border-2 border-[var(--primary)] animate-ping opacity-20 pointer-events-none" />
        )}
      </motion.button>
    </div>
  );
}
