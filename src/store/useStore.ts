import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

interface StoreState {
  xp: number;
  favorites: string[];
  completed: number[];
  srs: Record<string, SrsItem>;
  streakData: StreakData;
  lastAlgo: string | null;
  addXp: (amount: number) => void;
  toggleFavorite: (id: string) => void;
  toggleCompleted: (id: number) => void;
  updateSrs: (id: string, quality: number) => void;
  setLastAlgo: (algoId: string) => void;
  checkStreak: () => void;
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
    (set, get) => ({
      xp: 0,
      favorites: [],
      completed: [],
      srs: {},
      streakData: { count: 0, lastDate: null, history: [2, 5, 3, 7, 4, 8, 5] },
      lastAlgo: null,
      
      addXp: (amount) => set((state) => ({ xp: state.xp + amount })),
      
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
      })
    }),
    {
      name: 'codelearn-storage',
    }
  )
);
