import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const sections = [
  {
    title: '1. Responsable du traitement',
    content: `AlgoMaster est le responsable des traitements décrits ici. Pour toute question relative aux données personnelles ou pour exercer vos droits, utilisez la page Contact en précisant « RGPD » dans l'objet. Pour les demandes sensibles, un point de contact dédié peut être indiqué sur cette page lorsque la structure juridique finale sera fixée.`,
  },
  {
    title: '2. Données collectées',
    content: `Nous collectons les données nécessaires au service : identifiants de compte (adresse e-mail, fournie par vous ou par un fournisseur OAuth comme Google), données de progression locale et/ou synchronisées (XP, favoris, exercices complétés, paramètres de répétition espacée), journaux techniques minimaux (erreurs, performances) et, si vous activez l'assistant IA avec votre propre clé API, les messages échangés transitent vers le fournisseur concerné selon leurs conditions.`,
  },
  {
    title: '3. Finalités et bases légales',
    content: `Fourniture du compte et de la plateforme (exécution du contrat) ; amélioration du produit et mesure d'audience anonymisée lorsque applicable (intérêt légitime, avec opt-out pour les cookies non essentiels) ; obligations légales (facturation, réponses aux autorités) le cas échéant. Le marketing ciblé hors contexte du service n'est pas une finalité par défaut.`,
  },
  {
    title: '4. Sous-traitants & transferts',
    content: `Nous utilisons Supabase pour l'authentification et le stockage de données ; l'infrastructure peut inclure des serveurs situés dans l'Union européenne ou ailleurs selon la configuration de votre projet. D'autres prestataires (hébergement DNS, outils d'analyse) peuvent être ajoutés : la liste à jour sera maintenue dans cette politique. Les transferts hors EEE reposent sur les clauses types de la Commission européenne ou mécanismes équivalents lorsque requis.`,
  },
  {
    title: '5. Cookies & stockage local',
    content: `Des cookies ou équivalents (localStorage) peuvent stocker votre session, vos préférences (thème) et l'état d'abonnement démo. Les cookies analytiques non essentiels ne sont utilisés qu'avec consentement lorsque vous mettrez en place une bannière CMP conforme.`,
  },
  {
    title: '6. Durée de conservation',
    content: `Les données de compte sont conservées tant que le compte est actif. Après suppression, les données personnelles sont effacées ou anonymisées dans un délai de 30 jours sauf obligation légale de conservation (ex. factures). Les sauvegardes techniques peuvent conserver des copies chiffrées jusqu'à rotation complète.`,
  },
  {
    title: '7. Sécurité',
    content: `Mots de passe gérés par le fournisseur d'auth (hashage), communications en TLS, principe du moindre privilège sur les clés API côté client (à ne jamais commiter). Aucune architecture n'est invulnérable : signalez les incidents via Contact.`,
  },
  {
    title: '8. Vos droits (RGPD)',
    content: `Accès, rectification, effacement, limitation, opposition, portabilité et retrait du consentement lorsque le traitement en dépend. Vous pouvez introduire une réclamation auprès de la CNIL (France) ou de l'autorité de votre pays. Nous répondons sous un délai d'un mois en règle générale.`,
  },
];

export default function Privacy() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <Seo title="Politique de confidentialité" description="Politique de confidentialité et traitement des données — AlgoMaster." />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <div className="w-16 h-16 bg-[var(--blue)]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Shield className="w-8 h-8 text-[var(--blue)]" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Politique de confidentialité</h1>
        <p className="text-[var(--text-dim)]">Dernière mise à jour : mai 2026</p>
        <p className="text-sm text-[var(--text-dim)] mt-4">
          Résumé : nous limitons la collecte au nécessaire, nous ne revendons pas vos données, et vous gardez le contrôle.{' '}
          <Link to="/contact" className="text-[var(--green)] font-bold hover:underline">
            Contact
          </Link>
        </p>
      </motion.div>

      <div className="space-y-8">
        {sections.map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="card p-8"
          >
            <h2 className="text-xl font-bold mb-4 text-[var(--text-bright)]">{section.title}</h2>
            <p className="text-[var(--text-dim)] leading-relaxed text-sm">{section.content}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
