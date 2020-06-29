const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./app.js", // 唯一入口文件 
    output: {
        path: path.resolve(__dirname, 'dist'), // 打包后的文件存放的路径
        filename: "my-first-webpack.bundle.js" // 打包后输出文件的文件名
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,//匹配.js文件
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: path.resolve(__dirname, 'dist/index.html')
        })
    ],
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,//gzip
        port: 8080,
    }
}
