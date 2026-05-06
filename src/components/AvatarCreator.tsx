import React from 'react';
import { useStore } from '../store/useStore';
import AvatarRenderer from './AvatarRenderer';
import { motion } from 'framer-motion';
import { Sparkles, Check } from 'lucide-react';

export default function AvatarCreator() {
  const { avatar, updateAvatar, unlockedAccessories } = useStore();

  const options = {
    base: ['round', 'square', 'oval'],
    hair: ['short', 'long', 'spiky'],
    eyes: ['neutral', 'blink'],
    clothes: ['hoodie', 'shirt'],
    accessory: [null, ...unlockedAccessories]
  };

  return (
    <div className="glass rounded-[32px] p-8 border-white/5 flex flex-col md:flex-row gap-12 items-center">
      <div className="shrink-0 bg-white/[0.02] rounded-[40px] p-8 border border-white/5 shadow-2xl relative group">
        <div className="absolute inset-0 bg-[var(--green)]/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        <AvatarRenderer config={avatar} size={240} />
      </div>

      <div className="flex-1 space-y-8 w-full">
        <div>
          <h2 className="text-2xl font-black mb-2 flex items-center gap-3">
            <Sparkles className="text-[var(--green)]" /> Personnalise ton Avatar
          </h2>
          <p className="text-[var(--text-dim)] text-sm">Débloque plus d'accessoires en progressant dans le guide.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Base Shape */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-dim)]">Forme du visage</label>
            <div className="flex gap-2">
              {options.base.map(b => (
                <button
                  key={b}
                  onClick={() => updateAvatar({ base: b })}
                  className={`w-10 h-10 rounded-xl glass border-white/10 flex items-center justify-center transition-all ${avatar.base === b ? 'border-[var(--green)] bg-[var(--green)]/10 text-[var(--green)]' : 'hover:border-white/20'}`}
                >
                  {avatar.base === b && <Check size={16} />}
                </button>
              ))}
            </div>
          </div>

          {/* Hair Style */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-dim)]">Coiffure</label>
            <div className="flex gap-2">
              {options.hair.map(h => (
                <button
                  key={h}
                  onClick={() => updateAvatar({ hair: h })}
                  className={`px-3 py-2 rounded-xl glass border-white/10 text-[10px] font-bold uppercase transition-all ${avatar.hair === h ? 'border-[var(--green)] bg-[var(--green)]/10 text-[var(--green)]' : 'hover:border-white/20'}`}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>

          {/* Clothes */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-dim)]">Vêtements</label>
            <div className="flex gap-2">
              {options.clothes.map(c => (
                <button
                  key={c}
                  onClick={() => updateAvatar({ clothes: c })}
                  className={`px-3 py-2 rounded-xl glass border-white/10 text-[10px] font-bold uppercase transition-all ${avatar.clothes === c ? 'border-[var(--green)] bg-[var(--green)]/10 text-[var(--green)]' : 'hover:border-white/20'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Accessories */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-dim)]">Accessoires Débloqués</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => updateAvatar({ accessory: null })}
                className={`w-10 h-10 rounded-xl glass border-white/10 flex items-center justify-center transition-all ${avatar.accessory === null ? 'border-[var(--green)] bg-[var(--green)]/10 text-[var(--green)]' : 'hover:border-white/20'}`}
              >
                🚫
              </button>
              {unlockedAccessories.map(a => (
                <button
                  key={a}
                  onClick={() => updateAvatar({ accessory: a })}
                  className={`w-10 h-10 rounded-xl glass border-white/10 flex items-center justify-center text-lg transition-all ${avatar.accessory === a ? 'border-[var(--green)] bg-[var(--green)]/10 text-[var(--green)]' : 'hover:border-white/20'}`}
                >
                  {a === 'beginner-badge' ? '🌱' : a === 'scholar-hat' ? '🎓' : a === 'expert-crown' ? '👑' : '👓'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
