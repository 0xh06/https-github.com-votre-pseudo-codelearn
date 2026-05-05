import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles, Bot, Zap, Brain } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ALGORITHMS } from '../data/content';
import Seo from '../components/Seo';

export default function Home() {
  const [onlineCount, setOnlineCount] = useState(142);

  // Simulation d'utilisateurs en temps réel (en attendant Supabase Presence)
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col justify-center min-h-screen pt-20">
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
            ✨ Nouveau : Plateforme CodeLearn Pro
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

        {/* STATS SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 my-20"
        >
          <div className="text-center p-6 card">
            <div className="text-4xl font-bold text-[var(--green)] mb-2">50+</div>
            <div className="text-sm text-[var(--text-dim)] uppercase tracking-wider font-semibold">Algorithmes</div>
          </div>
          <div className="text-center p-6 card">
            <div className="text-4xl font-bold text-[var(--blue)] mb-2">80+</div>
            <div className="text-sm text-[var(--text-dim)] uppercase tracking-wider font-semibold">Exercices</div>
          </div>
          <div className="text-center p-6 card">
            <div className="text-4xl font-bold text-[var(--purple)] mb-2">15</div>
            <div className="text-sm text-[var(--text-dim)] uppercase tracking-wider font-semibold">Langages</div>
          </div>
          <div className="text-center p-6 card">
            <div className="text-4xl font-bold text-[var(--yellow)] mb-2 flex items-center justify-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
              </span>
              {onlineCount}
            </div>
            <div className="text-sm text-[var(--text-dim)] uppercase tracking-wider font-semibold">Connectés</div>
          </div>
        </motion.div>

        {/* FEATURED SECTION */}
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
      </div>
    </div>
  );
}
