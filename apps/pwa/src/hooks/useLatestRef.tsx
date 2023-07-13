import * as React from "react";

export default function useLatestRef<TValue>(value: TValue) {
  const ref = React.useRef(value);
  React.useLayoutEffect(() => {
    ref.current = value;
  }, [value]);
  return ref;
}
