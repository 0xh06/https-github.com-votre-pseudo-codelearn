import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { supabase } from '../lib/supabase';
import { 
  Code2, 
  Terminal, 
  Brain, 
  Map as MapIcon, 
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
  Trophy,
  Paintbrush,
  Flame,
  Hammer,
  Search
} from 'lucide-react';
import { getLevelInfo } from '../utils/levels';
import { t } from '../utils/i18n';
import AvatarRenderer from './AvatarRenderer';

export default function Navbar() {
  const { xp, user, setUser, subscriptionPlan, uiLang, setUiLang, avatar, completedUniversal, streakData } = useStore();
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
    { name: t('nav_roadmap', uiLang),    path: '/paths',      icon: <MapIcon className="w-4 h-4" /> },
    { name: t('nav_languages', uiLang),  path: '/languages',  icon: <Globe className="w-4 h-4" /> },
    { name: uiLang === 'fr' ? 'La Forge' : 'The Forge', path: '/projects', icon: <Hammer className="w-4 h-4" /> },
    { name: t('nav_pricing', uiLang),    path: '/pricing',    icon: <CreditCard className="w-4 h-4" /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 glass z-[999] px-4">
      <div className="container mx-auto h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-[var(--primary)]/15 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-all duration-500 shadow-[0_0_15px_var(--primary-glow)]">
            <Code2 className="text-[var(--primary)] w-6 h-6" />
          </div>
          <span className="text-xl font-black tracking-tighter text-[var(--text-bright)] font-[var(--font-display)]">
            ALGO<span className="text-[var(--primary)]">MASTER</span>
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
                  ? 'text-[var(--primary)]' 
                  : 'text-[var(--text-dim)] hover:text-[var(--text-bright)]'
              }`}
            >
              {link.icon}
              {link.name}
              {location.pathname === link.path && (
                <motion.div 
                  layoutId="nav-active" 
                  className="absolute inset-0 bg-[var(--primary)]/5 rounded-xl -z-10 border border-[var(--primary)]/20 shadow-[0_0_10px_var(--primary-glow)]"
                />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true, ctrlKey: true });
                window.dispatchEvent(event);
              }}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-[14px] bg-[var(--bg3)]/50 border border-[var(--border)] hover:border-[var(--text-dim)]/30 transition-all text-xs text-[var(--text-dim)]"
              title="Recherche globale"
            >
              <Search size={14} />
              <span className="font-medium">Rechercher</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono">⌘K</kbd>
            </button>

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

            {/* 🔥 LE FEU DE CAMP (STREAK) */}
            <div 
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[14px] bg-[var(--bg3)]/50 border border-white/5 cursor-default ${streakData.count > 0 ? 'text-orange-400' : 'text-white/20'}`}
              title={uiLang === 'fr' ? 'Série quotidienne' : 'Daily Streak'}
            >
              <Flame className={`w-4 h-4 ${streakData.count > 0 ? 'animate-pulse' : ''}`} />
              <span className="text-[11px] font-black">{streakData.count}</span>
            </div>
          </div>

          {user ? (
            <div className="flex items-center gap-2 p-1 rounded-[20px] bg-[var(--bg3)]/50 border border-white/5">
              {/* Level Badge - Integrated */}
              <Link to="/leaderboard" className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-[14px] bg-[var(--bg)] border border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                <Trophy className="w-3.5 h-3.5 text-[var(--yellow)]" />
                <span className="text-[11px] font-black text-white">{levelData.level}</span>
              </Link>

              {/* Profile Pill */}
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={`flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-[16px] transition-all ${
                    isUserMenuOpen ? 'bg-[var(--bg)] shadow-inner border-white/10' : 'hover:bg-white/5 border-transparent'
                  } border`}
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-[var(--bg2)] border border-white/10 flex items-center justify-center shadow-lg">
                    <AvatarRenderer config={avatar} size={32} />
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-[10px] font-black text-[var(--text-bright)] leading-none truncate max-w-[80px]">
                      {user.email?.split('@')[0]}
                    </div>
                  </div>
                  <ChevronDown className={`w-3 h-3 text-[var(--text-dim)] transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-72 glass rounded-[32px] shadow-2xl overflow-hidden border-white/10"
                  >
                    {/* Identity Hub Header */}
                    <div className="relative p-6 pb-4 overflow-hidden">
                      <div className="absolute inset-0 profile-card-glow opacity-50 -z-10" />
                      <div className="flex flex-col items-center text-center space-y-3">
                        <div className="relative group/avatar">
                          <div className="absolute inset-0 bg-[var(--primary)]/20 blur-xl rounded-full opacity-0 group-hover/avatar:opacity-100 transition-opacity" />
                          <AvatarRenderer config={avatar} size={80} />
                          <Link 
                            to="/avatar" 
                            onClick={() => setIsUserMenuOpen(false)}
                            className="absolute -right-2 -bottom-2 w-8 h-8 rounded-full bg-[var(--bg3)] border border-white/10 flex items-center justify-center text-[var(--primary)] hover:scale-110 transition-transform shadow-lg"
                            title="Personnaliser"
                          >
                            <Paintbrush size={14} />
                          </Link>
                        </div>
                        <div>
                          <div className="text-lg font-black text-[var(--text-bright)] tracking-tight">
                            {user.email?.split('@')[0]}
                          </div>
                          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--primary)]">
                            {levelData.name} • NIV.{levelData.level}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stats Quick View */}
                    <div className="px-6 py-4 grid grid-cols-2 gap-3 border-y border-white/5 bg-white/[0.02]">
                      <div className="text-center">
                        <div className="text-sm font-black text-[var(--text-bright)]">{xp}</div>
                        <div className="text-[8px] font-black uppercase tracking-widest text-[var(--text-dim)]">Points XP</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-black text-[var(--text-bright)]">{completedUniversal.length}</div>
                        <div className="text-[8px] font-black uppercase tracking-widest text-[var(--text-dim)]">Leçons</div>
                      </div>
                    </div>

                    <div className="p-2 space-y-1">
                      <Link 
                        to="/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-[var(--text-dim)] hover:text-[var(--text-bright)] hover:bg-white/5 transition-all"
                      >
                        <User className="w-4 h-4" />
                        {t('nav_dashboard', uiLang)}
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-red-400 hover:bg-red-400/5 transition-all"
                      >
                        <LogOut className="w-4 h-4" />
                        {t('nav_logout', uiLang)}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/signup" className="btn btn-primary px-5 py-2.5 rounded-2xl text-xs flex items-center gap-2 shadow-[0_4px_15px_var(--primary-glow)]">
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
                  location.pathname === link.path ? 'bg-[var(--primary)]/10 border-[var(--primary)]/40 text-[var(--primary)] shadow-[0_0_15px_var(--primary-glow)]' : 'bg-[var(--bg2)]'
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

