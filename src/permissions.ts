import {logger} from '@danielhuisman/koa-base';
import {Provider} from '@orbis-framework/auth';
import {shield, rule, allow} from 'graphql-shield';

import {Context} from './context';
import {User} from './entities';

// Rules
const isUser = rule()((_root, _args, ctx: Context) => !!ctx.user);

const isCurrentMember = rule()((root, _args, ctx: Context) => !!ctx.user && (root instanceof User && root.id === ctx.user.id));

const isCurrentMemberProvider = rule()(async (root, _args, ctx: Context) =>
    !!ctx.user && (root instanceof Provider && (await ctx.user.providers).some((provider) => provider.id === root.id))
);

// Permissions
export const permissions = shield({
    AccessToken: allow,
    Member: {
        '*': isCurrentMember,
        id: isUser,
        name: isUser
    },
    Provider: isCurrentMemberProvider,
    ProviderList: isUser,

    Query: {
        me: isUser,
        user: isUser
    },
    Mutation: {
        login: allow,
        register: allow,
        changeEmail: isUser,
        changePassword: isUser,
        requestVerifyEmail: allow,
        requestResetPassword: allow,
        verifyEmail: allow,
        resetPassword: allow
    }
}, {
    // fallbackRule: isAdmin,

    // @ts-expect-error: error in context type of graphql-shield
    fallbackError: (err: Error, _root, _args, ctx: Context) => {
        if (!err || err.message === 'Not Authorised!') {
            console.log(err);
            if (ctx.user) {
                return new Error('Not authorised.');
            }
            return new Error('Not authenticated.');
        }

        logger.error(err.stack || err.message);
        return err;
    }
});
