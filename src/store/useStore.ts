import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Lang } from '../utils/i18n';

interface StreakData {
  count: number;
  lastDate: string | null;
  history: number[];
}

interface SrsItem {
  score: number;
  lastReviewed: number;
  nextReview: number;
}

export type SubscriptionPlan = 'free' | 'pro';

export type AvatarConfig = {
  base: string;
  hair: string;
  eyes: string;
  clothes: string;
  accessory: string | null;
};

interface StoreState {
  xp: number;
  favorites: string[];
  completed: number[];
  completedUniversal: string[]; // IDs like 'beginner-1', 'intermediate-2'
  avatar: AvatarConfig;
  unlockedAccessories: string[];
  srs: Record<string, SrsItem>;
  streakData: StreakData;
  lastAlgo: string | null;
  user: any | null;
  profile: any | null;
  subscriptionPlan: SubscriptionPlan;
  uiLang: Lang;
  addXp: (amount: number) => void;
  toggleFavorite: (id: string) => void;
  toggleCompleted: (id: number) => void;
  toggleUniversalCompleted: (id: string) => void;
  updateAvatar: (config: Partial<AvatarConfig>) => void;
  unlockAccessory: (id: string) => void;
  updateSrs: (id: string, quality: number) => void;
  setLastAlgo: (algoId: string) => void;
  checkStreak: () => void;
  setUser: (user: any) => void;
  setProfile: (profile: any) => void;
  setSubscriptionPlan: (plan: 'free' | 'pro') => void;
  setUiLang: (lang: Lang) => void;
  signOut: () => void;
}

const getNextInterval = (score: number, quality: number) => {
  if (quality < 3) return 0;
  if (score === 0) return 1;
  if (score === 1) return 3;
  if (score === 2) return 7;
  return 14;
};

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      xp: 0,
      favorites: [],
      completed: [],
      completedUniversal: [],
      avatar: {
        base: 'round',
        hair: 'short',
        eyes: 'neutral',
        clothes: 'hoodie',
        accessory: null
      },
      unlockedAccessories: ['classic-glasses'],
      srs: {},
      streakData: { count: 0, lastDate: null, history: [2, 5, 3, 7, 4, 8, 5] },
      lastAlgo: null,
      user: null,
      profile: null,
      subscriptionPlan: 'free',
      uiLang: 'fr',

      addXp: (amount) => set((state) => ({ xp: state.xp + amount })),
      
      toggleUniversalCompleted: (id) => set((state) => ({
        completedUniversal: state.completedUniversal.includes(id)
          ? state.completedUniversal.filter(cid => cid !== id)
          : [...state.completedUniversal, id]
      })),

      updateAvatar: (config) => set((state) => ({
        avatar: { ...state.avatar, ...config }
      })),

      unlockAccessory: (id) => set((state) => ({
        unlockedAccessories: state.unlockedAccessories.includes(id)
          ? state.unlockedAccessories
          : [...state.unlockedAccessories, id]
      })),
      toggleFavorite: (id) => set((state) => ({
        favorites: state.favorites.includes(id)
          ? state.favorites.filter(fid => fid !== id)
          : [...state.favorites, id]
      })),
      
      toggleCompleted: (id) => set((state) => ({
        completed: state.completed.includes(id)
          ? state.completed.filter(cid => cid !== id)
          : [...state.completed, id]
      })),
      
      updateSrs: (id, quality) => set((state) => {
        const item = state.srs[id] || { score: 0 };
        const newScore = quality >= 3 ? Math.min(5, item.score + 1) : 0;
        const intervalDays = getNextInterval(item.score, quality);
        return {
          srs: {
            ...state.srs,
            [id]: {
              score: newScore,
              lastReviewed: Date.now(),
              nextReview: Date.now() + intervalDays * 86400000
            }
          }
        };
      }),

      setLastAlgo: (algoId) => set({ lastAlgo: algoId }),

      checkStreak: () => set((state) => {
        const today = new Date().toDateString();
        if (state.streakData.lastDate === today) return state;

        const yesterday = new Date(Date.now() - 86400000).toDateString();
        let newHist = [...state.streakData.history];
        if (newHist.length > 6) newHist.shift();

        if (state.streakData.lastDate === yesterday) {
          const newCount = state.streakData.count + 1;
          newHist.push(newCount);
          return { streakData: { count: newCount, lastDate: today, history: newHist } };
        } else {
          newHist.push(1);
          return { streakData: { count: 1, lastDate: today, history: newHist } };
        }
      }),

      setUser: (user) => set({ user }),
      setProfile: (profile) => set({ profile }),
      setSubscriptionPlan: (plan) => set({ subscriptionPlan: plan }),
      setUiLang: (lang) => set({ uiLang: lang }),
      signOut: () => set({ user: null, profile: null })
    }),
    {
      name: 'codelearn-storage',
    }
  )
);
