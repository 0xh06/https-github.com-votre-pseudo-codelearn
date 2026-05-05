import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-xl font-bold text-[var(--text-bright)] mb-6 block">
              &lt;<span className="text-[var(--green)]">CodeLearn</span> /&gt;
            </Link>
            <p className="text-[var(--text-dim)] max-w-sm">
              La plateforme EdTech francophone pour les developpeurs ambitieux. 
              Maitrisez l'informatique theorique par la pratique.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-[var(--text-bright)] mb-4 uppercase text-xs tracking-widest">Plateforme</h4>
            <ul className="space-y-2 text-sm text-[var(--text-dim)]">
              <li><Link to="/algorithms" className="hover:text-[var(--green)]">Algorithmes</Link></li>
              <li><Link to="/exercises" className="hover:text-[var(--green)]">Exercices</Link></li>
              <li><Link to="/paths" className="hover:text-[var(--green)]">Parcours</Link></li>
              <li><Link to="/flashcards" className="hover:text-[var(--green)]">Flashcards</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[var(--text-bright)] mb-4 uppercase text-xs tracking-widest">Compte</h4>
            <ul className="space-y-2 text-sm text-[var(--text-dim)]">
              <li><button className="hover:text-[var(--green)]">Profil</button></li>
              <li><button className="hover:text-[var(--green)]">Parametres</button></li>
              <li><button className="hover:text-[var(--green)]">Abonnement</button></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[var(--border)] text-[10px] text-[var(--text-dim)] uppercase tracking-widest">
          <div>© 2026 CodeLearn. Tous droits réservés.</div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <button className="hover:text-[var(--text-bright)]">Confidentialité</button>
            <button className="hover:text-[var(--text-bright)]">CGU</button>
            <button className="hover:text-[var(--text-bright)]">Contact</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
