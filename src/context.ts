import {ContextFunction} from 'apollo-server-core';
import {ParameterizedContext, Request} from 'koa';

import {User} from './entities';
import {State} from './server';

interface ContextParameters {
    ctx: ParameterizedContext<State>;
}

export interface Context {
    request: Request;
    user?: User;
}

export const context: ContextFunction<ContextParameters, Context> = ({ctx}) => ({
    request: ctx.request,
    user: ctx.state.user
});
