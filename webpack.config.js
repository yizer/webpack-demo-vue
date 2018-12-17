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
