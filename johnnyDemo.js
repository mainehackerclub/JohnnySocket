var http = require('http');
var five = require("johnny-five"),
    // or "./lib/johnny-five" when running from the source
    board, led8, led9, led13;
    board  = new five.Board();
var static = require('node-static');
var file = new(static.Server)('.');

board.on("ready", function() {
    // Create an Led on pin 13 and strobe it on/off
    // Optionally set the speed; defaults to 100ms
});


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
    if (data.pin == 8) {
      console.log('pin 8');
      led8 = new five.Led(data.pin);
      led8.strobe(data.strobe);
    } else if (data.pin == 13) {
      console.log('pin 13');
      led13 = new five.Led(data.pin);
      led13.strobe(data.strobe);
    } else if (data.pin == 9) {
      console.log('pin 9');
      led9 = new five.Led(data.pin);
      led9.strobe(data.strobe);
    }
  });
  socket.on('ledOff',function(data) {
    if (data.pin == 8) {
      console.log('pin 8 off');
      if (led8) { led8.off(); }
    } else if (data.pin == 13) {
      if (led13) { led13.off(); }
      console.log('pin 13 off');
    } else if (data.pin == 9) {
      if (led9) { led9.off(); }
      console.log('pin 9 off');
    }
  });
});

console.log('Server running at http://127.0.0.1:1337/');
