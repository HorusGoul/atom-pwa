const { resolve } = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const WebpackCleanupPlugin = require("webpack-cleanup-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  context: resolve(__dirname, "src"),

  entry: ["./index.tsx"],

  output: {
    path: resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/"
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".scss", ".css", ".html"],
    alias: {
      "lodash": "lodash-es",
    }
  },

  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            query: {
              mozjpeg: {
                progressive: true
              }
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new WebpackCleanupPlugin({
      exclude: ["sw.js"]
    }),
    new HtmlWebPackPlugin({
      template: "index.html",
      serviceWorker: "/sw.js"
    }),
    new webpack.NamedModulesPlugin(),
    new ManifestPlugin({
      fileName: "asset-manifest.json"
    }),
    new SWPrecacheWebpackPlugin({
      cacheId: "atom",
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: "sw.js",
      minify: true,
      navigateFallback: "/index.html",
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
    }),
    new CopyWebpackPlugin([{ from: "pwa" }])
  ]
};
