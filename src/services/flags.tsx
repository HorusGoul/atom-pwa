import NativeBridge from "@/NativeBridge";
import create from "zustand";

const REMOTE_FLAGS_SERVICE_ENDPOINT = String(
  import.meta.env.VITE_APP_REMOTE_FLAGS_SERVICE_ENDPOINT ?? ""
);

type Flags = {
  isMoya: boolean;
  isAndroid: boolean;
  isHybrid: boolean;
  showDownloadAppAndroid: boolean;
  eTeacherCampaign: boolean;
  [key: string]: boolean;
};

export const useFlagStore = create<Flags>(() => ({
  isMoya: false,
  isAndroid: false,
  isHybrid: NativeBridge.isHybrid(),
  showDownloadAppAndroid: false,
  eTeacherCampaign: false,
}));

export const flags = useFlagStore.getState();

export function loadFlags() {
  const url = new URLSearchParams(window.location.search);
  const utmSource = url.get("utm_source");

  const overrides: Partial<typeof flags> = {};

  if (utmSource?.match(/moya/i)) {
    overrides.isMoya = true;
  }

  if (/android/i.test(navigator.userAgent)) {
    overrides.isAndroid = true;
  }

  if (flags.isMoya && flags.isAndroid) {
    overrides.showDownloadAppAndroid = true;
  }

  useFlagStore.setState(overrides);

  if (!REMOTE_FLAGS_SERVICE_ENDPOINT) {
    return;
  }

  fetchRemoteFlags().catch(() => null);
}

async function fetchRemoteFlags() {
  const flags = await fetch(REMOTE_FLAGS_SERVICE_ENDPOINT, {
    headers: {
      Accept: "application/json",
    },
  }).then((response) => response.json());

  useFlagStore.setState(flags);
}
