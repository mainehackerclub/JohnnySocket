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

  var net = require('net');
  var client = net.connect(
    {host:'66.172.10.186',port:'8124'},
    function() {//'connect' listener
      console.log('client connected');
      //client.write('world!\r\n');
    });
  client.on('data', function(data) {
    console.log(data.toString());
    if (data == 'led3') {
      console.log('Match');
      led3.strobe(100);
    } else {
      console.log('Match FAIL');
    }
   // client.end();
  });
  client.on('end',function() {
    console.log('client disconnected');
  });
  led4.strobe(100);
});
console.log('Server running at http://127.0.0.1:1337/');
