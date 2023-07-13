import { ResizeObserver } from "@juggle/resize-observer";

if (!("ResizeObserver" in window)) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
}
