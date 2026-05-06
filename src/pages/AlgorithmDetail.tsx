import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ALGORITHMS } from '../data/content';
import CodeEditor from '../components/CodeEditor';
import AlgorithmVisualizer from '../components/AlgorithmVisualizer';
import Seo from '../components/Seo';
import { useState, useEffect } from 'react';
import { executeCode } from '../utils/piston';
import {
  Play, Maximize2, Minimize2, Lightbulb, SquareSquare, ChevronDown,
  CheckCircle2, BookOpen, Eye, Code2, Zap, Target, Clock, Database,
  ArrowLeft, Info
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

const PREREQUISITES: Record<string, string[]> = {
  'bubble-sort':    ['Tableaux', 'Boucles imbriquées'],
  'quick-sort':     ['Récursivité', 'Partitionnement', 'Bubble Sort'],
  'merge-sort':     ['Récursivité', 'Fusion de tableaux'],
  'binary-search':  ['Tableaux triés', 'Pointeurs/indices'],
  'bfs':            ['Graphes', 'Files (Queue)', 'Sets'],
  'fibonacci-dp':   ['Récursivité', 'Mémoïsation', 'Programmation Dynamique'],
  'kadane':         ['Tableaux', 'Boucle simple', 'Variables d\'état'],
};

export default function AlgorithmDetail() {
  const { id } = useParams();
  const algo = ALGORITHMS.find(a => a.id === id);
  const [activeTab, setActiveTab] = useState<Tab>('comprendre');
  const [lang, setLang] = useState('js');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);

  useEffect(() => {
    if (algo) {
      const savedCode = localStorage.getItem(`algo-code-${id}-${lang}`);
      setCode(savedCode || (algo.starter as any)[lang] || algo.starter.js);
      setShowSolution(false);
      setHintLevel(0);
      setOutput('');
    }
  }, [algo, lang, id]);

  if (!algo) return (
    <div className="container mx-auto py-20 text-center text-[var(--text-dim)]">
      Algorithme non trouvé. <Link to="/algorithms" className="text-[var(--green)]">Retour</Link>
    </div>
  );

  const hasVisualizer = ['bubble-sort', 'quick-sort', 'binary-search'].includes(algo.id);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Exécution en cours...\n');
    let isTimeout = false;
    const timeoutId = setTimeout(() => {
      isTimeout = true;
      setIsRunning(false);
      setOutput(prev => prev + '\n❌ Timeout > 5s. Boucle infinie ?');
    }, 5000);
    try {
      const currentCode = code || (algo.starter as any)[lang] || algo.starter.js;
      const result = await executeCode(currentCode, lang);
      if (!isTimeout) {
        clearTimeout(timeoutId);
        setOutput(result.output || 'Code exécuté avec succès (pas de sortie).');
      }
    } catch (err) {
      if (!isTimeout) {
        clearTimeout(timeoutId);
        setOutput(`❌ Erreur: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
    setIsRunning(false);
  };

  const handleRevealSolution = () => {
    if (confirm('Voir la solution ? Essayez d\'abord par vous-même !')) {
      setShowSolution(true);
      setCode((algo as any)[lang] || algo.js);
    }
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'comprendre', label: 'Comprendre', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'visualiser', label: 'Visualiser', icon: <Eye className="w-3.5 h-3.5" /> },
    { id: 'implementer', label: 'Implémenter', icon: <Code2 className="w-3.5 h-3.5" /> },
    { id: 'defis', label: 'Défis', icon: <Zap className="w-3.5 h-3.5" /> },
  ];

  const useCases = USE_CASES[algo.id] || [];
  const prereqs = PREREQUISITES[algo.id] || [];
  const langInfo = LANG_INFO[lang];

  // ===== TAB: COMPRENDRE =====
  const TabComprendre = (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-black mb-3 text-[var(--text-bright)]">{algo.name}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="badge bg-green-500/10 text-[var(--green)] border border-green-500/20">{algo.difficulty}</span>
          <span className="badge bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1">
            <Clock className="w-3 h-3" /> {algo.timeO}
          </span>
          <span className="badge bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center gap-1">
            <Database className="w-3 h-3" /> {algo.spaceO}
          </span>
        </div>
        <p className="text-[var(--text)] leading-relaxed">{algo.description}</p>
      </div>

      {/* Prerequisites */}
      {prereqs.length > 0 && (
        <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
          <h3 className="text-xs font-black uppercase tracking-widest text-blue-400 mb-2 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" /> Prérequis
          </h3>
          <div className="flex flex-wrap gap-2">
            {prereqs.map(p => (
              <span key={p} className="text-xs px-2.5 py-1 bg-blue-500/10 text-blue-300 rounded-full border border-blue-500/20 font-medium">{p}</span>
            ))}
          </div>
        </div>
      )}

      {/* Complexity Table */}
      <div className="p-4 bg-[var(--bg3)] rounded-xl border border-[var(--border)]">
        <h3 className="font-black mb-3 uppercase text-[10px] tracking-widest text-[var(--text-dim)]">Analyse de Complexité</h3>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="p-3 bg-[var(--bg)] rounded-lg border border-[var(--border)] text-center">
            <div className="text-lg font-black text-[var(--green)]">{algo.timeO}</div>
            <div className="text-[10px] text-[var(--text-dim)] uppercase tracking-wider">Temps</div>
          </div>
          <div className="p-3 bg-[var(--bg)] rounded-lg border border-[var(--border)] text-center">
            <div className="text-lg font-black text-purple-400">{algo.spaceO}</div>
            <div className="text-[10px] text-[var(--text-dim)] uppercase tracking-wider">Espace</div>
          </div>
        </div>
        <p className="text-sm text-[var(--text-bright)] leading-relaxed">{algo.complexityDesc}</p>
      </div>

      {/* Steps */}
      <div>
        <h3 className="font-black mb-4 uppercase text-[10px] tracking-widest text-[var(--text-dim)]">Comment ça marche ?</h3>
        <ol className="space-y-3">
          {algo.steps.map((step: string, i: number) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="w-6 h-6 rounded-full bg-[var(--green)]/10 border border-[var(--green)]/30 flex items-center justify-center text-xs font-black shrink-0 text-[var(--green)]">
                {i + 1}
              </span>
              <span className="text-sm text-[var(--text)] leading-relaxed pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Real Use Cases */}
      {useCases.length > 0 && (
        <div className="p-4 bg-[var(--green)]/5 border border-[var(--green)]/20 rounded-xl">
          <h3 className="text-xs font-black uppercase tracking-widest text-[var(--green)] mb-3 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5" /> Cas d'usage réels
          </h3>
          <ul className="space-y-2">
            {useCases.map((uc, i) => (
              <li key={i} className="text-sm text-[var(--text)] flex items-start gap-2">
                <span className="text-[var(--green)] mt-0.5 shrink-0">→</span> {uc}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Hints */}
      {algo.hints && (
        <div>
          <h3 className="font-black mb-4 uppercase text-[10px] tracking-widest text-[var(--text-dim)] flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-[var(--yellow)]" /> Indices progressifs
          </h3>
          <div className="space-y-2">
            {algo.hints.map((hint: string, i: number) => (
              <div key={i}>
                {hintLevel >= i + 1 ? (
                  <div className="p-3 bg-[var(--yellow)]/10 border border-[var(--yellow)]/30 rounded-lg text-sm text-[var(--text-bright)]">
                    <span className="font-bold text-[var(--yellow)] mr-2">💡 Indice {i + 1} :</span> {hint}
                  </div>
                ) : (
                  <button
                    onClick={() => setHintLevel(i + 1)}
                    disabled={hintLevel !== i}
                    className={`w-full p-3 rounded-lg text-sm font-bold text-left transition-all flex items-center justify-between ${
                      hintLevel === i
                        ? 'bg-[var(--bg3)] hover:bg-[var(--bg2)] border border-[var(--border)] text-[var(--text-bright)]'
                        : 'bg-[var(--bg)] border border-[var(--border)] opacity-40 cursor-not-allowed'
                    }`}
                  >
                    <span>Débloquer l&apos;indice {i + 1}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );

  // ===== TAB: VISUALISER =====
  const TabVisualiser = (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      {hasVisualizer ? (
        <>
          <div className="p-3 bg-[var(--bg3)] rounded-lg border border-[var(--border)] text-sm text-[var(--text-dim)]">
            🎬 Utilisez les boutons pour naviguer étape par étape, ou appuyez sur <strong className="text-[var(--text-bright)]">Jouer</strong> pour voir l'animation complète.
          </div>
          <AlgorithmVisualizer algoId={algo.id} />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Eye className="w-12 h-12 text-[var(--text-dim)] mb-4 opacity-40" />
          <p className="text-[var(--text-dim)] text-sm">Visualiseur interactif à venir pour cet algorithme.</p>
          <p className="text-[var(--text-dim)] text-xs mt-2 opacity-60">Pour l'instant, consultez l'onglet "Comprendre" pour voir les étapes détaillées.</p>
        </div>
      )}
    </motion.div>
  );

  // ===== TAB: IMPLEMENTER =====
  const TabImplementer = (
    <div className={`card flex flex-col p-0 border-[var(--border)] overflow-hidden ${isFocusMode ? 'fixed inset-0 z-[9999] rounded-none' : ''}`}>
      {/* Editor Toolbar */}
      <div className="flex items-center justify-between p-3 border-b border-[var(--border)] bg-[var(--bg2)]">
        <div className="flex gap-2 items-center flex-wrap">
          <select
            className="bg-[var(--bg3)] border border-[var(--border)] rounded-md px-2 py-1.5 text-xs font-bold outline-none cursor-pointer"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            {Object.entries(LANG_INFO).map(([v, { label }]) => (
              <option key={v} value={v}>{label}</option>
            ))}
          </select>
          {!showSolution ? (
            <button onClick={handleRevealSolution} className="text-xs text-[var(--text-dim)] hover:text-[var(--yellow)] px-2 transition-colors">
              Voir solution
            </button>
          ) : (
            <span className="text-xs text-[var(--green)] font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Solution affichée
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setIsFocusMode(!isFocusMode)} className="p-1.5 text-[var(--text-dim)] hover:text-white transition-colors" title="Mode plein écran">
            {isFocusMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className={`btn px-4 py-1.5 text-xs flex items-center gap-2 font-bold transition-all ${isRunning ? 'bg-red-500/20 text-red-400 border border-red-500/50' : 'btn-primary'}`}
          >
            {isRunning ? <SquareSquare className="w-3 h-3 animate-pulse" /> : <Play className="w-3 h-3 fill-current" />}
            {isRunning ? 'Stop' : 'Exécuter'}
          </button>
        </div>
      </div>

      {/* Language-specific tip */}
      {langInfo && (
        <div className="px-4 py-2 border-b border-[var(--border)] bg-blue-500/5 text-xs text-blue-300 flex items-start gap-2">
          <Info className="w-3.5 h-3.5 mt-0.5 shrink-0 text-blue-400" />
          <span><strong className="text-blue-400">{langInfo.label} :</strong> {langInfo.note}</span>
        </div>
      )}

      {/* Monaco Editor */}
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

      {/* Terminal */}
      <div className="bg-[#131313] border-t border-[var(--border)] p-4 h-[180px] font-mono text-sm overflow-auto">
        <div className="text-[var(--text-dim)] mb-2 uppercase text-[10px] tracking-widest font-bold">Terminal</div>
        <pre className={output.includes('❌') ? 'text-red-400' : 'text-[var(--text-bright)] whitespace-pre-wrap'}>
          {output || '> En attente... Cliquez sur Exécuter pour tester votre code.'}
        </pre>
      </div>
    </div>
  );

  // ===== TAB: DEFIS =====
  const challenges = (algo as any).challenges || [
    { title: 'Cas de base', desc: 'Implémentez la version simple de l\'algorithme.', difficulty: 'Débutant' },
    { title: 'Edge Cases', desc: 'Gérez les cas limites : tableau vide, un seul élément, doublons.', difficulty: 'Débutant' },
    { title: 'Optimisation', desc: 'Pouvez-vous ajouter un flag d\'arrêt précoce si le tableau est déjà trié ?', difficulty: 'Intermédiaire' },
  ];

  const TabDefis = (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="p-3 bg-[var(--bg3)] rounded-lg border border-[var(--border)] text-sm text-[var(--text)]">
        🎯 Testez votre compréhension avec ces défis progressifs. Revenez à l'onglet <strong className="text-[var(--green)]">Implémenter</strong> pour coder votre solution.
      </div>
      {challenges.map((c: any, i: number) => (
        <div key={i} className="p-4 bg-[var(--bg3)] rounded-xl border border-[var(--border)] hover:border-[var(--green)]/30 transition-colors">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-bold text-[var(--text-bright)]">Défi {i + 1} : {c.title}</h3>
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
              c.difficulty === 'Débutant' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
              c.difficulty === 'Intermédiaire' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
              'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}>{c.difficulty}</span>
          </div>
          <p className="text-sm text-[var(--text-dim)] leading-relaxed">{c.desc}</p>
          <button
            onClick={() => setActiveTab('implementer')}
            className="mt-3 text-xs text-[var(--green)] hover:underline font-bold"
          >
            → Aller coder
          </button>
        </div>
      ))}
    </motion.div>
  );

  const tabContent: Record<Tab, React.ReactNode> = {
    comprendre: TabComprendre,
    visualiser: TabVisualiser,
    implementer: TabImplementer,
    defis: TabDefis,
  };

  return (
    <div className="container mx-auto px-4 py-6 flex flex-col min-h-[calc(100dvh-5rem)]">
      <Seo title={algo.name} description={algo.description} />

      {!isFocusMode && (
        <Link
          to="/algorithms"
          className="text-[var(--text-dim)] hover:text-[var(--green)] mb-5 inline-flex items-center gap-2 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Retour aux algorithmes
        </Link>
      )}

      {/* Tab Navigation */}
      {!isFocusMode && (
        <div className="flex gap-1 mb-6 p-1 bg-[var(--bg2)] rounded-xl border border-[var(--border)] w-fit">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-[var(--green)] text-black shadow-lg shadow-green-500/20'
                  : 'text-[var(--text-dim)] hover:text-[var(--text-bright)] hover:bg-[var(--bg3)]'
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Tab Content */}
      <div className={`flex-1 ${activeTab === 'implementer' ? 'flex flex-col min-h-[600px]' : ''}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className={activeTab === 'implementer' ? 'h-full flex flex-col' : ''}
          >
            {activeTab === 'implementer' ? (
              <div className="flex-1 h-full">
                <PanelGroup direction="horizontal" className="hidden lg:flex flex-1 min-h-0 h-full" style={{ minHeight: '600px' }}>
                  <Panel defaultSize={35} minSize={25} className="pr-4 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
                    <div className="card h-full overflow-y-auto p-6" style={{ scrollbarWidth: 'thin' }}>
                      {TabComprendre}
                    </div>
                  </Panel>
                  <PanelResizeHandle className="w-2 flex items-center justify-center cursor-col-resize group">
                    <div className="w-1 h-8 rounded-full bg-[var(--border)] group-hover:bg-[var(--green)] transition-colors" />
                  </PanelResizeHandle>
                  <Panel defaultSize={65} minSize={40}>
                    <div className="h-full min-h-[420px]">{TabImplementer}</div>
                  </Panel>
                </PanelGroup>
                <div className="lg:hidden flex flex-col gap-4">
                  <details className="card overflow-hidden group">
                    <summary className="cursor-pointer list-none flex items-center justify-between gap-2 p-4 font-bold text-[var(--text-bright)]">
                      <span>Cours & Indices</span>
                      <ChevronDown className="w-5 h-5 text-[var(--text-dim)] group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="px-4 pb-4 pt-2 border-t border-[var(--border)] max-h-[45vh] overflow-y-auto">
                      {TabComprendre}
                    </div>
                  </details>
                  <div className="min-h-[500px]">{TabImplementer}</div>
                </div>
              </div>
            ) : (
              <div className="card p-6 md:p-8 max-w-3xl">
                {tabContent[activeTab]}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
