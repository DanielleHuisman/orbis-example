import 'reflect-metadata';
import {startServer, logger} from '@danielhuisman/koa-base';

import {config} from './config';
import {dataSource} from './database';
import {server} from './server';

(async () => {
    try {
        logger.info('Starting Orbis Example...');

        // Initialize database
        logger.info('Initializing database connection...');
        await dataSource.initialize();
        logger.info('Succesfully initialized database connection.');
    } catch (err) {
        logger.error('Failed to initialize database connection:');
        logger.error((err as Error).stack);
    }

    // Start server
    try {
        // @ts-expect-error: conflict in Helmet options
        await startServer(config, server);
    } catch (err) {
        logger.error('Failed to start server:');
        logger.error((err as Error).stack);
    }
    logger.info(`Started WebSocket server on ws://localhost:${config.port}`);

    logger.info('Started Orbis Example.');
})();
