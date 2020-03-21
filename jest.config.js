// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  collectCoverage: true,

  coveragePathIgnorePatterns: [
    '/node_modules|website|dist/',
    'rollup.config.ts',
    'lisan-types',
  ],

  collectCoverageFrom: ['packages/**/*.ts'],

  // The test environment that will be used for testing
  testEnvironment: 'node',

  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      diagnostics: false,
      tsConfig: 'tsconfig.base.json',
    },
  },

  setupFilesAfterEnv: ['jest-extended'],
};
