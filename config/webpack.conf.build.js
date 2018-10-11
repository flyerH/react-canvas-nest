const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/index.jsx',
    output: {
        filename: 'react-canvas-nest.min.js',
        path: path.resolve(__dirname, '../dist'),
        libraryTarget: 'umd',
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }]
    },
    externals: {
        "react": 'react',
        'react-dom': 'ReactDOM'
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
    }
};