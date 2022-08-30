const express = require('express')
const {stackController, storeController} = require('./controllers.js')

const stackRouter = express.Router();
const storeRouter = express.Router();

// FIFO stack endpoints
stackRouter.post('/add', (req, res) => { stackController.add_to_stack(req, res) });
stackRouter.get('/', (req, res) => { stackController.get_from_stack(req, res) });


// Key-Value store endpoints
storeRouter.post('/add', (req, res) => { storeController.add_to_store(req, res) });
storeRouter.get('/:key', (req, res) => { storeController.get_from_store(req, res) });
storeRouter.delete('/:key', (req, res) => { storeController.delete_from_store(req, res) });

module.exports = {
    stackRouter,
    storeRouter
}