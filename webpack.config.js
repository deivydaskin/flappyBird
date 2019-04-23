const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'frontend', 'src', 'App.js'),
  output: {
    path: path.join(__dirname, 'frontend', 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        
      }    
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.join('.', 'frontend', 'src', 'index.html'),
  })],
};
