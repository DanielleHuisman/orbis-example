import {Orbis} from '@orbis-framework/core';
import {OrbisAuth} from '@orbis-framework/auth';

import {config} from './config';
import {providers} from './providers';

export const orbis = new Orbis();

orbis.addModules([
    new OrbisAuth({
        providers,
        jwt: config.jwt,
        urls: {
            prefix: (url) => url.startsWith('/') ? `${config.externalUrl}${url}` : config.externalUrl
        }
    })
]);
