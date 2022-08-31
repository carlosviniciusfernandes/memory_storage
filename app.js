const express = require('express')
const { stackRouter, storeRouter } = require('./routes.js')
const { stackController, storeController } = require('./controllers.js')

const app = express();

app.set('view engine', 'ejs');
app.use(express.json())

app.use('/stack', stackRouter);
app.use('/store', storeRouter);

app.clearStack = () => stackController.stack_pile = []
app.addToStack = (item) => stackController.stack_pile.push(item)

app.clearStore = () => storeController.store_dict = {}
app.addToStore = (key, value) => storeController.store_dict[key] = value

module.exports = app