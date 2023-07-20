import { useUnmounted } from "@/hooks/useUnmounted";
import * as React from "react";

interface ServiceWorkerContextType {
  waitingState: ServiceWorker["state"] | null;
  update: () => void;
  checkForUpdates: () => void;
}

export const ServiceWorkerContext = React.createContext<ServiceWorkerContextType>(
  {
    waitingState: null,
    update: () => null,
    checkForUpdates: () => null,
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
  const [state, setState] = React.useState<State>(() => ({
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
              setState({
                waiting: installing,
                waitingState: installing.state,
              });
            }
          });
        });

        const waiting = registration.waiting;

        if (!waiting) {
          return;
        }

        setState({
          waiting: waiting,
          waitingState: waiting.state,
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
    try {
      const waiting = state.waiting;

      if (!waiting) {
        return;
      }

      waiting.addEventListener("statechange", () => {
        if (waiting.state === "activated") {
          localStorage.setItem(STORAGE_UPDATE_KEY, new Date().toISOString());
          updateInstance();
        }

        setState((current) => ({
          ...current,
          waitingState: waiting.state,
        }));
      });

      waiting.postMessage({ type: "SKIP_WAITING" });
    } catch (e) {
      window.console.error("Error during service worker update:", e);
    }
  }, [state.waiting, setState]);

  const checkForUpdates = React.useCallback(() => {
    if (import.meta.env.PROD && "serviceWorker" in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => registration.update())
        .catch((e) =>
          window.console.error(
            "Error while checking for service worker updates:",
            e
          )
        );
    }
  }, []);

  return (
    <ServiceWorkerContext.Provider
      value={{ waitingState: state.waitingState, update, checkForUpdates }}
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
