var five = require("johnny-five"),
    board, led3, led4, led5;
    board  = new five.Board();
var util = require('util'),
    net = require('net');

// Global variables for active digital pins.
var pins = [3, 4, 5],
    leds = [];

// Initialize array of Led objects.
function setLeds() {
  for (i in pins) {
    var pin = pins[i];
    var led = new five.Led(pin);
    led.name = pin;
    leds.push(led);
    console.log('created Led '+pin);
  };
}

// Find Led given a pin
function getLed(name) {
  var found = '';
  for (i in leds) {
    if (leds[i].name == name) {
      found = leds[i];
    }
  }
  return found;
}

// Hearbeat tracking
var beats = 0;
function heartbeat(details,client) {
  details.sequence = beats;
  beats++;
  client.write(JSON.stringify(details));
}

// Define arduino behavior.
board.on("ready", function() {
  var boardDeets = {};
  boardDeets.uniqueId = "123456789XABCD";
  boardDeets.name = "maine hacker board one";
  console.log('Board is ready');
  setLeds();

  // Make TCP connection as client.
  var client = net.connect(
    {host:'awesomesauce.me',port:'8130'},
    function() {//'connect' listener
      console.log('TCP client connected');
      client.write(JSON.stringify(boardDeets));
    }
  );
  
  var hbInterval = setInterval(heartbeat,5000,boardDeets,client);

  // Process data from TCP Server.
  client.on('data', function(data) {
    var data = JSON.parse(data.toString());
    console.log('Received TCP data: '+util.inspect(data));
    var led = getLed(data.pin);
    if (data.action === 'strobe') {
      console.log('strobing '+led.name+' on period '+data.period+'ms.');
      led.strobe(data.period);
    } else if (data.action === 'off') {
       led.stop().off();
    }
   // client.end();
  });

  // Handle TCP end.
  client.on('end',function() {
    console.log('TCP client disconnected');
  });

});

console.log('Waiting for Arduino to be ready.');
