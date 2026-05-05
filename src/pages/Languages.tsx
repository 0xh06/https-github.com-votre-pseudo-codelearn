import { motion } from 'framer-motion';
import { Code2, Terminal, Globe, Cpu, ChevronRight, Zap, Database, Layout } from 'lucide-react';
import Seo from '../components/Seo';

const LANGUAGES = [
  {
    id: 'js',
    name: 'JavaScript',
    icon: <Globe className="w-8 h-8 text-yellow-400" />,
    color: 'yellow',
    tagline: 'Le langage du Web',
    desc: 'Indispensable pour le développement Front-end et de plus en plus utilisé en Back-end (Node.js).',
    pros: ['Universel (Naviguateur)', 'Écosystème géant (NPM)', 'Asynchrone par nature'],
    usages: ['Web Apps', 'Mobile (React Native)', 'Serveurs'],
    code: `function hello() {\n  console.log("Hello World");\n}`
  },
  {
    id: 'python',
    name: 'Python',
    icon: <Terminal className="w-8 h-8 text-blue-400" />,
    color: 'blue',
    tagline: 'La puissance de la simplicité',
    desc: 'Réputé pour sa syntaxe claire et proche de l\'anglais. Le roi de l\'IA et de la Data Science.',
    pros: ['Lecture facile', 'Bibliothèques IA (PyTorch)', 'Multi-usage'],
    usages: ['Intelligence Artificielle', 'Data Science', 'Automatisation'],
    code: `def hello():\n    print("Hello World")`
  }
];

export default function Languages() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-6xl">
      <Seo title="Guide des Langages" description="Découvrez et comparez les meilleurs langages de programmation." />

      <div className="text-center mb-20">
        <h1 className="text-5xl font-bold mb-6">Quel langage choisir ?</h1>
        <p className="text-[var(--text-dim)] text-xl max-w-2xl mx-auto">
          Comprendre les forces de chaque langage est la première étape pour devenir un ingénieur complet.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
        {LANGUAGES.map((lang, i) => (
          <motion.div
            key={lang.id}
            initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card p-10 border-t-8 border-t-[var(--border)] hover:border-t-current transition-all"
            style={{ color: lang.id === 'js' ? '#facc15' : '#60a5fa' }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-[var(--bg3)] rounded-2xl">
                {lang.icon}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-[var(--text-bright)]">{lang.name}</h2>
                <span className="text-sm font-medium opacity-70 italic">{lang.tagline}</span>
              </div>
            </div>

            <p className="text-[var(--text-dim)] mb-8 leading-relaxed">
              {lang.desc}
            </p>

            <div className="grid grid-cols-2 gap-8 mb-10">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--text-bright)] mb-4 flex items-center gap-2">
                  <Zap className="w-3 h-3 text-[var(--green)]" /> Atouts
                </h4>
                <ul className="space-y-3">
                  {lang.pros.map(pro => (
                    <li key={pro} className="text-sm text-[var(--text-dim)] flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-[var(--green)]" /> {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--text-bright)] mb-4 flex items-center gap-2">
                  <Database className="w-3 h-3 text-[var(--blue)]" /> Domaines
                </h4>
                <ul className="space-y-3">
                  {lang.usages.map(usage => (
                    <li key={usage} className="text-sm text-[var(--text-dim)] flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-[var(--blue)]" /> {usage}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-[#1e1e1e] rounded-xl p-4 font-mono text-xs text-white/80">
              <div className="text-[10px] text-white/30 mb-2 uppercase font-bold tracking-widest">Exemple de syntaxe</div>
              <pre>{lang.code}</pre>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Comparison Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="card p-0 overflow-hidden"
      >
        <div className="p-8 border-b border-[var(--border)] bg-[var(--bg3)]">
          <h3 className="text-2xl font-bold">Tableau Comparatif</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--bg3)] text-[var(--text-dim)] text-xs uppercase tracking-widest">
                <th className="p-6">Caractéristique</th>
                <th className="p-6">JavaScript</th>
                <th className="p-6">Python</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {[
                { feature: 'Vitesse d\'exécution', js: 'Très rapide (V8 Engine)', py: 'Modérée (Interprété)' },
                { feature: 'Facilité d\'apprentissage', js: 'Moyenne', py: 'Élevée (Débutants)' },
                { feature: 'Typage', js: 'Dynamique (Faible)', py: 'Dynamique (Fort)' },
                { feature: 'Popularité (Marché)', js: 'N°1 (Web)', py: 'N°1 (IA/Data)' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-[var(--bg3)]/50 transition-colors">
                  <td className="p-6 text-sm font-bold text-[var(--text-bright)]">{row.feature}</td>
                  <td className="p-6 text-sm text-[var(--text-dim)]">{row.js}</td>
                  <td className="p-6 text-sm text-[var(--text-dim)]">{row.py}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
