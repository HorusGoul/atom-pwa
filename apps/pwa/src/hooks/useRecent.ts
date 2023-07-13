import { useCallback, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

const RECENT_KEY = `atom::recent`;

/**
 * Each key corresponds with a file inside the `src/data/hub/items` folder.
 */
type RecentKey =
  | "courses"
  | "mass-calculator"
  | "periodic-table-quiz"
  | "periodic-table"
  | "quizzes"
  | "settings"
  | "unit-converter"
  | "valency-quiz";

export function useRecent() {
  const [recent, setRecent] = useLocalStorage<RecentKey[]>(RECENT_KEY, []);

  const addRecent = useCallback(
    (key: RecentKey) => {
      setRecent((current) => {
        const newRecent = current.filter((recent) => recent !== key);

        newRecent.unshift(key);

        return newRecent;
      });
    },
    [setRecent]
  );

  return { recent, addRecent };
}

export function useAddRecent(key: RecentKey) {
  const { addRecent } = useRecent();

  useEffect(() => {
    addRecent(key);
  }, [key, addRecent]);
}
