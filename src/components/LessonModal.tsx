import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Code2, AlertTriangle, Lightbulb, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { UniversalLesson } from '../data/universalCurriculum';

interface Props {
  lesson: UniversalLesson | null;
  onClose: () => void;
  onComplete: (id: string) => void;
  isCompleted: boolean;
}

export default function LessonModal({ lesson, onClose, onComplete, isCompleted }: Props) {
  if (!lesson) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8">
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
          className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden glass rounded-[40px] border-white/10 shadow-3xl flex flex-col"
        >
          {/* Header */}
          <div className="p-8 border-b border-white/5 flex items-center justify-between shrink-0 bg-white/[0.02]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[var(--primary)]/15 flex items-center justify-center text-xl shadow-lg border border-[var(--primary)]/20">
                🌱
              </div>
              <div>
                <h2 className="text-2xl font-black text-[var(--text-bright)]">{lesson.title}</h2>
                <p className="text-xs font-black uppercase tracking-widest text-[var(--primary)]">Leçon Universelle</p>
              </div>
            </div>
            <button onClick={onClose} className="p-3 rounded-2xl hover:bg-white/5 transition-all text-[var(--text-dim)] hover:text-white">
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-12">
            {/* Concept */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-[var(--primary)]">
                <Lightbulb size={20} />
                <h3 className="text-lg font-black uppercase tracking-widest">Le Concept</h3>
              </div>
              <p className="text-xl md:text-2xl font-medium leading-relaxed text-[var(--text-bright)]">
                {lesson.concept}
              </p>
            </section>

            {/* Analogy */}
            <section className="p-8 rounded-[32px] bg-blue-500/5 border border-blue-500/10 space-y-4">
              <div className="flex items-center gap-3 text-blue-400">
                <BookOpen size={20} />
                <h3 className="text-sm font-black uppercase tracking-widest">Analogie du monde réel</h3>
              </div>
              <p className="text-lg italic text-blue-100/80 leading-relaxed">
                "{lesson.analogy}"
              </p>
            </section>

            {/* Explanation */}
            <section className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-[var(--text-dim)]">Explications détaillées</h3>
              <p className="text-[var(--text)] leading-relaxed whitespace-pre-line text-lg">
                {lesson.explanation}
              </p>
            </section>

            {/* Code Examples */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 text-purple-400">
                <Code2 size={20} />
                <h3 className="text-sm font-black uppercase tracking-widest">Exemples multi-langages</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lesson.codeExamples.map((ex, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden border border-white/5 bg-[#0a0a0a]">
                    <div className="px-4 py-2 bg-white/5 border-b border-white/5 text-[10px] font-black uppercase tracking-widest text-white/40">
                      {ex.lang}
                    </div>
                    <pre className="p-4 text-sm font-mono text-blue-300 overflow-x-auto">
                      <code>{ex.code}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Real World */}
              <section className="space-y-3">
                <h3 className="text-sm font-black uppercase tracking-widest text-[var(--primary)]">Cas d'usage réel</h3>
                <p className="text-sm text-[var(--text-dim)] leading-relaxed">{lesson.realWorld}</p>
              </section>

              {/* Traps */}
              <section className="space-y-3">
                <h3 className="text-sm font-black uppercase tracking-widest text-red-400">Pièges courants</h3>
                <p className="text-sm text-[var(--text-dim)] leading-relaxed">{lesson.traps}</p>
              </section>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-8 border-t border-white/5 bg-white/[0.02] flex items-center justify-between shrink-0">
            <div className="text-xs text-[var(--text-dim)] font-medium">
              Suivant : <span className="text-white font-bold">{lesson.nextSteps}</span>
            </div>
            <button 
              onClick={() => { onComplete(lesson.id); onClose(); }}
              className={`px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-3 transition-all ${
                isCompleted 
                ? 'bg-white/5 text-white/50 border border-white/10'
                : 'bg-[var(--primary)] text-white shadow-[0_10px_30px_rgba(99,102,241,0.3)] hover:scale-105 active:scale-95'
              }`}
            >
              {isCompleted ? 'Déjà complété' : 'Marquer comme terminé'}
              {isCompleted ? <CheckCircle2 size={18} /> : <ArrowRight size={18} />}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
