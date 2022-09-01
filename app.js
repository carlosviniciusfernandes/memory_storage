const express = require('express')
const { stackRouter, storeRouter } = require('./routes.js')
const { stackController, storeController } = require('./controllers.js')

const app = express();

app.set('view engine', 'ejs');
app.use(express.json())

app.use('/stack', stackRouter);
app.use('/store', storeRouter);

app.clearStack = () => stackController.stackPile = []
app.addToStack = (item) => stackController.stackPile.push(item)

app.clearStore = () => storeController.store = {}
app.addToStore = (item) => storeController.store[item.key] = item.value
app.setStoreItemTimeout = (key, time) => storeController.setTTL(key, time)

module.exports = app
