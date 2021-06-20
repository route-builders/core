/* eslint-disable no-undef */
module.exports = {
  "roots": [
    "<rootDir>/tests",
    "<rootDir>/e2e",
  ],
  "moduleDirectories": ['node_modules', 'src'],
  "moduleFileExtensions": [
    "ts",
    "js"
  ],
  "globals": {
    "ts-jest": {
      "tsConfig": "tsconfig.json"
    }
  },
  "moduleNameMapper": {
    "^@/(.+)": "<rootDir>/src/$1"
  },
  "testMatch": [
    "**/*.test.ts"
  ],
  "transform": {
    "^.+\\.ts$": "ts-jest"
  },
}