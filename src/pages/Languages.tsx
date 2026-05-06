import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import Seo from '../components/Seo';
import { ChevronRight, Star, Zap, Globe, Cpu, Code2, Terminal, BookOpen, TrendingUp } from 'lucide-react';

const LANGS = [
  {
    id: 'js', name: 'JavaScript', icon: '🟨', color: '#f59e0b',
    tagline: 'Le langage du Web',
    desc: 'Incontournable pour le développement front-end. Avec Node.js, il couvre aussi le back-end. Idéal pour débuter la programmation interactive.',
    pros: ['Universel – tourne dans tous les navigateurs', 'Écosystème NPM géant', 'Asynchrone par nature (Promises, async/await)', 'Communauté immense'],
    cons: ['Typage dynamique (source d\'erreurs)', 'Performances moindres vs C++'],
    domains: ['Web Front-End', 'Back-End (Node.js)', 'Mobile (React Native)', 'Jeux Vidéo (WebGL)'],
    difficulty: 2, popularity: 95, perf: 60,
    typing: 'Dynamique', paradigm: 'Multi-paradigme', compiled: 'Interprété',
    level: 'Débutant', algos: 'js',
    code: `// Algorithme : Binary Search
function binarySearch(arr, target) {
  let l = 0, r = arr.length - 1;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    if (arr[mid] === target) return mid;
    arr[mid] < target ? l = mid + 1 : r = mid - 1;
  }
  return -1;
}`
  },
  {
    id: 'python', name: 'Python', icon: '🐍', color: '#3b82f6',
    tagline: 'La puissance de la simplicité',
    desc: 'Syntaxe proche de l\'anglais, courbe d\'apprentissage douce. Roi absolu de l\'IA, du Machine Learning et de la Data Science.',
    pros: ['Syntaxe lisible et concise', 'Bibliothèques IA (PyTorch, TensorFlow, NumPy)', 'Polyvalent (Scripts, Web, IA, Data)', 'Idéal pour l\'algorithmique'],
    cons: ['Lent comparé aux langages compilés', 'GIL limite la parallélisation native'],
    domains: ['Intelligence Artificielle', 'Data Science', 'Automatisation', 'Back-End (Django, FastAPI)'],
    difficulty: 1, popularity: 90, perf: 45,
    typing: 'Dynamique', paradigm: 'Multi-paradigme', compiled: 'Interprété',
    level: 'Débutant', algos: 'python',
    code: `# Algorithme : Binary Search
def binary_search(arr, target):
    l, r = 0, len(arr) - 1
    while l <= r:
        mid = (l + r) // 2
        if arr[mid] == target: return mid
        elif arr[mid] < target: l = mid + 1
        else: r = mid - 1
    return -1`
  },
  {
    id: 'java', name: 'Java', icon: '☕', color: '#ef4444',
    tagline: 'Écrire une fois, exécuter partout',
    desc: 'Langage orienté objet robuste, pilier des grandes entreprises et du développement Android. Très prisé dans les entretiens techniques.',
    pros: ['Typage fort = moins de bugs', 'Haute performance (JVM optimisée)', 'Standard en entreprise', 'Excellent pour préparer les entretiens'],
    cons: ['Verbeux (beaucoup de boilerplate)', 'Démarrage plus lent à apprendre'],
    domains: ['Applications Android', 'Systèmes Bancaires', 'Big Data (Hadoop, Spark)', 'Back-End enterprise'],
    difficulty: 3, popularity: 75, perf: 80,
    typing: 'Statique fort', paradigm: 'Orienté Objet', compiled: 'Compilé (JVM)',
    level: 'Intermédiaire', algos: 'java',
    code: `// Algorithme : Binary Search
public static int binarySearch(int[] arr, int target) {
    int l = 0, r = arr.length - 1;
    while (l <= r) {
        int mid = (l + r) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) l = mid + 1;
        else r = mid - 1;
    }
    return -1;
}`
  },
  {
    id: 'cpp', name: 'C++', icon: '⚡', color: '#8b5cf6',
    tagline: 'Performance brute et contrôle absolu',
    desc: 'Le choix ultime quand chaque nanoseconde compte. Offre un contrôle total sur le matériel et la mémoire. Standard des jeux vidéo et systèmes embarqués.',
    pros: ['Vitesse extrême (proche du hardware)', 'Gestion mémoire manuelle précise', 'Standard industriel (Unreal Engine, Chrome)', 'Prépare à comprendre les bas niveaux'],
    cons: ['Complexité élevée', 'Gestion mémoire manuelle = risques de bugs'],
    domains: ['Jeux Vidéo (Unreal Engine)', 'Systèmes Embarqués', 'Moteurs de Calcul', 'Compilateurs'],
    difficulty: 5, popularity: 65, perf: 100,
    typing: 'Statique fort', paradigm: 'Multi-paradigme', compiled: 'Compilé natif',
    level: 'Avancé', algos: 'cpp',
    code: `// Algorithme : Binary Search
int binarySearch(vector<int>& arr, int target) {
    int l = 0, r = arr.size() - 1;
    while (l <= r) {
        int mid = (l + r) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) l = mid + 1;
        else r = mid - 1;
    }
    return -1;
}`
  },
  {
    id: 'csharp', name: 'C#', icon: '💜', color: '#a855f7',
    tagline: 'Le Java moderne de Microsoft',
    desc: 'Langage élégant et moderne développé par Microsoft. Idéal pour Unity (jeux vidéo), les applications Windows et les services cloud Azure.',
    pros: ['Syntaxe moderne et propre', 'Excellent pour Unity (jeux)', 'Typage fort avec inférence', 'Écosystème .NET robuste'],
    cons: ['Principalement Windows/Microsoft', 'Moins universel que Java'],
    domains: ['Jeux Vidéo (Unity)', 'Applications Windows', 'Services Azure', 'Applications d\'entreprise'],
    difficulty: 3, popularity: 68, perf: 82,
    typing: 'Statique fort', paradigm: 'Orienté Objet', compiled: 'Compilé (CLR)',
    level: 'Intermédiaire', algos: 'csharp',
    code: `// Algorithme : Binary Search
public static int BinarySearch(int[] arr, int target) {
    int l = 0, r = arr.Length - 1;
    while (l <= r) {
        int mid = (l + r) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) l = mid + 1;
        else r = mid - 1;
    }
    return -1;
}`
  },
  {
    id: 'c', name: 'C', icon: '🔧', color: '#06b6d4',
    tagline: 'Le fondement de l\'informatique moderne',
    desc: 'Le langage le plus influent de l\'histoire. Comprendre C, c\'est comprendre comment fonctionne vraiment un ordinateur. Bas niveau, rapide et précis.',
    pros: ['Fondement de tous les OS (Linux, Windows)', 'Vitesse quasi-native', 'Comprendre la mémoire en profondeur', 'Intemporel — toujours utilisé'],
    cons: ['Pas de garbage collector', 'Très verbeux et risqué (segfaults)', 'Pas orienté objet'],
    domains: ['Systèmes d\'exploitation', 'Systèmes Embarqués', 'Pilotes (Drivers)', 'Compilateurs'],
    difficulty: 4, popularity: 55, perf: 98,
    typing: 'Statique', paradigm: 'Procédural', compiled: 'Compilé natif',
    level: 'Avancé', algos: 'c',
    code: `/* Algorithme : Binary Search */
int binarySearch(int arr[], int n, int target) {
    int l = 0, r = n - 1;
    while (l <= r) {
        int mid = (l + r) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) l = mid + 1;
        else r = mid - 1;
    }
    return -1;
}`
  },
];

