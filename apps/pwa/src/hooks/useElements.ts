import * as React from "react";
import { ElementContext } from "@/contexts/ElementContext";

export function useElements() {
  return React.useContext(ElementContext);
}
