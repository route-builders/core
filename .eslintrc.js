/* eslint-disable no-undef */
module.exports = {
  "root": true,
  "env": {
    "browser": true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "rules": {
    "no-console": ["error", {
      "allow": ["warn"]
    }],
    "no-eq-null": "error",
    "no-restricted-exports": ["error", { "restrictedNamedExports": ["default"] }],
    "sort-imports": 0,
    "@typescript-eslint/no-non-null-assertion": 2,
    "@typescript-eslint/no-explicit-any": 2,
    "@typescript-eslint/explicit-function-return-type": 2,
  }
};
