import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ALGORITHMS } from '../data/content';
import CodeEditor from '../components/CodeEditor';
import AlgorithmVisualizer from '../components/AlgorithmVisualizer';
import Seo from '../components/Seo';
import PremiumModal from '../components/PremiumModal';
import { useState, useEffect } from 'react';
import { executeCode } from '../utils/piston';
import { useStore } from '../store/useStore';
import { t } from '../utils/i18n';
import {
  Play, Maximize2, Minimize2, Lightbulb, SquareSquare, ChevronDown,
  CheckCircle2, BookOpen, Eye, Code2, Zap, Target, Clock, Database,
  ArrowLeft, Info, Sparkles, Trophy, ChevronRight, Terminal, Share2, Bot
} from 'lucide-react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

type Tab = 'comprendre' | 'visualiser' | 'implementer' | 'defis';

const LANG_INFO: Record<string, { label: string; note: string }> = {
  js:     { label: 'JavaScript', note: 'Utilisez la destructuration [a,b]=[b,a] pour les échanges en une ligne.' },
  python: { label: 'Python',     note: 'Python supporte a,b = b,a pour l\'échange. Les listes sont mutables.' },
  c:      { label: 'C',          note: 'En C, les tableaux sont passés par pointeur. Utilisez une variable temp pour les échanges.' },
  cpp:    { label: 'C++',        note: 'Préférez std::swap() et passez le vecteur par référence (&) pour éviter les copies.' },
  csharp: { label: 'C#',         note: 'Utilisez (arr[i], arr[j]) = (arr[j], arr[i]) avec les tuples C# 7+.' },
  java:   { label: 'Java',       note: 'Les tableaux Java sont objets. Passez-les en paramètre, ils sont modifiés in-place.' },
};

const USE_CASES: Record<string, string[]> = {
  'bubble-sort':    ['Trier un petit jeu de données', 'Détecter si un tableau est presque trié', 'Usage pédagogique pour comprendre le tri'],
  'quick-sort':     ['Tri rapide général (bibliothèques standard)', 'Tri de tableaux larges en mémoire', 'Algorithme de base de qsort() en C'],
  'merge-sort':     ['Tri de fichiers sur disque (Tri externe)', 'Quand la stabilité du tri est requise', 'Comptage des inversions dans un tableau'],
  'binary-search':  ['Recherche dans un dictionnaire', 'Trouver une valeur dans une BDD triée', 'Déterminer une borne de bisection'],
  'bfs':            ['Chemin le plus court (graphe non pondéré)', 'Exploration de réseaux sociaux', 'Moteurs de crawl web'],
  'fibonacci-dp':   ['Modélisation de croissance', 'Analyse de suites financières', 'Problèmes de montée d\'escalier'],
  'kadane':         ['Max sous-tableau de gains boursiers', 'Analyse de séquences de données', 'Problèmes de sous-chaînes maximales'],
};

