var url = require('url');
var fs = require('fs');
var path = require('path');

function Server() {
};

Server.prototype.start = function (port, ip, done) {
    this.http = require('http').createServer(function(request, response) {
        if ('/' == request.url) { request.url = '/index.html'; }

        var parsed = url.parse(request.url, true);
        var filePath = path.join(__dirname, '../client/' + parsed.pathname);        
        var content = ''; 
        try { content = fs.readFileSync(filePath).toString(); }
        catch (Error) { response.statusCode = 404; }
        if (/\.js$/.test(parsed.pathname)) {
            response.setHeader('Content-Type', 'application/javascript');
        }
        if (/\.css$/.test(parsed.pathname)) {
            response.setHeader('Content-Type', 'text/css');
        }
        if (/\.html$/.test(parsed.pathname)) {
            response.setHeader('Content-Type', 'text/html');
        }
        response.write(content);
        response.end();
    });
    this.http.listen(port, ip, done);
};

Server.prototype.stop = function (done) {
    this.http.close(done);
};


module.exports = Server;
