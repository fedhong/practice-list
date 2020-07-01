var webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: __dirname + "/src/index.js", // 唯一入口文件    
    module: {
        rules: [
            /*
            {
                test: /\.js$/,//匹配.js文件
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader'
                }
            },*/
            {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader',
                    options: { sourceMap: false }
                }, {
                    loader: 'css-loader',
                    options: { sourceMap: false }
                }, 'postcss-loader',
                ]
            }, {
                test: /\.less$/,
                use: [
                    { loader: 'style-loader', options: { sourceMap: false } },
                    { loader: 'css-loader', options: { sourceMap: false } },
                    { loader: 'postcss-loader', options: { sourceMap: false } },
                    { loader: 'less-loader', options: { sourceMap: false } }
                ]
            }, {
                test: /\.(scss|sass)$/,
                use: [
                    { loader: 'style-loader', options: { sourceMap: false } },
                    { loader: 'css-loader', options: { sourceMap: false } },
                    { loader: 'postcss-loader', options: { sourceMap: false } },
                    { loader: 'sass-loader', options: { sourceMap: false } }
                ]
            }, {
                test: /\.(png|jpg|gif|ico|jpeg|bmp|swf)$/,
                exclude: path.resolve(__dirname, 'node_modules/'),
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name(file) { //图片超过 10000 Kb处理
                            return file.replace(/.*assets(\/|\\)/, '').replace(/\\/g, '/')
                        }
                    }
                }]
            }, {
                test: /\.(woff|woff2|svg|eot|ttf|otf)$/,
                exclude: path.resolve(__dirname, 'node_modules/'),
                use: [{
                    loader: 'file-loader',
                    options: {
                        limit: 10000,
                        name: 'fonts/[name].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            // Definitions...
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: path.resolve(__dirname, 'dist/index.html')
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        hot: true,
        contentBase: path.join(__dirname, './dist'), //编译打包文件的位置
        publicPath: '/',
        port: 7777,                                 //服务器端口号
        host: 'localhost',
        proxy: {},                                  //代理列表
        compress: true,
        historyApiFallback: true                   //开启服务器history重定向模式
    }
}


/**
 * 常用loader
 */