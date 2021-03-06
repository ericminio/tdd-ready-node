var expect = require('chai').expect;
var Server = require('./server');
var request = require('request');

describe('Server', function() {

    var server;
    var port = 5000;
    var ip = 'localhost';
    var home = 'http://' + ip + ':' + port;

    beforeEach(function(done) {
        server = new Server();
        server.start(port, ip, done);
    });

    afterEach(function(done) {
        server.stop(done);
    });

    it('serves index.html', function(done) {
        request(home + '/index.html', function(err, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('resists unknown files', function(done) {
        request(home + '/unknown.html', function(err, response, body) {
            expect(response.statusCode).to.equal(404);
            done();
        });
    });
});
