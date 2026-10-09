import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import globals from 'globals'

export default [
 {
  ignores: [
   '**/node_modules/**',
   '**/dist/**',
   '**/public/**',
   '**/project_info/**',
  ],
 },

 // Основні правила для JS/TS файлів (додаси TS за потреби)
 {
  files: ['**/*.{js,mjs,cjs}'],
  languageOptions: {
   ecmaVersion: 'latest',
   sourceType: 'module',
   globals: { ...globals.browser, ...globals.node },
  },
  ...js.configs.recommended,
  rules: {
   eqeqeq: ['error', 'always'],
   camelcase: ['error', { properties: 'never', ignoreDestructuring: true }],
  },
 },

 // Має бути останнім: вимикає правила, що конфліктують із Prettier
 eslintConfigPrettier,
]

// import js from '@eslint/js'
// import globals from 'globals'
// import { defineConfig } from 'eslint/config'
// import prettierPlugin from 'eslint-plugin-prettier'
// import prettierConfig from 'eslint-config-prettier'

// export default defineConfig([
//   {
//     files: ['**/*.{js,mjs,cjs}'],
//     plugins: {
//       js,
//       prettier: prettierPlugin,
//     },
//     extends: ['js/recommended', prettierConfig],
//     rules: {
//       ...prettierPlugin.configs.recommended.rules,
//       'no-console': 'warn',
//       eqeqeq: 'warn',
//       curly: 'warn',
//       'no-else-return': 'warn',
//       'no-unused-vars': 'warn',
//       'prettier/prettier': 'warn',
//     },
//   },
//   {
//     files: ['**/*.{js,mjs,cjs}'],
//     languageOptions: { globals: globals.browser },
//   },
// ])
