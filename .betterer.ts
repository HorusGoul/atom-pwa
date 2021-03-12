import { regexp } from "@betterer/regexp";

export default {
  "no more class components": regexp(
    /class\s+(.+?)\s+extends\s+(?:React\.)?Component/gi
  ).include("src/**/*.{js,jsx,ts,tsx}"),
};
