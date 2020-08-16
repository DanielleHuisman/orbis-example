import {makeSchema} from '@nexus/schema';
import {orbisPlugin} from '@orbis-framework/core';
import cuid from 'cuid';

import {orbis} from './orbis';

export const schema = makeSchema({
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
});
