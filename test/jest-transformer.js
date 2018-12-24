const config = {
  babelrc: false,
  // "presets": [
  //   "es2015",
  //   "stage-2"
  // ]
  // presets: [
  //   [
  //     "@babel/env",
  //     {
  //       modules: false
  //     }
  //   ],
  //   "@babel/react"
  // ],
  // plugins: [
  //   ["@babel/plugin-proposal-decorators", { legacy: true }],
  //   ["@babel/plugin-proposal-class-properties", { loose: true }],
  //   "transform-es2015-modules-commonjs"
  // ]
  "presets": [
    ["env"],
    ["es2015", {"modules": false}],
    "react"
  ],
  "env": {
    "test": {
      "presets": [["env"], ["es2015"], "react", ["stage-2"]]
    }
  },
};
// 'use strict';

// const config = function (modules) {
//   const plugins = [
//     require.resolve('babel-plugin-transform-es3-member-expression-literals'),
//     require.resolve('babel-plugin-transform-es3-property-literals'),
//     require.resolve('babel-plugin-transform-object-assign'),
//     require.resolve('babel-plugin-transform-class-properties'),
//     require.resolve('babel-plugin-transform-object-rest-spread'),
//   ];
//   plugins.push([require.resolve('babel-plugin-transform-runtime'), {
//     polyfill: false,
//   }]);
//   return {
//     presets: [
//       require.resolve('babel-preset-react'),
//       [require.resolve('babel-preset-env'), {
//         modules,
//         targets: {
//           browsers: [
//             'last 2 versions',
//             'Firefox ESR',
//             '> 1%',
//             'ie >= 9',
//             'iOS >= 8',
//             'Android >= 4',
//           ],
//         },
//       }],
//     ],
//     plugins,
//   };
// };

module.exports = require("babel-jest").createTransformer(config);
