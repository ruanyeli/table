/* const path = require('path')
// 导入每次删除文件夹的插件
const cleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
// 导入抽取CSS的插件
// const ExtractTextPlugin = require("extract-text-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 导入压缩CSS的插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  // entry:  path.join(__dirname, '../src/index.js'),
  mode: 'development',
  entry:  path.join(__dirname, '../components/index.js'),
  devtool: 'cheap-module-source-map',
  output: {
    path: path.join(__dirname, '../lib'),
    filename: 'index.js',
    libraryTarget: 'umd',  //发布组件专用
    library: 'yl-table',
  },
  externals: { // 避免将 react 和react-dom 打包进来
    "react": {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react"
    },
    "react-dom": {
     root: "ReactDOM",
     commonjs2: "react-dom",
     commonjs: "react-dom",
     amd: "react-dom"
    }
  },
  plugins: [ // 插件
    new cleanWebpackPlugin(['../lib']),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: { // 配置压缩选项
    //     warnings: false // 移除警告
    //   }
    // }),
    // new ExtractTextPlugin("css/styles.css"), // 抽取CSS文件
    new MiniCssExtractPlugin("css/styles.css"), // 抽取CSS文件
    new OptimizeCssAssetsPlugin()// 压缩CSS的插件
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: MiniCssExtractPlugin.extract({
        //   fallback: "style-loader",
        //   use: "css-loader",
        //   publicPath: '../' // 指定抽取的时候，自动为我们的路径加上 ../ 前缀
        // })
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: './'
            }
          },
          "css-loader"
        ]
      },
      {
        test: /\.less$/,
        // use: MiniCssExtractPlugin.extract({
        //   fallback: 'style-loader',
        //   use: ['css-loader', 'less-loader'],
        //   publicPath: '../' // 指定抽取的时候，自动为我们的路径加上 ../ 前缀
        // })
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: './'
            }
          },
          "css-loader",
          "less-loader"
        ]
      },
      { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=5000&name=images/[hash:8]-[name].[ext]' },
      { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader?limit=5000&name=images/[hash:8]-[name].[ext]' },
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
    ]
  }
} */
const webpack = require('webpack');
const { IgnorePlugin } = webpack;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

process.env.NODE_ENV = 'lib';
const path = require('path');
const config = {
  mode:'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  // entry: {
  //   index: ['babel-polyfill',
  //     path.resolve(__dirname, '../components/index.js')
  //   ]
  // },
  entry: path.join(__dirname, '../components/index.js'),
  output: {
    path: path.resolve(__dirname, '../lib'),
    library: 'yl-table',
    libraryTarget: 'umd',
    filename: 'index.js'
  },
  externals: { // 避免将 react 和react-dom 打包进来
    "react": {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react"
    },
    "react-dom": {
     root: "ReactDOM",
     commonjs2: "react-dom",
     commonjs: "react-dom",
     amd: "react-dom"
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          // options: {
          //   presets: ["env", "stage-2"],
          // }
        },
        exclude: /node_modules/,
      },
      // {
      //   test: /\.tsx?$/,
      //   use: ['ts-loader'],
      // },
      {
        test: /\.(css|less|scss)$/,
        use: [
              require.resolve("style-loader"),
              {
                // loader: "typings-for-css-modules-loader",
                loader: "css-loader",
                // options: {
                //   namedexport: true,
                //   camelcase: true,
                //   modules: true
                // }
              },
              {
                loader: require.resolve("less-loader") // compiles Less to CSS
              }
          ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader?limit=5000&name=images/[hash:8]-[name].[ext]' },
    ],
  },
  plugins: [
    // 忽略 moment 的locale 文件
    new IgnorePlugin(/^\.\/locale$/, /moment$/),
    // 打包后文件体积分析
    new BundleAnalyzerPlugin(), 
  ]
}
module.exports = config;
