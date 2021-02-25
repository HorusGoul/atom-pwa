/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";

const template = require("@babel/template").default;
const glob = require("glob");
const nodePath = require("path");

/**
 * Add import.meta.env support
 * Note: import.meta.url is not supported at this time
 */
module.exports = function importMetaBabelPlugin() {
  const ast = template.ast(`
  ({
    env: {
      ...Object.fromEntries(
        Object.entries(process.env).filter(([k]) => /^VITE_/.test(k)),
      ),
      MODE: 'test',
      NODE_ENV: 'test',
      DEV: true,
      PROD: false,
    },
  })
`);

  return {
    visitor: {
      CallExpression(path, state) {
        const callee = path.node.callee;
        const args = path.node.arguments;
        const sourceFile = state.file.opts.filename;
        const propertyName = callee.property?.name;

        if (
          ["glob", "globEager"].includes(propertyName) &&
          callee.object.type === "MetaProperty" &&
          args.length === 1 &&
          args[0].type === "StringLiteral"
        ) {
          const cwd = nodePath.dirname(sourceFile);
          const paths = glob.sync(args[0].value, { cwd });

          const replacementString = `{
            ${paths.map(mappers[propertyName]).join(",\n")}
          }`;

          path.replaceWithSourceString(replacementString);
        }
      },
      MetaProperty(path) {
        path.replaceWith(ast);
      },
    },
  };
};

const mappers = {
  glob: (p) => `'${p}': () => import('${p}')`,
  globEager: (p) => `'${p}': require('${p}')`,
};
