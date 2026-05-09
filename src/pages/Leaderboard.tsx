import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Seo from '../components/Seo';
import { supabase } from '../lib/supabase';
import { useStore } from '../store/useStore';
import { Trophy, Medal, Crown, Flame, Star, Zap, ChevronUp } from 'lucide-react';
import AvatarRenderer from '../components/AvatarRenderer';

interface LeaderboardEntry {
  id: string;
  email: string;
  xp: number;
  streak: number;
  rank: number;
}

const MOCK_LEADERS: LeaderboardEntry[] = [
  { id: '1', email: 'alex.dev@gmail.com', xp: 8450, streak: 45, rank: 1 },
  { id: '2', email: 'sophie.coder@gmail.com', xp: 7290, streak: 32, rank: 2 },
  { id: '3', email: 'maxime.algo@gmail.com', xp: 6340, streak: 28, rank: 3 },
  { id: '4', email: 'lea.tech@gmail.com', xp: 5180, streak: 15, rank: 4 },
  { id: '5', email: 'thomas.fullstack@gmail.com', xp: 4650, streak: 12, rank: 5 },
  { id: '6', email: 'clara.js@gmail.com', xp: 3420, streak: 10, rank: 6 },
  { id: '7', email: 'nicolas.py@gmail.com', xp: 2200, streak: 8, rank: 7 },
  { id: '8', email: 'julie.react@gmail.com', xp: 1980, streak: 5, rank: 8 },
  { id: '9', email: 'hugo.code@gmail.com', xp: 1750, streak: 4, rank: 9 },
  { id: '10', email: 'sarah.css@gmail.com', xp: 1620, streak: 3, rank: 10 },
];

function getPseudo(email: string) {
  if (!email) return 'Anonyme';
  return email.split('@')[0];
}

const rankIcon = (rank: number) => {
  if (rank === 1) return <Crown className="w-6 h-6 text-yellow-400" />;
  if (rank === 2) return <Medal className="w-6 h-6 text-slate-300" />;
  if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />;
  return <span className="w-6 h-6 flex items-center justify-center text-xs font-black text-[var(--text-dim)]">#{rank}</span>;
};

