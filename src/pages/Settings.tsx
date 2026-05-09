import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useStore } from '../store/useStore';
import Seo from '../components/Seo';
import { User, Lock, Trash2, Save, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Settings() {
  const { user, signOut } = useStore();
  const [newEmail, setNewEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ email: newEmail });
    if (error) toast.error(error.message);
    else toast.success('Email de confirmation envoyé !');
    setLoading(false);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) toast.error(error.message);
    else { toast.success('Mot de passe mis à jour !'); setNewPassword(''); setCurrentPassword(''); }
    setLoading(false);
  };

  const handleDeleteAccount = async () => {
    if (!confirm('Êtes-vous sûr ? Cette action est irréversible.')) return;
    toast.error('Contactez le support pour supprimer votre compte.');
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <Seo title="Paramètres" description="Gérez votre compte CodeLearn." />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="text-4xl font-bold mb-2">Paramètres du compte</h1>
        <p className="text-[var(--text-dim)]">Gérez vos informations et préférences.</p>
      </motion.div>

      <div className="space-y-6">
        {/* Email */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-[var(--primary)]" />
            </div>
            <h2 className="text-xl font-bold">Informations du compte</h2>
          </div>
          <form onSubmit={handleUpdateEmail} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[var(--text-dim)]">Adresse email</label>
              <input
                type="email"
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
                className="w-full bg-[var(--bg3)] border border-[var(--border)] rounded-xl py-3 px-4 focus:border-[var(--primary)] outline-none transition-all text-sm"
              />
            </div>
            <button type="submit" disabled={loading} className="btn btn-primary px-6 py-2.5 rounded-xl text-sm flex items-center gap-2">
              <Save className="w-4 h-4" /> Sauvegarder
            </button>
          </form>
        </motion.div>

        {/* Password */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[var(--blue)]/10 rounded-xl flex items-center justify-center">
              <Lock className="w-5 h-5 text-[var(--blue)]" />
            </div>
            <h2 className="text-xl font-bold">Sécurité</h2>
          </div>
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[var(--text-dim)]">Nouveau mot de passe</label>
              <input
                type="password"
                minLength={6}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="Min. 6 caractères"
                className="w-full bg-[var(--bg3)] border border-[var(--border)] rounded-xl py-3 px-4 focus:border-[var(--primary)] outline-none transition-all text-sm"
              />
            </div>
            <button type="submit" disabled={loading || !newPassword} className="btn btn-primary px-6 py-2.5 rounded-xl text-sm flex items-center gap-2">
              <Save className="w-4 h-4" /> Changer le mot de passe
            </button>
          </form>
        </motion.div>

        {/* Danger zone */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card p-8 border-red-500/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-red-400">Zone dangereuse</h2>
          </div>
          <p className="text-sm text-[var(--text-dim)] mb-6">La suppression de votre compte est irréversible. Toutes vos données seront perdues.</p>
          <button onClick={handleDeleteAccount} className="btn px-6 py-2.5 rounded-xl text-sm border-red-500/50 text-red-400 hover:bg-red-500/10 flex items-center gap-2">
            <Trash2 className="w-4 h-4" /> Supprimer mon compte
          </button>
        </motion.div>
      </div>
    </div>
  );
}
