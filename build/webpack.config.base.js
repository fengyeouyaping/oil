/*
 * webpack通用配置文件
 */

//引入路径相关处理包
const path = require('path')

//指定命令模式
var shell = require('shelljs')

//将静态目录原样复制到打包后的目录，该文件夹下为静态资源
var assetsPath = path.join(path.resolve(__dirname, '../dist'), "static")
shell.rm('-rf', assetsPath)
shell.mkdir('-p', assetsPath)
shell.config.silent = true
shell.cp('-R', 'static/*', assetsPath)

//基础配置对象
const config = {
    target : 'web',                                      //打包运行平台
    entry  : path.join(__dirname,'../client/index.js'),  //指定打包入口文件
    output : {       
        path : path.join(__dirname,'../dist')
    },
    
    resolve: {
        alias: {   
          SYSTEM_IMAGE     : path.resolve(__dirname, '../client/assets/resources/system/'), //系统资源存放目录
          BUSSINESS_IMAGE  : path.resolve(__dirname, '../client/assets/resources/bussiness/'),  //业务资源存放目录
          PUBLIC_CSS       : path.resolve(__dirname, '../client/assets/style/public.styl'), //公共CSS样式表
          //"markDown"  : path.resolve(__dirname, '../client/assets/lib/markdown/js/showdown.min.js'),
          //"highlight" : path.resolve(__dirname, '../client/assets/lib/markdown/js/highlight.min.js')
        }
    },
    module : {
        rules : [
            {
                test    : /\.vue$/,
                loader  : 'vue-loader'
            },
            {
                test   : /\.jsx$/,
                loader : 'babel-loader' 
            },
            {
                test   : /\.js$/,
                loader : 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }, 
            {
                test   : /\.(gif|jpg|jpeg|png|svg|woff|eot|ttf|otf|woff2)$/,
                use    : [
                    {
                        loader  : 'url-loader',
                        options : {
                            limit : 1024,
                            name  : 'resources/[path][name].[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    }
}

//导出基础配置
module.exports = config