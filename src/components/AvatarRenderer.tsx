import React from 'react';
import { motion } from 'framer-motion';
import type { AvatarConfig } from '../store/useStore';

interface Props {
  config: AvatarConfig;
  size?: number;
  animate?: boolean;
}

const PALETTE = {
  skin: {
    light: { S: '#FDDBB4', s: '#F0B888', b: '#ff9ea5' },
    tan:   { S: '#E8B98A', s: '#CE9466', b: '#e67373' },
    brown: { S: '#C68642', s: '#A0622A', b: '#bf5a5a' },
    dark:  { S: '#8D5524', s: '#6B3A16', b: '#8c3d3d' },
  },
  hair: {
    pink:   { H: '#E84A74', h: '#C03058' },
    black:  { H: '#1A1A2E', h: '#0D0D1A' },
    brown:  { H: '#6B3A2A', h: '#4A2216' },
    blonde: { H: '#DAA520', h: '#B8860B' },
    red:    { H: '#C0392B', h: '#922B21' },
    blue:   { H: '#2980B9', h: '#1A5276' },
    purple: { H: '#8E44AD', h: '#6C3483' },
    green:  { H: '#27AE60', h: '#1E8449' },
    white:  { H: '#ECF0F1', h: '#BDC3C7' },
  }
};

