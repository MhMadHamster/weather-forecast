const path = require('path');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
};
