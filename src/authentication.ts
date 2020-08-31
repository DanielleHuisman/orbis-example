import Koa from 'koa';
import passport from 'koa-passport';
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import {Context} from '@danielhuisman/koa-base';

import {config} from './config';
import {User} from './entities';
import {State} from './server';
import {orbis} from './orbis';

// Register JWT strategy
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.secret,
    issuer: config.jwt.issuer,
    audience: config.jwt.audience
}, async (payload, done) => {
    try {
        const user = await orbis.findOne(User, {
            where: {
                id: payload.sub
            }
        });
        done(null, user);
    } catch (err) {
        done(err, null);
    }
}));

export const initializeAuthentication = (app: Koa<State, Context>) => {
    // Register Passport middleware
    app.use(passport.initialize());

    // Register authentication middleware
    app.use(async (ctx, next) => {
        await passport.authenticate('jwt', {session: false}, (_, user) => {
            if (user) {
                ctx.state.user = user;
            }
        })(ctx, next);

        await next();
    });
};
