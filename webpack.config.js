var path = require("path");
var webpack = require("webpack");
module.exports={
    entry:"./src/main.js",// 项目的入口文件
    output:{
        path:path.resolve(__dirname,'./dist'),// 项目的打包文件路径
        publicPath:'/dist/', // 通过devServer访问路径
        filename:'build.js' // 打包后的文件名
    },
    devServer:{
        historyApiFallback:true,// 当使用h5 history api时,index.html 可能会替代404 response, 默认禁用,这里启动
        overlay:true,// 当出现编译错误时, 浏览器显示全屏报错
    }
}