module.exports = {
  entry: './src/index.js',
  output: {
    filename: './bundle.js',
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  module: {
    loaders: [{
      loader: 'babel-loader',
      exclude: /node_modules/,
    }],
  },
};
