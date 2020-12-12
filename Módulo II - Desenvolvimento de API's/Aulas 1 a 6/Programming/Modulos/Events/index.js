import { EventEmitter } from 'events';

const eventEmitter = new EventEmitter(); 

// on é para escutar o evento
eventEmitter.on("testEvent", obj => {
  console.log(obj);
});

eventEmitter.emit("testEvent", "Hello World!");

export default eventEmitter;