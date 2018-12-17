# webpack-demo-vue
从0 开始搭建基础版本vue坏境
参考文档:1 webpack 4中文文档 https://www.webpackjs.com/concepts/
 2 vue项目从0搭建(webpack手动搭建)
 https://segmentfault.com/a/1190000012789253
 
一. webpack 四大核心
1)入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。
2)output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist。基本上，整个应用程序结构，都会被编译到你指定的输出路径的文件夹中。你可以通过在配置中指定一个 output 字段，来配置这些处理过程：
3) loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。
本质上，webpack loader 将所有类型的文件，转换为应用程序的依赖图（和最终的 bundle）可以直接引用的模块。
4) loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。
二. git init, 新增一个.gitignore文件(建议使用git保存进度)
配置:
.DS_Store
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
三 . 项目搭建
1 新建文件夹 wepack-vue-demo
2 npm init
3 安装wepack
npm i webpack -g
npm i webpack-cli -g
cnpm i -D webpack-cli
3 安装 vue webpack webpack-dev-server
解释 webpack-dev-server 
提供一个简单的web服务器和实时重新加载的能力
npm i vue --save
npm i webpack webpack-dev-server --save-dev
4 在根目录下新建index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
5 根目录新建webpakc.config.js 
var path = require('path');
   var webpack = require('webpack');
module.exports = {};
6 新建src文件夹, src文件下新建main.js
 	当前目录结构如下

7 js 模块化
在ES6出现之前，js是没有统一的模块体系。
服务器端使用CommonJS规范,而浏览器端又有AMD和CMD两种规范
webpack的思想就是一切皆模块，官方推荐使用commonJS规范，这使得我们浏览器端也可以使用commonJS的模块化写法
module.exports = {};
src目录下新建一个util.js
module.exports = function say() {
    console.log('hello world');
}
main.js
var say = require('./util');
    say();
8. 修改webpack.config.js
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
9. 修改package.josn
"scripts": {
    "dev": "webpack-dev-server --open --hot",
    "build": "webpack --progress --hide-modules"
  },
 --open 默认打开浏览器, --hot 启动热更新
--progress 输出打包过程   --compress 开启Gzip压缩服务
10 修改index.html，引入打包后的文件
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <script src="/dist/build.js"></script>
</body>

</html>
11 npm run dev
1. 如果报错,检查package.json

2 如果报错某个模块丢失, 删除node_modules 即可
3 确认上述内容大小写拼写正确等,理论上,你们已经开心到这里了

控制台出现hello world
此时,你已经拥有了试试更新的代码, 浏览器会自动刷新
npm run build

webpack默认不支持转码es6，但是import export这两个语法却单独支持。所以我们可以改写前面的模块化写法
   util.js
export default function say() {
    console.log('hello world ');
}
 main.js
import say from './util';
say();

12 引入Vue
我们开始引入vue (暂不考虑单文件.vue)
main.js
import Vue from 'vue';
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
});
index.html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <div id="app">
        {{message}}
    </div>
    <script src="/dist/build.js"></script>
    
</body>

</html>
还要修改webpack.config.js文件
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
    }
}
引入 vue 路径别名
       此时,需要重新npm run dev, 页面完美
13 引入scss 和 css
    webpack默认只支持js的模块化，如果需要把其他文件也当成模块引入，就需要相对应的loader解析器
npm i node-sass css-loader vue-style-loader sass-loader --save-dev
   然后配置webpack.config.js
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
            }
        ]
    }
遇到后缀名为css的文件, 分别使用css-loader, vue-style-loader 去解析,
解析器的执行顺序是从下往上(先css-loader再vue-style-loader)
注意：因为我们这里用vue开发，所以使用vue-style-loader，其他情况使用style-loader
css-loader使得我们可以用模块化的写法引入css,vue-style-loader会将引入的css插入到html页面里的style标签里
在 webpack 的配置中 loader 有两个目标：
test 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。
use 属性，表示进行转换时，应该使用哪个 loader。
同理,引入scss ,sass 加载器
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
 然后在src 下新建style 目录, common.scss;
在main.js 中引入
import './style/common.scss';
   备注:import "./style/common/" , 把后缀先加着
 然后就成功了

     14   使用babel转码
