import { useRef, useEffect } from "react";

export function useUnmounted() {
  const unmountedRef = useRef(false);

  useEffect(() => {
    return () => {
      unmountedRef.current = true;
    };
  }, []);

  return unmountedRef;
}
