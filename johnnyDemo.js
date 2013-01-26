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
  console.log('Board is ready');
  led9 = new five.Led(9);
  led13 = new five.Led(13);


var serv = http.createServer(function (req, res) {
    console.log('A Connection!');
    req.addListener('end', function () {
    // Serve files!
        file.serve(req, res);
    });
    led13.stop();
    led13.off();
    led9.stop();
    led9.off();
    
}).listen(1337, '127.0.0.1');
var io = require('socket.io').listen(serv);
io.sockets.on('connection', function(socket) {
  socket.on('ledOn',function(data) {
    console.log('ledOn',data.pin);
    console.log(data);
    if (data.pin == 13) {
      console.log('pin 13');
      led13.strobe(data.strobe);
    } else if (data.pin == 9) {
      console.log('pin 9');
      led9.strobe(data.strobe);
    }
  });
  socket.on('ledOff',function(data) {
    if (data.pin == 13) {
      led13.stop();
      led13.off();
      console.log('pin 13 off');
    } else if (data.pin == 9) {
      led9.stop();
      led9.off();
      console.log('pin 9 off');
    }
  });
});

console.log('Server running at http://127.0.0.1:1337/');
});
