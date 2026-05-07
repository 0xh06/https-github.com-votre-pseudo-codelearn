import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
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

const LAYERS: Record<string, Record<string, string[]>> = {
  base: {
    body: [
      "                  ", "                  ", "                  ", "                  ", "                  ",
      "     OOOOOOOO     ",
      "    OssssssssO    ",
      "   OSSSSSSSSSSO   ",
      "   OSSSSSSSSSSO   ",
      "   OSSSSSSSSSSO   ",
      "   OSSSSSSSSSSO   ",
      "   OOSSSSSSSSOO   ",
      "    OOSSSSSSOO    ",
      "     OOssssOO     ",
      "    OSSOOOOSSO    ",
      "   OSSOO  OOSSO   ",
      "   OSSO    OSSO   ",
      "    OO      OO    ",
      "                  ", "                  ", "                  ", "                  ", "                  ",
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
    ],
    thinking: [
      "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ",
      "    O E.  EE O    ",
      "    Obb    bbO    ",
      "       OOO        ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ",
    ],
    wink: [
      "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ",
      "    O E-  EE O    ",
      "    Obb    bbO    ",
      "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ",
    ]
  },
  hair: {
    short: [
      "                  ", "                  ",
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
    ],
    trench: [
      "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ",
      "    OOCCCCCCCOO   ",
      "   OCCCCCCCCCCCO  ",
      "   OCCCCCCCCCCCO  ",
      "   OCCCCCCCCCCCO  ",
      "   OCCCCCCCCCCCO  ",
      "   OCCCCCCCCCCCO  ",
      "   OCCCCCCCCCCCO  ",
      "   OCCCCCCCCCCCO  ",
      "    OOOOOOOOOOO   ",
      "                  ",
    ],
    't-shirt': [
      "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ",
      "      OOOOOO      ",
      "    OCCCSSCCCO    ",
      "    OCCCCCCCOO    ",
      "    OCCCCCCCOO    ",
      "    OCCCCCCCOO    ",
      "    OCCCCCCCOO    ",
      "    OPPPOOPPPO    ",
      "    OOFFOOFFOO    ",
      "    OOOOOOOOOO    ",
      "                  ",
    ]
  },
  accessory: {
    glasses: [
      "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ",
      "   OA AA  AA AO   ",
      "   O A A  A A O   ",
      "   O AA    AA O   ",
      "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ",
    ],
    headphones: [
      "     OOOOOOOO     ",
      "   OOAAhhhhAAOO   ",
      "  OAAHHHHHHHHAAO  ",
      " OAAHHHHHHHHHHAAO ",
      " OAAHHHHHHHHHHAAO ",
      " OAAHhhhhhhHHHAAO ",
      " OAAHSSSSSSSSHHAAO",
      "  OA          AO  ",
      "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ",
    ],
    'robot-ears': [
      "                  ", "                  ", "                  ", "                  ", "                  ",
      "   OA        AO   ",
      "   OA        AO   ",
      "   OA        AO   ",
      "   OAAAAAAAAAAO   ",
      "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ", "                  ",
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
  const [isBlinking, setIsBlinking] = useState(false);
  
  // Mouse tracking for 3D tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const rotateY = useTransform(springX, [0, 1], [-15, 15]);
  const rotateX = useTransform(springY, [0, 1], [15, -15]);

  useEffect(() => {
    if (!animate) return;
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 4000 + Math.random() * 3000);
    return () => clearInterval(blinkInterval);
  }, [animate]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!animate) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // Safe fallbacks
  const skinTone = PALETTE.skin[config.skin as keyof typeof PALETTE.skin] || PALETTE.skin.light;
  const hairTone = PALETTE.hair[config.hairColor as keyof typeof PALETTE.hair] || PALETTE.hair.black;
  
  const COLOR_MAP: Record<string, string> = {
    'O': '#2D1B11', // Outline
    'S': skinTone.S,
    's': skinTone.s,
    'b': skinTone.b,
    'E': '#2D1B11', // Eyes
    '-': '#2D1B11', // Wink/Closed eye
    '.': '#2D1B11', // Thinking/Dot eye
    'H': hairTone.H,
    'h': hairTone.h,
    'C': config.clothesColor || '#E74C3C',
    'c': '#B03A2E',
    'P': '#2980B9',
    'p': '#1F618D',
    'F': '#FFFFFF',
    'A': '#F1C40F',
    ' ': 'transparent',
  };

  const getLayer = (category: string, id: string | null) => {
    if (!id || !LAYERS[category] || !LAYERS[category][id]) return null;
    return LAYERS[category][id];
  };

  const layers = {
    body: LAYERS.base.body,
    face: getLayer('face', config.expression || 'neutral'),
    hair: getLayer('hair', config.hair || 'fluffy'),
    clothes: getLayer('clothes', config.clothes || 'overalls'),
    accessory: getLayer('accessory', config.accessory)
  };

  const renderLayer = (layer: string[] | null, zIndex: number, extraProps: any = {}) => {
    if (!layer) return null;
    return (
      <motion.svg
        viewBox="0 0 18 23"
        className="absolute inset-0 w-full h-full"
        style={{ shapeRendering: 'crispEdges', zIndex, ...extraProps.style }}
        {...extraProps}
      >
        {layer.map((row, y) => 
          row.split('').map((char, x) => {
            if (char === ' ' || char === '.') return null;
            const color = COLOR_MAP[char] || '#FF00FF';
            return <rect key={`${x}-${y}`} x={x} y={y} width="1.05" height="1.05" fill={color} />;
          })
        )}
      </motion.svg>
    );
  };

  return (
    <div 
      className="relative flex items-center justify-center" 
      style={{ 
        width: size, 
        height: size, 
        perspective: '1000px'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Glow */}
      <motion.div 
        className="absolute inset-0 rounded-full blur-[60px] opacity-20 mix-blend-screen"
        style={{ backgroundColor: hairTone.H, scale: animate ? [1, 1.1, 1] : 1 }}
        animate={animate ? { opacity: [0.1, 0.3, 0.1] } : {}}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      <motion.div
        className="relative w-full h-full"
        style={{ 
          rotateX, rotateY, transformStyle: 'preserve-3d',
          imageRendering: 'pixelated'
        }}
        animate={animate ? { y: [0, -5, 0] } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Layer Stack */}
        {renderLayer(layers.body, 1)}
        {renderLayer(layers.face, 3, {
          style: { scaleY: isBlinking ? 0 : 1, originY: '0.45' },
          transition: { duration: 0.1 }
        })}
        {renderLayer(layers.hair, 4)}
        {renderLayer(layers.clothes, 2)}
        {renderLayer(layers.accessory, 5)}
      </motion.div>

      {/* Shadow */}
      <motion.svg 
        viewBox="0 0 18 4" 
        className="absolute -bottom-6 w-[70%] h-auto opacity-20 z-0"
        style={{ scale: animate ? [1, 0.9, 1] : 1 }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ellipse cx="9" cy="2" rx="7" ry="1.5" fill="#000000" />
      </motion.svg>
    </div>
  );
}
