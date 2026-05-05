import { Link } from 'react-router-dom';
import { Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-[var(--green)]/10 rounded-xl flex items-center justify-center">
                <Code2 className="text-[var(--green)] w-6 h-6" />
              </div>
              <span className="text-xl font-black tracking-tighter text-[var(--text-bright)]">
                CODE<span className="text-[var(--green)]">LEARN</span>
              </span>
            </Link>
            <p className="text-[var(--text-dim)] max-w-sm leading-relaxed">
              La plateforme EdTech francophone pour les développeurs ambitieux. 
              Maîtrisez l'informatique théorique par la pratique.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-[var(--text-bright)] mb-4 uppercase text-xs tracking-widest">Plateforme</h4>
            <ul className="space-y-2 text-sm text-[var(--text-dim)]">
              <li><Link to="/algorithms" className="hover:text-[var(--green)] transition-colors">Algorithmes</Link></li>
              <li><Link to="/exercises" className="hover:text-[var(--green)] transition-colors">Exercices</Link></li>
              <li><Link to="/paths" className="hover:text-[var(--green)] transition-colors">Roadmap</Link></li>
              <li><Link to="/languages" className="hover:text-[var(--green)] transition-colors">Langages</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[var(--text-bright)] mb-4 uppercase text-xs tracking-widest">Compte</h4>
            <ul className="space-y-2 text-sm text-[var(--text-dim)]">
              <li><Link to="/profile" className="hover:text-[var(--green)] transition-colors">Mon Dashboard</Link></li>
              <li><Link to="/pricing" className="hover:text-[var(--green)] transition-colors">Tarifs</Link></li>
              <li><Link to="/signup" className="hover:text-[var(--green)] transition-colors">S'inscrire</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[var(--border)] text-[10px] text-[var(--text-dim)] uppercase tracking-widest">
          <div>© 2026 CodeLearn. Tous droits réservés.</div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span>Fait avec 💚 pour les développeurs</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
