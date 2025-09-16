import { Cell } from "./Cell";

type Props = {
  wordLength: number;
  guess: string[];
};

export const CurrentRow = ({ wordLength, guess }: Props) => {
  const splitGuess = guess;
  const emptyCells = Array.from(Array(wordLength - splitGuess.length));

  return (
    <div className="flex justify-center mb-1">
      {splitGuess.map((letter, i) => (
        <Cell key={i} value={letter} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  );
};
