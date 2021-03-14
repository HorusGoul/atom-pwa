import * as React from "react";

export default function useInstance<TInstance>(init: () => TInstance) {
  const ref = React.useRef<TInstance | null>(null);
  if (ref.current === null) {
    // This is concurrent mode safe, will not cause tearing
    // since it only happens once.
    ref.current = init();
  }
  return ref.current as TInstance;
}
