import { BRANCH, COMMIT_HASH } from "@/constants";
import * as SentrySDK from "@sentry/react";
import { Integrations } from "@sentry/tracing";

export function initSentry() {
  if (import.meta.env.DEV) {
    return;
  }

  SentrySDK.init({
    dsn:
      "https://8c979cf560094d8aac2aa531d72a8a62@o524893.ingest.sentry.io/5638124",
    tunnel: "/api/sentry",
    integrations: [new Integrations.BrowserTracing()],
    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
    release: `${COMMIT_HASH}`,
    environment: `${BRANCH}`,
  });
}
