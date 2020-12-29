import {Orbis} from '@orbis-framework/core';
import {OrbisAuth} from '@orbis-framework/auth';
import {getConnection} from 'typeorm';

import {config} from './config';
import {providers} from './providers';

export const orbis = new Orbis({
    // Only required when using linked dependencies
    connection: getConnection()
});

orbis.addModules([
    new OrbisAuth({
        providers,
        jwt: config.jwt,
        urls: {
            prefix: (url) => url.startsWith('/') ? `${config.externalUrl}${url}` : config.externalUrl
        }
    })
]);
