const { readdirSync, writeFileSync } = require("fs");
const files = readdirSync(`${__dirname}/../src/locales`);

const locales = files.filter(
  (file) =>
    file !== "README.md" &&
    file !== "percentages.json" &&
    file !== "common.json"
);

const percentages = {};

const baseLocale = require("../src/locales/en.json");

const totalKeysCount = Object.keys(baseLocale).length;

for (let index = 0; index < locales.length; index++) {
  const currentLocale = locales[index];
  const data = require(`../src/locales/${currentLocale}`);

  const localeKeysCount = Object.keys(data).length;

  const percentage = (localeKeysCount / totalKeysCount) * 100;

  percentages[currentLocale.replace(".json", "")] = parseInt(percentage);
}

writeFileSync(
  `${__dirname}/../src/locales/percentages.json`,
  `${JSON.stringify(percentages, null, 2)}\n`,
  "utf8"
);
