module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 2020
  },
  env: {
    browser: true,
    node: true
  },
  extends: ['eslint:recommended', '@vue/prettier', 'plugin:prettier/recommended'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    eqeqeq: ['error', 'always'],
    'max-params': ['error', 3],
    'prefer-arrow-callback': 'error'
  }
};
