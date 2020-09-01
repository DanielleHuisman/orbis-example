import {ProviderLocal, ProviderGoogle} from '@orbis-framework/auth';

import {config} from './config';

export const providers = [
    new ProviderLocal({
        extendRegisterInput(t) {
            t.string('name', {
                nullable: false
            })
        }
    }),
    new ProviderGoogle(config.oauth.google)
];
