import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import { FileText } from 'lucide-react';

export default function Terms() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <Seo title="CGU" description="Conditions générales d'utilisation d'AlgoMaster." />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <div className="w-16 h-16 bg-[var(--purple)]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <FileText className="w-8 h-8 text-[var(--purple)]" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Conditions Générales d'Utilisation</h1>
        <p className="text-[var(--text-dim)]">Dernière mise à jour : Janvier 2026</p>
      </motion.div>
      <div className="space-y-8">
        {[
      { title: '1. Acceptation des conditions', content: "En accédant à AlgoMaster, vous acceptez d'être lié par ces CGU. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser la plateforme." },
      { title: '2. Description du service', content: "AlgoMaster est une plateforme d'apprentissage en ligne proposant des cours d'algorithmique, des exercices pratiques et un assistant IA. Certaines fonctionnalités sont réservées aux abonnés payants." },
          { title: '3. Compte utilisateur', content: "Vous êtes responsable de maintenir la confidentialité de vos identifiants et de toutes les activités qui se produisent sous votre compte. Notifiez-nous immédiatement de tout accès non autorisé." },
          { title: '4. Propriété intellectuelle', content: "Tout le contenu d'AlgoMaster (cours, algorithmes, exercices, code) est protégé par le droit d'auteur. Vous ne pouvez pas reproduire, distribuer ou créer des œuvres dérivées sans autorisation." },
          { title: '5. Comportement des utilisateurs', content: "Vous vous engagez à utiliser la plateforme de manière légale et respectueuse. Tout comportement abusif, tentative de triche ou utilisation frauduleuse entraînera la suspension immédiate du compte." },
          { title: '6. Limitation de responsabilité', content: "AlgoMaster est fourni 'tel quel'. Nous ne garantissons pas que le service sera toujours disponible, sans erreur ou adapté à vos besoins spécifiques. Notre responsabilité est limitée au montant de votre abonnement." },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="card p-8">
            <h2 className="text-xl font-bold mb-4">{s.title}</h2>
            <p className="text-[var(--text-dim)] leading-relaxed text-sm">{s.content}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
