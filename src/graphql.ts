import {orbisPlugin} from '@orbis-framework/core';
import cuid from 'cuid';
import {applyMiddleware} from 'graphql-middleware';
import {makeSchema} from 'nexus';

import {orbis} from './orbis';
import {permissions} from './permissions';

export const schema = applyMiddleware(
    makeSchema({
        types: {},
        plugins: [
            orbisPlugin({
                orbis,
                create: {
                    id: () => cuid()
                }
            })
        ],
        shouldGenerateArtifacts: false
    }),
    permissions
);
