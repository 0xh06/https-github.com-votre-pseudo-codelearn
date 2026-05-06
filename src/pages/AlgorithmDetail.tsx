import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ALGORITHMS } from '../data/content';
import CodeEditor from '../components/CodeEditor';
import Seo from '../components/Seo';
import { useState, useEffect } from 'react';
import { executeCode } from '../utils/piston';
import { Play, Maximize2, Minimize2, Lightbulb, SquareSquare, ChevronDown, CheckCircle2 } from 'lucide-react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

export default function AlgorithmDetail() {
  const { id } = useParams();
  const algo = ALGORITHMS.find(a => a.id === id);
  const [lang, setLang] = useState('js');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);

  useEffect(() => {
    // Reset state when changing algorithm or language
    if (algo) {
      const savedCode = localStorage.getItem(`algo-code-${id}-${lang}`);
      setCode(savedCode || (algo.starter as any)[lang] || (lang === 'js' ? algo.starter.js : algo.starter.python));
      setShowSolution(false);
      setHintLevel(0);
      setOutput('');
    }
  }, [algo, lang]);

  if (!algo) return <div className="container mx-auto py-20 text-center">Algorithme non trouvé.</div>;

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Exécution en cours...\n');
    
    // Set a client-side timeout of 5 seconds to prevent infinite loop locking the UI completely
    let isTimeout = false;
    const timeoutId = setTimeout(() => {
      isTimeout = true;
      setIsRunning(false);
      setOutput(prev => prev + '\n❌ Erreur: Temps d\'exécution dépassé (Timeout > 5s). Avez-vous une boucle infinie ?');
    }, 5000);

    try {
      const currentCode = code || (algo.starter as any)[lang] || (lang === 'js' ? algo.starter.js : algo.starter.python);
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
    if (confirm('Êtes-vous sûr de vouloir voir la solution complète ? Essayez de coder par vous-même d\'abord !')) {
      setShowSolution(true);
      setCode((algo as any)[lang] || (lang === 'js' ? algo.js : algo.python));
    }
  };

  const editorContent = (
    <div className={`card flex flex-col p-0 border-[var(--border)] overflow-hidden ${isFocusMode ? 'fixed inset-0 z-[9999] rounded-none' : 'h-full'}`}>
      <div className="flex items-center justify-between p-4 border-b border-[var(--border)] bg-[var(--bg2)]">
        <div className="flex gap-2 items-center">
          <select 
            className="bg-[var(--bg3)] border border-[var(--border)] rounded-md px-3 py-1.5 text-xs font-bold outline-none cursor-pointer"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            <option value="js">JavaScript</option>
            <option value="python">Python</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="csharp">C#</option>
            <option value="java">Java</option>
          </select>
          
          {!showSolution ? (
            <button onClick={handleRevealSolution} className="text-xs text-[var(--text-dim)] hover:text-[var(--yellow)] px-2 transition-colors">
              Révéler la solution
            </button>
          ) : (
            <span className="text-xs text-[var(--green)] font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Solution affichée
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsFocusMode(!isFocusMode)}
            className="p-1.5 text-[var(--text-dim)] hover:text-white transition-colors"
            title="Focus Mode"
          >
            {isFocusMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button 
            onClick={handleRun}
            disabled={isRunning}
            className={`btn px-5 py-1.5 text-xs flex items-center gap-2 font-bold transition-all ${isRunning ? 'bg-red-500/20 text-red-400 border-red-500/50' : 'btn-primary'}`}
          >
            {isRunning ? <SquareSquare className="w-3 h-3 animate-pulse" /> : <Play className="w-3 h-3 fill-current" />}
            {isRunning ? 'Arrêter' : 'Exécuter'}
          </button>
        </div>
      </div>
      
      {/* Visualizer (Simple mock for Sorting) */}
      {algo.category === 'Tri' && (
        <div className="relative h-16 border-b border-[var(--border)] bg-[#1e1e1e] flex items-end justify-center gap-1 p-2">
          {[40, 70, 20, 90, 50, 30, 80, 10, 60].map((h, i) => (
            <motion.div
              key={i}
              className="w-4 sm:w-6 bg-[var(--green)] rounded-t-sm opacity-80 max-w-[10%]"
              animate={{ height: `${h}%` }}
              transition={{ type: 'spring' }}
            />
          ))}
          <span className="absolute right-2 top-1 text-[9px] text-[var(--text-dim)]">Démo</span>
        </div>
      )}
      
      <div className="flex-1 min-h-[300px]">
        <CodeEditor 
          value={code} 
          language={lang === 'js' ? 'javascript' : 'python'} 
          onChange={(val) => {
            const newCode = val || '';
            setCode(newCode);
            localStorage.setItem(`algo-code-${id}-${lang}`, newCode);
          }}
        />
      </div>

      {/* Terminal Output */}
      <div className="bg-[#1e1e1e] border-t border-[var(--border)] p-4 h-[200px] font-mono text-sm overflow-auto">
        <div className="text-[var(--text-dim)] mb-2 uppercase text-[10px] tracking-widest font-bold">Terminal</div>
        <pre className={output.includes('❌') ? 'text-red-400' : 'text-[var(--text-bright)]'}>
          {output || '> En attente d\'exécution... Cliquez sur Exécuter pour tester votre code.'}
        </pre>
      </div>
    </div>
  );

  const theoryInner = (
    <>
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--green)]">{algo.name}</h1>
      <div className="flex flex-wrap gap-3 mb-6">
        <span className="badge bg-green-500/10 text-[var(--green)]">{algo.difficulty}</span>
        <span className="badge bg-blue-500/10 text-[var(--blue)]">{algo.timeO}</span>
        <span className="badge bg-purple-500/10 text-[var(--purple)]">{algo.spaceO} espace</span>
      </div>

      <p className="text-[var(--text-bright)] mb-6 leading-relaxed font-medium text-sm md:text-base">{algo.description}</p>

      <div className="mb-8 p-4 bg-[var(--bg3)] rounded-xl border border-[var(--border)]">
        <h3 className="font-bold mb-2 uppercase text-xs tracking-widest text-[var(--text-dim)]">Analyse de complexité</h3>
        <p className="text-sm text-[var(--text-bright)] leading-relaxed">{algo.complexityDesc}</p>
      </div>

      <h3 className="font-bold mb-4 uppercase text-xs tracking-widest text-[var(--text-dim)]">Étapes</h3>
      <ul className="space-y-4 mb-8">
        {algo.steps.map((step, i) => (
          <li key={i} className="flex gap-4 items-start">
            <span className="w-6 h-6 rounded-full bg-[var(--bg3)] border border-[var(--border)] flex items-center justify-center text-xs font-bold shrink-0 text-[var(--green)]">
              {i + 1}
            </span>
            <span className="text-sm text-[var(--text)]">{step}</span>
          </li>
        ))}
      </ul>

      {algo.hints && (
        <div>
          <h3 className="font-bold mb-4 uppercase text-xs tracking-widest text-[var(--text-dim)] flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-[var(--yellow)]" /> Indices
          </h3>
          <div className="space-y-2">
            {algo.hints.map((hint, i) => (
              <div key={i}>
                {hintLevel >= i + 1 ? (
                  <div className="p-3 bg-[var(--yellow)]/10 border border-[var(--yellow)]/30 rounded-lg text-sm text-[var(--text-bright)]">
                    <span className="font-bold text-[var(--yellow)] mr-2">Indice {i + 1} :</span> {hint}
                  </div>
                ) : (
                  <button
                    type="button"
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
    </>
  );

  const theoryCard = (
    <div className="card h-full overflow-y-auto p-6 md:p-8" style={{ scrollbarWidth: 'thin' }}>
      {theoryInner}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 flex flex-col min-h-[calc(100dvh-5rem)] lg:h-[calc(100vh-5rem)] lg:min-h-0">
      <Seo title={algo.name} description={algo.description} />

      {!isFocusMode && (
        <Link
          to="/algorithms"
          className="text-[var(--text-dim)] hover:text-[var(--green)] mb-4 inline-flex items-center gap-2 transition-colors text-sm shrink-0"
        >
          ← Retour aux algorithmes
        </Link>
      )}

      <details className="lg:hidden card mb-4 overflow-hidden group shrink-0" open>
        <summary className="cursor-pointer list-none flex items-center justify-between gap-2 p-4 font-bold text-[var(--text-bright)]">
          <span>Cours & indices</span>
          <ChevronDown className="w-5 h-5 text-[var(--text-dim)] group-open:rotate-180 transition-transform" />
        </summary>
        <div className="px-4 pb-4 pt-2 border-t border-[var(--border)] max-h-[45vh] overflow-y-auto">{theoryInner}</div>
      </details>

      <div className="flex-1 flex flex-col min-h-0 pb-4">
        <PanelGroup direction="horizontal" className="hidden lg:flex flex-1 min-h-0 h-full">
          <Panel defaultSize={35} minSize={25} className="pr-4 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
            {theoryCard}
          </Panel>

          <PanelResizeHandle className="w-2 flex items-center justify-center cursor-col-resize group">
            <div className="w-1 h-8 rounded-full bg-[var(--border)] group-hover:bg-[var(--green)] transition-colors" />
          </PanelResizeHandle>

          <Panel defaultSize={65} minSize={40} className="pl-4 min-h-0">
            <div className="h-full min-h-[420px]">{editorContent}</div>
          </Panel>
        </PanelGroup>

        <div className="lg:hidden flex-1 min-h-[min(70dvh,560px)]">{editorContent}</div>
      </div>
    </div>
  );
}
