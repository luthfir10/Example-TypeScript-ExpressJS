import http from 'http';
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import logging from './config/logging';
import config from './config/config';
import sampleRoutes from './routes/sample';

class App {
    private readonly NAMESPACE: string;
    private readonly application: Application;

    constructor() {
        this.NAMESPACE = 'Server';
        this.application = express();

        this.routes();
    }

    private routes(): void {
        this.application.use('/sample', sampleRoutes);

        /** Catch error 404 endpoint not found */
        this.application.use((req, res, next) => {
            const error = new Error('not found');

            return res.status(404).json({
                message: error.message
            });
        });
    }

    public run(): void {
        /** Logging the request */
        this.application.use((req, res, next) => {
            logging.info(this.NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

            res.on('finish', () => {
                logging.info(this.NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
            });

            next();
        });

        /** Setup port */
        this.application.set('port', config.server.port);

        const server = http.createServer(this.application);

        const onListening = (): void => {
            const addr = server.address();

            const bind = typeof addr === 'string' ? `${addr}` : `${addr?.port}`;

            const host = config.server.hostname;

            const message = `Server running on ${config.server.hostname}:${config.server.port}`;

            logging.info(this.NAMESPACE, message);
        };

        /** Run listener */
        server.listen(config.server.port);
        server.on('listening', onListening);
    }
}

export default App;
