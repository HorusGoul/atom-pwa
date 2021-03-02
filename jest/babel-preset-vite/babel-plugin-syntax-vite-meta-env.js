/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";

const template = require("@babel/template").default;

/**
 * Add import.meta.env support
 */
module.exports = function viteMetaEnvBabelPlugin() {
  const ast = template.ast(`
  ({
    env: {
      ...Object.fromEntries(
        Object.entries(process.env).filter(([k]) => /^VITE_/.test(k)),
      ),
      MODE: process.env.MODE || 'test',
      NODE_ENV: process.env.NODE_ENV || 'test',
      DEV: process.env.DEV ? process.env.DEV != false : true,
      PROD: process.env.PROD ? process.env.PROD != false : false,
    },
  })
`);

  return {
    visitor: {
      MetaProperty(path) {
        path.replaceWith(ast);
      },
    },
  };
};
