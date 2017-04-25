var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = require('./webpack.config.js');

config.output.filename = "[name].js";
config.output.path = path.resolve('./assets/bundles');
config.output.publicPath = undefined;
config.devtool = undefined;

config.plugins = [
    new BundleTracker({
      filename: './webpack-stats-prod.json'
   }),

    new ExtractTextPlugin('[name].css')
]

module.exports = config;
