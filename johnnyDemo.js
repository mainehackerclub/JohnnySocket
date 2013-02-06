var five = require("johnny-five"),
    // or "./lib/johnny-five" when running from the source
    board, led3, led4, led5;
    board  = new five.Board();

board.on("ready", function() {
  // Create an Led on pin 5 and strobe it on/off
  // Optionally set the speed; defaults to 100ms
  console.log('Board is ready');
  led3 = new five.Led(4);
  led4 = new five.Led(4);
  led5 = new five.Led(5);

  var dnode = require('dnode');
  var net = require('net');
  var client = net.connect({host:'66.172.10.186',port:'5004'});
  var d = dnode.connect(client);
  d.pipe(net.connect(5004, '66.172.10.186')).pipe(d)
  d.on('remote', function(remote) {
    remote.basic('dnode is working', function(x) {
      console.log('x is great: ',x);
    });
    d.end();
  });
});
console.log('Server running at http://127.0.0.1:1337/');
