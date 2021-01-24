const swRegister = async () => {
  const swUrl = "/sw.js";
  const registration = await navigator.serviceWorker.register(swUrl);

  registration.addEventListener("updatefound", () => {
    const installingWorker = registration.installing;

    installingWorker?.addEventListener("statechange", () => {
      if (installingWorker.state === "installed") {
        if (navigator.serviceWorker.controller) {
          // At this point, the old content will have been purged and
          // the fresh content will have been added to the cache.
          // It's the perfect time to display a "New content is
          // available; please refresh." message in your web app.
          if (window.location.pathname === "/") {
            window.location.reload();
          }
        } else {
          // At this point, everything has been precached.
          // It's the perfect time to display a
          // "Content is cached for offline use." message.
          window.console.log("Content is cached for offline use.");
        }
      }
    });
  });
};

export default function register() {
  // Register the service worker
  if (
    (process.env.NODE_ENV === "production" ||
      process.env.NODE_ENV === "prod-dev") &&
    "serviceWorker" in navigator
  ) {
    window.addEventListener("load", async () => {
      try {
        swRegister();
      } catch (e) {
        window.console.error("Error during service worker registration:", e);
      }
    });
  }
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}
