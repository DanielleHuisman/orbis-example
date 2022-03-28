import {DataSource} from 'typeorm';
import * as authEntities from '@orbis-framework/auth/dist/entities';

import {config, isDevelopment} from './config';
import * as entities from './entities';

export const database = new DataSource({
    type: 'postgres',
    host: config.database.host,
    port: config.database.port,
    username: config.database.username,
    password: config.database.password,
    database: config.database.name,
    synchronize: false,
    migrationsRun: false,
    entities: [
        // TODO: improve oribs entity import (including enum handling)
       ...Object.values(authEntities),
       ...Object.values(entities)
    ],
    migrations: [
        // TODO: write util functions in orbis for migration imports
    ],
    subscribers: [
        // TODO: add a subscriber
    ],
    logging: isDevelopment ? ['query', 'error'] : ['error']
});
