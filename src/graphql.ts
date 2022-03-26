import {orbisPlugin} from '@orbis-framework/core';
import cuid from 'cuid';
import {applyMiddleware} from 'graphql-middleware';
import {makeSchema} from 'nexus';

import {orbis} from './orbis';
import {permissions} from './permissions';
import * as types from './types';

export const schema = applyMiddleware(
    // @ts-ignore: typing conflict
    makeSchema({
        types,
        plugins: [
            orbisPlugin({
                orbis,
                create: {
                    id: () => cuid()
                }
            })
        ],
        outputs: {
            typegen: true
        }
    }),
    permissions
);
