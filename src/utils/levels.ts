export const LEVELS = [
  { name: "Newbie", min: 0, max: 100 },
  { name: "Novice", min: 100, max: 250 },
  { name: "Apprenti", min: 250, max: 500 },
  { name: "Codeur", min: 500, max: 1000 },
  { name: "Développeur", min: 1000, max: 2000 },
  { name: "Ingénieur", min: 2000, max: 4000 },
  { name: "Senior", min: 4000, max: 7000 },
  { name: "Lead", min: 7000, max: 12000 },
  { name: "Staff", min: 12000, max: 20000 },
  { name: "Architecte", min: 20000, max: Infinity }
];

export const getLevelInfo = (xp: number) => {
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp < LEVELS[i].max) {
      return { level: i + 1, ...LEVELS[i] };
    }
  }
  return { level: 10, ...LEVELS[9] };
};
