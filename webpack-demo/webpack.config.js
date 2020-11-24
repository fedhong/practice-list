var webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: __dirname + "/src/index.js", // 唯一入口文件 
    // output: {
    //     path: path.resolve(__dirname, 'dist'), // 打包后的文件存放的路径
    //     filename: "bundle.js" // 打包后输出文件的文件名
    // },
    plugins: [
        new webpack.DefinePlugin({
            // Definitions...
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: path.resolve(__dirname, 'dist/index.html')
        })
    ]
}
