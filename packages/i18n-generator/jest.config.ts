import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';

const { compilerOptions } = require('./tsconfig.json');

const config: Config = {
  verbose: true,

  preset: 'ts-jest',
  testEnvironment: 'node',

  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testRegex: 'src/__tests__/(.*).spec\\.(ts|tsx)',

  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  coverageDirectory: './coverage',
  coverageReporters: ['text-summary', 'html'],
  coveragePathIgnorePatterns: ['src/(index|defs)\\.ts'],

  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>',
    }),

    '@ts-phoenix/(.*)': '<rootDir>/../$1/src',
  },
};

export default config;
