import { CmsCollection } from "netlify-cms-core";

export const hubCollection: CmsCollection = {
  name: "hub-view",
  description: "Hub configuration",
  label: "View: Hub",
  format: "json",
  files: [
    {
      name: "Hub",
      label: "Hub",
      file: "src/data/hub/hub.json",
      fields: [
        {
          name: "sections",
          label: "Sections",
          widget: "list",
          fields: [
            {
              name: "title",
              label: "Title",
              widget: "string",
              required: true,
            },
            {
              name: "items",
              label: "Items",
              widget: "list",
              fields: [
                {
                  name: "item",
                  label: "Item",
                  widget: "relation",
                  collection: "hub-items",
                  search_fields: ["id", "title", "category"],
                  value_field: "id",
                  display_fields: ["{{category}}: {{title}}"],
                },
                {
                  name: "colSpan",
                  label: "Columns",
                  widget: "select",
                  options: [
                    {
                      label: "1 column",
                      value: 1,
                    },
                    {
                      label: "2 columns",
                      value: 2,
                    },
                  ],
                  required: false,
                },
                {
                  name: "rowSpan",
                  label: "Rows",
                  widget: "select",
                  options: [
                    {
                      label: "1 rows",
                      value: 1,
                    },
                    {
                      label: "2 rows",
                      value: 2,
                    },
                  ],
                  required: false,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const hubCategoriesCollection: CmsCollection = {
  name: "hub-categories",
  label: "Hub Categories",
  label_singular: "Hub Category",
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore Type not in netlify-cms-core typings
  type: "folder_based_collection",
  folder: "src/data/hub/categories",
  identifier_field: "id",
  format: "json",
  summary: "[{{id}}] {{title}}",
  create: true,
  delete: true,
  fields: [
    {
      name: "id",
      label: "ID",
      widget: "string",
      required: true,
    },
    {
      name: "title",
      label: "Title",
      widget: "string",
      required: true,
    },
  ],
};

export const hubItemsCollection: CmsCollection = {
  name: "hub-items",
  label: "Hub Items",
  label_singular: "Hub Item",
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore Type not in netlify-cms-core typings
  type: "folder_based_collection",
  folder: "src/data/hub/items",
  identifier_field: "id",
  format: "json",
  summary: "{{category}}: {{title}}",
  create: true,
  delete: true,
  fields: [
    {
      name: "id",
      label: "ID",
      widget: "string",
      required: true,
    },
    {
      name: "title",
      label: "Title",
      widget: "string",
      required: true,
    },
    {
      name: "category",
      label: "Category",
      widget: "relation",
      collection: "hub-categories",
      search_fields: ["id", "title"],
      value_field: "id",
      display_fields: ["[{{id}}] {{title}}"],
      required: true,
    },
    {
      name: "disabled",
      label: "Disabled",
      widget: "boolean",
      default: true,
    },
    {
      name: "imageUrl",
      label: "Image",
      widget: "file",
      required: false,
    },
    {
      name: "href",
      label: "Link to",
      widget: "string",
      required: true,
    },
    {
      name: "flag",
      label: "Required flag",
      widget: "string",
      required: false,
    },
  ],
};
