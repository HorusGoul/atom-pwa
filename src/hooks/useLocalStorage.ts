import { useState, useEffect, useRef } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const isInitialMount = useRef(true);

  useDeepCompareEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const serializedValue = JSON.stringify(storedValue);

    window.localStorage.setItem(key, serializedValue);
  }, [key, storedValue]);

  useEffect(() => {
    const eventListener = (event: StorageEvent) => {
      if (event.key !== key) {
        return;
      }

      const newValue = JSON.parse(event.newValue ?? "") as T;

      setStoredValue(newValue);
    };

    window.addEventListener("storage", eventListener);

    return () => {
      window.removeEventListener("storage", eventListener);
    };
  }, [key]);

  return [storedValue, setStoredValue] as const;
}
