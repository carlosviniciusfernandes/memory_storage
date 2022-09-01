const express = require('express')
const router = require('../presentation/routes.js')

const app = express();

app.use(express.json())
app.use('', router);

module.exports = app
