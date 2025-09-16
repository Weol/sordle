import { CONFIG } from "../../constants/config";
import { CompletedRow } from "./CompletedRow";
import { CurrentRow } from "./CurrentRow";
import { EmptyRow } from "./EmptyRow";

type Props = {
  solution: string;
  wordLength: number;
  guesses: string[][];
  currentGuess: string[];
};

export const Grid = ({ solution, wordLength, guesses, currentGuess }: Props) => {
  const empties = guesses.length < CONFIG.tries - 1 ? Array.from(Array(CONFIG.tries - 1 - guesses.length)) : [];

  return (
    <div className="pb-6">
      {guesses.map((guess, i) => (
        <CompletedRow solution={solution} key={i} guess={guess} />
      ))}
      {guesses.length < CONFIG.tries && <CurrentRow wordLength={wordLength} guess={currentGuess} />}
      {empties.map((_, i) => (
        <EmptyRow wordLength={wordLength} key={i} />
      ))}
    </div>
  );
};
