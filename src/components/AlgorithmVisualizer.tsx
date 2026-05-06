import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, RefreshCw, Gauge, ChevronLeft, ChevronRight, Activity, Terminal } from 'lucide-react';
import { useStore } from '../store/useStore';

// --- Step Generators ---
function generateBubbleSortSteps(arr: number[]) {
  const steps: any[] = [];
  const a = [...arr];
  const n = a.length;
  const done: number[] = [];
  steps.push({ array: [...a], comparing: [], swapped: [], done: [...done], desc: 'Initialisation du noyau. Tableau chargé.' });
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({ array: [...a], comparing: [j, j+1], swapped: [], done: [...done], desc: `Passe ${i+1}: Analyse de arr[${j}] vs arr[${j+1}]` });
      if (a[j] > a[j+1]) {
        [a[j], a[j+1]] = [a[j+1], a[j]];
        steps.push({ array: [...a], comparing: [], swapped: [j, j+1], done: [...done], desc: `🔄 Mutation détectée à l'index ${j}` });
      }
    }
    done.push(n - 1 - i);
  }
  done.push(0);
  steps.push({ array: [...a], comparing: [], swapped: [], done: [...done], desc: `✅ État final atteint. Séquence ordonnée.` });
  return steps;
}

function generateQuickSortSteps(arr: number[]) {
  const steps: any[] = [];
  const a = [...arr];
  const done = new Set<number>();
  steps.push({ array: [...a], comparing: [], swapped: [], pivot: -1, done: [], desc: 'Démarrage du partitionnement récursif.' });
  function qs(lo: number, hi: number) {
    if (lo >= hi) { done.add(lo); return; }
    const pivotVal = a[hi];
    steps.push({ array: [...a], comparing: [], swapped: [], pivot: hi, done: [...done], desc: `🎯 Pivot ancré à arr[${hi}] (${pivotVal})` });
    let p = lo;
    for (let j = lo; j < hi; j++) {
      steps.push({ array: [...a], comparing: [j, hi], swapped: [], pivot: hi, done: [...done], desc: `Comparaison : ${a[j]} vs ${pivotVal}` });
      if (a[j] < pivotVal) { [a[p], a[j]] = [a[j], a[p]]; if (p !== j) steps.push({ array: [...a], comparing: [], swapped: [p, j], pivot: hi, done: [...done], desc: `🔄 Swap vers zone inférieure` }); p++; }
    }
    [a[p], a[hi]] = [a[hi], a[p]];
    done.add(p);
    steps.push({ array: [...a], comparing: [], swapped: [p, hi], pivot: p, done: [...done], desc: `✅ Segment stabilisé à l'index ${p}` });
    qs(lo, p - 1); qs(p + 1, hi);
  }
  qs(0, a.length - 1);
  steps.push({ array: [...a], comparing: [], swapped: [], pivot: -1, done: a.map((_, i) => i), desc: `✅ Algorithme terminé. Convergence totale.` });
  return steps;
}

