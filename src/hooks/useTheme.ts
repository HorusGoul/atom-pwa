import { useCallback, useMemo } from "react";
import { useSettings } from "./useSettings";

export const DEFAULT_THEME = "dark";
export const THEMES_LIST = ["dark", "light"];

const PRIMARY_COLORS: Record<string, string> = {
  dark: "#1a1a1a",
  light: "#00897b",
};

export function useTheme() {
  const { settings, updateSettings } = useSettings();
  let theme = settings.theme;

  if (theme === "black") {
    theme = "dark";
  }

  const setTheme = useCallback(
    (theme: string) => {
      updateSettings((settings) => {
        settings.theme = theme;
      });
    },
    [updateSettings]
  );

  const primaryColor = useMemo(() => PRIMARY_COLORS[theme], [theme]);

  return {
    theme,
    setTheme,
    primaryColor,
  };
}
