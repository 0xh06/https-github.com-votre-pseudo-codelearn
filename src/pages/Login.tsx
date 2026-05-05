import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useStore } from '../store/useStore';
import Seo from '../components/Seo';
import { Github, Mail, ArrowRight } from 'lucide-react';

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
    if (error) setError(error.message);
  };

  return (
    <div className="container mx-auto px-4 py-20 flex justify-center items-center min-h-[80vh]">
      <Seo title="Connexion" description="Connectez-vous a votre compte CodeLearn." />
      
      <div className="card w-full max-w-md p-10 border border-[var(--border)] shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Bon retour !</h1>
          <p className="text-[var(--text-dim)] text-sm">Continuez votre progression sur CodeLearn.</p>
        </div>

        {/* Social Buttons */}
        <div className="space-y-3 mb-8">
          <button 
            onClick={() => handleSocialLogin('github')}
            className="w-full flex items-center justify-center gap-3 bg-[#24292e] hover:bg-[#2f363d] text-white py-3 rounded-xl font-bold transition-all"
          >
            <Github className="w-5 h-5" />
            Continuer avec GitHub
          </button>
          <button 
            onClick={() => handleSocialLogin('google')}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-black py-3 rounded-xl font-bold transition-all border border-gray-200"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
            Continuer avec Google
          </button>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[var(--border)]"></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-[var(--bg2)] px-4 text-[var(--text-dim)] font-bold">Ou avec email</span></div>
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
              <a href="#" className="text-[10px] text-[var(--green)] hover:underline">Oublié ?</a>
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
