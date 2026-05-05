import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ALGORITHMS } from '../data/content';
import CodeEditor from '../components/CodeEditor';
import Seo from '../components/Seo';
import { useState } from 'react';
import { executeCode } from '../utils/piston';

export default function AlgorithmDetail() {
  const { id } = useParams();
  const algo = ALGORITHMS.find(a => a.id === id);
  const [lang, setLang] = useState('js');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  if (!algo) return <div className="container mx-auto py-20">Algorithme non trouvé.</div>;

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Exécution en cours...');
    try {
      const currentCode = code || (lang === 'js' ? algo.js : algo.python);
      const result = await executeCode(currentCode, lang);
      setOutput(result.output || 'Code exécuté avec succès (pas de sortie).');
    } catch (err) {
      setOutput(`Erreur: ${err instanceof Error ? err.message : String(err)}`);
    }
    setIsRunning(false);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Seo title={algo.name} description={algo.description} />
      
      <Link to="/algorithms" className="text-[var(--text-dim)] hover:text-[var(--green)] mb-6 inline-flex items-center gap-2 transition-colors">
        ← Retour aux algorithmes
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COL: Description & Steps */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="card h-full">
            <h1 className="text-3xl font-bold mb-4 text-[var(--green)]">{algo.name}</h1>
            <div className="flex gap-3 mb-6">
              <span className="badge bg-green-500/10 text-[var(--green)]">{algo.difficulty}</span>
              <span className="badge bg-blue-500/10 text-[var(--blue)]">{algo.timeO}</span>
            </div>
            
            <p className="text-[var(--text-dim)] mb-8 leading-relaxed">
              {algo.description}
            </p>

            <h3 className="font-bold mb-4 uppercase text-xs tracking-widest text-[var(--text-bright)]">Étapes de fonctionnement</h3>
            <ul className="space-y-4">
              {algo.steps.map((step, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <span className="w-6 h-6 rounded-full bg-[var(--bg3)] border border-[var(--border)] flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-sm text-[var(--text)]">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* RIGHT COL: Monaco Editor */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <div className="card h-full flex flex-col p-0">
            <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
              <div className="flex gap-2">
                <button 
                  onClick={() => setLang('js')}
                  className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${lang === 'js' ? 'bg-[var(--green)] text-black' : 'bg-[var(--bg3)] text-[var(--text-dim)]'}`}
                >
                  JavaScript
                </button>
                <button 
                  onClick={() => { setLang('python'); setCode(''); }}
                  className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${lang === 'python' ? 'bg-[var(--green)] text-black' : 'bg-[var(--bg3)] text-[var(--text-dim)]'}`}
                >
                  Python
                </button>
              </div>
              <button 
                onClick={handleRun}
                disabled={isRunning}
                className="btn btn-primary px-4 py-1.5 text-xs"
              >
                {isRunning ? '...' : 'Exécuter'}
              </button>
            </div>
            
            <div className="flex-1">
              <CodeEditor 
                value={lang === 'js' ? algo.js : algo.python} 
                language={lang === 'js' ? 'javascript' : 'python'} 
                onChange={(val) => setCode(val || '')}
              />
            </div>

            {/* Terminal Output */}
            <div className="bg-[#1e1e1e] border-t border-[var(--border)] p-4 min-h-[120px] font-mono text-sm">
              <div className="text-[var(--text-dim)] mb-2 uppercase text-[10px] tracking-widest font-bold">Sortie de la console</div>
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
