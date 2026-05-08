import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LANGUAGE_COURSES } from '../data/languageContent';
import { useStore } from '../store/useStore';
import Seo from '../components/Seo';
import PremiumModal from '../components/PremiumModal';
import { 
  ArrowLeft, BookOpen, Code2, ExternalLink, ChevronRight, Play, CheckCircle2, 
  Zap, FileText, Video, AlertTriangle, Map as MapIcon, Trophy, Target, Sparkles, Star,
  Lock, ArrowRight, MousePointer2, Bot, SquareSquare, Maximize2, Minimize2, Terminal
} from 'lucide-react';
import CodeEditor from '../components/CodeEditor';
import { executeCode } from '../utils/piston';

type Tab = 'cours' | 'algos' | 'ressources';

export default function LanguageDetail() {
  const { id } = useParams<{ id: string }>();
  const { uiLang, addXp, checkStreak } = useStore();
  const lang = LANGUAGE_COURSES[id ?? ''];

  const [activeTab, setActiveTab] = useState<Tab>('cours');
  const [activeSection, setActiveSection] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [showSuccess, setShowSuccess] = useState(false);
  const [mentorHint, setMentorHint] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [userCode, setUserCode] = useState<string>('');
  const [userOutput, setUserOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleMentorAnalyze = () => {
    setIsAnalyzing(true);
    setMentorHint(null);
    setTimeout(() => {
      setIsAnalyzing(false);
      setMentorHint("Excellente initiative ! L'exécution du code dépend de la machine virtuelle. Essayez de modifier les variables dans l'éditeur interactif (La Forge) pour voir comment la sortie évolue. Si vous avez une erreur, vérifiez la syntaxe !");
    }, 1500);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setUserOutput('🚀 Connexion au terminal quantique...');
    setMentorHint(null);
    try {
      const result = await executeCode(userCode, id || 'js');
      setUserOutput(result.output || '✨ Exécution terminée avec succès (aucune sortie console).');
      if (result.output?.toLowerCase().includes('erreur') || result.output?.toLowerCase().includes('error')) {
        setTimeout(() => handleMentorAnalyze(), 1000);
      }
    } catch (err) {
      setUserOutput(`❌ Erreur Critique : ${err instanceof Error ? err.message : String(err)}`);
    }
    setIsRunning(false);
  };

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
  
  const currentSection = lang.sections[activeSection];
  const currentLesson = currentSection?.lessons[activeLesson];

  // Reset user code when lesson changes

  useEffect(() => {
    if (currentLesson) {
      setUserCode(currentLesson.code);
      setUserOutput(null);
      setMentorHint(null);
    }
  }, [currentLesson]);

  const markComplete = () => {
    const key = `${activeSection}-${activeLesson}`;
    if (!completedLessons.has(key)) {
      setCompletedLessons(prev => new Set([...prev, key]));
      addXp(currentLesson.isBoss ? 500 : 150);
      checkStreak();
      setShowSuccess(true);
    } else {
      advance();
    }
  };

  const advance = () => {
    setShowSuccess(false);
    if (activeLesson < currentSection.lessons.length - 1) {
      setActiveLesson(l => l + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (activeSection < lang.sections.length - 1) {
      setActiveSection(s => s + 1);
      setActiveLesson(0);
      setMentorHint(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isCompleted = (si: number, li: number) => completedLessons.has(`${si}-${li}`);

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'cours', label: uiLang === 'fr' ? 'Quêtes' : 'Quests', icon: <MapIcon className="w-4 h-4" /> },
    { id: 'algos', label: uiLang === 'fr' ? 'Défis' : 'Challenges', icon: <Zap className="w-4 h-4" /> },
    { id: 'ressources', label: uiLang === 'fr' ? 'Bibliothèque' : 'Library', icon: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl relative">
      <Seo title={`${lang.name} — Expert Curriculum`} description={lang.desc} />

      {/* Floating Background Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-10 blur-[100px] pointer-events-none rounded-full" style={{ background: lang.color }} />

      {/* Premium Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
        <div className="flex items-center gap-6">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-24 h-24 rounded-[32px] glass flex items-center justify-center text-5xl shadow-2xl border-white/10"
          >
            {lang.icon}
          </motion.div>
          <div>
            <Link to="/languages" className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[var(--text-dim)] hover:text-white mb-2 transition-colors">
              <ArrowLeft size={14} /> {uiLang === 'fr' ? 'Langages' : 'Languages'}
            </Link>
            <h1 className="text-4xl md:text-5xl font-black premium-gradient font-[var(--font-display)] mb-2">
              {lang.name} <span className="text-[var(--text-dim)] text-2xl font-medium">Curriculum</span>
            </h1>
            <div className="flex flex-wrap gap-2">
              <span className="badge" style={{ color: lang.color }}>{lang.tagline}</span>
              <span className="badge text-[var(--blue)] border-[var(--blue)]/30">{lang.level}</span>
            </div>
          </div>
        </div>

        {/* Global Progress Widget */}
        <div className="glass rounded-3xl p-6 border-white/5 flex items-center gap-6 shadow-xl min-w-[300px]">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle cx="32" cy="32" r="28" fill="none" stroke="var(--bg3)" strokeWidth="6" />
              <motion.circle 
                cx="32" cy="32" r="28" fill="none" 
                stroke={lang.color} strokeWidth="6" strokeLinecap="round"
                initial={{ strokeDasharray: "0 1000" }}
                animate={{ strokeDasharray: `${(progressPct / 100) * 175} 1000` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <span className="absolute text-sm font-black">{progressPct}%</span>
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-[var(--text-dim)] mb-1">Progression Totale</div>
            <div className="text-lg font-black text-white">{completedCount} / {totalLessons} <span className="text-xs text-[var(--text-dim)]">Quêtes</span></div>
          </div>
        </div>
      </div>

      {/* Nav Tabs */}
      <div className="flex gap-2 mb-10 p-1.5 glass rounded-2xl border-white/5 w-fit">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all ${
              activeTab === tab.id ? 'bg-white/10 text-white shadow-lg' : 'text-[var(--text-dim)] hover:text-white'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'cours' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Sidebar: Quest Navigator */}
              <div className="lg:col-span-4 space-y-4">
                <div className="flex items-center justify-between px-4 mb-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-[var(--text-dim)] flex items-center gap-2">
                    <MapIcon size={14} className="text-[var(--primary)]" /> {uiLang === 'fr' ? 'Carte du Monde' : 'World Map'}
                  </h3>
                </div>
                
                <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                  {lang.sections.map((section, si) => (
                    <motion.div 
                      key={si}
                      className={`rounded-2xl border transition-all ${activeSection === si ? 'glass border-white/10 shadow-xl' : 'bg-transparent border-transparent'}`}
                    >
                      <button
                        onClick={() => { setActiveSection(si); setActiveLesson(0); setMentorHint(null); }}
                        className="w-full flex items-center gap-4 p-4 text-left group"
                      >
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 glass shadow-inner group-hover:scale-110 transition-transform">
                          <span className="text-2xl">{section.icon}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className={`text-sm font-black ${activeSection === si ? 'text-white' : 'text-[var(--text-dim)] group-hover:text-white'}`}>{section.title}</h4>
                          <p className="text-[9px] font-black uppercase tracking-tighter opacity-60 mt-0.5" style={{ color: lang.color }}>{section.lessons.length} Étapes</p>
                        </div>
                        {isCompleted(si, section.lessons.length - 1) && <CheckCircle2 className="text-[var(--primary)] w-4 h-4" />}
                      </button>

                      <AnimatePresence>
                        {activeSection === si && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }} 
                            animate={{ height: 'auto', opacity: 1 }} 
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-white/[0.02] border-t border-white/5"
                          >
                            <div className="p-3 space-y-1.5">
                              {section.lessons.map((lesson, li) => {
                                const active = activeLesson === li;
                                const completed = isCompleted(si, li);
                                return (
                                  <button
                                    key={li}
                                    onClick={() => { setActiveLesson(li); setMentorHint(null); }}
                                    className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs transition-all ${
                                      active ? 'glass border-white/10 shadow-lg scale-[1.02]' : 'hover:bg-white/5'
                                    }`}
                                  >
                                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-all ${
                                      completed ? 'bg-[var(--primary)]/20 border-[var(--primary)]' : 
                                      active ? 'border-white' : 'border-white/10'
                                    }`}>
                                      {completed ? <CheckCircle2 size={12} className="text-[var(--primary)]" /> : 
                                       active ? <MousePointer2 size={10} className="text-white fill-current" /> : 
                                       <span className="text-[8px] font-black opacity-40">{li + 1}</span>}
                                    </div>
                                    <span className={`flex-1 font-black truncate text-left ${active ? 'text-white' : 'text-[var(--text-dim)]'}`}>{lesson.title}</span>
                                    {active && <Sparkles size={10} className="text-yellow-400" />}
                                  </button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Main Content Area */}
              <div className="lg:col-span-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeSection}-${activeLesson}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-8"
                  >
                    {/* Lesson Hero */}
                    <div className={`p-10 rounded-[32px] glass relative overflow-hidden border-white/10 shadow-2xl ${currentLesson.isBoss ? 'border-red-500/30 bg-red-950/10' : ''}`}>
                      <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${currentLesson.isBoss ? 'from-red-500/10' : 'from-white/5'} to-transparent -z-10 blur-3xl`} />
                      
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-2" style={{ color: lang.color }}>
                            Section {activeSection + 1} • Quête {activeLesson + 1}
                          </div>
                          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">{currentLesson.title}</h2>
                        </div>
                        {isCompleted(activeSection, activeLesson) && (
                          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] text-[10px] font-black uppercase tracking-widest">
                            <CheckCircle2 size={14} /> {uiLang === 'fr' ? 'Maîtrisé' : 'Mastered'}
                          </div>
                        )}
                      </div>

                      <div className="prose prose-invert max-w-none text-[var(--text)] leading-relaxed space-y-6">
                        <p className="text-lg font-medium opacity-90 whitespace-pre-wrap">{currentLesson.explanation}</p>
                        
                        {currentLesson.realWorldUseCase && !currentLesson.isBoss && (
                          <div className="p-6 rounded-2xl bg-white/5 border-l-4 border-[var(--blue)]">
                            <h4 className="text-xs font-black uppercase tracking-widest text-[var(--blue)] mb-3 flex items-center gap-2">
                              <Zap size={14} /> Cas d'usage en production
                            </h4>
                            <p className="text-sm italic opacity-80">{currentLesson.realWorldUseCase}</p>
                          </div>
                        )}

                        {currentLesson.isBoss && currentLesson.bossConstraints && (
                          <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
                            <h4 className="text-xs font-black uppercase tracking-widest text-red-400 mb-4 flex items-center gap-2 animate-pulse">
                              <AlertTriangle size={14} /> Contraintes du Boss
                            </h4>
                            <div className="flex gap-4 mb-4">
                              <div className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-300 text-xs font-black font-mono">
                                Temps : {currentLesson.bossConstraints.timeLimit}
                              </div>
                              <div className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-300 text-xs font-black font-mono">
                                Espace : {currentLesson.bossConstraints.spaceLimit}
                              </div>
                            </div>
                            <p className="text-sm font-medium text-red-200">{currentLesson.bossConstraints.description}</p>
                          </div>
                        )}
                      </div>

                      {/* Interactive Code Editor (The Forge) */}
                      <div className="mt-12 rounded-[32px] border border-white/10 overflow-hidden shadow-2xl bg-[#050505] relative group">
                        <div className="absolute -inset-1 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        
                        {/* Editor Header */}
                        <div className="px-6 py-4 bg-white/[0.02] border-b border-white/5 flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-white/5 flex items-center justify-center">
                              <Code2 size={16} style={{ color: lang.color }} />
                            </div>
                            <div>
                              <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">Éditeur Interactif</div>
                              <div className="text-sm font-black text-white">La Forge {lang.name}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <button
                              onClick={handleRunCode}
                              disabled={isRunning}
                              className={`btn px-6 py-2 text-xs flex items-center gap-2 font-black rounded-xl transition-all ${
                                isRunning ? 'bg-[var(--primary)]/20 text-[var(--primary)] border border-[var(--primary)]/30 shadow-[0_0_20px_rgba(99,102,241,0.2)]' : 'bg-white text-black hover:scale-105 active:scale-95'
                              }`}
                            >
                              {isRunning ? <SquareSquare size={14} className="animate-pulse" /> : <Play size={14} className="fill-current" />}
                              {isRunning ? 'Compilation...' : 'Exécuter le code'}
                            </button>
                          </div>
                        </div>

                        {/* Editor Body */}
                        <div className="h-[250px] relative z-10 border-b border-white/5">
                          <CodeEditor
                            value={userCode}
                            language={id === 'js' ? 'javascript' : id === 'csharp' ? 'csharp' : id === 'cpp' ? 'cpp' : id === 'java' ? 'java' : id === 'c' ? 'c' : 'python'}
                            onChange={(val) => setUserCode(val || '')}
                          />
                        </div>

                        {/* Terminal Output */}
                        <div className="bg-[#050505]">
                          <div className="px-6 py-3 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--primary)] flex items-center gap-2">
                              <Terminal size={14} /> Terminal
                            </span>
                            <button 
                              onClick={handleMentorAnalyze}
                              disabled={isAnalyzing}
                              className="flex items-center gap-1.5 px-4 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)] hover:shadow-[0_0_25px_rgba(168,85,247,0.2)]"
                            >
                              <Bot size={14} className={isAnalyzing ? "animate-bounce" : ""} />
                              {isAnalyzing ? "Analyse..." : "Demander au Mentor IA"}
                            </button>
                          </div>
                          
                          <div className="p-6 min-h-[120px] max-h-[250px] overflow-y-auto custom-scrollbar">
                            <pre className="text-[13px] text-white/80 font-mono whitespace-pre-wrap leading-relaxed">
                              {userOutput !== null ? userOutput : (currentLesson.output || '> Prêt pour exécution...')}
                            </pre>
                            
                            <AnimatePresence>
                              {mentorHint && (
                                <motion.div 
                                  initial={{ opacity: 0, y: 10, scale: 0.95 }} 
                                  animate={{ opacity: 1, y: 0, scale: 1 }} 
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  className="p-5 rounded-2xl bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/20 flex gap-4 mt-6"
                                >
                                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0 shadow-inner">
                                    <Bot className="w-5 h-5 text-purple-400" />
                                  </div>
                                  <div>
                                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 mb-1.5 flex items-center gap-2">
                                      Mentor IA <Sparkles size={10} />
                                    </div>
                                    <p className="text-sm text-purple-100/90 leading-relaxed font-medium">{mentorHint}</p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>

                      {/* Lesson Actions */}
                      <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <button 
                          onClick={() => {
                            if (activeLesson > 0) { setActiveLesson(l => l - 1); setMentorHint(null); }
                            else if (activeSection > 0) { setActiveSection(s => s - 1); setActiveLesson(lang.sections[activeSection - 1].lessons.length - 1); setMentorHint(null); }
                          }}
                          disabled={activeSection === 0 && activeLesson === 0}
                          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--text-dim)] hover:text-white transition-colors disabled:opacity-0"
                        >
                          <ArrowLeft size={16} /> Précédent
                        </button>

                        <button
                          onClick={markComplete}
                          className={`btn px-10 py-4 text-sm font-black rounded-2xl flex items-center gap-3 ${currentLesson.isBoss && !isCompleted(activeSection, activeLesson) ? 'bg-red-500 hover:bg-red-600 text-white shadow-[0_10px_30px_rgba(239,68,68,0.3)]' : 'btn-primary shadow-[0_10px_30px_var(--primary-glow)]'}`}
                        >
                          {isCompleted(activeSection, activeLesson) ? (
                            <>Prochaine Quête <ArrowRight size={18} /></>
                          ) : (
                            <><Sparkles size={18} /> {currentLesson.isBoss ? 'Vaincre le Boss (+500 XP)' : 'Compléter (+150 XP)'}</>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          )}

          {activeTab === 'algos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {lang.algoExamples.map(algo => (
                <Link key={algo.id} to={`/algorithms/${algo.id}`}>
                  <div className="card h-full group hover:border-[var(--primary)]/30">
                    <div className="w-12 h-12 rounded-xl glass mb-6 flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform">
                      {lang.icon}
                    </div>
                    <h3 className="text-xl font-black mb-3">{algo.name}</h3>
                    <p className="text-sm text-[var(--text-dim)] mb-8 flex-1">Implémentation optimisée et visualisation interactive du {algo.name} en {lang.name}.</p>
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--primary)] group-hover:gap-4 transition-all">
                      Coder maintenant <ChevronRight size={16} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {activeTab === 'ressources' && (
            <div className="max-w-3xl space-y-4">
              {lang.resources.map((r, i) => (
                <a 
                  key={i} href={r.url} target="_blank" rel="noreferrer"
                  className="flex items-center gap-6 p-6 glass rounded-2xl border-white/5 hover:border-white/20 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center glass shadow-inner" style={{ color: lang.color }}>
                    {r.type === 'doc' ? <FileText size={24} /> : r.type === 'video' ? <Video size={24} /> : <ExternalLink size={24} />}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-black text-white group-hover:text-[var(--primary)] transition-colors">{r.title}</h4>
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{r.type}</span>
                  </div>
                  <ArrowRight className="text-[var(--text-dim)] opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                </a>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <PremiumModal 
        isOpen={showSuccess}
        onClose={advance}
        title={currentLesson.isBoss ? (uiLang === 'fr' ? 'BOSS VAINCU !' : 'BOSS DEFEATED!') : (uiLang === 'fr' ? 'Quête Accomplie !' : 'Quest Accomplished!')}
        subtitle={uiLang === 'fr' ? `Bravo ! Vous avez maîtrisé : ${currentLesson.title}` : `Great job! You mastered: ${currentLesson.title}`}
        xpEarned={currentLesson.isBoss ? 500 : 150}
        badge={currentLesson.isBoss ? { icon: '🐉', name: 'Slayer', color: '#ef4444' } : (completedCount % 5 === 0 ? { icon: '🏅', name: 'Apprenti Rigoureux', color: '#2ecc71' } : undefined)}
        actionLabel={uiLang === 'fr' ? 'Continuer la Route' : 'Continue Journey'}
        onAction={advance}
      />
    </div>
  );
}
