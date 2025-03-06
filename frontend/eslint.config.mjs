import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser, // Correct way to spread browser globals
      },
    },
    plugins: {
      react: pluginReact, // Correct way to include plugins in flat config
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.recommended, // Ensure correct format
];
