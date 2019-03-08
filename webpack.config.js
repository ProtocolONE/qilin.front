const path = require('path');
const webpack = require('webpack');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const ENV_DEV = process.env.NODE_ENV === 'development';
const ENV_PROD = process.env.NODE_ENV === 'production';
const MINIFY = !((process.env.MINIFY || '').toLowerCase() === 'no') && !ENV_DEV;

console.log('ENV_DEV:', ENV_DEV, 'ENV_PROD:', ENV_PROD, 'MINIFY:', MINIFY);

module.exports = {
  mode: process.env.NODE_ENV,
  context: path.join(__dirname, 'source'),
  entry: (ENV_DEV
    ? [
      'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
      'webpack/hot/only-dev-server', // 'only' prevents reload on syntax errors
    ]
    : []
  ).concat(['./main.ts']),
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '',
    filename: './[name].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          hotReload: true,
          loaders: {
            ts: 'ts-loader',
          },
          esModule: true,
          compilerOptions: {
            whitespace: 'condense'
          }
        },
      },
      {
        resourceQuery: /blockType=i18n/,
        type: 'javascript/auto',
        loader: '@kazupon/vue-i18n-loader',
      },
      {
        test: /\.ts$/,
        use: [
          { loader: 'babel-loader', options: { presets: ['@babel/preset-env'] } },
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
              transpileOnly: true,
            },
          },
        ],
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.js$/,
        use: [{ loader: 'babel-loader', options: { presets: ['@babel/preset-env'] } }],
        exclude: /(node_modules|bower_components)/,
      },
      { test: /\.(png|jpg|svg|gif)$/, loader: 'file-loader?name=[path][name].[ext]' },
      {
        test: /\.woff2?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=[path][name].[ext]',
      },
      {
        test: /\.ttf$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=[1]&name=[path][name].[ext]',
      },
      { test: /\.eot$/, loader: 'file-loader?name=[path][name].[ext]' },
      { test: /\.otf$/, loader: 'file-loader?name=[path][name].[ext]' },
      {
        test: /\.s?css$/,
        use: [
          ENV_DEV ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  optimization: !MINIFY
    ? { minimize: false }
    : {
      minimizer: [
        new OptimizeCSSAssetsPlugin({
          cssProcessorPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true } }],
          },
        }),
        new TerserPlugin({
          cache: true,
          parallel: true,
          extractComments: true,
        }),
      ],
    },

  plugins: [
    new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false }),
    new MiniCssExtractPlugin({ filename: '[name].css', chunkFilename: '[id].css' }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin(
      [
        'QILIN_API',
        'IMAGINARY_API',
        'NODE_ENV',
        'AUTH1_ISSUER_URL',
        'AUTH1_CLIENT_ID',
        'POST_MESSAGE_TARGET_ORIGIN',
      ]
        .reduce((acc, item) => ({
          ...acc,
          ['process.env.' + item]: JSON.stringify(process.env[item])
        }), {})
    ),
  ].concat(ENV_DEV ? [new webpack.HotModuleReplacementPlugin()] : []),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.vue'],
    alias: {
      '@': path.join(__dirname, 'source'),
    },
  },
  devtool: ENV_DEV ? 'inline-source-map' : '',
  devServer: {
    noInfo: true,
    stats: 'errors-only',
    hot: true,
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/api/*': 'http://localhost:3001',
      '/auth-api/*': 'http://localhost:3001',
      '/upload': {
        target: {
          host: "localhost",
          protocol: 'http:',
          port: 9000,
        },
        pathRewrite: {
          '^/upload': ''
        }
      }
    },
    historyApiFallback: { index: 'index.html' },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: true
  },

};
