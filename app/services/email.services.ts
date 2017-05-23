import { Job } from 'kue';

/**
 * Send email job
 *
 * @returns {Promise<void>}
 */
export function sendEmail(job?: Job, done?: (error?: Error, data?: object) => void) {

    const total = 10;

    for (let i = 0; i < total; i++) {
        job.progress(i, total, { nextSlide: i === total ? 'itsdone' : i + 1 });
    }

    done(null, Object.assign({}, {
        id: job.id,
        name: 'Vlado',
    }, job.data));
}

