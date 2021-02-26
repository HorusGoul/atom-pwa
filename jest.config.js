/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
  verbose: true,
  testEnvironment: "jsdom",
  resetMocks: true,
  setupFilesAfterEnv: ["./src/setupTests.ts"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": path.resolve(__dirname, "jest/babelTransform.js"),
    "^.+\\.css$": path.resolve(__dirname, "jest/cssTransform.js"),
    "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": path.resolve(
      __dirname,
      "jest/fileTransform.js"
    ),
  },
  transformIgnorePatterns: ["node_modules"],
  moduleNameMapper: {
    "^@/(.*)": "<rootDir>/src/$1",
    "\\.svg": "<rootDir>/src/__mocks__/svgrMock.js",
  },
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
};
