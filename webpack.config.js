var path = require("path");
var webpack = require("webpack");
module.exports={
    entry:"./src/main.js",// 项目的入口文件
    output:{
        path:path.resolve(__dirname,'./dist'),// 项目的打包文件路径
        publicPath:'/dist/', // 通过devServer访问路径
        filename:'build.js' // 打包后的文件名
    },
    // webpack-dev-server 配置项 也可以在命令行配置
    devServer:{
        historyApiFallback:true,// 当使用h5 history api时,index.html 可能会替代404 response, 默认禁用,这里启动
        overlay:true,// 当出现编译错误时, 浏览器显示全屏报错
    },
    // 配置模块的解析方式
    resolve:{
        //别名, import 或者require 更方便
        alias:{
            // 末尾加$解释:例如别名: { xyz$: "/abs/path/to/file.js" } improt "xyz"=> /abs/path/to/file.js ; improt "xyz/file" => /abc/node_modules/xyz/file.js
            'vue$':'vue/dist/vue.esm.js' // 末尾加$,
        }
    },
    module:{
        // css laoder 解析器
        rules:[
            {
                test:"/\.css$/",
                use:[
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.sass$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader?indentedSyntax'
                ],
            }
        ]
    }
}