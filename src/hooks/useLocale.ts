import { useCallback, useMemo } from "react";
import invariant from "invariant";
import NativeBridge from "../NativeBridge";
import localePercentages from "../locales/percentages.json";
import { useSettings } from "./useSettings";

const DEFAULT_LOCALE = "en";

export const SUPPORTED_LOCALES = Object.entries(localePercentages)
  .filter(([, percentage]) => percentage >= 85)
  .map(([locale]) => locale);

const localesMap = import.meta.globEager("../locales/*.json");
const getLocaleKey = (locale: string) => `../locales/${locale}.json`;

const common: Record<string, string> = localesMap[getLocaleKey("common")];
const defaultLocales: Record<string, string> =
  localesMap[getLocaleKey(DEFAULT_LOCALE)];

export function getBrowserLocale() {
  const lang = NativeBridge.getSystemLanguage() || DEFAULT_LOCALE;
  return lang;
}

export function useLocale() {
  const { settings, updateSettings } = useSettings();
  const lang = settings.locale;
  const locale = useMemo(() => {
    let resolvedLang = lang.replace("-", "_");

    if (SUPPORTED_LOCALES.includes(lang)) {
      resolvedLang = lang;
    } else if (SUPPORTED_LOCALES.includes(lang.slice(0, 2))) {
      resolvedLang = lang.slice(0, 2);
    } else {
      resolvedLang = DEFAULT_LOCALE;
    }

    return localesMap[getLocaleKey(resolvedLang)];
  }, [lang]);

  const setLang = useCallback(
    (lang: string) => {
      updateSettings((settings) => {
        settings.locale = lang;
      });
    },
    [updateSettings]
  );

  const i18n = useCallback(
    (localeName: string): string => {
      const result =
        locale?.[localeName] ||
        defaultLocales[localeName] ||
        common[localeName];

      invariant(
        result,
        `[Locale] The string name "${localeName}" doesn't have a value.`
      );

      return result;
    },
    [locale]
  );

  return {
    lang,
    setLang,
    i18n,
  };
}
