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
      "^.+\\.css$": "<rootDir>/node_modules/jest-css-modules-transform",
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
     '\\.(jpg|jpeg|png|gif|svg)$': 'jest-transform-file',

    },
    transformIgnorePatterns: [
      '/node_modules/(?!(axios)/)',
      'node_modules/(vue-demi)',
      "\\.css$",
      'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)'
    ],
    moduleNameMapper: {
      '^axios$': '<rootDir>/mocks/axios.js',
      "\\.(css)$": "identity-obj-proxy"
    },
    testEnvironment: 'node'
  };
  