export default function Leaderboard() {
  const { xp, user, avatar } = useStore();
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<number | null>(null);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        // Fetch real users from profiles table if it exists
        const { data, error } = await supabase
          .from('profiles')
          .select('id, email, xp, streak, avatar_config')
          .order('xp', { ascending: false })
          .limit(50);

        let combined = [];

        if (!error && data && data.length > 0) {
          combined = data.map(row => ({
            id: row.id,
            email: row.email || 'Anonyme',
            xp: row.xp || 0,
            streak: row.streak || 0,
            rank: 0,
            avatar: row.avatar_config
          }));
        } else {
          // Fallback to mock data if the profiles table is not yet set up
          combined = [...MOCK_LEADERS];
        }

        if (user) {
          const existingIdx = combined.findIndex(l => l.id === user.id);
          if (existingIdx !== -1) {
            combined[existingIdx].xp = Math.max(combined[existingIdx].xp, xp);
          } else {
            const userEntry = {
              id: user.id,
              email: user.email || 'Anonyme',
              xp,
              streak: 1, // Placeholder
              rank: 0,
              avatar: avatar
            };
            combined.push(userEntry);
          }
        }
        
        combined.sort((a, b) => b.xp - a.xp);
        combined.forEach((l, i) => (l.rank = i + 1));
        
        const userRankFound = combined.find(l => l.id === user?.id)?.rank;
        setUserRank(userRankFound || null);
        setLeaders(combined.slice(0, 50));
      } catch (err) {
        console.error('Erreur lors du chargement du classement:', err);
      }
    }

    fetchLeaderboard();
  }, [xp, user, avatar]);

  return (
    <div className="container mx-auto px-4 py-24 relative overflow-hidden">
      <Seo title="Classement | Les Maîtres du Code" description="Découvre qui domine le classement CodeLearn." />

      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-yellow-400/5 blur-[120px] pointer-events-none -z-10" />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-24 space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400">
          <Trophy size={16} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Panthéon des Héros</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">LE TOP <span className="premium-gradient">1%</span></h1>
        <p className="text-[var(--text-dim)] text-xl max-w-xl mx-auto font-medium">
          Ceux qui repoussent les limites de l'algorithmique chaque jour.
        </p>

        {userRank && (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-block px-8 py-3 bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-2xl"
          >
            <div className="flex items-center gap-3">
              <Star className="text-[var(--primary)]" size={20} fill="currentColor" />
              <span className="font-black text-white uppercase tracking-widest text-sm">Ta Position : <span className="text-[var(--primary)]">#{userRank}</span></span>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Podium Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 items-end max-w-5xl mx-auto">
        {[leaders[1], leaders[0], leaders[2]].map((leader, i) => {
          if (!leader) return <div key={i} />;
          const isWinner = i === 1;
          const posLabel = i === 1 ? '1er' : i === 0 ? '2ème' : '3ème';
          const posColor = i === 1 ? 'text-yellow-400' : i === 0 ? 'text-slate-300' : 'text-amber-600';
          const posGlow = i === 1 ? 'rgba(250, 204, 21, 0.2)' : i === 0 ? 'rgba(203, 213, 225, 0.15)' : 'rgba(180, 83, 9, 0.15)';
          
          return (
            <motion.div
              key={leader.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.3 }}
              className={`relative flex flex-col items-center group ${isWinner ? 'order-first md:order-none' : ''}`}
            >
              <div 
                className={`absolute inset-0 blur-[60px] rounded-full transition-opacity opacity-0 group-hover:opacity-100`} 
                style={{ backgroundColor: posGlow }}
              />
              
              <div className="relative mb-6">
                <div className={`absolute -top-6 left-1/2 -translate-x-1/2 ${posColor}`}>
                  {i === 1 ? <Crown size={32} /> : <Medal size={28} />}
                </div>
                <div className={`p-1 rounded-[40px] border-2 ${isWinner ? 'border-yellow-400' : 'border-white/10'} shadow-2xl overflow-hidden glass`}>
                  <AvatarRenderer 
                    config={(leader as any).avatar || (leader.id === user?.id ? avatar : {
                      skin: i === 0 ? 'tan' : i === 1 ? 'light' : 'brown',
                      hair: i === 0 ? 'fluffy' : 'short',
                      hairColor: i === 0 ? 'pink' : 'black',
                      expression: 'happy',
                      eyeColor: '#2D1B11',
                      clothes: 'overalls',
                      clothesColor: i === 1 ? '#F1C40F' : '#3498DB',
                      accessory: i === 1 ? 'expert-crown' : null
                    })} 
                    size={isWinner ? 160 : 120} 
                  />
                </div>
              </div>

              <div className="text-center space-y-2 relative z-10">
                <div className={`text-[10px] font-black uppercase tracking-[0.3em] ${posColor}`}>{posLabel} Place</div>
                <div className="text-xl font-black text-white">{getPseudo(leader.email)}</div>
                <div className="text-2xl font-black text-white flex items-center justify-center gap-2">
                  {leader.xp.toLocaleString()}
                  <span className="text-[10px] text-[var(--text-dim)] uppercase tracking-widest">XP</span>
                </div>
              </div>

              {/* Pedestal */}
              <div 
                className={`w-full mt-8 rounded-t-[32px] glass border-white/5 relative overflow-hidden ${isWinner ? 'h-32 bg-yellow-400/10' : i === 0 ? 'h-24 bg-white/5' : 'h-16 bg-white/5'}`}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Detailed Ranking List */}
      <div className="max-w-4xl mx-auto space-y-3">
        <div className="px-8 py-4 flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-dim)]">
          <div className="w-16 text-center">Rang</div>
          <div className="flex-1 ml-16">Utilisateur</div>
          <div className="w-32 text-center">Série</div>
          <div className="w-32 text-right">Score XP</div>
        </div>
        
        {leaders.slice(3).map((leader, i) => {
          const isMe = user && leader.id === user.id;
          return (
            <motion.div
              key={leader.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`group flex items-center p-6 rounded-[32px] glass border transition-all ${
                isMe
                  ? 'border-[var(--primary)]/50 bg-[var(--primary)]/10 shadow-[0_10px_40px_rgba(99,102,241,0.1)]'
                  : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10'
              }`}
            >
              <div className="w-16 flex items-center justify-center">
                {rankIcon(leader.rank)}
              </div>
              
              <div className="flex-1 flex items-center gap-6 ml-8">
                <div className="w-14 h-14 rounded-2xl glass border-white/10 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform">
                  <AvatarRenderer 
                    config={isMe ? avatar : {
                      skin: 'tan', hair: 'short', hairColor: 'black', expression: 'neutral',
                      eyeColor: '#2D1B11', clothes: 'shirt', clothesColor: '#34495E',
                      accessory: leader.rank <= 10 ? 'beginner-badge' : null
                    }} 
                    size={48} 
                  />
                </div>
                <div>
                  <div className={`text-lg font-black ${isMe ? 'text-[var(--primary)]' : 'text-white'}`}>
                    {isMe ? 'Toi ✨' : getPseudo(leader.email)}
                  </div>
                  <div className="text-[10px] text-[var(--text-dim)] font-black uppercase tracking-widest">
                    Expert en Algorithmes
                  </div>
                </div>
              </div>

              <div className="w-32 flex flex-col items-center">
                <div className="flex items-center gap-1.5 text-orange-400">
                  <Flame size={16} fill="currentColor" />
                  <span className="font-black text-lg">{leader.streak}</span>
                </div>
                <div className="text-[9px] text-[var(--text-dim)] uppercase tracking-widest font-bold">Jours</div>
              </div>

              <div className="w-32 text-right space-y-1">
                <div className="text-xl font-black text-white leading-none">
                  {leader.xp.toLocaleString()}
                </div>
                <div className="text-[9px] text-[var(--text-dim)] font-black uppercase tracking-widest">TOTAL XP</div>
              </div>

              <div className="ml-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="p-2 rounded-xl bg-white/5 text-[var(--text-dim)]">
                  <ChevronUp size={16} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Motivation */}
      <div className="mt-32 text-center">
        <p className="text-[var(--text-dim)] font-medium">Continue à coder pour monter dans le classement.</p>
        <Zap className="text-[var(--primary)] mx-auto mt-4 animate-pulse" />
      </div>
    </div>
  );
}
