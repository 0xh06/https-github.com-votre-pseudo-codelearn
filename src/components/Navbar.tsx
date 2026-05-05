import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { supabase } from '../lib/supabase';
import { 
  Code2, 
  Terminal, 
  Brain, 
  Map, 
  CreditCard, 
  LogOut, 
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Globe,
  User
} from 'lucide-react';
import { getLevelInfo } from '../utils/levels';

export default function Navbar() {
  const { xp, user, setUser } = useStore();
  const location = useLocation();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const levelData = getLevelInfo(xp);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsUserMenuOpen(false);
  };

  const navLinks = [
    { name: 'Algorithmes', path: '/algorithms', icon: <Brain className="w-4 h-4" /> },
    { name: 'Exercices', path: '/exercises', icon: <Terminal className="w-4 h-4" /> },
    { name: 'Roadmap', path: '/paths', icon: <Map className="w-4 h-4" /> },
    { name: 'Langages', path: '/languages', icon: <Globe className="w-4 h-4" /> },
    { name: 'Tarifs', path: '/pricing', icon: <CreditCard className="w-4 h-4" /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--border)] z-[999]">
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-[var(--green)]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Code2 className="text-[var(--green)] w-6 h-6" />
          </div>
          <span className="text-xl font-black tracking-tighter text-[var(--text-bright)]">
            CODE<span className="text-[var(--green)]">LEARN</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                location.pathname === link.path 
                  ? 'bg-[var(--green)]/10 text-[var(--green)]' 
                  : 'text-[var(--text-dim)] hover:text-[var(--text-bright)] hover:bg-[var(--bg3)]'
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end mr-4">
            <div className="text-[10px] text-[var(--yellow)] font-black uppercase tracking-widest">Niv. {levelData.level}</div>
            <div className="w-20 h-1 bg-[var(--bg3)] rounded-full mt-1 overflow-hidden">
              <div 
                className="h-full bg-[var(--yellow)] transition-all duration-500" 
                style={{ width: `${(xp / levelData.max) * 100}%` }}
              />
            </div>
          </div>

          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg3)] border border-[var(--border)] hover:border-[var(--green)]/50 transition-all"
              >
                <div className="w-6 h-6 bg-gradient-to-br from-[var(--green)] to-[var(--blue)] rounded-full flex items-center justify-center text-[10px] font-bold text-black uppercase">
                  {user.email?.[0] || 'U'}
                </div>
                <ChevronDown className={`w-4 h-4 text-[var(--text-dim)] transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-56 bg-[var(--bg2)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden py-2"
                  >
                    <div className="px-4 py-3 border-b border-[var(--border)] mb-2">
                      <div className="text-xs text-[var(--text-dim)] mb-1">Connecté en tant que</div>
                      <div className="text-sm font-bold truncate text-[var(--text-bright)]">{user.email}</div>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-400/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Déconnexion
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="hidden sm:block text-sm font-bold text-[var(--text-dim)] hover:text-[var(--text-bright)] px-4 py-2">
                Connexion
              </Link>
              <Link to="/signup" className="btn btn-primary px-5 py-2 rounded-xl text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                S'inscrire
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-[var(--text-dim)]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 top-16 bg-[var(--bg)] z-[998] lg:hidden p-4 space-y-2 overflow-y-auto"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] text-lg font-bold ${
                  location.pathname === link.path ? 'bg-[var(--green)]/10 border-[var(--green)]/50 text-[var(--green)]' : 'bg-[var(--bg2)]'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
