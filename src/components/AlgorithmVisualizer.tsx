import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, RefreshCw, Gauge, ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';

// --- Step Generators ---
function generateBubbleSortSteps(arr: number[]) {
  const steps: any[] = [];
  const a = [...arr];
  const n = a.length;
  const done: number[] = [];
  steps.push({ array: [...a], comparing: [], swapped: [], done: [...done], desc: 'Tableau initial. Prêt à trier.' });
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({ array: [...a], comparing: [j, j+1], swapped: [], done: [...done], desc: `Passe ${i+1}: arr[${j}]=${a[j]} vs arr[${j+1}]=${a[j+1]} — ${a[j] > a[j+1] ? '❌ Désordre, échange requis' : '✅ Déjà en ordre'}` });
      if (a[j] > a[j+1]) {
        [a[j], a[j+1]] = [a[j+1], a[j]];
        steps.push({ array: [...a], comparing: [], swapped: [j, j+1], done: [...done], desc: `🔄 Échange ! Tableau → [${a.join(', ')}]` });
      }
    }
    done.push(n - 1 - i);
  }
  done.push(0);
  steps.push({ array: [...a], comparing: [], swapped: [], done: [...done], desc: `✅ Tri terminé ! [${a.join(', ')}]` });
  return steps;
}

function generateQuickSortSteps(arr: number[]) {
  const steps: any[] = [];
  const a = [...arr];
  const done = new Set<number>();
  steps.push({ array: [...a], comparing: [], swapped: [], pivot: -1, done: [], desc: 'Tableau initial. QuickSort va choisir un pivot.' });
  function qs(lo: number, hi: number) {
    if (lo >= hi) { done.add(lo); return; }
    const pivotVal = a[hi];
    steps.push({ array: [...a], comparing: [], swapped: [], pivot: hi, done: [...done], desc: `🎯 Pivot choisi : arr[${hi}]=${pivotVal}. Partition de [${lo}..${hi}].` });
    let p = lo;
    for (let j = lo; j < hi; j++) {
      steps.push({ array: [...a], comparing: [j, hi], swapped: [], pivot: hi, done: [...done], desc: `arr[${j}]=${a[j]} vs pivot=${pivotVal}: ${a[j] < pivotVal ? `Plus petit → place en position ${p}` : 'Plus grand → on passe'}` });
      if (a[j] < pivotVal) { [a[p], a[j]] = [a[j], a[p]]; if (p !== j) steps.push({ array: [...a], comparing: [], swapped: [p, j], pivot: hi, done: [...done], desc: `🔄 Échange arr[${p}] ↔ arr[${j}]` }); p++; }
    }
    [a[p], a[hi]] = [a[hi], a[p]];
    done.add(p);
    steps.push({ array: [...a], comparing: [], swapped: [p, hi], pivot: p, done: [...done], desc: `✅ Pivot ${pivotVal} à sa place finale (index ${p})` });
    qs(lo, p - 1); qs(p + 1, hi);
  }
  qs(0, a.length - 1);
  steps.push({ array: [...a], comparing: [], swapped: [], pivot: -1, done: a.map((_, i) => i), desc: `✅ Tri terminé ! [${a.join(', ')}]` });
  return steps;
}

function generateBinarySearchSteps(arr: number[], target: number) {
  const steps: any[] = [];
  let l = 0, r = arr.length - 1, found = -1;
  steps.push({ array: arr, left: l, right: r, mid: -1, found: -1, desc: `Recherche de ${target} dans [${arr.join(', ')}]. Zone : indices [${l}..${r}]` });
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    steps.push({ array: arr, left: l, right: r, mid, found: -1, desc: `mid = (${l}+${r})/2 = ${mid} → arr[${mid}]=${arr[mid]}. ${arr[mid] === target ? '✅ Trouvé !' : arr[mid] < target ? `${arr[mid]} < ${target} → cherche à droite` : `${arr[mid]} > ${target} → cherche à gauche`}` });
    if (arr[mid] === target) { found = mid; break; }
    else if (arr[mid] < target) l = mid + 1;
    else r = mid - 1;
  }
  steps.push({ array: arr, left: l, right: r, mid: found, found, desc: found !== -1 ? `🎉 ${target} trouvé à l'index ${found} en ${steps.length - 1} comparaisons !` : `❌ ${target} absent du tableau.` });
  return steps;
}