export default function AlgorithmDetail() {
  const { id } = useParams();
  const { uiLang, addXp, checkStreak } = useStore();
  const algo = ALGORITHMS.find(a => a.id === id);
  const [activeTab, setActiveTab] = useState<Tab>('comprendre');
  const [lang, setLang] = useState('js');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [mentorHint, setMentorHint] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (algo) {
      const savedCode = localStorage.getItem(`algo-code-${id}-${lang}`);
      setCode(savedCode || (algo.starter as any)[lang] || algo.starter.js);
      setShowSolution(false);
      setHintLevel(0);
      setOutput('');
      setMentorHint(null);
    }
  }, [algo, lang, id]);

  if (!algo) return (
    <div className="container mx-auto py-20 text-center">
      <div className="text-6xl mb-6">🕵️‍♂️</div>
      <h1 className="text-2xl font-black mb-4">Algorithme non trouvé</h1>
      <Link to="/algorithms" className="btn btn-primary">← Retour au catalogue</Link>
    </div>
  );

  const hasVisualizer = ['bubble-sort', 'quick-sort', 'binary-search'].includes(algo.id);

  const checkSuccess = (out: string) => {
    // Simple heuristic to detect success for sorting/search
    const successKeywords = ['trié', 'sorted', 'found', 'trouvé', 'correct', 'success', '✅'];
    const isSuccess = successKeywords.some(kw => out.toLowerCase().includes(kw));
    
    if (isSuccess && !showSuccess) {
      addXp(250);
      checkStreak();
      setShowSuccess(true);
    }
  };

  const handleRun = async () => {
    setIsRunning(true);
    setMentorHint(null);
    setOutput('🚀 Exécution du kernel en cours...\n');
    let isTimeout = false;
    const timeoutId = setTimeout(() => {
      isTimeout = true;
      setIsRunning(false);
      setOutput(prev => prev + '\n❌ Timeout > 5s. Boucle infinie détectée.');
    }, 5000);

    try {
      const currentCode = code || (algo.starter as any)[lang] || algo.starter.js;
      const result = await executeCode(currentCode, lang);
      if (!isTimeout) {
        clearTimeout(timeoutId);
        const finalOutput = result.output || 'Code exécuté avec succès.';
        setOutput(finalOutput);
        checkSuccess(finalOutput);
      }
    } catch (err) {
      if (!isTimeout) {
        clearTimeout(timeoutId);
        setOutput(`❌ Runtime Error: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
    setIsRunning(false);
  };

  const handleMentorAnalyze = () => {
    setIsAnalyzing(true);
    setMentorHint(null);
    setTimeout(() => {
      setIsAnalyzing(false);
      if (output.includes('Timeout')) {
        setMentorHint("Il semble que votre code contienne une boucle infinie. Vérifiez vos conditions d'arrêt (ex: i < n) et assurez-vous que vos variables d'itération sont bien mises à jour !");
      } else if (output.includes('ReferenceError') || output.includes('NameError')) {
        setMentorHint("Vous essayez d'utiliser une variable ou une fonction qui n'existe pas encore. Vérifiez les fautes de frappe !");
      } else if (output.includes('SyntaxError')) {
        setMentorHint("Il y a une erreur de syntaxe. Avez-vous oublié une parenthèse, une virgule ou deux points (:) ?");
      } else {
        setMentorHint("Le code s'exécute mais ne produit pas le résultat attendu. Essayez d'ajouter des 'print' ou 'console.log' à chaque étape pour inspecter vos variables.");
      }
    }, 1500);
  };

  const handleRevealSolution = () => {
    if (confirm('Révéler la solution Maître ? Vous ne gagnerez pas de bonus d\'XP.')) {
      setShowSolution(true);
      setCode((algo as any)[lang] || algo.js);
    }
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'comprendre', label: t('tab_understand', uiLang),  icon: <BookOpen className="w-4 h-4" /> },
    { id: 'visualiser', label: t('tab_visualize', uiLang),   icon: <Eye className="w-4 h-4" /> },
    { id: 'implementer', label: t('tab_implement', uiLang),  icon: <Terminal className="w-4 h-4" /> },
    { id: 'defis', label: t('tab_challenges', uiLang),       icon: <Zap className="w-4 h-4" /> },
  ];

  const useCases = USE_CASES[algo.id] || [];
  const langInfo = LANG_INFO[lang];

  // ===== TAB: COMPRENDRE =====
  const TabComprendre = (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="badge text-[var(--green)] bg-[var(--green)]/10 border-[var(--green)]/20">{algo.difficulty}</span>
          <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-dim)]">Expert System</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-[var(--font-display)] font-black premium-gradient mb-6 leading-tight">
          {algo.name}
        </h1>
        <p className="text-lg text-[var(--text)] leading-relaxed font-medium">
          {algo.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 rounded-3xl glass border-white/5 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5"><Clock size={64} /></div>
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--text-dim)] mb-6 flex items-center gap-2">
            <Clock size={14} className="text-[var(--blue)]" /> Complexité Temporelle
          </h3>
          <div className="text-4xl font-black mb-4 text-white">{algo.timeO}</div>
          <p className="text-sm text-[var(--text-dim)] leading-relaxed">{algo.complexityDesc.split('.')[0]}.</p>
        </div>

        <div className="p-8 rounded-3xl glass border-white/5 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5"><Database size={64} /></div>
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--text-dim)] mb-6 flex items-center gap-2">
            <Database size={14} className="text-purple-400" /> Espace Mémoire
          </h3>
          <div className="text-4xl font-black mb-4 text-white">{algo.spaceO}</div>
          <p className="text-sm text-[var(--text-dim)] leading-relaxed">Utilisation d'espace additionnel constant ou proportionnel.</p>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--text-dim)] mb-8 flex items-center gap-2">
          <Sparkles size={14} className="text-yellow-400" /> Logique Algorithmique
        </h3>
        <div className="space-y-6">
          {algo.steps.map((step: string, i: number) => (
            <div key={i} className="flex gap-6 group">
              <div className="shrink-0 w-10 h-10 rounded-2xl glass border-white/10 flex items-center justify-center text-sm font-black shadow-lg group-hover:scale-110 transition-transform">
                {i + 1}
              </div>
              <div className="pt-2">
                <p className="text-[var(--text)] leading-relaxed font-medium">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {useCases.length > 0 && (
        <div className="p-8 rounded-[32px] bg-[var(--green)]/[0.03] border border-[var(--green)]/10">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--green)] mb-6 flex items-center gap-2">
            <Target size={14} /> Applications Industrielles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {useCases.map((uc, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--green)] mt-1.5 shrink-0" />
                <span className="text-sm font-medium opacity-90">{uc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {algo.hints && (
        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--text-dim)] mb-6 flex items-center gap-2">
            <Lightbulb size={14} className="text-yellow-400" /> Indices de Résolution
          </h3>
          {algo.hints.map((hint: string, i: number) => (
            <div key={i}>
              {hintLevel >= i + 1 ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-2xl glass border-yellow-500/20 text-sm font-medium"
                >
                  <span className="text-yellow-400 font-black mr-2">INDICE {i + 1} :</span> {hint}
                </motion.div>
              ) : (
                <button
                  onClick={() => setHintLevel(i + 1)}
                  disabled={hintLevel !== i}
                  className="w-full p-4 rounded-2xl glass border-white/5 text-sm font-black flex items-center justify-between hover:bg-white/5 transition-all disabled:opacity-30 group"
                >
                  <span className="text-[var(--text-dim)] group-hover:text-white transition-colors">Débloquer l'indice {i + 1}</span>
                  <ChevronDown className="w-4 h-4 opacity-50 group-hover:translate-y-0.5 transition-transform" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );

  // ===== TAB: VISUALISER =====
  const TabVisualiser = (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      {hasVisualizer ? (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl glass border-white/5 flex items-center gap-4 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-[var(--blue)]/10 flex items-center justify-center text-[var(--blue)]">
              <Zap size={20} />
            </div>
            <div>
              <h4 className="text-sm font-black">Simulation Interactive</h4>
              <p className="text-xs text-[var(--text-dim)] font-medium">Contrôlez l'exécution pas-à-pas pour visualiser les mutations de données.</p>
            </div>
          </div>
          <AlgorithmVisualizer algoId={algo.id} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center glass rounded-[40px] border-white/5">
          <div className="w-20 h-20 rounded-full glass border-white/10 flex items-center justify-center text-[var(--text-dim)] mb-8 opacity-40">
            <Eye size={32} />
          </div>
          <h3 className="text-2xl font-black mb-2">Visualisation non disponible</h3>
          <p className="text-[var(--text-dim)] max-w-sm font-medium">Cet algorithme n'a pas encore de simulateur graphique. Consultez l'onglet <strong>Comprendre</strong> pour le schéma d'exécution.</p>
        </div>
      )}
    </motion.div>
  );

  // ===== TAB: IMPLEMENTER =====
  const TabImplementer = (
    <div className={`flex flex-col h-full glass border-white/5 overflow-hidden shadow-2xl transition-all ${isFocusMode ? 'fixed inset-0 z-[10000] rounded-none' : 'rounded-[32px]'}`}>
      {/* Editor Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/[0.02] backdrop-blur-xl">
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--green)]/50" />
          </div>
          <div className="h-4 w-px bg-white/10 mx-2" />
          <select
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer hover:bg-white/10 transition-colors"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            {Object.entries(LANG_INFO).map(([v, { label }]) => (
              <option key={v} value={v} className="bg-[var(--bg)]">{label}</option>
            ))}
          </select>
          {!showSolution ? (
            <button onClick={handleRevealSolution} className="text-[10px] font-black uppercase tracking-widest text-[var(--text-dim)] hover:text-[var(--yellow)] px-2 transition-colors">
              Solution
            </button>
          ) : (
            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--green)] flex items-center gap-1.5">
              <CheckCircle2 size={12} /> Master Solved
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsFocusMode(!isFocusMode)} className="p-2 text-[var(--text-dim)] hover:text-white transition-colors glass border-white/5 rounded-xl">
            {isFocusMode ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className={`btn px-6 py-2.5 text-xs flex items-center gap-2 font-black rounded-xl transition-all shadow-lg ${isRunning ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'btn-primary'}`}
          >
            {isRunning ? <SquareSquare size={14} className="animate-pulse" /> : <Play size={14} className="fill-current" />}
            {isRunning ? 'Arrêter' : 'Compiler & Run'}
          </button>
        </div>
      </div>

      {/* Language Tip */}
      {langInfo && (
        <div className="px-6 py-2 bg-[var(--blue)]/5 border-b border-white/5 flex items-center gap-3">
          <Info size={14} className="text-[var(--blue)]" />
          <span className="text-[10px] font-black uppercase tracking-widest text-[var(--blue)]/80">Pro Tip :</span>
          <span className="text-[10px] font-medium opacity-80">{langInfo.note}</span>
        </div>
      )}

      {/* Editor Content */}
      <div className="flex-1 min-h-[300px]">
        <CodeEditor
          value={code}
          language={lang === 'js' ? 'javascript' : lang === 'csharp' ? 'csharp' : lang === 'cpp' ? 'cpp' : lang === 'java' ? 'java' : lang === 'c' ? 'c' : 'python'}
          onChange={(val) => {
            const newCode = val || '';
            setCode(newCode);
            localStorage.setItem(`algo-code-${id}-${lang}`, newCode);
          }}
        />
      </div>

      {/* Terminal - High Fidelity */}
      <div className="bg-[#050505] border-t border-white/5 h-[220px] font-mono overflow-hidden flex flex-col">
        <div className="px-6 py-3 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-[var(--green)]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-dim)]">Debug Console</span>
          </div>
          {output.includes('❌') && (
            <button 
              onClick={handleMentorAnalyze}
              disabled={isAnalyzing}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-purple-500/20"
            >
              <Bot size={14} className={isAnalyzing ? "animate-bounce" : ""} />
              {isAnalyzing ? "Analyse..." : "Demander au Mentor IA"}
            </button>
          )}
        </div>
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
          <pre className={`text-sm leading-relaxed ${output.includes('❌') ? 'text-red-400' : 'text-white/80'} whitespace-pre-wrap`}>
            {output || '> Waiting for kernel input...'}
          </pre>

          {mentorHint && (
            <motion.div initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="p-5 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0 shadow-lg">
                <Bot className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-purple-400 mb-1.5">Mentor IA</div>
                <p className="text-sm font-medium text-purple-200/90 leading-relaxed">{mentorHint}</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl relative min-h-[calc(100vh-100px)] flex flex-col">
      <Seo title={`${algo.name} — Expert Coding`} description={algo.description} />

      {/* Background Decorative Blob */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[var(--green)]/5 blur-[120px] -z-10 rounded-full" />

      {!isFocusMode && (
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <Link to="/algorithms" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--text-dim)] hover:text-white transition-colors">
            <ArrowLeft size={16} /> Back to Lab
          </Link>
          
          <div className="flex gap-1 p-1 glass border-white/5 rounded-2xl shadow-xl overflow-x-auto custom-scrollbar no-scrollbar">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all shrink-0 ${
                  activeTab === tab.id ? 'bg-white/10 text-white shadow-lg' : 'text-[var(--text-dim)] hover:text-white'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button className="p-2.5 rounded-xl glass border-white/5 text-[var(--text-dim)] hover:text-white transition-colors">
              <Share2 size={18} />
            </button>
            <button className="p-2.5 rounded-xl glass border-white/5 text-[var(--text-dim)] hover:text-white transition-colors">
              <Trophy size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Content Wrapper */}
      <div className={`flex-1 ${activeTab === 'implementer' ? 'h-full' : ''}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className={`h-full ${activeTab === 'implementer' ? 'flex flex-col' : ''}`}
          >
            {activeTab === 'implementer' ? (
              <div className="flex-1 h-full min-h-[700px] mb-8">
                <PanelGroup direction="horizontal" className="hidden lg:flex h-full border border-white/5 rounded-[40px] overflow-hidden shadow-2xl">
                  <Panel defaultSize={35} minSize={25} className="bg-white/[0.01]">
                    <div className="h-full overflow-y-auto p-10 custom-scrollbar">
                      {TabComprendre}
                    </div>
                  </Panel>
                  <PanelResizeHandle className="w-1.5 flex items-center justify-center cursor-col-resize group bg-white/5">
                    <div className="w-px h-12 bg-white/10 group-hover:bg-[var(--green)]/50 transition-colors" />
                  </PanelResizeHandle>
                  <Panel defaultSize={65} minSize={40}>
                    <div className="h-full p-4">
                      {TabImplementer}
                    </div>
                  </Panel>
                </PanelGroup>

                {/* Mobile/Small Screen Fallback */}
                <div className="lg:hidden space-y-6">
                  <div className="glass rounded-3xl p-6 border-white/5">
                    <details className="group">
                      <summary className="list-none flex items-center justify-between cursor-pointer">
                        <h3 className="text-sm font-black uppercase tracking-widest">Enoncé & Aide</h3>
                        <ChevronDown size={20} className="group-open:rotate-180 transition-transform" />
                      </summary>
                      <div className="mt-8">
                        {TabComprendre}
                      </div>
                    </details>
                  </div>
                  <div className="h-[700px]">
                    {TabImplementer}
                  </div>
                </div>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto w-full pb-20">
                {activeTab === 'comprendre' && TabComprendre}
                {activeTab === 'visualiser' && TabVisualiser}
                {activeTab === 'defis' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {((algo as any).challenges || []).map((c: any, i: number) => (
                      <div key={i} className="p-8 rounded-[32px] glass border-white/5 hover:border-white/20 transition-all group">
                        <div className="flex items-center justify-between mb-6">
                          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-xl shadow-lg">
                            🏆
                          </div>
                          <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                            c.difficulty === 'Débutant' ? 'text-[var(--green)] bg-[var(--green)]/10' :
                            c.difficulty === 'Intermédiaire' ? 'text-yellow-400 bg-yellow-400/10' : 'text-red-400 bg-red-400/10'
                          }`}>
                            {c.difficulty}
                          </span>
                        </div>
                        <h3 className="text-xl font-black mb-3 text-white">Challenge {i + 1} : {c.title}</h3>
                        <p className="text-sm text-[var(--text-dim)] font-medium leading-relaxed mb-8">{c.desc}</p>
                        <button 
                          onClick={() => setActiveTab('implementer')}
                          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--green)] group-hover:gap-4 transition-all"
                        >
                          Relever le défi <ChevronRight size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <PremiumModal 
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Algorithme Validé !"
        subtitle={`Félicitations, votre implémentation du ${algo.name} est fonctionnelle et optimisée.`}
        xpEarned={250}
        badge={{ icon: '🧠', name: 'Esprit Logique', color: '#3498db' }}
        actionLabel="Voir d'autres défis"
        onAction={() => { setShowSuccess(false); setActiveTab('defis'); }}
      />
    </div>
  );
}

