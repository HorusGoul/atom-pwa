/**
 * @type {import('eslint').Linter.Config}
 */
const config = {
  extends: ["@internal/eslint-config/react"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  overrides: [
    {
      files: ["src/**/*.test.ts", "src/**/*.test.tsx"],
      rules: {
        "@typescript-eslint/no-non-null-assertion": "off",
      },
    },
  ],
};

module.exports = config;
