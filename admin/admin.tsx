import CMS from "netlify-cms-app";

CMS.init({
  config: {
    backend: {
      name: "git-gateway",
      branch: String(import.meta.env.VITE_BRANCH || "next"),
    },

    local_backend: import.meta.env.DEV,

    publish_mode: "editorial_workflow",

    collections: [
      {
        name: "elements",
        label: "Elements",
        folder: "src/data/elements",
        identifier_field: "atomic",
        fields: [
          {
            name: "atomic",
            label: "Atomic Number",
            widget: "number",
          },
        ],
      },
    ],

    media_folder: "public/media",
  },
});
