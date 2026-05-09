import { motion } from 'framer-motion';
import { Check, X, HelpCircle, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import Seo from '../components/Seo';
import { useStore } from '../store/useStore';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useState } from 'react';

const PLANS = [
  {
    name: 'Gratuit',
    price: '0€',
    desc: 'Pour démarrer et valider la méthode.',
    features: [
      'Tous les algorithmes & exos de base',
      'Éditeur Monaco + exécution',
      'Parcours Fondamentaux & Intermédiaire',
      'Jusqu’à 8 cartes par session flashcards',
    ],
    btn: 'Commencer',
    highlight: false,
    planKey: 'free' as const,
    icon: <ShieldCheck className="w-6 h-6" />
  },
  {
    name: 'Pro',
    price: '19€',
    period: '/ mois',
    desc: 'Pour une préparation sérieuse aux entretiens.',
    features: [
      'Tout le plan Gratuit',
      'Parcours Expert débloqué',
      'Flashcards : sessions illimitées',
      'Support prioritaire (email sous 48h ouvrées)',
      'Roadmap produit prioritaire (vote fonctionnalités)',
    ],
    btn: 'Choisir Pro',
    highlight: true,
    planKey: 'pro' as const,
    icon: <Zap className="w-6 h-6" />
  },
  {
    name: 'Équipe',
    price: 'Sur devis',
    desc: 'Bootcamps, écoles, équipes engineering.',
    features: [
      'Sièges multiples & facturation centralisée',
      'SLA support 24h ouvrées',
      'Onboarding et rapport de progression',
      'Contenu / parcours sur mesure (option)',
    ],
    btn: 'Contacter les ventes',
    highlight: false,
    planKey: 'team' as const,
    icon: <Sparkles className="w-6 h-6" />
  },
];

const COMPARE = [
  { label: 'Algorithmes & fiches pédagogiques', free: true, pro: true, team: true },
  { label: 'Exercices avec tests automatiques', free: true, pro: true, team: true },
  { label: 'Parcours Fondamentaux & Intermédiaire', free: true, pro: true, team: true },
  { label: 'Parcours Expert (Kadane, optimisation)', free: false, pro: true, team: true },
  { label: 'Sessions flashcards étendues', free: '8 / session', pro: 'Illimité', team: 'Illimité' },
  { label: 'Support', free: 'Communauté', pro: '48h ouvrées', team: '24h ouvrées' },
];

const FAQ = [
  {
    q: 'Le paiement est-il sécurisé ?',
    a: "L'intégration Stripe (à brancher en production) gère le PCI-DSS. Aujourd'hui, le bouton Pro simule une souscription et active Pro localement pour démonstration.",
  },
  {
    q: 'Puis-je annuler à tout moment ?',
    a: "Oui — politique d'annulation sera précisée dans l'espace client Stripe. Version démo : votre statut Pro est stocké localement dans le navigateur.",
  },
  {
    q: 'Mes données sont-elles en Europe ?',
    a: 'Supabase peut être configuré en région EU. Consultez notre politique de confidentialité pour les sous-traitants et vos droits RGPD.',
  },
];

