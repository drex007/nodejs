const logEvent = require('./logEvent');

const EventEmitter = require('events');

class MyEmiiter extends EventEmitter { }

//Initialize eventEmitter
const eventEmiiterObject = new MyEmiiter();
eventEmiiterObject.on('log', (msg) => logEvent(msg));

setTimeout(() => {
    eventEmiiterObject.emit('log', 'Log event is emitted from index');
}, 2000);