/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import path from "path";
import LCL from "last-commit-log";
import legacy from "@vitejs/plugin-legacy";
import istanbul from "vite-plugin-istanbul";

const env = process.env;

// Pass the latest commit short hash to the app
const lcl = new LCL();
const commit = lcl.getLastCommitSync();
env.VITE_COMMIT_SHORT_HASH = commit.shortHash;
env.VITE_COMMIT_HASH = commit.hash;

const prefixEnvVars = ["BRANCH"];

for (const envVar of prefixEnvVars) {
  env[`VITE_${envVar}`] = env[envVar];
}

const isProduction = env.NODE_ENV === "production";
const isTest = env.NODE_ENV === "test";
const isDevelopment = !isProduction && !isTest;

export default defineConfig({
  build: {
    sourcemap: true,

    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        admin: path.resolve(__dirname, "admin/index.html"),
      },
      output: {
        manualChunks: undefined,
      },
    },
  },
  optimizeDeps: {
    include: [],
    exclude: ["hammerjs"],
  },
  plugins: [
    react(),
    svgr(),
    legacy({
      targets: ["defaults", "not IE 11", "chrome > 60"],
    }),
    isDevelopment &&
      istanbul({
        include: "src/*",
        exclude: ["node_modules", "**.*.test.{ts,tsx}"],
        extension: [".ts", "tsx"],
        checkProd: true,
      }),
  ],
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
    dedupe: ["react", "react-dom"],
  },
  server: {
    port: 3000,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/setupTests.ts"],
    coverage: {
      provider: "istanbul",
    },
  },
});
