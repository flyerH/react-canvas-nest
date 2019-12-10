const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

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
        minimize: true,
        minimizer: [
            new TerserPlugin({
                sourceMap: true,
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
    }
};