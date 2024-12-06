export default {
  testEnvironment: 'jest-environment-jsdom', // Use jsdom for browser-like testing
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/jest.mock.js', // Mock CSS/SCSS files
    '^@/(.*)$': '<rootDir>/src/$1', // Map '@' alias to the 'src' folder
  },
  transformIgnorePatterns: [
    'node_modules/(?!(some-esm-package|another-esm-package)/)', // Optional: Transpile ESM packages
  ],
  moduleFileExtensions: ['js', 'json'], // Allow .js and .json files
  globals: {
    'jest-environment-jsdom': {
      customExportConditions: ['node', 'node-addons'], // Enable custom export conditions
    },
  },
};
