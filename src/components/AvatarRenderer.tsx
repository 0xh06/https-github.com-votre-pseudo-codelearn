import React from 'react';
import { motion } from 'framer-motion';
import type { AvatarConfig } from '../store/useStore';

interface Props {
  config: AvatarConfig;
  size?: number;
  animate?: boolean;
}

const SKIN_TONES: Record<string, { face: string; shadow: string; outline: string }> = {
  light:    { face: '#FDDBB4', shadow: '#F0B888', outline: '#D4956A' },
  tan:      { face: '#E8B98A', shadow: '#CE9466', outline: '#A06040' },
  brown:    { face: '#C68642', shadow: '#A0622A', outline: '#7A4418' },
  dark:     { face: '#8D5524', shadow: '#6B3A16', outline: '#4A2008' },
};

const HAIR_COLORS: Record<string, { main: string; shadow: string }> = {
  black:  { main: '#1A1A2E', shadow: '#0D0D1A' },
  brown:  { main: '#6B3A2A', shadow: '#4A2216' },
  blonde: { main: '#DAA520', shadow: '#B8860B' },
  red:    { main: '#C0392B', shadow: '#922B21' },
  blue:   { main: '#2980B9', shadow: '#1A5276' },
  purple: { main: '#8E44AD', shadow: '#6C3483' },
  green:  { main: '#27AE60', shadow: '#1E8449' },
  white:  { main: '#ECF0F1', shadow: '#BDC3C7' },
};

const EYE_CONFIGS: Record<string, { left: string; right: string; pupils: boolean }> = {
  happy:    { left: 'M 36 52 Q 40 48 44 52', right: 'M 56 52 Q 60 48 64 52', pupils: false },
  neutral:  { left: '', right: '', pupils: true },
  cool:     { left: '', right: '', pupils: true },
  surprised:{ left: '', right: '', pupils: true },
};

