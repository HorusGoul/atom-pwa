import CMS from "netlify-cms-app";
import { elementsCollection } from "./collections/elements";

CMS.init({
  config: {
    backend: {
      name: "git-gateway",
      branch: String(import.meta.env.VITE_BRANCH || "next"),
    },

    local_backend: import.meta.env.DEV,

    publish_mode: "editorial_workflow",

    collections: [elementsCollection],

    media_folder: "public/media",
  },
});
