import dotenv from 'dotenv';

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 5500;
const APP_NAME = process.env.APP_NAME || 'ExampleAPI';

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    app_name: APP_NAME
};

const config = {
    server: SERVER
};

export default config;
