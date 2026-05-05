import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { getLevelInfo } from '../utils/levels';

export default function Navbar() {
  const { pathname } = useLocation();
  const { xp, srs } = useStore();
  const levelData = getLevelInfo(xp);
  
  const dueCards = Object.values(srs).filter(item => item.nextReview <= Date.now()).length;

  const links = [
    { path: '/', label: 'Accueil' },
    { path: '/algorithms', label: 'Algorithmes' },
    { path: '/paths', label: 'Parcours' },
    { path: '/exercises', label: 'Exercices' },
    { path: '/flashcards', label: 'Révisions' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)] z-50 flex items-center px-6">
      <div className="flex items-center gap-8 w-full max-w-7xl mx-auto">
        <Link to="/" className="text-xl font-bold text-[var(--text-bright)]">
          &lt;<span className="text-[var(--green)]">CodeLearn</span> /&gt;
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          {links.map(link => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`text-sm font-medium transition-colors ${pathname === link.path ? 'text-[var(--text-bright)]' : 'text-[var(--text-dim)] hover:text-[var(--text-bright)]'}`}
            >
              {link.label}
              {link.path === '/flashcards' && dueCards > 0 && (
                <span className="ml-1.5 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  {dueCards}
                </span>
              )}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end">
            <div className="text-xs text-[var(--yellow)] font-bold uppercase tracking-wider">
              Niv. {levelData.level}
            </div>
            <div className="text-[10px] text-[var(--text-dim)]">
              {xp} / {levelData.max} XP
            </div>
          </div>
          
          {/* Auth Button Placeholder */}
          <button className="btn btn-primary px-4 py-1.5 text-sm">
            Connexion
          </button>
        </div>
      </div>
    </nav>
  );
}
