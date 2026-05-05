import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useStore } from '../store/useStore';
import Seo from '../components/Seo';
import { Mail, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const setUser = useStore(state => state.setUser);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setUser(data.user);
      navigate('/');
    }
    setLoading(false);
  };

  const handleSocialLogin = async (provider: 'github' | 'google') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin
      }
    });

    if (error) {
      if (error.message?.includes("provider is not enabled")) {
        const msg = `L'authentification ${provider} n'est pas activée. Configurez-la dans Supabase (Authentication > Providers).`;
        setError(msg);
        toast.error(msg, { duration: 5000 });
      } else {
        setError(error.message);
        toast.error(`Erreur ${provider}: ${error.message}`);
      }
    }
  };

  const handleResetPassword = async () => {
    if (!email) return toast.error('Veuillez entrer votre email pour réinitialiser le mot de passe.');
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) toast.error(error.message);
    else toast.success('Lien de réinitialisation envoyé ! Vérifiez vos emails.');
  };

  return (
    <div className="container mx-auto px-4 py-20 flex justify-center items-center min-h-[80vh]">
      <Seo title="Connexion" description="Connectez-vous à votre compte AlgoMaster." />

      <div className="card w-full max-w-md p-10 border border-[var(--border)] shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Bon retour !</h1>
          <p className="text-[var(--text-dim)] text-sm">Continuez votre progression là où vous vous étiez arrêté.</p>
        </div>



        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-xl mb-6 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[var(--text-dim)]">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-dim)]" />
              <input
                type="email"
                required
                placeholder="nom@exemple.com"
                className="w-full bg-[var(--bg3)] border border-[var(--border)] rounded-xl py-3 pl-10 pr-4 focus:border-[var(--green)] outline-none transition-all text-sm"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-[var(--text-dim)]">Mot de passe</label>
              <button
                type="button"
                onClick={handleResetPassword}
                className="text-[10px] text-[var(--green)] hover:underline"
              >
                Mot de passe oublié ?
              </button>
            </div>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full bg-[var(--bg3)] border border-[var(--border)] rounded-xl py-3 px-4 focus:border-[var(--green)] outline-none transition-all text-sm"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 mt-6"
          >
            {loading ? 'Connexion...' : (
              <>Se connecter <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-[var(--text-dim)]">
          Nouveau ici ? <Link to="/signup" className="text-[var(--green)] font-bold hover:underline">Créer un compte</Link>
        </div>
      </div>
    </div>
  );
}
