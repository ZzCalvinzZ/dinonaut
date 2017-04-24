var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: __dirname,

    devtool: 'source-map',

    entry: {
        vendor: [
            "expose-loader?PIXI!./assets/js/vendor/pixi.min.js",
            'babel-polyfill',
            './assets/js/vendor/index',
        ],
        main: [
            './assets/js/main/index'
        ]
    },

    output: {
        publicPath: 'http://localhost:20069/assets/bundles/',
        path: path.resolve('./assets/bundles/'),
        filename: "[name].js",
    },

    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
        new ExtractTextPlugin('[name].css'),
    ],

    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'stage-2']
            }
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                    }
                } ,{
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true,
                    }
                }]
            }),
        },{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('css-loader')
        }],
    },

    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'assets/js/'),
            path.resolve(__dirname, 'assets/css/'),
        ],
        extensions: ['*', '.js', '.scss', 'css'],
    },
}
