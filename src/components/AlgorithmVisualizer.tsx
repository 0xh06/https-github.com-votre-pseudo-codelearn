import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, RefreshCw } from 'lucide-react';

// --- Sorting Step Generator ---
function generateBubbleSortSteps(arr: number[]) {
  const steps: { array: number[]; comparing: number[]; swapped: number[]; done: number[]; desc: string }[] = [];
  const a = [...arr];
  const n = a.length;
  const done: number[] = [];
  steps.push({ array: [...a], comparing: [], swapped: [], done: [...done], desc: 'Tableau initial.' });
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({ array: [...a], comparing: [j, j + 1], swapped: [], done: [...done], desc: `Passe ${i+1}: Comparaison arr[${j}]=${a[j]} et arr[${j+1}]=${a[j+1]}.` });
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        steps.push({ array: [...a], comparing: [], swapped: [j, j + 1], done: [...done], desc: `${a[j+1]} > ${a[j]} → Échange ! Le tableau est maintenant [${a.join(', ')}].` });
      }
    }
    done.push(n - 1 - i);
  }
  done.push(0);
  steps.push({ array: [...a], comparing: [], swapped: [], done: [...done], desc: `✅ Tri terminé ! Tableau final : [${a.join(', ')}].` });
  return steps;
}

function generateQuickSortSteps(arr: number[]) {
  const steps: { array: number[]; comparing: number[]; swapped: number[]; pivot: number; done: number[]; desc: string }[] = [];
  const a = [...arr];
  const done = new Set<number>();
  steps.push({ array: [...a], comparing: [], swapped: [], pivot: -1, done: [], desc: 'Tableau initial. On va choisir un pivot.' });
  
  function qs(lo: number, hi: number) {
    if (lo >= hi) { done.add(lo); return; }
    const pivotVal = a[hi];
    steps.push({ array: [...a], comparing: [], swapped: [], pivot: hi, done: [...done], desc: `Pivot choisi : arr[${hi}] = ${pivotVal}. On partitionne [${lo}..${hi}].` });
    let p = lo;
    for (let j = lo; j < hi; j++) {
      steps.push({ array: [...a], comparing: [j, hi], swapped: [], pivot: hi, done: [...done], desc: `arr[${j}]=${a[j]} vs pivot=${pivotVal}: ${a[j] < pivotVal ? 'Plus petit → échange avec position ' + p : 'Plus grand → on passe'}.` });
      if (a[j] < pivotVal) {
        [a[p], a[j]] = [a[j], a[p]];
        if (p !== j) steps.push({ array: [...a], comparing: [], swapped: [p, j], pivot: hi, done: [...done], desc: `Échange arr[${p}]=${a[j]} ↔ arr[${j}]=${a[p]}.` });
        p++;
      }
    }
    [a[p], a[hi]] = [a[hi], a[p]];
    done.add(p);
    steps.push({ array: [...a], comparing: [], swapped: [p, hi], pivot: p, done: [...done], desc: `Pivot ${pivotVal} placé à sa position finale (index ${p}). 🎯` });
    qs(lo, p - 1);
    qs(p + 1, hi);
  }
  qs(0, a.length - 1);
  steps.push({ array: [...a], comparing: [], swapped: [], pivot: -1, done: a.map((_, i) => i), desc: `✅ Tri terminé ! Tableau final : [${a.join(', ')}].` });
  return steps;
}

