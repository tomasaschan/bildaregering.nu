const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  devServer: {
    hot: true
  },
  entry: ['@babel/polyfill', './src/index.js'],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { sourceMap: true }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('postcss-import')({ skipDuplicates: true }),
                require('postcss-preset-env')({
                  features: {
                    'nesting-rules': true,
                    'custom-media-queries': true
                  }
                })
              ],
              sourceMap: true,
              ident: 'postcss'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|(o|t)tf|eot)$/i,
        loader: 'file-loader', // -> returns new url to file
        query: {
          name: 'fonts/[name].[hash].[ext]'
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: /icons/,
        use: [
          {
            loader: 'file-loader', // -> returns new url to file
            query: {
              name: 'img/[name].[hash].[ext]'
            }
          },
          'image-webpack-loader'
        ]
      },
      {
        test: /\.svg$/i,
        use: [
          {
            loader: 'svg-inline-loader', // -> returns full svg object
            options: {
              removeTags: true,
              removeSVGTagAttrs: true,
              idPrefix: 'icon'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
