const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = {
  entry: {
    app: './src/index.tsx'
  },
  mode: 'development',
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/typescript', '@babel/react'],
            plugins: ['@babel/plugin-proposal-object-rest-spread'],
          },
        },
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'static'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      inlineSource: '.(js|css)$',
      template: path.resolve(__dirname, 'static/index.ejs'),
    }),
    new HtmlWebpackInlineSourcePlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'static'),
    compress: true,
    port: 3000,
  },
};
