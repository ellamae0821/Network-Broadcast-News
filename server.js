//jshint esversion:6
/*
const io = require("socket.io");
const net = require('net');
var HOST = '0.0.0.0';
var PORT = 6969;
const sin = process.stdin;


var clients = [];

const server = net.createServer( (socket) => { // socket is dublex

    // We have a connection - a socket object is assigned to the connection automatically

    console.log('CONNECTED: ' + socket.remoteAddress +':'+ socket.remotePort);

    sin.on('data', (data)=> {
        socket.write('Broadcast from Server: ' + data);
    });




    // Add a 'data' event handler to this instance of socketet
    socket.on('data', function(data) {

        console.log('SERVER BCAST FROM ' + socket.remoteAddress + ': ' + data);
        // Write the data back to the socketet, the client will receive it as data from the server
        socket.write('You said: ' + data + '"');

    });

    // Add a 'close' event handler to this instance of socketet
    socket.on('close', function(data) {
        console.log('CLOSED: ' + socket.remoteAddress +' '+ socket.remotePort);
    });

}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);
*/

const net = require('net');
const PORT = process.env.PORT || 6969;
const clients = [];
const broadcast = (sender, message ) => clients
  .filter(c =>
    c !== sender)
  .forEach(c => {
    let username = (sender.username).replace(/\n$/, '');
    c.write(username + ": " + message);
  });



const server = net.createServer((client)=> {

    console.log("A Client has connected");


    client.username = null;

    client.write('Please enter your username: \n');

    client.on('data', (data) => {
        if(client.username === null){
            client.username = data.toString();
            client.write(`Welcome ${client.username}`);
            clients.push(client);
            console.log('CLIENTS ARRAY: ' + clients);
        }else{
            broadcast(client, data.toString());
//            console.log(client.username + ":" + data.toString());
            let username = (client.username).replace(/\n$/, '');
            console.log(`${username}: ${data.toString()}`);
        }

         //   client.write(data);
          //  console.log(data.toString());


    });

    process.stdin.on('data', (data)=> {
        client.write('Broadcast from Server: ' + data);
    });

    client.on('close', function() {
        console.log('Connection closed');
    });

});


server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});


