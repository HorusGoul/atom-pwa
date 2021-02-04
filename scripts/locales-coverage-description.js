const fs = require("fs");

const THRESSHOLD = 85;

const crowdinMap = {
  "ar-SA": "en-ar",
  "bg-BG": "en-bg",
  "ca-ES": "en-ca",
  de: "en-de",
  "de-DE": "en-de",
  "el-GR": "en-el",
  es: "en-es",
  "es-ES": "en-es",
  "fa-IR": "en-fa",
  "fi-FI": "en-fi",
  "fr-FR": "en-fr",
  "he-IL": "en-he",
  "hi-IN": "en-hi",
  "hu-HU": "en-hu",
  "id-ID": "en-id",
  "it-IT": "en-it",
  "ja-JP": "en-ja",
  "kab-KAB": "en-kab",
  "ko-KR": "en-ko",
  "my-MM": "en-my",
  "nb-NO": "en-nb",
  "nl-NL": "en-nl",
  "nn-NO": "en-nnno",
  "pa-IN": "en-pain",
  "pl-PL": "en-pl",
  "pt-BR": "en-ptbr",
  "pt-PT": "en-pt",
  ro: "en-ro",
  "ro-RO": "en-ro",
  "ru-RU": "en-ru",
  "sk-SK": "en-sk",
  "sv-SE": "en-sv",
  "tr-TR": "en-tr",
  "uk-UA": "en-uk",
  "zh-CN": "en-zhcn",
  "zh-TW": "en-zhtw",
};

const flags = {
  "ar-SA": "🇸🇦",
  "bg-BG": "🇧🇬",
  "ca-ES": "🏳",
  de: "🇩🇪",
  "de-DE": "🇩🇪",
  "el-GR": "🇬🇷",
  es: "🇪🇸",
  "es-ES": "🇪🇸",
  "fa-IR": "🇮🇷",
  "fi-FI": "🇫🇮",
  "fr-FR": "🇫🇷",
  "he-IL": "🇮🇱",
  "hi-IN": "🇮🇳",
  "hu-HU": "🇭🇺",
  "id-ID": "🇮🇩",
  "it-IT": "🇮🇹",
  "ja-JP": "🇯🇵",
  "kab-KAB": "🏳",
  "ko-KR": "🇰🇷",
  "my-MM": "🇲🇲",
  "nb-NO": "🇳🇴",
  "nl-NL": "🇳🇱",
  "nn-NO": "🇳🇴",
  "pa-IN": "🇮🇳",
  "pl-PL": "🇵🇱",
  "pt-BR": "🇧🇷",
  "pt-PT": "🇵🇹",
  ro: "🇷🇴",
  "ro-RO": "🇷🇴",
  "ru-RU": "🇷🇺",
  "sk-SK": "🇸🇰",
  "sv-SE": "🇸🇪",
  "tr-TR": "🇹🇷",
  "uk-UA": "🇺🇦",
  "zh-CN": "🇨🇳",
  "zh-TW": "🇹🇼",
};

const languages = {
  "ar-SA": "العربية",
  "bg-BG": "Български",
  "ca-ES": "Català",
  de: "Deutsch",
  "de-DE": "Deutsch",
  "el-GR": "Ελληνικά",
  es: "Español",
  "es-ES": "Español",
  "fa-IR": "فارسی",
  "fi-FI": "Suomi",
  "fr-FR": "Français",
  "he-IL": "עברית",
  "hi-IN": "हिन्दी",
  "hu-HU": "Magyar",
  "id-ID": "Bahasa Indonesia",
  "it-IT": "Italiano",
  "ja-JP": "日本語",
  "kab-KAB": "Taqbaylit",
  "ko-KR": "한국어",
  "my-MM": "Burmese",
  "nb-NO": "Norsk bokmål",
  "nl-NL": "Nederlands",
  "nn-NO": "Norsk nynorsk",
  "pa-IN": "ਪੰਜਾਬੀ",
  "pl-PL": "Polski",
  "pt-BR": "Português Brasileiro",
  "pt-PT": "Português",
  ro: "Română",
  "ro-RO": "Română",
  "ru-RU": "Русский",
  "sk-SK": "Slovenčina",
  "sv-SE": "Svenska",
  "tr-TR": "Türkçe",
  "uk-UA": "Українська",
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
};

const percentages = fs.readFileSync(
  `${__dirname}/../src/locales/percentages.json`
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
