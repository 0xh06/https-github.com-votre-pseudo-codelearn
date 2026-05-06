import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LANGUAGE_COURSES } from '../data/languageContent';
import { useStore } from '../store/useStore';
import Seo from '../components/Seo';
import { ArrowLeft, BookOpen, Code2, ExternalLink, ChevronRight, Play, CheckCircle2, Zap, FileText, Video, AlertTriangle, Map, Trophy, Target, Sparkles, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

type Tab = 'cours' | 'algos' | 'ressources';

function Bar({ value, color, label }: { value: number; color: string; label: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px]">
        <span className="text-[var(--text-dim)] font-bold uppercase tracking-wider">{label}</span>
        <span className="font-black" style={{ color }}>{value}/100</span>
      </div>
      <div className="h-1.5 bg-[var(--bg3)] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export default function LanguageDetail() {
  const { id } = useParams<{ id: string }>();
  const { uiLang } = useStore();
  const lang = LANGUAGE_COURSES[id ?? ''];

  const [activeTab, setActiveTab] = useState<Tab>('cours');
  const [activeSection, setActiveSection] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  if (!lang) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-black mb-4">Langage non trouvé</h1>
        <Link to="/languages" className="btn btn-primary">← Retour aux langages</Link>
      </div>
    );
  }

  const totalLessons = lang.sections.reduce((acc, s) => acc + s.lessons.length, 0);
  const completedCount = completedLessons.size;
  const progressPct = Math.round((completedCount / totalLessons) * 100);
  const currentXP = completedCount * 150;
  const maxXP = totalLessons * 150;
  const playerLevel = Math.floor(currentXP / 300) + 1;

  const currentSection = lang.sections[activeSection];
  const currentLesson = currentSection?.lessons[activeLesson];

  const markComplete = () => {
    const key = `${activeSection}-${activeLesson}`;
    if (!completedLessons.has(key)) {
      setCompletedLessons(prev => new Set([...prev, key]));
      
      // Confetti effect for gamification
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.8 },
        colors: [lang.color, '#ffffff', '#ffd700']
      });
    }

    // Auto-advance
    if (activeLesson < currentSection.lessons.length - 1) {
      setActiveLesson(l => l + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (activeSection < lang.sections.length - 1) {
      setActiveSection(s => s + 1);
      setActiveLesson(0);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isCompleted = (si: number, li: number) => completedLessons.has(`${si}-${li}`);

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'cours', label: uiLang === 'fr' ? 'La Quête Principale' : 'Main Quest', icon: <Map className="w-4 h-4" /> },
    { id: 'algos', label: uiLang === 'fr' ? 'Défis Algorithmes' : 'Algorithm Challenges', icon: <Code2 className="w-4 h-4" /> },
    { id: 'ressources', label: uiLang === 'fr' ? 'Bibliothèque' : 'Library', icon: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Seo title={`${lang.name} — Cours`} description={lang.desc} />

      {/* Back + Header */}
      <Link to="/languages" className="inline-flex items-center gap-2 text-sm text-[var(--text-dim)] hover:text-[var(--green)] mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> {uiLang === 'fr' ? 'Retour aux langages' : 'Back to languages'}
      </Link>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border p-6 mb-8 relative overflow-hidden"
        style={{ borderColor: lang.color + '40', background: lang.color + '06' }}
      >
        <div className="absolute top-0 right-0 text-[120px] opacity-5 leading-none select-none">{lang.icon}</div>
        <div className="flex flex-col md:flex-row gap-6 relative">
          <div className="flex items-start gap-4 flex-1">
            <span className="text-5xl">{lang.icon}</span>
            <div>
              <h1 className="text-3xl font-black text-[var(--text-bright)]">{lang.name}</h1>
              <p className="font-medium italic mb-2" style={{ color: lang.color }}>{lang.tagline}</p>
              <p className="text-sm text-[var(--text-dim)] max-w-xl">{lang.desc}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {[lang.typing, lang.paradigm, lang.compiled].map(m => (
                  <span key={m} className="text-[9px] px-2 py-0.5 rounded-full bg-[var(--bg3)] border border-[var(--border)] text-[var(--text-dim)] font-medium">{m}</span>
                ))}
                <span className={`text-[9px] px-2 py-0.5 rounded-full border font-black ${
                  lang.level === 'Débutant' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                  lang.level === 'Intermédiaire' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                  'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                  {lang.level}
                </span>
              </div>
            </div>
          </div>
          {/* Stats + XP */}
          <div className="shrink-0 space-y-4 min-w-[250px] p-4 bg-[var(--bg)]/50 rounded-xl border border-[var(--border)] backdrop-blur-md">
            <div className="flex items-center gap-3 border-b border-[var(--border)] pb-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center font-black text-xl border-2 shadow-lg" style={{ borderColor: lang.color, backgroundColor: lang.color + '20', color: lang.color }}>
                {playerLevel}
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[var(--text-dim)]">Niveau Joueur</div>
                <div className="text-lg font-black">{uiLang === 'fr' ? 'Aventurier' : 'Adventurer'}</div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1 text-yellow-500"><Star className="w-3 h-3 fill-current" /> XP Total</span>
                <span className="text-white">{currentXP} / {maxXP}</span>
              </div>
              <div className="h-2 bg-[var(--bg3)] rounded-full overflow-hidden shadow-inner">
                <motion.div animate={{ width: `${progressPct}%` }} transition={{ duration: 1, type: 'spring' }} className="h-full rounded-full bg-yellow-500" />
              </div>
            </div>

            <div className="space-y-1 mt-4 pt-4 border-t border-[var(--border)]">
              <div className="flex justify-between text-[10px]">
                <span className="text-[var(--text-dim)] font-bold uppercase tracking-wider">
                  <Target className="w-3 h-3 inline mr-1" /> {uiLang === 'fr' ? 'Quêtes accomplies' : 'Quests completed'}
                </span>
                <span className="font-black text-[var(--green)]">{completedCount}/{totalLessons}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 p-1 bg-[var(--bg2)] rounded-xl border border-[var(--border)] w-fit">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-black transition-all ${activeTab === tab.id ? 'text-black' : 'text-[var(--text-dim)] hover:text-[var(--text-bright)]'}`}
            style={activeTab === tab.id ? { backgroundColor: lang.color } : {}}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'cours' && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar: Map of Knowledge */}
              <div className="lg:col-span-1 space-y-2 sticky top-24">
                <div className="p-3 bg-[var(--bg3)] border border-[var(--border)] rounded-xl flex items-center justify-between shadow-sm">
                  <span className="text-xs font-black uppercase tracking-widest text-[var(--text-dim)] flex items-center gap-2"><Map className="w-4 h-4"/> Carte du Monde</span>
                  <span className="text-[9px] font-black text-[var(--green)] px-2 py-0.5 rounded-full bg-[var(--green)]/10">{progressPct}%</span>
                </div>
              {lang.sections.map((section, si) => (
                <div key={si} className="rounded-xl border border-[var(--border)] bg-[var(--bg2)] overflow-hidden">
                  <button
                    onClick={() => { setActiveSection(si); setActiveLesson(0); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[var(--bg3)]/50 transition-colors"
                    style={activeSection === si ? { background: lang.color + '10', borderLeft: `4px solid ${lang.color}` } : {}}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-inner" style={{ background: 'var(--bg3)', border: '1px solid var(--border)' }}>
                      <span className="text-lg">{section.icon}</span>
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className="text-xs font-black text-[var(--text-bright)]">{section.title}</span>
                      {section.level && <span className="text-[9px] font-bold uppercase mt-0.5" style={{ color: section.level === 'Expert' ? '#ef4444' : section.level === 'Intermédiaire' ? '#f59e0b' : '#3b82f6' }}>{section.level}</span>}
                    </div>
                    <span className="text-[9px] font-bold text-[var(--text-dim)]">
                      {section.lessons.filter((_, li) => isCompleted(si, li)).length}/{section.lessons.length}
                    </span>
                  </button>
                  {activeSection === si && (
                    <div className="border-t border-[var(--border)] bg-[var(--bg)]/50 p-2 space-y-1">
                      {section.lessons.map((lesson, li) => (
                        <button
                          key={li}
                          onClick={() => setActiveLesson(li)}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-all group ${activeLesson === li ? 'bg-[var(--bg2)] shadow-sm border border-[var(--border)]' : 'hover:bg-[var(--bg2)] border border-transparent'}`}
                        >
                          <div className="relative flex items-center justify-center">
                            {isCompleted(si, li)
                              ? <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0"><CheckCircle2 className="w-3.5 h-3.5 text-green-400" /></div>
                              : <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center ${activeLesson === li ? 'bg-[var(--bg)]' : 'border-[var(--border)] bg-[var(--bg3)] group-hover:border-white/20'}`} style={activeLesson === li ? { borderColor: lang.color } : {}}>
                                  {activeLesson === li && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: lang.color }} />}
                                </div>}
                          </div>
                          <span className={activeLesson === li ? 'font-bold text-[var(--text-bright)]' : 'font-medium text-[var(--text-dim)] group-hover:text-white/80'}>{lesson.title}</span>
                          
                          {/* XP Badge */}
                          <span className="ml-auto text-[8px] font-black text-yellow-500 bg-yellow-500/10 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity" style={activeLesson === li ? { opacity: 1 } : {}}>
                            +150 XP
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              </div>

            {/* Main lesson content */}
            <div className="lg:col-span-3 space-y-5">
              {currentLesson && (
                <AnimatePresence mode="wait">
                  <motion.div key={`${activeSection}-${activeLesson}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                    {/* Lesson header */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: lang.color }}>
                          {currentSection.title}
                        </div>
                        <h2 className="text-2xl font-black text-[var(--text-bright)]">{currentLesson.title}</h2>
                      </div>
                      {isCompleted(activeSection, activeLesson) && (
                        <span className="flex items-center gap-1.5 text-xs font-bold text-green-400 bg-green-400/10 border border-green-400/20 px-3 py-1.5 rounded-full shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Complété
                        </span>
                      )}
                    </div>

                    {/* Explanation */}
                    <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg2)]">
                      <h3 className="text-xs font-black uppercase tracking-widest text-[var(--text-dim)] mb-3 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" /> {uiLang === 'fr' ? 'Explication Détaillée' : 'Detailed Explanation'}
                      </h3>
                      <div className="text-sm text-[var(--text)] leading-relaxed whitespace-pre-wrap">{currentLesson.explanation}</div>
                    </div>

                    {currentLesson.realWorldUseCase && (
                      <div className="p-5 rounded-2xl border border-blue-500/20 bg-blue-500/5">
                        <h3 className="text-xs font-black uppercase tracking-widest text-blue-400 mb-3 flex items-center gap-2">
                          <Zap className="w-4 h-4" /> {uiLang === 'fr' ? 'Cas d\'usage réel' : 'Real-world Use Case'}
                        </h3>
                        <div className="text-sm text-blue-100 leading-relaxed whitespace-pre-wrap">{currentLesson.realWorldUseCase}</div>
                      </div>
                    )}

                    {currentLesson.commonErrors && (
                      <div className="p-5 rounded-2xl border border-red-500/20 bg-red-500/5">
                        <h3 className="text-xs font-black uppercase tracking-widest text-red-400 mb-3 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" /> {uiLang === 'fr' ? 'Erreurs Courantes & Pièges' : 'Common Errors & Pitfalls'}
                        </h3>
                        <div className="text-sm text-red-100 leading-relaxed whitespace-pre-wrap">{currentLesson.commonErrors}</div>
                      </div>
                    )}

                    {/* Code block */}
                    <div className="rounded-2xl border border-[var(--border)] overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--bg3)] border-b border-[var(--border)]">
                        <div className="flex items-center gap-2">
                          <Code2 className="w-3.5 h-3.5" style={{ color: lang.color }} />
                          <span className="text-xs font-black" style={{ color: lang.color }}>{lang.name}</span>
                        </div>
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-500/60" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                          <div className="w-3 h-3 rounded-full bg-green-500/60" />
                        </div>
                      </div>
                      <pre className="p-5 bg-[#0d0d0d] font-mono text-xs text-white/80 overflow-x-auto leading-relaxed">
                        <code>{currentLesson.code}</code>
                      </pre>
                      {currentLesson.output && (
                        <div className="border-t border-[var(--border)] px-5 py-3 bg-[#111]">
                          <div className="text-[9px] font-black uppercase tracking-widest text-[var(--text-dim)] mb-1.5">
                            <Play className="w-3 h-3 inline mr-1" />Output
                          </div>
                          <pre className="text-xs font-mono text-green-400">{currentLesson.output}</pre>
                        </div>
                      )}
                    </div>

                    {/* Navigation */}
                    <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[var(--border)] mt-8">
                      <button
                        onClick={() => {
                          if (activeLesson > 0) setActiveLesson(l => l - 1);
                          else if (activeSection > 0) { setActiveSection(s => s - 1); setActiveLesson(lang.sections[activeSection - 1].lessons.length - 1); }
                        }}
                        disabled={activeSection === 0 && activeLesson === 0}
                        className="text-xs font-bold text-[var(--text-dim)] hover:text-[var(--text-bright)] flex items-center gap-1 disabled:opacity-30 transition-colors w-full sm:w-auto justify-center px-4 py-2 rounded-lg hover:bg-[var(--bg3)]"
                      >
                        ← {uiLang === 'fr' ? 'Quête précédente' : 'Previous quest'}
                      </button>

                      <button
                        onClick={markComplete}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-black text-sm text-black transition-all hover:scale-105 shadow-xl"
                        style={{ backgroundColor: isCompleted(activeSection, activeLesson) ? '#3b82f6' : lang.color, boxShadow: `0 4px 20px -5px ${isCompleted(activeSection, activeLesson) ? '#3b82f6' : lang.color}80` }}
                      >
                        {isCompleted(activeSection, activeLesson)
                          ? (uiLang === 'fr' ? 'Prochaine quête →' : 'Next quest →')
                          : (
                            <>
                              <Sparkles className="w-4 h-4" />
                              {uiLang === 'fr' ? 'Compléter la quête (+150 XP)' : 'Complete Quest (+150 XP)'}
                            </>
                          )}
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
          )}

          {activeTab === 'algos' && (
            <div className="space-y-4">
              <p className="text-[var(--text-dim)] text-sm mb-6">
                {uiLang === 'fr'
                  ? `Tous ces algorithmes ont une implémentation dédiée en ${lang.name} dans l'éditeur.`
                  : `All these algorithms have a dedicated ${lang.name} implementation in the editor.`}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {lang.algoExamples.map(algo => (
                  <Link key={algo.id} to={`/algorithms/${algo.id}`}>
                    <div
                      className="p-6 rounded-2xl border bg-[var(--bg2)] hover:border-opacity-60 transition-all group h-full flex flex-col"
                      style={{ borderColor: lang.color + '30' }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = lang.color + '70')}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = lang.color + '30')}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl">{lang.icon}</span>
                        <Zap className="w-5 h-5" style={{ color: lang.color }} />
                      </div>
                      <h3 className="text-lg font-black text-[var(--text-bright)] mb-2">{algo.name}</h3>
                      <p className="text-sm text-[var(--text-dim)] mb-6 flex-1">{uiLang === 'fr' ? `Voir le code en ${lang.name}` : `View code in ${lang.name}`}</p>
                      <div className="flex items-center gap-2 text-sm font-black group-hover:gap-3 transition-all" style={{ color: lang.color }}>
                        {uiLang === 'fr' ? 'Coder maintenant' : 'Code now'} <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'ressources' && (
            <div className="space-y-4 max-w-3xl">
              {lang.resources.map((r, i) => (
                <a
                  key={i}
                  href={r.url.startsWith('/') ? undefined : r.url}
                  onClick={r.url.startsWith('/') ? () => window.location.href = r.url : undefined}
                  target={r.url.startsWith('/') ? undefined : '_blank'}
                  rel="noreferrer"
                  className="flex items-center gap-5 p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg2)] hover:bg-[var(--bg3)] hover:border-opacity-60 transition-all group"
                  style={{ borderLeftWidth: 4, borderLeftColor: lang.color }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: lang.color + '15' }}>
                    {r.type === 'doc' ? <FileText className="w-5 h-5" style={{ color: lang.color }} /> :
                     r.type === 'video' ? <Video className="w-5 h-5" style={{ color: lang.color }} /> :
                     <Zap className="w-5 h-5" style={{ color: lang.color }} />}
                  </div>
                  <div className="flex-1">
                    <div className="font-black text-base text-[var(--text-bright)] mb-0.5">{r.title}</div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-dim)]">{r.type}</div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-[var(--text-dim)] group-hover:text-[var(--text-bright)] transition-colors" />
                </a>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
