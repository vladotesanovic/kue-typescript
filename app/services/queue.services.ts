import { Queue } from 'kue';

export class QueueServices {

    public processors: string[] = [];

    constructor(public queue: Queue) {}

    public register(name: string, priority: number, call?: () => void) {

        const exists = this.processors.indexOf(name);

        if (exists < 0) {

            this.processors.push(name);

            if (this.queue) {
                this.queue.process(name, priority, call);
            }
        }

    }
}
