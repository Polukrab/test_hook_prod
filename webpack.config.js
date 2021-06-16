const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const devMode = argv.mode !== 'production';

  return {
    entry: './src/index.js',
    output: {
      filename: 'js/bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      compress: false
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Test Hook Prod',
        template: './src/index.html',
        inject: 'body'
      }),
    ].concat(devMode
        ? []
        : [
            new MiniCssExtractPlugin({
              filename: 'css/style.css'
            })
        ]),
    module: {
      rules: [
        {
          test: /\.jsx?/i,
          exclude: /node_modules/,
          use: [`babel-loader`]
        },
        {
          test: /\.s?css$/i,
          use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader', {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    require(`autoprefixer`)
                  ]
                },
              }
            },
            'sass-loader',
          ],
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    }
  }
};
