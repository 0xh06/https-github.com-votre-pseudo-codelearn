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
  },
  {
    id: 'java',
    name: 'Java',
    icon: <Cpu className="w-8 h-8 text-red-400" />,
    color: 'red',
    tagline: 'Écrire une fois, exécuter partout',
    desc: 'Robuste, orienté objet et utilisé par les plus grandes entreprises pour leurs systèmes critiques.',
    pros: ['Performance stable', 'Sécurité forte', 'Énorme marché entreprise'],
    usages: ['Apps Android', 'Systèmes Bancaires', 'Big Data'],
    code: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello");\n  }\n}`
  },
  {
    id: 'cpp',
    name: 'C++',
    icon: <Code2 className="w-8 h-8 text-indigo-400" />,
    color: 'indigo',
    tagline: 'Performance brute et contrôle',
    desc: 'Le choix ultime quand chaque milliseconde compte. Offre un contrôle total sur le matériel.',
    pros: ['Vitesse extrême', 'Gestion mémoire fine', 'Standard industriel'],
    usages: ['Jeux Vidéo (Unreal Engine)', 'Systèmes Embarqués', 'Moteurs de calcul'],
    code: `#include <iostream>\nint main() {\n  std::cout << "Hello";\n  return 0;\n}`
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
                <th className="p-6">Java</th>
                <th className="p-6">C++</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {[
                { feature: 'Vitesse', js: '🚀 Très Rapide', py: '🐢 Modérée', java: '⚡ Rapide', cpp: '🔥 Extrême' },
                { feature: 'Apprentissage', js: 'Moyenne', py: 'Facile', java: 'Difficile', cpp: 'Très Difficile' },
                { feature: 'Usage principal', js: 'Web / Fullstack', py: 'IA / Data', java: 'Entreprise / Android', cpp: 'Jeux / Systèmes' },
                { feature: 'Gestion Mémoire', js: 'Automatique', py: 'Automatique', java: 'Automatique', cpp: 'Manuelle (Pointeurs)' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-[var(--bg3)]/50 transition-colors text-[10px] md:text-sm">
                  <td className="p-6 font-bold text-[var(--text-bright)]">{row.feature}</td>
                  <td className="p-6 text-[var(--text-dim)]">{row.js}</td>
                  <td className="p-6 text-[var(--text-dim)]">{row.py}</td>
                  <td className="p-6 text-[var(--text-dim)]">{row.java}</td>
                  <td className="p-6 text-[var(--text-dim)]">{row.cpp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
