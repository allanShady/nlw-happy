import express, { json } from 'express'
import './database/connection';
import './routes'
import routes from './routes';
import path from 'path'
import 'express-async-errors'

const app = express();
import errorHandler from './errors/handler'

app.use(express.json());
app.use(routes);
app.use(errorHandler);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

app.listen(3333);