import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
   ...tseslint.configs.recommended,
   pluginJs.configs.recommended,
   pluginReact.configs.flat.recommended,
   eslintConfigPrettier,
   { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
   { ignores: ["**/.config/", "**/.next/", "node_modules"] },
   { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
   {
      rules: {
         "react/react-in-jsx-scope": "off",
         "sort-imports": [
            "error",
            {
               ignoreCase: false,
               ignoreDeclarationSort: false,
               ignoreMemberSort: false,
               memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
               allowSeparatedGroups: false,
            },
         ],
         "@typescript-eslint/no-unused-vars": [
            "error",
            {
               vars: "all",
               args: "all",
               argsIgnorePattern: "^_",
               caughtErrors: "all",
               caughtErrorsIgnorePattern: "^_",
               destructuredArrayIgnorePattern: "^_",
               varsIgnorePattern: "^_",
               ignoreRestSiblings: true,
            },
         ],
      },
   },
];
