import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles, Bot, Zap, Brain, UserPlus, BookOpen, Trophy, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ALGORITHMS, EXERCISES } from '../data/content';
import Seo from '../components/Seo';

export default function Home() {
  return (
    <div className="flex flex-col justify-center pt-20">
      <Seo
        title="Accueil"
        description="Plateforme francophone interactive pour apprendre les algorithmes, structures de donnees et langages."
      />
      <div className="container mx-auto px-4">
        {/* HERO SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1.5 bg-green-500/10 text-[var(--green)] rounded-full text-sm font-semibold mb-6 border border-green-500/20">
            ✨ Nouveau : Assistant IA intégré
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold leading-tight text-[var(--text-bright)] mb-6 tracking-tight">
            Maîtrisez <span className="text-transparent bg-clip-text bg-gradient-to-br from-[var(--green)] to-[#00ff88]">l'art du code</span>
          </h1>
          <p className="text-lg md:text-2xl text-[var(--text-dim)] mb-10 font-medium max-w-2xl mx-auto">
            La plateforme francophone interactive pour apprendre les algorithmes, les structures de données et les langages.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/algorithms" className="btn btn-primary px-8 py-3 rounded-full text-lg flex items-center gap-2 group">
              🚀 Démarrer l'apprentissage
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/exercises" className="btn btn-secondary px-8 py-3 rounded-full text-lg">
              ⚡ S'entraîner
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-[var(--text-dim)] text-sm font-medium">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[var(--green)] rounded-full animate-pulse" />
              Assistant IA disponible
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[var(--blue)] rounded-full" />
              100% Interactif
            </div>
          </div>
        </motion.div>

        {/* STATS SECTION — Real numbers */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 my-20"
        >
          <div className="text-center p-6 card">
            <div className="text-4xl font-bold text-[var(--green)] mb-2">{ALGORITHMS.length}</div>
            <div className="text-sm text-[var(--text-dim)] uppercase tracking-wider font-semibold">Algorithmes</div>
          </div>
          <div className="text-center p-6 card">
            <div className="text-4xl font-bold text-[var(--blue)] mb-2">{EXERCISES.length}</div>
            <div className="text-sm text-[var(--text-dim)] uppercase tracking-wider font-semibold">Exercices</div>
          </div>
          <div className="text-center p-6 card">
            <div className="text-4xl font-bold text-[var(--purple)] mb-2">4</div>
            <div className="text-sm text-[var(--text-dim)] uppercase tracking-wider font-semibold">Langages</div>
          </div>
          <div className="text-center p-6 card">
            <div className="text-4xl font-bold text-[var(--yellow)] mb-2">3</div>
            <div className="text-sm text-[var(--text-dim)] uppercase tracking-wider font-semibold">Parcours</div>
          </div>
        </motion.div>

        {/* HOW IT WORKS */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="my-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comment ça marche ?</h2>
            <p className="text-[var(--text-dim)] max-w-xl mx-auto">3 étapes simples pour devenir un développeur compétent.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <UserPlus className="w-8 h-8" />, step: '01', title: 'Créez votre compte', desc: 'Inscrivez-vous gratuitement en 10 secondes avec GitHub ou Google.' },
              { icon: <BookOpen className="w-8 h-8" />, step: '02', title: 'Apprenez à votre rythme', desc: 'Explorez les algorithmes, résolvez des exercices et suivez votre roadmap personnalisée.' },
              { icon: <Trophy className="w-8 h-8" />, step: '03', title: 'Devenez expert', desc: 'Gagnez de l\'XP, débloquez des niveaux et préparez vos entretiens techniques.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="card p-8 text-center relative overflow-hidden group hover:border-[var(--green)]/50 transition-all"
              >
                <div className="absolute top-4 right-4 text-6xl font-black text-[var(--text-dim)] opacity-5">{item.step}</div>
                <div className="w-16 h-16 bg-[var(--green)]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[var(--green)] group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-sm text-[var(--text-dim)] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FEATURED ALGOS */}
        <div className="my-32">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Algorithmes Populaires</h2>
              <p className="text-[var(--text-dim)]">Commencez par les bases incontournables.</p>
            </div>
            <Link to="/algorithms" className="text-[var(--green)] font-bold hover:underline">Voir tout →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ALGORITHMS.slice(0, 3).map((algo, i) => (
              <Link key={algo.id} to={`/algorithms/${algo.id}`}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="card group hover:border-[var(--green)]"
                >
                  <div className="text-xs font-bold text-[var(--green)] mb-2 uppercase tracking-widest">{algo.category}</div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--green)] transition-colors">{algo.name}</h3>
                  <p className="text-sm text-[var(--text-dim)] line-clamp-2">{algo.description}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* TESTIMONIALS */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="my-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ce qu'en disent nos étudiants</h2>
            <p className="text-[var(--text-dim)]">Des retours de développeurs qui ont progressé grâce à CodeLearn.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Youssef A.', role: 'Étudiant en informatique', text: 'CodeLearn m\'a permis de comprendre les algorithmes de tri en une semaine. L\'éditeur de code intégré est un game changer !' },
              { name: 'Sarah M.', role: 'Développeuse Junior', text: 'La roadmap est incroyable. J\'ai suivi le parcours "Fondamentaux" et j\'ai décroché mon premier entretien technique.' },
              { name: 'Karim B.', role: 'Ingénieur Full-Stack', text: 'J\'utilise les exercices pour rester sharp sur les structures de données. Le chatbot IA est très utile quand on est bloqué.' },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-8 relative"
              >
                <Quote className="w-8 h-8 text-[var(--green)] opacity-20 absolute top-6 right-6" />
                <p className="text-sm text-[var(--text-dim)] mb-6 leading-relaxed italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--green)] to-[var(--blue)] flex items-center justify-center text-sm font-bold text-black">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[var(--text-bright)]">{t.name}</div>
                    <div className="text-[10px] text-[var(--text-dim)] uppercase tracking-wider">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
