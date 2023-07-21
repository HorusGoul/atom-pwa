/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  extends: [
    "./base.js",
    "plugin:react/recommended",
    "plugin:testing-library/dom",
  ],
  plugins: ["react", "react-hooks"],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
