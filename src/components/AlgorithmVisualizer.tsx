import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, RefreshCw, Gauge, ChevronLeft, ChevronRight, Activity, Terminal, Settings2, PlayCircle } from 'lucide-react';
import { useStore } from '../store/useStore';

// --- Pedagogical Step Generators ---
function generateBubbleSortSteps(arr: number[]) {
  const steps: any[] = [];
  const a = [...arr];
  const n = a.length;
  const done: number[] = [];
  steps.push({ array: [...a], comparing: [], swapped: [], done: [...done], desc: "Phase 1 : Observation. Voici notre tableau initial non trié. Le but du Tri à Bulles est de faire 'remonter' les plus grands éléments vers la droite." });
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({ array: [...a], comparing: [j, j+1], swapped: [], done: [...done], desc: `Comparaison de ${a[j]} et ${a[j+1]}. Si le premier est plus grand, on échange.` });
      if (a[j] > a[j+1]) {
        [a[j], a[j+1]] = [a[j+1], a[j]];
        steps.push({ array: [...a], comparing: [], swapped: [j, j+1], done: [...done], desc: `🚨 ${a[j+1]} > ${a[j]} ! Échange effectué. L'élément plus grand avance vers la droite.` });
      } else {
        steps.push({ array: [...a], comparing: [], swapped: [], done: [...done], desc: `✅ ${a[j]} n'est pas plus grand que ${a[j+1]}. On les laisse à leur place.` });
      }
    }
    done.push(n - 1 - i);
    steps.push({ array: [...a], comparing: [], swapped: [], done: [...done], desc: `Fin de la passe. Le plus grand élément (${a[n - 1 - i]}) est maintenant verrouillé à sa position finale (en vert).` });
  }
  done.push(0);
  steps.push({ array: [...a], comparing: [], swapped: [], done: [...done], desc: `🎉 Algorithme terminé ! Tous les éléments sont triés et verrouillés.` });
  return steps;
}

function generateQuickSortSteps(arr: number[]) {
  const steps: any[] = [];
  const a = [...arr];
  const done = new Set<number>();
  steps.push({ array: [...a], comparing: [], swapped: [], pivot: -1, done: [], desc: "Le Tri Rapide (Quick Sort) utilise la stratégie 'Diviser pour Régner'." });
  function qs(lo: number, hi: number) {
    if (lo >= hi) { if(lo === hi) done.add(lo); return; }
    const pivotVal = a[hi];
    steps.push({ array: [...a], comparing: [], swapped: [], pivot: hi, done: [...done], desc: `🎯 On choisit un Pivot. Ici le dernier élément de la zone : ${pivotVal}. Le but est de placer les plus petits à gauche, les plus grands à droite.` });
    let p = lo;
    for (let j = lo; j < hi; j++) {
      steps.push({ array: [...a], comparing: [j, hi], swapped: [], pivot: hi, done: [...done], desc: `Analyse : est-ce que ${a[j]} est plus petit que le pivot ${pivotVal} ?` });
      if (a[j] < pivotVal) { 
        [a[p], a[j]] = [a[j], a[p]]; 
        if (p !== j) steps.push({ array: [...a], comparing: [], swapped: [p, j], pivot: hi, done: [...done], desc: `Oui ! ${a[p]} < ${pivotVal}. On l'échange pour le mettre dans la zone des 'plus petits'.` }); 
        p++; 
      }
    }
    [a[p], a[hi]] = [a[hi], a[p]];
    done.add(p);
    steps.push({ array: [...a], comparing: [], swapped: [p, hi], pivot: p, done: [...done], desc: `On place définitivement le pivot ${pivotVal} à l'index ${p}. Tout ce qui est à gauche est plus petit, tout ce qui est à droite est plus grand.` });
    qs(lo, p - 1); qs(p + 1, hi);
  }
  qs(0, a.length - 1);
  steps.push({ array: [...a], comparing: [], swapped: [], pivot: -1, done: a.map((_, i) => i), desc: `🎉 Tous les pivots ont trouvé leur place finale. Le tableau est trié.` });
  return steps;
}

