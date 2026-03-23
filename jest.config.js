const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  preset: "ts-jest",
  verbose: true,
  testTimeout: 30000,
  globals: {
    fetch: global.fetch,
  },
};

module.exports = createJestConfig(config);
