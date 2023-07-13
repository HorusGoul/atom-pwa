import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "whatwg-fetch";
import matchers, {
  TestingLibraryMatchers,
} from "@testing-library/jest-dom/matchers";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Vi {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    interface JestAssertion<T = any>
      extends jest.Matchers<void, T>,
        TestingLibraryMatchers<T, void> {}
  }
}
expect.extend(matchers);

afterEach(() => {
  cleanup();
});
