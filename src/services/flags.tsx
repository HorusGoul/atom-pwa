import NativeBridge from "@/NativeBridge";

export const flags = {
  isMoya: false,
  isAndroid: false,
  isHybrid: NativeBridge.isHybrid(),
  showDownloadAppAndroid: false,
};

export function loadFlags() {
  const url = new URLSearchParams(window.location.search);
  const utmSource = url.get("utm_source");

  if (utmSource?.match(/moya/i)) {
    flags.isMoya = true;
  }

  if (/android/i.test(navigator.userAgent)) {
    flags.isAndroid = true;
  }

  if (flags.isMoya && flags.isAndroid) {
    flags.showDownloadAppAndroid = true;
  }
}
