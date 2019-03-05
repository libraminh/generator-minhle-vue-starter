const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const autoprefixer = require("autoprefixer")
const { VueLoaderPlugin } = require('vue-loader')
const mode = process.env.NODE_ENV
const isDevMode = process.env.NODE_ENV === 'development'

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
  mode: mode,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        loader: "file-loader",
        options: {
          name: '[name].[hash:7].[ext]',
          outputPath: "assets/images/"
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'assets/fonts/'
            }
        }]
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['*', '.js', '.vue', '.json']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html')
    }),
    new VueLoaderPlugin(),
    <% if (includeJquery) { %>
    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      'window.jQuery': 'jquery',
      jQuery: 'jquery'
    })
    <% } %>
  ]
}

if(isDevMode) {
  module.exports.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
  )
  module.exports.module.rules.push(
    {
      test: /\.(sa|sc|c)ss$/,
      use: [
        "vue-style-loader",
        "css-loader?sourceMap",
        "sass-loader?sourceMap"
      ]
    }
  )
  module.exports.devServer = {
    contentBase: path.join(__dirname, 'src'),
    compress: true,
    hot: true,
    open: true
  }
  module.exports.devtool = 'source-map'
} else {
  module.exports.plugins.push(
    new CleanWebpackPlugin('build'),
    new MiniCssExtractPlugin({
      filename: "assets/css/style.css",
      chunkFilename: "assets/css/[name].css"
    }),
    new OptimizeCSSAssetsPlugin({}),
    new webpack.LoaderOptionsPlugin({
      options: {
          postcss: [
            autoprefixer()
          ]
      }
    }),

  )
  module.exports.module.rules.push(
    {
      test: /\.(sa|sc|c)ss$/,
      use: [
        MiniCssExtractPlugin.loader,
        { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
        { loader: 'sass-loader', options: { sourceMap: true } },
        "postcss-loader"
      ],
    }
  )
  module.exports.optimization = {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          filename: 'common.bundle.js'
        }
      }
    }
  }
}