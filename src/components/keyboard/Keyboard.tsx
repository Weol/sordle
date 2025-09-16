import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ORTHOGRAPHY, ORTHOGRAPHY_LAYOUT } from "../../constants/orthography";
import type { KeyValue } from "../../lib/keyboard";
import { getStatuses } from "../../lib/statuses";
import { Key } from "./Key";

type Props = {
  onChar: (value: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  solution: string;
  guesses: string[][];
};

export const Keyboard = ({ onChar, onDelete, onEnter, guesses, solution }: Props) => {
  const { t } = useTranslation();
  const charStatuses = getStatuses(solution, guesses);

  const onClick = (value: KeyValue) => {
    if (value === "ENTER") {
      onEnter();
    } else if (value === "DELETE") {
      onDelete();
    } else {
      onChar(value);
    }
  };

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === "Enter") {
        onEnter();
      } else if (e.code === "Backspace") {
        onDelete();
      } else {
        const key = e.key.toLocaleLowerCase();
        if (key.length === 1 && ORTHOGRAPHY.includes(key)) {
          onChar(key);
        }
      }
    };
    window.addEventListener("keyup", listener);
    return () => {
      window.removeEventListener("keyup", listener);
    };
  }, [onEnter, onDelete, onChar]);

  return (
    <div>
      {ORTHOGRAPHY_LAYOUT.map((row, i, array) => (
        <div key={i} className="flex justify-center mb-1">
          {i === array.length - 1 && (
            <Key key="enterKey" width={65.4} value="ENTER" onClick={onClick}>
              {t("enterKey")}
            </Key>
          )}
          {row.map((char) => (
            <Key key={char} value={char} onClick={onClick} status={charStatuses[char]} />
          ))}
          {i === array.length - 1 && (
            <Key key="deleteKey" width={65.4} value="DELETE" onClick={onClick}>
              {t("deleteKey")}
            </Key>
          )}
        </div>
      ))}
    </div>
  );
};
