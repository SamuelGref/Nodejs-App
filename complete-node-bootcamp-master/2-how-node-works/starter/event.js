const EventEmitter = require('events')

const myEmitter = new EventEmitter()

myEmitter.on('newSale', () => {
    console.log('there was a new sale')
})


myEmitter.on('newSale', () => {
    console.log('Costomer name : Sami')
})


myEmitter.emit('newSale')

 