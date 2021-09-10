const path = require("path");
const webpack = require("webpack");

const current = {
  entry: {
    'basic':	path.join(__dirname, 'examples/basic/main.js'),
    'basic2':	path.join(__dirname, 'examples/basic2/main.js'),
  },
  resolve: {
    alias: {
      three: path.resolve('./node_modules/three'),
      react: path.resolve('./node_modules/react'),
      'core-js': path.resolve('./node_modules/core-js'),
      'react-dom': path.resolve('./node_modules/react-dom'),
      'react-is': path.resolve('./node_modules/react-is'),
    },
    extensions: ['.jsx', '.js', '.json']
  },
  output: {
    path: path.join(__dirname, 'examples/dist'),
		filename: '[name].min.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[hash].[ext]',
          publicPath: './dist/images/',
          outputPath: './images',
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": [
              "@babel/preset-env",
              "@babel/preset-react"
            ]
          }
        }
      }
    ]
  }
};

module.exports = current;