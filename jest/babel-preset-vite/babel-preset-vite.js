module.exports = function (api, opts = {}) {
  const { env = true, glob = true } = opts;
  return {
    plugins: [
      glob && require("./babel-plugin-transform-vite-meta-glob.js"),
      env && require("./babel-plugin-transform-vite-meta-env.js"),
    ].filter(Boolean),
  };
};
