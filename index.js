import express from 'express';
import { stackRouter, storeRouter } from './routes.js';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.json())

app.use('/stack', stackRouter);
app.use('/store', storeRouter);

app.listen(port, () => {
  console.log(`Starting server on port: ${port}`)
});