// 18x23 grid
const LAYERS: Record<string, Record<string, string[]>> = {
  base: {
    body: [
      "                  ", // 0
      "                  ", // 1
      "                  ", // 2
      "                  ", // 3
      "                  ", // 4
      "     OOOOOOOO     ", // 5
      "    OssssssssO    ", // 6
      "   OSSSSSSSSSSO   ", // 7
      "   OSSSSSSSSSSO   ", // 8
      "   OSSSSSSSSSSO   ", // 9
      "   OSSSSSSSSSSO   ", // 10
      "   OOSSSSSSSSOO   ", // 11
      "    OOSSSSSSOO    ", // 12
      "     OOssssOO     ", // 13
      "    OSSOOOOSSO    ", // 14
      "   OSSOO  OOSSO   ", // 15
      "   OSSO    OSSO   ", // 16
      "    OO      OO    ", // 17
      "                  ", // 18
      "                  ", // 19
      "                  ", // 20
      "                  ", // 21
      "                  ", // 22
    ]
  },
  face: {
    neutral: [
      "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ",
      "    O EE  EE O    ",
      "    Obb    bbO    ",
      "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ",
    ],
    happy: [
      "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ",
      "    O E E  E E O  ",
      "    ObbE    EbbO  ",
      "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ",
    ],
    cool: [
      "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ",
      "     EE    EE     ",
      "    O E    E O    ",
      "    Obb    bbO    ",
      "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ",
    ],
    surprised: [
      "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ",
      "    O EE  EE O    ",
      "    Obb E  E bbO  ",
      "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ",
    ]
  },
  hair: {
    short: [
      "                  ",
      "                  ",
      "     OOOOOOOO     ",
      "   OOhhhhhhhhOO   ",
      "  OhhHHHHHHHHhhO  ",
      " OhHHHHHHHHHHHHhO ",
      " OhHHHHHHHHHHHHhO ",
      " OhhHHhSSSSHhHhhO ",
      " OOhHSSSSSSSSHOO  ",
      "  OS              ",
      "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ",
    ],
    fluffy: [
      "      OOOOO       ",
      "    OOOOhhhhOO    ",
      "   OOhhhhhhhhOO   ",
      "  OhhhHHHHHHhhhO  ",
      " OhHHHHHHHHHHHHhO ",
      " OhHHHHHHHHHHHHhO ",
      " OhHHHHHHHHHHHHhO ",
      " OhHHHHHHHHHHHHhO ",
      " OhhHHhhSSShHhhO  ",
      " OOhHSSSSSSSShOO  ",
      "  OS              ",
      "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ",
    ],
    long: [
      "     OOOOOOOO     ",
      "   OOhhhhhhhhOO   ",
      "  OhhHHHHHHHHhhO  ",
      " OhHHHHHHHHHHHHhO ",
      " OhHHHHHHHHHHHHhO ",
      " OhhHHhSSSSHhHhhO ",
      " OOhHSSSSSSSSHOO  ",
      " OhH              ",
      " OhH              ",
      " OhH              ",
      " OhH              ",
      " OhH              ",
      " OOh              ",
      "  OO              ",
      "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ",
    ],
    spiky: [
      "       OO  OO     ",
      "      OhhOOhhO    ",
      "   OOOhHHHHHHhO   ",
      "  OhhHHHHHHHHhhO  ",
      " OhHHHHHHHHHHHHhO ",
      " OhHHHHHHHHHHHHhO ",
      " OhhHHhSSSSHhHhhO ",
      " OOhHSSSSSSSSHOO  ",
      "  OS              ",
      "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ",
    ],
    bun: [
      "       OOOO       ",
      "      OhhhHO      ",
      "     OOOOOOOO     ",
      "   OOhhhhhhhhOO   ",
      "  OhhHHHHHHHHhhO  ",
      " OhHHHHHHHHHHHHhO ",
      " OhHHHHHHHHHHHHhO ",
      " OhhHHhSSSSHhHhhO ",
      " OOhHSSSSSSSSHOO  ",
      "  OS              ",
      "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ",
    ]
  },
  clothes: {
    overalls: [
      "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ",
      "      OOOOOO      ",
      "    OCCCSSCCCO    ",
      "   OCOCPPPPOCO    ",
      "   SSOOPPPPPOOSS  ",
      "   SOPPPPPPPPOS   ",
      "    OPPPPPPPPO    ",
      "    OPPPOOPPPO    ",
      "    OOFFOOFFOO    ",
      "    OOOOOOOOOO    ",
      "                  ",
    ],
    shirt: [
      "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ",
      "      OOOOOO      ",
      "    OCCCSSCCCO    ",
      "   OCOCCCCCCOCO   ",
      "   SSOOCCCCOOSS   ",
      "   SO CCCCCCO S   ",
      "    O CCCCCCO     ",
      "    OPPPOOPPPO    ",
      "    OOFFOOFFOO    ",
      "    OOOOOOOOOO    ",
      "                  ",
    ],
    hoodie: [
      "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ",
      "      OOOOOO      ",
      "    OCCCSSCCCO    ",
      "   OCCCCCCCCCO    ",
      "   SCOCCCCCCOCS   ",
      "   SO CCCCCCO S   ",
      "    O CCCCCCO     ",
      "    OPPPOOPPPO    ",
      "    OOFFOOFFOO    ",
      "    OOOOOOOOOO    ",
      "                  ",
    ]
  },
  accessory: {
    glasses: [
      "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ",
      "                  ",
      "   OA AA  AA AO   ",
      "   O A A  A A O   ",
      "   O AA    AA O   ",
      "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ",
    ],
    'beginner-badge': [
      "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ",
      "          OO      ",
      "         OAO      ",
      "          OO      ",
      "                  ", "                  ", "                  ", "                  ", "                  ", "                  ",
    ],
    'scholar-hat': [
      "     OOOOOOOO     ",
      "   OOAAAAAAAAOO   ",
      "  OAAAAAAAAAAAAO  ",
      " OOAAAOOAAOOAAAOO ",
      " OO  O  AA  O  OO ",
      "        AA        ",
      "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ",
    ],
    'expert-crown': [
      "    O O OO O O    ",
      "   OA O AA O AO   ",
      "   OAAAAAAAAAAO   ",
      "   OAAAAAAAAAAO   ",
      "   OOOOOOOOOOOO   ",
      "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ",
    ]
  }
};

