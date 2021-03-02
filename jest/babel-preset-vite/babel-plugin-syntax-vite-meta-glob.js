/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";

const nodePath = require("path");
const t = require("@babel/types");
const glob = require("glob");

/**
 * Add import.meta.glob and import.meta.globEager support
 */
module.exports = function viteMetaGlobBabelPlugin() {
  const asts = {
    glob: (path) =>
      t.arrowFunctionExpression(
        [],
        t.callExpression(t.import(), [t.stringLiteral(path)])
      ),
    globEager: (path) => t.callExpression(t.require, [t.stringLiteral(path)]),
  };

  const globKeys = Object.keys(asts);

  return {
    visitor: {
      CallExpression(path, state) {
        const callee = path.node.callee;
        const args = path.node.arguments;
        const sourceFile = state.file.opts.filename;
        const propertyName = callee.property && callee.property.name;

        if (
          globKeys.includes(propertyName) &&
          t.isMetaProperty(callee.object) &&
          args.length === 1 &&
          t.isStringLiteral(args[0])
        ) {
          const cwd = nodePath.dirname(sourceFile);
          const paths = glob.sync(args[0].value, { cwd });

          const replacement = t.objectExpression(
            paths.map((path) =>
              t.objectProperty(t.identifier(path), asts[propertyName](path))
            )
          );

          path.replaceWith(replacement);
        }
      },
    },
  };
};
