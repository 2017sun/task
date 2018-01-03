var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

function routePath(req, res) {
    var pathObj = url.parse(req.url, true);//解析url,将一个URL字符串转换成对象并返回。
    console.log(pathObj);

    switch (pathObj.pathname) {
        case '/loadMore':
            var curIdx = pathObj.query.curIndex  //第一次为'3',注意这里此时的pathObj.query = {curIndex: '3', len: '6'}
            var len = pathObj.query.len// 6
            var status = 0
            var content = []
            var ret
            for (var i = 0; i < len; i++) {
                content.push('内容' + (parseInt(curIdx) + i))  //parseInt() 函数可解析一个字符串，并返回一个整数
            }
            ret = {
                status: 1,
                data: content
            }

            res.setHeader('Content-Type', 'text/plain; charset=utf-8')
            setTimeout(function() { res.end(JSON.stringify(ret)) }, 2000)  //返回json格式字符串

            break;
        default:
            console.log(pathObj.pathname)
            staticRoot(path.resolve(__dirname, 'static'), req, res);
    }
}


function staticRoot(staticPath, req, res) {
    var pathObj = url.parse(req.url, true)
    if (pathObj.pathname === '/') {   //如果直接输入的是local:8080
        pathObj.pathname += 'index.html' //默认读取index.html文件
    }
    var filePath = path.join(staticPath, pathObj.pathname)
    fs.readFile(filePath, 'binary', function(err, content) {
        if (err) {
            res.writeHead('404', 'Not Found')
            return res.end()
        }

        res.writeHead(200, 'Ok')
        res.write(content, 'binary')
        res.end()
    })

}

var server = http.createServer(function(req, res) {
    routePath(req, res)
})

server.listen(8080)
console.log('visit http://localhost:8080')