/* eslint-env node */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    'src/(.*)': "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.ts"
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/lib/"
  ]
};

