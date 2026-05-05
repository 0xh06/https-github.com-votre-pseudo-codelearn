import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Seo from '../components/Seo';
import { Mail, UserPlus, CheckCircle } from 'lucide-react';

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
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin
      }
    });
    
    if (error) {
      if (error.message.includes("provider is not enabled")) {
        setError(`L'authentification via ${provider} n'est pas encore activée dans le dashboard Supabase. Veuillez l'activer dans Authentication > Providers.`);
      } else {
        setError(error.message);
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
      <Seo title="Inscription" description="Rejoignez CodeLearn et commencez votre aventure." />
      
      <div className="card w-full max-w-md p-10 border border-[var(--border)] shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Rejoignez-nous</h1>
          <p className="text-[var(--text-dim)] text-sm">Créez votre compte en quelques secondes.</p>
        </div>

        {/* Social Buttons */}
        <div className="space-y-3 mb-8">
          <button 
            onClick={() => handleSocialLogin('github')}
            className="w-full flex items-center justify-center gap-3 bg-[#24292e] hover:bg-[#2f363d] text-white py-3 rounded-xl font-bold transition-all"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            S'inscrire avec GitHub
          </button>
          <button 
            onClick={() => handleSocialLogin('google')}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-black py-3 rounded-xl font-bold transition-all border border-gray-200"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
            S'inscrire avec Google
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
