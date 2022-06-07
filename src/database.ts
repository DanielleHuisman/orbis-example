import {DataSource} from 'typeorm';
import {findEntities, findMigrations} from '@orbis-framework/core';
import {entities as authEntities} from '@orbis-framework/auth';

import {config, isDevelopment} from './config';
import * as entities from './entities';

let dataSource: DataSource;

export const getDataSource = async () => {
    if (!dataSource) {
        dataSource = new DataSource({
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
    }
    return dataSource;
};


// Check if the TypeORM CLI is loading the data source
export let cliDataSource: DataSource;
if (process.argv.some((arg) => arg.includes('node_modules/.bin/typeorm'))) {
    cliDataSource = await getDataSource();
}
