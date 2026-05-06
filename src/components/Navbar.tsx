import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
  User,
  Moon,
  Sun,
  Trophy
} from 'lucide-react';
import { getLevelInfo } from '../utils/levels';
import { t } from '../utils/i18n';

export default function Navbar() {
  const { xp, user, setUser, subscriptionPlan, uiLang, setUiLang } = useStore();
  const location = useLocation();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') !== 'light');
  const levelData = getLevelInfo(xp);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsUserMenuOpen(false);
  };

  const navLinks = [
    { name: t('nav_algorithms', uiLang), path: '/algorithms', icon: <Brain className="w-4 h-4" /> },
    { name: t('nav_exercises', uiLang),  path: '/exercises',  icon: <Terminal className="w-4 h-4" /> },
    { name: t('nav_roadmap', uiLang),    path: '/paths',      icon: <Map className="w-4 h-4" /> },
    { name: t('nav_languages', uiLang),  path: '/languages',  icon: <Globe className="w-4 h-4" /> },
    { name: t('nav_pricing', uiLang),    path: '/pricing',    icon: <CreditCard className="w-4 h-4" /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 glass z-[999] px-4">
      <div className="container mx-auto h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-[var(--green)]/15 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-all duration-500 shadow-[0_0_15px_var(--green-glow)]">
            <Code2 className="text-[var(--green)] w-6 h-6" />
          </div>
          <span className="text-xl font-black tracking-tighter text-[var(--text-bright)] font-[var(--font-display)]">
            ALGO<span className="text-[var(--green)]">MASTER</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black tracking-wide transition-all group ${
                location.pathname === link.path 
                  ? 'text-[var(--green)]' 
                  : 'text-[var(--text-dim)] hover:text-[var(--text-bright)]'
              }`}
            >
              {link.icon}
              {link.name}
              {location.pathname === link.path && (
                <motion.div 
                  layoutId="nav-active" 
                  className="absolute inset-0 bg-[var(--green)]/5 rounded-xl -z-10 border border-[var(--green)]/20 shadow-[0_0_10px_var(--green-glow)]"
                />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Level Progress (Always visible on desktop) */}
          {user && (
            <div className="hidden md:flex items-center gap-3 px-4 py-1.5 rounded-2xl bg-[var(--bg3)]/50 border border-[var(--border)] group cursor-help">
              <div className="flex flex-col items-end">
                <div className="text-[9px] text-[var(--yellow)] font-black uppercase tracking-widest flex items-center gap-1">
                  <Trophy className="w-3 h-3" /> {uiLang === 'fr' ? 'Niveau' : 'Level'} {levelData.level}
                </div>
                <div className="w-20 h-1.5 bg-[var(--bg)] rounded-full mt-1 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(xp / levelData.max) * 100}%` }}
                    className="h-full bg-gradient-to-r from-[var(--yellow)] to-orange-400 shadow-[0_0_8px_rgba(241,196,15,0.4)]" 
                  />
                </div>
              </div>
              <div className="w-7 h-7 rounded-lg bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-[10px] font-black text-white group-hover:scale-110 transition-transform">
                {levelData.level}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setUiLang(uiLang === 'fr' ? 'en' : 'fr')}
              className="p-2 rounded-xl bg-[var(--bg3)]/50 border border-[var(--border)] hover:border-[var(--text-dim)]/30 transition-all text-xs"
              title={uiLang === 'fr' ? 'Switch to English' : 'Passer en Français'}
            >
              {uiLang === 'fr' ? '🇫🇷' : '🇬🇧'}
            </button>

            <button 
              onClick={() => setIsDark(!isDark)} 
              className="p-2 text-[var(--text-dim)] hover:text-[var(--text-bright)] transition-all rounded-xl bg-[var(--bg3)]/50 border border-[var(--border)] hover:border-[var(--text-dim)]/30"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-2xl bg-[var(--bg3)]/80 border border-[var(--border)] hover:border-[var(--green)]/50 transition-all shadow-lg"
              >
                <div className="w-7 h-7 bg-gradient-to-br from-[var(--green)] to-[var(--blue)] rounded-xl flex items-center justify-center text-[10px] font-black text-black shadow-inner">
                  {user.email?.[0].toUpperCase() || 'U'}
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-[var(--text-dim)] transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-64 glass rounded-2xl shadow-2xl overflow-hidden py-2"
                  >
                    <div className="px-5 py-4 border-b border-[var(--border)] mb-2">
                      <div className="text-[10px] font-black uppercase tracking-widest text-[var(--text-dim)] mb-1.5">{t('nav_connected', uiLang)}</div>
                      <div className="text-sm font-bold truncate text-[var(--text-bright)]">{user.email}</div>
                    </div>
                    <Link 
                      to="/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="w-full flex items-center gap-3 px-5 py-3 text-xs font-bold text-[var(--text-dim)] hover:text-[var(--text-bright)] hover:bg-[var(--bg3)] transition-all"
                    >
                      <User className="w-4 h-4" />
                      {t('nav_dashboard', uiLang)}
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-5 py-3 text-xs font-bold text-red-400 hover:bg-red-400/5 transition-all"
                    >
                      <LogOut className="w-4 h-4" />
                      {t('nav_logout', uiLang)}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/signup" className="btn btn-primary px-5 py-2.5 rounded-2xl text-xs flex items-center gap-2 shadow-[0_4px_15px_var(--green-glow)]">
                <Sparkles className="w-4 h-4" />
                {uiLang === 'fr' ? "Commencer" : "Get Started"}
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-[var(--text-dim)] bg-[var(--bg3)]/50 border border-[var(--border)] rounded-xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-16 bg-[var(--bg)]/95 backdrop-blur-2xl z-[998] lg:hidden p-6 space-y-3"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-4 p-5 rounded-2xl border border-[var(--border)] text-base font-black tracking-tight ${
                  location.pathname === link.path ? 'bg-[var(--green)]/10 border-[var(--green)]/40 text-[var(--green)] shadow-[0_0_15px_var(--green-glow)]' : 'bg-[var(--bg2)]'
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

