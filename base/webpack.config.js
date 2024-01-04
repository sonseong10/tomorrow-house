const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const imageminJpegtran = require('imagemin-jpegtran');

module.exports = {
  entry: './index.js', // Adjust the entry point based on your project structure
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist/',
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 2, sourceMap: true },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          {
            loader: 'sass-loader',
            options: { implementation: require('node-sass'), sourceMap: true },
          },
        ],
      },
      {
        test: /\.(svg|eot|ttf|woff)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/fonts',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(png|jpe?g)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/images',
          limit: 20000, //20KB
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html', // Adjust the template path based on your project structure
      favicon: 'favicon.ico', // Adjust the favicon path based on your project structure
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
  // optimization: {
  //   minimizer: [
  //     imageminJpegtran({
  //       progressive: true,
  //     }),
  //   ],
  // },
};
