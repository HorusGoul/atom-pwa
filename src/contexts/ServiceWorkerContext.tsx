import { useUnmounted } from "@/hooks/useUnmounted";
import * as React from "react";
import { useImmer } from "use-immer";

interface ServiceWorkerContextType {
  waitingState: ServiceWorker["state"] | null;
  update: () => void;
}

export const ServiceWorkerContext = React.createContext<ServiceWorkerContextType>(
  {
    waitingState: null,
    update: () => null,
  }
);

export function useServiceWorker() {
  return React.useContext(ServiceWorkerContext);
}

export const STORAGE_UPDATE_KEY = "atom:update";

interface State {
  waiting: ServiceWorker | null;
  waitingState: ServiceWorker["state"] | null;
}

export function ServiceWorkerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useImmer<State>(() => ({
    waiting: null,
    waitingState: null,
  }));

  const unmountedRef = useUnmounted();

  React.useEffect(() => {
    async function register() {
      try {
        const registration = await registerServiceWorker();

        if (unmountedRef.current) {
          return;
        }

        registration.addEventListener("updatefound", () => {
          const installing = registration.installing;

          installing?.addEventListener("statechange", () => {
            if (
              installing.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              setState((draft) => {
                draft.waiting = installing;
                draft.waitingState = installing.state;
              });
            }
          });
        });

        const waiting = registration.waiting;

        if (!waiting) {
          return;
        }

        setState((draft) => {
          draft.waiting = waiting;
          draft.waitingState = waiting.state;
        });
      } catch (e) {
        window.console.error("Error during service worker registration:", e);
      }
    }

    if (import.meta.env.PROD && "serviceWorker" in navigator) {
      register();
    }

    window.addEventListener("storage", (event) => {
      if (event.key === STORAGE_UPDATE_KEY) {
        updateInstance();
      }
    });
  }, [unmountedRef, setState]);

  const update = React.useCallback(() => {
    const waiting = state.waiting;

    if (!waiting) {
      return;
    }

    waiting.addEventListener("statechange", () => {
      if (waiting.state === "activated") {
        localStorage.setItem(STORAGE_UPDATE_KEY, new Date().toISOString());
        updateInstance();
      }

      setState((draft) => {
        draft.waitingState = waiting.state;
      });
    });

    waiting.postMessage({ type: "SKIP_WAITING" });
  }, [state.waiting, setState]);

  return (
    <ServiceWorkerContext.Provider
      value={{ waitingState: state.waitingState, update }}
    >
      {children}
    </ServiceWorkerContext.Provider>
  );
}

async function registerServiceWorker() {
  const swUrl = "/sw.js";
  const registration = await navigator.serviceWorker.register(swUrl);

  return registration;
}

function updateInstance() {
  window.location.reload();
}
