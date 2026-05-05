import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Seo from '../components/Seo';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center text-center">
        <div className="card w-full max-w-md">
          <div className="text-4xl mb-4">📧</div>
          <h1 className="text-2xl font-bold mb-4">Vérifiez vos emails</h1>
          <p className="text-[var(--text-dim)]">
            Nous avons envoye un lien de confirmation a <strong>{email}</strong>.
          </p>
          <Link to="/login" className="btn btn-secondary mt-8 w-full py-2">Retour a la connexion</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20 flex justify-center">
      <Seo title="Inscription" description="Creez votre compte CodeLearn gratuit." />
      <div className="card w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Créer un compte</h1>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
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
            <p className="text-[10px] text-[var(--text-dim)] mt-1">Min. 6 caractères.</p>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary w-full py-2 mt-4"
          >
            {loading ? 'Création...' : 'S\'inscrire'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-[var(--text-dim)]">
          Déjà un compte ? <Link to="/login" className="text-[var(--green)] hover:underline">Se connecter</Link>
        </div>
      </div>
    </div>
  );
}
