const path = require('path')
/** @type {import('eslint').Linter.Config} */

module.exports = {
  env: { browser: true, es2020: true },
  extends: ['standard-with-typescript', 'plugin:react-hooks/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: path.resolve(__dirname, 'tsconfig.app.json')
  },
  plugins: ['react-refresh', 'prettier'],
  rules: {
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      {
        allowAny: true
      }
    ],
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false
      }
    ],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn'  
  },
  
  ignorePatterns: ['src/ApiInterface.ts']
}
