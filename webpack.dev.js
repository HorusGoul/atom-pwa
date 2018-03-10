const { resolve } = require("path");
const webpack = require("webpack");
const Merge = require("webpack-merge");
const CommonConfig = require("./webpack.common");
const fs = require("fs");
const postcssConfig = require('./postcss.config');

module.exports = Merge(CommonConfig, {
  entry: [
    "react-hot-loader/patch",
    "webpack-dev-server/client?https://localhost:4200",
    "webpack/hot/only-dev-server"
  ],

  devtool: "inline-source-map",

  devServer: {
    hot: true,
    contentBase: resolve(__dirname, "dist"),
    publicPath: "/",
    port: 4200,
    historyApiFallback: true,
    disableHostCheck: true,
    host: "0.0.0.0",
    https: true
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: Object.assign({}, postcssConfig, {
              sourceMap: true
            })
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },

  plugins: [new webpack.HotModuleReplacementPlugin()]
});
