import { useCallback } from "react";
import { create } from "zustand";

interface LocalStorageCacheStore<T = unknown> {
  data: Record<string, T>;
  set: (key: string, value: T | ((current: T) => T)) => void;
  get: <T>(key: string, defaultValue: T) => T;
}

const useLocalStorageCacheStore = create<LocalStorageCacheStore>(
  (update, getState) => ({
    data: {},
    set: (key, value) => {
      if (typeof value === "function") {
        value = value(getState().data[key]);
      }

      update((state) => {
        return {
          ...state,
          data: {
            ...state.data,
            [key]: value,
          },
        };
      });

      window.localStorage.setItem(key, JSON.stringify(value));
    },
    get: <T = unknown>(key: string, defaultValue: T) => {
      const { set, data } = getState();
      let value = data[key];

      if (!(key in data)) {
        // Retrieve from localStorage
        try {
          const item = window.localStorage.getItem(key);
          value = item ? JSON.parse(item) : defaultValue;
        } catch (error) {
          console.error(error);
          value = defaultValue;
        }

        set(key, value);
      }

      return value as T;
    },
  })
);

window.addEventListener("storage", (event) => {
  if (!event.key) {
    return;
  }

  const newValue = JSON.parse(event.newValue ?? "") as Record<string, unknown>;
  const { set } = useLocalStorageCacheStore.getState();

  set(event.key, newValue);
});

export function useLocalStorage<T>(key: string, initialValue: T) {
  const set = useLocalStorageCacheStore(({ set }) => set);
  const data = useLocalStorageCacheStore<T>(({ get }) =>
    get(key, initialValue)
  );

  const setValue = useCallback(
    (value: T | ((current: T) => T)) => {
      set(key, value);
    },
    [set, key]
  );

  return [data, setValue] as const;
}
