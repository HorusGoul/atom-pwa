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

  // const modules = {
  //   './dir/foo.js': () => import('./dir/foo.js'),
  //   './dir/bar.js': () => import('./dir/bar.js')
  // }

  return {
    visitor: {
      CallExpression(path, state) {
        const callee = path.node.callee;
        const args = path.node.arguments;
        const sourceFile = state.file.opts.filename;
        if (
          callee.property.name === "glob" &&
          callee.object.type === "MetaProperty" &&
          args.length === 1 &&
          args[0].type === "StringLiteral"
        ) {
          // console.log(args);
          const cwd = nodePath.dirname(sourceFile);
          const paths = glob.sync(args[0].value, { cwd });

          const replacementString = `const modules = {
            ${paths.map((p) => `'${p}': () => import('${p}')`).join(",\n")}
          }`;

          console.log(replacementString);

          // TODO: how to replace?
          path.replaceWithSourceString(replacementString);
        }
      },
      MetaProperty(path) {
        path.replaceWith(ast);
      },
    },
  };
};
