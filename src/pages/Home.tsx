import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Bot,
  UserPlus,
  BookOpen,
  Trophy,
  Quote,
  Target,
  Building2,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Zap,
  Terminal,
  Brain,
  Lock,
} from 'lucide-react';
import { ALGORITHMS, EXERCISES } from '../data/content';
import Seo from '../components/Seo';
import HeroTerminal from '../components/HeroTerminal';
import AvatarRenderer from '../components/AvatarRenderer';
import { useStore } from '../store/useStore';

export default function Home() {
  const { avatar } = useStore();

  return (
    <div className="flex flex-col justify-center pt-20 overflow-hidden">
      <Seo
        title="Accueil | Devenez un Maître des Algorithmes"
        description="Préparez vos entretiens techniques avec une plateforme gamifiée. Algorithmes, exercices interactifs, tests automatiques et système d'avatar premium."
      />

      {/* Hero Background Elements */}
      <div className="absolute top-0 inset-x-0 h-[1000px] pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-[var(--primary)]/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-[var(--blue)]/10 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      </div>

      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="relative pt-12 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <Sparkles className="text-[var(--primary)] w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-dim)]">Plateforme de Programmation Nouvelle Génération</span>
            </div>
            
            <h1 className="text-6xl md:text-9xl font-black leading-[0.9] tracking-tighter text-white">
              DOMINE LE <br />
              <span className="premium-gradient">CODE.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-[var(--text-dim)] font-medium max-w-3xl mx-auto leading-relaxed">
              CodeLearn transforme l'apprentissage des algorithmes en une aventure épique. 
              Maîtrise les structures de données, valide tes acquis avec des tests réels et forge ton identité numérique.
            </p>

            <div className="flex gap-6 justify-center flex-wrap pt-4">
              <Link
                to="/signup"
                className="group relative px-10 py-5 bg-[var(--primary)] text-white rounded-[24px] font-black text-lg flex items-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(99,102,241,0.3)]"
              >
                Commencer l'Aventure
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/paths" 
                className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-[24px] font-black text-lg transition-all hover:bg-white/10 hover:border-white/20 backdrop-blur-sm"
              >
                Explorer le Parcours
              </Link>
            </div>
          </motion.div>

          {/* Hero Visuals */}
          <div className="mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="lg:col-span-7"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[var(--primary)] to-[var(--blue)] rounded-[32px] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <HeroTerminal />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="lg:col-span-5 flex flex-col items-center justify-center space-y-8"
            >
              <div className="glass p-12 rounded-[48px] border-white/10 relative group shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-transparent rounded-[48px] opacity-0 group-hover:opacity-100 transition-opacity" />
                <AvatarRenderer config={avatar} size={280} />
                <div className="mt-8 text-center space-y-2">
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--primary)]">Ton Avatar Évolutif</div>
                  <div className="text-2xl font-black text-white">Prêt pour la Quête ?</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features Grid */}
        <section className="py-32">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">Pourquoi CodeLearn ?</h2>
            <p className="text-[var(--text-dim)] text-xl max-w-2xl mx-auto">Une approche holistique pour devenir un ingénieur d'élite.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="w-8 h-8 text-[var(--primary)]" />,
                title: 'Intelligence Cognitive',
                text: 'Nos algorithmes de répétition espacée optimisent ta mémorisation sur le long terme.',
                color: 'var(--primary)'
              },
              {
                icon: <Terminal className="w-8 h-8 text-[var(--blue)]" />,
                title: 'Pratique Réelle',
                text: 'Éditeur Monaco professionnel avec tests unitaires automatisés pour chaque exercice.',
                color: 'var(--blue)'
              },
              {
                icon: <Trophy className="w-8 h-8 text-[var(--purple)]" />,
                title: 'Gamification Profonde',
                text: 'Gagne de l\'XP, monte en grade et débloque des items exclusifs pour ton avatar.',
                color: 'var(--purple)'
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="p-10 rounded-[40px] glass border-white/5 flex flex-col gap-6 group transition-all"
              >
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center border transition-all duration-500 group-hover:scale-110"
                  style={{ backgroundColor: `${f.color}10`, borderColor: `${f.color}20` }}
                >
                  {f.icon}
                </div>
                <h3 className="text-2xl font-black text-white">{f.title}</h3>
                <p className="text-[var(--text-dim)] font-medium leading-relaxed">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { n: '100+', l: 'Algorithmes', c: 'var(--primary)' },
              { n: '50+', l: 'Exercices', c: 'var(--blue)' },
              { n: '24/7', l: 'Apprentissage', c: 'var(--purple)' },
              { n: '98%', l: 'Satisfaction', c: 'var(--yellow)' },
            ].map((s, i) => (
              <div key={i} className="text-center space-y-2">
                <div className="text-5xl md:text-7xl font-black tracking-tighter" style={{ color: s.c }}>{s.n}</div>
                <div className="text-xs font-black uppercase tracking-[0.2em] text-[var(--text-dim)]">{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* How it Works - Gamified Timeline */}
        <section className="py-40">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">Ton Chemin de Maîtrise</h2>
            <p className="text-[var(--text-dim)] text-xl">Une progression structurée en trois étapes clés.</p>
          </div>

          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 hidden md:block" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              {[
                {
                  step: '01',
                  title: 'Infiltration',
                  desc: 'Crée ton profil, personnalise ton avatar et accède à la base de connaissances universelle.',
                  icon: <UserPlus />,
                  glow: 'var(--primary)'
                },
                {
                  step: '02',
                  title: 'Entraînement',
                  desc: 'Résous des défis, valide tes tests et accumule de l\'XP pour monter en niveau.',
                  icon: <Zap />,
                  glow: 'var(--blue)'
                },
                {
                  step: '03',
                  title: 'Excellence',
                  desc: 'Maîtrise les concepts avancés, obtiens ton grade d\'expert et brille en entretien.',
                  icon: <Trophy />,
                  glow: 'var(--purple)'
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="flex flex-col items-center text-center space-y-8"
                >
                  <div 
                    className="w-20 h-20 rounded-[24px] glass border-white/10 flex items-center justify-center text-white text-3xl shadow-2xl relative group overflow-hidden"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity" style={{ backgroundColor: item.glow }} />
                    {item.icon}
                  </div>
                  <div className="space-y-4">
                    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-dim)]">Phase {item.step}</div>
                    <h3 className="text-3xl font-black text-white tracking-tight">{item.title}</h3>
                    <p className="text-[var(--text-dim)] font-medium leading-relaxed max-w-xs">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-40 p-16 md:p-24 rounded-[64px] relative overflow-hidden group border border-white/5 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 via-transparent to-[var(--blue)]/10 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[var(--primary)]/10 blur-[120px] rounded-full" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[var(--blue)]/10 blur-[120px] rounded-full" />
          
          <div className="relative z-10 space-y-10">
            <Sparkles className="w-12 h-12 text-yellow-400 mx-auto animate-bounce" />
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-white">
              PRÊT À RÉÉCRIRE <br />
              <span className="premium-gradient">TON FUTUR ?</span>
            </h2>
            <p className="text-xl text-[var(--text-dim)] max-w-2xl mx-auto font-medium">
              Rejoins des milliers de développeurs qui ont choisi l'excellence. 
              Commence ton ascension aujourd'hui.
            </p>
            <div className="flex justify-center gap-6 flex-wrap">
              <Link
                to="/signup"
                className="px-12 py-6 bg-white text-black rounded-[24px] font-black text-xl hover:scale-105 transition-all shadow-2xl active:scale-95"
              >
                Créer mon Compte
              </Link>
              <Link
                to="/pricing"
                className="px-12 py-6 glass border-white/10 text-white rounded-[24px] font-black text-xl hover:bg-white/10 transition-all"
              >
                Voir les Plans
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
