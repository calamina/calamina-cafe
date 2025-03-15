import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginAstro from 'eslint-plugin-astro';
import pluginVue from 'eslint-plugin-vue'
import typescriptEslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  ...pluginVue.configs['flat/recommended'],

  {files: ["**/*.{js,mjs,cjs,ts,astro,vue}"]},
  {languageOptions: { 
    globals: globals.browser, 
    ecmaVersion: 'latest',
    sourceType: 'module',
    parserOptions: {
      parser: typescriptEslint.parser,
    },
    rules : {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error"]
    }
  }},
  pluginJs.configs.recommended,
];