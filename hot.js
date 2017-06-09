/**
 * Created by chenxq on 2017/6/9.
 */
var project = require("./package.json");
var os = require("os");
var fs = require("fs");
//var child_process = require("child_process");

var args = process.argv.splice(2);//eslint-disable-line

var ip = "127.0.0.1";

var network = os.networkInterfaces();
for(var key in network) {
    if(network.hasOwnProperty(key)) {
        var linker = network[key];
        for(var i=0;i<linker.length;i++) {
            if(linker[i].family.toLowerCase() == "ipv4" && linker[i].address != ip) {
                ip = linker[i].address;
                break;
            }
        }
    }
    if(ip != "127.0.0.1") {
        break;
    }
}

var port = project.name.split("").reduce(function(prev, next) {
        if(typeof prev == "string") {
            return prev.charCodeAt(0) + next.charCodeAt(0);
        }
        return prev + next.charCodeAt(0);
    }) + 10000;

var local = "http://" + ip + ":" + port;

// write config to webpack.config.hot.js
var booter = fs.readFileSync("./src/js/booter.js", "utf-8");
if(!fs.existsSync("./dist")) {
    fs.mkdirSync("./dist");
}
fs.writeFileSync("./dist/booter.js", booter.replace(/http\:\/\/127\.0\.0\.1:8007/ig, local));
var isFast = false;
if(args.indexOf("--fast") > -1){
    isFast = true;
}

var configFilePath = isFast?"./webpack.config.fast.js":"./webpack.config.js";

var config = fs.readFileSync(configFilePath, "utf-8");

if(args.indexOf("--old") > -1) {
    config = config.replace("plugins:[", "plugins:[new OldWatchingPlugin(),");
}
var finalConfigFilePath = isFast ? "./webpack.config.fast.hot.js" : "./webpack.config.hot.js";
fs.writeFileSync(finalConfigFilePath, config.replace(/"http:\/\/dev.static0.berbon.com\/\"\+project\.name\+"\/"/, "\""+local+"/\""));

//command = [
//    'webpack-dev-server',
//    '--devtool eval',
//    '--progress',
//    '--colors',
//    '--hot',
//    '--port ' + port,
//    '--host ' + ip,
//    '--config webpack.config.hot.js'
//].join(' ');
//
//console.log('exec:', command);
//var webpack = child_process.exec(command, function(error) {
//    if(!error) {
//        console.log(error);
//    }
//});
//webpack.stdout.on('data', function(data) {
//    console.log(data);
//});
//console.log('listened on:' + ip + ' ' + port);
