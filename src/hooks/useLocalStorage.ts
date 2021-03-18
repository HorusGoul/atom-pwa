import { useState, useCallback, useEffect } from "react";

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

  const setValue = useCallback(
    (value: T | ((currentValue: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        const serializedValue = JSON.stringify(valueToStore);
        window.localStorage.setItem(key, serializedValue);
        window.dispatchEvent(
          new StorageEvent("storage", { key, newValue: serializedValue })
        );
      } catch (error) {
        console.error(error);
      }
    },
    [key, storedValue]
  );

  useEffect(() => {
    const eventListener = (event: StorageEvent) => {
      if (event.key === key) {
        const newValue = JSON.parse(event.newValue ?? "") as T;
        if (storedValue !== newValue) {
          setStoredValue(newValue);
        }
      }
    };

    window.addEventListener("storage", eventListener);

    return () => {
      window.removeEventListener("storage", eventListener);
    };
  }, [key, storedValue]);

  return [storedValue, setValue] as const;
}
