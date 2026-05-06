import React from 'react';
import { motion } from 'framer-motion';
import type { AvatarConfig } from '../store/useStore';

interface Props {
  config: AvatarConfig;
  size?: number;
}

export default function AvatarRenderer({ config, size = 200 }: Props) {
  const getBaseColor = () => {
    switch (config.base) {
      case 'round': return '#FFD5A1';
      case 'square': return '#E0AC69';
      case 'oval': return '#8D5524';
      default: return '#FFD5A1';
    }
  };

  const getHairColor = () => {
    switch (config.hair) {
      case 'short': return '#4A2C2A';
      case 'long': return '#9B5B3E';
      case 'spiky': return '#2C3E50';
      default: return '#4A2C2A';
    }
  };

  return (
    <div 
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
        {/* Background Glow */}
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--green)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--green)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="50" fill="url(#glow)" />

        {/* Body/Shirt */}
        <motion.path
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          d="M20,95 Q50,70 80,95 L80,100 L20,100 Z"
          fill={config.clothes === 'hoodie' ? '#34495E' : '#E74C3C'}
        />

        {/* Face Base */}
        <motion.rect
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          x="25" y="30" width="50" height="50"
          rx={config.base === 'round' ? '25' : config.base === 'square' ? '8' : '15'}
          fill={getBaseColor()}
        />

        {/* Eyes */}
        <motion.g
          animate={{ 
            scaleY: config.eyes === 'blink' ? 0.1 : 1,
          }}
          transition={{ 
            repeat: Infinity, 
            repeatDelay: 3, 
            duration: 0.15 
          }}
        >
          <circle cx="40" cy="50" r="3" fill="#2C3E50" />
          <circle cx="60" cy="50" r="3" fill="#2C3E50" />
        </motion.g>

        {/* Hair */}
        <path
          d={
            config.hair === 'short' 
              ? "M25,40 Q50,20 75,40 L75,45 L25,45 Z"
              : config.hair === 'spiky'
              ? "M25,40 L35,20 L50,35 L65,20 L75,40 Z"
              : "M20,40 Q50,10 80,40 L85,80 L15,80 Z"
          }
          fill={getHairColor()}
        />

        {/* Accessory */}
        {config.accessory && (
          <motion.g
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {config.accessory === 'beginner-badge' && (
              <text x="70" y="85" fontSize="12">🌱</text>
            )}
            {config.accessory === 'scholar-hat' && (
              <path d="M20,30 L50,15 L80,30 L50,45 Z" fill="#2C3E50" />
            )}
            {config.accessory === 'expert-crown' && (
              <path d="M30,30 L35,15 L50,25 L65,15 L70,30 Z" fill="#F1C40F" />
            )}
            {config.accessory === 'classic-glasses' && (
              <g stroke="#2C3E50" strokeWidth="1.5" fill="none">
                <circle cx="40" cy="50" r="6" />
                <circle cx="60" cy="50" r="6" />
                <path d="M46,50 L54,50" />
              </g>
            )}
          </motion.g>
        )}
      </svg>
    </div>
  );
}
