const seedKey = "seed";

type Seed = {
  seed: number;
};

export const saveSeedToLocalStorage = (seed: number | null) => {
  if (seed === null) {
    localStorage.removeItem(seedKey);
  } else {
    localStorage.setItem(seedKey, JSON.stringify({ seed }));
  }
};

export const loadSeedFromLocalStorage = () => {
  const stored = localStorage.getItem(seedKey);
  const seed = stored ? (JSON.parse(stored) as Seed) : null;
  if (seed) return seed.seed;
  return null;
};

const gameStateKey = "gameState";

type StoredGameState = {
  guesses: string[][];
  solution: string;
};

export const saveGameStateToLocalStorage = (gameState: StoredGameState) => {
  localStorage.setItem(gameStateKey, JSON.stringify(gameState));
};

export const loadGameStateFromLocalStorage = () => {
  const state = localStorage.getItem(gameStateKey);
  return state ? (JSON.parse(state) as StoredGameState) : null;
};

const gameStatKey = "gameStats";

export type GameStats = {
  winDistribution: number[];
  gamesFailed: number;
  currentStreak: number;
  bestStreak: number;
  totalGames: number;
  successRate: number;
};

export const saveStatsToLocalStorage = (gameStats: GameStats) => {
  localStorage.setItem(gameStatKey, JSON.stringify(gameStats));
};

export const loadStatsFromLocalStorage = () => {
  const stats = localStorage.getItem(gameStatKey);
  return stats ? (JSON.parse(stats) as GameStats) : null;
};
