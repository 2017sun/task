var http = require("http")
var server = http.createServer(function(req,res){
    res.setHeader('Content-Type','text/html; "charset","utf-8"')
    res.end()
})

server.listen(8080)
