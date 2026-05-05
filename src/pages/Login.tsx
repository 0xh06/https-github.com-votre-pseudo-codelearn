import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useStore } from '../store/useStore';
import Seo from '../components/Seo';

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

  return (
    <div className="container mx-auto px-4 py-20 flex justify-center">
      <Seo title="Connexion" description="Connectez-vous a votre compte CodeLearn." />
      <div className="card w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Bon retour !</h1>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-[var(--text-dim)]">Email</label>
            <input 
              type="email" 
              required
              className="w-full bg-[var(--bg3)] border border-[var(--border)] rounded p-2 focus:border-[var(--green)] outline-none transition-colors"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-[var(--text-dim)]">Mot de passe</label>
            <input 
              type="password" 
              required
              className="w-full bg-[var(--bg3)] border border-[var(--border)] rounded p-2 focus:border-[var(--green)] outline-none transition-colors"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary w-full py-2 mt-4"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-[var(--text-dim)]">
          Pas encore de compte ? <Link to="/signup" className="text-[var(--green)] hover:underline">S'inscrire</Link>
        </div>
      </div>
    </div>
  );
}
