import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <Seo title="404" description="Page introuvable." noIndex />
      <div className="text-6xl font-bold text-[var(--text-bright)]">404</div>
      <h1 className="mt-4 text-2xl font-semibold text-[var(--text-bright)]">
        Page introuvable
      </h1>
      <p className="mt-3 text-[var(--text-dim)]">
        Le contenu demande n'existe pas ou a ete deplace.
      </p>
      <div className="mt-6 flex justify-center">
        <Link to="/" className="btn btn-primary px-6 py-2">
          Retour a l'accueil
        </Link>
      </div>
    </div>
  );
}
