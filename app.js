const express = require('express')
const { stackRouter, storeRouter } = require('./routes.js')

const app = express();

app.set('view engine', 'ejs');
app.use(express.json())

app.use('/stack', stackRouter);
app.use('/store', storeRouter);

module.exports = app
