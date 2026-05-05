import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Seo from '../components/Seo';
import { KeyRound, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase sends the token via URL hash on redirect
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        // user is in password recovery mode
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center items-center min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card w-full max-w-md p-12 text-center border-[var(--green)]/30 bg-[var(--green)]/5"
        >
          <div className="w-20 h-20 bg-[var(--green)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-[var(--green)]" />
          </div>
          <h1 className="text-2xl font-bold mb-3">Mot de passe mis à jour !</h1>
          <p className="text-[var(--text-dim)]">Redirection vers la connexion...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20 flex justify-center items-center min-h-[80vh]">
      <Seo title="Nouveau mot de passe" description="Réinitialisez votre mot de passe AlgoMaster." />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card w-full max-w-md p-10 border border-[var(--border)] shadow-2xl"
      >
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-[var(--green)]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <KeyRound className="w-7 h-7 text-[var(--green)]" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Nouveau mot de passe</h1>
          <p className="text-[var(--text-dim)] text-sm">Choisissez un mot de passe sécurisé.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-xl mb-6 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[var(--text-dim)]">Nouveau mot de passe</label>
            <input
              type="password"
              required
              minLength={6}
              placeholder="Min. 6 caractères"
              className="w-full bg-[var(--bg3)] border border-[var(--border)] rounded-xl py-3 px-4 focus:border-[var(--green)] outline-none transition-all text-sm"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[var(--text-dim)]">Confirmer</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full bg-[var(--bg3)] border border-[var(--border)] rounded-xl py-3 px-4 focus:border-[var(--green)] outline-none transition-all text-sm"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 mt-6"
          >
            {loading ? 'Mise à jour...' : <><span>Confirmer</span><ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
