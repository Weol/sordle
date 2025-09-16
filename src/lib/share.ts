import { CONFIG } from "../constants/config";
import { getGuessStatuses } from "./statuses";

export const shareStatus = (
  gameName: string,
  solution: string,
  solutionIndex: number,
  guesses: string[][],
  lost: boolean,
) => {
  navigator.clipboard.writeText(
    gameName +
      " " +
      `${lost ? "X" : guesses.length}` +
      "/" +
      CONFIG.tries.toString() +
      "\n\n" +
      generateEmojiGrid(solution, guesses) +
      "\n\n" +
      window.location.href.replace(`${window.location.protocol}//`, ""),
  );
};

export const generateEmojiGrid = (solution: string, guesses: string[][]) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(solution, guess);
      return guess
        .map((_, i) => {
          switch (status[i]) {
            case "correct":
              return "🟩";
            case "present":
              return "🟨";
            default:
              return "⬜";
          }
        })
        .join("");
    })
    .join("\n");
};
