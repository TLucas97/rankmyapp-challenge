import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  
  testMatch: [
    '<rootDir>/__tests__/**/*.[jt]s?(x)',
    '<rootDir>/app/**/__tests__/**/*.[jt]s?(x)',
    '<rootDir>/components/**/__tests__/**/*.[jt]s?(x)',
    '<rootDir>/lib/**/__tests__/**/*.[jt]s?(x)',
    '<rootDir>/app/**/?(*.)+(spec|test).[jt]s?(x)',
    '<rootDir>/components/**/?(*.)+(spec|test).[jt]s?(x)',
    '<rootDir>/lib/**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  
  testPathIgnorePatterns: [
    '/node_modules/',
    '/\\.next/',
    '/mocks/',
    '/references/',
    'mocks/',
    '.*/mocks/.*',
    '.*\\\\mocks\\\\.*',
  ],
  
  modulePathIgnorePatterns: [
    '/mocks/',
    '/references/',
    '.*/mocks/.*',
    '.*\\\\mocks\\\\.*',
  ],
  
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/mocks/**',
  ],
  
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },
  
  silent: false,
  verbose: true,
};

export default createJestConfig(config);

