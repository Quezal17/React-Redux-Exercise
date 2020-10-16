import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const app: express.Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send('Hello');
    console.log('Hello');
});

export default app;