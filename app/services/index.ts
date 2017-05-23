import { kueObject } from '../app';
import { sendEmail } from './email.services';

export const SEND_EMAIL = 'Email: send email';

export function registerServices() {
    kueObject.register(SEND_EMAIL, 1, sendEmail);
}
