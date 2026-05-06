import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import Seo from '../components/Seo';
import { ChevronRight, Star, Zap, Globe, Cpu, Code2, Terminal, BookOpen, TrendingUp, Sparkles, Box, Layout, Map as MapIcon } from 'lucide-react';

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
    <div className="space-y-1.5">
      <div className="flex justify-between text-[10px]">
        <span className="text-[var(--text-dim)] font-black uppercase tracking-widest">{label}</span>
        <span className="font-black" style={{ color }}>{value}%</span>
      </div>
      <div className="h-1.5 bg-[var(--bg3)] rounded-full overflow-hidden shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full"
          style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}40` }}
        />
      </div>
    </div>
  );
}

function DifficultyDots({ level }: { level: number }) {
  return (
    <div className="flex gap-1.5">
      {[1,2,3,4,5].map(i => (
        <motion.div 
          key={i} 
          initial={false}
          animate={{ scale: i <= level ? 1.1 : 1, opacity: i <= level ? 1 : 0.2 }}
          className={`w-2.5 h-2.5 rounded-full ${i <= level ? 'bg-[var(--green)] shadow-[0_0_8px_var(--green-glow)]' : 'bg-[var(--text-dim)]'}`} 
        />
      ))}
    </div>
  );
}

export default function Languages() {
  const { uiLang } = useStore();
  const [domain, setDomain] = useState('Tous');

  const filtered = domain === 'Tous' ? LANGS : LANGS.filter(l => DOMAIN_MAP[domain]?.includes(l.id));

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl relative">
      <Seo title="Guide des Langages" description="Comparez JavaScript, Python, Java, C++, C# et C pour choisir le langage adapté à vos objectifs." />

      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent opacity-50" />
      
      {/* Hero */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-center mb-16 relative"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl glass mb-6 shadow-xl border-[var(--green)]/20">
          <Sparkles className="w-4 h-4 text-[var(--green)] animate-pulse" />
          <span className="text-xs font-black tracking-widest text-[var(--green)] uppercase">
            {uiLang === 'fr' ? 'Standard 100k€ — Curriculum Expert' : '100k€ Standard — Expert Curriculum'}
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black mb-6 premium-gradient font-[var(--font-display)] leading-tight">
          {uiLang === 'fr' ? 'Choisissez votre' : 'Choose your'} <br />
          <span className="text-[var(--green)] text-glow-green">ADN de Codeur</span>
        </h1>
        
        <p className="text-[var(--text-dim)] text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
          {uiLang === 'fr'
            ? 'Une exploration immersive des 6 piliers technologiques mondiaux. Maîtrisez le langage qui propulsera votre carrière.'
            : 'An immersive exploration of the 6 global technological pillars. Master the language that will propel your career.'}
        </p>
      </motion.div>

      {/* Domain Filter */}
      <div className="sticky top-20 z-50 flex justify-center mb-12 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="flex flex-wrap gap-2 justify-center p-1.5 glass rounded-2xl shadow-2xl pointer-events-auto border-white/5"
        >
          {DOMAINS.map(d => (
            <button
              key={d}
              onClick={() => setDomain(d)}
              className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                domain === d 
                  ? 'bg-[var(--green)] text-black shadow-lg shadow-green-500/20' 
                  : 'text-[var(--text-dim)] hover:text-white hover:bg-white/5'
              }`}
            >
              {d}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Language Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
        <AnimatePresence mode="popLayout">
          {filtered.map((lang, i) => (
            <motion.div
              key={lang.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.05, type: 'spring', stiffness: 100, damping: 15 }}
              className="group relative"
            >
              <Link to={`/languages/${lang.id}`} className="block h-full">
                <div className="card h-full flex flex-col relative overflow-hidden group-hover:border-white/20">
                  {/* Visual Background Accent */}
                  <div 
                    className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
                    style={{ backgroundColor: lang.color, filter: 'blur(60px)' }}
                  />
                  
                  {/* Top Bar Accent */}
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: lang.color }} />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-[var(--bg3)] flex items-center justify-center text-3xl border border-[var(--border)] group-hover:rotate-6 transition-transform duration-500 shadow-xl">
                          {lang.icon}
                        </div>
                        <div>
                          <h2 className="text-2xl font-black text-[var(--text-bright)] tracking-tight">{lang.name}</h2>
                          <div className="flex items-center gap-1.5">
                            <Box className="w-3 h-3" style={{ color: lang.color }} />
                            <span className="text-[10px] font-black uppercase tracking-tighter" style={{ color: lang.color }}>{lang.tagline}</span>
                          </div>
                        </div>
                      </div>
                      <span className={`badge ${
                        lang.level === 'Débutant' ? 'text-green-400' :
                        lang.level === 'Intermédiaire' ? 'text-yellow-400' :
                        'text-red-400'}`}>
                        {lang.level}
                      </span>
                    </div>

                    <p className="text-sm text-[var(--text-dim)] leading-relaxed mb-8 font-medium line-clamp-3">
                      {lang.desc}
                    </p>

                    <div className="space-y-4 mb-8 flex-1">
                      <Bar value={lang.popularity} color={lang.color} label={uiLang === 'fr' ? 'Demande Marché' : 'Market Demand'} />
                      <Bar value={lang.perf} color={lang.color} label={uiLang === 'fr' ? 'Efficacité Runtime' : 'Runtime Efficiency'} />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[var(--bg3)]/50 rounded-2xl border border-white/5 mt-auto">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-dim)] mb-1">Difficulté</span>
                        <DifficultyDots level={lang.difficulty} />
                      </div>
                      <div className="p-2 rounded-xl bg-[var(--bg)] border border-[var(--border)] group-hover:translate-x-1 transition-transform" style={{ color: lang.color }}>
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Comparison Section - High fidelity */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }}
        className="mb-24"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[var(--blue)]/10 flex items-center justify-center border border-[var(--blue)]/20">
            <Layout className="w-6 h-6 text-[var(--blue)]" />
          </div>
          <div>
            <h2 className="text-3xl font-black">{uiLang === 'fr' ? 'Matrice de Comparaison' : 'Comparison Matrix'}</h2>
            <p className="text-[var(--text-dim)] text-sm font-medium">Analyse comparative des critères d'ingénierie critiques.</p>
          </div>
        </div>

        <div className="glass rounded-3xl overflow-hidden border-white/5 shadow-3xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
              <thead>
                <tr className="bg-white/5">
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-[var(--text-dim)] border-b border-white/5">Paramètre</th>
                  {LANGS.map(l => (
                    <th key={l.id} className="p-6 text-xs font-black uppercase tracking-widest border-b border-white/5" style={{ color: l.color }}>
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{l.icon}</span>
                        {l.name}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { label: 'Vitesse d\'Exécution', icon: <Zap className="w-3.5 h-3.5" />, vals: ['⚡ Modérée', '🐢 Basse', '⚡ Haute', '🔥 Extrême', '⚡ Haute', '🔥 Extrême'] },
                  { label: 'Courbe Apprentissage', icon: <TrendingUp className="w-3.5 h-3.5" />, vals: ['Simple', 'Très Simple', 'Modérée', 'Complexe', 'Modérée', 'Expert'] },
                  { label: 'Type de Typage', icon: <Code2 className="w-3.5 h-3.5" />, vals: ['Dynamique', 'Dynamique', 'Statique Fort', 'Statique Fort', 'Statique Fort', 'Statique'] },
                  { label: 'Écosystème / Libs', icon: <Globe className="w-3.5 h-3.5" />, vals: ['Titanesque', 'IA / Data', 'Entreprise', 'Natifs / GFX', 'Jeux / .NET', 'Hardware'] },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white/5 text-[var(--text-dim)] group-hover:text-white transition-colors">
                          {row.icon}
                        </div>
                        <span className="text-xs font-black text-[var(--text-bright)]">{row.label}</span>
                      </div>
                    </td>
                    {row.vals.map((v, j) => (
                      <td key={j} className="p-6 text-[11px] font-bold text-[var(--text-dim)] group-hover:text-[var(--text)] transition-colors">{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* CTA Section - Ultra Premium */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        whileInView={{ opacity: 1, scale: 1 }} 
        viewport={{ once: true }}
        className="relative rounded-[40px] overflow-hidden p-12 md:p-20 text-center border border-white/10"
      >
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[var(--green)]/10 to-[var(--blue)]/10 -z-10" />
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-[var(--green)]/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-[var(--blue)]/5 blur-[120px] rounded-full animate-pulse delay-1000" />
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-black mb-6 premium-gradient">
            {uiLang === 'fr' ? 'Lancez votre première Quête' : 'Launch your first Quest'}
          </h3>
          <p className="text-[var(--text-dim)] text-lg mb-10 font-medium">
            {uiLang === 'fr' 
              ? 'Ne vous contentez pas de lire. Pratiquez avec nos algorithmes interactifs et débloquez votre potentiel.' 
              : 'Don\'t just read. Practice with our interactive algorithms and unlock your potential.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/algorithms" className="btn btn-primary px-10 py-4 text-sm font-black rounded-2xl flex items-center gap-3">
              <Terminal className="w-5 h-5" /> 
              {uiLang === 'fr' ? 'Explorer les Algorithmes' : 'Explore Algorithms'}
            </Link>
            <Link to="/paths" className="btn btn-secondary px-10 py-4 text-sm font-black rounded-2xl flex items-center gap-3">
              <MapIcon className="w-5 h-5" />
              {uiLang === 'fr' ? 'Voir les Roadmaps' : 'View Roadmaps'}
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

