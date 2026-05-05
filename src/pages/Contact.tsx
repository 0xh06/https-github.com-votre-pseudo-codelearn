import { useState } from 'react';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate sending (connect to Supabase Edge Function or EmailJS in production)
    await new Promise(r => setTimeout(r, 1500));
    setSent(true);
    toast.success('Message envoyé ! Nous vous répondrons sous 48h.');
    setLoading(false);
  };

  if (sent) {
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
          <h1 className="text-2xl font-bold mb-3">Message envoyé !</h1>
          <p className="text-[var(--text-dim)]">Nous vous répondrons dans les plus brefs délais.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20 max-w-2xl">
      <Seo title="Contact" description="Contactez l'équipe AlgoMaster." />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <div className="w-16 h-16 bg-[var(--green)]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <MessageSquare className="w-8 h-8 text-[var(--green)]" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Contactez-nous</h1>
        <p className="text-[var(--text-dim)]">Une question, un bug, une suggestion ? On est là.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[var(--text-dim)]">Nom</label>
              <input
                type="text"
                required
                placeholder="Votre nom"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-[var(--bg3)] border border-[var(--border)] rounded-xl py-3 px-4 focus:border-[var(--green)] outline-none transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[var(--text-dim)]">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-dim)]" />
                <input
                  type="email"
                  required
                  placeholder="vous@exemple.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-[var(--bg3)] border border-[var(--border)] rounded-xl py-3 pl-10 pr-4 focus:border-[var(--green)] outline-none transition-all text-sm"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[var(--text-dim)]">Message</label>
            <textarea
              required
              rows={6}
              placeholder="Décrivez votre demande..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="w-full bg-[var(--bg3)] border border-[var(--border)] rounded-xl py-3 px-4 focus:border-[var(--green)] outline-none transition-all text-sm resize-none"
            />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2">
            {loading ? <><div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> Envoi...</> : <><Send className="w-4 h-4" /> Envoyer le message</>}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
