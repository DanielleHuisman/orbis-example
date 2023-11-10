import {ProviderLocal, ProviderGoogle} from '@orbis-framework/auth';

import {config} from './config';
import {User} from './entities';
import {orbis} from './orbis';

export interface ExtendedRegisterInput {
    name: string;
}

export const providers = [
    new ProviderLocal<ExtendedRegisterInput>({
        extendRegisterInput(t) {
            t.nonNull.string('name');
        },

        createUser({provider, data}) {
            return orbis.createOne(User, {
                data: {
                    name: data.name,
                    email: provider.email
                }
            });
        },

        async onEmailUpdated(provider) {
            // Find user
            const user = (await provider.user) as User;

            // Update user email address
            await orbis.updateOne(User, {
                where: {
                    id: user.id
                },
                data: {
                    email: provider.email
                }
            });
        }
    }),
    new ProviderGoogle({
        ...config.oauth.google,

        createUser({provider, data}) {
            if (!data.name) {
                throw new Error('User has no name.');
            }

            return orbis.createOne(User, {
                data: {
                    name: data.name,
                    email: provider.email
                }
            });
        }
    })
];
