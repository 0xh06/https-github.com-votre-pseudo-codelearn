import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Seo from '../components/Seo';
import { supabase } from '../lib/supabase';
import { useStore } from '../store/useStore';
import { Trophy, Medal, Crown, Flame } from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  email: string;
  xp: number;
  streak: number;
  rank: number;
}

// Mock leaderboard using local data since we don't have a profiles table yet
const MOCK_LEADERS: LeaderboardEntry[] = [
  { id: '1', email: 'youssef.a@gmail.com', xp: 3450, streak: 21, rank: 1 },
  { id: '2', email: 'sarah.m@gmail.com', xp: 2890, streak: 14, rank: 2 },
  { id: '3', email: 'karim.b@gmail.com', xp: 2340, streak: 9, rank: 3 },
  { id: '4', email: 'fatima.z@gmail.com', xp: 1980, streak: 7, rank: 4 },
  { id: '5', email: 'mehdi.l@gmail.com', xp: 1650, streak: 5, rank: 5 },
  { id: '6', email: 'sofia.r@gmail.com', xp: 1420, streak: 3, rank: 6 },
  { id: '7', email: 'adam.c@gmail.com', xp: 1200, streak: 2, rank: 7 },
  { id: '8', email: 'lina.k@gmail.com', xp: 980, streak: 1, rank: 8 },
  { id: '9', email: 'omar.s@gmail.com', xp: 750, streak: 4, rank: 9 },
  { id: '10', email: 'yasmine.h@gmail.com', xp: 620, streak: 0, rank: 10 },
];

function maskEmail(email: string) {
  const [local, domain] = email.split('@');
  return `${local[0]}${'*'.repeat(Math.min(local.length - 1, 4))}@${domain}`;
}

const rankIcon = (rank: number) => {
  if (rank === 1) return <Crown className="w-5 h-5 text-yellow-400" />;
  if (rank === 2) return <Medal className="w-5 h-5 text-gray-300" />;
  if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
  return <span className="w-5 h-5 text-center text-sm font-bold text-[var(--text-dim)]">#{rank}</span>;
};

export default function Leaderboard() {
  const { xp, user } = useStore();
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<number | null>(null);

  useEffect(() => {
    // Inject the current user into the leaderboard
    const combined = [...MOCK_LEADERS];
    if (user && xp > 0) {
      const insertIdx = combined.findIndex(l => l.xp < xp);
      const userEntry = {
        id: user.id,
        email: user.email || 'Vous',
        xp,
        streak: 0,
        rank: insertIdx === -1 ? combined.length + 1 : insertIdx + 1,
      };
      if (insertIdx === -1) combined.push(userEntry);
      else combined.splice(insertIdx, 0, userEntry);
      combined.forEach((l, i) => (l.rank = i + 1));
      setUserRank(userEntry.rank);
    }
    setLeaders(combined.slice(0, 50));
  }, [xp, user]);

  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <Seo title="Classement" description="Classement des meilleurs développeurs AlgoMaster." />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <div className="w-16 h-16 bg-[var(--yellow)]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Trophy className="w-8 h-8 text-[var(--yellow)]" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Classement Global</h1>
        <p className="text-[var(--text-dim)]">Les meilleurs développeurs de la communauté AlgoMaster.</p>
        {userRank && (
          <div className="mt-4 inline-block px-6 py-2 bg-[var(--green)]/10 border border-[var(--green)]/30 rounded-full text-[var(--green)] font-bold text-sm">
            Votre position : #{userRank}
          </div>
        )}
      </motion.div>

      {/* Podium top 3 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-4 mb-12 items-end"
      >
        {[leaders[1], leaders[0], leaders[2]].map((leader, i) => {
          if (!leader) return <div key={i} />;
          const heights = ['h-28', 'h-36', 'h-24'];
          const colors = ['bg-gray-300/10', 'bg-yellow-400/10', 'bg-amber-600/10'];
          const borders = ['border-gray-300/30', 'border-yellow-400/30', 'border-amber-600/30'];
          return (
            <div key={leader.id} className={`card p-4 ${colors[i]} border ${borders[i]} text-center ${heights[i]} flex flex-col items-center justify-center`}>
              <div className="text-3xl mb-2">{i === 1 ? '🥇' : i === 0 ? '🥈' : '🥉'}</div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--green)] to-[var(--blue)] flex items-center justify-center text-sm font-bold text-black mb-2">
                {leader.email[0].toUpperCase()}
              </div>
              <div className="text-xs font-bold truncate w-full text-center">{maskEmail(leader.email)}</div>
              <div className="text-[var(--yellow)] font-black text-sm mt-1">{leader.xp.toLocaleString()} XP</div>
            </div>
          );
        })}
      </motion.div>

      {/* Full list */}
      <div className="space-y-2">
        {leaders.map((leader, i) => {
          const isMe = user && leader.id === user.id;
          return (
            <motion.div
              key={leader.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                isMe
                  ? 'border-[var(--green)]/50 bg-[var(--green)]/5 ring-1 ring-[var(--green)]/20'
                  : 'border-[var(--border)] bg-[var(--bg2)] hover:bg-[var(--bg3)]'
              }`}
            >
              <div className="w-8 flex items-center justify-center">{rankIcon(leader.rank)}</div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--green)] to-[var(--blue)] flex items-center justify-center text-sm font-bold text-black shrink-0">
                {leader.email[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm truncate">
                  {isMe ? '⭐ Vous' : maskEmail(leader.email)}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-[var(--text-dim)]">
                  <Flame className="w-3 h-3 text-orange-400" />
                  <span>{leader.streak} jours de streak</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-black text-[var(--yellow)]">{leader.xp.toLocaleString()}</div>
                <div className="text-[10px] text-[var(--text-dim)] uppercase tracking-widest">XP</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
