import * as React from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

export function useLockBodyScroll(
  ref: React.RefObject<HTMLElement>,
  active = true
) {
  React.useLayoutEffect(() => {
    const element = ref.current;

    if (element) {
      if (active) {
        disableBodyScroll(element);
      } else {
        enableBodyScroll(element);
      }
    }

    return () => {
      if (element) {
        enableBodyScroll(element);
      }
    };
  }, [active, ref]);
}
