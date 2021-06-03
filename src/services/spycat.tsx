declare global {
  interface PlausibleEvents {
    ["404"]: { path: string };
    search: { search_query: string };
    test: {
      value: number;
      event_action: string;
    };
    rating: { event_action: string };
    [key: string]: never;
  }
}

export function logEvent<T extends keyof PlausibleEvents>(
  type: T,
  params?: PlausibleEvents[T]
) {
  window?.plausible?.(type, { props: params } as EventOptionsTuple<
    PlausibleEvents[T]
  >);
}
