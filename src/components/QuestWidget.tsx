import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Target, CheckCircle2, ChevronRight, X } from 'lucide-react';

export default function QuestWidget() {
  const { xp, completedUniversal } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  const quests = [
    { id: 1, title: 'Premiers Pas', task: 'Compléter une leçon universelle', done: completedUniversal.length > 0 },
    { id: 2, title: 'Accumulateur', task: 'Atteindre 500 XP', done: xp >= 500 },
    { id: 3, title: 'Explorateur', task: 'Visiter la page des langages', done: true }, // Simple example
  ];

  const completedCount = quests.filter(q => q.done).length;

  return (
    <div className="fixed bottom-8 right-8 z-[1000]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-80 glass rounded-[32px] border-white/10 shadow-3xl overflow-hidden"
          >
            <div className="p-6 bg-white/5 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[var(--green)]/20 flex items-center justify-center text-[var(--green)]">
                  <Target size={18} />
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest">Tes Quêtes</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <X size={16} className="text-[var(--text-dim)]" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {quests.map((q) => (
                <div key={q.id} className={`flex items-start gap-4 p-3 rounded-2xl border transition-all ${q.done ? 'bg-[var(--green)]/5 border-[var(--green)]/20 opacity-60' : 'bg-white/5 border-white/5'}`}>
                  <div className={`mt-0.5 ${q.done ? 'text-[var(--green)]' : 'text-[var(--text-dim)]'}`}>
                    {q.done ? <CheckCircle2 size={16} /> : <div className="w-4 h-4 rounded-full border-2 border-current opacity-30" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[var(--text-bright)]">{q.title}</div>
                    <div className="text-[10px] text-[var(--text-dim)]">{q.task}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-[var(--green)]/10 text-center">
              <div className="text-[10px] font-black uppercase tracking-widest text-[var(--green)] mb-1">
                Progression Globale
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(completedCount / quests.length) * 100}%` }}
                    className="h-full bg-[var(--green)]" 
                  />
                </div>
                <span className="text-[10px] font-bold text-[var(--green)]">{completedCount}/{quests.length}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 rounded-2xl bg-[var(--bg2)] glass border-white/10 flex items-center justify-center text-[var(--green)] shadow-2xl group"
      >
        <Target size={24} className="group-hover:rotate-12 transition-transform" />
        {completedCount < quests.length && (
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 border-2 border-[var(--bg)] flex items-center justify-center text-[10px] font-black text-white">
            {quests.length - completedCount}
          </div>
        )}
        
        {/* Pulse ring when closed */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-2xl border-2 border-[var(--green)] animate-ping opacity-20" />
        )}
      </motion.button>
    </div>
  );
}
