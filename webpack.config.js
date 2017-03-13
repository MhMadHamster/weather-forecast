module.exports = {
  entry: './src/index.js',
  output: {
    filename: './bundle.js'
  },
  module: {
    loaders: [{
      loader: 'babel-loader',
      exclude: /node_modules/,
    }]
  }
}
