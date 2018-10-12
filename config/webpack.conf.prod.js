const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './example/index.js',
    output: {
        filename: 'index.js',
        publicPath: './',
        path: path.resolve(__dirname, '../example/dist'),
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            loader: [
                MiniCssExtractPlugin.loader,
                'css-loader',
            ]
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: {
                        drop_console: true,
                        collapse_vars: true,
                        reduce_vars: true
                    },
                    output: {
                        comments: false,
                        beautify: false,
                    }
                }
            })
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'React-Canvas-Nest',
            inject: true,
            filename: path.resolve(__dirname, '../example/dist/index.html'),
            template: 'example/template/index.html'
        }),
        new MiniCssExtractPlugin()
    ]
};