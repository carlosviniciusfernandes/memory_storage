import express from 'express';
import { stackController } from './controllers.js';

const stackRouter = express.Router();
const dictRouter = express.Router();

// FIFO store endpoints
stackRouter.post('/add', (req, res) => { stackController.add_to_stack(req, res) });
stackRouter.get('/', (req, res) => { stackController.get_from_stack(req, res) });


// Key-Value store endpoints
dictRouter.post('/add', (req, res) => { return res.json('add to dict') });
dictRouter.get('/:key', (req, res) => { return res.json('get from dict') });
dictRouter.delete('/:key', (req, res) => { return res.json('delete from dict') });

export {
    stackRouter,
    dictRouter
};