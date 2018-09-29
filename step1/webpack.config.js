const webpack = require('webpack')
const path = require('path')
const rootPath = path.resolve(__dirname)
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './index.js',
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  output: {
    filename: 'cpreact.js',
    path: path.resolve(rootPath, 'dist'),
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./index.html",
    })
  ]
}