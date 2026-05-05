import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Seo from '../components/Seo';
import { Mail, UserPlus, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

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

  const handleSocialLogin = async (provider: 'github' | 'google') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin
        }
      });
      
      if (error) throw error;
    } catch (error: any) {
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

  if (success) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center text-center items-center min-h-[70vh]">
        <div className="card w-full max-w-md p-12 border border-[var(--green)]/30 bg-[var(--green)]/5">
          <div className="w-20 h-20 bg-[var(--green)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-[var(--green)]" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Email envoyé !</h1>
          <p className="text-[var(--text-dim)] mb-8 leading-relaxed">
            Nous avons envoyé un lien de confirmation à <br/><strong className="text-[var(--text-bright)]">{email}</strong>.
            <br/><br/>
            Veuillez vérifier votre boîte de réception (et vos spams).
          </p>
          <Link to="/login" className="btn btn-secondary w-full py-3">Retour à la connexion</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20 flex justify-center items-center min-h-[80vh]">
      <Seo title="Inscription" description="Rejoignez AlgoMaster et commencez votre parcours algorithmique." />
      
      <div className="card w-full max-w-md p-10 border border-[var(--border)] shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Rejoignez-nous</h1>
          <p className="text-[var(--text-dim)] text-sm">Créez votre compte en quelques secondes.</p>
        </div>


        
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-xl mb-6 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[var(--text-dim)]">Email Professionnel</label>
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
            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[var(--text-dim)]">Mot de passe</label>
            <input 
              type="password" 
              required
              placeholder="Min. 6 caractères"
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
            {loading ? 'Création...' : (
              <>Démarrer l'aventure <UserPlus className="w-4 h-4" /></>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-[var(--text-dim)]">
          Déjà un compte ? <Link to="/login" className="text-[var(--green)] font-bold hover:underline">Se connecter</Link>
        </div>
      </div>
    </div>
  );
}
