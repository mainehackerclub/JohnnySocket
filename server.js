var http = require('http');
var static = require('node-static');
var file = new(static.Server)('.');
var net = require('net');
var tcpClients = [];

// Create HTTP server
var serv = http.createServer(function (req, res) {
    console.log('HTTP Connection');
    req.addListener('end', function () {
    // Serve files!
        file.serve(req, res);
    });
}).listen(1337, '127.0.0.1');

// Initialize Socket.io
var io = require('socket.io').listen(serv);
io.set('log level',1);

//Pass socket.io events to TCP streams.
io.sockets.on('connection', function(socket) {
  socket.on('ledOn',function(data) {
    console.log(data);
    tcpClients[0].write(JSON.stringify(data));
  });
  socket.on('ledOff',function(data) {
    tcpClients[0].write(JSON.stringify(data));
    console.log(data);
  });
});

// Pass TCP events to socket.io
function heartbeat(data) {
  io.sockets.emit('board',data);
}

// Handle TCP client connections.
var server = net.createServer(function(c) { //'connection' listener

  console.log('TCP client connected');
  c.on('end', function() {
    console.log('TCP client disconnected');
    tcpClients.pop();
  });

  c.on('data', function(data) {
    var data = JSON.parse(data.toString());
    console.log(data);
    heartbeat(data);
  });

  //c.pipe(c);
  tcpClients.push(c);
});
server.listen(8124, function() {
  console.log('TCP server bound');
});

console.log('Server running at http://127.0.0.1:1337/');
