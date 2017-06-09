/**
 * Created by chenxq on 2017/6/9.
 */
(function() {
    window.project_name = "react-demo";
    var version = new Date().getFullYear();
    var pages = null;
    var unique = 0;
    function get_unique(domain) {
        if(domain) {
            return domain.replace(/static(\d)\.berbon/, "static"+(unique++) % 4+".berbon");
        }
        return (unique++) % 4;
    }


    window.static_domain = 'http://static0.berbon.com';

   // $.ajaxSetup({ cache: false });//注意，必须将缓存设置为false，否则IE下只会对第一次请求 向服务器请求

    var is_hmr = false;
    var booter = document.getElementById('booter');
    if(booter) {
        var src = booter.getAttribute('src') || "";
        var array = src.split('/');
        if(array && array.length >= 3) {
            window.static_domain = array[0] + '//' + array[2];
        }
    }
    window.get_static_domain = (function() {
        var reg = new RegExp("__env__\=(.*"+project_name+")?");
        var result = (document.cookie || "").match(reg);
        if(location.hash == '#test' || (result && result.length > 1 && result[1])) {
            is_hmr = true;
            document.write('<script src="http://127.0.0.1:8007/webpack-dev-server.js"></script>');
            return function() {
                return "http://127.0.0.1:8007";
            };
        }else {
            return function() {
                if(static_domain.indexOf('$') == 0) {
                    return get_unique('http://static0.berbon.com');
                }
                return get_unique(static_domain);
            };
        }
    })();

    window.load_page = function(path, sync) {
        var script = document.createElement('script');
        if(pages) {
            script.src = get_static_domain() + '/' + project_name + '/dist/' + pages[path];
        }else {
            script.src = is_hmr ? get_static_domain() + '/dist/' + path + '.js' : get_static_domain() + '/' + project_name + '/dist/' + path + '.js';
        }
        if(sync) {
            document.write('<script src="'+script.src+'"></script>');
            //document.body.appendChild(script);
        }else {
            script.async = true;
            $(function(){
                document.body.appendChild(script);
            })


        }
    };
})();
