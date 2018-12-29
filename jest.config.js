module.exports = {
  verbose: true,
  setupFiles: [
    './test/setup.js',
  ],
  moduleFileExtensions: [
    'js',
    'jsx',
  ],
  // snapshotSerializers: ['enzyme-to-json/serializer'],
  testMatch: ['**/__test__/**/*.js?(x)', 'src/__test__/?(*.)+(spec|test).js?(x)'],
  // transform: {
  //   '^.+\\.js$': 'babel-jest'
  // },
  transform: {
    // '^.+\\.js$': '<rootDir>/test/jest-transformer.js',
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.(css|less)$': '<rootDir>/test/css-transformer.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$': '<rootDir>/test/file-transformer.js',
  },
  collectCoverageFrom: [
    'src/component/**/*.{ts,tsx,js}',
    '!src/component/*/style/index.js',
    '!src/component/style/index.js',
    '!src/component/*/locale/index.js',
    '!src/component/*/__tests__/**/type.js',
    '!src/component/**/*/interface.{ts,js}',
  ],
  transformIgnorePatterns: [
    '/dist/',
    '/lib/',
    '/docs/',
    'node_modules/[^/]+?/(?!(es|node_modules)/)', // Ignore modules without es dir
    '^.+\\.module\\.(css|sass|scss|less)$',
  ],
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
