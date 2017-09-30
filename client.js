
//jshint esversion:6

const net = require('net');
const sin = process.stdin;

const client = net.connect({port: 6969}, () => {

  client.on('data', (data) => {
    console.log(data.toString());
  });

  sin.on('data', (data)=>{
    client.write(data);
  });
});

