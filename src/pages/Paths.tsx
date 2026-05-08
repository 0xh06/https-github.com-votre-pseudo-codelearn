import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import { useStore } from '../store/useStore';
import { UNIVERSAL_CURRICULUM } from '../data/universalCurriculum';
import type { UniversalLesson } from '../data/universalCurriculum';
import AvatarRenderer from '../components/AvatarRenderer';
import LessonModal from '../components/LessonModal';
import PremiumModal from '../components/PremiumModal';
import { Lock, ChevronRight, Sparkles, CheckCircle2, Star, Zap, Award } from 'lucide-react';
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
            title: `${level.id === 'beginner' ? 'Module Débutant' : level.id === 'intermediate' ? 'Module Intermédiaire' : 'Module Expert'} Complété !`,
            reward: level.reward.name
          });
        }
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 relative">
      <Seo
        title="Parcours Universel de Programmation"
        description="Apprenez la programmation de A à Z avec notre guide progressif inspiré de Codédex. Système d'avatar et récompenses inclus."
      />

      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-[var(--primary)]/5 blur-[120px] rounded-full" />
        <div className="absolute top-[60%] right-[10%] w-[500px] h-[500px] bg-[var(--blue)]/5 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto space-y-24">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] text-[10px] font-black uppercase tracking-[0.2em]"
          >
            <Sparkles size={14} /> Le Parcours des Maîtres
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter">
            Ton <span className="premium-gradient">Odyssée</span>
          </h1>
          <p className="text-[var(--text-dim)] text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Un voyage épique à travers les fondations du code. Débloque ton potentiel et personnalise ton avatar légendaire.
          </p>
        </div>

        {/* Global Progress Dashboard */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-[48px] p-8 md:p-12 border-white/5 relative overflow-hidden group shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
            <div className="shrink-0 relative">
              <div className="absolute -inset-4 bg-[var(--primary)]/20 blur-2xl rounded-full" />
              <AvatarRenderer config={avatar} size={180} />
            </div>
            <div className="flex-1 space-y-8 text-center md:text-left">
              <div>
                <h2 className="text-4xl font-black mb-2">Progression Globale</h2>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <span className="badge border-[var(--primary)]/30 text-[var(--primary)]">
                    Rang : {completedUniversal.length === UNIVERSAL_CURRICULUM.reduce((acc, lv) => acc + lv.lessons.length, 0) ? 'Maître' : xp > 1000 ? 'Architecte' : xp > 500 ? 'Initié' : 'Apprenti'}
                  </span>
                  <span className="badge border-yellow-400/30 text-yellow-400">
                    Série : 12 Jours
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-1">
                  <div className="text-3xl font-black text-[var(--primary)]">{xp}</div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-[var(--text-dim)] flex items-center gap-1.5 justify-center md:justify-start">
                    <Zap size={10} /> Points XP
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-black text-[var(--blue)]">{completedUniversal.length}</div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-[var(--text-dim)] flex items-center gap-1.5 justify-center md:justify-start">
                    <Award size={10} /> Leçons
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-black text-[var(--purple)]">3</div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-[var(--text-dim)] flex items-center gap-1.5 justify-center md:justify-start">
                    <Star size={10} /> Modules
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* The Roadmap (The Path) */}
        <div className="space-y-40 relative pb-20">
          {/* Visual SVG Path Connection */}
          <div className="absolute left-1/2 top-20 bottom-0 w-[2px] hidden md:block overflow-visible -translate-x-1/2">
            <svg width="100" height="100%" className="absolute inset-0 overflow-visible opacity-10">
              <path 
                d="M 50 0 Q 150 200, 50 400 T 50 800 T 50 1200" 
                fill="none" 
                stroke="url(#path-gradient)" 
                strokeWidth="4" 
                strokeDasharray="12 12"
              />
              <defs>
                <linearGradient id="path-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" />
                  <stop offset="50%" stopColor="var(--blue)" />
                  <stop offset="100%" stopColor="var(--purple)" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {UNIVERSAL_CURRICULUM.map((level, lIndex) => {
            const unlocked = isLevelUnlocked(level.id);
            const levelProgress = level.lessons.filter(ls => completedUniversal.includes(ls.id)).length;
            const progressPct = (levelProgress / level.lessons.length) * 100;

            return (
              <div key={level.id} className="relative">
                {/* Level Header Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`mb-20 flex flex-col items-center text-center space-y-6 relative z-10 ${!unlocked ? 'opacity-40 grayscale' : ''}`}
                >
                  <div className={`w-28 h-28 rounded-[40px] flex items-center justify-center text-5xl shadow-2xl border-4 relative group ${
                    level.id === 'beginner' ? 'bg-[var(--primary)]/20 border-[var(--primary)]/30' :
                    level.id === 'intermediate' ? 'bg-[var(--blue)]/20 border-[var(--blue)]/30' :
                    'bg-[var(--purple)]/20 border-[var(--purple)]/30'
                  }`}>
                    <div className="absolute inset-0 rounded-[36px] blur-xl opacity-0 group-hover:opacity-50 transition-opacity bg-current" />
                    {level.id === 'beginner' ? '🌱' : level.id === 'intermediate' ? '🏛️' : '👑'}
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-4xl font-black tracking-tight">{level.title}</h2>
                    <p className="text-[var(--text-dim)] font-bold text-lg max-w-md">{level.subtitle}</p>
                  </div>
                  
                  {/* Premium Progress Track */}
                  <div className="w-64 h-3 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPct}%` }}
                      className={`h-full rounded-full ${
                        level.id === 'beginner' ? 'bg-gradient-to-r from-[var(--primary)] to-[#818cf8]' :
                        level.id === 'intermediate' ? 'bg-gradient-to-r from-[var(--blue)] to-[#00d2ff]' :
                        'bg-gradient-to-r from-[var(--purple)] to-[#ff00ff]'
                      }`}
                      style={{ boxShadow: '0 0 15px currentColor' }}
                    />
                  </div>
                </motion.div>

                {/* Lessons Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                  {!unlocked && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[var(--bg)]/60 backdrop-blur-md rounded-[48px] border border-white/5 p-8 text-center shadow-2xl">
                      <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                        <Lock className="text-white/40" size={40} />
                      </div>
                      <h3 className="text-2xl font-black mb-2">Accès Restreint</h3>
                      <p className="text-sm text-[var(--text-dim)] max-w-xs font-medium">Complète le module précédent pour débloquer ces secrets.</p>
                    </div>
                  )}

                  {level.lessons.map((lesson, index) => {
                    const isDone = completedUniversal.includes(lesson.id);
                    return (
                      <motion.div
                        key={lesson.id}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        onClick={() => unlocked && setSelectedLesson(lesson)}
                        className={`group relative p-10 rounded-[40px] glass border-white/5 transition-all duration-500 ${
                          unlocked ? 'cursor-pointer hover:border-[var(--primary)]/40 hover:bg-white/[0.03] hover:-translate-y-2' : 'opacity-20 select-none'
                        }`}
                      >
                        {isDone ? (
                          <div className="absolute top-6 right-6 px-4 py-1.5 rounded-full bg-[var(--primary)]/20 border border-[var(--primary)]/30 flex items-center gap-2 text-[10px] font-black text-[var(--primary)] uppercase tracking-widest shadow-lg shadow-[var(--primary)]/10">
                            <CheckCircle2 size={14} /> Validé
                          </div>
                        ) : unlocked ? (
                          <div className="absolute top-6 right-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-2 text-[10px] font-black text-[var(--text-dim)] uppercase tracking-widest group-hover:text-[var(--primary)] group-hover:border-[var(--primary)]/30 transition-colors">
                            En cours
                          </div>
                        ) : null}
                        
                        <div className="flex flex-col items-start gap-8">
                          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-inner border border-white/5">
                            {lIndex === 0 ? '🍃' : lIndex === 1 ? '🧱' : '💎'}
                          </div>
                          <div className="space-y-3">
                            <h3 className="text-2xl font-black group-hover:text-[var(--text-bright)] transition-colors tracking-tight">{lesson.title}</h3>
                            <p className="text-[var(--text-dim)] font-medium leading-relaxed">{lesson.concept}</p>
                            <div className="pt-6 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.15em] text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0">
                              Lancer la leçon <ChevronRight size={16} />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Reward Preview Card */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className={`mt-20 p-10 rounded-[48px] border border-white/5 flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-white/[0.02] to-transparent ${!unlocked ? 'opacity-40' : ''}`}
                >
                  <div className="flex items-center gap-6 text-center md:text-left mb-8 md:mb-0">
                    <div className="w-20 h-20 rounded-3xl bg-yellow-400/10 flex items-center justify-center text-4xl shadow-2xl border border-yellow-400/20">
                      🎁
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400 mb-1">Trésor du Module</div>
                      <div className="text-2xl font-black text-white">{level.reward.name} {level.reward.icon}</div>
                    </div>
                  </div>
                  <div className={`px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
                    unlocked && levelProgress === level.lessons.length 
                    ? 'bg-[var(--primary)] text-white shadow-xl shadow-[var(--primary)]/20' 
                    : 'glass border-white/10 text-[var(--text-dim)]'
                  }`}>
                    {unlocked && levelProgress === level.lessons.length ? 'Récompense Obtenue ✅' : `${levelProgress}/${level.lessons.length} Leçons`}
                  </div>
                </motion.div>
              </div>
            );
          })}
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
        subtitle={`Tu as débloqué l'accessoire : ${showRewardModal?.reward}. Il t'attend dans le Studio d'Avatar !`}
        xpEarned={500}
        badge={{ icon: '🎖️', name: 'Nouveau Grade', color: '#6366f1' }}
        actionLabel="Studio d'Avatar"
        onAction={() => { setShowRewardModal(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
      />
    </div>
  );
}
