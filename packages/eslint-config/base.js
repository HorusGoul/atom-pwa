/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "prettier",
    "import",
    "unused-imports",
    "import-alias",
  ],
  rules: {
    // Prettier
    "prettier/prettier": "warn",

    // TS rules
    "@typescript-eslint/explicit-module-boundary-types": "off",

    // Configure unused-imports
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "import/no-unresolved": "off",

    // Alias
    "import-alias/import-alias": [
      "error",
      {
        relativeDepth: 0,
        aliases: [
          {
            alias: "@",
            matcher: "^src",
          },
        ],
      },
    ],
  },
  settings: {
    "import/resolver": {
      typescript: true,
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
  },
};