const DEFAULT_SORT_ARRAY = [38, 27, 43, 3, 9, 82, 10];
const BINARY_ARRAY = [3, 9, 10, 27, 38, 43, 82];
const BINARY_TARGET = 27;

const SPEED_MAP: Record<number, number> = { 1: 1600, 2: 900, 3: 500, 4: 250, 5: 100 };

export default function AlgorithmVisualizer({ algoId }: { algoId: string }) {
  const isBinary = algoId === 'binary-search';
  const { uiLang } = useStore();

  const [steps, setSteps] = useState<any[]>([]);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(3);
  const playRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const buildSteps = () => {
    if (algoId === 'bubble-sort') return generateBubbleSortSteps(DEFAULT_SORT_ARRAY);
    if (algoId === 'quick-sort') return generateQuickSortSteps(DEFAULT_SORT_ARRAY);
    if (isBinary) return generateBinarySearchSteps(BINARY_ARRAY, BINARY_TARGET);
    return [];
  };

  useEffect(() => {
    const s = buildSteps();
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
      }, SPEED_MAP[speed]);
    } else if (playRef.current) clearInterval(playRef.current);
    return () => { if (playRef.current) clearInterval(playRef.current); };
  }, [playing, steps.length, speed]);

  const reset = () => { setStep(0); setPlaying(false); };
  const cur = steps[step];
  if (!cur) return null;

  const maxVal = isBinary ? Math.max(...BINARY_ARRAY) : Math.max(...DEFAULT_SORT_ARRAY);
  const progressPct = steps.length > 1 ? (step / (steps.length - 1)) * 100 : 0;

  return (
    <div className="bg-[#0f0f0f] rounded-2xl border border-[var(--border)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--bg2)]">
        <span className="text-xs font-black uppercase tracking-widest text-[var(--text-dim)]">
          {uiLang === 'fr' ? '🎬 Visualiseur Interactif' : '🎬 Interactive Visualizer'}
        </span>
        <span className="text-xs font-black" style={{ color: step === steps.length - 1 ? '#10b981' : '#6b7280' }}>
          {uiLang === 'fr' ? 'Étape' : 'Step'} {step + 1} / {steps.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-[var(--bg3)]">
        <motion.div
          animate={{ width: `${progressPct}%` }}
          transition={{ type: 'tween' }}
          className="h-full bg-gradient-to-r from-[var(--green)] to-teal-400"
        />
      </div>

      {/* Array Display */}
      <div className="p-5">
        {isBinary ? (
          <div className="flex items-center justify-center gap-1.5 py-4 flex-wrap">
            {cur.array.map((v: number, i: number) => {
              let bg = '#1a1a1a', border = '#333', text = '#fff', scale = 1;
              if (cur.found === i)        { bg = 'rgba(16,185,129,0.2)'; border = '#10b981'; text = '#10b981'; scale = 1.25; }
              else if (cur.mid === i)     { bg = 'rgba(59,130,246,0.2)'; border = '#3b82f6'; text = '#93c5fd'; scale = 1.15; }
              else if (i >= cur.left && i <= cur.right) { bg = 'rgba(245,158,11,0.1)'; border = 'rgba(245,158,11,0.5)'; text = '#fbbf24'; }
              return (
                <motion.div
                  key={i}
                  animate={{ scale, borderColor: border }}
                  transition={{ type: 'spring', stiffness: 250 }}
                  className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl border-2 flex flex-col items-center justify-center"
                  style={{ background: bg, borderColor: border }}
                >
                  <span className="text-sm font-black leading-none" style={{ color: text }}>{v}</span>
                  <span className="text-[8px]" style={{ color: '#555' }}>[{i}]</span>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="flex items-end justify-center gap-1 h-28">
            {cur.array.map((v: number, i: number) => {
              const h = Math.max(8, (v / maxVal) * 100);
              let color = '#10b981';
              if (cur.comparing?.includes(i)) color = '#f59e0b';
              if (cur.swapped?.includes(i))   color = '#ef4444';
              if (cur.done?.includes(i))      color = '#3b82f6';
              if (cur.pivot === i)             color = '#a855f7';
              return (
                <motion.div
                  key={i}
                  layout
                  animate={{ height: `${h}%`, backgroundColor: color }}
                  transition={{ type: 'spring', stiffness: 350, damping: 35 }}
                  className="flex-1 rounded-t-md relative"
                  style={{ maxWidth: 44 }}
                >
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-black" style={{ color }}>{v}</span>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Legend */}
        <div className="flex flex-wrap gap-3 justify-center mt-5 text-[10px] text-[var(--text-dim)]">
          {isBinary ? (
            <>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm border border-yellow-400 bg-yellow-400/20 inline-block" />{uiLang === 'fr' ? 'Zone active' : 'Active zone'}</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm border border-blue-400 bg-blue-400/20 inline-block" />mid</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm border border-green-400 bg-green-400/20 inline-block" />{uiLang === 'fr' ? 'Trouvé' : 'Found'}</span>
            </>
          ) : (
            <>
              <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded bg-green-500 inline-block" />{uiLang === 'fr' ? 'Normal' : 'Normal'}</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded bg-yellow-500 inline-block" />{uiLang === 'fr' ? 'Comparé' : 'Compared'}</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded bg-red-500 inline-block" />{uiLang === 'fr' ? 'Échangé' : 'Swapped'}</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded bg-blue-500 inline-block" />{uiLang === 'fr' ? 'Trié ✓' : 'Sorted ✓'}</span>
              {algoId === 'quick-sort' && <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded bg-purple-500 inline-block" />Pivot</span>}
            </>
          )}
        </div>
      </div>

      {/* Step Description */}
      <div className="mx-4 mb-3 p-3 bg-[var(--bg3)] border border-[var(--border)] rounded-xl min-h-[48px]">
        <AnimatePresence mode="wait">
          <motion.p
            key={step}
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.15 }}
            className="text-xs text-[var(--text-bright)] font-mono leading-relaxed"
          >
            {cur.desc}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Speed Slider */}
      <div className="mx-4 mb-3 flex items-center gap-3">
        <Gauge className="w-3.5 h-3.5 text-[var(--text-dim)] shrink-0" />
        <span className="text-[10px] text-[var(--text-dim)] font-bold uppercase tracking-wider shrink-0">{uiLang === 'fr' ? 'Vitesse' : 'Speed'}</span>
        <input
          type="range" min={1} max={5} value={speed}
          onChange={e => setSpeed(Number(e.target.value))}
          className="flex-1 h-1 accent-[var(--green)] cursor-pointer"
        />
        <span className="text-[10px] font-black text-[var(--green)] shrink-0 w-4 text-right">{speed}x</span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-2 pb-4 px-4">
        <button onClick={reset} title="Reset" className="p-2 rounded-xl bg-[var(--bg3)] hover:bg-[var(--bg2)] text-[var(--text-dim)] hover:text-white transition-all border border-[var(--border)]">
          <SkipBack className="w-4 h-4" />
        </button>
        <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
          className="flex items-center gap-1 px-3 py-2 rounded-xl bg-[var(--bg3)] hover:bg-[var(--bg2)] text-[var(--text-dim)] hover:text-white transition-all border border-[var(--border)] text-xs font-bold disabled:opacity-30">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => setPlaying(p => !p)}
          className={`flex-1 max-w-[140px] py-2 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all border ${
            playing
              ? 'bg-red-500/10 text-red-400 border-red-500/40 hover:bg-red-500/20'
              : 'bg-[var(--green)]/15 text-[var(--green)] border-[var(--green)]/40 hover:bg-[var(--green)]/25'
          }`}
        >
          {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          {playing ? (uiLang === 'fr' ? 'Pause' : 'Pause') : (uiLang === 'fr' ? 'Jouer' : 'Play')}
        </button>
        <button onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))} disabled={step >= steps.length - 1}
          className="flex items-center gap-1 px-3 py-2 rounded-xl bg-[var(--bg3)] hover:bg-[var(--bg2)] text-[var(--text-dim)] hover:text-white transition-all border border-[var(--border)] text-xs font-bold disabled:opacity-30">
          <ChevronRight className="w-4 h-4" />
        </button>
        <button onClick={() => { const s = buildSteps(); setSteps(s); reset(); }} title="Rejouer" className="p-2 rounded-xl bg-[var(--bg3)] hover:bg-[var(--bg2)] text-[var(--text-dim)] hover:text-white transition-all border border-[var(--border)]">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
