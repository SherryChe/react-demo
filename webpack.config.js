/*eslint-disable*/
/**
 * Created by chenxq on 2017/6/9.
 */
var path = require('path');
var fs = require('fs');
var node_modules = path.resolve(__dirname, 'node_modules');
var webpack = require("webpack");
var CommonsChunkPlugin = require(path.resolve(node_modules, 'webpack/lib/optimize/CommonsChunkPlugin'));
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');  //
var project = require('./package.json');
var autoprefixer = require('autoprefixer');

/*
var commonProject = path.resolve(__dirname, '../common/');
if(!fs.existsSync(commonProject)) {
    commonProject = path.resolve(__dirname, '../../common_static/workspace/');
}
*/

var entries = require(path.resolve(__dirname, 'entry.config.js'));
var entries_key = Object.keys(entries);

var config = {
    entry:require(path.resolve(__dirname, 'entry.config.js')),
    output:{
        publicPath:"http://dev.static0.berbon.com/"+project.name+"/",
        path:path.resolve(__dirname,"./"),
        filename:'dist/js/[name].js',
        chunkFilename:'dist/js/[hash:8].chunk.js'
    },
    externals: {
        "jquery": "jQuery",
        "react": "React",
        "react-dom": "ReactDOM",
        "zepto": "Zepto"
    },
    module:{
        rules:[
            {
                test: /\.jsx$/, // 只针对jsx文件
                enforce: "pre",
                use: [{
                    loader:"eslint-loader", // 指定启用eslint-loader
                }],
                include: path.resolve(__dirname, './src/js') // 指定审查范围仅为自己团队写的业务代码
            },
            {
                test:/\.jsx?$/,
                exclude:[node_modules],
                use:[
                    "babel-loader"
                ]
            },
            {
                test:/\.(scss|sass)?$/,
                exclude:[node_modules],
                use:[
                    {
                        loader:"style-loader?singleton",
                    },
                    {
                        loader:"css-loader",
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    autoprefixer({ browsers: ['> 0.1%'] })
                                ];
                            }
                        }
                    },
                    {
                        loader:"sass-loader",
                    },
                ],
                //loader:'style?singleton!css!postcss!sass'
            },
            {
                test:/\.css?$/,
                //!!!!!  注意： 由于有地方直接引用了node_modules下的需要编译的css，所以不能排除掉这个目录，否则编译出错
                //exclude:[node_modules],
                use:[
                    "style-loader?singleton",
                    "css-loader",
                ],
            },
            {
                test:/\.(jpg|png|gif|jpeg)?$/,
                exclude:[node_modules],
                use:[
                    "url-loader?limit=20480&name=dist/images/[name].[hash:8].[ext]"
                ],
            },
            {
                test:/\.(eot|woff(2)?|ttf|svg)?(@.+)*$/,
                exclude:[node_modules],
                use: [
                    {
                        loader:"url-loader?limit=20480&name=dist/other/[name].[hash:8].[ext]",
                    }
                ],
            }
        ],
    },
    resolve:{
        /*alias:{
            //"react-demo-component-lib":path.resolve(__dirname, 'bundle.js'),
            "berbon":commonProject
        },*/
        modules:[
            node_modules
        ]
    },
    resolveLoader:{
        modules:[
            node_modules
        ]
    },
    plugins:[
        new CommonsChunkPlugin({
            name:"common",
            filename:"dist/common.js",
            minChunks:Math.ceil(entries_key.length / 2),
            chunks:entries_key
        }),
        new CaseSensitivePathsPlugin(),
        //src/js/clerkInvite/md5引用的node模块会在linux环境/某些win环境下报错
        new webpack.IgnorePlugin(/^crypto$/),
        new webpack.IgnorePlugin(/^buffer$/)
    ],
    devServer:{
        stats:"errors-only",
        disableHostCheck:true
    },
};
module.exports = config;
