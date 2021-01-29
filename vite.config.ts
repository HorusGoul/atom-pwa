import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import path from "path";

const env = process.env;

const prefixEnvVars = ["BRANCH"];

for (const envVar of prefixEnvVars) {
  env[`VITE_${envVar}`] = env[envVar];
}

export default defineConfig({
  build: {
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
    include: [
      "firebase/app",
      "firebase/analytics",
      "@material-ui/core/ButtonBase",
    ],
    exclude: ["hammerjs"],
  },
  plugins: [reactRefresh(), svgr()],
  alias: {
    "@": path.resolve("./src"),
  },
  dedupe: ["react", "react-dom"],
});
