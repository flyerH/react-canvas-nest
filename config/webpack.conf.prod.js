const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');

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
        minimize: true,
        minimizer: [
            new TerserPlugin({
                cache: false,
                terserOptions: {
                    compress: {
                        drop_console: true
                    },
                    output: {
                        beautify: false
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