//jshint esversion:6


const net = require('net');



var HOST = '0.0.0.0';
var PORT = 6969;


var clients = [];

const server = net.createServer( (socket) => {

    // We have a connection - a socketet object is assigned to the connection automatically
    console.log('CONNECTED: ' + socket.remoteAddress +':'+ socket.remotePort);

    // Add a 'data' event handler to this instance of socketet
    socket.on('data', function(data) {

        console.log('CLIENT' + socket.remoteAddress + ': ' + data);
        // Write the data back to the socketet, the client will receive it as data from the server
        socket.write('You said "' + data + '"');

    });

    // Add a 'close' event handler to this instance of socketet
    socket.on('close', function(data) {
        console.log('CLOSED: ' + socket.remoteAddress +' '+ socket.remotePort);
    });

}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);



//socketet.on('data')

