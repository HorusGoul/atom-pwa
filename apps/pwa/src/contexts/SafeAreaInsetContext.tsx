import { createContext, useContext, useEffect, useState } from "react";

export interface SafeAreaInset {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

document.documentElement.style.setProperty(
  "--safe-area-inset-top",
  "env(safe-area-inset-top, 0px)"
);
document.documentElement.style.setProperty(
  "--safe-area-inset-right",
  "env(safe-area-inset-right, 0px)"
);
document.documentElement.style.setProperty(
  "--safe-area-inset-bottom",
  "env(safe-area-inset-bottom, 0px)"
);
document.documentElement.style.setProperty(
  "--safe-area-inset-left",
  "env(safe-area-inset-left, 0px)"
);

export const SafeAreaInsetContext = createContext<SafeAreaInset>(
  getSafeAreaInset()
);

export function useSafeAreaInset() {
  return useContext(SafeAreaInsetContext);
}

export function SafeAreaInsetProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const defaultValue = useSafeAreaInset();
  const [state, setState] = useState(defaultValue);

  useEffect(() => {
    const listener = () => {
      setState(getSafeAreaInset());
    };

    window.addEventListener("orientationchange", listener);

    return () => {
      window.removeEventListener("orientationchange", listener);
    };
  }, []);

  return (
    <SafeAreaInsetContext.Provider value={state}>
      {children}
    </SafeAreaInsetContext.Provider>
  );
}

function getSafeAreaInset(): SafeAreaInset {
  const element = document.documentElement;
  const style = getComputedStyle(element);

  const top = parseInt(style.getPropertyValue("--safe-area-inset-top"));
  const right = parseInt(style.getPropertyValue("--safe-area-inset-right"));
  const bottom = parseInt(style.getPropertyValue("--safe-area-inset-bottom"));
  const left = parseInt(style.getPropertyValue("--safe-area-inset-left"));

  return {
    top,
    right,
    bottom,
    left,
  };
}
