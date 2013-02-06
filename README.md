JohnnySocket
============

Mashing Socket.io &amp; JohnnyFive

Overview
--------
This project demonstrates the ability to control an arduino unit with a webpage.

Web page ---> HTTP server / TCP Server ---> TCP Client / JohnnyFive Arduino controller ---> Arduino

Components
----------

There are four components to this project:
1.  Arduino 
2.  Node program running Johnny-Five & and a TCP client
3.  Node server serving static files via HTTP, running Socket.io, and a TCP server
4. Static webpage which uses Socket.io to connect to the server.

Getting started
---------------
1.  Connect your arduino via USB & load the Firmata sketch.  See Johnny-Five repo for [instructions](https://github.com/rwldrn/johnny-five#setup-and-assemble-arduino).
2.  Run `node server.js` on the remote host which will also serve the web page.
3.  Set the IP in `arduino.js` to the IP of your remote host: e.g. `host:'66.172.10.186'`
4.  Run `node arduino.js` locally on the computer which is connected to the arduino.
5.  You'll see the arduino's LED start to blink in response to the remote server.  Eventually this will be controlled through a webpage.

Module dependencies
------------------------------
* npm install socket.io
* npm install node-static
* npm install johnny-five