function generateBinarySearchSteps(arr: number[], target: number) {
  const steps: { array: number[]; left: number; right: number; mid: number; found: number; desc: string }[] = [];
  let l = 0, r = arr.length - 1, found = -1;
  steps.push({ array: arr, left: l, right: r, mid: -1, found: -1, desc: `Recherche de ${target} dans [${arr.join(', ')}]. l=${l}, r=${r}.` });
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    steps.push({ array: arr, left: l, right: r, mid, found: -1, desc: `Milieu = arr[${mid}] = ${arr[mid]}. ${arr[mid] === target ? `✅ Trouvé !` : arr[mid] < target ? `${arr[mid]} < ${target} → on cherche à droite.` : `${arr[mid]} > ${target} → on cherche à gauche.`}` });
    if (arr[mid] === target) { found = mid; break; }
    else if (arr[mid] < target) l = mid + 1;
    else r = mid - 1;
  }
  steps.push({ array: arr, left: l, right: r, mid: found, found, desc: found !== -1 ? `✅ ${target} trouvé à l'index ${found} en ${steps.length} étapes.` : `❌ ${target} absent du tableau.` });
  return steps;
}

const INITIAL_ARRAY = [38, 27, 43, 3, 9, 82, 10];
const BINARY_ARRAY = [3, 9, 10, 27, 38, 43, 82];
const BINARY_TARGET = 27;

type AlgoType = 'bubble-sort' | 'quick-sort' | 'merge-sort' | 'binary-search' | 'other';

