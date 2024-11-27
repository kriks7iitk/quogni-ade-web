import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      semi: ['error', 'always'], // Require semicolons
      quotes: ['error', 'double'], // Prefer double quotes
      indent: ['error', 2], // 2-space indentation
      'react/jsx-indent': ['error', 2], // 2-space indentation for JSX
      'no-unused-vars': 'warn', // Warn for unused variables
      'no-console': 'off', // Allow console logs
    },
  },
  {
    languageOptions: {
      globals: globals.node, // Add Node globals if you're using Node.js
    },
    rules: {
      // Add any Node-specific rules if necessary
    },
  },
  pluginJs.configs.recommended, // Use recommended rules from ESLint
  pluginReact.configs.recommended, // Use recommended rules from eslint-plugin-react
];
