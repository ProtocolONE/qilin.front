const path = require('path');
const webpack = require('webpack');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
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
              'webpack-dev-server/client?http://localhost:8080', // WebpackDevServer host and port
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
                  new UglifyJsPlugin({
                      cache: true,
                      parallel: true,
                      extractComments: true,
                  }),
                  new OptimizeCSSAssetsPlugin({
                      cssProcessorPluginOptions: {
                          preset: ['default', { discardComments: { removeAll: true } }],
                      },
                  }),
              ],
          },

    plugins: [
        new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false }),
        new MiniCssExtractPlugin({ filename: '[name].css', chunkFilename: '[id].css' }),
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env.QILIN_API': JSON.stringify(process.env.QILIN_API),
        }),
    ].concat(ENV_DEV ? [new webpack.HotModuleReplacementPlugin()] : []),
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.vue'],
        alias: {
            '@': path.join(__dirname, 'source'),
        },
    },
    devtool: ENV_DEV ? 'inline-source-map' : '',
    devServer: {
        stats: 'verbose',
        hot: true,
        host: '0.0.0.0',
        proxy: {
            '/api/*': 'http://localhost:3001',
            '/auth-api/*': 'http://localhost:3001',
        },
        historyApiFallback: { index: 'index.html' },
    },
};
