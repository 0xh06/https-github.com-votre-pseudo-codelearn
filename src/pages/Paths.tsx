import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import { useStore } from '../store/useStore';
import { UNIVERSAL_CURRICULUM } from '../data/universalCurriculum';
import type { UniversalLesson } from '../data/universalCurriculum';
import AvatarCreator from '../components/AvatarCreator';
import AvatarRenderer from '../components/AvatarRenderer';
import LessonModal from '../components/LessonModal';
import PremiumModal from '../components/PremiumModal';
import { Lock, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Paths() {
  const { 
    xp, 
    addXp, 
    completedUniversal, 
    toggleUniversalCompleted, 
    unlockAccessory,
    avatar 
  } = useStore();
  
  const [selectedLesson, setSelectedLesson] = useState<UniversalLesson | null>(null);
  const [showRewardModal, setShowRewardModal] = useState<{title: string, reward: string} | null>(null);

  const isLevelUnlocked = (levelId: string) => {
    if (levelId === 'beginner') return true;
    if (levelId === 'intermediate') {
      const beginnerLessons = UNIVERSAL_CURRICULUM.find(l => l.id === 'beginner')?.lessons || [];
      return beginnerLessons.every(l => completedUniversal.includes(l.id));
    }
    if (levelId === 'expert') {
      const intermediateLessons = UNIVERSAL_CURRICULUM.find(l => l.id === 'intermediate')?.lessons || [];
      return intermediateLessons.every(l => completedUniversal.includes(l.id));
    }
    return false;
  };

  const handleLessonComplete = (id: string) => {
    if (!completedUniversal.includes(id)) {
      toggleUniversalCompleted(id);
      addXp(100);
      toast.success("+100 XP ! Leçon validée.");

      // Check if level just completed
      const level = UNIVERSAL_CURRICULUM.find(lv => lv.lessons.some(ls => ls.id === id));
      if (level) {
        const allDone = level.lessons.every(ls => 
          ls.id === id || completedUniversal.includes(ls.id)
        );
        if (allDone) {
          unlockAccessory(level.reward.id);
          setShowRewardModal({
            title: `Niveau ${level.id === 'beginner' ? 'Débutant' : level.id === 'intermediate' ? 'Intermédiaire' : 'Expert'} Complété !`,
            reward: level.reward.name
          });
        }
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <Seo
        title="Guide Universel de Programmation"
        description="Apprenez la programmation de A à Z avec notre guide progressif inspiré de Codédex. Système d'avatar et récompenses inclus."
      />

      <div className="max-w-5xl mx-auto space-y-24">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--green)]/10 border border-[var(--green)]/20 text-[var(--green)] text-xs font-black uppercase tracking-widest"
          >
            <Sparkles size={14} /> Le Guide des Maîtres
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
            Ton Voyage <span className="premium-gradient">CodeMaster</span>
          </h1>
          <p className="text-[var(--text-dim)] text-lg max-w-2xl mx-auto font-medium">
            De simple graine à couronne d'expert. Apprends les concepts universels de la programmation et personnalise ton avatar au fil de ta progression.
          </p>
        </div>

        {/* Avatar Creator Section */}
        <AvatarCreator />

        {/* The Roadmap (The Path) */}
        <div className="space-y-32 relative">
          {/* Vertical Path Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--green)] via-[var(--blue)] to-[var(--purple)] opacity-10 hidden md:block" />

          {UNIVERSAL_CURRICULUM.map((level, lIndex) => {
            const unlocked = isLevelUnlocked(level.id);
            const levelProgress = level.lessons.filter(ls => completedUniversal.includes(ls.id)).length;
            const progressPct = (levelProgress / level.lessons.length) * 100;

            return (
              <div key={level.id} className="relative">
                {/* Level Header */}
                <div className={`mb-16 flex flex-col items-center text-center space-y-4 ${!unlocked ? 'opacity-40 grayscale' : ''}`}>
                  <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-3xl shadow-2xl border-4 ${
                    level.id === 'beginner' ? 'bg-[var(--green)]/20 border-[var(--green)]/30' :
                    level.id === 'intermediate' ? 'bg-[var(--blue)]/20 border-[var(--blue)]/30' :
                    'bg-[var(--purple)]/20 border-[var(--purple)]/30'
                  }`}>
                    {level.id === 'beginner' ? '🌱' : level.id === 'intermediate' ? '🏗️' : '👑'}
                  </div>
                  <h2 className="text-3xl font-black">{level.title}</h2>
                  <p className="text-[var(--text-dim)] font-medium max-w-md">{level.subtitle}</p>
                  
                  {/* Progress Bar Mini */}
                  <div className="w-48 h-2 bg-white/5 rounded-full overflow-hidden mt-4">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPct}%` }}
                      className={`h-full ${
                        level.id === 'beginner' ? 'bg-[var(--green)]' :
                        level.id === 'intermediate' ? 'bg-[var(--blue)]' :
                        'bg-[var(--purple)]'
                      }`}
                    />
                  </div>
                </div>

                {/* Lessons Grid/Path */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                  {!unlocked && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[var(--bg)]/40 backdrop-blur-sm rounded-[40px] border border-white/5 p-8 text-center">
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                        <Lock className="text-white/20" size={32} />
                      </div>
                      <h3 className="text-xl font-black mb-2">Niveau Verrouillé</h3>
                      <p className="text-sm text-[var(--text-dim)] max-w-xs">Complète toutes les leçons du niveau précédent pour débloquer ces connaissances.</p>
                    </div>
                  )}

                  {level.lessons.map((lesson, index) => {
                    const isDone = completedUniversal.includes(lesson.id);
                    return (
                      <motion.div
                        key={lesson.id}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        onClick={() => unlocked && setSelectedLesson(lesson)}
                        className={`group relative p-8 rounded-[32px] glass border-white/5 transition-all ${
                          unlocked ? 'cursor-pointer hover:border-white/20 hover:bg-white/[0.02] hover:-translate-y-1' : 'opacity-20 select-none'
                        }`}
                      >
                        {isDone && (
                          <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[var(--green)]/20 flex items-center justify-center text-[var(--green)]">
                            <CheckCircle2 size={16} />
                          </div>
                        )}
                        <div className="flex items-start gap-6">
                          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-inner">
                            {lIndex === 0 ? '🍃' : lIndex === 1 ? '🧱' : '💎'}
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-xl font-black group-hover:text-[var(--text-bright)] transition-colors">{lesson.title}</h3>
                            <p className="text-sm text-[var(--text-dim)] font-medium leading-relaxed">{lesson.concept}</p>
                            <div className="pt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[var(--green)] opacity-0 group-hover:opacity-100 transition-opacity">
                              Commencer la leçon <ChevronRight size={14} />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Level Reward Preview */}
                <div className={`mt-16 p-8 rounded-[32px] border-2 border-dashed border-white/10 flex items-center justify-between bg-white/[0.01] ${!unlocked ? 'opacity-40' : ''}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xl">
                      🎁
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-[var(--text-dim)]">Récompense de niveau</div>
                      <div className="text-sm font-bold text-white">{level.reward.name} {level.reward.icon}</div>
                    </div>
                  </div>
                  <div className="px-4 py-2 rounded-xl glass border-white/10 text-[10px] font-black text-[var(--text-dim)] uppercase">
                    {unlocked && levelProgress === level.lessons.length ? 'Débloqué ✅' : 'À débloquer'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Progress Dashboard */}
        <div className="glass rounded-[40px] p-12 border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--green)]/5 blur-[100px] -z-10" />
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="shrink-0 scale-125">
              <AvatarRenderer config={avatar} size={160} />
            </div>
            <div className="flex-1 space-y-6 text-center md:text-left">
              <h2 className="text-3xl font-black">Ta progression CodeMaster</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="text-2xl font-black text-[var(--green)]">{xp}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[var(--text-dim)]">Points XP</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="text-2xl font-black text-[var(--blue)]">{completedUniversal.length}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[var(--text-dim)]">Leçons Apprises</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="text-2xl font-black text-[var(--purple)]">
                    {completedUniversal.length === UNIVERSAL_CURRICULUM.reduce((acc, lv) => acc + lv.lessons.length, 0) ? 'Expert' : xp > 500 ? 'Initié' : 'Novice'}
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[var(--text-dim)]">Rang Actuel</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="text-2xl font-black text-[var(--yellow)]">3</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[var(--text-dim)]">Étapes Roadmap</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LessonModal 
        lesson={selectedLesson} 
        onClose={() => setSelectedLesson(null)} 
        onComplete={handleLessonComplete}
        isCompleted={selectedLesson ? completedUniversal.includes(selectedLesson.id) : false}
      />

      <PremiumModal 
        isOpen={!!showRewardModal}
        onClose={() => setShowRewardModal(null)}
        title={showRewardModal?.title || ''}
        subtitle={`Tu as débloqué l'accessoire : ${showRewardModal?.reward}. Va le tester dans le créateur d'avatar !`}
        xpEarned={500}
        badge={{ icon: '🎖️', name: 'Nouveau Grade', color: '#10b981' }}
        actionLabel="Voir mon avatar"
        onAction={() => { setShowRewardModal(null); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
      />
    </div>
  );
}
