import { useCallback, useMemo } from "react";
import { useSettings } from "./useSettings";

export const DEFAULT_THEME = "dark";
export const THEMES_LIST = ["dark", "light", "black"];

const PRIMARY_COLORS: Record<string, string> = {
  black: "#000000",
  dark: "#193132",
  light: "#00897b",
};

export function useTheme() {
  const { settings, updateSettings } = useSettings();
  const theme = settings.theme;

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
