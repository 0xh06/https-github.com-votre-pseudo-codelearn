import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Circle } from 'lucide-react';

const CODE_SNIPPETS = [
  {
    lang: 'JavaScript',
    code: 'function binarySearch(arr, target) {\n  let left = 0, right = arr.length - 1;\n  while (left <= right) {\n    let mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}'
  },
  {
    lang: 'Python',
    code: 'def quicksort(arr):\n    if len(arr) <= 1: return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quicksort(left) + middle + quicksort(right)'
  }
];

export default function HeroTerminal() {
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let currentCode = CODE_SNIPPETS[snippetIndex].code;
    let charIndex = 0;
    
    setDisplayedCode('');
    setIsTyping(true);

    const interval = setInterval(() => {
      if (charIndex < currentCode.length) {
        setDisplayedCode((prev) => prev + currentCode[charIndex]);
        charIndex++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        setTimeout(() => {
          setSnippetIndex((prev) => (prev + 1) % CODE_SNIPPETS.length);
        }, 3000);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [snippetIndex]);

  return (
    <div className="w-full max-w-2xl mx-auto glass rounded-2xl border-white/10 shadow-3xl overflow-hidden font-mono text-xs md:text-sm">
      <div className="bg-white/5 px-4 py-3 border-b border-white/5 flex items-center justify-between">
        <div className="flex gap-1.5">
          <Circle size={10} className="fill-red-500/50 text-red-500/50" />
          <Circle size={10} className="fill-yellow-500/50 text-yellow-500/50" />
          <Circle size={10} className="fill-green-500/50 text-green-500/50" />
        </div>
        <div className="flex items-center gap-2 text-[var(--text-dim)] font-black uppercase tracking-widest text-[10px]">
          <Terminal size={12} /> {CODE_SNIPPETS[snippetIndex].lang}
        </div>
        <div className="w-12" /> {/* Spacer */}
      </div>
      <div className="p-6 min-h-[220px] bg-[#0a0a0a]/80 backdrop-blur-xl relative">
        <pre className="text-blue-400">
          <code>{displayedCode}</code>
          {isTyping && (
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-2 h-4 bg-[var(--primary)] ml-1 align-middle"
            />
          )}
        </pre>
        
        {/* Floating background code blurbs */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="w-40 h-40 bg-[var(--primary)]/10 blur-[60px] rounded-full" />
        </div>
      </div>
      <div className="bg-white/5 px-4 py-2 border-t border-white/5 flex items-center justify-between text-[10px] text-[var(--text-dim)]">
        <span>Ready to compile...</span>
        <span className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
          System Online
        </span>
      </div>
    </div>
  );
}
