import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { EXERCISES } from '../data/content';
import CodeEditor from '../components/CodeEditor';
import Seo from '../components/Seo';
import ReactMarkdown from 'react-markdown';
import { useStore } from '../store/useStore';
import { useState, useEffect } from 'react';
import { executeCode } from '../utils/piston';
import { Play, Maximize2, Minimize2, CheckCircle2, SquareSquare, ChevronDown, Sparkles, AlertCircle } from 'lucide-react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import toast from 'react-hot-toast';

export default function ExerciseDetail() {
  const { id } = useParams();
  const { addXp, completed, toggleCompleted } = useStore();
  const ex = EXERCISES.find(e => e.id === Number(id));
  const [lang, setLang] = useState<'js' | 'python' | 'c' | 'cpp' | 'csharp' | 'java'>('js');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [testResults, setTestResults] = useState<any[] | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    if (ex) {
      const savedCode = localStorage.getItem(`exo-code-${id}-${lang}`);
      setCode(savedCode || (ex.starter as any)[lang] || (lang === 'js' ? (ex.starter as any).js : (ex.starter as any).python));
      setOutput('');
      setTestResults(null);
      setAiFeedback(null);
    }
  }, [ex, lang, id]);

  if (!ex) return <div className="container mx-auto py-20 text-center">Exercice non trouvé.</div>;

  const testCasesObj = (ex as any).tests || {};
  const currentTests = testCasesObj[lang];

  const getAIFeedback = async (userCode: string, testResults: any[]) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) return;

    setIsAiLoading(true);
    try {
      const prompt = `Tu es l'Expert-Instructeur d'AlgoMaster. Analyse ce code et les résultats des tests.
Exercice: ${ex.title}
Énoncé: ${ex.desc}
Langage: ${lang}
Code de l'utilisateur:
\`\`\`${lang}
${userCode}
\`\`\`
Résultats des tests: ${JSON.stringify(testResults)}

Instructions:
1. Si tous les tests passent, félicite brièvement et suggère une petite optimisation ou une bonne pratique.
2. Si des tests échouent, explique POURQUOI sans donner le code corrigé. Guide l'utilisateur vers la logique correcte.
3. Sois concis, professionnel et mentor. Utilise le Markdown.`;

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) setAiFeedback(text);
    } catch (e) {
      console.error("AI Feedback Error:", e);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Exécution des tests en cours...\n');
    setTestResults(null);
    
    let isTimeout = false;
    const timeoutId = setTimeout(() => {
      isTimeout = true;
      setIsRunning(false);
      setOutput(prev => prev + '\n❌ Timeout: Exécution trop longue (>5s). Boucle infinie ?');
    }, 5000);

    try {
      const codeToRun = code || (ex.starter as any)[lang] || (lang === 'js' ? (ex.starter as any).js : (ex.starter as any).python);
      const fullCode = currentTests ? `${codeToRun}\n\n${currentTests}` : codeToRun;
      
      const result = await executeCode(fullCode, lang);
      if (!isTimeout) {
        clearTimeout(timeoutId);
        
        let outText = result.output || '';
        const testMatch = outText.match(/__TEST_RESULTS__:(\[.*\])/);
        if (testMatch) {
          try {
            const parsed = JSON.parse(testMatch[1]);
            setTestResults(parsed);
            if (parsed.every((r: any) => r.passed)) {
              confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#10b981', '#3b82f6', '#8b5cf6'] });
              if (!completed.includes(ex.id)) {
                addXp(50);
                toggleCompleted(ex.id);
              }
            }
            outText = outText.replace(/__TEST_RESULTS__:\[.*\]\n?/, '');
            
            // Call AI for feedback automatically
            getAIFeedback(codeToRun, parsed);
          } catch(e) {}
        }
        setOutput(outText || 'Exécuté avec succès (aucune sortie console).');
      }
    } catch (err) {
      if (!isTimeout) {
        clearTimeout(timeoutId);
        setOutput(`❌ Erreur système: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
    setIsRunning(false);
  };

  const editorContent = (
    <div className={`card flex flex-col p-0 border-[var(--border)] overflow-hidden ${isFocusMode ? 'fixed inset-0 z-[9999] rounded-none' : 'h-full'}`}>
      <div className="flex items-center justify-between p-4 border-b border-[var(--border)] bg-[var(--bg2)]">
        <select 
          className="bg-[var(--bg3)] border border-[var(--border)] rounded-md px-3 py-1.5 text-xs font-bold outline-none cursor-pointer"
          value={lang}
          onChange={(e) => setLang(e.target.value as any)}
        >
          <option value="js">JavaScript</option>
          <option value="python">Python</option>
          <option value="c">C</option>
          <option value="cpp">C++</option>
          <option value="csharp">C#</option>
          <option value="java">Java</option>
        </select>
        
        <div className="flex gap-3">
          <button 
            onClick={() => setIsFocusMode(!isFocusMode)}
            className="p-1.5 text-[var(--text-dim)] hover:text-white transition-colors"
          >
            {isFocusMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button 
            onClick={handleRun}
            disabled={isRunning}
            className={`btn px-6 py-1.5 text-xs flex items-center gap-2 font-bold transition-all ${isRunning ? 'bg-red-500/20 text-red-400 border-red-500/50' : 'btn-primary'}`}
          >
            {isRunning ? <SquareSquare className="w-3 h-3 animate-pulse" /> : <Play className="w-3 h-3 fill-current" />}
            {isRunning ? 'Évaluation...' : 'Vérifier la solution'}
          </button>
        </div>
      </div>
      
      <div className="flex-1 min-h-[300px]">
        <CodeEditor 
          value={code} 
          language={lang === 'js' ? 'javascript' : 'python'} 
          onChange={(val) => {
            const newCode = val || '';
            setCode(newCode);
            localStorage.setItem(`exo-code-${id}-${lang}`, newCode);
          }}
        />
      </div>

      <div className="bg-[#1e1e1e] border-t border-[var(--border)] h-[250px] overflow-auto flex flex-col">
        <div className="flex items-center gap-2 p-3 border-b border-[var(--border)] sticky top-0 bg-[#1e1e1e] z-10">
          <div className="text-[var(--text-dim)] uppercase text-[10px] tracking-widest font-bold">Résultats d'exécution</div>
          {testResults && testResults.every(r => r.passed) && <span className="bg-indigo-500/20 text-indigo-400 text-[10px] px-2 py-0.5 rounded font-bold">ALL TESTS PASSED</span>}
        </div>
        
        <div className="p-4 flex-1">
          {aiFeedback && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">
                <Sparkles className="w-12 h-12 text-indigo-400" />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                </div>
                <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400">Analyse de l'Expert IA</h4>
              </div>
              <div className="markdown-content text-sm text-indigo-100/90 leading-relaxed">
                <ReactMarkdown>{aiFeedback}</ReactMarkdown>
              </div>
            </motion.div>
          )}

          {isAiLoading && (
            <div className="flex items-center gap-3 p-4 mb-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 animate-pulse">
              <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" />
              <span className="text-xs font-bold text-indigo-400/70 uppercase tracking-widest">L'IA analyse votre code...</span>
            </div>
          )}

          {testResults ? (
            <div className="space-y-3">
              <AnimatePresence>
                {testResults.map((t, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, type: 'spring', stiffness: 100 }}
                    key={i} 
                    className={`p-3 rounded border ${t.passed ? 'bg-indigo-500/5 border-indigo-500/20' : 'bg-red-500/5 border-red-500/20'}`}
                  >
                    <div className="flex items-center gap-2 font-bold text-xs mb-2">
                      {t.passed ? <CheckCircle2 className="w-4 h-4 text-indigo-500" /> : <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-[10px] text-white">×</div>}
                      <span className={t.passed ? 'text-indigo-400' : 'text-red-400'}>Test Case {t.id}</span>
                    </div>
                    <div className="text-xs text-[var(--text-dim)] grid grid-cols-1 gap-1 pl-6">
                      <div><span className="opacity-50">Entrée :</span> <code className="text-[var(--text-bright)]">{t.input}</code></div>
                      <div><span className="opacity-50">Attendu :</span> <code className="text-indigo-400">{t.expected}</code></div>
                      {!t.passed && <div><span className="opacity-50">Reçu :</span> <code className="text-red-400">{t.error ? `Erreur: ${t.error}` : String(t.actual)}</code></div>}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <pre className={output.includes('❌') ? 'text-red-400 text-sm font-mono' : 'text-[var(--text-bright)] text-sm font-mono'}>
              {output || '> Cliquez sur "Vérifier la solution" pour exécuter le code.'}
            </pre>
          )}
        </div>
      </div>
    </div>
  );

  const problemInner = (
    <>
      <h1 className="text-2xl md:text-3xl font-bold mb-4">{ex.title}</h1>
      <span
        className={`badge mb-6 inline-block ${
          ex.level === 'Debutant'
            ? 'bg-indigo-500/10 text-[var(--primary)] border border-[var(--primary)]'
            : ex.level === 'Intermediaire'
              ? 'bg-yellow-500/10 text-[var(--yellow)] border border-[var(--yellow)]'
              : 'bg-red-500/10 text-[var(--red)] border border-[var(--red)]'
        }`}
      >
        {ex.level}
      </span>

      <div className="prose prose-invert mb-8">
        <p className="text-[var(--text-bright)] leading-relaxed font-medium text-sm md:text-base">{ex.desc}</p>
      </div>

      <div className="p-4 bg-[var(--bg3)] rounded-xl border border-[var(--border)] text-sm text-[var(--text-dim)] mb-6">
        <strong className="text-[var(--text-bright)] flex items-center gap-2 mb-2">
          <CheckCircle2 className="w-4 h-4 text-[var(--primary)]" />
          Objectif
        </strong>
        Implémentez une solution efficace. Votre code est exécuté avec des tests injectés pour valider les cas visibles (et la logique
        générale).
      </div>
    </>
  );

  const problemCard = (
    <div className="card h-full lg:max-h-none overflow-y-auto p-6 md:p-8" style={{ scrollbarWidth: 'thin' }}>
      {problemInner}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 flex flex-col min-h-[calc(100dvh-5rem)] lg:h-[calc(100vh-5rem)] lg:min-h-0">
      <Seo title={ex.title} description={ex.desc} />

      {!isFocusMode && (
        <Link
          to="/exercises"
          className="text-[var(--text-dim)] hover:text-[var(--primary)] mb-4 inline-flex items-center gap-2 transition-colors text-sm shrink-0"
        >
          ← Retour aux exercices
        </Link>
      )}

      <details className="lg:hidden card mb-4 overflow-hidden group shrink-0" open>
        <summary className="cursor-pointer list-none flex items-center justify-between gap-2 p-4 font-bold text-[var(--text-bright)]">
          <span>Énoncé & consignes</span>
          <ChevronDown className="w-5 h-5 text-[var(--text-dim)] group-open:rotate-180 transition-transform" />
        </summary>
        <div className="px-4 pb-4 pt-2 border-t border-[var(--border)] max-h-[40vh] overflow-y-auto">{problemInner}</div>
      </details>

      <div className="flex-1 flex flex-col min-h-0 pb-4">
        <PanelGroup direction="horizontal" className="hidden lg:flex flex-1 min-h-0 h-full">
          <Panel defaultSize={30} minSize={20} className="pr-4 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
            {problemCard}
          </Panel>

          <PanelResizeHandle className="w-2 flex items-center justify-center cursor-col-resize group">
            <div className="w-1 h-8 rounded-full bg-[var(--border)] group-hover:bg-[var(--primary)] transition-colors" />
          </PanelResizeHandle>

          <Panel defaultSize={70} minSize={50} className="pl-4 min-h-0">
            <div className="h-full min-h-[420px]">{editorContent}</div>
          </Panel>
        </PanelGroup>

        <div className="lg:hidden flex-1 min-h-[min(70dvh,560px)]">{editorContent}</div>
      </div>
    </div>
  );
}
