const express = require('express')
const {stackController, storeController} = require('./controllers.js')

const stackRouter = express.Router();
const storeRouter = express.Router();

// FIFO stack endpoints
stackRouter.post('/add', (req, res) => { stackController.addToStack(req, res) });
stackRouter.get('/', (req, res) => { stackController.getFromStack(req, res) });


// Key-Value store endpoints
storeRouter.post('/add', (req, res) => { storeController.addToStore(req, res) });
storeRouter.get('/:key', (req, res) => { storeController.getFromStore(req, res) });
storeRouter.delete('/:key', (req, res) => { storeController.deleteFromStore(req, res) });

module.exports = {
    stackRouter,
    storeRouter
}