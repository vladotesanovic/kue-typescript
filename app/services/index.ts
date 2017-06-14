import { Job } from 'kue';

import { kueObject } from '../app';
import { sendEmail, sendNewsletter } from './email.services';

export const SEND_EMAIL = 'Email: send email';
export const SEND_EMAIL2 = 'Email: send email 2';
export const GROUPED_JOBS = 'Group: grouped jobs 1';

export type IJobCallback = (error?: Error, data?: object) => void;

export function registerServices() {

    // Register all available processors
    kueObject.register(SEND_EMAIL, 1, sendEmail);
    kueObject.register(SEND_EMAIL2, 1, sendNewsletter);

    kueObject.register(GROUPED_JOBS, 1, (groupedJob?: Job, done?: IJobCallback) => {

        const jobType = groupedJob.data.jobType;
        delete groupedJob.data.jobType;

        switch (jobType) {

            case SEND_EMAIL:

                const sendEmailJob = kueObject.queue.create(SEND_EMAIL, groupedJob.data)
                    .save(() => {
                        console.log(`INFO: inner job started ${sendEmailJob.id}`);
                        // job saved
                    });

                sendEmailJob
                    .on('start', () => {
                        console.info(`GROUPED: Job started ${sendEmailJob.id} ${SEND_EMAIL}`);
                    })
                    .on('complete', (result) => {
                        console.info('GROUPED: Job completed with data ', result);
                        done(null, result);

                    }).on('failed attempt', (errorMessage, doneAttempts) => {
                        console.info('Job failed');
                        done(errorMessage, null);

                    }).on('failed', (errorMessage) => {
                        console.info('Job failed');
                        done(errorMessage, null);
                    }).on('progress', (progress, data) => {
                        console.info(
                            `INNER: job #${sendEmailJob.id} ${progress}% complete with data ${JSON.stringify(data)}`,
                        );
                        groupedJob.progress(progress, 100, data);
                    });

                break;

            case SEND_EMAIL2:

                const sendEmailJob2 = kueObject.queue.create(SEND_EMAIL, groupedJob.data)
                    .save((err: Error) => {
                        console.log(`INFO: inner job started ${sendEmailJob2.id} ${SEND_EMAIL2}`);
                        // job saved
                    });

                sendEmailJob2
                    .on('start', () => {
                        console.info(`GROUPED: Job started ${sendEmailJob2.id}`);
                    })
                    .on('complete', (result) => {
                        console.info('GROUPED: Job completed with data ', result);
                        done(null, result);

                    }).on('failed attempt', (errorMessage, doneAttempts) => {
                    console.info('Job failed');
                    done(errorMessage, null);

                }).on('failed', (errorMessage) => {
                    console.info('Job failed');
                    done(errorMessage, null);
                }).on('progress', (progress, data) => {
                    console.info(
                        `INNER: job #${sendEmailJob2.id} ${progress}% complete with data ${JSON.stringify(data)}`,
                    );
                    groupedJob.progress(progress, 100, data);
                });

                break;
        }

    });
}
