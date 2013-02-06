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



Module dependencies
------------------------------
* npm install socket.io
* npm install node-static
* npm install johnny-five
