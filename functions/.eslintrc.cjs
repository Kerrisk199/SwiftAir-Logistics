// functions/.eslintrc.cjs
module.exports = {
  root: true,
  env: {
    node: true,
    commonjs: true,
    es2021: true
  },
  parserOptions: {
    ecmaVersion: 12
  },
  extends: [
    "eslint:recommended"
  ],
  rules: {
    "no-unused-vars": "warn",
    "no-console": "off",
    "quotes": ["error", "double"]
  }
};
