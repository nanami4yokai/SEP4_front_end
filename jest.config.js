module.exports = {
    roots: ['<rootDir>/src'],
    testMatch: ['**/__test__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js, jsx}', '!src/**/*.test.{js, jsx}'],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!(axios)/)',
      'node_modules/(vue-demi)',
    ],
    moduleNameMapper: {
      '^axios$': '<rootDir>/mocks/axios.js',
    },
  };
  