import 'reflect-metadata';
import {startServer, logger} from '@danielhuisman/koa-base';

import {config} from './config';
import {database} from './database';
import {server} from './server';

(async () => {
    try {
        logger.info('Starting Orbis Example...');

        // Initialize database
        logger.info('Initializing database connection...');
        await database.initialize();
        logger.info('Succesfully initialized database connection.');
    } catch (err) {
        logger.error('Failed to initialize database connection:');
        logger.error((err as Error).stack);
    }

    // Start server
    try {
        await startServer(config, server);
    } catch (err) {
        logger.error('Failed to start server:');
        logger.error((err as Error).stack);
    }
    logger.info(`Started WebSocket server on ws://localhost:${config.port}`);

    logger.info('Started Orbis Example.');
})();