旨在解决落后浏览器不支持es5 语法的问题, 
cnpm i babel-core babel-loader babel-preset-env babel-preset-stage-3 --save-dev
在根目录 新建.bablerc文件
{
  "presets": [
    ["env", { "modules": false }],
    "stage-3"
  ]
}
      webpack.config.js 添加一个loader
   {
                test: /\.js$/,
                loader: 'babel-loader',
                //exclude表示忽略node_modules文件夹下的文件，不用转码
                exclude: /node_modules/
    }
现在, 尝试使用es6 的async, await;
utils.js
export default function getData() {
    return new Promise((resolve, reject) => {
        resolve('ok');
    })
}
main.js
import getData from './util';
import Vue from 'vue';

import './style/common.scss';

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  },
  methods: {
    async fetchData() {
      const data = await getData();
      this.message = data;
    }
  },
  created() {
    this.fetchData();
  }
});
 然后boom , 报错了

安装 babel-polyfill吧
cnpm i babel-polyfill --save-dev
根据实测报错, 需要安装 cnpm i bable-core --save-dev
修改webpack.config.js 的入口
entry: ['babel-polyfill', './src/main.js'],
然后就开心的成功了

这是当前的package.json配置, 如果确认这个没问题, 就把依赖包删除了重装试试

15 引入图片资源
把图片也当成模块引入
cnpm i file-loader --save-dev
webpack.config.js添加一个loader
{
    test: /\.(png|jpg|gif|svg)$/,
    loader: 'file-loader',
    options: {
        name: '[name].[ext]?[hash]'
    }
}
main.js
Vue.component('my-component', {
  template: '<img :src="url" />',
  data() {
    return {
      url: require('./img/logo.png')
    }
  }
})
修改index.html
  <div id="app">
        {{message}}
        <my-component/>
  </div>


16 单文件组件
 项目中通用的单文件组件
cnpm i vue-loader vue-template-compiler --save-dev
添加loader
{
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
        loaders: {
            'scss': [
                'vue-style-loader',
                'css-loader',
                'sass-loader'
            ],
            'sass': [
                'vue-style-loader',
                'css-loader',
                'sass-loader?indentedSyntax'
            ]
        }
    }
}
src目录下新建App.vue
<template>
    <div id="app">
        <h1>{{msg}}</h1>
        <img :src="imgUrl" alt="">
        <input type="text" v-model="msg">
    </div>
</template>
<script>

import getData from "./util"
export default {
    name:"app",
    data(){
        return {
            msg:"Welcome to my vue",
            imgUrl:require("./assets/img/258203-1510030RP894.jpg")
        }
    },
    created(){
        this.fetchData()
    },
    methods:{
        async fetchData(){
            const data = await getData();
            this.msg = data;
        }
    }
}
</script>
<style lang="scss" scoped>
#app{
    color:blue;
}
</style>

main.js
import Vue from "vue";
import "./style/common.scss";
import App from "./App.vue"

var app = new Vue({
    el:"#app",
    template:'<App/>',
    components:{App}
})
index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>webpack构建</title>
</head>
<body>
    <div id="app"></div>
    
    <script src="/dist/build.js"></script>
</body>
</html>
理论上应该成功了, 但是boom. 报错了

报错说你得有VueLoaderPlugin 
解决参考 https://github.com/vuejs/vue-loader/issues/1238;
注意图片用网页案例引入, 会报错, 后续再跟进解决,先require 解决了再说
可是呢?页面启动不了了, 虽然不报错,但是有warning 得解决

提示 mode 不明
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --mode development  --hot",
    "build": "webpack --progress --hide-modules"
  },
dev 的时候指明就好了
然后页面就ok 了

17 Scoure-map
 开发阶段, 调试是非常重要的一项
module.exports = {
    entry: ['babel-polyfill', './src/main.js'],
    // 省略其他...

    devtool: '#eval-source-map' // 选个自己喜欢的吧
};

确实有效果, 大佬为什么加#eval-source-map 我暂不清楚, 反正教主溪哥没加"#"


18 打包一下
   打包完有1.5M.我的天
   so 对文件进行压缩, 缓存, 分离等优化吧
cnpm i cross-env --save-dev
这个cross-env 跨平台设置环境变量
  修改package.json
