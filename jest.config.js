/** @type {import('jest').Config} */
const config = {
  verbose: true,
  preset: "jest-preset-angular",
  setupFilesAfterEnv: [
    "<rootDir>/src/setup-jest.ts"
  ],
  testMatch: [
    "<rootDir>/src/**/*.spec.ts"
  ],
  // transform: {
  //   "^.+\\.(ts|mjs|js|html)$": [
  //     "jest-preset-angular",
  //     {
  //       "tsconfig": "<rootDir>/tsconfig.spec.json",
  //       "stringifyContentPathRegex": "\\.(html|svg)$"
  //     }
  //   ]
  // }
};

module.exports = config;