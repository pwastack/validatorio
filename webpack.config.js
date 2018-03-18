const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

process.env.NODE_ENV = 'production';

module.exports = {
  entry: './src/validatorio.js',
  plugins: [
    new UglifyJsPlugin()
  ],
  output: {
    filename: './validatorio.min.js',
    path: path.resolve(__dirname, 'dist')
  }
};