import express, { json } from 'express'
import './database/connection';
import './routes'
import routes from './routes';


const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333);