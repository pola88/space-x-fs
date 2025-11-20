import type { Config } from 'jest';

const config: Config = {
  // Use ts-jest preset for TypeScript support
  preset: 'ts-jest',

  // Test environment for Node.js
  testEnvironment: 'node',

  // Setup files to run before tests (for environment setup)
  setupFiles: ['<rootDir>/test/setup-env.ts'],
  
  // Setup files to run after test framework is installed
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],

  // Directories to search for tests and source files
  roots: ['<rootDir>/src', '<rootDir>/test'],

  // File extensions to recognize
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Pattern to match test files
  testMatch: [
    '**/__tests__/**/*.ts?(x)',
    '**/?(*.)+(spec|test).ts?(x)',
  ],

  // Transform TypeScript files using ts-jest
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: {
        // Use the same tsconfig settings
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
      },
    }],
  },

  // Ignore patterns for tests
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
  ],

  // Module name mapper for path aliases (if needed)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.interface.ts',
    '!src/**/index.ts',
  ],

  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['text', 'lcov', 'html'],

  // Automatically clear mocks between tests
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,

  // Verbose output
  verbose: true,
};

export default config;
