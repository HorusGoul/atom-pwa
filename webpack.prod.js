const Merge = require("webpack-merge");
const CommonConfig = require("./webpack.common");
const webpack = require("webpack");
const ChunkHashPlugin = require("webpack-chunk-hash");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractScss = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
});

module.exports = Merge(CommonConfig, {
  output: {
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js"
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractScss.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
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
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    }),
    new ChunkHashPlugin({ algorithm: "md5" })
  ]
});
