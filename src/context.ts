import {ContextFunction} from 'apollo-server-core';

export const context: ContextFunction = async ({ctx}) => {
    return {
        user: ctx.state.user
    };
};
