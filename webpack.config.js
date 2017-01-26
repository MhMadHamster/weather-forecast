var cssnext = require('postcss-cssnext');
var fontMagician = require('postcss-font-magician');
var normalize = require('postcss-normalize');
var postcssImport = require('postcss-import');

module.exports = {
    entry: './app/index.js',
    output: {
        filename: './bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
              test: /\.css$/,
              loader: 'style-loader!css-loader?modules!postcss-loader'
            }
        ]
    },
    postcss: function() {
      return [
        postcssImport,
        normalize,
        cssnext,
        fontMagician
      ];
    }
}
