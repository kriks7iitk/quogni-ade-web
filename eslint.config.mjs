import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser, 
    },

    env: {
      browser: true,
      es2021: true,
      node: true,
    },

    plugins: {
      react: pluginReact,
    },

    rules: {
      ...pluginJs.configs.recommended.rules,  // Merging JS recommended rules
      ...pluginReact.configs.flat.recommended.rules, // Merging React recommended rules
      "no-unused-vars": "warn",
      "no-console": "off",
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
    },
  }
];
