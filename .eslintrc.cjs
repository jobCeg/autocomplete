module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  overrides: [
    {
      files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:jest-dom/recommended', 'plugin:testing-library/react'],
    },
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@stylistic'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/jsx-sort-props': 'error',
    'sort-keys': 'error',
    'no-console': 'error',
    'no-debugger': 'error',
    '@stylistic/semi': 'error',
    '@stylistic/no-extra-semi': 'error',
    '@stylistic/indent': ['error', 2],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
