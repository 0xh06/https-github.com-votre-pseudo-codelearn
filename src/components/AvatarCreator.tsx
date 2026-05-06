import React from 'react';
import { useStore } from '../store/useStore';
import AvatarRenderer from './AvatarRenderer';
import { Sparkles, Check } from 'lucide-react';

export default function AvatarCreator() {
  const { avatar, updateAvatar, unlockedAccessories } = useStore();

  const options = {
    skin: [
      { id: 'light', color: '#FDDBB4' },
      { id: 'tan', color: '#E8B98A' },
      { id: 'brown', color: '#C68642' },
      { id: 'dark', color: '#8D5524' }
    ],
    hairColor: [
      { id: 'black', color: '#1A1A2E' },
      { id: 'brown', color: '#6B3A2A' },
      { id: 'blonde', color: '#DAA520' },
      { id: 'red', color: '#C0392B' },
      { id: 'blue', color: '#2980B9' },
      { id: 'purple', color: '#8E44AD' },
      { id: 'green', color: '#27AE60' },
      { id: 'white', color: '#ECF0F1' }
    ],
    hair: ['short', 'long', 'spiky', 'curly', 'bun'],
    expression: ['neutral', 'happy', 'cool', 'surprised'],
    clothes: ['hoodie', 'shirt', 'jacket'],
    clothesColor: [
      '#34495E', // dark blue/gray
      '#E74C3C', // red
      '#2ECC71', // green
      '#F1C40F', // yellow
      '#9B59B6', // purple
      '#000000', // black
      '#FFFFFF'  // white
    ],
    accessory: [null, ...unlockedAccessories]
  };

  return (
    <div className="glass rounded-[32px] p-8 border-white/5 flex flex-col lg:flex-row gap-12 items-start">
      <div className="shrink-0 bg-white/[0.02] rounded-[40px] p-8 border border-white/5 shadow-2xl relative group sticky top-24 w-full lg:w-auto flex justify-center">
        <div className="absolute inset-0 bg-[var(--green)]/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        <AvatarRenderer config={avatar} size={280} animate={true} />
      </div>

      <div className="flex-1 space-y-8 w-full">
        <div>
          <h2 className="text-2xl font-black mb-2 flex items-center gap-3">
            <Sparkles className="text-[var(--green)]" /> Ton Avatar CodeMaster
          </h2>
          <p className="text-[var(--text-dim)] text-sm">Crée ton personnage unique. De nouveaux accessoires se débloquent avec ta progression.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          
          {/* Skin Tone */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-dim)]">Peau</label>
            <div className="flex gap-3">
              {options.skin.map(s => (
                <button
                  key={s.id}
                  onClick={() => updateAvatar({ skin: s.id })}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${avatar.skin === s.id ? 'border-[var(--green)] scale-110' : 'border-white/10 hover:scale-105'}`}
                  style={{ backgroundColor: s.color }}
                />
              ))}
            </div>
          </div>

          {/* Hair Style */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-dim)]">Coiffure</label>
            <div className="flex flex-wrap gap-2">
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

          {/* Hair Color */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-dim)]">Couleur Cheveux</label>
            <div className="flex flex-wrap gap-3">
              {options.hairColor.map(hc => (
                <button
                  key={hc.id}
                  onClick={() => updateAvatar({ hairColor: hc.id })}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${avatar.hairColor === hc.id ? 'border-[var(--green)] scale-110 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'border-white/10 hover:scale-105'}`}
                  style={{ backgroundColor: hc.color }}
                />
              ))}
            </div>
          </div>

          {/* Expression */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-dim)]">Expression</label>
            <div className="flex flex-wrap gap-2">
              {options.expression.map(e => (
                <button
                  key={e}
                  onClick={() => updateAvatar({ expression: e })}
                  className={`px-3 py-2 rounded-xl glass border-white/10 text-[10px] font-bold uppercase transition-all ${avatar.expression === e ? 'border-[var(--green)] bg-[var(--green)]/10 text-[var(--green)]' : 'hover:border-white/20'}`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Clothes Style */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-dim)]">Tenue</label>
            <div className="flex flex-wrap gap-2">
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

          {/* Clothes Color */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-dim)]">Couleur Tenue</label>
            <div className="flex flex-wrap gap-3">
              {options.clothesColor.map(color => (
                <button
                  key={color}
                  onClick={() => updateAvatar({ clothesColor: color })}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${avatar.clothesColor === color ? 'border-[var(--green)] scale-110 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'border-white/10 hover:scale-105'}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Accessories */}
          <div className="space-y-3 sm:col-span-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-yellow-400 flex items-center gap-2">
              <span>Accessoires Débloqués</span>
              <span className="px-2 py-0.5 rounded-full bg-yellow-400/20 text-yellow-400 text-[8px]">Niveaux</span>
            </label>
            <div className="flex flex-wrap gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <button
                onClick={() => updateAvatar({ accessory: null })}
                className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all ${avatar.accessory === null ? 'border-[var(--green)] bg-[var(--green)]/10 text-[var(--green)]' : 'border-white/10 hover:bg-white/5'}`}
                title="Aucun"
              >
                🚫
              </button>
              {unlockedAccessories.map(a => (
                <button
                  key={a}
                  onClick={() => updateAvatar({ accessory: a })}
                  className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center text-2xl transition-all ${avatar.accessory === a ? 'border-[var(--green)] bg-[var(--green)]/10 text-[var(--green)] shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'border-white/10 hover:scale-105 hover:bg-white/5'}`}
                  title={a}
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
