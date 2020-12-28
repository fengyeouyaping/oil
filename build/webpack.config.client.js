/*
 * webpack客户端配置文件
 */

//引入路径相关处理包
const path = require('path')

//引入基础配置项
const baseConfig = require('./webpack.config.base')

//引入webpack
const webpack = require('webpack')

//引入webpack配置合并插件
const merge = require('webpack-merge')

//引入生成html文件插件
const HTMLPlugin = require('html-webpack-plugin')

//引入文件单独打包插件
const ExtractPlugin = require('extract-text-webpack-plugin')

//判断当前的环境 development:开发环境 production:生产环境
const isDev = process.env.NODE_ENV === 'development'

//配置默认插件配置
const defaultPlugins = [
    new webpack.DefinePlugin({
        'process.env' : {
            NODE_ENV : isDev ? '"development"' : '"production"'
        }
    }),
    new HTMLPlugin({
        title    : "后台管理系统",
        template : path.join(__dirname, 'template.html')
    })
]

let config

//合并基本配置和客户端配置,根据开发和生产环境不同生成不同的配置信息
if(isDev){

    config = merge(baseConfig,{
        devtool : '#cheap-module-eval-source-map',  
        devServer : {
            port : 8000,
            host : '0.0.0.0',
            overlay : {
                errors : true
            },
            hot : true,
            proxy: {

                '/api': {

                    target: 'http://47.97.66.97:8080',

                    changeOrigin: true,

                    pathRewrite: {
                        '^/api': ''
                    }

                }

            }
        },
        module : {
            rules : [
                {
                    test   : /\.styl/,
                    use    : [
                        'vue-style-loader',
                        'css-loader',
                        {
                            loader : 'postcss-loader',
                            options : {
                                sourceMap : true
                            }
                        },
                        'stylus-loader'
                    ]
                }
            ]
        },
        plugins : defaultPlugins.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.ProvidePlugin({
                $ : "jquery",
                jQuery : "jquery"
            })
        ])
    })

}else{

    config = merge(baseConfig, {
        entry : {
            app : path.join(__dirname,'../client/index.js'),
            vendor : ['vue']
        },
        output : {
            path       : path.join(__dirname,'../dist'),
            filename: path.posix.join('static', 'js/[name].[chunkhash].js'),
            chunkFilename: path.posix.join('static', 'js/[id].[chunkhash].js')
        },
        module : {
            rules : [
                {
                    test   : /\.styl/,
                    use    : ExtractPlugin.extract({
                        fallback : 'vue-style-loader',
                        use : ['css-loader',
                        {
                            loader : 'postcss-loader',
                            options : {
                                sourceMap : true
                            }
                        },
                        'stylus-loader']
                    })
                }
            ]
        },
        plugins : defaultPlugins.concat([
            new webpack.optimize.CommonsChunkPlugin({
                name : 'vendor'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name : 'runtime'
            }),
            new webpack.ProvidePlugin({
                $ : "jquery",
                jQuery : "jquery"
            }),
            new ExtractPlugin(path.posix.join('static', 'css/[name].css'))
        ])
    })
}

module.exports = config