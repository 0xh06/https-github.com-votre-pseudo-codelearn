import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import Seo from '../components/Seo';
import { ALGORITHMS, EXERCISES } from '../data/content';
import { Trophy, Flame, BookOpen, Code2, ChevronRight, Star, Target } from 'lucide-react';
import { getLevelInfo } from '../utils/levels';

export default function Profile() {
  const { xp, completed, favorites, streakData } = useStore();
  const levelData = getLevelInfo(xp);
  const completedAlgos = favorites.length;
  const completedExercises = completed.length;
  const totalAlgos = ALGORITHMS.length;
  const totalExercises = EXERCISES.length;

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <Seo title="Mon Profil" description="Votre tableau de bord personnel sur AlgoMaster." />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold mb-2">Mon Dashboard</h1>
        <p className="text-[var(--text-dim)]">Votre progression en un coup d'œil.</p>
      </motion.div>

      {/* Level Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-8 mb-8 bg-gradient-to-r from-[var(--bg2)] to-[var(--bg3)] border-l-4 border-l-[var(--green)]"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--green)] to-[var(--blue)] flex items-center justify-center text-3xl font-black text-black">
              {levelData.level}
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-[var(--yellow)] font-black mb-1">Niveau {levelData.level}</div>
              <div className="text-2xl font-bold text-[var(--text-bright)]">{levelData.name || 'Apprenti Codeur'}</div>
              <div className="text-sm text-[var(--text-dim)]">{xp} XP total</div>
            </div>
          </div>
          <div className="w-full md:w-64">
            <div className="flex justify-between text-xs text-[var(--text-dim)] mb-2">
              <span>Progression</span>
              <span>{xp} / {levelData.max} XP</span>
            </div>
            <div className="w-full h-3 bg-[var(--bg)] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((xp / levelData.max) * 100, 100)}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-[var(--green)] to-[var(--blue)] rounded-full"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: <Flame className="w-5 h-5 text-orange-400" />, value: streakData.count, label: 'Jours de streak', color: 'orange' },
          { icon: <BookOpen className="w-5 h-5 text-[var(--green)]" />, value: `${completedAlgos}/${totalAlgos}`, label: 'Algos étudiés', color: 'green' },
          { icon: <Code2 className="w-5 h-5 text-[var(--blue)]" />, value: `${completedExercises}/${totalExercises}`, label: 'Exercices résolus', color: 'blue' },
          { icon: <Star className="w-5 h-5 text-[var(--yellow)]" />, value: xp, label: 'XP gagnés', color: 'yellow' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="card p-6 text-center"
          >
            <div className="flex justify-center mb-3">{stat.icon}</div>
            <div className="text-2xl font-bold text-[var(--text-bright)] mb-1">{stat.value}</div>
            <div className="text-[10px] uppercase tracking-widest text-[var(--text-dim)] font-bold">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Link to="/algorithms" className="card p-6 group hover:border-[var(--green)]/50 transition-all flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[var(--green)]/10 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-[var(--green)]" />
            </div>
            <div>
              <div className="font-bold text-[var(--text-bright)]">Continuer l'apprentissage</div>
              <div className="text-sm text-[var(--text-dim)]">Reprendre là où vous vous êtes arrêté</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[var(--text-dim)] group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link to="/exercises" className="card p-6 group hover:border-[var(--blue)]/50 transition-all flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[var(--blue)]/10 rounded-xl flex items-center justify-center">
              <Code2 className="w-6 h-6 text-[var(--blue)]" />
            </div>
            <div>
              <div className="font-bold text-[var(--text-bright)]">Résoudre des exercices</div>
              <div className="text-sm text-[var(--text-dim)]">{totalExercises - completedExercises} exercices restants</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[var(--text-dim)] group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </div>
  );
}
