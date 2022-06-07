import {Orbis} from '@orbis-framework/core';
import {OrbisAuth} from '@orbis-framework/auth';

import {config} from './config';
import {dataSource} from './database';
import {providers} from './providers';

export const orbis = new Orbis({
    dataSource: () => dataSource
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
