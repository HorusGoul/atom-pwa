import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import path from "path";
import LCL from "last-commit-log";
import legacy from "@vitejs/plugin-legacy";

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
    include: ["firebase/app", "@material-ui/core/ButtonBase"],
    exclude: ["hammerjs"],
  },
  plugins: [
    reactRefresh(),
    svgr(),
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
    dedupe: ["react", "react-dom"],
  },
});
