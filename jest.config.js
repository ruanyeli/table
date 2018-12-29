module.exports = {
  verbose: true,
  setupFiles: [
    './config/jest/setup.js',
  ],
  moduleFileExtensions: [
    'js',
    'jsx',
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testMatch: [
    '<rootDir>/__test__/**/*.js?(x)',
    '<rootDir>/__test__/?(*.)+(spec|test).js?(x)',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/__test__/coverage',
  ],
  // transform: {
  //   '^.+\\.js$': 'babel-jest'
  // },
  transform: {
    // '^.+\\.js$': '<rootDir>/test/jest-transformer.js',
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.(css|less)$': '<rootDir>/config/jest/cssTransform.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$': '<rootDir>/config/jest/fileTransform.js',
  },
  transformIgnorePatterns: [
    '/dist/',
    '/lib/',
    '/docs/',
    'node_modules/[^/]+?/(?!(es|node_modules)/)', // Ignore modules without es dir
    '^.+\\.module\\.(css|sass|scss|less)$',
  ],
  collectCoverageFrom: [
    'components/**/*.{ts,tsx,js}',
    '!components/*/style/index.js',
    '!components/style/index.js',
    '!components/*/locale/index.js',
    '!components/*/__tests__/**/type.js',
    '!components/**/*/interface.{ts,js}',
  ],
  coverageDirectory: '__test__/coverage',
  // coverageReporters: 'text',
  timers: 'fake',
};

// {
//   "collectCoverageFrom": [
//     "src/**/*.{js,jsx,ts,tsx}",
//     "!src/**/*.d.ts"
//   ],
//   "resolver": "jest-pnp-resolver",
//   "setupFiles": [
//     "react-app-polyfill/jsdom"
//   ],
//   "testMatch": [
//     "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
//     "<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}"
//   ],
//   "testEnvironment": "jsdom",
//   "testURL": "http://localhost",
//   "transform": {
//     "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
//     "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
//     "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
//   },
//   "transformIgnorePatterns": [
//     "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
//     "^.+\\.module\\.(css|sass|scss)$"
//   ],
//   "moduleNameMapper": {
//     "^react-native$": "react-native-web",
//     "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy"
//   },
//   "moduleFileExtensions": [
//     "web.js",
//     "js",
//     "web.ts",
//     "ts",
//     "web.tsx",
//     "tsx",
//     "json",
//     "web.jsx",
//     "jsx",
//     "node"
//   ]
// }
