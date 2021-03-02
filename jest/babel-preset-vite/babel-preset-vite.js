module.exports = function (api, opts = {}) {
  const { env = true, glob = true } = opts;
  return {
    plugins: [
      glob && require("./babel-plugin-syntax-vite-meta-glob.js"),
      env && require("./babel-plugin-syntax-vite-meta-env.js"),
    ].filter(Boolean),
  };
};
