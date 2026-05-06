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
} from 'lucide-react';
import { ALGORITHMS, EXERCISES } from '../data/content';
import Seo from '../components/Seo';
import HeroTerminal from '../components/HeroTerminal';

export default function Home() {
  return (
    <div className="flex flex-col justify-center pt-20">
      <Seo
        title="Accueil"
        description="Préparez vos entretiens techniques : algorithmes, Big O, exos avec tests et éditeur — parcours structurés et répétition espacée en français."
      />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1.5 bg-green-500/10 text-[var(--green)] rounded-full text-sm font-semibold mb-6 border border-green-500/20">
            Préparation entretiens & fondamentaux
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold leading-tight text-[var(--text-bright)] mb-6 tracking-tight">
            Passez de la théorie à la{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[var(--green)] to-[#00ff88]">
              pratique mesurable
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-[var(--text-dim)] mb-6 font-medium max-w-3xl mx-auto leading-relaxed">
            AlgoMaster est une plateforme francophone tout-en-un : leçons claires, code dans le navigateur, tests automatiques,
            parcours ordonnés et révisions intelligentes — pour progresser vite sans perdre le fil.
          </p>
          <p className="text-sm md:text-base text-[var(--text-dim)] max-w-2xl mx-auto mb-10">
            Objectif utilisateur : être à l&apos;aise sur les tris, la recherche, les graphes et la dynamique classique avant un
            coding interview ou un examen.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/signup"
              className="btn btn-primary px-8 py-3 rounded-full text-lg flex items-center gap-2 group"
            >
              Créer un compte gratuit
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/pricing" className="btn btn-secondary px-8 py-3 rounded-full text-lg">
              Voir les offres Pro
            </Link>
            <Link to="/algorithms" className="btn btn-secondary px-8 py-3 rounded-full text-lg border border-[var(--border)]">
              Explorer les algorithmes
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-20 px-4"
          >
            <HeroTerminal />
          </motion.div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-[var(--text-dim)] text-sm font-medium">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[var(--green)] rounded-full animate-pulse" />
              Éditeur Monaco + exécution
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[var(--blue)] rounded-full" />
              Données hébergées UE (Supabase)
            </div>
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-[var(--yellow)]" />
              Assistant IA (optionnel, clé API)
            </div>
          </div>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-[var(--border)] bg-[var(--bg2)]/50 px-6 py-10 mb-20"
        >
          <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-[var(--text-dim)] mb-6">
            Conçu pour des profils exigeants
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            {[
              {
                icon: <GraduationCap className="w-8 h-8 text-[var(--green)]" />,
                title: 'Étudiants & autodidactes',
                text: 'Parcours du premier tri au Kadane, avec indices progressifs et solutions expliquées.',
              },
              {
                icon: <Target className="w-8 h-8 text-[var(--blue)]" />,
                title: 'Candidats en entretien',
                text: 'Répétition espacée + exos chronométrables pour ancrer les schémas (BFS, DFS, DP).',
              },
              {
                icon: <Building2 className="w-8 h-8 text-[var(--purple)]" />,
                title: 'Écoles & bootcamps',
                text: 'Parcours reproductibles, progression visible et offre Pro pour débloquer l’expert (volume).',
              },
            ].map((b, i) => (
              <div key={i} className="flex flex-col items-center md:items-start gap-3">
                <div className="p-3 rounded-xl bg-[var(--bg3)] border border-[var(--border)]">{b.icon}</div>
                <h3 className="font-bold text-[var(--text-bright)]">{b.title}</h3>
                <p className="text-sm text-[var(--text-dim)] leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 my-20"
        >
          {[
            { n: ALGORITHMS.length, l: 'Algorithmes détaillés', c: 'var(--green)' },
            { n: EXERCISES.length, l: 'Exercices testés', c: 'var(--blue)' },
            { n: 3, l: 'Parcours guidés', c: 'var(--purple)' },
            { n: 'RGPD', l: 'Politique & droits', c: 'var(--yellow)' },
          ].map((s, i) => (
            <div key={i} className="text-center p-6 card">
              <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: s.c }}>
                {s.n}
              </div>
              <div className="text-xs text-[var(--text-dim)] uppercase tracking-wider font-semibold">{s.l}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="my-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comment ça marche ?</h2>
            <p className="text-[var(--text-dim)] max-w-xl mx-auto">
              Une boucle courte : lire, coder, valider, réviser — sans changer d’outil.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <UserPlus className="w-8 h-8" />,
                step: '01',
                title: 'Compte en quelques secondes',
                desc: 'Email ou OAuth Supabase. Votre progression et vos favoris restent synchronisés sur l’appareil (stockage local + backend selon config).',
              },
              {
                icon: <BookOpen className="w-8 h-8" />,
                step: '02',
                title: 'Apprenez et codez',
                desc: 'Ouvrez un algorithme : complexité, étapes, indices, puis éditeur. Les exercices exécutent des tests comme en vrai.',
              },
              {
                icon: <Trophy className="w-8 h-8" />,
                step: '03',
                title: 'Consolidez avec Pro',
                desc: 'Parcours Expert, sessions flashcards étendues et positionnement premium pour aller au-delà des bases.',
              },
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

        <div className="my-32">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Algorithmes incontournables</h2>
              <p className="text-[var(--text-dim)]">Entrez par les sujets les plus demandés en entretien.</p>
            </div>
            <Link to="/algorithms" className="text-[var(--green)] font-bold hover:underline shrink-0">
              Voir tout →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ALGORITHMS.slice(0, 3).map((algo, i) => (
              <Link key={algo.id} to={`/algorithms/${algo.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="card group hover:border-[var(--green)] h-full"
                >
                  <div className="text-xs font-bold text-[var(--green)] mb-2 uppercase tracking-widest">{algo.category}</div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--green)] transition-colors">{algo.name}</h3>
                  <p className="text-sm text-[var(--text-dim)] line-clamp-2">{algo.description}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-[var(--green)]/25 bg-[var(--green)]/5 p-10 mb-24 text-center"
        >
          <ShieldCheck className="w-10 h-10 text-[var(--green)] mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Confiance & conformité</h2>
          <p className="text-[var(--text-dim)] max-w-2xl mx-auto mb-6 text-sm leading-relaxed">
            Hébergement sur infrastructure moderne (Supabase), HTTPS, politique de confidentialité détaillée et droits RGPD
            décrits sur la page dédiée. L&apos;assistant IA est un outil d&apos;aide : vérifiez toujours les réponses critiques.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/privacy" className="btn btn-secondary px-6 py-2 rounded-xl text-sm font-bold">
              Politique de confidentialité
            </Link>
            <Link to="/contact" className="btn btn-secondary px-6 py-2 rounded-xl text-sm font-bold">
              Contact / DPO
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="my-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ce qu’en disent nos utilisateurs</h2>
            <p className="text-[var(--text-dim)]">Témoignages illustratifs — résultats individuels variables.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Youssef A.',
                role: 'Étudiant en informatique',
                text: "AlgoMaster m'a permis de comprendre les tris et la recherche en une semaine. L'éditeur intégré change tout par rapport aux PDF statiques.",
              },
              {
                name: 'Sarah M.',
                role: 'Développeuse junior',
                text: "J'ai suivi le parcours fondamentaux puis graphes ; la progression par étapes m'a aidée à structurer ma prépa entretien.",
              },
              {
                name: 'Karim B.',
                role: 'Ingénieur full-stack',
                text: "Les exos avec tests et la répétition espacée me gardent à niveau sur la complexité et les classiques (BFS, DP).",
              },
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
                <p className="text-sm text-[var(--text-dim)] mb-6 leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 text-center card py-14 px-6 border-[var(--green)]/30"
        >
          <Sparkles className="w-8 h-8 text-[var(--yellow)] mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Prêt à investir dans vos compétences ?</h2>
          <p className="text-[var(--text-dim)] max-w-lg mx-auto mb-8">
            Le plan gratuit couvre l’essentiel. Pro débloque le parcours Expert et des sessions de révision étendues.
          </p>
          <Link to="/pricing" className="btn btn-primary px-10 py-3 rounded-full text-lg font-bold inline-flex items-center gap-2">
            Comparer les plans
            <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
