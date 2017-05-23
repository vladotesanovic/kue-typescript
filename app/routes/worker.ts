import { Request, Response, Router} from 'express';
import { kueObject } from '../app';
import { SEND_EMAIL } from '../services';

export const workerRoutes = Router();

workerRoutes.post('/create', (request: Request, response: Response) => {

    const job = kueObject.queue.create(SEND_EMAIL, request.body)
        .save((err: Error) => {
            if (!err) {
                return response.json(job);
            }

            return response.status(400).json({
                message: err.message,
            });
        });

    job.on('complete', (result) => {
        console.info('Job completed with data ', result);

    }).on('failed attempt', (errorMessage, doneAttempts) => {
        console.info('Job failed');

    }).on('failed', (errorMessage) => {
        console.info('Job failed');

    }).on('progress', (progress, data) => {
        console.info('\r  job #' + job.id + ' ' + progress + '% complete with data ', data);
    });
});