"scripts": {
    "dev": "cross-env NODE_ENV=development webpack-dev-server --open --hot",
    "build": "cross-env NODE_ENV=production webpack --progress --hide-modules"
}
设置环境变量, 然后判断环境变量为production时, 压缩js代码
https://webpack.js.org/concepts/mode/
webpack.config.js
 module.exports = {
    // 省略...
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map';
    module.exports.plugins = (module.exports.plugins || []).concat([
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new webpack.optimize.UglifyJsPlugin(),
    ])
  }
  
然后npm run build , boom , 又报错啦
webpack.optimize.UglifyJsPlugin has been removed, please use config.optimization.minimize instead.
毕竟我们用的是先进的webpack4.0
按照提示试一下吧
// 判断NODE_ENV为production时，压缩js代码
if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map';
    module.exports.plugins = (module.exports.plugins || []).concat([
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new config.optimization.minimize(),
    ])
  }
npm run build , 依然报错, boom, 继续想办法吧
https://webpack.js.org/configuration/optimization/#optimization-minimize
Since version 4 webpack runs optimizations for you depending on the chosen mode, still all optimizations are available for manual configuration and overrides.
webpack 说只要mode 指定了, 就可以自动实现minimize,那就尝试下吧
// 判断NODE_ENV为production时，压缩js代码
// if (process.env.NODE_ENV === 'production') {
//     module.exports.devtool = '#source-map';
//     module.exports.plugins = (module.exports.plugins || []).concat([
//       new webpack.DefinePlugin({
//         'process.env': {
//           NODE_ENV: '"production"'
//         }
//       }),
//       new config.optimization.minimize(),
//     ])
//   }
npm run build, 并没有实现, 查看webpack版本
cnpm i webpack-cli -g
webpack -v  =>4.27.1
那就手动配置一下吧
//判断NODE_ENV为production时，压缩js代码
if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map';
    module.exports.optimization ={
        minimize: true
    } ;
    module.exports.plugins = (module.exports.plugins || []).concat([
        // 编译初期设置生产环境
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
    ])
  }
然后ok, js代码只有188k


至此, wepack 已配置出一个超级简单的vue环境, 接下来, 该想想办法开启hard模式了

再次找寻可以升级本项目的方法, 博采众长
https://www.cnblogs.com/hughes5135/p/9327004.html

1 安装两个常用依赖
1 cnpm i -D clean-webpack-plugin  # 在打包时删除指定为文件或目录
2 cnpm i -D html-webpack-plugin   # 生成html入口文件
在webpack.config.js中配置
 var path = require("path");
var webpack = require("webpack");
const { VueLoaderPlugin } = require('vue-loader')
var htmlWebpackPlugin = require('html-webpack-plugin')
var cleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// 启动脚本设置的变量都存在process.env对象中
const isDev = process.env.NODE_ENV === 'development'

module.exports={
    target:'web',// 默认就是web,可以不写
    entry:['babel-polyfill', './src/main.js'],// 项目的入口文件
    output:{
        path:path.resolve(__dirname,'./dist'),// 项目的打包文件路径
        //publicPath:'/dist/', // 并不会对生成文件的路径造成影响，主要是对你的页面里面引入的资源的路径做对应的补全，常见的就是css文件里面引入的图片,暂时没用
         filename:'[name]-[hash].js' // 打包后的文件名
        //filename:'build.js'
    },
    // webpack-dev-server 配置项 也可以在命令行配置
    devServer:{
        historyApiFallback:true,// 当使用h5 history api时,index.html 可能会替代404 response, 默认禁用,这里启动
        overlay:true,// 当出现编译错误时, 浏览器显示全屏报错,
        port:80,
        host:"127.0.0.1",
    },
    // 配置模块的解析方式
    resolve:{
        //别名, import 或者require 更方便
        alias:{
            // 末尾加$解释:例如别名: { xyz$: "/abs/path/to/file.js" } improt "xyz"=> /abs/path/to/file.js ; improt "xyz/file" => /abc/node_modules/xyz/file.js
            'vue$':'vue/dist/vue.esm.js' // 末尾加$,
        }
    },
    target: 'web',  // 设置运行环境为web浏览器端
    // 关闭引入文件过大警告
     performance: {
           hints: false, // 直接关闭警告
           maxAssetSize: 50000  // 增加限制的大小
     },
    devtool: '#eval-source-map', // source-map 
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
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                //exclude表示忽略node_modules文件夹下的文件，不用转码
                exclude: /node_modules/
            },
            // 引入图片资源
            {
                test: /\.(jpg|jpeg|gif|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 512000,
                            name: 'images/[name]-[hash:8].[ext]'
                        }
                    },]
            },
            // vue 加载器
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader'
                        ],
                        'sass': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader?indentedSyntax'
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        // 打包时删除dist文件
        new cleanWebpackPlugin(['dist']),
  
        // 编译初期设置生产环境
        new webpack.DefinePlugin({
            'process.env': {
            NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        //配合热更新
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({
            template:'index.html',　　//为新生成的index.html指定模版
            filename:'index.html',
             minify:{ //压缩HTML文件
                 removeComments:true,    //移除HTML中的注释
                 collapseWhitespace:true    //删除空白符与换行符
             }
        }),
    ]
}

//判断NODE_ENV为production时，压缩js代码
if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map';
    module.exports.optimization ={
        minimize: true
    } ;
    
    module.exports.plugins = (module.exports.plugins || []).concat([

    ])
  }
