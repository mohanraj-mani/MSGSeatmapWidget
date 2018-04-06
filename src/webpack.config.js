const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const DefinePlugin = require('webpack').DefinePlugin

module.exports = {
  devtool: 'source-map',
  entry: {
    'client': path.join(__dirname, 'src/index'),
    'examples': path.join(__dirname, 'examples/index')
  },
  output: {
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'this',
    path: path.join(__dirname, 'dist')
  },
  plugins: [
    new CopyWebpackPlugin([
      {from: path.join(__dirname, 'examples/index.html')}
    ]),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  module: {
    rules: [
      {
        test: [ /\.js$/ ],
        include: [/src/, /examples/],
        exclude: [/\.test.js$/, /node_modules/],
        loaders: ['react-hot-loader', 'babel-loader']
      },
      { test: /\.html?$/, loader: 'html-loader' },
      { test: /\.(css|scss)$/, use: [
          MiniCssExtractPlugin.loader, {
              loader: 'css-loader',
              options: {
                  importLoaders: 2,
                  sourceMap: true
              }
          }, {
              loader: 'postcss-loader',
              options: {
                  plugins: () => [
                      require('autoprefixer')
                  ],
                  sourceMap: true
              }
          }, {
              loader: 'sass-loader',
              options: {
                  sourceMap: true
              }
          }
        ]
      }
    ]
  },
  target: 'web'
}
