const fs = require("fs");

const THRESSHOLD = 85;

const crowdinMap = {
  ar_SA: "en-ar",
  bg_BG: "en-bg",
  ca_ES: "en-ca",
  de: "en-de",
  de_DE: "en-de",
  el_GR: "en-el",
  es: "en-es",
  es_ES: "en-es",
  fa_IR: "en-fa",
  fi_FI: "en-fi",
  fr_FR: "en-fr",
  he_IL: "en-he",
  hi_IN: "en-hi",
  hu_HU: "en-hu",
  id_ID: "en-id",
  it_IT: "en-it",
  ja_JP: "en-ja",
  kab_KAB: "en-kab",
  ko_KR: "en-ko",
  my_MM: "en-my",
  nb_NO: "en-nb",
  nl_NL: "en-nl",
  nn_NO: "en-nnno",
  pa_IN: "en-pain",
  pl_PL: "en-pl",
  pt_BR: "en-ptbr",
  pt_PT: "en-pt",
  ro: "en-ro",
  ro_RO: "en-ro",
  ru_RU: "en-ru",
  sk_SK: "en-sk",
  sv_SE: "en-sv",
  tr_TR: "en-tr",
  uk_UA: "en-uk",
  zh_CN: "en-zhcn",
  zh_TW: "en-zhtw",
};

const flags = {
  ar_SA: "🇸🇦",
  bg_BG: "🇧🇬",
  ca_ES: "🏳",
  de: "🇩🇪",
  de_DE: "🇩🇪",
  el_GR: "🇬🇷",
  es: "🇪🇸",
  es_ES: "🇪🇸",
  fa_IR: "🇮🇷",
  fi_FI: "🇫🇮",
  fr_FR: "🇫🇷",
  he_IL: "🇮🇱",
  hi_IN: "🇮🇳",
  hu_HU: "🇭🇺",
  id_ID: "🇮🇩",
  it_IT: "🇮🇹",
  ja_JP: "🇯🇵",
  kab_KAB: "🏳",
  ko_KR: "🇰🇷",
  my_MM: "🇲🇲",
  nb_NO: "🇳🇴",
  nl_NL: "🇳🇱",
  nn_NO: "🇳🇴",
  pa_IN: "🇮🇳",
  pl_PL: "🇵🇱",
  pt_BR: "🇧🇷",
  pt_PT: "🇵🇹",
  ro: "🇷🇴",
  ro_RO: "🇷🇴",
  ru_RU: "🇷🇺",
  sk_SK: "🇸🇰",
  sv_SE: "🇸🇪",
  tr_TR: "🇹🇷",
  uk_UA: "🇺🇦",
  zh_CN: "🇨🇳",
  zh_TW: "🇹🇼",
};

const languages = {
  ar_SA: "العربية",
  bg_BG: "Български",
  ca_ES: "Català",
  de: "Deutsch",
  de_DE: "Deutsch",
  el_GR: "Ελληνικά",
  es: "Español",
  es_ES: "Español",
  fa_IR: "فارسی",
  fi_FI: "Suomi",
  fr_FR: "Français",
  he_IL: "עברית",
  hi_IN: "हिन्दी",
  hu_HU: "Magyar",
  id_ID: "Bahasa Indonesia",
  it_IT: "Italiano",
  ja_JP: "日本語",
  kab_KAB: "Taqbaylit",
  ko_KR: "한국어",
  my_MM: "Burmese",
  nb_NO: "Norsk bokmål",
  nl_NL: "Nederlands",
  nn_NO: "Norsk nynorsk",
  pa_IN: "ਪੰਜਾਬੀ",
  pl_PL: "Polski",
  pt_BR: "Português Brasileiro",
  pt_PT: "Português",
  ro: "Română",
  ro_RO: "Română",
  ru_RU: "Русский",
  sk_SK: "Slovenčina",
  sv_SE: "Svenska",
  tr_TR: "Türkçe",
  uk_UA: "Українська",
  zh_CN: "简体中文",
  zh_TW: "繁體中文",
};

const percentages = fs.readFileSync(
  `${__dirname}/../apps/pwa/src/locales/percentages.json`
);
const rowData = JSON.parse(percentages);

const coverages = Object.entries(rowData)
  .sort(([, a], [, b]) => b - a)
  .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

const boldIf = (text, condition) => (condition ? `**${text}**` : text);

const printHeader = () => {
  let result = "| | Flag | Locale | % |\n";
  result += "| :--: | :--: | -- | :--: |";
  return result;
};

const printRow = (id, locale, coverage) => {
  const isOver = coverage >= THRESSHOLD;
  let result = `| ${isOver ? id : "..."} | `;
  result += `${locale in flags ? flags[locale] : ""} | `;
  const language = locale in languages ? languages[locale] : locale;
  if (locale in crowdinMap && crowdinMap[locale]) {
    result += `[${boldIf(
      language,
      isOver
    )}](https://crowdin.com/translate/atom-periodic-table-quizzes/8/${
      crowdinMap[locale]
    }) | `;
  } else {
    result += `${boldIf(language, isOver)} | `;
  }
  result += `${coverage === 100 ? "💯" : boldIf(coverage, isOver)} |`;
  return result;
};

console.info(
  `Each language must be at least **${THRESSHOLD}%** translated in order to appear on Atom. Join us on [Crowdin](https://crowdin.com/project/atom-periodic-table-quizzes) and help us translate your own language. **Can't find yours yet?** Open an [issue](https://github.com/HorusGoul/atom-pwa/issues/new) and we'll add it to the list.`
);
console.info("\n\r");
console.info(printHeader());
let index = 1;
for (const coverage in coverages) {
  if (coverage === "en") {
    continue;
  }
  console.info(printRow(index, coverage, coverages[coverage]));
  index++;
}
console.info("\n\r");
console.info("\\* Languages in **bold** are going to appear on production.");
