module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    '.eslintrc-auto-import.json',
    'plugin:vue/vue3-recommended',
    'plugin:import/recommended',
    'plugin:promise/recommended',
    'plugin:sonarjs/recommended',

    // 'plugin:unicorn/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  ignorePatterns: ['src/@iconify/*.js', 'node_modules', 'dist', '*.d.ts'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    // indentation (Already present in TypeScript)
    'indent': ['error', 2],

    // Enforce trailing comma (Already present in TypeScript)
    'comma-dangle': ['error', 'always-multiline'],

    // Enforce consistent spacing inside braces of object (Already present in TypeScript)
    'object-curly-spacing': ['error', 'always'],

    // Disable max-len
    'max-len': 'off',

    // we don't want it
    'semi': ['error', 'never'],

    // add parens ony when required in arrow function
    'arrow-parens': ['error', 'as-needed'],

    // add new line above comment
    'newline-before-return': 'error',

    // add new line above comment
    'lines-around-comment': [
      'error',
      {
        beforeBlockComment: true,
        beforeLineComment: true,
        allowBlockStart: true,
        allowClassStart: true,
        allowObjectStart: true,
        allowArrayStart: true,
      },
    ],

    'array-element-newline': ['error', 'consistent'],
    'array-bracket-newline': ['error', 'consistent'],

    'vue/multi-word-component-names': 'off',

    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'expression', next: 'const' },
      { blankLine: 'always', prev: 'const', next: 'expression' },
      { blankLine: 'always', prev: 'multiline-const', next: '*' },
      { blankLine: 'always', prev: '*', next: 'multiline-const' },
    ],

    // Plugin: eslint-plugin-import
    'import/prefer-default-export': 'off',
    'import/newline-after-import': ['error', { count: 1 }],

    // Plugin: eslint-plugin-import
    // For omitting extension for ts files
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],

    // ignore virtual files
    'import/no-unresolved': [2, {
      ignore: [
        '~pages$',
        'virtual:generated-layouts',

        // Ignore vite's ?raw imports
        '.*\?raw',
      ],
    }],

    // Thanks: https://stackoverflow.com/a/63961972/10796681
    'no-shadow': 'off',


    // Plugin: eslint-plugin-promise
    'promise/always-return': 'off',
    'promise/catch-or-return': 'off',

    // ESLint plugin vue
    'vue/block-tag-newline': 'error',
    'vue/component-api-style': 'error',
    'vue/component-name-in-template-casing': ['error', 'PascalCase', { registeredComponentsOnly: false }],
    'vue/custom-event-name-casing': ['error', 'camelCase', {
      ignores: [
        '/^(click):[a-z]+((\d)|([A-Z0-9][a-z0-9]+))*([A-Z])?/',
      ],
    }],
    'vue/define-macros-order': 'error',
    'vue/html-comment-content-newline': 'error',
    'vue/html-comment-content-spacing': 'error',
    'vue/html-comment-indent': 'error',
    'vue/match-component-file-name': 'error',
    'vue/no-child-content': 'error',

    // NOTE this rule only supported in SFC,  Users of the unplugin-vue-define-options should disable that rule: https://github.com/vuejs/eslint-plugin-vue/issues/1886
    // 'vue/no-duplicate-attr-inheritance': 'error',
    'vue/no-empty-component-block': 'error',
    'vue/no-multiple-objects-in-class': 'error',
    'vue/no-reserved-component-names': 'error',
    'vue/no-template-target-blank': 'error',
    'vue/no-useless-mustaches': 'error',
    'vue/no-useless-v-bind': 'error',
    'vue/padding-line-between-blocks': 'error',
    'vue/prefer-separate-static-class': 'error',
    'vue/prefer-true-attribute-shorthand': 'error',
    'vue/v-on-function-call': 'error',
    'vue/no-restricted-class': ['error', '/^(p|m)(l|r)-/'],

    // -- Extension Rules
    'vue/no-irregular-whitespace': 'error',
    'vue/template-curly-spacing': 'error',

    // -- Sonarlint
    'sonarjs/no-duplicate-string': 'off',
    'sonarjs/no-nested-template-literals': 'off',

    // -- Unicorn
    // 'unicorn/filename-case': 'off',
    // 'unicorn/prevent-abbreviations': ['error', {
    //   replacements: {
    //     props: false,
    //   },
    // }],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.js', '.tsx', '.jsx', '.mjs', '.png', '.jpg'],
      },alias: { 'extensions': ['.ts', '.js', '.tsx', '.jsx', '.mjs'], 'map': [["@","./src"],["@themeConfig","./themeConfig.js"],["@core","./src/@core"],["@layouts","./src/@layouts"],["@images","./src/assets/images/"],["@styles","./src/styles/"],["@configured-variables","./src/styles/variables/_template.scss"],["@axios","./src/plugins/axios"],["@validators","./src/@core/utils/validators"],["apexcharts","node_modules/apexcharts-clevision"]] },
    },
  },
}
