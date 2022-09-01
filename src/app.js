const express = require('express')
const router = require('./routes.js')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../openapi.json');

const app = express();

app.use(express.json())

app.use('', router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app