function generateBinarySearchSteps(arr: number[], target: number) {
  const steps: any[] = [];
  let l = 0, r = arr.length - 1, found = -1;
  steps.push({ array: arr, left: l, right: r, mid: -1, found: -1, desc: `Recherche dichotomique de ${target}` });
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    steps.push({ array: arr, left: l, right: r, mid, found: -1, desc: `Analyse du milieu (index ${mid}) : ${arr[mid]}` });
    if (arr[mid] === target) { found = mid; break; }
    else if (arr[mid] < target) l = mid + 1;
    else r = mid - 1;
  }
  steps.push({ array: arr, left: l, right: r, mid: found, found, desc: found !== -1 ? `🎉 Cible localisée à l'index ${found}` : `❌ Échec : Cible absente du set.` });
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
    <div className="glass rounded-[32px] border-white/5 overflow-hidden shadow-2xl bg-white/[0.01]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <Activity size={18} className="text-[var(--green)]" />
          <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-dim)]">
            Execution Tracer
          </span>
        </div>
        <div className="px-3 py-1 rounded-full glass border-white/10 text-[10px] font-black text-white/50 uppercase">
          Step {step + 1} of {steps.length}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 bg-white/5">
        <motion.div
          animate={{ width: `${progressPct}%` }}
          transition={{ type: 'tween' }}
          className="h-full bg-gradient-to-r from-[var(--green)] to-[var(--blue)] shadow-[0_0_10px_var(--green)]"
        />
      </div>

      {/* Array Display */}
      <div className="p-10">
        {isBinary ? (
          <div className="flex items-center justify-center gap-3 py-8 flex-wrap">
            {cur.array.map((v: number, i: number) => {
              let bg = 'rgba(255,255,255,0.02)', border = 'rgba(255,255,255,0.05)', text = 'rgba(255,255,255,0.4)', scale = 1, shadow = 'none';
              if (cur.found === i)        { bg = 'rgba(16,185,129,0.1)'; border = 'var(--green)'; text = 'var(--green)'; scale = 1.1; shadow = '0 0 30px rgba(16,185,129,0.2)'; }
              else if (cur.mid === i)     { bg = 'rgba(59,130,246,0.1)'; border = 'var(--blue)'; text = 'var(--blue)'; scale = 1.05; }
              else if (i >= cur.left && i <= cur.right) { bg = 'rgba(255,255,255,0.05)'; border = 'rgba(255,255,255,0.2)'; text = 'white'; }
              return (
                <motion.div
                  key={i}
                  animate={{ scale, borderColor: border, boxShadow: shadow }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="w-14 h-14 rounded-2xl border-2 flex flex-col items-center justify-center glass"
                  style={{ background: bg }}
                >
                  <span className="text-sm font-black" style={{ color: text }}>{v}</span>
                  <span className="text-[8px] opacity-20 font-mono">#{i}</span>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="flex items-end justify-center gap-2 h-40">
            {cur.array.map((v: number, i: number) => {
              const h = Math.max(10, (v / maxVal) * 100);
              let color = 'rgba(255,255,255,0.1)';
              let glow = 'none';
              if (cur.comparing?.includes(i)) { color = 'var(--yellow)'; glow = '0 0 20px rgba(241,196,15,0.3)'; }
              if (cur.swapped?.includes(i))   { color = '#ef4444'; glow = '0 0 20px rgba(239,68,68,0.3)'; }
              if (cur.done?.includes(i))      { color = 'var(--green)'; glow = '0 0 20px rgba(16,185,129,0.2)'; }
              if (cur.pivot === i)            { color = '#a855f7'; glow = '0 0 20px rgba(168,85,247,0.3)'; }
              return (
                <motion.div
                  key={i}
                  layout
                  animate={{ height: `${h}%`, backgroundColor: color, boxShadow: glow }}
                  transition={{ type: 'spring', stiffness: 350, damping: 35 }}
                  className="flex-1 rounded-xl relative border border-white/5"
                  style={{ maxWidth: 40 }}
                >
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] font-black opacity-50" style={{ color }}>{v}</span>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Legend */}
        <div className="flex flex-wrap gap-6 justify-center mt-12">
          {[
            { label: 'Normal', color: 'rgba(255,255,255,0.1)' },
            { label: 'Analysé', color: 'var(--yellow)' },
            { label: 'Swapped', color: '#ef4444' },
            { label: 'Trié', color: 'var(--green)' },
            ...(algoId === 'quick-sort' ? [{ label: 'Pivot', color: '#a855f7' }] : [])
          ].map(l => (
            <div key={l.label} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.color }} />
              <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-dim)]">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Description */}
      <div className="mx-8 mb-6 p-4 rounded-2xl glass border-white/5 min-h-[64px] bg-white/[0.01] flex items-center gap-4">
        <Terminal size={18} className="text-white/20 shrink-0" />
        <AnimatePresence mode="wait">
          <motion.p
            key={step}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-[var(--text)] font-medium leading-relaxed"
          >
            {cur.desc}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Speed Slider */}
      <div className="mx-8 mb-8 flex items-center gap-6">
        <div className="flex items-center gap-3 shrink-0">
          <Gauge size={16} className="text-[var(--text-dim)]" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-dim)]">Vitesse Flux</span>
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
      <div className="bg-white/[0.02] px-8 py-6 flex items-center justify-between border-t border-white/5">
        <div className="flex items-center gap-2">
          <button onClick={reset} className="p-3 rounded-2xl glass border-white/10 hover:bg-white/5 transition-all text-white/50 hover:text-white">
            <SkipBack size={18} />
          </button>
          <div className="flex items-center gap-1 glass border-white/10 rounded-2xl p-1">
            <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} className="p-2 rounded-xl hover:bg-white/5 transition-all text-white/50 hover:text-white disabled:opacity-0">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))} disabled={step >= steps.length - 1} className="p-2 rounded-xl hover:bg-white/5 transition-all text-white/50 hover:text-white disabled:opacity-0">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <button
          onClick={() => setPlaying(p => !p)}
          className={`px-10 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 transition-all ${
            playing
              ? 'bg-red-500/10 text-red-400 border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.15)]'
              : 'bg-[var(--green)]/10 text-[var(--green)] border border-[var(--green)]/20 shadow-[0_0_30px_rgba(16,185,129,0.15)]'
          }`}
        >
          {playing ? <Pause size={18} /> : <Play size={18} className="fill-current" />}
          {playing ? 'Pause Engine' : 'Resume Engine'}
        </button>

        <button onClick={() => { const s = buildSteps(); setSteps(s); reset(); }} className="p-3 rounded-2xl glass border-white/10 hover:bg-white/5 transition-all text-white/50 hover:text-white">
          <RefreshCw size={18} />
        </button>
      </div>
    </div>
  );
}
