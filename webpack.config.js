require('dotenv').config();
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');


module.exports = function(_, argv) {
  const isDeveleopment = argv.mode === 'development';

  const mode = isDeveleopment ? 'development' : 'production';

  return {
    mode,
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'public'),
    },
    stats: 'errors-warnings',
    devServer: {
      port: 3000,
      compress: true,
      hot: true,
      static: {
        directory: path.join(__dirname, 'public')
      }
    },
    resolve: {
      fallback: {
        "crypto": false,
        os: false,
        path: false,
      }
    },
    module: {
      rules: [
        {
          test: /\.css|\.s[ac]ss/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[local]--[hash:base64:5]'
                }
              }
            },
            'sass-loader',
          ]
        },
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [ '@babel/preset-env', '@babel/preset-react' ]
            }
          }
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|webm)$/i,
          type: 'asset/resource'
        }
      ]
    },
    plugins: [
      new Dotenv(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html')
      }),
    ],
  };
}