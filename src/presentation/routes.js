const express = require('express')
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./openapi.json');
const inMemoryStack = require('../data/providers/stackProvider')
const inMemoryStore = require('../data/providers/storeProvider')
const StackController = require('./controllers/stackController.js')
const StoreController = require('./controllers/storeController.js')

const stackController = new StackController(inMemoryStack)
const storeController = new StoreController(inMemoryStore)

const router = express.Router();

// FIFO stack endpoints
router.post('/stack/add', (req, res) => { stackController.addToStack(req, res) });
router.get('/stack', (req, res) => { stackController.getFromStack(req, res) });

// Key-Value store endpoints
router.post('/store/add', (req, res) => { storeController.addToStore(req, res) });
router.get('/store/:key', (req, res) => { storeController.getFromStore(req, res) });
router.delete('/store/:key', (req, res) => { storeController.deleteFromStore(req, res) });

// Swager API Documentation
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router
