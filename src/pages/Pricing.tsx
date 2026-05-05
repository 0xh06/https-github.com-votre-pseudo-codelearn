import { motion } from 'framer-motion';
import { Check, X, HelpCircle } from 'lucide-react';
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
    <div className="container mx-auto px-4 py-20">
      <Seo
        title="Tarifs"
        description="Plans Gratuit, Pro et Équipe pour AlgoMaster — parcours Expert, flashcards étendues et support prioritaire."
      />

      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Des tarifs simples, une valeur claire</h1>
        <p className="text-[var(--text-dim)] text-lg leading-relaxed">
          Un produit premium se reconnaît à la clarté : ce qui est inclus, ce qui est réservé à Pro, et comment vous aider vite si
          vous êtes bloqué.
        </p>
        <p className="text-sm text-[var(--text-dim)] mt-4">
          <strong className="text-[var(--text-bright)]">Engagement qualité Pro :</strong> réponse email sous 48h ouvrées sur les
          incidents de compte ou de facturation (dès intégration paiement réelle).
        </p>
      </div>

      {subscriptionPlan === 'pro' && (
        <div className="max-w-2xl mx-auto mb-10 p-4 rounded-xl bg-[var(--green)]/10 border border-[var(--green)]/30 text-center text-sm">
          Vous utilisez actuellement le plan <strong>Pro</strong> sur cet appareil.
          <button
            type="button"
            onClick={() => {
              setSubscriptionPlan('free');
              toast.success('Retour au plan Gratuit (démo).');
            }}
            className="ml-2 underline text-[var(--green)] font-bold"
          >
            Repasser Gratuit (démo)
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-24">
        {PLANS.map((plan, i) => {
          const isCurrent =
            (plan.planKey === 'free' && subscriptionPlan === 'free') ||
            (plan.planKey === 'pro' && subscriptionPlan === 'pro');
          return (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`card relative flex flex-col p-8 ${
                plan.highlight
                  ? 'border-[var(--green)] ring-1 ring-[var(--green)] shadow-[0_0_30px_rgba(57,211,83,0.12)] lg:scale-[1.02]'
                  : ''
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--green)] text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  Le plus choisi
                </span>
              )}

              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-[var(--text-bright)]">{plan.price}</span>
                {plan.period && <span className="text-[var(--text-dim)]">{plan.period}</span>}
              </div>
              <p className="text-sm text-[var(--text-dim)] mb-8 min-h-[40px]">{plan.desc}</p>

              <div className="flex-1 space-y-3 mb-10">
                {plan.features.map((feat, j) => (
                  <div key={j} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-[var(--green)] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => handleSubscribe(plan.planKey)}
                disabled={loading !== null || (plan.planKey === 'pro' && isCurrent)}
                className={`btn w-full py-3 rounded-xl font-bold transition-all ${
                  plan.highlight ? 'btn-primary shadow-[0_0_20px_rgba(57,211,83,0.25)]' : 'btn-secondary'
                } disabled:opacity-50`}
              >
                {loading === plan.planKey ? 'Patientez…' : isCurrent && plan.planKey !== 'team' ? 'Plan actuel' : plan.btn}
              </button>
            </motion.div>
          );
        })}
      </div>

      <div className="max-w-4xl mx-auto mb-24">
        <h2 className="text-2xl font-bold text-center mb-8">Tableau comparatif</h2>
        <div className="card overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left py-4 px-4 font-bold text-[var(--text-dim)]">Fonctionnalité</th>
                <th className="py-4 px-4 font-bold">Gratuit</th>
                <th className="py-4 px-4 font-bold text-[var(--green)]">Pro</th>
                <th className="py-4 px-4 font-bold">Équipe</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((row) => (
                <tr key={row.label} className="border-b border-[var(--border)]/80">
                  <td className="py-3 px-4 text-[var(--text-bright)]">{row.label}</td>
                  <td className="py-3 px-4 text-center">
                    {typeof row.free === 'boolean' ? (
                      row.free ? (
                        <Check className="w-4 h-4 text-[var(--green)] mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-[var(--text-dim)] mx-auto opacity-50" />
                      )
                    ) : (
                      row.free
                    )}
                  </td>
                  <td className="py-3 px-4 text-center text-[var(--text-bright)]">
                    {typeof row.pro === 'boolean' ? (
                      row.pro ? (
                        <Check className="w-4 h-4 text-[var(--green)] mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-[var(--text-dim)] mx-auto opacity-50" />
                      )
                    ) : (
                      row.pro
                    )}
                  </td>
                  <td className="py-3 px-4 text-center text-[var(--text-bright)]">
                    {typeof row.team === 'boolean' ? (
                      row.team ? (
                        <Check className="w-4 h-4 text-[var(--green)] mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-[var(--text-dim)] mx-auto opacity-50" />
                      )
                    ) : (
                      row.team
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mb-20">
        <h2 className="text-2xl font-bold text-center mb-10 flex items-center justify-center gap-2">
          <HelpCircle className="w-6 h-6 text-[var(--yellow)]" />
          Questions fréquentes
        </h2>
        <div className="space-y-4">
          {FAQ.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card p-6"
            >
              <h3 className="font-bold mb-2 text-[var(--text-bright)]">{item.q}</h3>
              <p className="text-sm text-[var(--text-dim)] leading-relaxed">{item.a}</p>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-sm text-[var(--text-dim)] mt-10">
          Une question juridique ou données personnelles ?{' '}
          <Link to="/contact" className="text-[var(--green)] font-bold hover:underline">
            Contact
          </Link>{' '}
          ·{' '}
          <Link to="/privacy" className="text-[var(--green)] font-bold hover:underline">
            Confidentialité
          </Link>
        </p>
      </div>
    </div>
  );
}
