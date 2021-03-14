import { CmsCollection } from "netlify-cms-core";

export const elementsCollection: CmsCollection = {
  name: "element",
  label: "Elements",
  label_singular: "Element",

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore Type not in netlify-cms-core typings
  type: "folder_based_collection",
  folder: "src/data/elements",
  identifier_field: "atomic",
  format: "json",
  summary: "[{{symbol}}] {{name}}",
  fields: [
    {
      name: "atomic",
      label: "Atomic Number",
      widget: "number",
      required: true,
    },
    {
      name: "symbol",
      label: "Symbol",
      widget: "string",
      required: true,
    },
    {
      name: "name",
      label: "Name",
      widget: "string",
      required: true,
    },
    {
      name: "atomicMass",
      label: "Atomic Mass",
      widget: "number",
      value_type: "float",
      required: true,
    },
    {
      name: "electronicConfiguration",
      label: "Electronic Configuration",
      widget: "string",
      required: true,
    },
    {
      name: "electronegativity",
      label: "Electronegativity",
      widget: "number",
      value_type: "float",
      required: false,
    },
    {
      name: "atomicRadius",
      label: "Atomic Radius",
      widget: "number",
      value_type: "float",
      required: false,
    },
    {
      name: "ionRadius",
      label: "Ionic Radius",
      widget: "string",
      required: false,
    },
    {
      name: "vanDelWaalsRadius",
      label: "Van del Waals Radius",
      widget: "number",
      value_type: "float",
      required: false,
    },
    {
      name: "ionizationEnergy",
      label: "Ionization Energy",
      widget: "number",
      value_type: "float",
      required: false,
    },
    {
      name: "electronAffinity",
      label: "Electron Affinity",
      widget: "number",
      value_type: "float",
      required: false,
    },
    {
      name: "oxidationStates",
      label: "Oxidation States",
      widget: "string",
      required: false,
    },
    {
      name: "standardState",
      label: "Standard State",
      widget: "select",
      options: [
        {
          label: "Solid",
          value: "solid",
        },
        {
          label: "Liquid",
          value: "liquid",
        },
        {
          label: "Gas",
          value: "gas",
        },
      ],
      required: false,
    },
    {
      name: "bondingType",
      label: "Bonding Type",
      widget: "select",
      options: [
        {
          label: "Diatomic",
          value: "diatomic",
        },
        {
          label: "Atomic",
          value: "atomic",
        },
        {
          label: "Metallic",
          value: "metallic",
        },
        {
          label: "Covalent Network",
          value: "covalent_network",
        },
      ],
      required: false,
    },
    {
      name: "meltingPoint",
      label: "Melting Point",
      widget: "number",
      value_type: "float",
      required: false,
    },
    {
      name: "boilingPoint",
      label: "Boiling Point",
      widget: "number",
      value_type: "float",
      required: false,
    },
    {
      name: "density",
      label: "Density",
      widget: "number",
      value_type: "float",
      required: false,
    },
    {
      name: "group",
      label: "Group",
      widget: "string",
      required: true,
    },
    {
      name: "yearDiscovered",
      label: "Year discovered",
      widget: "string",
      required: false,
    },
    {
      name: "valency",
      label: "Valency",
      widget: "string",
      hint: "This is also used for the Valency Test",
      required: false,
    },
    {
      name: "wrongValences",
      label: "Wrong valences",
      widget: "list",
      field: {
        name: "Valency",
        widget: "string",
        required: true,
      },
      required: false,
      allow_add: true,
      hint: "Wrong valences used in the Valency Test",
      default: [],
    },
    {
      name: "testState",
      label: "Test State",
      widget: "object",
      fields: [
        {
          name: "valencesTest",
          label: "Valency Test",
          widget: "boolean",
          default: false,
        },
        {
          name: "ptTest",
          label: "Periodic Table Test",
          widget: "boolean",
          default: false,
        },
      ],
    },
  ],
};
