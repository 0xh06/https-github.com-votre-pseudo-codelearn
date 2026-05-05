import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EXERCISES } from '../data/content';
import CodeEditor from '../components/CodeEditor';
import Seo from '../components/Seo';
import { useState } from 'react';
import { executeCode } from '../utils/piston';

export default function ExerciseDetail() {
  const { id } = useParams();
  const ex = EXERCISES.find(e => e.id === Number(id));
  const [lang, setLang] = useState('javascript');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  if (!ex) return <div className="container mx-auto py-20">Exercice non trouvé.</div>;

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Exécution en cours...');
    try {
      const result = await executeCode(code || '// Ecrivez votre solution ici', lang);
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

            <div className="p-4 bg-[var(--bg3)] rounded-lg border border-[var(--border)] text-sm text-[var(--text-dim)]">
              <strong>Objectif :</strong> Implémenter une solution efficace et vérifier qu'elle passe les cas de tests de base.
            </div>
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
                onChange={(e) => setLang(e.target.value)}
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
              </select>
              <button 
                onClick={handleRun}
                disabled={isRunning}
                className="btn btn-primary px-6 py-1.5 text-xs"
              >
                {isRunning ? '...' : 'Vérifier'}
              </button>
            </div>
            
            <div className="flex-1">
              <CodeEditor 
                value={code || (lang === 'javascript' ? '// Votre code JS ici' : '# Votre code Python ici')} 
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
