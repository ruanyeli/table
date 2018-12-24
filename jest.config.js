module.exports = {
  verbose: true,
  setupFiles: [
    './test/setup.js',
  ],
  "moduleFileExtensions": [
    "js",
    "jsx"
  ],
  // snapshotSerializers: ['enzyme-to-json/serializer'],
  testMatch: [ "**/__test__/**/*.js?(x)", "__test__/?(*.)+(spec|test).js?(x)" ],
  // transform: {
  //   "^.+\\.js$": "babel-jest"
  // },
  transform: {
    "^.+\\.js$": "<rootDir>/test/jest-transformer.js",
    "^.+\\.(css|less)$": '<rootDir>/test/css-transformer.js',
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": '<rootDir>/test/file-transformer.js',
  },
  collectCoverageFrom: [
    'components/**/*.{ts,tsx,js}',
    '!components/*/style/index.js',
    '!components/style/index.js',
    '!components/*/locale/index.js',
    '!components/*/__tests__/**/type.js',
    '!components/**/*/interface.{ts,js}',
  ],
  transformIgnorePatterns: [
    '/dist/',
    '/lib/',
    '/docs/',
    'node_modules/[^/]+?/(?!(es|node_modules)/)', // Ignore modules without es dir
  ],
  "timers": "fake",
}