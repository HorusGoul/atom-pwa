/**
 * @type {import('eslint').Linter.Config}
 */
const config = {
  extends: ["@internal/eslint-config/base"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
};

module.exports = config;