function generateBinarySearchSteps(arr: number[], target: number) {
  const steps: any[] = [];
  let l = 0, r = arr.length - 1, found = -1;
  const eliminated = new Set<number>();
  
  steps.push({ array: arr, left: l, right: r, mid: -1, found: -1, eliminated: Array.from(eliminated), desc: `La Recherche Binaire nécessite un tableau trié. Nous cherchons la valeur : ${target}.` });
  
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    steps.push({ array: arr, left: l, right: r, mid, found: -1, eliminated: Array.from(eliminated), desc: `On coupe en deux ! On regarde l'élément du milieu (index ${mid}) : c'est ${arr[mid]}.` });
    
    if (arr[mid] === target) { 
      found = mid; 
      steps.push({ array: arr, left: l, right: r, mid, found: mid, eliminated: Array.from(eliminated), desc: `Bingo ! ${arr[mid]} est bien notre cible ${target}.` });
      break; 
    }
    else if (arr[mid] < target) {
      steps.push({ array: arr, left: l, right: r, mid, found: -1, eliminated: Array.from(eliminated), desc: `${arr[mid]} est plus petit que ${target}. On peut donc éliminer toute la moitié gauche !` });
      for(let i = l; i <= mid; i++) eliminated.add(i);
      l = mid + 1;
    }
    else {
      steps.push({ array: arr, left: l, right: r, mid, found: -1, eliminated: Array.from(eliminated), desc: `${arr[mid]} est plus grand que ${target}. On élimine toute la moitié droite !` });
      for(let i = mid; i <= r; i++) eliminated.add(i);
      r = mid - 1;
    }
  }
  
  if (found === -1) {
    steps.push({ array: arr, left: l, right: r, mid: -1, found: -1, eliminated: Array.from(eliminated), desc: `L'espace de recherche est vide. La cible ${target} n'existe pas dans le tableau.` });
  }
  return steps;
}

const DEFAULT_SORT_ARRAY = [38, 27, 43, 3, 9, 82, 10];
const BINARY_ARRAY = [3, 9, 10, 27, 38, 43, 82];

const SPEED_MAP: Record<number, number> = { 1: 2000, 2: 1200, 3: 600, 4: 250, 5: 100 };

