import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import unicorn from 'eslint-plugin-unicorn';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      unicorn,
      prettier: pluginPrettier,
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      prettierConfig,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      'unicorn/better-regex': 'error',
      'unicorn/error-message': 'error',
      'unicorn/consistent-function-scoping': 'error',
      'unicorn/filename-case': ['error', { cases: { camelCase: true, pascalCase: true } }],
      'unicorn/import-style': 'error',
      'unicorn/no-array-callback-reference': 'error',
      'unicorn/no-console-spaces': 'error',
      'unicorn/no-null': 'off',
      'unicorn/no-process-exit': 'error',
      'unicorn/no-this-assignment': 'error',
      'unicorn/no-unused-properties': 'warn',
      'unicorn/no-useless-undefined': 'error',
      'unicorn/prefer-optional-catch-binding': 'error',

      'prettier/prettier': [
        'error',
        {
          semi: true,
          singleQuote: true,
          tabWidth: 2,
          printWidth: 100,
          trailingComma: 'es5',
          bracketSpacing: true,
          arrowParens: 'always',
          endOfLine: 'lf',
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]);
