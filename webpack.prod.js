const Merge = require("webpack-merge");
const CommonConfig = require("./webpack.common");
const webpack = require("webpack");
const ChunkHashPlugin = require("webpack-chunk-hash");

module.exports = Merge(CommonConfig, {
  output: {
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js"
  },

  plugins: [
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