export default function AlgorithmVisualizer({ algoId }: { algoId: string }) {
  const isBinary = algoId === 'binary-search';
  const { uiLang } = useStore();

  const [steps, setSteps] = useState<any[]>([]);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(3);
  const [isConfigMode, setIsConfigMode] = useState(false);
  
  // Custom Input States
  const [customArrayInput, setCustomArrayInput] = useState(isBinary ? BINARY_ARRAY.join(', ') : DEFAULT_SORT_ARRAY.join(', '));
  const [customTargetInput, setCustomTargetInput] = useState('27');
  const [parseError, setParseError] = useState('');

  const playRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startSimulation = (arr: number[], target: number) => {
    let s: any[] = [];
    if (algoId === 'bubble-sort') s = generateBubbleSortSteps(arr);
    if (algoId === 'quick-sort') s = generateQuickSortSteps(arr);
    if (isBinary) s = generateBinarySearchSteps(arr, target);
    
    setSteps(s);
    setStep(0);
    setPlaying(false);
    setIsConfigMode(false);
  };

  const handleApplyConfig = () => {
    try {
      const arr = customArrayInput.split(',').map(s => s.trim()).filter(s => s !== '').map(Number);
      if (arr.some(isNaN)) throw new Error("Le tableau contient des valeurs non valides.");
      if (arr.length < 3) throw new Error("Veuillez entrer au moins 3 nombres.");
      if (arr.length > 20) throw new Error("Maximum 20 nombres pour la visualisation.");
      
      const target = Number(customTargetInput);
      if (isBinary && isNaN(target)) throw new Error("La cible doit être un nombre.");
      
      // Binary search requires sorted array, let's sort it if user didn't
      if (isBinary) arr.sort((a,b) => a-b);
      
      setParseError('');
      startSimulation(arr, target);
    } catch (err) {
      setParseError(err instanceof Error ? err.message : "Erreur de format.");
    }
  };

  useEffect(() => {
    startSimulation(isBinary ? BINARY_ARRAY : DEFAULT_SORT_ARRAY, 27);
  }, [algoId]);

  useEffect(() => {
    if (playing) {
      playRef.current = setInterval(() => {
        setStep(prev => {
          if (prev >= steps.length - 1) { setPlaying(false); return prev; }
          return prev + 1;
        });
      }, SPEED_MAP[speed]);
    } else if (playRef.current) clearInterval(playRef.current);
    return () => { if (playRef.current) clearInterval(playRef.current); };
  }, [playing, steps.length, speed]);

  const reset = () => { setStep(0); setPlaying(false); };
  const cur = steps[step];

  const legendItems = isBinary ? [
    { label: 'Espace Actif', color: 'rgba(255,255,255,0.3)' },
    { label: 'Milieu (Mid)', color: 'var(--blue)' },
    { label: 'Cible Trouvée', color: 'var(--green)' },
    { label: 'Éliminé', color: 'rgba(255,255,255,0.1)' }
  ] : [
    { label: 'Normal', color: 'rgba(255,255,255,0.1)' },
    { label: 'Comparé', color: 'var(--blue)' },
    { label: 'Échangé (Swap)', color: '#ef4444' },
    { label: 'Verrouillé', color: 'var(--green)' },
    ...(algoId === 'quick-sort' ? [{ label: 'Pivot', color: '#a855f7' }] : [])
  ];

  if (!cur && !isConfigMode) return null;

  return (
    <div className="glass rounded-[32px] border-white/5 overflow-hidden shadow-2xl bg-white/[0.01]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <Activity size={18} className="text-[var(--green)]" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-dim)]">
            Environnement de Simulation
          </span>
        </div>
        {!isConfigMode && (
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsConfigMode(true)}
              className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-[var(--blue)] hover:text-white transition-colors"
            >
              <Settings2 size={14} /> Données Custom
            </button>
            <div className="px-3 py-1 rounded-full glass border-white/10 text-[10px] font-black text-[var(--green)] uppercase">
              Étape {step + 1} / {steps.length}
            </div>
          </div>
        )}
      </div>

      {isConfigMode ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-10 space-y-8 min-h-[400px]">
          <div className="space-y-4">
            <h3 className="text-xl font-black text-white">Créer votre propre scénario</h3>
            <p className="text-sm text-[var(--text-dim)]">Définissez les données de départ pour voir l'algorithme s'adapter à votre cas d'usage.</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-[var(--text-dim)] mb-3">
                Tableau (séparé par des virgules)
              </label>
              <input
                type="text"
                value={customArrayInput}
                onChange={e => setCustomArrayInput(e.target.value)}
                className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white focus:border-[var(--green)] outline-none transition-colors"
                placeholder="Ex: 10, 25, 4, 12, 8"
              />
              {isBinary && <p className="text-[10px] text-[var(--yellow)] mt-2 mt-2 font-medium">Note : Le tableau sera automatiquement trié pour la recherche binaire.</p>}
            </div>

            {isBinary && (
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-[var(--text-dim)] mb-3">
                  Valeur Cible (Target)
                </label>
                <input
                  type="text"
                  value={customTargetInput}
                  onChange={e => setCustomTargetInput(e.target.value)}
                  className="w-full max-w-[200px] bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white focus:border-[var(--blue)] outline-none transition-colors"
                />
              </div>
            )}

            {parseError && <div className="text-red-400 text-xs font-bold">{parseError}</div>}

            <div className="flex gap-4 pt-4">
              <button 
                onClick={handleApplyConfig}
                className="btn-primary px-6 py-3 rounded-xl text-xs font-black flex items-center gap-2"
              >
                <PlayCircle size={16} /> Lancer la Simulation
              </button>
              <button 
                onClick={() => setIsConfigMode(false)}
                className="px-6 py-3 rounded-xl glass border-white/10 text-xs font-black text-white/50 hover:text-white transition-all"
              >
                Annuler
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <>
          {/* Progress bar */}
          <div className="h-0.5 bg-white/5 relative">
            <motion.div
              animate={{ width: `${steps.length > 1 ? (step / (steps.length - 1)) * 100 : 0}%` }}
              transition={{ type: 'tween' }}
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[var(--green)] to-[var(--blue)] shadow-[0_0_10px_var(--green)]"
            />
          </div>

          {/* Array Display */}
          <div className="p-10 min-h-[300px] flex items-center justify-center">
            {isBinary ? (
              <div className="flex items-center justify-center gap-3 py-8 flex-wrap">
                {cur.array.map((v: number, i: number) => {
                  const isEliminated = cur.eliminated?.includes(i);
                  let bg = 'rgba(255,255,255,0.02)', border = 'rgba(255,255,255,0.05)', text = 'rgba(255,255,255,0.4)', scale = 1, shadow = 'none', opacity = 1;
                  
                  if (isEliminated) {
                    opacity = 0.15; scale = 0.8; 
                  } else if (cur.found === i) { 
                    bg = 'rgba(16,185,129,0.15)'; border = 'var(--green)'; text = 'var(--green)'; scale = 1.15; shadow = '0 0 40px rgba(16,185,129,0.3)'; 
                  } else if (cur.mid === i) { 
                    bg = 'rgba(59,130,246,0.2)'; border = 'var(--blue)'; text = 'var(--blue)'; scale = 1.05; shadow = '0 0 20px rgba(59,130,246,0.2)';
                  } else if (i >= cur.left && i <= cur.right) { 
                    bg = 'rgba(255,255,255,0.08)'; border = 'rgba(255,255,255,0.3)'; text = 'white'; 
                  }
                  
                  return (
                    <motion.div
                      key={i}
                      layout
                      animate={{ scale, borderColor: border, boxShadow: shadow, opacity }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      className="relative w-16 h-16 rounded-2xl border-2 flex flex-col items-center justify-center glass"
                      style={{ background: bg }}
                    >
                      <span className="text-lg font-black" style={{ color: text }}>{v}</span>
                      <span className="text-[9px] opacity-30 font-mono mt-1">#{i}</span>
                      
                      {/* Pointers */}
                      {cur.left === i && !isEliminated && <motion.div initial={{y:10, opacity:0}} animate={{y:0, opacity:1}} className="absolute -bottom-8 text-[9px] font-black uppercase text-purple-400">Low ↑</motion.div>}
                      {cur.right === i && !isEliminated && <motion.div initial={{y:10, opacity:0}} animate={{y:0, opacity:1}} className="absolute -bottom-8 text-[9px] font-black uppercase text-orange-400">High ↑</motion.div>}
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="flex items-end justify-center gap-3 h-48 w-full max-w-4xl">
                {cur.array.map((v: number, i: number) => {
                  const maxVal = Math.max(...cur.array);
                  const h = Math.max(10, (v / maxVal) * 100);
                  let color = 'rgba(255,255,255,0.1)';
                  let glow = 'none';
                  
                  if (cur.comparing?.includes(i)) { color = 'var(--blue)'; glow = '0 0 20px rgba(59,130,246,0.4)'; }
                  if (cur.swapped?.includes(i))   { color = '#ef4444'; glow = '0 0 20px rgba(239,68,68,0.4)'; }
                  if (cur.done?.includes(i))      { color = 'var(--green)'; glow = '0 0 20px rgba(16,185,129,0.3)'; }
                  if (cur.pivot === i)            { color = '#a855f7'; glow = '0 0 20px rgba(168,85,247,0.4)'; }
                  
                  return (
                    <motion.div
                      key={i} // Using value or index? For swaps, using value as key is better for physical animation
                      layout
                      animate={{ height: `${h}%`, backgroundColor: color, boxShadow: glow }}
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      className="flex-1 rounded-t-xl relative border border-white/10"
                      style={{ maxWidth: 48 }}
                    >
                      <motion.span 
                        layout 
                        className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-black text-white drop-shadow-md"
                      >
                        {v}
                      </motion.span>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-6 justify-center mt-4 mb-8">
            {legendItems.map(l => (
              <div key={l.label} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: l.color }} />
                <span className="text-[10px] font-black uppercase tracking-[0.1em] text-[var(--text-dim)]">{l.label}</span>
              </div>
            ))}
          </div>

          {/* Pedagogical Step Description - Pushed to the forefront */}
          <div className="mx-8 mb-6 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--green)]/20 to-[var(--blue)]/20 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
            <div className="relative p-6 rounded-2xl glass border border-white/10 min-h-[80px] bg-[#050505]/80 flex items-start gap-4 shadow-xl">
              <div className="p-2 rounded-xl bg-white/5 shrink-0 mt-0.5">
                <Terminal size={20} className="text-[var(--green)]" />
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1"
                >
                  <p className="text-sm text-white font-medium leading-relaxed">
                    {cur.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Speed Slider */}
          <div className="mx-8 mb-8 flex items-center gap-6">
            <div className="flex items-center gap-3 shrink-0">
              <Gauge size={16} className="text-[var(--text-dim)]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-dim)]">Vitesse flux</span>
            </div>
            <input
              type="range" min={1} max={5} value={speed}
              onChange={e => setSpeed(Number(e.target.value))}
              className="flex-1 h-1 accent-[var(--green)] cursor-pointer"
            />
            <div className="px-3 py-1 rounded-lg glass border-white/5 text-[10px] font-black text-[var(--green)] shrink-0 w-12 text-center">
              {speed}.0x
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white/[0.02] px-8 py-6 flex flex-wrap items-center justify-between border-t border-white/5 gap-4">
            <div className="flex items-center gap-2">
              <button 
                onClick={reset} 
                className="p-3 rounded-2xl glass border-white/10 hover:bg-white/5 transition-all text-white/50 hover:text-white"
                title="Recommencer"
              >
                <SkipBack size={18} />
              </button>
              <div className="flex items-center gap-1 glass border-white/10 rounded-2xl p-1 shadow-inner">
                <button 
                  onClick={() => { setPlaying(false); setStep(s => Math.max(0, s - 1)); }} 
                  disabled={step === 0} 
                  className="p-3 rounded-xl hover:bg-white/5 transition-all text-[var(--text-dim)] hover:text-white disabled:opacity-30"
                  title="Étape Précédente"
                >
                  <ChevronLeft size={18} />
                </button>
                <div className="w-px h-6 bg-white/5" />
                <button 
                  onClick={() => { setPlaying(false); setStep(s => Math.min(steps.length - 1, s + 1)); }} 
                  disabled={step >= steps.length - 1} 
                  className="p-3 rounded-xl hover:bg-white/5 transition-all text-[var(--text-dim)] hover:text-white disabled:opacity-30"
                  title="Étape Suivante"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <button
              onClick={() => setPlaying(p => !p)}
              className={`px-12 py-4 rounded-[20px] font-black text-sm uppercase tracking-widest flex items-center gap-3 transition-all ${
                playing
                  ? 'bg-red-500/10 text-red-400 border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.15)] hover:bg-red-500/20'
                  : 'bg-[var(--green)] text-black shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95'
              }`}
            >
              {playing ? <Pause size={18} /> : <Play size={18} className="fill-current" />}
              {playing ? 'Pause' : 'Lecture Auto'}
            </button>

            <button 
              onClick={() => handleApplyConfig()} 
              className="p-3 rounded-2xl glass border-white/10 hover:bg-white/5 transition-all text-white/50 hover:text-white"
              title="Recharger les données actuelles"
            >
              <RefreshCw size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
