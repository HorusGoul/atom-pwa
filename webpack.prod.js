const Merge = require("webpack-merge");
const CommonConfig = require("./webpack.common");
const webpack = require("webpack");
const ChunkHashPlugin = require("webpack-chunk-hash");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const extractScss = new MiniCssExtractPlugin({
  filename: "[name].[contenthash].css"
});
const postcssConfig = require('./postcss.config');

module.exports = Merge(CommonConfig, {
  output: {
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js"
  },

  mode: 'production',

  devtool: "nosources-source-map",

  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: Object.assign({}, postcssConfig, {
              sourceMap: false
            })
          },
          "sass-loader",
        ]
      },
      {
        test: /\.tsx?/,
        use: [
          // "babel-loader",
          {
            loader: "ts-loader",
            options: {
              transpileOnly: false,
            }
          }
        ],
        exclude: /node_modules/,
      },
    ]
  },

  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          beautify: false,
          mangle: {
            keep_fnames: true
          },
          comments: false,
        },
        sourceMap: true,
      })
    ]
  },

  plugins: [
    extractScss,
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new ChunkHashPlugin({ algorithm: "md5" }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "../bundle-report.html",
      openAnalyzer: true,
    }),
  ]
});
