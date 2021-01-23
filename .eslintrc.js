module.exports = {
  root: true,

  parser: '@typescript-eslint/parser',

  plugins: ['@typescript-eslint'],

  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },

  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    warnOnUnsupportedTypeScriptVersion: true,
  },

  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-console': 'error',
    'no-duplicate-imports': 'error',
    yoda: 'off',
  },
}
