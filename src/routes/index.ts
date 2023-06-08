import asyncHandler from '../helpers/asyncHandler';
import { formatDateTime } from '../helpers/Date';
import HttpResponse from '../modules/Response/HttpResponse';
import ResponseError from '../modules/Response/ResponseError';
import sample from './sample';
import Express, { Request, Response } from 'express';

const route = Express.Router();

// Index Route
route.get('/', function (req: Request, res: Response) {
    let responseData: any = {
        message: 'Example TypeScript ExpressJS',
        maintaner: 'luthfir10, <luthfirr10@gmail.com>',
        source: 'https://github.com/luthfir10/Example-TypeScript-ExpressJS'
    };

    const httpResponse = HttpResponse.get(responseData);
    res.json(httpResponse);
});

// Get Health Server
route.get(
    '/health',
    asyncHandler(async function getServerHealth(req: Request, res: Response) {
        const startUsage = process.cpuUsage();

        const status = {
            uptime: process.uptime(),
            message: 'Ok',
            timezone: 'ID',
            date: formatDateTime(new Date()),
            node: process.version,
            memory: process.memoryUsage,
            platform: process.platform,
            cpuUsage: process.cpuUsage(startUsage)
        };

        const httpResponse = HttpResponse.get({
            message: 'Server Uptime',
            data: status
        });
        res.status(200).json(httpResponse);
    })
);

// Forbidden Api
route.get('/sample', function (req: Request, res: Response) {
    throw new ResponseError.Forbidden(`Forbidden, wrong access endpoint: ${req.url}`);
});

// Using Route v1
route.use('/sample', sample);

export default route;
