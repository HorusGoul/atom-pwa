import NativeBridge from "@/NativeBridge";
import { DEFAULT_LOCALE } from "./defaultLocale";

export function getBrowserLocale() {
  const lang = NativeBridge.getSystemLanguage() || DEFAULT_LOCALE;
  return lang;
}
