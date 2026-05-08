import React from 'react';
import { useStore, type AvatarConfig } from '../store/useStore';
import AvatarRenderer from './AvatarRenderer';
import { Sparkles, Dice5, Zap, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
      { id: 'pink', color: '#E84A74' },
      { id: 'black', color: '#1A1A2E' },
      { id: 'brown', color: '#6B3A2A' },
      { id: 'blonde', color: '#DAA520' },
      { id: 'red', color: '#C0392B' },
      { id: 'blue', color: '#2980B9' },
      { id: 'purple', color: '#8E44AD' },
      { id: 'green', color: '#27AE60' },
      { id: 'white', color: '#ECF0F1' }
    ],
    hair: ['short', 'long', 'spiky', 'fluffy', 'bun'],
    expression: ['neutral', 'happy', 'cool', 'surprised', 'thinking', 'wink'],
    clothes: ['hoodie', 'shirt', 'overalls', 'trench', 't-shirt'],
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

  const presets: Record<string, Partial<AvatarConfig>> = {
    'Cyber Punk': { hair: 'spiky', hairColor: 'pink', expression: 'cool', clothes: 'hoodie', clothesColor: '#000000', accessory: 'glasses' },
    'Grand Sage': { hair: 'long', hairColor: 'white', expression: 'thinking', clothes: 'trench', clothesColor: '#34495E', accessory: 'scholar-hat' },
    'Ace Dev': { hair: 'short', hairColor: 'black', expression: 'neutral', clothes: 't-shirt', clothesColor: '#34495E', accessory: 'headphones' },
    'Royal Expert': { hair: 'bun', hairColor: 'blonde', expression: 'happy', clothes: 'overalls', clothesColor: '#F1C40F', accessory: 'expert-crown' },
  };

  const handleRandomize = () => {
    const random = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
    updateAvatar({
      skin: random(options.skin).id,
      hair: random(options.hair),
      hairColor: random(options.hairColor).id,
      expression: random(options.expression),
      clothes: random(options.clothes),
      clothesColor: random(options.clothesColor),
      accessory: random(options.accessory)
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column: Preview */}
      <div className="lg:col-span-4 space-y-6">
        <div className="glass rounded-[40px] p-10 border-white/5 flex flex-col items-center justify-center relative overflow-hidden group">
          {/* Animated background glow */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 via-transparent to-[var(--blue)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />
          
          <div className="relative z-10">
            <AvatarRenderer config={avatar} size={320} animate={true} />
          </div>

          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 px-6">
            <button 
              onClick={handleRandomize}
              className="flex-1 btn btn-secondary py-3 text-xs"
            >
              <Dice5 size={14} className="text-[var(--primary)]" /> Aléatoire
            </button>
          </div>
        </div>

        {/* Presets Card */}
        <div className="glass rounded-[32px] p-6 border-white/5 space-y-4">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--text-dim)] flex items-center gap-2">
            <Zap size={14} className="text-yellow-400" /> Styles Prédéfinis
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(presets).map(([name, config]) => (
              <button
                key={name}
                onClick={() => updateAvatar(config)}
                className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 text-[10px] font-bold hover:bg-[var(--primary)]/10 hover:border-[var(--primary)]/30 transition-all text-left group"
              >
                <div className="text-[var(--text-dim)] group-hover:text-[var(--primary)] transition-colors">{name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Customization */}
      <div className="lg:col-span-8 space-y-6">
        <div className="glass rounded-[40px] p-8 md:p-10 border-white/5 space-y-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-8">
            <div>
              <h2 className="text-3xl font-black tracking-tighter flex items-center gap-3">
                <Sparkles className="text-[var(--primary)]" /> Personnalisation
              </h2>
              <p className="text-[var(--text-dim)] text-sm font-medium">Configure ton identité numérique sur la plateforme.</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)]">
              <ShieldCheck size={18} />
              <span className="text-xs font-black uppercase tracking-wider">Sauvegarde Auto</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            
            {/* Skin Tone */}
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-dim)]">Teint de Peau</label>
              <div className="flex gap-4">
                {options.skin.map(s => (
                  <button
                    key={s.id}
                    onClick={() => updateAvatar({ skin: s.id })}
                    className={`w-12 h-12 rounded-2xl border-2 transition-all relative overflow-hidden ${avatar.skin === s.id ? 'border-[var(--primary)] scale-110 shadow-[0_0_20px_var(--primary-glow)]' : 'border-white/10 hover:border-white/30'}`}
                    style={{ backgroundColor: s.color }}
                  >
                    {avatar.skin === s.id && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Hair Color */}
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-dim)]">Couleur Capillaire</label>
              <div className="flex flex-wrap gap-3">
                {options.hairColor.map(hc => (
                  <button
                    key={hc.id}
                    onClick={() => updateAvatar({ hairColor: hc.id })}
                    className={`w-10 h-10 rounded-xl border-2 transition-all ${avatar.hairColor === hc.id ? 'border-[var(--primary)] scale-110 shadow-[0_0_15px_var(--primary-glow)]' : 'border-white/10 hover:scale-105'}`}
                    style={{ backgroundColor: hc.color }}
                  />
                ))}
              </div>
            </div>

            {/* Hair Style */}
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-dim)]">Coupe de Cheveux</label>
              <div className="flex flex-wrap gap-2">
                {options.hair.map(h => (
                  <button
                    key={h}
                    onClick={() => updateAvatar({ hair: h })}
                    className={`px-4 py-2.5 rounded-xl border transition-all text-[11px] font-black uppercase tracking-wider ${avatar.hair === h ? 'border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]' : 'border-white/5 bg-white/[0.02] text-[var(--text-dim)] hover:border-white/20 hover:text-white'}`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>

            {/* Expression */}
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-dim)]">Humeur</label>
              <div className="flex flex-wrap gap-2">
                {options.expression.map(e => (
                  <button
                    key={e}
                    onClick={() => updateAvatar({ expression: e })}
                    className={`px-4 py-2.5 rounded-xl border transition-all text-[11px] font-black uppercase tracking-wider ${avatar.expression === e ? 'border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]' : 'border-white/5 bg-white/[0.02] text-[var(--text-dim)] hover:border-white/20 hover:text-white'}`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            {/* Clothes Style */}
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-dim)]">Vêtements</label>
              <div className="flex flex-wrap gap-2">
                {options.clothes.map(c => (
                  <button
                    key={c}
                    onClick={() => updateAvatar({ clothes: c })}
                    className={`px-4 py-2.5 rounded-xl border transition-all text-[11px] font-black uppercase tracking-wider ${avatar.clothes === c ? 'border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]' : 'border-white/5 bg-white/[0.02] text-[var(--text-dim)] hover:border-white/20 hover:text-white'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Clothes Color */}
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-dim)]">Couleur Tenue</label>
              <div className="flex flex-wrap gap-3">
                {options.clothesColor.map(color => (
                  <button
                    key={color}
                    onClick={() => updateAvatar({ clothesColor: color })}
                    className={`w-10 h-10 rounded-xl border-2 transition-all ${avatar.clothesColor === color ? 'border-[var(--primary)] scale-110 shadow-[0_0_15px_var(--primary-glow)]' : 'border-white/10 hover:scale-105'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Accessories */}
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400">Items de Prestige</label>
                <div className="text-[9px] font-bold text-yellow-400/60 uppercase tracking-widest">Débloqués par la progression</div>
              </div>
              <div className="flex flex-wrap gap-3 p-6 rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <button
                  onClick={() => updateAvatar({ accessory: null })}
                  className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all ${avatar.accessory === null ? 'border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]' : 'border-white/5 bg-white/[0.03] text-white/20 hover:border-white/20'}`}
                >
                  <span className="text-lg">🚫</span>
                </button>
                {unlockedAccessories.map(a => (
                  <button
                    key={a}
                    onClick={() => updateAvatar({ accessory: a })}
                    className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center text-3xl transition-all relative ${avatar.accessory === a ? 'border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)] shadow-[0_0_25px_rgba(99,102,241,0.3)]' : 'border-white/5 bg-white/[0.03] hover:scale-105 hover:border-white/20'}`}
                  >
                    {a === 'beginner-badge' ? '🌱' : a === 'scholar-hat' ? '🎓' : a === 'expert-crown' ? '👑' : a === 'glasses' ? '👓' : a === 'headphones' ? '🎧' : a === 'robot-ears' ? '🤖' : '✨'}
                    {avatar.accessory === a && (
                      <motion.div layoutId="accessory-check" className="absolute -top-2 -right-2 w-5 h-5 bg-[var(--primary)] rounded-full flex items-center justify-center border-2 border-[var(--bg)]">
                        <div className="w-1.5 h-1.5 bg-black rounded-full" />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
