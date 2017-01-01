const webpack = require("webpack")

const env = process.env.NODE_ENV;

module.exports = {
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ],
  output: {
    library: 'ReduxCandy',
    libraryTarget: 'umd'
  }
}