
//jshint esversion:6
const PORT = process.env.PORT || 6969;
const net = require('net');
/*const sin = process.stdin;
var name ;

const client = net.connect({port: 6969}, () => {
  console.log('Now Connected!');
c
//  socket.emit('connect', username);

//  client.write('Enter You Username:');
  client.on('data', (data) => {
    console.log(data.toString()); // this console.log whatever 'data' you're typing.
  });

  sin.on('data', (data)=>{
    client.write(data);

  });
});
*/



const server = new net.Socket();
server.connect(PORT, /*'10.0.1.161',*/ () => {
  console.log(`Connected to server at ${PORT}`);

/*  server.on('data', (data)=> {
    console.log(data.toString());
  });*/

  process.stdin.pipe(server);

  server.pipe(process.stdout);

});