居然报错,没有权限操作dist, 醉了,重启vscode
如果分不清path.resolve 和path.join() 
参考https://blog.csdn.net/qq_33745501/article/details/80270708
http://nodejs.cn/api/path.html#path_path_resolve_paths
题外话, 演示一下

main.js
var path = require("path");

let myPath = path.join(__dirname,'/c/f');
let myPath2 = path.join(__dirname,'./ff/dd');
let myPath3=path.join('/a', 'b', 'c/asdf', 'quux', '..');
 
console.log("--------- path.join ---------")
console.log(__dirname); // D:\explore\demoPath\a\b  当前文件夹的地址
console.log(myPath);   // D:\explore\demoPath\a\b\c\f 拼接
console.log(myPath2);   // D:\explore\demoPath\a\b\ff\dd  拼接
console.log(myPath3);  // \a\b\c\asdf  拼接,非字符串忽略

console.log("--------- path.resolve ---------")
//path 从右到左依次处理，直到构造出绝对路径。 例如，指定的路径片段是：/foo、/bar、baz，则调用 path.resolve('/foo', '/bar', 'baz') 会返回 /bar/baz。
//如果处理完全部 path 片段后还未产生绝对路径，则加上当前工作目录。
//生成的路径会进行规范化，并且删除末尾的斜杠，除非路径是根目录。
let myPath4= path.resolve(__dirname,'/img/so');
let myPath5 = path.resolve(__dirname,'./img/so');
let myPath6=path.resolve('/foo/bar', './baz');
let myPath7=path.resolve('/foo/bar', '/tmp/file/');
let myPath8 = path.resolve("abc","ccd",'../aaa/bbb/cc')
 
console.log(__dirname);    // D:\explore\demoPath\a\b  当前文件夹的地址       
console.log(myPath4);    // D:\img\so  直接走的根目录,生产了绝对路径       
console.log(myPath5);   // D:\explore\demoPath\a\b\img\so  加上了当前目录地址生成       
console.log(myPath6);  // D:\foo\bar\baz         
console.log(myPath7); // D:\tmp\file     /tem/file/ 直接生成了绝对路径, 停止解析    
console.log(myPath8); 
// 过程: D:..\..\aaa\bbb\cc => D:\explore\demoPath\a\b\abc\ccd\..\aaa\bbb\cc => D:\expolre\demoPath\a\b\abc\aaa\bbb\cc

node main.js 即可看到结果

继续走吧
2 配置ulr 加载器
cnpm i url-loader -D
配置一下
用ulr-loader 替换file-loader 的加载器吧
    // 引入图片资源
            {
                test: /\.(jpg|jpeg|gif|png|svg)$/,
                loader: 'url-loader',
                options: {
                    // 单位是b 500kb = 512000b
                    limit: 512000,
                    name: '[name]-[hash:8].[ext]'
                  }
            },
beautiful
前面留下的坑, 不用使用引入本地url地址的图片, 解决了
<template>
    <div id="app">
        <h1>{{msg}}</h1>
        <img src="./assets/img/258203-1510030RP894.jpg" alt="">
        <input type="text" v-model="msg">
    </div>