export default function AvatarRenderer({ config, size = 200, animate = true }: Props) {
  // Safe fallbacks
  const skinTone = PALETTE.skin[config.skin as keyof typeof PALETTE.skin] || PALETTE.skin.light;
  const hairTone = PALETTE.hair[config.hairColor as keyof typeof PALETTE.hair] || PALETTE.hair.black;
  
  const COLOR_MAP: Record<string, string> = {
    'O': '#2D1B11', // Outline
    'S': skinTone.S,
    's': skinTone.s,
    'b': skinTone.b,
    'E': '#2D1B11', // Eyes
    'H': hairTone.H,
    'h': hairTone.h,
    'C': config.clothesColor || '#E74C3C', // Shirt (default Red like image)
    'c': '#B03A2E', // Darker shirt
    'P': '#2980B9', // Pants (default Blue like image overalls)
    'p': '#1F618D', // Darker pants
    'F': '#FFFFFF', // Shoes
    'A': '#F1C40F', // Accessory gold
    ' ': 'transparent',
    '.': 'transparent'
  };

  const getLayer = (category: string, id: string | null) => {
    if (!id || !LAYERS[category] || !LAYERS[category][id]) return null;
    return LAYERS[category][id];
  };

  const activeLayers = [
    LAYERS.base.body,
    getLayer('face', config.expression || 'neutral'),
    getLayer('hair', config.hair || 'fluffy'),
    getLayer('clothes', config.clothes || 'overalls'),
    getLayer('accessory', config.accessory)
  ].filter(Boolean) as string[][];

  // Merge layers
  const mergedSprite: string[] = Array(23).fill("                  ");
  const result = mergedSprite.map(row => row.split(''));

  for (const layer of activeLayers) {
    for (let y = 0; y < 23; y++) {
      if (!layer[y]) continue;
      for (let x = 0; x < 18; x++) {
        const char = layer[y][x];
        if (char && char !== ' ' && char !== '.') {
          // Exception: Don't let hair overwrite outline for the very top of the head
          // Actually, we want hair to cover skin outline, but not skin itself unless specified.
          if (layer === activeLayers[2] && result[y][x] === 'S' && char === 'O') {
             // Let skin show through hair outlines if needed, or just let hair dominate.
             // Hair dominates.
          }
          result[y][x] = char;
        }
      }
    }
  }

  // Handle right-side mirror for long hair, since it was only drawn on the left in the template sometimes
  // (Wait, I drew them symmetrical, it's fine)

  // Idle bounce animation
  const bounceAnim = animate ? {
    y: [0, -3, 0],
    transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
  } : {};

  return (
    <div 
      className="relative flex items-center justify-center pixelated" 
      style={{ 
        width: size, 
        height: size, 
        imageRendering: 'pixelated' // CSS for sharp pixels
      }}
    >
      {/* Background Glow */}
      <div 
        className="absolute inset-0 rounded-full blur-2xl opacity-40 mix-blend-screen"
        style={{ backgroundColor: COLOR_MAP['H'] }}
      />
      
      <motion.svg
        viewBox="0 0 18 23"
        className="w-full h-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)] z-10"
        style={{ shapeRendering: 'crispEdges' }}
        animate={bounceAnim}
      >
        {result.map((row, y) => 
          row.map((char, x) => {
            if (char === ' ' || char === '.') return null;
            const color = COLOR_MAP[char] || '#FF00FF'; // Magenta for missing color mapping
            return (
              <rect 
                key={`${x}-${y}`} 
                x={x} 
                y={y} 
                width="1.05" // slight overlap to prevent svg gaps
                height="1.05" 
                fill={color} 
              />
            );
          })
        )}
      </motion.svg>

      {/* Shadow */}
      <svg viewBox="0 0 18 4" className="absolute -bottom-4 w-[60%] h-auto opacity-30 z-0">
        <ellipse cx="9" cy="2" rx="7" ry="1.5" fill="#000000" />
      </svg>
    </div>
  );
}
