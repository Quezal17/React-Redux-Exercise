import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import errorRequest from './middlewares/errorRequest';
import {MovieRouter} from './routers/MovieRouter';
const app: express.Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(new MovieRouter().route());

app.use(errorRequest.catchBadRequest);
app.use(errorRequest.sendError);

export default app;