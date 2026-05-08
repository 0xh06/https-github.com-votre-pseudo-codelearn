import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { useEffect, useState } from 'react';
import { Home, RotateCcw } from 'lucide-react';

const GLITCH_CHARS = '!@#$%^&*()_+{}[]|;<>?,./\\`~0123456789ABCDEF';

function GlitchText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(prev =>
        text.split('').map((char, i) => {
          if (i < iteration) return text[i];
          return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        }).join('')
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 0.5;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <>{display}</>;
}

export default function NotFound() {
  const [decoded, setDecoded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDecoded(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <Seo title="404 — Page introuvable" description="Cette page n'existe pas." noIndex />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center max-w-lg"
      >
        {/* Glitch 404 */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="relative mb-8"
        >
          <div className="text-[10rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-br from-[var(--primary)] to-[var(--blue)] select-none">
            404
          </div>
          <div
            className="absolute inset-0 text-[10rem] font-black leading-none text-[var(--primary)] opacity-20 blur-lg select-none"
            aria-hidden
          >
            404
          </div>
        </motion.div>

        {/* Terminal block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#0d1117] border border-[var(--border)] rounded-2xl p-6 font-mono text-left mb-8 shadow-2xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-indigo-500" />
            <span className="ml-2 text-xs text-[var(--text-dim)]">terminal</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="text-[var(--text-dim)]"><span className="text-[var(--primary)]">$</span> navigate_to current_page</div>
            <div className="text-red-400">Error: Route not found in filesystem</div>
            <div className="text-[var(--text-dim)]"><span className="text-[var(--primary)]">$</span> {decoded ? 'Suggestion: return to /' : <GlitchText text="Suggestion: return to /" />}</div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-2xl font-bold mb-3"
        >
          Page introuvable
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-[var(--text-dim)] mb-8"
        >
          Le contenu demandé n'existe pas ou a été déplacé.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex gap-4 justify-center"
        >
          <Link to="/" className="btn btn-primary px-6 py-3 rounded-xl flex items-center gap-2">
            <Home className="w-4 h-4" /> Retour à l'accueil
          </Link>
          <button onClick={() => window.history.back()} className="btn btn-secondary px-6 py-3 rounded-xl flex items-center gap-2">
            <RotateCcw className="w-4 h-4" /> Page précédente
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
