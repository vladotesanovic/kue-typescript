import { json, urlencoded } from 'body-parser';
import { config } from 'dotenv';
import * as express from 'express';
import * as kue from 'kue';

// read .env file
config();

import { indexRoutes } from './routes/index';
import { workerRoutes } from './routes/worker';
import { registerServices } from './services';
import { QueueServices } from './services/queue.services';

export const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/', indexRoutes);
app.use('/worker', workerRoutes);

export const kueObject = new QueueServices(kue.createQueue({
    prefix: 'q',
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    },
}));

registerServices();

app.listen(3003);