export default function Pricing() {
  const { user, subscriptionPlan, setSubscriptionPlan } = useStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (planKey: 'free' | 'pro' | 'team') => {
    if (planKey === 'team') {
      navigate('/contact');
      return;
    }
    if (planKey === 'free') {
      if (subscriptionPlan === 'free') toast.success('Vous êtes déjà sur le plan Gratuit.');
      else {
        setSubscriptionPlan('free');
        toast.success('Passage au plan Gratuit.');
      }
      return;
    }
    if (!user) {
      toast.error('Connectez-vous pour souscrire au plan Pro.');
      navigate('/login');
      return;
    }
    if (planKey === 'pro') {
      setLoading('pro');
      toast.loading('Ouverture du paiement sécurisé (démo)…', { id: 'pay' });
      await new Promise((r) => setTimeout(r, 1600));
      setSubscriptionPlan('pro');
      toast.success('Pro activé sur cet appareil (démo). Branchez Stripe pour la prod.', { id: 'pay', duration: 4500 });
      setLoading(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-24 relative">
      <Seo
        title="Tarifs | Upgrade ton Potentiel"
        description="Plans Gratuit, Pro et Équipe pour CodeLearn — parcours Expert, flashcards étendues et support prioritaire."
      />

      {/* Decorative Background */}
      <div className="absolute top-0 inset-x-0 h-[800px] pointer-events-none -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[var(--primary)]/5 blur-[120px] rounded-full" />
      </div>

      <div className="text-center mb-20 space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
        >
          <Zap className="text-yellow-400 w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-dim)]">Investis dans ta Carrière</span>
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white">Choisis ton <span className="premium-gradient">Arsenal</span></h1>
        <p className="text-[var(--text-dim)] text-xl max-w-2xl mx-auto font-medium leading-relaxed">
          Accède aux ressources les plus avancées et propulse tes compétences au niveau supérieur.
        </p>
      </div>

      {subscriptionPlan === 'pro' && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto mb-16 p-6 rounded-[32px] bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-center relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-[var(--primary)]/5 animate-pulse" />
          <div className="relative z-10 flex items-center justify-center gap-4">
            <Sparkles className="text-[var(--primary)]" />
            <span className="font-bold text-white text-lg">Tu es actuellement membre <span className="text-[var(--primary)]">Pro</span></span>
            <button
              type="button"
              onClick={() => {
                setSubscriptionPlan('free');
                toast.success('Retour au plan Gratuit (démo).');
              }}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-xs font-black uppercase tracking-widest"
            >
              Mode Démo : Repasser Gratuit
            </button>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-40">
        {PLANS.map((plan, i) => {
          const isCurrent =
            (plan.planKey === 'free' && subscriptionPlan === 'free') ||
            (plan.planKey === 'pro' && subscriptionPlan === 'pro');
          return (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex flex-col p-10 rounded-[48px] glass transition-all duration-500 group ${
                plan.highlight
                  ? 'border-[var(--primary)]/50 shadow-[0_40px_100px_rgba(99,102,241,0.15)] scale-[1.05] z-10'
                  : 'border-white/5 hover:border-white/10'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-[var(--primary)] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg">
                  Recommandé
                </div>
              )}

              <div className="flex items-center gap-4 mb-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${plan.highlight ? 'bg-[var(--primary)]/20 text-[var(--primary)]' : 'bg-white/5 text-[var(--text-dim)]'}`}>
                  {plan.icon}
                </div>
                <h3 className="text-3xl font-black text-white tracking-tight">{plan.name}</h3>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-6xl font-black text-white tracking-tighter">{plan.price}</span>
                  {plan.period && <span className="text-[var(--text-dim)] font-bold text-xl">{plan.period}</span>}
                </div>
                <p className="text-[var(--text-dim)] font-medium mt-4 leading-relaxed">{plan.desc}</p>
              </div>

              <div className="flex-1 space-y-4 mb-12">
                {plan.features.map((feat, j) => (
                  <div key={j} className="flex items-start gap-4 text-sm font-medium">
                    <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center ${plan.highlight ? 'bg-[var(--primary)]/20 text-[var(--primary)]' : 'bg-white/5 text-[var(--text-dim)]'}`}>
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-[var(--text-dim)] group-hover:text-white transition-colors">{feat}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => handleSubscribe(plan.planKey)}
                disabled={loading !== null || (plan.planKey === 'pro' && isCurrent)}
                className={`relative w-full py-5 rounded-[24px] font-black text-sm uppercase tracking-[0.2em] transition-all overflow-hidden ${
                  plan.highlight 
                    ? 'bg-[var(--primary)] text-white hover:scale-[1.02] active:scale-[0.98] shadow-xl' 
                    : 'bg-white/5 text-white hover:bg-white/10'
                } disabled:opacity-50`}
              >
                <div className="relative z-10">
                  {loading === plan.planKey ? 'Traitement...' : isCurrent && plan.planKey !== 'team' ? 'Plan Actuel' : plan.btn}
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>

      <div className="max-w-5xl mx-auto mb-40 space-y-12">
        <h2 className="text-4xl font-black text-center text-white tracking-tight">Comparatif Détallé</h2>
        <div className="glass rounded-[40px] border-white/5 overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5">
                <th className="py-8 px-10 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-dim)]">Fonctionnalité</th>
                <th className="py-8 px-10 text-center text-[10px] font-black uppercase tracking-[0.2em] text-white">Gratuit</th>
                <th className="py-8 px-10 text-center text-[10px] font-black uppercase tracking-[0.2em] text-[var(--primary)]">Pro</th>
                <th className="py-8 px-10 text-center text-[10px] font-black uppercase tracking-[0.2em] text-white">Équipe</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {COMPARE.map((row, i) => (
                <tr key={row.label} className="group hover:bg-white/[0.01] transition-colors">
                  <td className="py-6 px-10 text-sm font-bold text-[var(--text-bright)]">{row.label}</td>
                  <td className="py-6 px-10 text-center">
                    {typeof row.free === 'boolean' ? (
                      row.free ? <Check className="w-5 h-5 text-[var(--primary)] mx-auto" /> : <X className="w-5 h-5 text-white/10 mx-auto" />
                    ) : <span className="text-xs font-black text-[var(--text-dim)]">{row.free}</span>}
                  </td>
                  <td className="py-6 px-10 text-center bg-[var(--primary)]/5">
                    {typeof row.pro === 'boolean' ? (
                      row.pro ? <Check className="w-5 h-5 text-[var(--primary)] mx-auto" /> : <X className="w-5 h-5 text-white/10 mx-auto" />
                    ) : <span className="text-xs font-black text-[var(--primary)]">{row.pro}</span>}
                  </td>
                  <td className="py-6 px-10 text-center">
                    {typeof row.team === 'boolean' ? (
                      row.team ? <Check className="w-5 h-5 text-[var(--primary)] mx-auto" /> : <X className="w-5 h-5 text-white/10 mx-auto" />
                    ) : <span className="text-xs font-black text-[var(--text-dim)]">{row.team}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mb-20 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-white tracking-tight">FAQ</h2>
          <p className="text-[var(--text-dim)] font-medium">Tout ce que vous devez savoir.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FAQ.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-[32px] glass border-white/5 space-y-4 hover:border-white/10 transition-all"
            >
              <h3 className="text-lg font-black text-white leading-snug">{item.q}</h3>
              <p className="text-sm text-[var(--text-dim)] leading-relaxed font-medium">{item.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
