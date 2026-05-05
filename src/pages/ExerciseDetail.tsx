import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EXERCISES } from '../data/content';
import CodeEditor from '../components/CodeEditor';
import Seo from '../components/Seo';
import { useState } from 'react';
import { executeCode } from '../utils/piston';
import { Play, Lightbulb, Eye, EyeOff } from 'lucide-react';

export default function ExerciseDetail() {
  const { id } = useParams();
  const ex = EXERCISES.find(e => e.id === Number(id));
  const [lang, setLang] = useState('javascript');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showTests, setShowTests] = useState(false);

  if (!ex) return <div className="container mx-auto py-20">Exercice non trouvé.</div>;

  const starterCode = lang === 'javascript' ? (ex as any).starter?.js : (ex as any).starter?.python;
  const testCases = (ex as any).tests || '';

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Exécution en cours...');
    try {
      const codeToRun = code || starterCode || '// Écrivez votre solution';
      // Append test cases if running JS
      const fullCode = lang === 'javascript' ? `${codeToRun}\n\n// --- Tests ---\n${testCases}` : codeToRun;
      const result = await executeCode(fullCode, lang === 'javascript' ? 'js' : lang);
      setOutput(result.output || 'Exécuté (pas de sortie).');
    } catch (err) {
      setOutput(`Erreur: ${err instanceof Error ? err.message : String(err)}`);
    }
    setIsRunning(false);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Seo title={ex.title} description={ex.desc} />
      
      <Link to="/exercises" className="text-[var(--text-dim)] hover:text-[var(--green)] mb-6 inline-flex items-center gap-2 transition-colors">
        ← Retour aux exercices
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="card h-full">
            <h1 className="text-3xl font-bold mb-4">{ex.title}</h1>
            <span className={`badge mb-6 inline-block ${
              ex.level === 'Debutant' ? 'bg-green-500/10 text-[var(--green)]' : 
              ex.level === 'Intermediaire' ? 'bg-yellow-500/10 text-[var(--yellow)]' : 
              'bg-red-500/10 text-[var(--red)]'
            }`}>
              {ex.level}
            </span>
            
            <p className="text-[var(--text-bright)] mb-8 leading-relaxed font-medium">
              {ex.desc}
            </p>

            <div className="p-4 bg-[var(--bg3)] rounded-lg border border-[var(--border)] text-sm text-[var(--text-dim)] mb-6">
              <strong>Objectif :</strong> Implémenter une solution efficace et vérifier qu'elle passe les cas de tests.
            </div>

            {/* Test Cases Toggle */}
            {testCases && (
              <div>
                <button 
                  onClick={() => setShowTests(!showTests)}
                  className="flex items-center gap-2 text-sm font-bold text-[var(--blue)] hover:underline mb-3"
                >
                  {showTests ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showTests ? 'Masquer les tests' : 'Voir les tests attendus'}
                </button>
                {showTests && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-[#1e1e1e] rounded-lg p-4 font-mono text-xs text-green-400 whitespace-pre-wrap"
                  >
                    {testCases}
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <div className="card h-full flex flex-col p-0 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
              <select 
                className="bg-[var(--bg3)] border border-[var(--border)] rounded px-3 py-1.5 text-xs font-bold outline-none"
                value={lang}
                onChange={(e) => { setLang(e.target.value); setCode(''); }}
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
              </select>
              <button 
                onClick={handleRun}
                disabled={isRunning}
                className="btn btn-primary px-6 py-1.5 text-xs flex items-center gap-2"
              >
                {isRunning ? (
                  <div className="w-3 h-3 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : (
                  <Play className="w-3 h-3 fill-current" />
                )}
                {isRunning ? 'Exécution...' : 'Vérifier'}
              </button>
            </div>
            
            <div className="flex-1">
              <CodeEditor 
                value={code || starterCode || (lang === 'javascript' ? '// Votre code JS ici' : '# Votre code Python ici')} 
                language={lang} 
                onChange={(val) => setCode(val || '')}
              />
            </div>

            <div className="bg-[#1e1e1e] border-t border-[var(--border)] p-4 min-h-[150px] font-mono text-sm overflow-auto">
              <div className="text-[var(--text-dim)] mb-2 uppercase text-[10px] tracking-widest font-bold">Sortie de l'exercice</div>
              <pre className={output.startsWith('Erreur') ? 'text-red-400' : 'text-green-400'}>
                {output || '> En attente d\'exécution...'}
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
