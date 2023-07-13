import * as React from "react";
import {
  render as rtlRender,
  RenderOptions,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { LocationDescriptor, Location } from "history";
import { ElementProvider } from "./contexts/ElementContext";
import ConfirmProvider from "./components/shared/confirm";
import { createPack } from "react-component-pack";

interface RenderParams extends RenderOptions {
  initialHistoryEntries?: LocationDescriptor<unknown>[];
}

export function render(
  ui: React.ReactElement,
  {
    initialHistoryEntries = [{ pathname: "/" }],
    ...renderOptions
  }: RenderParams = {}
) {
  const route: Partial<{ location: Location }> = {};

  const ProviderPack = createPack(ElementProvider, ConfirmProvider);

  function Wrapper({ children }: { children?: React.ReactNode }) {
    return (
      <ProviderPack>
        <MemoryRouter initialEntries={initialHistoryEntries}>
          {children}

          <Route
            path="/"
            render={({ location }) => {
              route.location = location;

              return null;
            }}
          />
        </MemoryRouter>
      </ProviderPack>
    );
  }

  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
    route: route as Required<typeof route>,
  };
}

export async function waitMs(ms = 1) {
  return waitFor(() => new Promise((resolve) => setTimeout(resolve, ms)));
}