export default function AlgorithmVisualizer({ algoId }: { algoId: string }) {
  const algoType = algoId as AlgoType;
  const isBinary = algoType === 'binary-search';
  const isSort = ['bubble-sort', 'quick-sort', 'merge-sort'].includes(algoType);

  const [steps, setSteps] = useState<any[]>([]);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const playRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let s: any[] = [];
    if (algoType === 'bubble-sort') s = generateBubbleSortSteps(INITIAL_ARRAY);
    else if (algoType === 'quick-sort') s = generateQuickSortSteps(INITIAL_ARRAY);
    else if (isBinary) s = generateBinarySearchSteps(BINARY_ARRAY, BINARY_TARGET);
    setSteps(s);
    setStep(0);
    setPlaying(false);
  }, [algoId]);

  useEffect(() => {
    if (playing) {
      playRef.current = setInterval(() => {
        setStep(prev => {
          if (prev >= steps.length - 1) { setPlaying(false); return prev; }
          return prev + 1;
        });
      }, 800);
    } else if (playRef.current) clearInterval(playRef.current);
    return () => { if (playRef.current) clearInterval(playRef.current); };
  }, [playing, steps.length]);

  const reset = () => { setStep(0); setPlaying(false); };
  const cur = steps[step];

  if (!cur) return null;

  const maxVal = isBinary ? Math.max(...BINARY_ARRAY) : Math.max(...INITIAL_ARRAY);

  return (
    <div className="bg-[#131313] rounded-xl border border-[var(--border)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--bg2)]">
        <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-dim)]">
          Visualiseur Interactif
        </span>
        <span className="text-xs text-[var(--green)] font-bold">
          Étape {step + 1} / {steps.length}
        </span>
      </div>

      {/* Array Display */}
      <div className="p-4">
        {isBinary ? (
          // Binary Search: boxes in a row
          <div className="flex items-center justify-center gap-1 py-4 flex-wrap">
            {cur.array.map((v: number, i: number) => {
              let bg = 'bg-[var(--bg3)]';
              let border = 'border-[var(--border)]';
              let text = 'text-[var(--text-bright)]';
              if (cur.found === i) { bg = 'bg-green-500/20'; border = 'border-green-400'; text = 'text-green-400'; }
              else if (cur.mid === i) { bg = 'bg-blue-500/20'; border = 'border-blue-400'; text = 'text-blue-300'; }
              else if (i >= cur.left && i <= cur.right) { bg = 'bg-yellow-500/10'; border = 'border-yellow-500/40'; text = 'text-yellow-300'; }
              return (
                <motion.div
                  key={i}
                  layout
                  animate={{ scale: cur.mid === i ? 1.2 : 1 }}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg border-2 flex flex-col items-center justify-center ${bg} ${border} transition-colors`}
                >
                  <span className={`text-xs font-black ${text}`}>{v}</span>
                  <span className="text-[8px] text-[var(--text-dim)]">[{i}]</span>
                </motion.div>
              );
            })}
          </div>
        ) : (
          // Sorting: bar chart
          <div className="flex items-end justify-center gap-1.5 h-32">
            {cur.array.map((v: number, i: number) => {
              const heightPct = Math.max(10, (v / maxVal) * 100);
              let barColor = '#10b981'; // green default
              if (cur.comparing?.includes(i)) barColor = '#f59e0b'; // yellow = comparing
              if (cur.swapped?.includes(i)) barColor = '#ef4444'; // red = swapped
              if (cur.done?.includes(i)) barColor = '#3b82f6'; // blue = done
              if (cur.pivot === i) barColor = '#a855f7'; // purple = pivot
              return (
                <motion.div
                  key={i}
                  layout
                  animate={{ height: `${heightPct}%`, backgroundColor: barColor }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="flex-1 min-w-0 max-w-[40px] rounded-t-md flex items-start justify-center"
                  style={{ backgroundColor: barColor }}
                >
                  <span className="text-[9px] font-bold text-black mt-0.5 hidden sm:block">{v}</span>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Legend */}
        <div className="flex flex-wrap gap-3 justify-center mt-3 text-[10px]">
          {isBinary ? (
            <>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-500/40 border border-yellow-400 inline-block" /> Zone de recherche</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-500/40 border border-blue-400 inline-block" /> Milieu (mid)</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500/40 border border-green-400 inline-block" /> Trouvé !</span>
            </>
          ) : (
            <>
              <span className="flex items-center gap-1"><span className="w-3 h-2 rounded bg-green-500 inline-block" /> Normal</span>
              <span className="flex items-center gap-1"><span className="w-3 h-2 rounded bg-yellow-500 inline-block" /> Comparé</span>
              <span className="flex items-center gap-1"><span className="w-3 h-2 rounded bg-red-500 inline-block" /> Échangé</span>
              <span className="flex items-center gap-1"><span className="w-3 h-2 rounded bg-blue-500 inline-block" /> Trié ✓</span>
              {algoType === 'quick-sort' && <span className="flex items-center gap-1"><span className="w-3 h-2 rounded bg-purple-500 inline-block" /> Pivot</span>}
            </>
          )}
        </div>
      </div>

      {/* Step Description */}
      <div className="mx-4 mb-4 p-3 bg-[var(--bg3)] border border-[var(--border)] rounded-lg min-h-[44px]">
        <AnimatePresence mode="wait">
          <motion.p
            key={step}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-xs text-[var(--text-bright)] font-mono leading-relaxed"
          >
            {cur.desc}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 pb-4">
        <button onClick={reset} className="p-2 rounded-lg bg-[var(--bg3)] hover:bg-[var(--bg2)] text-[var(--text-dim)] hover:text-white transition-all">
          <SkipBack className="w-4 h-4" />
        </button>
        <button
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
          className="p-2 rounded-lg bg-[var(--bg3)] hover:bg-[var(--bg2)] text-[var(--text-dim)] hover:text-white transition-all disabled:opacity-30"
        >
          ← Préc
        </button>
        <button
          onClick={() => setPlaying(p => !p)}
          className={`px-5 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all ${playing ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-[var(--green)]/20 text-[var(--green)] border border-[var(--green)]/40 hover:bg-[var(--green)]/30'}`}
        >
          {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          {playing ? 'Pause' : 'Jouer'}
        </button>
        <button
          onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}
          disabled={step >= steps.length - 1}
          className="p-2 rounded-lg bg-[var(--bg3)] hover:bg-[var(--bg2)] text-[var(--text-dim)] hover:text-white transition-all disabled:opacity-30"
        >
          Suiv →
        </button>
        <button onClick={reset} className="p-2 rounded-lg bg-[var(--bg3)] hover:bg-[var(--bg2)] text-[var(--text-dim)] hover:text-white transition-all">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
