const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: ["@babel/polyfill", "./main.mjs"],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist/")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "src/js")],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],

  devtool: "source-map",
  mode: "development"
};


// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// module.exports = {
//   entry: './main.mjs',

//   output: {
//     filename: '[name].js',
//     path: path.resolve(__dirname, './dist'),
//   },

//   resolve: {
//     extensions: ['.jsx', '.js', '.tsx', '.ts'],
//   },

//   devtool: 'source-map',

//   devServer: {
//     historyApiFallback: true,
//     port: 8082,
//     compress: true,
//   },

//   module: {
//     rules: [
//       {
//         test: /\.css$/i,
//         use: [MiniCssExtractPlugin.loader, 'css-loader'],
//       },
//       {
//         test: /\.(js|jsx)$/,
//         use: {
//             loader: 'babel-loader'
//         },
//         exclude: /node_modules/,
//       },
//       {
//         test: /\.(svg|png|jpg|gif)$/i,
//         loader: 'url-loader',
//       },
//     ],
//   },

//   plugins: [
//     new CleanWebpackPlugin(),
//     new MiniCssExtractPlugin(),
//     new HtmlWebpackPlugin({
//       template: './index.html',
//     }),
//   ],
// }