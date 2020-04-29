/* eslint-disable import/no-commonjs */

const {PartPlugin, PartResolverPlugin} = require('@sanity/webpack-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    main: path.resolve(__dirname, './src/entry.js'),
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].bundle.js',
    publicPath: 'static/'
  },

  // COMMON:
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/static/'
            }
          },
          {
            loader: 'css-loader',
            options: {modules: true, importLoaders: 1}
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: __dirname
              }
            }
          }
        ]
      },
      {
        use: {
          loader: path.resolve(__dirname, './packages/@sanity/webpack-loader/partLoader.js')
        },
        resourceQuery: /[?&]sanityPart=/
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  resolve: {
    plugins: [new PartResolverPlugin()]
  },
  plugins: [new PartPlugin({basePath: __dirname}), new MiniCssExtractPlugin()]
}
