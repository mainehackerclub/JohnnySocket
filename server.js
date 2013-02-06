var http = require('http');
var dnode = require('dnode');
var static = require('node-static');
var file = new(static.Server)('.');

var serv = http.createServer(function (req, res) {
    console.log('A Connection!');
    req.addListener('end', function () {
    // Serve files!
        file.serve(req, res);
    });
}).listen(1337, '127.0.0.1');

var io = require('socket.io').listen(serv);
io.sockets.on('connection', function(socket) {
  socket.on('ledOn',function(data) {
    console.log('ledOn',data.pin);
    console.log(data);
  });
  socket.on('ledOff',function(data) {
    console.log('ledOff',data.pin);
    console.log(data);
  });
});

var net = require('net');
var server = net.createServer(function(c) { //'connection' listener
  console.log('server connected');
  c.on('end', function() {
    console.log('server disconnected');
  });
  c.write('led3');
  c.pipe(c);
});
server.listen(8124, function() { //'listening' listener
  console.log('server bound');
});


console.log('Server running at http://127.0.0.1:1337/');
