import express from 'express';
import { stackRouter, dictRouter } from './routes.js';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use('/stack', stackRouter);
app.use('/dict', dictRouter);

app.listen(port, () => {
  console.log(`Startint server on port: ${port}`)
});
