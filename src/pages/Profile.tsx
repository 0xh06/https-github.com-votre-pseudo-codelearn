import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import Seo from '../components/Seo';
import { ALGORITHMS, EXERCISES } from '../data/content';
import { Trophy, Flame, BookOpen, Code2, ChevronRight, Star, Target, Settings, Share2, Crown, Zap } from 'lucide-react';
import { getLevelInfo } from '../utils/levels';
import AvatarRenderer from '../components/AvatarRenderer';

export default function Profile() {
  const { xp, completed, favorites, streakData, avatar, user } = useStore();
  const levelData = getLevelInfo(xp);
  const completedAlgos = favorites.length;
  const completedExercises = completed.length;
  const totalAlgos = ALGORITHMS.length;
  const totalExercises = EXERCISES.length;

  return (
    <div className="container mx-auto px-4 py-24 max-w-6xl relative overflow-hidden">
      <Seo title="Mon Profil | CodeLearn" description="Consulte ton tableau de bord personnel, tes stats et ton avatar sur CodeLearn." />

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--primary)]/5 blur-[120px] -z-10 rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--blue)]/5 blur-[120px] -z-10 rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
            <Crown className="text-[var(--yellow)] w-3 h-3" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--text-dim)]">Tableau de Bord Personnel</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">VOTRE <span className="premium-gradient">ASCENSION</span></h1>
          <p className="text-[var(--text-dim)] text-xl font-medium mt-2">Prêt à franchir le prochain palier, {user?.email?.split('@')[0] || 'Codeur'} ?</p>
        </div>
        
        <div className="flex gap-3">
          <Link to="/settings" className="p-4 rounded-2xl glass border-white/5 text-[var(--text-dim)] hover:text-white transition-all">
            <Settings size={20} />
          </Link>
          <button className="p-4 rounded-2xl glass border-white/5 text-[var(--text-dim)] hover:text-white transition-all">
            <Share2 size={20} />
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Identity Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-5 space-y-8"
        >
          <div className="glass p-12 rounded-[48px] border-white/10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="mb-8 p-1 rounded-[40px] border-2 border-white/10 shadow-2xl relative">
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-2xl bg-[var(--primary)] text-white flex items-center justify-center font-black text-xl shadow-lg border-2 border-[var(--bg)]">
                  {levelData.level}
                </div>
                <AvatarRenderer config={avatar} size={240} />
              </div>
              
              <div className="text-center space-y-2">
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--primary)]">Grade Actuel</div>
                <h2 className="text-3xl font-black text-white tracking-tight">{levelData.name}</h2>
                <div className="flex items-center justify-center gap-2 text-[var(--text-dim)] font-medium">
                  <Star size={14} className="text-[var(--yellow)]" fill="currentColor" />
                  {xp.toLocaleString()} TOTAL XP
                </div>
              </div>

              <div className="w-full mt-10 space-y-3">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-[var(--text-dim)]">
                  <span>Progression Niveau</span>
                  <span className="text-white">{xp} / {levelData.max} XP</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((xp / levelData.max) * 100, 100)}%` }}
                    className="h-full bg-gradient-to-r from-[var(--primary)] to-[#818cf8] rounded-full shadow-[0_0_10px_var(--primary-glow)]"
                  />
                </div>
              </div>
            </div>
          </div>

          <Link to="/avatar" className="block p-8 rounded-[40px] bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-white/10 hover:border-white/20 transition-all group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform">🎭</div>
                <div>
                  <div className="font-black text-white text-lg">Studio d'Avatar</div>
                  <div className="text-sm text-[var(--text-dim)]">Personnalise ton identité</div>
                </div>
              </div>
              <ChevronRight className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        </motion.div>

        {/* Stats & Activity */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-7 space-y-8"
        >
          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: <Flame className="w-6 h-6 text-orange-400" />, value: streakData.count, label: 'Série Actuelle', sub: 'Jours consécutifs' },
              { icon: <Zap className="w-6 h-6 text-[var(--blue)]" />, value: completedExercises, label: 'Défis Relevés', sub: `${totalExercises - completedExercises} restants` },
              { icon: <BookOpen className="w-6 h-6 text-[var(--primary)]" />, value: completedAlgos, label: 'Algos Maîtrisés', sub: `${totalAlgos} au total` },
              { icon: <Star className="w-6 h-6 text-[var(--yellow)]" />, value: favorites.length, label: 'Coups de Cœur', sub: 'Algorithmes favoris' },
            ].map((stat, i) => (
              <div key={i} className="glass p-8 rounded-[40px] border-white/5 space-y-4 hover:border-white/10 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-3xl font-black text-white">{stat.value}</div>
                  <div className="text-xs font-black uppercase tracking-widest text-[var(--text-dim)]">{stat.label}</div>
                  <div className="text-[10px] text-[var(--text-dim)]/60 font-medium">{stat.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="glass p-10 rounded-[48px] border-white/5 space-y-8">
            <h3 className="text-2xl font-black text-white tracking-tight">Prochaines Étapes</h3>
            
            <div className="space-y-4">
              <Link to="/paths" className="flex items-center justify-between p-6 rounded-3xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                    <Target size={28} />
                  </div>
                  <div>
                    <div className="font-black text-white text-lg">Parcours Universel</div>
                    <div className="text-sm text-[var(--text-dim)]">Continue ton ascension vers le grade d'Expert</div>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[var(--primary)] group-hover:text-white transition-all">
                  <ChevronRight size={20} />
                </div>
              </Link>

              <Link to="/flashcards" className="flex items-center justify-between p-6 rounded-3xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--blue)]/10 flex items-center justify-center text-[var(--blue)]">
                    <Star size={28} />
                  </div>
                  <div>
                    <div className="font-black text-white text-lg">Révisions Éclair</div>
                    <div className="text-sm text-[var(--text-dim)]">Renforce ta mémoire avec les flashcards</div>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[var(--blue)] group-hover:text-white transition-all">
                  <ChevronRight size={20} />
                </div>
              </Link>
            </div>
          </div>
          
          {/* Badges & Achievements Section */}
          <div className="glass p-10 rounded-[48px] border-white/5 space-y-8 mt-8">
            <div className="flex items-center gap-3 mb-4">
              <Crown className="w-8 h-8 text-[var(--yellow)]" />
              <h3 className="text-2xl font-black text-white tracking-tight">Badges & Succès</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { id: 'first_steps', name: 'Explorateur', desc: 'Première connexion', icon: '🗺️', unlocked: true },
                { id: 'streak_3', name: 'Régulier', desc: 'Série de 3 jours', icon: '🔥', unlocked: streakData.count >= 3 },
                { id: 'xp_1000', name: 'Apprenti', desc: '1000 XP atteints', icon: '🌱', unlocked: xp >= 1000 },
                { id: 'xp_5000', name: 'Initié', desc: '5000 XP atteints', icon: '⚔️', unlocked: xp >= 5000 },
                { id: '10_algos', name: 'Cerveau', desc: '10 Algos maîtrisés', icon: '🧠', unlocked: completedAlgos >= 10 },
                { id: 'module_1', name: 'Diplômé', desc: 'Module débutant fini', icon: '🎓', unlocked: completed.length >= 5 },
                { id: 'collector', name: 'Fashion', desc: '3 accessoires', icon: '🕶️', unlocked: avatar.accessory !== null },
                { id: 'legend', name: 'Légende', desc: '10000 XP', icon: '👑', unlocked: xp >= 10000 },
              ].map(badge => (
                <div 
                  key={badge.id}
                  className={`p-4 rounded-3xl border flex flex-col items-center text-center transition-all duration-500 ${
                    badge.unlocked 
                    ? 'bg-gradient-to-br from-[var(--primary)]/10 to-[var(--purple)]/10 border-[var(--primary)]/20 shadow-[0_0_15px_var(--primary-glow)] group hover:scale-105' 
                    : 'bg-white/5 border-white/5 opacity-50 grayscale'
                  }`}
                  title={badge.desc}
                >
                  <div className={`text-4xl mb-3 ${badge.unlocked ? 'group-hover:scale-110 transition-transform' : ''}`}>
                    {badge.icon}
                  </div>
                  <div className="font-black text-white text-sm">{badge.name}</div>
                  <div className="text-[9px] font-bold text-[var(--text-dim)] mt-1 uppercase tracking-widest">{badge.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
