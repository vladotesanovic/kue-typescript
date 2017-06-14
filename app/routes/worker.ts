import { Request, Response, Router} from 'express';
import { kueObject } from '../app';
import { GROUPED_JOBS, SEND_EMAIL, SEND_EMAIL2 } from '../services';

export const workerRoutes = Router();

workerRoutes.post('/create', (request: Request, response: Response) => {

    const jobObject = Object.assign({}, {
        jobType: SEND_EMAIL,
    }, request.body);

    const job = kueObject.queue.create(GROUPED_JOBS, jobObject)
        .delay(3000)
        .save((err: Error) => {
            if (err) {
                return response.status(400).json({
                    message: err.message,
                });
            }

            return response.json(job);
        });

    job
        .on('start', () => {
            console.info(`POST: Job started ${job.id}`);
        })
        .on('complete', (result) => {
            console.info('POST: Job completed with data ', result);
        }).on('failed attempt', (errorMessage, doneAttempts) => {
            console.info('Job failed');
        }).on('failed', (errorMessage) => {
            console.info('Job failed');
        }).on('progress', (progress, data) => {
            console.info(' \r OUTER: job #' + job.id + ' ' + progress + '% complete with data ', data);
        });
});

workerRoutes.post('/create2', (request: Request, response: Response) => {

    const jobObject = Object.assign({}, {
        jobType: SEND_EMAIL2,
    }, request.body);

    const job = kueObject.queue.create(GROUPED_JOBS, jobObject)
        .delay(3000)
        .save((err: Error) => {
            if (err) {
                return response.status(400).json({
                    message: err.message,
                });
            }

            return response.json(job);
        });

    job
        .on('start', () => {
            console.info(`POST: Job started ${job.id}`);
        })
        .on('complete', (result) => {
            console.info('POST: Job completed with data ', result);
        }).on('failed attempt', (errorMessage, doneAttempts) => {
        console.info('Job failed');
    }).on('failed', (errorMessage) => {
        console.info('Job failed');
    }).on('progress', (progress, data) => {
        console.info(' \r OUTER: job #' + job.id + ' ' + progress + '% complete with data ', data);
    });
});