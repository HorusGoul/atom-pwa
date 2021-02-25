const babel = require("@babel/core");
const importMetaBabelPlugin = require("./importMetaBabelPlugin");

const code = `
const modules = import.meta.glob("./components/**/*.tsx");
`;

const result = babel.transform(code, {
  filename: "./src/file.ts",
  plugins: [importMetaBabelPlugin],
});

console.log("\n--------------------------\n");

console.log(result.code);
