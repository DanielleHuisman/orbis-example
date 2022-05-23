import {DataSource} from 'typeorm';
import {findEntities, findMigrations} from '@orbis-framework/core';
import {entities as authEntities} from '@orbis-framework/auth';

import {config, isDevelopment} from './config';
import * as entities from './entities';

export const dataSource = new DataSource({
    type: 'postgres',
    host: config.database.host,
    port: config.database.port,
    username: config.database.username,
    password: config.database.password,
    database: config.database.name,
    synchronize: false,
    migrationsRun: false,
    entities: findEntities([
        authEntities,
        entities
    ]),
    migrations: await findMigrations(import.meta.url),
    subscribers: [
        // TODO: add a subscriber
    ],
    logging: isDevelopment ? ['query', 'error'] : ['error']
});
