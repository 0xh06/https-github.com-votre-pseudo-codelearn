import React from 'react';
import { motion } from 'framer-motion';
import { Hammer, Star, Lock, ChevronRight } from 'lucide-react';
import Seo from '../components/Seo';
import { Link } from 'react-router-dom';

const PROJECTS = [
  { id: 'todo-react', title: 'Gestionnaire de Tâches React', desc: 'Construisez une Todo List avec React et Tailwind CSS. Apprenez le state management avec les Hooks.', difficulty: 'Intermédiaire', lang: 'JavaScript', xp: 500, locked: false },
  { id: 'weather-py', title: 'Bot Météo Python', desc: 'Créez un script qui appelle l\'API OpenWeather et envoie un récapitulatif météo chaque matin.', difficulty: 'Débutant', lang: 'Python', xp: 300, locked: false },
  { id: 'memory-game', title: 'Le Jeu du Memory', desc: 'Développez un jeu de memory interactif en HTML/CSS/JS vanille pour manipuler le DOM.', difficulty: 'Débutant', lang: 'JavaScript', xp: 400, locked: false },
  { id: 'api-express', title: 'API REST Sécurisée', desc: 'Montez un serveur Node.js/Express avec base de données et authentification JWT.', difficulty: 'Expert', lang: 'JavaScript', xp: 1000, locked: true }
];

export default function Projects() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-6xl relative min-h-screen">
      <Seo title="La Forge | CodeLearn" description="Construisez de vrais projets pour appliquer vos compétences." />

      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--primary)]/5 blur-[120px] -z-10 rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500/5 blur-[120px] -z-10 rounded-full" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6 text-orange-400">
          <Hammer size={16} />
          <span className="text-xs font-black uppercase tracking-[0.2em]">Au-delà de la théorie</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-[var(--font-display)] font-black text-white tracking-tighter mb-6">
          LA <span className="premium-gradient">FORGE</span>
        </h1>
        <p className="text-xl text-[var(--text-dim)] max-w-2xl mx-auto font-medium">
          Mettez les mains dans le cambouis. Construisez des projets concrets étape par étape pour passer de l'apprentissage à la création.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`glass p-8 rounded-[32px] border-white/5 relative overflow-hidden group ${project.locked ? 'opacity-70 grayscale' : 'hover:border-white/20 transition-all'}`}
          >
            {project.locked && (
              <div className="absolute inset-0 bg-black/60 z-10 flex flex-col items-center justify-center backdrop-blur-sm">
                <Lock className="w-12 h-12 text-white/50 mb-4" />
                <div className="text-sm font-black uppercase tracking-widest text-white/50">Niveau Insuffisant</div>
              </div>
            )}
            
            <div className="flex items-start justify-between mb-6">
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-lg bg-[var(--bg3)] text-[10px] font-black uppercase tracking-widest text-[var(--text-dim)] border border-white/5">
                  {project.lang}
                </span>
                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                  project.difficulty === 'Débutant' ? 'bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/20' :
                  project.difficulty === 'Intermédiaire' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                  'bg-red-500/10 text-red-500 border-red-500/20'
                }`}>
                  {project.difficulty}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[var(--yellow)]">
                <Star size={14} fill="currentColor" />
                <span className="text-xs font-black">{project.xp} XP</span>
              </div>
            </div>

            <h3 className="text-2xl font-black text-white mb-3 tracking-tight group-hover:text-[var(--primary)] transition-colors">{project.title}</h3>
            <p className="text-[var(--text-dim)] text-sm leading-relaxed mb-8 font-medium">
              {project.desc}
            </p>

            <Link 
              to={project.locked ? '#' : `/projects/${project.id}`}
              className={`w-full btn btn-primary py-3 rounded-xl text-sm flex items-center justify-center gap-2 group-hover:shadow-[0_0_20px_var(--primary-glow)] transition-all ${project.locked ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              {project.locked ? 'Verrouillé' : 'Démarrer le Projet'} <ChevronRight size={16} />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