export default function AvatarRenderer({ config, size = 200, animate = true }: Props) {
  const skin = SKIN_TONES[config.skin || 'light'];
  const hair = HAIR_COLORS[config.hairColor || 'black'];
  const eyeColor = config.eyeColor || '#2C3E50';

  // Idle breathing animation
  const bodyAnim = animate ? {
    y: [0, -4, 0],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
  } : {};

  const eyeBlinkAnim = animate ? {
    scaleY: [1, 1, 1, 0.1, 1, 1],
    transition: { duration: 4, repeat: Infinity, times: [0, 0.4, 0.45, 0.5, 0.55, 1] }
  } : {};

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 120 150"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 8px 32px rgba(16,185,129,0.18)) drop-shadow(0 2px 8px rgba(0,0,0,0.4))' }}
      >
        <defs>
          {/* Radial glow */}
          <radialGradient id={`glow-${size}`} cx="50%" cy="80%" r="50%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </radialGradient>
          {/* Face gradient */}
          <linearGradient id={`face-grad-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={skin.face} />
            <stop offset="100%" stopColor={skin.shadow} />
          </linearGradient>
          {/* Hair gradient */}
          <linearGradient id={`hair-grad-${size}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={hair.main} />
            <stop offset="100%" stopColor={hair.shadow} />
          </linearGradient>
          {/* Clothes gradient */}
          <linearGradient id={`clothes-grad-${size}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={config.clothesColor || '#34495E'} />
            <stop offset="100%" stopColor={`${config.clothesColor || '#34495E'}BB`} />
          </linearGradient>
          {/* Shadow blob */}
          <ellipse id="shadow-blob" cx="60" cy="148" rx="32" ry="4" fill="rgba(0,0,0,0.25)" />
        </defs>

        {/* Ground shadow */}
        <ellipse cx="60" cy="148" rx="32" ry="5" fill="rgba(0,0,0,0.2)" />

        {/* Glow platform */}
        <ellipse cx="60" cy="148" rx="30" ry="6" fill={`url(#glow-${size})`} />

        <motion.g animate={bodyAnim}>
          {/* === BODY === */}
          {config.clothes === 'hoodie' && (
            <>
              {/* Hoodie body */}
              <path d="M28,100 Q25,120 22,148 L98,148 Q95,120 92,100 Q76,95 60,96 Q44,95 28,100Z"
                fill={`url(#clothes-grad-${size})`} />
              {/* Hood strings */}
              <path d="M55,100 L53,115 M65,100 L67,115" stroke={hair.shadow} strokeWidth="1.5" strokeLinecap="round" />
              {/* Pocket */}
              <rect x="46" y="125" width="28" height="14" rx="4" fill="rgba(0,0,0,0.15)" />
              {/* Arms */}
              <path d="M28,100 Q14,110 12,130 L22,132 Q24,118 34,112Z" fill={`url(#clothes-grad-${size})`} />
              <path d="M92,100 Q106,110 108,130 L98,132 Q96,118 86,112Z" fill={`url(#clothes-grad-${size})`} />
            </>
          )}
          {config.clothes === 'shirt' && (
            <>
              <path d="M30,100 Q26,120 24,148 L96,148 Q94,120 90,100 Q76,95 60,96 Q44,95 30,100Z"
                fill={`url(#clothes-grad-${size})`} />
              {/* Collar */}
              <path d="M52,100 L60,110 L68,100" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" />
              {/* Arms */}
              <path d="M30,100 Q16,108 14,126 L24,128 Q26,116 36,110Z" fill={`url(#clothes-grad-${size})`} />
              <path d="M90,100 Q104,108 106,126 L96,128 Q94,116 84,110Z" fill={`url(#clothes-grad-${size})`} />
            </>
          )}
          {config.clothes === 'jacket' && (
            <>
              <path d="M28,100 Q24,120 22,148 L98,148 Q96,120 92,100 Q76,95 60,96 Q44,95 28,100Z"
                fill={`url(#clothes-grad-${size})`} />
              {/* Lapels */}
              <path d="M60,100 L50,115 L46,148" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" />
              <path d="M60,100 L70,115 L74,148" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" />
              {/* Arms */}
              <path d="M28,100 Q14,110 12,132 L22,134 Q24,118 34,112Z" fill={`url(#clothes-grad-${size})`} />
              <path d="M92,100 Q106,110 108,132 L98,134 Q96,118 86,112Z" fill={`url(#clothes-grad-${size})`} />
            </>
          )}

          {/* === NECK === */}
          <rect x="52" y="88" width="16" height="14" rx="4" fill={skin.shadow} />

          {/* === HEAD === */}
          {/* Head base shape */}
          <ellipse cx="60" cy="64" rx="30" ry="32" fill={`url(#face-grad-${size})`} />
          {/* Ears */}
          <ellipse cx="30" cy="64" rx="5" ry="7" fill={skin.face} />
          <ellipse cx="90" cy="64" rx="5" ry="7" fill={skin.face} />
          <ellipse cx="30" cy="64" rx="3" ry="5" fill={skin.shadow} />
          <ellipse cx="90" cy="64" rx="3" ry="5" fill={skin.shadow} />

          {/* === HAIR === */}
          {config.hair === 'short' && (
            <path d="M32,52 Q34,28 60,26 Q86,28 88,52 Q80,36 60,34 Q40,36 32,52Z"
              fill={`url(#hair-grad-${size})`} />
          )}
          {config.hair === 'long' && (
            <>
              <path d="M32,52 Q34,28 60,26 Q86,28 88,52 Q80,36 60,34 Q40,36 32,52Z"
                fill={`url(#hair-grad-${size})`} />
              {/* Long strands */}
              <path d="M30,60 Q22,85 28,105" stroke={hair.main} strokeWidth="8" fill="none" strokeLinecap="round" />
              <path d="M90,60 Q98,85 92,105" stroke={hair.main} strokeWidth="8" fill="none" strokeLinecap="round" />
            </>
          )}
          {config.hair === 'spiky' && (
            <path d="M32,56 L38,30 L46,48 L53,26 L60,44 L67,26 L74,48 L82,30 L88,56 Q80,36 60,34 Q40,36 32,56Z"
              fill={`url(#hair-grad-${size})`} />
          )}
          {config.hair === 'curly' && (
            <>
              <path d="M32,56 Q34,28 60,26 Q86,28 88,56 Q80,38 60,36 Q40,38 32,56Z"
                fill={`url(#hair-grad-${size})`} />
              {/* Curly bumps */}
              {[38, 48, 58, 68, 78].map((x, i) => (
                <circle key={i} cx={x} cy={32} r="6" fill={hair.main} />
              ))}
            </>
          )}
          {config.hair === 'bun' && (
            <>
              <path d="M32,52 Q34,28 60,26 Q86,28 88,52 Q80,36 60,34 Q40,36 32,52Z"
                fill={`url(#hair-grad-${size})`} />
              <circle cx="60" cy="24" r="10" fill={hair.main} />
              <circle cx="60" cy="24" r="7" fill={hair.shadow} />
            </>
          )}

          {/* === FACE DETAILS === */}
          {/* Eyebrows */}
          <path d={`M 38 46 Q 43 ${config.expression === 'happy' ? '43' : config.expression === 'angry' ? '44' : '45'} 48 46`}
            stroke={hair.shadow} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d={`M 72 46 Q 77 ${config.expression === 'happy' ? '43' : config.expression === 'angry' ? '44' : '45'} 82 46`}
            stroke={hair.shadow} strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* Eyes */}
          <motion.g animate={eyeBlinkAnim} style={{ originX: '60px', originY: '53px' }}>
            {config.expression === 'happy' ? (
              <>
                {/* Happy closed eyes (arcs) */}
                <path d="M 37 53 Q 43 48 49 53" stroke={eyeColor} strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M 71 53 Q 77 48 83 53" stroke={eyeColor} strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </>
            ) : (
              <>
                {/* Eye whites */}
                <ellipse cx="43" cy="53" rx="7" ry="7" fill="white" />
                <ellipse cx="77" cy="53" rx="7" ry="7" fill="white" />
                {/* Irises */}
                <circle cx="43" cy="53" r="4.5" fill={eyeColor} />
                <circle cx="77" cy="53" r="4.5" fill={eyeColor} />
                {/* Pupils */}
                <circle cx="44" cy="52" r="2.5" fill="#0a0a0a" />
                <circle cx="78" cy="52" r="2.5" fill="#0a0a0a" />
                {/* Eye shine */}
                <circle cx="46" cy="50" r="1.5" fill="white" />
                <circle cx="80" cy="50" r="1.5" fill="white" />
                {/* Eyelashes top */}
                <path d="M 36 48 Q 43 45 50 48" stroke={hair.shadow} strokeWidth="1.5" fill="none" />
                <path d="M 70 48 Q 77 45 84 48" stroke={hair.shadow} strokeWidth="1.5" fill="none" />
              </>
            )}
          </motion.g>

          {/* Nose */}
          <path d="M 60 58 Q 57 64 60 66 Q 63 64 60 58" fill={skin.shadow} opacity="0.5" />

          {/* Mouth */}
          {config.expression === 'happy' && (
            <path d="M 50 72 Q 60 80 70 72" stroke={skin.outline} strokeWidth="2" fill="none" strokeLinecap="round" />
          )}
          {config.expression === 'neutral' && (
            <path d="M 52 73 Q 60 76 68 73" stroke={skin.outline} strokeWidth="2" fill="none" strokeLinecap="round" />
          )}
          {config.expression === 'cool' && (
            <path d="M 52 74 L 68 74" stroke={skin.outline} strokeWidth="2" strokeLinecap="round" />
          )}
          {config.expression === 'surprised' && (
            <ellipse cx="60" cy="74" rx="6" ry="4" fill={skin.outline} />
          )}

          {/* Cheeks blush */}
          {(config.expression === 'happy') && (
            <>
              <ellipse cx="34" cy="65" rx="7" ry="5" fill="rgba(255,100,100,0.2)" />
              <ellipse cx="86" cy="65" rx="7" ry="5" fill="rgba(255,100,100,0.2)" />
            </>
          )}

          {/* === ACCESSORIES === */}
          {config.accessory === 'classic-glasses' && (
            <g>
              <rect x="33" y="48" width="18" height="12" rx="5" stroke="#C0C0C0" strokeWidth="1.5" fill="rgba(100,200,255,0.1)" />
              <rect x="69" y="48" width="18" height="12" rx="5" stroke="#C0C0C0" strokeWidth="1.5" fill="rgba(100,200,255,0.1)" />
              <path d="M 51 54 L 69 54" stroke="#C0C0C0" strokeWidth="1.5" />
              <path d="M 28 52 L 33 54" stroke="#C0C0C0" strokeWidth="1.5" />
              <path d="M 87 54 L 92 52" stroke="#C0C0C0" strokeWidth="1.5" />
            </g>
          )}
          {config.accessory === 'beginner-badge' && (
            <motion.g
              animate={{ rotate: [-5, 5, -5], y: [-1, 1, -1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <circle cx="93" cy="40" r="10" fill="#10b981" />
              <circle cx="93" cy="40" r="8" fill="#059669" />
              <text x="93" y="44" textAnchor="middle" fontSize="10">🌱</text>
            </motion.g>
          )}
          {config.accessory === 'scholar-hat' && (
            <g>
              {/* Mortarboard base */}
              <rect x="36" y="28" width="48" height="8" rx="3" fill={hair.shadow} />
              {/* Square top */}
              <rect x="34" y="20" width="52" height="8" rx="2" fill="#1A1A2E" />
              {/* Tassel */}
              <path d="M 86 20 L 96 28 L 96 40" stroke="#DAA520" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="96" cy="42" r="3" fill="#DAA520" />
            </g>
          )}
          {config.accessory === 'expert-crown' && (
            <motion.g
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Crown base */}
              <path d="M 36 32 L 36 20 L 48 30 L 60 14 L 72 30 L 84 20 L 84 32 Z" fill="#F1C40F" />
              <path d="M 36 32 L 84 32 L 84 38 L 36 38 Z" fill="#E67E22" />
              {/* Gems */}
              <circle cx="60" cy="22" r="4" fill="#E74C3C" />
              <circle cx="44" cy="28" r="3" fill="#3498DB" />
              <circle cx="76" cy="28" r="3" fill="#2ECC71" />
              {/* Shine */}
              <path d="M 40 24 L 44 20" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
            </motion.g>
          )}

          {/* Hands */}
          <ellipse cx="12" cy="130" rx="7" ry="7" fill={skin.face} />
          <ellipse cx="108" cy="130" rx="7" ry="7" fill={skin.face} />
        </motion.g>
      </svg>
    </div>
  );
}
