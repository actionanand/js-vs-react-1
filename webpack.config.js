const path = require('path');
const devMode = process.env.NODE_ENV !== 'production';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    index: path.resolve(__dirname, './src/app.js') 
  },
  output: {
    path: path.resolve(__dirname, './build'),
    publicPath: '',
    filename: devMode ? '[name].bunde.js' : '[name].bunde.[contenthash].js'
  },
  devServer: {
    allowedHosts: [
      'all'
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
      favicon: path.resolve(__dirname, './public/favicon.png')
      // minify: false
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? 'bundle.css' :  'bundle.[contenthash].css'
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     { from: './public/vendor.js', to: './' }, // output path is 'build' folder, already defined.
    //     { from: './assets', to: './assets' },
    //     { from: './src/styles.css', to: './' }
    //   ]
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        // Apply rule for .sass, .scss or .css files
        test: /\.(sa|sc|c)ss$/,
  
        // Set loaders to transform files.
        // Loaders are applying from right to left(!)
        // The first loader will be applied after others
        use: [
          {
            // After all CSS loaders, we use a plugin to do its work.
            // It gets all transformed CSS and extracts it into separate
            // single bundled file
            loader: MiniCssExtractPlugin.loader
          }, 
          {
            // This loader resolves url() and @imports inside CSS
            loader: 'css-loader',
          },
          {
            // Then we apply postCSS fixes like autoprefixer and minifying
            loader: 'postcss-loader'
          },
          {
            // First we transform SASS to standard CSS
            loader: 'sass-loader',
            options: {
              implementation: require('sass')
            }
          }
        ]
      },
      {
        // Now we apply rule for images
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
            {
              // Using file-loader for these files
              loader: 'file-loader',

              // In options we can set different things like format
              // and directory to save
              options: {
                outputPath: 'images'
              }
            }
          ]
      }
    ]
  }
}