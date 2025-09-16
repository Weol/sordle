import "@bcgov/bc-sans/css/BCSans.css";
import { ChartBarIcon, InformationCircleIcon, RefreshIcon, CogIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import type { WithTranslation } from "react-i18next";
import { withTranslation } from "react-i18next";
import { Alert } from "./components/alerts/Alert";
import { Grid } from "./components/grid/Grid";
import { Keyboard } from "./components/keyboard/Keyboard";
import { InfoModal } from "./components/modals/InfoModal";
import { SettingsModal } from "./components/modals/SettingsModal";
import { StatsModal } from "./components/modals/StatsModal";
import { CONFIG } from "./constants/config";
import "./i18n/i18n";
import { availableLanguages } from "./i18n/i18n";
import {
  loadGameStateFromLocalStorage,
  loadSeedFromLocalStorage,
  saveGameStateToLocalStorage,
  saveSeedToLocalStorage,
} from "./lib/localStorage";
import { addStatsForCompletedGame, loadStats } from "./lib/stats";
import { useWords } from "./lib/words";
import { useTheme } from "./lib/theme";

const ALERT_TIME_MS = 1000;

const loadOrCreateSeed = () => {
  let seed = loadSeedFromLocalStorage();
  if (!seed) {
    seed = Math.random();
    saveSeedToLocalStorage(seed);
  }
  return seed;
};

const App: React.FC<WithTranslation> = ({ t }) => {
  const [seed, setSeed] = useState<number>(loadOrCreateSeed());
  const { isWinningWord, isWordInWordList, solution, solutionIndex, tomorrow } = useWords(seed);
  const wordLength = solution.length;
  const [currentGuess, setCurrentGuess] = useState<Array<string>>([]);
  const [isGameWon, setIsGameWon] = useState(false);
  const { theme } = useTheme()
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isI18nModalOpen, setIsI18nModalOpen] = useState(false);
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);
  const [successAlert, setSuccessAlert] = useState("");
  const [guesses, setGuesses] = useState<string[][]>(() => {
    const loaded = loadGameStateFromLocalStorage();
    if (loaded?.solution !== solution) {
      return [];
    }
    const gameWasWon = loaded.guesses.map((guess) => guess.join("")).includes(solution);
    if (gameWasWon) {
      setIsGameWon(true);
    }
    if (loaded.guesses.length === CONFIG.tries && !gameWasWon) {
      setIsGameLost(true);
    }
    return loaded.guesses;
  });

  const [stats, setStats] = useState(() => loadStats());

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution });
  }, [guesses, solution]);

  useEffect(() => {
    if (isGameWon) {
      const WIN_MESSAGES = t("winMessages", { returnObjects: true });
      setSuccessAlert(WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]);
      setTimeout(() => {
        setSuccessAlert("");
        setIsStatsModalOpen(true);
      }, ALERT_TIME_MS);
    }
    if (isGameLost) {
      setTimeout(() => {
        setIsStatsModalOpen(true);
      }, ALERT_TIME_MS);
    }
  }, [isGameWon, isGameLost, t]);

  const refreshSeed = () => {
    saveSeedToLocalStorage(null);
    setSeed(loadOrCreateSeed());
    setGuesses([]);
    setCurrentGuess([]);
    setIsStatsModalOpen(false);
    setIsGameWon(false);
    setIsGameLost(false);
    return seed;
  };

  const onChar = (value: string) => {
    if (currentGuess.length < wordLength && guesses.length < CONFIG.tries && !isGameWon) {
      const newGuess = currentGuess.concat([value]);
      setCurrentGuess(newGuess);
    }
  };

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const onEnter = () => {
    if (isGameWon || isGameLost) {
      return;
    }
    if (!(currentGuess.length === wordLength)) {
      setIsNotEnoughLetters(true);
      return setTimeout(() => {
        setIsNotEnoughLetters(false);
      }, ALERT_TIME_MS);
    }

    if (!isWordInWordList(currentGuess.join(""))) {
      setIsWordNotFoundAlertOpen(true);
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false);
      }, ALERT_TIME_MS);
    }
    const winningWord = isWinningWord(currentGuess.join(""));

    if (currentGuess.length === wordLength && guesses.length < CONFIG.tries && !isGameWon) {
      setGuesses([...guesses, currentGuess]);
      setCurrentGuess([]);

      if (winningWord) {
        setStats(addStatsForCompletedGame(stats, guesses.length));
        return setIsGameWon(true);
      }

      if (guesses.length === CONFIG.tries - 1) {
        setStats(addStatsForCompletedGame(stats, guesses.length + 1));
        setIsGameLost(true);
      }
    }
  };
  let translateElement = <div></div>;
  if (availableLanguages.length > 1) {
    translateElement = (
      <CogIcon className="h-6 w-6 cursor-pointer mr-2" onClick={() => setIsI18nModalOpen(true)} />
    );
  }

  return (
    <div data-theme={theme} className="py-8 h-screen mx-auto sm:px-6 lg:px-8 bg-background text-writing">
      <div className="flex w-80 mx-auto items-center mb-8">
        <h1 className="text-xl grow font-bold">{t("gameName")}</h1>
        {translateElement}
        <InformationCircleIcon className="h-6 w-6 cursor-pointer mr-2" onClick={() => setIsInfoModalOpen(true)} />
        <ChartBarIcon className="h-6 w-6 cursor-pointer mr-2" onClick={() => setIsStatsModalOpen(true)} />
        <RefreshIcon className="h-6 w-6 cursor-pointer mr-2" onClick={() => refreshSeed()} />
      </div>
      <Grid solution={solution} wordLength={wordLength} guesses={guesses} currentGuess={currentGuess} />
      <Keyboard solution={solution} onChar={onChar} onDelete={onDelete} onEnter={onEnter} guesses={guesses} />
      <SettingsModal
        isOpen={isI18nModalOpen}
        handleClose={() => setIsI18nModalOpen(false)}
      />
      <InfoModal isOpen={isInfoModalOpen} handleClose={() => setIsInfoModalOpen(false)} />
      <StatsModal
        solution={solution}
        solutionIndex={solutionIndex}
        tomorrow={tomorrow}
        isOpen={isStatsModalOpen}
        handleClose={() => setIsStatsModalOpen(false)}
        guesses={guesses}
        gameStats={stats}
        isGameLost={isGameLost}
        isGameWon={isGameWon}
        refresh={refreshSeed}
        handleShare={() => {
          setSuccessAlert(t("gameCopied"));
          return setTimeout(() => setSuccessAlert(""), ALERT_TIME_MS);
        }}
      />

      <Alert message={t("notEnoughLetters")} isOpen={isNotEnoughLetters} />
      <Alert message={t("wordNotFound")} isOpen={isWordNotFoundAlertOpen} />
      <Alert message={t("solution", { solution })} isOpen={isGameLost} />
      <Alert message={successAlert} isOpen={successAlert !== ""} variant="success" />
    </div>
  );
};

const AppWithTranslation = withTranslation()(App);

export default AppWithTranslation;
