import {ContextFunction} from 'apollo-server-core';

import {User} from './entities';
import {orbis} from './orbis';

export const context: ContextFunction = async ({ctx}) => {
    let user = null;
    if (ctx.request.headers.authorization) {
        user = await orbis.findOne(User, {
            where: {
                id: ctx.request.headers.authorization.substring('Bearer '.length)
            }
        });
    }

    return {
        user
    };
};
