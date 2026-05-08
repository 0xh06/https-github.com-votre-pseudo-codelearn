import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import AvatarCreator from '../components/AvatarCreator';
import Seo from '../components/Seo';

export default function AvatarCreatorPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <Seo
        title="Personnaliser mon Avatar"
        description="Créez votre personnage unique sur AlgoMaster. Débloquez de nouveaux accessoires au fil de votre progression."
      />

      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <Link 
              to="/paths" 
              className="inline-flex items-center gap-2 text-sm font-bold text-[var(--text-dim)] hover:text-[var(--primary)] transition-colors group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Retour au Parcours
            </Link>
            <div className="space-y-2">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] text-[10px] font-black uppercase tracking-widest"
              >
                <Sparkles size={12} /> Studio d'Identité
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
                Ton Avatar <span className="premium-gradient">CodeMaster</span>
              </h1>
              <p className="text-[var(--text-dim)] text-lg font-medium">
                Exprime ton style. Ton avatar évolue avec tes compétences.
              </p>
            </div>
          </div>
        </div>

        {/* The Creator */}
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-br from-[var(--primary)]/10 via-transparent to-[var(--blue)]/10 blur-3xl -z-10 opacity-50" />
          <AvatarCreator />
        </div>

        {/* Info Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Évolutif', desc: 'Débloque des badges et chapeaux en complétant les modules.', icon: '🎓' },
            { title: 'Unique', desc: 'Des millions de combinaisons possibles pour te démarquer.', icon: '✨' },
            { title: 'Social', desc: 'Ton avatar est visible sur le leaderboard et ton profil.', icon: '🌍' },
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-[32px] bg-white/5 border border-white/5 space-y-3">
              <div className="text-3xl">{item.icon}</div>
              <h3 className="font-bold text-[var(--text-bright)]">{item.title}</h3>
              <p className="text-sm text-[var(--text-dim)] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
