import globals from 'globals';
import js from '@eslint/js';
import process from 'process';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

import pluginVue from 'eslint-plugin-vue';
import pluginCypress from 'eslint-plugin-cypress/flat';
import typescriptEslint from 'typescript-eslint';
import vueTsEslintConfig from '@vue/eslint-config-typescript';
import vueEslintParser from 'vue-eslint-parser';
import typescriptEslintParser from '@typescript-eslint/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  ...typescriptEslint.configs.recommended,
  ...vueTsEslintConfig(),
  pluginCypress.configs.recommended,

  ...compat.extends('plugin:prettier/recommended'),

  {
    files: ['**/*.{js,ts,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      parser: vueEslintParser,
      parserOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      'vue/attributes-order': 'recommended',
    },
    ignores: [
      '.DS_Store',
      'node_modules',
      '/coverage',
      '/dist',
      '/ios',
      '/android',
      'public',
      'build',
      '.env.local',
      '.env.*.local',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      'pnpm-debug.log*',
      '.idea',
      '.vscode',
      '*.suo',
      '*.ntvs*',
      '*.njsproj',
      '*.sln',
      '*.sw?',
    ],
    rules: {
      'cypress/no-unnecessary-waiting': 'off',
      'prettier/prettier': 'error',
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'vue/no-deprecated-slot-attribute': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
