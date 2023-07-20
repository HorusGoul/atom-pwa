import * as React from "react";
import {
  render as rtlRender,
  RenderOptions,
  waitFor,
} from "@testing-library/react";
import {
  MemoryRouter,
  Route,
  Routes,
  useLocation,
  Location,
  MemoryRouterProps,
} from "react-router-dom";
import { ElementProvider } from "./contexts/ElementContext";
import ConfirmProvider from "./components/shared/confirm";
import { createPack } from "react-component-pack";

interface RenderParams extends RenderOptions {
  initialHistoryEntries?: MemoryRouterProps["initialEntries"];
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

          <LocationGetter
            onLocation={(location) => (route.location = location)}
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

export function LocationGetter({
  onLocation,
}: {
  onLocation: (location: Location) => void;
}) {
  return (
    <Routes>
      <Route
        path="*"
        Component={function LocationGrab() {
          const location = useLocation();

          onLocation(location);

          return null;
        }}
      />
    </Routes>
  );
}
