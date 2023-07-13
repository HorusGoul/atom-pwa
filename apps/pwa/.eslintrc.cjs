/**
 * @type {import('eslint').Linter.Config}
 */
const config = {
  env: {
    "cypress/globals": true,
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:import/warnings",
    "plugin:import/errors",
    "plugin:import/typescript",
    "plugin:testing-library/dom",
    "plugin:cypress/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: [
    "react",
    "react-hooks",
    "@typescript-eslint",
    "prettier",
    "import",
    "unused-imports",
  ],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/prop-types": "off",
    "prettier/prettier": "warn",
    "unused-imports/no-unused-imports": "error",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/no-unused-vars": "off",
    "import/no-unresolved": "off",
  },
  overrides: [
    {
      files: ["src/**/*.tsx", "src/**/*.ts", "admin/**/*.tsx", "admin/**/*.ts"],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
      },
    },
    {
      files: ["src/**/*.test.ts", "src/**/*.test.tsx"],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
      },
      rules: {
        "@typescript-eslint/no-non-null-assertion": "off",
      },
    },
  ],
  settings: {
    react: {
      version: "detect",
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx", ".json"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};

module.exports = config;
