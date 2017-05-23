import { Request, Response, Router } from 'express';

export const indexRoutes = Router();

indexRoutes.get('/', (request: Request, response: Response) => {

    return response.json({
        routes: [{
            body: 'object',
            type: 'POST',
            url: '/worker/create',
        }],
        status: true,
    });
});
