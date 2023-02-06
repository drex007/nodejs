// const logEvent = require('./logEvent');
const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const EventEmitter = require('events');

class Emitter extends EventEmitter { }

//Initialize eventEmitter comment
const myEmitter = new Emitter();
// myEmitter.on('log', (msg) => logEvent(msg));
// myEmitter.emit('log', 'Log event is emitted from index');


const PORT = process.env.PORT || 3500;

const server = http.createServer((req, res)=>{
    console.log(req.url, req.method)
});

server.listen(PORT, ()=> console.log(`server is runnung on port ${PORT}`))