</template>
<script>
关闭引入文件大小警告

    // 关闭引入文件过大警告
     performance: {
           hints: false, // 直接关闭警告
           maxAssetSize: 50000  // 增加限制的大小
     },


3 配置dev-server
https://www.cnblogs.com/hughes5135/p/9328496.html
　1. webpack-dev-server自带一个node的服务器， 项目在服务端运行的同时可以实现热更新加载
　2. 安装兼容环境变量的包 cross-env
　　（1）原因： 构建项目时分生产环境和开发环境，此时webpack需要配置production和development模式，需要使用一个变量来作条件判断，而不同的平台上设置环境变量方式不同，在Mac平台是 NODE_ENV=production 而windows平台上是set NODE_ENV=production,，所以需要使用cross-env
　　（2）安装 已安装
修改webapck.config.js
// 启动脚本设置的变量都存在process.env对象中
const isDev = process.env.NODE_ENV === 'development'
    // webpack-dev-server 配置项 也可以在命令行配置
module.exports={
    entry:['babel-polyfill', './src/main.js'],// 项目的入口文件
    output:{
        path:path.resolve(__dirname,'./dist'),// 项目的打包文件路径
        publicPath:'./', // 通过devServer访问路径, build 生成的html,查找js的路径
        filename:'[name]-[hash].js' // 打包后的文件名
    },
    devServer:{
        historyApiFallback:true,// 当使用h5 history api时,index.html 可能会替代404 response, 默认禁用,这里启动
        overlay:true,// 当出现编译错误时, 浏览器显示全屏报错,
        port:80, // 端口号
        host:"127.0.0.1",// 域名等
    },
....其他代码   
 plugins: [
        new VueLoaderPlugin(),
        new cleanWebpackPlugin(['dist']),
        new htmlWebpackPlugin({
           template:'index.html',　　//为新生成的index.html指定模版,
 minify:{ //压缩HTML文件
                 removeComments:true,    //移除HTML中的注释
                 collapseWhitespace:true    //删除空白符与换行符
             }
        }),
        // 编译初期设置生产环境
        new webpack.DefinePlugin({
            'process.env': {
            NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
    ]
}

//判断NODE_ENV为production时，压缩js代码
if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map';
    module.exports.optimization ={
        minimize: true
    } ;
  }
  备注, 在这里卡了一会
build 出来的文件找不到js地址
修改 publicPath:'./' 就好了
困惑为什么图片不见了呢?因为ulr-loader 设置了小于500k的图片,自动转成base64, 大于500k,使用file-loader 正常引入
4 配置autoprefixer
cnpm i -D postcss-loader autoprefixer
const autoprefixer = require('autoprefixer')

// 在使用postcss后处理CSS时使用autoprefixer添加浏览器内核前缀-webkit-
module.exports = {
  plugins: [
    autoprefixer()
  ]
}
　　（3）添加postcss-loader到webpack.config.js的stylus的rules中
{
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.styl(us)?$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true
              //设置为true表示使用stylus-loader中的sourceMap而不再单独生成
            }
          },
          'stylus-loader',
        ]
      },
我就不配置了,以后再说
 
4 css进行分离打包
https://www.cnblogs.com/hughes5135/p/9331084.html
当然，在最新的webpack版本中，也可以使用 mini-css-extract-plugin 功能和 extract-text-webpack-plugin相似
在之前的开发环境下，我们都尽可能将图片和CSS都添加到bundle.js中，但是在完成开发后打包项目，我们需要将CSS文件单独分离出来。
1. 安装分离插件 ExtractTextWebpackPlugin, 使用webpack4.x的必须加 @next， 它会下载到extract-text-webpack-plugin@4.0.0-beta.0 , 否则打包时会有如图报错：
     npm install --save-dev extract-text-webpack-plugin@next
国际惯例 配置以下loader吧
var path = require("path");
var webpack = require("webpack");
const { VueLoaderPlugin } = require("vue-loader");
var htmlWebpackPlugin = require("html-webpack-plugin");
var cleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
let extractCSS = new ExtractTextPlugin('stylesheets/[name].css');
// let extractLESS = new ExtractTextPlugin('stylesheets/[name].less');
// 启动脚本设置的变量都存在process.env对象中
const isDev = process.env.NODE_ENV === "development";