const DOMAINS = ['Tous', 'Web', 'IA', 'Jeux', 'Systèmes', 'Entreprise'];

const DOMAIN_MAP: Record<string, string[]> = {
  'Web': ['js', 'python'],
  'IA': ['python'],
  'Jeux': ['cpp', 'csharp'],
  'Systèmes': ['c', 'cpp'],
  'Entreprise': ['java', 'csharp'],
};

function Bar({ value, color, label }: { value: number; color: string; label: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px]">
        <span className="text-[var(--text-dim)] font-bold uppercase tracking-wider">{label}</span>
        <span className="font-black" style={{ color }}>{value}/100</span>
      </div>
      <div className="h-1.5 bg-[var(--bg3)] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}

function DifficultyDots({ level }: { level: number }) {
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map(i => (
        <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i <= level ? 'bg-[var(--green)]' : 'bg-[var(--bg3)]'}`} />
      ))}
    </div>
  );
}

export default function Languages() {
  const { uiLang } = useStore();
  const [domain, setDomain] = useState('Tous');

  const filtered = domain === 'Tous' ? LANGS : LANGS.filter(l => DOMAIN_MAP[domain]?.includes(l.id));

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <Seo title="Guide des Langages" description="Comparez JavaScript, Python, Java, C++, C# et C pour choisir le langage adapté à vos objectifs." />

      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--green)]/10 border border-[var(--green)]/20 text-xs font-bold text-[var(--green)] mb-4">
          <Globe className="w-3.5 h-3.5" />
          {uiLang === 'fr' ? '6 langages supportés sur la plateforme' : '6 languages supported on the platform'}
        </div>
        <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-br from-white via-white to-[var(--text-dim)] bg-clip-text text-transparent">
          {uiLang === 'fr' ? 'Quel langage choisir ?' : 'Which language to choose?'}
        </h1>
        <p className="text-[var(--text-dim)] text-lg max-w-2xl mx-auto">
          {uiLang === 'fr'
            ? 'Compare les forces, usages et syntaxes de chaque langage. Tous sont pratiquables directement sur AlgoMaster.'
            : 'Compare the strengths, uses and syntax of each language. All are directly available on AlgoMaster.'}
        </p>
      </motion.div>

      {/* Domain Filter */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-wrap gap-2 justify-center mb-10">
        {DOMAINS.map(d => (
          <button
            key={d}
            onClick={() => setDomain(d)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${domain === d ? 'bg-[var(--green)] text-black border-[var(--green)]' : 'bg-[var(--bg2)] text-[var(--text-dim)] border-[var(--border)] hover:border-[var(--green)]/40'}`}
          >
            {d}
          </button>
        ))}
      </motion.div>

      {/* Language Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
        <AnimatePresence mode="popLayout">
          {filtered.map((lang, i) => (
            <motion.div
              key={lang.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.05, type: 'spring', stiffness: 150 }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl border bg-[var(--bg2)] overflow-hidden cursor-pointer transition-all hover:border-[var(--green)]/50"
              style={{ borderColor: 'var(--border)' }}
            >
              <Link to={`/languages/${lang.id}`} className="block h-full">
              {/* Top color accent */}
              <div className="h-1 w-full" style={{ backgroundColor: lang.color }} />

              {/* Glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at top, ${lang.color}12 0%, transparent 60%)` }}
              />

              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{lang.icon}</span>
                    <div>
                      <h2 className="text-xl font-black text-[var(--text-bright)]">{lang.name}</h2>
                      <p className="text-xs font-medium italic" style={{ color: lang.color }}>{lang.tagline}</p>
                    </div>
                  </div>
                  <span className={`text-[9px] font-black px-2 py-1 rounded-full border ${
                    lang.level === 'Débutant' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                    lang.level === 'Intermédiaire' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                    'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                    {lang.level}
                  </span>
                </div>

                <p className="text-xs text-[var(--text-dim)] leading-relaxed mb-5 line-clamp-2">{lang.desc}</p>

                {/* Stats bars */}
                <div className="space-y-2 mb-5">
                  <Bar value={lang.popularity} color={lang.color} label={uiLang === 'fr' ? 'Popularité' : 'Popularity'} />
                  <Bar value={lang.perf} color={lang.color} label={uiLang === 'fr' ? 'Performance' : 'Performance'} />
                </div>

                {/* Difficulty */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] text-[var(--text-dim)] font-bold uppercase tracking-wider">
                    {uiLang === 'fr' ? 'Difficulté' : 'Difficulty'}
                  </span>
                  <DifficultyDots level={lang.difficulty} />
                </div>

                {/* Meta chips */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {[lang.typing, lang.paradigm, lang.compiled].map(m => (
                    <span key={m} className="text-[9px] px-2 py-0.5 rounded-full bg-[var(--bg3)] border border-[var(--border)] text-[var(--text-dim)] font-medium">
                      {m}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-[var(--border)] mt-auto">
                  <div
                    className="flex-1 text-xs py-1.5 rounded-lg font-black text-center flex items-center justify-center gap-1 transition-all"
                    style={{ background: lang.color + '20', color: lang.color, border: `1px solid ${lang.color}40` }}
                  >
                    {uiLang === 'fr' ? 'Voir le cours complet' : 'View full course'} <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>



      {/* Comparison Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl border border-[var(--border)] bg-[var(--bg2)] overflow-hidden mb-12">
        <div className="p-6 border-b border-[var(--border)] bg-[var(--bg3)]">
          <h3 className="text-xl font-black">{uiLang === 'fr' ? '📊 Tableau Comparatif' : '📊 Comparison Table'}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="p-4 text-xs font-black uppercase tracking-widest text-[var(--text-dim)]">Critère</th>
                {LANGS.map(l => (
                  <th key={l.id} className="p-4 text-xs font-black uppercase tracking-widest" style={{ color: l.color }}>
                    {l.icon} {l.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {[
                { label: 'Vitesse', vals: ['🚀 Très rapide', '🐢 Modérée', '⚡ Rapide', '🔥 Extrême', '⚡ Rapide', '🔥 Extrême'] },
                { label: 'Courbe apprentissage', vals: ['Facile', 'Très facile', 'Modérée', 'Difficile', 'Modérée', 'Très difficile'] },
                { label: 'Typage', vals: ['Dynamique', 'Dynamique', 'Statique fort', 'Statique fort', 'Statique fort', 'Statique'] },
                { label: 'Gestion mémoire', vals: ['GC auto', 'GC auto', 'GC (JVM)', 'Manuelle', 'GC (CLR)', 'Manuelle'] },
                { label: 'Usage principal', vals: ['Web / Node', 'IA / Data', 'Entreprise', 'Jeux / Sys.', 'Unity / .NET', 'OS / Embarqué'] },
                { label: 'Popularité (TIOBE)', vals: ['#2', '#1', '#4', '#3', '#5', '#11'] },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-[var(--bg3)]/50 transition-colors">
                  <td className="p-4 text-xs font-black text-[var(--text-bright)]">{row.label}</td>
                  {row.vals.map((v, j) => (
                    <td key={j} className="p-4 text-xs text-[var(--text-dim)]">{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center p-10 rounded-2xl border border-[var(--green)]/20 bg-[var(--green)]/5">
        <h3 className="text-2xl font-black mb-3">{uiLang === 'fr' ? 'Prêt à pratiquer ?' : 'Ready to practice?'}</h3>
        <p className="text-[var(--text-dim)] text-sm mb-6">
          {uiLang === 'fr' ? 'Tous ces langages sont disponibles dans l\'éditeur intégré. Choisissez votre algorithme et codez directement.' : 'All these languages are available in the integrated editor. Pick an algorithm and code directly.'}
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/algorithms" className="btn btn-primary px-6 py-2.5 font-black flex items-center gap-2">
            <Star className="w-4 h-4" /> {uiLang === 'fr' ? 'Explorer les Algorithmes' : 'Explore Algorithms'}
          </Link>
          <Link to="/exercises" className="btn px-6 py-2.5 font-black flex items-center gap-2 border border-[var(--border)] hover:border-[var(--green)]/40">
            <Cpu className="w-4 h-4" /> {uiLang === 'fr' ? 'Aller aux Exercices' : 'Go to Exercises'}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
