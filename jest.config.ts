import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  coverageProvider: 'v8',
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    '!app/**/*.stories.{ts,tsx}',
    '!app/**/*.test.{ts,tsx}',
    '!app/**/*.d.ts',
    '!app/**/*.config.{ts,tsx}',
    '!app/**/_components/**/index.{ts,tsx}',
    '!app/**/components/**/index.{ts,tsx}',
    '!app/**/_components/**/mocks.{ts,tsx}',
  ],
  coverageDirectory: 'coverage',
  // coverageThreshold: {
  //   global: {
  //     statements: 20,
  //     branches: 20,
  //     functions: 20,
  //     lines: 20,
  //   },
  // },
  moduleDirectories: ['node_modules', 'app'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|pdf|css|less|scss|sss|styl)$':
      'jest-transform-stub',
    '^.+\\.svg$': 'jest-svg-transformer',
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default createJestConfig(config);
