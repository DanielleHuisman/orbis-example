import {Orbis} from '@orbis-framework/core';
import {OrbisAuth} from '@orbis-framework/auth';

import {config} from './config';
import {User} from './entities';

export const orbis = new Orbis();

orbis.addModules([
    new OrbisAuth({
        providers: {
            local: true,
            oauth: ['google']
        },
        jwt: config.jwt,
        urls: {
            prefix: (url) => url.startsWith('/') ? `${config.externalUrl}${url}` : config.externalUrl
        },
        createUser: async (data) => {
            return orbis.createOne(User, {
                data: {
                    name: data.name,
                    email: data.email
                }
            });
        }
    })
]);
