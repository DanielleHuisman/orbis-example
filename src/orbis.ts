import {Orbis} from '@orbis-framework/core';
import {OrbisAuth} from '@orbis-framework/auth';

import {config} from './config';
import {getDataSource} from './database';
import {providers} from './providers';

export const orbis = new Orbis({
    dataSource: () => getDataSource()
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
