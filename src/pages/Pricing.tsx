import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Seo from '../components/Seo';

const PLANS = [
  {
    name: 'Gratuit',
    price: '0€',
    desc: 'Pour les curieux et les débutants.',
    features: ['Accès aux algos de base', 'Flashcards limitées', 'Communauté'],
    btn: 'Actuel',
    current: true
  },
  {
    name: 'Pro',
    price: '19€',
    period: '/ mois',
    desc: 'La totale pour devenir ingénieur.',
    features: ['Tous les algorithmes avancés', 'Flashcards illimitées', 'Projets guidés', 'Certificats de réussite', 'Support prioritaire'],
    btn: 'Passer à la vitesse supérieure',
    current: false,
    highlight: true
  }
];

export default function Pricing() {
  return (
    <div className="container mx-auto px-4 py-20">
      <Seo title="Tarifs" description="Choisissez le plan qui vous correspond pour maitriser le code." />
      
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Investissez dans votre avenir</h1>
        <p className="text-[var(--text-dim)]">Des plans simples pour des résultats exceptionnels.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {PLANS.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`card relative flex flex-col p-8 ${plan.highlight ? 'border-[var(--green)] ring-1 ring-[var(--green)] shadow-[0_0_30px_rgba(57,211,83,0.1)]' : ''}`}
          >
            {plan.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--green)] text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                Recommandé
              </span>
            )}
            
            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
            <div className="mb-4">
              <span className="text-4xl font-bold text-[var(--text-bright)]">{plan.price}</span>
              <span className="text-[var(--text-dim)]">{plan.period}</span>
            </div>
            <p className="text-sm text-[var(--text-dim)] mb-8">{plan.desc}</p>
            
            <div className="flex-1 space-y-4 mb-10">
              {plan.features.map((feat, j) => (
                <div key={j} className="flex items-center gap-3 text-sm">
                  <Check className="w-4 h-4 text-[var(--green)]" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <button className={`btn w-full py-3 rounded-xl font-bold ${plan.highlight ? 'btn-primary' : 'btn-secondary opacity-50'}`}>
              {plan.btn}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
