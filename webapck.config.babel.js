import webpack from 'webpack'

const config = {
  module: {
    use: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }
    ]
  },
export default config
