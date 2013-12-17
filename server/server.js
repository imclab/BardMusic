
var http = require('http');
var handlers = require('./request-handlers.js');

var port = process.env.PORT || 8000;
var ip = '127.0.0.1';

var server = http.createServer(handlers.mainHandler);
server.listen(port);
//console.log('Server listening at ' + ip + ':' + port);