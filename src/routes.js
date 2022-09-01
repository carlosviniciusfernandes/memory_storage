const express = require('express')
const inMemoryStorage = require('./providers.js')

const StackController = require('./controllers/stackController.js')
const StoreController = require('./controllers/storeController.js')

const stackController = new StackController(inMemoryStorage)
const storeController = new StoreController(inMemoryStorage)

const router = express.Router();

// FIFO stack endpoints
router.post('/stack/add', (req, res) => { stackController.addToStack(req, res) });
router.get('/stack', (req, res) => { stackController.getFromStack(req, res) });

// Key-Value store endpoints
router.post('/store/add', (req, res) => { storeController.addToStore(req, res) });
router.get('/store/:key', (req, res) => { storeController.getFromStore(req, res) });
router.delete('/store/:key', (req, res) => { storeController.deleteFromStore(req, res) });

module.exports = router