module.exports = {
  target: "web", // 默认就是web,可以不写
  entry: ["babel-polyfill", "./src/main.js"], // 项目的入口文件
  output: {
    path: path.resolve(__dirname, "./dist"), // 项目的打包文件路径
    //publicPath:'/dist/', // 并不会对生成文件的路径造成影响，主要是对你的页面里面引入的资源的路径做对应的补全，常见的就是css文件里面引入的图片,暂时没用
    filename: "[name]-[hash].js" // 打包后的文件名
    //filename:'build.js'
  },
  // webpack-dev-server 配置项 也可以在命令行配置
  devServer: {
    historyApiFallback: true, // 当使用h5 history api时,index.html 可能会替代404 response, 默认禁用,这里启动
    overlay: true, // 当出现编译错误时, 浏览器显示全屏报错,
    port: 80,
    host: "127.0.0.1"
  },
  // 配置模块的解析方式
  resolve: {
    //别名, import 或者require 更方便
    alias: {
      // 末尾加$解释:例如别名: { xyz$: "/abs/path/to/file.js" } improt "xyz"=> /abs/path/to/file.js ; improt "xyz/file" => /abc/node_modules/xyz/file.js
      vue$: "vue/dist/vue.esm.js" // 末尾加$,
    }
  },
  target: "web", // 设置运行环境为web浏览器端
  // 关闭引入文件过大警告
  performance: {
    hints: false, // 直接关闭警告
    maxAssetSize: 50000 // 增加限制的大小
  },
  devtool: "#eval-source-map", // source-map
  module: {
    // css laoder 解析器
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        //exclude表示忽略node_modules文件夹下的文件，不用转码
        exclude: /node_modules/
      },
      // 引入图片资源
      {
        test: /\.(jpg|jpeg|gif|png|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 512000,
              name: "images/[name]-[hash:8].[ext]"
            }
          }
        ]
      },
      // vue 加载器
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            scss: ["vue-style-loader", "css-loader", "sass-loader"],
            sass: [
              "vue-style-loader",
              "css-loader",
              "sass-loader?indentedSyntax"
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    // 打包时删除dist文件
    new cleanWebpackPlugin(["dist"]),

    // 编译初期设置生产环境
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    //配合热更新
    new webpack.HotModuleReplacementPlugin(),
    new htmlWebpackPlugin({
      template: "index.html", //为新生成的index.html指定模版
      filename: "index.html",
      minify: {
        //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: true //删除空白符与换行符
      }
    })
  ]
};

//判断NODE_ENV为production时，压缩js代码
if (process.env.NODE_ENV === "production") {
  //module.exports.output.filename = "scripts/bundle.[chunkhash:8].js"; //打包时使用chunkhash ,之前开发时使用hash或者使用文件名本身亦可
  module.exports.module.rules.push(
    {
      test: "/.css$/",
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ["vue-style-loader", "css-loader"]
      })
    },
    {
      test: /\.scss$/,
      use: extractCSS.extract(['css-loader',"sass-loader"])
    },
    {
      test: /\.sass$/,
      // use: ExtractTextPlugin.extract({
      //   fallback: "style-loader",
      //   use: ["vue-style-loader", "css-loader", "sass-loader?indentedSyntax"]
      // })
      use: extractCSS.extract(['css-loader',"sass-loader?indentedSyntax"])
    }
  );
  module.exports.devtool = "#source-map";
  module.exports.optimization = {
    minimize: true
  };

  module.exports.plugins = (module.exports.plugins || []).concat([
    extractCSS
  ]);
} else {
  module.exports.module.rules.push(
    {
      test: "/.css$/",
      use: ["vue-style-loader", "css-loader"]
    },
    {
      test: /\.scss$/,
      use: ["vue-style-loader", "css-loader", "sass-loader"]
    },
    {
      test: /\.sass$/,
      use: ["vue-style-loader", "css-loader", "sass-loader?indentedSyntax"]
    }
  );
}

　（1）在开发环境中不用分离CSS代码, 打包时才使用 ExtractTextPlugin插件分离

　　（2）编译时使用ExtractTextPlugin的extract方法， 最后用stylesheets/[name].css文件输出

　　（3）打包时使用chunkhash输出文件, 与hash的区别在于，hash是整个应用的文件一样，而chunkhash是每个文件都不一样 

　　（4）运行打包结果如下 : 多出了stylesheets/[name].css文件

5 


到此结束
