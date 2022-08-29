import express from 'express';

const stackRouter = express.Router();
const dictRouter = express.Router();

// FIFO store endpoints
stackRouter.post('/add', (req, res) => { return res.json('add to stack') });
stackRouter.get('/', (req, res) => { return res.json('get and delete from stack') });


// Key-Value store endpoints
dictRouter.post('/add', (req, res) => { return res.json('add to dict') });
dictRouter.get('/:key', (req, res) => { return res.json('get from dict') });
dictRouter.delete('/:key', (req, res) => { return res.json('delete from dict') });

export {
    stackRouter,
    dictRouter
};