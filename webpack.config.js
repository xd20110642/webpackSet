const path=require('path');
const webpack=require('webpack')
let Htmlwebpack=require("html-webpack-plugin");
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports={
    entry:["./nedd/lottery.js"],
    output:{
        filename: '[hash:4].js',
        path:path.resolve('dist')
    },
    module:{
        rules:[
            {
                test:/\.(jpg|png|gif)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:10240,//// 小于10k的图片自动转成base64格式，并且不会存在实体图片
                            output:'images'//图片打包后存放的位置
                        }
                    }
                ]
            },
            {
                test:/\.(htm|html)$/, //替换图片
                use:'html-withimg-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader",
                    publicPath:'../'
                  })
            },
        ]
    },
    devServer:{
            contentBase:'./dist',
            host:'localhost',//默认为
            port:3000,//端口
            open:true,//自动打开浏览器
            hot:true//开启热更新
    }
    ,
    plugins:[
         // 通过new来使用
         new Htmlwebpack({
            // 用哪个html作为模板
           // 在src目录下创建一个index.html页面当做模板来用
           template:"./test.html",
           hash:true// 会在打包好的bundle.js后面加上hash串
       }),
    new ExtractTextWebpackPlugin({ //必须这样写才能运行
        filename: 'css/style.css',
        allChunks: true
    }),
    // 打包前先清空
    new CleanWebpackPlugin('dist') ,
    // 热替换。热替换不是刷新
    new webpack.HotModuleReplacementPlugin()
    ]

}