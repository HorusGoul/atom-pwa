module.exports = function () {
  return {
    plugins: [
      require("./babel-plugin-syntax-vite-meta-glob.js"),
      require("./babel-plugin-syntax-vite-meta-env.js"),
    ],
  };
};
