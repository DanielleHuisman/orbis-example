import {getConnectionManager} from 'typeorm';

import {config} from './config';

export const database = getConnectionManager().create({
    type: 'postgres',
    host: config.database.host,
    port: config.database.port,
    username: config.database.username,
    password: config.database.password,
    database: config.database.name,
    synchronize: false,
    migrationsRun: false,
    entities: [
        'node_modules/@orbis-framework/auth/dist/entities/*.js',
        __dirname + '/entities/**/*.{js,ts}'
    ],
    migrations: [
        __dirname + '/migrations/**/*.{js,ts}'
    ],
    subscribers: [
        __dirname + '/subscribers/**/*.{js,ts}'
    ],
    logging: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error']
});
