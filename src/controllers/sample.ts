import { Request, Response, NextFunction } from 'express';
import HttpResponse from '../modules/Response/HttpResponse';

const sampleHealthCheck = (req: Request, res: Response, next: NextFunction) => {
    let responseData: any = {
        message: 'pong'
    };
    const httpResponse = HttpResponse.get(responseData);
    res.json(httpResponse);
};

export default { sampleHealthCheck };
