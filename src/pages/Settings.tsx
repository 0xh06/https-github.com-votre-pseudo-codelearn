import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useStore } from '../store/useStore';
import Seo from '../components/Seo';
import { User, Lock, Trash2, Save, Github, Link as LinkIcon, Unlink, AtSign } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Settings() {
  const { user, username, setUsername, signOut } = useStore();
  const [newEmail, setNewEmail] = useState(user?.email || '');
  const [newPseudo, setNewPseudo] = useState(username || '');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [identities, setIdentities] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      setNewEmail(user.email || '');
      setIdentities(user.identities || []);
    }
  }, [user]);

  useEffect(() => {
    if (username) setNewPseudo(username);
  }, [username]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Update Pseudo in DB via store
      setUsername(newPseudo);
      
      // Update email if changed
      if (newEmail !== user?.email) {
        const { error } = await supabase.auth.updateUser({ email: newEmail });
        if (error) throw error;
        toast.success('Email de confirmation envoyé !');
      } else {
        toast.success('Pseudo mis à jour !');
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) toast.error(error.message);
    else { 
      toast.success('Mot de passe mis à jour !'); 
      setNewPassword(''); 
    }
    setLoading(false);
  };

  const handleLinkGithub = async () => {
    setLoading(true);
    const { error } = await supabase.auth.linkIdentity({ provider: 'github' });
    if (error) toast.error(error.message);
    setLoading(false);
  };

  const handleUnlinkGithub = async (identityId: string) => {
    if (!confirm('Voulez-vous vraiment délier votre compte GitHub ?')) return;
    setLoading(true);
    const { error } = await supabase.auth.unlinkIdentity(identityId);
    if (error) toast.error(error.message);
    else {
      toast.success('GitHub délié !');
      // Refresh user identities would be ideal here, or just let the session update
    }
    setLoading(false);
  };

  const githubIdentity = identities.find(i => i.provider === 'github');

  const handleDeleteAccount = async () => {
    if (!confirm('Êtes-vous sûr ? Cette action est irréversible.')) return;
    toast.error('Contactez le support pour supprimer votre compte.');
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <Seo title="Paramètres" description="Gérez votre compte CodeLearn." />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-black mb-2 tracking-tighter">Paramètres</h1>
        <p className="text-[var(--text-dim)] font-medium">Gérez votre identité numérique et la sécurité de votre compte.</p>
      </motion.div>

      <div className="space-y-6">
        {/* Profile Info */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-8 border border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-2xl flex items-center justify-center border border-[var(--primary)]/20 shadow-[0_0_15px_var(--primary-glow)]">
              <User className="w-6 h-6 text-[var(--primary)]" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight">Profil Public</h2>
              <p className="text-[10px] uppercase tracking-widest font-bold text-[var(--text-dim)]">Identité & Contact</p>
            </div>
          </div>
          
          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-[var(--text-dim)]">Pseudo d'avatar</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-dim)]" />
                  <input
                    type="text"
                    value={newPseudo}
                    onChange={e => setNewPseudo(e.target.value)}
                    placeholder="Votre pseudo..."
                    className="w-full bg-[var(--bg3)] border border-[var(--border)] rounded-2xl py-3.5 pl-12 pr-4 focus:border-[var(--primary)] outline-none transition-all text-sm font-bold shadow-inner"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-[var(--text-dim)]">Adresse Email</label>
                <div className="relative">
                  <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-dim)]" />
                  <input
                    type="email"
                    value={newEmail}
                    onChange={e => setNewEmail(e.target.value)}
                    className="w-full bg-[var(--bg3)] border border-[var(--border)] rounded-2xl py-3.5 pl-12 pr-4 focus:border-[var(--primary)] outline-none transition-all text-sm font-bold shadow-inner"
                  />
                </div>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn btn-primary px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-[0_4px_15px_var(--primary-glow)]">
              <Save className="w-4 h-4" /> Mettre à jour le profil
            </button>
          </form>
        </motion.div>

        {/* Password */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-8 border border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-[var(--blue)]/10 rounded-2xl flex items-center justify-center border border-[var(--blue)]/20 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <Lock className="w-6 h-6 text-[var(--blue)]" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight">Sécurité</h2>
              <p className="text-[10px] uppercase tracking-widest font-bold text-[var(--text-dim)]">Mot de passe</p>
            </div>
          </div>
          
          <form onSubmit={handleUpdatePassword} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-[var(--text-dim)]">Nouveau mot de passe</label>
              <input
                type="password"
                minLength={6}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="Laissez vide pour ne pas changer"
                className="w-full bg-[var(--bg3)] border border-[var(--border)] rounded-2xl py-3.5 px-6 focus:border-[var(--primary)] outline-none transition-all text-sm font-bold shadow-inner"
              />
            </div>
            <button type="submit" disabled={loading || !newPassword} className="btn px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest border border-white/10 hover:bg-white/5 transition-all flex items-center gap-2">
              <Lock className="w-4 h-4" /> Changer le mot de passe
            </button>
          </form>
        </motion.div>

        {/* Social Accounts */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card p-8 border border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
              <LinkIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight">Comptes liés</h2>
              <p className="text-[10px] uppercase tracking-widest font-bold text-[var(--text-dim)]">OAuth providers</p>
            </div>
          </div>
          
          <div className="p-5 rounded-2xl bg-black/20 border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#24292e] rounded-xl flex items-center justify-center shadow-lg">
                <Github className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">GitHub</div>
                <div className="text-[10px] font-medium text-[var(--text-dim)]">
                  {githubIdentity ? `Connecté en tant que ${githubIdentity.identity_data?.user_name || 'utilisateur'}` : 'Non connecté'}
                </div>
              </div>
            </div>
            
            {githubIdentity ? (
              <button 
                onClick={() => handleUnlinkGithub(githubIdentity.id)}
                disabled={loading}
                className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all"
                title="Délier GitHub"
              >
                <Unlink size={18} />
              </button>
            ) : (
              <button 
                onClick={handleLinkGithub}
                disabled={loading}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
                title="Lier GitHub"
              >
                <LinkIcon size={18} />
              </button>
            )}
          </div>
        </motion.div>

        {/* Danger zone */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card p-8 border border-red-500/20 bg-red-500/[0.01]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center border border-red-500/20">
              <Trash2 className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight text-red-400">Zone dangereuse</h2>
              <p className="text-[10px] uppercase tracking-widest font-bold text-red-400/60">Actions irréversibles</p>
            </div>
          </div>
          <p className="text-sm font-medium text-[var(--text-dim)] mb-8 leading-relaxed">La suppression de votre compte effacera définitivement toute votre progression, XP, et configurations d'avatar. Cette action ne peut pas être annulée.</p>
          <button onClick={handleDeleteAccount} className="w-full md:w-auto px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest border border-red-500/50 text-red-400 hover:bg-red-500/10 transition-all flex items-center justify-center gap-2">
            <Trash2 className="w-4 h-4" /> Supprimer mon compte
          </button>
        </motion.div>
      </div>
    </div>
  );
}
