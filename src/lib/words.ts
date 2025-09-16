import { CONFIG } from "../constants/config";
import { WORDS } from "../constants/wordlist";

function getWordOfTheDay(seed: number, words: string[]) {
  const epochMs = new Date(CONFIG.startDate).valueOf();
  const now = Date.now();
  const msInDay = 86400000;
  const solutionIndex = Math.floor((now - epochMs) / msInDay);
  const seededSolutionIndex = solutionIndex + Math.floor(seed * words.length);
  const tomorrow = (solutionIndex + 1) * msInDay + epochMs;

  const index = CONFIG.shuffle ? seededSolutionIndex : solutionIndex;
  const solution = words[index % words.length];

  return {
    solution,
    solutionIndex: index,
    tomorrow,
  };
}

export function useWords(seed: number) {
  const words = WORDS;
  const { solution, solutionIndex, tomorrow } = getWordOfTheDay(seed, words);

  const isWordInWordList = (word: string) => {
    return words.includes(word);
  };

  const isWinningWord = (word: string) => {
    return solution === word;
  };

  return { isWinningWord, isWordInWordList, solution, solutionIndex, tomorrow };
}
