import {Orbis} from '@orbis-framework/core';
import {OrbisAuth} from '@orbis-framework/auth';
import {oauth2_v2} from 'googleapis';

import {config} from './config';
import {User} from './entities';
import {providers} from './providers';

export const orbis = new Orbis();

orbis.addModules([
    new OrbisAuth({
        providers,
        jwt: config.jwt,
        urls: {
            prefix: (url) => url.startsWith('/') ? `${config.externalUrl}${url}` : config.externalUrl
        },
        // TODO: this should be moved to each provider separated
        createUser: async ({provider, data}) => {
            if (provider.type === 'local') {
                const localData = data as {
                    name: string;
                };

                return orbis.createOne(User, {
                    data: {
                        name: localData.name,
                        email: provider.email
                    }
                });
            } else if (provider.type === 'google') {
                const googleData = data as oauth2_v2.Schema$Userinfo;

                return orbis.createOne(User, {
                    data: {
                        name: googleData.name,
                        email: provider.email
                    }
                });
            } else {
                throw new Error('Unknown provider');
            }
        }
    })
]);
