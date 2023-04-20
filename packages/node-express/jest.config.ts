import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';

const { compilerOptions } = require('./tsconfig.json');

const config: Config = {
  verbose: true,

  preset: 'ts-jest',

  moduleFileExtensions: ['js', 'json', 'ts', 'jsx', 'tsx'],

  testRegex: 'src/__tests__/(.*).spec.ts',

  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },

  collectCoverageFrom: ['src/**/*.ts'],

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

  testEnvironment: 'node',

  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>',
    }),

    '@ts-phoenix/(.*)': '<rootDir>/../$1/src',
  },
};

export default config;
