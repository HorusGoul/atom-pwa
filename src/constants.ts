import packageJson from "../package.json";

export const IS_DEVELOPMENT = import.meta.env.DEV;

export const APP_VERSION = packageJson.version;

export const COMMIT_SHORT_HASH = import.meta.env.VITE_COMMIT_SHORT_HASH;

export const COMMIT_HASH = import.meta.env.VITE_COMMIT_HASH;

export const BRANCH = import.meta.env.BRANCH ?? "local";
