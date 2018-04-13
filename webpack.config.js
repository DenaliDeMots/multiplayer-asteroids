const path = require('path');
const webpack = require('webpack')

module.exports = {
    entry: './src/index.js',
    devtool: 'eval-source-map',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js',
    },
    mode: 'development',
    devServer: {
        contentBase: './build',
    }
}